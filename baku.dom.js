baku.dom  = {
	/**
	 * get a element by id ( id="xxx" )
	 * @param id the id element
	 * @return HTMLElement
	 */
	'id' : function (id) { return document.elementById(id) },
	/**
	 * get a element by name ( name="xxx" )
	 * @param name the name element
	 * @return HTMLElement
	 */
	'name' : function (name) { return document.elementByName(name) },
	/**
	 * get all elements that containts all classes list in params ( class="xxx yyy" )
	 * @param classes class list (separete with space)
	 * @return NodeList
	 */
	'class' : function (classes) { return document.elementByClassName(classes) },
	/**
	 * get all elements that respect a selector
	 * @param selector CSS selector
	 * @return HTMLElement
	 */
	'first' : function (selector) { return document.querySelector(selector) },
	/**
	 * get all elements that respect a selector
	 * @param selector CSS selector
	 * @return NodeList
	 */
	'list' : function (selector) { return  document.querySelectorAll(selector) },
	/**
	 * create a element
	 * @param name name element
	 * @return HTMLElement
	 */
	'new' : function (name) { return document.createElement(name) },
	/**
	 * create de dument fragment
	 * @param name name element
	 * @return DOM fragment
	 */
	'frag' : function (name) { return document.createDocumentFragment(name) }
};

// copy Array object in DomArray
var DomArray = function() {}; 
for(var key in Array.prototype) { 
	DomArray.prototype[key] = Array.prototype[key];
}

/**
 * add a style on the element. 
 * @get if value === undefined
 * @set if value !== undefined || name is a object
 * @param name style name or a style list {'name' : 'value'}
 * @param value value of style (optional)
 * @return a value if @get, 'this' if @set
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
 * add one or more classes on the element
 * @param name name of class or a liste of classe. Ex. "class1 class2"
 * @return the element
 */
HTMLElement.prototype._addClass = function (classes) {
	if (baku.isString(classes)) {
		classes = classes.split(/\s+/);
	}
	for (var i in classes) {
		this.classList.add(classes[i]);
	}
	return this;
};

/** 
 * remove one or more classes on element
 * @param name name of class or a liste of classe. Ex. "class1 class2"
 * @return the element
 */
HTMLElement.prototype._rmClass  = function (classes) {
	if (baku.isString(classes)) {
		classes = classes.split(/\s+/);
	}
	for (var i in classes) {
		this.classList.remove(classes[i].trim());
	}
	return this;
};

/**
 * add a style on elements list. 
 * @get if value === undefined
 * @set if value !== undefined || name is a object
 * @param name style name or a style list {'name' : 'value'}
 * @param value value of style (optional)
 * @return the list
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
 * add one or more classes on the element list
 * @param name name of class or a liste of classe. Ex. "class1 class2"
 * @return the list
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
 * remove one or more classes on the element list
 * @param name name of class or a liste of classe. Ex. "class1 class2"
 * @return the list
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
 * use a selector on a list element and return the first found
 * @param selector CSS selector
 * @return the list
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
 * use a selector on a list element and return the list found
 * @param selector CSS selector
 * @return the list
 */
NodeList.prototype._list = 
DomArray.prototype._list = function (selector) {
	var e, i, j, list = new DomArray();
	for (i in this) {
		if (this[i] instanceof HTMLElement) {
			e = this[i].querySelectorAll(selector);
			if (e.length > 0) {
				for(j in e) {
					if (e[j] instanceof HTMLElement) {
						list[list.length] = e[j];
					}
				}
			}
		}
	}
	return list;
};


