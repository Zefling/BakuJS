/* For IE */
if (!Math.trunc) {
	Math.trunc = function(x) {
	  return x < 0 ? Math.ceil(x) : Math.floor(x);
	};
}

/**
 * rounded to the chosen decimal 
 * @param number number to round
 * @param decimalSize number of decimals after the dot
 * @return rounded number
 */
Math._roundDecimal = function(number, decimalSize) {
	return Math.round( +(number +'e'+ (decimalSize))) / +('1e'+decimalSize);
};