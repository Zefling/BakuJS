/**
 * formatage par pattern
 * @param pattern de formatage
 * @param dot forme du séparateur de décimales
 * @param space sparateur de millier (ou autre)
 * @param language langue de formatage
 * @return la chaine formatée
 */
Number.prototype.formatByPattern = function(pattern, dot, space, language) {
	var groupingSize = 0, 
	    decimalSize = 0, 
	    lg = lg || navigator.language; 
	
	if(!pattern) {
		// partern par défaut
		pattern = '#,###';
	}
	
	var match = pattern.match(/(#*,|)([#0]+)(?:\.(0+|#+|)|)/);
	if(match) {
		console.log(match);
		groupingSize = match[1] !== '' ? match[2].length : 0;
		decimalSize = match[3].length;
	}
	if (dot === undefined) {
		switch (lg) {
			case 'en' : dot = '.'; break;
			case 'fr' : dot = ','; break;
		}
	}
	if (space === undefined) {
		switch (lg) {
			case 'en' : space = ',';      break;
			case 'fr' : space = "\u00A0"; break;
		}
	}
	return this.format(groupingSize, decimalSize, dot, space);
}

/**
 * formatage suivant paramètre
 * @param groupingSize séparateur de lisiblité (0 = aucun)
 * @param decimalSize nombre de décimales affichées 
 * @param dot forme du séparateur de décimales
 * @param space sparateur de millier (ou autre)
 * @return la chaine formatée
 */
Number.prototype.format = function(groupingSize, decimalSize, dot, space) {
	var val = new String(this),
	    result = '',
	    valueAsStr = val.match(/(-|)(\d*)(?:.(\d*))?/);
	
	// ajoute des espaces
	var entier = groupingSize && groupingSize > 0 
	    ? valueAsStr[2].replace(new RegExp('(?=(?:\\d{' + groupingSize + '})+$)(?!^)', 'g'), space !== undefined ? space : ',') 
	    : valueAsStr[2];
	
	// formatage des décimales
	var decimal = '';
	if(decimalSize && decimalSize > 0) {
		decimal = valueAsStr[3];
		if(!decimal) {
			decimal = '0';
		}
		// si supérieur au nombre de zéro, on découpe, sinon on en ajoute à la fin
		decimal = (dot !== undefined ? dot : '.') + (decimal.length > decimalSize
		        ? decimal.substring(0, decimalSize)
		        : decimal.padRight(decimalSize, '0'));
	}
	return valueAsStr[1] + entier + decimal;
}