/*!
 * @author 		xupengfei
 * @version 	1.2(2014.1.10) 
 * @requires 	htvhead.js, htv.css
 */
var Htv = function(pJson){
	/**
		Data init
	*/
	var H = this;
	H.zones = pJson.zones;
	H.keyResponseId = pJson.keyResponseId;
	(!!pJson.direct)? H.direct=pJson.direct:H.direct='left';
	if( !H.zones || !H.keyResponseId) return;
	H.curZone, H.curZoneIndex = 0, H.curElemIndex, H.lastElem, H.curElem, H.curLayer, H.tmpZone, H.options;
	
	for(var i=0;i<H.zones.length;i++){
		H.tmpZone = H.zones[i];
		H.tmpZone.layer = (H.tmpZone instanceof Array);
		if(H.tmpZone.layer){
			(!H.tmpZone.disLayerIndex) && (H.tmpZone.disLayerIndex = 0);
			for(var j=0;j<H.tmpZone.length;j++){
				!H.tmpZone[j].selectCss && (H.tmpZone[j].selectCss = 'htvSelectCss');
				!H.tmpZone[j].leaveZoneCss && (H.tmpZone[j].leaveZoneCss = 'htvLeaveZoneCss');
				if(!!H.tmpZone[j].selectAction){
					if(!H.tmpZone[j].selectRelatedZoneCss) H.tmpZone[j].selectRelatedZoneCss = 'htvSelectRelatedZoneCss';
					if(!H.tmpZone[j].unselectRelatedZoneCss) H.tmpZone[j].unselectRelatedZoneCss = 'htvUnselectRelatedZoneCss';
				}else{
					 H.tmpZone[j].selectRelatedZoneCss = null;
					 H.tmpZone[j].unselectRelatedZoneCss = null;
				}
			}
		}
		else{
			!H.tmpZone.selectCss && (H.tmpZone.selectCss = 'htvSelectCss');
			!H.tmpZone.leaveZoneCss && (H.tmpZone.leaveZoneCss = 'htvLeaveZoneCss');
			if(!!H.tmpZone.selectAction){
				if(!H.tmpZone.selectRelatedZoneCss) H.tmpZone.selectRelatedZoneCss = 'htvSelectRelatedZoneCss';
				if(!H.tmpZone.unselectRelatedZoneCss) H.tmpZone.unselectRelatedZoneCss = 'htvUnselectRelatedZoneCss';
			}else{
				H.tmpZone.selectRelatedZoneCss = null;
				H.tmpZone.unselectRelatedZoneCss = null;
			}
		}
	}
	H.zones[0].layer? H.curZone = H.zones[0][0] : H.curZone = H.zones[0];	
	if (!H.curZone || !H.curZone.data[0]) return;
	setCurrent();
	selectAction();
	
	/**
		Key event
	*/
	function zoneLower(){
		if(H.curZoneIndex > 0){						
			removeClass(H.curElem,H.curZone.selectCss);
			(!!H.curZone.leaveZoneCss) && (H.curElem.className = H.curZone.leaveZoneCss);
			H.tmpZone = H.zones[--H.curZoneIndex];
			H.tmpZone.layer == true? H.curZone = H.tmpZone[H.tmpZone.disLayerIndex]:H.curZone = H.tmpZone;
			setCurrent();
		}
	}
	function zoneHigher(){
		if(H.curZoneIndex < H.zones.length-1){
			removeClass(H.curElem,H.curZone.selectCss);
			(!!H.curZone.leaveZoneCss) && (H.curElem.className = H.curZone.leaveZoneCss);
			(!!H.curZone.selectAction) && (H.curZone.selectAction(H.curElem.id));
			H.tmpZone = H.zones[++H.curZoneIndex];
			if(H.tmpZone.layer){
				var _z = H.tmpZone[H.tmpZone.disLayerIndex];
				if(_z.data.length == 0)return;
				H.curZone = H.tmpZone[H.tmpZone.disLayerIndex];
			}else{
				H.curZone = H.tmpZone;
			}						
			setCurrent();
		}else{
			if(H.curZone.change == true){
				H.curZone.changeAction();
				selectAction();
			}
		}
	}
	H.keyEventFun = function(e){
		if(HtvController.getKeyResponseId() != H.keyResponseId)return;
		HtvController.setFoucsMoveToBrowser(false);
		switch(e.keyCode){			
			case 8://ret
				break;
			case 37://Left
				if(H.curElemIndex[1] == 0){
					(H.direct=='left') && zoneLower();
					(H.direct=='right') && zoneHigher();
				}else{
					H.lastElem = H.curElem;
					H.curElemIndex[1] = H.curElemIndex[1] - 1;
					H.curElem = $E(H.curZone.data[H.curElemIndex[0]][H.curElemIndex[1]].id);
					selectAction();
				}
				H.curElem.scrollIntoView(false);
				break;
			case 38://Up
				if(H.curElemIndex[0] == 0) {
					(H.direct=='up') && zoneLower();
					(H.direct=='down') && zoneHigher();
					(H.curZoneIndex == 0) && HtvController.setFoucsMoveToBrowser(true);
				}else{
					H.lastElem = H.curElem;
					H.curElemIndex[0] = H.curElemIndex[0] - 1;
					if(H.curZone.data[H.curElemIndex[0]].length-1 < H.curElemIndex[1].id){
						H.curElemIndex[1] = H.curZone.data[H.curElemIndex[0]].length-1;
					}
					H.curElem = $E(H.curZone.data[H.curElemIndex[0]][H.curElemIndex[1]].id);
					selectAction();
				}
				H.curElem.scrollIntoView(false);
				break;
			case 39://Right
				if(H.curElemIndex[1] >= H.curZone.data[H.curElemIndex[0]].length-1){						
					(H.direct=='left') && zoneHigher();
					(H.direct=='right') && zoneLower();
				}else{
					H.lastElem = H.curElem;
					H.curElemIndex[1] = H.curElemIndex[1] + 1;
					H.curElem = $E(H.curZone.data[H.curElemIndex[0]][H.curElemIndex[1]].id);
					selectAction();
				}
				H.curElem.scrollIntoView(false);
				break;
			case 40://Down
				if(H.curElemIndex[0] >= H.curZone.data.length-1){
					(H.direct=='up') && zoneHigher();
					(H.direct=='down') && zoneLower();
				}else{
					H.lastElem = H.curElem;
					H.curElemIndex[0] = H.curElemIndex[0] + 1;
					H.curElem = $E(H.curZone.data[H.curElemIndex[0]][H.curElemIndex[1]].id);
					selectAction();
				}
				H.curElem.scrollIntoView(false);
				break;
			case 13://Enter
				var click = H.curElem.getAttribute('onclick');
				eval(click);
				break;
			default:
				break;
		}
	};
	HtvController.eventFunsJson.push({'id':H.keyResponseId,'fun':H.keyEventFun,'bgEvent':false});
	HtvController.setKeyResponseId(H.keyResponseId);
	
	/**
		Mouse event
	*/
	(function(){
		for(var i=0;i<H.zones.length;i++){
			H.tmpZone = H.zones[i];			
			if(H.tmpZone.layer){
				for(var k=0;k<H.tmpZone.length;k++){
					if(!H.tmpZone[k].selectAction)continue;
					for(var r=0;r<H.tmpZone[k].data.length;r++){
						for(var l=0;l<H.tmpZone[k].data[r].length;l++){
							var _onClick = function(){
									addClass(H.curElem,H.curZone.leaveZoneCss);
									H.curZone.activeElemIndex = H.curElemIndex;
									H.lastElem = H.curElem;								
									H.curElem = $E(this.id);
									H.tmpZone = H.zones[1];
									H.curZoneIndex = 1;
									for(var i=0;i<H.tmpZone.length;i++){
										H.curElemIndex = getElemIndex(H.tmpZone[i],this.id);
										if(H.curElemIndex){
											H.curZone = H.tmpZone[i];
											break;
										}
									}
									clearSelect();
									selectAction();
								}
							if(document.addEventListener) $E(H.tmpZone[k].data[r][l].id).addEventListener("click",_onClick,false);
						}
					}
				}
			}else{
				if(!H.tmpZone.selectAction)continue;
				for(var r=0;r<H.tmpZone.data.length;r++){
					for(var l=0;l<H.tmpZone.data[r].length;l++){
						var _onClick = function(){
								addClass(H.curElem,H.curZone.leaveZoneCss);
								H.curZone.activeElemIndex = H.curElemIndex;
								H.lastElem = H.curElem;								
								H.curElem = $E(this.id);
								H.curZone = H.zones[0];
								H.curZoneIndex = 0;
								H.curElemIndex = getElemIndex(H.curZone,this.id);
								clearSelect();
								selectAction();
							}
						if(document.addEventListener) $E(H.tmpZone.data[r][l].id).addEventListener("click",_onClick,false);
					}
				}
			}
		}
		function getElemIndex(zone,id){
			for(var i=0;i<zone.data.length;i++){
				for(var j=0;j<zone.data[i].length;j++){
					if(zone.data[i][j].id == id){
						return [i,j];
					}
				}				
			}
			return false;
		}
	})();
	
	/**
		Internal methods
	*/
	function  setCurrent(){
		setSelect();
		clearSelect();
		removeClass(H.curElem,H.curZone.leaveZoneCss);
		addClass(H.curElem,H.curZone.selectCss);
		if(!!H.curZone.selectRelatedZoneCss){
			setRelatedZoneCss(H.curZone,H.curElem.id);
		}
		H.curZone.activeElemIndex = H.curElemIndex;
		H.curElem.scrollIntoView(false);
	}
	
	function selectAction(){
		(!!H.lastElem) && (removeClass(H.lastElem,H.curZone.selectCss));
		for(var i=0;i<H.curZone.data.length;i++){
			removeClass(H.curElem,H.curZone.selectCss);
		}
		removeClass(H.curElem,H.curZone.leaveZoneCss);
		addClass(H.curElem,H.curZone.selectCss);
		H.curZone.activeElemIndex = H.curElemIndex;
		
		if(!!H.curZone.selectAction){
			setRelatedZoneCss(H.curZone,H.curElem.id);
			H.tmpZone = H.curZone.selectAction(H.curElem.id);
			if(!H.tmpZone)return;
			H.tmpZone = H.tmpZone[H.tmpZone.disLayerIndex];
			if(!!H.tmpZone.layer || !!H.tmpZone.layerId){
				if(!H.tmpZone.activeElemIndex){
					setRelatedZoneCss(H.tmpZone,H.tmpZone.data[0][0].id);
				}else{
					setRelatedZoneCss(H.tmpZone,H.tmpZone.data[H.tmpZone.activeElemIndex[0]][H.tmpZone.activeElemIndex[1]].id);
				}
				
			}
		}
	}
	
	function clearSelect(){
		for(var i=0;i<H.curZone.data.length;i++){
			for(var j=0;j<H.curZone.data[i].length;j++){
				removeClass($E(H.curZone.data[i][j].id),H.curZone.selectCss);
				removeClass($E(H.curZone.data[i][j].id),H.curZone.leaveZoneCss);
			}
		}
	}
	
	function setRelatedZoneCss(zone,id){
		if(!zone || !id || !zone.selectAction) return;
		var _tmpZone = zone.selectAction();		
		for(var i=0;i<_tmpZone.length;i++){
			removeClass($E(_tmpZone[i].layerId),zone.selectRelatedZoneCss);
			addClass($E(_tmpZone[i].layerId),zone.unselectRelatedZoneCss);
		}
		var relatedLayId = getRelatedLayId(zone,id);
		removeClass($E(relatedLayId),zone.unselectRelatedZoneCss);
		addClass($E(relatedLayId),zone.selectRelatedZoneCss);
	}

	function setSelect(){
		H.curElem = null;
		if(!!H.curZone.leaveZoneCss){
			for(var i=0;i<H.curZone.data.length;i++){
				for(var j=0;j<H.curZone.data[i].length;j++){
					if($E(H.curZone.data[i][j].id).className == H.curZone.leaveZoneCss){
						H.curElemIndex = [i,j];
						H.curElem = $E(H.curZone.data[i][j].id);
						return;
					}
				}
			}
			if(!H.curElem){
				H.curElemIndex = [0,0];
				H.curElem = $E(H.curZone.data[0][0].id);
			}
		}else{
			H.curElemIndex = [0,0];
			H.curElem = $E(H.curZone.data[0][0].id);
		}
	}	
	
	function getRelatedLayId(zone,id){
		for(var i=0;i<zone.data.length;i++){
			for(var j=0;j<zone.data[i].length;j++){
				if(zone.data[i][j].id == id){
					return zone.data[i][j].relatedLayId;
				}
			}
		}
	}
	
	/**
		External Methods
	*/
	H.getZone = function(zoneIndex,layerIndex){
		return H.zones[zoneIndex][layerIndex];
	};
	H.setZone = function(zoneIndex,layerIndex,content){
		 H.zones[zoneIndex][layerIndex] = content;
		 var id  = H.curElem.id;
		 H.curElem = $E(id);
		 selectAction();
		 H.curElem.scrollIntoView(false);
	};
	H.options = {"getZone":H.getZone,"setZone":H.setZone};
	return H.options;
}