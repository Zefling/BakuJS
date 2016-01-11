/** formateur (object avec des fonctions : "func(mixed value):string" ou "func(mixed value, string params):string"   */
var Formater = {};


/**
 * formatage par function et paramètres :
 * - {key, function, params}
 * les functions sont des méthodes de Formater
 * @params liste d'arguments, array ou object
 * @return string
 */
String.prototype.format = function (){
	var args = arguments;
	if (typeof args[0] === 'array' || typeof args[0] === 'object') {
		args = args[0];
	}  
	return this.replace(/{\s*([^,}]+)\s*(?:,\s*([^,}]+)\s*)?(?:,\s*((?:\\.|[^}])+)\s*)?}/g, function (base, value, func, params) {
		return (func !== undefined && typeof Formater[func] === 'function')  
			? ( params !== undefined ? Formater[func](args[value], params.replace('\\}', '}')) : Formater[func](args[value]) )
			: args[value];
	});
};
