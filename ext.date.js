/*
 * Copyright (c) 2016 - Zéfling (Célian Veyssière)
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */
 
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
	    dernierAn    = new Date(this.getFullYear() +1,0,0),
	    jourSemaine  = (premierAnPre.getDay() + 7 + premier ) % 7;

	if (premier == 1) {
		correction = -2;
	} else if (premier === 0) {
		correction = -1;
	}   
	num = Math.ceil( (this.getDayOfYear() + jourSemaine + correction) / 7)  + (jourSemaine <= base ? 0 : -1);
 
	if (num == 0) {
		num = premierAnPre.getWeek(premier, base);	
	} 
	else if (
		num >= 52 
		&& (dernierAn.getDayOfYear() - this.getDayOfYear()) <=  base 
		&& (dernierAn.getDay() + 7 + premier ) % 7 <= base
	) {
		num = 1;
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
	
		// date
		.replace(/yyyy/g, this.getFullYear())
		.replace(/yy/g, String(this.getFullYear()).substr(2, 2))
		.replace(/M{3,}/g, nm.substr(0, 3))
		.replace(/MM/g, String(this.getMonth() + 1).padLeft(2, '0'))
		.replace(/ww/g, String(this.getWeek()).padLeft(2, '0'))
		.replace(/w/g, this.getWeek())
		.replace(/DDD/g, String(this.getDayOfYear()).padLeft(2, '0'))
		.replace(/D{1,2}/g, this.getDayOfYear())
		.replace(/dd/g, String(this.getDate()).padLeft(2, '0'))
		.replace(/d/g, this.getDate())
		.replace(/F/g, this.getDay())
		.replace(/E{4,}/g, nd)
		.replace(/E+/g, nd.substr(0, 3))

		// heure
		.replace(/a/g, this.getHours() > 12 | this.getHours() === 0 ? 'PM' : 'AM')
		.replace(/HH/g, String(this.getHours()).padLeft(2, '0'))
		.replace(/H/g, this.getHours())
		.replace(/kk/g, String(k).padLeft(2, '0'))
		.replace(/k/g, k)
		.replace(/KK/g, String(this.getHours() % 12).padLeft(2, '0'))
		.replace(/K/g, this.getHours() % 12)
		.replace(/hh/g, String(h).padLeft(2, '0'))
		.replace(/h/g, h)
		.replace(/mm/g, String(this.getMinutes()).padLeft(2, '0'))
		.replace(/m/g, this.getMinutes())
		.replace(/ss/g, String(this.getSeconds()).padLeft(2, '0'))
		.replace(/s/g, this.getSeconds())
		.replace(/S{3,}/g, String(this.getMilliseconds()).padLeft(3, '0'))
		.replace(/S+/g, String(this.getMilliseconds()));
}
