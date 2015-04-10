(function() {
	var _d = 'hipackage';	
	loadStyle(_d + '/css/htv.css');
	var loadCore = function(){
		loadJs(_d + '/htvcore.js');
	}	
	var loadDefault = function(){
		loadJs(_d + '/manifest.js',loadAdapter);
	}
	var loadAdapter = function(){
		loadJs(_d + '/adapter.js');
	}
	loadJs(_d + '/baiduTemplate.js');
	loadJs(_d + '/tool.js',loadDefault);
	loadJs(_d + '/htvhead.js',loadCore);
	
})();

function loadJs(url,callback){
	var _h = document.getElementsByTagName('HEAD').item(0);
	var _s = document.createElement('script');
    _s.type = 'text/javascript';
	_s.charset = 'UTF-8';
    _s.src = url;
	_h.appendChild(_s);
	_s.onload = callback;
}
function loadStyle(url){
	var _h = document.getElementsByTagName('HEAD').item(0);
	var _l= document.createElement('link');
    _l.rel = 'stylesheet';
	_l.type = 'text/css';
    _l.href = url;
    _h.appendChild(_l);	
}