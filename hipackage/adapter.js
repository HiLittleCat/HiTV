(function() {
	/**
		layout adapter
	**/
	loadStyle('layout/base.css');
	var rType = HiSDK.screenType.get(screen.height);
	if(!!rType){
		var rTheme = HiSDK.theme.get('1');
		loadStyle('layout/'+rType+'/'+rTheme+'/css/layout.css');
	}
	
	/**
		lanuage adapter
	**/
	var lang = HiSDK.Lanuage;	
	loadJs('i18n/'+lang.toLowerCase()+'.js');
})();
