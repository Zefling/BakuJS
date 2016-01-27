 

/**
 * arrondi à la décimale choisie
 * @param number nombre à arrondir
 * @param decimalSize nombre de chiffres après la virgule
 * @return la chaine formatée
 */
Math._roundDecimal = function(number, decimalSize) {
	return Math.round( +(number +'e'+ (decimalSize))) / +('1e'+decimalSize);
}	