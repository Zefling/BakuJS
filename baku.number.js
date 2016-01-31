/**
 * formatage par pattern
 * @param pattern de formatage (défaut : '#,###')
 * @param params params
 *   - dot : forme du séparateur de décimales (défaut : rien)
 *   - space : sparateur de millier (ou autre) (défaut : rien)
 *   - lg : langue de formatage (défaut : langue du navigateur)
 * @return la chaine formatée
 */
Number.prototype._formatByPattern = function(pattern, params) {
	var params = typeof(params) === 'object' ? params : {},
		format = {
			groupingSize : 0,
			zeroDigitSize : 0,
			decimalSize : 0, 
			decimalZeroSize : 0,
			unit : undefined,
			dot : params.dot,
			space : params.space
		},
		lg = params.lg || navigator.language;
	
	if(!pattern) {
		// partern by default
		pattern = '#,###';
	}
	
	var match = pattern.match(/\s*(?:((?:[#,]*)(?:[0,]*))(?:(?:\.([0 ]*#*))|))((?:\s*\%)|)\s*$/);
	if(match && match[0] === pattern) {
		var number  = match[1],
		    decimal = match[2] ? match[2].replace(/\s/, '').match(/^(0*)#*/) : null;
		format.unit = match[3];
		
		// digit grouping
		format.groupingSize  = number.match(/,?([#]*[0]*)$/)[1].length;
		format.zeroDigitSize = number.match(/[,0]*$/)[0].replace(/,/g, '').length;
		// decimal
		if (decimal) {
			format.decimalSize     = decimal[0].length;
			format.decimalZeroSize = decimal[1].length;
		}
	}
	else {
		throw 'patten error : '+pattern;
	}
	if (format.dot === undefined) {
		format.dot = baku.lg(lg ,'number.dot');
	}
	if (format.space === undefined) {
		format.space = baku.lg(lg, 'number.space');
	}
	return this._format(format);
};

/**
 * formatage suivant paramètre
 * @param format 
 * - groupingSize : séparateur de lisiblité (0 = aucun)
 * - zeroDigitSize : nombre de chiffres minimums
 * - decimalSize : nombre de décimales affichées 
 * - decimalZeroSize : nombre de chiffres minimums en décimal
 * - dot : forme du séparateur de décimales (défaut : '.')
 * - space : spérateur de millier (ou autre) (défaut : '')
 * - unit : rien ou %
 * @return la chaine formatée
 */
Number.prototype._format = function(format) {
	var val = this,
	    valueAsStr,
	    format = !format ? {} : format,
	    unit = format.unit||'',
	    decimalSize = format.decimalSize > 0 ? format.decimalSize : 0;
		
	if (unit.trim() === '%') {
		val = val * 100;
	}
	
	valueAsStr = new String(Math._roundDecimal(val, decimalSize)).match(/(-|)(\d*)(?:.(\d*))?/);
	if (format.zeroDigitSize > 0) {
		valueAsStr[2] = valueAsStr[2]._padLeft(format.zeroDigitSize, '0');
	}	
	// ajoute des espaces
	var entier = format.space !== undefined && format.groupingSize && format.groupingSize > 0 
		? valueAsStr[2].replace(new RegExp('(?=(?:\\d{' + format.groupingSize + '})+$)(?!^)', 'g'), format.space) 
		: valueAsStr[2];
	
	// formatage des décimales
	var decimal = '';
	if(format.decimalSize > 0) {
		decimal = (valueAsStr[3]||'0').substring(0, format.decimalSize);
		if (decimal === '0') {
			decimal = '';
		}
		if (format.decimalZeroSize > 0) {
			decimal = decimal._padRight(format.decimalZeroSize, '0');
		}
		if (decimal !== '') {
			decimal = (format.dot||'.') + decimal;
		}
	}
	return valueAsStr[1] + entier + decimal + unit;
};
