/** formateur (object avec des fonctions : "func(mixed value):string" ou "func(mixed value, string params):string"   */
var Formatter = {};

/**
 * fonction pour simuler le regex : /(|\\){\s*([^,{}]+)\s*(?:,\s*([^,}]+)\s*)?(?:,\s*((?:(?R)|\\.|[^}])+)\s*)?}/g
 * @param str la chaîne à parser
 * @param func la function à exécuter sur les balises
 * @return la chaine parsée
 */
Formatter.parse = function (str, func) {
	var rtn = "", i  = 0, op = 0, cl = 0, frag = {};
	while ((i = str.indexOf('{' , i)) > -1) {
		if (i === 0 || str[i-1] !== '\\') {
			frag[i] = 1;
			op++;
		}
		i++;
	}
	i  = 0;
	while ((i = str.indexOf('}' , i)) > -1) {
		if (i === 0 || str[i-1] !== '\\') {
			frag[i] = -1;
			cl++;
		}
		i++;
	}
	if (op === cl) {
		var ct = 0, j = 0, mrq = 0, tmp, match = /^\s*([^,]+)\s*(?:,\s*([^,]+)\s*(?:,\s*(.*)\s*)?)?$/;
		for(var pos in frag) {
			pos = parseInt(pos);
			if (frag[pos] === 1 && frag[pos] + ct === 1) {
				rtn += str.substring(mrq, pos);
				mrq = pos;
			}
			else if (frag[pos] === -1 && frag[pos] + ct === 0) {
				tmp = str.substring(mrq + 1, pos);
				if (tmp.match(match)) {
					rtn += tmp.replace(match, func);
				}
				else {
					throw 'pattern error';
				}
				mrq = pos + 1;
				j++;
			}
			frag[pos] += ct;
			ct = frag[pos];
		}
		rtn += str.substr(mrq);
	}
	else {
		throw 'pattern error';
	}
	return rtn;
};

/**
 * formatage par function et paramètres :
 * - {key, function, params}
 * les functions sont des méthodes de Formatter
 * @param liste d'arguments, array ou object
 * @return string
 */
String.prototype.format = function (){
	var args = arguments, str;
	if (typeof args[0] === 'array' || typeof args[0] === 'object') {
		args = args[0];
	}
	
	str = Formatter.parse(this, function (base, value, func, params) {
		return (func !== undefined && typeof Formatter[func] === 'function')  
				? ( params !== undefined ? Formatter[func](args[value], args, params) : Formatter[func](args[value], args) )
				: args[value];
			});
	return str.replace('\\}', '}').replace('\\{', '{');
};


/**
 * ajout d'une chaine répétée au début jusqu'à la longeur désirée
 * @param n taille de chaîne désirée
 * @param str chaîne à répété (par la fin)
 * @return chaîne modifiée
 */
String.prototype.padLeft = function(n, str) {
	 if (!n || n <= 0 || this.length >= n || str === undefined) {
		return this;
	 } else {
		 var adding = n - this.length;
		 var size = Math.trunc(adding / str.length + 1);
		 var cut =  str.length - (adding % str.length); 
		 return str.substring(cut, str.length) + Array(size).join(str || ' ') + this;
	 }
}; 

/**
 * ajout d'une chaine répétée à la fin jusqu'à la longeur désirée
 * @param n taille de chaîne désirée
 * @param str chaîne à répété (par le début)
 * @return chaîne modifiée
 */
String.prototype.padRight = function(n, str) {
	 if (!n || n <= 0 || this.length >= n || str === undefined) {
		return this;
	 } else {
		 var adding = n - this.length;
		 var size = Math.trunc(adding / str.length + 1);
		 var cut =  adding % str.length; 
		 return this + Array(size).join(str || ' ') + str.substring(0, cut);
	 }
}; 
