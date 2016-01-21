var baku = document;
baku._id = document.elementById;
baku._first = document.querySelector;
baku._list = document.querySelectorAll;
baku._new = document.createElement;
baku._frag = document.createDocumentFragment;



/**
 * ajout d'un style sur un élement. 
 * @get si value === undefined
 * @set si value !== undefined || name est un object
 * @param name nom du style ou liste de style {'nom' : 'valeur'}
 * @param value valeur du style (facultatif)
 * @return valeur pour @get, this pour @set
 */
HTMLElement.prototype._css = function (name, value) {
	if (typeof(name) !== 'object' && value === undefined) {
		if (this.style[name]) {
			return this.style[name];
		}
	} else {
		var styles = {};
		if (value === undefined) {
			styles = name;
		} else {
			styles[name] = value;
		}
		for(var key in styles) {
			if (this.style[key] !== undefined) {
				this.style[key] = styles[key];
			}
		}
	}
	return this;
};

/**
 * set les styles sur une liste d'élements
 * @param name nom du style
 * @param value valeur du style
 * @return valeur ou undefined si non trouvée
 */
NodeList.prototype._css =
Array.prototype._css = function (name, value) {
	for (var i in this) {
		if (this[i] instanceof HTMLElement) {
		    this[i]._css(name, value);
		}
	}
	return this;
};

/** 
 * ajout d'une classe sur une liste d'élements
 * @param name nom de classe
 * @return la liste
 */
NodeList.prototype._addClass = 
Array.prototype._addClass = function (name) {
	for (var i in this) {
		if (this[i] instanceof HTMLElement) {
			this[i].classList.add(name);
		}
	}
	return this;
};

/**
 * supprime d'une classe sur une liste d'élements
 * @param name nom de classe
 * @return la liste
 */
NodeList.prototype._rmClass = 
Array.prototype._rmClass  = function (name) {
	for (var i in this) {
		if (this[i] instanceof HTMLElement) {
			this[i].classList.remove(name);
		}
	}
	return this;
};

/**
 * utilise le selector sur tout les élements de la liste et retour le premier
 * @param selector nom de classe
 * @return element
 */
NodeList.prototype._first = 
Array.prototype._first = function (selector) {
	var e = new HTMLElement();
	for (var i in this) {
		if (this[i] instanceof HTMLElement && (e = this[i].querySelector(selector)) !== undefined) {
			break;
		}
	}
	return e;
};

/**
 * utilise le selector sur tout les élements de la liste et retourne une liste
 * @param selector nom de classe
 * @return la liste
 */
NodeList.prototype._list = 
Array.prototype._list = function (selector) {
	var e, k = 0, list = new Array();
	for (var i in this) {
		if (this[i] instanceof HTMLElement) {
			e = this[i].querySelectorAll(selector);
			if (e.length > 0) {
				for(var j in e) {
					if (e[j] instanceof HTMLElement) {
						list[list.length] = e[j];
					}
				}
			}
		}
	}
	return list;
};


