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

/**
 * {0,choice,1# an|1< ans}
 */ 
Formatter.choice = function (val, arg) {
	var c, 
	    val = typeof(val) === 'string' ? val.trim() : val,
	    choicesRegex = /\s*([-\da-zA-Z]+)\s*(#|[><]=?)\s*((?:\\.|[^|])+)/g;
	while((c = choicesRegex.exec(arg)) !== null) {
		var test = c[1], etat = c[2], result = c[3].replace('\\|', '|').trim();
		console.log (c);
		if((etat === "#"  && val == test) ||
		   (etat === "<=" && val <= test) ||
		   (etat === "<"  && val <  test) ||
		   (etat === ">=" && val >= test) ||
		   (etat === ">"  && val >  test)
		) {
			return result;
		}
	} 
	return '';
}

/**
 * {0, number, #,##0}
 * @required ext.number.js
 */ 
Formatter.number = function (val, arg) {
	if(arg === undefined) {
		arg = '';
	}
	else if(arg === "integer") {
		arg = "#,##0";
	}
	return val.formatByPattern(arg);
}

/**
 * {0,date, dd/MM/yyyy}
 * @required ext.date.js
 */ 
Formatter.date = function (val, arg) {
	return arg !== undefined ? new Date(val).toStringFormat(arg) : '';
}
