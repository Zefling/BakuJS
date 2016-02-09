baku.number = {
	/** default pattern for formatting */
	formatDefautPattern :'#,###',
	
	/**
	 * parse the number formatter pattern
	 * @param pattern formatter pattern (default: '#,###')
	 * @return formatted string number
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
			unit            : unit
		};
	}
};


/**
 * formatage par pattern
 * @param pattern formatter pattern (default: '#,###')
 * @param params params
 *   - dot   : symbol of decimal separator (default: empty)
 *   - space : symbol of grouping digit separator (default: empty)
 *   - lg    : defaults parameters defind by the language (défaut : langue du navigateur)
 * @return formatted string number
 */
Number.prototype._formatByPattern = function(pattern, params) {
	var params = typeof(params) === 'object' ? params : {},
	    format = baku.number.parse(pattern || baku.number.formatDefautPattern),
	    lg     = params.lg || navigator.language;
		
	format.dot   = params.dot   || baku.lg(lg ,'number.dot');
	format.space = params.space || baku.lg(lg, 'number.space');	
	
	return this._format(format);
};

/**
 * formatage suivant paramètre
 * @param format 
 *   - groupingSize    : grouping digit size (0 <= not)
 *   - zeroDigitSize   : minimum number of digits
 *   - decimalSize     : number of decimal displayed
 *   - decimalZeroSize : number of minimum digits in decimal
 *   - dot             : symbol of decimal separator (default: '.')
 *   - space           : symbol of grouping digit separator (default: '')
 *   - unit            : nothing or % (% → val×100, ex.: 1.5 → 150%)
 *   - lg              : defaults parameters defind by the language (only if language is defined)
 * @return la chaine formatée
 */
Number.prototype._format = function(format) {
	var val = this,
		lg  = format.lg,
	    valueAsStr,
	    format      = !format ? {} : format,
	    unit        = format.unit  || '',
	    decimalSize = Math.max(0, format.decimalSize) | 0,
	    groupingSize= Number.isFinite(format.groupingSize) ? Math.max(0, format.groupingSize) : (lg ? baku.lg(lg, 'number.groupingSize') : 3),
	    dot         = format.dot   || (lg ? baku.lg(lg, 'number.dot') : '.'),
	    space       = format.space || (lg ? baku.lg(lg, 'number.space') : ''),
	    zeroDigitSize   = format.zeroDigitSize | 0,
	    decimalZeroSize = format.decimalZeroSize | 0;
		
	if (unit.trim() === '%') {
		val = val * 100;
	}
	// parsing : number & decimal separation
	valueAsStr = new String(Math._roundDecimal(val, decimalSize)).match(/(-|)(\d*)(?:.(\d*))?/);
	if (zeroDigitSize > 0) {
		valueAsStr[2] = valueAsStr[2]._padLeft(zeroDigitSize, '0');
	}	
	// groupinp separator
	var entier = space !== undefined && groupingSize && groupingSize > 0 
	    ? valueAsStr[2].replace(new RegExp('(?=(?:\\d{' + groupingSize + '})+$)(?!^)', 'g'), space) 
	    : valueAsStr[2];
	
	// decimal formating
	var decimal = '';
	if(decimalSize > 0) {
		decimal = (valueAsStr[3]||'0').substring(0, decimalSize);
		if (decimal === '0') {
			decimal = '';
		}
		
		if (decimalZeroSize > 0) {
			decimal = decimal._padRight(decimalZeroSize, '0');
		}
		if (decimal !== '') {
			decimal = (dot||'.') + decimal;
		}
	}
	return valueAsStr[1] + entier + decimal + unit;
};

/**
 * parse a number into string:
 * - if the string contains no numeric, it will return an error. 
 * - if it contains a digital, it will extract the numerical first part. For ex.: 'a1b2c' become 1.
 * @param format
 *   - dot   : decimal separator (default: empty)
 *   - space : digit grouping separator (ou autre) (default: empty)
 *   - lg    : defaults parameters defind by the language (default: web browser language)
 * @return a number
 */
Number._parse = function (string, params) {
	var number,
	    params = typeof(params) === 'object' ? params : {}, 
	    lg    = params.lg    || navigator.language,
	    dot   = RegExp._toRegexString(params.dot   || baku.lg(lg, 'number.dot')),
	    space = RegExp._toRegexString(params.space || baku.lg(lg, 'number.space')),
	    match = string.match(new RegExp('-?(\\d*((' + space + ')\\d*)*\\d)((' + dot + ')(\\d*))?', 'g') );
	if (match[0]) {
		number = +(match[0].replace(new RegExp(space, 'g'), '').replace(new RegExp(dot), '.'));
	}
	else {
		throw 'parsing error: '+string;
	}
	
	return number;
};

/** 
 * test if the value is a finite number
 * @param value testing value
 * @return true if a finite number
 */
if (!Number.isFinite) {
	Number.isFinite = function(value) {
	    return typeof value === "number" && isFinite(value);
	}
}
