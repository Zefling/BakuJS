Date.prototype._monthNames = {
 	'fr' : [ 'janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre' ]
};
Date.prototype._dayNames = {
	'fr' : [ 'dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi' ]
};

/**
 * le nom du mois (suivant la langue donnée ou du navigateur)
 * @param lg lg la langue, ex : 'fr' (factuatif)
 * @return  le nom du mois
 */
Date.prototype._getMonthName = function(lg) {
	return this._monthNames[lg||navigator.language][this.getMonth()];
};

/**
 * le nom du jour de la semaine (suivant la langue donnée ou du navigateur)
 * @param lg la langue, ex : 'fr' (factuatif)
 * @return le nom du jour de la semaine
 */
Date.prototype._getDayName = function(lg) {
	return this._dayNames[lg||navigator.language][this.getDay()];
}; 

/**
 * donne le jour de l'année en prenant en compte le changement d'heure (hiver/été)
 * @return jour de l'année (0 à 365~366)
 */
Date.prototype._getDayOfYear = function () {
	var date = (new Date(this.getFullYear(), 0, 0));
	return Math.floor((this - date - (this.getUTCHours() - date.getUTCHours()) * 3.6e+6) / 8.64e+7);
};
/**
 * donne le numéro de semaine
 * @param premier premier jour de la semaine (0 = dimanche | 1 = lundi (ISO) / défaut = 1)
 * @return numéro de semaine (1 à 52~53)
 */
Date.prototype._getWeek = function (premier) {
	var premier = typeof(premier) == 'number' ? premier : 1,
	    base = 4, // jeudi
	    correction = 0,
	    
	    premierAnPre = new Date(this.getFullYear(),0,0),
	    dernierJourAn= new Date(this.getFullYear() +1,0,0),
	    jourSemaine  = (premierAnPre.getDay() + 7 + premier ) % 7;

	if (premier == 1) {
		correction = -2;
	} 
	num = Math.ceil( (this._getDayOfYear() + jourSemaine + correction) / 7)  + (jourSemaine <= base ? 0 : -1);
 
	if (num == 0) {
		num = premierAnPre._getWeek(premier);	
	} 
	else {
		var pos = (dernierJourAn._getDayOfYear() + 1 - (this._getDayOfYear() - this.getDay())) % 7;
		if (num > 52  && pos > 0 && pos < base) {
			num = 1;
		}
	}
	return num;
};

var _dateFormatters = {
	// date
	yyyy : [/(^|[^\\])yyyy/  , function (d) {return d.getFullYear()}],
	yy   : [/(^|[^\\])yy/    , function (d) {return new String(d.getFullYear()).substr(2, 2)}],
	MMMM : [/(^|[^\\])MMMM/  , function (d, lg) {return d._getMonthName(lg).replace(/(.)/g, '\\$1')}],
	MMM  : [/(^|[^\\])MMM/   , function (d, lg) {return d._getMonthName(lg).substr(0, 3).replace(/(.)/g, '\\$1')}],
	MM   : [/(^|[^\\])MM/    , function (d) {return new String(d.getMonth() + 1)._padLeft(2, '0')}],
	M    : [/(^|[^\\])M/     , function (d) {return (d.getMonth() + 1)}],
	ww   : [/(^|[^\\])ww/    , function (d) {return new String(d._getWeek())._padLeft(2, '0')}],
	w    : [/(^|[^\\])w/     , function (d) {return d._getWeek()}],
	DDD  : [/(^|[^\\])DDD/   , function (d) {return new String(d._getDayOfYear())._padLeft(2, '0')}],
	D    : [/(^|[^\\])D{1,2}/, function (d) {return d._getDayOfYear()}],
	dd   : [/(^|[^\\])dd/    , function (d) {return new String(d.getDate())._padLeft(2, '0')}],
	d    : [/(^|[^\\])d/     , function (d) {return d.getDate()}],
	F    : [/(^|[^\\])F/     , function (d) {return d.getDay()}],
	EEEE : [/(^|[^\\])EEEE/  , function (d, lg) {return d._getDayName(lg).replace(/(.)/g, '\\$1')}],
	EEE  : [/(^|[^\\])EEE/   , function (d, lg) {return d._getDayName(lg).substr(0, 3).replace(/(.)/g, '\\$1')}],
	E    : [/(^|[^\\])E/     , function (d, lg) {return d._getDayName(lg).substr(0, 1).replace(/(.)/g, '\\$1')}],

	// heure
	a    : [/(^|[^\\])a/     , function (d) {return (d.getHours() > 12 || d.getHours() === 0) ? 'PM' : 'AM'}],
	HH   : [/(^|[^\\])HH/    , function (d) {return new String(d.getHours())._padLeft(2, '0')}],
	H    : [/(^|[^\\])H/     , function (d) {return d.getHours()}],
	kk   : [/(^|[^\\])kk/    , function (d) {return new String(_dateFormatters.k[1](d))._padLeft(2, '0')}],
	k    : [/(^|[^\\])k/     , function (d) {return d.getHours() === 0 ? 24 : d.getHours()}],
	KK   : [/(^|[^\\])KK/    , function (d) {return new String(d.getHours() % 12)._padLeft(2, '0')}],
	K    : [/(^|[^\\])K/     , function (d) {return d.getHours() % 12}],
	hh   : [/(^|[^\\])hh/    , function (d) {return new String(_dateFormatters.h[1](d))._padLeft(2, '0')}],
	h    : [/(^|[^\\])h/     , function (d) {return d.getHours() > 12 ? d.getHours() % 12 : (d.getHours() === 0 ? 12 : d.getHours())}],
	mm   : [/(^|[^\\])mm/    , function (d) {return new String(d.getMinutes())._padLeft(2, '0')}],
	m    : [/(^|[^\\])m/     , function (d) {return d.getMinutes()}],
	ss   : [/(^|[^\\])ss/    , function (d) {return new Sring(d.getSeconds())._padLeft(2, '0')}],
	s    : [/(^|[^\\])s/     , function (d) {return d.getSeconds()}],
	SSS  : [/(^|[^\\])S{3,}/ , function (d) {return new String(d.getMilliseconds())._padLeft(3, '0')}],
	S    : [/(^|[^\\])S+/    , function (d) {return new String(d.getMilliseconds())}]
};


/**
 * formater la date suivant un pattern
 * @param pattern pour formater 
 * @param lg langue
 * @return la date formatée
 */
Date.prototype._toStringFormat = function (pattern, lg) {
	var reg, regex, str;
	
	// protège les doubles \
	str = pattern.replace(/\\\\/g, "[[\\\\]]");
	
	// parcours toutes les règles
	for (reg in _dateFormatters) {
		regex = _dateFormatters[reg];
		if (regex[0].test(str)) {
			str = str.replace(regex[0], "$1" + regex[1](this, lg));
		}
	}
	// dèprotection
	return str
		.replace(/\\(.)/g,      "$1")
		.replace(/\[\[\\\]\]/g, "\\");
};
