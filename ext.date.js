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
 * @param lg lg la langue, ex : 'fr' (factuatif)
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
 * @param premier premier jour de la semaine (0 = dimanche, 1 = lundi, etc. / défaut = 1)
 * @param base numéro de journée maxium pour la première semaine (défaut = 4 : jeudi)
 * @return numéro de semaine (1 à 52~53)
 */
Date.prototype.getWeek = function (premier = 1, base = 4) {
	premier = typeof(premier) == 'int' ? premier : 1;
	base = typeof(base) == 'int' ? base : 4;
 
	var premierAnPre = new Date(this.getFullYear(),0,0);
	var dernierAn    = new Date(this.getFullYear() +1,0,0);
	var jourSemaine  = (premierAnPre.getDay() + 7 + premier ) % 7; 
 
	var num = Math.ceil( (this.getDayOfYear() + jourSemaine) / 7)  + (jourSemaine <= base ? 0 : -1);
 
	if (num == 0) {
		num = premierAnPre.getWeek(premier, base);	
	} 
	else if (num >= 52 && (dernierAn.getDayOfYear() - this.getDayOfYear())  <=  base 
			&& (dernierAn.getDay() + 7 + premier ) % 7 <= base) {
		num = 1;
	}
 
	return num;
};
 
