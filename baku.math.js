 

/**
 * arrondi à la décimale choisie
 * @param number nombre à arrondir
 * @param decimalSize nombre de chiffres après la virgule
 * @return la chaine formatée
 */
Math._roundDecimal = function(number, decimalSize) {
	var pow = Math.pow(10, decimalSize);
	return Math.round(number * pow) / pow;
}	