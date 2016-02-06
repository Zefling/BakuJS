
/**
 * Protec a string for RegExp
 * @param string to transform
 * @return protected string
 */
RegExp._protect = function(string) {
    return new String(string).replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
};

/**
 * Tranform to regex string
 * @param obj a string or array (['1', '2'] -> '1|2');
 * @return protected string
 */
RegExp._toRegexString = function (obj) {
	var str;
	if (!baku.isArray(obj)) {
		str = RegExp._protect(obj);
	} 
	else {
		var i = 0, l = obj.length;
		for (; i< l; i++) {
			obj[i] = RegExp._protect(obj[i]);
		}
		str = obj.join('|')
	}
	return str;
};