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

var Test = {};
Test.title = function (title) {
	var b = document.createElement("h2");
	b.textContent = title;
	document.body.appendChild(b);
};
Test.equal = function (value, equal, message) {
	var b = document.createElement("div"), ok = value == equal;
	b.classList.add(ok ? 'ok' : 'ko');
	b.title = message + (ok ? ' #ok' : ' #ko : "' + value + '" != "' + equal + '"');
	document.body.appendChild(b);
};

// ----------------------------------------------------------------------------------

window.onload = function(){
	
	Test.title("Date.getWeek()");
	Test.equal(new Date('2014-01-01').getWeek(), 1, 'week : 2014-01-01 → 1'); 
	Test.equal(new Date('2014-01-02').getWeek(), 1, 'week : 2014-01-02 → 1'); 
	Test.equal(new Date('2014-01-03').getWeek(), 1, 'week : 2014-01-03 → 1'); 
	Test.equal(new Date('2014-01-04').getWeek(), 1, 'week : 2014-01-04 → 1'); 
	Test.equal(new Date('2014-01-05').getWeek(), 1, 'week : 2014-01-05 → 1'); 
	Test.equal(new Date('2014-01-06').getWeek(), 2, 'week : 2014-01-06 → 2'); 
	Test.equal(new Date('2014-01-07').getWeek(), 2, 'week : 2014-01-07 → 2'); 
	Test.equal(new Date('2014-01-08').getWeek(), 2, 'week : 2014-01-08 → 2'); 
	Test.equal(new Date('2014-01-09').getWeek(), 2, 'week : 2014-01-09 → 2'); 
	Test.equal(new Date('2014-01-10').getWeek(), 2, 'week : 2014-01-10 → 2');
	Test.equal(new Date('2014-01-11').getWeek(), 2, 'week : 2014-01-11 → 2');
	Test.equal(new Date('2014-01-12').getWeek(), 2, 'week : 2014-01-12 → 2');
	Test.equal(new Date('2014-01-13').getWeek(), 3, 'week : 2014-01-13 → 3');
	Test.equal(new Date('2014-01-14').getWeek(), 3, 'week : 2014-01-14 → 3');
	Test.equal(new Date('2014-01-15').getWeek(), 3, 'week : 2014-01-15 → 3');
	Test.equal(new Date('2015-01-01').getWeek(), 1, 'week : 2015-01-01 → 1'); 
	Test.equal(new Date('2015-01-02').getWeek(), 1, 'week : 2015-01-02 → 1'); 
	Test.equal(new Date('2015-01-03').getWeek(), 1, 'week : 2015-01-03 → 1'); 
	Test.equal(new Date('2015-01-04').getWeek(), 1, 'week : 2015-01-04 → 1'); 
	Test.equal(new Date('2015-01-05').getWeek(), 2, 'week : 2015-01-05 → 2'); 
	Test.equal(new Date('2015-01-06').getWeek(), 2, 'week : 2015-01-06 → 2'); 
	Test.equal(new Date('2015-01-07').getWeek(), 2, 'week : 2015-01-07 → 2'); 
	Test.equal(new Date('2015-01-08').getWeek(), 2, 'week : 2015-01-08 → 2'); 
	Test.equal(new Date('2015-01-09').getWeek(), 2, 'week : 2015-01-09 → 2'); 
	Test.equal(new Date('2015-01-10').getWeek(), 2, 'week : 2015-01-10 → 2');
	Test.equal(new Date('2015-01-11').getWeek(), 2, 'week : 2015-01-11 → 2');
	Test.equal(new Date('2015-01-12').getWeek(), 3, 'week : 2015-01-12 → 3');
	Test.equal(new Date('2015-01-13').getWeek(), 3, 'week : 2015-01-13 → 3');
	Test.equal(new Date('2015-01-14').getWeek(), 3, 'week : 2015-01-14 → 3');
	Test.equal(new Date('2015-01-15').getWeek(), 3, 'week : 2015-01-15 → 3');
	Test.equal(new Date('2016-01-01').getWeek(), 53,'week : 2016-01-01 → 53'); 
	Test.equal(new Date('2016-01-02').getWeek(), 53,'week : 2016-01-02 → 53'); 
	Test.equal(new Date('2016-01-03').getWeek(), 53,'week : 2016-01-03 → 53'); 
	Test.equal(new Date('2016-01-04').getWeek(), 1, 'week : 2016-01-04 → 1'); 
	Test.equal(new Date('2016-01-05').getWeek(), 1, 'week : 2016-01-05 → 1'); 
	Test.equal(new Date('2016-01-06').getWeek(), 1, 'week : 2016-01-06 → 1'); 
	Test.equal(new Date('2016-01-07').getWeek(), 1, 'week : 2016-01-07 → 1'); 
	Test.equal(new Date('2016-01-08').getWeek(), 1, 'week : 2016-01-08 → 1'); 
	Test.equal(new Date('2016-01-09').getWeek(), 1, 'week : 2016-01-09 → 1'); 
	Test.equal(new Date('2016-01-10').getWeek(), 1, 'week : 2016-01-10 → 1');
	Test.equal(new Date('2016-01-11').getWeek(), 2, 'week : 2016-01-11 → 2');
	Test.equal(new Date('2016-01-12').getWeek(), 2, 'week : 2016-01-12 → 2');
	Test.equal(new Date('2016-01-13').getWeek(), 2, 'week : 2016-01-13 → 2');
	Test.equal(new Date('2016-01-14').getWeek(), 2, 'week : 2016-01-14 → 2');
	Test.equal(new Date('2016-01-15').getWeek(), 2, 'week : 2016-01-15 → 2');

	Test.title("Number.formatByPattern()");
	Test.equal(new Number(1).formatByPattern('#,###',    {lg : 'fr'}), '1', '1 + #,### → 1');
	Test.equal(new Number(1).formatByPattern('#,##0',    {lg : 'fr'}), '1', '1 + #,##0 → 1');
	Test.equal(new Number(1).formatByPattern('#,#00',    {lg : 'fr'}), '1', '1 + #,#00 → 1');
	Test.equal(new Number(1).formatByPattern('#,###.0',  {lg : 'fr'}), '1,0',  '1 + #,###.0 → 1,0');
	Test.equal(new Number(1).formatByPattern('#,###.00', {lg : 'fr'}), '1,00', '1 + #,###.000 → 1,00');
	Test.equal(new Number(1).formatByPattern('#,###.0',  {lg : 'en'}), '1.0',  '1 + #,### → 1.0');
	Test.equal(new Number(1).formatByPattern('#,###.00', {lg : 'en'}), '1.00', '1 + #,### → 1.00');
	Test.equal(new Number(1000   ).formatByPattern('#,###',    {lg : 'fr'}), '1\u00A0000', '1000 + #,### → 1\u00A0000');
	Test.equal(new Number(1000000).formatByPattern('#,###',    {lg : 'fr'}), '1\u00A0000\u00A0000', '1000000 + #,### → 1\u00A0000\u00A0000');
	Test.equal(new Number(1000   ).formatByPattern('#,####',   {lg : 'fr'}), '1000', '1000 + #,### → 1000');
	Test.equal(new Number(1000000).formatByPattern('#,####',   {lg : 'fr'}), '100\u00A00000', '1000000 + #,### → 100\u00A00000');
	Test.equal(new Number(123456789.987654321).formatByPattern('#,###.00',   {lg : 'en'}), '123,456,789.98', '123456789.987654321 + #,###.00 → 123,456,789.98');
	
	//Test.equal('A {0, choice, 1# test\\|1|2# 2} B'.format(1));
}