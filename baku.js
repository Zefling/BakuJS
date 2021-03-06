var baku = {};

baku.version = '0.3 a1';

/**
 * test if it's a string
 * @param string object test
 * @return true is string is a string object
 */
baku.isString = function(string) {
    return typeof(string) === 'string' || string instanceof String;
};

/**
 * test if it's a array
 * @param array object test
 * @return true is s is a array object
 */
baku.isArray = function(array) {
    return typeof(array) === 'object' || array instanceof Array;
};

/**
 * merged object 2 objects
 * @param base source object 
 * @param add adding object in source object
 * @return merged object
 */
baku.extend = function (base, add) {
	if (typeof(base) === 'object' && !(base instanceof Array) && add) {
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
	// if not found use the default language
	if (text === undefined) {
		text = baku.get(this.lg.lg[this.lg['default']], path.split('.'));
	}	
	return text;
};

/** language base */
baku.lg.lg = {};

/**
 * add or extend a language object
 * @param id language id
 * @param lg object this language informations
 */
baku.lg.add = function (id, lg) {
	// first if the defaut language
	if (!this['default']) {
		this['default'] = id;
	}
	this.lg[id] = this.lg[id] ? baku.extend(this.lg[id], lg) : lg;
};
