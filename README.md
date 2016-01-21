# BakuJS
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

_Exemples :_
```js
"Il y a {0, number, #,##0:fr} jour{0, choice,1<=|1>s}".format(1200);                 // Il y a 1 200 jours
"Il y a {jours, number, #,##0:fr} jour{jours, choice,1<=|1>s}".format({jours : 1});  // Il y a 1 jour
```

**DOM**

_Raccourcis :_
- <code>baku.id = document.elementById</code>
- <code>baku.first = document.querySelector</code>
- <code>baku.list = document.querySelectorAll</code>

_Aides :_
- <code>HTMLElement.css()</code> : ajout s'implifié de CSS sur un élement du DOM
- <code>NodeList.css()</code> : ajout s'implifié de CSS sur une liste d'élements du DOM
- <code>NodeList.addClass()</code> : ajout s'implifié d'une classe sur une liste d'élements du DOM
- <code>NodeList.removeClass()</code> : suppression s'implifié d'une classe sur une liste d'élements du DOM

_Exemples :_
```js
baku.list('h2 + div')
    .css({'color' : 'red', 'text-decoration' : 'underline'})
    .removeClass('ko');
```
