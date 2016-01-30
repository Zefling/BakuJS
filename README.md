# BakuJS
Quelques petites méthodes en plus, par ajout sur le prototype des objets de base :

## Date
- <code>Date._getMonthName()</code> : nom du mois
- <code>Date._getDayName()</code>  : nom du jour de la semaine
- <code>Date._getDayOfYear()</code>  : numéro du jour de l'année
- <code>Date._getWeek()</code>  : numéro de semaine
- <code>Date._toStringFormat()</code>  : formatage de la date

## Math
- <code>Math._roundDecimal()</code>  : arrondir à une décimale précise

## Number
- <code>Number._formatByPattern()</code>  : formatage par pattern
- <code>Number._format()</code>  : formatage

## String
- <code>String._format()</code> : formateur {0, func, params} 
- <code>String._padLeft()</code> : aggrandir une chaine par la gauche avec une chaine
- <code>String._padRight()</code> : aggrandir une chaine par la droite avec une chaine

## String : String.format() > Formatter
- choice : {0,choice,1# an|1> ans}
- number : {0, number, #,##0}
- date : {0,date, dd/MM/yyyy}

### Exemples :
```js
"Il y a {0, number, #,##0:fr} jour{0, choice,1<=|1>s}".format(1200);                 // Il y a 1 200 jours
"Il y a {jours, number, #,##0:fr} jour{jours, choice,1<=|1>s}".format({jours : 1});  // Il y a 1 jour
"Le resultat est {0, choice, 10<{1}|10>={2}}.".format([12, 'petit', 'grand']);       // Le resultat est grand.
```

## DOM

### Raccourcis
- <code>baku.dom.id = document.elementById</code>
- <code>baku.dom.first = document.querySelector</code>
- <code>baku.dom.list = document.querySelectorAll</code>
- <code>baku.dom.new = document.createElement</code>

### Aides
- <code>HTMLElement._css()</code> : ajout s'implifié de CSS sur un élement du DOM
- <code>HTMLElement._addClass()</code> : ajout s'implifié d'une classe sur un élement du DOM
- <code>HTMLElement._rmClass()</code> : ajout s'implifié d'une classe sur un élement du DOM
- <code>NodeList._css()</code> : ajout s'implifié de CSS sur une liste d'élements du DOM
- <code>NodeList._addClass()</code> : ajout s'implifié d'une classe sur une liste d'élements du DOM
- <code>NodeList._rmClass()</code> : suppression s'implifié d'une classe sur une liste d'élements du DOM

### Exemples
```js
baku.dom.list('h2 + div')
    ._css({'color' : 'red', 'text-decoration' : 'underline'})
    ._rmClass('ko');
```

## Test 
Voir la page de test : http://zefling.github.io/BakuJS/test.html