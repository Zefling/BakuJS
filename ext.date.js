

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
 
