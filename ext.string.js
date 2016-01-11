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
 * @params liste d'arguments, array ou object
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
