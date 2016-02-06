/**
 * the name of mount (depending on given or browser language)
 * @param lg the language, ex.: 'fr' (optional: default = navigator.language)
 * @return the name of month
 */
Date.prototype._getMonthName = function(lg) {
	return baku.lg(lg||navigator.language, 'monthNames.' + this.getMonth());
};

/**
 * the name of weekday (depending on given or browser language)
 * @param lg the language, ex.: 'fr' (optional: default = navigator.language)
 * @return le nom du jour de la semaine
 */
Date.prototype._getDayName = function(lg) {
	return baku.lg(lg||navigator.language, 'dayNames.' +this.getDay());
}; 

/**
 * the day of the year, taking into consideration the daylight saving time (winter/summer)
 * @return the day of the year (0 to 365~366)
 */
Date.prototype._getDayOfYear = function () {
	var date = (new Date(this.getFullYear(), 0, 0));
	return Math.floor((this - date - (this.getUTCHours() - date.getUTCHours()) * 3.6e+6) / 8.64e+7);
};
/**
 * the week number
 * @param first first day of the week (0 = Sunday | 1 = Monday (ISO)) (optional: default = 1)
 * @return week number (1 to 52~53)
 */
Date.prototype._getWeek = function (first) {
	var first = typeof(first) === 'number' ? first : 1,
	    base = 4, // Thursday
	    correction = 0,
	    firstDayYear = new Date(this.getFullYear(),0,0),
	    lastDayYear = new Date(this.getFullYear() +1,0,0),
	    weekDay = (firstDayYear.getDay() + 7 + first ) % 7;

	if (first === 1) {
		correction = -2;
	} 
	num = Math.ceil( (this._getDayOfYear() + weekDay + correction) / 7)  + (weekDay <= base ? 0 : -1);
 
	if (num === 0) {
		num = firstDayYear._getWeek(first);	
	} 
	else {
		var pos = (lastDayYear._getDayOfYear() + 1 - (this._getDayOfYear() - this.getDay())) % 7;
		if (num > 52  && pos > 0 && pos < base) {
			num = 1;
		}
	}
	return num;
};

/** rules of date formatters */
var _dateFormatters = {
	// date
	yyyy : [/(^|[^\\])yyyy/  , function (d) {return d.getFullYear();}],
	yy   : [/(^|[^\\])yy/    , function (d) {return new String(d.getFullYear()).substr(2, 2);}],
	MMMM : [/(^|[^\\])MMMM/  , function (d, lg) {return d._getMonthName(lg).replace(/(.)/g, '\\$1');}],
	MMM  : [/(^|[^\\])MMM/   , function (d, lg) {return d._getMonthName(lg).substr(0, 3).replace(/(.)/g, '\\$1');}],
	MM   : [/(^|[^\\])MM/    , function (d) {return new String(d.getMonth() + 1)._padLeft(2, '0');}],
	M    : [/(^|[^\\])M/     , function (d) {return (d.getMonth() + 1);}],
	ww   : [/(^|[^\\])ww/    , function (d) {return new String(d._getWeek())._padLeft(2, '0');}],
	w    : [/(^|[^\\])w/     , function (d) {return d._getWeek();}],
	DDD  : [/(^|[^\\])DDD/   , function (d) {return new String(d._getDayOfYear())._padLeft(2, '0');}],
	D    : [/(^|[^\\])D{1,2}/, function (d) {return d._getDayOfYear();}],
	dd   : [/(^|[^\\])dd/    , function (d) {return new String(d.getDate())._padLeft(2, '0');}],
	d    : [/(^|[^\\])d/     , function (d) {return d.getDate();}],
	F    : [/(^|[^\\])F/     , function (d) {return d.getDay();}],
	EEEE : [/(^|[^\\])EEEE/  , function (d, lg) {return d._getDayName(lg).replace(/(.)/g, '\\$1');}],
	EEE  : [/(^|[^\\])EEE/   , function (d, lg) {return d._getDayName(lg).substr(0, 3).replace(/(.)/g, '\\$1');}],
	E    : [/(^|[^\\])E/     , function (d, lg) {return d._getDayName(lg).substr(0, 1).replace(/(.)/g, '\\$1');}],

	// hour
	a    : [/(^|[^\\])a/     , function (d) {return (d.getHours() > 12 || d.getHours() === 0) ? 'PM' : 'AM';}],
	HH   : [/(^|[^\\])HH/    , function (d) {return new String(d.getHours())._padLeft(2, '0');}],
	H    : [/(^|[^\\])H/     , function (d) {return d.getHours();}],
	kk   : [/(^|[^\\])kk/    , function (d) {return new String(_dateFormatters.k[1](d))._padLeft(2, '0');}],
	k    : [/(^|[^\\])k/     , function (d) {return d.getHours() === 0 ? 24 : d.getHours();}],
	KK   : [/(^|[^\\])KK/    , function (d) {return new String(d.getHours() % 12)._padLeft(2, '0');}],
	K    : [/(^|[^\\])K/     , function (d) {return d.getHours() % 12;}],
	hh   : [/(^|[^\\])hh/    , function (d) {return new String(_dateFormatters.h[1](d))._padLeft(2, '0');}],
	h    : [/(^|[^\\])h/     , function (d) {return d.getHours() > 12 ? d.getHours() % 12 : (d.getHours() === 0 ? 12 : d.getHours());}],
	mm   : [/(^|[^\\])mm/    , function (d) {return new String(d.getMinutes())._padLeft(2, '0');}],
	m    : [/(^|[^\\])m/     , function (d) {return d.getMinutes();}],
	ss   : [/(^|[^\\])ss/    , function (d) {return new String(d.getSeconds())._padLeft(2, '0');}],
	s    : [/(^|[^\\])s/     , function (d) {return d.getSeconds();}],
	SSS  : [/(^|[^\\])S{3,}/ , function (d) {return new String(d.getMilliseconds())._padLeft(3, '0');}],
	S    : [/(^|[^\\])S+/    , function (d) {return new String(d.getMilliseconds());}]
};

/**
 * format the date according to a pattern
 * @param pattern pattern to format
 * @param lg language (optional: default = navigator.language)
 * @return formatted date
 */
Date.prototype._toStringFormat = function (pattern, lg) {
	var reg, regex, 
	    str = pattern.replace(/\\\\/g, "[[\\\\]]");  // protects double \
	
	// loop all the rules
	for (reg in _dateFormatters) {
		regex = _dateFormatters[reg];
		if (regex[0].test(str)) {
			str = str.replace(regex[0], "$1" + regex[1](this, lg));
		}
	}
	
	// unprotect
	return str
		.replace(/\\(.)/g,      "$1")
		.replace(/\[\[\\\]\]/g, "\\");
};
