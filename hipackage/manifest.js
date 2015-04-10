var HiSDK = {};

//配置语言信息
HiSDK.Lanuage = 'en_us';

//配置分辨率信息
var _mapSType = new Map();
_mapSType.put('540','540p');
_mapSType.put('720','720p');
_mapSType.put('1080','1080p');
HiSDK.screenType = _mapSType;

//配置主题信息
var _mapTheme = new Map();
_mapTheme.put('1','default');
_mapTheme.put('2','blue');
_mapTheme.put('3','happy');
_mapTheme.put('4','black');
HiSDK.theme = _mapTheme;
