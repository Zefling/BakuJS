/** formateur (object avec des fonctions : "func(mixed value):string" ou "func(mixed value, string params):string"   */
var Formatter = {};

/**
 * formatage par function et paramètres :
 * - {key, function, params}
 * les functions sont des méthodes de Formatter
 * @param liste d'arguments, array ou object
 * @return string
 */
String.prototype.format = function (){
	var args = arguments;
	if (typeof args[0] === 'array' || typeof args[0] === 'object') {
		args = args[0];
	}
	return this.replace(/(|\\){\s*([^,{}]+)\s*(?:,\s*([^,}]+)\s*)?(?:,\s*((?:\\.|[^}])+)\s*)?}/g, function (base, test, value, func, params) {
		return test !== '\\' ? (
			(func !== undefined && typeof Formatter[func] === 'function')  
			? ( params !== undefined ? Formatter[func](args[value], params.replace('\\}', '}')) : Formatter[func](args[value]) )
			: args[value])
			: base.substring(1);
	});
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
