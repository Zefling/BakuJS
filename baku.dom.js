baku.dom  = {
	/**
	 * get a element by id ( id="xxx" )
	 * @param id the id element
	 * @return HTMLElement
	 */
	'id' : function (id) { return document.getElementById(id) },
	/**
	 * get a elements by name ( name="xxx" )
	 * @param name the name element
	 * @return HTMLElement
	 */
	'name' : function (name) { return document.getElementsByName(name) },
	/**
	 * get all elements that containts all classes list in params ( class="xxx yyy" )
	 * @param classes class list (separete with space)
	 * @return NodeList
	 */
	'class' : function (classes) { return document.getElementsByClassName(classes) },
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
	 * create fragment document
	 * @param name name element
	 * @return DOM fragment
	 */
	'frag' : function (name) { return document.createDocumentFragment(name) },
	/**
	 * create de text element
	 * @param text text
	 * @return DOM text
	 */
	'text' : function (text) { return document.createTextNode(text) }
};

// copy Array object in DomArray
var DomArray = function() {}; 
for(var key in Array.prototype) { 
	DomArray.prototype[key] = Array.prototype[key];
}


/**
 * add a value on object of element. 
 * @get if value === undefined
 * @set if value !== undefined || name is a object
 * @param attr attr name 
 * @param secure true is index exist, false for creation
 * @param name index or a list {'name' : 'value'}
 * @param value value (optional)
 * @return a value if @get, 'this' if @set
 */
Element.prototype._getInAttrObject = function (attr, secure, name, value) {
	var list = this[attr];
	if (!list) {
		throw "It is not possible: " + attr + " not found.";
	}
	if (typeof(name) !== 'object' && value === undefined) {
		if (attr === 'attributes') {
			this.getAttribute(key);
		} else if (list[name]) {
			return list[name];
		}
	} else {
		var attrs = {};
		if (value === undefined) {
			attrs = name;
		} else {
			attrs[name] = value;
		}
		for(var key in attrs) {
			if (attr === 'attributes') {
				this.setAttribute(key, attrs[key]);
			} else if (!secure || secure && list[key] !== undefined) {
				list[key] = attrs[key];
			}
		}
	}
	return this;
};

/**
 * set or get a style on the element. 
 * @get if value === undefined
 * @set if value !== undefined || name is a object
 * @param name style name or a style list {'name' : 'value'}
 * @param value value of style (optional)
 * @return a value if @get, 'this' if @set
 */
Element.prototype._css = function (name, value) {
	return this._getInAttrObject('style', true, name, value);
};

/**
 * set or get a dataset on the element.
 * @get if value === undefined
 * @set if value !== undefined || name is a object
 * @param name dataset name or a dataset list {'name' : 'value'}
 * @param value value of dataset (optional)
 * @return a value if @get, 'this' if @set
 */
Element.prototype._data = function (name, value) {
	return this._getInAttrObject('dataset', false, name, value);
};

/**
 * set or get a attribute on the element.
 * @get if value === undefined
 * @set if value !== undefined || name is a object
 * @param name attribute name or a attribute list {'name' : 'value'}
 * @param value value of attribute (optional)
 * @return a value if @get, 'this' if @set
 */
Element.prototype._attr = function (name, value) {
	return this._getInAttrObject('attributes', false, name, value);
};

/** 
 * add one or more classes on the element
 * @param name name of class or a list of classes. Ex. "class1 class2" or ["class1", "class2"]
 * @return the element
 */
Element.prototype._addClass = function (classes) {
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
 * @param name name of class or a list of classes. Ex. "class1 class2" or ["class1", "class2"]
 * @return the element
 */
Element.prototype._rmClass  = function (classes) {
	if (baku.isString(classes)) {
		classes = classes.split(/\s+/);
	}
	for (var i in classes) {
		this.classList.remove(classes[i].trim());
	}
	return this;
};

/** 
 * remove one or more classes on element
 * @param name name of class or a list of classes. Ex. "class1 class2" or ["class1", "class2"]
 * @param active if true add classes, id false remove classes
 * @return the element
 */
Element.prototype._toggleClass = function (classes, active) {
	this[active ? '_addClass' : '_rmClass' ](classes);
	return this;
};

/**
 * get Id in a element
 * @param id id
 * @return node or undefined if not found
 */
Element.prototype._getById = function (id) {
	var children = this.childNodes;
	var l = children.length;
	for (var i = 0; i < l; i++) {
		if (children[i].id === id) {
			return children[i];
		} else if (children[i] instanceof Element) {
			var node = children[i]._getById(id);
			if (node instanceof Element) {
				return node;
			}
		}
	}
	return undefined;
}

/**
 * alias for querySelector
 */
Element.prototype._first = function (selector) { return this.querySelector(selector) }

/**
 * alias for querySelectorAll
 */
Element.prototype._list  = function (selector) { return this.querySelectorAll(selector) }

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
		if (this[i] instanceof Element) {
		    this[i]._css(name, value);
		}
	}
	return this;
};

/** 
 * add one or more classes on the element list
 * @param classes name of class or a list of classes. Ex. "class1 class2" or ["class1", "class2"]
 * @return the list
 */
NodeList.prototype._addClass = 
DomArray.prototype._addClass = function (classes) {
	for (var i in this) {
		if (this[i] instanceof Element) {
			this[i]._addClass(name);
		}
	}
	return this;
};

/**
 * remove one or more classes on the element list
 * @param classes name of class or a list of classes. Ex. "class1 class2" or ["class1", "class2"]
 * @return the list
 */
NodeList.prototype._rmClass = 
DomArray.prototype._rmClass  = function (classes) {
	for (var i in this) {
		if (this[i] instanceof Element) {
			this[i]._rmClass(name);
		}
	}
	return this;
};

/**
 * remove one or more classes on the element list
 * @param classes name of class or a list of classes. Ex. "class1 class2" or ["class1", "class2"]
 * @param active if true add classes, id false remove classes
 * @return the list
 */
NodeList.prototype._toggleClass = 
DomArray.prototype._toggleClass  = function (classes, active) {
	this[active ? '_addClass' : '_rmClass' ](classes);
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
		if (this[i] instanceof Element) {
			e = this[i].querySelectorAll(selector);
			if (e.length > 0) {
				for(j in e) {
					if (e[j] instanceof Element) {
						list[list.length] = e[j];
					}
				}
			}
		}
	}
	return list;
};
