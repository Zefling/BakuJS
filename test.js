var Test = {};
Test.title = function (title) {
	var b = document.createElement("h2");
	b.textContent = title;
	document.body.appendChild(b);
};
Test.equals = function (test, equals, message) {
	var result, ok, time1, time2, b = document.createElement("div");
	try {
		time1 = performance.now(); 
		result = eval(test);
		time2 = performance.now();
		ok = result == equals;
	}
	catch (e) {
		ok = false;
	}
	b.classList.add(ok ? 'ok' : 'ko');
	b.title = message + (ok ? ' #ok' : ' #ko : "' + result + '" != "' + equals + '"' ) +  ' (' + (Math.round((time2 - time1) * 10000) / 10000).formatByPattern('#,###.000') + 'ms)';
	document.body.appendChild(b);
	
};
Test.error = function (test) {
	var ok = false, message = 'valide ?', diff = performance.now() - this.time, b = document.createElement("div");
	try {
		time1 = performance.now(); 
		result = eval(test);
		time2 = performance.now();
	}
	catch (e) {
		time2 = performance.now();
		ok = true;
		message = e;
	}
	b.classList.add(ok ? 'ok' : 'ko');
	b.title = test + (ok ? ' #ko : ' + message : ' #ok : "' + result + '"' ) +  ' (' + (Math.round((time2 - time1) * 10000) / 10000).formatByPattern('#,###.000') + 'ms)';
	document.body.appendChild(b);
};

// ----------------------------------------------------------------------------------

