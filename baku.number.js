baku.number = {
	/** défaut pattern for formatting */
	formatDefautPattern :'#,###',
	
	/**
	 * parse the number formatter pattern
	 * @param pattern formatter pattern (default: '#,###')
	 * @param params params
	 *   - dot   : decimal separator (default: empty)
	 *   - space : digit grouping separator (ou autre) (défaut: empty)
	 *   - lg    : formatage languga (defaut: web browser language)
	 * @return la chaine formatée
	 */
	parse : function (pattern) {
		var groupingSize    = 0,
		    zeroDigitSize   = 0,
		    decimalSize     = 0, 
		    decimalZeroSize = 0,
		    match           = pattern.match(/\s*(?:((?:[#,]*)(?:[0,]*))(?:(?:\.([0 ]*#*))|))((?:\s*\%)|)\s*$/),
		    unit;
		
		if(match && match[0] === pattern) {
			var number  = match[1],
			    decimal = match[2] ? match[2].replace(/\s/, '').match(/^(0*)#*/) : null;
			unit = match[3];
			
			// digit grouping
			groupingSize  = number.match(/,?([#]*[0]*)$/)[1].length;
			zeroDigitSize = number.match(/[,0]*$/)[0].replace(/,/g, '').length;
			// decimal
			if (decimal) {
				decimalSize     = decimal[0].length;
				decimalZeroSize = decimal[1].length;
			}
		}
		else {
			throw 'patten error: '+pattern;
		}
		return {
			groupingSize    : groupingSize,
			zeroDigitSize   : zeroDigitSize,
			decimalSize     : decimalSize, 
			decimalZeroSize : decimalZeroSize,
			unit            : unit,
		};
	}
};


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
	    format = baku.number.parse(pattern || baku.number.formatDefautPattern),
	    lg     = params.lg || navigator.language;
	format.dot = params.dot || baku.lg(lg ,'number.dot');
	format.space = params.space || baku.lg(lg, 'number.space');	
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

/**
 * parse a string for extract a number (if possible)
 * @param format
 *   - dot   : decimal separator (default: empty)
 *   - space : digit grouping separator (ou autre) (défaut: empty)
 *   - lg    : formatage languga (defaut: web browser language)
 * @return a number
 */
Number._parse = function (string, params) {
	var number,
	    params = typeof(params) === 'object' ? params : {}, 
	    lg    = params.lg    || navigator.language,
	    dot   = params.dot   || baku.lg(lg, 'number.dot'),
	    space = params.space || baku.lg(lg, 'number.space'),
	    match = string.match(new RegExp('(\\d*((' + space + ')\\d*)*\\d)((' + dot + ')(\\d*))?', 'g') );
	
	if (match[0]) {
		number = +(match[0].replace(new RegExp(space, 'g'), '').replace(dot, '.'));
	}
	else {
		throw 'parsing error: '+string;
	}
	
	return number;
};
