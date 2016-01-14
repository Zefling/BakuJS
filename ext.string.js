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

/** formateur (object avec des fonctions : "func(mixed value):string" ou "func(mixed value, string params):string"   */
var Formater = {};


/**
 * formatage par function et paramètres :
 * - {key, function, params}
 * les functions sont des méthodes de Formater
 * @param liste d'arguments, array ou object
 * @return string
 */
String.prototype.format = function (){
	var args = arguments;
	if (typeof args[0] === 'array' || typeof args[0] === 'object') {
		args = args[0];
	}  
	return this.replace(/{\s*([^,}]+)\s*(?:,\s*([^,}]+)\s*)?(?:,\s*((?:\\.|[^}])+)\s*)?}/g, function (base, value, func, params) {
		return (func !== undefined && typeof Formater[func] === 'function')  
			? ( params !== undefined ? Formater[func](args[value], params.replace('\\}', '}')) : Formater[func](args[value]) )
			: args[value];
	});
};

/**
 * ajout d'une chaine répété au début jusqu'à la longeur désirée
 * @param n taille de chaîne désirée
 * @param str chaîne à répété (par la fin)
 * @return chaîne modifiée
 */
String.prototype.padLeft = function(n, str) {
	 if (!n || n <= 0 || this.length >= n || str === undefined) {
		return this;
	 } else {
		 var adding = n - this.length;
		 var size = Math.trunc(adding / str.length + 1);
		 var cut =  str.length - (adding % str.length); 
		 return str.substring(cut, str.length) + Array(size).join(str || ' ') + this;
	 }
}; 

/**
 * ajout d'une chaine répété à la fin jusqu'à la longeur désirée
 * @param n taille de chaîne désirée
 * @param str chaîne à répété (par le début)
 * @return chaîne modifiée
 */
String.prototype.padRight = function(n, str) {
	 if (!n || n <= 0 || this.length >= n || str === undefined) {
		return this;
	 } else {
		 var adding = n - this.length;
		 var size = Math.trunc(adding / str.length + 1);
		 var cut =  adding % str.length; 
		 return this + Array(size).join(str || ' ') + str.substring(0, cut);
	 }
}; 
