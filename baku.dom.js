var baku = document;
baku.id = document.elementById;
baku.first = document.querySelector;
baku.list = document.querySelectorAll;


/**
 * ajout d'un style sur un élement. 
 * @get si value === undefined
 * @set si value !== undefined || name est un object
 * @param name nom du style ou liste de style {'nom' : 'valeur'}
 * @param value valeur du style (facultatif)
 * @return valeur pour @get, this pour @set
 */
HTMLElement.prototype.css = function (name, value) {
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
NodeList.prototype.css = function (name, value) {
	for (var i in this) {
		if (this[i] instanceof HTMLElement) {
		    this[i].css(name, value);
		}
	}
	return this;
};

/** 
 * ajout d'une classe sur une liste d'élements
 * @param name nom de classe
 * @return la liste
 */
NodeList.prototype.addClass = function (name) {
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
NodeList.prototype.removeClass = function (name) {
	for (var i in this) {
		if (this[i] instanceof HTMLElement) {
			this[i].classList.remove(name);
		}
	}
	return this;
};
