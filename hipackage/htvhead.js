function $E() { return document.getElementById(arguments[0]); }
function $V() { return document.getElementById(arguments[0]).value; }
function $N() { return document.getElementsByName(arguments[0]); }
function hasClass(obj, cls) {  
    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));  
}  
  
function addClass(obj, cls) {  
    if (!this.hasClass(obj, cls)) obj.className += " " + cls;  
}  
  
function removeClass(obj, cls) {  
    if (hasClass(obj, cls)) {  
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');  
        obj.className = obj.className.replace(reg, ' ');  
    }  
}  
  
function toggleClass(obj,cls){
    if(hasClass(obj,cls)){  
        removeClass(obj, cls);  
    }else{  
        addClass(obj, cls);  
    }  
}

addLoadEvent(htv_init);
function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {  
    window.onload = function() {
      oldonload();
      func();
    }
  }
}
function htv_init(){
	for(var i=0;i<15;i++){
		var div = document.createElement('div');
		div.setAttribute('id','focusDiv'+i);
		div.setAttribute('style','position:relative;left:0px;width:1px;height:1px;');
		div.setAttribute('tabIndex',i);
		document.body.appendChild(div);	
	}
	if(document.addEventListener)document.addEventListener("keydown",function(e){HtvController.focusControl(e);},false);
}
var HtvController = new (function (){
	this.foucsMoveToBrowser = false;
	this.keyResponseId = 'global';
	this.setFoucsMoveToBrowser = function(bool){
		this.foucsMoveToBrowser = bool;
		if(bool == true){
			for(var i=0;i<15;i++){
				if(i != 7)
				$E('focusDiv'+i).style.display = 'none';
			}
		}
	}	
	this.getFoucsMoveToBrowser = function(){ 
		return this.foucsMoveToBrowser;
	}

	this.setKeyResponseId = function(id){
		this.keyResponseId = id;
		this.removeAllEvent();
		this.addEvent(id);
	}
	this.getKeyResponseId = function(){
		return this.keyResponseId
	}
	this.focusControl = function(e){
		var _type = e.target.tagName.toLocaleLowerCase();
		if(_type == 'input' || _type == 'select')return;
		
		if(!this.foucsMoveToBrowser){			
			$E('focusDiv7').focus();
		}
		for(var i=0;i<15;i++){
			$E('focusDiv'+i).style.display = '';
		}
	}	
	this.eventFunsJson = [];
	this.addEvent = function(id){
		if(id == null)return;
		try{
			for(var i=0;i<this.eventFunsJson.length;i++){
				if(id == this.eventFunsJson[i].id)document.addEventListener("keydown",this.eventFunsJson[i].fun,false);
			}
		}catch(e){
		}
	}
	this.removeAllEvent = function(){
		try{
			for(var i=0;i<this.eventFunsJson.length;i++){
				!this.eventFunsJson[i].bgEvent && document.removeEventListener("keydown",this.eventFunsJson[i].fun,false);
			}
		}catch(e){
		}
	}
	this.deleteEvent = function(id){
		if(id == null)return;
		try{
			for(var i=0;i<this.eventFunsJson.length;i++){
				if(id == this.eventFunsJson[i].id){
					this.eventFunsJson.del(i);
				}
			}
		}catch(e){
		}
	}	
});

Array.prototype.del=function(index){
	if(isNaN(index)||index>=this.length){
		return false;
	}
	for(var i=0,n=0;i<this.length;i++){
		if(this[i]!=this[index]){
			this[n++]=this[i];
		}
	}
	this.length-=1;
}