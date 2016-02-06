/**
 * {0,choice,1# an|1< ans}
 */ 
baku.string.formatter.choice = function (val, vals, arg) {
	var c, 
	    val = typeof(val) === 'string' ? val.trim() : val,
	    choicesRegex = /\s*([-\da-zA-Z]+)\s*(#|[><]=?)\s*((?:\\.|[^|])+)/g;
	while((c = choicesRegex.exec(arg)) !== null) {
		var test = c[1], 
		    etat = c[2], 
			result = c[3].replace('\\|', '|').trim();
		
		if((etat === "#"  && val == test) ||
		   (etat === "<=" && val <= test) ||
		   (etat === "<"  && val <  test) ||
		   (etat === ">=" && val >= test) ||
		   (etat === ">"  && val >  test)
		) {
			return result._format(vals);
		}
	} 
	return '';
};

/**
 * {0, number, #,##0}
 * @required ext.number.js
 */ 
baku.string.formatter.number = function (val, vals, arg) {
	if(arg === undefined) {
		arg = '';
	}
	else if(arg === "integer") {
		arg = "#,##0";
	}
	else if(arg.indexOf('{') > -1) {
		arg = arg._format(vals);
	}
	// get the language : #,##0:fr
	var params = {},
	    match = arg.match(/([^:]*)(?::(([a-z]{2})(-[A-Z]{2})?)|)/);
	if(match && match[2]) {
		params.lg = match[3];
		params.local = match[2];
	}
	// if is not number, transform the val in number
	if (!Number.isFinite(val)) {
		val = Number._parse(val)
	}
	return val._formatByPattern(match[1], params);
};

/**
 * {0,date, dd/MM/yyyy}
 * @required ext.date.js
 */ 
baku.string.formatter.date = function (val, vals, arg) {
	if(arg && arg.indexOf('{') > -1) {
		arg = arg._format(vals);
	}
	return arg !== undefined ? new Date(val)._toStringFormat(arg) : '';
};