window.onload = function(){
	
	Test.title("Date.getWeek()");
	Test.equals("new Date('2013-12-21').getWeek()", 51,'week : 2013-12-21 → 51'); 
	Test.equals("new Date('2013-12-22').getWeek()", 51,'week : 2013-12-22 → 51'); 
	Test.equals("new Date('2013-12-23').getWeek()", 52,'week : 2013-12-23 → 52'); 
	Test.equals("new Date('2013-12-24').getWeek()", 52,'week : 2013-12-24 → 52'); 
	Test.equals("new Date('2013-12-25').getWeek()", 52,'week : 2013-12-25 → 52'); 
	Test.equals("new Date('2013-12-26').getWeek()", 52,'week : 2013-12-26 → 52'); 
	Test.equals("new Date('2013-12-27').getWeek()", 52,'week : 2013-12-27 → 52'); 
	Test.equals("new Date('2013-12-28').getWeek()", 52,'week : 2013-12-28 → 52'); 
	Test.equals("new Date('2013-12-29').getWeek()", 52,'week : 2013-12-29 → 52'); 
	Test.equals("new Date('2013-12-30').getWeek()", 1, 'week : 2013-12-30 → 1'); 
	Test.equals("new Date('2013-12-31').getWeek()", 1, 'week : 2013-12-31 → 1'); 
	Test.equals("new Date('2014-01-01').getWeek()", 1, 'week : 2014-01-01 → 1'); 
	Test.equals("new Date('2014-01-02').getWeek()", 1, 'week : 2014-01-02 → 1'); 
	Test.equals("new Date('2014-01-03').getWeek()", 1, 'week : 2014-01-03 → 1'); 
	Test.equals("new Date('2014-01-04').getWeek()", 1, 'week : 2014-01-04 → 1'); 
	Test.equals("new Date('2014-01-05').getWeek()", 1, 'week : 2014-01-05 → 1'); 
	Test.equals("new Date('2014-01-06').getWeek()", 2, 'week : 2014-01-06 → 2'); 
	Test.equals("new Date('2014-01-07').getWeek()", 2, 'week : 2014-01-07 → 2'); 
	Test.equals("new Date('2014-01-08').getWeek()", 2, 'week : 2014-01-08 → 2'); 
	Test.equals("new Date('2014-01-09').getWeek()", 2, 'week : 2014-01-09 → 2'); 
	Test.equals("new Date('2014-01-10').getWeek()", 2, 'week : 2014-01-10 → 2');
	Test.equals("new Date('2014-01-11').getWeek()", 2, 'week : 2014-01-11 → 2');
	Test.equals("new Date('2014-01-12').getWeek()", 2, 'week : 2014-01-12 → 2');
	Test.equals("new Date('2014-01-13').getWeek()", 3, 'week : 2014-01-13 → 3');
	Test.equals("new Date('2014-01-14').getWeek()", 3, 'week : 2014-01-14 → 3');
	Test.equals("new Date('2014-01-15').getWeek()", 3, 'week : 2014-01-15 → 3');
	Test.equals("new Date('2014-12-21').getWeek()", 51,'week : 2014-12-21 → 51'); 
	Test.equals("new Date('2014-12-22').getWeek()", 52,'week : 2014-12-22 → 52'); 
	Test.equals("new Date('2014-12-23').getWeek()", 52,'week : 2014-12-23 → 52'); 
	Test.equals("new Date('2014-12-24').getWeek()", 52,'week : 2014-12-24 → 52'); 
	Test.equals("new Date('2014-12-25').getWeek()", 52,'week : 2014-12-25 → 52'); 
	Test.equals("new Date('2014-12-26').getWeek()", 52,'week : 2014-12-26 → 52'); 
	Test.equals("new Date('2014-12-27').getWeek()", 52,'week : 2014-12-27 → 52'); 
	Test.equals("new Date('2014-12-28').getWeek()", 52,'week : 2014-12-28 → 52'); 
	Test.equals("new Date('2014-12-29').getWeek()", 1, 'week : 2014-12-29 → 1'); 
	Test.equals("new Date('2014-12-30').getWeek()", 1, 'week : 2014-12-30 → 1'); 
	Test.equals("new Date('2014-12-31').getWeek()", 1, 'week : 2014-12-31 → 1'); 
	Test.equals("new Date('2015-01-01').getWeek()", 1, 'week : 2015-01-01 → 1'); 
	Test.equals("new Date('2015-01-02').getWeek()", 1, 'week : 2015-01-02 → 1'); 
	Test.equals("new Date('2015-01-03').getWeek()", 1, 'week : 2015-01-03 → 1'); 
	Test.equals("new Date('2015-01-04').getWeek()", 1, 'week : 2015-01-04 → 1'); 
	Test.equals("new Date('2015-01-05').getWeek()", 2, 'week : 2015-01-05 → 2'); 
	Test.equals("new Date('2015-01-06').getWeek()", 2, 'week : 2015-01-06 → 2'); 
	Test.equals("new Date('2015-01-07').getWeek()", 2, 'week : 2015-01-07 → 2'); 
	Test.equals("new Date('2015-01-08').getWeek()", 2, 'week : 2015-01-08 → 2'); 
	Test.equals("new Date('2015-01-09').getWeek()", 2, 'week : 2015-01-09 → 2'); 
	Test.equals("new Date('2015-01-10').getWeek()", 2, 'week : 2015-01-10 → 2');
	Test.equals("new Date('2015-01-11').getWeek()", 2, 'week : 2015-01-11 → 2');
	Test.equals("new Date('2015-01-12').getWeek()", 3, 'week : 2015-01-12 → 3');
	Test.equals("new Date('2015-01-13').getWeek()", 3, 'week : 2015-01-13 → 3');
	Test.equals("new Date('2015-01-14').getWeek()", 3, 'week : 2015-01-14 → 3');
	Test.equals("new Date('2015-01-15').getWeek()", 3, 'week : 2015-01-15 → 3');
	Test.equals("new Date('2015-12-20').getWeek()", 51,'week : 2015-12-20 → 51');
	Test.equals("new Date('2015-12-21').getWeek()", 52,'week : 2015-12-21 → 52'); 
	Test.equals("new Date('2015-12-22').getWeek()", 52,'week : 2015-12-22 → 52'); 
	Test.equals("new Date('2015-12-23').getWeek()", 52,'week : 2015-12-23 → 52'); 
	Test.equals("new Date('2015-12-24').getWeek()", 52,'week : 2015-12-24 → 52'); 
	Test.equals("new Date('2015-12-25').getWeek()", 52,'week : 2015-12-25 → 52'); 
	Test.equals("new Date('2015-12-26').getWeek()", 52,'week : 2015-12-26 → 52'); 
	Test.equals("new Date('2015-12-27').getWeek()", 52,'week : 2015-12-27 → 52');
	Test.equals("new Date('2015-12-28').getWeek()", 53,'week : 2015-12-28 → 53'); 
	Test.equals("new Date('2015-12-29').getWeek()", 53,'week : 2015-12-29 → 53'); 
	Test.equals("new Date('2015-12-30').getWeek()", 53,'week : 2015-12-30 → 53'); 
	Test.equals("new Date('2015-12-31').getWeek()", 53,'week : 2015-12-31 → 53'); 
	Test.equals("new Date('2016-01-01').getWeek()", 53,'week : 2016-01-01 → 53'); 
	Test.equals("new Date('2016-01-02').getWeek()", 53,'week : 2016-01-02 → 53'); 
	Test.equals("new Date('2016-01-03').getWeek()", 53,'week : 2016-01-03 → 53'); 
	Test.equals("new Date('2016-01-04').getWeek()", 1, 'week : 2016-01-04 → 1'); 
	Test.equals("new Date('2016-01-05').getWeek()", 1, 'week : 2016-01-05 → 1'); 
	Test.equals("new Date('2016-01-06').getWeek()", 1, 'week : 2016-01-06 → 1'); 
	Test.equals("new Date('2016-01-07').getWeek()", 1, 'week : 2016-01-07 → 1'); 
	Test.equals("new Date('2016-01-08').getWeek()", 1, 'week : 2016-01-08 → 1'); 
	Test.equals("new Date('2016-01-09').getWeek()", 1, 'week : 2016-01-09 → 1'); 
	Test.equals("new Date('2016-01-10').getWeek()", 1, 'week : 2016-01-10 → 1');
	Test.equals("new Date('2016-01-11').getWeek()", 2, 'week : 2016-01-11 → 2');
	Test.equals("new Date('2016-01-12').getWeek()", 2, 'week : 2016-01-12 → 2');
	Test.equals("new Date('2016-01-13').getWeek()", 2, 'week : 2016-01-13 → 2');
	Test.equals("new Date('2016-01-14').getWeek()", 2, 'week : 2016-01-14 → 2');
	Test.equals("new Date('2016-01-15').getWeek()", 2, 'week : 2016-01-15 → 2');
	Test.equals("new Date('2017-12-31').getWeek()", 52,'week : 2017-12-31 → 52'); 
	Test.equals("new Date('2018-01-01').getWeek()", 1, 'week : 2018-01-01 → 1'); 
	Test.equals("new Date('2018-12-31').getWeek()", 1, 'week : 2017-12-31 → 1'); 
	Test.equals("new Date('2019-01-01').getWeek()", 1, 'week : 2018-01-01 → 1'); 
		
	Test.equals("new Date('2015-01-01').getWeek(0)", 1, 'week : 2015-01-01 → 1'); 
	Test.equals("new Date('2015-01-02').getWeek(0)", 1, 'week : 2015-01-02 → 1'); 
	Test.equals("new Date('2015-01-03').getWeek(0)", 1, 'week : 2015-01-03 → 1'); 
	Test.equals("new Date('2015-01-04').getWeek(0)", 2, 'week : 2015-01-04 → 1'); 
	Test.equals("new Date('2015-01-05').getWeek(0)", 2, 'week : 2015-01-05 → 2'); 
	Test.equals("new Date('2015-01-06').getWeek(0)", 2, 'week : 2015-01-06 → 2'); 	
	Test.equals("new Date('2016-01-01').getWeek(0)", 1, 'week : 2016-01-01 → 53'); 
	Test.equals("new Date('2016-01-02').getWeek(0)", 1, 'week : 2016-01-02 → 53'); 
	Test.equals("new Date('2016-01-03').getWeek(0)", 2, 'week : 2016-01-03 → 53'); 
	Test.equals("new Date('2016-01-04').getWeek(0)", 2, 'week : 2016-01-04 → 1'); 

	Test.title("Number.formatByPattern()");
	Test.equals("new Number(1).formatByPattern('#,###',    {lg : 'fr'})", '1', '1 + #,### → 1');
	Test.equals("new Number(1).formatByPattern('#,##0',    {lg : 'fr'})", '1', '1 + #,##0 → 1');
	Test.equals("new Number(1).formatByPattern('#,#00',    {lg : 'fr'})", '01', '1 + #,#00 → 01');
	Test.equals("new Number(1).formatByPattern('#,###.0',  {lg : 'fr'})", '1,0',  '1 + #,###.0 → 1,0');
	Test.equals("new Number(1).formatByPattern('#,###.00', {lg : 'fr'})", '1,00', '1 + #,###.000 → 1,00');
	Test.equals("new Number(1).formatByPattern('#,###.0',  {lg : 'en'})", '1.0',  '1 + #,### → 1.0');
	Test.equals("new Number(1).formatByPattern('#,###.00', {lg : 'en'})", '1.00', '1 + #,### → 1.00');
	Test.equals("new Number(1).formatByPattern('#,###.##', {lg : 'en'})", '1', '1 + #,### → 1');
	Test.equals("new Number(1.1).formatByPattern('#,###.##', {lg : 'en'})", '1.1', '1 + #,### → 1.1');
	Test.equals("new Number(1000   ).formatByPattern('#,###',    {lg : 'fr'})", '1\u00A0000', '1000 + #,### → 1\u00A0000');
	Test.equals("new Number(1000000).formatByPattern('#,###',    {lg : 'fr'})", '1\u00A0000\u00A0000', '1000000 + #,### → 1\u00A0000\u00A0000');
	Test.equals("new Number(1000   ).formatByPattern('#,####',   {lg : 'fr'})", '1000', '1000 + #,### → 1000');
	Test.equals("new Number(1000000).formatByPattern('#,####',   {lg : 'fr'})", '100\u00A00000', '1000000 + #,### → 100\u00A00000');
	Test.equals("new Number(123456789.987654321).formatByPattern('#,###.00',   {lg : 'en'})", '123,456,789.98', '123456789.987654321 + #,###.00 → 123,456,789.98');
	Test.equals("new Number(123456789.987654321).formatByPattern('#,###.##', {lg : 'en'})", '123,456,789.98', '123456789.987654321 + #,###.## → 123,456,789.98');
	Test.equals("new Number(123.123).formatByPattern('0000.00',   {lg : 'fr'})", '0123,12',   '123.123 + #,### → 0123,12');
	Test.equals("new Number(123.123).formatByPattern('0000.0###', {lg : 'fr'})", '0123,123',  '123.123 + #,### → 0123,123');
	Test.equals("new Number(123.123).formatByPattern('0000.0000', {lg : 'fr'})", '0123,1230', '123.123 + #,### → 0123,1230');
	Test.equals("new Number(123.103).formatByPattern('0000.##',   {lg : 'fr'})", '0123,1',    '123.103 + #,### → 0123,1');
	Test.equals("new Number(123.103).formatByPattern('#000.##',   {lg : 'fr'})", '123,1',     '123.103 + #,### → 123,1');
	Test.equals("new Number(123.103).formatByPattern('00,000,000.00',{lg : 'en'})", '00,000,123.10', '123.103 + 00,000,000.00 → 00,000,123.10');
	Test.equals("new Number(123.103).formatByPattern('00000,000.00', {lg : 'en'})", '00,000,123.10', '123.103 + 00000,000.00 → 00,000,123.10');
	Test.equals("new Number(123.103).formatByPattern('#0,000.00',    {lg : 'en'})", '0,123.10',      '123.103 + #0,000.00 → 0,123.10');
	Test.equals("new Number(1325123.103456).formatByPattern('0,00,000.000 00',  {lg : 'en'})", '1,325,123.10346', '1325123.103456 + #0,000.00 → 1,325,123.10346');
	Test.error("new Number(123.103).formatByPattern('0#000.##',  {lg : 'fr'})");
	Test.error("new Number(123.103).formatByPattern('0000.#0',   {lg : 'fr'})");
	Test.error("new Number(123.103).formatByPattern('0000.#0#',  {lg : 'fr'})");
	
	Test.title("String.padLeft()");
	Test.equals("'1'.padLeft(1,  '.')",            '1',             "1 + left(1, '') → 1");
	Test.equals("'1'.padLeft(2,  '.')",            '.1',            "1 + left(1, '.') → .1");
	Test.equals("'1'.padLeft(10, '.')",            '.........1',    "1 + left(10, '.') → ........1");
	Test.equals("'1'.padLeft(2,  'ABCD')",         'D1',            "1 + left(2, 'ABCD') → C1");
	Test.equals("'1'.padLeft(10, 'ABCD')",         'DABCDABCD1',    "1 + left(10, 'ABCD') → DABCDABCD1");
	Test.equals("'1'.padLeft(2,  'ABCD', 'l')",    'C1',            "1 + left(2, 'ABCD, 'l'') → C1");
	Test.equals("'1'.padLeft(10, 'ABCD', 'l')",    'CDABCDABC1',    "1 + left(10, 'ABCD', 'l') → CDABCDABC1");
	Test.equals("'1'.padLeft(2,  'ABCD', 'r')",    'A1',            "1 + left(2, 'ABCD', 'r') → A1");
	Test.equals("'1'.padLeft(10, 'ABCD', 'r')",    'ABCDABCDA1',    "1 + left(10, 'ABCD', 'r') → ABCDABCDA1");
	Test.equals("'12'.padLeft(1, '.')",            '12',            "12 + left(1, '') → 12");
	Test.equals("'12'.padLeft(4, '.')",            '..12',          "12 + left(4, '.') → ..12");
	Test.equals("'12'.padLeft(10,'.')",            '........12',    "12 + left(10, '.') → .......12");
	Test.equals("'12'.padLeft(4, 'ABCD')",         'CD12',          "12 + left(4, 'ABCD') → CD12");
	Test.equals("'12'.padLeft(10,'ABCD')",         'ABCDABCD12',    "12 + left(10, 'ABCD') → ABCDABCD12");
	Test.equals("'12'.padLeft(4, 'ABCD', 'l')",    'AB12',          "12 + left(4, 'ABCD'', 'l') → AB12");
	Test.equals("'12'.padLeft(10,'ABCD', 'l')",    'CDABCDAB12',    "12 + left(10, 'ABCD'', 'l') → CDABCDAB12");
	Test.equals("'12'.padLeft(4, 'ABCD', 'r')",    'AB12',          "12 + left(4, 'ABCD'', 'r') → AB12");
	Test.equals("'12'.padLeft(10,'ABCD', 'r')",    'ABCDABCD12',    "12 + left(10, 'ABCD'', 'r') → ABCDABCD12");
	Test.equals("'12345'.padLeft(4, 'ABCD')",      '12345',         "12345 + left(4, 'ABCD') → 12345");
	Test.equals("'12345'.padLeft(6, 'ABCD')",      'D12345',        "12345 + left(6, 'ABCD') → D12345");
	Test.equals("'12345'.padLeft(10,'ABCD')",      'DABCD12345',    "12345 + left(10, 'ABCD') → DABCD12345");
	
	Test.title("String.padRight()");	
	Test.equals("'1'.padRight(1, '.')",            '1',              "1 + right(1, '') → 1");
	Test.equals("'1'.padRight(2, '.')",            '1.',             "1 + right(1, '.') → 1.");
	Test.equals("'1'.padRight(10, '.')",           '1.........',     "1 + right(10, '.') → 1........");
	Test.equals("'1'.padRight(2, 'ABCD')",         '1A',             "1 + left(2, 'ABCD') → 1A");
	Test.equals("'1'.padRight(10, 'ABCD')",        '1ABCDABCDA',     "1 + right(10, 'ABCD') → 1ABCDABCDA");
	Test.equals("'1'.padRight(2, 'ABCD', 'r')",    '1B',             "1 + left(2, 'ABCD', 'r') → 1B");
	Test.equals("'1'.padRight(10, 'ABCD', 'r')",   '1BCDABCDAB',     "1 + right(10, 'ABCD', 'r') → 1BCDABCDAB");
	Test.equals("'1'.padRight(2, 'ABCD', 'l')",    '1D',             "1 + left(2, 'ABCD', 'l') → 1D");
	Test.equals("'1'.padRight(10, 'ABCD', 'l')",   '1DABCDABCD',     "1 + right(10, 'ABCD', 'l') → 1DABCDABCD");
	Test.equals("'12345'.padRight(4, 'ABCD')",     '12345',          "12345 + left(4, 'ABCD') → 12345");
	Test.equals("'12345'.padRight(6, 'ABCD')",     '12345A',         "12345 + left(6, 'ABCD') → 12345A");
	Test.equals("'12345'.padRight(10,'ABCD')",     '12345ABCDA',     "12345 + left(10, 'ABCD') → 12345ABCDA");
	Test.equals("'12345'.padRight(6, 'ABCD', 'r')",'12345B',         "12345 + left(6, 'ABCD', 'r') → 12345B");
	Test.equals("'12345'.padRight(10,'ABCD', 'r')",'12345BCDAB',     "12345 + left(10, 'ABCD', 'r') → 12345BCDAB");
	Test.equals("'12345'.padRight(6, 'ABCD', 'l')",'12345D',         "12345 + left(6, 'ABCD', 'l') → 12345D");
	Test.equals("'12345'.padRight(10,'ABCD', 'l')",'12345DABCD',     "12345 + left(10, 'ABCD', 'l') → 12345DABCD");
	
	Test.title("String.format()");
	Test.equals("'a'.format(1)",                 'a',     '1 + a → a');
	Test.equals("'{0}'.format(1)",               '1',     '1 + {0} → 1');
	Test.equals("'a{0}'.format(1)",              'a1',    '1 + a{0} → a1');
	Test.equals("'{0}b'.format(1)",              '1b',    '1 + {0}b → 1b');
	Test.equals("'a{0}b'.format(1)",             'a1b',   '1 + a{0}b → a1b');
	Test.equals("'a{0}b'.format(1)",             'a1b',   '1 + a{0}b → a1b');
	Test.equals("'{0}{0}{0}'.format(1)",         '111',   '1 + {0}{0}{0} → 111');
	Test.equals("'a{0}b{0}c'.format(1)",         'a1b1c', '1 + a{0}b{0}c → a1b1c');
	Test.equals("'{0}\\\\{0\\\\}{0}'.format(1)", '1{0}1', '1 + {0}\\{0\\}{0} → 1{0}1');
	Test.error("'{0}\\\\{0}{0}'.format(1)");
	Test.error("'{0}{0\\\\}{0}'.format(1)");
	Test.error("'{0}{0,}{0}'.format(1)");
	
	Test.title("String.format() + number");
	Test.equals("'{0, number, #,###}'.format(1)",             '1',             '1 + {0, number, #,###} → 1');
	Test.equals("'{0, number, #,###:fr}'.format([1000.10])",  '1\u00A0000',    '[1000.10] + {0, number, #,###:fr} → 1\u00A0000');
	Test.equals("'{0, number, #,###.00:fr}'.format(1000.10)", '1\u00A0000,10', '1000.10 + {0, number, #,###.00:fr} → 1\u00A0000,00');
	Test.equals("'{0, number, #,###.00:en}'.format(1000.10)", '1,000.10',      '1000.10 + {0, number, #,###.00:en} → 1,000.10');
	Test.equals("'{0, number, {1}}'.format([1, '#,###.00:fr'])",'1,00',        '[1, #,###.00:fr] + {0, number, {1}} → 1,00');
	
	Test.title("String.format() + choice");
	Test.equals("'{0, choice, 1# true|2# false}'.format(1)",             'true',      '1 + {0, choice, 1# true|2# false} → true');
	Test.equals("'{0, choice, 1# true\\\\|true|2# false}'.format(1)",      'true|true', '1 + {0, choice, 1# true\\|true|2# false} → true|true');
	Test.equals("'{0, choice, 1# false|2# true}'.format(2)",             'true',      '2 + {0, choice, 1# false|2# true} → true');
	Test.equals("'{0, choice, 1# false|2# true}'.format([2])",           'true',      '[2] + {0, choice,  1# false|2# true} → true');
	Test.equals("'{0, choice, this# true|other false}'.format(['this'])",'true',          '[\'get\'] + {0, choice, get# true|other false} → true');
	Test.equals("'{val, choice, this# true|other false}'.format({val : 'this'})",  'true', '{val : \'this\'} + {val, choice, get# true|other false} → true');
	Test.equals("'{val, choice, this# \\\\{1\\\\}|other#\\\\{0\\\\}}'.format({val : 'this'})", '{1}',  '{val : \'this\'} + {val, choice, this# \\{1\\}|other#\\{0\\}} → true');
	Test.equals("'{0, choice, 1#{1}|2#{2}}'.format([1, 2, 3])",        '2',          '[1, 2, 3] + {0, choice, 1#{1}|2#{2}} → 2');
	
	Test.title("String.format() + date");
	Test.equals("'{0, date, d/M/yy}'.format('2015-02-08')",     '8/2/15',     '2015-02-08 + {0, date, d/M/yy} → 8/2/15');
	Test.equals("'{0, date, dd/MM/yyyy}'.format('2015-10-20')", '20/10/2015', '2015-10-20 + {0, date, dd/MM/yyyy} → 20/10/2015');
	Test.equals("'{0, date, w-yyyy}'.format('2015-10-20')",     '43-2015',    '2015-10-20 + {0, date, w-yyyy} → 43-2015');
	Test.equals("'{0, date, \\\\w\\\\e\\\\e\\\\kw\\\\\\\\yyyy}'.format('2015-10-20')", 'week43\\2015', '2015-10-20 + {0, date, \\w\\e\\e\\kw\\\\yyyy} → week43\\2015');
	Test.equals("'{0, date, {1}}'.format(['2015-10-20', 'dd/MM/yyyy'])",   '20/10/2015',          '[2015-10-20, dd/MM/yyyy] + {0, date, {1}} → 20/10/2015');
	
}
