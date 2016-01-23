Date.prototype.monthNames = {
 	'fr' : [ 'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre' ]
};
Date.prototype.dayNames = {
	'fr' : [ 'Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi' ]
};

/**
 * le nom du mois (suivant la langue donnée ou du navigateur)
 * @param lg lg la langue, ex : 'fr' (factuatif)
 * @return  le nom du mois
 */
Date.prototype.getMonthName = function(lg) {
	return this.monthNames[lg ? lg : navigator.language][this.getMonth()];
};

/**
 * le nom du jour de la semaine (suivant la langue donnée ou du navigateur)
 * @param lg la langue, ex : 'fr' (factuatif)
 * @return le nom du jour de la semaine
 */
Date.prototype.getDayName = function(lg) {
	return this.dayNames[lg ? lg : navigator.language][this.getDay()];
}; 

/**
 * donne le jour de l'année en prenant en compte le changement d'heure (hiver/été)
 * @return jour de l'année (0 à 365~366)
 */
Date.prototype.getDayOfYear = function () {
	var date = (new Date(this.getFullYear(), 0, 0));
	return Math.floor((this - date - (this.getUTCHours() - date.getUTCHours()) * 3.6e+6) / 8.64e+7);
};
/**
 * donne le numéro de semaine
 * @param premier premier jour de la semaine (0 = dimanche | 1 = lundi / défaut = 1)
 * @param base numéro de journée maxium pour la première semaine (défaut = 4 : jeudi)
 * @return numéro de semaine (1 à 52~53)
 */
Date.prototype.getWeek = function (premier, base) {
	var premier = typeof(premier) == 'number' ? premier : 1,
	    base = typeof(base) == 'number' ? base : 4,
	    correction = 0,
	    
	    premierAnPre = new Date(this.getFullYear(),0,0),
	    dernierJourAn= new Date(this.getFullYear() +1,0,0),
	    jourSemaine  = (premierAnPre.getDay() + 7 + premier ) % 7;

	if (premier == 1) {
		correction = -2;
	} 
	num = Math.ceil( (this.getDayOfYear() + jourSemaine + correction) / 7)  + (jourSemaine <= base ? 0 : -1);
 
	if (num == 0) {
		num = premierAnPre.getWeek(premier, base);	
	} 
	else {
		var pos = (dernierJourAn.getDayOfYear() + 1 - (this.getDayOfYear() - this.getDay())) % 7;
		if (num > 52  && pos > 0 && pos < base) {
			num = 1;
		}
	}
	return num;
};

/**
 * formater la date suivant un pattern
 * @param pattern pour formater 
 * @param lg langue
 * @return la date formatée
 */
Date.prototype.toStringFormat = function (pattern, lg) {
	var nm = this.getMonthName(lg),
	    nd = this.getDayName(lg),
	    k  = this.getHours() === 0 ? 24 : this.getHours(),
	    h  = this.getHours() > 12 ? this.getHours() % 12 : (this.getHours() === 0 ? 12 : this.getHours());
		
	return pattern
	
		.replace(/\\\\/g,           "[[\\\\]]")
		// date
		.replace(/(^|[^\\]|)yyyy/g, "$1" + this.getFullYear())
		.replace(/(^|[^\\])yy/g,    "$1" + String(this.getFullYear()).substr(2, 2))
		.replace(/(^|[^\\])M{3,}/g, "$1" + nm.substr(0, 3))
		.replace(/(^|[^\\])MM/g,    "$1" + String(this.getMonth() + 1).padLeft(2, '0'))
		.replace(/(^|[^\\])M/g,     "$1" + (this.getMonth() + 1))
		.replace(/(^|[^\\])ww/g,    "$1" + String(this.getWeek()).padLeft(2, '0'))
		.replace(/(^|[^\\])w/g,     "$1" + this.getWeek())
		.replace(/(^|[^\\])DDD/g,   "$1" + String(this.getDayOfYear()).padLeft(2, '0'))
		.replace(/(^|[^\\])D{1,2}/g,"$1" + this.getDayOfYear())
		.replace(/(^|[^\\])dd/g,    "$1" + String(this.getDate()).padLeft(2, '0'))
		.replace(/(^|[^\\])d/g,     "$1" + this.getDate())
		.replace(/(^|[^\\])F/g,     "$1" + this.getDay())
		.replace(/(^|[^\\])E{4,}/g, "$1" + nd)
		.replace(/(^|[^\\])E+/g,    "$1" + nd.substr(0, 3))

		// heure
		.replace(/(^|[^\\])a/g,     "$1" + this.getHours() > 12 | this.getHours() === 0 ? 'PM' : 'AM')
		.replace(/(^|[^\\])HH/g,    "$1" + String(this.getHours()).padLeft(2, '0'))
		.replace(/(^|[^\\])H/g,     "$1" + this.getHours())
		.replace(/(^|[^\\])kk/g,    "$1" + String(k).padLeft(2, '0'))
		.replace(/(^|[^\\])k/g,     "$1" + k)
		.replace(/(^|[^\\])KK/g,    "$1" + String(this.getHours() % 12).padLeft(2, '0'))
		.replace(/(^|[^\\])K/g,     "$1" + this.getHours() % 12)
		.replace(/(^|[^\\])hh/g,    "$1" + String(h).padLeft(2, '0'))
		.replace(/(^|[^\\])h/g,     "$1" + h)
		.replace(/(^|[^\\])mm/g,    "$1" + String(this.getMinutes()).padLeft(2, '0'))
		.replace(/(^|[^\\])m/g,     "$1" + this.getMinutes())
		.replace(/(^|[^\\])ss/g,    "$1" + String(this.getSeconds()).padLeft(2, '0'))
		.replace(/(^|[^\\])s/g,     "$1" + this.getSeconds())
		.replace(/(^|[^\\])S{3,}/g, "$1" + String(this.getMilliseconds()).padLeft(3, '0'))
		.replace(/(^|[^\\])S+/g,    "$1" + String(this.getMilliseconds()))
		
		.replace(/\\(.)/g,          "$1")
		.replace(/\[\[\\\]\]/g,   "\\");
}
