function Map() {
    this.put = function(key, value) {  
		this[key+'_'] = value;  
	};  
	this.get = function(key) {  
		return this[key+'_'];  
	};  
	this.remove = function(key) {  
		delete this[key+'_'];  
	};  
	this.keyset = function() {
		var ret = "";  
		for(var p in this) {  
			if(typeof p == 'string' && p.substring(p.length-1) == "_") {  
				ret += ",";  
				ret += p.substring(0,p.length-1);  
			}  
		}  
		if(ret == "") {  
			return ret.split(",");  
		} else {  
			return ret.substring(1).split(",");  
		}  
	};
}

function LoadAllTpl(ts){	
	var _t=baidu.template;
	for(var i in ts){
		LoadTpl(i,ts[i]);
	}
}
function LoadTpl(t,id){
	var _t=baidu.template;
	var html=_t(t,Lang);
	document.getElementById(id).innerHTML=html;
}