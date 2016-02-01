baku.string = {
	parsePattern : /^\s*([^,]+)\s*(?:,\s*([^,]+)\s*(?:,\s*(.*)\s*)?)?$/,
	
	/** formateur (object avec des fonctions : "func(mixed value):string" ou "func(mixed value, string params):string"   */
	formatter : {}
};

/**
 * fonction pour simuler le regex : /(|\\){\s*([^,{}]+)\s*(?:,\s*([^,}]+)\s*)?(?:,\s*((?:(?R)|\\.|[^}])+)\s*)?}/g
 * @param str la chaîne à parser
 * @param func la function à exécuter sur les balises
 * @return la chaine parsée
 */
baku.string.formatter._parse = function (str, func) {
	var text = "", i  = 0, openTagCount = 0, closeTagCount = 0, fragment = {};
	while ((i = str.indexOf('{' , i)) > -1) {
		if (i === 0 || str[i-1] !== '\\') {
			fragment[i] = 1;
			openTagCount++;
		}
		i++;
	}
	i  = 0;
	while ((i = str.indexOf('}' , i)) > -1) {
		if (i === 0 || str[i-1] !== '\\') {
			fragment[i] = -1;
			closeTagCount++;
		}
		i++;
	}
	if (openTagCount === closeTagCount) {
		var ct = 0, j = 0, mrq = 0, tmp;
		for(var position in fragment) {
			position = parseInt(position);
			if (fragment[position] === 1 && fragment[position] + ct === 1) {
				text += str.substring(mrq, position);
				mrq = position;
			}
			else if (fragment[position] === -1 && fragment[position] + ct === 0) {
				tmp = str.substring(mrq + 1, position);
				if (tmp.match(baku.string.parsePattern)) {
					text += tmp.replace(baku.string.parsePattern, func);
				}
				else {
					throw 'pattern error';
				}
				mrq = position + 1;
				j++;
			}
			fragment[position] += ct;
			ct = fragment[position];
		}
		text += str.substr(mrq);
	}
	else {
		throw 'pattern error';
	}
	return text;
};

/**
 * formatage par function et paramètres :
 * - {key, function, params}
 * les functions sont des méthodes de baku.string.formatter
 * @param liste d'arguments, array ou object
 * @return string
 */
String.prototype._format = function (){
	var args = arguments, str;
	if (typeof args[0] === 'array' || typeof args[0] === 'object') {
		args = args[0];
	}
	
	return baku.string.formatter._parse(this,
		/**
		 * remplace the tag by a formated string 
		 * @param base compled string respect the replace pattern (not used) (see : baku.string.formatter._parsePattern )
		 * @param key the key tag (ex. 0 for {0})
		 * @param func name of function (optional)
		 * @param params a paramter object (optional)
		 * @return string
		 */
		function (base, key, func, params) {
			return (func !== undefined && typeof baku.string.formatter[func] === 'function')  
				? ( params !== undefined ? baku.string.formatter[func](args[key], args, params) : baku.string.formatter[func](args[key], args) )
				: args[key];
		}).replace('\\}', '}').replace('\\{', '{');
};


/**
 * ajout d'une chaine répétée au début jusqu'à la longeur désirée
 * @param n taille de chaîne désirée
 * @param str chaîne à répété 
 * @param mode mode de répétition
 * @return chaîne modifiée
 */
String.prototype._padLeft = function(n, str, mode) {
	if (!n || n <= 0 || this.length >= n || str instanceof String) {
		return this;
	} 
	if (str.length === 1) {
		mode = '';
	}
	 switch (mode) {
		 case 'r':
			return ''._padRight(n, str).substring(0, n - this.length) + this;
			break;
		case 'l':
			return ''._padLeft(n, str).substring(0, n - this.length) + this;
			break;
		default : 
			var adding = n - this.length,
			    size = Math.trunc(adding / str.length + 1),
			    cut =  str.length - (adding % str.length); 
			return str.substring(cut, str.length) + Array(size).join(str || ' ') + this;
	 }
}; 

/**
 * ajout d'une chaine répétée à la fin jusqu'à la longeur désirée
 * @param n taille de chaîne désirée
 * @param str chaîne à répété
 * @param mode mode de répétition
 * @return chaîne modifiée
 */
String.prototype._padRight = function(n, str, mode) {
	 if (!n || n <= 0 || this.length >= n || str instanceof String) {
		return this;
	}
	if (str.length === 1) {
		mode = '';
	}
	switch (mode) {
		case 'l':
			return this + ''._padLeft(n, str).substring(this.length, n);
			break;
		case 'r':
			return this + ''._padRight(n, str).substring(this.length, n);
			break;
		default : 
			 var adding = n - this.length,
			     size = Math.trunc(adding / str.length + 1),
			     cut =  adding % str.length; 
			 return this + Array(size).join(str) + str.substring(0, cut);
	 }
}; 
