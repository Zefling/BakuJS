var baku = {};

/**
 * get message by language
 * @param lg language id
 * @param path path of message
 * @return message or 'undefined' if not found
 */
baku.lg = function(lg, path) {
	var text;
	if (this.lg.lg[lg]) {
		text = baku.get(this.lg.lg[lg], path.split('.'));
	}	
	return text;
};

/**
 * add a language object
 * @param lg object
  */
baku.lg.add = function (lg) {
	this.lg = baku.extend(this.lg, lg);
};

/**
 * test if it's a string
 * @param s object test
 * @return true is s is a string object
 */
baku.isString= function(s) {
    return typeof(s) === 'string' || s instanceof String;
};

/**
 * merged object 2 objects
 * @param base source object 
 * @param add adding object in source object
 * @return merged object
 */
baku.extend = function (base, add) {
	if (typeof(base) === 'object' && !(base instanceof Array)) {
		for(var i in add) {
			base[i] = baku.extend(base[i], add[i]);
        }
	} else {
        base = add;
    }
    return base;
};

/**
 * get value in object
 * @param o object 
 * @param path path in object
 * @return value of path or 'undefined' if not found
 */
baku.get = function (o, path) {
	var val, base = o[path.shift()];
	if (typeof (base) === 'object' && path.length > 0) {
		val = baku.get(base, path);
	}
	else if (base) {
		val = base;
	}
    return val;
};