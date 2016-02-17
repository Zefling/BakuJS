# BakuJS

## Formatter

Some small functions by adding on the prototype of the base objects.
The idea is for the formatter is to approach the formatting possibilities of fmt:message in JSTL.

### Exemples :
```js
"Il y a {0, number, #,##0:fr} jour{0, choice,1<=|1>s}".format(1200);                 // Il y a 1 200 jours
"Il y a {jours, number, #,##0:fr} jour{jours, choice,1<=|1>s}".format({jours : 1});  // Il y a 1 jour
"Rendez-vous le {date, date, dd/MM/yyyy}".format({date : '2016-04-10'});             // Rendez-vous le 10/04/2016
"Le resultat est {0, choice, 10<{1}|10>={2}}.".format([12, 'petit', 'grand']);       // Le resultat est grand.
```

## DOM

Some shortcuts to avoid using a big library to do simple operations on the DOM with selectors.

### Exemples
```js
baku.dom.list('h2 + div')
    ._css({'color' : 'red', 'text-decoration' : 'underline'})
    ._rmClass('ko');
```

# Test 

See the test page: http://zefling.github.io/BakuJS/test.html

If you propose a correction or additional content, thank you to make all the tests are always ok, and/or add new.