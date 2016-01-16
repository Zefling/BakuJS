# extJS
Quelques petites méthodes en plus, par ajout sur le prototype des objets de base :

**Date**
- <code>Date.getMonthName()</code> : nom du mois
- <code>Date.getDayName()</code>  : nom du jour de la semaine
- <code>Date.getDayOfYear()</code>  : numéro du jour de l'année
- <code>Date.getWeek()</code>  : numéro de semaine
- <code>Date.toStringFormat()</code>  : formatage de la date
 
**Number**
- <code>Number.formatByPattern()</code>  : formatage par pattern
- <code>Number.format()</code>  : formatage

**String**
- <code>String.format()</code> : formateur {0, func, params} 
- <code>String.padLeft()</code> : aggrandir une chaine par la gauche avec une chaine
- <code>String.padRight()</code> : aggrandir une chaine par la droite avec une chaine

**String : String.format() > Formatter**
- choice : {0,choice,1# an|1< ans}
- number : {0, number, #,##0}
- date :  {0,date, dd/MM/yyyy}