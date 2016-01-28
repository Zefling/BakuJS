var baku = document;
baku._id = document.elementById;
baku._first = document.querySelector;
baku._list = document.querySelectorAll;
baku._new = document.createElement;
baku._frag = document.createDocumentFragment;

var DomArray = function() {}; 
for(key in Array.prototype) { 
	DomArray.prototype[key] = Array.prototype[key];
}

/**
 * test if it's a string
 * @param s object test
 * @return true is s is a string object
 */
function isString(s) {
    return typeof(s) === 'string' || s instanceof String;
}

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
 * ajout d'une classe sur un élement
 * @param name nom de classe ou une liste de classes
 * @return l'élement
 */
HTMLElement.prototype._addClass = function (classes) {
	if (isString(classes)) {
		classes = classes.split(/\s+/);
	}
	for (var i in classes) {
		this.classList.add(classes[i]);
	}
	return this;
};

/** 
 * supprime d'une classe sur un élement
 * @param name nom de classe ou une liste de classes
 * @return l'élement
 */
HTMLElement.prototype._rmClass  = function (classes) {
	if (isString(classes)) {
		classes = classes.split(/\s+/);
	}
	for (var i in classes) {
		this.classList.remove(classes[i].trim());
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
DomArray.prototype._css = function (name, value) {
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
DomArray.prototype._addClass = function (name) {
	for (var i in this) {
		if (this[i] instanceof HTMLElement) {
			this[i]._addClass(name);
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
DomArray.prototype._rmClass  = function (name) {
	for (var i in this) {
		if (this[i] instanceof HTMLElement) {
			this[i]._rmClass(name);
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
DomArray.prototype._first = function (selector) {
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
DomArray.prototype._list = function (selector) {
	var e, k = 0, list = new DomArray();
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


