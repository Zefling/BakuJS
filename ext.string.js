

/**
 * formatage par function et paramètres :
 * - {clé, function, params}
 * @params liste d'arguments, array ou object
 * @return string
 */
String.prototype.format = function (){
  var args = arguments;
  if (typeof args[0] === 'array' || typeof args[0] === 'object') {
    args = args[0];
  }  
	return this.replace(/{\s*([^,}]+)\s*(?:,\s*([^,}]+)\s*)?(?:,\s*([^,}]+)\s*)?}/g, function (base, value, func, params) {
    console.log(func !== undefined, typeof eval(func) === 'function');
    return (func !== undefined && typeof eval(func) === 'function') 
      ? ( params !== undefined ? eval(func)(args[value], params) : eval(func)(args[value]) )
      : args[value];
	});
};
