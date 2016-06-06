"use strict";

/*!
 * jQuery JavaScript Library v2.2.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-05-20T17:23Z
 */

(function (global, factory) {

	if (typeof module === "object" && typeof module.exports === "object") {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ? factory(global, true) : function (w) {
			if (!w.document) {
				throw new Error("jQuery requires a window with a document");
			}
			return factory(w);
		};
	} else {
		factory(global);
	}

	// Pass this if window is not defined yet
})(typeof window !== "undefined" ? window : this, function (window, noGlobal) {

	// Support: Firefox 18+
	// Can't be in strict mode, several libs including ASP.NET trace
	// the stack via arguments.caller.callee and Firefox dies if
	// you try to trace through "use strict" call chains. (#13335)
	//"use strict";
	var arr = [];

	var document = window.document;

	var slice = arr.slice;

	var concat = arr.concat;

	var push = arr.push;

	var indexOf = arr.indexOf;

	var class2type = {};

	var toString = class2type.toString;

	var hasOwn = class2type.hasOwnProperty;

	var support = {};

	var version = "2.2.4",


	// Define a local copy of jQuery
	jQuery = function (selector, context) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init(selector, context);
	},


	// Support: Android<4.1
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,


	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	    rdashAlpha = /-([\da-z])/gi,


	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function (all, letter) {
		return letter.toUpperCase();
	};

	jQuery.fn = jQuery.prototype = {

		// The current version of jQuery being used
		jquery: version,

		constructor: jQuery,

		// Start with an empty selector
		selector: "",

		// The default length of a jQuery object is 0
		length: 0,

		toArray: function () {
			return slice.call(this);
		},

		// Get the Nth element in the matched element set OR
		// Get the whole matched element set as a clean array
		get: function (num) {
			return num != null ?

			// Return just the one element from the set
			num < 0 ? this[num + this.length] : this[num] :

			// Return all the elements in a clean array
			slice.call(this);
		},

		// Take an array of elements and push it onto the stack
		// (returning the new matched element set)
		pushStack: function (elems) {

			// Build a new jQuery matched element set
			var ret = jQuery.merge(this.constructor(), elems);

			// Add the old object onto the stack (as a reference)
			ret.prevObject = this;
			ret.context = this.context;

			// Return the newly-formed element set
			return ret;
		},

		// Execute a callback for every element in the matched set.
		each: function (callback) {
			return jQuery.each(this, callback);
		},

		map: function (callback) {
			return this.pushStack(jQuery.map(this, function (elem, i) {
				return callback.call(elem, i, elem);
			}));
		},

		slice: function () {
			return this.pushStack(slice.apply(this, arguments));
		},

		first: function () {
			return this.eq(0);
		},

		last: function () {
			return this.eq(-1);
		},

		eq: function (i) {
			var len = this.length,
			    j = +i + (i < 0 ? len : 0);
			return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
		},

		end: function () {
			return this.prevObject || this.constructor();
		},

		// For internal use only.
		// Behaves like an Array's method, not like a jQuery method.
		push: push,
		sort: arr.sort,
		splice: arr.splice
	};

	jQuery.extend = jQuery.fn.extend = function () {
		var options,
		    name,
		    src,
		    copy,
		    copyIsArray,
		    clone,
		    target = arguments[0] || {},
		    i = 1,
		    length = arguments.length,
		    deep = false;

		// Handle a deep copy situation
		if (typeof target === "boolean") {
			deep = target;

			// Skip the boolean and the target
			target = arguments[i] || {};
			i++;
		}

		// Handle case when target is a string or something (possible in deep copy)
		if (typeof target !== "object" && !jQuery.isFunction(target)) {
			target = {};
		}

		// Extend jQuery itself if only one argument is passed
		if (i === length) {
			target = this;
			i--;
		}

		for (; i < length; i++) {

			// Only deal with non-null/undefined values
			if ((options = arguments[i]) != null) {

				// Extend the base object
				for (name in options) {
					src = target[name];
					copy = options[name];

					// Prevent never-ending loop
					if (target === copy) {
						continue;
					}

					// Recurse if we're merging plain objects or arrays
					if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {

						if (copyIsArray) {
							copyIsArray = false;
							clone = src && jQuery.isArray(src) ? src : [];
						} else {
							clone = src && jQuery.isPlainObject(src) ? src : {};
						}

						// Never move original objects, clone them
						target[name] = jQuery.extend(deep, clone, copy);

						// Don't bring in undefined values
					} else if (copy !== undefined) {
							target[name] = copy;
						}
				}
			}
		}

		// Return the modified object
		return target;
	};

	jQuery.extend({

		// Unique for each copy of jQuery on the page
		expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),

		// Assume jQuery is ready without the ready module
		isReady: true,

		error: function (msg) {
			throw new Error(msg);
		},

		noop: function () {},

		isFunction: function (obj) {
			return jQuery.type(obj) === "function";
		},

		isArray: Array.isArray,

		isWindow: function (obj) {
			return obj != null && obj === obj.window;
		},

		isNumeric: function (obj) {

			// parseFloat NaNs numeric-cast false positives (null|true|false|"")
			// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
			// subtraction forces infinities to NaN
			// adding 1 corrects loss of precision from parseFloat (#15100)
			var realStringObj = obj && obj.toString();
			return !jQuery.isArray(obj) && realStringObj - parseFloat(realStringObj) + 1 >= 0;
		},

		isPlainObject: function (obj) {
			var key;

			// Not plain objects:
			// - Any object or value whose internal [[Class]] property is not "[object Object]"
			// - DOM nodes
			// - window
			if (jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow(obj)) {
				return false;
			}

			// Not own constructor property must be Object
			if (obj.constructor && !hasOwn.call(obj, "constructor") && !hasOwn.call(obj.constructor.prototype || {}, "isPrototypeOf")) {
				return false;
			}

			// Own properties are enumerated firstly, so to speed up,
			// if last one is own, then all properties are own
			for (key in obj) {}

			return key === undefined || hasOwn.call(obj, key);
		},

		isEmptyObject: function (obj) {
			var name;
			for (name in obj) {
				return false;
			}
			return true;
		},

		type: function (obj) {
			if (obj == null) {
				return obj + "";
			}

			// Support: Android<4.0, iOS<6 (functionish RegExp)
			return typeof obj === "object" || typeof obj === "function" ? class2type[toString.call(obj)] || "object" : typeof obj;
		},

		// Evaluates a script in a global context
		globalEval: function (code) {
			var script,
			    indirect = eval;

			code = jQuery.trim(code);

			if (code) {

				// If the code includes a valid, prologue position
				// strict mode pragma, execute code by injecting a
				// script tag into the document.
				if (code.indexOf("use strict") === 1) {
					script = document.createElement("script");
					script.text = code;
					document.head.appendChild(script).parentNode.removeChild(script);
				} else {

					// Otherwise, avoid the DOM node creation, insertion
					// and removal by using an indirect global eval

					indirect(code);
				}
			}
		},

		// Convert dashed to camelCase; used by the css and data modules
		// Support: IE9-11+
		// Microsoft forgot to hump their vendor prefix (#9572)
		camelCase: function (string) {
			return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
		},

		nodeName: function (elem, name) {
			return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
		},

		each: function (obj, callback) {
			var length,
			    i = 0;

			if (isArrayLike(obj)) {
				length = obj.length;
				for (; i < length; i++) {
					if (callback.call(obj[i], i, obj[i]) === false) {
						break;
					}
				}
			} else {
				for (i in obj) {
					if (callback.call(obj[i], i, obj[i]) === false) {
						break;
					}
				}
			}

			return obj;
		},

		// Support: Android<4.1
		trim: function (text) {
			return text == null ? "" : (text + "").replace(rtrim, "");
		},

		// results is for internal usage only
		makeArray: function (arr, results) {
			var ret = results || [];

			if (arr != null) {
				if (isArrayLike(Object(arr))) {
					jQuery.merge(ret, typeof arr === "string" ? [arr] : arr);
				} else {
					push.call(ret, arr);
				}
			}

			return ret;
		},

		inArray: function (elem, arr, i) {
			return arr == null ? -1 : indexOf.call(arr, elem, i);
		},

		merge: function (first, second) {
			var len = +second.length,
			    j = 0,
			    i = first.length;

			for (; j < len; j++) {
				first[i++] = second[j];
			}

			first.length = i;

			return first;
		},

		grep: function (elems, callback, invert) {
			var callbackInverse,
			    matches = [],
			    i = 0,
			    length = elems.length,
			    callbackExpect = !invert;

			// Go through the array, only saving the items
			// that pass the validator function
			for (; i < length; i++) {
				callbackInverse = !callback(elems[i], i);
				if (callbackInverse !== callbackExpect) {
					matches.push(elems[i]);
				}
			}

			return matches;
		},

		// arg is for internal usage only
		map: function (elems, callback, arg) {
			var length,
			    value,
			    i = 0,
			    ret = [];

			// Go through the array, translating each of the items to their new values
			if (isArrayLike(elems)) {
				length = elems.length;
				for (; i < length; i++) {
					value = callback(elems[i], i, arg);

					if (value != null) {
						ret.push(value);
					}
				}

				// Go through every key on the object,
			} else {
					for (i in elems) {
						value = callback(elems[i], i, arg);

						if (value != null) {
							ret.push(value);
						}
					}
				}

			// Flatten any nested arrays
			return concat.apply([], ret);
		},

		// A global GUID counter for objects
		guid: 1,

		// Bind a function to a context, optionally partially applying any
		// arguments.
		proxy: function (fn, context) {
			var tmp, args, proxy;

			if (typeof context === "string") {
				tmp = fn[context];
				context = fn;
				fn = tmp;
			}

			// Quick check to determine if target is callable, in the spec
			// this throws a TypeError, but we will just return undefined.
			if (!jQuery.isFunction(fn)) {
				return undefined;
			}

			// Simulated bind
			args = slice.call(arguments, 2);
			proxy = function () {
				return fn.apply(context || this, args.concat(slice.call(arguments)));
			};

			// Set the guid of unique handler to the same of original handler, so it can be removed
			proxy.guid = fn.guid = fn.guid || jQuery.guid++;

			return proxy;
		},

		now: Date.now,

		// jQuery.support is not used in Core but other projects attach their
		// properties to it so it needs to exist.
		support: support
	});

	// JSHint would error on this code due to the Symbol not being defined in ES5.
	// Defining this global in .jshintrc would create a danger of using the global
	// unguarded in another place, it seems safer to just disable JSHint for these
	// three lines.
	/* jshint ignore: start */
	if (typeof Symbol === "function") {
		jQuery.fn[Symbol.iterator] = arr[Symbol.iterator];
	}
	/* jshint ignore: end */

	// Populate the class2type map
	jQuery.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (i, name) {
		class2type["[object " + name + "]"] = name.toLowerCase();
	});

	function isArrayLike(obj) {

		// Support: iOS 8.2 (not reproducible in simulator)
		// `in` check used to prevent JIT error (gh-2145)
		// hasOwn isn't used here due to false negatives
		// regarding Nodelist length in IE
		var length = !!obj && "length" in obj && obj.length,
		    type = jQuery.type(obj);

		if (type === "function" || jQuery.isWindow(obj)) {
			return false;
		}

		return type === "array" || length === 0 || typeof length === "number" && length > 0 && length - 1 in obj;
	}
	var Sizzle =
	/*!
  * Sizzle CSS Selector Engine v2.2.1
  * http://sizzlejs.com/
  *
  * Copyright jQuery Foundation and other contributors
  * Released under the MIT license
  * http://jquery.org/license
  *
  * Date: 2015-10-17
  */
	function (window) {

		var i,
		    support,
		    Expr,
		    getText,
		    isXML,
		    tokenize,
		    compile,
		    select,
		    outermostContext,
		    sortInput,
		    hasDuplicate,


		// Local document vars
		setDocument,
		    document,
		    docElem,
		    documentIsHTML,
		    rbuggyQSA,
		    rbuggyMatches,
		    matches,
		    contains,


		// Instance-specific data
		expando = "sizzle" + 1 * new Date(),
		    preferredDoc = window.document,
		    dirruns = 0,
		    done = 0,
		    classCache = createCache(),
		    tokenCache = createCache(),
		    compilerCache = createCache(),
		    sortOrder = function (a, b) {
			if (a === b) {
				hasDuplicate = true;
			}
			return 0;
		},


		// General-purpose constants
		MAX_NEGATIVE = 1 << 31,


		// Instance methods
		hasOwn = {}.hasOwnProperty,
		    arr = [],
		    pop = arr.pop,
		    push_native = arr.push,
		    push = arr.push,
		    slice = arr.slice,

		// Use a stripped-down indexOf as it's faster than native
		// http://jsperf.com/thor-indexof-vs-for/5
		indexOf = function (list, elem) {
			var i = 0,
			    len = list.length;
			for (; i < len; i++) {
				if (list[i] === elem) {
					return i;
				}
			}
			return -1;
		},
		    booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",


		// Regular expressions

		// http://www.w3.org/TR/css3-selectors/#whitespace
		whitespace = "[\\x20\\t\\r\\n\\f]",


		// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
		identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",


		// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
		attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace + "*\\]",
		    pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" + ")\\)|)",


		// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
		rwhitespace = new RegExp(whitespace + "+", "g"),
		    rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"),
		    rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"),
		    rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"),
		    rattributeQuotes = new RegExp("=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g"),
		    rpseudo = new RegExp(pseudos),
		    ridentifier = new RegExp("^" + identifier + "$"),
		    matchExpr = {
			"ID": new RegExp("^#(" + identifier + ")"),
			"CLASS": new RegExp("^\\.(" + identifier + ")"),
			"TAG": new RegExp("^(" + identifier + "|[*])"),
			"ATTR": new RegExp("^" + attributes),
			"PSEUDO": new RegExp("^" + pseudos),
			"CHILD": new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
			"bool": new RegExp("^(?:" + booleans + ")$", "i"),
			// For use in libraries implementing .is()
			// We use this for POS matching in `select`
			"needsContext": new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
		},
		    rinputs = /^(?:input|select|textarea|button)$/i,
		    rheader = /^h\d$/i,
		    rnative = /^[^{]+\{\s*\[native \w/,


		// Easily-parseable/retrievable ID or TAG or CLASS selectors
		rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
		    rsibling = /[+~]/,
		    rescape = /'|\\/g,


		// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
		runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig"),
		    funescape = function (_, escaped, escapedWhitespace) {
			var high = "0x" + escaped - 0x10000;
			// NaN means non-codepoint
			// Support: Firefox<24
			// Workaround erroneous numeric interpretation of +"0x"
			return high !== high || escapedWhitespace ? escaped : high < 0 ?
			// BMP codepoint
			String.fromCharCode(high + 0x10000) :
			// Supplemental Plane codepoint (surrogate pair)
			String.fromCharCode(high >> 10 | 0xD800, high & 0x3FF | 0xDC00);
		},


		// Used for iframes
		// See setDocument()
		// Removing the function wrapper causes a "Permission Denied"
		// error in IE
		unloadHandler = function () {
			setDocument();
		};

		// Optimize for push.apply( _, NodeList )
		try {
			push.apply(arr = slice.call(preferredDoc.childNodes), preferredDoc.childNodes);
			// Support: Android<4.0
			// Detect silently failing push.apply
			arr[preferredDoc.childNodes.length].nodeType;
		} catch (e) {
			push = { apply: arr.length ?

				// Leverage slice if possible
				function (target, els) {
					push_native.apply(target, slice.call(els));
				} :

				// Support: IE<9
				// Otherwise append directly
				function (target, els) {
					var j = target.length,
					    i = 0;
					// Can't trust NodeList.length
					while (target[j++] = els[i++]) {}
					target.length = j - 1;
				}
			};
		}

		function Sizzle(selector, context, results, seed) {
			var m,
			    i,
			    elem,
			    nid,
			    nidselect,
			    match,
			    groups,
			    newSelector,
			    newContext = context && context.ownerDocument,


			// nodeType defaults to 9, since context defaults to document
			nodeType = context ? context.nodeType : 9;

			results = results || [];

			// Return early from calls with invalid selector or context
			if (typeof selector !== "string" || !selector || nodeType !== 1 && nodeType !== 9 && nodeType !== 11) {

				return results;
			}

			// Try to shortcut find operations (as opposed to filters) in HTML documents
			if (!seed) {

				if ((context ? context.ownerDocument || context : preferredDoc) !== document) {
					setDocument(context);
				}
				context = context || document;

				if (documentIsHTML) {

					// If the selector is sufficiently simple, try using a "get*By*" DOM method
					// (excepting DocumentFragment context, where the methods don't exist)
					if (nodeType !== 11 && (match = rquickExpr.exec(selector))) {

						// ID selector
						if (m = match[1]) {

							// Document context
							if (nodeType === 9) {
								if (elem = context.getElementById(m)) {

									// Support: IE, Opera, Webkit
									// TODO: identify versions
									// getElementById can match elements by name instead of ID
									if (elem.id === m) {
										results.push(elem);
										return results;
									}
								} else {
									return results;
								}

								// Element context
							} else {

									// Support: IE, Opera, Webkit
									// TODO: identify versions
									// getElementById can match elements by name instead of ID
									if (newContext && (elem = newContext.getElementById(m)) && contains(context, elem) && elem.id === m) {

										results.push(elem);
										return results;
									}
								}

							// Type selector
						} else if (match[2]) {
								push.apply(results, context.getElementsByTagName(selector));
								return results;

								// Class selector
							} else if ((m = match[3]) && support.getElementsByClassName && context.getElementsByClassName) {

									push.apply(results, context.getElementsByClassName(m));
									return results;
								}
					}

					// Take advantage of querySelectorAll
					if (support.qsa && !compilerCache[selector + " "] && (!rbuggyQSA || !rbuggyQSA.test(selector))) {

						if (nodeType !== 1) {
							newContext = context;
							newSelector = selector;

							// qSA looks outside Element context, which is not what we want
							// Thanks to Andrew Dupont for this workaround technique
							// Support: IE <=8
							// Exclude object elements
						} else if (context.nodeName.toLowerCase() !== "object") {

								// Capture the context ID, setting it first if necessary
								if (nid = context.getAttribute("id")) {
									nid = nid.replace(rescape, "\\$&");
								} else {
									context.setAttribute("id", nid = expando);
								}

								// Prefix every selector in the list
								groups = tokenize(selector);
								i = groups.length;
								nidselect = ridentifier.test(nid) ? "#" + nid : "[id='" + nid + "']";
								while (i--) {
									groups[i] = nidselect + " " + toSelector(groups[i]);
								}
								newSelector = groups.join(",");

								// Expand context for sibling selectors
								newContext = rsibling.test(selector) && testContext(context.parentNode) || context;
							}

						if (newSelector) {
							try {
								push.apply(results, newContext.querySelectorAll(newSelector));
								return results;
							} catch (qsaError) {} finally {
								if (nid === expando) {
									context.removeAttribute("id");
								}
							}
						}
					}
				}
			}

			// All others
			return select(selector.replace(rtrim, "$1"), context, results, seed);
		}

		/**
   * Create key-value caches of limited size
   * @returns {function(string, object)} Returns the Object data after storing it on itself with
   *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
   *	deleting the oldest entry
   */
		function createCache() {
			var keys = [];

			function cache(key, value) {
				// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
				if (keys.push(key + " ") > Expr.cacheLength) {
					// Only keep the most recent entries
					delete cache[keys.shift()];
				}
				return cache[key + " "] = value;
			}
			return cache;
		}

		/**
   * Mark a function for special use by Sizzle
   * @param {Function} fn The function to mark
   */
		function markFunction(fn) {
			fn[expando] = true;
			return fn;
		}

		/**
   * Support testing using an element
   * @param {Function} fn Passed the created div and expects a boolean result
   */
		function assert(fn) {
			var div = document.createElement("div");

			try {
				return !!fn(div);
			} catch (e) {
				return false;
			} finally {
				// Remove from its parent by default
				if (div.parentNode) {
					div.parentNode.removeChild(div);
				}
				// release memory in IE
				div = null;
			}
		}

		/**
   * Adds the same handler for all of the specified attrs
   * @param {String} attrs Pipe-separated list of attributes
   * @param {Function} handler The method that will be applied
   */
		function addHandle(attrs, handler) {
			var arr = attrs.split("|"),
			    i = arr.length;

			while (i--) {
				Expr.attrHandle[arr[i]] = handler;
			}
		}

		/**
   * Checks document order of two siblings
   * @param {Element} a
   * @param {Element} b
   * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
   */
		function siblingCheck(a, b) {
			var cur = b && a,
			    diff = cur && a.nodeType === 1 && b.nodeType === 1 && (~b.sourceIndex || MAX_NEGATIVE) - (~a.sourceIndex || MAX_NEGATIVE);

			// Use IE sourceIndex if available on both nodes
			if (diff) {
				return diff;
			}

			// Check if b follows a
			if (cur) {
				while (cur = cur.nextSibling) {
					if (cur === b) {
						return -1;
					}
				}
			}

			return a ? 1 : -1;
		}

		/**
   * Returns a function to use in pseudos for input types
   * @param {String} type
   */
		function createInputPseudo(type) {
			return function (elem) {
				var name = elem.nodeName.toLowerCase();
				return name === "input" && elem.type === type;
			};
		}

		/**
   * Returns a function to use in pseudos for buttons
   * @param {String} type
   */
		function createButtonPseudo(type) {
			return function (elem) {
				var name = elem.nodeName.toLowerCase();
				return (name === "input" || name === "button") && elem.type === type;
			};
		}

		/**
   * Returns a function to use in pseudos for positionals
   * @param {Function} fn
   */
		function createPositionalPseudo(fn) {
			return markFunction(function (argument) {
				argument = +argument;
				return markFunction(function (seed, matches) {
					var j,
					    matchIndexes = fn([], seed.length, argument),
					    i = matchIndexes.length;

					// Match elements found at the specified indexes
					while (i--) {
						if (seed[j = matchIndexes[i]]) {
							seed[j] = !(matches[j] = seed[j]);
						}
					}
				});
			});
		}

		/**
   * Checks a node for validity as a Sizzle context
   * @param {Element|Object=} context
   * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
   */
		function testContext(context) {
			return context && typeof context.getElementsByTagName !== "undefined" && context;
		}

		// Expose support vars for convenience
		support = Sizzle.support = {};

		/**
   * Detects XML nodes
   * @param {Element|Object} elem An element or a document
   * @returns {Boolean} True iff elem is a non-HTML XML node
   */
		isXML = Sizzle.isXML = function (elem) {
			// documentElement is verified for cases where it doesn't yet exist
			// (such as loading iframes in IE - #4833)
			var documentElement = elem && (elem.ownerDocument || elem).documentElement;
			return documentElement ? documentElement.nodeName !== "HTML" : false;
		};

		/**
   * Sets document-related variables once based on the current document
   * @param {Element|Object} [doc] An element or document object to use to set the document
   * @returns {Object} Returns the current document
   */
		setDocument = Sizzle.setDocument = function (node) {
			var hasCompare,
			    parent,
			    doc = node ? node.ownerDocument || node : preferredDoc;

			// Return early if doc is invalid or already selected
			if (doc === document || doc.nodeType !== 9 || !doc.documentElement) {
				return document;
			}

			// Update global variables
			document = doc;
			docElem = document.documentElement;
			documentIsHTML = !isXML(document);

			// Support: IE 9-11, Edge
			// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
			if ((parent = document.defaultView) && parent.top !== parent) {
				// Support: IE 11
				if (parent.addEventListener) {
					parent.addEventListener("unload", unloadHandler, false);

					// Support: IE 9 - 10 only
				} else if (parent.attachEvent) {
						parent.attachEvent("onunload", unloadHandler);
					}
			}

			/* Attributes
   ---------------------------------------------------------------------- */

			// Support: IE<8
			// Verify that getAttribute really returns attributes and not properties
			// (excepting IE8 booleans)
			support.attributes = assert(function (div) {
				div.className = "i";
				return !div.getAttribute("className");
			});

			/* getElement(s)By*
   ---------------------------------------------------------------------- */

			// Check if getElementsByTagName("*") returns only elements
			support.getElementsByTagName = assert(function (div) {
				div.appendChild(document.createComment(""));
				return !div.getElementsByTagName("*").length;
			});

			// Support: IE<9
			support.getElementsByClassName = rnative.test(document.getElementsByClassName);

			// Support: IE<10
			// Check if getElementById returns elements by name
			// The broken getElementById methods don't pick up programatically-set names,
			// so use a roundabout getElementsByName test
			support.getById = assert(function (div) {
				docElem.appendChild(div).id = expando;
				return !document.getElementsByName || !document.getElementsByName(expando).length;
			});

			// ID find and filter
			if (support.getById) {
				Expr.find["ID"] = function (id, context) {
					if (typeof context.getElementById !== "undefined" && documentIsHTML) {
						var m = context.getElementById(id);
						return m ? [m] : [];
					}
				};
				Expr.filter["ID"] = function (id) {
					var attrId = id.replace(runescape, funescape);
					return function (elem) {
						return elem.getAttribute("id") === attrId;
					};
				};
			} else {
				// Support: IE6/7
				// getElementById is not reliable as a find shortcut
				delete Expr.find["ID"];

				Expr.filter["ID"] = function (id) {
					var attrId = id.replace(runescape, funescape);
					return function (elem) {
						var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
						return node && node.value === attrId;
					};
				};
			}

			// Tag
			Expr.find["TAG"] = support.getElementsByTagName ? function (tag, context) {
				if (typeof context.getElementsByTagName !== "undefined") {
					return context.getElementsByTagName(tag);

					// DocumentFragment nodes don't have gEBTN
				} else if (support.qsa) {
						return context.querySelectorAll(tag);
					}
			} : function (tag, context) {
				var elem,
				    tmp = [],
				    i = 0,

				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName(tag);

				// Filter out possible comments
				if (tag === "*") {
					while (elem = results[i++]) {
						if (elem.nodeType === 1) {
							tmp.push(elem);
						}
					}

					return tmp;
				}
				return results;
			};

			// Class
			Expr.find["CLASS"] = support.getElementsByClassName && function (className, context) {
				if (typeof context.getElementsByClassName !== "undefined" && documentIsHTML) {
					return context.getElementsByClassName(className);
				}
			};

			/* QSA/matchesSelector
   ---------------------------------------------------------------------- */

			// QSA and matchesSelector support

			// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
			rbuggyMatches = [];

			// qSa(:focus) reports false when true (Chrome 21)
			// We allow this because of a bug in IE8/9 that throws an error
			// whenever `document.activeElement` is accessed on an iframe
			// So, we allow :focus to pass through QSA all the time to avoid the IE error
			// See http://bugs.jquery.com/ticket/13378
			rbuggyQSA = [];

			if (support.qsa = rnative.test(document.querySelectorAll)) {
				// Build QSA regex
				// Regex strategy adopted from Diego Perini
				assert(function (div) {
					// Select is set to empty string on purpose
					// This is to test IE's treatment of not explicitly
					// setting a boolean content attribute,
					// since its presence should be enough
					// http://bugs.jquery.com/ticket/12359
					docElem.appendChild(div).innerHTML = "<a id='" + expando + "'></a>" + "<select id='" + expando + "-\r\\' msallowcapture=''>" + "<option selected=''></option></select>";

					// Support: IE8, Opera 11-12.16
					// Nothing should be selected when empty strings follow ^= or $= or *=
					// The test attribute must be unknown in Opera but "safe" for WinRT
					// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
					if (div.querySelectorAll("[msallowcapture^='']").length) {
						rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")");
					}

					// Support: IE8
					// Boolean attributes and "value" are not treated correctly
					if (!div.querySelectorAll("[selected]").length) {
						rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")");
					}

					// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
					if (!div.querySelectorAll("[id~=" + expando + "-]").length) {
						rbuggyQSA.push("~=");
					}

					// Webkit/Opera - :checked should return selected option elements
					// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
					// IE8 throws error here and will not see later tests
					if (!div.querySelectorAll(":checked").length) {
						rbuggyQSA.push(":checked");
					}

					// Support: Safari 8+, iOS 8+
					// https://bugs.webkit.org/show_bug.cgi?id=136851
					// In-page `selector#id sibing-combinator selector` fails
					if (!div.querySelectorAll("a#" + expando + "+*").length) {
						rbuggyQSA.push(".#.+[+~]");
					}
				});

				assert(function (div) {
					// Support: Windows 8 Native Apps
					// The type and name attributes are restricted during .innerHTML assignment
					var input = document.createElement("input");
					input.setAttribute("type", "hidden");
					div.appendChild(input).setAttribute("name", "D");

					// Support: IE8
					// Enforce case-sensitivity of name attribute
					if (div.querySelectorAll("[name=d]").length) {
						rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?=");
					}

					// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
					// IE8 throws error here and will not see later tests
					if (!div.querySelectorAll(":enabled").length) {
						rbuggyQSA.push(":enabled", ":disabled");
					}

					// Opera 10-11 does not throw on post-comma invalid pseudos
					div.querySelectorAll("*,:x");
					rbuggyQSA.push(",.*:");
				});
			}

			if (support.matchesSelector = rnative.test(matches = docElem.matches || docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)) {

				assert(function (div) {
					// Check to see if it's possible to do matchesSelector
					// on a disconnected node (IE 9)
					support.disconnectedMatch = matches.call(div, "div");

					// This should fail with an exception
					// Gecko does not error, returns false instead
					matches.call(div, "[s!='']:x");
					rbuggyMatches.push("!=", pseudos);
				});
			}

			rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
			rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|"));

			/* Contains
   ---------------------------------------------------------------------- */
			hasCompare = rnative.test(docElem.compareDocumentPosition);

			// Element contains another
			// Purposefully self-exclusive
			// As in, an element does not contain itself
			contains = hasCompare || rnative.test(docElem.contains) ? function (a, b) {
				var adown = a.nodeType === 9 ? a.documentElement : a,
				    bup = b && b.parentNode;
				return a === bup || !!(bup && bup.nodeType === 1 && (adown.contains ? adown.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16));
			} : function (a, b) {
				if (b) {
					while (b = b.parentNode) {
						if (b === a) {
							return true;
						}
					}
				}
				return false;
			};

			/* Sorting
   ---------------------------------------------------------------------- */

			// Document order sorting
			sortOrder = hasCompare ? function (a, b) {

				// Flag for duplicate removal
				if (a === b) {
					hasDuplicate = true;
					return 0;
				}

				// Sort on method existence if only one input has compareDocumentPosition
				var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
				if (compare) {
					return compare;
				}

				// Calculate position if both inputs belong to the same document
				compare = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) :

				// Otherwise we know they are disconnected
				1;

				// Disconnected nodes
				if (compare & 1 || !support.sortDetached && b.compareDocumentPosition(a) === compare) {

					// Choose the first element that is related to our preferred document
					if (a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a)) {
						return -1;
					}
					if (b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b)) {
						return 1;
					}

					// Maintain original order
					return sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0;
				}

				return compare & 4 ? -1 : 1;
			} : function (a, b) {
				// Exit early if the nodes are identical
				if (a === b) {
					hasDuplicate = true;
					return 0;
				}

				var cur,
				    i = 0,
				    aup = a.parentNode,
				    bup = b.parentNode,
				    ap = [a],
				    bp = [b];

				// Parentless nodes are either documents or disconnected
				if (!aup || !bup) {
					return a === document ? -1 : b === document ? 1 : aup ? -1 : bup ? 1 : sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0;

					// If the nodes are siblings, we can do a quick check
				} else if (aup === bup) {
						return siblingCheck(a, b);
					}

				// Otherwise we need full lists of their ancestors for comparison
				cur = a;
				while (cur = cur.parentNode) {
					ap.unshift(cur);
				}
				cur = b;
				while (cur = cur.parentNode) {
					bp.unshift(cur);
				}

				// Walk down the tree looking for a discrepancy
				while (ap[i] === bp[i]) {
					i++;
				}

				return i ?
				// Do a sibling check if the nodes have a common ancestor
				siblingCheck(ap[i], bp[i]) :

				// Otherwise nodes in our document sort first
				ap[i] === preferredDoc ? -1 : bp[i] === preferredDoc ? 1 : 0;
			};

			return document;
		};

		Sizzle.matches = function (expr, elements) {
			return Sizzle(expr, null, null, elements);
		};

		Sizzle.matchesSelector = function (elem, expr) {
			// Set document vars if needed
			if ((elem.ownerDocument || elem) !== document) {
				setDocument(elem);
			}

			// Make sure that attribute selectors are quoted
			expr = expr.replace(rattributeQuotes, "='$1']");

			if (support.matchesSelector && documentIsHTML && !compilerCache[expr + " "] && (!rbuggyMatches || !rbuggyMatches.test(expr)) && (!rbuggyQSA || !rbuggyQSA.test(expr))) {

				try {
					var ret = matches.call(elem, expr);

					// IE 9's matchesSelector returns false on disconnected nodes
					if (ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11) {
						return ret;
					}
				} catch (e) {}
			}

			return Sizzle(expr, document, null, [elem]).length > 0;
		};

		Sizzle.contains = function (context, elem) {
			// Set document vars if needed
			if ((context.ownerDocument || context) !== document) {
				setDocument(context);
			}
			return contains(context, elem);
		};

		Sizzle.attr = function (elem, name) {
			// Set document vars if needed
			if ((elem.ownerDocument || elem) !== document) {
				setDocument(elem);
			}

			var fn = Expr.attrHandle[name.toLowerCase()],

			// Don't get fooled by Object.prototype properties (jQuery #13807)
			val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : undefined;

			return val !== undefined ? val : support.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
		};

		Sizzle.error = function (msg) {
			throw new Error("Syntax error, unrecognized expression: " + msg);
		};

		/**
   * Document sorting and removing duplicates
   * @param {ArrayLike} results
   */
		Sizzle.uniqueSort = function (results) {
			var elem,
			    duplicates = [],
			    j = 0,
			    i = 0;

			// Unless we *know* we can detect duplicates, assume their presence
			hasDuplicate = !support.detectDuplicates;
			sortInput = !support.sortStable && results.slice(0);
			results.sort(sortOrder);

			if (hasDuplicate) {
				while (elem = results[i++]) {
					if (elem === results[i]) {
						j = duplicates.push(i);
					}
				}
				while (j--) {
					results.splice(duplicates[j], 1);
				}
			}

			// Clear input after sorting to release objects
			// See https://github.com/jquery/sizzle/pull/225
			sortInput = null;

			return results;
		};

		/**
   * Utility function for retrieving the text value of an array of DOM nodes
   * @param {Array|Element} elem
   */
		getText = Sizzle.getText = function (elem) {
			var node,
			    ret = "",
			    i = 0,
			    nodeType = elem.nodeType;

			if (!nodeType) {
				// If no nodeType, this is expected to be an array
				while (node = elem[i++]) {
					// Do not traverse comment nodes
					ret += getText(node);
				}
			} else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
				// Use textContent for elements
				// innerText usage removed for consistency of new lines (jQuery #11153)
				if (typeof elem.textContent === "string") {
					return elem.textContent;
				} else {
					// Traverse its children
					for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
						ret += getText(elem);
					}
				}
			} else if (nodeType === 3 || nodeType === 4) {
				return elem.nodeValue;
			}
			// Do not include comment or processing instruction nodes

			return ret;
		};

		Expr = Sizzle.selectors = {

			// Can be adjusted by the user
			cacheLength: 50,

			createPseudo: markFunction,

			match: matchExpr,

			attrHandle: {},

			find: {},

			relative: {
				">": { dir: "parentNode", first: true },
				" ": { dir: "parentNode" },
				"+": { dir: "previousSibling", first: true },
				"~": { dir: "previousSibling" }
			},

			preFilter: {
				"ATTR": function (match) {
					match[1] = match[1].replace(runescape, funescape);

					// Move the given value to match[3] whether quoted or unquoted
					match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape);

					if (match[2] === "~=") {
						match[3] = " " + match[3] + " ";
					}

					return match.slice(0, 4);
				},

				"CHILD": function (match) {
					/* matches from matchExpr["CHILD"]
     	1 type (only|nth|...)
     	2 what (child|of-type)
     	3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
     	4 xn-component of xn+y argument ([+-]?\d*n|)
     	5 sign of xn-component
     	6 x of xn-component
     	7 sign of y-component
     	8 y of y-component
     */
					match[1] = match[1].toLowerCase();

					if (match[1].slice(0, 3) === "nth") {
						// nth-* requires argument
						if (!match[3]) {
							Sizzle.error(match[0]);
						}

						// numeric x and y parameters for Expr.filter.CHILD
						// remember that false/true cast respectively to 0/1
						match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === "even" || match[3] === "odd"));
						match[5] = +(match[7] + match[8] || match[3] === "odd");

						// other types prohibit arguments
					} else if (match[3]) {
							Sizzle.error(match[0]);
						}

					return match;
				},

				"PSEUDO": function (match) {
					var excess,
					    unquoted = !match[6] && match[2];

					if (matchExpr["CHILD"].test(match[0])) {
						return null;
					}

					// Accept quoted arguments as-is
					if (match[3]) {
						match[2] = match[4] || match[5] || "";

						// Strip excess characters from unquoted arguments
					} else if (unquoted && rpseudo.test(unquoted) && (
						// Get excess from tokenize (recursively)
						excess = tokenize(unquoted, true)) && (
						// advance to the next closing parenthesis
						excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {

							// excess is a negative index
							match[0] = match[0].slice(0, excess);
							match[2] = unquoted.slice(0, excess);
						}

					// Return only captures needed by the pseudo filter method (type and argument)
					return match.slice(0, 3);
				}
			},

			filter: {

				"TAG": function (nodeNameSelector) {
					var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
					return nodeNameSelector === "*" ? function () {
						return true;
					} : function (elem) {
						return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
					};
				},

				"CLASS": function (className) {
					var pattern = classCache[className + " "];

					return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function (elem) {
						return pattern.test(typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "");
					});
				},

				"ATTR": function (name, operator, check) {
					return function (elem) {
						var result = Sizzle.attr(elem, name);

						if (result == null) {
							return operator === "!=";
						}
						if (!operator) {
							return true;
						}

						result += "";

						return operator === "=" ? result === check : operator === "!=" ? result !== check : operator === "^=" ? check && result.indexOf(check) === 0 : operator === "*=" ? check && result.indexOf(check) > -1 : operator === "$=" ? check && result.slice(-check.length) === check : operator === "~=" ? (" " + result.replace(rwhitespace, " ") + " ").indexOf(check) > -1 : operator === "|=" ? result === check || result.slice(0, check.length + 1) === check + "-" : false;
					};
				},

				"CHILD": function (type, what, argument, first, last) {
					var simple = type.slice(0, 3) !== "nth",
					    forward = type.slice(-4) !== "last",
					    ofType = what === "of-type";

					return first === 1 && last === 0 ?

					// Shortcut for :nth-*(n)
					function (elem) {
						return !!elem.parentNode;
					} : function (elem, context, xml) {
						var cache,
						    uniqueCache,
						    outerCache,
						    node,
						    nodeIndex,
						    start,
						    dir = simple !== forward ? "nextSibling" : "previousSibling",
						    parent = elem.parentNode,
						    name = ofType && elem.nodeName.toLowerCase(),
						    useCache = !xml && !ofType,
						    diff = false;

						if (parent) {

							// :(first|last|only)-(child|of-type)
							if (simple) {
								while (dir) {
									node = elem;
									while (node = node[dir]) {
										if (ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) {

											return false;
										}
									}
									// Reverse direction for :only-* (if we haven't yet done so)
									start = dir = type === "only" && !start && "nextSibling";
								}
								return true;
							}

							start = [forward ? parent.firstChild : parent.lastChild];

							// non-xml :nth-child(...) stores cache data on `parent`
							if (forward && useCache) {

								// Seek `elem` from a previously-cached index

								// ...in a gzip-friendly way
								node = parent;
								outerCache = node[expando] || (node[expando] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});

								cache = uniqueCache[type] || [];
								nodeIndex = cache[0] === dirruns && cache[1];
								diff = nodeIndex && cache[2];
								node = nodeIndex && parent.childNodes[nodeIndex];

								while (node = ++nodeIndex && node && node[dir] || (

								// Fallback to seeking `elem` from the start
								diff = nodeIndex = 0) || start.pop()) {

									// When found, cache indexes on `parent` and break
									if (node.nodeType === 1 && ++diff && node === elem) {
										uniqueCache[type] = [dirruns, nodeIndex, diff];
										break;
									}
								}
							} else {
								// Use previously-cached element index if available
								if (useCache) {
									// ...in a gzip-friendly way
									node = elem;
									outerCache = node[expando] || (node[expando] = {});

									// Support: IE <9 only
									// Defend against cloned attroperties (jQuery gh-1709)
									uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});

									cache = uniqueCache[type] || [];
									nodeIndex = cache[0] === dirruns && cache[1];
									diff = nodeIndex;
								}

								// xml :nth-child(...)
								// or :nth-last-child(...) or :nth(-last)?-of-type(...)
								if (diff === false) {
									// Use the same loop as above to seek `elem` from the start
									while (node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) {

										if ((ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) && ++diff) {

											// Cache the index of each encountered element
											if (useCache) {
												outerCache = node[expando] || (node[expando] = {});

												// Support: IE <9 only
												// Defend against cloned attroperties (jQuery gh-1709)
												uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});

												uniqueCache[type] = [dirruns, diff];
											}

											if (node === elem) {
												break;
											}
										}
									}
								}
							}

							// Incorporate the offset, then check against cycle size
							diff -= last;
							return diff === first || diff % first === 0 && diff / first >= 0;
						}
					};
				},

				"PSEUDO": function (pseudo, argument) {
					// pseudo-class names are case-insensitive
					// http://www.w3.org/TR/selectors/#pseudo-classes
					// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
					// Remember that setFilters inherits from pseudos
					var args,
					    fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo);

					// The user may use createPseudo to indicate that
					// arguments are needed to create the filter function
					// just as Sizzle does
					if (fn[expando]) {
						return fn(argument);
					}

					// But maintain support for old signatures
					if (fn.length > 1) {
						args = [pseudo, pseudo, "", argument];
						return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function (seed, matches) {
							var idx,
							    matched = fn(seed, argument),
							    i = matched.length;
							while (i--) {
								idx = indexOf(seed, matched[i]);
								seed[idx] = !(matches[idx] = matched[i]);
							}
						}) : function (elem) {
							return fn(elem, 0, args);
						};
					}

					return fn;
				}
			},

			pseudos: {
				// Potentially complex pseudos
				"not": markFunction(function (selector) {
					// Trim the selector passed to compile
					// to avoid treating leading and trailing
					// spaces as combinators
					var input = [],
					    results = [],
					    matcher = compile(selector.replace(rtrim, "$1"));

					return matcher[expando] ? markFunction(function (seed, matches, context, xml) {
						var elem,
						    unmatched = matcher(seed, null, xml, []),
						    i = seed.length;

						// Match elements unmatched by `matcher`
						while (i--) {
							if (elem = unmatched[i]) {
								seed[i] = !(matches[i] = elem);
							}
						}
					}) : function (elem, context, xml) {
						input[0] = elem;
						matcher(input, null, xml, results);
						// Don't keep the element (issue #299)
						input[0] = null;
						return !results.pop();
					};
				}),

				"has": markFunction(function (selector) {
					return function (elem) {
						return Sizzle(selector, elem).length > 0;
					};
				}),

				"contains": markFunction(function (text) {
					text = text.replace(runescape, funescape);
					return function (elem) {
						return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1;
					};
				}),

				// "Whether an element is represented by a :lang() selector
				// is based solely on the element's language value
				// being equal to the identifier C,
				// or beginning with the identifier C immediately followed by "-".
				// The matching of C against the element's language value is performed case-insensitively.
				// The identifier C does not have to be a valid language name."
				// http://www.w3.org/TR/selectors/#lang-pseudo
				"lang": markFunction(function (lang) {
					// lang value must be a valid identifier
					if (!ridentifier.test(lang || "")) {
						Sizzle.error("unsupported lang: " + lang);
					}
					lang = lang.replace(runescape, funescape).toLowerCase();
					return function (elem) {
						var elemLang;
						do {
							if (elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang")) {

								elemLang = elemLang.toLowerCase();
								return elemLang === lang || elemLang.indexOf(lang + "-") === 0;
							}
						} while ((elem = elem.parentNode) && elem.nodeType === 1);
						return false;
					};
				}),

				// Miscellaneous
				"target": function (elem) {
					var hash = window.location && window.location.hash;
					return hash && hash.slice(1) === elem.id;
				},

				"root": function (elem) {
					return elem === docElem;
				},

				"focus": function (elem) {
					return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
				},

				// Boolean properties
				"enabled": function (elem) {
					return elem.disabled === false;
				},

				"disabled": function (elem) {
					return elem.disabled === true;
				},

				"checked": function (elem) {
					// In CSS3, :checked should return both checked and selected elements
					// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
					var nodeName = elem.nodeName.toLowerCase();
					return nodeName === "input" && !!elem.checked || nodeName === "option" && !!elem.selected;
				},

				"selected": function (elem) {
					// Accessing this property makes selected-by-default
					// options in Safari work properly
					if (elem.parentNode) {
						elem.parentNode.selectedIndex;
					}

					return elem.selected === true;
				},

				// Contents
				"empty": function (elem) {
					// http://www.w3.org/TR/selectors/#empty-pseudo
					// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
					//   but not by others (comment: 8; processing instruction: 7; etc.)
					// nodeType < 6 works because attributes (2) do not appear as children
					for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
						if (elem.nodeType < 6) {
							return false;
						}
					}
					return true;
				},

				"parent": function (elem) {
					return !Expr.pseudos["empty"](elem);
				},

				// Element/input types
				"header": function (elem) {
					return rheader.test(elem.nodeName);
				},

				"input": function (elem) {
					return rinputs.test(elem.nodeName);
				},

				"button": function (elem) {
					var name = elem.nodeName.toLowerCase();
					return name === "input" && elem.type === "button" || name === "button";
				},

				"text": function (elem) {
					var attr;
					return elem.nodeName.toLowerCase() === "input" && elem.type === "text" && (

					// Support: IE<8
					// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
					(attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text");
				},

				// Position-in-collection
				"first": createPositionalPseudo(function () {
					return [0];
				}),

				"last": createPositionalPseudo(function (matchIndexes, length) {
					return [length - 1];
				}),

				"eq": createPositionalPseudo(function (matchIndexes, length, argument) {
					return [argument < 0 ? argument + length : argument];
				}),

				"even": createPositionalPseudo(function (matchIndexes, length) {
					var i = 0;
					for (; i < length; i += 2) {
						matchIndexes.push(i);
					}
					return matchIndexes;
				}),

				"odd": createPositionalPseudo(function (matchIndexes, length) {
					var i = 1;
					for (; i < length; i += 2) {
						matchIndexes.push(i);
					}
					return matchIndexes;
				}),

				"lt": createPositionalPseudo(function (matchIndexes, length, argument) {
					var i = argument < 0 ? argument + length : argument;
					for (; --i >= 0;) {
						matchIndexes.push(i);
					}
					return matchIndexes;
				}),

				"gt": createPositionalPseudo(function (matchIndexes, length, argument) {
					var i = argument < 0 ? argument + length : argument;
					for (; ++i < length;) {
						matchIndexes.push(i);
					}
					return matchIndexes;
				})
			}
		};

		Expr.pseudos["nth"] = Expr.pseudos["eq"];

		// Add button/input type pseudos
		for (i in { radio: true, checkbox: true, file: true, password: true, image: true }) {
			Expr.pseudos[i] = createInputPseudo(i);
		}
		for (i in { submit: true, reset: true }) {
			Expr.pseudos[i] = createButtonPseudo(i);
		}

		// Easy API for creating new setFilters
		function setFilters() {}
		setFilters.prototype = Expr.filters = Expr.pseudos;
		Expr.setFilters = new setFilters();

		tokenize = Sizzle.tokenize = function (selector, parseOnly) {
			var matched,
			    match,
			    tokens,
			    type,
			    soFar,
			    groups,
			    preFilters,
			    cached = tokenCache[selector + " "];

			if (cached) {
				return parseOnly ? 0 : cached.slice(0);
			}

			soFar = selector;
			groups = [];
			preFilters = Expr.preFilter;

			while (soFar) {

				// Comma and first run
				if (!matched || (match = rcomma.exec(soFar))) {
					if (match) {
						// Don't consume trailing commas as valid
						soFar = soFar.slice(match[0].length) || soFar;
					}
					groups.push(tokens = []);
				}

				matched = false;

				// Combinators
				if (match = rcombinators.exec(soFar)) {
					matched = match.shift();
					tokens.push({
						value: matched,
						// Cast descendant combinators to space
						type: match[0].replace(rtrim, " ")
					});
					soFar = soFar.slice(matched.length);
				}

				// Filters
				for (type in Expr.filter) {
					if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] || (match = preFilters[type](match)))) {
						matched = match.shift();
						tokens.push({
							value: matched,
							type: type,
							matches: match
						});
						soFar = soFar.slice(matched.length);
					}
				}

				if (!matched) {
					break;
				}
			}

			// Return the length of the invalid excess
			// if we're just parsing
			// Otherwise, throw an error or return tokens
			return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) :
			// Cache the tokens
			tokenCache(selector, groups).slice(0);
		};

		function toSelector(tokens) {
			var i = 0,
			    len = tokens.length,
			    selector = "";
			for (; i < len; i++) {
				selector += tokens[i].value;
			}
			return selector;
		}

		function addCombinator(matcher, combinator, base) {
			var dir = combinator.dir,
			    checkNonElements = base && dir === "parentNode",
			    doneName = done++;

			return combinator.first ?
			// Check against closest ancestor/preceding element
			function (elem, context, xml) {
				while (elem = elem[dir]) {
					if (elem.nodeType === 1 || checkNonElements) {
						return matcher(elem, context, xml);
					}
				}
			} :

			// Check against all ancestor/preceding elements
			function (elem, context, xml) {
				var oldCache,
				    uniqueCache,
				    outerCache,
				    newCache = [dirruns, doneName];

				// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
				if (xml) {
					while (elem = elem[dir]) {
						if (elem.nodeType === 1 || checkNonElements) {
							if (matcher(elem, context, xml)) {
								return true;
							}
						}
					}
				} else {
					while (elem = elem[dir]) {
						if (elem.nodeType === 1 || checkNonElements) {
							outerCache = elem[expando] || (elem[expando] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[elem.uniqueID] || (outerCache[elem.uniqueID] = {});

							if ((oldCache = uniqueCache[dir]) && oldCache[0] === dirruns && oldCache[1] === doneName) {

								// Assign to newCache so results back-propagate to previous elements
								return newCache[2] = oldCache[2];
							} else {
								// Reuse newcache so results back-propagate to previous elements
								uniqueCache[dir] = newCache;

								// A match means we're done; a fail means we have to keep checking
								if (newCache[2] = matcher(elem, context, xml)) {
									return true;
								}
							}
						}
					}
				}
			};
		}

		function elementMatcher(matchers) {
			return matchers.length > 1 ? function (elem, context, xml) {
				var i = matchers.length;
				while (i--) {
					if (!matchers[i](elem, context, xml)) {
						return false;
					}
				}
				return true;
			} : matchers[0];
		}

		function multipleContexts(selector, contexts, results) {
			var i = 0,
			    len = contexts.length;
			for (; i < len; i++) {
				Sizzle(selector, contexts[i], results);
			}
			return results;
		}

		function condense(unmatched, map, filter, context, xml) {
			var elem,
			    newUnmatched = [],
			    i = 0,
			    len = unmatched.length,
			    mapped = map != null;

			for (; i < len; i++) {
				if (elem = unmatched[i]) {
					if (!filter || filter(elem, context, xml)) {
						newUnmatched.push(elem);
						if (mapped) {
							map.push(i);
						}
					}
				}
			}

			return newUnmatched;
		}

		function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
			if (postFilter && !postFilter[expando]) {
				postFilter = setMatcher(postFilter);
			}
			if (postFinder && !postFinder[expando]) {
				postFinder = setMatcher(postFinder, postSelector);
			}
			return markFunction(function (seed, results, context, xml) {
				var temp,
				    i,
				    elem,
				    preMap = [],
				    postMap = [],
				    preexisting = results.length,


				// Get initial elements from seed or context
				elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []),


				// Prefilter to get matcher input, preserving a map for seed-results synchronization
				matcherIn = preFilter && (seed || !selector) ? condense(elems, preMap, preFilter, context, xml) : elems,
				    matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || (seed ? preFilter : preexisting || postFilter) ?

				// ...intermediate processing is necessary
				[] :

				// ...otherwise use results directly
				results : matcherIn;

				// Find primary matches
				if (matcher) {
					matcher(matcherIn, matcherOut, context, xml);
				}

				// Apply postFilter
				if (postFilter) {
					temp = condense(matcherOut, postMap);
					postFilter(temp, [], context, xml);

					// Un-match failing elements by moving them back to matcherIn
					i = temp.length;
					while (i--) {
						if (elem = temp[i]) {
							matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
						}
					}
				}

				if (seed) {
					if (postFinder || preFilter) {
						if (postFinder) {
							// Get the final matcherOut by condensing this intermediate into postFinder contexts
							temp = [];
							i = matcherOut.length;
							while (i--) {
								if (elem = matcherOut[i]) {
									// Restore matcherIn since elem is not yet a final match
									temp.push(matcherIn[i] = elem);
								}
							}
							postFinder(null, matcherOut = [], temp, xml);
						}

						// Move matched elements from seed to results to keep them synchronized
						i = matcherOut.length;
						while (i--) {
							if ((elem = matcherOut[i]) && (temp = postFinder ? indexOf(seed, elem) : preMap[i]) > -1) {

								seed[temp] = !(results[temp] = elem);
							}
						}
					}

					// Add elements to results, through postFinder if defined
				} else {
						matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut);
						if (postFinder) {
							postFinder(null, results, matcherOut, xml);
						} else {
							push.apply(results, matcherOut);
						}
					}
			});
		}

		function matcherFromTokens(tokens) {
			var checkContext,
			    matcher,
			    j,
			    len = tokens.length,
			    leadingRelative = Expr.relative[tokens[0].type],
			    implicitRelative = leadingRelative || Expr.relative[" "],
			    i = leadingRelative ? 1 : 0,


			// The foundational matcher ensures that elements are reachable from top-level context(s)
			matchContext = addCombinator(function (elem) {
				return elem === checkContext;
			}, implicitRelative, true),
			    matchAnyContext = addCombinator(function (elem) {
				return indexOf(checkContext, elem) > -1;
			}, implicitRelative, true),
			    matchers = [function (elem, context, xml) {
				var ret = !leadingRelative && (xml || context !== outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
				// Avoid hanging onto element (issue #299)
				checkContext = null;
				return ret;
			}];

			for (; i < len; i++) {
				if (matcher = Expr.relative[tokens[i].type]) {
					matchers = [addCombinator(elementMatcher(matchers), matcher)];
				} else {
					matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);

					// Return special upon seeing a positional matcher
					if (matcher[expando]) {
						// Find the next relative operator (if any) for proper handling
						j = ++i;
						for (; j < len; j++) {
							if (Expr.relative[tokens[j].type]) {
								break;
							}
						}
						return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice(0, i - 1).concat({ value: tokens[i - 2].type === " " ? "*" : "" })).replace(rtrim, "$1"), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens(tokens = tokens.slice(j)), j < len && toSelector(tokens));
					}
					matchers.push(matcher);
				}
			}

			return elementMatcher(matchers);
		}

		function matcherFromGroupMatchers(elementMatchers, setMatchers) {
			var bySet = setMatchers.length > 0,
			    byElement = elementMatchers.length > 0,
			    superMatcher = function (seed, context, xml, results, outermost) {
				var elem,
				    j,
				    matcher,
				    matchedCount = 0,
				    i = "0",
				    unmatched = seed && [],
				    setMatched = [],
				    contextBackup = outermostContext,

				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]("*", outermost),

				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = dirruns += contextBackup == null ? 1 : Math.random() || 0.1,
				    len = elems.length;

				if (outermost) {
					outermostContext = context === document || context || outermost;
				}

				// Add elements passing elementMatchers directly to results
				// Support: IE<9, Safari
				// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
				for (; i !== len && (elem = elems[i]) != null; i++) {
					if (byElement && elem) {
						j = 0;
						if (!context && elem.ownerDocument !== document) {
							setDocument(elem);
							xml = !documentIsHTML;
						}
						while (matcher = elementMatchers[j++]) {
							if (matcher(elem, context || document, xml)) {
								results.push(elem);
								break;
							}
						}
						if (outermost) {
							dirruns = dirrunsUnique;
						}
					}

					// Track unmatched elements for set filters
					if (bySet) {
						// They will have gone through all possible matchers
						if (elem = !matcher && elem) {
							matchedCount--;
						}

						// Lengthen the array for every element, matched or not
						if (seed) {
							unmatched.push(elem);
						}
					}
				}

				// `i` is now the count of elements visited above, and adding it to `matchedCount`
				// makes the latter nonnegative.
				matchedCount += i;

				// Apply set filters to unmatched elements
				// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
				// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
				// no element matchers and no seed.
				// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
				// case, which will result in a "00" `matchedCount` that differs from `i` but is also
				// numerically zero.
				if (bySet && i !== matchedCount) {
					j = 0;
					while (matcher = setMatchers[j++]) {
						matcher(unmatched, setMatched, context, xml);
					}

					if (seed) {
						// Reintegrate element matches to eliminate the need for sorting
						if (matchedCount > 0) {
							while (i--) {
								if (!(unmatched[i] || setMatched[i])) {
									setMatched[i] = pop.call(results);
								}
							}
						}

						// Discard index placeholder values to get only actual matches
						setMatched = condense(setMatched);
					}

					// Add matches to results
					push.apply(results, setMatched);

					// Seedless set matches succeeding multiple successful matchers stipulate sorting
					if (outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1) {

						Sizzle.uniqueSort(results);
					}
				}

				// Override manipulation of globals by nested matchers
				if (outermost) {
					dirruns = dirrunsUnique;
					outermostContext = contextBackup;
				}

				return unmatched;
			};

			return bySet ? markFunction(superMatcher) : superMatcher;
		}

		compile = Sizzle.compile = function (selector, match /* Internal Use Only */) {
			var i,
			    setMatchers = [],
			    elementMatchers = [],
			    cached = compilerCache[selector + " "];

			if (!cached) {
				// Generate a function of recursive functions that can be used to check each element
				if (!match) {
					match = tokenize(selector);
				}
				i = match.length;
				while (i--) {
					cached = matcherFromTokens(match[i]);
					if (cached[expando]) {
						setMatchers.push(cached);
					} else {
						elementMatchers.push(cached);
					}
				}

				// Cache the compiled function
				cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));

				// Save selector and tokenization
				cached.selector = selector;
			}
			return cached;
		};

		/**
   * A low-level selection function that works with Sizzle's compiled
   *  selector functions
   * @param {String|Function} selector A selector or a pre-compiled
   *  selector function built with Sizzle.compile
   * @param {Element} context
   * @param {Array} [results]
   * @param {Array} [seed] A set of elements to match against
   */
		select = Sizzle.select = function (selector, context, results, seed) {
			var i,
			    tokens,
			    token,
			    type,
			    find,
			    compiled = typeof selector === "function" && selector,
			    match = !seed && tokenize(selector = compiled.selector || selector);

			results = results || [];

			// Try to minimize operations if there is only one selector in the list and no seed
			// (the latter of which guarantees us context)
			if (match.length === 1) {

				// Reduce context if the leading compound selector is an ID
				tokens = match[0] = match[0].slice(0);
				if (tokens.length > 2 && (token = tokens[0]).type === "ID" && support.getById && context.nodeType === 9 && documentIsHTML && Expr.relative[tokens[1].type]) {

					context = (Expr.find["ID"](token.matches[0].replace(runescape, funescape), context) || [])[0];
					if (!context) {
						return results;

						// Precompiled matchers will still verify ancestry, so step up a level
					} else if (compiled) {
							context = context.parentNode;
						}

					selector = selector.slice(tokens.shift().value.length);
				}

				// Fetch a seed set for right-to-left matching
				i = matchExpr["needsContext"].test(selector) ? 0 : tokens.length;
				while (i--) {
					token = tokens[i];

					// Abort if we hit a combinator
					if (Expr.relative[type = token.type]) {
						break;
					}
					if (find = Expr.find[type]) {
						// Search, expanding context for leading sibling combinators
						if (seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && testContext(context.parentNode) || context)) {

							// If seed is empty or no tokens remain, we can return early
							tokens.splice(i, 1);
							selector = seed.length && toSelector(tokens);
							if (!selector) {
								push.apply(results, seed);
								return results;
							}

							break;
						}
					}
				}
			}

			// Compile and execute a filtering function if one is not provided
			// Provide `match` to avoid retokenization if we modified the selector above
			(compiled || compile(selector, match))(seed, context, !documentIsHTML, results, !context || rsibling.test(selector) && testContext(context.parentNode) || context);
			return results;
		};

		// One-time assignments

		// Sort stability
		support.sortStable = expando.split("").sort(sortOrder).join("") === expando;

		// Support: Chrome 14-35+
		// Always assume duplicates if they aren't passed to the comparison function
		support.detectDuplicates = !!hasDuplicate;

		// Initialize against the default document
		setDocument();

		// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
		// Detached nodes confoundingly follow *each other*
		support.sortDetached = assert(function (div1) {
			// Should return 1, but returns 4 (following)
			return div1.compareDocumentPosition(document.createElement("div")) & 1;
		});

		// Support: IE<8
		// Prevent attribute/property "interpolation"
		// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
		if (!assert(function (div) {
			div.innerHTML = "<a href='#'></a>";
			return div.firstChild.getAttribute("href") === "#";
		})) {
			addHandle("type|href|height|width", function (elem, name, isXML) {
				if (!isXML) {
					return elem.getAttribute(name, name.toLowerCase() === "type" ? 1 : 2);
				}
			});
		}

		// Support: IE<9
		// Use defaultValue in place of getAttribute("value")
		if (!support.attributes || !assert(function (div) {
			div.innerHTML = "<input/>";
			div.firstChild.setAttribute("value", "");
			return div.firstChild.getAttribute("value") === "";
		})) {
			addHandle("value", function (elem, name, isXML) {
				if (!isXML && elem.nodeName.toLowerCase() === "input") {
					return elem.defaultValue;
				}
			});
		}

		// Support: IE<9
		// Use getAttributeNode to fetch booleans when getAttribute lies
		if (!assert(function (div) {
			return div.getAttribute("disabled") == null;
		})) {
			addHandle(booleans, function (elem, name, isXML) {
				var val;
				if (!isXML) {
					return elem[name] === true ? name.toLowerCase() : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
				}
			});
		}

		return Sizzle;
	}(window);

	jQuery.find = Sizzle;
	jQuery.expr = Sizzle.selectors;
	jQuery.expr[":"] = jQuery.expr.pseudos;
	jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
	jQuery.text = Sizzle.getText;
	jQuery.isXMLDoc = Sizzle.isXML;
	jQuery.contains = Sizzle.contains;

	var dir = function (elem, dir, until) {
		var matched = [],
		    truncate = until !== undefined;

		while ((elem = elem[dir]) && elem.nodeType !== 9) {
			if (elem.nodeType === 1) {
				if (truncate && jQuery(elem).is(until)) {
					break;
				}
				matched.push(elem);
			}
		}
		return matched;
	};

	var siblings = function (n, elem) {
		var matched = [];

		for (; n; n = n.nextSibling) {
			if (n.nodeType === 1 && n !== elem) {
				matched.push(n);
			}
		}

		return matched;
	};

	var rneedsContext = jQuery.expr.match.needsContext;

	var rsingleTag = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/;

	var risSimple = /^.[^:#\[\.,]*$/;

	// Implement the identical functionality for filter and not
	function winnow(elements, qualifier, not) {
		if (jQuery.isFunction(qualifier)) {
			return jQuery.grep(elements, function (elem, i) {
				/* jshint -W018 */
				return !!qualifier.call(elem, i, elem) !== not;
			});
		}

		if (qualifier.nodeType) {
			return jQuery.grep(elements, function (elem) {
				return elem === qualifier !== not;
			});
		}

		if (typeof qualifier === "string") {
			if (risSimple.test(qualifier)) {
				return jQuery.filter(qualifier, elements, not);
			}

			qualifier = jQuery.filter(qualifier, elements);
		}

		return jQuery.grep(elements, function (elem) {
			return indexOf.call(qualifier, elem) > -1 !== not;
		});
	}

	jQuery.filter = function (expr, elems, not) {
		var elem = elems[0];

		if (not) {
			expr = ":not(" + expr + ")";
		}

		return elems.length === 1 && elem.nodeType === 1 ? jQuery.find.matchesSelector(elem, expr) ? [elem] : [] : jQuery.find.matches(expr, jQuery.grep(elems, function (elem) {
			return elem.nodeType === 1;
		}));
	};

	jQuery.fn.extend({
		find: function (selector) {
			var i,
			    len = this.length,
			    ret = [],
			    self = this;

			if (typeof selector !== "string") {
				return this.pushStack(jQuery(selector).filter(function () {
					for (i = 0; i < len; i++) {
						if (jQuery.contains(self[i], this)) {
							return true;
						}
					}
				}));
			}

			for (i = 0; i < len; i++) {
				jQuery.find(selector, self[i], ret);
			}

			// Needed because $( selector, context ) becomes $( context ).find( selector )
			ret = this.pushStack(len > 1 ? jQuery.unique(ret) : ret);
			ret.selector = this.selector ? this.selector + " " + selector : selector;
			return ret;
		},
		filter: function (selector) {
			return this.pushStack(winnow(this, selector || [], false));
		},
		not: function (selector) {
			return this.pushStack(winnow(this, selector || [], true));
		},
		is: function (selector) {
			return !!winnow(this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test(selector) ? jQuery(selector) : selector || [], false).length;
		}
	});

	// Initialize a jQuery object

	// A central reference to the root jQuery(document)
	var rootjQuery,


	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
	    init = jQuery.fn.init = function (selector, context, root) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if (!selector) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if (typeof selector === "string") {
			if (selector[0] === "<" && selector[selector.length - 1] === ">" && selector.length >= 3) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [null, selector, null];
			} else {
				match = rquickExpr.exec(selector);
			}

			// Match html or make sure no context is specified for #id
			if (match && (match[1] || !context)) {

				// HANDLE: $(html) -> $(array)
				if (match[1]) {
					context = context instanceof jQuery ? context[0] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, true));

					// HANDLE: $(html, props)
					if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
						for (match in context) {

							// Properties of context are called as methods if possible
							if (jQuery.isFunction(this[match])) {
								this[match](context[match]);

								// ...and otherwise set as attributes
							} else {
									this.attr(match, context[match]);
								}
						}
					}

					return this;

					// HANDLE: $(#id)
				} else {
						elem = document.getElementById(match[2]);

						// Support: Blackberry 4.6
						// gEBID returns nodes no longer in the document (#6963)
						if (elem && elem.parentNode) {

							// Inject the element directly into the jQuery object
							this.length = 1;
							this[0] = elem;
						}

						this.context = document;
						this.selector = selector;
						return this;
					}

				// HANDLE: $(expr, $(...))
			} else if (!context || context.jquery) {
					return (context || root).find(selector);

					// HANDLE: $(expr, context)
					// (which is just equivalent to: $(context).find(expr)
				} else {
						return this.constructor(context).find(selector);
					}

			// HANDLE: $(DOMElement)
		} else if (selector.nodeType) {
				this.context = this[0] = selector;
				this.length = 1;
				return this;

				// HANDLE: $(function)
				// Shortcut for document ready
			} else if (jQuery.isFunction(selector)) {
					return root.ready !== undefined ? root.ready(selector) :

					// Execute immediately if ready is not present
					selector(jQuery);
				}

		if (selector.selector !== undefined) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray(selector, this);
	};

	// Give the init function the jQuery prototype for later instantiation
	init.prototype = jQuery.fn;

	// Initialize central reference
	rootjQuery = jQuery(document);

	var rparentsprev = /^(?:parents|prev(?:Until|All))/,


	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

	jQuery.fn.extend({
		has: function (target) {
			var targets = jQuery(target, this),
			    l = targets.length;

			return this.filter(function () {
				var i = 0;
				for (; i < l; i++) {
					if (jQuery.contains(this, targets[i])) {
						return true;
					}
				}
			});
		},

		closest: function (selectors, context) {
			var cur,
			    i = 0,
			    l = this.length,
			    matched = [],
			    pos = rneedsContext.test(selectors) || typeof selectors !== "string" ? jQuery(selectors, context || this.context) : 0;

			for (; i < l; i++) {
				for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {

					// Always skip document fragments
					if (cur.nodeType < 11 && (pos ? pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 && jQuery.find.matchesSelector(cur, selectors))) {

						matched.push(cur);
						break;
					}
				}
			}

			return this.pushStack(matched.length > 1 ? jQuery.uniqueSort(matched) : matched);
		},

		// Determine the position of an element within the set
		index: function (elem) {

			// No argument, return index in parent
			if (!elem) {
				return this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
			}

			// Index in selector
			if (typeof elem === "string") {
				return indexOf.call(jQuery(elem), this[0]);
			}

			// Locate the position of the desired element
			return indexOf.call(this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem);
		},

		add: function (selector, context) {
			return this.pushStack(jQuery.uniqueSort(jQuery.merge(this.get(), jQuery(selector, context))));
		},

		addBack: function (selector) {
			return this.add(selector == null ? this.prevObject : this.prevObject.filter(selector));
		}
	});

	function sibling(cur, dir) {
		while ((cur = cur[dir]) && cur.nodeType !== 1) {}
		return cur;
	}

	jQuery.each({
		parent: function (elem) {
			var parent = elem.parentNode;
			return parent && parent.nodeType !== 11 ? parent : null;
		},
		parents: function (elem) {
			return dir(elem, "parentNode");
		},
		parentsUntil: function (elem, i, until) {
			return dir(elem, "parentNode", until);
		},
		next: function (elem) {
			return sibling(elem, "nextSibling");
		},
		prev: function (elem) {
			return sibling(elem, "previousSibling");
		},
		nextAll: function (elem) {
			return dir(elem, "nextSibling");
		},
		prevAll: function (elem) {
			return dir(elem, "previousSibling");
		},
		nextUntil: function (elem, i, until) {
			return dir(elem, "nextSibling", until);
		},
		prevUntil: function (elem, i, until) {
			return dir(elem, "previousSibling", until);
		},
		siblings: function (elem) {
			return siblings((elem.parentNode || {}).firstChild, elem);
		},
		children: function (elem) {
			return siblings(elem.firstChild);
		},
		contents: function (elem) {
			return elem.contentDocument || jQuery.merge([], elem.childNodes);
		}
	}, function (name, fn) {
		jQuery.fn[name] = function (until, selector) {
			var matched = jQuery.map(this, fn, until);

			if (name.slice(-5) !== "Until") {
				selector = until;
			}

			if (selector && typeof selector === "string") {
				matched = jQuery.filter(selector, matched);
			}

			if (this.length > 1) {

				// Remove duplicates
				if (!guaranteedUnique[name]) {
					jQuery.uniqueSort(matched);
				}

				// Reverse order for parents* and prev-derivatives
				if (rparentsprev.test(name)) {
					matched.reverse();
				}
			}

			return this.pushStack(matched);
		};
	});
	var rnotwhite = /\S+/g;

	// Convert String-formatted options into Object-formatted ones
	function createOptions(options) {
		var object = {};
		jQuery.each(options.match(rnotwhite) || [], function (_, flag) {
			object[flag] = true;
		});
		return object;
	}

	/*
  * Create a callback list using the following parameters:
  *
  *	options: an optional list of space-separated options that will change how
  *			the callback list behaves or a more traditional option object
  *
  * By default a callback list will act like an event callback list and can be
  * "fired" multiple times.
  *
  * Possible options:
  *
  *	once:			will ensure the callback list can only be fired once (like a Deferred)
  *
  *	memory:			will keep track of previous values and will call any callback added
  *					after the list has been fired right away with the latest "memorized"
  *					values (like a Deferred)
  *
  *	unique:			will ensure a callback can only be added once (no duplicate in the list)
  *
  *	stopOnFalse:	interrupt callings when a callback returns false
  *
  */
	jQuery.Callbacks = function (options) {

		// Convert options from String-formatted to Object-formatted if needed
		// (we check in cache first)
		options = typeof options === "string" ? createOptions(options) : jQuery.extend({}, options);

		var // Flag to know if list is currently firing
		firing,


		// Last fire value for non-forgettable lists
		memory,


		// Flag to know if list was already fired
		fired,


		// Flag to prevent firing
		locked,


		// Actual callback list
		list = [],


		// Queue of execution data for repeatable lists
		queue = [],


		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,


		// Fire callbacks
		fire = function () {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for (; queue.length; firingIndex = -1) {
				memory = queue.shift();
				while (++firingIndex < list.length) {

					// Run callback and check for early termination
					if (list[firingIndex].apply(memory[0], memory[1]) === false && options.stopOnFalse) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if (!options.memory) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if (locked) {

				// Keep an empty list if we have data for future add calls
				if (memory) {
					list = [];

					// Otherwise, this object is spent
				} else {
						list = "";
					}
			}
		},


		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function () {
				if (list) {

					// If we have memory from a past run, we should fire after adding
					if (memory && !firing) {
						firingIndex = list.length - 1;
						queue.push(memory);
					}

					(function add(args) {
						jQuery.each(args, function (_, arg) {
							if (jQuery.isFunction(arg)) {
								if (!options.unique || !self.has(arg)) {
									list.push(arg);
								}
							} else if (arg && arg.length && jQuery.type(arg) !== "string") {

								// Inspect recursively
								add(arg);
							}
						});
					})(arguments);

					if (memory && !firing) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function () {
				jQuery.each(arguments, function (_, arg) {
					var index;
					while ((index = jQuery.inArray(arg, list, index)) > -1) {
						list.splice(index, 1);

						// Handle firing indexes
						if (index <= firingIndex) {
							firingIndex--;
						}
					}
				});
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function (fn) {
				return fn ? jQuery.inArray(fn, list) > -1 : list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function () {
				if (list) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function () {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function () {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function () {
				locked = queue = [];
				if (!memory) {
					list = memory = "";
				}
				return this;
			},
			locked: function () {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function (context, args) {
				if (!locked) {
					args = args || [];
					args = [context, args.slice ? args.slice() : args];
					queue.push(args);
					if (!firing) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function () {
				self.fireWith(this, arguments);
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function () {
				return !!fired;
			}
		};

		return self;
	};

	jQuery.extend({

		Deferred: function (func) {
			var tuples = [

			// action, add listener, listener list, final state
			["resolve", "done", jQuery.Callbacks("once memory"), "resolved"], ["reject", "fail", jQuery.Callbacks("once memory"), "rejected"], ["notify", "progress", jQuery.Callbacks("memory")]],
			    state = "pending",
			    promise = {
				state: function () {
					return state;
				},
				always: function () {
					deferred.done(arguments).fail(arguments);
					return this;
				},
				then: function () /* fnDone, fnFail, fnProgress */{
					var fns = arguments;
					return jQuery.Deferred(function (newDefer) {
						jQuery.each(tuples, function (i, tuple) {
							var fn = jQuery.isFunction(fns[i]) && fns[i];

							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[tuple[1]](function () {
								var returned = fn && fn.apply(this, arguments);
								if (returned && jQuery.isFunction(returned.promise)) {
									returned.promise().progress(newDefer.notify).done(newDefer.resolve).fail(newDefer.reject);
								} else {
									newDefer[tuple[0] + "With"](this === promise ? newDefer.promise() : this, fn ? [returned] : arguments);
								}
							});
						});
						fns = null;
					}).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function (obj) {
					return obj != null ? jQuery.extend(obj, promise) : promise;
				}
			},
			    deferred = {};

			// Keep pipe for back-compat
			promise.pipe = promise.then;

			// Add list-specific methods
			jQuery.each(tuples, function (i, tuple) {
				var list = tuple[2],
				    stateString = tuple[3];

				// promise[ done | fail | progress ] = list.add
				promise[tuple[1]] = list.add;

				// Handle state
				if (stateString) {
					list.add(function () {

						// state = [ resolved | rejected ]
						state = stateString;

						// [ reject_list | resolve_list ].disable; progress_list.lock
					}, tuples[i ^ 1][2].disable, tuples[2][2].lock);
				}

				// deferred[ resolve | reject | notify ]
				deferred[tuple[0]] = function () {
					deferred[tuple[0] + "With"](this === deferred ? promise : this, arguments);
					return this;
				};
				deferred[tuple[0] + "With"] = list.fireWith;
			});

			// Make the deferred a promise
			promise.promise(deferred);

			// Call given func if any
			if (func) {
				func.call(deferred, deferred);
			}

			// All done!
			return deferred;
		},

		// Deferred helper
		when: function (subordinate /* , ..., subordinateN */) {
			var i = 0,
			    resolveValues = slice.call(arguments),
			    length = resolveValues.length,


			// the count of uncompleted subordinates
			remaining = length !== 1 || subordinate && jQuery.isFunction(subordinate.promise) ? length : 0,


			// the master Deferred.
			// If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),


			// Update function for both resolve and progress values
			updateFunc = function (i, contexts, values) {
				return function (value) {
					contexts[i] = this;
					values[i] = arguments.length > 1 ? slice.call(arguments) : value;
					if (values === progressValues) {
						deferred.notifyWith(contexts, values);
					} else if (! --remaining) {
						deferred.resolveWith(contexts, values);
					}
				};
			},
			    progressValues,
			    progressContexts,
			    resolveContexts;

			// Add listeners to Deferred subordinates; treat others as resolved
			if (length > 1) {
				progressValues = new Array(length);
				progressContexts = new Array(length);
				resolveContexts = new Array(length);
				for (; i < length; i++) {
					if (resolveValues[i] && jQuery.isFunction(resolveValues[i].promise)) {
						resolveValues[i].promise().progress(updateFunc(i, progressContexts, progressValues)).done(updateFunc(i, resolveContexts, resolveValues)).fail(deferred.reject);
					} else {
						--remaining;
					}
				}
			}

			// If we're not waiting on anything, resolve the master
			if (!remaining) {
				deferred.resolveWith(resolveContexts, resolveValues);
			}

			return deferred.promise();
		}
	});

	// The deferred used on DOM ready
	var readyList;

	jQuery.fn.ready = function (fn) {

		// Add the callback
		jQuery.ready.promise().done(fn);

		return this;
	};

	jQuery.extend({

		// Is the DOM ready to be used? Set to true once it occurs.
		isReady: false,

		// A counter to track how many items to wait for before
		// the ready event fires. See #6781
		readyWait: 1,

		// Hold (or release) the ready event
		holdReady: function (hold) {
			if (hold) {
				jQuery.readyWait++;
			} else {
				jQuery.ready(true);
			}
		},

		// Handle when the DOM is ready
		ready: function (wait) {

			// Abort if there are pending holds or we're already ready
			if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
				return;
			}

			// Remember that the DOM is ready
			jQuery.isReady = true;

			// If a normal DOM Ready event fired, decrement, and wait if need be
			if (wait !== true && --jQuery.readyWait > 0) {
				return;
			}

			// If there are functions bound, to execute
			readyList.resolveWith(document, [jQuery]);

			// Trigger any bound ready events
			if (jQuery.fn.triggerHandler) {
				jQuery(document).triggerHandler("ready");
				jQuery(document).off("ready");
			}
		}
	});

	/**
  * The ready event handler and self cleanup method
  */
	function completed() {
		document.removeEventListener("DOMContentLoaded", completed);
		window.removeEventListener("load", completed);
		jQuery.ready();
	}

	jQuery.ready.promise = function (obj) {
		if (!readyList) {

			readyList = jQuery.Deferred();

			// Catch cases where $(document).ready() is called
			// after the browser event has already occurred.
			// Support: IE9-10 only
			// Older IE sometimes signals "interactive" too soon
			if (document.readyState === "complete" || document.readyState !== "loading" && !document.documentElement.doScroll) {

				// Handle it asynchronously to allow scripts the opportunity to delay ready
				window.setTimeout(jQuery.ready);
			} else {

				// Use the handy event callback
				document.addEventListener("DOMContentLoaded", completed);

				// A fallback to window.onload, that will always work
				window.addEventListener("load", completed);
			}
		}
		return readyList.promise(obj);
	};

	// Kick off the DOM ready check even if the user does not
	jQuery.ready.promise();

	// Multifunctional method to get and set values of a collection
	// The value/s can optionally be executed if it's a function
	var access = function (elems, fn, key, value, chainable, emptyGet, raw) {
		var i = 0,
		    len = elems.length,
		    bulk = key == null;

		// Sets many values
		if (jQuery.type(key) === "object") {
			chainable = true;
			for (i in key) {
				access(elems, fn, i, key[i], true, emptyGet, raw);
			}

			// Sets one value
		} else if (value !== undefined) {
				chainable = true;

				if (!jQuery.isFunction(value)) {
					raw = true;
				}

				if (bulk) {

					// Bulk operations run against the entire set
					if (raw) {
						fn.call(elems, value);
						fn = null;

						// ...except when executing function values
					} else {
							bulk = fn;
							fn = function (elem, key, value) {
								return bulk.call(jQuery(elem), value);
							};
						}
				}

				if (fn) {
					for (; i < len; i++) {
						fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
					}
				}
			}

		return chainable ? elems :

		// Gets
		bulk ? fn.call(elems) : len ? fn(elems[0], key) : emptyGet;
	};
	var acceptData = function (owner) {

		// Accepts only:
		//  - Node
		//    - Node.ELEMENT_NODE
		//    - Node.DOCUMENT_NODE
		//  - Object
		//    - Any
		/* jshint -W018 */
		return owner.nodeType === 1 || owner.nodeType === 9 || ! +owner.nodeType;
	};

	function Data() {
		this.expando = jQuery.expando + Data.uid++;
	}

	Data.uid = 1;

	Data.prototype = {

		register: function (owner, initial) {
			var value = initial || {};

			// If it is a node unlikely to be stringify-ed or looped over
			// use plain assignment
			if (owner.nodeType) {
				owner[this.expando] = value;

				// Otherwise secure it in a non-enumerable, non-writable property
				// configurability must be true to allow the property to be
				// deleted with the delete operator
			} else {
					Object.defineProperty(owner, this.expando, {
						value: value,
						writable: true,
						configurable: true
					});
				}
			return owner[this.expando];
		},
		cache: function (owner) {

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if (!acceptData(owner)) {
				return {};
			}

			// Check if the owner object already has a cache
			var value = owner[this.expando];

			// If not, create one
			if (!value) {
				value = {};

				// We can accept data for non-element nodes in modern browsers,
				// but we should not, see #8335.
				// Always return an empty object.
				if (acceptData(owner)) {

					// If it is a node unlikely to be stringify-ed or looped over
					// use plain assignment
					if (owner.nodeType) {
						owner[this.expando] = value;

						// Otherwise secure it in a non-enumerable property
						// configurable must be true to allow the property to be
						// deleted when data is removed
					} else {
							Object.defineProperty(owner, this.expando, {
								value: value,
								configurable: true
							});
						}
				}
			}

			return value;
		},
		set: function (owner, data, value) {
			var prop,
			    cache = this.cache(owner);

			// Handle: [ owner, key, value ] args
			if (typeof data === "string") {
				cache[data] = value;

				// Handle: [ owner, { properties } ] args
			} else {

					// Copy the properties one-by-one to the cache object
					for (prop in data) {
						cache[prop] = data[prop];
					}
				}
			return cache;
		},
		get: function (owner, key) {
			return key === undefined ? this.cache(owner) : owner[this.expando] && owner[this.expando][key];
		},
		access: function (owner, key, value) {
			var stored;

			// In cases where either:
			//
			//   1. No key was specified
			//   2. A string key was specified, but no value provided
			//
			// Take the "read" path and allow the get method to determine
			// which value to return, respectively either:
			//
			//   1. The entire cache object
			//   2. The data stored at the key
			//
			if (key === undefined || key && typeof key === "string" && value === undefined) {

				stored = this.get(owner, key);

				return stored !== undefined ? stored : this.get(owner, jQuery.camelCase(key));
			}

			// When the key is not a string, or both a key and value
			// are specified, set or extend (existing objects) with either:
			//
			//   1. An object of properties
			//   2. A key and value
			//
			this.set(owner, key, value);

			// Since the "set" path can have two possible entry points
			// return the expected data based on which path was taken[*]
			return value !== undefined ? value : key;
		},
		remove: function (owner, key) {
			var i,
			    name,
			    camel,
			    cache = owner[this.expando];

			if (cache === undefined) {
				return;
			}

			if (key === undefined) {
				this.register(owner);
			} else {

				// Support array or space separated string of keys
				if (jQuery.isArray(key)) {

					// If "name" is an array of keys...
					// When data is initially created, via ("key", "val") signature,
					// keys will be converted to camelCase.
					// Since there is no way to tell _how_ a key was added, remove
					// both plain key and camelCase key. #12786
					// This will only penalize the array argument path.
					name = key.concat(key.map(jQuery.camelCase));
				} else {
					camel = jQuery.camelCase(key);

					// Try the string as a key before any manipulation
					if (key in cache) {
						name = [key, camel];
					} else {

						// If a key with the spaces exists, use it.
						// Otherwise, create an array by matching non-whitespace
						name = camel;
						name = name in cache ? [name] : name.match(rnotwhite) || [];
					}
				}

				i = name.length;

				while (i--) {
					delete cache[name[i]];
				}
			}

			// Remove the expando if there's no more data
			if (key === undefined || jQuery.isEmptyObject(cache)) {

				// Support: Chrome <= 35-45+
				// Webkit & Blink performance suffers when deleting properties
				// from DOM nodes, so set to undefined instead
				// https://code.google.com/p/chromium/issues/detail?id=378607
				if (owner.nodeType) {
					owner[this.expando] = undefined;
				} else {
					delete owner[this.expando];
				}
			}
		},
		hasData: function (owner) {
			var cache = owner[this.expando];
			return cache !== undefined && !jQuery.isEmptyObject(cache);
		}
	};
	var dataPriv = new Data();

	var dataUser = new Data();

	//	Implementation Summary
	//
	//	1. Enforce API surface and semantic compatibility with 1.9.x branch
	//	2. Improve the module's maintainability by reducing the storage
	//		paths to a single mechanism.
	//	3. Use the same single mechanism to support "private" and "user" data.
	//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
	//	5. Avoid exposing implementation details on user objects (eg. expando properties)
	//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

	var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	    rmultiDash = /[A-Z]/g;

	function dataAttr(elem, key, data) {
		var name;

		// If nothing was found internally, try to fetch any
		// data from the HTML5 data-* attribute
		if (data === undefined && elem.nodeType === 1) {
			name = "data-" + key.replace(rmultiDash, "-$&").toLowerCase();
			data = elem.getAttribute(name);

			if (typeof data === "string") {
				try {
					data = data === "true" ? true : data === "false" ? false : data === "null" ? null :

					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data : rbrace.test(data) ? jQuery.parseJSON(data) : data;
				} catch (e) {}

				// Make sure we set the data so it isn't changed later
				dataUser.set(elem, key, data);
			} else {
				data = undefined;
			}
		}
		return data;
	}

	jQuery.extend({
		hasData: function (elem) {
			return dataUser.hasData(elem) || dataPriv.hasData(elem);
		},

		data: function (elem, name, data) {
			return dataUser.access(elem, name, data);
		},

		removeData: function (elem, name) {
			dataUser.remove(elem, name);
		},

		// TODO: Now that all calls to _data and _removeData have been replaced
		// with direct calls to dataPriv methods, these can be deprecated.
		_data: function (elem, name, data) {
			return dataPriv.access(elem, name, data);
		},

		_removeData: function (elem, name) {
			dataPriv.remove(elem, name);
		}
	});

	jQuery.fn.extend({
		data: function (key, value) {
			var i,
			    name,
			    data,
			    elem = this[0],
			    attrs = elem && elem.attributes;

			// Gets all values
			if (key === undefined) {
				if (this.length) {
					data = dataUser.get(elem);

					if (elem.nodeType === 1 && !dataPriv.get(elem, "hasDataAttrs")) {
						i = attrs.length;
						while (i--) {

							// Support: IE11+
							// The attrs elements can be null (#14894)
							if (attrs[i]) {
								name = attrs[i].name;
								if (name.indexOf("data-") === 0) {
									name = jQuery.camelCase(name.slice(5));
									dataAttr(elem, name, data[name]);
								}
							}
						}
						dataPriv.set(elem, "hasDataAttrs", true);
					}
				}

				return data;
			}

			// Sets multiple values
			if (typeof key === "object") {
				return this.each(function () {
					dataUser.set(this, key);
				});
			}

			return access(this, function (value) {
				var data, camelKey;

				// The calling jQuery object (element matches) is not empty
				// (and therefore has an element appears at this[ 0 ]) and the
				// `value` parameter was not undefined. An empty jQuery object
				// will result in `undefined` for elem = this[ 0 ] which will
				// throw an exception if an attempt to read a data cache is made.
				if (elem && value === undefined) {

					// Attempt to get data from the cache
					// with the key as-is
					data = dataUser.get(elem, key) ||

					// Try to find dashed key if it exists (gh-2779)
					// This is for 2.2.x only
					dataUser.get(elem, key.replace(rmultiDash, "-$&").toLowerCase());

					if (data !== undefined) {
						return data;
					}

					camelKey = jQuery.camelCase(key);

					// Attempt to get data from the cache
					// with the key camelized
					data = dataUser.get(elem, camelKey);
					if (data !== undefined) {
						return data;
					}

					// Attempt to "discover" the data in
					// HTML5 custom data-* attrs
					data = dataAttr(elem, camelKey, undefined);
					if (data !== undefined) {
						return data;
					}

					// We tried really hard, but the data doesn't exist.
					return;
				}

				// Set the data...
				camelKey = jQuery.camelCase(key);
				this.each(function () {

					// First, attempt to store a copy or reference of any
					// data that might've been store with a camelCased key.
					var data = dataUser.get(this, camelKey);

					// For HTML5 data-* attribute interop, we have to
					// store property names with dashes in a camelCase form.
					// This might not apply to all properties...*
					dataUser.set(this, camelKey, value);

					// *... In the case of properties that might _actually_
					// have dashes, we need to also store a copy of that
					// unchanged property.
					if (key.indexOf("-") > -1 && data !== undefined) {
						dataUser.set(this, key, value);
					}
				});
			}, null, value, arguments.length > 1, null, true);
		},

		removeData: function (key) {
			return this.each(function () {
				dataUser.remove(this, key);
			});
		}
	});

	jQuery.extend({
		queue: function (elem, type, data) {
			var queue;

			if (elem) {
				type = (type || "fx") + "queue";
				queue = dataPriv.get(elem, type);

				// Speed up dequeue by getting out quickly if this is just a lookup
				if (data) {
					if (!queue || jQuery.isArray(data)) {
						queue = dataPriv.access(elem, type, jQuery.makeArray(data));
					} else {
						queue.push(data);
					}
				}
				return queue || [];
			}
		},

		dequeue: function (elem, type) {
			type = type || "fx";

			var queue = jQuery.queue(elem, type),
			    startLength = queue.length,
			    fn = queue.shift(),
			    hooks = jQuery._queueHooks(elem, type),
			    next = function () {
				jQuery.dequeue(elem, type);
			};

			// If the fx queue is dequeued, always remove the progress sentinel
			if (fn === "inprogress") {
				fn = queue.shift();
				startLength--;
			}

			if (fn) {

				// Add a progress sentinel to prevent the fx queue from being
				// automatically dequeued
				if (type === "fx") {
					queue.unshift("inprogress");
				}

				// Clear up the last queue stop function
				delete hooks.stop;
				fn.call(elem, next, hooks);
			}

			if (!startLength && hooks) {
				hooks.empty.fire();
			}
		},

		// Not public - generate a queueHooks object, or return the current one
		_queueHooks: function (elem, type) {
			var key = type + "queueHooks";
			return dataPriv.get(elem, key) || dataPriv.access(elem, key, {
				empty: jQuery.Callbacks("once memory").add(function () {
					dataPriv.remove(elem, [type + "queue", key]);
				})
			});
		}
	});

	jQuery.fn.extend({
		queue: function (type, data) {
			var setter = 2;

			if (typeof type !== "string") {
				data = type;
				type = "fx";
				setter--;
			}

			if (arguments.length < setter) {
				return jQuery.queue(this[0], type);
			}

			return data === undefined ? this : this.each(function () {
				var queue = jQuery.queue(this, type, data);

				// Ensure a hooks for this queue
				jQuery._queueHooks(this, type);

				if (type === "fx" && queue[0] !== "inprogress") {
					jQuery.dequeue(this, type);
				}
			});
		},
		dequeue: function (type) {
			return this.each(function () {
				jQuery.dequeue(this, type);
			});
		},
		clearQueue: function (type) {
			return this.queue(type || "fx", []);
		},

		// Get a promise resolved when queues of a certain type
		// are emptied (fx is the type by default)
		promise: function (type, obj) {
			var tmp,
			    count = 1,
			    defer = jQuery.Deferred(),
			    elements = this,
			    i = this.length,
			    resolve = function () {
				if (! --count) {
					defer.resolveWith(elements, [elements]);
				}
			};

			if (typeof type !== "string") {
				obj = type;
				type = undefined;
			}
			type = type || "fx";

			while (i--) {
				tmp = dataPriv.get(elements[i], type + "queueHooks");
				if (tmp && tmp.empty) {
					count++;
					tmp.empty.add(resolve);
				}
			}
			resolve();
			return defer.promise(obj);
		}
	});
	var pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source;

	var rcssNum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i");

	var cssExpand = ["Top", "Right", "Bottom", "Left"];

	var isHidden = function (elem, el) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css(elem, "display") === "none" || !jQuery.contains(elem.ownerDocument, elem);
	};

	function adjustCSS(elem, prop, valueParts, tween) {
		var adjusted,
		    scale = 1,
		    maxIterations = 20,
		    currentValue = tween ? function () {
			return tween.cur();
		} : function () {
			return jQuery.css(elem, prop, "");
		},
		    initial = currentValue(),
		    unit = valueParts && valueParts[3] || (jQuery.cssNumber[prop] ? "" : "px"),


		// Starting value computation is required for potential unit mismatches
		initialInUnit = (jQuery.cssNumber[prop] || unit !== "px" && +initial) && rcssNum.exec(jQuery.css(elem, prop));

		if (initialInUnit && initialInUnit[3] !== unit) {

			// Trust units reported by jQuery.css
			unit = unit || initialInUnit[3];

			// Make sure we update the tween properties later on
			valueParts = valueParts || [];

			// Iteratively approximate from a nonzero starting point
			initialInUnit = +initial || 1;

			do {

				// If previous iteration zeroed out, double until we get *something*.
				// Use string for doubling so we don't accidentally see scale as unchanged below
				scale = scale || ".5";

				// Adjust and apply
				initialInUnit = initialInUnit / scale;
				jQuery.style(elem, prop, initialInUnit + unit);

				// Update scale, tolerating zero or NaN from tween.cur()
				// Break the loop if scale is unchanged or perfect, or if we've just had enough.
			} while (scale !== (scale = currentValue() / initial) && scale !== 1 && --maxIterations);
		}

		if (valueParts) {
			initialInUnit = +initialInUnit || +initial || 0;

			// Apply relative offset (+=/-=) if specified
			adjusted = valueParts[1] ? initialInUnit + (valueParts[1] + 1) * valueParts[2] : +valueParts[2];
			if (tween) {
				tween.unit = unit;
				tween.start = initialInUnit;
				tween.end = adjusted;
			}
		}
		return adjusted;
	}
	var rcheckableType = /^(?:checkbox|radio)$/i;

	var rtagName = /<([\w:-]+)/;

	var rscriptType = /^$|\/(?:java|ecma)script/i;

	// We have to close these tags to support XHTML (#13200)
	var wrapMap = {

		// Support: IE9
		option: [1, "<select multiple='multiple'>", "</select>"],

		// XHTML parsers do not magically insert elements in the
		// same way that tag soup parsers do. So we cannot shorten
		// this by omitting <tbody> or other required elements.
		thead: [1, "<table>", "</table>"],
		col: [2, "<table><colgroup>", "</colgroup></table>"],
		tr: [2, "<table><tbody>", "</tbody></table>"],
		td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],

		_default: [0, "", ""]
	};

	// Support: IE9
	wrapMap.optgroup = wrapMap.option;

	wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
	wrapMap.th = wrapMap.td;

	function getAll(context, tag) {

		// Support: IE9-11+
		// Use typeof to avoid zero-argument method invocation on host objects (#15151)
		var ret = typeof context.getElementsByTagName !== "undefined" ? context.getElementsByTagName(tag || "*") : typeof context.querySelectorAll !== "undefined" ? context.querySelectorAll(tag || "*") : [];

		return tag === undefined || tag && jQuery.nodeName(context, tag) ? jQuery.merge([context], ret) : ret;
	}

	// Mark scripts as having already been evaluated
	function setGlobalEval(elems, refElements) {
		var i = 0,
		    l = elems.length;

		for (; i < l; i++) {
			dataPriv.set(elems[i], "globalEval", !refElements || dataPriv.get(refElements[i], "globalEval"));
		}
	}

	var rhtml = /<|&#?\w+;/;

	function buildFragment(elems, context, scripts, selection, ignored) {
		var elem,
		    tmp,
		    tag,
		    wrap,
		    contains,
		    j,
		    fragment = context.createDocumentFragment(),
		    nodes = [],
		    i = 0,
		    l = elems.length;

		for (; i < l; i++) {
			elem = elems[i];

			if (elem || elem === 0) {

				// Add nodes directly
				if (jQuery.type(elem) === "object") {

					// Support: Android<4.1, PhantomJS<2
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge(nodes, elem.nodeType ? [elem] : elem);

					// Convert non-html into a text node
				} else if (!rhtml.test(elem)) {
						nodes.push(context.createTextNode(elem));

						// Convert html into DOM nodes
					} else {
							tmp = tmp || fragment.appendChild(context.createElement("div"));

							// Deserialize a standard representation
							tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
							wrap = wrapMap[tag] || wrapMap._default;
							tmp.innerHTML = wrap[1] + jQuery.htmlPrefilter(elem) + wrap[2];

							// Descend through wrappers to the right content
							j = wrap[0];
							while (j--) {
								tmp = tmp.lastChild;
							}

							// Support: Android<4.1, PhantomJS<2
							// push.apply(_, arraylike) throws on ancient WebKit
							jQuery.merge(nodes, tmp.childNodes);

							// Remember the top-level container
							tmp = fragment.firstChild;

							// Ensure the created nodes are orphaned (#12392)
							tmp.textContent = "";
						}
			}
		}

		// Remove wrapper from fragment
		fragment.textContent = "";

		i = 0;
		while (elem = nodes[i++]) {

			// Skip elements already in the context collection (trac-4087)
			if (selection && jQuery.inArray(elem, selection) > -1) {
				if (ignored) {
					ignored.push(elem);
				}
				continue;
			}

			contains = jQuery.contains(elem.ownerDocument, elem);

			// Append to fragment
			tmp = getAll(fragment.appendChild(elem), "script");

			// Preserve script evaluation history
			if (contains) {
				setGlobalEval(tmp);
			}

			// Capture executables
			if (scripts) {
				j = 0;
				while (elem = tmp[j++]) {
					if (rscriptType.test(elem.type || "")) {
						scripts.push(elem);
					}
				}
			}
		}

		return fragment;
	}

	(function () {
		var fragment = document.createDocumentFragment(),
		    div = fragment.appendChild(document.createElement("div")),
		    input = document.createElement("input");

		// Support: Android 4.0-4.3, Safari<=5.1
		// Check state lost if the name is set (#11217)
		// Support: Windows Web Apps (WWA)
		// `name` and `type` must use .setAttribute for WWA (#14901)
		input.setAttribute("type", "radio");
		input.setAttribute("checked", "checked");
		input.setAttribute("name", "t");

		div.appendChild(input);

		// Support: Safari<=5.1, Android<4.2
		// Older WebKit doesn't clone checked state correctly in fragments
		support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked;

		// Support: IE<=11+
		// Make sure textarea (and checkbox) defaultValue is properly cloned
		div.innerHTML = "<textarea>x</textarea>";
		support.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue;
	})();

	var rkeyEvent = /^key/,
	    rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	    rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

	function returnTrue() {
		return true;
	}

	function returnFalse() {
		return false;
	}

	// Support: IE9
	// See #13393 for more info
	function safeActiveElement() {
		try {
			return document.activeElement;
		} catch (err) {}
	}

	function on(elem, types, selector, data, fn, one) {
		var origFn, type;

		// Types can be a map of types/handlers
		if (typeof types === "object") {

			// ( types-Object, selector, data )
			if (typeof selector !== "string") {

				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for (type in types) {
				on(elem, type, selector, data, types[type], one);
			}
			return elem;
		}

		if (data == null && fn == null) {

			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if (fn == null) {
			if (typeof selector === "string") {

				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {

				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if (fn === false) {
			fn = returnFalse;
		} else if (!fn) {
			return elem;
		}

		if (one === 1) {
			origFn = fn;
			fn = function (event) {

				// Can use an empty set, since event contains the info
				jQuery().off(event);
				return origFn.apply(this, arguments);
			};

			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
		}
		return elem.each(function () {
			jQuery.event.add(this, types, fn, data, selector);
		});
	}

	/*
  * Helper functions for managing events -- not part of the public interface.
  * Props to Dean Edwards' addEvent library for many of the ideas.
  */
	jQuery.event = {

		global: {},

		add: function (elem, types, handler, data, selector) {

			var handleObjIn,
			    eventHandle,
			    tmp,
			    events,
			    t,
			    handleObj,
			    special,
			    handlers,
			    type,
			    namespaces,
			    origType,
			    elemData = dataPriv.get(elem);

			// Don't attach events to noData or text/comment nodes (but allow plain objects)
			if (!elemData) {
				return;
			}

			// Caller can pass in an object of custom data in lieu of the handler
			if (handler.handler) {
				handleObjIn = handler;
				handler = handleObjIn.handler;
				selector = handleObjIn.selector;
			}

			// Make sure that the handler has a unique ID, used to find/remove it later
			if (!handler.guid) {
				handler.guid = jQuery.guid++;
			}

			// Init the element's event structure and main handler, if this is the first
			if (!(events = elemData.events)) {
				events = elemData.events = {};
			}
			if (!(eventHandle = elemData.handle)) {
				eventHandle = elemData.handle = function (e) {

					// Discard the second event of a jQuery.event.trigger() and
					// when an event is called after a page has unloaded
					return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ? jQuery.event.dispatch.apply(elem, arguments) : undefined;
				};
			}

			// Handle multiple events separated by a space
			types = (types || "").match(rnotwhite) || [""];
			t = types.length;
			while (t--) {
				tmp = rtypenamespace.exec(types[t]) || [];
				type = origType = tmp[1];
				namespaces = (tmp[2] || "").split(".").sort();

				// There *must* be a type, no attaching namespace-only handlers
				if (!type) {
					continue;
				}

				// If event changes its type, use the special event handlers for the changed type
				special = jQuery.event.special[type] || {};

				// If selector defined, determine special event api type, otherwise given type
				type = (selector ? special.delegateType : special.bindType) || type;

				// Update special based on newly reset type
				special = jQuery.event.special[type] || {};

				// handleObj is passed to all event handlers
				handleObj = jQuery.extend({
					type: type,
					origType: origType,
					data: data,
					handler: handler,
					guid: handler.guid,
					selector: selector,
					needsContext: selector && jQuery.expr.match.needsContext.test(selector),
					namespace: namespaces.join(".")
				}, handleObjIn);

				// Init the event handler queue if we're the first
				if (!(handlers = events[type])) {
					handlers = events[type] = [];
					handlers.delegateCount = 0;

					// Only use addEventListener if the special events handler returns false
					if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {

						if (elem.addEventListener) {
							elem.addEventListener(type, eventHandle);
						}
					}
				}

				if (special.add) {
					special.add.call(elem, handleObj);

					if (!handleObj.handler.guid) {
						handleObj.handler.guid = handler.guid;
					}
				}

				// Add to the element's handler list, delegates in front
				if (selector) {
					handlers.splice(handlers.delegateCount++, 0, handleObj);
				} else {
					handlers.push(handleObj);
				}

				// Keep track of which events have ever been used, for event optimization
				jQuery.event.global[type] = true;
			}
		},

		// Detach an event or set of events from an element
		remove: function (elem, types, handler, selector, mappedTypes) {

			var j,
			    origCount,
			    tmp,
			    events,
			    t,
			    handleObj,
			    special,
			    handlers,
			    type,
			    namespaces,
			    origType,
			    elemData = dataPriv.hasData(elem) && dataPriv.get(elem);

			if (!elemData || !(events = elemData.events)) {
				return;
			}

			// Once for each type.namespace in types; type may be omitted
			types = (types || "").match(rnotwhite) || [""];
			t = types.length;
			while (t--) {
				tmp = rtypenamespace.exec(types[t]) || [];
				type = origType = tmp[1];
				namespaces = (tmp[2] || "").split(".").sort();

				// Unbind all events (on this namespace, if provided) for the element
				if (!type) {
					for (type in events) {
						jQuery.event.remove(elem, type + types[t], handler, selector, true);
					}
					continue;
				}

				special = jQuery.event.special[type] || {};
				type = (selector ? special.delegateType : special.bindType) || type;
				handlers = events[type] || [];
				tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");

				// Remove matching events
				origCount = j = handlers.length;
				while (j--) {
					handleObj = handlers[j];

					if ((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!tmp || tmp.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === "**" && handleObj.selector)) {
						handlers.splice(j, 1);

						if (handleObj.selector) {
							handlers.delegateCount--;
						}
						if (special.remove) {
							special.remove.call(elem, handleObj);
						}
					}
				}

				// Remove generic event handler if we removed something and no more handlers exist
				// (avoids potential for endless recursion during removal of special event handlers)
				if (origCount && !handlers.length) {
					if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {

						jQuery.removeEvent(elem, type, elemData.handle);
					}

					delete events[type];
				}
			}

			// Remove data and the expando if it's no longer used
			if (jQuery.isEmptyObject(events)) {
				dataPriv.remove(elem, "handle events");
			}
		},

		dispatch: function (event) {

			// Make a writable jQuery.Event from the native event object
			event = jQuery.event.fix(event);

			var i,
			    j,
			    ret,
			    matched,
			    handleObj,
			    handlerQueue = [],
			    args = slice.call(arguments),
			    handlers = (dataPriv.get(this, "events") || {})[event.type] || [],
			    special = jQuery.event.special[event.type] || {};

			// Use the fix-ed jQuery.Event rather than the (read-only) native event
			args[0] = event;
			event.delegateTarget = this;

			// Call the preDispatch hook for the mapped type, and let it bail if desired
			if (special.preDispatch && special.preDispatch.call(this, event) === false) {
				return;
			}

			// Determine handlers
			handlerQueue = jQuery.event.handlers.call(this, event, handlers);

			// Run delegates first; they may want to stop propagation beneath us
			i = 0;
			while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
				event.currentTarget = matched.elem;

				j = 0;
				while ((handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped()) {

					// Triggered event must either 1) have no namespace, or 2) have namespace(s)
					// a subset or equal to those in the bound event (both can have no namespace).
					if (!event.rnamespace || event.rnamespace.test(handleObj.namespace)) {

						event.handleObj = handleObj;
						event.data = handleObj.data;

						ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);

						if (ret !== undefined) {
							if ((event.result = ret) === false) {
								event.preventDefault();
								event.stopPropagation();
							}
						}
					}
				}
			}

			// Call the postDispatch hook for the mapped type
			if (special.postDispatch) {
				special.postDispatch.call(this, event);
			}

			return event.result;
		},

		handlers: function (event, handlers) {
			var i,
			    matches,
			    sel,
			    handleObj,
			    handlerQueue = [],
			    delegateCount = handlers.delegateCount,
			    cur = event.target;

			// Support (at least): Chrome, IE9
			// Find delegate handlers
			// Black-hole SVG <use> instance trees (#13180)
			//
			// Support: Firefox<=42+
			// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
			if (delegateCount && cur.nodeType && (event.type !== "click" || isNaN(event.button) || event.button < 1)) {

				for (; cur !== this; cur = cur.parentNode || this) {

					// Don't check non-elements (#13208)
					// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
					if (cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click")) {
						matches = [];
						for (i = 0; i < delegateCount; i++) {
							handleObj = handlers[i];

							// Don't conflict with Object.prototype properties (#13203)
							sel = handleObj.selector + " ";

							if (matches[sel] === undefined) {
								matches[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) > -1 : jQuery.find(sel, this, null, [cur]).length;
							}
							if (matches[sel]) {
								matches.push(handleObj);
							}
						}
						if (matches.length) {
							handlerQueue.push({ elem: cur, handlers: matches });
						}
					}
				}
			}

			// Add the remaining (directly-bound) handlers
			if (delegateCount < handlers.length) {
				handlerQueue.push({ elem: this, handlers: handlers.slice(delegateCount) });
			}

			return handlerQueue;
		},

		// Includes some event props shared by KeyEvent and MouseEvent
		props: ("altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " + "metaKey relatedTarget shiftKey target timeStamp view which").split(" "),

		fixHooks: {},

		keyHooks: {
			props: "char charCode key keyCode".split(" "),
			filter: function (event, original) {

				// Add which for key events
				if (event.which == null) {
					event.which = original.charCode != null ? original.charCode : original.keyCode;
				}

				return event;
			}
		},

		mouseHooks: {
			props: ("button buttons clientX clientY offsetX offsetY pageX pageY " + "screenX screenY toElement").split(" "),
			filter: function (event, original) {
				var eventDoc,
				    doc,
				    body,
				    button = original.button;

				// Calculate pageX/Y if missing and clientX/Y available
				if (event.pageX == null && original.clientX != null) {
					eventDoc = event.target.ownerDocument || document;
					doc = eventDoc.documentElement;
					body = eventDoc.body;

					event.pageX = original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
					event.pageY = original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
				}

				// Add which for click: 1 === left; 2 === middle; 3 === right
				// Note: button is not normalized, so don't use it
				if (!event.which && button !== undefined) {
					event.which = button & 1 ? 1 : button & 2 ? 3 : button & 4 ? 2 : 0;
				}

				return event;
			}
		},

		fix: function (event) {
			if (event[jQuery.expando]) {
				return event;
			}

			// Create a writable copy of the event object and normalize some properties
			var i,
			    prop,
			    copy,
			    type = event.type,
			    originalEvent = event,
			    fixHook = this.fixHooks[type];

			if (!fixHook) {
				this.fixHooks[type] = fixHook = rmouseEvent.test(type) ? this.mouseHooks : rkeyEvent.test(type) ? this.keyHooks : {};
			}
			copy = fixHook.props ? this.props.concat(fixHook.props) : this.props;

			event = new jQuery.Event(originalEvent);

			i = copy.length;
			while (i--) {
				prop = copy[i];
				event[prop] = originalEvent[prop];
			}

			// Support: Cordova 2.5 (WebKit) (#13255)
			// All events should have a target; Cordova deviceready doesn't
			if (!event.target) {
				event.target = document;
			}

			// Support: Safari 6.0+, Chrome<28
			// Target should not be a text node (#504, #13143)
			if (event.target.nodeType === 3) {
				event.target = event.target.parentNode;
			}

			return fixHook.filter ? fixHook.filter(event, originalEvent) : event;
		},

		special: {
			load: {

				// Prevent triggered image.load events from bubbling to window.load
				noBubble: true
			},
			focus: {

				// Fire native event if possible so blur/focus sequence is correct
				trigger: function () {
					if (this !== safeActiveElement() && this.focus) {
						this.focus();
						return false;
					}
				},
				delegateType: "focusin"
			},
			blur: {
				trigger: function () {
					if (this === safeActiveElement() && this.blur) {
						this.blur();
						return false;
					}
				},
				delegateType: "focusout"
			},
			click: {

				// For checkbox, fire native event so checked state will be right
				trigger: function () {
					if (this.type === "checkbox" && this.click && jQuery.nodeName(this, "input")) {
						this.click();
						return false;
					}
				},

				// For cross-browser consistency, don't fire native .click() on links
				_default: function (event) {
					return jQuery.nodeName(event.target, "a");
				}
			},

			beforeunload: {
				postDispatch: function (event) {

					// Support: Firefox 20+
					// Firefox doesn't alert if the returnValue field is not set.
					if (event.result !== undefined && event.originalEvent) {
						event.originalEvent.returnValue = event.result;
					}
				}
			}
		}
	};

	jQuery.removeEvent = function (elem, type, handle) {

		// This "if" is needed for plain objects
		if (elem.removeEventListener) {
			elem.removeEventListener(type, handle);
		}
	};

	jQuery.Event = function (src, props) {

		// Allow instantiation without the 'new' keyword
		if (!(this instanceof jQuery.Event)) {
			return new jQuery.Event(src, props);
		}

		// Event object
		if (src && src.type) {
			this.originalEvent = src;
			this.type = src.type;

			// Events bubbling up the document may have been marked as prevented
			// by a handler lower down the tree; reflect the correct value.
			this.isDefaultPrevented = src.defaultPrevented || src.defaultPrevented === undefined &&

			// Support: Android<4.0
			src.returnValue === false ? returnTrue : returnFalse;

			// Event type
		} else {
				this.type = src;
			}

		// Put explicitly provided properties onto the event object
		if (props) {
			jQuery.extend(this, props);
		}

		// Create a timestamp if incoming event doesn't have one
		this.timeStamp = src && src.timeStamp || jQuery.now();

		// Mark it as fixed
		this[jQuery.expando] = true;
	};

	// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
	// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
	jQuery.Event.prototype = {
		constructor: jQuery.Event,
		isDefaultPrevented: returnFalse,
		isPropagationStopped: returnFalse,
		isImmediatePropagationStopped: returnFalse,
		isSimulated: false,

		preventDefault: function () {
			var e = this.originalEvent;

			this.isDefaultPrevented = returnTrue;

			if (e && !this.isSimulated) {
				e.preventDefault();
			}
		},
		stopPropagation: function () {
			var e = this.originalEvent;

			this.isPropagationStopped = returnTrue;

			if (e && !this.isSimulated) {
				e.stopPropagation();
			}
		},
		stopImmediatePropagation: function () {
			var e = this.originalEvent;

			this.isImmediatePropagationStopped = returnTrue;

			if (e && !this.isSimulated) {
				e.stopImmediatePropagation();
			}

			this.stopPropagation();
		}
	};

	// Create mouseenter/leave events using mouseover/out and event-time checks
	// so that event delegation works in jQuery.
	// Do the same for pointerenter/pointerleave and pointerover/pointerout
	//
	// Support: Safari 7 only
	// Safari sends mouseenter too often; see:
	// https://code.google.com/p/chromium/issues/detail?id=470258
	// for the description of the bug (it existed in older Chrome versions as well).
	jQuery.each({
		mouseenter: "mouseover",
		mouseleave: "mouseout",
		pointerenter: "pointerover",
		pointerleave: "pointerout"
	}, function (orig, fix) {
		jQuery.event.special[orig] = {
			delegateType: fix,
			bindType: fix,

			handle: function (event) {
				var ret,
				    target = this,
				    related = event.relatedTarget,
				    handleObj = event.handleObj;

				// For mouseenter/leave call the handler if related is outside the target.
				// NB: No relatedTarget if the mouse left/entered the browser window
				if (!related || related !== target && !jQuery.contains(target, related)) {
					event.type = handleObj.origType;
					ret = handleObj.handler.apply(this, arguments);
					event.type = fix;
				}
				return ret;
			}
		};
	});

	jQuery.fn.extend({
		on: function (types, selector, data, fn) {
			return on(this, types, selector, data, fn);
		},
		one: function (types, selector, data, fn) {
			return on(this, types, selector, data, fn, 1);
		},
		off: function (types, selector, fn) {
			var handleObj, type;
			if (types && types.preventDefault && types.handleObj) {

				// ( event )  dispatched jQuery.Event
				handleObj = types.handleObj;
				jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler);
				return this;
			}
			if (typeof types === "object") {

				// ( types-object [, selector] )
				for (type in types) {
					this.off(type, selector, types[type]);
				}
				return this;
			}
			if (selector === false || typeof selector === "function") {

				// ( types [, fn] )
				fn = selector;
				selector = undefined;
			}
			if (fn === false) {
				fn = returnFalse;
			}
			return this.each(function () {
				jQuery.event.remove(this, types, fn, selector);
			});
		}
	});

	var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,


	// Support: IE 10-11, Edge 10240+
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,


	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	    rscriptTypeMasked = /^true\/(.*)/,
	    rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

	// Manipulating tables requires a tbody
	function manipulationTarget(elem, content) {
		return jQuery.nodeName(elem, "table") && jQuery.nodeName(content.nodeType !== 11 ? content : content.firstChild, "tr") ? elem.getElementsByTagName("tbody")[0] || elem.appendChild(elem.ownerDocument.createElement("tbody")) : elem;
	}

	// Replace/restore the type attribute of script elements for safe DOM manipulation
	function disableScript(elem) {
		elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
		return elem;
	}
	function restoreScript(elem) {
		var match = rscriptTypeMasked.exec(elem.type);

		if (match) {
			elem.type = match[1];
		} else {
			elem.removeAttribute("type");
		}

		return elem;
	}

	function cloneCopyEvent(src, dest) {
		var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

		if (dest.nodeType !== 1) {
			return;
		}

		// 1. Copy private data: events, handlers, etc.
		if (dataPriv.hasData(src)) {
			pdataOld = dataPriv.access(src);
			pdataCur = dataPriv.set(dest, pdataOld);
			events = pdataOld.events;

			if (events) {
				delete pdataCur.handle;
				pdataCur.events = {};

				for (type in events) {
					for (i = 0, l = events[type].length; i < l; i++) {
						jQuery.event.add(dest, type, events[type][i]);
					}
				}
			}
		}

		// 2. Copy user data
		if (dataUser.hasData(src)) {
			udataOld = dataUser.access(src);
			udataCur = jQuery.extend({}, udataOld);

			dataUser.set(dest, udataCur);
		}
	}

	// Fix IE bugs, see support tests
	function fixInput(src, dest) {
		var nodeName = dest.nodeName.toLowerCase();

		// Fails to persist the checked state of a cloned checkbox or radio button.
		if (nodeName === "input" && rcheckableType.test(src.type)) {
			dest.checked = src.checked;

			// Fails to return the selected option to the default selected state when cloning options
		} else if (nodeName === "input" || nodeName === "textarea") {
				dest.defaultValue = src.defaultValue;
			}
	}

	function domManip(collection, args, callback, ignored) {

		// Flatten any nested arrays
		args = concat.apply([], args);

		var fragment,
		    first,
		    scripts,
		    hasScripts,
		    node,
		    doc,
		    i = 0,
		    l = collection.length,
		    iNoClone = l - 1,
		    value = args[0],
		    isFunction = jQuery.isFunction(value);

		// We can't cloneNode fragments that contain checked, in WebKit
		if (isFunction || l > 1 && typeof value === "string" && !support.checkClone && rchecked.test(value)) {
			return collection.each(function (index) {
				var self = collection.eq(index);
				if (isFunction) {
					args[0] = value.call(this, index, self.html());
				}
				domManip(self, args, callback, ignored);
			});
		}

		if (l) {
			fragment = buildFragment(args, collection[0].ownerDocument, false, collection, ignored);
			first = fragment.firstChild;

			if (fragment.childNodes.length === 1) {
				fragment = first;
			}

			// Require either new content or an interest in ignored elements to invoke the callback
			if (first || ignored) {
				scripts = jQuery.map(getAll(fragment, "script"), disableScript);
				hasScripts = scripts.length;

				// Use the original fragment for the last item
				// instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for (; i < l; i++) {
					node = fragment;

					if (i !== iNoClone) {
						node = jQuery.clone(node, true, true);

						// Keep references to cloned scripts for later restoration
						if (hasScripts) {

							// Support: Android<4.1, PhantomJS<2
							// push.apply(_, arraylike) throws on ancient WebKit
							jQuery.merge(scripts, getAll(node, "script"));
						}
					}

					callback.call(collection[i], node, i);
				}

				if (hasScripts) {
					doc = scripts[scripts.length - 1].ownerDocument;

					// Reenable scripts
					jQuery.map(scripts, restoreScript);

					// Evaluate executable scripts on first document insertion
					for (i = 0; i < hasScripts; i++) {
						node = scripts[i];
						if (rscriptType.test(node.type || "") && !dataPriv.access(node, "globalEval") && jQuery.contains(doc, node)) {

							if (node.src) {

								// Optional AJAX dependency, but won't run scripts if not present
								if (jQuery._evalUrl) {
									jQuery._evalUrl(node.src);
								}
							} else {
								jQuery.globalEval(node.textContent.replace(rcleanScript, ""));
							}
						}
					}
				}
			}
		}

		return collection;
	}

	function remove(elem, selector, keepData) {
		var node,
		    nodes = selector ? jQuery.filter(selector, elem) : elem,
		    i = 0;

		for (; (node = nodes[i]) != null; i++) {
			if (!keepData && node.nodeType === 1) {
				jQuery.cleanData(getAll(node));
			}

			if (node.parentNode) {
				if (keepData && jQuery.contains(node.ownerDocument, node)) {
					setGlobalEval(getAll(node, "script"));
				}
				node.parentNode.removeChild(node);
			}
		}

		return elem;
	}

	jQuery.extend({
		htmlPrefilter: function (html) {
			return html.replace(rxhtmlTag, "<$1></$2>");
		},

		clone: function (elem, dataAndEvents, deepDataAndEvents) {
			var i,
			    l,
			    srcElements,
			    destElements,
			    clone = elem.cloneNode(true),
			    inPage = jQuery.contains(elem.ownerDocument, elem);

			// Fix IE cloning issues
			if (!support.noCloneChecked && (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {

				// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
				destElements = getAll(clone);
				srcElements = getAll(elem);

				for (i = 0, l = srcElements.length; i < l; i++) {
					fixInput(srcElements[i], destElements[i]);
				}
			}

			// Copy the events from the original to the clone
			if (dataAndEvents) {
				if (deepDataAndEvents) {
					srcElements = srcElements || getAll(elem);
					destElements = destElements || getAll(clone);

					for (i = 0, l = srcElements.length; i < l; i++) {
						cloneCopyEvent(srcElements[i], destElements[i]);
					}
				} else {
					cloneCopyEvent(elem, clone);
				}
			}

			// Preserve script evaluation history
			destElements = getAll(clone, "script");
			if (destElements.length > 0) {
				setGlobalEval(destElements, !inPage && getAll(elem, "script"));
			}

			// Return the cloned set
			return clone;
		},

		cleanData: function (elems) {
			var data,
			    elem,
			    type,
			    special = jQuery.event.special,
			    i = 0;

			for (; (elem = elems[i]) !== undefined; i++) {
				if (acceptData(elem)) {
					if (data = elem[dataPriv.expando]) {
						if (data.events) {
							for (type in data.events) {
								if (special[type]) {
									jQuery.event.remove(elem, type);

									// This is a shortcut to avoid jQuery.event.remove's overhead
								} else {
										jQuery.removeEvent(elem, type, data.handle);
									}
							}
						}

						// Support: Chrome <= 35-45+
						// Assign undefined instead of using delete, see Data#remove
						elem[dataPriv.expando] = undefined;
					}
					if (elem[dataUser.expando]) {

						// Support: Chrome <= 35-45+
						// Assign undefined instead of using delete, see Data#remove
						elem[dataUser.expando] = undefined;
					}
				}
			}
		}
	});

	jQuery.fn.extend({

		// Keep domManip exposed until 3.0 (gh-2225)
		domManip: domManip,

		detach: function (selector) {
			return remove(this, selector, true);
		},

		remove: function (selector) {
			return remove(this, selector);
		},

		text: function (value) {
			return access(this, function (value) {
				return value === undefined ? jQuery.text(this) : this.empty().each(function () {
					if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
						this.textContent = value;
					}
				});
			}, null, value, arguments.length);
		},

		append: function () {
			return domManip(this, arguments, function (elem) {
				if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
					var target = manipulationTarget(this, elem);
					target.appendChild(elem);
				}
			});
		},

		prepend: function () {
			return domManip(this, arguments, function (elem) {
				if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
					var target = manipulationTarget(this, elem);
					target.insertBefore(elem, target.firstChild);
				}
			});
		},

		before: function () {
			return domManip(this, arguments, function (elem) {
				if (this.parentNode) {
					this.parentNode.insertBefore(elem, this);
				}
			});
		},

		after: function () {
			return domManip(this, arguments, function (elem) {
				if (this.parentNode) {
					this.parentNode.insertBefore(elem, this.nextSibling);
				}
			});
		},

		empty: function () {
			var elem,
			    i = 0;

			for (; (elem = this[i]) != null; i++) {
				if (elem.nodeType === 1) {

					// Prevent memory leaks
					jQuery.cleanData(getAll(elem, false));

					// Remove any remaining nodes
					elem.textContent = "";
				}
			}

			return this;
		},

		clone: function (dataAndEvents, deepDataAndEvents) {
			dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
			deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

			return this.map(function () {
				return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
			});
		},

		html: function (value) {
			return access(this, function (value) {
				var elem = this[0] || {},
				    i = 0,
				    l = this.length;

				if (value === undefined && elem.nodeType === 1) {
					return elem.innerHTML;
				}

				// See if we can take a shortcut and just use innerHTML
				if (typeof value === "string" && !rnoInnerhtml.test(value) && !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {

					value = jQuery.htmlPrefilter(value);

					try {
						for (; i < l; i++) {
							elem = this[i] || {};

							// Remove element nodes and prevent memory leaks
							if (elem.nodeType === 1) {
								jQuery.cleanData(getAll(elem, false));
								elem.innerHTML = value;
							}
						}

						elem = 0;

						// If using innerHTML throws an exception, use the fallback method
					} catch (e) {}
				}

				if (elem) {
					this.empty().append(value);
				}
			}, null, value, arguments.length);
		},

		replaceWith: function () {
			var ignored = [];

			// Make the changes, replacing each non-ignored context element with the new content
			return domManip(this, arguments, function (elem) {
				var parent = this.parentNode;

				if (jQuery.inArray(this, ignored) < 0) {
					jQuery.cleanData(getAll(this));
					if (parent) {
						parent.replaceChild(elem, this);
					}
				}

				// Force callback invocation
			}, ignored);
		}
	});

	jQuery.each({
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function (name, original) {
		jQuery.fn[name] = function (selector) {
			var elems,
			    ret = [],
			    insert = jQuery(selector),
			    last = insert.length - 1,
			    i = 0;

			for (; i <= last; i++) {
				elems = i === last ? this : this.clone(true);
				jQuery(insert[i])[original](elems);

				// Support: QtWebKit
				// .get() because push.apply(_, arraylike) throws
				push.apply(ret, elems.get());
			}

			return this.pushStack(ret);
		};
	});

	var iframe,
	    elemdisplay = {

		// Support: Firefox
		// We have to pre-define these values for FF (#10227)
		HTML: "block",
		BODY: "block"
	};

	/**
  * Retrieve the actual display of a element
  * @param {String} name nodeName of the element
  * @param {Object} doc Document object
  */

	// Called only from within defaultDisplay
	function actualDisplay(name, doc) {
		var elem = jQuery(doc.createElement(name)).appendTo(doc.body),
		    display = jQuery.css(elem[0], "display");

		// We don't have any data stored on the element,
		// so use "detach" method as fast way to get rid of the element
		elem.detach();

		return display;
	}

	/**
  * Try to determine the default display value of an element
  * @param {String} nodeName
  */
	function defaultDisplay(nodeName) {
		var doc = document,
		    display = elemdisplay[nodeName];

		if (!display) {
			display = actualDisplay(nodeName, doc);

			// If the simple way fails, read from inside an iframe
			if (display === "none" || !display) {

				// Use the already-created iframe if possible
				iframe = (iframe || jQuery("<iframe frameborder='0' width='0' height='0'/>")).appendTo(doc.documentElement);

				// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
				doc = iframe[0].contentDocument;

				// Support: IE
				doc.write();
				doc.close();

				display = actualDisplay(nodeName, doc);
				iframe.detach();
			}

			// Store the correct default display
			elemdisplay[nodeName] = display;
		}

		return display;
	}
	var rmargin = /^margin/;

	var rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");

	var getStyles = function (elem) {

		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if (!view || !view.opener) {
			view = window;
		}

		return view.getComputedStyle(elem);
	};

	var swap = function (elem, options, callback, args) {
		var ret,
		    name,
		    old = {};

		// Remember the old values, and insert the new ones
		for (name in options) {
			old[name] = elem.style[name];
			elem.style[name] = options[name];
		}

		ret = callback.apply(elem, args || []);

		// Revert the old values
		for (name in options) {
			elem.style[name] = old[name];
		}

		return ret;
	};

	var documentElement = document.documentElement;

	(function () {
		var pixelPositionVal,
		    boxSizingReliableVal,
		    pixelMarginRightVal,
		    reliableMarginLeftVal,
		    container = document.createElement("div"),
		    div = document.createElement("div");

		// Finish early in limited (non-browser) environments
		if (!div.style) {
			return;
		}

		// Support: IE9-11+
		// Style of cloned element affects source element cloned (#8908)
		div.style.backgroundClip = "content-box";
		div.cloneNode(true).style.backgroundClip = "";
		support.clearCloneStyle = div.style.backgroundClip === "content-box";

		container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" + "padding:0;margin-top:1px;position:absolute";
		container.appendChild(div);

		// Executing both pixelPosition & boxSizingReliable tests require only one layout
		// so they're executed at the same time to save the second computation.
		function computeStyleTests() {
			div.style.cssText =

			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;" + "position:relative;display:block;" + "margin:auto;border:1px;padding:1px;" + "top:1%;width:50%";
			div.innerHTML = "";
			documentElement.appendChild(container);

			var divStyle = window.getComputedStyle(div);
			pixelPositionVal = divStyle.top !== "1%";
			reliableMarginLeftVal = divStyle.marginLeft === "2px";
			boxSizingReliableVal = divStyle.width === "4px";

			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = divStyle.marginRight === "4px";

			documentElement.removeChild(container);
		}

		jQuery.extend(support, {
			pixelPosition: function () {

				// This test is executed only once but we still do memoizing
				// since we can use the boxSizingReliable pre-computing.
				// No need to check if the test was already performed, though.
				computeStyleTests();
				return pixelPositionVal;
			},
			boxSizingReliable: function () {
				if (boxSizingReliableVal == null) {
					computeStyleTests();
				}
				return boxSizingReliableVal;
			},
			pixelMarginRight: function () {

				// Support: Android 4.0-4.3
				// We're checking for boxSizingReliableVal here instead of pixelMarginRightVal
				// since that compresses better and they're computed together anyway.
				if (boxSizingReliableVal == null) {
					computeStyleTests();
				}
				return pixelMarginRightVal;
			},
			reliableMarginLeft: function () {

				// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
				if (boxSizingReliableVal == null) {
					computeStyleTests();
				}
				return reliableMarginLeftVal;
			},
			reliableMarginRight: function () {

				// Support: Android 2.3
				// Check if div with explicit width and no margin-right incorrectly
				// gets computed margin-right based on width of container. (#3333)
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				// This support function is only executed once so no memoizing is needed.
				var ret,
				    marginDiv = div.appendChild(document.createElement("div"));

				// Reset CSS: box-sizing; display; margin; border; padding
				marginDiv.style.cssText = div.style.cssText =

				// Support: Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;box-sizing:content-box;" + "display:block;margin:0;border:0;padding:0";
				marginDiv.style.marginRight = marginDiv.style.width = "0";
				div.style.width = "1px";
				documentElement.appendChild(container);

				ret = !parseFloat(window.getComputedStyle(marginDiv).marginRight);

				documentElement.removeChild(container);
				div.removeChild(marginDiv);

				return ret;
			}
		});
	})();

	function curCSS(elem, name, computed) {
		var width,
		    minWidth,
		    maxWidth,
		    ret,
		    style = elem.style;

		computed = computed || getStyles(elem);
		ret = computed ? computed.getPropertyValue(name) || computed[name] : undefined;

		// Support: Opera 12.1x only
		// Fall back to style even without computed
		// computed is undefined for elems on document fragments
		if ((ret === "" || ret === undefined) && !jQuery.contains(elem.ownerDocument, elem)) {
			ret = jQuery.style(elem, name);
		}

		// Support: IE9
		// getPropertyValue is only needed for .css('filter') (#12537)
		if (computed) {

			// A tribute to the "awesome hack by Dean Edwards"
			// Android Browser returns percentage for some values,
			// but width seems to be reliably pixels.
			// This is against the CSSOM draft spec:
			// http://dev.w3.org/csswg/cssom/#resolved-values
			if (!support.pixelMarginRight() && rnumnonpx.test(ret) && rmargin.test(name)) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		return ret !== undefined ?

		// Support: IE9-11+
		// IE returns zIndex value as an integer.
		ret + "" : ret;
	}

	function addGetHookIf(conditionFn, hookFn) {

		// Define the hook, we'll check on the first run if it's really needed.
		return {
			get: function () {
				if (conditionFn()) {

					// Hook not needed (or it's not possible to use it due
					// to missing dependency), remove it.
					delete this.get;
					return;
				}

				// Hook needed; redefine it so that the support test is not executed again.
				return (this.get = hookFn).apply(this, arguments);
			}
		};
	}

	var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	    cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	    cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},
	    cssPrefixes = ["Webkit", "O", "Moz", "ms"],
	    emptyStyle = document.createElement("div").style;

	// Return a css property mapped to a potentially vendor prefixed property
	function vendorPropName(name) {

		// Shortcut for names that are not vendor prefixed
		if (name in emptyStyle) {
			return name;
		}

		// Check for vendor prefixed names
		var capName = name[0].toUpperCase() + name.slice(1),
		    i = cssPrefixes.length;

		while (i--) {
			name = cssPrefixes[i] + capName;
			if (name in emptyStyle) {
				return name;
			}
		}
	}

	function setPositiveNumber(elem, value, subtract) {

		// Any relative (+/-) values have already been
		// normalized at this point
		var matches = rcssNum.exec(value);
		return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max(0, matches[2] - (subtract || 0)) + (matches[3] || "px") : value;
	}

	function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
		var i = extra === (isBorderBox ? "border" : "content") ?

		// If we already have the right measurement, avoid augmentation
		4 :

		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,
		    val = 0;

		for (; i < 4; i += 2) {

			// Both box models exclude margin, so add it if we want it
			if (extra === "margin") {
				val += jQuery.css(elem, extra + cssExpand[i], true, styles);
			}

			if (isBorderBox) {

				// border-box includes padding, so remove it if we want content
				if (extra === "content") {
					val -= jQuery.css(elem, "padding" + cssExpand[i], true, styles);
				}

				// At this point, extra isn't border nor margin, so remove border
				if (extra !== "margin") {
					val -= jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
				}
			} else {

				// At this point, extra isn't content, so add padding
				val += jQuery.css(elem, "padding" + cssExpand[i], true, styles);

				// At this point, extra isn't content nor padding, so add border
				if (extra !== "padding") {
					val += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
				}
			}
		}

		return val;
	}

	function getWidthOrHeight(elem, name, extra) {

		// Start with offset property, which is equivalent to the border-box value
		var valueIsBorderBox = true,
		    val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		    styles = getStyles(elem),
		    isBorderBox = jQuery.css(elem, "boxSizing", false, styles) === "border-box";

		// Some non-html elements return undefined for offsetWidth, so check for null/undefined
		// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
		// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
		if (val <= 0 || val == null) {

			// Fall back to computed then uncomputed css if necessary
			val = curCSS(elem, name, styles);
			if (val < 0 || val == null) {
				val = elem.style[name];
			}

			// Computed unit is not pixels. Stop here and return.
			if (rnumnonpx.test(val)) {
				return val;
			}

			// Check for style in case a browser which returns unreliable values
			// for getComputedStyle silently falls back to the reliable elem.style
			valueIsBorderBox = isBorderBox && (support.boxSizingReliable() || val === elem.style[name]);

			// Normalize "", auto, and prepare for extra
			val = parseFloat(val) || 0;
		}

		// Use the active box-sizing model to add/subtract irrelevant styles
		return val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles) + "px";
	}

	function showHide(elements, show) {
		var display,
		    elem,
		    hidden,
		    values = [],
		    index = 0,
		    length = elements.length;

		for (; index < length; index++) {
			elem = elements[index];
			if (!elem.style) {
				continue;
			}

			values[index] = dataPriv.get(elem, "olddisplay");
			display = elem.style.display;
			if (show) {

				// Reset the inline display of this element to learn if it is
				// being hidden by cascaded rules or not
				if (!values[index] && display === "none") {
					elem.style.display = "";
				}

				// Set elements which have been overridden with display: none
				// in a stylesheet to whatever the default browser style is
				// for such an element
				if (elem.style.display === "" && isHidden(elem)) {
					values[index] = dataPriv.access(elem, "olddisplay", defaultDisplay(elem.nodeName));
				}
			} else {
				hidden = isHidden(elem);

				if (display !== "none" || !hidden) {
					dataPriv.set(elem, "olddisplay", hidden ? display : jQuery.css(elem, "display"));
				}
			}
		}

		// Set the display of most of the elements in a second loop
		// to avoid the constant reflow
		for (index = 0; index < length; index++) {
			elem = elements[index];
			if (!elem.style) {
				continue;
			}
			if (!show || elem.style.display === "none" || elem.style.display === "") {
				elem.style.display = show ? values[index] || "" : "none";
			}
		}

		return elements;
	}

	jQuery.extend({

		// Add in style property hooks for overriding the default
		// behavior of getting and setting a style property
		cssHooks: {
			opacity: {
				get: function (elem, computed) {
					if (computed) {

						// We should always get a number back from opacity
						var ret = curCSS(elem, "opacity");
						return ret === "" ? "1" : ret;
					}
				}
			}
		},

		// Don't automatically add "px" to these possibly-unitless properties
		cssNumber: {
			"animationIterationCount": true,
			"columnCount": true,
			"fillOpacity": true,
			"flexGrow": true,
			"flexShrink": true,
			"fontWeight": true,
			"lineHeight": true,
			"opacity": true,
			"order": true,
			"orphans": true,
			"widows": true,
			"zIndex": true,
			"zoom": true
		},

		// Add in properties whose names you wish to fix before
		// setting or getting the value
		cssProps: {
			"float": "cssFloat"
		},

		// Get and set the style property on a DOM Node
		style: function (elem, name, value, extra) {

			// Don't set styles on text and comment nodes
			if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
				return;
			}

			// Make sure that we're working with the right name
			var ret,
			    type,
			    hooks,
			    origName = jQuery.camelCase(name),
			    style = elem.style;

			name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(origName) || origName);

			// Gets hook for the prefixed version, then unprefixed version
			hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];

			// Check if we're setting a value
			if (value !== undefined) {
				type = typeof value;

				// Convert "+=" or "-=" to relative numbers (#7345)
				if (type === "string" && (ret = rcssNum.exec(value)) && ret[1]) {
					value = adjustCSS(elem, name, ret);

					// Fixes bug #9237
					type = "number";
				}

				// Make sure that null and NaN values aren't set (#7116)
				if (value == null || value !== value) {
					return;
				}

				// If a number was passed in, add the unit (except for certain CSS properties)
				if (type === "number") {
					value += ret && ret[3] || (jQuery.cssNumber[origName] ? "" : "px");
				}

				// Support: IE9-11+
				// background-* props affect original clone's values
				if (!support.clearCloneStyle && value === "" && name.indexOf("background") === 0) {
					style[name] = "inherit";
				}

				// If a hook was provided, use that value, otherwise just set the specified value
				if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value, extra)) !== undefined) {

					style[name] = value;
				}
			} else {

				// If a hook was provided get the non-computed value from there
				if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) {

					return ret;
				}

				// Otherwise just get the value from the style object
				return style[name];
			}
		},

		css: function (elem, name, extra, styles) {
			var val,
			    num,
			    hooks,
			    origName = jQuery.camelCase(name);

			// Make sure that we're working with the right name
			name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(origName) || origName);

			// Try prefixed name followed by the unprefixed name
			hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];

			// If a hook was provided get the computed value from there
			if (hooks && "get" in hooks) {
				val = hooks.get(elem, true, extra);
			}

			// Otherwise, if a way to get the computed value exists, use that
			if (val === undefined) {
				val = curCSS(elem, name, styles);
			}

			// Convert "normal" to computed value
			if (val === "normal" && name in cssNormalTransform) {
				val = cssNormalTransform[name];
			}

			// Make numeric if forced or a qualifier was provided and val looks numeric
			if (extra === "" || extra) {
				num = parseFloat(val);
				return extra === true || isFinite(num) ? num || 0 : val;
			}
			return val;
		}
	});

	jQuery.each(["height", "width"], function (i, name) {
		jQuery.cssHooks[name] = {
			get: function (elem, computed, extra) {
				if (computed) {

					// Certain elements can have dimension info if we invisibly show them
					// but it must have a current display style that would benefit
					return rdisplayswap.test(jQuery.css(elem, "display")) && elem.offsetWidth === 0 ? swap(elem, cssShow, function () {
						return getWidthOrHeight(elem, name, extra);
					}) : getWidthOrHeight(elem, name, extra);
				}
			},

			set: function (elem, value, extra) {
				var matches,
				    styles = extra && getStyles(elem),
				    subtract = extra && augmentWidthOrHeight(elem, name, extra, jQuery.css(elem, "boxSizing", false, styles) === "border-box", styles);

				// Convert to pixels if value adjustment is needed
				if (subtract && (matches = rcssNum.exec(value)) && (matches[3] || "px") !== "px") {

					elem.style[name] = value;
					value = jQuery.css(elem, name);
				}

				return setPositiveNumber(elem, value, subtract);
			}
		};
	});

	jQuery.cssHooks.marginLeft = addGetHookIf(support.reliableMarginLeft, function (elem, computed) {
		if (computed) {
			return (parseFloat(curCSS(elem, "marginLeft")) || elem.getBoundingClientRect().left - swap(elem, { marginLeft: 0 }, function () {
				return elem.getBoundingClientRect().left;
			})) + "px";
		}
	});

	// Support: Android 2.3
	jQuery.cssHooks.marginRight = addGetHookIf(support.reliableMarginRight, function (elem, computed) {
		if (computed) {
			return swap(elem, { "display": "inline-block" }, curCSS, [elem, "marginRight"]);
		}
	});

	// These hooks are used by animate to expand properties
	jQuery.each({
		margin: "",
		padding: "",
		border: "Width"
	}, function (prefix, suffix) {
		jQuery.cssHooks[prefix + suffix] = {
			expand: function (value) {
				var i = 0,
				    expanded = {},


				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [value];

				for (; i < 4; i++) {
					expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
				}

				return expanded;
			}
		};

		if (!rmargin.test(prefix)) {
			jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
		}
	});

	jQuery.fn.extend({
		css: function (name, value) {
			return access(this, function (elem, name, value) {
				var styles,
				    len,
				    map = {},
				    i = 0;

				if (jQuery.isArray(name)) {
					styles = getStyles(elem);
					len = name.length;

					for (; i < len; i++) {
						map[name[i]] = jQuery.css(elem, name[i], false, styles);
					}

					return map;
				}

				return value !== undefined ? jQuery.style(elem, name, value) : jQuery.css(elem, name);
			}, name, value, arguments.length > 1);
		},
		show: function () {
			return showHide(this, true);
		},
		hide: function () {
			return showHide(this);
		},
		toggle: function (state) {
			if (typeof state === "boolean") {
				return state ? this.show() : this.hide();
			}

			return this.each(function () {
				if (isHidden(this)) {
					jQuery(this).show();
				} else {
					jQuery(this).hide();
				}
			});
		}
	});

	function Tween(elem, options, prop, end, easing) {
		return new Tween.prototype.init(elem, options, prop, end, easing);
	}
	jQuery.Tween = Tween;

	Tween.prototype = {
		constructor: Tween,
		init: function (elem, options, prop, end, easing, unit) {
			this.elem = elem;
			this.prop = prop;
			this.easing = easing || jQuery.easing._default;
			this.options = options;
			this.start = this.now = this.cur();
			this.end = end;
			this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
		},
		cur: function () {
			var hooks = Tween.propHooks[this.prop];

			return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);
		},
		run: function (percent) {
			var eased,
			    hooks = Tween.propHooks[this.prop];

			if (this.options.duration) {
				this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration);
			} else {
				this.pos = eased = percent;
			}
			this.now = (this.end - this.start) * eased + this.start;

			if (this.options.step) {
				this.options.step.call(this.elem, this.now, this);
			}

			if (hooks && hooks.set) {
				hooks.set(this);
			} else {
				Tween.propHooks._default.set(this);
			}
			return this;
		}
	};

	Tween.prototype.init.prototype = Tween.prototype;

	Tween.propHooks = {
		_default: {
			get: function (tween) {
				var result;

				// Use a property on the element directly when it is not a DOM element,
				// or when there is no matching style property that exists.
				if (tween.elem.nodeType !== 1 || tween.elem[tween.prop] != null && tween.elem.style[tween.prop] == null) {
					return tween.elem[tween.prop];
				}

				// Passing an empty string as a 3rd parameter to .css will automatically
				// attempt a parseFloat and fallback to a string if the parse fails.
				// Simple values such as "10px" are parsed to Float;
				// complex values such as "rotate(1rad)" are returned as-is.
				result = jQuery.css(tween.elem, tween.prop, "");

				// Empty strings, null, undefined and "auto" are converted to 0.
				return !result || result === "auto" ? 0 : result;
			},
			set: function (tween) {

				// Use step hook for back compat.
				// Use cssHook if its there.
				// Use .style if available and use plain properties where available.
				if (jQuery.fx.step[tween.prop]) {
					jQuery.fx.step[tween.prop](tween);
				} else if (tween.elem.nodeType === 1 && (tween.elem.style[jQuery.cssProps[tween.prop]] != null || jQuery.cssHooks[tween.prop])) {
					jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
				} else {
					tween.elem[tween.prop] = tween.now;
				}
			}
		}
	};

	// Support: IE9
	// Panic based approach to setting things on disconnected nodes
	Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
		set: function (tween) {
			if (tween.elem.nodeType && tween.elem.parentNode) {
				tween.elem[tween.prop] = tween.now;
			}
		}
	};

	jQuery.easing = {
		linear: function (p) {
			return p;
		},
		swing: function (p) {
			return 0.5 - Math.cos(p * Math.PI) / 2;
		},
		_default: "swing"
	};

	jQuery.fx = Tween.prototype.init;

	// Back Compat <1.8 extension point
	jQuery.fx.step = {};

	var fxNow,
	    timerId,
	    rfxtypes = /^(?:toggle|show|hide)$/,
	    rrun = /queueHooks$/;

	// Animations created synchronously will run synchronously
	function createFxNow() {
		window.setTimeout(function () {
			fxNow = undefined;
		});
		return fxNow = jQuery.now();
	}

	// Generate parameters to create a standard animation
	function genFx(type, includeWidth) {
		var which,
		    i = 0,
		    attrs = { height: type };

		// If we include width, step value is 1 to do all cssExpand values,
		// otherwise step value is 2 to skip over Left and Right
		includeWidth = includeWidth ? 1 : 0;
		for (; i < 4; i += 2 - includeWidth) {
			which = cssExpand[i];
			attrs["margin" + which] = attrs["padding" + which] = type;
		}

		if (includeWidth) {
			attrs.opacity = attrs.width = type;
		}

		return attrs;
	}

	function createTween(value, prop, animation) {
		var tween,
		    collection = (Animation.tweeners[prop] || []).concat(Animation.tweeners["*"]),
		    index = 0,
		    length = collection.length;
		for (; index < length; index++) {
			if (tween = collection[index].call(animation, prop, value)) {

				// We're done with this property
				return tween;
			}
		}
	}

	function defaultPrefilter(elem, props, opts) {
		/* jshint validthis: true */
		var prop,
		    value,
		    toggle,
		    tween,
		    hooks,
		    oldfire,
		    display,
		    checkDisplay,
		    anim = this,
		    orig = {},
		    style = elem.style,
		    hidden = elem.nodeType && isHidden(elem),
		    dataShow = dataPriv.get(elem, "fxshow");

		// Handle queue: false promises
		if (!opts.queue) {
			hooks = jQuery._queueHooks(elem, "fx");
			if (hooks.unqueued == null) {
				hooks.unqueued = 0;
				oldfire = hooks.empty.fire;
				hooks.empty.fire = function () {
					if (!hooks.unqueued) {
						oldfire();
					}
				};
			}
			hooks.unqueued++;

			anim.always(function () {

				// Ensure the complete handler is called before this completes
				anim.always(function () {
					hooks.unqueued--;
					if (!jQuery.queue(elem, "fx").length) {
						hooks.empty.fire();
					}
				});
			});
		}

		// Height/width overflow pass
		if (elem.nodeType === 1 && ("height" in props || "width" in props)) {

			// Make sure that nothing sneaks out
			// Record all 3 overflow attributes because IE9-10 do not
			// change the overflow attribute when overflowX and
			// overflowY are set to the same value
			opts.overflow = [style.overflow, style.overflowX, style.overflowY];

			// Set display property to inline-block for height/width
			// animations on inline elements that are having width/height animated
			display = jQuery.css(elem, "display");

			// Test default display if display is currently "none"
			checkDisplay = display === "none" ? dataPriv.get(elem, "olddisplay") || defaultDisplay(elem.nodeName) : display;

			if (checkDisplay === "inline" && jQuery.css(elem, "float") === "none") {
				style.display = "inline-block";
			}
		}

		if (opts.overflow) {
			style.overflow = "hidden";
			anim.always(function () {
				style.overflow = opts.overflow[0];
				style.overflowX = opts.overflow[1];
				style.overflowY = opts.overflow[2];
			});
		}

		// show/hide pass
		for (prop in props) {
			value = props[prop];
			if (rfxtypes.exec(value)) {
				delete props[prop];
				toggle = toggle || value === "toggle";
				if (value === (hidden ? "hide" : "show")) {

					// If there is dataShow left over from a stopped hide or show
					// and we are going to proceed with show, we should pretend to be hidden
					if (value === "show" && dataShow && dataShow[prop] !== undefined) {
						hidden = true;
					} else {
						continue;
					}
				}
				orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);

				// Any non-fx value stops us from restoring the original display value
			} else {
					display = undefined;
				}
		}

		if (!jQuery.isEmptyObject(orig)) {
			if (dataShow) {
				if ("hidden" in dataShow) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access(elem, "fxshow", {});
			}

			// Store state if its toggle - enables .stop().toggle() to "reverse"
			if (toggle) {
				dataShow.hidden = !hidden;
			}
			if (hidden) {
				jQuery(elem).show();
			} else {
				anim.done(function () {
					jQuery(elem).hide();
				});
			}
			anim.done(function () {
				var prop;

				dataPriv.remove(elem, "fxshow");
				for (prop in orig) {
					jQuery.style(elem, prop, orig[prop]);
				}
			});
			for (prop in orig) {
				tween = createTween(hidden ? dataShow[prop] : 0, prop, anim);

				if (!(prop in dataShow)) {
					dataShow[prop] = tween.start;
					if (hidden) {
						tween.end = tween.start;
						tween.start = prop === "width" || prop === "height" ? 1 : 0;
					}
				}
			}

			// If this is a noop like .hide().hide(), restore an overwritten display value
		} else if ((display === "none" ? defaultDisplay(elem.nodeName) : display) === "inline") {
				style.display = display;
			}
	}

	function propFilter(props, specialEasing) {
		var index, name, easing, value, hooks;

		// camelCase, specialEasing and expand cssHook pass
		for (index in props) {
			name = jQuery.camelCase(index);
			easing = specialEasing[name];
			value = props[index];
			if (jQuery.isArray(value)) {
				easing = value[1];
				value = props[index] = value[0];
			}

			if (index !== name) {
				props[name] = value;
				delete props[index];
			}

			hooks = jQuery.cssHooks[name];
			if (hooks && "expand" in hooks) {
				value = hooks.expand(value);
				delete props[name];

				// Not quite $.extend, this won't overwrite existing keys.
				// Reusing 'index' because we have the correct "name"
				for (index in value) {
					if (!(index in props)) {
						props[index] = value[index];
						specialEasing[index] = easing;
					}
				}
			} else {
				specialEasing[name] = easing;
			}
		}
	}

	function Animation(elem, properties, options) {
		var result,
		    stopped,
		    index = 0,
		    length = Animation.prefilters.length,
		    deferred = jQuery.Deferred().always(function () {

			// Don't match elem in the :animated selector
			delete tick.elem;
		}),
		    tick = function () {
			if (stopped) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
			    remaining = Math.max(0, animation.startTime + animation.duration - currentTime),


			// Support: Android 2.3
			// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
			temp = remaining / animation.duration || 0,
			    percent = 1 - temp,
			    index = 0,
			    length = animation.tweens.length;

			for (; index < length; index++) {
				animation.tweens[index].run(percent);
			}

			deferred.notifyWith(elem, [animation, percent, remaining]);

			if (percent < 1 && length) {
				return remaining;
			} else {
				deferred.resolveWith(elem, [animation]);
				return false;
			}
		},
		    animation = deferred.promise({
			elem: elem,
			props: jQuery.extend({}, properties),
			opts: jQuery.extend(true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function (prop, end) {
				var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
				animation.tweens.push(tween);
				return tween;
			},
			stop: function (gotoEnd) {
				var index = 0,


				// If we are going to the end, we want to run all the tweens
				// otherwise we skip this part
				length = gotoEnd ? animation.tweens.length : 0;
				if (stopped) {
					return this;
				}
				stopped = true;
				for (; index < length; index++) {
					animation.tweens[index].run(1);
				}

				// Resolve when we played the last frame; otherwise, reject
				if (gotoEnd) {
					deferred.notifyWith(elem, [animation, 1, 0]);
					deferred.resolveWith(elem, [animation, gotoEnd]);
				} else {
					deferred.rejectWith(elem, [animation, gotoEnd]);
				}
				return this;
			}
		}),
		    props = animation.props;

		propFilter(props, animation.opts.specialEasing);

		for (; index < length; index++) {
			result = Animation.prefilters[index].call(animation, elem, props, animation.opts);
			if (result) {
				if (jQuery.isFunction(result.stop)) {
					jQuery._queueHooks(animation.elem, animation.opts.queue).stop = jQuery.proxy(result.stop, result);
				}
				return result;
			}
		}

		jQuery.map(props, createTween, animation);

		if (jQuery.isFunction(animation.opts.start)) {
			animation.opts.start.call(elem, animation);
		}

		jQuery.fx.timer(jQuery.extend(tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		}));

		// attach callbacks from options
		return animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);
	}

	jQuery.Animation = jQuery.extend(Animation, {
		tweeners: {
			"*": [function (prop, value) {
				var tween = this.createTween(prop, value);
				adjustCSS(tween.elem, prop, rcssNum.exec(value), tween);
				return tween;
			}]
		},

		tweener: function (props, callback) {
			if (jQuery.isFunction(props)) {
				callback = props;
				props = ["*"];
			} else {
				props = props.match(rnotwhite);
			}

			var prop,
			    index = 0,
			    length = props.length;

			for (; index < length; index++) {
				prop = props[index];
				Animation.tweeners[prop] = Animation.tweeners[prop] || [];
				Animation.tweeners[prop].unshift(callback);
			}
		},

		prefilters: [defaultPrefilter],

		prefilter: function (callback, prepend) {
			if (prepend) {
				Animation.prefilters.unshift(callback);
			} else {
				Animation.prefilters.push(callback);
			}
		}
	});

	jQuery.speed = function (speed, easing, fn) {
		var opt = speed && typeof speed === "object" ? jQuery.extend({}, speed) : {
			complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
			duration: speed,
			easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
		};

		opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration : opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default;

		// Normalize opt.queue - true/undefined/null -> "fx"
		if (opt.queue == null || opt.queue === true) {
			opt.queue = "fx";
		}

		// Queueing
		opt.old = opt.complete;

		opt.complete = function () {
			if (jQuery.isFunction(opt.old)) {
				opt.old.call(this);
			}

			if (opt.queue) {
				jQuery.dequeue(this, opt.queue);
			}
		};

		return opt;
	};

	jQuery.fn.extend({
		fadeTo: function (speed, to, easing, callback) {

			// Show any hidden elements after setting opacity to 0
			return this.filter(isHidden).css("opacity", 0).show()

			// Animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback);
		},
		animate: function (prop, speed, easing, callback) {
			var empty = jQuery.isEmptyObject(prop),
			    optall = jQuery.speed(speed, easing, callback),
			    doAnimation = function () {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation(this, jQuery.extend({}, prop), optall);

				// Empty animations, or finishing resolves immediately
				if (empty || dataPriv.get(this, "finish")) {
					anim.stop(true);
				}
			};
			doAnimation.finish = doAnimation;

			return empty || optall.queue === false ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
		},
		stop: function (type, clearQueue, gotoEnd) {
			var stopQueue = function (hooks) {
				var stop = hooks.stop;
				delete hooks.stop;
				stop(gotoEnd);
			};

			if (typeof type !== "string") {
				gotoEnd = clearQueue;
				clearQueue = type;
				type = undefined;
			}
			if (clearQueue && type !== false) {
				this.queue(type || "fx", []);
			}

			return this.each(function () {
				var dequeue = true,
				    index = type != null && type + "queueHooks",
				    timers = jQuery.timers,
				    data = dataPriv.get(this);

				if (index) {
					if (data[index] && data[index].stop) {
						stopQueue(data[index]);
					}
				} else {
					for (index in data) {
						if (data[index] && data[index].stop && rrun.test(index)) {
							stopQueue(data[index]);
						}
					}
				}

				for (index = timers.length; index--;) {
					if (timers[index].elem === this && (type == null || timers[index].queue === type)) {

						timers[index].anim.stop(gotoEnd);
						dequeue = false;
						timers.splice(index, 1);
					}
				}

				// Start the next in the queue if the last step wasn't forced.
				// Timers currently will call their complete callbacks, which
				// will dequeue but only if they were gotoEnd.
				if (dequeue || !gotoEnd) {
					jQuery.dequeue(this, type);
				}
			});
		},
		finish: function (type) {
			if (type !== false) {
				type = type || "fx";
			}
			return this.each(function () {
				var index,
				    data = dataPriv.get(this),
				    queue = data[type + "queue"],
				    hooks = data[type + "queueHooks"],
				    timers = jQuery.timers,
				    length = queue ? queue.length : 0;

				// Enable finishing flag on private data
				data.finish = true;

				// Empty the queue first
				jQuery.queue(this, type, []);

				if (hooks && hooks.stop) {
					hooks.stop.call(this, true);
				}

				// Look for any active animations, and finish them
				for (index = timers.length; index--;) {
					if (timers[index].elem === this && timers[index].queue === type) {
						timers[index].anim.stop(true);
						timers.splice(index, 1);
					}
				}

				// Look for any animations in the old queue and finish them
				for (index = 0; index < length; index++) {
					if (queue[index] && queue[index].finish) {
						queue[index].finish.call(this);
					}
				}

				// Turn off finishing flag
				delete data.finish;
			});
		}
	});

	jQuery.each(["toggle", "show", "hide"], function (i, name) {
		var cssFn = jQuery.fn[name];
		jQuery.fn[name] = function (speed, easing, callback) {
			return speed == null || typeof speed === "boolean" ? cssFn.apply(this, arguments) : this.animate(genFx(name, true), speed, easing, callback);
		};
	});

	// Generate shortcuts for custom animations
	jQuery.each({
		slideDown: genFx("show"),
		slideUp: genFx("hide"),
		slideToggle: genFx("toggle"),
		fadeIn: { opacity: "show" },
		fadeOut: { opacity: "hide" },
		fadeToggle: { opacity: "toggle" }
	}, function (name, props) {
		jQuery.fn[name] = function (speed, easing, callback) {
			return this.animate(props, speed, easing, callback);
		};
	});

	jQuery.timers = [];
	jQuery.fx.tick = function () {
		var timer,
		    i = 0,
		    timers = jQuery.timers;

		fxNow = jQuery.now();

		for (; i < timers.length; i++) {
			timer = timers[i];

			// Checks the timer has not already been removed
			if (!timer() && timers[i] === timer) {
				timers.splice(i--, 1);
			}
		}

		if (!timers.length) {
			jQuery.fx.stop();
		}
		fxNow = undefined;
	};

	jQuery.fx.timer = function (timer) {
		jQuery.timers.push(timer);
		if (timer()) {
			jQuery.fx.start();
		} else {
			jQuery.timers.pop();
		}
	};

	jQuery.fx.interval = 13;
	jQuery.fx.start = function () {
		if (!timerId) {
			timerId = window.setInterval(jQuery.fx.tick, jQuery.fx.interval);
		}
	};

	jQuery.fx.stop = function () {
		window.clearInterval(timerId);

		timerId = null;
	};

	jQuery.fx.speeds = {
		slow: 600,
		fast: 200,

		// Default speed
		_default: 400
	};

	// Based off of the plugin by Clint Helfers, with permission.
	// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
	jQuery.fn.delay = function (time, type) {
		time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
		type = type || "fx";

		return this.queue(type, function (next, hooks) {
			var timeout = window.setTimeout(next, time);
			hooks.stop = function () {
				window.clearTimeout(timeout);
			};
		});
	};

	(function () {
		var input = document.createElement("input"),
		    select = document.createElement("select"),
		    opt = select.appendChild(document.createElement("option"));

		input.type = "checkbox";

		// Support: iOS<=5.1, Android<=4.2+
		// Default value for a checkbox should be "on"
		support.checkOn = input.value !== "";

		// Support: IE<=11+
		// Must access selectedIndex to make default options select
		support.optSelected = opt.selected;

		// Support: Android<=2.3
		// Options inside disabled selects are incorrectly marked as disabled
		select.disabled = true;
		support.optDisabled = !opt.disabled;

		// Support: IE<=11+
		// An input loses its value after becoming a radio
		input = document.createElement("input");
		input.value = "t";
		input.type = "radio";
		support.radioValue = input.value === "t";
	})();

	var boolHook,
	    attrHandle = jQuery.expr.attrHandle;

	jQuery.fn.extend({
		attr: function (name, value) {
			return access(this, jQuery.attr, name, value, arguments.length > 1);
		},

		removeAttr: function (name) {
			return this.each(function () {
				jQuery.removeAttr(this, name);
			});
		}
	});

	jQuery.extend({
		attr: function (elem, name, value) {
			var ret,
			    hooks,
			    nType = elem.nodeType;

			// Don't get/set attributes on text, comment and attribute nodes
			if (nType === 3 || nType === 8 || nType === 2) {
				return;
			}

			// Fallback to prop when attributes are not supported
			if (typeof elem.getAttribute === "undefined") {
				return jQuery.prop(elem, name, value);
			}

			// All attributes are lowercase
			// Grab necessary hook if one is defined
			if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
				name = name.toLowerCase();
				hooks = jQuery.attrHooks[name] || (jQuery.expr.match.bool.test(name) ? boolHook : undefined);
			}

			if (value !== undefined) {
				if (value === null) {
					jQuery.removeAttr(elem, name);
					return;
				}

				if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
					return ret;
				}

				elem.setAttribute(name, value + "");
				return value;
			}

			if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
				return ret;
			}

			ret = jQuery.find.attr(elem, name);

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ? undefined : ret;
		},

		attrHooks: {
			type: {
				set: function (elem, value) {
					if (!support.radioValue && value === "radio" && jQuery.nodeName(elem, "input")) {
						var val = elem.value;
						elem.setAttribute("type", value);
						if (val) {
							elem.value = val;
						}
						return value;
					}
				}
			}
		},

		removeAttr: function (elem, value) {
			var name,
			    propName,
			    i = 0,
			    attrNames = value && value.match(rnotwhite);

			if (attrNames && elem.nodeType === 1) {
				while (name = attrNames[i++]) {
					propName = jQuery.propFix[name] || name;

					// Boolean attributes get special treatment (#10870)
					if (jQuery.expr.match.bool.test(name)) {

						// Set corresponding property to false
						elem[propName] = false;
					}

					elem.removeAttribute(name);
				}
			}
		}
	});

	// Hooks for boolean attributes
	boolHook = {
		set: function (elem, value, name) {
			if (value === false) {

				// Remove boolean attributes when set to false
				jQuery.removeAttr(elem, name);
			} else {
				elem.setAttribute(name, name);
			}
			return name;
		}
	};
	jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function (i, name) {
		var getter = attrHandle[name] || jQuery.find.attr;

		attrHandle[name] = function (elem, name, isXML) {
			var ret, handle;
			if (!isXML) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[name];
				attrHandle[name] = ret;
				ret = getter(elem, name, isXML) != null ? name.toLowerCase() : null;
				attrHandle[name] = handle;
			}
			return ret;
		};
	});

	var rfocusable = /^(?:input|select|textarea|button)$/i,
	    rclickable = /^(?:a|area)$/i;

	jQuery.fn.extend({
		prop: function (name, value) {
			return access(this, jQuery.prop, name, value, arguments.length > 1);
		},

		removeProp: function (name) {
			return this.each(function () {
				delete this[jQuery.propFix[name] || name];
			});
		}
	});

	jQuery.extend({
		prop: function (elem, name, value) {
			var ret,
			    hooks,
			    nType = elem.nodeType;

			// Don't get/set properties on text, comment and attribute nodes
			if (nType === 3 || nType === 8 || nType === 2) {
				return;
			}

			if (nType !== 1 || !jQuery.isXMLDoc(elem)) {

				// Fix name and attach hooks
				name = jQuery.propFix[name] || name;
				hooks = jQuery.propHooks[name];
			}

			if (value !== undefined) {
				if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
					return ret;
				}

				return elem[name] = value;
			}

			if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
				return ret;
			}

			return elem[name];
		},

		propHooks: {
			tabIndex: {
				get: function (elem) {

					// elem.tabIndex doesn't always return the
					// correct value when it hasn't been explicitly set
					// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
					// Use proper attribute retrieval(#12072)
					var tabindex = jQuery.find.attr(elem, "tabindex");

					return tabindex ? parseInt(tabindex, 10) : rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href ? 0 : -1;
				}
			}
		},

		propFix: {
			"for": "htmlFor",
			"class": "className"
		}
	});

	// Support: IE <=11 only
	// Accessing the selectedIndex property
	// forces the browser to respect setting selected
	// on the option
	// The getter ensures a default option is selected
	// when in an optgroup
	if (!support.optSelected) {
		jQuery.propHooks.selected = {
			get: function (elem) {
				var parent = elem.parentNode;
				if (parent && parent.parentNode) {
					parent.parentNode.selectedIndex;
				}
				return null;
			},
			set: function (elem) {
				var parent = elem.parentNode;
				if (parent) {
					parent.selectedIndex;

					if (parent.parentNode) {
						parent.parentNode.selectedIndex;
					}
				}
			}
		};
	}

	jQuery.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
		jQuery.propFix[this.toLowerCase()] = this;
	});

	var rclass = /[\t\r\n\f]/g;

	function getClass(elem) {
		return elem.getAttribute && elem.getAttribute("class") || "";
	}

	jQuery.fn.extend({
		addClass: function (value) {
			var classes,
			    elem,
			    cur,
			    curValue,
			    clazz,
			    j,
			    finalValue,
			    i = 0;

			if (jQuery.isFunction(value)) {
				return this.each(function (j) {
					jQuery(this).addClass(value.call(this, j, getClass(this)));
				});
			}

			if (typeof value === "string" && value) {
				classes = value.match(rnotwhite) || [];

				while (elem = this[i++]) {
					curValue = getClass(elem);
					cur = elem.nodeType === 1 && (" " + curValue + " ").replace(rclass, " ");

					if (cur) {
						j = 0;
						while (clazz = classes[j++]) {
							if (cur.indexOf(" " + clazz + " ") < 0) {
								cur += clazz + " ";
							}
						}

						// Only assign if different to avoid unneeded rendering.
						finalValue = jQuery.trim(cur);
						if (curValue !== finalValue) {
							elem.setAttribute("class", finalValue);
						}
					}
				}
			}

			return this;
		},

		removeClass: function (value) {
			var classes,
			    elem,
			    cur,
			    curValue,
			    clazz,
			    j,
			    finalValue,
			    i = 0;

			if (jQuery.isFunction(value)) {
				return this.each(function (j) {
					jQuery(this).removeClass(value.call(this, j, getClass(this)));
				});
			}

			if (!arguments.length) {
				return this.attr("class", "");
			}

			if (typeof value === "string" && value) {
				classes = value.match(rnotwhite) || [];

				while (elem = this[i++]) {
					curValue = getClass(elem);

					// This expression is here for better compressibility (see addClass)
					cur = elem.nodeType === 1 && (" " + curValue + " ").replace(rclass, " ");

					if (cur) {
						j = 0;
						while (clazz = classes[j++]) {

							// Remove *all* instances
							while (cur.indexOf(" " + clazz + " ") > -1) {
								cur = cur.replace(" " + clazz + " ", " ");
							}
						}

						// Only assign if different to avoid unneeded rendering.
						finalValue = jQuery.trim(cur);
						if (curValue !== finalValue) {
							elem.setAttribute("class", finalValue);
						}
					}
				}
			}

			return this;
		},

		toggleClass: function (value, stateVal) {
			var type = typeof value;

			if (typeof stateVal === "boolean" && type === "string") {
				return stateVal ? this.addClass(value) : this.removeClass(value);
			}

			if (jQuery.isFunction(value)) {
				return this.each(function (i) {
					jQuery(this).toggleClass(value.call(this, i, getClass(this), stateVal), stateVal);
				});
			}

			return this.each(function () {
				var className, i, self, classNames;

				if (type === "string") {

					// Toggle individual class names
					i = 0;
					self = jQuery(this);
					classNames = value.match(rnotwhite) || [];

					while (className = classNames[i++]) {

						// Check each className given, space separated list
						if (self.hasClass(className)) {
							self.removeClass(className);
						} else {
							self.addClass(className);
						}
					}

					// Toggle whole class name
				} else if (value === undefined || type === "boolean") {
						className = getClass(this);
						if (className) {

							// Store className if set
							dataPriv.set(this, "__className__", className);
						}

						// If the element has a class name or if we're passed `false`,
						// then remove the whole classname (if there was one, the above saved it).
						// Otherwise bring back whatever was previously saved (if anything),
						// falling back to the empty string if nothing was stored.
						if (this.setAttribute) {
							this.setAttribute("class", className || value === false ? "" : dataPriv.get(this, "__className__") || "");
						}
					}
			});
		},

		hasClass: function (selector) {
			var className,
			    elem,
			    i = 0;

			className = " " + selector + " ";
			while (elem = this[i++]) {
				if (elem.nodeType === 1 && (" " + getClass(elem) + " ").replace(rclass, " ").indexOf(className) > -1) {
					return true;
				}
			}

			return false;
		}
	});

	var rreturn = /\r/g,
	    rspaces = /[\x20\t\r\n\f]+/g;

	jQuery.fn.extend({
		val: function (value) {
			var hooks,
			    ret,
			    isFunction,
			    elem = this[0];

			if (!arguments.length) {
				if (elem) {
					hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()];

					if (hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== undefined) {
						return ret;
					}

					ret = elem.value;

					return typeof ret === "string" ?

					// Handle most common string cases
					ret.replace(rreturn, "") :

					// Handle cases where value is null/undef or number
					ret == null ? "" : ret;
				}

				return;
			}

			isFunction = jQuery.isFunction(value);

			return this.each(function (i) {
				var val;

				if (this.nodeType !== 1) {
					return;
				}

				if (isFunction) {
					val = value.call(this, i, jQuery(this).val());
				} else {
					val = value;
				}

				// Treat null/undefined as ""; convert numbers to string
				if (val == null) {
					val = "";
				} else if (typeof val === "number") {
					val += "";
				} else if (jQuery.isArray(val)) {
					val = jQuery.map(val, function (value) {
						return value == null ? "" : value + "";
					});
				}

				hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];

				// If set returns undefined, fall back to normal setting
				if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === undefined) {
					this.value = val;
				}
			});
		}
	});

	jQuery.extend({
		valHooks: {
			option: {
				get: function (elem) {

					var val = jQuery.find.attr(elem, "value");
					return val != null ? val :

					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					jQuery.trim(jQuery.text(elem)).replace(rspaces, " ");
				}
			},
			select: {
				get: function (elem) {
					var value,
					    option,
					    options = elem.options,
					    index = elem.selectedIndex,
					    one = elem.type === "select-one" || index < 0,
					    values = one ? null : [],
					    max = one ? index + 1 : options.length,
					    i = index < 0 ? max : one ? index : 0;

					// Loop through all the selected options
					for (; i < max; i++) {
						option = options[i];

						// IE8-9 doesn't update selected after form reset (#2551)
						if ((option.selected || i === index) && (

						// Don't return options that are disabled or in a disabled optgroup
						support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null) && (!option.parentNode.disabled || !jQuery.nodeName(option.parentNode, "optgroup"))) {

							// Get the specific value for the option
							value = jQuery(option).val();

							// We don't need an array for one selects
							if (one) {
								return value;
							}

							// Multi-Selects return an array
							values.push(value);
						}
					}

					return values;
				},

				set: function (elem, value) {
					var optionSet,
					    option,
					    options = elem.options,
					    values = jQuery.makeArray(value),
					    i = options.length;

					while (i--) {
						option = options[i];
						if (option.selected = jQuery.inArray(jQuery.valHooks.option.get(option), values) > -1) {
							optionSet = true;
						}
					}

					// Force browsers to behave consistently when non-matching value is set
					if (!optionSet) {
						elem.selectedIndex = -1;
					}
					return values;
				}
			}
		}
	});

	// Radios and checkboxes getter/setter
	jQuery.each(["radio", "checkbox"], function () {
		jQuery.valHooks[this] = {
			set: function (elem, value) {
				if (jQuery.isArray(value)) {
					return elem.checked = jQuery.inArray(jQuery(elem).val(), value) > -1;
				}
			}
		};
		if (!support.checkOn) {
			jQuery.valHooks[this].get = function (elem) {
				return elem.getAttribute("value") === null ? "on" : elem.value;
			};
		}
	});

	// Return jQuery for attributes-only inclusion

	var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

	jQuery.extend(jQuery.event, {

		trigger: function (event, data, elem, onlyHandlers) {

			var i,
			    cur,
			    tmp,
			    bubbleType,
			    ontype,
			    handle,
			    special,
			    eventPath = [elem || document],
			    type = hasOwn.call(event, "type") ? event.type : event,
			    namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];

			cur = tmp = elem = elem || document;

			// Don't do events on text and comment nodes
			if (elem.nodeType === 3 || elem.nodeType === 8) {
				return;
			}

			// focus/blur morphs to focusin/out; ensure we're not firing them right now
			if (rfocusMorph.test(type + jQuery.event.triggered)) {
				return;
			}

			if (type.indexOf(".") > -1) {

				// Namespaced trigger; create a regexp to match event type in handle()
				namespaces = type.split(".");
				type = namespaces.shift();
				namespaces.sort();
			}
			ontype = type.indexOf(":") < 0 && "on" + type;

			// Caller can pass in a jQuery.Event object, Object, or just an event type string
			event = event[jQuery.expando] ? event : new jQuery.Event(type, typeof event === "object" && event);

			// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
			event.isTrigger = onlyHandlers ? 2 : 3;
			event.namespace = namespaces.join(".");
			event.rnamespace = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;

			// Clean up the event in case it is being reused
			event.result = undefined;
			if (!event.target) {
				event.target = elem;
			}

			// Clone any incoming data and prepend the event, creating the handler arg list
			data = data == null ? [event] : jQuery.makeArray(data, [event]);

			// Allow special events to draw outside the lines
			special = jQuery.event.special[type] || {};
			if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
				return;
			}

			// Determine event propagation path in advance, per W3C events spec (#9951)
			// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
			if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {

				bubbleType = special.delegateType || type;
				if (!rfocusMorph.test(bubbleType + type)) {
					cur = cur.parentNode;
				}
				for (; cur; cur = cur.parentNode) {
					eventPath.push(cur);
					tmp = cur;
				}

				// Only add window if we got to document (e.g., not plain obj or detached DOM)
				if (tmp === (elem.ownerDocument || document)) {
					eventPath.push(tmp.defaultView || tmp.parentWindow || window);
				}
			}

			// Fire handlers on the event path
			i = 0;
			while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {

				event.type = i > 1 ? bubbleType : special.bindType || type;

				// jQuery handler
				handle = (dataPriv.get(cur, "events") || {})[event.type] && dataPriv.get(cur, "handle");
				if (handle) {
					handle.apply(cur, data);
				}

				// Native handler
				handle = ontype && cur[ontype];
				if (handle && handle.apply && acceptData(cur)) {
					event.result = handle.apply(cur, data);
					if (event.result === false) {
						event.preventDefault();
					}
				}
			}
			event.type = type;

			// If nobody prevented the default action, do it now
			if (!onlyHandlers && !event.isDefaultPrevented()) {

				if ((!special._default || special._default.apply(eventPath.pop(), data) === false) && acceptData(elem)) {

					// Call a native DOM method on the target with the same name name as the event.
					// Don't do default actions on window, that's where global variables be (#6170)
					if (ontype && jQuery.isFunction(elem[type]) && !jQuery.isWindow(elem)) {

						// Don't re-trigger an onFOO event when we call its FOO() method
						tmp = elem[ontype];

						if (tmp) {
							elem[ontype] = null;
						}

						// Prevent re-triggering of the same event, since we already bubbled it above
						jQuery.event.triggered = type;
						elem[type]();
						jQuery.event.triggered = undefined;

						if (tmp) {
							elem[ontype] = tmp;
						}
					}
				}
			}

			return event.result;
		},

		// Piggyback on a donor event to simulate a different one
		// Used only for `focus(in | out)` events
		simulate: function (type, elem, event) {
			var e = jQuery.extend(new jQuery.Event(), event, {
				type: type,
				isSimulated: true
			});

			jQuery.event.trigger(e, null, elem);
		}

	});

	jQuery.fn.extend({

		trigger: function (type, data) {
			return this.each(function () {
				jQuery.event.trigger(type, data, this);
			});
		},
		triggerHandler: function (type, data) {
			var elem = this[0];
			if (elem) {
				return jQuery.event.trigger(type, data, elem, true);
			}
		}
	});

	jQuery.each(("blur focus focusin focusout load resize scroll unload click dblclick " + "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " + "change select submit keydown keypress keyup error contextmenu").split(" "), function (i, name) {

		// Handle event binding
		jQuery.fn[name] = function (data, fn) {
			return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name);
		};
	});

	jQuery.fn.extend({
		hover: function (fnOver, fnOut) {
			return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
		}
	});

	support.focusin = "onfocusin" in window;

	// Support: Firefox
	// Firefox doesn't have focus(in | out) events
	// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
	//
	// Support: Chrome, Safari
	// focus(in | out) events fire after focus & blur events,
	// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
	// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
	if (!support.focusin) {
		jQuery.each({ focus: "focusin", blur: "focusout" }, function (orig, fix) {

			// Attach a single capturing handler on the document while someone wants focusin/focusout
			var handler = function (event) {
				jQuery.event.simulate(fix, event.target, jQuery.event.fix(event));
			};

			jQuery.event.special[fix] = {
				setup: function () {
					var doc = this.ownerDocument || this,
					    attaches = dataPriv.access(doc, fix);

					if (!attaches) {
						doc.addEventListener(orig, handler, true);
					}
					dataPriv.access(doc, fix, (attaches || 0) + 1);
				},
				teardown: function () {
					var doc = this.ownerDocument || this,
					    attaches = dataPriv.access(doc, fix) - 1;

					if (!attaches) {
						doc.removeEventListener(orig, handler, true);
						dataPriv.remove(doc, fix);
					} else {
						dataPriv.access(doc, fix, attaches);
					}
				}
			};
		});
	}
	var location = window.location;

	var nonce = jQuery.now();

	var rquery = /\?/;

	// Support: Android 2.3
	// Workaround failure to string-cast null input
	jQuery.parseJSON = function (data) {
		return JSON.parse(data + "");
	};

	// Cross-browser xml parsing
	jQuery.parseXML = function (data) {
		var xml;
		if (!data || typeof data !== "string") {
			return null;
		}

		// Support: IE9
		try {
			xml = new window.DOMParser().parseFromString(data, "text/xml");
		} catch (e) {
			xml = undefined;
		}

		if (!xml || xml.getElementsByTagName("parsererror").length) {
			jQuery.error("Invalid XML: " + data);
		}
		return xml;
	};

	var rhash = /#.*$/,
	    rts = /([?&])_=[^&]*/,
	    rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,


	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	    rnoContent = /^(?:GET|HEAD)$/,
	    rprotocol = /^\/\//,


	/* Prefilters
  * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
  * 2) These are called:
  *    - BEFORE asking for a transport
  *    - AFTER param serialization (s.data is a string if s.processData is true)
  * 3) key is the dataType
  * 4) the catchall symbol "*" can be used
  * 5) execution will start with transport dataType and THEN continue down to "*" if needed
  */
	prefilters = {},


	/* Transports bindings
  * 1) key is the dataType
  * 2) the catchall symbol "*" can be used
  * 3) selection will start with transport dataType and THEN go to "*" if needed
  */
	transports = {},


	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*"),


	// Anchor tag for parsing the document origin
	originAnchor = document.createElement("a");
	originAnchor.href = location.href;

	// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
	function addToPrefiltersOrTransports(structure) {

		// dataTypeExpression is optional and defaults to "*"
		return function (dataTypeExpression, func) {

			if (typeof dataTypeExpression !== "string") {
				func = dataTypeExpression;
				dataTypeExpression = "*";
			}

			var dataType,
			    i = 0,
			    dataTypes = dataTypeExpression.toLowerCase().match(rnotwhite) || [];

			if (jQuery.isFunction(func)) {

				// For each dataType in the dataTypeExpression
				while (dataType = dataTypes[i++]) {

					// Prepend if requested
					if (dataType[0] === "+") {
						dataType = dataType.slice(1) || "*";
						(structure[dataType] = structure[dataType] || []).unshift(func);

						// Otherwise append
					} else {
							(structure[dataType] = structure[dataType] || []).push(func);
						}
				}
			}
		};
	}

	// Base inspection function for prefilters and transports
	function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {

		var inspected = {},
		    seekingTransport = structure === transports;

		function inspect(dataType) {
			var selected;
			inspected[dataType] = true;
			jQuery.each(structure[dataType] || [], function (_, prefilterOrFactory) {
				var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
				if (typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[dataTypeOrTransport]) {

					options.dataTypes.unshift(dataTypeOrTransport);
					inspect(dataTypeOrTransport);
					return false;
				} else if (seekingTransport) {
					return !(selected = dataTypeOrTransport);
				}
			});
			return selected;
		}

		return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
	}

	// A special extend for ajax options
	// that takes "flat" options (not to be deep extended)
	// Fixes #9887
	function ajaxExtend(target, src) {
		var key,
		    deep,
		    flatOptions = jQuery.ajaxSettings.flatOptions || {};

		for (key in src) {
			if (src[key] !== undefined) {
				(flatOptions[key] ? target : deep || (deep = {}))[key] = src[key];
			}
		}
		if (deep) {
			jQuery.extend(true, target, deep);
		}

		return target;
	}

	/* Handles responses to an ajax request:
  * - finds the right dataType (mediates between content-type and expected dataType)
  * - returns the corresponding response
  */
	function ajaxHandleResponses(s, jqXHR, responses) {

		var ct,
		    type,
		    finalDataType,
		    firstDataType,
		    contents = s.contents,
		    dataTypes = s.dataTypes;

		// Remove auto dataType and get content-type in the process
		while (dataTypes[0] === "*") {
			dataTypes.shift();
			if (ct === undefined) {
				ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
			}
		}

		// Check if we're dealing with a known content-type
		if (ct) {
			for (type in contents) {
				if (contents[type] && contents[type].test(ct)) {
					dataTypes.unshift(type);
					break;
				}
			}
		}

		// Check to see if we have a response for the expected dataType
		if (dataTypes[0] in responses) {
			finalDataType = dataTypes[0];
		} else {

			// Try convertible dataTypes
			for (type in responses) {
				if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
					finalDataType = type;
					break;
				}
				if (!firstDataType) {
					firstDataType = type;
				}
			}

			// Or just use first one
			finalDataType = finalDataType || firstDataType;
		}

		// If we found a dataType
		// We add the dataType to the list if needed
		// and return the corresponding response
		if (finalDataType) {
			if (finalDataType !== dataTypes[0]) {
				dataTypes.unshift(finalDataType);
			}
			return responses[finalDataType];
		}
	}

	/* Chain conversions given the request and the original response
  * Also sets the responseXXX fields on the jqXHR instance
  */
	function ajaxConvert(s, response, jqXHR, isSuccess) {
		var conv2,
		    current,
		    conv,
		    tmp,
		    prev,
		    converters = {},


		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

		// Create converters map with lowercased keys
		if (dataTypes[1]) {
			for (conv in s.converters) {
				converters[conv.toLowerCase()] = s.converters[conv];
			}
		}

		current = dataTypes.shift();

		// Convert to each sequential dataType
		while (current) {

			if (s.responseFields[current]) {
				jqXHR[s.responseFields[current]] = response;
			}

			// Apply the dataFilter if provided
			if (!prev && isSuccess && s.dataFilter) {
				response = s.dataFilter(response, s.dataType);
			}

			prev = current;
			current = dataTypes.shift();

			if (current) {

				// There's only work to do if current dataType is non-auto
				if (current === "*") {

					current = prev;

					// Convert response if prev dataType is non-auto and differs from current
				} else if (prev !== "*" && prev !== current) {

						// Seek a direct converter
						conv = converters[prev + " " + current] || converters["* " + current];

						// If none found, seek a pair
						if (!conv) {
							for (conv2 in converters) {

								// If conv2 outputs current
								tmp = conv2.split(" ");
								if (tmp[1] === current) {

									// If prev can be converted to accepted input
									conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]];
									if (conv) {

										// Condense equivalence converters
										if (conv === true) {
											conv = converters[conv2];

											// Otherwise, insert the intermediate dataType
										} else if (converters[conv2] !== true) {
												current = tmp[0];
												dataTypes.unshift(tmp[1]);
											}
										break;
									}
								}
							}
						}

						// Apply converter (if not an equivalence)
						if (conv !== true) {

							// Unless errors are allowed to bubble, catch and return them
							if (conv && s.throws) {
								response = conv(response);
							} else {
								try {
									response = conv(response);
								} catch (e) {
									return {
										state: "parsererror",
										error: conv ? e : "No conversion from " + prev + " to " + current
									};
								}
							}
						}
					}
			}
		}

		return { state: "success", data: response };
	}

	jQuery.extend({

		// Counter for holding the number of active queries
		active: 0,

		// Last-Modified header cache for next request
		lastModified: {},
		etag: {},

		ajaxSettings: {
			url: location.href,
			type: "GET",
			isLocal: rlocalProtocol.test(location.protocol),
			global: true,
			processData: true,
			async: true,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			/*
   timeout: 0,
   data: null,
   dataType: null,
   username: null,
   password: null,
   cache: null,
   throws: false,
   traditional: false,
   headers: {},
   */

			accepts: {
				"*": allTypes,
				text: "text/plain",
				html: "text/html",
				xml: "application/xml, text/xml",
				json: "application/json, text/javascript"
			},

			contents: {
				xml: /\bxml\b/,
				html: /\bhtml/,
				json: /\bjson\b/
			},

			responseFields: {
				xml: "responseXML",
				text: "responseText",
				json: "responseJSON"
			},

			// Data converters
			// Keys separate source (or catchall "*") and destination types with a single space
			converters: {

				// Convert anything to text
				"* text": String,

				// Text to html (true = no transformation)
				"text html": true,

				// Evaluate text as a json expression
				"text json": jQuery.parseJSON,

				// Parse text as xml
				"text xml": jQuery.parseXML
			},

			// For options that shouldn't be deep extended:
			// you can add your own custom options here if
			// and when you create one that shouldn't be
			// deep extended (see ajaxExtend)
			flatOptions: {
				url: true,
				context: true
			}
		},

		// Creates a full fledged settings object into target
		// with both ajaxSettings and settings fields.
		// If target is omitted, writes into ajaxSettings.
		ajaxSetup: function (target, settings) {
			return settings ?

			// Building a settings object
			ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) :

			// Extending ajaxSettings
			ajaxExtend(jQuery.ajaxSettings, target);
		},

		ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
		ajaxTransport: addToPrefiltersOrTransports(transports),

		// Main method
		ajax: function (url, options) {

			// If url is an object, simulate pre-1.5 signature
			if (typeof url === "object") {
				options = url;
				url = undefined;
			}

			// Force options to be an object
			options = options || {};

			var transport,


			// URL without anti-cache param
			cacheURL,


			// Response headers
			responseHeadersString,
			    responseHeaders,


			// timeout handle
			timeoutTimer,


			// Url cleanup var
			urlAnchor,


			// To know if global events are to be dispatched
			fireGlobals,


			// Loop variable
			i,


			// Create the final options object
			s = jQuery.ajaxSetup({}, options),


			// Callbacks context
			callbackContext = s.context || s,


			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event,


			// Deferreds
			deferred = jQuery.Deferred(),
			    completeDeferred = jQuery.Callbacks("once memory"),


			// Status-dependent callbacks
			statusCode = s.statusCode || {},


			// Headers (they are sent all at once)
			requestHeaders = {},
			    requestHeadersNames = {},


			// The jqXHR state
			state = 0,


			// Default abort message
			strAbort = "canceled",


			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function (key) {
					var match;
					if (state === 2) {
						if (!responseHeaders) {
							responseHeaders = {};
							while (match = rheaders.exec(responseHeadersString)) {
								responseHeaders[match[1].toLowerCase()] = match[2];
							}
						}
						match = responseHeaders[key.toLowerCase()];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function () {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function (name, value) {
					var lname = name.toLowerCase();
					if (!state) {
						name = requestHeadersNames[lname] = requestHeadersNames[lname] || name;
						requestHeaders[name] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function (type) {
					if (!state) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function (map) {
					var code;
					if (map) {
						if (state < 2) {
							for (code in map) {

								// Lazy-add the new callback in a way that preserves old ones
								statusCode[code] = [statusCode[code], map[code]];
							}
						} else {

							// Execute the appropriate callbacks
							jqXHR.always(map[jqXHR.status]);
						}
					}
					return this;
				},

				// Cancel the request
				abort: function (statusText) {
					var finalText = statusText || strAbort;
					if (transport) {
						transport.abort(finalText);
					}
					done(0, finalText);
					return this;
				}
			};

			// Attach deferreds
			deferred.promise(jqXHR).complete = completeDeferred.add;
			jqXHR.success = jqXHR.done;
			jqXHR.error = jqXHR.fail;

			// Remove hash character (#7531: and string promotion)
			// Add protocol if not provided (prefilters might expect it)
			// Handle falsy url in the settings object (#10093: consistency with old signature)
			// We also use the url parameter if available
			s.url = ((url || s.url || location.href) + "").replace(rhash, "").replace(rprotocol, location.protocol + "//");

			// Alias method option to type as per ticket #12004
			s.type = options.method || options.type || s.method || s.type;

			// Extract dataTypes list
			s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().match(rnotwhite) || [""];

			// A cross-domain request is in order when the origin doesn't match the current origin.
			if (s.crossDomain == null) {
				urlAnchor = document.createElement("a");

				// Support: IE8-11+
				// IE throws exception if url is malformed, e.g. http://example.com:80x/
				try {
					urlAnchor.href = s.url;

					// Support: IE8-11+
					// Anchor's host property isn't correctly set when s.url is relative
					urlAnchor.href = urlAnchor.href;
					s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !== urlAnchor.protocol + "//" + urlAnchor.host;
				} catch (e) {

					// If there is an error parsing the URL, assume it is crossDomain,
					// it can be rejected by the transport if it is invalid
					s.crossDomain = true;
				}
			}

			// Convert data if not already a string
			if (s.data && s.processData && typeof s.data !== "string") {
				s.data = jQuery.param(s.data, s.traditional);
			}

			// Apply prefilters
			inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);

			// If request was aborted inside a prefilter, stop there
			if (state === 2) {
				return jqXHR;
			}

			// We can fire global events as of now if asked to
			// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
			fireGlobals = jQuery.event && s.global;

			// Watch for a new set of requests
			if (fireGlobals && jQuery.active++ === 0) {
				jQuery.event.trigger("ajaxStart");
			}

			// Uppercase the type
			s.type = s.type.toUpperCase();

			// Determine if request has content
			s.hasContent = !rnoContent.test(s.type);

			// Save the URL in case we're toying with the If-Modified-Since
			// and/or If-None-Match header later on
			cacheURL = s.url;

			// More options handling for requests with no content
			if (!s.hasContent) {

				// If data is available, append data to url
				if (s.data) {
					cacheURL = s.url += (rquery.test(cacheURL) ? "&" : "?") + s.data;

					// #9682: remove data so that it's not used in an eventual retry
					delete s.data;
				}

				// Add anti-cache in url if needed
				if (s.cache === false) {
					s.url = rts.test(cacheURL) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace(rts, "$1_=" + nonce++) :

					// Otherwise add one to the end
					cacheURL + (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce++;
				}
			}

			// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
			if (s.ifModified) {
				if (jQuery.lastModified[cacheURL]) {
					jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]);
				}
				if (jQuery.etag[cacheURL]) {
					jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL]);
				}
			}

			// Set the correct header, if data is being sent
			if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
				jqXHR.setRequestHeader("Content-Type", s.contentType);
			}

			// Set the Accepts header for the server, depending on the dataType
			jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]);

			// Check for headers option
			for (i in s.headers) {
				jqXHR.setRequestHeader(i, s.headers[i]);
			}

			// Allow custom headers/mimetypes and early abort
			if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || state === 2)) {

				// Abort if not done already and return
				return jqXHR.abort();
			}

			// Aborting is no longer a cancellation
			strAbort = "abort";

			// Install callbacks on deferreds
			for (i in { success: 1, error: 1, complete: 1 }) {
				jqXHR[i](s[i]);
			}

			// Get transport
			transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);

			// If no transport, we auto-abort
			if (!transport) {
				done(-1, "No Transport");
			} else {
				jqXHR.readyState = 1;

				// Send global event
				if (fireGlobals) {
					globalEventContext.trigger("ajaxSend", [jqXHR, s]);
				}

				// If request was aborted inside ajaxSend, stop there
				if (state === 2) {
					return jqXHR;
				}

				// Timeout
				if (s.async && s.timeout > 0) {
					timeoutTimer = window.setTimeout(function () {
						jqXHR.abort("timeout");
					}, s.timeout);
				}

				try {
					state = 1;
					transport.send(requestHeaders, done);
				} catch (e) {

					// Propagate exception as error if not done
					if (state < 2) {
						done(-1, e);

						// Simply rethrow otherwise
					} else {
							throw e;
						}
				}
			}

			// Callback for when everything is done
			function done(status, nativeStatusText, responses, headers) {
				var isSuccess,
				    success,
				    error,
				    response,
				    modified,
				    statusText = nativeStatusText;

				// Called once
				if (state === 2) {
					return;
				}

				// State is "done" now
				state = 2;

				// Clear timeout if it exists
				if (timeoutTimer) {
					window.clearTimeout(timeoutTimer);
				}

				// Dereference transport for early garbage collection
				// (no matter how long the jqXHR object will be used)
				transport = undefined;

				// Cache response headers
				responseHeadersString = headers || "";

				// Set readyState
				jqXHR.readyState = status > 0 ? 4 : 0;

				// Determine if successful
				isSuccess = status >= 200 && status < 300 || status === 304;

				// Get response data
				if (responses) {
					response = ajaxHandleResponses(s, jqXHR, responses);
				}

				// Convert no matter what (that way responseXXX fields are always set)
				response = ajaxConvert(s, response, jqXHR, isSuccess);

				// If successful, handle type chaining
				if (isSuccess) {

					// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
					if (s.ifModified) {
						modified = jqXHR.getResponseHeader("Last-Modified");
						if (modified) {
							jQuery.lastModified[cacheURL] = modified;
						}
						modified = jqXHR.getResponseHeader("etag");
						if (modified) {
							jQuery.etag[cacheURL] = modified;
						}
					}

					// if no content
					if (status === 204 || s.type === "HEAD") {
						statusText = "nocontent";

						// if not modified
					} else if (status === 304) {
							statusText = "notmodified";

							// If we have data, let's convert it
						} else {
								statusText = response.state;
								success = response.data;
								error = response.error;
								isSuccess = !error;
							}
				} else {

					// Extract error from statusText and normalize for non-aborts
					error = statusText;
					if (status || !statusText) {
						statusText = "error";
						if (status < 0) {
							status = 0;
						}
					}
				}

				// Set data for the fake xhr object
				jqXHR.status = status;
				jqXHR.statusText = (nativeStatusText || statusText) + "";

				// Success/Error
				if (isSuccess) {
					deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
				} else {
					deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
				}

				// Status-dependent callbacks
				jqXHR.statusCode(statusCode);
				statusCode = undefined;

				if (fireGlobals) {
					globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [jqXHR, s, isSuccess ? success : error]);
				}

				// Complete
				completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);

				if (fireGlobals) {
					globalEventContext.trigger("ajaxComplete", [jqXHR, s]);

					// Handle the global AJAX counter
					if (! --jQuery.active) {
						jQuery.event.trigger("ajaxStop");
					}
				}
			}

			return jqXHR;
		},

		getJSON: function (url, data, callback) {
			return jQuery.get(url, data, callback, "json");
		},

		getScript: function (url, callback) {
			return jQuery.get(url, undefined, callback, "script");
		}
	});

	jQuery.each(["get", "post"], function (i, method) {
		jQuery[method] = function (url, data, callback, type) {

			// Shift arguments if data argument was omitted
			if (jQuery.isFunction(data)) {
				type = type || callback;
				callback = data;
				data = undefined;
			}

			// The url can be an options object (which then must have .url)
			return jQuery.ajax(jQuery.extend({
				url: url,
				type: method,
				dataType: type,
				data: data,
				success: callback
			}, jQuery.isPlainObject(url) && url));
		};
	});

	jQuery._evalUrl = function (url) {
		return jQuery.ajax({
			url: url,

			// Make this explicit, since user can override this through ajaxSetup (#11264)
			type: "GET",
			dataType: "script",
			async: false,
			global: false,
			"throws": true
		});
	};

	jQuery.fn.extend({
		wrapAll: function (html) {
			var wrap;

			if (jQuery.isFunction(html)) {
				return this.each(function (i) {
					jQuery(this).wrapAll(html.call(this, i));
				});
			}

			if (this[0]) {

				// The elements to wrap the target around
				wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);

				if (this[0].parentNode) {
					wrap.insertBefore(this[0]);
				}

				wrap.map(function () {
					var elem = this;

					while (elem.firstElementChild) {
						elem = elem.firstElementChild;
					}

					return elem;
				}).append(this);
			}

			return this;
		},

		wrapInner: function (html) {
			if (jQuery.isFunction(html)) {
				return this.each(function (i) {
					jQuery(this).wrapInner(html.call(this, i));
				});
			}

			return this.each(function () {
				var self = jQuery(this),
				    contents = self.contents();

				if (contents.length) {
					contents.wrapAll(html);
				} else {
					self.append(html);
				}
			});
		},

		wrap: function (html) {
			var isFunction = jQuery.isFunction(html);

			return this.each(function (i) {
				jQuery(this).wrapAll(isFunction ? html.call(this, i) : html);
			});
		},

		unwrap: function () {
			return this.parent().each(function () {
				if (!jQuery.nodeName(this, "body")) {
					jQuery(this).replaceWith(this.childNodes);
				}
			}).end();
		}
	});

	jQuery.expr.filters.hidden = function (elem) {
		return !jQuery.expr.filters.visible(elem);
	};
	jQuery.expr.filters.visible = function (elem) {

		// Support: Opera <= 12.12
		// Opera reports offsetWidths and offsetHeights less than zero on some elements
		// Use OR instead of AND as the element is not visible if either is true
		// See tickets #10406 and #13132
		return elem.offsetWidth > 0 || elem.offsetHeight > 0 || elem.getClientRects().length > 0;
	};

	var r20 = /%20/g,
	    rbracket = /\[\]$/,
	    rCRLF = /\r?\n/g,
	    rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	    rsubmittable = /^(?:input|select|textarea|keygen)/i;

	function buildParams(prefix, obj, traditional, add) {
		var name;

		if (jQuery.isArray(obj)) {

			// Serialize array item.
			jQuery.each(obj, function (i, v) {
				if (traditional || rbracket.test(prefix)) {

					// Treat each array item as a scalar.
					add(prefix, v);
				} else {

					// Item is non-scalar (array or object), encode its numeric index.
					buildParams(prefix + "[" + (typeof v === "object" && v != null ? i : "") + "]", v, traditional, add);
				}
			});
		} else if (!traditional && jQuery.type(obj) === "object") {

			// Serialize object item.
			for (name in obj) {
				buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
			}
		} else {

			// Serialize scalar item.
			add(prefix, obj);
		}
	}

	// Serialize an array of form elements or a set of
	// key/values into a query string
	jQuery.param = function (a, traditional) {
		var prefix,
		    s = [],
		    add = function (key, value) {

			// If value is a function, invoke it and return its value
			value = jQuery.isFunction(value) ? value() : value == null ? "" : value;
			s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
		};

		// Set traditional to true for jQuery <= 1.3.2 behavior.
		if (traditional === undefined) {
			traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
		}

		// If an array was passed in, assume that it is an array of form elements.
		if (jQuery.isArray(a) || a.jquery && !jQuery.isPlainObject(a)) {

			// Serialize the form elements
			jQuery.each(a, function () {
				add(this.name, this.value);
			});
		} else {

			// If traditional, encode the "old" way (the way 1.3.2 or older
			// did it), otherwise encode params recursively.
			for (prefix in a) {
				buildParams(prefix, a[prefix], traditional, add);
			}
		}

		// Return the resulting serialization
		return s.join("&").replace(r20, "+");
	};

	jQuery.fn.extend({
		serialize: function () {
			return jQuery.param(this.serializeArray());
		},
		serializeArray: function () {
			return this.map(function () {

				// Can add propHook for "elements" to filter or add form elements
				var elements = jQuery.prop(this, "elements");
				return elements ? jQuery.makeArray(elements) : this;
			}).filter(function () {
				var type = this.type;

				// Use .is( ":disabled" ) so that fieldset[disabled] works
				return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !rcheckableType.test(type));
			}).map(function (i, elem) {
				var val = jQuery(this).val();

				return val == null ? null : jQuery.isArray(val) ? jQuery.map(val, function (val) {
					return { name: elem.name, value: val.replace(rCRLF, "\r\n") };
				}) : { name: elem.name, value: val.replace(rCRLF, "\r\n") };
			}).get();
		}
	});

	jQuery.ajaxSettings.xhr = function () {
		try {
			return new window.XMLHttpRequest();
		} catch (e) {}
	};

	var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE9
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	    xhrSupported = jQuery.ajaxSettings.xhr();

	support.cors = !!xhrSupported && "withCredentials" in xhrSupported;
	support.ajax = xhrSupported = !!xhrSupported;

	jQuery.ajaxTransport(function (options) {
		var callback, errorCallback;

		// Cross domain only allowed if supported through XMLHttpRequest
		if (support.cors || xhrSupported && !options.crossDomain) {
			return {
				send: function (headers, complete) {
					var i,
					    xhr = options.xhr();

					xhr.open(options.type, options.url, options.async, options.username, options.password);

					// Apply custom fields if provided
					if (options.xhrFields) {
						for (i in options.xhrFields) {
							xhr[i] = options.xhrFields[i];
						}
					}

					// Override mime type if needed
					if (options.mimeType && xhr.overrideMimeType) {
						xhr.overrideMimeType(options.mimeType);
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if (!options.crossDomain && !headers["X-Requested-With"]) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Set headers
					for (i in headers) {
						xhr.setRequestHeader(i, headers[i]);
					}

					// Callback
					callback = function (type) {
						return function () {
							if (callback) {
								callback = errorCallback = xhr.onload = xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;

								if (type === "abort") {
									xhr.abort();
								} else if (type === "error") {

									// Support: IE9
									// On a manual native abort, IE9 throws
									// errors on any property access that is not readyState
									if (typeof xhr.status !== "number") {
										complete(0, "error");
									} else {
										complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status, xhr.statusText);
									}
								} else {
									complete(xhrSuccessStatus[xhr.status] || xhr.status, xhr.statusText,

									// Support: IE9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									(xhr.responseType || "text") !== "text" || typeof xhr.responseText !== "string" ? { binary: xhr.response } : { text: xhr.responseText }, xhr.getAllResponseHeaders());
								}
							}
						};
					};

					// Listen to events
					xhr.onload = callback();
					errorCallback = xhr.onerror = callback("error");

					// Support: IE9
					// Use onreadystatechange to replace onabort
					// to handle uncaught aborts
					if (xhr.onabort !== undefined) {
						xhr.onabort = errorCallback;
					} else {
						xhr.onreadystatechange = function () {

							// Check readyState before timeout as it changes
							if (xhr.readyState === 4) {

								// Allow onerror to be called first,
								// but that will not handle a native abort
								// Also, save errorCallback to a variable
								// as xhr.onerror cannot be accessed
								window.setTimeout(function () {
									if (callback) {
										errorCallback();
									}
								});
							}
						};
					}

					// Create the abort callback
					callback = callback("abort");

					try {

						// Do send the request (this may raise an exception)
						xhr.send(options.hasContent && options.data || null);
					} catch (e) {

						// #14683: Only rethrow if this hasn't been notified as an error yet
						if (callback) {
							throw e;
						}
					}
				},

				abort: function () {
					if (callback) {
						callback();
					}
				}
			};
		}
	});

	// Install script dataType
	jQuery.ajaxSetup({
		accepts: {
			script: "text/javascript, application/javascript, " + "application/ecmascript, application/x-ecmascript"
		},
		contents: {
			script: /\b(?:java|ecma)script\b/
		},
		converters: {
			"text script": function (text) {
				jQuery.globalEval(text);
				return text;
			}
		}
	});

	// Handle cache's special case and crossDomain
	jQuery.ajaxPrefilter("script", function (s) {
		if (s.cache === undefined) {
			s.cache = false;
		}
		if (s.crossDomain) {
			s.type = "GET";
		}
	});

	// Bind script tag hack transport
	jQuery.ajaxTransport("script", function (s) {

		// This transport only deals with cross domain requests
		if (s.crossDomain) {
			var script, callback;
			return {
				send: function (_, complete) {
					script = jQuery("<script>").prop({
						charset: s.scriptCharset,
						src: s.url
					}).on("load error", callback = function (evt) {
						script.remove();
						callback = null;
						if (evt) {
							complete(evt.type === "error" ? 404 : 200, evt.type);
						}
					});

					// Use native DOM manipulation to avoid our domManip AJAX trickery
					document.head.appendChild(script[0]);
				},
				abort: function () {
					if (callback) {
						callback();
					}
				}
			};
		}
	});

	var oldCallbacks = [],
	    rjsonp = /(=)\?(?=&|$)|\?\?/;

	// Default jsonp settings
	jQuery.ajaxSetup({
		jsonp: "callback",
		jsonpCallback: function () {
			var callback = oldCallbacks.pop() || jQuery.expando + "_" + nonce++;
			this[callback] = true;
			return callback;
		}
	});

	// Detect, normalize options and install callbacks for jsonp requests
	jQuery.ajaxPrefilter("json jsonp", function (s, originalSettings, jqXHR) {

		var callbackName,
		    overwritten,
		    responseContainer,
		    jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ? "url" : typeof s.data === "string" && (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0 && rjsonp.test(s.data) && "data");

		// Handle iff the expected data type is "jsonp" or we have a parameter to set
		if (jsonProp || s.dataTypes[0] === "jsonp") {

			// Get callback name, remembering preexisting value associated with it
			callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback;

			// Insert callback into url or form data
			if (jsonProp) {
				s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName);
			} else if (s.jsonp !== false) {
				s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName;
			}

			// Use data converter to retrieve json after script execution
			s.converters["script json"] = function () {
				if (!responseContainer) {
					jQuery.error(callbackName + " was not called");
				}
				return responseContainer[0];
			};

			// Force json dataType
			s.dataTypes[0] = "json";

			// Install callback
			overwritten = window[callbackName];
			window[callbackName] = function () {
				responseContainer = arguments;
			};

			// Clean-up function (fires after converters)
			jqXHR.always(function () {

				// If previous value didn't exist - remove it
				if (overwritten === undefined) {
					jQuery(window).removeProp(callbackName);

					// Otherwise restore preexisting value
				} else {
						window[callbackName] = overwritten;
					}

				// Save back as free
				if (s[callbackName]) {

					// Make sure that re-using the options doesn't screw things around
					s.jsonpCallback = originalSettings.jsonpCallback;

					// Save the callback name for future use
					oldCallbacks.push(callbackName);
				}

				// Call if it was a function and we have a response
				if (responseContainer && jQuery.isFunction(overwritten)) {
					overwritten(responseContainer[0]);
				}

				responseContainer = overwritten = undefined;
			});

			// Delegate to script
			return "script";
		}
	});

	// Argument "data" should be string of html
	// context (optional): If specified, the fragment will be created in this context,
	// defaults to document
	// keepScripts (optional): If true, will include scripts passed in the html string
	jQuery.parseHTML = function (data, context, keepScripts) {
		if (!data || typeof data !== "string") {
			return null;
		}
		if (typeof context === "boolean") {
			keepScripts = context;
			context = false;
		}
		context = context || document;

		var parsed = rsingleTag.exec(data),
		    scripts = !keepScripts && [];

		// Single tag
		if (parsed) {
			return [context.createElement(parsed[1])];
		}

		parsed = buildFragment([data], context, scripts);

		if (scripts && scripts.length) {
			jQuery(scripts).remove();
		}

		return jQuery.merge([], parsed.childNodes);
	};

	// Keep a copy of the old load method
	var _load = jQuery.fn.load;

	/**
  * Load a url into a page
  */
	jQuery.fn.load = function (url, params, callback) {
		if (typeof url !== "string" && _load) {
			return _load.apply(this, arguments);
		}

		var selector,
		    type,
		    response,
		    self = this,
		    off = url.indexOf(" ");

		if (off > -1) {
			selector = jQuery.trim(url.slice(off));
			url = url.slice(0, off);
		}

		// If it's a function
		if (jQuery.isFunction(params)) {

			// We assume that it's the callback
			callback = params;
			params = undefined;

			// Otherwise, build a param string
		} else if (params && typeof params === "object") {
				type = "POST";
			}

		// If we have elements to modify, make the request
		if (self.length > 0) {
			jQuery.ajax({
				url: url,

				// If "type" variable is undefined, then "GET" method will be used.
				// Make value of this field explicit since
				// user can override it through ajaxSetup method
				type: type || "GET",
				dataType: "html",
				data: params
			}).done(function (responseText) {

				// Save response for use in complete callback
				response = arguments;

				self.html(selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) :

				// Otherwise use the full result
				responseText);

				// If the request succeeds, this function gets "data", "status", "jqXHR"
				// but they are ignored because response was set above.
				// If it fails, this function gets "jqXHR", "status", "error"
			}).always(callback && function (jqXHR, status) {
				self.each(function () {
					callback.apply(this, response || [jqXHR.responseText, status, jqXHR]);
				});
			});
		}

		return this;
	};

	// Attach a bunch of functions for handling common AJAX events
	jQuery.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (i, type) {
		jQuery.fn[type] = function (fn) {
			return this.on(type, fn);
		};
	});

	jQuery.expr.filters.animated = function (elem) {
		return jQuery.grep(jQuery.timers, function (fn) {
			return elem === fn.elem;
		}).length;
	};

	/**
  * Gets a window from an element
  */
	function getWindow(elem) {
		return jQuery.isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
	}

	jQuery.offset = {
		setOffset: function (elem, options, i) {
			var curPosition,
			    curLeft,
			    curCSSTop,
			    curTop,
			    curOffset,
			    curCSSLeft,
			    calculatePosition,
			    position = jQuery.css(elem, "position"),
			    curElem = jQuery(elem),
			    props = {};

			// Set position first, in-case top/left are set even on static elem
			if (position === "static") {
				elem.style.position = "relative";
			}

			curOffset = curElem.offset();
			curCSSTop = jQuery.css(elem, "top");
			curCSSLeft = jQuery.css(elem, "left");
			calculatePosition = (position === "absolute" || position === "fixed") && (curCSSTop + curCSSLeft).indexOf("auto") > -1;

			// Need to be able to calculate position if either
			// top or left is auto and position is either absolute or fixed
			if (calculatePosition) {
				curPosition = curElem.position();
				curTop = curPosition.top;
				curLeft = curPosition.left;
			} else {
				curTop = parseFloat(curCSSTop) || 0;
				curLeft = parseFloat(curCSSLeft) || 0;
			}

			if (jQuery.isFunction(options)) {

				// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
				options = options.call(elem, i, jQuery.extend({}, curOffset));
			}

			if (options.top != null) {
				props.top = options.top - curOffset.top + curTop;
			}
			if (options.left != null) {
				props.left = options.left - curOffset.left + curLeft;
			}

			if ("using" in options) {
				options.using.call(elem, props);
			} else {
				curElem.css(props);
			}
		}
	};

	jQuery.fn.extend({
		offset: function (options) {
			if (arguments.length) {
				return options === undefined ? this : this.each(function (i) {
					jQuery.offset.setOffset(this, options, i);
				});
			}

			var docElem,
			    win,
			    elem = this[0],
			    box = { top: 0, left: 0 },
			    doc = elem && elem.ownerDocument;

			if (!doc) {
				return;
			}

			docElem = doc.documentElement;

			// Make sure it's not a disconnected DOM node
			if (!jQuery.contains(docElem, elem)) {
				return box;
			}

			box = elem.getBoundingClientRect();
			win = getWindow(doc);
			return {
				top: box.top + win.pageYOffset - docElem.clientTop,
				left: box.left + win.pageXOffset - docElem.clientLeft
			};
		},

		position: function () {
			if (!this[0]) {
				return;
			}

			var offsetParent,
			    offset,
			    elem = this[0],
			    parentOffset = { top: 0, left: 0 };

			// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
			// because it is its only offset parent
			if (jQuery.css(elem, "position") === "fixed") {

				// Assume getBoundingClientRect is there when computed position is fixed
				offset = elem.getBoundingClientRect();
			} else {

				// Get *real* offsetParent
				offsetParent = this.offsetParent();

				// Get correct offsets
				offset = this.offset();
				if (!jQuery.nodeName(offsetParent[0], "html")) {
					parentOffset = offsetParent.offset();
				}

				// Add offsetParent borders
				parentOffset.top += jQuery.css(offsetParent[0], "borderTopWidth", true);
				parentOffset.left += jQuery.css(offsetParent[0], "borderLeftWidth", true);
			}

			// Subtract parent offsets and element margins
			return {
				top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
				left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", true)
			};
		},

		// This method will return documentElement in the following cases:
		// 1) For the element inside the iframe without offsetParent, this method will return
		//    documentElement of the parent window
		// 2) For the hidden or detached element
		// 3) For body or html element, i.e. in case of the html node - it will return itself
		//
		// but those exceptions were never presented as a real life use-cases
		// and might be considered as more preferable results.
		//
		// This logic, however, is not guaranteed and can change at any point in the future
		offsetParent: function () {
			return this.map(function () {
				var offsetParent = this.offsetParent;

				while (offsetParent && jQuery.css(offsetParent, "position") === "static") {
					offsetParent = offsetParent.offsetParent;
				}

				return offsetParent || documentElement;
			});
		}
	});

	// Create scrollLeft and scrollTop methods
	jQuery.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function (method, prop) {
		var top = "pageYOffset" === prop;

		jQuery.fn[method] = function (val) {
			return access(this, function (elem, method, val) {
				var win = getWindow(elem);

				if (val === undefined) {
					return win ? win[prop] : elem[method];
				}

				if (win) {
					win.scrollTo(!top ? val : win.pageXOffset, top ? val : win.pageYOffset);
				} else {
					elem[method] = val;
				}
			}, method, val, arguments.length);
		};
	});

	// Support: Safari<7-8+, Chrome<37-44+
	// Add the top/left cssHooks using jQuery.fn.position
	// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
	// Blink bug: https://code.google.com/p/chromium/issues/detail?id=229280
	// getComputedStyle returns percent when specified for top/left/bottom/right;
	// rather than make the css module depend on the offset module, just check for it here
	jQuery.each(["top", "left"], function (i, prop) {
		jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition, function (elem, computed) {
			if (computed) {
				computed = curCSS(elem, prop);

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + "px" : computed;
			}
		});
	});

	// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
	jQuery.each({ Height: "height", Width: "width" }, function (name, type) {
		jQuery.each({ padding: "inner" + name, content: type, "": "outer" + name }, function (defaultExtra, funcName) {

			// Margin is only for outerHeight, outerWidth
			jQuery.fn[funcName] = function (margin, value) {
				var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"),
				    extra = defaultExtra || (margin === true || value === true ? "margin" : "border");

				return access(this, function (elem, type, value) {
					var doc;

					if (jQuery.isWindow(elem)) {

						// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
						// isn't a whole lot we can do. See pull request at this URL for discussion:
						// https://github.com/jquery/jquery/pull/764
						return elem.document.documentElement["client" + name];
					}

					// Get document width or height
					if (elem.nodeType === 9) {
						doc = elem.documentElement;

						// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
						// whichever is greatest
						return Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name]);
					}

					return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css(elem, type, extra) :

					// Set width or height on the element
					jQuery.style(elem, type, value, extra);
				}, type, chainable ? margin : undefined, chainable, null);
			};
		});
	});

	jQuery.fn.extend({

		bind: function (types, data, fn) {
			return this.on(types, null, data, fn);
		},
		unbind: function (types, fn) {
			return this.off(types, null, fn);
		},

		delegate: function (selector, types, data, fn) {
			return this.on(types, selector, data, fn);
		},
		undelegate: function (selector, types, fn) {

			// ( namespace ) or ( selector, types [, fn] )
			return arguments.length === 1 ? this.off(selector, "**") : this.off(types, selector || "**", fn);
		},
		size: function () {
			return this.length;
		}
	});

	jQuery.fn.andSelf = jQuery.fn.addBack;

	// Register as a named AMD module, since jQuery can be concatenated with other
	// files that may use define, but not via a proper concatenation script that
	// understands anonymous AMD modules. A named AMD is safest and most robust
	// way to register. Lowercase jquery is used because AMD module names are
	// derived from file names, and jQuery is normally delivered in a lowercase
	// file name. Do this after creating the global so that if an AMD module wants
	// to call noConflict to hide this version of jQuery, it will work.

	// Note that for maximum portability, libraries that are not jQuery should
	// declare themselves as anonymous modules, and avoid setting a global if an
	// AMD loader is present. jQuery is a special case. For more information, see
	// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

	if (typeof define === "function" && define.amd) {
		define("jquery", [], function () {
			return jQuery;
		});
	}

	var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,


	// Map over the $ in case of overwrite
	_$ = window.$;

	jQuery.noConflict = function (deep) {
		if (window.$ === jQuery) {
			window.$ = _$;
		}

		if (deep && window.jQuery === jQuery) {
			window.jQuery = _jQuery;
		}

		return jQuery;
	};

	// Expose jQuery and $ identifiers, even in AMD
	// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
	// and CommonJS for browser emulators (#13566)
	if (!noGlobal) {
		window.jQuery = window.$ = jQuery;
	}

	return jQuery;
});
'use strict';

window.whatInput = function () {

  'use strict';

  /*
    ---------------
    variables
    ---------------
  */

  // array of actively pressed keys

  var activeKeys = [];

  // cache document.body
  var body;

  // boolean: true if touch buffer timer is running
  var buffer = false;

  // the last used input type
  var currentInput = null;

  // `input` types that don't accept text
  var nonTypingInputs = ['button', 'checkbox', 'file', 'image', 'radio', 'reset', 'submit'];

  // detect version of mouse wheel event to use
  // via https://developer.mozilla.org/en-US/docs/Web/Events/wheel
  var mouseWheel = detectWheel();

  // list of modifier keys commonly used with the mouse and
  // can be safely ignored to prevent false keyboard detection
  var ignoreMap = [16, // shift
  17, // control
  18, // alt
  91, // Windows key / left Apple cmd
  93 // Windows menu / right Apple cmd
  ];

  // mapping of events to input types
  var inputMap = {
    'keydown': 'keyboard',
    'keyup': 'keyboard',
    'mousedown': 'mouse',
    'mousemove': 'mouse',
    'MSPointerDown': 'pointer',
    'MSPointerMove': 'pointer',
    'pointerdown': 'pointer',
    'pointermove': 'pointer',
    'touchstart': 'touch'
  };

  // add correct mouse wheel event mapping to `inputMap`
  inputMap[detectWheel()] = 'mouse';

  // array of all used input types
  var inputTypes = [];

  // mapping of key codes to a common name
  var keyMap = {
    9: 'tab',
    13: 'enter',
    16: 'shift',
    27: 'esc',
    32: 'space',
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  // map of IE 10 pointer events
  var pointerMap = {
    2: 'touch',
    3: 'touch', // treat pen like touch
    4: 'mouse'
  };

  // touch buffer timer
  var timer;

  /*
    ---------------
    functions
    ---------------
  */

  // allows events that are also triggered to be filtered out for `touchstart`
  function eventBuffer() {
    clearTimer();
    setInput(event);

    buffer = true;
    timer = window.setTimeout(function () {
      buffer = false;
    }, 650);
  }

  function bufferedEvent(event) {
    if (!buffer) setInput(event);
  }

  function unBufferedEvent(event) {
    clearTimer();
    setInput(event);
  }

  function clearTimer() {
    window.clearTimeout(timer);
  }

  function setInput(event) {
    var eventKey = key(event);
    var value = inputMap[event.type];
    if (value === 'pointer') value = pointerType(event);

    // don't do anything if the value matches the input type already set
    if (currentInput !== value) {
      var eventTarget = target(event);
      var eventTargetNode = eventTarget.nodeName.toLowerCase();
      var eventTargetType = eventTargetNode === 'input' ? eventTarget.getAttribute('type') : null;

      if ( // only if the user flag to allow typing in form fields isn't set
      !body.hasAttribute('data-whatinput-formtyping') &&

      // only if currentInput has a value
      currentInput &&

      // only if the input is `keyboard`
      value === 'keyboard' &&

      // not if the key is `TAB`
      keyMap[eventKey] !== 'tab' && (

      // only if the target is a form input that accepts text
      eventTargetNode === 'textarea' || eventTargetNode === 'select' || eventTargetNode === 'input' && nonTypingInputs.indexOf(eventTargetType) < 0) ||
      // ignore modifier keys
      ignoreMap.indexOf(eventKey) > -1) {
        // ignore keyboard typing
      } else {
          switchInput(value);
        }
    }

    if (value === 'keyboard') logKeys(eventKey);
  }

  function switchInput(string) {
    currentInput = string;
    body.setAttribute('data-whatinput', currentInput);

    if (inputTypes.indexOf(currentInput) === -1) inputTypes.push(currentInput);
  }

  function key(event) {
    return event.keyCode ? event.keyCode : event.which;
  }

  function target(event) {
    return event.target || event.srcElement;
  }

  function pointerType(event) {
    if (typeof event.pointerType === 'number') {
      return pointerMap[event.pointerType];
    } else {
      return event.pointerType === 'pen' ? 'touch' : event.pointerType; // treat pen like touch
    }
  }

  // keyboard logging
  function logKeys(eventKey) {
    if (activeKeys.indexOf(keyMap[eventKey]) === -1 && keyMap[eventKey]) activeKeys.push(keyMap[eventKey]);
  }

  function unLogKeys(event) {
    var eventKey = key(event);
    var arrayPos = activeKeys.indexOf(keyMap[eventKey]);

    if (arrayPos !== -1) activeKeys.splice(arrayPos, 1);
  }

  function bindEvents() {
    body = document.body;

    // pointer events (mouse, pen, touch)
    if (window.PointerEvent) {
      body.addEventListener('pointerdown', bufferedEvent);
      body.addEventListener('pointermove', bufferedEvent);
    } else if (window.MSPointerEvent) {
      body.addEventListener('MSPointerDown', bufferedEvent);
      body.addEventListener('MSPointerMove', bufferedEvent);
    } else {

      // mouse events
      body.addEventListener('mousedown', bufferedEvent);
      body.addEventListener('mousemove', bufferedEvent);

      // touch events
      if ('ontouchstart' in window) {
        body.addEventListener('touchstart', eventBuffer);
      }
    }

    // mouse wheel
    body.addEventListener(mouseWheel, bufferedEvent);

    // keyboard events
    body.addEventListener('keydown', unBufferedEvent);
    body.addEventListener('keyup', unBufferedEvent);
    document.addEventListener('keyup', unLogKeys);
  }

  /*
    ---------------
    utilities
    ---------------
  */

  // detect version of mouse wheel event to use
  // via https://developer.mozilla.org/en-US/docs/Web/Events/wheel
  function detectWheel() {
    return mouseWheel = 'onwheel' in document.createElement('div') ? 'wheel' : // Modern browsers support "wheel"

    document.onmousewheel !== undefined ? 'mousewheel' : // Webkit and IE support at least "mousewheel"
    'DOMMouseScroll'; // let's assume that remaining browsers are older Firefox
  }

  /*
    ---------------
    init
     don't start script unless browser cuts the mustard,
    also passes if polyfills are used
    ---------------
  */

  if ('addEventListener' in window && Array.prototype.indexOf) {

    // if the dom is already ready already (script was placed at bottom of <body>)
    if (document.body) {
      bindEvents();

      // otherwise wait for the dom to load (script was placed in the <head>)
    } else {
        document.addEventListener('DOMContentLoaded', bindEvents);
      }
  }

  /*
    ---------------
    api
    ---------------
  */

  return {

    // returns string: the current input type
    ask: function () {
      return currentInput;
    },

    // returns array: currently pressed keys
    keys: function () {
      return activeKeys;
    },

    // returns array: all the detected input types
    types: function () {
      return inputTypes;
    },

    // accepts string: manually set the input type
    set: switchInput
  };
}();
'use strict';

!function ($) {

  "use strict";

  var FOUNDATION_VERSION = '6.2.2';

  // Global Foundation object
  // This is attached to the window, or used as a module for AMD/Browserify
  var Foundation = {
    version: FOUNDATION_VERSION,

    /**
     * Stores initialized plugins.
     */
    _plugins: {},

    /**
     * Stores generated unique ids for plugin instances
     */
    _uuids: [],

    /**
     * Returns a boolean for RTL support
     */
    rtl: function () {
      return $('html').attr('dir') === 'rtl';
    },
    /**
     * Defines a Foundation plugin, adding it to the `Foundation` namespace and the list of plugins to initialize when reflowing.
     * @param {Object} plugin - The constructor of the plugin.
     */
    plugin: function (plugin, name) {
      // Object key to use when adding to global Foundation object
      // Examples: Foundation.Reveal, Foundation.OffCanvas
      var className = name || functionName(plugin);
      // Object key to use when storing the plugin, also used to create the identifying data attribute for the plugin
      // Examples: data-reveal, data-off-canvas
      var attrName = hyphenate(className);

      // Add to the Foundation object and the plugins list (for reflowing)
      this._plugins[attrName] = this[className] = plugin;
    },
    /**
     * @function
     * Populates the _uuids array with pointers to each individual plugin instance.
     * Adds the `zfPlugin` data-attribute to programmatically created plugins to allow use of $(selector).foundation(method) calls.
     * Also fires the initialization event for each plugin, consolidating repetitive code.
     * @param {Object} plugin - an instance of a plugin, usually `this` in context.
     * @param {String} name - the name of the plugin, passed as a camelCased string.
     * @fires Plugin#init
     */
    registerPlugin: function (plugin, name) {
      var pluginName = name ? hyphenate(name) : functionName(plugin.constructor).toLowerCase();
      plugin.uuid = this.GetYoDigits(6, pluginName);

      if (!plugin.$element.attr('data-' + pluginName)) {
        plugin.$element.attr('data-' + pluginName, plugin.uuid);
      }
      if (!plugin.$element.data('zfPlugin')) {
        plugin.$element.data('zfPlugin', plugin);
      }
      /**
       * Fires when the plugin has initialized.
       * @event Plugin#init
       */
      plugin.$element.trigger('init.zf.' + pluginName);

      this._uuids.push(plugin.uuid);

      return;
    },
    /**
     * @function
     * Removes the plugins uuid from the _uuids array.
     * Removes the zfPlugin data attribute, as well as the data-plugin-name attribute.
     * Also fires the destroyed event for the plugin, consolidating repetitive code.
     * @param {Object} plugin - an instance of a plugin, usually `this` in context.
     * @fires Plugin#destroyed
     */
    unregisterPlugin: function (plugin) {
      var pluginName = hyphenate(functionName(plugin.$element.data('zfPlugin').constructor));

      this._uuids.splice(this._uuids.indexOf(plugin.uuid), 1);
      plugin.$element.removeAttr('data-' + pluginName).removeData('zfPlugin')
      /**
       * Fires when the plugin has been destroyed.
       * @event Plugin#destroyed
       */
      .trigger('destroyed.zf.' + pluginName);
      for (var prop in plugin) {
        plugin[prop] = null; //clean up script to prep for garbage collection.
      }
      return;
    },

    /**
     * @function
     * Causes one or more active plugins to re-initialize, resetting event listeners, recalculating positions, etc.
     * @param {String} plugins - optional string of an individual plugin key, attained by calling `$(element).data('pluginName')`, or string of a plugin class i.e. `'dropdown'`
     * @default If no argument is passed, reflow all currently active plugins.
     */
    reInit: function (plugins) {
      var isJQ = plugins instanceof $;
      try {
        if (isJQ) {
          plugins.each(function () {
            $(this).data('zfPlugin')._init();
          });
        } else {
          var type = typeof plugins,
              _this = this,
              fns = {
            'object': function (plgs) {
              plgs.forEach(function (p) {
                p = hyphenate(p);
                $('[data-' + p + ']').foundation('_init');
              });
            },
            'string': function () {
              plugins = hyphenate(plugins);
              $('[data-' + plugins + ']').foundation('_init');
            },
            'undefined': function () {
              this['object'](Object.keys(_this._plugins));
            }
          };
          fns[type](plugins);
        }
      } catch (err) {
        console.error(err);
      } finally {
        return plugins;
      }
    },

    /**
     * returns a random base-36 uid with namespacing
     * @function
     * @param {Number} length - number of random base-36 digits desired. Increase for more random strings.
     * @param {String} namespace - name of plugin to be incorporated in uid, optional.
     * @default {String} '' - if no plugin name is provided, nothing is appended to the uid.
     * @returns {String} - unique id
     */
    GetYoDigits: function (length, namespace) {
      length = length || 6;
      return Math.round(Math.pow(36, length + 1) - Math.random() * Math.pow(36, length)).toString(36).slice(1) + (namespace ? '-' + namespace : '');
    },
    /**
     * Initialize plugins on any elements within `elem` (and `elem` itself) that aren't already initialized.
     * @param {Object} elem - jQuery object containing the element to check inside. Also checks the element itself, unless it's the `document` object.
     * @param {String|Array} plugins - A list of plugins to initialize. Leave this out to initialize everything.
     */
    reflow: function (elem, plugins) {

      // If plugins is undefined, just grab everything
      if (typeof plugins === 'undefined') {
        plugins = Object.keys(this._plugins);
      }
      // If plugins is a string, convert it to an array with one item
      else if (typeof plugins === 'string') {
          plugins = [plugins];
        }

      var _this = this;

      // Iterate through each plugin
      $.each(plugins, function (i, name) {
        // Get the current plugin
        var plugin = _this._plugins[name];

        // Localize the search to all elements inside elem, as well as elem itself, unless elem === document
        var $elem = $(elem).find('[data-' + name + ']').addBack('[data-' + name + ']');

        // For each plugin found, initialize it
        $elem.each(function () {
          var $el = $(this),
              opts = {};
          // Don't double-dip on plugins
          if ($el.data('zfPlugin')) {
            console.warn("Tried to initialize " + name + " on an element that already has a Foundation plugin.");
            return;
          }

          if ($el.attr('data-options')) {
            var thing = $el.attr('data-options').split(';').forEach(function (e, i) {
              var opt = e.split(':').map(function (el) {
                return el.trim();
              });
              if (opt[0]) opts[opt[0]] = parseValue(opt[1]);
            });
          }
          try {
            $el.data('zfPlugin', new plugin($(this), opts));
          } catch (er) {
            console.error(er);
          } finally {
            return;
          }
        });
      });
    },
    getFnName: functionName,
    transitionend: function ($elem) {
      var transitions = {
        'transition': 'transitionend',
        'WebkitTransition': 'webkitTransitionEnd',
        'MozTransition': 'transitionend',
        'OTransition': 'otransitionend'
      };
      var elem = document.createElement('div'),
          end;

      for (var t in transitions) {
        if (typeof elem.style[t] !== 'undefined') {
          end = transitions[t];
        }
      }
      if (end) {
        return end;
      } else {
        end = setTimeout(function () {
          $elem.triggerHandler('transitionend', [$elem]);
        }, 1);
        return 'transitionend';
      }
    }
  };

  Foundation.util = {
    /**
     * Function for applying a debounce effect to a function call.
     * @function
     * @param {Function} func - Function to be called at end of timeout.
     * @param {Number} delay - Time in ms to delay the call of `func`.
     * @returns function
     */
    throttle: function (func, delay) {
      var timer = null;

      return function () {
        var context = this,
            args = arguments;

        if (timer === null) {
          timer = setTimeout(function () {
            func.apply(context, args);
            timer = null;
          }, delay);
        }
      };
    }
  };

  // TODO: consider not making this a jQuery function
  // TODO: need way to reflow vs. re-initialize
  /**
   * The Foundation jQuery method.
   * @param {String|Array} method - An action to perform on the current jQuery object.
   */
  var foundation = function (method) {
    var type = typeof method,
        $meta = $('meta.foundation-mq'),
        $noJS = $('.no-js');

    if (!$meta.length) {
      $('<meta class="foundation-mq">').appendTo(document.head);
    }
    if ($noJS.length) {
      $noJS.removeClass('no-js');
    }

    if (type === 'undefined') {
      //needs to initialize the Foundation object, or an individual plugin.
      Foundation.MediaQuery._init();
      Foundation.reflow(this);
    } else if (type === 'string') {
      //an individual method to invoke on a plugin or group of plugins
      var args = Array.prototype.slice.call(arguments, 1); //collect all the arguments, if necessary
      var plugClass = this.data('zfPlugin'); //determine the class of plugin

      if (plugClass !== undefined && plugClass[method] !== undefined) {
        //make sure both the class and method exist
        if (this.length === 1) {
          //if there's only one, call it directly.
          plugClass[method].apply(plugClass, args);
        } else {
          this.each(function (i, el) {
            //otherwise loop through the jQuery collection and invoke the method on each
            plugClass[method].apply($(el).data('zfPlugin'), args);
          });
        }
      } else {
        //error for no class or no method
        throw new ReferenceError("We're sorry, '" + method + "' is not an available method for " + (plugClass ? functionName(plugClass) : 'this element') + '.');
      }
    } else {
      //error for invalid argument type
      throw new TypeError('We\'re sorry, ' + type + ' is not a valid parameter. You must use a string representing the method you wish to invoke.');
    }
    return this;
  };

  window.Foundation = Foundation;
  $.fn.foundation = foundation;

  // Polyfill for requestAnimationFrame
  (function () {
    if (!Date.now || !window.Date.now) window.Date.now = Date.now = function () {
      return new Date().getTime();
    };

    var vendors = ['webkit', 'moz'];
    for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
      var vp = vendors[i];
      window.requestAnimationFrame = window[vp + 'RequestAnimationFrame'];
      window.cancelAnimationFrame = window[vp + 'CancelAnimationFrame'] || window[vp + 'CancelRequestAnimationFrame'];
    }
    if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
      var lastTime = 0;
      window.requestAnimationFrame = function (callback) {
        var now = Date.now();
        var nextTime = Math.max(lastTime + 16, now);
        return setTimeout(function () {
          callback(lastTime = nextTime);
        }, nextTime - now);
      };
      window.cancelAnimationFrame = clearTimeout;
    }
    /**
     * Polyfill for performance.now, required by rAF
     */
    if (!window.performance || !window.performance.now) {
      window.performance = {
        start: Date.now(),
        now: function () {
          return Date.now() - this.start;
        }
      };
    }
  })();
  if (!Function.prototype.bind) {
    Function.prototype.bind = function (oThis) {
      if (typeof this !== 'function') {
        // closest thing possible to the ECMAScript 5
        // internal IsCallable function
        throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
      }

      var aArgs = Array.prototype.slice.call(arguments, 1),
          fToBind = this,
          fNOP = function () {},
          fBound = function () {
        return fToBind.apply(this instanceof fNOP ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
      };

      if (this.prototype) {
        // native functions don't have a prototype
        fNOP.prototype = this.prototype;
      }
      fBound.prototype = new fNOP();

      return fBound;
    };
  }
  // Polyfill to get the name of a function in IE9
  function functionName(fn) {
    if (Function.prototype.name === undefined) {
      var funcNameRegex = /function\s([^(]{1,})\(/;
      var results = funcNameRegex.exec(fn.toString());
      return results && results.length > 1 ? results[1].trim() : "";
    } else if (fn.prototype === undefined) {
      return fn.constructor.name;
    } else {
      return fn.prototype.constructor.name;
    }
  }
  function parseValue(str) {
    if (/true/.test(str)) return true;else if (/false/.test(str)) return false;else if (!isNaN(str * 1)) return parseFloat(str);
    return str;
  }
  // Convert PascalCase to kebab-case
  // Thank you: http://stackoverflow.com/a/8955580
  function hyphenate(str) {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  }
}(jQuery);
"use strict";

// --------------------------------------------------
// APP.JS
// --------------------------------------------------

//
// Initialize Foundation
// --------------------------------------------------

$(document).foundation();

//
// Custom JS
// --------------------------------------------------
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpxdWVyeS5qcyIsIndoYXQtaW5wdXQuanMiLCJmb3VuZGF0aW9uLmNvcmUuanMiLCJhcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQWNDLFdBQVUsTUFBVixFQUFrQixPQUFsQixFQUE0Qjs7QUFFNUIsS0FBSyxPQUFPLE1BQVAsS0FBa0IsUUFBbEIsSUFBOEIsT0FBTyxPQUFPLE9BQWQsS0FBMEIsUUFBN0QsRUFBd0U7Ozs7Ozs7O0FBUXZFLFNBQU8sT0FBUCxHQUFpQixPQUFPLFFBQVAsR0FDaEIsUUFBUyxNQUFULEVBQWlCLElBQWpCLENBRGdCLEdBRWhCLFVBQVUsQ0FBVixFQUFjO0FBQ2IsT0FBSyxDQUFDLEVBQUUsUUFBUixFQUFtQjtBQUNsQixVQUFNLElBQUksS0FBSixDQUFXLDBDQUFYLENBQU47QUFDQTtBQUNELFVBQU8sUUFBUyxDQUFULENBQVA7QUFDQSxHQVBGO0FBUUEsRUFoQkQsTUFnQk87QUFDTixVQUFTLE1BQVQ7QUFDQTs7O0FBR0QsQ0F2QkEsRUF1QkMsT0FBTyxNQUFQLEtBQWtCLFdBQWxCLEdBQWdDLE1BQWhDLEdBQXlDLElBdkIxQyxFQXVCZ0QsVUFBVSxNQUFWLEVBQWtCLFFBQWxCLEVBQTZCOzs7Ozs7O0FBTzlFLEtBQUksTUFBTSxFQUFWOztBQUVBLEtBQUksV0FBVyxPQUFPLFFBQXRCOztBQUVBLEtBQUksUUFBUSxJQUFJLEtBQWhCOztBQUVBLEtBQUksU0FBUyxJQUFJLE1BQWpCOztBQUVBLEtBQUksT0FBTyxJQUFJLElBQWY7O0FBRUEsS0FBSSxVQUFVLElBQUksT0FBbEI7O0FBRUEsS0FBSSxhQUFhLEVBQWpCOztBQUVBLEtBQUksV0FBVyxXQUFXLFFBQTFCOztBQUVBLEtBQUksU0FBUyxXQUFXLGNBQXhCOztBQUVBLEtBQUksVUFBVSxFQUFkOztBQUlBLEtBQ0MsVUFBVSxPQURYOzs7O0FBSUMsVUFBUyxVQUFVLFFBQVYsRUFBb0IsT0FBcEIsRUFBOEI7Ozs7QUFJdEMsU0FB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LENBQUgsRUFBcUIsT0FBTyxJQUFQLENBQXJCLEtBQ0ssSUFBRyxRQUFRLElBQVIsQ0FBYSxHQUFiLENBQUgsRUFBc0IsT0FBTyxLQUFQLENBQXRCLEtBQ0EsSUFBRyxDQUFDLE1BQU0sTUFBTSxDQUFaLENBQUosRUFBb0IsT0FBTyxXQUFXLEdBQVgsQ0FBUDtBQUN6QixXQUFPLEdBQVA7QUFDRDs7O0FBR0QsV0FBUyxTQUFULENBQW1CLEdBQW5CLEVBQXdCO0FBQ3RCLFdBQU8sSUFBSSxPQUFKLENBQVksaUJBQVosRUFBK0IsT0FBL0IsRUFBd0MsV0FBeEMsRUFBUDtBQUNEO0FBRUEsQ0F6WEEsQ0F5WEMsTUF6WEQsQ0FBRDs7Ozs7Ozs7Ozs7QUNRQSxFQUFFLFFBQUYsRUFBWSxVQUFaIiwiZmlsZSI6ImFsbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogalF1ZXJ5IEphdmFTY3JpcHQgTGlicmFyeSB2Mi4yLjRcbiAqIGh0dHA6Ly9qcXVlcnkuY29tL1xuICpcbiAqIEluY2x1ZGVzIFNpenpsZS5qc1xuICogaHR0cDovL3NpenpsZWpzLmNvbS9cbiAqXG4gKiBDb3B5cmlnaHQgalF1ZXJ5IEZvdW5kYXRpb24gYW5kIG90aGVyIGNvbnRyaWJ1dG9yc1xuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKiBodHRwOi8vanF1ZXJ5Lm9yZy9saWNlbnNlXG4gKlxuICogRGF0ZTogMjAxNi0wNS0yMFQxNzoyM1pcbiAqL1xuXG4oZnVuY3Rpb24oIGdsb2JhbCwgZmFjdG9yeSApIHtcblxuXHRpZiAoIHR5cGVvZiBtb2R1bGUgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSBcIm9iamVjdFwiICkge1xuXHRcdC8vIEZvciBDb21tb25KUyBhbmQgQ29tbW9uSlMtbGlrZSBlbnZpcm9ubWVudHMgd2hlcmUgYSBwcm9wZXIgYHdpbmRvd2Bcblx0XHQvLyBpcyBwcmVzZW50LCBleGVjdXRlIHRoZSBmYWN0b3J5IGFuZCBnZXQgalF1ZXJ5LlxuXHRcdC8vIEZvciBlbnZpcm9ubWVudHMgdGhhdCBkbyBub3QgaGF2ZSBhIGB3aW5kb3dgIHdpdGggYSBgZG9jdW1lbnRgXG5cdFx0Ly8gKHN1Y2ggYXMgTm9kZS5qcyksIGV4cG9zZSBhIGZhY3RvcnkgYXMgbW9kdWxlLmV4cG9ydHMuXG5cdFx0Ly8gVGhpcyBhY2NlbnR1YXRlcyB0aGUgbmVlZCBmb3IgdGhlIGNyZWF0aW9uIG9mIGEgcmVhbCBgd2luZG93YC5cblx0XHQvLyBlLmcuIHZhciBqUXVlcnkgPSByZXF1aXJlKFwianF1ZXJ5XCIpKHdpbmRvdyk7XG5cdFx0Ly8gU2VlIHRpY2tldCAjMTQ1NDkgZm9yIG1vcmUgaW5mby5cblx0XHRtb2R1bGUuZXhwb3J0cyA9IGdsb2JhbC5kb2N1bWVudCA/XG5cdFx0XHRmYWN0b3J5KCBnbG9iYWwsIHRydWUgKSA6XG5cdFx0XHRmdW5jdGlvbiggdyApIHtcblx0XHRcdFx0aWYgKCAhdy5kb2N1bWVudCApIHtcblx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoIFwialF1ZXJ5IHJlcXVpcmVzIGEgd2luZG93IHdpdGggYSBkb2N1bWVudFwiICk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIGZhY3RvcnkoIHcgKTtcblx0XHRcdH07XG5cdH0gZWxzZSB7XG5cdFx0ZmFjdG9yeSggZ2xvYmFsICk7XG5cdH1cblxuLy8gUGFzcyB0aGlzIGlmIHdpbmRvdyBpcyBub3QgZGVmaW5lZCB5ZXRcbn0odHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHRoaXMsIGZ1bmN0aW9uKCB3aW5kb3csIG5vR2xvYmFsICkge1xuXG4vLyBTdXBwb3J0OiBGaXJlZm94IDE4K1xuLy8gQ2FuJ3QgYmUgaW4gc3RyaWN0IG1vZGUsIHNldmVyYWwgbGlicyBpbmNsdWRpbmcgQVNQLk5FVCB0cmFjZVxuLy8gdGhlIHN0YWNrIHZpYSBhcmd1bWVudHMuY2FsbGVyLmNhbGxlZSBhbmQgRmlyZWZveCBkaWVzIGlmXG4vLyB5b3UgdHJ5IHRvIHRyYWNlIHRocm91Z2ggXCJ1c2Ugc3RyaWN0XCIgY2FsbCBjaGFpbnMuICgjMTMzMzUpXG4vL1widXNlIHN0cmljdFwiO1xudmFyIGFyciA9IFtdO1xuXG52YXIgZG9jdW1lbnQgPSB3aW5kb3cuZG9jdW1lbnQ7XG5cbnZhciBzbGljZSA9IGFyci5zbGljZTtcblxudmFyIGNvbmNhdCA9IGFyci5jb25jYXQ7XG5cbnZhciBwdXNoID0gYXJyLnB1c2g7XG5cbnZhciBpbmRleE9mID0gYXJyLmluZGV4T2Y7XG5cbnZhciBjbGFzczJ0eXBlID0ge307XG5cbnZhciB0b1N0cmluZyA9IGNsYXNzMnR5cGUudG9TdHJpbmc7XG5cbnZhciBoYXNPd24gPSBjbGFzczJ0eXBlLmhhc093blByb3BlcnR5O1xuXG52YXIgc3VwcG9ydCA9IHt9O1xuXG5cblxudmFyXG5cdHZlcnNpb24gPSBcIjIuMi40XCIsXG5cblx0Ly8gRGVmaW5lIGEgbG9jYWwgY29weSBvZiBqUXVlcnlcblx0alF1ZXJ5ID0gZnVuY3Rpb24oIHNlbGVjdG9yLCBjb250ZXh0ICkge1xuXG5cdFx0Ly8gVGhlIGpRdWVyeSBvYmplY3QgaXMgYWN0dWFsbHkganVzdCB0aGUgaW5pdCBjb25zdHJ1Y3RvciAnZW5oYW5jZWQnXG5cdFx0Ly8gTmVlZCBpbml0IGlmIGpRdWVyeSBpcyBjYWxsZWQgKGp1c3QgYWxsb3cgZXJyb3IgdG8gYmUgdGhyb3duIGlmIG5vdCBpbmNsdWRlZClcblx0XHRyZXR1cm4gbmV3IGpRdWVyeS5mbi5pbml0KCBzZWxlY3RvciwgY29udGV4dCApO1xuXHR9LFxuXG5cdC8vIFN1cHBvcnQ6IEFuZHJvaWQ8NC4xXG5cdC8vIE1ha2Ugc3VyZSB3ZSB0cmltIEJPTSBhbmQgTkJTUFxuXHRydHJpbSA9IC9eW1xcc1xcdUZFRkZcXHhBMF0rfFtcXHNcXHVGRUZGXFx4QTBdKyQvZyxcblxuXHQvLyBNYXRjaGVzIGRhc2hlZCBzdHJpbmcgZm9yIGNhbWVsaXppbmdcblx0cm1zUHJlZml4ID0gL14tbXMtLyxcblx0cmRhc2hBbHBoYSA9IC8tKFtcXGRhLXpdKS9naSxcblxuXHQvLyBVc2VkIGJ5IGpRdWVyeS5jYW1lbENhc2UgYXMgY2FsbGJhY2sgdG8gcmVwbGFjZSgpXG5cdGZjYW1lbENhc2UgPSBmdW5jdGlvbiggYWxsLCBsZXR0ZXIgKSB7XG5cdFx0cmV0dXJuIGxldHRlci50b1VwcGVyQ2FzZSgpO1xuXHR9O1xuXG5qUXVlcnkuZm4gPSBqUXVlcnkucHJvdG90eXBlID0ge1xuXG5cdC8vIFRoZSBjdXJyZW50IHZlcnNpb24gb2YgalF1ZXJ5IGJlaW5nIHVzZWRcblx0anF1ZXJ5OiB2ZXJzaW9uLFxuXG5cdGNvbnN0cnVjdG9yOiBqUXVlcnksXG5cblx0Ly8gU3RhcnQgd2l0aCBhbiBlbXB0eSBzZWxlY3RvclxuXHRzZWxlY3RvcjogXCJcIixcblxuXHQvLyBUaGUgZGVmYXVsdCBsZW5ndGggb2YgYSBqUXVlcnkgb2JqZWN0IGlzIDBcblx0bGVuZ3RoOiAwLFxuXG5cdHRvQXJyYXk6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiBzbGljZS5jYWxsKCB0aGlzICk7XG5cdH0sXG5cblx0Ly8gR2V0IHRoZSBOdGggZWxlbWVudCBpbiB0aGUgbWF0Y2hlZCBlbGVtZW50IHNldCBPUlxuXHQvLyBHZXQgdGhlIHdob2xlIG1hdGNoZWQgZWxlbWVudCBzZXQgYXMgYSBjbGVhbiBhcnJheVxuXHRnZXQ6IGZ1bmN0aW9uKCBudW0gKSB7XG5cdFx0cmV0dXJuIG51bSAhPSBudWxsID9cblxuXHRcdFx0Ly8gUmV0dXJuIGp1c3QgdGhlIG9uZSBlbGVtZW50IGZyb20gdGhlIHNldFxuXHRcdFx0KCBudW0gPCAwID8gdGhpc1sgbnVtICsgdGhpcy5sZW5ndGggXSA6IHRoaXNbIG51bSBdICkgOlxuXG5cdFx0XHQvLyBSZXR1cm4gYWxsIHRoZSBlbGVtZW50cyBpbiBhIGNsZWFuIGFycmF5XG5cdFx0XHRzbGljZS5jYWxsKCB0aGlzICk7XG5cdH0sXG5cblx0Ly8gVGFrZSBhbiBhcnJheSBvZiBlbGVtZW50cyBhbmQgcHVzaCBpdCBvbnRvIHRoZSBzdGFja1xuXHQvLyAocmV0dXJuaW5nIHRoZSBuZXcgbWF0Y2hlZCBlbGVtZW50IHNldClcblx0cHVzaFN0YWNrOiBmdW5jdGlvbiggZWxlbXMgKSB7XG5cblx0XHQvLyBCdWlsZCBhIG5ldyBqUXVlcnkgbWF0Y2hlZCBlbGVtZW50IHNldFxuXHRcdHZhciByZXQgPSBqUXVlcnkubWVyZ2UoIHRoaXMuY29uc3RydWN0b3IoKSwgZWxlbXMgKTtcblxuXHRcdC8vIEFkZCB0aGUgb2xkIG9iamVjdCBvbnRvIHRoZSBzdGFjayAoYXMgYSByZWZlcmVuY2UpXG5cdFx0cmV0LnByZXZPYmplY3QgPSB0aGlzO1xuXHRcdHJldC5jb250ZXh0ID0gdGhpcy5jb250ZXh0O1xuXG5cdFx0Ly8gUmV0dXJuIHRoZSBuZXdseS1mb3JtZWQgZWxlbWVudCBzZXRcblx0XHRyZXR1cm4gcmV0O1xuXHR9LFxuXG5cdC8vIEV4ZWN1dGUgYSBjYWxsYmFjayBmb3IgZXZlcnkgZWxlbWVudCBpbiB0aGUgbWF0Y2hlZCBzZXQuXG5cdGVhY2g6IGZ1bmN0aW9uKCBjYWxsYmFjayApIHtcblx0XHRyZXR1cm4galF1ZXJ5LmVhY2goIHRoaXMsIGNhbGxiYWNrICk7XG5cdH0sXG5cblx0bWFwOiBmdW5jdGlvbiggY2FsbGJhY2sgKSB7XG5cdFx0cmV0dXJuIHRoaXMucHVzaFN0YWNrKCBqUXVlcnkubWFwKCB0aGlzLCBmdW5jdGlvbiggZWxlbSwgaSApIHtcblx0XHRcdHJldHVybiBjYWxsYmFjay5jYWxsKCBlbGVtLCBpLCBlbGVtICk7XG5cdFx0fSApICk7XG5cdH0sXG5cblx0c2xpY2U6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLnB1c2hTdGFjayggc2xpY2UuYXBwbHkoIHRoaXMsIGFyZ3VtZW50cyApICk7XG5cdH0sXG5cblx0Zmlyc3Q6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLmVxKCAwICk7XG5cdH0sXG5cblx0bGFzdDogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIHRoaXMuZXEoIC0xICk7XG5cdH0sXG5cblx0ZXE6IGZ1bmN0aW9uKCBpICkge1xuXHRcdHZhciBsZW4gPSB0aGlzLmxlbmd0aCxcblx0XHRcdGogPSAraSArICggaSA8IDAgPyBsZW4gOiAwICk7XG5cdFx0cmV0dXJuIHRoaXMucHVzaFN0YWNrKCBqID49IDAgJiYgaiA8IGxlbiA/IFsgdGhpc1sgaiBdIF0gOiBbXSApO1xuXHR9LFxuXG5cdGVuZDogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIHRoaXMucHJldk9iamVjdCB8fCB0aGlzLmNvbnN0cnVjdG9yKCk7XG5cdH0sXG5cblx0Ly8gRm9yIGludGVybmFsIHVzZSBvbmx5LlxuXHQvLyBCZWhhdmVzIGxpa2UgYW4gQXJyYXkncyBtZXRob2QsIG5vdCBsaWtlIGEgalF1ZXJ5IG1ldGhvZC5cblx0cHVzaDogcHVzaCxcblx0c29ydDogYXJyLnNvcnQsXG5cdHNwbGljZTogYXJyLnNwbGljZVxufTtcblxualF1ZXJ5LmV4dGVuZCA9IGpRdWVyeS5mbi5leHRlbmQgPSBmdW5jdGlvbigpIHtcblx0dmFyIG9wdGlvbnMsIG5hbWUsIHNyYywgY29weSwgY29weUlzQXJyYXksIGNsb25lLFxuXHRcdHRhcmdldCA9IGFyZ3VtZW50c1sgMCBdIHx8IHt9LFxuXHRcdGkgPSAxLFxuXHRcdGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGgsXG5cdFx0ZGVlcCA9IGZhbHNlO1xuXG5cdC8vIEhhbmRsZSBhIGRlZXAgY29weSBzaXR1YXRpb25cblx0aWYgKCB0eXBlb2YgdGFyZ2V0ID09PSBcImJvb2xlYW5cIiApIHtcblx0XHRkZWVwID0gdGFyZ2V0O1xuXG5cdFx0Ly8gU2tpcCB0aGUgYm9vbGVhbiBhbmQgdGhlIHRhcmdldFxuXHRcdHRhcmdldCA9IGFyZ3VtZW50c1sgaSBdIHx8IHt9O1xuXHRcdGkrKztcblx0fVxuXG5cdC8vIEhhbmRsZSBjYXNlIHdoZW4gdGFyZ2V0IGlzIGEgc3RyaW5nIG9yIHNvbWV0aGluZyAocG9zc2libGUgaW4gZGVlcCBjb3B5KVxuXHRpZiAoIHR5cGVvZiB0YXJnZXQgIT09IFwib2JqZWN0XCIgJiYgIWpRdWVyeS5pc0Z1bmN0aW9uKCB0YXJnZXQgKSApIHtcblx0XHR0YXJnZXQgPSB7fTtcblx0fVxuXG5cdC8vIEV4dGVuZCBqUXVlcnkgaXRzZWxmIGlmIG9ubHkgb25lIGFyZ3VtZW50IGlzIHBhc3NlZFxuXHRpZiAoIGkgPT09IGxlbmd0aCApIHtcblx0XHR0YXJnZXQgPSB0aGlzO1xuXHRcdGktLTtcblx0fVxuXG5cdGZvciAoIDsgaSA8IGxlbmd0aDsgaSsrICkge1xuXG5cdFx0Ly8gT25seSBkZWFsIHdpdGggbm9uLW51bGwvdW5kZWZpbmVkIHZhbHVlc1xuXHRcdGlmICggKCBvcHRpb25zID0gYXJndW1lbnRzWyBpIF0gKSAhPSBudWxsICkge1xuXG5cdFx0XHQvLyBFeHRlbmQgdGhlIGJhc2Ugb2JqZWN0XG5cdFx0XHRmb3IgKCBuYW1lIGluIG9wdGlvbnMgKSB7XG5cdFx0XHRcdHNyYyA9IHRhcmdldFsgbmFtZSBdO1xuXHRcdFx0XHRjb3B5ID0gb3B0aW9uc1sgbmFtZSBdO1xuXG5cdFx0XHRcdC8vIFByZXZlbnQgbmV2ZXItZW5kaW5nIGxvb3Bcblx0XHRcdFx0aWYgKCB0YXJnZXQgPT09IGNvcHkgKSB7XG5cdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBSZWN1cnNlIGlmIHdlJ3JlIG1lcmdpbmcgcGxhaW4gb2JqZWN0cyBvciBhcnJheXNcblx0XHRcdFx0aWYgKCBkZWVwICYmIGNvcHkgJiYgKCBqUXVlcnkuaXNQbGFpbk9iamVjdCggY29weSApIHx8XG5cdFx0XHRcdFx0KCBjb3B5SXNBcnJheSA9IGpRdWVyeS5pc0FycmF5KCBjb3B5ICkgKSApICkge1xuXG5cdFx0XHRcdFx0aWYgKCBjb3B5SXNBcnJheSApIHtcblx0XHRcdFx0XHRcdGNvcHlJc0FycmF5ID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRjbG9uZSA9IHNyYyAmJiBqUXVlcnkuaXNBcnJheSggc3JjICkgPyBzcmMgOiBbXTtcblxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRjbG9uZSA9IHNyYyAmJiBqUXVlcnkuaXNQbGFpbk9iamVjdCggc3JjICkgPyBzcmMgOiB7fTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBOZXZlciBtb3ZlIG9yaWdpbmFsIG9iamVjdHMsIGNsb25lIHRoZW1cblx0XHRcdFx0XHR0YXJnZXRbIG5hbWUgXSA9IGpRdWVyeS5leHRlbmQoIGRlZXAsIGNsb25lLCBjb3B5ICk7XG5cblx0XHRcdFx0Ly8gRG9uJ3QgYnJpbmcgaW4gdW5kZWZpbmVkIHZhbHVlc1xuXHRcdFx0XHR9IGVsc2UgaWYgKCBjb3B5ICE9PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRcdFx0dGFyZ2V0WyBuYW1lIF0gPSBjb3B5O1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Ly8gUmV0dXJuIHRoZSBtb2RpZmllZCBvYmplY3Rcblx0cmV0dXJuIHRhcmdldDtcbn07XG5cbmpRdWVyeS5leHRlbmQoIHtcblxuXHQvLyBVbmlxdWUgZm9yIGVhY2ggY29weSBvZiBqUXVlcnkgb24gdGhlIHBhZ2Vcblx0ZXhwYW5kbzogXCJqUXVlcnlcIiArICggdmVyc2lvbiArIE1hdGgucmFuZG9tKCkgKS5yZXBsYWNlKCAvXFxEL2csIFwiXCIgKSxcblxuXHQvLyBBc3N1bWUgalF1ZXJ5IGlzIHJlYWR5IHdpdGhvdXQgdGhlIHJlYWR5IG1vZHVsZVxuXHRpc1JlYWR5OiB0cnVlLFxuXG5cdGVycm9yOiBmdW5jdGlvbiggbXNnICkge1xuXHRcdHRocm93IG5ldyBFcnJvciggbXNnICk7XG5cdH0sXG5cblx0bm9vcDogZnVuY3Rpb24oKSB7fSxcblxuXHRpc0Z1bmN0aW9uOiBmdW5jdGlvbiggb2JqICkge1xuXHRcdHJldHVybiBqUXVlcnkudHlwZSggb2JqICkgPT09IFwiZnVuY3Rpb25cIjtcblx0fSxcblxuXHRpc0FycmF5OiBBcnJheS5pc0FycmF5LFxuXG5cdGlzV2luZG93OiBmdW5jdGlvbiggb2JqICkge1xuXHRcdHJldHVybiBvYmogIT0gbnVsbCAmJiBvYmogPT09IG9iai53aW5kb3c7XG5cdH0sXG5cblx0aXNOdW1lcmljOiBmdW5jdGlvbiggb2JqICkge1xuXG5cdFx0Ly8gcGFyc2VGbG9hdCBOYU5zIG51bWVyaWMtY2FzdCBmYWxzZSBwb3NpdGl2ZXMgKG51bGx8dHJ1ZXxmYWxzZXxcIlwiKVxuXHRcdC8vIC4uLmJ1dCBtaXNpbnRlcnByZXRzIGxlYWRpbmctbnVtYmVyIHN0cmluZ3MsIHBhcnRpY3VsYXJseSBoZXggbGl0ZXJhbHMgKFwiMHguLi5cIilcblx0XHQvLyBzdWJ0cmFjdGlvbiBmb3JjZXMgaW5maW5pdGllcyB0byBOYU5cblx0XHQvLyBhZGRpbmcgMSBjb3JyZWN0cyBsb3NzIG9mIHByZWNpc2lvbiBmcm9tIHBhcnNlRmxvYXQgKCMxNTEwMClcblx0XHR2YXIgcmVhbFN0cmluZ09iaiA9IG9iaiAmJiBvYmoudG9TdHJpbmcoKTtcblx0XHRyZXR1cm4gIWpRdWVyeS5pc0FycmF5KCBvYmogKSAmJiAoIHJlYWxTdHJpbmdPYmogLSBwYXJzZUZsb2F0KCByZWFsU3RyaW5nT2JqICkgKyAxICkgPj0gMDtcblx0fSxcblxuXHRpc1BsYWluT2JqZWN0OiBmdW5jdGlvbiggb2JqICkge1xuXHRcdHZhciBrZXk7XG5cblx0XHQvLyBOb3QgcGxhaW4gb2JqZWN0czpcblx0XHQvLyAtIEFueSBvYmplY3Qgb3IgdmFsdWUgd2hvc2UgaW50ZXJuYWwgW1tDbGFzc11dIHByb3BlcnR5IGlzIG5vdCBcIltvYmplY3QgT2JqZWN0XVwiXG5cdFx0Ly8gLSBET00gbm9kZXNcblx0XHQvLyAtIHdpbmRvd1xuXHRcdGlmICggalF1ZXJ5LnR5cGUoIG9iaiApICE9PSBcIm9iamVjdFwiIHx8IG9iai5ub2RlVHlwZSB8fCBqUXVlcnkuaXNXaW5kb3coIG9iaiApICkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIE5vdCBvd24gY29uc3RydWN0b3IgcHJvcGVydHkgbXVzdCBiZSBPYmplY3Rcblx0XHRpZiAoIG9iai5jb25zdHJ1Y3RvciAmJlxuXHRcdFx0XHQhaGFzT3duLmNhbGwoIG9iaiwgXCJjb25zdHJ1Y3RvclwiICkgJiZcblx0XHRcdFx0IWhhc093bi5jYWxsKCBvYmouY29uc3RydWN0b3IucHJvdG90eXBlIHx8IHt9LCBcImlzUHJvdG90eXBlT2ZcIiApICkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIE93biBwcm9wZXJ0aWVzIGFyZSBlbnVtZXJhdGVkIGZpcnN0bHksIHNvIHRvIHNwZWVkIHVwLFxuXHRcdC8vIGlmIGxhc3Qgb25lIGlzIG93biwgdGhlbiBhbGwgcHJvcGVydGllcyBhcmUgb3duXG5cdFx0Zm9yICgga2V5IGluIG9iaiApIHt9XG5cblx0XHRyZXR1cm4ga2V5ID09PSB1bmRlZmluZWQgfHwgaGFzT3duLmNhbGwoIG9iaiwga2V5ICk7XG5cdH0sXG5cblx0aXNFbXB0eU9iamVjdDogZnVuY3Rpb24oIG9iaiApIHtcblx0XHR2YXIgbmFtZTtcblx0XHRmb3IgKCBuYW1lIGluIG9iaiApIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdFx0cmV0dXJuIHRydWU7XG5cdH0sXG5cblx0dHlwZTogZnVuY3Rpb24oIG9iaiApIHtcblx0XHRpZiAoIG9iaiA9PSBudWxsICkge1xuXHRcdFx0cmV0dXJuIG9iaiArIFwiXCI7XG5cdFx0fVxuXG5cdFx0Ly8gU3VwcG9ydDogQW5kcm9pZDw0LjAsIGlPUzw2IChmdW5jdGlvbmlzaCBSZWdFeHApXG5cdFx0cmV0dXJuIHR5cGVvZiBvYmogPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIG9iaiA9PT0gXCJmdW5jdGlvblwiID9cblx0XHRcdGNsYXNzMnR5cGVbIHRvU3RyaW5nLmNhbGwoIG9iaiApIF0gfHwgXCJvYmplY3RcIiA6XG5cdFx0XHR0eXBlb2Ygb2JqO1xuXHR9LFxuXG5cdC8vIEV2YWx1YXRlcyBhIHNjcmlwdCBpbiBhIGdsb2JhbCBjb250ZXh0XG5cdGdsb2JhbEV2YWw6IGZ1bmN0aW9uKCBjb2RlICkge1xuXHRcdHZhciBzY3JpcHQsXG5cdFx0XHRpbmRpcmVjdCA9IGV2YWw7XG5cblx0XHRjb2RlID0galF1ZXJ5LnRyaW0oIGNvZGUgKTtcblxuXHRcdGlmICggY29kZSApIHtcblxuXHRcdFx0Ly8gSWYgdGhlIGNvZGUgaW5jbHVkZXMgYSB2YWxpZCwgcHJvbG9ndWUgcG9zaXRpb25cblx0XHRcdC8vIHN0cmljdCBtb2RlIHByYWdtYSwgZXhlY3V0ZSBjb2RlIGJ5IGluamVjdGluZyBhXG5cdFx0XHQvLyBzY3JpcHQgdGFnIGludG8gdGhlIGRvY3VtZW50LlxuXHRcdFx0aWYgKCBjb2RlLmluZGV4T2YoIFwidXNlIHN0cmljdFwiICkgPT09IDEgKSB7XG5cdFx0XHRcdHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwic2NyaXB0XCIgKTtcblx0XHRcdFx0c2NyaXB0LnRleHQgPSBjb2RlO1xuXHRcdFx0XHRkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKCBzY3JpcHQgKS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKCBzY3JpcHQgKTtcblx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0Ly8gT3RoZXJ3aXNlLCBhdm9pZCB0aGUgRE9NIG5vZGUgY3JlYXRpb24sIGluc2VydGlvblxuXHRcdFx0XHQvLyBhbmQgcmVtb3ZhbCBieSB1c2luZyBhbiBpbmRpcmVjdCBnbG9iYWwgZXZhbFxuXG5cdFx0XHRcdGluZGlyZWN0KCBjb2RlICk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXG5cdC8vIENvbnZlcnQgZGFzaGVkIHRvIGNhbWVsQ2FzZTsgdXNlZCBieSB0aGUgY3NzIGFuZCBkYXRhIG1vZHVsZXNcblx0Ly8gU3VwcG9ydDogSUU5LTExK1xuXHQvLyBNaWNyb3NvZnQgZm9yZ290IHRvIGh1bXAgdGhlaXIgdmVuZG9yIHByZWZpeCAoIzk1NzIpXG5cdGNhbWVsQ2FzZTogZnVuY3Rpb24oIHN0cmluZyApIHtcblx0XHRyZXR1cm4gc3RyaW5nLnJlcGxhY2UoIHJtc1ByZWZpeCwgXCJtcy1cIiApLnJlcGxhY2UoIHJkYXNoQWxwaGEsIGZjYW1lbENhc2UgKTtcblx0fSxcblxuXHRub2RlTmFtZTogZnVuY3Rpb24oIGVsZW0sIG5hbWUgKSB7XG5cdFx0cmV0dXJuIGVsZW0ubm9kZU5hbWUgJiYgZWxlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSBuYW1lLnRvTG93ZXJDYXNlKCk7XG5cdH0sXG5cblx0ZWFjaDogZnVuY3Rpb24oIG9iaiwgY2FsbGJhY2sgKSB7XG5cdFx0dmFyIGxlbmd0aCwgaSA9IDA7XG5cblx0XHRpZiAoIGlzQXJyYXlMaWtlKCBvYmogKSApIHtcblx0XHRcdGxlbmd0aCA9IG9iai5sZW5ndGg7XG5cdFx0XHRmb3IgKCA7IGkgPCBsZW5ndGg7IGkrKyApIHtcblx0XHRcdFx0aWYgKCBjYWxsYmFjay5jYWxsKCBvYmpbIGkgXSwgaSwgb2JqWyBpIF0gKSA9PT0gZmFsc2UgKSB7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0Zm9yICggaSBpbiBvYmogKSB7XG5cdFx0XHRcdGlmICggY2FsbGJhY2suY2FsbCggb2JqWyBpIF0sIGksIG9ialsgaSBdICkgPT09IGZhbHNlICkge1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG9iajtcblx0fSxcblxuXHQvLyBTdXBwb3J0OiBBbmRyb2lkPDQuMVxuXHR0cmltOiBmdW5jdGlvbiggdGV4dCApIHtcblx0XHRyZXR1cm4gdGV4dCA9PSBudWxsID9cblx0XHRcdFwiXCIgOlxuXHRcdFx0KCB0ZXh0ICsgXCJcIiApLnJlcGxhY2UoIHJ0cmltLCBcIlwiICk7XG5cdH0sXG5cblx0Ly8gcmVzdWx0cyBpcyBmb3IgaW50ZXJuYWwgdXNhZ2Ugb25seVxuXHRtYWtlQXJyYXk6IGZ1bmN0aW9uKCBhcnIsIHJlc3VsdHMgKSB7XG5cdFx0dmFyIHJldCA9IHJlc3VsdHMgfHwgW107XG5cblx0XHRpZiAoIGFyciAhPSBudWxsICkge1xuXHRcdFx0aWYgKCBpc0FycmF5TGlrZSggT2JqZWN0KCBhcnIgKSApICkge1xuXHRcdFx0XHRqUXVlcnkubWVyZ2UoIHJldCxcblx0XHRcdFx0XHR0eXBlb2YgYXJyID09PSBcInN0cmluZ1wiID9cblx0XHRcdFx0XHRbIGFyciBdIDogYXJyXG5cdFx0XHRcdCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRwdXNoLmNhbGwoIHJldCwgYXJyICk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJldDtcblx0fSxcblxuXHRpbkFycmF5OiBmdW5jdGlvbiggZWxlbSwgYXJyLCBpICkge1xuXHRcdHJldHVybiBhcnIgPT0gbnVsbCA/IC0xIDogaW5kZXhPZi5jYWxsKCBhcnIsIGVsZW0sIGkgKTtcblx0fSxcblxuXHRtZXJnZTogZnVuY3Rpb24oIGZpcnN0LCBzZWNvbmQgKSB7XG5cdFx0dmFyIGxlbiA9ICtzZWNvbmQubGVuZ3RoLFxuXHRcdFx0aiA9IDAsXG5cdFx0XHRpID0gZmlyc3QubGVuZ3RoO1xuXG5cdFx0Zm9yICggOyBqIDwgbGVuOyBqKysgKSB7XG5cdFx0XHRmaXJzdFsgaSsrIF0gPSBzZWNvbmRbIGogXTtcblx0XHR9XG5cblx0XHRmaXJzdC5sZW5ndGggPSBpO1xuXG5cdFx0cmV0dXJuIGZpcnN0O1xuXHR9LFxuXG5cdGdyZXA6IGZ1bmN0aW9uKCBlbGVtcywgY2FsbGJhY2ssIGludmVydCApIHtcblx0XHR2YXIgY2FsbGJhY2tJbnZlcnNlLFxuXHRcdFx0bWF0Y2hlcyA9IFtdLFxuXHRcdFx0aSA9IDAsXG5cdFx0XHRsZW5ndGggPSBlbGVtcy5sZW5ndGgsXG5cdFx0XHRjYWxsYmFja0V4cGVjdCA9ICFpbnZlcnQ7XG5cblx0XHQvLyBHbyB0aHJvdWdoIHRoZSBhcnJheSwgb25seSBzYXZpbmcgdGhlIGl0ZW1zXG5cdFx0Ly8gdGhhdCBwYXNzIHRoZSB2YWxpZGF0b3IgZnVuY3Rpb25cblx0XHRmb3IgKCA7IGkgPCBsZW5ndGg7IGkrKyApIHtcblx0XHRcdGNhbGxiYWNrSW52ZXJzZSA9ICFjYWxsYmFjayggZWxlbXNbIGkgXSwgaSApO1xuXHRcdFx0aWYgKCBjYWxsYmFja0ludmVyc2UgIT09IGNhbGxiYWNrRXhwZWN0ICkge1xuXHRcdFx0XHRtYXRjaGVzLnB1c2goIGVsZW1zWyBpIF0gKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gbWF0Y2hlcztcblx0fSxcblxuXHQvLyBhcmcgaXMgZm9yIGludGVybmFsIHVzYWdlIG9ubHlcblx0bWFwOiBmdW5jdGlvbiggZWxlbXMsIGNhbGxiYWNrLCBhcmcgKSB7XG5cdFx0dmFyIGxlbmd0aCwgdmFsdWUsXG5cdFx0XHRpID0gMCxcblx0XHRcdHJldCA9IFtdO1xuXG5cdFx0Ly8gR28gdGhyb3VnaCB0aGUgYXJyYXksIHRyYW5zbGF0aW5nIGVhY2ggb2YgdGhlIGl0ZW1zIHRvIHRoZWlyIG5ldyB2YWx1ZXNcblx0XHRpZiAoIGlzQXJyYXlMaWtlKCBlbGVtcyApICkge1xuXHRcdFx0bGVuZ3RoID0gZWxlbXMubGVuZ3RoO1xuXHRcdFx0Zm9yICggOyBpIDwgbGVuZ3RoOyBpKysgKSB7XG5cdFx0XHRcdHZhbHVlID0gY2FsbGJhY2soIGVsZW1zWyBpIF0sIGksIGFyZyApO1xuXG5cdFx0XHRcdGlmICggdmFsdWUgIT0gbnVsbCApIHtcblx0XHRcdFx0XHRyZXQucHVzaCggdmFsdWUgKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0Ly8gR28gdGhyb3VnaCBldmVyeSBrZXkgb24gdGhlIG9iamVjdCxcblx0XHR9IGVsc2Uge1xuXHRcdFx0Zm9yICggaSBpbiBlbGVtcyApIHtcblx0XHRcdFx0dmFsdWUgPSBjYWxsYmFjayggZWxlbXNbIGkgXSwgaSwgYXJnICk7XG5cblx0XHRcdFx0aWYgKCB2YWx1ZSAhPSBudWxsICkge1xuXHRcdFx0XHRcdHJldC5wdXNoKCB2YWx1ZSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gRmxhdHRlbiBhbnkgbmVzdGVkIGFycmF5c1xuXHRcdHJldHVybiBjb25jYXQuYXBwbHkoIFtdLCByZXQgKTtcblx0fSxcblxuXHQvLyBBIGdsb2JhbCBHVUlEIGNvdW50ZXIgZm9yIG9iamVjdHNcblx0Z3VpZDogMSxcblxuXHQvLyBCaW5kIGEgZnVuY3Rpb24gdG8gYSBjb250ZXh0LCBvcHRpb25hbGx5IHBhcnRpYWxseSBhcHBseWluZyBhbnlcblx0Ly8gYXJndW1lbnRzLlxuXHRwcm94eTogZnVuY3Rpb24oIGZuLCBjb250ZXh0ICkge1xuXHRcdHZhciB0bXAsIGFyZ3MsIHByb3h5O1xuXG5cdFx0aWYgKCB0eXBlb2YgY29udGV4dCA9PT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdHRtcCA9IGZuWyBjb250ZXh0IF07XG5cdFx0XHRjb250ZXh0ID0gZm47XG5cdFx0XHRmbiA9IHRtcDtcblx0XHR9XG5cblx0XHQvLyBRdWljayBjaGVjayB0byBkZXRlcm1pbmUgaWYgdGFyZ2V0IGlzIGNhbGxhYmxlLCBpbiB0aGUgc3BlY1xuXHRcdC8vIHRoaXMgdGhyb3dzIGEgVHlwZUVycm9yLCBidXQgd2Ugd2lsbCBqdXN0IHJldHVybiB1bmRlZmluZWQuXG5cdFx0aWYgKCAhalF1ZXJ5LmlzRnVuY3Rpb24oIGZuICkgKSB7XG5cdFx0XHRyZXR1cm4gdW5kZWZpbmVkO1xuXHRcdH1cblxuXHRcdC8vIFNpbXVsYXRlZCBiaW5kXG5cdFx0YXJncyA9IHNsaWNlLmNhbGwoIGFyZ3VtZW50cywgMiApO1xuXHRcdHByb3h5ID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gZm4uYXBwbHkoIGNvbnRleHQgfHwgdGhpcywgYXJncy5jb25jYXQoIHNsaWNlLmNhbGwoIGFyZ3VtZW50cyApICkgKTtcblx0XHR9O1xuXG5cdFx0Ly8gU2V0IHRoZSBndWlkIG9mIHVuaXF1ZSBoYW5kbGVyIHRvIHRoZSBzYW1lIG9mIG9yaWdpbmFsIGhhbmRsZXIsIHNvIGl0IGNhbiBiZSByZW1vdmVkXG5cdFx0cHJveHkuZ3VpZCA9IGZuLmd1aWQgPSBmbi5ndWlkIHx8IGpRdWVyeS5ndWlkKys7XG5cblx0XHRyZXR1cm4gcHJveHk7XG5cdH0sXG5cblx0bm93OiBEYXRlLm5vdyxcblxuXHQvLyBqUXVlcnkuc3VwcG9ydCBpcyBub3QgdXNlZCBpbiBDb3JlIGJ1dCBvdGhlciBwcm9qZWN0cyBhdHRhY2ggdGhlaXJcblx0Ly8gcHJvcGVydGllcyB0byBpdCBzbyBpdCBuZWVkcyB0byBleGlzdC5cblx0c3VwcG9ydDogc3VwcG9ydFxufSApO1xuXG4vLyBKU0hpbnQgd291bGQgZXJyb3Igb24gdGhpcyBjb2RlIGR1ZSB0byB0aGUgU3ltYm9sIG5vdCBiZWluZyBkZWZpbmVkIGluIEVTNS5cbi8vIERlZmluaW5nIHRoaXMgZ2xvYmFsIGluIC5qc2hpbnRyYyB3b3VsZCBjcmVhdGUgYSBkYW5nZXIgb2YgdXNpbmcgdGhlIGdsb2JhbFxuLy8gdW5ndWFyZGVkIGluIGFub3RoZXIgcGxhY2UsIGl0IHNlZW1zIHNhZmVyIHRvIGp1c3QgZGlzYWJsZSBKU0hpbnQgZm9yIHRoZXNlXG4vLyB0aHJlZSBsaW5lcy5cbi8qIGpzaGludCBpZ25vcmU6IHN0YXJ0ICovXG5pZiAoIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiApIHtcblx0alF1ZXJ5LmZuWyBTeW1ib2wuaXRlcmF0b3IgXSA9IGFyclsgU3ltYm9sLml0ZXJhdG9yIF07XG59XG4vKiBqc2hpbnQgaWdub3JlOiBlbmQgKi9cblxuLy8gUG9wdWxhdGUgdGhlIGNsYXNzMnR5cGUgbWFwXG5qUXVlcnkuZWFjaCggXCJCb29sZWFuIE51bWJlciBTdHJpbmcgRnVuY3Rpb24gQXJyYXkgRGF0ZSBSZWdFeHAgT2JqZWN0IEVycm9yIFN5bWJvbFwiLnNwbGl0KCBcIiBcIiApLFxuZnVuY3Rpb24oIGksIG5hbWUgKSB7XG5cdGNsYXNzMnR5cGVbIFwiW29iamVjdCBcIiArIG5hbWUgKyBcIl1cIiBdID0gbmFtZS50b0xvd2VyQ2FzZSgpO1xufSApO1xuXG5mdW5jdGlvbiBpc0FycmF5TGlrZSggb2JqICkge1xuXG5cdC8vIFN1cHBvcnQ6IGlPUyA4LjIgKG5vdCByZXByb2R1Y2libGUgaW4gc2ltdWxhdG9yKVxuXHQvLyBgaW5gIGNoZWNrIHVzZWQgdG8gcHJldmVudCBKSVQgZXJyb3IgKGdoLTIxNDUpXG5cdC8vIGhhc093biBpc24ndCB1c2VkIGhlcmUgZHVlIHRvIGZhbHNlIG5lZ2F0aXZlc1xuXHQvLyByZWdhcmRpbmcgTm9kZWxpc3QgbGVuZ3RoIGluIElFXG5cdHZhciBsZW5ndGggPSAhIW9iaiAmJiBcImxlbmd0aFwiIGluIG9iaiAmJiBvYmoubGVuZ3RoLFxuXHRcdHR5cGUgPSBqUXVlcnkudHlwZSggb2JqICk7XG5cblx0aWYgKCB0eXBlID09PSBcImZ1bmN0aW9uXCIgfHwgalF1ZXJ5LmlzV2luZG93KCBvYmogKSApIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHRyZXR1cm4gdHlwZSA9PT0gXCJhcnJheVwiIHx8IGxlbmd0aCA9PT0gMCB8fFxuXHRcdHR5cGVvZiBsZW5ndGggPT09IFwibnVtYmVyXCIgJiYgbGVuZ3RoID4gMCAmJiAoIGxlbmd0aCAtIDEgKSBpbiBvYmo7XG59XG52YXIgU2l6emxlID1cbi8qIVxuICogU2l6emxlIENTUyBTZWxlY3RvciBFbmdpbmUgdjIuMi4xXG4gKiBodHRwOi8vc2l6emxlanMuY29tL1xuICpcbiAqIENvcHlyaWdodCBqUXVlcnkgRm91bmRhdGlvbiBhbmQgb3RoZXIgY29udHJpYnV0b3JzXG4gKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqIGh0dHA6Ly9qcXVlcnkub3JnL2xpY2Vuc2VcbiAqXG4gKiBEYXRlOiAyMDE1LTEwLTE3XG4gKi9cbihmdW5jdGlvbiggd2luZG93ICkge1xuXG52YXIgaSxcblx0c3VwcG9ydCxcblx0RXhwcixcblx0Z2V0VGV4dCxcblx0aXNYTUwsXG5cdHRva2VuaXplLFxuXHRjb21waWxlLFxuXHRzZWxlY3QsXG5cdG91dGVybW9zdENvbnRleHQsXG5cdHNvcnRJbnB1dCxcblx0aGFzRHVwbGljYXRlLFxuXG5cdC8vIExvY2FsIGRvY3VtZW50IHZhcnNcblx0c2V0RG9jdW1lbnQsXG5cdGRvY3VtZW50LFxuXHRkb2NFbGVtLFxuXHRkb2N1bWVudElzSFRNTCxcblx0cmJ1Z2d5UVNBLFxuXHRyYnVnZ3lNYXRjaGVzLFxuXHRtYXRjaGVzLFxuXHRjb250YWlucyxcblxuXHQvLyBJbnN0YW5jZS1zcGVjaWZpYyBkYXRhXG5cdGV4cGFuZG8gPSBcInNpenpsZVwiICsgMSAqIG5ldyBEYXRlKCksXG5cdHByZWZlcnJlZERvYyA9IHdpbmRvdy5kb2N1bWVudCxcblx0ZGlycnVucyA9IDAsXG5cdGRvbmUgPSAwLFxuXHRjbGFzc0NhY2hlID0gY3JlYXRlQ2FjaGUoKSxcblx0dG9rZW5DYWNoZSA9IGNyZWF0ZUNhY2hlKCksXG5cdGNvbXBpbGVyQ2FjaGUgPSBjcmVhdGVDYWNoZSgpLFxuXHRzb3J0T3JkZXIgPSBmdW5jdGlvbiggYSwgYiApIHtcblx0XHRpZiAoIGEgPT09IGIgKSB7XG5cdFx0XHRoYXNEdXBsaWNhdGUgPSB0cnVlO1xuXHRcdH1cblx0XHRyZXR1cm4gMDtcblx0fSxcblxuXHQvLyBHZW5lcmFsLXB1cnBvc2UgY29uc3RhbnRzXG5cdE1BWF9ORUdBVElWRSA9IDEgPDwgMzEsXG5cblx0Ly8gSW5zdGFuY2UgbWV0aG9kc1xuXHRoYXNPd24gPSAoe30pLmhhc093blByb3BlcnR5LFxuXHRhcnIgPSBbXSxcblx0cG9wID0gYXJyLnBvcCxcblx0cHVzaF9uYXRpdmUgPSBhcnIucHVzaCxcblx0cHVzaCA9IGFyci5wdXNoLFxuXHRzbGljZSA9IGFyci5zbGljZSxcblx0Ly8gVXNlIGEgc3RyaXBwZWQtZG93biBpbmRleE9mIGFzIGl0J3MgZmFzdGVyIHRoYW4gbmF0aXZlXG5cdC8vIGh0dHA6Ly9qc3BlcmYuY29tL3Rob3ItaW5kZXhvZi12cy1mb3IvNVxuXHRpbmRleE9mID0gZnVuY3Rpb24oIGxpc3QsIGVsZW0gKSB7XG5cdFx0dmFyIGkgPSAwLFxuXHRcdFx0bGVuID0gbGlzdC5sZW5ndGg7XG5cdFx0Zm9yICggOyBpIDwgbGVuOyBpKysgKSB7XG5cdFx0XHRpZiAoIGxpc3RbaV0gPT09IGVsZW0gKSB7XG5cdFx0XHRcdHJldHVybiBpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gLTE7XG5cdH0sXG5cblx0Ym9vbGVhbnMgPSBcImNoZWNrZWR8c2VsZWN0ZWR8YXN5bmN8YXV0b2ZvY3VzfGF1dG9wbGF5fGNvbnRyb2xzfGRlZmVyfGRpc2FibGVkfGhpZGRlbnxpc21hcHxsb29wfG11bHRpcGxlfG9wZW58cmVhZG9ubHl8cmVxdWlyZWR8c2NvcGVkXCIsXG5cblx0Ly8gUmVndWxhciBleHByZXNzaW9uc1xuXG5cdC8vIGh0dHA6Ly93d3cudzMub3JnL1RSL2NzczMtc2VsZWN0b3JzLyN3aGl0ZXNwYWNlXG5cdHdoaXRlc3BhY2UgPSBcIltcXFxceDIwXFxcXHRcXFxcclxcXFxuXFxcXGZdXCIsXG5cblx0Ly8gaHR0cDovL3d3dy53My5vcmcvVFIvQ1NTMjEvc3luZGF0YS5odG1sI3ZhbHVlLWRlZi1pZGVudGlmaWVyXG5cdGlkZW50aWZpZXIgPSBcIig/OlxcXFxcXFxcLnxbXFxcXHctXXxbXlxcXFx4MDAtXFxcXHhhMF0pK1wiLFxuXG5cdC8vIEF0dHJpYnV0ZSBzZWxlY3RvcnM6IGh0dHA6Ly93d3cudzMub3JnL1RSL3NlbGVjdG9ycy8jYXR0cmlidXRlLXNlbGVjdG9yc1xuXHRhdHRyaWJ1dGVzID0gXCJcXFxcW1wiICsgd2hpdGVzcGFjZSArIFwiKihcIiArIGlkZW50aWZpZXIgKyBcIikoPzpcIiArIHdoaXRlc3BhY2UgK1xuXHRcdC8vIE9wZXJhdG9yIChjYXB0dXJlIDIpXG5cdFx0XCIqKFsqXiR8IX5dPz0pXCIgKyB3aGl0ZXNwYWNlICtcblx0XHQvLyBcIkF0dHJpYnV0ZSB2YWx1ZXMgbXVzdCBiZSBDU1MgaWRlbnRpZmllcnMgW2NhcHR1cmUgNV0gb3Igc3RyaW5ncyBbY2FwdHVyZSAzIG9yIGNhcHR1cmUgNF1cIlxuXHRcdFwiKig/OicoKD86XFxcXFxcXFwufFteXFxcXFxcXFwnXSkqKSd8XFxcIigoPzpcXFxcXFxcXC58W15cXFxcXFxcXFxcXCJdKSopXFxcInwoXCIgKyBpZGVudGlmaWVyICsgXCIpKXwpXCIgKyB3aGl0ZXNwYWNlICtcblx0XHRcIipcXFxcXVwiLFxuXG5cdHBzZXVkb3MgPSBcIjooXCIgKyBpZGVudGlmaWVyICsgXCIpKD86XFxcXCgoXCIgK1xuXHRcdC8vIFRvIHJlZHVjZSB0aGUgbnVtYmVyIG9mIHNlbGVjdG9ycyBuZWVkaW5nIHRva2VuaXplIGluIHRoZSBwcmVGaWx0ZXIsIHByZWZlciBhcmd1bWVudHM6XG5cdFx0Ly8gMS4gcXVvdGVkIChjYXB0dXJlIDM7IGNhcHR1cmUgNCBvciBjYXB0dXJlIDUpXG5cdFx0XCIoJygoPzpcXFxcXFxcXC58W15cXFxcXFxcXCddKSopJ3xcXFwiKCg/OlxcXFxcXFxcLnxbXlxcXFxcXFxcXFxcIl0pKilcXFwiKXxcIiArXG5cdFx0Ly8gMi4gc2ltcGxlIChjYXB0dXJlIDYpXG5cdFx0XCIoKD86XFxcXFxcXFwufFteXFxcXFxcXFwoKVtcXFxcXV18XCIgKyBhdHRyaWJ1dGVzICsgXCIpKil8XCIgK1xuXHRcdC8vIDMuIGFueXRoaW5nIGVsc2UgKGNhcHR1cmUgMilcblx0XHRcIi4qXCIgK1xuXHRcdFwiKVxcXFwpfClcIixcblxuXHQvLyBMZWFkaW5nIGFuZCBub24tZXNjYXBlZCB0cmFpbGluZyB3aGl0ZXNwYWNlLCBjYXB0dXJpbmcgc29tZSBub24td2hpdGVzcGFjZSBjaGFyYWN0ZXJzIHByZWNlZGluZyB0aGUgbGF0dGVyXG5cdHJ3aGl0ZXNwYWNlID0gbmV3IFJlZ0V4cCggd2hpdGVzcGFjZSArIFwiK1wiLCBcImdcIiApLFxuXHRydHJpbSA9IG5ldyBSZWdFeHAoIFwiXlwiICsgd2hpdGVzcGFjZSArIFwiK3woKD86XnxbXlxcXFxcXFxcXSkoPzpcXFxcXFxcXC4pKilcIiArIHdoaXRlc3BhY2UgKyBcIiskXCIsIFwiZ1wiICksXG5cblx0cmNvbW1hID0gbmV3IFJlZ0V4cCggXCJeXCIgKyB3aGl0ZXNwYWNlICsgXCIqLFwiICsgd2hpdGVzcGFjZSArIFwiKlwiICksXG5cdHJjb21iaW5hdG9ycyA9IG5ldyBSZWdFeHAoIFwiXlwiICsgd2hpdGVzcGFjZSArIFwiKihbPit+XXxcIiArIHdoaXRlc3BhY2UgKyBcIilcIiArIHdoaXRlc3BhY2UgKyBcIipcIiApLFxuXG5cdHJhdHRyaWJ1dGVRdW90ZXMgPSBuZXcgUmVnRXhwKCBcIj1cIiArIHdoaXRlc3BhY2UgKyBcIiooW15cXFxcXSdcXFwiXSo/KVwiICsgd2hpdGVzcGFjZSArIFwiKlxcXFxdXCIsIFwiZ1wiICksXG5cblx0cnBzZXVkbyA9IG5ldyBSZWdFeHAoIHBzZXVkb3MgKSxcblx0cmlkZW50aWZpZXIgPSBuZXcgUmVnRXhwKCBcIl5cIiArIGlkZW50aWZpZXIgKyBcIiRcIiApLFxuXG5cdG1hdGNoRXhwciA9IHtcblx0XHRcIklEXCI6IG5ldyBSZWdFeHAoIFwiXiMoXCIgKyBpZGVudGlmaWVyICsgXCIpXCIgKSxcblx0XHRcIkNMQVNTXCI6IG5ldyBSZWdFeHAoIFwiXlxcXFwuKFwiICsgaWRlbnRpZmllciArIFwiKVwiICksXG5cdFx0XCJUQUdcIjogbmV3IFJlZ0V4cCggXCJeKFwiICsgaWRlbnRpZmllciArIFwifFsqXSlcIiApLFxuXHRcdFwiQVRUUlwiOiBuZXcgUmVnRXhwKCBcIl5cIiArIGF0dHJpYnV0ZXMgKSxcblx0XHRcIlBTRVVET1wiOiBuZXcgUmVnRXhwKCBcIl5cIiArIHBzZXVkb3MgKSxcblx0XHRcIkNISUxEXCI6IG5ldyBSZWdFeHAoIFwiXjoob25seXxmaXJzdHxsYXN0fG50aHxudGgtbGFzdCktKGNoaWxkfG9mLXR5cGUpKD86XFxcXChcIiArIHdoaXRlc3BhY2UgK1xuXHRcdFx0XCIqKGV2ZW58b2RkfCgoWystXXwpKFxcXFxkKilufClcIiArIHdoaXRlc3BhY2UgKyBcIiooPzooWystXXwpXCIgKyB3aGl0ZXNwYWNlICtcblx0XHRcdFwiKihcXFxcZCspfCkpXCIgKyB3aGl0ZXNwYWNlICsgXCIqXFxcXCl8KVwiLCBcImlcIiApLFxuXHRcdFwiYm9vbFwiOiBuZXcgUmVnRXhwKCBcIl4oPzpcIiArIGJvb2xlYW5zICsgXCIpJFwiLCBcImlcIiApLFxuXHRcdC8vIEZvciB1c2UgaW4gbGlicmFyaWVzIGltcGxlbWVudGluZyAuaXMoKVxuXHRcdC8vIFdlIHVzZSB0aGlzIGZvciBQT1MgbWF0Y2hpbmcgaW4gYHNlbGVjdGBcblx0XHRcIm5lZWRzQ29udGV4dFwiOiBuZXcgUmVnRXhwKCBcIl5cIiArIHdoaXRlc3BhY2UgKyBcIipbPit+XXw6KGV2ZW58b2RkfGVxfGd0fGx0fG50aHxmaXJzdHxsYXN0KSg/OlxcXFwoXCIgK1xuXHRcdFx0d2hpdGVzcGFjZSArIFwiKigoPzotXFxcXGQpP1xcXFxkKilcIiArIHdoaXRlc3BhY2UgKyBcIipcXFxcKXwpKD89W14tXXwkKVwiLCBcImlcIiApXG5cdH0sXG5cblx0cmlucHV0cyA9IC9eKD86aW5wdXR8c2VsZWN0fHRleHRhcmVhfGJ1dHRvbikkL2ksXG5cdHJoZWFkZXIgPSAvXmhcXGQkL2ksXG5cblx0cm5hdGl2ZSA9IC9eW157XStcXHtcXHMqXFxbbmF0aXZlIFxcdy8sXG5cblx0Ly8gRWFzaWx5LXBhcnNlYWJsZS9yZXRyaWV2YWJsZSBJRCBvciBUQUcgb3IgQ0xBU1Mgc2VsZWN0b3JzXG5cdHJxdWlja0V4cHIgPSAvXig/OiMoW1xcdy1dKyl8KFxcdyspfFxcLihbXFx3LV0rKSkkLyxcblxuXHRyc2libGluZyA9IC9bK35dLyxcblx0cmVzY2FwZSA9IC8nfFxcXFwvZyxcblxuXHQvLyBDU1MgZXNjYXBlcyBodHRwOi8vd3d3LnczLm9yZy9UUi9DU1MyMS9zeW5kYXRhLmh0bWwjZXNjYXBlZC1jaGFyYWN0ZXJzXG5cdHJ1bmVzY2FwZSA9IG5ldyBSZWdFeHAoIFwiXFxcXFxcXFwoW1xcXFxkYS1mXXsxLDZ9XCIgKyB3aGl0ZXNwYWNlICsgXCI/fChcIiArIHdoaXRlc3BhY2UgKyBcIil8LilcIiwgXCJpZ1wiICksXG5cdGZ1bmVzY2FwZSA9IGZ1bmN0aW9uKCBfLCBlc2NhcGVkLCBlc2NhcGVkV2hpdGVzcGFjZSApIHtcblx0XHR2YXIgaGlnaCA9IFwiMHhcIiArIGVzY2FwZWQgLSAweDEwMDAwO1xuXHRcdC8vIE5hTiBtZWFucyBub24tY29kZXBvaW50XG5cdFx0Ly8gU3VwcG9ydDogRmlyZWZveDwyNFxuXHRcdC8vIFdvcmthcm91bmQgZXJyb25lb3VzIG51bWVyaWMgaW50ZXJwcmV0YXRpb24gb2YgK1wiMHhcIlxuXHRcdHJldHVybiBoaWdoICE9PSBoaWdoIHx8IGVzY2FwZWRXaGl0ZXNwYWNlID9cblx0XHRcdGVzY2FwZWQgOlxuXHRcdFx0aGlnaCA8IDAgP1xuXHRcdFx0XHQvLyBCTVAgY29kZXBvaW50XG5cdFx0XHRcdFN0cmluZy5mcm9tQ2hhckNvZGUoIGhpZ2ggKyAweDEwMDAwICkgOlxuXHRcdFx0XHQvLyBTdXBwbGVtZW50YWwgUGxhbmUgY29kZXBvaW50IChzdXJyb2dhdGUgcGFpcilcblx0XHRcdFx0U3RyaW5nLmZyb21DaGFyQ29kZSggaGlnaCA+PiAxMCB8IDB4RDgwMCwgaGlnaCAmIDB4M0ZGIHwgMHhEQzAwICk7XG5cdH0sXG5cblx0Ly8gVXNlZCBmb3IgaWZyYW1lc1xuXHQvLyBTZWUgc2V0RG9jdW1lbnQoKVxuXHQvLyBSZW1vdmluZyB0aGUgZnVuY3Rpb24gd3JhcHBlciBjYXVzZXMgYSBcIlBlcm1pc3Npb24gRGVuaWVkXCJcblx0Ly8gZXJyb3IgaW4gSUVcblx0dW5sb2FkSGFuZGxlciA9IGZ1bmN0aW9uKCkge1xuXHRcdHNldERvY3VtZW50KCk7XG5cdH07XG5cbi8vIE9wdGltaXplIGZvciBwdXNoLmFwcGx5KCBfLCBOb2RlTGlzdCApXG50cnkge1xuXHRwdXNoLmFwcGx5KFxuXHRcdChhcnIgPSBzbGljZS5jYWxsKCBwcmVmZXJyZWREb2MuY2hpbGROb2RlcyApKSxcblx0XHRwcmVmZXJyZWREb2MuY2hpbGROb2Rlc1xuXHQpO1xuXHQvLyBTdXBwb3J0OiBBbmRyb2lkPDQuMFxuXHQvLyBEZXRlY3Qgc2lsZW50bHkgZmFpbGluZyBwdXNoLmFwcGx5XG5cdGFyclsgcHJlZmVycmVkRG9jLmNoaWxkTm9kZXMubGVuZ3RoIF0ubm9kZVR5cGU7XG59IGNhdGNoICggZSApIHtcblx0cHVzaCA9IHsgYXBwbHk6IGFyci5sZW5ndGggP1xuXG5cdFx0Ly8gTGV2ZXJhZ2Ugc2xpY2UgaWYgcG9zc2libGVcblx0XHRmdW5jdGlvbiggdGFyZ2V0LCBlbHMgKSB7XG5cdFx0XHRwdXNoX25hdGl2ZS5hcHBseSggdGFyZ2V0LCBzbGljZS5jYWxsKGVscykgKTtcblx0XHR9IDpcblxuXHRcdC8vIFN1cHBvcnQ6IElFPDlcblx0XHQvLyBPdGhlcndpc2UgYXBwZW5kIGRpcmVjdGx5XG5cdFx0ZnVuY3Rpb24oIHRhcmdldCwgZWxzICkge1xuXHRcdFx0dmFyIGogPSB0YXJnZXQubGVuZ3RoLFxuXHRcdFx0XHRpID0gMDtcblx0XHRcdC8vIENhbid0IHRydXN0IE5vZGVMaXN0Lmxlbmd0aFxuXHRcdFx0d2hpbGUgKCAodGFyZ2V0W2orK10gPSBlbHNbaSsrXSkgKSB7fVxuXHRcdFx0dGFyZ2V0Lmxlbmd0aCA9IGogLSAxO1xuXHRcdH1cblx0fTtcbn1cblxuZnVuY3Rpb24gU2l6emxlKCBzZWxlY3RvciwgY29udGV4dCwgcmVzdWx0cywgc2VlZCApIHtcblx0dmFyIG0sIGksIGVsZW0sIG5pZCwgbmlkc2VsZWN0LCBtYXRjaCwgZ3JvdXBzLCBuZXdTZWxlY3Rvcixcblx0XHRuZXdDb250ZXh0ID0gY29udGV4dCAmJiBjb250ZXh0Lm93bmVyRG9jdW1lbnQsXG5cblx0XHQvLyBub2RlVHlwZSBkZWZhdWx0cyB0byA5LCBzaW5jZSBjb250ZXh0IGRlZmF1bHRzIHRvIGRvY3VtZW50XG5cdFx0bm9kZVR5cGUgPSBjb250ZXh0ID8gY29udGV4dC5ub2RlVHlwZSA6IDk7XG5cblx0cmVzdWx0cyA9IHJlc3VsdHMgfHwgW107XG5cblx0Ly8gUmV0dXJuIGVhcmx5IGZyb20gY2FsbHMgd2l0aCBpbnZhbGlkIHNlbGVjdG9yIG9yIGNvbnRleHRcblx0aWYgKCB0eXBlb2Ygc2VsZWN0b3IgIT09IFwic3RyaW5nXCIgfHwgIXNlbGVjdG9yIHx8XG5cdFx0bm9kZVR5cGUgIT09IDEgJiYgbm9kZVR5cGUgIT09IDkgJiYgbm9kZVR5cGUgIT09IDExICkge1xuXG5cdFx0cmV0dXJuIHJlc3VsdHM7XG5cdH1cblxuXHQvLyBUcnkgdG8gc2hvcnRjdXQgZmluZCBvcGVyYXRpb25zIChhcyBvcHBvc2VkIHRvIGZpbHRlcnMpIGluIEhUTUwgZG9jdW1lbnRzXG5cdGlmICggIXNlZWQgKSB7XG5cblx0XHRpZiAoICggY29udGV4dCA/IGNvbnRleHQub3duZXJEb2N1bWVudCB8fCBjb250ZXh0IDogcHJlZmVycmVkRG9jICkgIT09IGRvY3VtZW50ICkge1xuXHRcdFx0c2V0RG9jdW1lbnQoIGNvbnRleHQgKTtcblx0XHR9XG5cdFx0Y29udGV4dCA9IGNvbnRleHQgfHwgZG9jdW1lbnQ7XG5cblx0XHRpZiAoIGRvY3VtZW50SXNIVE1MICkge1xuXG5cdFx0XHQvLyBJZiB0aGUgc2VsZWN0b3IgaXMgc3VmZmljaWVudGx5IHNpbXBsZSwgdHJ5IHVzaW5nIGEgXCJnZXQqQnkqXCIgRE9NIG1ldGhvZFxuXHRcdFx0Ly8gKGV4Y2VwdGluZyBEb2N1bWVudEZyYWdtZW50IGNvbnRleHQsIHdoZXJlIHRoZSBtZXRob2RzIGRvbid0IGV4aXN0KVxuXHRcdFx0aWYgKCBub2RlVHlwZSAhPT0gMTEgJiYgKG1hdGNoID0gcnF1aWNrRXhwci5leGVjKCBzZWxlY3RvciApKSApIHtcblxuXHRcdFx0XHQvLyBJRCBzZWxlY3RvclxuXHRcdFx0XHRpZiAoIChtID0gbWF0Y2hbMV0pICkge1xuXG5cdFx0XHRcdFx0Ly8gRG9jdW1lbnQgY29udGV4dFxuXHRcdFx0XHRcdGlmICggbm9kZVR5cGUgPT09IDkgKSB7XG5cdFx0XHRcdFx0XHRpZiAoIChlbGVtID0gY29udGV4dC5nZXRFbGVtZW50QnlJZCggbSApKSApIHtcblxuXHRcdFx0XHRcdFx0XHQvLyBTdXBwb3J0OiBJRSwgT3BlcmEsIFdlYmtpdFxuXHRcdFx0XHRcdFx0XHQvLyBUT0RPOiBpZGVudGlmeSB2ZXJzaW9uc1xuXHRcdFx0XHRcdFx0XHQvLyBnZXRFbGVtZW50QnlJZCBjYW4gbWF0Y2ggZWxlbWVudHMgYnkgbmFtZSBpbnN0ZWFkIG9mIElEXG5cdFx0XHRcdFx0XHRcdGlmICggZWxlbS5pZCA9PT0gbSApIHtcblx0XHRcdFx0XHRcdFx0XHRyZXN1bHRzLnB1c2goIGVsZW0gKTtcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gcmVzdWx0cztcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHJlc3VsdHM7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBFbGVtZW50IGNvbnRleHRcblx0XHRcdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdFx0XHQvLyBTdXBwb3J0OiBJRSwgT3BlcmEsIFdlYmtpdFxuXHRcdFx0XHRcdFx0Ly8gVE9ETzogaWRlbnRpZnkgdmVyc2lvbnNcblx0XHRcdFx0XHRcdC8vIGdldEVsZW1lbnRCeUlkIGNhbiBtYXRjaCBlbGVtZW50cyBieSBuYW1lIGluc3RlYWQgb2YgSURcblx0XHRcdFx0XHRcdGlmICggbmV3Q29udGV4dCAmJiAoZWxlbSA9IG5ld0NvbnRleHQuZ2V0RWxlbWVudEJ5SWQoIG0gKSkgJiZcblx0XHRcdFx0XHRcdFx0Y29udGFpbnMoIGNvbnRleHQsIGVsZW0gKSAmJlxuXHRcdFx0XHRcdFx0XHRlbGVtLmlkID09PSBtICkge1xuXG5cdFx0XHRcdFx0XHRcdHJlc3VsdHMucHVzaCggZWxlbSApO1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gcmVzdWx0cztcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gVHlwZSBzZWxlY3RvclxuXHRcdFx0XHR9IGVsc2UgaWYgKCBtYXRjaFsyXSApIHtcblx0XHRcdFx0XHRwdXNoLmFwcGx5KCByZXN1bHRzLCBjb250ZXh0LmdldEVsZW1lbnRzQnlUYWdOYW1lKCBzZWxlY3RvciApICk7XG5cdFx0XHRcdFx0cmV0dXJuIHJlc3VsdHM7XG5cblx0XHRcdFx0Ly8gQ2xhc3Mgc2VsZWN0b3Jcblx0XHRcdFx0fSBlbHNlIGlmICggKG0gPSBtYXRjaFszXSkgJiYgc3VwcG9ydC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lICYmXG5cdFx0XHRcdFx0Y29udGV4dC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lICkge1xuXG5cdFx0XHRcdFx0cHVzaC5hcHBseSggcmVzdWx0cywgY29udGV4dC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCBtICkgKTtcblx0XHRcdFx0XHRyZXR1cm4gcmVzdWx0cztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBUYWtlIGFkdmFudGFnZSBvZiBxdWVyeVNlbGVjdG9yQWxsXG5cdFx0XHRpZiAoIHN1cHBvcnQucXNhICYmXG5cdFx0XHRcdCFjb21waWxlckNhY2hlWyBzZWxlY3RvciArIFwiIFwiIF0gJiZcblx0XHRcdFx0KCFyYnVnZ3lRU0EgfHwgIXJidWdneVFTQS50ZXN0KCBzZWxlY3RvciApKSApIHtcblxuXHRcdFx0XHRpZiAoIG5vZGVUeXBlICE9PSAxICkge1xuXHRcdFx0XHRcdG5ld0NvbnRleHQgPSBjb250ZXh0O1xuXHRcdFx0XHRcdG5ld1NlbGVjdG9yID0gc2VsZWN0b3I7XG5cblx0XHRcdFx0Ly8gcVNBIGxvb2tzIG91dHNpZGUgRWxlbWVudCBjb250ZXh0LCB3aGljaCBpcyBub3Qgd2hhdCB3ZSB3YW50XG5cdFx0XHRcdC8vIFRoYW5rcyB0byBBbmRyZXcgRHVwb250IGZvciB0aGlzIHdvcmthcm91bmQgdGVjaG5pcXVlXG5cdFx0XHRcdC8vIFN1cHBvcnQ6IElFIDw9OFxuXHRcdFx0XHQvLyBFeGNsdWRlIG9iamVjdCBlbGVtZW50c1xuXHRcdFx0XHR9IGVsc2UgaWYgKCBjb250ZXh0Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgIT09IFwib2JqZWN0XCIgKSB7XG5cblx0XHRcdFx0XHQvLyBDYXB0dXJlIHRoZSBjb250ZXh0IElELCBzZXR0aW5nIGl0IGZpcnN0IGlmIG5lY2Vzc2FyeVxuXHRcdFx0XHRcdGlmICggKG5pZCA9IGNvbnRleHQuZ2V0QXR0cmlidXRlKCBcImlkXCIgKSkgKSB7XG5cdFx0XHRcdFx0XHRuaWQgPSBuaWQucmVwbGFjZSggcmVzY2FwZSwgXCJcXFxcJCZcIiApO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRjb250ZXh0LnNldEF0dHJpYnV0ZSggXCJpZFwiLCAobmlkID0gZXhwYW5kbykgKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBQcmVmaXggZXZlcnkgc2VsZWN0b3IgaW4gdGhlIGxpc3Rcblx0XHRcdFx0XHRncm91cHMgPSB0b2tlbml6ZSggc2VsZWN0b3IgKTtcblx0XHRcdFx0XHRpID0gZ3JvdXBzLmxlbmd0aDtcblx0XHRcdFx0XHRuaWRzZWxlY3QgPSByaWRlbnRpZmllci50ZXN0KCBuaWQgKSA/IFwiI1wiICsgbmlkIDogXCJbaWQ9J1wiICsgbmlkICsgXCInXVwiO1xuXHRcdFx0XHRcdHdoaWxlICggaS0tICkge1xuXHRcdFx0XHRcdFx0Z3JvdXBzW2ldID0gbmlkc2VsZWN0ICsgXCIgXCIgKyB0b1NlbGVjdG9yKCBncm91cHNbaV0gKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0bmV3U2VsZWN0b3IgPSBncm91cHMuam9pbiggXCIsXCIgKTtcblxuXHRcdFx0XHRcdC8vIEV4cGFuZCBjb250ZXh0IGZvciBzaWJsaW5nIHNlbGVjdG9yc1xuXHRcdFx0XHRcdG5ld0NvbnRleHQgPSByc2libGluZy50ZXN0KCBzZWxlY3RvciApICYmIHRlc3RDb250ZXh0KCBjb250ZXh0LnBhcmVudE5vZGUgKSB8fFxuXHRcdFx0XHRcdFx0Y29udGV4dDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICggbmV3U2VsZWN0b3IgKSB7XG5cdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdHB1c2guYXBwbHkoIHJlc3VsdHMsXG5cdFx0XHRcdFx0XHRcdG5ld0NvbnRleHQucXVlcnlTZWxlY3RvckFsbCggbmV3U2VsZWN0b3IgKVxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdHJldHVybiByZXN1bHRzO1xuXHRcdFx0XHRcdH0gY2F0Y2ggKCBxc2FFcnJvciApIHtcblx0XHRcdFx0XHR9IGZpbmFsbHkge1xuXHRcdFx0XHRcdFx0aWYgKCBuaWQgPT09IGV4cGFuZG8gKSB7XG5cdFx0XHRcdFx0XHRcdGNvbnRleHQucmVtb3ZlQXR0cmlidXRlKCBcImlkXCIgKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvLyBBbGwgb3RoZXJzXG5cdHJldHVybiBzZWxlY3QoIHNlbGVjdG9yLnJlcGxhY2UoIHJ0cmltLCBcIiQxXCIgKSwgY29udGV4dCwgcmVzdWx0cywgc2VlZCApO1xufVxuXG4vKipcbiAqIENyZWF0ZSBrZXktdmFsdWUgY2FjaGVzIG9mIGxpbWl0ZWQgc2l6ZVxuICogQHJldHVybnMge2Z1bmN0aW9uKHN0cmluZywgb2JqZWN0KX0gUmV0dXJucyB0aGUgT2JqZWN0IGRhdGEgYWZ0ZXIgc3RvcmluZyBpdCBvbiBpdHNlbGYgd2l0aFxuICpcdHByb3BlcnR5IG5hbWUgdGhlIChzcGFjZS1zdWZmaXhlZCkgc3RyaW5nIGFuZCAoaWYgdGhlIGNhY2hlIGlzIGxhcmdlciB0aGFuIEV4cHIuY2FjaGVMZW5ndGgpXG4gKlx0ZGVsZXRpbmcgdGhlIG9sZGVzdCBlbnRyeVxuICovXG5mdW5jdGlvbiBjcmVhdGVDYWNoZSgpIHtcblx0dmFyIGtleXMgPSBbXTtcblxuXHRmdW5jdGlvbiBjYWNoZSgga2V5LCB2YWx1ZSApIHtcblx0XHQvLyBVc2UgKGtleSArIFwiIFwiKSB0byBhdm9pZCBjb2xsaXNpb24gd2l0aCBuYXRpdmUgcHJvdG90eXBlIHByb3BlcnRpZXMgKHNlZSBJc3N1ZSAjMTU3KVxuXHRcdGlmICgga2V5cy5wdXNoKCBrZXkgKyBcIiBcIiApID4gRXhwci5jYWNoZUxlbmd0aCApIHtcblx0XHRcdC8vIE9ubHkga2VlcCB0aGUgbW9zdCByZWNlbnQgZW50cmllc1xuXHRcdFx0ZGVsZXRlIGNhY2hlWyBrZXlzLnNoaWZ0KCkgXTtcblx0XHR9XG5cdFx0cmV0dXJuIChjYWNoZVsga2V5ICsgXCIgXCIgXSA9IHZhbHVlKTtcblx0fVxuXHRyZXR1cm4gY2FjaGU7XG59XG5cbi8qKlxuICogTWFyayBhIGZ1bmN0aW9uIGZvciBzcGVjaWFsIHVzZSBieSBTaXp6bGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBtYXJrXG4gKi9cbmZ1bmN0aW9uIG1hcmtGdW5jdGlvbiggZm4gKSB7XG5cdGZuWyBleHBhbmRvIF0gPSB0cnVlO1xuXHRyZXR1cm4gZm47XG59XG5cbi8qKlxuICogU3VwcG9ydCB0ZXN0aW5nIHVzaW5nIGFuIGVsZW1lbnRcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFBhc3NlZCB0aGUgY3JlYXRlZCBkaXYgYW5kIGV4cGVjdHMgYSBib29sZWFuIHJlc3VsdFxuICovXG5mdW5jdGlvbiBhc3NlcnQoIGZuICkge1xuXHR2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuXHR0cnkge1xuXHRcdHJldHVybiAhIWZuKCBkaXYgKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fSBmaW5hbGx5IHtcblx0XHQvLyBSZW1vdmUgZnJvbSBpdHMgcGFyZW50IGJ5IGRlZmF1bHRcblx0XHRpZiAoIGRpdi5wYXJlbnROb2RlICkge1xuXHRcdFx0ZGl2LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoIGRpdiApO1xuXHRcdH1cblx0XHQvLyByZWxlYXNlIG1lbW9yeSBpbiBJRVxuXHRcdGRpdiA9IG51bGw7XG5cdH1cbn1cblxuLyoqXG4gKiBBZGRzIHRoZSBzYW1lIGhhbmRsZXIgZm9yIGFsbCBvZiB0aGUgc3BlY2lmaWVkIGF0dHJzXG4gKiBAcGFyYW0ge1N0cmluZ30gYXR0cnMgUGlwZS1zZXBhcmF0ZWQgbGlzdCBvZiBhdHRyaWJ1dGVzXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBoYW5kbGVyIFRoZSBtZXRob2QgdGhhdCB3aWxsIGJlIGFwcGxpZWRcbiAqL1xuZnVuY3Rpb24gYWRkSGFuZGxlKCBhdHRycywgaGFuZGxlciApIHtcblx0dmFyIGFyciA9IGF0dHJzLnNwbGl0KFwifFwiKSxcblx0XHRpID0gYXJyLmxlbmd0aDtcblxuXHR3aGlsZSAoIGktLSApIHtcblx0XHRFeHByLmF0dHJIYW5kbGVbIGFycltpXSBdID0gaGFuZGxlcjtcblx0fVxufVxuXG4vKipcbiAqIENoZWNrcyBkb2N1bWVudCBvcmRlciBvZiB0d28gc2libGluZ3NcbiAqIEBwYXJhbSB7RWxlbWVudH0gYVxuICogQHBhcmFtIHtFbGVtZW50fSBiXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBSZXR1cm5zIGxlc3MgdGhhbiAwIGlmIGEgcHJlY2VkZXMgYiwgZ3JlYXRlciB0aGFuIDAgaWYgYSBmb2xsb3dzIGJcbiAqL1xuZnVuY3Rpb24gc2libGluZ0NoZWNrKCBhLCBiICkge1xuXHR2YXIgY3VyID0gYiAmJiBhLFxuXHRcdGRpZmYgPSBjdXIgJiYgYS5ub2RlVHlwZSA9PT0gMSAmJiBiLm5vZGVUeXBlID09PSAxICYmXG5cdFx0XHQoIH5iLnNvdXJjZUluZGV4IHx8IE1BWF9ORUdBVElWRSApIC1cblx0XHRcdCggfmEuc291cmNlSW5kZXggfHwgTUFYX05FR0FUSVZFICk7XG5cblx0Ly8gVXNlIElFIHNvdXJjZUluZGV4IGlmIGF2YWlsYWJsZSBvbiBib3RoIG5vZGVzXG5cdGlmICggZGlmZiApIHtcblx0XHRyZXR1cm4gZGlmZjtcblx0fVxuXG5cdC8vIENoZWNrIGlmIGIgZm9sbG93cyBhXG5cdGlmICggY3VyICkge1xuXHRcdHdoaWxlICggKGN1ciA9IGN1ci5uZXh0U2libGluZykgKSB7XG5cdFx0XHRpZiAoIGN1ciA9PT0gYiApIHtcblx0XHRcdFx0cmV0dXJuIC0xO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiBhID8gMSA6IC0xO1xufVxuXG4vKipcbiAqIFJldHVybnMgYSBmdW5jdGlvbiB0byB1c2UgaW4gcHNldWRvcyBmb3IgaW5wdXQgdHlwZXNcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUlucHV0UHNldWRvKCB0eXBlICkge1xuXHRyZXR1cm4gZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0dmFyIG5hbWUgPSBlbGVtLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCk7XG5cdFx0cmV0dXJuIG5hbWUgPT09IFwiaW5wdXRcIiAmJiBlbGVtLnR5cGUgPT09IHR5cGU7XG5cdH07XG59XG5cbi8qKlxuICogUmV0dXJucyBhIGZ1bmN0aW9uIHRvIHVzZSBpbiBwc2V1ZG9zIGZvciBidXR0b25zXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZVxuICovXG5mdW5jdGlvbiBjcmVhdGVCdXR0b25Qc2V1ZG8oIHR5cGUgKSB7XG5cdHJldHVybiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHR2YXIgbmFtZSA9IGVsZW0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKTtcblx0XHRyZXR1cm4gKG5hbWUgPT09IFwiaW5wdXRcIiB8fCBuYW1lID09PSBcImJ1dHRvblwiKSAmJiBlbGVtLnR5cGUgPT09IHR5cGU7XG5cdH07XG59XG5cbi8qKlxuICogUmV0dXJucyBhIGZ1bmN0aW9uIHRvIHVzZSBpbiBwc2V1ZG9zIGZvciBwb3NpdGlvbmFsc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlUG9zaXRpb25hbFBzZXVkbyggZm4gKSB7XG5cdHJldHVybiBtYXJrRnVuY3Rpb24oZnVuY3Rpb24oIGFyZ3VtZW50ICkge1xuXHRcdGFyZ3VtZW50ID0gK2FyZ3VtZW50O1xuXHRcdHJldHVybiBtYXJrRnVuY3Rpb24oZnVuY3Rpb24oIHNlZWQsIG1hdGNoZXMgKSB7XG5cdFx0XHR2YXIgaixcblx0XHRcdFx0bWF0Y2hJbmRleGVzID0gZm4oIFtdLCBzZWVkLmxlbmd0aCwgYXJndW1lbnQgKSxcblx0XHRcdFx0aSA9IG1hdGNoSW5kZXhlcy5sZW5ndGg7XG5cblx0XHRcdC8vIE1hdGNoIGVsZW1lbnRzIGZvdW5kIGF0IHRoZSBzcGVjaWZpZWQgaW5kZXhlc1xuXHRcdFx0d2hpbGUgKCBpLS0gKSB7XG5cdFx0XHRcdGlmICggc2VlZFsgKGogPSBtYXRjaEluZGV4ZXNbaV0pIF0gKSB7XG5cdFx0XHRcdFx0c2VlZFtqXSA9ICEobWF0Y2hlc1tqXSA9IHNlZWRbal0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH0pO1xufVxuXG4vKipcbiAqIENoZWNrcyBhIG5vZGUgZm9yIHZhbGlkaXR5IGFzIGEgU2l6emxlIGNvbnRleHRcbiAqIEBwYXJhbSB7RWxlbWVudHxPYmplY3Q9fSBjb250ZXh0XG4gKiBAcmV0dXJucyB7RWxlbWVudHxPYmplY3R8Qm9vbGVhbn0gVGhlIGlucHV0IG5vZGUgaWYgYWNjZXB0YWJsZSwgb3RoZXJ3aXNlIGEgZmFsc3kgdmFsdWVcbiAqL1xuZnVuY3Rpb24gdGVzdENvbnRleHQoIGNvbnRleHQgKSB7XG5cdHJldHVybiBjb250ZXh0ICYmIHR5cGVvZiBjb250ZXh0LmdldEVsZW1lbnRzQnlUYWdOYW1lICE9PSBcInVuZGVmaW5lZFwiICYmIGNvbnRleHQ7XG59XG5cbi8vIEV4cG9zZSBzdXBwb3J0IHZhcnMgZm9yIGNvbnZlbmllbmNlXG5zdXBwb3J0ID0gU2l6emxlLnN1cHBvcnQgPSB7fTtcblxuLyoqXG4gKiBEZXRlY3RzIFhNTCBub2Rlc1xuICogQHBhcmFtIHtFbGVtZW50fE9iamVjdH0gZWxlbSBBbiBlbGVtZW50IG9yIGEgZG9jdW1lbnRcbiAqIEByZXR1cm5zIHtCb29sZWFufSBUcnVlIGlmZiBlbGVtIGlzIGEgbm9uLUhUTUwgWE1MIG5vZGVcbiAqL1xuaXNYTUwgPSBTaXp6bGUuaXNYTUwgPSBmdW5jdGlvbiggZWxlbSApIHtcblx0Ly8gZG9jdW1lbnRFbGVtZW50IGlzIHZlcmlmaWVkIGZvciBjYXNlcyB3aGVyZSBpdCBkb2Vzbid0IHlldCBleGlzdFxuXHQvLyAoc3VjaCBhcyBsb2FkaW5nIGlmcmFtZXMgaW4gSUUgLSAjNDgzMylcblx0dmFyIGRvY3VtZW50RWxlbWVudCA9IGVsZW0gJiYgKGVsZW0ub3duZXJEb2N1bWVudCB8fCBlbGVtKS5kb2N1bWVudEVsZW1lbnQ7XG5cdHJldHVybiBkb2N1bWVudEVsZW1lbnQgPyBkb2N1bWVudEVsZW1lbnQubm9kZU5hbWUgIT09IFwiSFRNTFwiIDogZmFsc2U7XG59O1xuXG4vKipcbiAqIFNldHMgZG9jdW1lbnQtcmVsYXRlZCB2YXJpYWJsZXMgb25jZSBiYXNlZCBvbiB0aGUgY3VycmVudCBkb2N1bWVudFxuICogQHBhcmFtIHtFbGVtZW50fE9iamVjdH0gW2RvY10gQW4gZWxlbWVudCBvciBkb2N1bWVudCBvYmplY3QgdG8gdXNlIHRvIHNldCB0aGUgZG9jdW1lbnRcbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGN1cnJlbnQgZG9jdW1lbnRcbiAqL1xuc2V0RG9jdW1lbnQgPSBTaXp6bGUuc2V0RG9jdW1lbnQgPSBmdW5jdGlvbiggbm9kZSApIHtcblx0dmFyIGhhc0NvbXBhcmUsIHBhcmVudCxcblx0XHRkb2MgPSBub2RlID8gbm9kZS5vd25lckRvY3VtZW50IHx8IG5vZGUgOiBwcmVmZXJyZWREb2M7XG5cblx0Ly8gUmV0dXJuIGVhcmx5IGlmIGRvYyBpcyBpbnZhbGlkIG9yIGFscmVhZHkgc2VsZWN0ZWRcblx0aWYgKCBkb2MgPT09IGRvY3VtZW50IHx8IGRvYy5ub2RlVHlwZSAhPT0gOSB8fCAhZG9jLmRvY3VtZW50RWxlbWVudCApIHtcblx0XHRyZXR1cm4gZG9jdW1lbnQ7XG5cdH1cblxuXHQvLyBVcGRhdGUgZ2xvYmFsIHZhcmlhYmxlc1xuXHRkb2N1bWVudCA9IGRvYztcblx0ZG9jRWxlbSA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcblx0ZG9jdW1lbnRJc0hUTUwgPSAhaXNYTUwoIGRvY3VtZW50ICk7XG5cblx0Ly8gU3VwcG9ydDogSUUgOS0xMSwgRWRnZVxuXHQvLyBBY2Nlc3NpbmcgaWZyYW1lIGRvY3VtZW50cyBhZnRlciB1bmxvYWQgdGhyb3dzIFwicGVybWlzc2lvbiBkZW5pZWRcIiBlcnJvcnMgKGpRdWVyeSAjMTM5MzYpXG5cdGlmICggKHBhcmVudCA9IGRvY3VtZW50LmRlZmF1bHRWaWV3KSAmJiBwYXJlbnQudG9wICE9PSBwYXJlbnQgKSB7XG5cdFx0Ly8gU3VwcG9ydDogSUUgMTFcblx0XHRpZiAoIHBhcmVudC5hZGRFdmVudExpc3RlbmVyICkge1xuXHRcdFx0cGFyZW50LmFkZEV2ZW50TGlzdGVuZXIoIFwidW5sb2FkXCIsIHVubG9hZEhhbmRsZXIsIGZhbHNlICk7XG5cblx0XHQvLyBTdXBwb3J0OiBJRSA5IC0gMTAgb25seVxuXHRcdH0gZWxzZSBpZiAoIHBhcmVudC5hdHRhY2hFdmVudCApIHtcblx0XHRcdHBhcmVudC5hdHRhY2hFdmVudCggXCJvbnVubG9hZFwiLCB1bmxvYWRIYW5kbGVyICk7XG5cdFx0fVxuXHR9XG5cblx0LyogQXR0cmlidXRlc1xuXHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cblx0Ly8gU3VwcG9ydDogSUU8OFxuXHQvLyBWZXJpZnkgdGhhdCBnZXRBdHRyaWJ1dGUgcmVhbGx5IHJldHVybnMgYXR0cmlidXRlcyBhbmQgbm90IHByb3BlcnRpZXNcblx0Ly8gKGV4Y2VwdGluZyBJRTggYm9vbGVhbnMpXG5cdHN1cHBvcnQuYXR0cmlidXRlcyA9IGFzc2VydChmdW5jdGlvbiggZGl2ICkge1xuXHRcdGRpdi5jbGFzc05hbWUgPSBcImlcIjtcblx0XHRyZXR1cm4gIWRpdi5nZXRBdHRyaWJ1dGUoXCJjbGFzc05hbWVcIik7XG5cdH0pO1xuXG5cdC8qIGdldEVsZW1lbnQocylCeSpcblx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5cdC8vIENoZWNrIGlmIGdldEVsZW1lbnRzQnlUYWdOYW1lKFwiKlwiKSByZXR1cm5zIG9ubHkgZWxlbWVudHNcblx0c3VwcG9ydC5nZXRFbGVtZW50c0J5VGFnTmFtZSA9IGFzc2VydChmdW5jdGlvbiggZGl2ICkge1xuXHRcdGRpdi5hcHBlbmRDaGlsZCggZG9jdW1lbnQuY3JlYXRlQ29tbWVudChcIlwiKSApO1xuXHRcdHJldHVybiAhZGl2LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiKlwiKS5sZW5ndGg7XG5cdH0pO1xuXG5cdC8vIFN1cHBvcnQ6IElFPDlcblx0c3VwcG9ydC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lID0gcm5hdGl2ZS50ZXN0KCBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lICk7XG5cblx0Ly8gU3VwcG9ydDogSUU8MTBcblx0Ly8gQ2hlY2sgaWYgZ2V0RWxlbWVudEJ5SWQgcmV0dXJucyBlbGVtZW50cyBieSBuYW1lXG5cdC8vIFRoZSBicm9rZW4gZ2V0RWxlbWVudEJ5SWQgbWV0aG9kcyBkb24ndCBwaWNrIHVwIHByb2dyYW1hdGljYWxseS1zZXQgbmFtZXMsXG5cdC8vIHNvIHVzZSBhIHJvdW5kYWJvdXQgZ2V0RWxlbWVudHNCeU5hbWUgdGVzdFxuXHRzdXBwb3J0LmdldEJ5SWQgPSBhc3NlcnQoZnVuY3Rpb24oIGRpdiApIHtcblx0XHRkb2NFbGVtLmFwcGVuZENoaWxkKCBkaXYgKS5pZCA9IGV4cGFuZG87XG5cdFx0cmV0dXJuICFkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZSB8fCAhZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUoIGV4cGFuZG8gKS5sZW5ndGg7XG5cdH0pO1xuXG5cdC8vIElEIGZpbmQgYW5kIGZpbHRlclxuXHRpZiAoIHN1cHBvcnQuZ2V0QnlJZCApIHtcblx0XHRFeHByLmZpbmRbXCJJRFwiXSA9IGZ1bmN0aW9uKCBpZCwgY29udGV4dCApIHtcblx0XHRcdGlmICggdHlwZW9mIGNvbnRleHQuZ2V0RWxlbWVudEJ5SWQgIT09IFwidW5kZWZpbmVkXCIgJiYgZG9jdW1lbnRJc0hUTUwgKSB7XG5cdFx0XHRcdHZhciBtID0gY29udGV4dC5nZXRFbGVtZW50QnlJZCggaWQgKTtcblx0XHRcdFx0cmV0dXJuIG0gPyBbIG0gXSA6IFtdO1xuXHRcdFx0fVxuXHRcdH07XG5cdFx0RXhwci5maWx0ZXJbXCJJRFwiXSA9IGZ1bmN0aW9uKCBpZCApIHtcblx0XHRcdHZhciBhdHRySWQgPSBpZC5yZXBsYWNlKCBydW5lc2NhcGUsIGZ1bmVzY2FwZSApO1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0XHRyZXR1cm4gZWxlbS5nZXRBdHRyaWJ1dGUoXCJpZFwiKSA9PT0gYXR0cklkO1xuXHRcdFx0fTtcblx0XHR9O1xuXHR9IGVsc2Uge1xuXHRcdC8vIFN1cHBvcnQ6IElFNi83XG5cdFx0Ly8gZ2V0RWxlbWVudEJ5SWQgaXMgbm90IHJlbGlhYmxlIGFzIGEgZmluZCBzaG9ydGN1dFxuXHRcdGRlbGV0ZSBFeHByLmZpbmRbXCJJRFwiXTtcblxuXHRcdEV4cHIuZmlsdGVyW1wiSURcIl0gPSAgZnVuY3Rpb24oIGlkICkge1xuXHRcdFx0dmFyIGF0dHJJZCA9IGlkLnJlcGxhY2UoIHJ1bmVzY2FwZSwgZnVuZXNjYXBlICk7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRcdHZhciBub2RlID0gdHlwZW9mIGVsZW0uZ2V0QXR0cmlidXRlTm9kZSAhPT0gXCJ1bmRlZmluZWRcIiAmJlxuXHRcdFx0XHRcdGVsZW0uZ2V0QXR0cmlidXRlTm9kZShcImlkXCIpO1xuXHRcdFx0XHRyZXR1cm4gbm9kZSAmJiBub2RlLnZhbHVlID09PSBhdHRySWQ7XG5cdFx0XHR9O1xuXHRcdH07XG5cdH1cblxuXHQvLyBUYWdcblx0RXhwci5maW5kW1wiVEFHXCJdID0gc3VwcG9ydC5nZXRFbGVtZW50c0J5VGFnTmFtZSA/XG5cdFx0ZnVuY3Rpb24oIHRhZywgY29udGV4dCApIHtcblx0XHRcdGlmICggdHlwZW9mIGNvbnRleHQuZ2V0RWxlbWVudHNCeVRhZ05hbWUgIT09IFwidW5kZWZpbmVkXCIgKSB7XG5cdFx0XHRcdHJldHVybiBjb250ZXh0LmdldEVsZW1lbnRzQnlUYWdOYW1lKCB0YWcgKTtcblxuXHRcdFx0Ly8gRG9jdW1lbnRGcmFnbWVudCBub2RlcyBkb24ndCBoYXZlIGdFQlROXG5cdFx0XHR9IGVsc2UgaWYgKCBzdXBwb3J0LnFzYSApIHtcblx0XHRcdFx0cmV0dXJuIGNvbnRleHQucXVlcnlTZWxlY3RvckFsbCggdGFnICk7XG5cdFx0XHR9XG5cdFx0fSA6XG5cblx0XHRmdW5jdGlvbiggdGFnLCBjb250ZXh0ICkge1xuXHRcdFx0dmFyIGVsZW0sXG5cdFx0XHRcdHRtcCA9IFtdLFxuXHRcdFx0XHRpID0gMCxcblx0XHRcdFx0Ly8gQnkgaGFwcHkgY29pbmNpZGVuY2UsIGEgKGJyb2tlbikgZ0VCVE4gYXBwZWFycyBvbiBEb2N1bWVudEZyYWdtZW50IG5vZGVzIHRvb1xuXHRcdFx0XHRyZXN1bHRzID0gY29udGV4dC5nZXRFbGVtZW50c0J5VGFnTmFtZSggdGFnICk7XG5cblx0XHRcdC8vIEZpbHRlciBvdXQgcG9zc2libGUgY29tbWVudHNcblx0XHRcdGlmICggdGFnID09PSBcIipcIiApIHtcblx0XHRcdFx0d2hpbGUgKCAoZWxlbSA9IHJlc3VsdHNbaSsrXSkgKSB7XG5cdFx0XHRcdFx0aWYgKCBlbGVtLm5vZGVUeXBlID09PSAxICkge1xuXHRcdFx0XHRcdFx0dG1wLnB1c2goIGVsZW0gKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gdG1wO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHJlc3VsdHM7XG5cdFx0fTtcblxuXHQvLyBDbGFzc1xuXHRFeHByLmZpbmRbXCJDTEFTU1wiXSA9IHN1cHBvcnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSAmJiBmdW5jdGlvbiggY2xhc3NOYW1lLCBjb250ZXh0ICkge1xuXHRcdGlmICggdHlwZW9mIGNvbnRleHQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBkb2N1bWVudElzSFRNTCApIHtcblx0XHRcdHJldHVybiBjb250ZXh0LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoIGNsYXNzTmFtZSApO1xuXHRcdH1cblx0fTtcblxuXHQvKiBRU0EvbWF0Y2hlc1NlbGVjdG9yXG5cdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuXHQvLyBRU0EgYW5kIG1hdGNoZXNTZWxlY3RvciBzdXBwb3J0XG5cblx0Ly8gbWF0Y2hlc1NlbGVjdG9yKDphY3RpdmUpIHJlcG9ydHMgZmFsc2Ugd2hlbiB0cnVlIChJRTkvT3BlcmEgMTEuNSlcblx0cmJ1Z2d5TWF0Y2hlcyA9IFtdO1xuXG5cdC8vIHFTYSg6Zm9jdXMpIHJlcG9ydHMgZmFsc2Ugd2hlbiB0cnVlIChDaHJvbWUgMjEpXG5cdC8vIFdlIGFsbG93IHRoaXMgYmVjYXVzZSBvZiBhIGJ1ZyBpbiBJRTgvOSB0aGF0IHRocm93cyBhbiBlcnJvclxuXHQvLyB3aGVuZXZlciBgZG9jdW1lbnQuYWN0aXZlRWxlbWVudGAgaXMgYWNjZXNzZWQgb24gYW4gaWZyYW1lXG5cdC8vIFNvLCB3ZSBhbGxvdyA6Zm9jdXMgdG8gcGFzcyB0aHJvdWdoIFFTQSBhbGwgdGhlIHRpbWUgdG8gYXZvaWQgdGhlIElFIGVycm9yXG5cdC8vIFNlZSBodHRwOi8vYnVncy5qcXVlcnkuY29tL3RpY2tldC8xMzM3OFxuXHRyYnVnZ3lRU0EgPSBbXTtcblxuXHRpZiAoIChzdXBwb3J0LnFzYSA9IHJuYXRpdmUudGVzdCggZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCApKSApIHtcblx0XHQvLyBCdWlsZCBRU0EgcmVnZXhcblx0XHQvLyBSZWdleCBzdHJhdGVneSBhZG9wdGVkIGZyb20gRGllZ28gUGVyaW5pXG5cdFx0YXNzZXJ0KGZ1bmN0aW9uKCBkaXYgKSB7XG5cdFx0XHQvLyBTZWxlY3QgaXMgc2V0IHRvIGVtcHR5IHN0cmluZyBvbiBwdXJwb3NlXG5cdFx0XHQvLyBUaGlzIGlzIHRvIHRlc3QgSUUncyB0cmVhdG1lbnQgb2Ygbm90IGV4cGxpY2l0bHlcblx0XHRcdC8vIHNldHRpbmcgYSBib29sZWFuIGNvbnRlbnQgYXR0cmlidXRlLFxuXHRcdFx0Ly8gc2luY2UgaXRzIHByZXNlbmNlIHNob3VsZCBiZSBlbm91Z2hcblx0XHRcdC8vIGh0dHA6Ly9idWdzLmpxdWVyeS5jb20vdGlja2V0LzEyMzU5XG5cdFx0XHRkb2NFbGVtLmFwcGVuZENoaWxkKCBkaXYgKS5pbm5lckhUTUwgPSBcIjxhIGlkPSdcIiArIGV4cGFuZG8gKyBcIic+PC9hPlwiICtcblx0XHRcdFx0XCI8c2VsZWN0IGlkPSdcIiArIGV4cGFuZG8gKyBcIi1cXHJcXFxcJyBtc2FsbG93Y2FwdHVyZT0nJz5cIiArXG5cdFx0XHRcdFwiPG9wdGlvbiBzZWxlY3RlZD0nJz48L29wdGlvbj48L3NlbGVjdD5cIjtcblxuXHRcdFx0Ly8gU3VwcG9ydDogSUU4LCBPcGVyYSAxMS0xMi4xNlxuXHRcdFx0Ly8gTm90aGluZyBzaG91bGQgYmUgc2VsZWN0ZWQgd2hlbiBlbXB0eSBzdHJpbmdzIGZvbGxvdyBePSBvciAkPSBvciAqPVxuXHRcdFx0Ly8gVGhlIHRlc3QgYXR0cmlidXRlIG11c3QgYmUgdW5rbm93biBpbiBPcGVyYSBidXQgXCJzYWZlXCIgZm9yIFdpblJUXG5cdFx0XHQvLyBodHRwOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvaWUvaGg0NjUzODguYXNweCNhdHRyaWJ1dGVfc2VjdGlvblxuXHRcdFx0aWYgKCBkaXYucXVlcnlTZWxlY3RvckFsbChcIlttc2FsbG93Y2FwdHVyZV49JyddXCIpLmxlbmd0aCApIHtcblx0XHRcdFx0cmJ1Z2d5UVNBLnB1c2goIFwiWypeJF09XCIgKyB3aGl0ZXNwYWNlICsgXCIqKD86Jyd8XFxcIlxcXCIpXCIgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gU3VwcG9ydDogSUU4XG5cdFx0XHQvLyBCb29sZWFuIGF0dHJpYnV0ZXMgYW5kIFwidmFsdWVcIiBhcmUgbm90IHRyZWF0ZWQgY29ycmVjdGx5XG5cdFx0XHRpZiAoICFkaXYucXVlcnlTZWxlY3RvckFsbChcIltzZWxlY3RlZF1cIikubGVuZ3RoICkge1xuXHRcdFx0XHRyYnVnZ3lRU0EucHVzaCggXCJcXFxcW1wiICsgd2hpdGVzcGFjZSArIFwiKig/OnZhbHVlfFwiICsgYm9vbGVhbnMgKyBcIilcIiApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBTdXBwb3J0OiBDaHJvbWU8MjksIEFuZHJvaWQ8NC40LCBTYWZhcmk8Ny4wKywgaU9TPDcuMCssIFBoYW50b21KUzwxLjkuOCtcblx0XHRcdGlmICggIWRpdi5xdWVyeVNlbGVjdG9yQWxsKCBcIltpZH49XCIgKyBleHBhbmRvICsgXCItXVwiICkubGVuZ3RoICkge1xuXHRcdFx0XHRyYnVnZ3lRU0EucHVzaChcIn49XCIpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBXZWJraXQvT3BlcmEgLSA6Y2hlY2tlZCBzaG91bGQgcmV0dXJuIHNlbGVjdGVkIG9wdGlvbiBlbGVtZW50c1xuXHRcdFx0Ly8gaHR0cDovL3d3dy53My5vcmcvVFIvMjAxMS9SRUMtY3NzMy1zZWxlY3RvcnMtMjAxMTA5MjkvI2NoZWNrZWRcblx0XHRcdC8vIElFOCB0aHJvd3MgZXJyb3IgaGVyZSBhbmQgd2lsbCBub3Qgc2VlIGxhdGVyIHRlc3RzXG5cdFx0XHRpZiAoICFkaXYucXVlcnlTZWxlY3RvckFsbChcIjpjaGVja2VkXCIpLmxlbmd0aCApIHtcblx0XHRcdFx0cmJ1Z2d5UVNBLnB1c2goXCI6Y2hlY2tlZFwiKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gU3VwcG9ydDogU2FmYXJpIDgrLCBpT1MgOCtcblx0XHRcdC8vIGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD0xMzY4NTFcblx0XHRcdC8vIEluLXBhZ2UgYHNlbGVjdG9yI2lkIHNpYmluZy1jb21iaW5hdG9yIHNlbGVjdG9yYCBmYWlsc1xuXHRcdFx0aWYgKCAhZGl2LnF1ZXJ5U2VsZWN0b3JBbGwoIFwiYSNcIiArIGV4cGFuZG8gKyBcIisqXCIgKS5sZW5ndGggKSB7XG5cdFx0XHRcdHJidWdneVFTQS5wdXNoKFwiLiMuK1srfl1cIik7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRhc3NlcnQoZnVuY3Rpb24oIGRpdiApIHtcblx0XHRcdC8vIFN1cHBvcnQ6IFdpbmRvd3MgOCBOYXRpdmUgQXBwc1xuXHRcdFx0Ly8gVGhlIHR5cGUgYW5kIG5hbWUgYXR0cmlidXRlcyBhcmUgcmVzdHJpY3RlZCBkdXJpbmcgLmlubmVySFRNTCBhc3NpZ25tZW50XG5cdFx0XHR2YXIgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG5cdFx0XHRpbnB1dC5zZXRBdHRyaWJ1dGUoIFwidHlwZVwiLCBcImhpZGRlblwiICk7XG5cdFx0XHRkaXYuYXBwZW5kQ2hpbGQoIGlucHV0ICkuc2V0QXR0cmlidXRlKCBcIm5hbWVcIiwgXCJEXCIgKTtcblxuXHRcdFx0Ly8gU3VwcG9ydDogSUU4XG5cdFx0XHQvLyBFbmZvcmNlIGNhc2Utc2Vuc2l0aXZpdHkgb2YgbmFtZSBhdHRyaWJ1dGVcblx0XHRcdGlmICggZGl2LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbbmFtZT1kXVwiKS5sZW5ndGggKSB7XG5cdFx0XHRcdHJidWdneVFTQS5wdXNoKCBcIm5hbWVcIiArIHdoaXRlc3BhY2UgKyBcIipbKl4kfCF+XT89XCIgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gRkYgMy41IC0gOmVuYWJsZWQvOmRpc2FibGVkIGFuZCBoaWRkZW4gZWxlbWVudHMgKGhpZGRlbiBlbGVtZW50cyBhcmUgc3RpbGwgZW5hYmxlZClcblx0XHRcdC8vIElFOCB0aHJvd3MgZXJyb3IgaGVyZSBhbmQgd2lsbCBub3Qgc2VlIGxhdGVyIHRlc3RzXG5cdFx0XHRpZiAoICFkaXYucXVlcnlTZWxlY3RvckFsbChcIjplbmFibGVkXCIpLmxlbmd0aCApIHtcblx0XHRcdFx0cmJ1Z2d5UVNBLnB1c2goIFwiOmVuYWJsZWRcIiwgXCI6ZGlzYWJsZWRcIiApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBPcGVyYSAxMC0xMSBkb2VzIG5vdCB0aHJvdyBvbiBwb3N0LWNvbW1hIGludmFsaWQgcHNldWRvc1xuXHRcdFx0ZGl2LnF1ZXJ5U2VsZWN0b3JBbGwoXCIqLDp4XCIpO1xuXHRcdFx0cmJ1Z2d5UVNBLnB1c2goXCIsLio6XCIpO1xuXHRcdH0pO1xuXHR9XG5cblx0aWYgKCAoc3VwcG9ydC5tYXRjaGVzU2VsZWN0b3IgPSBybmF0aXZlLnRlc3QoIChtYXRjaGVzID0gZG9jRWxlbS5tYXRjaGVzIHx8XG5cdFx0ZG9jRWxlbS53ZWJraXRNYXRjaGVzU2VsZWN0b3IgfHxcblx0XHRkb2NFbGVtLm1vek1hdGNoZXNTZWxlY3RvciB8fFxuXHRcdGRvY0VsZW0ub01hdGNoZXNTZWxlY3RvciB8fFxuXHRcdGRvY0VsZW0ubXNNYXRjaGVzU2VsZWN0b3IpICkpICkge1xuXG5cdFx0YXNzZXJ0KGZ1bmN0aW9uKCBkaXYgKSB7XG5cdFx0XHQvLyBDaGVjayB0byBzZWUgaWYgaXQncyBwb3NzaWJsZSB0byBkbyBtYXRjaGVzU2VsZWN0b3Jcblx0XHRcdC8vIG9uIGEgZGlzY29ubmVjdGVkIG5vZGUgKElFIDkpXG5cdFx0XHRzdXBwb3J0LmRpc2Nvbm5lY3RlZE1hdGNoID0gbWF0Y2hlcy5jYWxsKCBkaXYsIFwiZGl2XCIgKTtcblxuXHRcdFx0Ly8gVGhpcyBzaG91bGQgZmFpbCB3aXRoIGFuIGV4Y2VwdGlvblxuXHRcdFx0Ly8gR2Vja28gZG9lcyBub3QgZXJyb3IsIHJldHVybnMgZmFsc2UgaW5zdGVhZFxuXHRcdFx0bWF0Y2hlcy5jYWxsKCBkaXYsIFwiW3MhPScnXTp4XCIgKTtcblx0XHRcdHJidWdneU1hdGNoZXMucHVzaCggXCIhPVwiLCBwc2V1ZG9zICk7XG5cdFx0fSk7XG5cdH1cblxuXHRyYnVnZ3lRU0EgPSByYnVnZ3lRU0EubGVuZ3RoICYmIG5ldyBSZWdFeHAoIHJidWdneVFTQS5qb2luKFwifFwiKSApO1xuXHRyYnVnZ3lNYXRjaGVzID0gcmJ1Z2d5TWF0Y2hlcy5sZW5ndGggJiYgbmV3IFJlZ0V4cCggcmJ1Z2d5TWF0Y2hlcy5qb2luKFwifFwiKSApO1xuXG5cdC8qIENvbnRhaW5zXG5cdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblx0aGFzQ29tcGFyZSA9IHJuYXRpdmUudGVzdCggZG9jRWxlbS5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbiApO1xuXG5cdC8vIEVsZW1lbnQgY29udGFpbnMgYW5vdGhlclxuXHQvLyBQdXJwb3NlZnVsbHkgc2VsZi1leGNsdXNpdmVcblx0Ly8gQXMgaW4sIGFuIGVsZW1lbnQgZG9lcyBub3QgY29udGFpbiBpdHNlbGZcblx0Y29udGFpbnMgPSBoYXNDb21wYXJlIHx8IHJuYXRpdmUudGVzdCggZG9jRWxlbS5jb250YWlucyApID9cblx0XHRmdW5jdGlvbiggYSwgYiApIHtcblx0XHRcdHZhciBhZG93biA9IGEubm9kZVR5cGUgPT09IDkgPyBhLmRvY3VtZW50RWxlbWVudCA6IGEsXG5cdFx0XHRcdGJ1cCA9IGIgJiYgYi5wYXJlbnROb2RlO1xuXHRcdFx0cmV0dXJuIGEgPT09IGJ1cCB8fCAhISggYnVwICYmIGJ1cC5ub2RlVHlwZSA9PT0gMSAmJiAoXG5cdFx0XHRcdGFkb3duLmNvbnRhaW5zID9cblx0XHRcdFx0XHRhZG93bi5jb250YWlucyggYnVwICkgOlxuXHRcdFx0XHRcdGEuY29tcGFyZURvY3VtZW50UG9zaXRpb24gJiYgYS5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbiggYnVwICkgJiAxNlxuXHRcdFx0KSk7XG5cdFx0fSA6XG5cdFx0ZnVuY3Rpb24oIGEsIGIgKSB7XG5cdFx0XHRpZiAoIGIgKSB7XG5cdFx0XHRcdHdoaWxlICggKGIgPSBiLnBhcmVudE5vZGUpICkge1xuXHRcdFx0XHRcdGlmICggYiA9PT0gYSApIHtcblx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH07XG5cblx0LyogU29ydGluZ1xuXHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cblx0Ly8gRG9jdW1lbnQgb3JkZXIgc29ydGluZ1xuXHRzb3J0T3JkZXIgPSBoYXNDb21wYXJlID9cblx0ZnVuY3Rpb24oIGEsIGIgKSB7XG5cblx0XHQvLyBGbGFnIGZvciBkdXBsaWNhdGUgcmVtb3ZhbFxuXHRcdGlmICggYSA9PT0gYiApIHtcblx0XHRcdGhhc0R1cGxpY2F0ZSA9IHRydWU7XG5cdFx0XHRyZXR1cm4gMDtcblx0XHR9XG5cblx0XHQvLyBTb3J0IG9uIG1ldGhvZCBleGlzdGVuY2UgaWYgb25seSBvbmUgaW5wdXQgaGFzIGNvbXBhcmVEb2N1bWVudFBvc2l0aW9uXG5cdFx0dmFyIGNvbXBhcmUgPSAhYS5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbiAtICFiLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uO1xuXHRcdGlmICggY29tcGFyZSApIHtcblx0XHRcdHJldHVybiBjb21wYXJlO1xuXHRcdH1cblxuXHRcdC8vIENhbGN1bGF0ZSBwb3NpdGlvbiBpZiBib3RoIGlucHV0cyBiZWxvbmcgdG8gdGhlIHNhbWUgZG9jdW1lbnRcblx0XHRjb21wYXJlID0gKCBhLm93bmVyRG9jdW1lbnQgfHwgYSApID09PSAoIGIub3duZXJEb2N1bWVudCB8fCBiICkgP1xuXHRcdFx0YS5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbiggYiApIDpcblxuXHRcdFx0Ly8gT3RoZXJ3aXNlIHdlIGtub3cgdGhleSBhcmUgZGlzY29ubmVjdGVkXG5cdFx0XHQxO1xuXG5cdFx0Ly8gRGlzY29ubmVjdGVkIG5vZGVzXG5cdFx0aWYgKCBjb21wYXJlICYgMSB8fFxuXHRcdFx0KCFzdXBwb3J0LnNvcnREZXRhY2hlZCAmJiBiLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uKCBhICkgPT09IGNvbXBhcmUpICkge1xuXG5cdFx0XHQvLyBDaG9vc2UgdGhlIGZpcnN0IGVsZW1lbnQgdGhhdCBpcyByZWxhdGVkIHRvIG91ciBwcmVmZXJyZWQgZG9jdW1lbnRcblx0XHRcdGlmICggYSA9PT0gZG9jdW1lbnQgfHwgYS5vd25lckRvY3VtZW50ID09PSBwcmVmZXJyZWREb2MgJiYgY29udGFpbnMocHJlZmVycmVkRG9jLCBhKSApIHtcblx0XHRcdFx0cmV0dXJuIC0xO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCBiID09PSBkb2N1bWVudCB8fCBiLm93bmVyRG9jdW1lbnQgPT09IHByZWZlcnJlZERvYyAmJiBjb250YWlucyhwcmVmZXJyZWREb2MsIGIpICkge1xuXHRcdFx0XHRyZXR1cm4gMTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gTWFpbnRhaW4gb3JpZ2luYWwgb3JkZXJcblx0XHRcdHJldHVybiBzb3J0SW5wdXQgP1xuXHRcdFx0XHQoIGluZGV4T2YoIHNvcnRJbnB1dCwgYSApIC0gaW5kZXhPZiggc29ydElucHV0LCBiICkgKSA6XG5cdFx0XHRcdDA7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGNvbXBhcmUgJiA0ID8gLTEgOiAxO1xuXHR9IDpcblx0ZnVuY3Rpb24oIGEsIGIgKSB7XG5cdFx0Ly8gRXhpdCBlYXJseSBpZiB0aGUgbm9kZXMgYXJlIGlkZW50aWNhbFxuXHRcdGlmICggYSA9PT0gYiApIHtcblx0XHRcdGhhc0R1cGxpY2F0ZSA9IHRydWU7XG5cdFx0XHRyZXR1cm4gMDtcblx0XHR9XG5cblx0XHR2YXIgY3VyLFxuXHRcdFx0aSA9IDAsXG5cdFx0XHRhdXAgPSBhLnBhcmVudE5vZGUsXG5cdFx0XHRidXAgPSBiLnBhcmVudE5vZGUsXG5cdFx0XHRhcCA9IFsgYSBdLFxuXHRcdFx0YnAgPSBbIGIgXTtcblxuXHRcdC8vIFBhcmVudGxlc3Mgbm9kZXMgYXJlIGVpdGhlciBkb2N1bWVudHMgb3IgZGlzY29ubmVjdGVkXG5cdFx0aWYgKCAhYXVwIHx8ICFidXAgKSB7XG5cdFx0XHRyZXR1cm4gYSA9PT0gZG9jdW1lbnQgPyAtMSA6XG5cdFx0XHRcdGIgPT09IGRvY3VtZW50ID8gMSA6XG5cdFx0XHRcdGF1cCA/IC0xIDpcblx0XHRcdFx0YnVwID8gMSA6XG5cdFx0XHRcdHNvcnRJbnB1dCA/XG5cdFx0XHRcdCggaW5kZXhPZiggc29ydElucHV0LCBhICkgLSBpbmRleE9mKCBzb3J0SW5wdXQsIGIgKSApIDpcblx0XHRcdFx0MDtcblxuXHRcdC8vIElmIHRoZSBub2RlcyBhcmUgc2libGluZ3MsIHdlIGNhbiBkbyBhIHF1aWNrIGNoZWNrXG5cdFx0fSBlbHNlIGlmICggYXVwID09PSBidXAgKSB7XG5cdFx0XHRyZXR1cm4gc2libGluZ0NoZWNrKCBhLCBiICk7XG5cdFx0fVxuXG5cdFx0Ly8gT3RoZXJ3aXNlIHdlIG5lZWQgZnVsbCBsaXN0cyBvZiB0aGVpciBhbmNlc3RvcnMgZm9yIGNvbXBhcmlzb25cblx0XHRjdXIgPSBhO1xuXHRcdHdoaWxlICggKGN1ciA9IGN1ci5wYXJlbnROb2RlKSApIHtcblx0XHRcdGFwLnVuc2hpZnQoIGN1ciApO1xuXHRcdH1cblx0XHRjdXIgPSBiO1xuXHRcdHdoaWxlICggKGN1ciA9IGN1ci5wYXJlbnROb2RlKSApIHtcblx0XHRcdGJwLnVuc2hpZnQoIGN1ciApO1xuXHRcdH1cblxuXHRcdC8vIFdhbGsgZG93biB0aGUgdHJlZSBsb29raW5nIGZvciBhIGRpc2NyZXBhbmN5XG5cdFx0d2hpbGUgKCBhcFtpXSA9PT0gYnBbaV0gKSB7XG5cdFx0XHRpKys7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGkgP1xuXHRcdFx0Ly8gRG8gYSBzaWJsaW5nIGNoZWNrIGlmIHRoZSBub2RlcyBoYXZlIGEgY29tbW9uIGFuY2VzdG9yXG5cdFx0XHRzaWJsaW5nQ2hlY2soIGFwW2ldLCBicFtpXSApIDpcblxuXHRcdFx0Ly8gT3RoZXJ3aXNlIG5vZGVzIGluIG91ciBkb2N1bWVudCBzb3J0IGZpcnN0XG5cdFx0XHRhcFtpXSA9PT0gcHJlZmVycmVkRG9jID8gLTEgOlxuXHRcdFx0YnBbaV0gPT09IHByZWZlcnJlZERvYyA/IDEgOlxuXHRcdFx0MDtcblx0fTtcblxuXHRyZXR1cm4gZG9jdW1lbnQ7XG59O1xuXG5TaXp6bGUubWF0Y2hlcyA9IGZ1bmN0aW9uKCBleHByLCBlbGVtZW50cyApIHtcblx0cmV0dXJuIFNpenpsZSggZXhwciwgbnVsbCwgbnVsbCwgZWxlbWVudHMgKTtcbn07XG5cblNpenpsZS5tYXRjaGVzU2VsZWN0b3IgPSBmdW5jdGlvbiggZWxlbSwgZXhwciApIHtcblx0Ly8gU2V0IGRvY3VtZW50IHZhcnMgaWYgbmVlZGVkXG5cdGlmICggKCBlbGVtLm93bmVyRG9jdW1lbnQgfHwgZWxlbSApICE9PSBkb2N1bWVudCApIHtcblx0XHRzZXREb2N1bWVudCggZWxlbSApO1xuXHR9XG5cblx0Ly8gTWFrZSBzdXJlIHRoYXQgYXR0cmlidXRlIHNlbGVjdG9ycyBhcmUgcXVvdGVkXG5cdGV4cHIgPSBleHByLnJlcGxhY2UoIHJhdHRyaWJ1dGVRdW90ZXMsIFwiPSckMSddXCIgKTtcblxuXHRpZiAoIHN1cHBvcnQubWF0Y2hlc1NlbGVjdG9yICYmIGRvY3VtZW50SXNIVE1MICYmXG5cdFx0IWNvbXBpbGVyQ2FjaGVbIGV4cHIgKyBcIiBcIiBdICYmXG5cdFx0KCAhcmJ1Z2d5TWF0Y2hlcyB8fCAhcmJ1Z2d5TWF0Y2hlcy50ZXN0KCBleHByICkgKSAmJlxuXHRcdCggIXJidWdneVFTQSAgICAgfHwgIXJidWdneVFTQS50ZXN0KCBleHByICkgKSApIHtcblxuXHRcdHRyeSB7XG5cdFx0XHR2YXIgcmV0ID0gbWF0Y2hlcy5jYWxsKCBlbGVtLCBleHByICk7XG5cblx0XHRcdC8vIElFIDkncyBtYXRjaGVzU2VsZWN0b3IgcmV0dXJucyBmYWxzZSBvbiBkaXNjb25uZWN0ZWQgbm9kZXNcblx0XHRcdGlmICggcmV0IHx8IHN1cHBvcnQuZGlzY29ubmVjdGVkTWF0Y2ggfHxcblx0XHRcdFx0XHQvLyBBcyB3ZWxsLCBkaXNjb25uZWN0ZWQgbm9kZXMgYXJlIHNhaWQgdG8gYmUgaW4gYSBkb2N1bWVudFxuXHRcdFx0XHRcdC8vIGZyYWdtZW50IGluIElFIDlcblx0XHRcdFx0XHRlbGVtLmRvY3VtZW50ICYmIGVsZW0uZG9jdW1lbnQubm9kZVR5cGUgIT09IDExICkge1xuXHRcdFx0XHRyZXR1cm4gcmV0O1xuXHRcdFx0fVxuXHRcdH0gY2F0Y2ggKGUpIHt9XG5cdH1cblxuXHRyZXR1cm4gU2l6emxlKCBleHByLCBkb2N1bWVudCwgbnVsbCwgWyBlbGVtIF0gKS5sZW5ndGggPiAwO1xufTtcblxuU2l6emxlLmNvbnRhaW5zID0gZnVuY3Rpb24oIGNvbnRleHQsIGVsZW0gKSB7XG5cdC8vIFNldCBkb2N1bWVudCB2YXJzIGlmIG5lZWRlZFxuXHRpZiAoICggY29udGV4dC5vd25lckRvY3VtZW50IHx8IGNvbnRleHQgKSAhPT0gZG9jdW1lbnQgKSB7XG5cdFx0c2V0RG9jdW1lbnQoIGNvbnRleHQgKTtcblx0fVxuXHRyZXR1cm4gY29udGFpbnMoIGNvbnRleHQsIGVsZW0gKTtcbn07XG5cblNpenpsZS5hdHRyID0gZnVuY3Rpb24oIGVsZW0sIG5hbWUgKSB7XG5cdC8vIFNldCBkb2N1bWVudCB2YXJzIGlmIG5lZWRlZFxuXHRpZiAoICggZWxlbS5vd25lckRvY3VtZW50IHx8IGVsZW0gKSAhPT0gZG9jdW1lbnQgKSB7XG5cdFx0c2V0RG9jdW1lbnQoIGVsZW0gKTtcblx0fVxuXG5cdHZhciBmbiA9IEV4cHIuYXR0ckhhbmRsZVsgbmFtZS50b0xvd2VyQ2FzZSgpIF0sXG5cdFx0Ly8gRG9uJ3QgZ2V0IGZvb2xlZCBieSBPYmplY3QucHJvdG90eXBlIHByb3BlcnRpZXMgKGpRdWVyeSAjMTM4MDcpXG5cdFx0dmFsID0gZm4gJiYgaGFzT3duLmNhbGwoIEV4cHIuYXR0ckhhbmRsZSwgbmFtZS50b0xvd2VyQ2FzZSgpICkgP1xuXHRcdFx0Zm4oIGVsZW0sIG5hbWUsICFkb2N1bWVudElzSFRNTCApIDpcblx0XHRcdHVuZGVmaW5lZDtcblxuXHRyZXR1cm4gdmFsICE9PSB1bmRlZmluZWQgP1xuXHRcdHZhbCA6XG5cdFx0c3VwcG9ydC5hdHRyaWJ1dGVzIHx8ICFkb2N1bWVudElzSFRNTCA/XG5cdFx0XHRlbGVtLmdldEF0dHJpYnV0ZSggbmFtZSApIDpcblx0XHRcdCh2YWwgPSBlbGVtLmdldEF0dHJpYnV0ZU5vZGUobmFtZSkpICYmIHZhbC5zcGVjaWZpZWQgP1xuXHRcdFx0XHR2YWwudmFsdWUgOlxuXHRcdFx0XHRudWxsO1xufTtcblxuU2l6emxlLmVycm9yID0gZnVuY3Rpb24oIG1zZyApIHtcblx0dGhyb3cgbmV3IEVycm9yKCBcIlN5bnRheCBlcnJvciwgdW5yZWNvZ25pemVkIGV4cHJlc3Npb246IFwiICsgbXNnICk7XG59O1xuXG4vKipcbiAqIERvY3VtZW50IHNvcnRpbmcgYW5kIHJlbW92aW5nIGR1cGxpY2F0ZXNcbiAqIEBwYXJhbSB7QXJyYXlMaWtlfSByZXN1bHRzXG4gKi9cblNpenpsZS51bmlxdWVTb3J0ID0gZnVuY3Rpb24oIHJlc3VsdHMgKSB7XG5cdHZhciBlbGVtLFxuXHRcdGR1cGxpY2F0ZXMgPSBbXSxcblx0XHRqID0gMCxcblx0XHRpID0gMDtcblxuXHQvLyBVbmxlc3Mgd2UgKmtub3cqIHdlIGNhbiBkZXRlY3QgZHVwbGljYXRlcywgYXNzdW1lIHRoZWlyIHByZXNlbmNlXG5cdGhhc0R1cGxpY2F0ZSA9ICFzdXBwb3J0LmRldGVjdER1cGxpY2F0ZXM7XG5cdHNvcnRJbnB1dCA9ICFzdXBwb3J0LnNvcnRTdGFibGUgJiYgcmVzdWx0cy5zbGljZSggMCApO1xuXHRyZXN1bHRzLnNvcnQoIHNvcnRPcmRlciApO1xuXG5cdGlmICggaGFzRHVwbGljYXRlICkge1xuXHRcdHdoaWxlICggKGVsZW0gPSByZXN1bHRzW2krK10pICkge1xuXHRcdFx0aWYgKCBlbGVtID09PSByZXN1bHRzWyBpIF0gKSB7XG5cdFx0XHRcdGogPSBkdXBsaWNhdGVzLnB1c2goIGkgKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0d2hpbGUgKCBqLS0gKSB7XG5cdFx0XHRyZXN1bHRzLnNwbGljZSggZHVwbGljYXRlc1sgaiBdLCAxICk7XG5cdFx0fVxuXHR9XG5cblx0Ly8gQ2xlYXIgaW5wdXQgYWZ0ZXIgc29ydGluZyB0byByZWxlYXNlIG9iamVjdHNcblx0Ly8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9qcXVlcnkvc2l6emxlL3B1bGwvMjI1XG5cdHNvcnRJbnB1dCA9IG51bGw7XG5cblx0cmV0dXJuIHJlc3VsdHM7XG59O1xuXG4vKipcbiAqIFV0aWxpdHkgZnVuY3Rpb24gZm9yIHJldHJpZXZpbmcgdGhlIHRleHQgdmFsdWUgb2YgYW4gYXJyYXkgb2YgRE9NIG5vZGVzXG4gKiBAcGFyYW0ge0FycmF5fEVsZW1lbnR9IGVsZW1cbiAqL1xuZ2V0VGV4dCA9IFNpenpsZS5nZXRUZXh0ID0gZnVuY3Rpb24oIGVsZW0gKSB7XG5cdHZhciBub2RlLFxuXHRcdHJldCA9IFwiXCIsXG5cdFx0aSA9IDAsXG5cdFx0bm9kZVR5cGUgPSBlbGVtLm5vZGVUeXBlO1xuXG5cdGlmICggIW5vZGVUeXBlICkge1xuXHRcdC8vIElmIG5vIG5vZGVUeXBlLCB0aGlzIGlzIGV4cGVjdGVkIHRvIGJlIGFuIGFycmF5XG5cdFx0d2hpbGUgKCAobm9kZSA9IGVsZW1baSsrXSkgKSB7XG5cdFx0XHQvLyBEbyBub3QgdHJhdmVyc2UgY29tbWVudCBub2Rlc1xuXHRcdFx0cmV0ICs9IGdldFRleHQoIG5vZGUgKTtcblx0XHR9XG5cdH0gZWxzZSBpZiAoIG5vZGVUeXBlID09PSAxIHx8IG5vZGVUeXBlID09PSA5IHx8IG5vZGVUeXBlID09PSAxMSApIHtcblx0XHQvLyBVc2UgdGV4dENvbnRlbnQgZm9yIGVsZW1lbnRzXG5cdFx0Ly8gaW5uZXJUZXh0IHVzYWdlIHJlbW92ZWQgZm9yIGNvbnNpc3RlbmN5IG9mIG5ldyBsaW5lcyAoalF1ZXJ5ICMxMTE1Mylcblx0XHRpZiAoIHR5cGVvZiBlbGVtLnRleHRDb250ZW50ID09PSBcInN0cmluZ1wiICkge1xuXHRcdFx0cmV0dXJuIGVsZW0udGV4dENvbnRlbnQ7XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIFRyYXZlcnNlIGl0cyBjaGlsZHJlblxuXHRcdFx0Zm9yICggZWxlbSA9IGVsZW0uZmlyc3RDaGlsZDsgZWxlbTsgZWxlbSA9IGVsZW0ubmV4dFNpYmxpbmcgKSB7XG5cdFx0XHRcdHJldCArPSBnZXRUZXh0KCBlbGVtICk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9IGVsc2UgaWYgKCBub2RlVHlwZSA9PT0gMyB8fCBub2RlVHlwZSA9PT0gNCApIHtcblx0XHRyZXR1cm4gZWxlbS5ub2RlVmFsdWU7XG5cdH1cblx0Ly8gRG8gbm90IGluY2x1ZGUgY29tbWVudCBvciBwcm9jZXNzaW5nIGluc3RydWN0aW9uIG5vZGVzXG5cblx0cmV0dXJuIHJldDtcbn07XG5cbkV4cHIgPSBTaXp6bGUuc2VsZWN0b3JzID0ge1xuXG5cdC8vIENhbiBiZSBhZGp1c3RlZCBieSB0aGUgdXNlclxuXHRjYWNoZUxlbmd0aDogNTAsXG5cblx0Y3JlYXRlUHNldWRvOiBtYXJrRnVuY3Rpb24sXG5cblx0bWF0Y2g6IG1hdGNoRXhwcixcblxuXHRhdHRySGFuZGxlOiB7fSxcblxuXHRmaW5kOiB7fSxcblxuXHRyZWxhdGl2ZToge1xuXHRcdFwiPlwiOiB7IGRpcjogXCJwYXJlbnROb2RlXCIsIGZpcnN0OiB0cnVlIH0sXG5cdFx0XCIgXCI6IHsgZGlyOiBcInBhcmVudE5vZGVcIiB9LFxuXHRcdFwiK1wiOiB7IGRpcjogXCJwcmV2aW91c1NpYmxpbmdcIiwgZmlyc3Q6IHRydWUgfSxcblx0XHRcIn5cIjogeyBkaXI6IFwicHJldmlvdXNTaWJsaW5nXCIgfVxuXHR9LFxuXG5cdHByZUZpbHRlcjoge1xuXHRcdFwiQVRUUlwiOiBmdW5jdGlvbiggbWF0Y2ggKSB7XG5cdFx0XHRtYXRjaFsxXSA9IG1hdGNoWzFdLnJlcGxhY2UoIHJ1bmVzY2FwZSwgZnVuZXNjYXBlICk7XG5cblx0XHRcdC8vIE1vdmUgdGhlIGdpdmVuIHZhbHVlIHRvIG1hdGNoWzNdIHdoZXRoZXIgcXVvdGVkIG9yIHVucXVvdGVkXG5cdFx0XHRtYXRjaFszXSA9ICggbWF0Y2hbM10gfHwgbWF0Y2hbNF0gfHwgbWF0Y2hbNV0gfHwgXCJcIiApLnJlcGxhY2UoIHJ1bmVzY2FwZSwgZnVuZXNjYXBlICk7XG5cblx0XHRcdGlmICggbWF0Y2hbMl0gPT09IFwifj1cIiApIHtcblx0XHRcdFx0bWF0Y2hbM10gPSBcIiBcIiArIG1hdGNoWzNdICsgXCIgXCI7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBtYXRjaC5zbGljZSggMCwgNCApO1xuXHRcdH0sXG5cblx0XHRcIkNISUxEXCI6IGZ1bmN0aW9uKCBtYXRjaCApIHtcblx0XHRcdC8qIG1hdGNoZXMgZnJvbSBtYXRjaEV4cHJbXCJDSElMRFwiXVxuXHRcdFx0XHQxIHR5cGUgKG9ubHl8bnRofC4uLilcblx0XHRcdFx0MiB3aGF0IChjaGlsZHxvZi10eXBlKVxuXHRcdFx0XHQzIGFyZ3VtZW50IChldmVufG9kZHxcXGQqfFxcZCpuKFsrLV1cXGQrKT98Li4uKVxuXHRcdFx0XHQ0IHhuLWNvbXBvbmVudCBvZiB4bit5IGFyZ3VtZW50IChbKy1dP1xcZCpufClcblx0XHRcdFx0NSBzaWduIG9mIHhuLWNvbXBvbmVudFxuXHRcdFx0XHQ2IHggb2YgeG4tY29tcG9uZW50XG5cdFx0XHRcdDcgc2lnbiBvZiB5LWNvbXBvbmVudFxuXHRcdFx0XHQ4IHkgb2YgeS1jb21wb25lbnRcblx0XHRcdCovXG5cdFx0XHRtYXRjaFsxXSA9IG1hdGNoWzFdLnRvTG93ZXJDYXNlKCk7XG5cblx0XHRcdGlmICggbWF0Y2hbMV0uc2xpY2UoIDAsIDMgKSA9PT0gXCJudGhcIiApIHtcblx0XHRcdFx0Ly8gbnRoLSogcmVxdWlyZXMgYXJndW1lbnRcblx0XHRcdFx0aWYgKCAhbWF0Y2hbM10gKSB7XG5cdFx0XHRcdFx0U2l6emxlLmVycm9yKCBtYXRjaFswXSApO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gbnVtZXJpYyB4IGFuZCB5IHBhcmFtZXRlcnMgZm9yIEV4cHIuZmlsdGVyLkNISUxEXG5cdFx0XHRcdC8vIHJlbWVtYmVyIHRoYXQgZmFsc2UvdHJ1ZSBjYXN0IHJlc3BlY3RpdmVseSB0byAwLzFcblx0XHRcdFx0bWF0Y2hbNF0gPSArKCBtYXRjaFs0XSA/IG1hdGNoWzVdICsgKG1hdGNoWzZdIHx8IDEpIDogMiAqICggbWF0Y2hbM10gPT09IFwiZXZlblwiIHx8IG1hdGNoWzNdID09PSBcIm9kZFwiICkgKTtcblx0XHRcdFx0bWF0Y2hbNV0gPSArKCAoIG1hdGNoWzddICsgbWF0Y2hbOF0gKSB8fCBtYXRjaFszXSA9PT0gXCJvZGRcIiApO1xuXG5cdFx0XHQvLyBvdGhlciB0eXBlcyBwcm9oaWJpdCBhcmd1bWVudHNcblx0XHRcdH0gZWxzZSBpZiAoIG1hdGNoWzNdICkge1xuXHRcdFx0XHRTaXp6bGUuZXJyb3IoIG1hdGNoWzBdICk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBtYXRjaDtcblx0XHR9LFxuXG5cdFx0XCJQU0VVRE9cIjogZnVuY3Rpb24oIG1hdGNoICkge1xuXHRcdFx0dmFyIGV4Y2Vzcyxcblx0XHRcdFx0dW5xdW90ZWQgPSAhbWF0Y2hbNl0gJiYgbWF0Y2hbMl07XG5cblx0XHRcdGlmICggbWF0Y2hFeHByW1wiQ0hJTERcIl0udGVzdCggbWF0Y2hbMF0gKSApIHtcblx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHR9XG5cblx0XHRcdC8vIEFjY2VwdCBxdW90ZWQgYXJndW1lbnRzIGFzLWlzXG5cdFx0XHRpZiAoIG1hdGNoWzNdICkge1xuXHRcdFx0XHRtYXRjaFsyXSA9IG1hdGNoWzRdIHx8IG1hdGNoWzVdIHx8IFwiXCI7XG5cblx0XHRcdC8vIFN0cmlwIGV4Y2VzcyBjaGFyYWN0ZXJzIGZyb20gdW5xdW90ZWQgYXJndW1lbnRzXG5cdFx0XHR9IGVsc2UgaWYgKCB1bnF1b3RlZCAmJiBycHNldWRvLnRlc3QoIHVucXVvdGVkICkgJiZcblx0XHRcdFx0Ly8gR2V0IGV4Y2VzcyBmcm9tIHRva2VuaXplIChyZWN1cnNpdmVseSlcblx0XHRcdFx0KGV4Y2VzcyA9IHRva2VuaXplKCB1bnF1b3RlZCwgdHJ1ZSApKSAmJlxuXHRcdFx0XHQvLyBhZHZhbmNlIHRvIHRoZSBuZXh0IGNsb3NpbmcgcGFyZW50aGVzaXNcblx0XHRcdFx0KGV4Y2VzcyA9IHVucXVvdGVkLmluZGV4T2YoIFwiKVwiLCB1bnF1b3RlZC5sZW5ndGggLSBleGNlc3MgKSAtIHVucXVvdGVkLmxlbmd0aCkgKSB7XG5cblx0XHRcdFx0Ly8gZXhjZXNzIGlzIGEgbmVnYXRpdmUgaW5kZXhcblx0XHRcdFx0bWF0Y2hbMF0gPSBtYXRjaFswXS5zbGljZSggMCwgZXhjZXNzICk7XG5cdFx0XHRcdG1hdGNoWzJdID0gdW5xdW90ZWQuc2xpY2UoIDAsIGV4Y2VzcyApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBSZXR1cm4gb25seSBjYXB0dXJlcyBuZWVkZWQgYnkgdGhlIHBzZXVkbyBmaWx0ZXIgbWV0aG9kICh0eXBlIGFuZCBhcmd1bWVudClcblx0XHRcdHJldHVybiBtYXRjaC5zbGljZSggMCwgMyApO1xuXHRcdH1cblx0fSxcblxuXHRmaWx0ZXI6IHtcblxuXHRcdFwiVEFHXCI6IGZ1bmN0aW9uKCBub2RlTmFtZVNlbGVjdG9yICkge1xuXHRcdFx0dmFyIG5vZGVOYW1lID0gbm9kZU5hbWVTZWxlY3Rvci5yZXBsYWNlKCBydW5lc2NhcGUsIGZ1bmVzY2FwZSApLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRyZXR1cm4gbm9kZU5hbWVTZWxlY3RvciA9PT0gXCIqXCIgP1xuXHRcdFx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIHRydWU7IH0gOlxuXHRcdFx0XHRmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdFx0XHRyZXR1cm4gZWxlbS5ub2RlTmFtZSAmJiBlbGVtLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09IG5vZGVOYW1lO1xuXHRcdFx0XHR9O1xuXHRcdH0sXG5cblx0XHRcIkNMQVNTXCI6IGZ1bmN0aW9uKCBjbGFzc05hbWUgKSB7XG5cdFx0XHR2YXIgcGF0dGVybiA9IGNsYXNzQ2FjaGVbIGNsYXNzTmFtZSArIFwiIFwiIF07XG5cblx0XHRcdHJldHVybiBwYXR0ZXJuIHx8XG5cdFx0XHRcdChwYXR0ZXJuID0gbmV3IFJlZ0V4cCggXCIoXnxcIiArIHdoaXRlc3BhY2UgKyBcIilcIiArIGNsYXNzTmFtZSArIFwiKFwiICsgd2hpdGVzcGFjZSArIFwifCQpXCIgKSkgJiZcblx0XHRcdFx0Y2xhc3NDYWNoZSggY2xhc3NOYW1lLCBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdFx0XHRyZXR1cm4gcGF0dGVybi50ZXN0KCB0eXBlb2YgZWxlbS5jbGFzc05hbWUgPT09IFwic3RyaW5nXCIgJiYgZWxlbS5jbGFzc05hbWUgfHwgdHlwZW9mIGVsZW0uZ2V0QXR0cmlidXRlICE9PSBcInVuZGVmaW5lZFwiICYmIGVsZW0uZ2V0QXR0cmlidXRlKFwiY2xhc3NcIikgfHwgXCJcIiApO1xuXHRcdFx0XHR9KTtcblx0XHR9LFxuXG5cdFx0XCJBVFRSXCI6IGZ1bmN0aW9uKCBuYW1lLCBvcGVyYXRvciwgY2hlY2sgKSB7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRcdHZhciByZXN1bHQgPSBTaXp6bGUuYXR0ciggZWxlbSwgbmFtZSApO1xuXG5cdFx0XHRcdGlmICggcmVzdWx0ID09IG51bGwgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIG9wZXJhdG9yID09PSBcIiE9XCI7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKCAhb3BlcmF0b3IgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXN1bHQgKz0gXCJcIjtcblxuXHRcdFx0XHRyZXR1cm4gb3BlcmF0b3IgPT09IFwiPVwiID8gcmVzdWx0ID09PSBjaGVjayA6XG5cdFx0XHRcdFx0b3BlcmF0b3IgPT09IFwiIT1cIiA/IHJlc3VsdCAhPT0gY2hlY2sgOlxuXHRcdFx0XHRcdG9wZXJhdG9yID09PSBcIl49XCIgPyBjaGVjayAmJiByZXN1bHQuaW5kZXhPZiggY2hlY2sgKSA9PT0gMCA6XG5cdFx0XHRcdFx0b3BlcmF0b3IgPT09IFwiKj1cIiA/IGNoZWNrICYmIHJlc3VsdC5pbmRleE9mKCBjaGVjayApID4gLTEgOlxuXHRcdFx0XHRcdG9wZXJhdG9yID09PSBcIiQ9XCIgPyBjaGVjayAmJiByZXN1bHQuc2xpY2UoIC1jaGVjay5sZW5ndGggKSA9PT0gY2hlY2sgOlxuXHRcdFx0XHRcdG9wZXJhdG9yID09PSBcIn49XCIgPyAoIFwiIFwiICsgcmVzdWx0LnJlcGxhY2UoIHJ3aGl0ZXNwYWNlLCBcIiBcIiApICsgXCIgXCIgKS5pbmRleE9mKCBjaGVjayApID4gLTEgOlxuXHRcdFx0XHRcdG9wZXJhdG9yID09PSBcInw9XCIgPyByZXN1bHQgPT09IGNoZWNrIHx8IHJlc3VsdC5zbGljZSggMCwgY2hlY2subGVuZ3RoICsgMSApID09PSBjaGVjayArIFwiLVwiIDpcblx0XHRcdFx0XHRmYWxzZTtcblx0XHRcdH07XG5cdFx0fSxcblxuXHRcdFwiQ0hJTERcIjogZnVuY3Rpb24oIHR5cGUsIHdoYXQsIGFyZ3VtZW50LCBmaXJzdCwgbGFzdCApIHtcblx0XHRcdHZhciBzaW1wbGUgPSB0eXBlLnNsaWNlKCAwLCAzICkgIT09IFwibnRoXCIsXG5cdFx0XHRcdGZvcndhcmQgPSB0eXBlLnNsaWNlKCAtNCApICE9PSBcImxhc3RcIixcblx0XHRcdFx0b2ZUeXBlID0gd2hhdCA9PT0gXCJvZi10eXBlXCI7XG5cblx0XHRcdHJldHVybiBmaXJzdCA9PT0gMSAmJiBsYXN0ID09PSAwID9cblxuXHRcdFx0XHQvLyBTaG9ydGN1dCBmb3IgOm50aC0qKG4pXG5cdFx0XHRcdGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0XHRcdHJldHVybiAhIWVsZW0ucGFyZW50Tm9kZTtcblx0XHRcdFx0fSA6XG5cblx0XHRcdFx0ZnVuY3Rpb24oIGVsZW0sIGNvbnRleHQsIHhtbCApIHtcblx0XHRcdFx0XHR2YXIgY2FjaGUsIHVuaXF1ZUNhY2hlLCBvdXRlckNhY2hlLCBub2RlLCBub2RlSW5kZXgsIHN0YXJ0LFxuXHRcdFx0XHRcdFx0ZGlyID0gc2ltcGxlICE9PSBmb3J3YXJkID8gXCJuZXh0U2libGluZ1wiIDogXCJwcmV2aW91c1NpYmxpbmdcIixcblx0XHRcdFx0XHRcdHBhcmVudCA9IGVsZW0ucGFyZW50Tm9kZSxcblx0XHRcdFx0XHRcdG5hbWUgPSBvZlR5cGUgJiYgZWxlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpLFxuXHRcdFx0XHRcdFx0dXNlQ2FjaGUgPSAheG1sICYmICFvZlR5cGUsXG5cdFx0XHRcdFx0XHRkaWZmID0gZmFsc2U7XG5cblx0XHRcdFx0XHRpZiAoIHBhcmVudCApIHtcblxuXHRcdFx0XHRcdFx0Ly8gOihmaXJzdHxsYXN0fG9ubHkpLShjaGlsZHxvZi10eXBlKVxuXHRcdFx0XHRcdFx0aWYgKCBzaW1wbGUgKSB7XG5cdFx0XHRcdFx0XHRcdHdoaWxlICggZGlyICkge1xuXHRcdFx0XHRcdFx0XHRcdG5vZGUgPSBlbGVtO1xuXHRcdFx0XHRcdFx0XHRcdHdoaWxlICggKG5vZGUgPSBub2RlWyBkaXIgXSkgKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoIG9mVHlwZSA/XG5cdFx0XHRcdFx0XHRcdFx0XHRcdG5vZGUubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gbmFtZSA6XG5cdFx0XHRcdFx0XHRcdFx0XHRcdG5vZGUubm9kZVR5cGUgPT09IDEgKSB7XG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHQvLyBSZXZlcnNlIGRpcmVjdGlvbiBmb3IgOm9ubHktKiAoaWYgd2UgaGF2ZW4ndCB5ZXQgZG9uZSBzbylcblx0XHRcdFx0XHRcdFx0XHRzdGFydCA9IGRpciA9IHR5cGUgPT09IFwib25seVwiICYmICFzdGFydCAmJiBcIm5leHRTaWJsaW5nXCI7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdHN0YXJ0ID0gWyBmb3J3YXJkID8gcGFyZW50LmZpcnN0Q2hpbGQgOiBwYXJlbnQubGFzdENoaWxkIF07XG5cblx0XHRcdFx0XHRcdC8vIG5vbi14bWwgOm50aC1jaGlsZCguLi4pIHN0b3JlcyBjYWNoZSBkYXRhIG9uIGBwYXJlbnRgXG5cdFx0XHRcdFx0XHRpZiAoIGZvcndhcmQgJiYgdXNlQ2FjaGUgKSB7XG5cblx0XHRcdFx0XHRcdFx0Ly8gU2VlayBgZWxlbWAgZnJvbSBhIHByZXZpb3VzbHktY2FjaGVkIGluZGV4XG5cblx0XHRcdFx0XHRcdFx0Ly8gLi4uaW4gYSBnemlwLWZyaWVuZGx5IHdheVxuXHRcdFx0XHRcdFx0XHRub2RlID0gcGFyZW50O1xuXHRcdFx0XHRcdFx0XHRvdXRlckNhY2hlID0gbm9kZVsgZXhwYW5kbyBdIHx8IChub2RlWyBleHBhbmRvIF0gPSB7fSk7XG5cblx0XHRcdFx0XHRcdFx0Ly8gU3VwcG9ydDogSUUgPDkgb25seVxuXHRcdFx0XHRcdFx0XHQvLyBEZWZlbmQgYWdhaW5zdCBjbG9uZWQgYXR0cm9wZXJ0aWVzIChqUXVlcnkgZ2gtMTcwOSlcblx0XHRcdFx0XHRcdFx0dW5pcXVlQ2FjaGUgPSBvdXRlckNhY2hlWyBub2RlLnVuaXF1ZUlEIF0gfHxcblx0XHRcdFx0XHRcdFx0XHQob3V0ZXJDYWNoZVsgbm9kZS51bmlxdWVJRCBdID0ge30pO1xuXG5cdFx0XHRcdFx0XHRcdGNhY2hlID0gdW5pcXVlQ2FjaGVbIHR5cGUgXSB8fCBbXTtcblx0XHRcdFx0XHRcdFx0bm9kZUluZGV4ID0gY2FjaGVbIDAgXSA9PT0gZGlycnVucyAmJiBjYWNoZVsgMSBdO1xuXHRcdFx0XHRcdFx0XHRkaWZmID0gbm9kZUluZGV4ICYmIGNhY2hlWyAyIF07XG5cdFx0XHRcdFx0XHRcdG5vZGUgPSBub2RlSW5kZXggJiYgcGFyZW50LmNoaWxkTm9kZXNbIG5vZGVJbmRleCBdO1xuXG5cdFx0XHRcdFx0XHRcdHdoaWxlICggKG5vZGUgPSArK25vZGVJbmRleCAmJiBub2RlICYmIG5vZGVbIGRpciBdIHx8XG5cblx0XHRcdFx0XHRcdFx0XHQvLyBGYWxsYmFjayB0byBzZWVraW5nIGBlbGVtYCBmcm9tIHRoZSBzdGFydFxuXHRcdFx0XHRcdFx0XHRcdChkaWZmID0gbm9kZUluZGV4ID0gMCkgfHwgc3RhcnQucG9wKCkpICkge1xuXG5cdFx0XHRcdFx0XHRcdFx0Ly8gV2hlbiBmb3VuZCwgY2FjaGUgaW5kZXhlcyBvbiBgcGFyZW50YCBhbmQgYnJlYWtcblx0XHRcdFx0XHRcdFx0XHRpZiAoIG5vZGUubm9kZVR5cGUgPT09IDEgJiYgKytkaWZmICYmIG5vZGUgPT09IGVsZW0gKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHR1bmlxdWVDYWNoZVsgdHlwZSBdID0gWyBkaXJydW5zLCBub2RlSW5kZXgsIGRpZmYgXTtcblx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHQvLyBVc2UgcHJldmlvdXNseS1jYWNoZWQgZWxlbWVudCBpbmRleCBpZiBhdmFpbGFibGVcblx0XHRcdFx0XHRcdFx0aWYgKCB1c2VDYWNoZSApIHtcblx0XHRcdFx0XHRcdFx0XHQvLyAuLi5pbiBhIGd6aXAtZnJpZW5kbHkgd2F5XG5cdFx0XHRcdFx0XHRcdFx0bm9kZSA9IGVsZW07XG5cdFx0XHRcdFx0XHRcdFx0b3V0ZXJDYWNoZSA9IG5vZGVbIGV4cGFuZG8gXSB8fCAobm9kZVsgZXhwYW5kbyBdID0ge30pO1xuXG5cdFx0XHRcdFx0XHRcdFx0Ly8gU3VwcG9ydDogSUUgPDkgb25seVxuXHRcdFx0XHRcdFx0XHRcdC8vIERlZmVuZCBhZ2FpbnN0IGNsb25lZCBhdHRyb3BlcnRpZXMgKGpRdWVyeSBnaC0xNzA5KVxuXHRcdFx0XHRcdFx0XHRcdHVuaXF1ZUNhY2hlID0gb3V0ZXJDYWNoZVsgbm9kZS51bmlxdWVJRCBdIHx8XG5cdFx0XHRcdFx0XHRcdFx0XHQob3V0ZXJDYWNoZVsgbm9kZS51bmlxdWVJRCBdID0ge30pO1xuXG5cdFx0XHRcdFx0XHRcdFx0Y2FjaGUgPSB1bmlxdWVDYWNoZVsgdHlwZSBdIHx8IFtdO1xuXHRcdFx0XHRcdFx0XHRcdG5vZGVJbmRleCA9IGNhY2hlWyAwIF0gPT09IGRpcnJ1bnMgJiYgY2FjaGVbIDEgXTtcblx0XHRcdFx0XHRcdFx0XHRkaWZmID0gbm9kZUluZGV4O1xuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0Ly8geG1sIDpudGgtY2hpbGQoLi4uKVxuXHRcdFx0XHRcdFx0XHQvLyBvciA6bnRoLWxhc3QtY2hpbGQoLi4uKSBvciA6bnRoKC1sYXN0KT8tb2YtdHlwZSguLi4pXG5cdFx0XHRcdFx0XHRcdGlmICggZGlmZiA9PT0gZmFsc2UgKSB7XG5cdFx0XHRcdFx0XHRcdFx0Ly8gVXNlIHRoZSBzYW1lIGxvb3AgYXMgYWJvdmUgdG8gc2VlayBgZWxlbWAgZnJvbSB0aGUgc3RhcnRcblx0XHRcdFx0XHRcdFx0XHR3aGlsZSAoIChub2RlID0gKytub2RlSW5kZXggJiYgbm9kZSAmJiBub2RlWyBkaXIgXSB8fFxuXHRcdFx0XHRcdFx0XHRcdFx0KGRpZmYgPSBub2RlSW5kZXggPSAwKSB8fCBzdGFydC5wb3AoKSkgKSB7XG5cblx0XHRcdFx0XHRcdFx0XHRcdGlmICggKCBvZlR5cGUgP1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRub2RlLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09IG5hbWUgOlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRub2RlLm5vZGVUeXBlID09PSAxICkgJiZcblx0XHRcdFx0XHRcdFx0XHRcdFx0KytkaWZmICkge1xuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdC8vIENhY2hlIHRoZSBpbmRleCBvZiBlYWNoIGVuY291bnRlcmVkIGVsZW1lbnRcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKCB1c2VDYWNoZSApIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRvdXRlckNhY2hlID0gbm9kZVsgZXhwYW5kbyBdIHx8IChub2RlWyBleHBhbmRvIF0gPSB7fSk7XG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBTdXBwb3J0OiBJRSA8OSBvbmx5XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gRGVmZW5kIGFnYWluc3QgY2xvbmVkIGF0dHJvcGVydGllcyAoalF1ZXJ5IGdoLTE3MDkpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dW5pcXVlQ2FjaGUgPSBvdXRlckNhY2hlWyBub2RlLnVuaXF1ZUlEIF0gfHxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdChvdXRlckNhY2hlWyBub2RlLnVuaXF1ZUlEIF0gPSB7fSk7XG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR1bmlxdWVDYWNoZVsgdHlwZSBdID0gWyBkaXJydW5zLCBkaWZmIF07XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoIG5vZGUgPT09IGVsZW0gKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0Ly8gSW5jb3Jwb3JhdGUgdGhlIG9mZnNldCwgdGhlbiBjaGVjayBhZ2FpbnN0IGN5Y2xlIHNpemVcblx0XHRcdFx0XHRcdGRpZmYgLT0gbGFzdDtcblx0XHRcdFx0XHRcdHJldHVybiBkaWZmID09PSBmaXJzdCB8fCAoIGRpZmYgJSBmaXJzdCA9PT0gMCAmJiBkaWZmIC8gZmlyc3QgPj0gMCApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fTtcblx0XHR9LFxuXG5cdFx0XCJQU0VVRE9cIjogZnVuY3Rpb24oIHBzZXVkbywgYXJndW1lbnQgKSB7XG5cdFx0XHQvLyBwc2V1ZG8tY2xhc3MgbmFtZXMgYXJlIGNhc2UtaW5zZW5zaXRpdmVcblx0XHRcdC8vIGh0dHA6Ly93d3cudzMub3JnL1RSL3NlbGVjdG9ycy8jcHNldWRvLWNsYXNzZXNcblx0XHRcdC8vIFByaW9yaXRpemUgYnkgY2FzZSBzZW5zaXRpdml0eSBpbiBjYXNlIGN1c3RvbSBwc2V1ZG9zIGFyZSBhZGRlZCB3aXRoIHVwcGVyY2FzZSBsZXR0ZXJzXG5cdFx0XHQvLyBSZW1lbWJlciB0aGF0IHNldEZpbHRlcnMgaW5oZXJpdHMgZnJvbSBwc2V1ZG9zXG5cdFx0XHR2YXIgYXJncyxcblx0XHRcdFx0Zm4gPSBFeHByLnBzZXVkb3NbIHBzZXVkbyBdIHx8IEV4cHIuc2V0RmlsdGVyc1sgcHNldWRvLnRvTG93ZXJDYXNlKCkgXSB8fFxuXHRcdFx0XHRcdFNpenpsZS5lcnJvciggXCJ1bnN1cHBvcnRlZCBwc2V1ZG86IFwiICsgcHNldWRvICk7XG5cblx0XHRcdC8vIFRoZSB1c2VyIG1heSB1c2UgY3JlYXRlUHNldWRvIHRvIGluZGljYXRlIHRoYXRcblx0XHRcdC8vIGFyZ3VtZW50cyBhcmUgbmVlZGVkIHRvIGNyZWF0ZSB0aGUgZmlsdGVyIGZ1bmN0aW9uXG5cdFx0XHQvLyBqdXN0IGFzIFNpenpsZSBkb2VzXG5cdFx0XHRpZiAoIGZuWyBleHBhbmRvIF0gKSB7XG5cdFx0XHRcdHJldHVybiBmbiggYXJndW1lbnQgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQnV0IG1haW50YWluIHN1cHBvcnQgZm9yIG9sZCBzaWduYXR1cmVzXG5cdFx0XHRpZiAoIGZuLmxlbmd0aCA+IDEgKSB7XG5cdFx0XHRcdGFyZ3MgPSBbIHBzZXVkbywgcHNldWRvLCBcIlwiLCBhcmd1bWVudCBdO1xuXHRcdFx0XHRyZXR1cm4gRXhwci5zZXRGaWx0ZXJzLmhhc093blByb3BlcnR5KCBwc2V1ZG8udG9Mb3dlckNhc2UoKSApID9cblx0XHRcdFx0XHRtYXJrRnVuY3Rpb24oZnVuY3Rpb24oIHNlZWQsIG1hdGNoZXMgKSB7XG5cdFx0XHRcdFx0XHR2YXIgaWR4LFxuXHRcdFx0XHRcdFx0XHRtYXRjaGVkID0gZm4oIHNlZWQsIGFyZ3VtZW50ICksXG5cdFx0XHRcdFx0XHRcdGkgPSBtYXRjaGVkLmxlbmd0aDtcblx0XHRcdFx0XHRcdHdoaWxlICggaS0tICkge1xuXHRcdFx0XHRcdFx0XHRpZHggPSBpbmRleE9mKCBzZWVkLCBtYXRjaGVkW2ldICk7XG5cdFx0XHRcdFx0XHRcdHNlZWRbIGlkeCBdID0gISggbWF0Y2hlc1sgaWR4IF0gPSBtYXRjaGVkW2ldICk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSkgOlxuXHRcdFx0XHRcdGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGZuKCBlbGVtLCAwLCBhcmdzICk7XG5cdFx0XHRcdFx0fTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGZuO1xuXHRcdH1cblx0fSxcblxuXHRwc2V1ZG9zOiB7XG5cdFx0Ly8gUG90ZW50aWFsbHkgY29tcGxleCBwc2V1ZG9zXG5cdFx0XCJub3RcIjogbWFya0Z1bmN0aW9uKGZ1bmN0aW9uKCBzZWxlY3RvciApIHtcblx0XHRcdC8vIFRyaW0gdGhlIHNlbGVjdG9yIHBhc3NlZCB0byBjb21waWxlXG5cdFx0XHQvLyB0byBhdm9pZCB0cmVhdGluZyBsZWFkaW5nIGFuZCB0cmFpbGluZ1xuXHRcdFx0Ly8gc3BhY2VzIGFzIGNvbWJpbmF0b3JzXG5cdFx0XHR2YXIgaW5wdXQgPSBbXSxcblx0XHRcdFx0cmVzdWx0cyA9IFtdLFxuXHRcdFx0XHRtYXRjaGVyID0gY29tcGlsZSggc2VsZWN0b3IucmVwbGFjZSggcnRyaW0sIFwiJDFcIiApICk7XG5cblx0XHRcdHJldHVybiBtYXRjaGVyWyBleHBhbmRvIF0gP1xuXHRcdFx0XHRtYXJrRnVuY3Rpb24oZnVuY3Rpb24oIHNlZWQsIG1hdGNoZXMsIGNvbnRleHQsIHhtbCApIHtcblx0XHRcdFx0XHR2YXIgZWxlbSxcblx0XHRcdFx0XHRcdHVubWF0Y2hlZCA9IG1hdGNoZXIoIHNlZWQsIG51bGwsIHhtbCwgW10gKSxcblx0XHRcdFx0XHRcdGkgPSBzZWVkLmxlbmd0aDtcblxuXHRcdFx0XHRcdC8vIE1hdGNoIGVsZW1lbnRzIHVubWF0Y2hlZCBieSBgbWF0Y2hlcmBcblx0XHRcdFx0XHR3aGlsZSAoIGktLSApIHtcblx0XHRcdFx0XHRcdGlmICggKGVsZW0gPSB1bm1hdGNoZWRbaV0pICkge1xuXHRcdFx0XHRcdFx0XHRzZWVkW2ldID0gIShtYXRjaGVzW2ldID0gZWxlbSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KSA6XG5cdFx0XHRcdGZ1bmN0aW9uKCBlbGVtLCBjb250ZXh0LCB4bWwgKSB7XG5cdFx0XHRcdFx0aW5wdXRbMF0gPSBlbGVtO1xuXHRcdFx0XHRcdG1hdGNoZXIoIGlucHV0LCBudWxsLCB4bWwsIHJlc3VsdHMgKTtcblx0XHRcdFx0XHQvLyBEb24ndCBrZWVwIHRoZSBlbGVtZW50IChpc3N1ZSAjMjk5KVxuXHRcdFx0XHRcdGlucHV0WzBdID0gbnVsbDtcblx0XHRcdFx0XHRyZXR1cm4gIXJlc3VsdHMucG9wKCk7XG5cdFx0XHRcdH07XG5cdFx0fSksXG5cblx0XHRcImhhc1wiOiBtYXJrRnVuY3Rpb24oZnVuY3Rpb24oIHNlbGVjdG9yICkge1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0XHRyZXR1cm4gU2l6emxlKCBzZWxlY3RvciwgZWxlbSApLmxlbmd0aCA+IDA7XG5cdFx0XHR9O1xuXHRcdH0pLFxuXG5cdFx0XCJjb250YWluc1wiOiBtYXJrRnVuY3Rpb24oZnVuY3Rpb24oIHRleHQgKSB7XG5cdFx0XHR0ZXh0ID0gdGV4dC5yZXBsYWNlKCBydW5lc2NhcGUsIGZ1bmVzY2FwZSApO1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0XHRyZXR1cm4gKCBlbGVtLnRleHRDb250ZW50IHx8IGVsZW0uaW5uZXJUZXh0IHx8IGdldFRleHQoIGVsZW0gKSApLmluZGV4T2YoIHRleHQgKSA+IC0xO1xuXHRcdFx0fTtcblx0XHR9KSxcblxuXHRcdC8vIFwiV2hldGhlciBhbiBlbGVtZW50IGlzIHJlcHJlc2VudGVkIGJ5IGEgOmxhbmcoKSBzZWxlY3RvclxuXHRcdC8vIGlzIGJhc2VkIHNvbGVseSBvbiB0aGUgZWxlbWVudCdzIGxhbmd1YWdlIHZhbHVlXG5cdFx0Ly8gYmVpbmcgZXF1YWwgdG8gdGhlIGlkZW50aWZpZXIgQyxcblx0XHQvLyBvciBiZWdpbm5pbmcgd2l0aCB0aGUgaWRlbnRpZmllciBDIGltbWVkaWF0ZWx5IGZvbGxvd2VkIGJ5IFwiLVwiLlxuXHRcdC8vIFRoZSBtYXRjaGluZyBvZiBDIGFnYWluc3QgdGhlIGVsZW1lbnQncyBsYW5ndWFnZSB2YWx1ZSBpcyBwZXJmb3JtZWQgY2FzZS1pbnNlbnNpdGl2ZWx5LlxuXHRcdC8vIFRoZSBpZGVudGlmaWVyIEMgZG9lcyBub3QgaGF2ZSB0byBiZSBhIHZhbGlkIGxhbmd1YWdlIG5hbWUuXCJcblx0XHQvLyBodHRwOi8vd3d3LnczLm9yZy9UUi9zZWxlY3RvcnMvI2xhbmctcHNldWRvXG5cdFx0XCJsYW5nXCI6IG1hcmtGdW5jdGlvbiggZnVuY3Rpb24oIGxhbmcgKSB7XG5cdFx0XHQvLyBsYW5nIHZhbHVlIG11c3QgYmUgYSB2YWxpZCBpZGVudGlmaWVyXG5cdFx0XHRpZiAoICFyaWRlbnRpZmllci50ZXN0KGxhbmcgfHwgXCJcIikgKSB7XG5cdFx0XHRcdFNpenpsZS5lcnJvciggXCJ1bnN1cHBvcnRlZCBsYW5nOiBcIiArIGxhbmcgKTtcblx0XHRcdH1cblx0XHRcdGxhbmcgPSBsYW5nLnJlcGxhY2UoIHJ1bmVzY2FwZSwgZnVuZXNjYXBlICkudG9Mb3dlckNhc2UoKTtcblx0XHRcdHJldHVybiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdFx0dmFyIGVsZW1MYW5nO1xuXHRcdFx0XHRkbyB7XG5cdFx0XHRcdFx0aWYgKCAoZWxlbUxhbmcgPSBkb2N1bWVudElzSFRNTCA/XG5cdFx0XHRcdFx0XHRlbGVtLmxhbmcgOlxuXHRcdFx0XHRcdFx0ZWxlbS5nZXRBdHRyaWJ1dGUoXCJ4bWw6bGFuZ1wiKSB8fCBlbGVtLmdldEF0dHJpYnV0ZShcImxhbmdcIikpICkge1xuXG5cdFx0XHRcdFx0XHRlbGVtTGFuZyA9IGVsZW1MYW5nLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZWxlbUxhbmcgPT09IGxhbmcgfHwgZWxlbUxhbmcuaW5kZXhPZiggbGFuZyArIFwiLVwiICkgPT09IDA7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IHdoaWxlICggKGVsZW0gPSBlbGVtLnBhcmVudE5vZGUpICYmIGVsZW0ubm9kZVR5cGUgPT09IDEgKTtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fTtcblx0XHR9KSxcblxuXHRcdC8vIE1pc2NlbGxhbmVvdXNcblx0XHRcInRhcmdldFwiOiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdHZhciBoYXNoID0gd2luZG93LmxvY2F0aW9uICYmIHdpbmRvdy5sb2NhdGlvbi5oYXNoO1xuXHRcdFx0cmV0dXJuIGhhc2ggJiYgaGFzaC5zbGljZSggMSApID09PSBlbGVtLmlkO1xuXHRcdH0sXG5cblx0XHRcInJvb3RcIjogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRyZXR1cm4gZWxlbSA9PT0gZG9jRWxlbTtcblx0XHR9LFxuXG5cdFx0XCJmb2N1c1wiOiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdHJldHVybiBlbGVtID09PSBkb2N1bWVudC5hY3RpdmVFbGVtZW50ICYmICghZG9jdW1lbnQuaGFzRm9jdXMgfHwgZG9jdW1lbnQuaGFzRm9jdXMoKSkgJiYgISEoZWxlbS50eXBlIHx8IGVsZW0uaHJlZiB8fCB+ZWxlbS50YWJJbmRleCk7XG5cdFx0fSxcblxuXHRcdC8vIEJvb2xlYW4gcHJvcGVydGllc1xuXHRcdFwiZW5hYmxlZFwiOiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdHJldHVybiBlbGVtLmRpc2FibGVkID09PSBmYWxzZTtcblx0XHR9LFxuXG5cdFx0XCJkaXNhYmxlZFwiOiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdHJldHVybiBlbGVtLmRpc2FibGVkID09PSB0cnVlO1xuXHRcdH0sXG5cblx0XHRcImNoZWNrZWRcIjogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHQvLyBJbiBDU1MzLCA6Y2hlY2tlZCBzaG91bGQgcmV0dXJuIGJvdGggY2hlY2tlZCBhbmQgc2VsZWN0ZWQgZWxlbWVudHNcblx0XHRcdC8vIGh0dHA6Ly93d3cudzMub3JnL1RSLzIwMTEvUkVDLWNzczMtc2VsZWN0b3JzLTIwMTEwOTI5LyNjaGVja2VkXG5cdFx0XHR2YXIgbm9kZU5hbWUgPSBlbGVtLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRyZXR1cm4gKG5vZGVOYW1lID09PSBcImlucHV0XCIgJiYgISFlbGVtLmNoZWNrZWQpIHx8IChub2RlTmFtZSA9PT0gXCJvcHRpb25cIiAmJiAhIWVsZW0uc2VsZWN0ZWQpO1xuXHRcdH0sXG5cblx0XHRcInNlbGVjdGVkXCI6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0Ly8gQWNjZXNzaW5nIHRoaXMgcHJvcGVydHkgbWFrZXMgc2VsZWN0ZWQtYnktZGVmYXVsdFxuXHRcdFx0Ly8gb3B0aW9ucyBpbiBTYWZhcmkgd29yayBwcm9wZXJseVxuXHRcdFx0aWYgKCBlbGVtLnBhcmVudE5vZGUgKSB7XG5cdFx0XHRcdGVsZW0ucGFyZW50Tm9kZS5zZWxlY3RlZEluZGV4O1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gZWxlbS5zZWxlY3RlZCA9PT0gdHJ1ZTtcblx0XHR9LFxuXG5cdFx0Ly8gQ29udGVudHNcblx0XHRcImVtcHR5XCI6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0Ly8gaHR0cDovL3d3dy53My5vcmcvVFIvc2VsZWN0b3JzLyNlbXB0eS1wc2V1ZG9cblx0XHRcdC8vIDplbXB0eSBpcyBuZWdhdGVkIGJ5IGVsZW1lbnQgKDEpIG9yIGNvbnRlbnQgbm9kZXMgKHRleHQ6IDM7IGNkYXRhOiA0OyBlbnRpdHkgcmVmOiA1KSxcblx0XHRcdC8vICAgYnV0IG5vdCBieSBvdGhlcnMgKGNvbW1lbnQ6IDg7IHByb2Nlc3NpbmcgaW5zdHJ1Y3Rpb246IDc7IGV0Yy4pXG5cdFx0XHQvLyBub2RlVHlwZSA8IDYgd29ya3MgYmVjYXVzZSBhdHRyaWJ1dGVzICgyKSBkbyBub3QgYXBwZWFyIGFzIGNoaWxkcmVuXG5cdFx0XHRmb3IgKCBlbGVtID0gZWxlbS5maXJzdENoaWxkOyBlbGVtOyBlbGVtID0gZWxlbS5uZXh0U2libGluZyApIHtcblx0XHRcdFx0aWYgKCBlbGVtLm5vZGVUeXBlIDwgNiApIHtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH0sXG5cblx0XHRcInBhcmVudFwiOiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdHJldHVybiAhRXhwci5wc2V1ZG9zW1wiZW1wdHlcIl0oIGVsZW0gKTtcblx0XHR9LFxuXG5cdFx0Ly8gRWxlbWVudC9pbnB1dCB0eXBlc1xuXHRcdFwiaGVhZGVyXCI6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0cmV0dXJuIHJoZWFkZXIudGVzdCggZWxlbS5ub2RlTmFtZSApO1xuXHRcdH0sXG5cblx0XHRcImlucHV0XCI6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0cmV0dXJuIHJpbnB1dHMudGVzdCggZWxlbS5ub2RlTmFtZSApO1xuXHRcdH0sXG5cblx0XHRcImJ1dHRvblwiOiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdHZhciBuYW1lID0gZWxlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0cmV0dXJuIG5hbWUgPT09IFwiaW5wdXRcIiAmJiBlbGVtLnR5cGUgPT09IFwiYnV0dG9uXCIgfHwgbmFtZSA9PT0gXCJidXR0b25cIjtcblx0XHR9LFxuXG5cdFx0XCJ0ZXh0XCI6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0dmFyIGF0dHI7XG5cdFx0XHRyZXR1cm4gZWxlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSBcImlucHV0XCIgJiZcblx0XHRcdFx0ZWxlbS50eXBlID09PSBcInRleHRcIiAmJlxuXG5cdFx0XHRcdC8vIFN1cHBvcnQ6IElFPDhcblx0XHRcdFx0Ly8gTmV3IEhUTUw1IGF0dHJpYnV0ZSB2YWx1ZXMgKGUuZy4sIFwic2VhcmNoXCIpIGFwcGVhciB3aXRoIGVsZW0udHlwZSA9PT0gXCJ0ZXh0XCJcblx0XHRcdFx0KCAoYXR0ciA9IGVsZW0uZ2V0QXR0cmlidXRlKFwidHlwZVwiKSkgPT0gbnVsbCB8fCBhdHRyLnRvTG93ZXJDYXNlKCkgPT09IFwidGV4dFwiICk7XG5cdFx0fSxcblxuXHRcdC8vIFBvc2l0aW9uLWluLWNvbGxlY3Rpb25cblx0XHRcImZpcnN0XCI6IGNyZWF0ZVBvc2l0aW9uYWxQc2V1ZG8oZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gWyAwIF07XG5cdFx0fSksXG5cblx0XHRcImxhc3RcIjogY3JlYXRlUG9zaXRpb25hbFBzZXVkbyhmdW5jdGlvbiggbWF0Y2hJbmRleGVzLCBsZW5ndGggKSB7XG5cdFx0XHRyZXR1cm4gWyBsZW5ndGggLSAxIF07XG5cdFx0fSksXG5cblx0XHRcImVxXCI6IGNyZWF0ZVBvc2l0aW9uYWxQc2V1ZG8oZnVuY3Rpb24oIG1hdGNoSW5kZXhlcywgbGVuZ3RoLCBhcmd1bWVudCApIHtcblx0XHRcdHJldHVybiBbIGFyZ3VtZW50IDwgMCA/IGFyZ3VtZW50ICsgbGVuZ3RoIDogYXJndW1lbnQgXTtcblx0XHR9KSxcblxuXHRcdFwiZXZlblwiOiBjcmVhdGVQb3NpdGlvbmFsUHNldWRvKGZ1bmN0aW9uKCBtYXRjaEluZGV4ZXMsIGxlbmd0aCApIHtcblx0XHRcdHZhciBpID0gMDtcblx0XHRcdGZvciAoIDsgaSA8IGxlbmd0aDsgaSArPSAyICkge1xuXHRcdFx0XHRtYXRjaEluZGV4ZXMucHVzaCggaSApO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIG1hdGNoSW5kZXhlcztcblx0XHR9KSxcblxuXHRcdFwib2RkXCI6IGNyZWF0ZVBvc2l0aW9uYWxQc2V1ZG8oZnVuY3Rpb24oIG1hdGNoSW5kZXhlcywgbGVuZ3RoICkge1xuXHRcdFx0dmFyIGkgPSAxO1xuXHRcdFx0Zm9yICggOyBpIDwgbGVuZ3RoOyBpICs9IDIgKSB7XG5cdFx0XHRcdG1hdGNoSW5kZXhlcy5wdXNoKCBpICk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gbWF0Y2hJbmRleGVzO1xuXHRcdH0pLFxuXG5cdFx0XCJsdFwiOiBjcmVhdGVQb3NpdGlvbmFsUHNldWRvKGZ1bmN0aW9uKCBtYXRjaEluZGV4ZXMsIGxlbmd0aCwgYXJndW1lbnQgKSB7XG5cdFx0XHR2YXIgaSA9IGFyZ3VtZW50IDwgMCA/IGFyZ3VtZW50ICsgbGVuZ3RoIDogYXJndW1lbnQ7XG5cdFx0XHRmb3IgKCA7IC0taSA+PSAwOyApIHtcblx0XHRcdFx0bWF0Y2hJbmRleGVzLnB1c2goIGkgKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBtYXRjaEluZGV4ZXM7XG5cdFx0fSksXG5cblx0XHRcImd0XCI6IGNyZWF0ZVBvc2l0aW9uYWxQc2V1ZG8oZnVuY3Rpb24oIG1hdGNoSW5kZXhlcywgbGVuZ3RoLCBhcmd1bWVudCApIHtcblx0XHRcdHZhciBpID0gYXJndW1lbnQgPCAwID8gYXJndW1lbnQgKyBsZW5ndGggOiBhcmd1bWVudDtcblx0XHRcdGZvciAoIDsgKytpIDwgbGVuZ3RoOyApIHtcblx0XHRcdFx0bWF0Y2hJbmRleGVzLnB1c2goIGkgKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBtYXRjaEluZGV4ZXM7XG5cdFx0fSlcblx0fVxufTtcblxuRXhwci5wc2V1ZG9zW1wibnRoXCJdID0gRXhwci5wc2V1ZG9zW1wiZXFcIl07XG5cbi8vIEFkZCBidXR0b24vaW5wdXQgdHlwZSBwc2V1ZG9zXG5mb3IgKCBpIGluIHsgcmFkaW86IHRydWUsIGNoZWNrYm94OiB0cnVlLCBmaWxlOiB0cnVlLCBwYXNzd29yZDogdHJ1ZSwgaW1hZ2U6IHRydWUgfSApIHtcblx0RXhwci5wc2V1ZG9zWyBpIF0gPSBjcmVhdGVJbnB1dFBzZXVkbyggaSApO1xufVxuZm9yICggaSBpbiB7IHN1Ym1pdDogdHJ1ZSwgcmVzZXQ6IHRydWUgfSApIHtcblx0RXhwci5wc2V1ZG9zWyBpIF0gPSBjcmVhdGVCdXR0b25Qc2V1ZG8oIGkgKTtcbn1cblxuLy8gRWFzeSBBUEkgZm9yIGNyZWF0aW5nIG5ldyBzZXRGaWx0ZXJzXG5mdW5jdGlvbiBzZXRGaWx0ZXJzKCkge31cbnNldEZpbHRlcnMucHJvdG90eXBlID0gRXhwci5maWx0ZXJzID0gRXhwci5wc2V1ZG9zO1xuRXhwci5zZXRGaWx0ZXJzID0gbmV3IHNldEZpbHRlcnMoKTtcblxudG9rZW5pemUgPSBTaXp6bGUudG9rZW5pemUgPSBmdW5jdGlvbiggc2VsZWN0b3IsIHBhcnNlT25seSApIHtcblx0dmFyIG1hdGNoZWQsIG1hdGNoLCB0b2tlbnMsIHR5cGUsXG5cdFx0c29GYXIsIGdyb3VwcywgcHJlRmlsdGVycyxcblx0XHRjYWNoZWQgPSB0b2tlbkNhY2hlWyBzZWxlY3RvciArIFwiIFwiIF07XG5cblx0aWYgKCBjYWNoZWQgKSB7XG5cdFx0cmV0dXJuIHBhcnNlT25seSA/IDAgOiBjYWNoZWQuc2xpY2UoIDAgKTtcblx0fVxuXG5cdHNvRmFyID0gc2VsZWN0b3I7XG5cdGdyb3VwcyA9IFtdO1xuXHRwcmVGaWx0ZXJzID0gRXhwci5wcmVGaWx0ZXI7XG5cblx0d2hpbGUgKCBzb0ZhciApIHtcblxuXHRcdC8vIENvbW1hIGFuZCBmaXJzdCBydW5cblx0XHRpZiAoICFtYXRjaGVkIHx8IChtYXRjaCA9IHJjb21tYS5leGVjKCBzb0ZhciApKSApIHtcblx0XHRcdGlmICggbWF0Y2ggKSB7XG5cdFx0XHRcdC8vIERvbid0IGNvbnN1bWUgdHJhaWxpbmcgY29tbWFzIGFzIHZhbGlkXG5cdFx0XHRcdHNvRmFyID0gc29GYXIuc2xpY2UoIG1hdGNoWzBdLmxlbmd0aCApIHx8IHNvRmFyO1xuXHRcdFx0fVxuXHRcdFx0Z3JvdXBzLnB1c2goICh0b2tlbnMgPSBbXSkgKTtcblx0XHR9XG5cblx0XHRtYXRjaGVkID0gZmFsc2U7XG5cblx0XHQvLyBDb21iaW5hdG9yc1xuXHRcdGlmICggKG1hdGNoID0gcmNvbWJpbmF0b3JzLmV4ZWMoIHNvRmFyICkpICkge1xuXHRcdFx0bWF0Y2hlZCA9IG1hdGNoLnNoaWZ0KCk7XG5cdFx0XHR0b2tlbnMucHVzaCh7XG5cdFx0XHRcdHZhbHVlOiBtYXRjaGVkLFxuXHRcdFx0XHQvLyBDYXN0IGRlc2NlbmRhbnQgY29tYmluYXRvcnMgdG8gc3BhY2Vcblx0XHRcdFx0dHlwZTogbWF0Y2hbMF0ucmVwbGFjZSggcnRyaW0sIFwiIFwiIClcblx0XHRcdH0pO1xuXHRcdFx0c29GYXIgPSBzb0Zhci5zbGljZSggbWF0Y2hlZC5sZW5ndGggKTtcblx0XHR9XG5cblx0XHQvLyBGaWx0ZXJzXG5cdFx0Zm9yICggdHlwZSBpbiBFeHByLmZpbHRlciApIHtcblx0XHRcdGlmICggKG1hdGNoID0gbWF0Y2hFeHByWyB0eXBlIF0uZXhlYyggc29GYXIgKSkgJiYgKCFwcmVGaWx0ZXJzWyB0eXBlIF0gfHxcblx0XHRcdFx0KG1hdGNoID0gcHJlRmlsdGVyc1sgdHlwZSBdKCBtYXRjaCApKSkgKSB7XG5cdFx0XHRcdG1hdGNoZWQgPSBtYXRjaC5zaGlmdCgpO1xuXHRcdFx0XHR0b2tlbnMucHVzaCh7XG5cdFx0XHRcdFx0dmFsdWU6IG1hdGNoZWQsXG5cdFx0XHRcdFx0dHlwZTogdHlwZSxcblx0XHRcdFx0XHRtYXRjaGVzOiBtYXRjaFxuXHRcdFx0XHR9KTtcblx0XHRcdFx0c29GYXIgPSBzb0Zhci5zbGljZSggbWF0Y2hlZC5sZW5ndGggKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoICFtYXRjaGVkICkge1xuXHRcdFx0YnJlYWs7XG5cdFx0fVxuXHR9XG5cblx0Ly8gUmV0dXJuIHRoZSBsZW5ndGggb2YgdGhlIGludmFsaWQgZXhjZXNzXG5cdC8vIGlmIHdlJ3JlIGp1c3QgcGFyc2luZ1xuXHQvLyBPdGhlcndpc2UsIHRocm93IGFuIGVycm9yIG9yIHJldHVybiB0b2tlbnNcblx0cmV0dXJuIHBhcnNlT25seSA/XG5cdFx0c29GYXIubGVuZ3RoIDpcblx0XHRzb0ZhciA/XG5cdFx0XHRTaXp6bGUuZXJyb3IoIHNlbGVjdG9yICkgOlxuXHRcdFx0Ly8gQ2FjaGUgdGhlIHRva2Vuc1xuXHRcdFx0dG9rZW5DYWNoZSggc2VsZWN0b3IsIGdyb3VwcyApLnNsaWNlKCAwICk7XG59O1xuXG5mdW5jdGlvbiB0b1NlbGVjdG9yKCB0b2tlbnMgKSB7XG5cdHZhciBpID0gMCxcblx0XHRsZW4gPSB0b2tlbnMubGVuZ3RoLFxuXHRcdHNlbGVjdG9yID0gXCJcIjtcblx0Zm9yICggOyBpIDwgbGVuOyBpKysgKSB7XG5cdFx0c2VsZWN0b3IgKz0gdG9rZW5zW2ldLnZhbHVlO1xuXHR9XG5cdHJldHVybiBzZWxlY3Rvcjtcbn1cblxuZnVuY3Rpb24gYWRkQ29tYmluYXRvciggbWF0Y2hlciwgY29tYmluYXRvciwgYmFzZSApIHtcblx0dmFyIGRpciA9IGNvbWJpbmF0b3IuZGlyLFxuXHRcdGNoZWNrTm9uRWxlbWVudHMgPSBiYXNlICYmIGRpciA9PT0gXCJwYXJlbnROb2RlXCIsXG5cdFx0ZG9uZU5hbWUgPSBkb25lKys7XG5cblx0cmV0dXJuIGNvbWJpbmF0b3IuZmlyc3QgP1xuXHRcdC8vIENoZWNrIGFnYWluc3QgY2xvc2VzdCBhbmNlc3Rvci9wcmVjZWRpbmcgZWxlbWVudFxuXHRcdGZ1bmN0aW9uKCBlbGVtLCBjb250ZXh0LCB4bWwgKSB7XG5cdFx0XHR3aGlsZSAoIChlbGVtID0gZWxlbVsgZGlyIF0pICkge1xuXHRcdFx0XHRpZiAoIGVsZW0ubm9kZVR5cGUgPT09IDEgfHwgY2hlY2tOb25FbGVtZW50cyApIHtcblx0XHRcdFx0XHRyZXR1cm4gbWF0Y2hlciggZWxlbSwgY29udGV4dCwgeG1sICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9IDpcblxuXHRcdC8vIENoZWNrIGFnYWluc3QgYWxsIGFuY2VzdG9yL3ByZWNlZGluZyBlbGVtZW50c1xuXHRcdGZ1bmN0aW9uKCBlbGVtLCBjb250ZXh0LCB4bWwgKSB7XG5cdFx0XHR2YXIgb2xkQ2FjaGUsIHVuaXF1ZUNhY2hlLCBvdXRlckNhY2hlLFxuXHRcdFx0XHRuZXdDYWNoZSA9IFsgZGlycnVucywgZG9uZU5hbWUgXTtcblxuXHRcdFx0Ly8gV2UgY2FuJ3Qgc2V0IGFyYml0cmFyeSBkYXRhIG9uIFhNTCBub2Rlcywgc28gdGhleSBkb24ndCBiZW5lZml0IGZyb20gY29tYmluYXRvciBjYWNoaW5nXG5cdFx0XHRpZiAoIHhtbCApIHtcblx0XHRcdFx0d2hpbGUgKCAoZWxlbSA9IGVsZW1bIGRpciBdKSApIHtcblx0XHRcdFx0XHRpZiAoIGVsZW0ubm9kZVR5cGUgPT09IDEgfHwgY2hlY2tOb25FbGVtZW50cyApIHtcblx0XHRcdFx0XHRcdGlmICggbWF0Y2hlciggZWxlbSwgY29udGV4dCwgeG1sICkgKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0d2hpbGUgKCAoZWxlbSA9IGVsZW1bIGRpciBdKSApIHtcblx0XHRcdFx0XHRpZiAoIGVsZW0ubm9kZVR5cGUgPT09IDEgfHwgY2hlY2tOb25FbGVtZW50cyApIHtcblx0XHRcdFx0XHRcdG91dGVyQ2FjaGUgPSBlbGVtWyBleHBhbmRvIF0gfHwgKGVsZW1bIGV4cGFuZG8gXSA9IHt9KTtcblxuXHRcdFx0XHRcdFx0Ly8gU3VwcG9ydDogSUUgPDkgb25seVxuXHRcdFx0XHRcdFx0Ly8gRGVmZW5kIGFnYWluc3QgY2xvbmVkIGF0dHJvcGVydGllcyAoalF1ZXJ5IGdoLTE3MDkpXG5cdFx0XHRcdFx0XHR1bmlxdWVDYWNoZSA9IG91dGVyQ2FjaGVbIGVsZW0udW5pcXVlSUQgXSB8fCAob3V0ZXJDYWNoZVsgZWxlbS51bmlxdWVJRCBdID0ge30pO1xuXG5cdFx0XHRcdFx0XHRpZiAoIChvbGRDYWNoZSA9IHVuaXF1ZUNhY2hlWyBkaXIgXSkgJiZcblx0XHRcdFx0XHRcdFx0b2xkQ2FjaGVbIDAgXSA9PT0gZGlycnVucyAmJiBvbGRDYWNoZVsgMSBdID09PSBkb25lTmFtZSApIHtcblxuXHRcdFx0XHRcdFx0XHQvLyBBc3NpZ24gdG8gbmV3Q2FjaGUgc28gcmVzdWx0cyBiYWNrLXByb3BhZ2F0ZSB0byBwcmV2aW91cyBlbGVtZW50c1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gKG5ld0NhY2hlWyAyIF0gPSBvbGRDYWNoZVsgMiBdKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdC8vIFJldXNlIG5ld2NhY2hlIHNvIHJlc3VsdHMgYmFjay1wcm9wYWdhdGUgdG8gcHJldmlvdXMgZWxlbWVudHNcblx0XHRcdFx0XHRcdFx0dW5pcXVlQ2FjaGVbIGRpciBdID0gbmV3Q2FjaGU7XG5cblx0XHRcdFx0XHRcdFx0Ly8gQSBtYXRjaCBtZWFucyB3ZSdyZSBkb25lOyBhIGZhaWwgbWVhbnMgd2UgaGF2ZSB0byBrZWVwIGNoZWNraW5nXG5cdFx0XHRcdFx0XHRcdGlmICggKG5ld0NhY2hlWyAyIF0gPSBtYXRjaGVyKCBlbGVtLCBjb250ZXh0LCB4bWwgKSkgKSB7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9O1xufVxuXG5mdW5jdGlvbiBlbGVtZW50TWF0Y2hlciggbWF0Y2hlcnMgKSB7XG5cdHJldHVybiBtYXRjaGVycy5sZW5ndGggPiAxID9cblx0XHRmdW5jdGlvbiggZWxlbSwgY29udGV4dCwgeG1sICkge1xuXHRcdFx0dmFyIGkgPSBtYXRjaGVycy5sZW5ndGg7XG5cdFx0XHR3aGlsZSAoIGktLSApIHtcblx0XHRcdFx0aWYgKCAhbWF0Y2hlcnNbaV0oIGVsZW0sIGNvbnRleHQsIHhtbCApICkge1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fSA6XG5cdFx0bWF0Y2hlcnNbMF07XG59XG5cbmZ1bmN0aW9uIG11bHRpcGxlQ29udGV4dHMoIHNlbGVjdG9yLCBjb250ZXh0cywgcmVzdWx0cyApIHtcblx0dmFyIGkgPSAwLFxuXHRcdGxlbiA9IGNvbnRleHRzLmxlbmd0aDtcblx0Zm9yICggOyBpIDwgbGVuOyBpKysgKSB7XG5cdFx0U2l6emxlKCBzZWxlY3RvciwgY29udGV4dHNbaV0sIHJlc3VsdHMgKTtcblx0fVxuXHRyZXR1cm4gcmVzdWx0cztcbn1cblxuZnVuY3Rpb24gY29uZGVuc2UoIHVubWF0Y2hlZCwgbWFwLCBmaWx0ZXIsIGNvbnRleHQsIHhtbCApIHtcblx0dmFyIGVsZW0sXG5cdFx0bmV3VW5tYXRjaGVkID0gW10sXG5cdFx0aSA9IDAsXG5cdFx0bGVuID0gdW5tYXRjaGVkLmxlbmd0aCxcblx0XHRtYXBwZWQgPSBtYXAgIT0gbnVsbDtcblxuXHRmb3IgKCA7IGkgPCBsZW47IGkrKyApIHtcblx0XHRpZiAoIChlbGVtID0gdW5tYXRjaGVkW2ldKSApIHtcblx0XHRcdGlmICggIWZpbHRlciB8fCBmaWx0ZXIoIGVsZW0sIGNvbnRleHQsIHhtbCApICkge1xuXHRcdFx0XHRuZXdVbm1hdGNoZWQucHVzaCggZWxlbSApO1xuXHRcdFx0XHRpZiAoIG1hcHBlZCApIHtcblx0XHRcdFx0XHRtYXAucHVzaCggaSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIG5ld1VubWF0Y2hlZDtcbn1cblxuZnVuY3Rpb24gc2V0TWF0Y2hlciggcHJlRmlsdGVyLCBzZWxlY3RvciwgbWF0Y2hlciwgcG9zdEZpbHRlciwgcG9zdEZpbmRlciwgcG9zdFNlbGVjdG9yICkge1xuXHRpZiAoIHBvc3RGaWx0ZXIgJiYgIXBvc3RGaWx0ZXJbIGV4cGFuZG8gXSApIHtcblx0XHRwb3N0RmlsdGVyID0gc2V0TWF0Y2hlciggcG9zdEZpbHRlciApO1xuXHR9XG5cdGlmICggcG9zdEZpbmRlciAmJiAhcG9zdEZpbmRlclsgZXhwYW5kbyBdICkge1xuXHRcdHBvc3RGaW5kZXIgPSBzZXRNYXRjaGVyKCBwb3N0RmluZGVyLCBwb3N0U2VsZWN0b3IgKTtcblx0fVxuXHRyZXR1cm4gbWFya0Z1bmN0aW9uKGZ1bmN0aW9uKCBzZWVkLCByZXN1bHRzLCBjb250ZXh0LCB4bWwgKSB7XG5cdFx0dmFyIHRlbXAsIGksIGVsZW0sXG5cdFx0XHRwcmVNYXAgPSBbXSxcblx0XHRcdHBvc3RNYXAgPSBbXSxcblx0XHRcdHByZWV4aXN0aW5nID0gcmVzdWx0cy5sZW5ndGgsXG5cblx0XHRcdC8vIEdldCBpbml0aWFsIGVsZW1lbnRzIGZyb20gc2VlZCBvciBjb250ZXh0XG5cdFx0XHRlbGVtcyA9IHNlZWQgfHwgbXVsdGlwbGVDb250ZXh0cyggc2VsZWN0b3IgfHwgXCIqXCIsIGNvbnRleHQubm9kZVR5cGUgPyBbIGNvbnRleHQgXSA6IGNvbnRleHQsIFtdICksXG5cblx0XHRcdC8vIFByZWZpbHRlciB0byBnZXQgbWF0Y2hlciBpbnB1dCwgcHJlc2VydmluZyBhIG1hcCBmb3Igc2VlZC1yZXN1bHRzIHN5bmNocm9uaXphdGlvblxuXHRcdFx0bWF0Y2hlckluID0gcHJlRmlsdGVyICYmICggc2VlZCB8fCAhc2VsZWN0b3IgKSA/XG5cdFx0XHRcdGNvbmRlbnNlKCBlbGVtcywgcHJlTWFwLCBwcmVGaWx0ZXIsIGNvbnRleHQsIHhtbCApIDpcblx0XHRcdFx0ZWxlbXMsXG5cblx0XHRcdG1hdGNoZXJPdXQgPSBtYXRjaGVyID9cblx0XHRcdFx0Ly8gSWYgd2UgaGF2ZSBhIHBvc3RGaW5kZXIsIG9yIGZpbHRlcmVkIHNlZWQsIG9yIG5vbi1zZWVkIHBvc3RGaWx0ZXIgb3IgcHJlZXhpc3RpbmcgcmVzdWx0cyxcblx0XHRcdFx0cG9zdEZpbmRlciB8fCAoIHNlZWQgPyBwcmVGaWx0ZXIgOiBwcmVleGlzdGluZyB8fCBwb3N0RmlsdGVyICkgP1xuXG5cdFx0XHRcdFx0Ly8gLi4uaW50ZXJtZWRpYXRlIHByb2Nlc3NpbmcgaXMgbmVjZXNzYXJ5XG5cdFx0XHRcdFx0W10gOlxuXG5cdFx0XHRcdFx0Ly8gLi4ub3RoZXJ3aXNlIHVzZSByZXN1bHRzIGRpcmVjdGx5XG5cdFx0XHRcdFx0cmVzdWx0cyA6XG5cdFx0XHRcdG1hdGNoZXJJbjtcblxuXHRcdC8vIEZpbmQgcHJpbWFyeSBtYXRjaGVzXG5cdFx0aWYgKCBtYXRjaGVyICkge1xuXHRcdFx0bWF0Y2hlciggbWF0Y2hlckluLCBtYXRjaGVyT3V0LCBjb250ZXh0LCB4bWwgKTtcblx0XHR9XG5cblx0XHQvLyBBcHBseSBwb3N0RmlsdGVyXG5cdFx0aWYgKCBwb3N0RmlsdGVyICkge1xuXHRcdFx0dGVtcCA9IGNvbmRlbnNlKCBtYXRjaGVyT3V0LCBwb3N0TWFwICk7XG5cdFx0XHRwb3N0RmlsdGVyKCB0ZW1wLCBbXSwgY29udGV4dCwgeG1sICk7XG5cblx0XHRcdC8vIFVuLW1hdGNoIGZhaWxpbmcgZWxlbWVudHMgYnkgbW92aW5nIHRoZW0gYmFjayB0byBtYXRjaGVySW5cblx0XHRcdGkgPSB0ZW1wLmxlbmd0aDtcblx0XHRcdHdoaWxlICggaS0tICkge1xuXHRcdFx0XHRpZiAoIChlbGVtID0gdGVtcFtpXSkgKSB7XG5cdFx0XHRcdFx0bWF0Y2hlck91dFsgcG9zdE1hcFtpXSBdID0gIShtYXRjaGVySW5bIHBvc3RNYXBbaV0gXSA9IGVsZW0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKCBzZWVkICkge1xuXHRcdFx0aWYgKCBwb3N0RmluZGVyIHx8IHByZUZpbHRlciApIHtcblx0XHRcdFx0aWYgKCBwb3N0RmluZGVyICkge1xuXHRcdFx0XHRcdC8vIEdldCB0aGUgZmluYWwgbWF0Y2hlck91dCBieSBjb25kZW5zaW5nIHRoaXMgaW50ZXJtZWRpYXRlIGludG8gcG9zdEZpbmRlciBjb250ZXh0c1xuXHRcdFx0XHRcdHRlbXAgPSBbXTtcblx0XHRcdFx0XHRpID0gbWF0Y2hlck91dC5sZW5ndGg7XG5cdFx0XHRcdFx0d2hpbGUgKCBpLS0gKSB7XG5cdFx0XHRcdFx0XHRpZiAoIChlbGVtID0gbWF0Y2hlck91dFtpXSkgKSB7XG5cdFx0XHRcdFx0XHRcdC8vIFJlc3RvcmUgbWF0Y2hlckluIHNpbmNlIGVsZW0gaXMgbm90IHlldCBhIGZpbmFsIG1hdGNoXG5cdFx0XHRcdFx0XHRcdHRlbXAucHVzaCggKG1hdGNoZXJJbltpXSA9IGVsZW0pICk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHBvc3RGaW5kZXIoIG51bGwsIChtYXRjaGVyT3V0ID0gW10pLCB0ZW1wLCB4bWwgKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIE1vdmUgbWF0Y2hlZCBlbGVtZW50cyBmcm9tIHNlZWQgdG8gcmVzdWx0cyB0byBrZWVwIHRoZW0gc3luY2hyb25pemVkXG5cdFx0XHRcdGkgPSBtYXRjaGVyT3V0Lmxlbmd0aDtcblx0XHRcdFx0d2hpbGUgKCBpLS0gKSB7XG5cdFx0XHRcdFx0aWYgKCAoZWxlbSA9IG1hdGNoZXJPdXRbaV0pICYmXG5cdFx0XHRcdFx0XHQodGVtcCA9IHBvc3RGaW5kZXIgPyBpbmRleE9mKCBzZWVkLCBlbGVtICkgOiBwcmVNYXBbaV0pID4gLTEgKSB7XG5cblx0XHRcdFx0XHRcdHNlZWRbdGVtcF0gPSAhKHJlc3VsdHNbdGVtcF0gPSBlbGVtKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdC8vIEFkZCBlbGVtZW50cyB0byByZXN1bHRzLCB0aHJvdWdoIHBvc3RGaW5kZXIgaWYgZGVmaW5lZFxuXHRcdH0gZWxzZSB7XG5cdFx0XHRtYXRjaGVyT3V0ID0gY29uZGVuc2UoXG5cdFx0XHRcdG1hdGNoZXJPdXQgPT09IHJlc3VsdHMgP1xuXHRcdFx0XHRcdG1hdGNoZXJPdXQuc3BsaWNlKCBwcmVleGlzdGluZywgbWF0Y2hlck91dC5sZW5ndGggKSA6XG5cdFx0XHRcdFx0bWF0Y2hlck91dFxuXHRcdFx0KTtcblx0XHRcdGlmICggcG9zdEZpbmRlciApIHtcblx0XHRcdFx0cG9zdEZpbmRlciggbnVsbCwgcmVzdWx0cywgbWF0Y2hlck91dCwgeG1sICk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRwdXNoLmFwcGx5KCByZXN1bHRzLCBtYXRjaGVyT3V0ICk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9KTtcbn1cblxuZnVuY3Rpb24gbWF0Y2hlckZyb21Ub2tlbnMoIHRva2VucyApIHtcblx0dmFyIGNoZWNrQ29udGV4dCwgbWF0Y2hlciwgaixcblx0XHRsZW4gPSB0b2tlbnMubGVuZ3RoLFxuXHRcdGxlYWRpbmdSZWxhdGl2ZSA9IEV4cHIucmVsYXRpdmVbIHRva2Vuc1swXS50eXBlIF0sXG5cdFx0aW1wbGljaXRSZWxhdGl2ZSA9IGxlYWRpbmdSZWxhdGl2ZSB8fCBFeHByLnJlbGF0aXZlW1wiIFwiXSxcblx0XHRpID0gbGVhZGluZ1JlbGF0aXZlID8gMSA6IDAsXG5cblx0XHQvLyBUaGUgZm91bmRhdGlvbmFsIG1hdGNoZXIgZW5zdXJlcyB0aGF0IGVsZW1lbnRzIGFyZSByZWFjaGFibGUgZnJvbSB0b3AtbGV2ZWwgY29udGV4dChzKVxuXHRcdG1hdGNoQ29udGV4dCA9IGFkZENvbWJpbmF0b3IoIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0cmV0dXJuIGVsZW0gPT09IGNoZWNrQ29udGV4dDtcblx0XHR9LCBpbXBsaWNpdFJlbGF0aXZlLCB0cnVlICksXG5cdFx0bWF0Y2hBbnlDb250ZXh0ID0gYWRkQ29tYmluYXRvciggZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRyZXR1cm4gaW5kZXhPZiggY2hlY2tDb250ZXh0LCBlbGVtICkgPiAtMTtcblx0XHR9LCBpbXBsaWNpdFJlbGF0aXZlLCB0cnVlICksXG5cdFx0bWF0Y2hlcnMgPSBbIGZ1bmN0aW9uKCBlbGVtLCBjb250ZXh0LCB4bWwgKSB7XG5cdFx0XHR2YXIgcmV0ID0gKCAhbGVhZGluZ1JlbGF0aXZlICYmICggeG1sIHx8IGNvbnRleHQgIT09IG91dGVybW9zdENvbnRleHQgKSApIHx8IChcblx0XHRcdFx0KGNoZWNrQ29udGV4dCA9IGNvbnRleHQpLm5vZGVUeXBlID9cblx0XHRcdFx0XHRtYXRjaENvbnRleHQoIGVsZW0sIGNvbnRleHQsIHhtbCApIDpcblx0XHRcdFx0XHRtYXRjaEFueUNvbnRleHQoIGVsZW0sIGNvbnRleHQsIHhtbCApICk7XG5cdFx0XHQvLyBBdm9pZCBoYW5naW5nIG9udG8gZWxlbWVudCAoaXNzdWUgIzI5OSlcblx0XHRcdGNoZWNrQ29udGV4dCA9IG51bGw7XG5cdFx0XHRyZXR1cm4gcmV0O1xuXHRcdH0gXTtcblxuXHRmb3IgKCA7IGkgPCBsZW47IGkrKyApIHtcblx0XHRpZiAoIChtYXRjaGVyID0gRXhwci5yZWxhdGl2ZVsgdG9rZW5zW2ldLnR5cGUgXSkgKSB7XG5cdFx0XHRtYXRjaGVycyA9IFsgYWRkQ29tYmluYXRvcihlbGVtZW50TWF0Y2hlciggbWF0Y2hlcnMgKSwgbWF0Y2hlcikgXTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0bWF0Y2hlciA9IEV4cHIuZmlsdGVyWyB0b2tlbnNbaV0udHlwZSBdLmFwcGx5KCBudWxsLCB0b2tlbnNbaV0ubWF0Y2hlcyApO1xuXG5cdFx0XHQvLyBSZXR1cm4gc3BlY2lhbCB1cG9uIHNlZWluZyBhIHBvc2l0aW9uYWwgbWF0Y2hlclxuXHRcdFx0aWYgKCBtYXRjaGVyWyBleHBhbmRvIF0gKSB7XG5cdFx0XHRcdC8vIEZpbmQgdGhlIG5leHQgcmVsYXRpdmUgb3BlcmF0b3IgKGlmIGFueSkgZm9yIHByb3BlciBoYW5kbGluZ1xuXHRcdFx0XHRqID0gKytpO1xuXHRcdFx0XHRmb3IgKCA7IGogPCBsZW47IGorKyApIHtcblx0XHRcdFx0XHRpZiAoIEV4cHIucmVsYXRpdmVbIHRva2Vuc1tqXS50eXBlIF0gKSB7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHNldE1hdGNoZXIoXG5cdFx0XHRcdFx0aSA+IDEgJiYgZWxlbWVudE1hdGNoZXIoIG1hdGNoZXJzICksXG5cdFx0XHRcdFx0aSA+IDEgJiYgdG9TZWxlY3Rvcihcblx0XHRcdFx0XHRcdC8vIElmIHRoZSBwcmVjZWRpbmcgdG9rZW4gd2FzIGEgZGVzY2VuZGFudCBjb21iaW5hdG9yLCBpbnNlcnQgYW4gaW1wbGljaXQgYW55LWVsZW1lbnQgYCpgXG5cdFx0XHRcdFx0XHR0b2tlbnMuc2xpY2UoIDAsIGkgLSAxICkuY29uY2F0KHsgdmFsdWU6IHRva2Vuc1sgaSAtIDIgXS50eXBlID09PSBcIiBcIiA/IFwiKlwiIDogXCJcIiB9KVxuXHRcdFx0XHRcdCkucmVwbGFjZSggcnRyaW0sIFwiJDFcIiApLFxuXHRcdFx0XHRcdG1hdGNoZXIsXG5cdFx0XHRcdFx0aSA8IGogJiYgbWF0Y2hlckZyb21Ub2tlbnMoIHRva2Vucy5zbGljZSggaSwgaiApICksXG5cdFx0XHRcdFx0aiA8IGxlbiAmJiBtYXRjaGVyRnJvbVRva2VucyggKHRva2VucyA9IHRva2Vucy5zbGljZSggaiApKSApLFxuXHRcdFx0XHRcdGogPCBsZW4gJiYgdG9TZWxlY3RvciggdG9rZW5zIClcblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHRcdG1hdGNoZXJzLnB1c2goIG1hdGNoZXIgKTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gZWxlbWVudE1hdGNoZXIoIG1hdGNoZXJzICk7XG59XG5cbmZ1bmN0aW9uIG1hdGNoZXJGcm9tR3JvdXBNYXRjaGVycyggZWxlbWVudE1hdGNoZXJzLCBzZXRNYXRjaGVycyApIHtcblx0dmFyIGJ5U2V0ID0gc2V0TWF0Y2hlcnMubGVuZ3RoID4gMCxcblx0XHRieUVsZW1lbnQgPSBlbGVtZW50TWF0Y2hlcnMubGVuZ3RoID4gMCxcblx0XHRzdXBlck1hdGNoZXIgPSBmdW5jdGlvbiggc2VlZCwgY29udGV4dCwgeG1sLCByZXN1bHRzLCBvdXRlcm1vc3QgKSB7XG5cdFx0XHR2YXIgZWxlbSwgaiwgbWF0Y2hlcixcblx0XHRcdFx0bWF0Y2hlZENvdW50ID0gMCxcblx0XHRcdFx0aSA9IFwiMFwiLFxuXHRcdFx0XHR1bm1hdGNoZWQgPSBzZWVkICYmIFtdLFxuXHRcdFx0XHRzZXRNYXRjaGVkID0gW10sXG5cdFx0XHRcdGNvbnRleHRCYWNrdXAgPSBvdXRlcm1vc3RDb250ZXh0LFxuXHRcdFx0XHQvLyBXZSBtdXN0IGFsd2F5cyBoYXZlIGVpdGhlciBzZWVkIGVsZW1lbnRzIG9yIG91dGVybW9zdCBjb250ZXh0XG5cdFx0XHRcdGVsZW1zID0gc2VlZCB8fCBieUVsZW1lbnQgJiYgRXhwci5maW5kW1wiVEFHXCJdKCBcIipcIiwgb3V0ZXJtb3N0ICksXG5cdFx0XHRcdC8vIFVzZSBpbnRlZ2VyIGRpcnJ1bnMgaWZmIHRoaXMgaXMgdGhlIG91dGVybW9zdCBtYXRjaGVyXG5cdFx0XHRcdGRpcnJ1bnNVbmlxdWUgPSAoZGlycnVucyArPSBjb250ZXh0QmFja3VwID09IG51bGwgPyAxIDogTWF0aC5yYW5kb20oKSB8fCAwLjEpLFxuXHRcdFx0XHRsZW4gPSBlbGVtcy5sZW5ndGg7XG5cblx0XHRcdGlmICggb3V0ZXJtb3N0ICkge1xuXHRcdFx0XHRvdXRlcm1vc3RDb250ZXh0ID0gY29udGV4dCA9PT0gZG9jdW1lbnQgfHwgY29udGV4dCB8fCBvdXRlcm1vc3Q7XG5cdFx0XHR9XG5cblx0XHRcdC8vIEFkZCBlbGVtZW50cyBwYXNzaW5nIGVsZW1lbnRNYXRjaGVycyBkaXJlY3RseSB0byByZXN1bHRzXG5cdFx0XHQvLyBTdXBwb3J0OiBJRTw5LCBTYWZhcmlcblx0XHRcdC8vIFRvbGVyYXRlIE5vZGVMaXN0IHByb3BlcnRpZXMgKElFOiBcImxlbmd0aFwiOyBTYWZhcmk6IDxudW1iZXI+KSBtYXRjaGluZyBlbGVtZW50cyBieSBpZFxuXHRcdFx0Zm9yICggOyBpICE9PSBsZW4gJiYgKGVsZW0gPSBlbGVtc1tpXSkgIT0gbnVsbDsgaSsrICkge1xuXHRcdFx0XHRpZiAoIGJ5RWxlbWVudCAmJiBlbGVtICkge1xuXHRcdFx0XHRcdGogPSAwO1xuXHRcdFx0XHRcdGlmICggIWNvbnRleHQgJiYgZWxlbS5vd25lckRvY3VtZW50ICE9PSBkb2N1bWVudCApIHtcblx0XHRcdFx0XHRcdHNldERvY3VtZW50KCBlbGVtICk7XG5cdFx0XHRcdFx0XHR4bWwgPSAhZG9jdW1lbnRJc0hUTUw7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHdoaWxlICggKG1hdGNoZXIgPSBlbGVtZW50TWF0Y2hlcnNbaisrXSkgKSB7XG5cdFx0XHRcdFx0XHRpZiAoIG1hdGNoZXIoIGVsZW0sIGNvbnRleHQgfHwgZG9jdW1lbnQsIHhtbCkgKSB7XG5cdFx0XHRcdFx0XHRcdHJlc3VsdHMucHVzaCggZWxlbSApO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKCBvdXRlcm1vc3QgKSB7XG5cdFx0XHRcdFx0XHRkaXJydW5zID0gZGlycnVuc1VuaXF1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBUcmFjayB1bm1hdGNoZWQgZWxlbWVudHMgZm9yIHNldCBmaWx0ZXJzXG5cdFx0XHRcdGlmICggYnlTZXQgKSB7XG5cdFx0XHRcdFx0Ly8gVGhleSB3aWxsIGhhdmUgZ29uZSB0aHJvdWdoIGFsbCBwb3NzaWJsZSBtYXRjaGVyc1xuXHRcdFx0XHRcdGlmICggKGVsZW0gPSAhbWF0Y2hlciAmJiBlbGVtKSApIHtcblx0XHRcdFx0XHRcdG1hdGNoZWRDb3VudC0tO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIExlbmd0aGVuIHRoZSBhcnJheSBmb3IgZXZlcnkgZWxlbWVudCwgbWF0Y2hlZCBvciBub3Rcblx0XHRcdFx0XHRpZiAoIHNlZWQgKSB7XG5cdFx0XHRcdFx0XHR1bm1hdGNoZWQucHVzaCggZWxlbSApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBgaWAgaXMgbm93IHRoZSBjb3VudCBvZiBlbGVtZW50cyB2aXNpdGVkIGFib3ZlLCBhbmQgYWRkaW5nIGl0IHRvIGBtYXRjaGVkQ291bnRgXG5cdFx0XHQvLyBtYWtlcyB0aGUgbGF0dGVyIG5vbm5lZ2F0aXZlLlxuXHRcdFx0bWF0Y2hlZENvdW50ICs9IGk7XG5cblx0XHRcdC8vIEFwcGx5IHNldCBmaWx0ZXJzIHRvIHVubWF0Y2hlZCBlbGVtZW50c1xuXHRcdFx0Ly8gTk9URTogVGhpcyBjYW4gYmUgc2tpcHBlZCBpZiB0aGVyZSBhcmUgbm8gdW5tYXRjaGVkIGVsZW1lbnRzIChpLmUuLCBgbWF0Y2hlZENvdW50YFxuXHRcdFx0Ly8gZXF1YWxzIGBpYCksIHVubGVzcyB3ZSBkaWRuJ3QgdmlzaXQgX2FueV8gZWxlbWVudHMgaW4gdGhlIGFib3ZlIGxvb3AgYmVjYXVzZSB3ZSBoYXZlXG5cdFx0XHQvLyBubyBlbGVtZW50IG1hdGNoZXJzIGFuZCBubyBzZWVkLlxuXHRcdFx0Ly8gSW5jcmVtZW50aW5nIGFuIGluaXRpYWxseS1zdHJpbmcgXCIwXCIgYGlgIGFsbG93cyBgaWAgdG8gcmVtYWluIGEgc3RyaW5nIG9ubHkgaW4gdGhhdFxuXHRcdFx0Ly8gY2FzZSwgd2hpY2ggd2lsbCByZXN1bHQgaW4gYSBcIjAwXCIgYG1hdGNoZWRDb3VudGAgdGhhdCBkaWZmZXJzIGZyb20gYGlgIGJ1dCBpcyBhbHNvXG5cdFx0XHQvLyBudW1lcmljYWxseSB6ZXJvLlxuXHRcdFx0aWYgKCBieVNldCAmJiBpICE9PSBtYXRjaGVkQ291bnQgKSB7XG5cdFx0XHRcdGogPSAwO1xuXHRcdFx0XHR3aGlsZSAoIChtYXRjaGVyID0gc2V0TWF0Y2hlcnNbaisrXSkgKSB7XG5cdFx0XHRcdFx0bWF0Y2hlciggdW5tYXRjaGVkLCBzZXRNYXRjaGVkLCBjb250ZXh0LCB4bWwgKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICggc2VlZCApIHtcblx0XHRcdFx0XHQvLyBSZWludGVncmF0ZSBlbGVtZW50IG1hdGNoZXMgdG8gZWxpbWluYXRlIHRoZSBuZWVkIGZvciBzb3J0aW5nXG5cdFx0XHRcdFx0aWYgKCBtYXRjaGVkQ291bnQgPiAwICkge1xuXHRcdFx0XHRcdFx0d2hpbGUgKCBpLS0gKSB7XG5cdFx0XHRcdFx0XHRcdGlmICggISh1bm1hdGNoZWRbaV0gfHwgc2V0TWF0Y2hlZFtpXSkgKSB7XG5cdFx0XHRcdFx0XHRcdFx0c2V0TWF0Y2hlZFtpXSA9IHBvcC5jYWxsKCByZXN1bHRzICk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBEaXNjYXJkIGluZGV4IHBsYWNlaG9sZGVyIHZhbHVlcyB0byBnZXQgb25seSBhY3R1YWwgbWF0Y2hlc1xuXHRcdFx0XHRcdHNldE1hdGNoZWQgPSBjb25kZW5zZSggc2V0TWF0Y2hlZCApO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gQWRkIG1hdGNoZXMgdG8gcmVzdWx0c1xuXHRcdFx0XHRwdXNoLmFwcGx5KCByZXN1bHRzLCBzZXRNYXRjaGVkICk7XG5cblx0XHRcdFx0Ly8gU2VlZGxlc3Mgc2V0IG1hdGNoZXMgc3VjY2VlZGluZyBtdWx0aXBsZSBzdWNjZXNzZnVsIG1hdGNoZXJzIHN0aXB1bGF0ZSBzb3J0aW5nXG5cdFx0XHRcdGlmICggb3V0ZXJtb3N0ICYmICFzZWVkICYmIHNldE1hdGNoZWQubGVuZ3RoID4gMCAmJlxuXHRcdFx0XHRcdCggbWF0Y2hlZENvdW50ICsgc2V0TWF0Y2hlcnMubGVuZ3RoICkgPiAxICkge1xuXG5cdFx0XHRcdFx0U2l6emxlLnVuaXF1ZVNvcnQoIHJlc3VsdHMgKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBPdmVycmlkZSBtYW5pcHVsYXRpb24gb2YgZ2xvYmFscyBieSBuZXN0ZWQgbWF0Y2hlcnNcblx0XHRcdGlmICggb3V0ZXJtb3N0ICkge1xuXHRcdFx0XHRkaXJydW5zID0gZGlycnVuc1VuaXF1ZTtcblx0XHRcdFx0b3V0ZXJtb3N0Q29udGV4dCA9IGNvbnRleHRCYWNrdXA7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiB1bm1hdGNoZWQ7XG5cdFx0fTtcblxuXHRyZXR1cm4gYnlTZXQgP1xuXHRcdG1hcmtGdW5jdGlvbiggc3VwZXJNYXRjaGVyICkgOlxuXHRcdHN1cGVyTWF0Y2hlcjtcbn1cblxuY29tcGlsZSA9IFNpenpsZS5jb21waWxlID0gZnVuY3Rpb24oIHNlbGVjdG9yLCBtYXRjaCAvKiBJbnRlcm5hbCBVc2UgT25seSAqLyApIHtcblx0dmFyIGksXG5cdFx0c2V0TWF0Y2hlcnMgPSBbXSxcblx0XHRlbGVtZW50TWF0Y2hlcnMgPSBbXSxcblx0XHRjYWNoZWQgPSBjb21waWxlckNhY2hlWyBzZWxlY3RvciArIFwiIFwiIF07XG5cblx0aWYgKCAhY2FjaGVkICkge1xuXHRcdC8vIEdlbmVyYXRlIGEgZnVuY3Rpb24gb2YgcmVjdXJzaXZlIGZ1bmN0aW9ucyB0aGF0IGNhbiBiZSB1c2VkIHRvIGNoZWNrIGVhY2ggZWxlbWVudFxuXHRcdGlmICggIW1hdGNoICkge1xuXHRcdFx0bWF0Y2ggPSB0b2tlbml6ZSggc2VsZWN0b3IgKTtcblx0XHR9XG5cdFx0aSA9IG1hdGNoLmxlbmd0aDtcblx0XHR3aGlsZSAoIGktLSApIHtcblx0XHRcdGNhY2hlZCA9IG1hdGNoZXJGcm9tVG9rZW5zKCBtYXRjaFtpXSApO1xuXHRcdFx0aWYgKCBjYWNoZWRbIGV4cGFuZG8gXSApIHtcblx0XHRcdFx0c2V0TWF0Y2hlcnMucHVzaCggY2FjaGVkICk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRlbGVtZW50TWF0Y2hlcnMucHVzaCggY2FjaGVkICk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gQ2FjaGUgdGhlIGNvbXBpbGVkIGZ1bmN0aW9uXG5cdFx0Y2FjaGVkID0gY29tcGlsZXJDYWNoZSggc2VsZWN0b3IsIG1hdGNoZXJGcm9tR3JvdXBNYXRjaGVycyggZWxlbWVudE1hdGNoZXJzLCBzZXRNYXRjaGVycyApICk7XG5cblx0XHQvLyBTYXZlIHNlbGVjdG9yIGFuZCB0b2tlbml6YXRpb25cblx0XHRjYWNoZWQuc2VsZWN0b3IgPSBzZWxlY3Rvcjtcblx0fVxuXHRyZXR1cm4gY2FjaGVkO1xufTtcblxuLyoqXG4gKiBBIGxvdy1sZXZlbCBzZWxlY3Rpb24gZnVuY3Rpb24gdGhhdCB3b3JrcyB3aXRoIFNpenpsZSdzIGNvbXBpbGVkXG4gKiAgc2VsZWN0b3IgZnVuY3Rpb25zXG4gKiBAcGFyYW0ge1N0cmluZ3xGdW5jdGlvbn0gc2VsZWN0b3IgQSBzZWxlY3RvciBvciBhIHByZS1jb21waWxlZFxuICogIHNlbGVjdG9yIGZ1bmN0aW9uIGJ1aWx0IHdpdGggU2l6emxlLmNvbXBpbGVcbiAqIEBwYXJhbSB7RWxlbWVudH0gY29udGV4dFxuICogQHBhcmFtIHtBcnJheX0gW3Jlc3VsdHNdXG4gKiBAcGFyYW0ge0FycmF5fSBbc2VlZF0gQSBzZXQgb2YgZWxlbWVudHMgdG8gbWF0Y2ggYWdhaW5zdFxuICovXG5zZWxlY3QgPSBTaXp6bGUuc2VsZWN0ID0gZnVuY3Rpb24oIHNlbGVjdG9yLCBjb250ZXh0LCByZXN1bHRzLCBzZWVkICkge1xuXHR2YXIgaSwgdG9rZW5zLCB0b2tlbiwgdHlwZSwgZmluZCxcblx0XHRjb21waWxlZCA9IHR5cGVvZiBzZWxlY3RvciA9PT0gXCJmdW5jdGlvblwiICYmIHNlbGVjdG9yLFxuXHRcdG1hdGNoID0gIXNlZWQgJiYgdG9rZW5pemUoIChzZWxlY3RvciA9IGNvbXBpbGVkLnNlbGVjdG9yIHx8IHNlbGVjdG9yKSApO1xuXG5cdHJlc3VsdHMgPSByZXN1bHRzIHx8IFtdO1xuXG5cdC8vIFRyeSB0byBtaW5pbWl6ZSBvcGVyYXRpb25zIGlmIHRoZXJlIGlzIG9ubHkgb25lIHNlbGVjdG9yIGluIHRoZSBsaXN0IGFuZCBubyBzZWVkXG5cdC8vICh0aGUgbGF0dGVyIG9mIHdoaWNoIGd1YXJhbnRlZXMgdXMgY29udGV4dClcblx0aWYgKCBtYXRjaC5sZW5ndGggPT09IDEgKSB7XG5cblx0XHQvLyBSZWR1Y2UgY29udGV4dCBpZiB0aGUgbGVhZGluZyBjb21wb3VuZCBzZWxlY3RvciBpcyBhbiBJRFxuXHRcdHRva2VucyA9IG1hdGNoWzBdID0gbWF0Y2hbMF0uc2xpY2UoIDAgKTtcblx0XHRpZiAoIHRva2Vucy5sZW5ndGggPiAyICYmICh0b2tlbiA9IHRva2Vuc1swXSkudHlwZSA9PT0gXCJJRFwiICYmXG5cdFx0XHRcdHN1cHBvcnQuZ2V0QnlJZCAmJiBjb250ZXh0Lm5vZGVUeXBlID09PSA5ICYmIGRvY3VtZW50SXNIVE1MICYmXG5cdFx0XHRcdEV4cHIucmVsYXRpdmVbIHRva2Vuc1sxXS50eXBlIF0gKSB7XG5cblx0XHRcdGNvbnRleHQgPSAoIEV4cHIuZmluZFtcIklEXCJdKCB0b2tlbi5tYXRjaGVzWzBdLnJlcGxhY2UocnVuZXNjYXBlLCBmdW5lc2NhcGUpLCBjb250ZXh0ICkgfHwgW10gKVswXTtcblx0XHRcdGlmICggIWNvbnRleHQgKSB7XG5cdFx0XHRcdHJldHVybiByZXN1bHRzO1xuXG5cdFx0XHQvLyBQcmVjb21waWxlZCBtYXRjaGVycyB3aWxsIHN0aWxsIHZlcmlmeSBhbmNlc3RyeSwgc28gc3RlcCB1cCBhIGxldmVsXG5cdFx0XHR9IGVsc2UgaWYgKCBjb21waWxlZCApIHtcblx0XHRcdFx0Y29udGV4dCA9IGNvbnRleHQucGFyZW50Tm9kZTtcblx0XHRcdH1cblxuXHRcdFx0c2VsZWN0b3IgPSBzZWxlY3Rvci5zbGljZSggdG9rZW5zLnNoaWZ0KCkudmFsdWUubGVuZ3RoICk7XG5cdFx0fVxuXG5cdFx0Ly8gRmV0Y2ggYSBzZWVkIHNldCBmb3IgcmlnaHQtdG8tbGVmdCBtYXRjaGluZ1xuXHRcdGkgPSBtYXRjaEV4cHJbXCJuZWVkc0NvbnRleHRcIl0udGVzdCggc2VsZWN0b3IgKSA/IDAgOiB0b2tlbnMubGVuZ3RoO1xuXHRcdHdoaWxlICggaS0tICkge1xuXHRcdFx0dG9rZW4gPSB0b2tlbnNbaV07XG5cblx0XHRcdC8vIEFib3J0IGlmIHdlIGhpdCBhIGNvbWJpbmF0b3Jcblx0XHRcdGlmICggRXhwci5yZWxhdGl2ZVsgKHR5cGUgPSB0b2tlbi50eXBlKSBdICkge1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdGlmICggKGZpbmQgPSBFeHByLmZpbmRbIHR5cGUgXSkgKSB7XG5cdFx0XHRcdC8vIFNlYXJjaCwgZXhwYW5kaW5nIGNvbnRleHQgZm9yIGxlYWRpbmcgc2libGluZyBjb21iaW5hdG9yc1xuXHRcdFx0XHRpZiAoIChzZWVkID0gZmluZChcblx0XHRcdFx0XHR0b2tlbi5tYXRjaGVzWzBdLnJlcGxhY2UoIHJ1bmVzY2FwZSwgZnVuZXNjYXBlICksXG5cdFx0XHRcdFx0cnNpYmxpbmcudGVzdCggdG9rZW5zWzBdLnR5cGUgKSAmJiB0ZXN0Q29udGV4dCggY29udGV4dC5wYXJlbnROb2RlICkgfHwgY29udGV4dFxuXHRcdFx0XHQpKSApIHtcblxuXHRcdFx0XHRcdC8vIElmIHNlZWQgaXMgZW1wdHkgb3Igbm8gdG9rZW5zIHJlbWFpbiwgd2UgY2FuIHJldHVybiBlYXJseVxuXHRcdFx0XHRcdHRva2Vucy5zcGxpY2UoIGksIDEgKTtcblx0XHRcdFx0XHRzZWxlY3RvciA9IHNlZWQubGVuZ3RoICYmIHRvU2VsZWN0b3IoIHRva2VucyApO1xuXHRcdFx0XHRcdGlmICggIXNlbGVjdG9yICkge1xuXHRcdFx0XHRcdFx0cHVzaC5hcHBseSggcmVzdWx0cywgc2VlZCApO1xuXHRcdFx0XHRcdFx0cmV0dXJuIHJlc3VsdHM7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvLyBDb21waWxlIGFuZCBleGVjdXRlIGEgZmlsdGVyaW5nIGZ1bmN0aW9uIGlmIG9uZSBpcyBub3QgcHJvdmlkZWRcblx0Ly8gUHJvdmlkZSBgbWF0Y2hgIHRvIGF2b2lkIHJldG9rZW5pemF0aW9uIGlmIHdlIG1vZGlmaWVkIHRoZSBzZWxlY3RvciBhYm92ZVxuXHQoIGNvbXBpbGVkIHx8IGNvbXBpbGUoIHNlbGVjdG9yLCBtYXRjaCApICkoXG5cdFx0c2VlZCxcblx0XHRjb250ZXh0LFxuXHRcdCFkb2N1bWVudElzSFRNTCxcblx0XHRyZXN1bHRzLFxuXHRcdCFjb250ZXh0IHx8IHJzaWJsaW5nLnRlc3QoIHNlbGVjdG9yICkgJiYgdGVzdENvbnRleHQoIGNvbnRleHQucGFyZW50Tm9kZSApIHx8IGNvbnRleHRcblx0KTtcblx0cmV0dXJuIHJlc3VsdHM7XG59O1xuXG4vLyBPbmUtdGltZSBhc3NpZ25tZW50c1xuXG4vLyBTb3J0IHN0YWJpbGl0eVxuc3VwcG9ydC5zb3J0U3RhYmxlID0gZXhwYW5kby5zcGxpdChcIlwiKS5zb3J0KCBzb3J0T3JkZXIgKS5qb2luKFwiXCIpID09PSBleHBhbmRvO1xuXG4vLyBTdXBwb3J0OiBDaHJvbWUgMTQtMzUrXG4vLyBBbHdheXMgYXNzdW1lIGR1cGxpY2F0ZXMgaWYgdGhleSBhcmVuJ3QgcGFzc2VkIHRvIHRoZSBjb21wYXJpc29uIGZ1bmN0aW9uXG5zdXBwb3J0LmRldGVjdER1cGxpY2F0ZXMgPSAhIWhhc0R1cGxpY2F0ZTtcblxuLy8gSW5pdGlhbGl6ZSBhZ2FpbnN0IHRoZSBkZWZhdWx0IGRvY3VtZW50XG5zZXREb2N1bWVudCgpO1xuXG4vLyBTdXBwb3J0OiBXZWJraXQ8NTM3LjMyIC0gU2FmYXJpIDYuMC4zL0Nocm9tZSAyNSAoZml4ZWQgaW4gQ2hyb21lIDI3KVxuLy8gRGV0YWNoZWQgbm9kZXMgY29uZm91bmRpbmdseSBmb2xsb3cgKmVhY2ggb3RoZXIqXG5zdXBwb3J0LnNvcnREZXRhY2hlZCA9IGFzc2VydChmdW5jdGlvbiggZGl2MSApIHtcblx0Ly8gU2hvdWxkIHJldHVybiAxLCBidXQgcmV0dXJucyA0IChmb2xsb3dpbmcpXG5cdHJldHVybiBkaXYxLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uKCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpICkgJiAxO1xufSk7XG5cbi8vIFN1cHBvcnQ6IElFPDhcbi8vIFByZXZlbnQgYXR0cmlidXRlL3Byb3BlcnR5IFwiaW50ZXJwb2xhdGlvblwiXG4vLyBodHRwOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvbXM1MzY0MjklMjhWUy44NSUyOS5hc3B4XG5pZiAoICFhc3NlcnQoZnVuY3Rpb24oIGRpdiApIHtcblx0ZGl2LmlubmVySFRNTCA9IFwiPGEgaHJlZj0nIyc+PC9hPlwiO1xuXHRyZXR1cm4gZGl2LmZpcnN0Q2hpbGQuZ2V0QXR0cmlidXRlKFwiaHJlZlwiKSA9PT0gXCIjXCIgO1xufSkgKSB7XG5cdGFkZEhhbmRsZSggXCJ0eXBlfGhyZWZ8aGVpZ2h0fHdpZHRoXCIsIGZ1bmN0aW9uKCBlbGVtLCBuYW1lLCBpc1hNTCApIHtcblx0XHRpZiAoICFpc1hNTCApIHtcblx0XHRcdHJldHVybiBlbGVtLmdldEF0dHJpYnV0ZSggbmFtZSwgbmFtZS50b0xvd2VyQ2FzZSgpID09PSBcInR5cGVcIiA/IDEgOiAyICk7XG5cdFx0fVxuXHR9KTtcbn1cblxuLy8gU3VwcG9ydDogSUU8OVxuLy8gVXNlIGRlZmF1bHRWYWx1ZSBpbiBwbGFjZSBvZiBnZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiKVxuaWYgKCAhc3VwcG9ydC5hdHRyaWJ1dGVzIHx8ICFhc3NlcnQoZnVuY3Rpb24oIGRpdiApIHtcblx0ZGl2LmlubmVySFRNTCA9IFwiPGlucHV0Lz5cIjtcblx0ZGl2LmZpcnN0Q2hpbGQuc2V0QXR0cmlidXRlKCBcInZhbHVlXCIsIFwiXCIgKTtcblx0cmV0dXJuIGRpdi5maXJzdENoaWxkLmdldEF0dHJpYnV0ZSggXCJ2YWx1ZVwiICkgPT09IFwiXCI7XG59KSApIHtcblx0YWRkSGFuZGxlKCBcInZhbHVlXCIsIGZ1bmN0aW9uKCBlbGVtLCBuYW1lLCBpc1hNTCApIHtcblx0XHRpZiAoICFpc1hNTCAmJiBlbGVtLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09IFwiaW5wdXRcIiApIHtcblx0XHRcdHJldHVybiBlbGVtLmRlZmF1bHRWYWx1ZTtcblx0XHR9XG5cdH0pO1xufVxuXG4vLyBTdXBwb3J0OiBJRTw5XG4vLyBVc2UgZ2V0QXR0cmlidXRlTm9kZSB0byBmZXRjaCBib29sZWFucyB3aGVuIGdldEF0dHJpYnV0ZSBsaWVzXG5pZiAoICFhc3NlcnQoZnVuY3Rpb24oIGRpdiApIHtcblx0cmV0dXJuIGRpdi5nZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiKSA9PSBudWxsO1xufSkgKSB7XG5cdGFkZEhhbmRsZSggYm9vbGVhbnMsIGZ1bmN0aW9uKCBlbGVtLCBuYW1lLCBpc1hNTCApIHtcblx0XHR2YXIgdmFsO1xuXHRcdGlmICggIWlzWE1MICkge1xuXHRcdFx0cmV0dXJuIGVsZW1bIG5hbWUgXSA9PT0gdHJ1ZSA/IG5hbWUudG9Mb3dlckNhc2UoKSA6XG5cdFx0XHRcdFx0KHZhbCA9IGVsZW0uZ2V0QXR0cmlidXRlTm9kZSggbmFtZSApKSAmJiB2YWwuc3BlY2lmaWVkID9cblx0XHRcdFx0XHR2YWwudmFsdWUgOlxuXHRcdFx0XHRudWxsO1xuXHRcdH1cblx0fSk7XG59XG5cbnJldHVybiBTaXp6bGU7XG5cbn0pKCB3aW5kb3cgKTtcblxuXG5cbmpRdWVyeS5maW5kID0gU2l6emxlO1xualF1ZXJ5LmV4cHIgPSBTaXp6bGUuc2VsZWN0b3JzO1xualF1ZXJ5LmV4cHJbIFwiOlwiIF0gPSBqUXVlcnkuZXhwci5wc2V1ZG9zO1xualF1ZXJ5LnVuaXF1ZVNvcnQgPSBqUXVlcnkudW5pcXVlID0gU2l6emxlLnVuaXF1ZVNvcnQ7XG5qUXVlcnkudGV4dCA9IFNpenpsZS5nZXRUZXh0O1xualF1ZXJ5LmlzWE1MRG9jID0gU2l6emxlLmlzWE1MO1xualF1ZXJ5LmNvbnRhaW5zID0gU2l6emxlLmNvbnRhaW5zO1xuXG5cblxudmFyIGRpciA9IGZ1bmN0aW9uKCBlbGVtLCBkaXIsIHVudGlsICkge1xuXHR2YXIgbWF0Y2hlZCA9IFtdLFxuXHRcdHRydW5jYXRlID0gdW50aWwgIT09IHVuZGVmaW5lZDtcblxuXHR3aGlsZSAoICggZWxlbSA9IGVsZW1bIGRpciBdICkgJiYgZWxlbS5ub2RlVHlwZSAhPT0gOSApIHtcblx0XHRpZiAoIGVsZW0ubm9kZVR5cGUgPT09IDEgKSB7XG5cdFx0XHRpZiAoIHRydW5jYXRlICYmIGpRdWVyeSggZWxlbSApLmlzKCB1bnRpbCApICkge1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdG1hdGNoZWQucHVzaCggZWxlbSApO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gbWF0Y2hlZDtcbn07XG5cblxudmFyIHNpYmxpbmdzID0gZnVuY3Rpb24oIG4sIGVsZW0gKSB7XG5cdHZhciBtYXRjaGVkID0gW107XG5cblx0Zm9yICggOyBuOyBuID0gbi5uZXh0U2libGluZyApIHtcblx0XHRpZiAoIG4ubm9kZVR5cGUgPT09IDEgJiYgbiAhPT0gZWxlbSApIHtcblx0XHRcdG1hdGNoZWQucHVzaCggbiApO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBtYXRjaGVkO1xufTtcblxuXG52YXIgcm5lZWRzQ29udGV4dCA9IGpRdWVyeS5leHByLm1hdGNoLm5lZWRzQ29udGV4dDtcblxudmFyIHJzaW5nbGVUYWcgPSAoIC9ePChbXFx3LV0rKVxccypcXC8/Pig/OjxcXC9cXDE+fCkkLyApO1xuXG5cblxudmFyIHJpc1NpbXBsZSA9IC9eLlteOiNcXFtcXC4sXSokLztcblxuLy8gSW1wbGVtZW50IHRoZSBpZGVudGljYWwgZnVuY3Rpb25hbGl0eSBmb3IgZmlsdGVyIGFuZCBub3RcbmZ1bmN0aW9uIHdpbm5vdyggZWxlbWVudHMsIHF1YWxpZmllciwgbm90ICkge1xuXHRpZiAoIGpRdWVyeS5pc0Z1bmN0aW9uKCBxdWFsaWZpZXIgKSApIHtcblx0XHRyZXR1cm4galF1ZXJ5LmdyZXAoIGVsZW1lbnRzLCBmdW5jdGlvbiggZWxlbSwgaSApIHtcblx0XHRcdC8qIGpzaGludCAtVzAxOCAqL1xuXHRcdFx0cmV0dXJuICEhcXVhbGlmaWVyLmNhbGwoIGVsZW0sIGksIGVsZW0gKSAhPT0gbm90O1xuXHRcdH0gKTtcblxuXHR9XG5cblx0aWYgKCBxdWFsaWZpZXIubm9kZVR5cGUgKSB7XG5cdFx0cmV0dXJuIGpRdWVyeS5ncmVwKCBlbGVtZW50cywgZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRyZXR1cm4gKCBlbGVtID09PSBxdWFsaWZpZXIgKSAhPT0gbm90O1xuXHRcdH0gKTtcblxuXHR9XG5cblx0aWYgKCB0eXBlb2YgcXVhbGlmaWVyID09PSBcInN0cmluZ1wiICkge1xuXHRcdGlmICggcmlzU2ltcGxlLnRlc3QoIHF1YWxpZmllciApICkge1xuXHRcdFx0cmV0dXJuIGpRdWVyeS5maWx0ZXIoIHF1YWxpZmllciwgZWxlbWVudHMsIG5vdCApO1xuXHRcdH1cblxuXHRcdHF1YWxpZmllciA9IGpRdWVyeS5maWx0ZXIoIHF1YWxpZmllciwgZWxlbWVudHMgKTtcblx0fVxuXG5cdHJldHVybiBqUXVlcnkuZ3JlcCggZWxlbWVudHMsIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdHJldHVybiAoIGluZGV4T2YuY2FsbCggcXVhbGlmaWVyLCBlbGVtICkgPiAtMSApICE9PSBub3Q7XG5cdH0gKTtcbn1cblxualF1ZXJ5LmZpbHRlciA9IGZ1bmN0aW9uKCBleHByLCBlbGVtcywgbm90ICkge1xuXHR2YXIgZWxlbSA9IGVsZW1zWyAwIF07XG5cblx0aWYgKCBub3QgKSB7XG5cdFx0ZXhwciA9IFwiOm5vdChcIiArIGV4cHIgKyBcIilcIjtcblx0fVxuXG5cdHJldHVybiBlbGVtcy5sZW5ndGggPT09IDEgJiYgZWxlbS5ub2RlVHlwZSA9PT0gMSA/XG5cdFx0alF1ZXJ5LmZpbmQubWF0Y2hlc1NlbGVjdG9yKCBlbGVtLCBleHByICkgPyBbIGVsZW0gXSA6IFtdIDpcblx0XHRqUXVlcnkuZmluZC5tYXRjaGVzKCBleHByLCBqUXVlcnkuZ3JlcCggZWxlbXMsIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0cmV0dXJuIGVsZW0ubm9kZVR5cGUgPT09IDE7XG5cdFx0fSApICk7XG59O1xuXG5qUXVlcnkuZm4uZXh0ZW5kKCB7XG5cdGZpbmQ6IGZ1bmN0aW9uKCBzZWxlY3RvciApIHtcblx0XHR2YXIgaSxcblx0XHRcdGxlbiA9IHRoaXMubGVuZ3RoLFxuXHRcdFx0cmV0ID0gW10sXG5cdFx0XHRzZWxmID0gdGhpcztcblxuXHRcdGlmICggdHlwZW9mIHNlbGVjdG9yICE9PSBcInN0cmluZ1wiICkge1xuXHRcdFx0cmV0dXJuIHRoaXMucHVzaFN0YWNrKCBqUXVlcnkoIHNlbGVjdG9yICkuZmlsdGVyKCBmdW5jdGlvbigpIHtcblx0XHRcdFx0Zm9yICggaSA9IDA7IGkgPCBsZW47IGkrKyApIHtcblx0XHRcdFx0XHRpZiAoIGpRdWVyeS5jb250YWlucyggc2VsZlsgaSBdLCB0aGlzICkgKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0gKSApO1xuXHRcdH1cblxuXHRcdGZvciAoIGkgPSAwOyBpIDwgbGVuOyBpKysgKSB7XG5cdFx0XHRqUXVlcnkuZmluZCggc2VsZWN0b3IsIHNlbGZbIGkgXSwgcmV0ICk7XG5cdFx0fVxuXG5cdFx0Ly8gTmVlZGVkIGJlY2F1c2UgJCggc2VsZWN0b3IsIGNvbnRleHQgKSBiZWNvbWVzICQoIGNvbnRleHQgKS5maW5kKCBzZWxlY3RvciApXG5cdFx0cmV0ID0gdGhpcy5wdXNoU3RhY2soIGxlbiA+IDEgPyBqUXVlcnkudW5pcXVlKCByZXQgKSA6IHJldCApO1xuXHRcdHJldC5zZWxlY3RvciA9IHRoaXMuc2VsZWN0b3IgPyB0aGlzLnNlbGVjdG9yICsgXCIgXCIgKyBzZWxlY3RvciA6IHNlbGVjdG9yO1xuXHRcdHJldHVybiByZXQ7XG5cdH0sXG5cdGZpbHRlcjogZnVuY3Rpb24oIHNlbGVjdG9yICkge1xuXHRcdHJldHVybiB0aGlzLnB1c2hTdGFjayggd2lubm93KCB0aGlzLCBzZWxlY3RvciB8fCBbXSwgZmFsc2UgKSApO1xuXHR9LFxuXHRub3Q6IGZ1bmN0aW9uKCBzZWxlY3RvciApIHtcblx0XHRyZXR1cm4gdGhpcy5wdXNoU3RhY2soIHdpbm5vdyggdGhpcywgc2VsZWN0b3IgfHwgW10sIHRydWUgKSApO1xuXHR9LFxuXHRpczogZnVuY3Rpb24oIHNlbGVjdG9yICkge1xuXHRcdHJldHVybiAhIXdpbm5vdyhcblx0XHRcdHRoaXMsXG5cblx0XHRcdC8vIElmIHRoaXMgaXMgYSBwb3NpdGlvbmFsL3JlbGF0aXZlIHNlbGVjdG9yLCBjaGVjayBtZW1iZXJzaGlwIGluIHRoZSByZXR1cm5lZCBzZXRcblx0XHRcdC8vIHNvICQoXCJwOmZpcnN0XCIpLmlzKFwicDpsYXN0XCIpIHdvbid0IHJldHVybiB0cnVlIGZvciBhIGRvYyB3aXRoIHR3byBcInBcIi5cblx0XHRcdHR5cGVvZiBzZWxlY3RvciA9PT0gXCJzdHJpbmdcIiAmJiBybmVlZHNDb250ZXh0LnRlc3QoIHNlbGVjdG9yICkgP1xuXHRcdFx0XHRqUXVlcnkoIHNlbGVjdG9yICkgOlxuXHRcdFx0XHRzZWxlY3RvciB8fCBbXSxcblx0XHRcdGZhbHNlXG5cdFx0KS5sZW5ndGg7XG5cdH1cbn0gKTtcblxuXG4vLyBJbml0aWFsaXplIGEgalF1ZXJ5IG9iamVjdFxuXG5cbi8vIEEgY2VudHJhbCByZWZlcmVuY2UgdG8gdGhlIHJvb3QgalF1ZXJ5KGRvY3VtZW50KVxudmFyIHJvb3RqUXVlcnksXG5cblx0Ly8gQSBzaW1wbGUgd2F5IHRvIGNoZWNrIGZvciBIVE1MIHN0cmluZ3Ncblx0Ly8gUHJpb3JpdGl6ZSAjaWQgb3ZlciA8dGFnPiB0byBhdm9pZCBYU1MgdmlhIGxvY2F0aW9uLmhhc2ggKCM5NTIxKVxuXHQvLyBTdHJpY3QgSFRNTCByZWNvZ25pdGlvbiAoIzExMjkwOiBtdXN0IHN0YXJ0IHdpdGggPClcblx0cnF1aWNrRXhwciA9IC9eKD86XFxzKig8W1xcd1xcV10rPilbXj5dKnwjKFtcXHctXSopKSQvLFxuXG5cdGluaXQgPSBqUXVlcnkuZm4uaW5pdCA9IGZ1bmN0aW9uKCBzZWxlY3RvciwgY29udGV4dCwgcm9vdCApIHtcblx0XHR2YXIgbWF0Y2gsIGVsZW07XG5cblx0XHQvLyBIQU5ETEU6ICQoXCJcIiksICQobnVsbCksICQodW5kZWZpbmVkKSwgJChmYWxzZSlcblx0XHRpZiAoICFzZWxlY3RvciApIHtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH1cblxuXHRcdC8vIE1ldGhvZCBpbml0KCkgYWNjZXB0cyBhbiBhbHRlcm5hdGUgcm9vdGpRdWVyeVxuXHRcdC8vIHNvIG1pZ3JhdGUgY2FuIHN1cHBvcnQgalF1ZXJ5LnN1YiAoZ2gtMjEwMSlcblx0XHRyb290ID0gcm9vdCB8fCByb290alF1ZXJ5O1xuXG5cdFx0Ly8gSGFuZGxlIEhUTUwgc3RyaW5nc1xuXHRcdGlmICggdHlwZW9mIHNlbGVjdG9yID09PSBcInN0cmluZ1wiICkge1xuXHRcdFx0aWYgKCBzZWxlY3RvclsgMCBdID09PSBcIjxcIiAmJlxuXHRcdFx0XHRzZWxlY3Rvclsgc2VsZWN0b3IubGVuZ3RoIC0gMSBdID09PSBcIj5cIiAmJlxuXHRcdFx0XHRzZWxlY3Rvci5sZW5ndGggPj0gMyApIHtcblxuXHRcdFx0XHQvLyBBc3N1bWUgdGhhdCBzdHJpbmdzIHRoYXQgc3RhcnQgYW5kIGVuZCB3aXRoIDw+IGFyZSBIVE1MIGFuZCBza2lwIHRoZSByZWdleCBjaGVja1xuXHRcdFx0XHRtYXRjaCA9IFsgbnVsbCwgc2VsZWN0b3IsIG51bGwgXTtcblxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0bWF0Y2ggPSBycXVpY2tFeHByLmV4ZWMoIHNlbGVjdG9yICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIE1hdGNoIGh0bWwgb3IgbWFrZSBzdXJlIG5vIGNvbnRleHQgaXMgc3BlY2lmaWVkIGZvciAjaWRcblx0XHRcdGlmICggbWF0Y2ggJiYgKCBtYXRjaFsgMSBdIHx8ICFjb250ZXh0ICkgKSB7XG5cblx0XHRcdFx0Ly8gSEFORExFOiAkKGh0bWwpIC0+ICQoYXJyYXkpXG5cdFx0XHRcdGlmICggbWF0Y2hbIDEgXSApIHtcblx0XHRcdFx0XHRjb250ZXh0ID0gY29udGV4dCBpbnN0YW5jZW9mIGpRdWVyeSA/IGNvbnRleHRbIDAgXSA6IGNvbnRleHQ7XG5cblx0XHRcdFx0XHQvLyBPcHRpb24gdG8gcnVuIHNjcmlwdHMgaXMgdHJ1ZSBmb3IgYmFjay1jb21wYXRcblx0XHRcdFx0XHQvLyBJbnRlbnRpb25hbGx5IGxldCB0aGUgZXJyb3IgYmUgdGhyb3duIGlmIHBhcnNlSFRNTCBpcyBub3QgcHJlc2VudFxuXHRcdFx0XHRcdGpRdWVyeS5tZXJnZSggdGhpcywgalF1ZXJ5LnBhcnNlSFRNTChcblx0XHRcdFx0XHRcdG1hdGNoWyAxIF0sXG5cdFx0XHRcdFx0XHRjb250ZXh0ICYmIGNvbnRleHQubm9kZVR5cGUgPyBjb250ZXh0Lm93bmVyRG9jdW1lbnQgfHwgY29udGV4dCA6IGRvY3VtZW50LFxuXHRcdFx0XHRcdFx0dHJ1ZVxuXHRcdFx0XHRcdCkgKTtcblxuXHRcdFx0XHRcdC8vIEhBTkRMRTogJChodG1sLCBwcm9wcylcblx0XHRcdFx0XHRpZiAoIHJzaW5nbGVUYWcudGVzdCggbWF0Y2hbIDEgXSApICYmIGpRdWVyeS5pc1BsYWluT2JqZWN0KCBjb250ZXh0ICkgKSB7XG5cdFx0XHRcdFx0XHRmb3IgKCBtYXRjaCBpbiBjb250ZXh0ICkge1xuXG5cdFx0XHRcdFx0XHRcdC8vIFByb3BlcnRpZXMgb2YgY29udGV4dCBhcmUgY2FsbGVkIGFzIG1ldGhvZHMgaWYgcG9zc2libGVcblx0XHRcdFx0XHRcdFx0aWYgKCBqUXVlcnkuaXNGdW5jdGlvbiggdGhpc1sgbWF0Y2ggXSApICkge1xuXHRcdFx0XHRcdFx0XHRcdHRoaXNbIG1hdGNoIF0oIGNvbnRleHRbIG1hdGNoIF0gKTtcblxuXHRcdFx0XHRcdFx0XHQvLyAuLi5hbmQgb3RoZXJ3aXNlIHNldCBhcyBhdHRyaWJ1dGVzXG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5hdHRyKCBtYXRjaCwgY29udGV4dFsgbWF0Y2ggXSApO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cblx0XHRcdFx0Ly8gSEFORExFOiAkKCNpZClcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRlbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoIG1hdGNoWyAyIF0gKTtcblxuXHRcdFx0XHRcdC8vIFN1cHBvcnQ6IEJsYWNrYmVycnkgNC42XG5cdFx0XHRcdFx0Ly8gZ0VCSUQgcmV0dXJucyBub2RlcyBubyBsb25nZXIgaW4gdGhlIGRvY3VtZW50ICgjNjk2Mylcblx0XHRcdFx0XHRpZiAoIGVsZW0gJiYgZWxlbS5wYXJlbnROb2RlICkge1xuXG5cdFx0XHRcdFx0XHQvLyBJbmplY3QgdGhlIGVsZW1lbnQgZGlyZWN0bHkgaW50byB0aGUgalF1ZXJ5IG9iamVjdFxuXHRcdFx0XHRcdFx0dGhpcy5sZW5ndGggPSAxO1xuXHRcdFx0XHRcdFx0dGhpc1sgMCBdID0gZWxlbTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHR0aGlzLmNvbnRleHQgPSBkb2N1bWVudDtcblx0XHRcdFx0XHR0aGlzLnNlbGVjdG9yID0gc2VsZWN0b3I7XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHRcdH1cblxuXHRcdFx0Ly8gSEFORExFOiAkKGV4cHIsICQoLi4uKSlcblx0XHRcdH0gZWxzZSBpZiAoICFjb250ZXh0IHx8IGNvbnRleHQuanF1ZXJ5ICkge1xuXHRcdFx0XHRyZXR1cm4gKCBjb250ZXh0IHx8IHJvb3QgKS5maW5kKCBzZWxlY3RvciApO1xuXG5cdFx0XHQvLyBIQU5ETEU6ICQoZXhwciwgY29udGV4dClcblx0XHRcdC8vICh3aGljaCBpcyBqdXN0IGVxdWl2YWxlbnQgdG86ICQoY29udGV4dCkuZmluZChleHByKVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuY29uc3RydWN0b3IoIGNvbnRleHQgKS5maW5kKCBzZWxlY3RvciApO1xuXHRcdFx0fVxuXG5cdFx0Ly8gSEFORExFOiAkKERPTUVsZW1lbnQpXG5cdFx0fSBlbHNlIGlmICggc2VsZWN0b3Iubm9kZVR5cGUgKSB7XG5cdFx0XHR0aGlzLmNvbnRleHQgPSB0aGlzWyAwIF0gPSBzZWxlY3Rvcjtcblx0XHRcdHRoaXMubGVuZ3RoID0gMTtcblx0XHRcdHJldHVybiB0aGlzO1xuXG5cdFx0Ly8gSEFORExFOiAkKGZ1bmN0aW9uKVxuXHRcdC8vIFNob3J0Y3V0IGZvciBkb2N1bWVudCByZWFkeVxuXHRcdH0gZWxzZSBpZiAoIGpRdWVyeS5pc0Z1bmN0aW9uKCBzZWxlY3RvciApICkge1xuXHRcdFx0cmV0dXJuIHJvb3QucmVhZHkgIT09IHVuZGVmaW5lZCA/XG5cdFx0XHRcdHJvb3QucmVhZHkoIHNlbGVjdG9yICkgOlxuXG5cdFx0XHRcdC8vIEV4ZWN1dGUgaW1tZWRpYXRlbHkgaWYgcmVhZHkgaXMgbm90IHByZXNlbnRcblx0XHRcdFx0c2VsZWN0b3IoIGpRdWVyeSApO1xuXHRcdH1cblxuXHRcdGlmICggc2VsZWN0b3Iuc2VsZWN0b3IgIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdHRoaXMuc2VsZWN0b3IgPSBzZWxlY3Rvci5zZWxlY3Rvcjtcblx0XHRcdHRoaXMuY29udGV4dCA9IHNlbGVjdG9yLmNvbnRleHQ7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGpRdWVyeS5tYWtlQXJyYXkoIHNlbGVjdG9yLCB0aGlzICk7XG5cdH07XG5cbi8vIEdpdmUgdGhlIGluaXQgZnVuY3Rpb24gdGhlIGpRdWVyeSBwcm90b3R5cGUgZm9yIGxhdGVyIGluc3RhbnRpYXRpb25cbmluaXQucHJvdG90eXBlID0galF1ZXJ5LmZuO1xuXG4vLyBJbml0aWFsaXplIGNlbnRyYWwgcmVmZXJlbmNlXG5yb290alF1ZXJ5ID0galF1ZXJ5KCBkb2N1bWVudCApO1xuXG5cbnZhciBycGFyZW50c3ByZXYgPSAvXig/OnBhcmVudHN8cHJldig/OlVudGlsfEFsbCkpLyxcblxuXHQvLyBNZXRob2RzIGd1YXJhbnRlZWQgdG8gcHJvZHVjZSBhIHVuaXF1ZSBzZXQgd2hlbiBzdGFydGluZyBmcm9tIGEgdW5pcXVlIHNldFxuXHRndWFyYW50ZWVkVW5pcXVlID0ge1xuXHRcdGNoaWxkcmVuOiB0cnVlLFxuXHRcdGNvbnRlbnRzOiB0cnVlLFxuXHRcdG5leHQ6IHRydWUsXG5cdFx0cHJldjogdHJ1ZVxuXHR9O1xuXG5qUXVlcnkuZm4uZXh0ZW5kKCB7XG5cdGhhczogZnVuY3Rpb24oIHRhcmdldCApIHtcblx0XHR2YXIgdGFyZ2V0cyA9IGpRdWVyeSggdGFyZ2V0LCB0aGlzICksXG5cdFx0XHRsID0gdGFyZ2V0cy5sZW5ndGg7XG5cblx0XHRyZXR1cm4gdGhpcy5maWx0ZXIoIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIGkgPSAwO1xuXHRcdFx0Zm9yICggOyBpIDwgbDsgaSsrICkge1xuXHRcdFx0XHRpZiAoIGpRdWVyeS5jb250YWlucyggdGhpcywgdGFyZ2V0c1sgaSBdICkgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9ICk7XG5cdH0sXG5cblx0Y2xvc2VzdDogZnVuY3Rpb24oIHNlbGVjdG9ycywgY29udGV4dCApIHtcblx0XHR2YXIgY3VyLFxuXHRcdFx0aSA9IDAsXG5cdFx0XHRsID0gdGhpcy5sZW5ndGgsXG5cdFx0XHRtYXRjaGVkID0gW10sXG5cdFx0XHRwb3MgPSBybmVlZHNDb250ZXh0LnRlc3QoIHNlbGVjdG9ycyApIHx8IHR5cGVvZiBzZWxlY3RvcnMgIT09IFwic3RyaW5nXCIgP1xuXHRcdFx0XHRqUXVlcnkoIHNlbGVjdG9ycywgY29udGV4dCB8fCB0aGlzLmNvbnRleHQgKSA6XG5cdFx0XHRcdDA7XG5cblx0XHRmb3IgKCA7IGkgPCBsOyBpKysgKSB7XG5cdFx0XHRmb3IgKCBjdXIgPSB0aGlzWyBpIF07IGN1ciAmJiBjdXIgIT09IGNvbnRleHQ7IGN1ciA9IGN1ci5wYXJlbnROb2RlICkge1xuXG5cdFx0XHRcdC8vIEFsd2F5cyBza2lwIGRvY3VtZW50IGZyYWdtZW50c1xuXHRcdFx0XHRpZiAoIGN1ci5ub2RlVHlwZSA8IDExICYmICggcG9zID9cblx0XHRcdFx0XHRwb3MuaW5kZXgoIGN1ciApID4gLTEgOlxuXG5cdFx0XHRcdFx0Ly8gRG9uJ3QgcGFzcyBub24tZWxlbWVudHMgdG8gU2l6emxlXG5cdFx0XHRcdFx0Y3VyLm5vZGVUeXBlID09PSAxICYmXG5cdFx0XHRcdFx0XHRqUXVlcnkuZmluZC5tYXRjaGVzU2VsZWN0b3IoIGN1ciwgc2VsZWN0b3JzICkgKSApIHtcblxuXHRcdFx0XHRcdG1hdGNoZWQucHVzaCggY3VyICk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcy5wdXNoU3RhY2soIG1hdGNoZWQubGVuZ3RoID4gMSA/IGpRdWVyeS51bmlxdWVTb3J0KCBtYXRjaGVkICkgOiBtYXRjaGVkICk7XG5cdH0sXG5cblx0Ly8gRGV0ZXJtaW5lIHRoZSBwb3NpdGlvbiBvZiBhbiBlbGVtZW50IHdpdGhpbiB0aGUgc2V0XG5cdGluZGV4OiBmdW5jdGlvbiggZWxlbSApIHtcblxuXHRcdC8vIE5vIGFyZ3VtZW50LCByZXR1cm4gaW5kZXggaW4gcGFyZW50XG5cdFx0aWYgKCAhZWxlbSApIHtcblx0XHRcdHJldHVybiAoIHRoaXNbIDAgXSAmJiB0aGlzWyAwIF0ucGFyZW50Tm9kZSApID8gdGhpcy5maXJzdCgpLnByZXZBbGwoKS5sZW5ndGggOiAtMTtcblx0XHR9XG5cblx0XHQvLyBJbmRleCBpbiBzZWxlY3RvclxuXHRcdGlmICggdHlwZW9mIGVsZW0gPT09IFwic3RyaW5nXCIgKSB7XG5cdFx0XHRyZXR1cm4gaW5kZXhPZi5jYWxsKCBqUXVlcnkoIGVsZW0gKSwgdGhpc1sgMCBdICk7XG5cdFx0fVxuXG5cdFx0Ly8gTG9jYXRlIHRoZSBwb3NpdGlvbiBvZiB0aGUgZGVzaXJlZCBlbGVtZW50XG5cdFx0cmV0dXJuIGluZGV4T2YuY2FsbCggdGhpcyxcblxuXHRcdFx0Ly8gSWYgaXQgcmVjZWl2ZXMgYSBqUXVlcnkgb2JqZWN0LCB0aGUgZmlyc3QgZWxlbWVudCBpcyB1c2VkXG5cdFx0XHRlbGVtLmpxdWVyeSA/IGVsZW1bIDAgXSA6IGVsZW1cblx0XHQpO1xuXHR9LFxuXG5cdGFkZDogZnVuY3Rpb24oIHNlbGVjdG9yLCBjb250ZXh0ICkge1xuXHRcdHJldHVybiB0aGlzLnB1c2hTdGFjayhcblx0XHRcdGpRdWVyeS51bmlxdWVTb3J0KFxuXHRcdFx0XHRqUXVlcnkubWVyZ2UoIHRoaXMuZ2V0KCksIGpRdWVyeSggc2VsZWN0b3IsIGNvbnRleHQgKSApXG5cdFx0XHQpXG5cdFx0KTtcblx0fSxcblxuXHRhZGRCYWNrOiBmdW5jdGlvbiggc2VsZWN0b3IgKSB7XG5cdFx0cmV0dXJuIHRoaXMuYWRkKCBzZWxlY3RvciA9PSBudWxsID9cblx0XHRcdHRoaXMucHJldk9iamVjdCA6IHRoaXMucHJldk9iamVjdC5maWx0ZXIoIHNlbGVjdG9yIClcblx0XHQpO1xuXHR9XG59ICk7XG5cbmZ1bmN0aW9uIHNpYmxpbmcoIGN1ciwgZGlyICkge1xuXHR3aGlsZSAoICggY3VyID0gY3VyWyBkaXIgXSApICYmIGN1ci5ub2RlVHlwZSAhPT0gMSApIHt9XG5cdHJldHVybiBjdXI7XG59XG5cbmpRdWVyeS5lYWNoKCB7XG5cdHBhcmVudDogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0dmFyIHBhcmVudCA9IGVsZW0ucGFyZW50Tm9kZTtcblx0XHRyZXR1cm4gcGFyZW50ICYmIHBhcmVudC5ub2RlVHlwZSAhPT0gMTEgPyBwYXJlbnQgOiBudWxsO1xuXHR9LFxuXHRwYXJlbnRzOiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRyZXR1cm4gZGlyKCBlbGVtLCBcInBhcmVudE5vZGVcIiApO1xuXHR9LFxuXHRwYXJlbnRzVW50aWw6IGZ1bmN0aW9uKCBlbGVtLCBpLCB1bnRpbCApIHtcblx0XHRyZXR1cm4gZGlyKCBlbGVtLCBcInBhcmVudE5vZGVcIiwgdW50aWwgKTtcblx0fSxcblx0bmV4dDogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0cmV0dXJuIHNpYmxpbmcoIGVsZW0sIFwibmV4dFNpYmxpbmdcIiApO1xuXHR9LFxuXHRwcmV2OiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRyZXR1cm4gc2libGluZyggZWxlbSwgXCJwcmV2aW91c1NpYmxpbmdcIiApO1xuXHR9LFxuXHRuZXh0QWxsOiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRyZXR1cm4gZGlyKCBlbGVtLCBcIm5leHRTaWJsaW5nXCIgKTtcblx0fSxcblx0cHJldkFsbDogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0cmV0dXJuIGRpciggZWxlbSwgXCJwcmV2aW91c1NpYmxpbmdcIiApO1xuXHR9LFxuXHRuZXh0VW50aWw6IGZ1bmN0aW9uKCBlbGVtLCBpLCB1bnRpbCApIHtcblx0XHRyZXR1cm4gZGlyKCBlbGVtLCBcIm5leHRTaWJsaW5nXCIsIHVudGlsICk7XG5cdH0sXG5cdHByZXZVbnRpbDogZnVuY3Rpb24oIGVsZW0sIGksIHVudGlsICkge1xuXHRcdHJldHVybiBkaXIoIGVsZW0sIFwicHJldmlvdXNTaWJsaW5nXCIsIHVudGlsICk7XG5cdH0sXG5cdHNpYmxpbmdzOiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRyZXR1cm4gc2libGluZ3MoICggZWxlbS5wYXJlbnROb2RlIHx8IHt9ICkuZmlyc3RDaGlsZCwgZWxlbSApO1xuXHR9LFxuXHRjaGlsZHJlbjogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0cmV0dXJuIHNpYmxpbmdzKCBlbGVtLmZpcnN0Q2hpbGQgKTtcblx0fSxcblx0Y29udGVudHM6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdHJldHVybiBlbGVtLmNvbnRlbnREb2N1bWVudCB8fCBqUXVlcnkubWVyZ2UoIFtdLCBlbGVtLmNoaWxkTm9kZXMgKTtcblx0fVxufSwgZnVuY3Rpb24oIG5hbWUsIGZuICkge1xuXHRqUXVlcnkuZm5bIG5hbWUgXSA9IGZ1bmN0aW9uKCB1bnRpbCwgc2VsZWN0b3IgKSB7XG5cdFx0dmFyIG1hdGNoZWQgPSBqUXVlcnkubWFwKCB0aGlzLCBmbiwgdW50aWwgKTtcblxuXHRcdGlmICggbmFtZS5zbGljZSggLTUgKSAhPT0gXCJVbnRpbFwiICkge1xuXHRcdFx0c2VsZWN0b3IgPSB1bnRpbDtcblx0XHR9XG5cblx0XHRpZiAoIHNlbGVjdG9yICYmIHR5cGVvZiBzZWxlY3RvciA9PT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdG1hdGNoZWQgPSBqUXVlcnkuZmlsdGVyKCBzZWxlY3RvciwgbWF0Y2hlZCApO1xuXHRcdH1cblxuXHRcdGlmICggdGhpcy5sZW5ndGggPiAxICkge1xuXG5cdFx0XHQvLyBSZW1vdmUgZHVwbGljYXRlc1xuXHRcdFx0aWYgKCAhZ3VhcmFudGVlZFVuaXF1ZVsgbmFtZSBdICkge1xuXHRcdFx0XHRqUXVlcnkudW5pcXVlU29ydCggbWF0Y2hlZCApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBSZXZlcnNlIG9yZGVyIGZvciBwYXJlbnRzKiBhbmQgcHJldi1kZXJpdmF0aXZlc1xuXHRcdFx0aWYgKCBycGFyZW50c3ByZXYudGVzdCggbmFtZSApICkge1xuXHRcdFx0XHRtYXRjaGVkLnJldmVyc2UoKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcy5wdXNoU3RhY2soIG1hdGNoZWQgKTtcblx0fTtcbn0gKTtcbnZhciBybm90d2hpdGUgPSAoIC9cXFMrL2cgKTtcblxuXG5cbi8vIENvbnZlcnQgU3RyaW5nLWZvcm1hdHRlZCBvcHRpb25zIGludG8gT2JqZWN0LWZvcm1hdHRlZCBvbmVzXG5mdW5jdGlvbiBjcmVhdGVPcHRpb25zKCBvcHRpb25zICkge1xuXHR2YXIgb2JqZWN0ID0ge307XG5cdGpRdWVyeS5lYWNoKCBvcHRpb25zLm1hdGNoKCBybm90d2hpdGUgKSB8fCBbXSwgZnVuY3Rpb24oIF8sIGZsYWcgKSB7XG5cdFx0b2JqZWN0WyBmbGFnIF0gPSB0cnVlO1xuXHR9ICk7XG5cdHJldHVybiBvYmplY3Q7XG59XG5cbi8qXG4gKiBDcmVhdGUgYSBjYWxsYmFjayBsaXN0IHVzaW5nIHRoZSBmb2xsb3dpbmcgcGFyYW1ldGVyczpcbiAqXG4gKlx0b3B0aW9uczogYW4gb3B0aW9uYWwgbGlzdCBvZiBzcGFjZS1zZXBhcmF0ZWQgb3B0aW9ucyB0aGF0IHdpbGwgY2hhbmdlIGhvd1xuICpcdFx0XHR0aGUgY2FsbGJhY2sgbGlzdCBiZWhhdmVzIG9yIGEgbW9yZSB0cmFkaXRpb25hbCBvcHRpb24gb2JqZWN0XG4gKlxuICogQnkgZGVmYXVsdCBhIGNhbGxiYWNrIGxpc3Qgd2lsbCBhY3QgbGlrZSBhbiBldmVudCBjYWxsYmFjayBsaXN0IGFuZCBjYW4gYmVcbiAqIFwiZmlyZWRcIiBtdWx0aXBsZSB0aW1lcy5cbiAqXG4gKiBQb3NzaWJsZSBvcHRpb25zOlxuICpcbiAqXHRvbmNlOlx0XHRcdHdpbGwgZW5zdXJlIHRoZSBjYWxsYmFjayBsaXN0IGNhbiBvbmx5IGJlIGZpcmVkIG9uY2UgKGxpa2UgYSBEZWZlcnJlZClcbiAqXG4gKlx0bWVtb3J5Olx0XHRcdHdpbGwga2VlcCB0cmFjayBvZiBwcmV2aW91cyB2YWx1ZXMgYW5kIHdpbGwgY2FsbCBhbnkgY2FsbGJhY2sgYWRkZWRcbiAqXHRcdFx0XHRcdGFmdGVyIHRoZSBsaXN0IGhhcyBiZWVuIGZpcmVkIHJpZ2h0IGF3YXkgd2l0aCB0aGUgbGF0ZXN0IFwibWVtb3JpemVkXCJcbiAqXHRcdFx0XHRcdHZhbHVlcyAobGlrZSBhIERlZmVycmVkKVxuICpcbiAqXHR1bmlxdWU6XHRcdFx0d2lsbCBlbnN1cmUgYSBjYWxsYmFjayBjYW4gb25seSBiZSBhZGRlZCBvbmNlIChubyBkdXBsaWNhdGUgaW4gdGhlIGxpc3QpXG4gKlxuICpcdHN0b3BPbkZhbHNlOlx0aW50ZXJydXB0IGNhbGxpbmdzIHdoZW4gYSBjYWxsYmFjayByZXR1cm5zIGZhbHNlXG4gKlxuICovXG5qUXVlcnkuQ2FsbGJhY2tzID0gZnVuY3Rpb24oIG9wdGlvbnMgKSB7XG5cblx0Ly8gQ29udmVydCBvcHRpb25zIGZyb20gU3RyaW5nLWZvcm1hdHRlZCB0byBPYmplY3QtZm9ybWF0dGVkIGlmIG5lZWRlZFxuXHQvLyAod2UgY2hlY2sgaW4gY2FjaGUgZmlyc3QpXG5cdG9wdGlvbnMgPSB0eXBlb2Ygb3B0aW9ucyA9PT0gXCJzdHJpbmdcIiA/XG5cdFx0Y3JlYXRlT3B0aW9ucyggb3B0aW9ucyApIDpcblx0XHRqUXVlcnkuZXh0ZW5kKCB7fSwgb3B0aW9ucyApO1xuXG5cdHZhciAvLyBGbGFnIHRvIGtub3cgaWYgbGlzdCBpcyBjdXJyZW50bHkgZmlyaW5nXG5cdFx0ZmlyaW5nLFxuXG5cdFx0Ly8gTGFzdCBmaXJlIHZhbHVlIGZvciBub24tZm9yZ2V0dGFibGUgbGlzdHNcblx0XHRtZW1vcnksXG5cblx0XHQvLyBGbGFnIHRvIGtub3cgaWYgbGlzdCB3YXMgYWxyZWFkeSBmaXJlZFxuXHRcdGZpcmVkLFxuXG5cdFx0Ly8gRmxhZyB0byBwcmV2ZW50IGZpcmluZ1xuXHRcdGxvY2tlZCxcblxuXHRcdC8vIEFjdHVhbCBjYWxsYmFjayBsaXN0XG5cdFx0bGlzdCA9IFtdLFxuXG5cdFx0Ly8gUXVldWUgb2YgZXhlY3V0aW9uIGRhdGEgZm9yIHJlcGVhdGFibGUgbGlzdHNcblx0XHRxdWV1ZSA9IFtdLFxuXG5cdFx0Ly8gSW5kZXggb2YgY3VycmVudGx5IGZpcmluZyBjYWxsYmFjayAobW9kaWZpZWQgYnkgYWRkL3JlbW92ZSBhcyBuZWVkZWQpXG5cdFx0ZmlyaW5nSW5kZXggPSAtMSxcblxuXHRcdC8vIEZpcmUgY2FsbGJhY2tzXG5cdFx0ZmlyZSA9IGZ1bmN0aW9uKCkge1xuXG5cdFx0XHQvLyBFbmZvcmNlIHNpbmdsZS1maXJpbmdcblx0XHRcdGxvY2tlZCA9IG9wdGlvbnMub25jZTtcblxuXHRcdFx0Ly8gRXhlY3V0ZSBjYWxsYmFja3MgZm9yIGFsbCBwZW5kaW5nIGV4ZWN1dGlvbnMsXG5cdFx0XHQvLyByZXNwZWN0aW5nIGZpcmluZ0luZGV4IG92ZXJyaWRlcyBhbmQgcnVudGltZSBjaGFuZ2VzXG5cdFx0XHRmaXJlZCA9IGZpcmluZyA9IHRydWU7XG5cdFx0XHRmb3IgKCA7IHF1ZXVlLmxlbmd0aDsgZmlyaW5nSW5kZXggPSAtMSApIHtcblx0XHRcdFx0bWVtb3J5ID0gcXVldWUuc2hpZnQoKTtcblx0XHRcdFx0d2hpbGUgKCArK2ZpcmluZ0luZGV4IDwgbGlzdC5sZW5ndGggKSB7XG5cblx0XHRcdFx0XHQvLyBSdW4gY2FsbGJhY2sgYW5kIGNoZWNrIGZvciBlYXJseSB0ZXJtaW5hdGlvblxuXHRcdFx0XHRcdGlmICggbGlzdFsgZmlyaW5nSW5kZXggXS5hcHBseSggbWVtb3J5WyAwIF0sIG1lbW9yeVsgMSBdICkgPT09IGZhbHNlICYmXG5cdFx0XHRcdFx0XHRvcHRpb25zLnN0b3BPbkZhbHNlICkge1xuXG5cdFx0XHRcdFx0XHQvLyBKdW1wIHRvIGVuZCBhbmQgZm9yZ2V0IHRoZSBkYXRhIHNvIC5hZGQgZG9lc24ndCByZS1maXJlXG5cdFx0XHRcdFx0XHRmaXJpbmdJbmRleCA9IGxpc3QubGVuZ3RoO1xuXHRcdFx0XHRcdFx0bWVtb3J5ID0gZmFsc2U7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIEZvcmdldCB0aGUgZGF0YSBpZiB3ZSdyZSBkb25lIHdpdGggaXRcblx0XHRcdGlmICggIW9wdGlvbnMubWVtb3J5ICkge1xuXHRcdFx0XHRtZW1vcnkgPSBmYWxzZTtcblx0XHRcdH1cblxuXHRcdFx0ZmlyaW5nID0gZmFsc2U7XG5cblx0XHRcdC8vIENsZWFuIHVwIGlmIHdlJ3JlIGRvbmUgZmlyaW5nIGZvciBnb29kXG5cdFx0XHRpZiAoIGxvY2tlZCApIHtcblxuXHRcdFx0XHQvLyBLZWVwIGFuIGVtcHR5IGxpc3QgaWYgd2UgaGF2ZSBkYXRhIGZvciBmdXR1cmUgYWRkIGNhbGxzXG5cdFx0XHRcdGlmICggbWVtb3J5ICkge1xuXHRcdFx0XHRcdGxpc3QgPSBbXTtcblxuXHRcdFx0XHQvLyBPdGhlcndpc2UsIHRoaXMgb2JqZWN0IGlzIHNwZW50XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0bGlzdCA9IFwiXCI7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0Ly8gQWN0dWFsIENhbGxiYWNrcyBvYmplY3Rcblx0XHRzZWxmID0ge1xuXG5cdFx0XHQvLyBBZGQgYSBjYWxsYmFjayBvciBhIGNvbGxlY3Rpb24gb2YgY2FsbGJhY2tzIHRvIHRoZSBsaXN0XG5cdFx0XHRhZGQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRpZiAoIGxpc3QgKSB7XG5cblx0XHRcdFx0XHQvLyBJZiB3ZSBoYXZlIG1lbW9yeSBmcm9tIGEgcGFzdCBydW4sIHdlIHNob3VsZCBmaXJlIGFmdGVyIGFkZGluZ1xuXHRcdFx0XHRcdGlmICggbWVtb3J5ICYmICFmaXJpbmcgKSB7XG5cdFx0XHRcdFx0XHRmaXJpbmdJbmRleCA9IGxpc3QubGVuZ3RoIC0gMTtcblx0XHRcdFx0XHRcdHF1ZXVlLnB1c2goIG1lbW9yeSApO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdCggZnVuY3Rpb24gYWRkKCBhcmdzICkge1xuXHRcdFx0XHRcdFx0alF1ZXJ5LmVhY2goIGFyZ3MsIGZ1bmN0aW9uKCBfLCBhcmcgKSB7XG5cdFx0XHRcdFx0XHRcdGlmICggalF1ZXJ5LmlzRnVuY3Rpb24oIGFyZyApICkge1xuXHRcdFx0XHRcdFx0XHRcdGlmICggIW9wdGlvbnMudW5pcXVlIHx8ICFzZWxmLmhhcyggYXJnICkgKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRsaXN0LnB1c2goIGFyZyApO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fSBlbHNlIGlmICggYXJnICYmIGFyZy5sZW5ndGggJiYgalF1ZXJ5LnR5cGUoIGFyZyApICE9PSBcInN0cmluZ1wiICkge1xuXG5cdFx0XHRcdFx0XHRcdFx0Ly8gSW5zcGVjdCByZWN1cnNpdmVseVxuXHRcdFx0XHRcdFx0XHRcdGFkZCggYXJnICk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0gKTtcblx0XHRcdFx0XHR9ICkoIGFyZ3VtZW50cyApO1xuXG5cdFx0XHRcdFx0aWYgKCBtZW1vcnkgJiYgIWZpcmluZyApIHtcblx0XHRcdFx0XHRcdGZpcmUoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHR9LFxuXG5cdFx0XHQvLyBSZW1vdmUgYSBjYWxsYmFjayBmcm9tIHRoZSBsaXN0XG5cdFx0XHRyZW1vdmU6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRqUXVlcnkuZWFjaCggYXJndW1lbnRzLCBmdW5jdGlvbiggXywgYXJnICkge1xuXHRcdFx0XHRcdHZhciBpbmRleDtcblx0XHRcdFx0XHR3aGlsZSAoICggaW5kZXggPSBqUXVlcnkuaW5BcnJheSggYXJnLCBsaXN0LCBpbmRleCApICkgPiAtMSApIHtcblx0XHRcdFx0XHRcdGxpc3Quc3BsaWNlKCBpbmRleCwgMSApO1xuXG5cdFx0XHRcdFx0XHQvLyBIYW5kbGUgZmlyaW5nIGluZGV4ZXNcblx0XHRcdFx0XHRcdGlmICggaW5kZXggPD0gZmlyaW5nSW5kZXggKSB7XG5cdFx0XHRcdFx0XHRcdGZpcmluZ0luZGV4LS07XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9ICk7XG5cdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0fSxcblxuXHRcdFx0Ly8gQ2hlY2sgaWYgYSBnaXZlbiBjYWxsYmFjayBpcyBpbiB0aGUgbGlzdC5cblx0XHRcdC8vIElmIG5vIGFyZ3VtZW50IGlzIGdpdmVuLCByZXR1cm4gd2hldGhlciBvciBub3QgbGlzdCBoYXMgY2FsbGJhY2tzIGF0dGFjaGVkLlxuXHRcdFx0aGFzOiBmdW5jdGlvbiggZm4gKSB7XG5cdFx0XHRcdHJldHVybiBmbiA/XG5cdFx0XHRcdFx0alF1ZXJ5LmluQXJyYXkoIGZuLCBsaXN0ICkgPiAtMSA6XG5cdFx0XHRcdFx0bGlzdC5sZW5ndGggPiAwO1xuXHRcdFx0fSxcblxuXHRcdFx0Ly8gUmVtb3ZlIGFsbCBjYWxsYmFja3MgZnJvbSB0aGUgbGlzdFxuXHRcdFx0ZW1wdHk6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRpZiAoIGxpc3QgKSB7XG5cdFx0XHRcdFx0bGlzdCA9IFtdO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0fSxcblxuXHRcdFx0Ly8gRGlzYWJsZSAuZmlyZSBhbmQgLmFkZFxuXHRcdFx0Ly8gQWJvcnQgYW55IGN1cnJlbnQvcGVuZGluZyBleGVjdXRpb25zXG5cdFx0XHQvLyBDbGVhciBhbGwgY2FsbGJhY2tzIGFuZCB2YWx1ZXNcblx0XHRcdGRpc2FibGU6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRsb2NrZWQgPSBxdWV1ZSA9IFtdO1xuXHRcdFx0XHRsaXN0ID0gbWVtb3J5ID0gXCJcIjtcblx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHR9LFxuXHRcdFx0ZGlzYWJsZWQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gIWxpc3Q7XG5cdFx0XHR9LFxuXG5cdFx0XHQvLyBEaXNhYmxlIC5maXJlXG5cdFx0XHQvLyBBbHNvIGRpc2FibGUgLmFkZCB1bmxlc3Mgd2UgaGF2ZSBtZW1vcnkgKHNpbmNlIGl0IHdvdWxkIGhhdmUgbm8gZWZmZWN0KVxuXHRcdFx0Ly8gQWJvcnQgYW55IHBlbmRpbmcgZXhlY3V0aW9uc1xuXHRcdFx0bG9jazogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGxvY2tlZCA9IHF1ZXVlID0gW107XG5cdFx0XHRcdGlmICggIW1lbW9yeSApIHtcblx0XHRcdFx0XHRsaXN0ID0gbWVtb3J5ID0gXCJcIjtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH0sXG5cdFx0XHRsb2NrZWQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gISFsb2NrZWQ7XG5cdFx0XHR9LFxuXG5cdFx0XHQvLyBDYWxsIGFsbCBjYWxsYmFja3Mgd2l0aCB0aGUgZ2l2ZW4gY29udGV4dCBhbmQgYXJndW1lbnRzXG5cdFx0XHRmaXJlV2l0aDogZnVuY3Rpb24oIGNvbnRleHQsIGFyZ3MgKSB7XG5cdFx0XHRcdGlmICggIWxvY2tlZCApIHtcblx0XHRcdFx0XHRhcmdzID0gYXJncyB8fCBbXTtcblx0XHRcdFx0XHRhcmdzID0gWyBjb250ZXh0LCBhcmdzLnNsaWNlID8gYXJncy5zbGljZSgpIDogYXJncyBdO1xuXHRcdFx0XHRcdHF1ZXVlLnB1c2goIGFyZ3MgKTtcblx0XHRcdFx0XHRpZiAoICFmaXJpbmcgKSB7XG5cdFx0XHRcdFx0XHRmaXJlKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0fSxcblxuXHRcdFx0Ly8gQ2FsbCBhbGwgdGhlIGNhbGxiYWNrcyB3aXRoIHRoZSBnaXZlbiBhcmd1bWVudHNcblx0XHRcdGZpcmU6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRzZWxmLmZpcmVXaXRoKCB0aGlzLCBhcmd1bWVudHMgKTtcblx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHR9LFxuXG5cdFx0XHQvLyBUbyBrbm93IGlmIHRoZSBjYWxsYmFja3MgaGF2ZSBhbHJlYWR5IGJlZW4gY2FsbGVkIGF0IGxlYXN0IG9uY2Vcblx0XHRcdGZpcmVkOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuICEhZmlyZWQ7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRyZXR1cm4gc2VsZjtcbn07XG5cblxualF1ZXJ5LmV4dGVuZCgge1xuXG5cdERlZmVycmVkOiBmdW5jdGlvbiggZnVuYyApIHtcblx0XHR2YXIgdHVwbGVzID0gW1xuXG5cdFx0XHRcdC8vIGFjdGlvbiwgYWRkIGxpc3RlbmVyLCBsaXN0ZW5lciBsaXN0LCBmaW5hbCBzdGF0ZVxuXHRcdFx0XHRbIFwicmVzb2x2ZVwiLCBcImRvbmVcIiwgalF1ZXJ5LkNhbGxiYWNrcyggXCJvbmNlIG1lbW9yeVwiICksIFwicmVzb2x2ZWRcIiBdLFxuXHRcdFx0XHRbIFwicmVqZWN0XCIsIFwiZmFpbFwiLCBqUXVlcnkuQ2FsbGJhY2tzKCBcIm9uY2UgbWVtb3J5XCIgKSwgXCJyZWplY3RlZFwiIF0sXG5cdFx0XHRcdFsgXCJub3RpZnlcIiwgXCJwcm9ncmVzc1wiLCBqUXVlcnkuQ2FsbGJhY2tzKCBcIm1lbW9yeVwiICkgXVxuXHRcdFx0XSxcblx0XHRcdHN0YXRlID0gXCJwZW5kaW5nXCIsXG5cdFx0XHRwcm9taXNlID0ge1xuXHRcdFx0XHRzdGF0ZTogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHN0YXRlO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRhbHdheXM6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdGRlZmVycmVkLmRvbmUoIGFyZ3VtZW50cyApLmZhaWwoIGFyZ3VtZW50cyApO1xuXHRcdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHR0aGVuOiBmdW5jdGlvbiggLyogZm5Eb25lLCBmbkZhaWwsIGZuUHJvZ3Jlc3MgKi8gKSB7XG5cdFx0XHRcdFx0dmFyIGZucyA9IGFyZ3VtZW50cztcblx0XHRcdFx0XHRyZXR1cm4galF1ZXJ5LkRlZmVycmVkKCBmdW5jdGlvbiggbmV3RGVmZXIgKSB7XG5cdFx0XHRcdFx0XHRqUXVlcnkuZWFjaCggdHVwbGVzLCBmdW5jdGlvbiggaSwgdHVwbGUgKSB7XG5cdFx0XHRcdFx0XHRcdHZhciBmbiA9IGpRdWVyeS5pc0Z1bmN0aW9uKCBmbnNbIGkgXSApICYmIGZuc1sgaSBdO1xuXG5cdFx0XHRcdFx0XHRcdC8vIGRlZmVycmVkWyBkb25lIHwgZmFpbCB8IHByb2dyZXNzIF0gZm9yIGZvcndhcmRpbmcgYWN0aW9ucyB0byBuZXdEZWZlclxuXHRcdFx0XHRcdFx0XHRkZWZlcnJlZFsgdHVwbGVbIDEgXSBdKCBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFx0XHR2YXIgcmV0dXJuZWQgPSBmbiAmJiBmbi5hcHBseSggdGhpcywgYXJndW1lbnRzICk7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKCByZXR1cm5lZCAmJiBqUXVlcnkuaXNGdW5jdGlvbiggcmV0dXJuZWQucHJvbWlzZSApICkge1xuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuZWQucHJvbWlzZSgpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdC5wcm9ncmVzcyggbmV3RGVmZXIubm90aWZ5IClcblx0XHRcdFx0XHRcdFx0XHRcdFx0LmRvbmUoIG5ld0RlZmVyLnJlc29sdmUgKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHQuZmFpbCggbmV3RGVmZXIucmVqZWN0ICk7XG5cdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRcdG5ld0RlZmVyWyB0dXBsZVsgMCBdICsgXCJXaXRoXCIgXShcblx0XHRcdFx0XHRcdFx0XHRcdFx0dGhpcyA9PT0gcHJvbWlzZSA/IG5ld0RlZmVyLnByb21pc2UoKSA6IHRoaXMsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGZuID8gWyByZXR1cm5lZCBdIDogYXJndW1lbnRzXG5cdFx0XHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fSApO1xuXHRcdFx0XHRcdFx0fSApO1xuXHRcdFx0XHRcdFx0Zm5zID0gbnVsbDtcblx0XHRcdFx0XHR9ICkucHJvbWlzZSgpO1xuXHRcdFx0XHR9LFxuXG5cdFx0XHRcdC8vIEdldCBhIHByb21pc2UgZm9yIHRoaXMgZGVmZXJyZWRcblx0XHRcdFx0Ly8gSWYgb2JqIGlzIHByb3ZpZGVkLCB0aGUgcHJvbWlzZSBhc3BlY3QgaXMgYWRkZWQgdG8gdGhlIG9iamVjdFxuXHRcdFx0XHRwcm9taXNlOiBmdW5jdGlvbiggb2JqICkge1xuXHRcdFx0XHRcdHJldHVybiBvYmogIT0gbnVsbCA/IGpRdWVyeS5leHRlbmQoIG9iaiwgcHJvbWlzZSApIDogcHJvbWlzZTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdGRlZmVycmVkID0ge307XG5cblx0XHQvLyBLZWVwIHBpcGUgZm9yIGJhY2stY29tcGF0XG5cdFx0cHJvbWlzZS5waXBlID0gcHJvbWlzZS50aGVuO1xuXG5cdFx0Ly8gQWRkIGxpc3Qtc3BlY2lmaWMgbWV0aG9kc1xuXHRcdGpRdWVyeS5lYWNoKCB0dXBsZXMsIGZ1bmN0aW9uKCBpLCB0dXBsZSApIHtcblx0XHRcdHZhciBsaXN0ID0gdHVwbGVbIDIgXSxcblx0XHRcdFx0c3RhdGVTdHJpbmcgPSB0dXBsZVsgMyBdO1xuXG5cdFx0XHQvLyBwcm9taXNlWyBkb25lIHwgZmFpbCB8IHByb2dyZXNzIF0gPSBsaXN0LmFkZFxuXHRcdFx0cHJvbWlzZVsgdHVwbGVbIDEgXSBdID0gbGlzdC5hZGQ7XG5cblx0XHRcdC8vIEhhbmRsZSBzdGF0ZVxuXHRcdFx0aWYgKCBzdGF0ZVN0cmluZyApIHtcblx0XHRcdFx0bGlzdC5hZGQoIGZ1bmN0aW9uKCkge1xuXG5cdFx0XHRcdFx0Ly8gc3RhdGUgPSBbIHJlc29sdmVkIHwgcmVqZWN0ZWQgXVxuXHRcdFx0XHRcdHN0YXRlID0gc3RhdGVTdHJpbmc7XG5cblx0XHRcdFx0Ly8gWyByZWplY3RfbGlzdCB8IHJlc29sdmVfbGlzdCBdLmRpc2FibGU7IHByb2dyZXNzX2xpc3QubG9ja1xuXHRcdFx0XHR9LCB0dXBsZXNbIGkgXiAxIF1bIDIgXS5kaXNhYmxlLCB0dXBsZXNbIDIgXVsgMiBdLmxvY2sgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gZGVmZXJyZWRbIHJlc29sdmUgfCByZWplY3QgfCBub3RpZnkgXVxuXHRcdFx0ZGVmZXJyZWRbIHR1cGxlWyAwIF0gXSA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRkZWZlcnJlZFsgdHVwbGVbIDAgXSArIFwiV2l0aFwiIF0oIHRoaXMgPT09IGRlZmVycmVkID8gcHJvbWlzZSA6IHRoaXMsIGFyZ3VtZW50cyApO1xuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH07XG5cdFx0XHRkZWZlcnJlZFsgdHVwbGVbIDAgXSArIFwiV2l0aFwiIF0gPSBsaXN0LmZpcmVXaXRoO1xuXHRcdH0gKTtcblxuXHRcdC8vIE1ha2UgdGhlIGRlZmVycmVkIGEgcHJvbWlzZVxuXHRcdHByb21pc2UucHJvbWlzZSggZGVmZXJyZWQgKTtcblxuXHRcdC8vIENhbGwgZ2l2ZW4gZnVuYyBpZiBhbnlcblx0XHRpZiAoIGZ1bmMgKSB7XG5cdFx0XHRmdW5jLmNhbGwoIGRlZmVycmVkLCBkZWZlcnJlZCApO1xuXHRcdH1cblxuXHRcdC8vIEFsbCBkb25lIVxuXHRcdHJldHVybiBkZWZlcnJlZDtcblx0fSxcblxuXHQvLyBEZWZlcnJlZCBoZWxwZXJcblx0d2hlbjogZnVuY3Rpb24oIHN1Ym9yZGluYXRlIC8qICwgLi4uLCBzdWJvcmRpbmF0ZU4gKi8gKSB7XG5cdFx0dmFyIGkgPSAwLFxuXHRcdFx0cmVzb2x2ZVZhbHVlcyA9IHNsaWNlLmNhbGwoIGFyZ3VtZW50cyApLFxuXHRcdFx0bGVuZ3RoID0gcmVzb2x2ZVZhbHVlcy5sZW5ndGgsXG5cblx0XHRcdC8vIHRoZSBjb3VudCBvZiB1bmNvbXBsZXRlZCBzdWJvcmRpbmF0ZXNcblx0XHRcdHJlbWFpbmluZyA9IGxlbmd0aCAhPT0gMSB8fFxuXHRcdFx0XHQoIHN1Ym9yZGluYXRlICYmIGpRdWVyeS5pc0Z1bmN0aW9uKCBzdWJvcmRpbmF0ZS5wcm9taXNlICkgKSA/IGxlbmd0aCA6IDAsXG5cblx0XHRcdC8vIHRoZSBtYXN0ZXIgRGVmZXJyZWQuXG5cdFx0XHQvLyBJZiByZXNvbHZlVmFsdWVzIGNvbnNpc3Qgb2Ygb25seSBhIHNpbmdsZSBEZWZlcnJlZCwganVzdCB1c2UgdGhhdC5cblx0XHRcdGRlZmVycmVkID0gcmVtYWluaW5nID09PSAxID8gc3Vib3JkaW5hdGUgOiBqUXVlcnkuRGVmZXJyZWQoKSxcblxuXHRcdFx0Ly8gVXBkYXRlIGZ1bmN0aW9uIGZvciBib3RoIHJlc29sdmUgYW5kIHByb2dyZXNzIHZhbHVlc1xuXHRcdFx0dXBkYXRlRnVuYyA9IGZ1bmN0aW9uKCBpLCBjb250ZXh0cywgdmFsdWVzICkge1xuXHRcdFx0XHRyZXR1cm4gZnVuY3Rpb24oIHZhbHVlICkge1xuXHRcdFx0XHRcdGNvbnRleHRzWyBpIF0gPSB0aGlzO1xuXHRcdFx0XHRcdHZhbHVlc1sgaSBdID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBzbGljZS5jYWxsKCBhcmd1bWVudHMgKSA6IHZhbHVlO1xuXHRcdFx0XHRcdGlmICggdmFsdWVzID09PSBwcm9ncmVzc1ZhbHVlcyApIHtcblx0XHRcdFx0XHRcdGRlZmVycmVkLm5vdGlmeVdpdGgoIGNvbnRleHRzLCB2YWx1ZXMgKTtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKCAhKCAtLXJlbWFpbmluZyApICkge1xuXHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVzb2x2ZVdpdGgoIGNvbnRleHRzLCB2YWx1ZXMgKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH07XG5cdFx0XHR9LFxuXG5cdFx0XHRwcm9ncmVzc1ZhbHVlcywgcHJvZ3Jlc3NDb250ZXh0cywgcmVzb2x2ZUNvbnRleHRzO1xuXG5cdFx0Ly8gQWRkIGxpc3RlbmVycyB0byBEZWZlcnJlZCBzdWJvcmRpbmF0ZXM7IHRyZWF0IG90aGVycyBhcyByZXNvbHZlZFxuXHRcdGlmICggbGVuZ3RoID4gMSApIHtcblx0XHRcdHByb2dyZXNzVmFsdWVzID0gbmV3IEFycmF5KCBsZW5ndGggKTtcblx0XHRcdHByb2dyZXNzQ29udGV4dHMgPSBuZXcgQXJyYXkoIGxlbmd0aCApO1xuXHRcdFx0cmVzb2x2ZUNvbnRleHRzID0gbmV3IEFycmF5KCBsZW5ndGggKTtcblx0XHRcdGZvciAoIDsgaSA8IGxlbmd0aDsgaSsrICkge1xuXHRcdFx0XHRpZiAoIHJlc29sdmVWYWx1ZXNbIGkgXSAmJiBqUXVlcnkuaXNGdW5jdGlvbiggcmVzb2x2ZVZhbHVlc1sgaSBdLnByb21pc2UgKSApIHtcblx0XHRcdFx0XHRyZXNvbHZlVmFsdWVzWyBpIF0ucHJvbWlzZSgpXG5cdFx0XHRcdFx0XHQucHJvZ3Jlc3MoIHVwZGF0ZUZ1bmMoIGksIHByb2dyZXNzQ29udGV4dHMsIHByb2dyZXNzVmFsdWVzICkgKVxuXHRcdFx0XHRcdFx0LmRvbmUoIHVwZGF0ZUZ1bmMoIGksIHJlc29sdmVDb250ZXh0cywgcmVzb2x2ZVZhbHVlcyApIClcblx0XHRcdFx0XHRcdC5mYWlsKCBkZWZlcnJlZC5yZWplY3QgKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQtLXJlbWFpbmluZztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIElmIHdlJ3JlIG5vdCB3YWl0aW5nIG9uIGFueXRoaW5nLCByZXNvbHZlIHRoZSBtYXN0ZXJcblx0XHRpZiAoICFyZW1haW5pbmcgKSB7XG5cdFx0XHRkZWZlcnJlZC5yZXNvbHZlV2l0aCggcmVzb2x2ZUNvbnRleHRzLCByZXNvbHZlVmFsdWVzICk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcblx0fVxufSApO1xuXG5cbi8vIFRoZSBkZWZlcnJlZCB1c2VkIG9uIERPTSByZWFkeVxudmFyIHJlYWR5TGlzdDtcblxualF1ZXJ5LmZuLnJlYWR5ID0gZnVuY3Rpb24oIGZuICkge1xuXG5cdC8vIEFkZCB0aGUgY2FsbGJhY2tcblx0alF1ZXJ5LnJlYWR5LnByb21pc2UoKS5kb25lKCBmbiApO1xuXG5cdHJldHVybiB0aGlzO1xufTtcblxualF1ZXJ5LmV4dGVuZCgge1xuXG5cdC8vIElzIHRoZSBET00gcmVhZHkgdG8gYmUgdXNlZD8gU2V0IHRvIHRydWUgb25jZSBpdCBvY2N1cnMuXG5cdGlzUmVhZHk6IGZhbHNlLFxuXG5cdC8vIEEgY291bnRlciB0byB0cmFjayBob3cgbWFueSBpdGVtcyB0byB3YWl0IGZvciBiZWZvcmVcblx0Ly8gdGhlIHJlYWR5IGV2ZW50IGZpcmVzLiBTZWUgIzY3ODFcblx0cmVhZHlXYWl0OiAxLFxuXG5cdC8vIEhvbGQgKG9yIHJlbGVhc2UpIHRoZSByZWFkeSBldmVudFxuXHRob2xkUmVhZHk6IGZ1bmN0aW9uKCBob2xkICkge1xuXHRcdGlmICggaG9sZCApIHtcblx0XHRcdGpRdWVyeS5yZWFkeVdhaXQrKztcblx0XHR9IGVsc2Uge1xuXHRcdFx0alF1ZXJ5LnJlYWR5KCB0cnVlICk7XG5cdFx0fVxuXHR9LFxuXG5cdC8vIEhhbmRsZSB3aGVuIHRoZSBET00gaXMgcmVhZHlcblx0cmVhZHk6IGZ1bmN0aW9uKCB3YWl0ICkge1xuXG5cdFx0Ly8gQWJvcnQgaWYgdGhlcmUgYXJlIHBlbmRpbmcgaG9sZHMgb3Igd2UncmUgYWxyZWFkeSByZWFkeVxuXHRcdGlmICggd2FpdCA9PT0gdHJ1ZSA/IC0talF1ZXJ5LnJlYWR5V2FpdCA6IGpRdWVyeS5pc1JlYWR5ICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIFJlbWVtYmVyIHRoYXQgdGhlIERPTSBpcyByZWFkeVxuXHRcdGpRdWVyeS5pc1JlYWR5ID0gdHJ1ZTtcblxuXHRcdC8vIElmIGEgbm9ybWFsIERPTSBSZWFkeSBldmVudCBmaXJlZCwgZGVjcmVtZW50LCBhbmQgd2FpdCBpZiBuZWVkIGJlXG5cdFx0aWYgKCB3YWl0ICE9PSB0cnVlICYmIC0talF1ZXJ5LnJlYWR5V2FpdCA+IDAgKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gSWYgdGhlcmUgYXJlIGZ1bmN0aW9ucyBib3VuZCwgdG8gZXhlY3V0ZVxuXHRcdHJlYWR5TGlzdC5yZXNvbHZlV2l0aCggZG9jdW1lbnQsIFsgalF1ZXJ5IF0gKTtcblxuXHRcdC8vIFRyaWdnZXIgYW55IGJvdW5kIHJlYWR5IGV2ZW50c1xuXHRcdGlmICggalF1ZXJ5LmZuLnRyaWdnZXJIYW5kbGVyICkge1xuXHRcdFx0alF1ZXJ5KCBkb2N1bWVudCApLnRyaWdnZXJIYW5kbGVyKCBcInJlYWR5XCIgKTtcblx0XHRcdGpRdWVyeSggZG9jdW1lbnQgKS5vZmYoIFwicmVhZHlcIiApO1xuXHRcdH1cblx0fVxufSApO1xuXG4vKipcbiAqIFRoZSByZWFkeSBldmVudCBoYW5kbGVyIGFuZCBzZWxmIGNsZWFudXAgbWV0aG9kXG4gKi9cbmZ1bmN0aW9uIGNvbXBsZXRlZCgpIHtcblx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lciggXCJET01Db250ZW50TG9hZGVkXCIsIGNvbXBsZXRlZCApO1xuXHR3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lciggXCJsb2FkXCIsIGNvbXBsZXRlZCApO1xuXHRqUXVlcnkucmVhZHkoKTtcbn1cblxualF1ZXJ5LnJlYWR5LnByb21pc2UgPSBmdW5jdGlvbiggb2JqICkge1xuXHRpZiAoICFyZWFkeUxpc3QgKSB7XG5cblx0XHRyZWFkeUxpc3QgPSBqUXVlcnkuRGVmZXJyZWQoKTtcblxuXHRcdC8vIENhdGNoIGNhc2VzIHdoZXJlICQoZG9jdW1lbnQpLnJlYWR5KCkgaXMgY2FsbGVkXG5cdFx0Ly8gYWZ0ZXIgdGhlIGJyb3dzZXIgZXZlbnQgaGFzIGFscmVhZHkgb2NjdXJyZWQuXG5cdFx0Ly8gU3VwcG9ydDogSUU5LTEwIG9ubHlcblx0XHQvLyBPbGRlciBJRSBzb21ldGltZXMgc2lnbmFscyBcImludGVyYWN0aXZlXCIgdG9vIHNvb25cblx0XHRpZiAoIGRvY3VtZW50LnJlYWR5U3RhdGUgPT09IFwiY29tcGxldGVcIiB8fFxuXHRcdFx0KCBkb2N1bWVudC5yZWFkeVN0YXRlICE9PSBcImxvYWRpbmdcIiAmJiAhZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmRvU2Nyb2xsICkgKSB7XG5cblx0XHRcdC8vIEhhbmRsZSBpdCBhc3luY2hyb25vdXNseSB0byBhbGxvdyBzY3JpcHRzIHRoZSBvcHBvcnR1bml0eSB0byBkZWxheSByZWFkeVxuXHRcdFx0d2luZG93LnNldFRpbWVvdXQoIGpRdWVyeS5yZWFkeSApO1xuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0Ly8gVXNlIHRoZSBoYW5keSBldmVudCBjYWxsYmFja1xuXHRcdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggXCJET01Db250ZW50TG9hZGVkXCIsIGNvbXBsZXRlZCApO1xuXG5cdFx0XHQvLyBBIGZhbGxiYWNrIHRvIHdpbmRvdy5vbmxvYWQsIHRoYXQgd2lsbCBhbHdheXMgd29ya1xuXHRcdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoIFwibG9hZFwiLCBjb21wbGV0ZWQgKTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlYWR5TGlzdC5wcm9taXNlKCBvYmogKTtcbn07XG5cbi8vIEtpY2sgb2ZmIHRoZSBET00gcmVhZHkgY2hlY2sgZXZlbiBpZiB0aGUgdXNlciBkb2VzIG5vdFxualF1ZXJ5LnJlYWR5LnByb21pc2UoKTtcblxuXG5cblxuLy8gTXVsdGlmdW5jdGlvbmFsIG1ldGhvZCB0byBnZXQgYW5kIHNldCB2YWx1ZXMgb2YgYSBjb2xsZWN0aW9uXG4vLyBUaGUgdmFsdWUvcyBjYW4gb3B0aW9uYWxseSBiZSBleGVjdXRlZCBpZiBpdCdzIGEgZnVuY3Rpb25cbnZhciBhY2Nlc3MgPSBmdW5jdGlvbiggZWxlbXMsIGZuLCBrZXksIHZhbHVlLCBjaGFpbmFibGUsIGVtcHR5R2V0LCByYXcgKSB7XG5cdHZhciBpID0gMCxcblx0XHRsZW4gPSBlbGVtcy5sZW5ndGgsXG5cdFx0YnVsayA9IGtleSA9PSBudWxsO1xuXG5cdC8vIFNldHMgbWFueSB2YWx1ZXNcblx0aWYgKCBqUXVlcnkudHlwZSgga2V5ICkgPT09IFwib2JqZWN0XCIgKSB7XG5cdFx0Y2hhaW5hYmxlID0gdHJ1ZTtcblx0XHRmb3IgKCBpIGluIGtleSApIHtcblx0XHRcdGFjY2VzcyggZWxlbXMsIGZuLCBpLCBrZXlbIGkgXSwgdHJ1ZSwgZW1wdHlHZXQsIHJhdyApO1xuXHRcdH1cblxuXHQvLyBTZXRzIG9uZSB2YWx1ZVxuXHR9IGVsc2UgaWYgKCB2YWx1ZSAhPT0gdW5kZWZpbmVkICkge1xuXHRcdGNoYWluYWJsZSA9IHRydWU7XG5cblx0XHRpZiAoICFqUXVlcnkuaXNGdW5jdGlvbiggdmFsdWUgKSApIHtcblx0XHRcdHJhdyA9IHRydWU7XG5cdFx0fVxuXG5cdFx0aWYgKCBidWxrICkge1xuXG5cdFx0XHQvLyBCdWxrIG9wZXJhdGlvbnMgcnVuIGFnYWluc3QgdGhlIGVudGlyZSBzZXRcblx0XHRcdGlmICggcmF3ICkge1xuXHRcdFx0XHRmbi5jYWxsKCBlbGVtcywgdmFsdWUgKTtcblx0XHRcdFx0Zm4gPSBudWxsO1xuXG5cdFx0XHQvLyAuLi5leGNlcHQgd2hlbiBleGVjdXRpbmcgZnVuY3Rpb24gdmFsdWVzXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRidWxrID0gZm47XG5cdFx0XHRcdGZuID0gZnVuY3Rpb24oIGVsZW0sIGtleSwgdmFsdWUgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGJ1bGsuY2FsbCggalF1ZXJ5KCBlbGVtICksIHZhbHVlICk7XG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKCBmbiApIHtcblx0XHRcdGZvciAoIDsgaSA8IGxlbjsgaSsrICkge1xuXHRcdFx0XHRmbihcblx0XHRcdFx0XHRlbGVtc1sgaSBdLCBrZXksIHJhdyA/XG5cdFx0XHRcdFx0dmFsdWUgOlxuXHRcdFx0XHRcdHZhbHVlLmNhbGwoIGVsZW1zWyBpIF0sIGksIGZuKCBlbGVtc1sgaSBdLCBrZXkgKSApXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGNoYWluYWJsZSA/XG5cdFx0ZWxlbXMgOlxuXG5cdFx0Ly8gR2V0c1xuXHRcdGJ1bGsgP1xuXHRcdFx0Zm4uY2FsbCggZWxlbXMgKSA6XG5cdFx0XHRsZW4gPyBmbiggZWxlbXNbIDAgXSwga2V5ICkgOiBlbXB0eUdldDtcbn07XG52YXIgYWNjZXB0RGF0YSA9IGZ1bmN0aW9uKCBvd25lciApIHtcblxuXHQvLyBBY2NlcHRzIG9ubHk6XG5cdC8vICAtIE5vZGVcblx0Ly8gICAgLSBOb2RlLkVMRU1FTlRfTk9ERVxuXHQvLyAgICAtIE5vZGUuRE9DVU1FTlRfTk9ERVxuXHQvLyAgLSBPYmplY3Rcblx0Ly8gICAgLSBBbnlcblx0LyoganNoaW50IC1XMDE4ICovXG5cdHJldHVybiBvd25lci5ub2RlVHlwZSA9PT0gMSB8fCBvd25lci5ub2RlVHlwZSA9PT0gOSB8fCAhKCArb3duZXIubm9kZVR5cGUgKTtcbn07XG5cblxuXG5cbmZ1bmN0aW9uIERhdGEoKSB7XG5cdHRoaXMuZXhwYW5kbyA9IGpRdWVyeS5leHBhbmRvICsgRGF0YS51aWQrKztcbn1cblxuRGF0YS51aWQgPSAxO1xuXG5EYXRhLnByb3RvdHlwZSA9IHtcblxuXHRyZWdpc3RlcjogZnVuY3Rpb24oIG93bmVyLCBpbml0aWFsICkge1xuXHRcdHZhciB2YWx1ZSA9IGluaXRpYWwgfHwge307XG5cblx0XHQvLyBJZiBpdCBpcyBhIG5vZGUgdW5saWtlbHkgdG8gYmUgc3RyaW5naWZ5LWVkIG9yIGxvb3BlZCBvdmVyXG5cdFx0Ly8gdXNlIHBsYWluIGFzc2lnbm1lbnRcblx0XHRpZiAoIG93bmVyLm5vZGVUeXBlICkge1xuXHRcdFx0b3duZXJbIHRoaXMuZXhwYW5kbyBdID0gdmFsdWU7XG5cblx0XHQvLyBPdGhlcndpc2Ugc2VjdXJlIGl0IGluIGEgbm9uLWVudW1lcmFibGUsIG5vbi13cml0YWJsZSBwcm9wZXJ0eVxuXHRcdC8vIGNvbmZpZ3VyYWJpbGl0eSBtdXN0IGJlIHRydWUgdG8gYWxsb3cgdGhlIHByb3BlcnR5IHRvIGJlXG5cdFx0Ly8gZGVsZXRlZCB3aXRoIHRoZSBkZWxldGUgb3BlcmF0b3Jcblx0XHR9IGVsc2Uge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KCBvd25lciwgdGhpcy5leHBhbmRvLCB7XG5cdFx0XHRcdHZhbHVlOiB2YWx1ZSxcblx0XHRcdFx0d3JpdGFibGU6IHRydWUsXG5cdFx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZVxuXHRcdFx0fSApO1xuXHRcdH1cblx0XHRyZXR1cm4gb3duZXJbIHRoaXMuZXhwYW5kbyBdO1xuXHR9LFxuXHRjYWNoZTogZnVuY3Rpb24oIG93bmVyICkge1xuXG5cdFx0Ly8gV2UgY2FuIGFjY2VwdCBkYXRhIGZvciBub24tZWxlbWVudCBub2RlcyBpbiBtb2Rlcm4gYnJvd3NlcnMsXG5cdFx0Ly8gYnV0IHdlIHNob3VsZCBub3QsIHNlZSAjODMzNS5cblx0XHQvLyBBbHdheXMgcmV0dXJuIGFuIGVtcHR5IG9iamVjdC5cblx0XHRpZiAoICFhY2NlcHREYXRhKCBvd25lciApICkge1xuXHRcdFx0cmV0dXJuIHt9O1xuXHRcdH1cblxuXHRcdC8vIENoZWNrIGlmIHRoZSBvd25lciBvYmplY3QgYWxyZWFkeSBoYXMgYSBjYWNoZVxuXHRcdHZhciB2YWx1ZSA9IG93bmVyWyB0aGlzLmV4cGFuZG8gXTtcblxuXHRcdC8vIElmIG5vdCwgY3JlYXRlIG9uZVxuXHRcdGlmICggIXZhbHVlICkge1xuXHRcdFx0dmFsdWUgPSB7fTtcblxuXHRcdFx0Ly8gV2UgY2FuIGFjY2VwdCBkYXRhIGZvciBub24tZWxlbWVudCBub2RlcyBpbiBtb2Rlcm4gYnJvd3NlcnMsXG5cdFx0XHQvLyBidXQgd2Ugc2hvdWxkIG5vdCwgc2VlICM4MzM1LlxuXHRcdFx0Ly8gQWx3YXlzIHJldHVybiBhbiBlbXB0eSBvYmplY3QuXG5cdFx0XHRpZiAoIGFjY2VwdERhdGEoIG93bmVyICkgKSB7XG5cblx0XHRcdFx0Ly8gSWYgaXQgaXMgYSBub2RlIHVubGlrZWx5IHRvIGJlIHN0cmluZ2lmeS1lZCBvciBsb29wZWQgb3ZlclxuXHRcdFx0XHQvLyB1c2UgcGxhaW4gYXNzaWdubWVudFxuXHRcdFx0XHRpZiAoIG93bmVyLm5vZGVUeXBlICkge1xuXHRcdFx0XHRcdG93bmVyWyB0aGlzLmV4cGFuZG8gXSA9IHZhbHVlO1xuXG5cdFx0XHRcdC8vIE90aGVyd2lzZSBzZWN1cmUgaXQgaW4gYSBub24tZW51bWVyYWJsZSBwcm9wZXJ0eVxuXHRcdFx0XHQvLyBjb25maWd1cmFibGUgbXVzdCBiZSB0cnVlIHRvIGFsbG93IHRoZSBwcm9wZXJ0eSB0byBiZVxuXHRcdFx0XHQvLyBkZWxldGVkIHdoZW4gZGF0YSBpcyByZW1vdmVkXG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KCBvd25lciwgdGhpcy5leHBhbmRvLCB7XG5cdFx0XHRcdFx0XHR2YWx1ZTogdmFsdWUsXG5cdFx0XHRcdFx0XHRjb25maWd1cmFibGU6IHRydWVcblx0XHRcdFx0XHR9ICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gdmFsdWU7XG5cdH0sXG5cdHNldDogZnVuY3Rpb24oIG93bmVyLCBkYXRhLCB2YWx1ZSApIHtcblx0XHR2YXIgcHJvcCxcblx0XHRcdGNhY2hlID0gdGhpcy5jYWNoZSggb3duZXIgKTtcblxuXHRcdC8vIEhhbmRsZTogWyBvd25lciwga2V5LCB2YWx1ZSBdIGFyZ3Ncblx0XHRpZiAoIHR5cGVvZiBkYXRhID09PSBcInN0cmluZ1wiICkge1xuXHRcdFx0Y2FjaGVbIGRhdGEgXSA9IHZhbHVlO1xuXG5cdFx0Ly8gSGFuZGxlOiBbIG93bmVyLCB7IHByb3BlcnRpZXMgfSBdIGFyZ3Ncblx0XHR9IGVsc2Uge1xuXG5cdFx0XHQvLyBDb3B5IHRoZSBwcm9wZXJ0aWVzIG9uZS1ieS1vbmUgdG8gdGhlIGNhY2hlIG9iamVjdFxuXHRcdFx0Zm9yICggcHJvcCBpbiBkYXRhICkge1xuXHRcdFx0XHRjYWNoZVsgcHJvcCBdID0gZGF0YVsgcHJvcCBdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gY2FjaGU7XG5cdH0sXG5cdGdldDogZnVuY3Rpb24oIG93bmVyLCBrZXkgKSB7XG5cdFx0cmV0dXJuIGtleSA9PT0gdW5kZWZpbmVkID9cblx0XHRcdHRoaXMuY2FjaGUoIG93bmVyICkgOlxuXHRcdFx0b3duZXJbIHRoaXMuZXhwYW5kbyBdICYmIG93bmVyWyB0aGlzLmV4cGFuZG8gXVsga2V5IF07XG5cdH0sXG5cdGFjY2VzczogZnVuY3Rpb24oIG93bmVyLCBrZXksIHZhbHVlICkge1xuXHRcdHZhciBzdG9yZWQ7XG5cblx0XHQvLyBJbiBjYXNlcyB3aGVyZSBlaXRoZXI6XG5cdFx0Ly9cblx0XHQvLyAgIDEuIE5vIGtleSB3YXMgc3BlY2lmaWVkXG5cdFx0Ly8gICAyLiBBIHN0cmluZyBrZXkgd2FzIHNwZWNpZmllZCwgYnV0IG5vIHZhbHVlIHByb3ZpZGVkXG5cdFx0Ly9cblx0XHQvLyBUYWtlIHRoZSBcInJlYWRcIiBwYXRoIGFuZCBhbGxvdyB0aGUgZ2V0IG1ldGhvZCB0byBkZXRlcm1pbmVcblx0XHQvLyB3aGljaCB2YWx1ZSB0byByZXR1cm4sIHJlc3BlY3RpdmVseSBlaXRoZXI6XG5cdFx0Ly9cblx0XHQvLyAgIDEuIFRoZSBlbnRpcmUgY2FjaGUgb2JqZWN0XG5cdFx0Ly8gICAyLiBUaGUgZGF0YSBzdG9yZWQgYXQgdGhlIGtleVxuXHRcdC8vXG5cdFx0aWYgKCBrZXkgPT09IHVuZGVmaW5lZCB8fFxuXHRcdFx0XHQoICgga2V5ICYmIHR5cGVvZiBrZXkgPT09IFwic3RyaW5nXCIgKSAmJiB2YWx1ZSA9PT0gdW5kZWZpbmVkICkgKSB7XG5cblx0XHRcdHN0b3JlZCA9IHRoaXMuZ2V0KCBvd25lciwga2V5ICk7XG5cblx0XHRcdHJldHVybiBzdG9yZWQgIT09IHVuZGVmaW5lZCA/XG5cdFx0XHRcdHN0b3JlZCA6IHRoaXMuZ2V0KCBvd25lciwgalF1ZXJ5LmNhbWVsQ2FzZSgga2V5ICkgKTtcblx0XHR9XG5cblx0XHQvLyBXaGVuIHRoZSBrZXkgaXMgbm90IGEgc3RyaW5nLCBvciBib3RoIGEga2V5IGFuZCB2YWx1ZVxuXHRcdC8vIGFyZSBzcGVjaWZpZWQsIHNldCBvciBleHRlbmQgKGV4aXN0aW5nIG9iamVjdHMpIHdpdGggZWl0aGVyOlxuXHRcdC8vXG5cdFx0Ly8gICAxLiBBbiBvYmplY3Qgb2YgcHJvcGVydGllc1xuXHRcdC8vICAgMi4gQSBrZXkgYW5kIHZhbHVlXG5cdFx0Ly9cblx0XHR0aGlzLnNldCggb3duZXIsIGtleSwgdmFsdWUgKTtcblxuXHRcdC8vIFNpbmNlIHRoZSBcInNldFwiIHBhdGggY2FuIGhhdmUgdHdvIHBvc3NpYmxlIGVudHJ5IHBvaW50c1xuXHRcdC8vIHJldHVybiB0aGUgZXhwZWN0ZWQgZGF0YSBiYXNlZCBvbiB3aGljaCBwYXRoIHdhcyB0YWtlblsqXVxuXHRcdHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkID8gdmFsdWUgOiBrZXk7XG5cdH0sXG5cdHJlbW92ZTogZnVuY3Rpb24oIG93bmVyLCBrZXkgKSB7XG5cdFx0dmFyIGksIG5hbWUsIGNhbWVsLFxuXHRcdFx0Y2FjaGUgPSBvd25lclsgdGhpcy5leHBhbmRvIF07XG5cblx0XHRpZiAoIGNhY2hlID09PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0aWYgKCBrZXkgPT09IHVuZGVmaW5lZCApIHtcblx0XHRcdHRoaXMucmVnaXN0ZXIoIG93bmVyICk7XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHQvLyBTdXBwb3J0IGFycmF5IG9yIHNwYWNlIHNlcGFyYXRlZCBzdHJpbmcgb2Yga2V5c1xuXHRcdFx0aWYgKCBqUXVlcnkuaXNBcnJheSgga2V5ICkgKSB7XG5cblx0XHRcdFx0Ly8gSWYgXCJuYW1lXCIgaXMgYW4gYXJyYXkgb2Yga2V5cy4uLlxuXHRcdFx0XHQvLyBXaGVuIGRhdGEgaXMgaW5pdGlhbGx5IGNyZWF0ZWQsIHZpYSAoXCJrZXlcIiwgXCJ2YWxcIikgc2lnbmF0dXJlLFxuXHRcdFx0XHQvLyBrZXlzIHdpbGwgYmUgY29udmVydGVkIHRvIGNhbWVsQ2FzZS5cblx0XHRcdFx0Ly8gU2luY2UgdGhlcmUgaXMgbm8gd2F5IHRvIHRlbGwgX2hvd18gYSBrZXkgd2FzIGFkZGVkLCByZW1vdmVcblx0XHRcdFx0Ly8gYm90aCBwbGFpbiBrZXkgYW5kIGNhbWVsQ2FzZSBrZXkuICMxMjc4NlxuXHRcdFx0XHQvLyBUaGlzIHdpbGwgb25seSBwZW5hbGl6ZSB0aGUgYXJyYXkgYXJndW1lbnQgcGF0aC5cblx0XHRcdFx0bmFtZSA9IGtleS5jb25jYXQoIGtleS5tYXAoIGpRdWVyeS5jYW1lbENhc2UgKSApO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Y2FtZWwgPSBqUXVlcnkuY2FtZWxDYXNlKCBrZXkgKTtcblxuXHRcdFx0XHQvLyBUcnkgdGhlIHN0cmluZyBhcyBhIGtleSBiZWZvcmUgYW55IG1hbmlwdWxhdGlvblxuXHRcdFx0XHRpZiAoIGtleSBpbiBjYWNoZSApIHtcblx0XHRcdFx0XHRuYW1lID0gWyBrZXksIGNhbWVsIF07XG5cdFx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0XHQvLyBJZiBhIGtleSB3aXRoIHRoZSBzcGFjZXMgZXhpc3RzLCB1c2UgaXQuXG5cdFx0XHRcdFx0Ly8gT3RoZXJ3aXNlLCBjcmVhdGUgYW4gYXJyYXkgYnkgbWF0Y2hpbmcgbm9uLXdoaXRlc3BhY2Vcblx0XHRcdFx0XHRuYW1lID0gY2FtZWw7XG5cdFx0XHRcdFx0bmFtZSA9IG5hbWUgaW4gY2FjaGUgP1xuXHRcdFx0XHRcdFx0WyBuYW1lIF0gOiAoIG5hbWUubWF0Y2goIHJub3R3aGl0ZSApIHx8IFtdICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0aSA9IG5hbWUubGVuZ3RoO1xuXG5cdFx0XHR3aGlsZSAoIGktLSApIHtcblx0XHRcdFx0ZGVsZXRlIGNhY2hlWyBuYW1lWyBpIF0gXTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBSZW1vdmUgdGhlIGV4cGFuZG8gaWYgdGhlcmUncyBubyBtb3JlIGRhdGFcblx0XHRpZiAoIGtleSA9PT0gdW5kZWZpbmVkIHx8IGpRdWVyeS5pc0VtcHR5T2JqZWN0KCBjYWNoZSApICkge1xuXG5cdFx0XHQvLyBTdXBwb3J0OiBDaHJvbWUgPD0gMzUtNDUrXG5cdFx0XHQvLyBXZWJraXQgJiBCbGluayBwZXJmb3JtYW5jZSBzdWZmZXJzIHdoZW4gZGVsZXRpbmcgcHJvcGVydGllc1xuXHRcdFx0Ly8gZnJvbSBET00gbm9kZXMsIHNvIHNldCB0byB1bmRlZmluZWQgaW5zdGVhZFxuXHRcdFx0Ly8gaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTM3ODYwN1xuXHRcdFx0aWYgKCBvd25lci5ub2RlVHlwZSApIHtcblx0XHRcdFx0b3duZXJbIHRoaXMuZXhwYW5kbyBdID0gdW5kZWZpbmVkO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZGVsZXRlIG93bmVyWyB0aGlzLmV4cGFuZG8gXTtcblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cdGhhc0RhdGE6IGZ1bmN0aW9uKCBvd25lciApIHtcblx0XHR2YXIgY2FjaGUgPSBvd25lclsgdGhpcy5leHBhbmRvIF07XG5cdFx0cmV0dXJuIGNhY2hlICE9PSB1bmRlZmluZWQgJiYgIWpRdWVyeS5pc0VtcHR5T2JqZWN0KCBjYWNoZSApO1xuXHR9XG59O1xudmFyIGRhdGFQcml2ID0gbmV3IERhdGEoKTtcblxudmFyIGRhdGFVc2VyID0gbmV3IERhdGEoKTtcblxuXG5cbi8vXHRJbXBsZW1lbnRhdGlvbiBTdW1tYXJ5XG4vL1xuLy9cdDEuIEVuZm9yY2UgQVBJIHN1cmZhY2UgYW5kIHNlbWFudGljIGNvbXBhdGliaWxpdHkgd2l0aCAxLjkueCBicmFuY2hcbi8vXHQyLiBJbXByb3ZlIHRoZSBtb2R1bGUncyBtYWludGFpbmFiaWxpdHkgYnkgcmVkdWNpbmcgdGhlIHN0b3JhZ2Vcbi8vXHRcdHBhdGhzIHRvIGEgc2luZ2xlIG1lY2hhbmlzbS5cbi8vXHQzLiBVc2UgdGhlIHNhbWUgc2luZ2xlIG1lY2hhbmlzbSB0byBzdXBwb3J0IFwicHJpdmF0ZVwiIGFuZCBcInVzZXJcIiBkYXRhLlxuLy9cdDQuIF9OZXZlcl8gZXhwb3NlIFwicHJpdmF0ZVwiIGRhdGEgdG8gdXNlciBjb2RlIChUT0RPOiBEcm9wIF9kYXRhLCBfcmVtb3ZlRGF0YSlcbi8vXHQ1LiBBdm9pZCBleHBvc2luZyBpbXBsZW1lbnRhdGlvbiBkZXRhaWxzIG9uIHVzZXIgb2JqZWN0cyAoZWcuIGV4cGFuZG8gcHJvcGVydGllcylcbi8vXHQ2LiBQcm92aWRlIGEgY2xlYXIgcGF0aCBmb3IgaW1wbGVtZW50YXRpb24gdXBncmFkZSB0byBXZWFrTWFwIGluIDIwMTRcblxudmFyIHJicmFjZSA9IC9eKD86XFx7W1xcd1xcV10qXFx9fFxcW1tcXHdcXFddKlxcXSkkLyxcblx0cm11bHRpRGFzaCA9IC9bQS1aXS9nO1xuXG5mdW5jdGlvbiBkYXRhQXR0ciggZWxlbSwga2V5LCBkYXRhICkge1xuXHR2YXIgbmFtZTtcblxuXHQvLyBJZiBub3RoaW5nIHdhcyBmb3VuZCBpbnRlcm5hbGx5LCB0cnkgdG8gZmV0Y2ggYW55XG5cdC8vIGRhdGEgZnJvbSB0aGUgSFRNTDUgZGF0YS0qIGF0dHJpYnV0ZVxuXHRpZiAoIGRhdGEgPT09IHVuZGVmaW5lZCAmJiBlbGVtLm5vZGVUeXBlID09PSAxICkge1xuXHRcdG5hbWUgPSBcImRhdGEtXCIgKyBrZXkucmVwbGFjZSggcm11bHRpRGFzaCwgXCItJCZcIiApLnRvTG93ZXJDYXNlKCk7XG5cdFx0ZGF0YSA9IGVsZW0uZ2V0QXR0cmlidXRlKCBuYW1lICk7XG5cblx0XHRpZiAoIHR5cGVvZiBkYXRhID09PSBcInN0cmluZ1wiICkge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0ZGF0YSA9IGRhdGEgPT09IFwidHJ1ZVwiID8gdHJ1ZSA6XG5cdFx0XHRcdFx0ZGF0YSA9PT0gXCJmYWxzZVwiID8gZmFsc2UgOlxuXHRcdFx0XHRcdGRhdGEgPT09IFwibnVsbFwiID8gbnVsbCA6XG5cblx0XHRcdFx0XHQvLyBPbmx5IGNvbnZlcnQgdG8gYSBudW1iZXIgaWYgaXQgZG9lc24ndCBjaGFuZ2UgdGhlIHN0cmluZ1xuXHRcdFx0XHRcdCtkYXRhICsgXCJcIiA9PT0gZGF0YSA/ICtkYXRhIDpcblx0XHRcdFx0XHRyYnJhY2UudGVzdCggZGF0YSApID8galF1ZXJ5LnBhcnNlSlNPTiggZGF0YSApIDpcblx0XHRcdFx0XHRkYXRhO1xuXHRcdFx0fSBjYXRjaCAoIGUgKSB7fVxuXG5cdFx0XHQvLyBNYWtlIHN1cmUgd2Ugc2V0IHRoZSBkYXRhIHNvIGl0IGlzbid0IGNoYW5nZWQgbGF0ZXJcblx0XHRcdGRhdGFVc2VyLnNldCggZWxlbSwga2V5LCBkYXRhICk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGRhdGEgPSB1bmRlZmluZWQ7XG5cdFx0fVxuXHR9XG5cdHJldHVybiBkYXRhO1xufVxuXG5qUXVlcnkuZXh0ZW5kKCB7XG5cdGhhc0RhdGE6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdHJldHVybiBkYXRhVXNlci5oYXNEYXRhKCBlbGVtICkgfHwgZGF0YVByaXYuaGFzRGF0YSggZWxlbSApO1xuXHR9LFxuXG5cdGRhdGE6IGZ1bmN0aW9uKCBlbGVtLCBuYW1lLCBkYXRhICkge1xuXHRcdHJldHVybiBkYXRhVXNlci5hY2Nlc3MoIGVsZW0sIG5hbWUsIGRhdGEgKTtcblx0fSxcblxuXHRyZW1vdmVEYXRhOiBmdW5jdGlvbiggZWxlbSwgbmFtZSApIHtcblx0XHRkYXRhVXNlci5yZW1vdmUoIGVsZW0sIG5hbWUgKTtcblx0fSxcblxuXHQvLyBUT0RPOiBOb3cgdGhhdCBhbGwgY2FsbHMgdG8gX2RhdGEgYW5kIF9yZW1vdmVEYXRhIGhhdmUgYmVlbiByZXBsYWNlZFxuXHQvLyB3aXRoIGRpcmVjdCBjYWxscyB0byBkYXRhUHJpdiBtZXRob2RzLCB0aGVzZSBjYW4gYmUgZGVwcmVjYXRlZC5cblx0X2RhdGE6IGZ1bmN0aW9uKCBlbGVtLCBuYW1lLCBkYXRhICkge1xuXHRcdHJldHVybiBkYXRhUHJpdi5hY2Nlc3MoIGVsZW0sIG5hbWUsIGRhdGEgKTtcblx0fSxcblxuXHRfcmVtb3ZlRGF0YTogZnVuY3Rpb24oIGVsZW0sIG5hbWUgKSB7XG5cdFx0ZGF0YVByaXYucmVtb3ZlKCBlbGVtLCBuYW1lICk7XG5cdH1cbn0gKTtcblxualF1ZXJ5LmZuLmV4dGVuZCgge1xuXHRkYXRhOiBmdW5jdGlvbigga2V5LCB2YWx1ZSApIHtcblx0XHR2YXIgaSwgbmFtZSwgZGF0YSxcblx0XHRcdGVsZW0gPSB0aGlzWyAwIF0sXG5cdFx0XHRhdHRycyA9IGVsZW0gJiYgZWxlbS5hdHRyaWJ1dGVzO1xuXG5cdFx0Ly8gR2V0cyBhbGwgdmFsdWVzXG5cdFx0aWYgKCBrZXkgPT09IHVuZGVmaW5lZCApIHtcblx0XHRcdGlmICggdGhpcy5sZW5ndGggKSB7XG5cdFx0XHRcdGRhdGEgPSBkYXRhVXNlci5nZXQoIGVsZW0gKTtcblxuXHRcdFx0XHRpZiAoIGVsZW0ubm9kZVR5cGUgPT09IDEgJiYgIWRhdGFQcml2LmdldCggZWxlbSwgXCJoYXNEYXRhQXR0cnNcIiApICkge1xuXHRcdFx0XHRcdGkgPSBhdHRycy5sZW5ndGg7XG5cdFx0XHRcdFx0d2hpbGUgKCBpLS0gKSB7XG5cblx0XHRcdFx0XHRcdC8vIFN1cHBvcnQ6IElFMTErXG5cdFx0XHRcdFx0XHQvLyBUaGUgYXR0cnMgZWxlbWVudHMgY2FuIGJlIG51bGwgKCMxNDg5NClcblx0XHRcdFx0XHRcdGlmICggYXR0cnNbIGkgXSApIHtcblx0XHRcdFx0XHRcdFx0bmFtZSA9IGF0dHJzWyBpIF0ubmFtZTtcblx0XHRcdFx0XHRcdFx0aWYgKCBuYW1lLmluZGV4T2YoIFwiZGF0YS1cIiApID09PSAwICkge1xuXHRcdFx0XHRcdFx0XHRcdG5hbWUgPSBqUXVlcnkuY2FtZWxDYXNlKCBuYW1lLnNsaWNlKCA1ICkgKTtcblx0XHRcdFx0XHRcdFx0XHRkYXRhQXR0ciggZWxlbSwgbmFtZSwgZGF0YVsgbmFtZSBdICk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZGF0YVByaXYuc2V0KCBlbGVtLCBcImhhc0RhdGFBdHRyc1wiLCB0cnVlICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGRhdGE7XG5cdFx0fVxuXG5cdFx0Ly8gU2V0cyBtdWx0aXBsZSB2YWx1ZXNcblx0XHRpZiAoIHR5cGVvZiBrZXkgPT09IFwib2JqZWN0XCIgKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5lYWNoKCBmdW5jdGlvbigpIHtcblx0XHRcdFx0ZGF0YVVzZXIuc2V0KCB0aGlzLCBrZXkgKTtcblx0XHRcdH0gKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gYWNjZXNzKCB0aGlzLCBmdW5jdGlvbiggdmFsdWUgKSB7XG5cdFx0XHR2YXIgZGF0YSwgY2FtZWxLZXk7XG5cblx0XHRcdC8vIFRoZSBjYWxsaW5nIGpRdWVyeSBvYmplY3QgKGVsZW1lbnQgbWF0Y2hlcykgaXMgbm90IGVtcHR5XG5cdFx0XHQvLyAoYW5kIHRoZXJlZm9yZSBoYXMgYW4gZWxlbWVudCBhcHBlYXJzIGF0IHRoaXNbIDAgXSkgYW5kIHRoZVxuXHRcdFx0Ly8gYHZhbHVlYCBwYXJhbWV0ZXIgd2FzIG5vdCB1bmRlZmluZWQuIEFuIGVtcHR5IGpRdWVyeSBvYmplY3Rcblx0XHRcdC8vIHdpbGwgcmVzdWx0IGluIGB1bmRlZmluZWRgIGZvciBlbGVtID0gdGhpc1sgMCBdIHdoaWNoIHdpbGxcblx0XHRcdC8vIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhbiBhdHRlbXB0IHRvIHJlYWQgYSBkYXRhIGNhY2hlIGlzIG1hZGUuXG5cdFx0XHRpZiAoIGVsZW0gJiYgdmFsdWUgPT09IHVuZGVmaW5lZCApIHtcblxuXHRcdFx0XHQvLyBBdHRlbXB0IHRvIGdldCBkYXRhIGZyb20gdGhlIGNhY2hlXG5cdFx0XHRcdC8vIHdpdGggdGhlIGtleSBhcy1pc1xuXHRcdFx0XHRkYXRhID0gZGF0YVVzZXIuZ2V0KCBlbGVtLCBrZXkgKSB8fFxuXG5cdFx0XHRcdFx0Ly8gVHJ5IHRvIGZpbmQgZGFzaGVkIGtleSBpZiBpdCBleGlzdHMgKGdoLTI3NzkpXG5cdFx0XHRcdFx0Ly8gVGhpcyBpcyBmb3IgMi4yLnggb25seVxuXHRcdFx0XHRcdGRhdGFVc2VyLmdldCggZWxlbSwga2V5LnJlcGxhY2UoIHJtdWx0aURhc2gsIFwiLSQmXCIgKS50b0xvd2VyQ2FzZSgpICk7XG5cblx0XHRcdFx0aWYgKCBkYXRhICE9PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGRhdGE7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRjYW1lbEtleSA9IGpRdWVyeS5jYW1lbENhc2UoIGtleSApO1xuXG5cdFx0XHRcdC8vIEF0dGVtcHQgdG8gZ2V0IGRhdGEgZnJvbSB0aGUgY2FjaGVcblx0XHRcdFx0Ly8gd2l0aCB0aGUga2V5IGNhbWVsaXplZFxuXHRcdFx0XHRkYXRhID0gZGF0YVVzZXIuZ2V0KCBlbGVtLCBjYW1lbEtleSApO1xuXHRcdFx0XHRpZiAoIGRhdGEgIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdFx0XHRyZXR1cm4gZGF0YTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIEF0dGVtcHQgdG8gXCJkaXNjb3ZlclwiIHRoZSBkYXRhIGluXG5cdFx0XHRcdC8vIEhUTUw1IGN1c3RvbSBkYXRhLSogYXR0cnNcblx0XHRcdFx0ZGF0YSA9IGRhdGFBdHRyKCBlbGVtLCBjYW1lbEtleSwgdW5kZWZpbmVkICk7XG5cdFx0XHRcdGlmICggZGF0YSAhPT0gdW5kZWZpbmVkICkge1xuXHRcdFx0XHRcdHJldHVybiBkYXRhO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gV2UgdHJpZWQgcmVhbGx5IGhhcmQsIGJ1dCB0aGUgZGF0YSBkb2Vzbid0IGV4aXN0LlxuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdC8vIFNldCB0aGUgZGF0YS4uLlxuXHRcdFx0Y2FtZWxLZXkgPSBqUXVlcnkuY2FtZWxDYXNlKCBrZXkgKTtcblx0XHRcdHRoaXMuZWFjaCggZnVuY3Rpb24oKSB7XG5cblx0XHRcdFx0Ly8gRmlyc3QsIGF0dGVtcHQgdG8gc3RvcmUgYSBjb3B5IG9yIHJlZmVyZW5jZSBvZiBhbnlcblx0XHRcdFx0Ly8gZGF0YSB0aGF0IG1pZ2h0J3ZlIGJlZW4gc3RvcmUgd2l0aCBhIGNhbWVsQ2FzZWQga2V5LlxuXHRcdFx0XHR2YXIgZGF0YSA9IGRhdGFVc2VyLmdldCggdGhpcywgY2FtZWxLZXkgKTtcblxuXHRcdFx0XHQvLyBGb3IgSFRNTDUgZGF0YS0qIGF0dHJpYnV0ZSBpbnRlcm9wLCB3ZSBoYXZlIHRvXG5cdFx0XHRcdC8vIHN0b3JlIHByb3BlcnR5IG5hbWVzIHdpdGggZGFzaGVzIGluIGEgY2FtZWxDYXNlIGZvcm0uXG5cdFx0XHRcdC8vIFRoaXMgbWlnaHQgbm90IGFwcGx5IHRvIGFsbCBwcm9wZXJ0aWVzLi4uKlxuXHRcdFx0XHRkYXRhVXNlci5zZXQoIHRoaXMsIGNhbWVsS2V5LCB2YWx1ZSApO1xuXG5cdFx0XHRcdC8vICouLi4gSW4gdGhlIGNhc2Ugb2YgcHJvcGVydGllcyB0aGF0IG1pZ2h0IF9hY3R1YWxseV9cblx0XHRcdFx0Ly8gaGF2ZSBkYXNoZXMsIHdlIG5lZWQgdG8gYWxzbyBzdG9yZSBhIGNvcHkgb2YgdGhhdFxuXHRcdFx0XHQvLyB1bmNoYW5nZWQgcHJvcGVydHkuXG5cdFx0XHRcdGlmICgga2V5LmluZGV4T2YoIFwiLVwiICkgPiAtMSAmJiBkYXRhICE9PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRcdFx0ZGF0YVVzZXIuc2V0KCB0aGlzLCBrZXksIHZhbHVlICk7XG5cdFx0XHRcdH1cblx0XHRcdH0gKTtcblx0XHR9LCBudWxsLCB2YWx1ZSwgYXJndW1lbnRzLmxlbmd0aCA+IDEsIG51bGwsIHRydWUgKTtcblx0fSxcblxuXHRyZW1vdmVEYXRhOiBmdW5jdGlvbigga2V5ICkge1xuXHRcdHJldHVybiB0aGlzLmVhY2goIGZ1bmN0aW9uKCkge1xuXHRcdFx0ZGF0YVVzZXIucmVtb3ZlKCB0aGlzLCBrZXkgKTtcblx0XHR9ICk7XG5cdH1cbn0gKTtcblxuXG5qUXVlcnkuZXh0ZW5kKCB7XG5cdHF1ZXVlOiBmdW5jdGlvbiggZWxlbSwgdHlwZSwgZGF0YSApIHtcblx0XHR2YXIgcXVldWU7XG5cblx0XHRpZiAoIGVsZW0gKSB7XG5cdFx0XHR0eXBlID0gKCB0eXBlIHx8IFwiZnhcIiApICsgXCJxdWV1ZVwiO1xuXHRcdFx0cXVldWUgPSBkYXRhUHJpdi5nZXQoIGVsZW0sIHR5cGUgKTtcblxuXHRcdFx0Ly8gU3BlZWQgdXAgZGVxdWV1ZSBieSBnZXR0aW5nIG91dCBxdWlja2x5IGlmIHRoaXMgaXMganVzdCBhIGxvb2t1cFxuXHRcdFx0aWYgKCBkYXRhICkge1xuXHRcdFx0XHRpZiAoICFxdWV1ZSB8fCBqUXVlcnkuaXNBcnJheSggZGF0YSApICkge1xuXHRcdFx0XHRcdHF1ZXVlID0gZGF0YVByaXYuYWNjZXNzKCBlbGVtLCB0eXBlLCBqUXVlcnkubWFrZUFycmF5KCBkYXRhICkgKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRxdWV1ZS5wdXNoKCBkYXRhICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBxdWV1ZSB8fCBbXTtcblx0XHR9XG5cdH0sXG5cblx0ZGVxdWV1ZTogZnVuY3Rpb24oIGVsZW0sIHR5cGUgKSB7XG5cdFx0dHlwZSA9IHR5cGUgfHwgXCJmeFwiO1xuXG5cdFx0dmFyIHF1ZXVlID0galF1ZXJ5LnF1ZXVlKCBlbGVtLCB0eXBlICksXG5cdFx0XHRzdGFydExlbmd0aCA9IHF1ZXVlLmxlbmd0aCxcblx0XHRcdGZuID0gcXVldWUuc2hpZnQoKSxcblx0XHRcdGhvb2tzID0galF1ZXJ5Ll9xdWV1ZUhvb2tzKCBlbGVtLCB0eXBlICksXG5cdFx0XHRuZXh0ID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGpRdWVyeS5kZXF1ZXVlKCBlbGVtLCB0eXBlICk7XG5cdFx0XHR9O1xuXG5cdFx0Ly8gSWYgdGhlIGZ4IHF1ZXVlIGlzIGRlcXVldWVkLCBhbHdheXMgcmVtb3ZlIHRoZSBwcm9ncmVzcyBzZW50aW5lbFxuXHRcdGlmICggZm4gPT09IFwiaW5wcm9ncmVzc1wiICkge1xuXHRcdFx0Zm4gPSBxdWV1ZS5zaGlmdCgpO1xuXHRcdFx0c3RhcnRMZW5ndGgtLTtcblx0XHR9XG5cblx0XHRpZiAoIGZuICkge1xuXG5cdFx0XHQvLyBBZGQgYSBwcm9ncmVzcyBzZW50aW5lbCB0byBwcmV2ZW50IHRoZSBmeCBxdWV1ZSBmcm9tIGJlaW5nXG5cdFx0XHQvLyBhdXRvbWF0aWNhbGx5IGRlcXVldWVkXG5cdFx0XHRpZiAoIHR5cGUgPT09IFwiZnhcIiApIHtcblx0XHRcdFx0cXVldWUudW5zaGlmdCggXCJpbnByb2dyZXNzXCIgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQ2xlYXIgdXAgdGhlIGxhc3QgcXVldWUgc3RvcCBmdW5jdGlvblxuXHRcdFx0ZGVsZXRlIGhvb2tzLnN0b3A7XG5cdFx0XHRmbi5jYWxsKCBlbGVtLCBuZXh0LCBob29rcyApO1xuXHRcdH1cblxuXHRcdGlmICggIXN0YXJ0TGVuZ3RoICYmIGhvb2tzICkge1xuXHRcdFx0aG9va3MuZW1wdHkuZmlyZSgpO1xuXHRcdH1cblx0fSxcblxuXHQvLyBOb3QgcHVibGljIC0gZ2VuZXJhdGUgYSBxdWV1ZUhvb2tzIG9iamVjdCwgb3IgcmV0dXJuIHRoZSBjdXJyZW50IG9uZVxuXHRfcXVldWVIb29rczogZnVuY3Rpb24oIGVsZW0sIHR5cGUgKSB7XG5cdFx0dmFyIGtleSA9IHR5cGUgKyBcInF1ZXVlSG9va3NcIjtcblx0XHRyZXR1cm4gZGF0YVByaXYuZ2V0KCBlbGVtLCBrZXkgKSB8fCBkYXRhUHJpdi5hY2Nlc3MoIGVsZW0sIGtleSwge1xuXHRcdFx0ZW1wdHk6IGpRdWVyeS5DYWxsYmFja3MoIFwib25jZSBtZW1vcnlcIiApLmFkZCggZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGRhdGFQcml2LnJlbW92ZSggZWxlbSwgWyB0eXBlICsgXCJxdWV1ZVwiLCBrZXkgXSApO1xuXHRcdFx0fSApXG5cdFx0fSApO1xuXHR9XG59ICk7XG5cbmpRdWVyeS5mbi5leHRlbmQoIHtcblx0cXVldWU6IGZ1bmN0aW9uKCB0eXBlLCBkYXRhICkge1xuXHRcdHZhciBzZXR0ZXIgPSAyO1xuXG5cdFx0aWYgKCB0eXBlb2YgdHlwZSAhPT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdGRhdGEgPSB0eXBlO1xuXHRcdFx0dHlwZSA9IFwiZnhcIjtcblx0XHRcdHNldHRlci0tO1xuXHRcdH1cblxuXHRcdGlmICggYXJndW1lbnRzLmxlbmd0aCA8IHNldHRlciApIHtcblx0XHRcdHJldHVybiBqUXVlcnkucXVldWUoIHRoaXNbIDAgXSwgdHlwZSApO1xuXHRcdH1cblxuXHRcdHJldHVybiBkYXRhID09PSB1bmRlZmluZWQgP1xuXHRcdFx0dGhpcyA6XG5cdFx0XHR0aGlzLmVhY2goIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgcXVldWUgPSBqUXVlcnkucXVldWUoIHRoaXMsIHR5cGUsIGRhdGEgKTtcblxuXHRcdFx0XHQvLyBFbnN1cmUgYSBob29rcyBmb3IgdGhpcyBxdWV1ZVxuXHRcdFx0XHRqUXVlcnkuX3F1ZXVlSG9va3MoIHRoaXMsIHR5cGUgKTtcblxuXHRcdFx0XHRpZiAoIHR5cGUgPT09IFwiZnhcIiAmJiBxdWV1ZVsgMCBdICE9PSBcImlucHJvZ3Jlc3NcIiApIHtcblx0XHRcdFx0XHRqUXVlcnkuZGVxdWV1ZSggdGhpcywgdHlwZSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9ICk7XG5cdH0sXG5cdGRlcXVldWU6IGZ1bmN0aW9uKCB0eXBlICkge1xuXHRcdHJldHVybiB0aGlzLmVhY2goIGZ1bmN0aW9uKCkge1xuXHRcdFx0alF1ZXJ5LmRlcXVldWUoIHRoaXMsIHR5cGUgKTtcblx0XHR9ICk7XG5cdH0sXG5cdGNsZWFyUXVldWU6IGZ1bmN0aW9uKCB0eXBlICkge1xuXHRcdHJldHVybiB0aGlzLnF1ZXVlKCB0eXBlIHx8IFwiZnhcIiwgW10gKTtcblx0fSxcblxuXHQvLyBHZXQgYSBwcm9taXNlIHJlc29sdmVkIHdoZW4gcXVldWVzIG9mIGEgY2VydGFpbiB0eXBlXG5cdC8vIGFyZSBlbXB0aWVkIChmeCBpcyB0aGUgdHlwZSBieSBkZWZhdWx0KVxuXHRwcm9taXNlOiBmdW5jdGlvbiggdHlwZSwgb2JqICkge1xuXHRcdHZhciB0bXAsXG5cdFx0XHRjb3VudCA9IDEsXG5cdFx0XHRkZWZlciA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuXHRcdFx0ZWxlbWVudHMgPSB0aGlzLFxuXHRcdFx0aSA9IHRoaXMubGVuZ3RoLFxuXHRcdFx0cmVzb2x2ZSA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRpZiAoICEoIC0tY291bnQgKSApIHtcblx0XHRcdFx0XHRkZWZlci5yZXNvbHZlV2l0aCggZWxlbWVudHMsIFsgZWxlbWVudHMgXSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXG5cdFx0aWYgKCB0eXBlb2YgdHlwZSAhPT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdG9iaiA9IHR5cGU7XG5cdFx0XHR0eXBlID0gdW5kZWZpbmVkO1xuXHRcdH1cblx0XHR0eXBlID0gdHlwZSB8fCBcImZ4XCI7XG5cblx0XHR3aGlsZSAoIGktLSApIHtcblx0XHRcdHRtcCA9IGRhdGFQcml2LmdldCggZWxlbWVudHNbIGkgXSwgdHlwZSArIFwicXVldWVIb29rc1wiICk7XG5cdFx0XHRpZiAoIHRtcCAmJiB0bXAuZW1wdHkgKSB7XG5cdFx0XHRcdGNvdW50Kys7XG5cdFx0XHRcdHRtcC5lbXB0eS5hZGQoIHJlc29sdmUgKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmVzb2x2ZSgpO1xuXHRcdHJldHVybiBkZWZlci5wcm9taXNlKCBvYmogKTtcblx0fVxufSApO1xudmFyIHBudW0gPSAoIC9bKy1dPyg/OlxcZCpcXC58KVxcZCsoPzpbZUVdWystXT9cXGQrfCkvICkuc291cmNlO1xuXG52YXIgcmNzc051bSA9IG5ldyBSZWdFeHAoIFwiXig/OihbKy1dKT18KShcIiArIHBudW0gKyBcIikoW2EteiVdKikkXCIsIFwiaVwiICk7XG5cblxudmFyIGNzc0V4cGFuZCA9IFsgXCJUb3BcIiwgXCJSaWdodFwiLCBcIkJvdHRvbVwiLCBcIkxlZnRcIiBdO1xuXG52YXIgaXNIaWRkZW4gPSBmdW5jdGlvbiggZWxlbSwgZWwgKSB7XG5cblx0XHQvLyBpc0hpZGRlbiBtaWdodCBiZSBjYWxsZWQgZnJvbSBqUXVlcnkjZmlsdGVyIGZ1bmN0aW9uO1xuXHRcdC8vIGluIHRoYXQgY2FzZSwgZWxlbWVudCB3aWxsIGJlIHNlY29uZCBhcmd1bWVudFxuXHRcdGVsZW0gPSBlbCB8fCBlbGVtO1xuXHRcdHJldHVybiBqUXVlcnkuY3NzKCBlbGVtLCBcImRpc3BsYXlcIiApID09PSBcIm5vbmVcIiB8fFxuXHRcdFx0IWpRdWVyeS5jb250YWlucyggZWxlbS5vd25lckRvY3VtZW50LCBlbGVtICk7XG5cdH07XG5cblxuXG5mdW5jdGlvbiBhZGp1c3RDU1MoIGVsZW0sIHByb3AsIHZhbHVlUGFydHMsIHR3ZWVuICkge1xuXHR2YXIgYWRqdXN0ZWQsXG5cdFx0c2NhbGUgPSAxLFxuXHRcdG1heEl0ZXJhdGlvbnMgPSAyMCxcblx0XHRjdXJyZW50VmFsdWUgPSB0d2VlbiA/XG5cdFx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIHR3ZWVuLmN1cigpOyB9IDpcblx0XHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4galF1ZXJ5LmNzcyggZWxlbSwgcHJvcCwgXCJcIiApOyB9LFxuXHRcdGluaXRpYWwgPSBjdXJyZW50VmFsdWUoKSxcblx0XHR1bml0ID0gdmFsdWVQYXJ0cyAmJiB2YWx1ZVBhcnRzWyAzIF0gfHwgKCBqUXVlcnkuY3NzTnVtYmVyWyBwcm9wIF0gPyBcIlwiIDogXCJweFwiICksXG5cblx0XHQvLyBTdGFydGluZyB2YWx1ZSBjb21wdXRhdGlvbiBpcyByZXF1aXJlZCBmb3IgcG90ZW50aWFsIHVuaXQgbWlzbWF0Y2hlc1xuXHRcdGluaXRpYWxJblVuaXQgPSAoIGpRdWVyeS5jc3NOdW1iZXJbIHByb3AgXSB8fCB1bml0ICE9PSBcInB4XCIgJiYgK2luaXRpYWwgKSAmJlxuXHRcdFx0cmNzc051bS5leGVjKCBqUXVlcnkuY3NzKCBlbGVtLCBwcm9wICkgKTtcblxuXHRpZiAoIGluaXRpYWxJblVuaXQgJiYgaW5pdGlhbEluVW5pdFsgMyBdICE9PSB1bml0ICkge1xuXG5cdFx0Ly8gVHJ1c3QgdW5pdHMgcmVwb3J0ZWQgYnkgalF1ZXJ5LmNzc1xuXHRcdHVuaXQgPSB1bml0IHx8IGluaXRpYWxJblVuaXRbIDMgXTtcblxuXHRcdC8vIE1ha2Ugc3VyZSB3ZSB1cGRhdGUgdGhlIHR3ZWVuIHByb3BlcnRpZXMgbGF0ZXIgb25cblx0XHR2YWx1ZVBhcnRzID0gdmFsdWVQYXJ0cyB8fCBbXTtcblxuXHRcdC8vIEl0ZXJhdGl2ZWx5IGFwcHJveGltYXRlIGZyb20gYSBub256ZXJvIHN0YXJ0aW5nIHBvaW50XG5cdFx0aW5pdGlhbEluVW5pdCA9ICtpbml0aWFsIHx8IDE7XG5cblx0XHRkbyB7XG5cblx0XHRcdC8vIElmIHByZXZpb3VzIGl0ZXJhdGlvbiB6ZXJvZWQgb3V0LCBkb3VibGUgdW50aWwgd2UgZ2V0ICpzb21ldGhpbmcqLlxuXHRcdFx0Ly8gVXNlIHN0cmluZyBmb3IgZG91Ymxpbmcgc28gd2UgZG9uJ3QgYWNjaWRlbnRhbGx5IHNlZSBzY2FsZSBhcyB1bmNoYW5nZWQgYmVsb3dcblx0XHRcdHNjYWxlID0gc2NhbGUgfHwgXCIuNVwiO1xuXG5cdFx0XHQvLyBBZGp1c3QgYW5kIGFwcGx5XG5cdFx0XHRpbml0aWFsSW5Vbml0ID0gaW5pdGlhbEluVW5pdCAvIHNjYWxlO1xuXHRcdFx0alF1ZXJ5LnN0eWxlKCBlbGVtLCBwcm9wLCBpbml0aWFsSW5Vbml0ICsgdW5pdCApO1xuXG5cdFx0Ly8gVXBkYXRlIHNjYWxlLCB0b2xlcmF0aW5nIHplcm8gb3IgTmFOIGZyb20gdHdlZW4uY3VyKClcblx0XHQvLyBCcmVhayB0aGUgbG9vcCBpZiBzY2FsZSBpcyB1bmNoYW5nZWQgb3IgcGVyZmVjdCwgb3IgaWYgd2UndmUganVzdCBoYWQgZW5vdWdoLlxuXHRcdH0gd2hpbGUgKFxuXHRcdFx0c2NhbGUgIT09ICggc2NhbGUgPSBjdXJyZW50VmFsdWUoKSAvIGluaXRpYWwgKSAmJiBzY2FsZSAhPT0gMSAmJiAtLW1heEl0ZXJhdGlvbnNcblx0XHQpO1xuXHR9XG5cblx0aWYgKCB2YWx1ZVBhcnRzICkge1xuXHRcdGluaXRpYWxJblVuaXQgPSAraW5pdGlhbEluVW5pdCB8fCAraW5pdGlhbCB8fCAwO1xuXG5cdFx0Ly8gQXBwbHkgcmVsYXRpdmUgb2Zmc2V0ICgrPS8tPSkgaWYgc3BlY2lmaWVkXG5cdFx0YWRqdXN0ZWQgPSB2YWx1ZVBhcnRzWyAxIF0gP1xuXHRcdFx0aW5pdGlhbEluVW5pdCArICggdmFsdWVQYXJ0c1sgMSBdICsgMSApICogdmFsdWVQYXJ0c1sgMiBdIDpcblx0XHRcdCt2YWx1ZVBhcnRzWyAyIF07XG5cdFx0aWYgKCB0d2VlbiApIHtcblx0XHRcdHR3ZWVuLnVuaXQgPSB1bml0O1xuXHRcdFx0dHdlZW4uc3RhcnQgPSBpbml0aWFsSW5Vbml0O1xuXHRcdFx0dHdlZW4uZW5kID0gYWRqdXN0ZWQ7XG5cdFx0fVxuXHR9XG5cdHJldHVybiBhZGp1c3RlZDtcbn1cbnZhciByY2hlY2thYmxlVHlwZSA9ICggL14oPzpjaGVja2JveHxyYWRpbykkL2kgKTtcblxudmFyIHJ0YWdOYW1lID0gKCAvPChbXFx3Oi1dKykvICk7XG5cbnZhciByc2NyaXB0VHlwZSA9ICggL14kfFxcLyg/OmphdmF8ZWNtYSlzY3JpcHQvaSApO1xuXG5cblxuLy8gV2UgaGF2ZSB0byBjbG9zZSB0aGVzZSB0YWdzIHRvIHN1cHBvcnQgWEhUTUwgKCMxMzIwMClcbnZhciB3cmFwTWFwID0ge1xuXG5cdC8vIFN1cHBvcnQ6IElFOVxuXHRvcHRpb246IFsgMSwgXCI8c2VsZWN0IG11bHRpcGxlPSdtdWx0aXBsZSc+XCIsIFwiPC9zZWxlY3Q+XCIgXSxcblxuXHQvLyBYSFRNTCBwYXJzZXJzIGRvIG5vdCBtYWdpY2FsbHkgaW5zZXJ0IGVsZW1lbnRzIGluIHRoZVxuXHQvLyBzYW1lIHdheSB0aGF0IHRhZyBzb3VwIHBhcnNlcnMgZG8uIFNvIHdlIGNhbm5vdCBzaG9ydGVuXG5cdC8vIHRoaXMgYnkgb21pdHRpbmcgPHRib2R5PiBvciBvdGhlciByZXF1aXJlZCBlbGVtZW50cy5cblx0dGhlYWQ6IFsgMSwgXCI8dGFibGU+XCIsIFwiPC90YWJsZT5cIiBdLFxuXHRjb2w6IFsgMiwgXCI8dGFibGU+PGNvbGdyb3VwPlwiLCBcIjwvY29sZ3JvdXA+PC90YWJsZT5cIiBdLFxuXHR0cjogWyAyLCBcIjx0YWJsZT48dGJvZHk+XCIsIFwiPC90Ym9keT48L3RhYmxlPlwiIF0sXG5cdHRkOiBbIDMsIFwiPHRhYmxlPjx0Ym9keT48dHI+XCIsIFwiPC90cj48L3Rib2R5PjwvdGFibGU+XCIgXSxcblxuXHRfZGVmYXVsdDogWyAwLCBcIlwiLCBcIlwiIF1cbn07XG5cbi8vIFN1cHBvcnQ6IElFOVxud3JhcE1hcC5vcHRncm91cCA9IHdyYXBNYXAub3B0aW9uO1xuXG53cmFwTWFwLnRib2R5ID0gd3JhcE1hcC50Zm9vdCA9IHdyYXBNYXAuY29sZ3JvdXAgPSB3cmFwTWFwLmNhcHRpb24gPSB3cmFwTWFwLnRoZWFkO1xud3JhcE1hcC50aCA9IHdyYXBNYXAudGQ7XG5cblxuZnVuY3Rpb24gZ2V0QWxsKCBjb250ZXh0LCB0YWcgKSB7XG5cblx0Ly8gU3VwcG9ydDogSUU5LTExK1xuXHQvLyBVc2UgdHlwZW9mIHRvIGF2b2lkIHplcm8tYXJndW1lbnQgbWV0aG9kIGludm9jYXRpb24gb24gaG9zdCBvYmplY3RzICgjMTUxNTEpXG5cdHZhciByZXQgPSB0eXBlb2YgY29udGV4dC5nZXRFbGVtZW50c0J5VGFnTmFtZSAhPT0gXCJ1bmRlZmluZWRcIiA/XG5cdFx0XHRjb250ZXh0LmdldEVsZW1lbnRzQnlUYWdOYW1lKCB0YWcgfHwgXCIqXCIgKSA6XG5cdFx0XHR0eXBlb2YgY29udGV4dC5xdWVyeVNlbGVjdG9yQWxsICE9PSBcInVuZGVmaW5lZFwiID9cblx0XHRcdFx0Y29udGV4dC5xdWVyeVNlbGVjdG9yQWxsKCB0YWcgfHwgXCIqXCIgKSA6XG5cdFx0XHRbXTtcblxuXHRyZXR1cm4gdGFnID09PSB1bmRlZmluZWQgfHwgdGFnICYmIGpRdWVyeS5ub2RlTmFtZSggY29udGV4dCwgdGFnICkgP1xuXHRcdGpRdWVyeS5tZXJnZSggWyBjb250ZXh0IF0sIHJldCApIDpcblx0XHRyZXQ7XG59XG5cblxuLy8gTWFyayBzY3JpcHRzIGFzIGhhdmluZyBhbHJlYWR5IGJlZW4gZXZhbHVhdGVkXG5mdW5jdGlvbiBzZXRHbG9iYWxFdmFsKCBlbGVtcywgcmVmRWxlbWVudHMgKSB7XG5cdHZhciBpID0gMCxcblx0XHRsID0gZWxlbXMubGVuZ3RoO1xuXG5cdGZvciAoIDsgaSA8IGw7IGkrKyApIHtcblx0XHRkYXRhUHJpdi5zZXQoXG5cdFx0XHRlbGVtc1sgaSBdLFxuXHRcdFx0XCJnbG9iYWxFdmFsXCIsXG5cdFx0XHQhcmVmRWxlbWVudHMgfHwgZGF0YVByaXYuZ2V0KCByZWZFbGVtZW50c1sgaSBdLCBcImdsb2JhbEV2YWxcIiApXG5cdFx0KTtcblx0fVxufVxuXG5cbnZhciByaHRtbCA9IC88fCYjP1xcdys7LztcblxuZnVuY3Rpb24gYnVpbGRGcmFnbWVudCggZWxlbXMsIGNvbnRleHQsIHNjcmlwdHMsIHNlbGVjdGlvbiwgaWdub3JlZCApIHtcblx0dmFyIGVsZW0sIHRtcCwgdGFnLCB3cmFwLCBjb250YWlucywgaixcblx0XHRmcmFnbWVudCA9IGNvbnRleHQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpLFxuXHRcdG5vZGVzID0gW10sXG5cdFx0aSA9IDAsXG5cdFx0bCA9IGVsZW1zLmxlbmd0aDtcblxuXHRmb3IgKCA7IGkgPCBsOyBpKysgKSB7XG5cdFx0ZWxlbSA9IGVsZW1zWyBpIF07XG5cblx0XHRpZiAoIGVsZW0gfHwgZWxlbSA9PT0gMCApIHtcblxuXHRcdFx0Ly8gQWRkIG5vZGVzIGRpcmVjdGx5XG5cdFx0XHRpZiAoIGpRdWVyeS50eXBlKCBlbGVtICkgPT09IFwib2JqZWN0XCIgKSB7XG5cblx0XHRcdFx0Ly8gU3VwcG9ydDogQW5kcm9pZDw0LjEsIFBoYW50b21KUzwyXG5cdFx0XHRcdC8vIHB1c2guYXBwbHkoXywgYXJyYXlsaWtlKSB0aHJvd3Mgb24gYW5jaWVudCBXZWJLaXRcblx0XHRcdFx0alF1ZXJ5Lm1lcmdlKCBub2RlcywgZWxlbS5ub2RlVHlwZSA/IFsgZWxlbSBdIDogZWxlbSApO1xuXG5cdFx0XHQvLyBDb252ZXJ0IG5vbi1odG1sIGludG8gYSB0ZXh0IG5vZGVcblx0XHRcdH0gZWxzZSBpZiAoICFyaHRtbC50ZXN0KCBlbGVtICkgKSB7XG5cdFx0XHRcdG5vZGVzLnB1c2goIGNvbnRleHQuY3JlYXRlVGV4dE5vZGUoIGVsZW0gKSApO1xuXG5cdFx0XHQvLyBDb252ZXJ0IGh0bWwgaW50byBET00gbm9kZXNcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRtcCA9IHRtcCB8fCBmcmFnbWVudC5hcHBlbmRDaGlsZCggY29udGV4dC5jcmVhdGVFbGVtZW50KCBcImRpdlwiICkgKTtcblxuXHRcdFx0XHQvLyBEZXNlcmlhbGl6ZSBhIHN0YW5kYXJkIHJlcHJlc2VudGF0aW9uXG5cdFx0XHRcdHRhZyA9ICggcnRhZ05hbWUuZXhlYyggZWxlbSApIHx8IFsgXCJcIiwgXCJcIiBdIClbIDEgXS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHR3cmFwID0gd3JhcE1hcFsgdGFnIF0gfHwgd3JhcE1hcC5fZGVmYXVsdDtcblx0XHRcdFx0dG1wLmlubmVySFRNTCA9IHdyYXBbIDEgXSArIGpRdWVyeS5odG1sUHJlZmlsdGVyKCBlbGVtICkgKyB3cmFwWyAyIF07XG5cblx0XHRcdFx0Ly8gRGVzY2VuZCB0aHJvdWdoIHdyYXBwZXJzIHRvIHRoZSByaWdodCBjb250ZW50XG5cdFx0XHRcdGogPSB3cmFwWyAwIF07XG5cdFx0XHRcdHdoaWxlICggai0tICkge1xuXHRcdFx0XHRcdHRtcCA9IHRtcC5sYXN0Q2hpbGQ7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBTdXBwb3J0OiBBbmRyb2lkPDQuMSwgUGhhbnRvbUpTPDJcblx0XHRcdFx0Ly8gcHVzaC5hcHBseShfLCBhcnJheWxpa2UpIHRocm93cyBvbiBhbmNpZW50IFdlYktpdFxuXHRcdFx0XHRqUXVlcnkubWVyZ2UoIG5vZGVzLCB0bXAuY2hpbGROb2RlcyApO1xuXG5cdFx0XHRcdC8vIFJlbWVtYmVyIHRoZSB0b3AtbGV2ZWwgY29udGFpbmVyXG5cdFx0XHRcdHRtcCA9IGZyYWdtZW50LmZpcnN0Q2hpbGQ7XG5cblx0XHRcdFx0Ly8gRW5zdXJlIHRoZSBjcmVhdGVkIG5vZGVzIGFyZSBvcnBoYW5lZCAoIzEyMzkyKVxuXHRcdFx0XHR0bXAudGV4dENvbnRlbnQgPSBcIlwiO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8vIFJlbW92ZSB3cmFwcGVyIGZyb20gZnJhZ21lbnRcblx0ZnJhZ21lbnQudGV4dENvbnRlbnQgPSBcIlwiO1xuXG5cdGkgPSAwO1xuXHR3aGlsZSAoICggZWxlbSA9IG5vZGVzWyBpKysgXSApICkge1xuXG5cdFx0Ly8gU2tpcCBlbGVtZW50cyBhbHJlYWR5IGluIHRoZSBjb250ZXh0IGNvbGxlY3Rpb24gKHRyYWMtNDA4Nylcblx0XHRpZiAoIHNlbGVjdGlvbiAmJiBqUXVlcnkuaW5BcnJheSggZWxlbSwgc2VsZWN0aW9uICkgPiAtMSApIHtcblx0XHRcdGlmICggaWdub3JlZCApIHtcblx0XHRcdFx0aWdub3JlZC5wdXNoKCBlbGVtICk7XG5cdFx0XHR9XG5cdFx0XHRjb250aW51ZTtcblx0XHR9XG5cblx0XHRjb250YWlucyA9IGpRdWVyeS5jb250YWlucyggZWxlbS5vd25lckRvY3VtZW50LCBlbGVtICk7XG5cblx0XHQvLyBBcHBlbmQgdG8gZnJhZ21lbnRcblx0XHR0bXAgPSBnZXRBbGwoIGZyYWdtZW50LmFwcGVuZENoaWxkKCBlbGVtICksIFwic2NyaXB0XCIgKTtcblxuXHRcdC8vIFByZXNlcnZlIHNjcmlwdCBldmFsdWF0aW9uIGhpc3Rvcnlcblx0XHRpZiAoIGNvbnRhaW5zICkge1xuXHRcdFx0c2V0R2xvYmFsRXZhbCggdG1wICk7XG5cdFx0fVxuXG5cdFx0Ly8gQ2FwdHVyZSBleGVjdXRhYmxlc1xuXHRcdGlmICggc2NyaXB0cyApIHtcblx0XHRcdGogPSAwO1xuXHRcdFx0d2hpbGUgKCAoIGVsZW0gPSB0bXBbIGorKyBdICkgKSB7XG5cdFx0XHRcdGlmICggcnNjcmlwdFR5cGUudGVzdCggZWxlbS50eXBlIHx8IFwiXCIgKSApIHtcblx0XHRcdFx0XHRzY3JpcHRzLnB1c2goIGVsZW0gKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiBmcmFnbWVudDtcbn1cblxuXG4oIGZ1bmN0aW9uKCkge1xuXHR2YXIgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCksXG5cdFx0ZGl2ID0gZnJhZ21lbnQuYXBwZW5kQ2hpbGQoIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwiZGl2XCIgKSApLFxuXHRcdGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggXCJpbnB1dFwiICk7XG5cblx0Ly8gU3VwcG9ydDogQW5kcm9pZCA0LjAtNC4zLCBTYWZhcmk8PTUuMVxuXHQvLyBDaGVjayBzdGF0ZSBsb3N0IGlmIHRoZSBuYW1lIGlzIHNldCAoIzExMjE3KVxuXHQvLyBTdXBwb3J0OiBXaW5kb3dzIFdlYiBBcHBzIChXV0EpXG5cdC8vIGBuYW1lYCBhbmQgYHR5cGVgIG11c3QgdXNlIC5zZXRBdHRyaWJ1dGUgZm9yIFdXQSAoIzE0OTAxKVxuXHRpbnB1dC5zZXRBdHRyaWJ1dGUoIFwidHlwZVwiLCBcInJhZGlvXCIgKTtcblx0aW5wdXQuc2V0QXR0cmlidXRlKCBcImNoZWNrZWRcIiwgXCJjaGVja2VkXCIgKTtcblx0aW5wdXQuc2V0QXR0cmlidXRlKCBcIm5hbWVcIiwgXCJ0XCIgKTtcblxuXHRkaXYuYXBwZW5kQ2hpbGQoIGlucHV0ICk7XG5cblx0Ly8gU3VwcG9ydDogU2FmYXJpPD01LjEsIEFuZHJvaWQ8NC4yXG5cdC8vIE9sZGVyIFdlYktpdCBkb2Vzbid0IGNsb25lIGNoZWNrZWQgc3RhdGUgY29ycmVjdGx5IGluIGZyYWdtZW50c1xuXHRzdXBwb3J0LmNoZWNrQ2xvbmUgPSBkaXYuY2xvbmVOb2RlKCB0cnVlICkuY2xvbmVOb2RlKCB0cnVlICkubGFzdENoaWxkLmNoZWNrZWQ7XG5cblx0Ly8gU3VwcG9ydDogSUU8PTExK1xuXHQvLyBNYWtlIHN1cmUgdGV4dGFyZWEgKGFuZCBjaGVja2JveCkgZGVmYXVsdFZhbHVlIGlzIHByb3Blcmx5IGNsb25lZFxuXHRkaXYuaW5uZXJIVE1MID0gXCI8dGV4dGFyZWE+eDwvdGV4dGFyZWE+XCI7XG5cdHN1cHBvcnQubm9DbG9uZUNoZWNrZWQgPSAhIWRpdi5jbG9uZU5vZGUoIHRydWUgKS5sYXN0Q2hpbGQuZGVmYXVsdFZhbHVlO1xufSApKCk7XG5cblxudmFyXG5cdHJrZXlFdmVudCA9IC9ea2V5Lyxcblx0cm1vdXNlRXZlbnQgPSAvXig/Om1vdXNlfHBvaW50ZXJ8Y29udGV4dG1lbnV8ZHJhZ3xkcm9wKXxjbGljay8sXG5cdHJ0eXBlbmFtZXNwYWNlID0gL14oW14uXSopKD86XFwuKC4rKXwpLztcblxuZnVuY3Rpb24gcmV0dXJuVHJ1ZSgpIHtcblx0cmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIHJldHVybkZhbHNlKCkge1xuXHRyZXR1cm4gZmFsc2U7XG59XG5cbi8vIFN1cHBvcnQ6IElFOVxuLy8gU2VlICMxMzM5MyBmb3IgbW9yZSBpbmZvXG5mdW5jdGlvbiBzYWZlQWN0aXZlRWxlbWVudCgpIHtcblx0dHJ5IHtcblx0XHRyZXR1cm4gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcblx0fSBjYXRjaCAoIGVyciApIHsgfVxufVxuXG5mdW5jdGlvbiBvbiggZWxlbSwgdHlwZXMsIHNlbGVjdG9yLCBkYXRhLCBmbiwgb25lICkge1xuXHR2YXIgb3JpZ0ZuLCB0eXBlO1xuXG5cdC8vIFR5cGVzIGNhbiBiZSBhIG1hcCBvZiB0eXBlcy9oYW5kbGVyc1xuXHRpZiAoIHR5cGVvZiB0eXBlcyA9PT0gXCJvYmplY3RcIiApIHtcblxuXHRcdC8vICggdHlwZXMtT2JqZWN0LCBzZWxlY3RvciwgZGF0YSApXG5cdFx0aWYgKCB0eXBlb2Ygc2VsZWN0b3IgIT09IFwic3RyaW5nXCIgKSB7XG5cblx0XHRcdC8vICggdHlwZXMtT2JqZWN0LCBkYXRhIClcblx0XHRcdGRhdGEgPSBkYXRhIHx8IHNlbGVjdG9yO1xuXHRcdFx0c2VsZWN0b3IgPSB1bmRlZmluZWQ7XG5cdFx0fVxuXHRcdGZvciAoIHR5cGUgaW4gdHlwZXMgKSB7XG5cdFx0XHRvbiggZWxlbSwgdHlwZSwgc2VsZWN0b3IsIGRhdGEsIHR5cGVzWyB0eXBlIF0sIG9uZSApO1xuXHRcdH1cblx0XHRyZXR1cm4gZWxlbTtcblx0fVxuXG5cdGlmICggZGF0YSA9PSBudWxsICYmIGZuID09IG51bGwgKSB7XG5cblx0XHQvLyAoIHR5cGVzLCBmbiApXG5cdFx0Zm4gPSBzZWxlY3Rvcjtcblx0XHRkYXRhID0gc2VsZWN0b3IgPSB1bmRlZmluZWQ7XG5cdH0gZWxzZSBpZiAoIGZuID09IG51bGwgKSB7XG5cdFx0aWYgKCB0eXBlb2Ygc2VsZWN0b3IgPT09IFwic3RyaW5nXCIgKSB7XG5cblx0XHRcdC8vICggdHlwZXMsIHNlbGVjdG9yLCBmbiApXG5cdFx0XHRmbiA9IGRhdGE7XG5cdFx0XHRkYXRhID0gdW5kZWZpbmVkO1xuXHRcdH0gZWxzZSB7XG5cblx0XHRcdC8vICggdHlwZXMsIGRhdGEsIGZuIClcblx0XHRcdGZuID0gZGF0YTtcblx0XHRcdGRhdGEgPSBzZWxlY3Rvcjtcblx0XHRcdHNlbGVjdG9yID0gdW5kZWZpbmVkO1xuXHRcdH1cblx0fVxuXHRpZiAoIGZuID09PSBmYWxzZSApIHtcblx0XHRmbiA9IHJldHVybkZhbHNlO1xuXHR9IGVsc2UgaWYgKCAhZm4gKSB7XG5cdFx0cmV0dXJuIGVsZW07XG5cdH1cblxuXHRpZiAoIG9uZSA9PT0gMSApIHtcblx0XHRvcmlnRm4gPSBmbjtcblx0XHRmbiA9IGZ1bmN0aW9uKCBldmVudCApIHtcblxuXHRcdFx0Ly8gQ2FuIHVzZSBhbiBlbXB0eSBzZXQsIHNpbmNlIGV2ZW50IGNvbnRhaW5zIHRoZSBpbmZvXG5cdFx0XHRqUXVlcnkoKS5vZmYoIGV2ZW50ICk7XG5cdFx0XHRyZXR1cm4gb3JpZ0ZuLmFwcGx5KCB0aGlzLCBhcmd1bWVudHMgKTtcblx0XHR9O1xuXG5cdFx0Ly8gVXNlIHNhbWUgZ3VpZCBzbyBjYWxsZXIgY2FuIHJlbW92ZSB1c2luZyBvcmlnRm5cblx0XHRmbi5ndWlkID0gb3JpZ0ZuLmd1aWQgfHwgKCBvcmlnRm4uZ3VpZCA9IGpRdWVyeS5ndWlkKysgKTtcblx0fVxuXHRyZXR1cm4gZWxlbS5lYWNoKCBmdW5jdGlvbigpIHtcblx0XHRqUXVlcnkuZXZlbnQuYWRkKCB0aGlzLCB0eXBlcywgZm4sIGRhdGEsIHNlbGVjdG9yICk7XG5cdH0gKTtcbn1cblxuLypcbiAqIEhlbHBlciBmdW5jdGlvbnMgZm9yIG1hbmFnaW5nIGV2ZW50cyAtLSBub3QgcGFydCBvZiB0aGUgcHVibGljIGludGVyZmFjZS5cbiAqIFByb3BzIHRvIERlYW4gRWR3YXJkcycgYWRkRXZlbnQgbGlicmFyeSBmb3IgbWFueSBvZiB0aGUgaWRlYXMuXG4gKi9cbmpRdWVyeS5ldmVudCA9IHtcblxuXHRnbG9iYWw6IHt9LFxuXG5cdGFkZDogZnVuY3Rpb24oIGVsZW0sIHR5cGVzLCBoYW5kbGVyLCBkYXRhLCBzZWxlY3RvciApIHtcblxuXHRcdHZhciBoYW5kbGVPYmpJbiwgZXZlbnRIYW5kbGUsIHRtcCxcblx0XHRcdGV2ZW50cywgdCwgaGFuZGxlT2JqLFxuXHRcdFx0c3BlY2lhbCwgaGFuZGxlcnMsIHR5cGUsIG5hbWVzcGFjZXMsIG9yaWdUeXBlLFxuXHRcdFx0ZWxlbURhdGEgPSBkYXRhUHJpdi5nZXQoIGVsZW0gKTtcblxuXHRcdC8vIERvbid0IGF0dGFjaCBldmVudHMgdG8gbm9EYXRhIG9yIHRleHQvY29tbWVudCBub2RlcyAoYnV0IGFsbG93IHBsYWluIG9iamVjdHMpXG5cdFx0aWYgKCAhZWxlbURhdGEgKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gQ2FsbGVyIGNhbiBwYXNzIGluIGFuIG9iamVjdCBvZiBjdXN0b20gZGF0YSBpbiBsaWV1IG9mIHRoZSBoYW5kbGVyXG5cdFx0aWYgKCBoYW5kbGVyLmhhbmRsZXIgKSB7XG5cdFx0XHRoYW5kbGVPYmpJbiA9IGhhbmRsZXI7XG5cdFx0XHRoYW5kbGVyID0gaGFuZGxlT2JqSW4uaGFuZGxlcjtcblx0XHRcdHNlbGVjdG9yID0gaGFuZGxlT2JqSW4uc2VsZWN0b3I7XG5cdFx0fVxuXG5cdFx0Ly8gTWFrZSBzdXJlIHRoYXQgdGhlIGhhbmRsZXIgaGFzIGEgdW5pcXVlIElELCB1c2VkIHRvIGZpbmQvcmVtb3ZlIGl0IGxhdGVyXG5cdFx0aWYgKCAhaGFuZGxlci5ndWlkICkge1xuXHRcdFx0aGFuZGxlci5ndWlkID0galF1ZXJ5Lmd1aWQrKztcblx0XHR9XG5cblx0XHQvLyBJbml0IHRoZSBlbGVtZW50J3MgZXZlbnQgc3RydWN0dXJlIGFuZCBtYWluIGhhbmRsZXIsIGlmIHRoaXMgaXMgdGhlIGZpcnN0XG5cdFx0aWYgKCAhKCBldmVudHMgPSBlbGVtRGF0YS5ldmVudHMgKSApIHtcblx0XHRcdGV2ZW50cyA9IGVsZW1EYXRhLmV2ZW50cyA9IHt9O1xuXHRcdH1cblx0XHRpZiAoICEoIGV2ZW50SGFuZGxlID0gZWxlbURhdGEuaGFuZGxlICkgKSB7XG5cdFx0XHRldmVudEhhbmRsZSA9IGVsZW1EYXRhLmhhbmRsZSA9IGZ1bmN0aW9uKCBlICkge1xuXG5cdFx0XHRcdC8vIERpc2NhcmQgdGhlIHNlY29uZCBldmVudCBvZiBhIGpRdWVyeS5ldmVudC50cmlnZ2VyKCkgYW5kXG5cdFx0XHRcdC8vIHdoZW4gYW4gZXZlbnQgaXMgY2FsbGVkIGFmdGVyIGEgcGFnZSBoYXMgdW5sb2FkZWRcblx0XHRcdFx0cmV0dXJuIHR5cGVvZiBqUXVlcnkgIT09IFwidW5kZWZpbmVkXCIgJiYgalF1ZXJ5LmV2ZW50LnRyaWdnZXJlZCAhPT0gZS50eXBlID9cblx0XHRcdFx0XHRqUXVlcnkuZXZlbnQuZGlzcGF0Y2guYXBwbHkoIGVsZW0sIGFyZ3VtZW50cyApIDogdW5kZWZpbmVkO1xuXHRcdFx0fTtcblx0XHR9XG5cblx0XHQvLyBIYW5kbGUgbXVsdGlwbGUgZXZlbnRzIHNlcGFyYXRlZCBieSBhIHNwYWNlXG5cdFx0dHlwZXMgPSAoIHR5cGVzIHx8IFwiXCIgKS5tYXRjaCggcm5vdHdoaXRlICkgfHwgWyBcIlwiIF07XG5cdFx0dCA9IHR5cGVzLmxlbmd0aDtcblx0XHR3aGlsZSAoIHQtLSApIHtcblx0XHRcdHRtcCA9IHJ0eXBlbmFtZXNwYWNlLmV4ZWMoIHR5cGVzWyB0IF0gKSB8fCBbXTtcblx0XHRcdHR5cGUgPSBvcmlnVHlwZSA9IHRtcFsgMSBdO1xuXHRcdFx0bmFtZXNwYWNlcyA9ICggdG1wWyAyIF0gfHwgXCJcIiApLnNwbGl0KCBcIi5cIiApLnNvcnQoKTtcblxuXHRcdFx0Ly8gVGhlcmUgKm11c3QqIGJlIGEgdHlwZSwgbm8gYXR0YWNoaW5nIG5hbWVzcGFjZS1vbmx5IGhhbmRsZXJzXG5cdFx0XHRpZiAoICF0eXBlICkge1xuXHRcdFx0XHRjb250aW51ZTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gSWYgZXZlbnQgY2hhbmdlcyBpdHMgdHlwZSwgdXNlIHRoZSBzcGVjaWFsIGV2ZW50IGhhbmRsZXJzIGZvciB0aGUgY2hhbmdlZCB0eXBlXG5cdFx0XHRzcGVjaWFsID0galF1ZXJ5LmV2ZW50LnNwZWNpYWxbIHR5cGUgXSB8fCB7fTtcblxuXHRcdFx0Ly8gSWYgc2VsZWN0b3IgZGVmaW5lZCwgZGV0ZXJtaW5lIHNwZWNpYWwgZXZlbnQgYXBpIHR5cGUsIG90aGVyd2lzZSBnaXZlbiB0eXBlXG5cdFx0XHR0eXBlID0gKCBzZWxlY3RvciA/IHNwZWNpYWwuZGVsZWdhdGVUeXBlIDogc3BlY2lhbC5iaW5kVHlwZSApIHx8IHR5cGU7XG5cblx0XHRcdC8vIFVwZGF0ZSBzcGVjaWFsIGJhc2VkIG9uIG5ld2x5IHJlc2V0IHR5cGVcblx0XHRcdHNwZWNpYWwgPSBqUXVlcnkuZXZlbnQuc3BlY2lhbFsgdHlwZSBdIHx8IHt9O1xuXG5cdFx0XHQvLyBoYW5kbGVPYmogaXMgcGFzc2VkIHRvIGFsbCBldmVudCBoYW5kbGVyc1xuXHRcdFx0aGFuZGxlT2JqID0galF1ZXJ5LmV4dGVuZCgge1xuXHRcdFx0XHR0eXBlOiB0eXBlLFxuXHRcdFx0XHRvcmlnVHlwZTogb3JpZ1R5cGUsXG5cdFx0XHRcdGRhdGE6IGRhdGEsXG5cdFx0XHRcdGhhbmRsZXI6IGhhbmRsZXIsXG5cdFx0XHRcdGd1aWQ6IGhhbmRsZXIuZ3VpZCxcblx0XHRcdFx0c2VsZWN0b3I6IHNlbGVjdG9yLFxuXHRcdFx0XHRuZWVkc0NvbnRleHQ6IHNlbGVjdG9yICYmIGpRdWVyeS5leHByLm1hdGNoLm5lZWRzQ29udGV4dC50ZXN0KCBzZWxlY3RvciApLFxuXHRcdFx0XHRuYW1lc3BhY2U6IG5hbWVzcGFjZXMuam9pbiggXCIuXCIgKVxuXHRcdFx0fSwgaGFuZGxlT2JqSW4gKTtcblxuXHRcdFx0Ly8gSW5pdCB0aGUgZXZlbnQgaGFuZGxlciBxdWV1ZSBpZiB3ZSdyZSB0aGUgZmlyc3Rcblx0XHRcdGlmICggISggaGFuZGxlcnMgPSBldmVudHNbIHR5cGUgXSApICkge1xuXHRcdFx0XHRoYW5kbGVycyA9IGV2ZW50c1sgdHlwZSBdID0gW107XG5cdFx0XHRcdGhhbmRsZXJzLmRlbGVnYXRlQ291bnQgPSAwO1xuXG5cdFx0XHRcdC8vIE9ubHkgdXNlIGFkZEV2ZW50TGlzdGVuZXIgaWYgdGhlIHNwZWNpYWwgZXZlbnRzIGhhbmRsZXIgcmV0dXJucyBmYWxzZVxuXHRcdFx0XHRpZiAoICFzcGVjaWFsLnNldHVwIHx8XG5cdFx0XHRcdFx0c3BlY2lhbC5zZXR1cC5jYWxsKCBlbGVtLCBkYXRhLCBuYW1lc3BhY2VzLCBldmVudEhhbmRsZSApID09PSBmYWxzZSApIHtcblxuXHRcdFx0XHRcdGlmICggZWxlbS5hZGRFdmVudExpc3RlbmVyICkge1xuXHRcdFx0XHRcdFx0ZWxlbS5hZGRFdmVudExpc3RlbmVyKCB0eXBlLCBldmVudEhhbmRsZSApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIHNwZWNpYWwuYWRkICkge1xuXHRcdFx0XHRzcGVjaWFsLmFkZC5jYWxsKCBlbGVtLCBoYW5kbGVPYmogKTtcblxuXHRcdFx0XHRpZiAoICFoYW5kbGVPYmouaGFuZGxlci5ndWlkICkge1xuXHRcdFx0XHRcdGhhbmRsZU9iai5oYW5kbGVyLmd1aWQgPSBoYW5kbGVyLmd1aWQ7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gQWRkIHRvIHRoZSBlbGVtZW50J3MgaGFuZGxlciBsaXN0LCBkZWxlZ2F0ZXMgaW4gZnJvbnRcblx0XHRcdGlmICggc2VsZWN0b3IgKSB7XG5cdFx0XHRcdGhhbmRsZXJzLnNwbGljZSggaGFuZGxlcnMuZGVsZWdhdGVDb3VudCsrLCAwLCBoYW5kbGVPYmogKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGhhbmRsZXJzLnB1c2goIGhhbmRsZU9iaiApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBLZWVwIHRyYWNrIG9mIHdoaWNoIGV2ZW50cyBoYXZlIGV2ZXIgYmVlbiB1c2VkLCBmb3IgZXZlbnQgb3B0aW1pemF0aW9uXG5cdFx0XHRqUXVlcnkuZXZlbnQuZ2xvYmFsWyB0eXBlIF0gPSB0cnVlO1xuXHRcdH1cblxuXHR9LFxuXG5cdC8vIERldGFjaCBhbiBldmVudCBvciBzZXQgb2YgZXZlbnRzIGZyb20gYW4gZWxlbWVudFxuXHRyZW1vdmU6IGZ1bmN0aW9uKCBlbGVtLCB0eXBlcywgaGFuZGxlciwgc2VsZWN0b3IsIG1hcHBlZFR5cGVzICkge1xuXG5cdFx0dmFyIGosIG9yaWdDb3VudCwgdG1wLFxuXHRcdFx0ZXZlbnRzLCB0LCBoYW5kbGVPYmosXG5cdFx0XHRzcGVjaWFsLCBoYW5kbGVycywgdHlwZSwgbmFtZXNwYWNlcywgb3JpZ1R5cGUsXG5cdFx0XHRlbGVtRGF0YSA9IGRhdGFQcml2Lmhhc0RhdGEoIGVsZW0gKSAmJiBkYXRhUHJpdi5nZXQoIGVsZW0gKTtcblxuXHRcdGlmICggIWVsZW1EYXRhIHx8ICEoIGV2ZW50cyA9IGVsZW1EYXRhLmV2ZW50cyApICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIE9uY2UgZm9yIGVhY2ggdHlwZS5uYW1lc3BhY2UgaW4gdHlwZXM7IHR5cGUgbWF5IGJlIG9taXR0ZWRcblx0XHR0eXBlcyA9ICggdHlwZXMgfHwgXCJcIiApLm1hdGNoKCBybm90d2hpdGUgKSB8fCBbIFwiXCIgXTtcblx0XHR0ID0gdHlwZXMubGVuZ3RoO1xuXHRcdHdoaWxlICggdC0tICkge1xuXHRcdFx0dG1wID0gcnR5cGVuYW1lc3BhY2UuZXhlYyggdHlwZXNbIHQgXSApIHx8IFtdO1xuXHRcdFx0dHlwZSA9IG9yaWdUeXBlID0gdG1wWyAxIF07XG5cdFx0XHRuYW1lc3BhY2VzID0gKCB0bXBbIDIgXSB8fCBcIlwiICkuc3BsaXQoIFwiLlwiICkuc29ydCgpO1xuXG5cdFx0XHQvLyBVbmJpbmQgYWxsIGV2ZW50cyAob24gdGhpcyBuYW1lc3BhY2UsIGlmIHByb3ZpZGVkKSBmb3IgdGhlIGVsZW1lbnRcblx0XHRcdGlmICggIXR5cGUgKSB7XG5cdFx0XHRcdGZvciAoIHR5cGUgaW4gZXZlbnRzICkge1xuXHRcdFx0XHRcdGpRdWVyeS5ldmVudC5yZW1vdmUoIGVsZW0sIHR5cGUgKyB0eXBlc1sgdCBdLCBoYW5kbGVyLCBzZWxlY3RvciwgdHJ1ZSApO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0fVxuXG5cdFx0XHRzcGVjaWFsID0galF1ZXJ5LmV2ZW50LnNwZWNpYWxbIHR5cGUgXSB8fCB7fTtcblx0XHRcdHR5cGUgPSAoIHNlbGVjdG9yID8gc3BlY2lhbC5kZWxlZ2F0ZVR5cGUgOiBzcGVjaWFsLmJpbmRUeXBlICkgfHwgdHlwZTtcblx0XHRcdGhhbmRsZXJzID0gZXZlbnRzWyB0eXBlIF0gfHwgW107XG5cdFx0XHR0bXAgPSB0bXBbIDIgXSAmJlxuXHRcdFx0XHRuZXcgUmVnRXhwKCBcIihefFxcXFwuKVwiICsgbmFtZXNwYWNlcy5qb2luKCBcIlxcXFwuKD86LipcXFxcLnwpXCIgKSArIFwiKFxcXFwufCQpXCIgKTtcblxuXHRcdFx0Ly8gUmVtb3ZlIG1hdGNoaW5nIGV2ZW50c1xuXHRcdFx0b3JpZ0NvdW50ID0gaiA9IGhhbmRsZXJzLmxlbmd0aDtcblx0XHRcdHdoaWxlICggai0tICkge1xuXHRcdFx0XHRoYW5kbGVPYmogPSBoYW5kbGVyc1sgaiBdO1xuXG5cdFx0XHRcdGlmICggKCBtYXBwZWRUeXBlcyB8fCBvcmlnVHlwZSA9PT0gaGFuZGxlT2JqLm9yaWdUeXBlICkgJiZcblx0XHRcdFx0XHQoICFoYW5kbGVyIHx8IGhhbmRsZXIuZ3VpZCA9PT0gaGFuZGxlT2JqLmd1aWQgKSAmJlxuXHRcdFx0XHRcdCggIXRtcCB8fCB0bXAudGVzdCggaGFuZGxlT2JqLm5hbWVzcGFjZSApICkgJiZcblx0XHRcdFx0XHQoICFzZWxlY3RvciB8fCBzZWxlY3RvciA9PT0gaGFuZGxlT2JqLnNlbGVjdG9yIHx8XG5cdFx0XHRcdFx0XHRzZWxlY3RvciA9PT0gXCIqKlwiICYmIGhhbmRsZU9iai5zZWxlY3RvciApICkge1xuXHRcdFx0XHRcdGhhbmRsZXJzLnNwbGljZSggaiwgMSApO1xuXG5cdFx0XHRcdFx0aWYgKCBoYW5kbGVPYmouc2VsZWN0b3IgKSB7XG5cdFx0XHRcdFx0XHRoYW5kbGVycy5kZWxlZ2F0ZUNvdW50LS07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmICggc3BlY2lhbC5yZW1vdmUgKSB7XG5cdFx0XHRcdFx0XHRzcGVjaWFsLnJlbW92ZS5jYWxsKCBlbGVtLCBoYW5kbGVPYmogKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gUmVtb3ZlIGdlbmVyaWMgZXZlbnQgaGFuZGxlciBpZiB3ZSByZW1vdmVkIHNvbWV0aGluZyBhbmQgbm8gbW9yZSBoYW5kbGVycyBleGlzdFxuXHRcdFx0Ly8gKGF2b2lkcyBwb3RlbnRpYWwgZm9yIGVuZGxlc3MgcmVjdXJzaW9uIGR1cmluZyByZW1vdmFsIG9mIHNwZWNpYWwgZXZlbnQgaGFuZGxlcnMpXG5cdFx0XHRpZiAoIG9yaWdDb3VudCAmJiAhaGFuZGxlcnMubGVuZ3RoICkge1xuXHRcdFx0XHRpZiAoICFzcGVjaWFsLnRlYXJkb3duIHx8XG5cdFx0XHRcdFx0c3BlY2lhbC50ZWFyZG93bi5jYWxsKCBlbGVtLCBuYW1lc3BhY2VzLCBlbGVtRGF0YS5oYW5kbGUgKSA9PT0gZmFsc2UgKSB7XG5cblx0XHRcdFx0XHRqUXVlcnkucmVtb3ZlRXZlbnQoIGVsZW0sIHR5cGUsIGVsZW1EYXRhLmhhbmRsZSApO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0ZGVsZXRlIGV2ZW50c1sgdHlwZSBdO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIFJlbW92ZSBkYXRhIGFuZCB0aGUgZXhwYW5kbyBpZiBpdCdzIG5vIGxvbmdlciB1c2VkXG5cdFx0aWYgKCBqUXVlcnkuaXNFbXB0eU9iamVjdCggZXZlbnRzICkgKSB7XG5cdFx0XHRkYXRhUHJpdi5yZW1vdmUoIGVsZW0sIFwiaGFuZGxlIGV2ZW50c1wiICk7XG5cdFx0fVxuXHR9LFxuXG5cdGRpc3BhdGNoOiBmdW5jdGlvbiggZXZlbnQgKSB7XG5cblx0XHQvLyBNYWtlIGEgd3JpdGFibGUgalF1ZXJ5LkV2ZW50IGZyb20gdGhlIG5hdGl2ZSBldmVudCBvYmplY3Rcblx0XHRldmVudCA9IGpRdWVyeS5ldmVudC5maXgoIGV2ZW50ICk7XG5cblx0XHR2YXIgaSwgaiwgcmV0LCBtYXRjaGVkLCBoYW5kbGVPYmosXG5cdFx0XHRoYW5kbGVyUXVldWUgPSBbXSxcblx0XHRcdGFyZ3MgPSBzbGljZS5jYWxsKCBhcmd1bWVudHMgKSxcblx0XHRcdGhhbmRsZXJzID0gKCBkYXRhUHJpdi5nZXQoIHRoaXMsIFwiZXZlbnRzXCIgKSB8fCB7fSApWyBldmVudC50eXBlIF0gfHwgW10sXG5cdFx0XHRzcGVjaWFsID0galF1ZXJ5LmV2ZW50LnNwZWNpYWxbIGV2ZW50LnR5cGUgXSB8fCB7fTtcblxuXHRcdC8vIFVzZSB0aGUgZml4LWVkIGpRdWVyeS5FdmVudCByYXRoZXIgdGhhbiB0aGUgKHJlYWQtb25seSkgbmF0aXZlIGV2ZW50XG5cdFx0YXJnc1sgMCBdID0gZXZlbnQ7XG5cdFx0ZXZlbnQuZGVsZWdhdGVUYXJnZXQgPSB0aGlzO1xuXG5cdFx0Ly8gQ2FsbCB0aGUgcHJlRGlzcGF0Y2ggaG9vayBmb3IgdGhlIG1hcHBlZCB0eXBlLCBhbmQgbGV0IGl0IGJhaWwgaWYgZGVzaXJlZFxuXHRcdGlmICggc3BlY2lhbC5wcmVEaXNwYXRjaCAmJiBzcGVjaWFsLnByZURpc3BhdGNoLmNhbGwoIHRoaXMsIGV2ZW50ICkgPT09IGZhbHNlICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIERldGVybWluZSBoYW5kbGVyc1xuXHRcdGhhbmRsZXJRdWV1ZSA9IGpRdWVyeS5ldmVudC5oYW5kbGVycy5jYWxsKCB0aGlzLCBldmVudCwgaGFuZGxlcnMgKTtcblxuXHRcdC8vIFJ1biBkZWxlZ2F0ZXMgZmlyc3Q7IHRoZXkgbWF5IHdhbnQgdG8gc3RvcCBwcm9wYWdhdGlvbiBiZW5lYXRoIHVzXG5cdFx0aSA9IDA7XG5cdFx0d2hpbGUgKCAoIG1hdGNoZWQgPSBoYW5kbGVyUXVldWVbIGkrKyBdICkgJiYgIWV2ZW50LmlzUHJvcGFnYXRpb25TdG9wcGVkKCkgKSB7XG5cdFx0XHRldmVudC5jdXJyZW50VGFyZ2V0ID0gbWF0Y2hlZC5lbGVtO1xuXG5cdFx0XHRqID0gMDtcblx0XHRcdHdoaWxlICggKCBoYW5kbGVPYmogPSBtYXRjaGVkLmhhbmRsZXJzWyBqKysgXSApICYmXG5cdFx0XHRcdCFldmVudC5pc0ltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZCgpICkge1xuXG5cdFx0XHRcdC8vIFRyaWdnZXJlZCBldmVudCBtdXN0IGVpdGhlciAxKSBoYXZlIG5vIG5hbWVzcGFjZSwgb3IgMikgaGF2ZSBuYW1lc3BhY2Uocylcblx0XHRcdFx0Ly8gYSBzdWJzZXQgb3IgZXF1YWwgdG8gdGhvc2UgaW4gdGhlIGJvdW5kIGV2ZW50IChib3RoIGNhbiBoYXZlIG5vIG5hbWVzcGFjZSkuXG5cdFx0XHRcdGlmICggIWV2ZW50LnJuYW1lc3BhY2UgfHwgZXZlbnQucm5hbWVzcGFjZS50ZXN0KCBoYW5kbGVPYmoubmFtZXNwYWNlICkgKSB7XG5cblx0XHRcdFx0XHRldmVudC5oYW5kbGVPYmogPSBoYW5kbGVPYmo7XG5cdFx0XHRcdFx0ZXZlbnQuZGF0YSA9IGhhbmRsZU9iai5kYXRhO1xuXG5cdFx0XHRcdFx0cmV0ID0gKCAoIGpRdWVyeS5ldmVudC5zcGVjaWFsWyBoYW5kbGVPYmoub3JpZ1R5cGUgXSB8fCB7fSApLmhhbmRsZSB8fFxuXHRcdFx0XHRcdFx0aGFuZGxlT2JqLmhhbmRsZXIgKS5hcHBseSggbWF0Y2hlZC5lbGVtLCBhcmdzICk7XG5cblx0XHRcdFx0XHRpZiAoIHJldCAhPT0gdW5kZWZpbmVkICkge1xuXHRcdFx0XHRcdFx0aWYgKCAoIGV2ZW50LnJlc3VsdCA9IHJldCApID09PSBmYWxzZSApIHtcblx0XHRcdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gQ2FsbCB0aGUgcG9zdERpc3BhdGNoIGhvb2sgZm9yIHRoZSBtYXBwZWQgdHlwZVxuXHRcdGlmICggc3BlY2lhbC5wb3N0RGlzcGF0Y2ggKSB7XG5cdFx0XHRzcGVjaWFsLnBvc3REaXNwYXRjaC5jYWxsKCB0aGlzLCBldmVudCApO1xuXHRcdH1cblxuXHRcdHJldHVybiBldmVudC5yZXN1bHQ7XG5cdH0sXG5cblx0aGFuZGxlcnM6IGZ1bmN0aW9uKCBldmVudCwgaGFuZGxlcnMgKSB7XG5cdFx0dmFyIGksIG1hdGNoZXMsIHNlbCwgaGFuZGxlT2JqLFxuXHRcdFx0aGFuZGxlclF1ZXVlID0gW10sXG5cdFx0XHRkZWxlZ2F0ZUNvdW50ID0gaGFuZGxlcnMuZGVsZWdhdGVDb3VudCxcblx0XHRcdGN1ciA9IGV2ZW50LnRhcmdldDtcblxuXHRcdC8vIFN1cHBvcnQgKGF0IGxlYXN0KTogQ2hyb21lLCBJRTlcblx0XHQvLyBGaW5kIGRlbGVnYXRlIGhhbmRsZXJzXG5cdFx0Ly8gQmxhY2staG9sZSBTVkcgPHVzZT4gaW5zdGFuY2UgdHJlZXMgKCMxMzE4MClcblx0XHQvL1xuXHRcdC8vIFN1cHBvcnQ6IEZpcmVmb3g8PTQyK1xuXHRcdC8vIEF2b2lkIG5vbi1sZWZ0LWNsaWNrIGluIEZGIGJ1dCBkb24ndCBibG9jayBJRSByYWRpbyBldmVudHMgKCMzODYxLCBnaC0yMzQzKVxuXHRcdGlmICggZGVsZWdhdGVDb3VudCAmJiBjdXIubm9kZVR5cGUgJiZcblx0XHRcdCggZXZlbnQudHlwZSAhPT0gXCJjbGlja1wiIHx8IGlzTmFOKCBldmVudC5idXR0b24gKSB8fCBldmVudC5idXR0b24gPCAxICkgKSB7XG5cblx0XHRcdGZvciAoIDsgY3VyICE9PSB0aGlzOyBjdXIgPSBjdXIucGFyZW50Tm9kZSB8fCB0aGlzICkge1xuXG5cdFx0XHRcdC8vIERvbid0IGNoZWNrIG5vbi1lbGVtZW50cyAoIzEzMjA4KVxuXHRcdFx0XHQvLyBEb24ndCBwcm9jZXNzIGNsaWNrcyBvbiBkaXNhYmxlZCBlbGVtZW50cyAoIzY5MTEsICM4MTY1LCAjMTEzODIsICMxMTc2NClcblx0XHRcdFx0aWYgKCBjdXIubm9kZVR5cGUgPT09IDEgJiYgKCBjdXIuZGlzYWJsZWQgIT09IHRydWUgfHwgZXZlbnQudHlwZSAhPT0gXCJjbGlja1wiICkgKSB7XG5cdFx0XHRcdFx0bWF0Y2hlcyA9IFtdO1xuXHRcdFx0XHRcdGZvciAoIGkgPSAwOyBpIDwgZGVsZWdhdGVDb3VudDsgaSsrICkge1xuXHRcdFx0XHRcdFx0aGFuZGxlT2JqID0gaGFuZGxlcnNbIGkgXTtcblxuXHRcdFx0XHRcdFx0Ly8gRG9uJ3QgY29uZmxpY3Qgd2l0aCBPYmplY3QucHJvdG90eXBlIHByb3BlcnRpZXMgKCMxMzIwMylcblx0XHRcdFx0XHRcdHNlbCA9IGhhbmRsZU9iai5zZWxlY3RvciArIFwiIFwiO1xuXG5cdFx0XHRcdFx0XHRpZiAoIG1hdGNoZXNbIHNlbCBdID09PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRcdFx0XHRcdG1hdGNoZXNbIHNlbCBdID0gaGFuZGxlT2JqLm5lZWRzQ29udGV4dCA/XG5cdFx0XHRcdFx0XHRcdFx0alF1ZXJ5KCBzZWwsIHRoaXMgKS5pbmRleCggY3VyICkgPiAtMSA6XG5cdFx0XHRcdFx0XHRcdFx0alF1ZXJ5LmZpbmQoIHNlbCwgdGhpcywgbnVsbCwgWyBjdXIgXSApLmxlbmd0aDtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGlmICggbWF0Y2hlc1sgc2VsIF0gKSB7XG5cdFx0XHRcdFx0XHRcdG1hdGNoZXMucHVzaCggaGFuZGxlT2JqICk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmICggbWF0Y2hlcy5sZW5ndGggKSB7XG5cdFx0XHRcdFx0XHRoYW5kbGVyUXVldWUucHVzaCggeyBlbGVtOiBjdXIsIGhhbmRsZXJzOiBtYXRjaGVzIH0gKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBBZGQgdGhlIHJlbWFpbmluZyAoZGlyZWN0bHktYm91bmQpIGhhbmRsZXJzXG5cdFx0aWYgKCBkZWxlZ2F0ZUNvdW50IDwgaGFuZGxlcnMubGVuZ3RoICkge1xuXHRcdFx0aGFuZGxlclF1ZXVlLnB1c2goIHsgZWxlbTogdGhpcywgaGFuZGxlcnM6IGhhbmRsZXJzLnNsaWNlKCBkZWxlZ2F0ZUNvdW50ICkgfSApO1xuXHRcdH1cblxuXHRcdHJldHVybiBoYW5kbGVyUXVldWU7XG5cdH0sXG5cblx0Ly8gSW5jbHVkZXMgc29tZSBldmVudCBwcm9wcyBzaGFyZWQgYnkgS2V5RXZlbnQgYW5kIE1vdXNlRXZlbnRcblx0cHJvcHM6ICggXCJhbHRLZXkgYnViYmxlcyBjYW5jZWxhYmxlIGN0cmxLZXkgY3VycmVudFRhcmdldCBkZXRhaWwgZXZlbnRQaGFzZSBcIiArXG5cdFx0XCJtZXRhS2V5IHJlbGF0ZWRUYXJnZXQgc2hpZnRLZXkgdGFyZ2V0IHRpbWVTdGFtcCB2aWV3IHdoaWNoXCIgKS5zcGxpdCggXCIgXCIgKSxcblxuXHRmaXhIb29rczoge30sXG5cblx0a2V5SG9va3M6IHtcblx0XHRwcm9wczogXCJjaGFyIGNoYXJDb2RlIGtleSBrZXlDb2RlXCIuc3BsaXQoIFwiIFwiICksXG5cdFx0ZmlsdGVyOiBmdW5jdGlvbiggZXZlbnQsIG9yaWdpbmFsICkge1xuXG5cdFx0XHQvLyBBZGQgd2hpY2ggZm9yIGtleSBldmVudHNcblx0XHRcdGlmICggZXZlbnQud2hpY2ggPT0gbnVsbCApIHtcblx0XHRcdFx0ZXZlbnQud2hpY2ggPSBvcmlnaW5hbC5jaGFyQ29kZSAhPSBudWxsID8gb3JpZ2luYWwuY2hhckNvZGUgOiBvcmlnaW5hbC5rZXlDb2RlO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gZXZlbnQ7XG5cdFx0fVxuXHR9LFxuXG5cdG1vdXNlSG9va3M6IHtcblx0XHRwcm9wczogKCBcImJ1dHRvbiBidXR0b25zIGNsaWVudFggY2xpZW50WSBvZmZzZXRYIG9mZnNldFkgcGFnZVggcGFnZVkgXCIgK1xuXHRcdFx0XCJzY3JlZW5YIHNjcmVlblkgdG9FbGVtZW50XCIgKS5zcGxpdCggXCIgXCIgKSxcblx0XHRmaWx0ZXI6IGZ1bmN0aW9uKCBldmVudCwgb3JpZ2luYWwgKSB7XG5cdFx0XHR2YXIgZXZlbnREb2MsIGRvYywgYm9keSxcblx0XHRcdFx0YnV0dG9uID0gb3JpZ2luYWwuYnV0dG9uO1xuXG5cdFx0XHQvLyBDYWxjdWxhdGUgcGFnZVgvWSBpZiBtaXNzaW5nIGFuZCBjbGllbnRYL1kgYXZhaWxhYmxlXG5cdFx0XHRpZiAoIGV2ZW50LnBhZ2VYID09IG51bGwgJiYgb3JpZ2luYWwuY2xpZW50WCAhPSBudWxsICkge1xuXHRcdFx0XHRldmVudERvYyA9IGV2ZW50LnRhcmdldC5vd25lckRvY3VtZW50IHx8IGRvY3VtZW50O1xuXHRcdFx0XHRkb2MgPSBldmVudERvYy5kb2N1bWVudEVsZW1lbnQ7XG5cdFx0XHRcdGJvZHkgPSBldmVudERvYy5ib2R5O1xuXG5cdFx0XHRcdGV2ZW50LnBhZ2VYID0gb3JpZ2luYWwuY2xpZW50WCArXG5cdFx0XHRcdFx0KCBkb2MgJiYgZG9jLnNjcm9sbExlZnQgfHwgYm9keSAmJiBib2R5LnNjcm9sbExlZnQgfHwgMCApIC1cblx0XHRcdFx0XHQoIGRvYyAmJiBkb2MuY2xpZW50TGVmdCB8fCBib2R5ICYmIGJvZHkuY2xpZW50TGVmdCB8fCAwICk7XG5cdFx0XHRcdGV2ZW50LnBhZ2VZID0gb3JpZ2luYWwuY2xpZW50WSArXG5cdFx0XHRcdFx0KCBkb2MgJiYgZG9jLnNjcm9sbFRvcCAgfHwgYm9keSAmJiBib2R5LnNjcm9sbFRvcCAgfHwgMCApIC1cblx0XHRcdFx0XHQoIGRvYyAmJiBkb2MuY2xpZW50VG9wICB8fCBib2R5ICYmIGJvZHkuY2xpZW50VG9wICB8fCAwICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIEFkZCB3aGljaCBmb3IgY2xpY2s6IDEgPT09IGxlZnQ7IDIgPT09IG1pZGRsZTsgMyA9PT0gcmlnaHRcblx0XHRcdC8vIE5vdGU6IGJ1dHRvbiBpcyBub3Qgbm9ybWFsaXplZCwgc28gZG9uJ3QgdXNlIGl0XG5cdFx0XHRpZiAoICFldmVudC53aGljaCAmJiBidXR0b24gIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdFx0ZXZlbnQud2hpY2ggPSAoIGJ1dHRvbiAmIDEgPyAxIDogKCBidXR0b24gJiAyID8gMyA6ICggYnV0dG9uICYgNCA/IDIgOiAwICkgKSApO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gZXZlbnQ7XG5cdFx0fVxuXHR9LFxuXG5cdGZpeDogZnVuY3Rpb24oIGV2ZW50ICkge1xuXHRcdGlmICggZXZlbnRbIGpRdWVyeS5leHBhbmRvIF0gKSB7XG5cdFx0XHRyZXR1cm4gZXZlbnQ7XG5cdFx0fVxuXG5cdFx0Ly8gQ3JlYXRlIGEgd3JpdGFibGUgY29weSBvZiB0aGUgZXZlbnQgb2JqZWN0IGFuZCBub3JtYWxpemUgc29tZSBwcm9wZXJ0aWVzXG5cdFx0dmFyIGksIHByb3AsIGNvcHksXG5cdFx0XHR0eXBlID0gZXZlbnQudHlwZSxcblx0XHRcdG9yaWdpbmFsRXZlbnQgPSBldmVudCxcblx0XHRcdGZpeEhvb2sgPSB0aGlzLmZpeEhvb2tzWyB0eXBlIF07XG5cblx0XHRpZiAoICFmaXhIb29rICkge1xuXHRcdFx0dGhpcy5maXhIb29rc1sgdHlwZSBdID0gZml4SG9vayA9XG5cdFx0XHRcdHJtb3VzZUV2ZW50LnRlc3QoIHR5cGUgKSA/IHRoaXMubW91c2VIb29rcyA6XG5cdFx0XHRcdHJrZXlFdmVudC50ZXN0KCB0eXBlICkgPyB0aGlzLmtleUhvb2tzIDpcblx0XHRcdFx0e307XG5cdFx0fVxuXHRcdGNvcHkgPSBmaXhIb29rLnByb3BzID8gdGhpcy5wcm9wcy5jb25jYXQoIGZpeEhvb2sucHJvcHMgKSA6IHRoaXMucHJvcHM7XG5cblx0XHRldmVudCA9IG5ldyBqUXVlcnkuRXZlbnQoIG9yaWdpbmFsRXZlbnQgKTtcblxuXHRcdGkgPSBjb3B5Lmxlbmd0aDtcblx0XHR3aGlsZSAoIGktLSApIHtcblx0XHRcdHByb3AgPSBjb3B5WyBpIF07XG5cdFx0XHRldmVudFsgcHJvcCBdID0gb3JpZ2luYWxFdmVudFsgcHJvcCBdO1xuXHRcdH1cblxuXHRcdC8vIFN1cHBvcnQ6IENvcmRvdmEgMi41IChXZWJLaXQpICgjMTMyNTUpXG5cdFx0Ly8gQWxsIGV2ZW50cyBzaG91bGQgaGF2ZSBhIHRhcmdldDsgQ29yZG92YSBkZXZpY2VyZWFkeSBkb2Vzbid0XG5cdFx0aWYgKCAhZXZlbnQudGFyZ2V0ICkge1xuXHRcdFx0ZXZlbnQudGFyZ2V0ID0gZG9jdW1lbnQ7XG5cdFx0fVxuXG5cdFx0Ly8gU3VwcG9ydDogU2FmYXJpIDYuMCssIENocm9tZTwyOFxuXHRcdC8vIFRhcmdldCBzaG91bGQgbm90IGJlIGEgdGV4dCBub2RlICgjNTA0LCAjMTMxNDMpXG5cdFx0aWYgKCBldmVudC50YXJnZXQubm9kZVR5cGUgPT09IDMgKSB7XG5cdFx0XHRldmVudC50YXJnZXQgPSBldmVudC50YXJnZXQucGFyZW50Tm9kZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZml4SG9vay5maWx0ZXIgPyBmaXhIb29rLmZpbHRlciggZXZlbnQsIG9yaWdpbmFsRXZlbnQgKSA6IGV2ZW50O1xuXHR9LFxuXG5cdHNwZWNpYWw6IHtcblx0XHRsb2FkOiB7XG5cblx0XHRcdC8vIFByZXZlbnQgdHJpZ2dlcmVkIGltYWdlLmxvYWQgZXZlbnRzIGZyb20gYnViYmxpbmcgdG8gd2luZG93LmxvYWRcblx0XHRcdG5vQnViYmxlOiB0cnVlXG5cdFx0fSxcblx0XHRmb2N1czoge1xuXG5cdFx0XHQvLyBGaXJlIG5hdGl2ZSBldmVudCBpZiBwb3NzaWJsZSBzbyBibHVyL2ZvY3VzIHNlcXVlbmNlIGlzIGNvcnJlY3Rcblx0XHRcdHRyaWdnZXI6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRpZiAoIHRoaXMgIT09IHNhZmVBY3RpdmVFbGVtZW50KCkgJiYgdGhpcy5mb2N1cyApIHtcblx0XHRcdFx0XHR0aGlzLmZvY3VzKCk7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0ZGVsZWdhdGVUeXBlOiBcImZvY3VzaW5cIlxuXHRcdH0sXG5cdFx0Ymx1cjoge1xuXHRcdFx0dHJpZ2dlcjogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGlmICggdGhpcyA9PT0gc2FmZUFjdGl2ZUVsZW1lbnQoKSAmJiB0aGlzLmJsdXIgKSB7XG5cdFx0XHRcdFx0dGhpcy5ibHVyKCk7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0ZGVsZWdhdGVUeXBlOiBcImZvY3Vzb3V0XCJcblx0XHR9LFxuXHRcdGNsaWNrOiB7XG5cblx0XHRcdC8vIEZvciBjaGVja2JveCwgZmlyZSBuYXRpdmUgZXZlbnQgc28gY2hlY2tlZCBzdGF0ZSB3aWxsIGJlIHJpZ2h0XG5cdFx0XHR0cmlnZ2VyOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0aWYgKCB0aGlzLnR5cGUgPT09IFwiY2hlY2tib3hcIiAmJiB0aGlzLmNsaWNrICYmIGpRdWVyeS5ub2RlTmFtZSggdGhpcywgXCJpbnB1dFwiICkgKSB7XG5cdFx0XHRcdFx0dGhpcy5jbGljaygpO1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblxuXHRcdFx0Ly8gRm9yIGNyb3NzLWJyb3dzZXIgY29uc2lzdGVuY3ksIGRvbid0IGZpcmUgbmF0aXZlIC5jbGljaygpIG9uIGxpbmtzXG5cdFx0XHRfZGVmYXVsdDogZnVuY3Rpb24oIGV2ZW50ICkge1xuXHRcdFx0XHRyZXR1cm4galF1ZXJ5Lm5vZGVOYW1lKCBldmVudC50YXJnZXQsIFwiYVwiICk7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdGJlZm9yZXVubG9hZDoge1xuXHRcdFx0cG9zdERpc3BhdGNoOiBmdW5jdGlvbiggZXZlbnQgKSB7XG5cblx0XHRcdFx0Ly8gU3VwcG9ydDogRmlyZWZveCAyMCtcblx0XHRcdFx0Ly8gRmlyZWZveCBkb2Vzbid0IGFsZXJ0IGlmIHRoZSByZXR1cm5WYWx1ZSBmaWVsZCBpcyBub3Qgc2V0LlxuXHRcdFx0XHRpZiAoIGV2ZW50LnJlc3VsdCAhPT0gdW5kZWZpbmVkICYmIGV2ZW50Lm9yaWdpbmFsRXZlbnQgKSB7XG5cdFx0XHRcdFx0ZXZlbnQub3JpZ2luYWxFdmVudC5yZXR1cm5WYWx1ZSA9IGV2ZW50LnJlc3VsdDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxufTtcblxualF1ZXJ5LnJlbW92ZUV2ZW50ID0gZnVuY3Rpb24oIGVsZW0sIHR5cGUsIGhhbmRsZSApIHtcblxuXHQvLyBUaGlzIFwiaWZcIiBpcyBuZWVkZWQgZm9yIHBsYWluIG9iamVjdHNcblx0aWYgKCBlbGVtLnJlbW92ZUV2ZW50TGlzdGVuZXIgKSB7XG5cdFx0ZWxlbS5yZW1vdmVFdmVudExpc3RlbmVyKCB0eXBlLCBoYW5kbGUgKTtcblx0fVxufTtcblxualF1ZXJ5LkV2ZW50ID0gZnVuY3Rpb24oIHNyYywgcHJvcHMgKSB7XG5cblx0Ly8gQWxsb3cgaW5zdGFudGlhdGlvbiB3aXRob3V0IHRoZSAnbmV3JyBrZXl3b3JkXG5cdGlmICggISggdGhpcyBpbnN0YW5jZW9mIGpRdWVyeS5FdmVudCApICkge1xuXHRcdHJldHVybiBuZXcgalF1ZXJ5LkV2ZW50KCBzcmMsIHByb3BzICk7XG5cdH1cblxuXHQvLyBFdmVudCBvYmplY3Rcblx0aWYgKCBzcmMgJiYgc3JjLnR5cGUgKSB7XG5cdFx0dGhpcy5vcmlnaW5hbEV2ZW50ID0gc3JjO1xuXHRcdHRoaXMudHlwZSA9IHNyYy50eXBlO1xuXG5cdFx0Ly8gRXZlbnRzIGJ1YmJsaW5nIHVwIHRoZSBkb2N1bWVudCBtYXkgaGF2ZSBiZWVuIG1hcmtlZCBhcyBwcmV2ZW50ZWRcblx0XHQvLyBieSBhIGhhbmRsZXIgbG93ZXIgZG93biB0aGUgdHJlZTsgcmVmbGVjdCB0aGUgY29ycmVjdCB2YWx1ZS5cblx0XHR0aGlzLmlzRGVmYXVsdFByZXZlbnRlZCA9IHNyYy5kZWZhdWx0UHJldmVudGVkIHx8XG5cdFx0XHRcdHNyYy5kZWZhdWx0UHJldmVudGVkID09PSB1bmRlZmluZWQgJiZcblxuXHRcdFx0XHQvLyBTdXBwb3J0OiBBbmRyb2lkPDQuMFxuXHRcdFx0XHRzcmMucmV0dXJuVmFsdWUgPT09IGZhbHNlID9cblx0XHRcdHJldHVyblRydWUgOlxuXHRcdFx0cmV0dXJuRmFsc2U7XG5cblx0Ly8gRXZlbnQgdHlwZVxuXHR9IGVsc2Uge1xuXHRcdHRoaXMudHlwZSA9IHNyYztcblx0fVxuXG5cdC8vIFB1dCBleHBsaWNpdGx5IHByb3ZpZGVkIHByb3BlcnRpZXMgb250byB0aGUgZXZlbnQgb2JqZWN0XG5cdGlmICggcHJvcHMgKSB7XG5cdFx0alF1ZXJ5LmV4dGVuZCggdGhpcywgcHJvcHMgKTtcblx0fVxuXG5cdC8vIENyZWF0ZSBhIHRpbWVzdGFtcCBpZiBpbmNvbWluZyBldmVudCBkb2Vzbid0IGhhdmUgb25lXG5cdHRoaXMudGltZVN0YW1wID0gc3JjICYmIHNyYy50aW1lU3RhbXAgfHwgalF1ZXJ5Lm5vdygpO1xuXG5cdC8vIE1hcmsgaXQgYXMgZml4ZWRcblx0dGhpc1sgalF1ZXJ5LmV4cGFuZG8gXSA9IHRydWU7XG59O1xuXG4vLyBqUXVlcnkuRXZlbnQgaXMgYmFzZWQgb24gRE9NMyBFdmVudHMgYXMgc3BlY2lmaWVkIGJ5IHRoZSBFQ01BU2NyaXB0IExhbmd1YWdlIEJpbmRpbmdcbi8vIGh0dHA6Ly93d3cudzMub3JnL1RSLzIwMDMvV0QtRE9NLUxldmVsLTMtRXZlbnRzLTIwMDMwMzMxL2VjbWEtc2NyaXB0LWJpbmRpbmcuaHRtbFxualF1ZXJ5LkV2ZW50LnByb3RvdHlwZSA9IHtcblx0Y29uc3RydWN0b3I6IGpRdWVyeS5FdmVudCxcblx0aXNEZWZhdWx0UHJldmVudGVkOiByZXR1cm5GYWxzZSxcblx0aXNQcm9wYWdhdGlvblN0b3BwZWQ6IHJldHVybkZhbHNlLFxuXHRpc0ltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZDogcmV0dXJuRmFsc2UsXG5cdGlzU2ltdWxhdGVkOiBmYWxzZSxcblxuXHRwcmV2ZW50RGVmYXVsdDogZnVuY3Rpb24oKSB7XG5cdFx0dmFyIGUgPSB0aGlzLm9yaWdpbmFsRXZlbnQ7XG5cblx0XHR0aGlzLmlzRGVmYXVsdFByZXZlbnRlZCA9IHJldHVyblRydWU7XG5cblx0XHRpZiAoIGUgJiYgIXRoaXMuaXNTaW11bGF0ZWQgKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0fVxuXHR9LFxuXHRzdG9wUHJvcGFnYXRpb246IGZ1bmN0aW9uKCkge1xuXHRcdHZhciBlID0gdGhpcy5vcmlnaW5hbEV2ZW50O1xuXG5cdFx0dGhpcy5pc1Byb3BhZ2F0aW9uU3RvcHBlZCA9IHJldHVyblRydWU7XG5cblx0XHRpZiAoIGUgJiYgIXRoaXMuaXNTaW11bGF0ZWQgKSB7XG5cdFx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdH1cblx0fSxcblx0c3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uOiBmdW5jdGlvbigpIHtcblx0XHR2YXIgZSA9IHRoaXMub3JpZ2luYWxFdmVudDtcblxuXHRcdHRoaXMuaXNJbW1lZGlhdGVQcm9wYWdhdGlvblN0b3BwZWQgPSByZXR1cm5UcnVlO1xuXG5cdFx0aWYgKCBlICYmICF0aGlzLmlzU2ltdWxhdGVkICkge1xuXHRcdFx0ZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcblx0XHR9XG5cblx0XHR0aGlzLnN0b3BQcm9wYWdhdGlvbigpO1xuXHR9XG59O1xuXG4vLyBDcmVhdGUgbW91c2VlbnRlci9sZWF2ZSBldmVudHMgdXNpbmcgbW91c2VvdmVyL291dCBhbmQgZXZlbnQtdGltZSBjaGVja3Ncbi8vIHNvIHRoYXQgZXZlbnQgZGVsZWdhdGlvbiB3b3JrcyBpbiBqUXVlcnkuXG4vLyBEbyB0aGUgc2FtZSBmb3IgcG9pbnRlcmVudGVyL3BvaW50ZXJsZWF2ZSBhbmQgcG9pbnRlcm92ZXIvcG9pbnRlcm91dFxuLy9cbi8vIFN1cHBvcnQ6IFNhZmFyaSA3IG9ubHlcbi8vIFNhZmFyaSBzZW5kcyBtb3VzZWVudGVyIHRvbyBvZnRlbjsgc2VlOlxuLy8gaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTQ3MDI1OFxuLy8gZm9yIHRoZSBkZXNjcmlwdGlvbiBvZiB0aGUgYnVnIChpdCBleGlzdGVkIGluIG9sZGVyIENocm9tZSB2ZXJzaW9ucyBhcyB3ZWxsKS5cbmpRdWVyeS5lYWNoKCB7XG5cdG1vdXNlZW50ZXI6IFwibW91c2VvdmVyXCIsXG5cdG1vdXNlbGVhdmU6IFwibW91c2VvdXRcIixcblx0cG9pbnRlcmVudGVyOiBcInBvaW50ZXJvdmVyXCIsXG5cdHBvaW50ZXJsZWF2ZTogXCJwb2ludGVyb3V0XCJcbn0sIGZ1bmN0aW9uKCBvcmlnLCBmaXggKSB7XG5cdGpRdWVyeS5ldmVudC5zcGVjaWFsWyBvcmlnIF0gPSB7XG5cdFx0ZGVsZWdhdGVUeXBlOiBmaXgsXG5cdFx0YmluZFR5cGU6IGZpeCxcblxuXHRcdGhhbmRsZTogZnVuY3Rpb24oIGV2ZW50ICkge1xuXHRcdFx0dmFyIHJldCxcblx0XHRcdFx0dGFyZ2V0ID0gdGhpcyxcblx0XHRcdFx0cmVsYXRlZCA9IGV2ZW50LnJlbGF0ZWRUYXJnZXQsXG5cdFx0XHRcdGhhbmRsZU9iaiA9IGV2ZW50LmhhbmRsZU9iajtcblxuXHRcdFx0Ly8gRm9yIG1vdXNlZW50ZXIvbGVhdmUgY2FsbCB0aGUgaGFuZGxlciBpZiByZWxhdGVkIGlzIG91dHNpZGUgdGhlIHRhcmdldC5cblx0XHRcdC8vIE5COiBObyByZWxhdGVkVGFyZ2V0IGlmIHRoZSBtb3VzZSBsZWZ0L2VudGVyZWQgdGhlIGJyb3dzZXIgd2luZG93XG5cdFx0XHRpZiAoICFyZWxhdGVkIHx8ICggcmVsYXRlZCAhPT0gdGFyZ2V0ICYmICFqUXVlcnkuY29udGFpbnMoIHRhcmdldCwgcmVsYXRlZCApICkgKSB7XG5cdFx0XHRcdGV2ZW50LnR5cGUgPSBoYW5kbGVPYmoub3JpZ1R5cGU7XG5cdFx0XHRcdHJldCA9IGhhbmRsZU9iai5oYW5kbGVyLmFwcGx5KCB0aGlzLCBhcmd1bWVudHMgKTtcblx0XHRcdFx0ZXZlbnQudHlwZSA9IGZpeDtcblx0XHRcdH1cblx0XHRcdHJldHVybiByZXQ7XG5cdFx0fVxuXHR9O1xufSApO1xuXG5qUXVlcnkuZm4uZXh0ZW5kKCB7XG5cdG9uOiBmdW5jdGlvbiggdHlwZXMsIHNlbGVjdG9yLCBkYXRhLCBmbiApIHtcblx0XHRyZXR1cm4gb24oIHRoaXMsIHR5cGVzLCBzZWxlY3RvciwgZGF0YSwgZm4gKTtcblx0fSxcblx0b25lOiBmdW5jdGlvbiggdHlwZXMsIHNlbGVjdG9yLCBkYXRhLCBmbiApIHtcblx0XHRyZXR1cm4gb24oIHRoaXMsIHR5cGVzLCBzZWxlY3RvciwgZGF0YSwgZm4sIDEgKTtcblx0fSxcblx0b2ZmOiBmdW5jdGlvbiggdHlwZXMsIHNlbGVjdG9yLCBmbiApIHtcblx0XHR2YXIgaGFuZGxlT2JqLCB0eXBlO1xuXHRcdGlmICggdHlwZXMgJiYgdHlwZXMucHJldmVudERlZmF1bHQgJiYgdHlwZXMuaGFuZGxlT2JqICkge1xuXG5cdFx0XHQvLyAoIGV2ZW50ICkgIGRpc3BhdGNoZWQgalF1ZXJ5LkV2ZW50XG5cdFx0XHRoYW5kbGVPYmogPSB0eXBlcy5oYW5kbGVPYmo7XG5cdFx0XHRqUXVlcnkoIHR5cGVzLmRlbGVnYXRlVGFyZ2V0ICkub2ZmKFxuXHRcdFx0XHRoYW5kbGVPYmoubmFtZXNwYWNlID9cblx0XHRcdFx0XHRoYW5kbGVPYmoub3JpZ1R5cGUgKyBcIi5cIiArIGhhbmRsZU9iai5uYW1lc3BhY2UgOlxuXHRcdFx0XHRcdGhhbmRsZU9iai5vcmlnVHlwZSxcblx0XHRcdFx0aGFuZGxlT2JqLnNlbGVjdG9yLFxuXHRcdFx0XHRoYW5kbGVPYmouaGFuZGxlclxuXHRcdFx0KTtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH1cblx0XHRpZiAoIHR5cGVvZiB0eXBlcyA9PT0gXCJvYmplY3RcIiApIHtcblxuXHRcdFx0Ly8gKCB0eXBlcy1vYmplY3QgWywgc2VsZWN0b3JdIClcblx0XHRcdGZvciAoIHR5cGUgaW4gdHlwZXMgKSB7XG5cdFx0XHRcdHRoaXMub2ZmKCB0eXBlLCBzZWxlY3RvciwgdHlwZXNbIHR5cGUgXSApO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fVxuXHRcdGlmICggc2VsZWN0b3IgPT09IGZhbHNlIHx8IHR5cGVvZiBzZWxlY3RvciA9PT0gXCJmdW5jdGlvblwiICkge1xuXG5cdFx0XHQvLyAoIHR5cGVzIFssIGZuXSApXG5cdFx0XHRmbiA9IHNlbGVjdG9yO1xuXHRcdFx0c2VsZWN0b3IgPSB1bmRlZmluZWQ7XG5cdFx0fVxuXHRcdGlmICggZm4gPT09IGZhbHNlICkge1xuXHRcdFx0Zm4gPSByZXR1cm5GYWxzZTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXMuZWFjaCggZnVuY3Rpb24oKSB7XG5cdFx0XHRqUXVlcnkuZXZlbnQucmVtb3ZlKCB0aGlzLCB0eXBlcywgZm4sIHNlbGVjdG9yICk7XG5cdFx0fSApO1xuXHR9XG59ICk7XG5cblxudmFyXG5cdHJ4aHRtbFRhZyA9IC88KD8hYXJlYXxicnxjb2x8ZW1iZWR8aHJ8aW1nfGlucHV0fGxpbmt8bWV0YXxwYXJhbSkoKFtcXHc6LV0rKVtePl0qKVxcLz4vZ2ksXG5cblx0Ly8gU3VwcG9ydDogSUUgMTAtMTEsIEVkZ2UgMTAyNDArXG5cdC8vIEluIElFL0VkZ2UgdXNpbmcgcmVnZXggZ3JvdXBzIGhlcmUgY2F1c2VzIHNldmVyZSBzbG93ZG93bnMuXG5cdC8vIFNlZSBodHRwczovL2Nvbm5lY3QubWljcm9zb2Z0LmNvbS9JRS9mZWVkYmFjay9kZXRhaWxzLzE3MzY1MTIvXG5cdHJub0lubmVyaHRtbCA9IC88c2NyaXB0fDxzdHlsZXw8bGluay9pLFxuXG5cdC8vIGNoZWNrZWQ9XCJjaGVja2VkXCIgb3IgY2hlY2tlZFxuXHRyY2hlY2tlZCA9IC9jaGVja2VkXFxzKig/OltePV18PVxccyouY2hlY2tlZC4pL2ksXG5cdHJzY3JpcHRUeXBlTWFza2VkID0gL150cnVlXFwvKC4qKS8sXG5cdHJjbGVhblNjcmlwdCA9IC9eXFxzKjwhKD86XFxbQ0RBVEFcXFt8LS0pfCg/OlxcXVxcXXwtLSk+XFxzKiQvZztcblxuLy8gTWFuaXB1bGF0aW5nIHRhYmxlcyByZXF1aXJlcyBhIHRib2R5XG5mdW5jdGlvbiBtYW5pcHVsYXRpb25UYXJnZXQoIGVsZW0sIGNvbnRlbnQgKSB7XG5cdHJldHVybiBqUXVlcnkubm9kZU5hbWUoIGVsZW0sIFwidGFibGVcIiApICYmXG5cdFx0alF1ZXJ5Lm5vZGVOYW1lKCBjb250ZW50Lm5vZGVUeXBlICE9PSAxMSA/IGNvbnRlbnQgOiBjb250ZW50LmZpcnN0Q2hpbGQsIFwidHJcIiApID9cblxuXHRcdGVsZW0uZ2V0RWxlbWVudHNCeVRhZ05hbWUoIFwidGJvZHlcIiApWyAwIF0gfHxcblx0XHRcdGVsZW0uYXBwZW5kQ2hpbGQoIGVsZW0ub3duZXJEb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcInRib2R5XCIgKSApIDpcblx0XHRlbGVtO1xufVxuXG4vLyBSZXBsYWNlL3Jlc3RvcmUgdGhlIHR5cGUgYXR0cmlidXRlIG9mIHNjcmlwdCBlbGVtZW50cyBmb3Igc2FmZSBET00gbWFuaXB1bGF0aW9uXG5mdW5jdGlvbiBkaXNhYmxlU2NyaXB0KCBlbGVtICkge1xuXHRlbGVtLnR5cGUgPSAoIGVsZW0uZ2V0QXR0cmlidXRlKCBcInR5cGVcIiApICE9PSBudWxsICkgKyBcIi9cIiArIGVsZW0udHlwZTtcblx0cmV0dXJuIGVsZW07XG59XG5mdW5jdGlvbiByZXN0b3JlU2NyaXB0KCBlbGVtICkge1xuXHR2YXIgbWF0Y2ggPSByc2NyaXB0VHlwZU1hc2tlZC5leGVjKCBlbGVtLnR5cGUgKTtcblxuXHRpZiAoIG1hdGNoICkge1xuXHRcdGVsZW0udHlwZSA9IG1hdGNoWyAxIF07XG5cdH0gZWxzZSB7XG5cdFx0ZWxlbS5yZW1vdmVBdHRyaWJ1dGUoIFwidHlwZVwiICk7XG5cdH1cblxuXHRyZXR1cm4gZWxlbTtcbn1cblxuZnVuY3Rpb24gY2xvbmVDb3B5RXZlbnQoIHNyYywgZGVzdCApIHtcblx0dmFyIGksIGwsIHR5cGUsIHBkYXRhT2xkLCBwZGF0YUN1ciwgdWRhdGFPbGQsIHVkYXRhQ3VyLCBldmVudHM7XG5cblx0aWYgKCBkZXN0Lm5vZGVUeXBlICE9PSAxICkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdC8vIDEuIENvcHkgcHJpdmF0ZSBkYXRhOiBldmVudHMsIGhhbmRsZXJzLCBldGMuXG5cdGlmICggZGF0YVByaXYuaGFzRGF0YSggc3JjICkgKSB7XG5cdFx0cGRhdGFPbGQgPSBkYXRhUHJpdi5hY2Nlc3MoIHNyYyApO1xuXHRcdHBkYXRhQ3VyID0gZGF0YVByaXYuc2V0KCBkZXN0LCBwZGF0YU9sZCApO1xuXHRcdGV2ZW50cyA9IHBkYXRhT2xkLmV2ZW50cztcblxuXHRcdGlmICggZXZlbnRzICkge1xuXHRcdFx0ZGVsZXRlIHBkYXRhQ3VyLmhhbmRsZTtcblx0XHRcdHBkYXRhQ3VyLmV2ZW50cyA9IHt9O1xuXG5cdFx0XHRmb3IgKCB0eXBlIGluIGV2ZW50cyApIHtcblx0XHRcdFx0Zm9yICggaSA9IDAsIGwgPSBldmVudHNbIHR5cGUgXS5sZW5ndGg7IGkgPCBsOyBpKysgKSB7XG5cdFx0XHRcdFx0alF1ZXJ5LmV2ZW50LmFkZCggZGVzdCwgdHlwZSwgZXZlbnRzWyB0eXBlIF1bIGkgXSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Ly8gMi4gQ29weSB1c2VyIGRhdGFcblx0aWYgKCBkYXRhVXNlci5oYXNEYXRhKCBzcmMgKSApIHtcblx0XHR1ZGF0YU9sZCA9IGRhdGFVc2VyLmFjY2Vzcyggc3JjICk7XG5cdFx0dWRhdGFDdXIgPSBqUXVlcnkuZXh0ZW5kKCB7fSwgdWRhdGFPbGQgKTtcblxuXHRcdGRhdGFVc2VyLnNldCggZGVzdCwgdWRhdGFDdXIgKTtcblx0fVxufVxuXG4vLyBGaXggSUUgYnVncywgc2VlIHN1cHBvcnQgdGVzdHNcbmZ1bmN0aW9uIGZpeElucHV0KCBzcmMsIGRlc3QgKSB7XG5cdHZhciBub2RlTmFtZSA9IGRlc3Qubm9kZU5hbWUudG9Mb3dlckNhc2UoKTtcblxuXHQvLyBGYWlscyB0byBwZXJzaXN0IHRoZSBjaGVja2VkIHN0YXRlIG9mIGEgY2xvbmVkIGNoZWNrYm94IG9yIHJhZGlvIGJ1dHRvbi5cblx0aWYgKCBub2RlTmFtZSA9PT0gXCJpbnB1dFwiICYmIHJjaGVja2FibGVUeXBlLnRlc3QoIHNyYy50eXBlICkgKSB7XG5cdFx0ZGVzdC5jaGVja2VkID0gc3JjLmNoZWNrZWQ7XG5cblx0Ly8gRmFpbHMgdG8gcmV0dXJuIHRoZSBzZWxlY3RlZCBvcHRpb24gdG8gdGhlIGRlZmF1bHQgc2VsZWN0ZWQgc3RhdGUgd2hlbiBjbG9uaW5nIG9wdGlvbnNcblx0fSBlbHNlIGlmICggbm9kZU5hbWUgPT09IFwiaW5wdXRcIiB8fCBub2RlTmFtZSA9PT0gXCJ0ZXh0YXJlYVwiICkge1xuXHRcdGRlc3QuZGVmYXVsdFZhbHVlID0gc3JjLmRlZmF1bHRWYWx1ZTtcblx0fVxufVxuXG5mdW5jdGlvbiBkb21NYW5pcCggY29sbGVjdGlvbiwgYXJncywgY2FsbGJhY2ssIGlnbm9yZWQgKSB7XG5cblx0Ly8gRmxhdHRlbiBhbnkgbmVzdGVkIGFycmF5c1xuXHRhcmdzID0gY29uY2F0LmFwcGx5KCBbXSwgYXJncyApO1xuXG5cdHZhciBmcmFnbWVudCwgZmlyc3QsIHNjcmlwdHMsIGhhc1NjcmlwdHMsIG5vZGUsIGRvYyxcblx0XHRpID0gMCxcblx0XHRsID0gY29sbGVjdGlvbi5sZW5ndGgsXG5cdFx0aU5vQ2xvbmUgPSBsIC0gMSxcblx0XHR2YWx1ZSA9IGFyZ3NbIDAgXSxcblx0XHRpc0Z1bmN0aW9uID0galF1ZXJ5LmlzRnVuY3Rpb24oIHZhbHVlICk7XG5cblx0Ly8gV2UgY2FuJ3QgY2xvbmVOb2RlIGZyYWdtZW50cyB0aGF0IGNvbnRhaW4gY2hlY2tlZCwgaW4gV2ViS2l0XG5cdGlmICggaXNGdW5jdGlvbiB8fFxuXHRcdFx0KCBsID4gMSAmJiB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgJiZcblx0XHRcdFx0IXN1cHBvcnQuY2hlY2tDbG9uZSAmJiByY2hlY2tlZC50ZXN0KCB2YWx1ZSApICkgKSB7XG5cdFx0cmV0dXJuIGNvbGxlY3Rpb24uZWFjaCggZnVuY3Rpb24oIGluZGV4ICkge1xuXHRcdFx0dmFyIHNlbGYgPSBjb2xsZWN0aW9uLmVxKCBpbmRleCApO1xuXHRcdFx0aWYgKCBpc0Z1bmN0aW9uICkge1xuXHRcdFx0XHRhcmdzWyAwIF0gPSB2YWx1ZS5jYWxsKCB0aGlzLCBpbmRleCwgc2VsZi5odG1sKCkgKTtcblx0XHRcdH1cblx0XHRcdGRvbU1hbmlwKCBzZWxmLCBhcmdzLCBjYWxsYmFjaywgaWdub3JlZCApO1xuXHRcdH0gKTtcblx0fVxuXG5cdGlmICggbCApIHtcblx0XHRmcmFnbWVudCA9IGJ1aWxkRnJhZ21lbnQoIGFyZ3MsIGNvbGxlY3Rpb25bIDAgXS5vd25lckRvY3VtZW50LCBmYWxzZSwgY29sbGVjdGlvbiwgaWdub3JlZCApO1xuXHRcdGZpcnN0ID0gZnJhZ21lbnQuZmlyc3RDaGlsZDtcblxuXHRcdGlmICggZnJhZ21lbnQuY2hpbGROb2Rlcy5sZW5ndGggPT09IDEgKSB7XG5cdFx0XHRmcmFnbWVudCA9IGZpcnN0O1xuXHRcdH1cblxuXHRcdC8vIFJlcXVpcmUgZWl0aGVyIG5ldyBjb250ZW50IG9yIGFuIGludGVyZXN0IGluIGlnbm9yZWQgZWxlbWVudHMgdG8gaW52b2tlIHRoZSBjYWxsYmFja1xuXHRcdGlmICggZmlyc3QgfHwgaWdub3JlZCApIHtcblx0XHRcdHNjcmlwdHMgPSBqUXVlcnkubWFwKCBnZXRBbGwoIGZyYWdtZW50LCBcInNjcmlwdFwiICksIGRpc2FibGVTY3JpcHQgKTtcblx0XHRcdGhhc1NjcmlwdHMgPSBzY3JpcHRzLmxlbmd0aDtcblxuXHRcdFx0Ly8gVXNlIHRoZSBvcmlnaW5hbCBmcmFnbWVudCBmb3IgdGhlIGxhc3QgaXRlbVxuXHRcdFx0Ly8gaW5zdGVhZCBvZiB0aGUgZmlyc3QgYmVjYXVzZSBpdCBjYW4gZW5kIHVwXG5cdFx0XHQvLyBiZWluZyBlbXB0aWVkIGluY29ycmVjdGx5IGluIGNlcnRhaW4gc2l0dWF0aW9ucyAoIzgwNzApLlxuXHRcdFx0Zm9yICggOyBpIDwgbDsgaSsrICkge1xuXHRcdFx0XHRub2RlID0gZnJhZ21lbnQ7XG5cblx0XHRcdFx0aWYgKCBpICE9PSBpTm9DbG9uZSApIHtcblx0XHRcdFx0XHRub2RlID0galF1ZXJ5LmNsb25lKCBub2RlLCB0cnVlLCB0cnVlICk7XG5cblx0XHRcdFx0XHQvLyBLZWVwIHJlZmVyZW5jZXMgdG8gY2xvbmVkIHNjcmlwdHMgZm9yIGxhdGVyIHJlc3RvcmF0aW9uXG5cdFx0XHRcdFx0aWYgKCBoYXNTY3JpcHRzICkge1xuXG5cdFx0XHRcdFx0XHQvLyBTdXBwb3J0OiBBbmRyb2lkPDQuMSwgUGhhbnRvbUpTPDJcblx0XHRcdFx0XHRcdC8vIHB1c2guYXBwbHkoXywgYXJyYXlsaWtlKSB0aHJvd3Mgb24gYW5jaWVudCBXZWJLaXRcblx0XHRcdFx0XHRcdGpRdWVyeS5tZXJnZSggc2NyaXB0cywgZ2V0QWxsKCBub2RlLCBcInNjcmlwdFwiICkgKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRjYWxsYmFjay5jYWxsKCBjb2xsZWN0aW9uWyBpIF0sIG5vZGUsIGkgKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCBoYXNTY3JpcHRzICkge1xuXHRcdFx0XHRkb2MgPSBzY3JpcHRzWyBzY3JpcHRzLmxlbmd0aCAtIDEgXS5vd25lckRvY3VtZW50O1xuXG5cdFx0XHRcdC8vIFJlZW5hYmxlIHNjcmlwdHNcblx0XHRcdFx0alF1ZXJ5Lm1hcCggc2NyaXB0cywgcmVzdG9yZVNjcmlwdCApO1xuXG5cdFx0XHRcdC8vIEV2YWx1YXRlIGV4ZWN1dGFibGUgc2NyaXB0cyBvbiBmaXJzdCBkb2N1bWVudCBpbnNlcnRpb25cblx0XHRcdFx0Zm9yICggaSA9IDA7IGkgPCBoYXNTY3JpcHRzOyBpKysgKSB7XG5cdFx0XHRcdFx0bm9kZSA9IHNjcmlwdHNbIGkgXTtcblx0XHRcdFx0XHRpZiAoIHJzY3JpcHRUeXBlLnRlc3QoIG5vZGUudHlwZSB8fCBcIlwiICkgJiZcblx0XHRcdFx0XHRcdCFkYXRhUHJpdi5hY2Nlc3MoIG5vZGUsIFwiZ2xvYmFsRXZhbFwiICkgJiZcblx0XHRcdFx0XHRcdGpRdWVyeS5jb250YWlucyggZG9jLCBub2RlICkgKSB7XG5cblx0XHRcdFx0XHRcdGlmICggbm9kZS5zcmMgKSB7XG5cblx0XHRcdFx0XHRcdFx0Ly8gT3B0aW9uYWwgQUpBWCBkZXBlbmRlbmN5LCBidXQgd29uJ3QgcnVuIHNjcmlwdHMgaWYgbm90IHByZXNlbnRcblx0XHRcdFx0XHRcdFx0aWYgKCBqUXVlcnkuX2V2YWxVcmwgKSB7XG5cdFx0XHRcdFx0XHRcdFx0alF1ZXJ5Ll9ldmFsVXJsKCBub2RlLnNyYyApO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRqUXVlcnkuZ2xvYmFsRXZhbCggbm9kZS50ZXh0Q29udGVudC5yZXBsYWNlKCByY2xlYW5TY3JpcHQsIFwiXCIgKSApO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiBjb2xsZWN0aW9uO1xufVxuXG5mdW5jdGlvbiByZW1vdmUoIGVsZW0sIHNlbGVjdG9yLCBrZWVwRGF0YSApIHtcblx0dmFyIG5vZGUsXG5cdFx0bm9kZXMgPSBzZWxlY3RvciA/IGpRdWVyeS5maWx0ZXIoIHNlbGVjdG9yLCBlbGVtICkgOiBlbGVtLFxuXHRcdGkgPSAwO1xuXG5cdGZvciAoIDsgKCBub2RlID0gbm9kZXNbIGkgXSApICE9IG51bGw7IGkrKyApIHtcblx0XHRpZiAoICFrZWVwRGF0YSAmJiBub2RlLm5vZGVUeXBlID09PSAxICkge1xuXHRcdFx0alF1ZXJ5LmNsZWFuRGF0YSggZ2V0QWxsKCBub2RlICkgKTtcblx0XHR9XG5cblx0XHRpZiAoIG5vZGUucGFyZW50Tm9kZSApIHtcblx0XHRcdGlmICgga2VlcERhdGEgJiYgalF1ZXJ5LmNvbnRhaW5zKCBub2RlLm93bmVyRG9jdW1lbnQsIG5vZGUgKSApIHtcblx0XHRcdFx0c2V0R2xvYmFsRXZhbCggZ2V0QWxsKCBub2RlLCBcInNjcmlwdFwiICkgKTtcblx0XHRcdH1cblx0XHRcdG5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCggbm9kZSApO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBlbGVtO1xufVxuXG5qUXVlcnkuZXh0ZW5kKCB7XG5cdGh0bWxQcmVmaWx0ZXI6IGZ1bmN0aW9uKCBodG1sICkge1xuXHRcdHJldHVybiBodG1sLnJlcGxhY2UoIHJ4aHRtbFRhZywgXCI8JDE+PC8kMj5cIiApO1xuXHR9LFxuXG5cdGNsb25lOiBmdW5jdGlvbiggZWxlbSwgZGF0YUFuZEV2ZW50cywgZGVlcERhdGFBbmRFdmVudHMgKSB7XG5cdFx0dmFyIGksIGwsIHNyY0VsZW1lbnRzLCBkZXN0RWxlbWVudHMsXG5cdFx0XHRjbG9uZSA9IGVsZW0uY2xvbmVOb2RlKCB0cnVlICksXG5cdFx0XHRpblBhZ2UgPSBqUXVlcnkuY29udGFpbnMoIGVsZW0ub3duZXJEb2N1bWVudCwgZWxlbSApO1xuXG5cdFx0Ly8gRml4IElFIGNsb25pbmcgaXNzdWVzXG5cdFx0aWYgKCAhc3VwcG9ydC5ub0Nsb25lQ2hlY2tlZCAmJiAoIGVsZW0ubm9kZVR5cGUgPT09IDEgfHwgZWxlbS5ub2RlVHlwZSA9PT0gMTEgKSAmJlxuXHRcdFx0XHQhalF1ZXJ5LmlzWE1MRG9jKCBlbGVtICkgKSB7XG5cblx0XHRcdC8vIFdlIGVzY2hldyBTaXp6bGUgaGVyZSBmb3IgcGVyZm9ybWFuY2UgcmVhc29uczogaHR0cDovL2pzcGVyZi5jb20vZ2V0YWxsLXZzLXNpenpsZS8yXG5cdFx0XHRkZXN0RWxlbWVudHMgPSBnZXRBbGwoIGNsb25lICk7XG5cdFx0XHRzcmNFbGVtZW50cyA9IGdldEFsbCggZWxlbSApO1xuXG5cdFx0XHRmb3IgKCBpID0gMCwgbCA9IHNyY0VsZW1lbnRzLmxlbmd0aDsgaSA8IGw7IGkrKyApIHtcblx0XHRcdFx0Zml4SW5wdXQoIHNyY0VsZW1lbnRzWyBpIF0sIGRlc3RFbGVtZW50c1sgaSBdICk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gQ29weSB0aGUgZXZlbnRzIGZyb20gdGhlIG9yaWdpbmFsIHRvIHRoZSBjbG9uZVxuXHRcdGlmICggZGF0YUFuZEV2ZW50cyApIHtcblx0XHRcdGlmICggZGVlcERhdGFBbmRFdmVudHMgKSB7XG5cdFx0XHRcdHNyY0VsZW1lbnRzID0gc3JjRWxlbWVudHMgfHwgZ2V0QWxsKCBlbGVtICk7XG5cdFx0XHRcdGRlc3RFbGVtZW50cyA9IGRlc3RFbGVtZW50cyB8fCBnZXRBbGwoIGNsb25lICk7XG5cblx0XHRcdFx0Zm9yICggaSA9IDAsIGwgPSBzcmNFbGVtZW50cy5sZW5ndGg7IGkgPCBsOyBpKysgKSB7XG5cdFx0XHRcdFx0Y2xvbmVDb3B5RXZlbnQoIHNyY0VsZW1lbnRzWyBpIF0sIGRlc3RFbGVtZW50c1sgaSBdICk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGNsb25lQ29weUV2ZW50KCBlbGVtLCBjbG9uZSApO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIFByZXNlcnZlIHNjcmlwdCBldmFsdWF0aW9uIGhpc3Rvcnlcblx0XHRkZXN0RWxlbWVudHMgPSBnZXRBbGwoIGNsb25lLCBcInNjcmlwdFwiICk7XG5cdFx0aWYgKCBkZXN0RWxlbWVudHMubGVuZ3RoID4gMCApIHtcblx0XHRcdHNldEdsb2JhbEV2YWwoIGRlc3RFbGVtZW50cywgIWluUGFnZSAmJiBnZXRBbGwoIGVsZW0sIFwic2NyaXB0XCIgKSApO1xuXHRcdH1cblxuXHRcdC8vIFJldHVybiB0aGUgY2xvbmVkIHNldFxuXHRcdHJldHVybiBjbG9uZTtcblx0fSxcblxuXHRjbGVhbkRhdGE6IGZ1bmN0aW9uKCBlbGVtcyApIHtcblx0XHR2YXIgZGF0YSwgZWxlbSwgdHlwZSxcblx0XHRcdHNwZWNpYWwgPSBqUXVlcnkuZXZlbnQuc3BlY2lhbCxcblx0XHRcdGkgPSAwO1xuXG5cdFx0Zm9yICggOyAoIGVsZW0gPSBlbGVtc1sgaSBdICkgIT09IHVuZGVmaW5lZDsgaSsrICkge1xuXHRcdFx0aWYgKCBhY2NlcHREYXRhKCBlbGVtICkgKSB7XG5cdFx0XHRcdGlmICggKCBkYXRhID0gZWxlbVsgZGF0YVByaXYuZXhwYW5kbyBdICkgKSB7XG5cdFx0XHRcdFx0aWYgKCBkYXRhLmV2ZW50cyApIHtcblx0XHRcdFx0XHRcdGZvciAoIHR5cGUgaW4gZGF0YS5ldmVudHMgKSB7XG5cdFx0XHRcdFx0XHRcdGlmICggc3BlY2lhbFsgdHlwZSBdICkge1xuXHRcdFx0XHRcdFx0XHRcdGpRdWVyeS5ldmVudC5yZW1vdmUoIGVsZW0sIHR5cGUgKTtcblxuXHRcdFx0XHRcdFx0XHQvLyBUaGlzIGlzIGEgc2hvcnRjdXQgdG8gYXZvaWQgalF1ZXJ5LmV2ZW50LnJlbW92ZSdzIG92ZXJoZWFkXG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0alF1ZXJ5LnJlbW92ZUV2ZW50KCBlbGVtLCB0eXBlLCBkYXRhLmhhbmRsZSApO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly8gU3VwcG9ydDogQ2hyb21lIDw9IDM1LTQ1K1xuXHRcdFx0XHRcdC8vIEFzc2lnbiB1bmRlZmluZWQgaW5zdGVhZCBvZiB1c2luZyBkZWxldGUsIHNlZSBEYXRhI3JlbW92ZVxuXHRcdFx0XHRcdGVsZW1bIGRhdGFQcml2LmV4cGFuZG8gXSA9IHVuZGVmaW5lZDtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoIGVsZW1bIGRhdGFVc2VyLmV4cGFuZG8gXSApIHtcblxuXHRcdFx0XHRcdC8vIFN1cHBvcnQ6IENocm9tZSA8PSAzNS00NStcblx0XHRcdFx0XHQvLyBBc3NpZ24gdW5kZWZpbmVkIGluc3RlYWQgb2YgdXNpbmcgZGVsZXRlLCBzZWUgRGF0YSNyZW1vdmVcblx0XHRcdFx0XHRlbGVtWyBkYXRhVXNlci5leHBhbmRvIF0gPSB1bmRlZmluZWQ7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cbn0gKTtcblxualF1ZXJ5LmZuLmV4dGVuZCgge1xuXG5cdC8vIEtlZXAgZG9tTWFuaXAgZXhwb3NlZCB1bnRpbCAzLjAgKGdoLTIyMjUpXG5cdGRvbU1hbmlwOiBkb21NYW5pcCxcblxuXHRkZXRhY2g6IGZ1bmN0aW9uKCBzZWxlY3RvciApIHtcblx0XHRyZXR1cm4gcmVtb3ZlKCB0aGlzLCBzZWxlY3RvciwgdHJ1ZSApO1xuXHR9LFxuXG5cdHJlbW92ZTogZnVuY3Rpb24oIHNlbGVjdG9yICkge1xuXHRcdHJldHVybiByZW1vdmUoIHRoaXMsIHNlbGVjdG9yICk7XG5cdH0sXG5cblx0dGV4dDogZnVuY3Rpb24oIHZhbHVlICkge1xuXHRcdHJldHVybiBhY2Nlc3MoIHRoaXMsIGZ1bmN0aW9uKCB2YWx1ZSApIHtcblx0XHRcdHJldHVybiB2YWx1ZSA9PT0gdW5kZWZpbmVkID9cblx0XHRcdFx0alF1ZXJ5LnRleHQoIHRoaXMgKSA6XG5cdFx0XHRcdHRoaXMuZW1wdHkoKS5lYWNoKCBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRpZiAoIHRoaXMubm9kZVR5cGUgPT09IDEgfHwgdGhpcy5ub2RlVHlwZSA9PT0gMTEgfHwgdGhpcy5ub2RlVHlwZSA9PT0gOSApIHtcblx0XHRcdFx0XHRcdHRoaXMudGV4dENvbnRlbnQgPSB2YWx1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gKTtcblx0XHR9LCBudWxsLCB2YWx1ZSwgYXJndW1lbnRzLmxlbmd0aCApO1xuXHR9LFxuXG5cdGFwcGVuZDogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIGRvbU1hbmlwKCB0aGlzLCBhcmd1bWVudHMsIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0aWYgKCB0aGlzLm5vZGVUeXBlID09PSAxIHx8IHRoaXMubm9kZVR5cGUgPT09IDExIHx8IHRoaXMubm9kZVR5cGUgPT09IDkgKSB7XG5cdFx0XHRcdHZhciB0YXJnZXQgPSBtYW5pcHVsYXRpb25UYXJnZXQoIHRoaXMsIGVsZW0gKTtcblx0XHRcdFx0dGFyZ2V0LmFwcGVuZENoaWxkKCBlbGVtICk7XG5cdFx0XHR9XG5cdFx0fSApO1xuXHR9LFxuXG5cdHByZXBlbmQ6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiBkb21NYW5pcCggdGhpcywgYXJndW1lbnRzLCBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdGlmICggdGhpcy5ub2RlVHlwZSA9PT0gMSB8fCB0aGlzLm5vZGVUeXBlID09PSAxMSB8fCB0aGlzLm5vZGVUeXBlID09PSA5ICkge1xuXHRcdFx0XHR2YXIgdGFyZ2V0ID0gbWFuaXB1bGF0aW9uVGFyZ2V0KCB0aGlzLCBlbGVtICk7XG5cdFx0XHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoIGVsZW0sIHRhcmdldC5maXJzdENoaWxkICk7XG5cdFx0XHR9XG5cdFx0fSApO1xuXHR9LFxuXG5cdGJlZm9yZTogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIGRvbU1hbmlwKCB0aGlzLCBhcmd1bWVudHMsIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0aWYgKCB0aGlzLnBhcmVudE5vZGUgKSB7XG5cdFx0XHRcdHRoaXMucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoIGVsZW0sIHRoaXMgKTtcblx0XHRcdH1cblx0XHR9ICk7XG5cdH0sXG5cblx0YWZ0ZXI6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiBkb21NYW5pcCggdGhpcywgYXJndW1lbnRzLCBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdGlmICggdGhpcy5wYXJlbnROb2RlICkge1xuXHRcdFx0XHR0aGlzLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKCBlbGVtLCB0aGlzLm5leHRTaWJsaW5nICk7XG5cdFx0XHR9XG5cdFx0fSApO1xuXHR9LFxuXG5cdGVtcHR5OiBmdW5jdGlvbigpIHtcblx0XHR2YXIgZWxlbSxcblx0XHRcdGkgPSAwO1xuXG5cdFx0Zm9yICggOyAoIGVsZW0gPSB0aGlzWyBpIF0gKSAhPSBudWxsOyBpKysgKSB7XG5cdFx0XHRpZiAoIGVsZW0ubm9kZVR5cGUgPT09IDEgKSB7XG5cblx0XHRcdFx0Ly8gUHJldmVudCBtZW1vcnkgbGVha3Ncblx0XHRcdFx0alF1ZXJ5LmNsZWFuRGF0YSggZ2V0QWxsKCBlbGVtLCBmYWxzZSApICk7XG5cblx0XHRcdFx0Ly8gUmVtb3ZlIGFueSByZW1haW5pbmcgbm9kZXNcblx0XHRcdFx0ZWxlbS50ZXh0Q29udGVudCA9IFwiXCI7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cblx0Y2xvbmU6IGZ1bmN0aW9uKCBkYXRhQW5kRXZlbnRzLCBkZWVwRGF0YUFuZEV2ZW50cyApIHtcblx0XHRkYXRhQW5kRXZlbnRzID0gZGF0YUFuZEV2ZW50cyA9PSBudWxsID8gZmFsc2UgOiBkYXRhQW5kRXZlbnRzO1xuXHRcdGRlZXBEYXRhQW5kRXZlbnRzID0gZGVlcERhdGFBbmRFdmVudHMgPT0gbnVsbCA/IGRhdGFBbmRFdmVudHMgOiBkZWVwRGF0YUFuZEV2ZW50cztcblxuXHRcdHJldHVybiB0aGlzLm1hcCggZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4galF1ZXJ5LmNsb25lKCB0aGlzLCBkYXRhQW5kRXZlbnRzLCBkZWVwRGF0YUFuZEV2ZW50cyApO1xuXHRcdH0gKTtcblx0fSxcblxuXHRodG1sOiBmdW5jdGlvbiggdmFsdWUgKSB7XG5cdFx0cmV0dXJuIGFjY2VzcyggdGhpcywgZnVuY3Rpb24oIHZhbHVlICkge1xuXHRcdFx0dmFyIGVsZW0gPSB0aGlzWyAwIF0gfHwge30sXG5cdFx0XHRcdGkgPSAwLFxuXHRcdFx0XHRsID0gdGhpcy5sZW5ndGg7XG5cblx0XHRcdGlmICggdmFsdWUgPT09IHVuZGVmaW5lZCAmJiBlbGVtLm5vZGVUeXBlID09PSAxICkge1xuXHRcdFx0XHRyZXR1cm4gZWxlbS5pbm5lckhUTUw7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFNlZSBpZiB3ZSBjYW4gdGFrZSBhIHNob3J0Y3V0IGFuZCBqdXN0IHVzZSBpbm5lckhUTUxcblx0XHRcdGlmICggdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiICYmICFybm9Jbm5lcmh0bWwudGVzdCggdmFsdWUgKSAmJlxuXHRcdFx0XHQhd3JhcE1hcFsgKCBydGFnTmFtZS5leGVjKCB2YWx1ZSApIHx8IFsgXCJcIiwgXCJcIiBdIClbIDEgXS50b0xvd2VyQ2FzZSgpIF0gKSB7XG5cblx0XHRcdFx0dmFsdWUgPSBqUXVlcnkuaHRtbFByZWZpbHRlciggdmFsdWUgKTtcblxuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdGZvciAoIDsgaSA8IGw7IGkrKyApIHtcblx0XHRcdFx0XHRcdGVsZW0gPSB0aGlzWyBpIF0gfHwge307XG5cblx0XHRcdFx0XHRcdC8vIFJlbW92ZSBlbGVtZW50IG5vZGVzIGFuZCBwcmV2ZW50IG1lbW9yeSBsZWFrc1xuXHRcdFx0XHRcdFx0aWYgKCBlbGVtLm5vZGVUeXBlID09PSAxICkge1xuXHRcdFx0XHRcdFx0XHRqUXVlcnkuY2xlYW5EYXRhKCBnZXRBbGwoIGVsZW0sIGZhbHNlICkgKTtcblx0XHRcdFx0XHRcdFx0ZWxlbS5pbm5lckhUTUwgPSB2YWx1ZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRlbGVtID0gMDtcblxuXHRcdFx0XHQvLyBJZiB1c2luZyBpbm5lckhUTUwgdGhyb3dzIGFuIGV4Y2VwdGlvbiwgdXNlIHRoZSBmYWxsYmFjayBtZXRob2Rcblx0XHRcdFx0fSBjYXRjaCAoIGUgKSB7fVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIGVsZW0gKSB7XG5cdFx0XHRcdHRoaXMuZW1wdHkoKS5hcHBlbmQoIHZhbHVlICk7XG5cdFx0XHR9XG5cdFx0fSwgbnVsbCwgdmFsdWUsIGFyZ3VtZW50cy5sZW5ndGggKTtcblx0fSxcblxuXHRyZXBsYWNlV2l0aDogZnVuY3Rpb24oKSB7XG5cdFx0dmFyIGlnbm9yZWQgPSBbXTtcblxuXHRcdC8vIE1ha2UgdGhlIGNoYW5nZXMsIHJlcGxhY2luZyBlYWNoIG5vbi1pZ25vcmVkIGNvbnRleHQgZWxlbWVudCB3aXRoIHRoZSBuZXcgY29udGVudFxuXHRcdHJldHVybiBkb21NYW5pcCggdGhpcywgYXJndW1lbnRzLCBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdHZhciBwYXJlbnQgPSB0aGlzLnBhcmVudE5vZGU7XG5cblx0XHRcdGlmICggalF1ZXJ5LmluQXJyYXkoIHRoaXMsIGlnbm9yZWQgKSA8IDAgKSB7XG5cdFx0XHRcdGpRdWVyeS5jbGVhbkRhdGEoIGdldEFsbCggdGhpcyApICk7XG5cdFx0XHRcdGlmICggcGFyZW50ICkge1xuXHRcdFx0XHRcdHBhcmVudC5yZXBsYWNlQ2hpbGQoIGVsZW0sIHRoaXMgKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0Ly8gRm9yY2UgY2FsbGJhY2sgaW52b2NhdGlvblxuXHRcdH0sIGlnbm9yZWQgKTtcblx0fVxufSApO1xuXG5qUXVlcnkuZWFjaCgge1xuXHRhcHBlbmRUbzogXCJhcHBlbmRcIixcblx0cHJlcGVuZFRvOiBcInByZXBlbmRcIixcblx0aW5zZXJ0QmVmb3JlOiBcImJlZm9yZVwiLFxuXHRpbnNlcnRBZnRlcjogXCJhZnRlclwiLFxuXHRyZXBsYWNlQWxsOiBcInJlcGxhY2VXaXRoXCJcbn0sIGZ1bmN0aW9uKCBuYW1lLCBvcmlnaW5hbCApIHtcblx0alF1ZXJ5LmZuWyBuYW1lIF0gPSBmdW5jdGlvbiggc2VsZWN0b3IgKSB7XG5cdFx0dmFyIGVsZW1zLFxuXHRcdFx0cmV0ID0gW10sXG5cdFx0XHRpbnNlcnQgPSBqUXVlcnkoIHNlbGVjdG9yICksXG5cdFx0XHRsYXN0ID0gaW5zZXJ0Lmxlbmd0aCAtIDEsXG5cdFx0XHRpID0gMDtcblxuXHRcdGZvciAoIDsgaSA8PSBsYXN0OyBpKysgKSB7XG5cdFx0XHRlbGVtcyA9IGkgPT09IGxhc3QgPyB0aGlzIDogdGhpcy5jbG9uZSggdHJ1ZSApO1xuXHRcdFx0alF1ZXJ5KCBpbnNlcnRbIGkgXSApWyBvcmlnaW5hbCBdKCBlbGVtcyApO1xuXG5cdFx0XHQvLyBTdXBwb3J0OiBRdFdlYktpdFxuXHRcdFx0Ly8gLmdldCgpIGJlY2F1c2UgcHVzaC5hcHBseShfLCBhcnJheWxpa2UpIHRocm93c1xuXHRcdFx0cHVzaC5hcHBseSggcmV0LCBlbGVtcy5nZXQoKSApO1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzLnB1c2hTdGFjayggcmV0ICk7XG5cdH07XG59ICk7XG5cblxudmFyIGlmcmFtZSxcblx0ZWxlbWRpc3BsYXkgPSB7XG5cblx0XHQvLyBTdXBwb3J0OiBGaXJlZm94XG5cdFx0Ly8gV2UgaGF2ZSB0byBwcmUtZGVmaW5lIHRoZXNlIHZhbHVlcyBmb3IgRkYgKCMxMDIyNylcblx0XHRIVE1MOiBcImJsb2NrXCIsXG5cdFx0Qk9EWTogXCJibG9ja1wiXG5cdH07XG5cbi8qKlxuICogUmV0cmlldmUgdGhlIGFjdHVhbCBkaXNwbGF5IG9mIGEgZWxlbWVudFxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgbm9kZU5hbWUgb2YgdGhlIGVsZW1lbnRcbiAqIEBwYXJhbSB7T2JqZWN0fSBkb2MgRG9jdW1lbnQgb2JqZWN0XG4gKi9cblxuLy8gQ2FsbGVkIG9ubHkgZnJvbSB3aXRoaW4gZGVmYXVsdERpc3BsYXlcbmZ1bmN0aW9uIGFjdHVhbERpc3BsYXkoIG5hbWUsIGRvYyApIHtcblx0dmFyIGVsZW0gPSBqUXVlcnkoIGRvYy5jcmVhdGVFbGVtZW50KCBuYW1lICkgKS5hcHBlbmRUbyggZG9jLmJvZHkgKSxcblxuXHRcdGRpc3BsYXkgPSBqUXVlcnkuY3NzKCBlbGVtWyAwIF0sIFwiZGlzcGxheVwiICk7XG5cblx0Ly8gV2UgZG9uJ3QgaGF2ZSBhbnkgZGF0YSBzdG9yZWQgb24gdGhlIGVsZW1lbnQsXG5cdC8vIHNvIHVzZSBcImRldGFjaFwiIG1ldGhvZCBhcyBmYXN0IHdheSB0byBnZXQgcmlkIG9mIHRoZSBlbGVtZW50XG5cdGVsZW0uZGV0YWNoKCk7XG5cblx0cmV0dXJuIGRpc3BsYXk7XG59XG5cbi8qKlxuICogVHJ5IHRvIGRldGVybWluZSB0aGUgZGVmYXVsdCBkaXNwbGF5IHZhbHVlIG9mIGFuIGVsZW1lbnRcbiAqIEBwYXJhbSB7U3RyaW5nfSBub2RlTmFtZVxuICovXG5mdW5jdGlvbiBkZWZhdWx0RGlzcGxheSggbm9kZU5hbWUgKSB7XG5cdHZhciBkb2MgPSBkb2N1bWVudCxcblx0XHRkaXNwbGF5ID0gZWxlbWRpc3BsYXlbIG5vZGVOYW1lIF07XG5cblx0aWYgKCAhZGlzcGxheSApIHtcblx0XHRkaXNwbGF5ID0gYWN0dWFsRGlzcGxheSggbm9kZU5hbWUsIGRvYyApO1xuXG5cdFx0Ly8gSWYgdGhlIHNpbXBsZSB3YXkgZmFpbHMsIHJlYWQgZnJvbSBpbnNpZGUgYW4gaWZyYW1lXG5cdFx0aWYgKCBkaXNwbGF5ID09PSBcIm5vbmVcIiB8fCAhZGlzcGxheSApIHtcblxuXHRcdFx0Ly8gVXNlIHRoZSBhbHJlYWR5LWNyZWF0ZWQgaWZyYW1lIGlmIHBvc3NpYmxlXG5cdFx0XHRpZnJhbWUgPSAoIGlmcmFtZSB8fCBqUXVlcnkoIFwiPGlmcmFtZSBmcmFtZWJvcmRlcj0nMCcgd2lkdGg9JzAnIGhlaWdodD0nMCcvPlwiICkgKVxuXHRcdFx0XHQuYXBwZW5kVG8oIGRvYy5kb2N1bWVudEVsZW1lbnQgKTtcblxuXHRcdFx0Ly8gQWx3YXlzIHdyaXRlIGEgbmV3IEhUTUwgc2tlbGV0b24gc28gV2Via2l0IGFuZCBGaXJlZm94IGRvbid0IGNob2tlIG9uIHJldXNlXG5cdFx0XHRkb2MgPSBpZnJhbWVbIDAgXS5jb250ZW50RG9jdW1lbnQ7XG5cblx0XHRcdC8vIFN1cHBvcnQ6IElFXG5cdFx0XHRkb2Mud3JpdGUoKTtcblx0XHRcdGRvYy5jbG9zZSgpO1xuXG5cdFx0XHRkaXNwbGF5ID0gYWN0dWFsRGlzcGxheSggbm9kZU5hbWUsIGRvYyApO1xuXHRcdFx0aWZyYW1lLmRldGFjaCgpO1xuXHRcdH1cblxuXHRcdC8vIFN0b3JlIHRoZSBjb3JyZWN0IGRlZmF1bHQgZGlzcGxheVxuXHRcdGVsZW1kaXNwbGF5WyBub2RlTmFtZSBdID0gZGlzcGxheTtcblx0fVxuXG5cdHJldHVybiBkaXNwbGF5O1xufVxudmFyIHJtYXJnaW4gPSAoIC9ebWFyZ2luLyApO1xuXG52YXIgcm51bW5vbnB4ID0gbmV3IFJlZ0V4cCggXCJeKFwiICsgcG51bSArIFwiKSg/IXB4KVthLXolXSskXCIsIFwiaVwiICk7XG5cbnZhciBnZXRTdHlsZXMgPSBmdW5jdGlvbiggZWxlbSApIHtcblxuXHRcdC8vIFN1cHBvcnQ6IElFPD0xMSssIEZpcmVmb3g8PTMwKyAoIzE1MDk4LCAjMTQxNTApXG5cdFx0Ly8gSUUgdGhyb3dzIG9uIGVsZW1lbnRzIGNyZWF0ZWQgaW4gcG9wdXBzXG5cdFx0Ly8gRkYgbWVhbndoaWxlIHRocm93cyBvbiBmcmFtZSBlbGVtZW50cyB0aHJvdWdoIFwiZGVmYXVsdFZpZXcuZ2V0Q29tcHV0ZWRTdHlsZVwiXG5cdFx0dmFyIHZpZXcgPSBlbGVtLm93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXc7XG5cblx0XHRpZiAoICF2aWV3IHx8ICF2aWV3Lm9wZW5lciApIHtcblx0XHRcdHZpZXcgPSB3aW5kb3c7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHZpZXcuZ2V0Q29tcHV0ZWRTdHlsZSggZWxlbSApO1xuXHR9O1xuXG52YXIgc3dhcCA9IGZ1bmN0aW9uKCBlbGVtLCBvcHRpb25zLCBjYWxsYmFjaywgYXJncyApIHtcblx0dmFyIHJldCwgbmFtZSxcblx0XHRvbGQgPSB7fTtcblxuXHQvLyBSZW1lbWJlciB0aGUgb2xkIHZhbHVlcywgYW5kIGluc2VydCB0aGUgbmV3IG9uZXNcblx0Zm9yICggbmFtZSBpbiBvcHRpb25zICkge1xuXHRcdG9sZFsgbmFtZSBdID0gZWxlbS5zdHlsZVsgbmFtZSBdO1xuXHRcdGVsZW0uc3R5bGVbIG5hbWUgXSA9IG9wdGlvbnNbIG5hbWUgXTtcblx0fVxuXG5cdHJldCA9IGNhbGxiYWNrLmFwcGx5KCBlbGVtLCBhcmdzIHx8IFtdICk7XG5cblx0Ly8gUmV2ZXJ0IHRoZSBvbGQgdmFsdWVzXG5cdGZvciAoIG5hbWUgaW4gb3B0aW9ucyApIHtcblx0XHRlbGVtLnN0eWxlWyBuYW1lIF0gPSBvbGRbIG5hbWUgXTtcblx0fVxuXG5cdHJldHVybiByZXQ7XG59O1xuXG5cbnZhciBkb2N1bWVudEVsZW1lbnQgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG5cblxuXG4oIGZ1bmN0aW9uKCkge1xuXHR2YXIgcGl4ZWxQb3NpdGlvblZhbCwgYm94U2l6aW5nUmVsaWFibGVWYWwsIHBpeGVsTWFyZ2luUmlnaHRWYWwsIHJlbGlhYmxlTWFyZ2luTGVmdFZhbCxcblx0XHRjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcImRpdlwiICksXG5cdFx0ZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggXCJkaXZcIiApO1xuXG5cdC8vIEZpbmlzaCBlYXJseSBpbiBsaW1pdGVkIChub24tYnJvd3NlcikgZW52aXJvbm1lbnRzXG5cdGlmICggIWRpdi5zdHlsZSApIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHQvLyBTdXBwb3J0OiBJRTktMTErXG5cdC8vIFN0eWxlIG9mIGNsb25lZCBlbGVtZW50IGFmZmVjdHMgc291cmNlIGVsZW1lbnQgY2xvbmVkICgjODkwOClcblx0ZGl2LnN0eWxlLmJhY2tncm91bmRDbGlwID0gXCJjb250ZW50LWJveFwiO1xuXHRkaXYuY2xvbmVOb2RlKCB0cnVlICkuc3R5bGUuYmFja2dyb3VuZENsaXAgPSBcIlwiO1xuXHRzdXBwb3J0LmNsZWFyQ2xvbmVTdHlsZSA9IGRpdi5zdHlsZS5iYWNrZ3JvdW5kQ2xpcCA9PT0gXCJjb250ZW50LWJveFwiO1xuXG5cdGNvbnRhaW5lci5zdHlsZS5jc3NUZXh0ID0gXCJib3JkZXI6MDt3aWR0aDo4cHg7aGVpZ2h0OjA7dG9wOjA7bGVmdDotOTk5OXB4O1wiICtcblx0XHRcInBhZGRpbmc6MDttYXJnaW4tdG9wOjFweDtwb3NpdGlvbjphYnNvbHV0ZVwiO1xuXHRjb250YWluZXIuYXBwZW5kQ2hpbGQoIGRpdiApO1xuXG5cdC8vIEV4ZWN1dGluZyBib3RoIHBpeGVsUG9zaXRpb24gJiBib3hTaXppbmdSZWxpYWJsZSB0ZXN0cyByZXF1aXJlIG9ubHkgb25lIGxheW91dFxuXHQvLyBzbyB0aGV5J3JlIGV4ZWN1dGVkIGF0IHRoZSBzYW1lIHRpbWUgdG8gc2F2ZSB0aGUgc2Vjb25kIGNvbXB1dGF0aW9uLlxuXHRmdW5jdGlvbiBjb21wdXRlU3R5bGVUZXN0cygpIHtcblx0XHRkaXYuc3R5bGUuY3NzVGV4dCA9XG5cblx0XHRcdC8vIFN1cHBvcnQ6IEZpcmVmb3g8MjksIEFuZHJvaWQgMi4zXG5cdFx0XHQvLyBWZW5kb3ItcHJlZml4IGJveC1zaXppbmdcblx0XHRcdFwiLXdlYmtpdC1ib3gtc2l6aW5nOmJvcmRlci1ib3g7LW1vei1ib3gtc2l6aW5nOmJvcmRlci1ib3g7Ym94LXNpemluZzpib3JkZXItYm94O1wiICtcblx0XHRcdFwicG9zaXRpb246cmVsYXRpdmU7ZGlzcGxheTpibG9jaztcIiArXG5cdFx0XHRcIm1hcmdpbjphdXRvO2JvcmRlcjoxcHg7cGFkZGluZzoxcHg7XCIgK1xuXHRcdFx0XCJ0b3A6MSU7d2lkdGg6NTAlXCI7XG5cdFx0ZGl2LmlubmVySFRNTCA9IFwiXCI7XG5cdFx0ZG9jdW1lbnRFbGVtZW50LmFwcGVuZENoaWxkKCBjb250YWluZXIgKTtcblxuXHRcdHZhciBkaXZTdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKCBkaXYgKTtcblx0XHRwaXhlbFBvc2l0aW9uVmFsID0gZGl2U3R5bGUudG9wICE9PSBcIjElXCI7XG5cdFx0cmVsaWFibGVNYXJnaW5MZWZ0VmFsID0gZGl2U3R5bGUubWFyZ2luTGVmdCA9PT0gXCIycHhcIjtcblx0XHRib3hTaXppbmdSZWxpYWJsZVZhbCA9IGRpdlN0eWxlLndpZHRoID09PSBcIjRweFwiO1xuXG5cdFx0Ly8gU3VwcG9ydDogQW5kcm9pZCA0LjAgLSA0LjMgb25seVxuXHRcdC8vIFNvbWUgc3R5bGVzIGNvbWUgYmFjayB3aXRoIHBlcmNlbnRhZ2UgdmFsdWVzLCBldmVuIHRob3VnaCB0aGV5IHNob3VsZG4ndFxuXHRcdGRpdi5zdHlsZS5tYXJnaW5SaWdodCA9IFwiNTAlXCI7XG5cdFx0cGl4ZWxNYXJnaW5SaWdodFZhbCA9IGRpdlN0eWxlLm1hcmdpblJpZ2h0ID09PSBcIjRweFwiO1xuXG5cdFx0ZG9jdW1lbnRFbGVtZW50LnJlbW92ZUNoaWxkKCBjb250YWluZXIgKTtcblx0fVxuXG5cdGpRdWVyeS5leHRlbmQoIHN1cHBvcnQsIHtcblx0XHRwaXhlbFBvc2l0aW9uOiBmdW5jdGlvbigpIHtcblxuXHRcdFx0Ly8gVGhpcyB0ZXN0IGlzIGV4ZWN1dGVkIG9ubHkgb25jZSBidXQgd2Ugc3RpbGwgZG8gbWVtb2l6aW5nXG5cdFx0XHQvLyBzaW5jZSB3ZSBjYW4gdXNlIHRoZSBib3hTaXppbmdSZWxpYWJsZSBwcmUtY29tcHV0aW5nLlxuXHRcdFx0Ly8gTm8gbmVlZCB0byBjaGVjayBpZiB0aGUgdGVzdCB3YXMgYWxyZWFkeSBwZXJmb3JtZWQsIHRob3VnaC5cblx0XHRcdGNvbXB1dGVTdHlsZVRlc3RzKCk7XG5cdFx0XHRyZXR1cm4gcGl4ZWxQb3NpdGlvblZhbDtcblx0XHR9LFxuXHRcdGJveFNpemluZ1JlbGlhYmxlOiBmdW5jdGlvbigpIHtcblx0XHRcdGlmICggYm94U2l6aW5nUmVsaWFibGVWYWwgPT0gbnVsbCApIHtcblx0XHRcdFx0Y29tcHV0ZVN0eWxlVGVzdHMoKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBib3hTaXppbmdSZWxpYWJsZVZhbDtcblx0XHR9LFxuXHRcdHBpeGVsTWFyZ2luUmlnaHQ6IGZ1bmN0aW9uKCkge1xuXG5cdFx0XHQvLyBTdXBwb3J0OiBBbmRyb2lkIDQuMC00LjNcblx0XHRcdC8vIFdlJ3JlIGNoZWNraW5nIGZvciBib3hTaXppbmdSZWxpYWJsZVZhbCBoZXJlIGluc3RlYWQgb2YgcGl4ZWxNYXJnaW5SaWdodFZhbFxuXHRcdFx0Ly8gc2luY2UgdGhhdCBjb21wcmVzc2VzIGJldHRlciBhbmQgdGhleSdyZSBjb21wdXRlZCB0b2dldGhlciBhbnl3YXkuXG5cdFx0XHRpZiAoIGJveFNpemluZ1JlbGlhYmxlVmFsID09IG51bGwgKSB7XG5cdFx0XHRcdGNvbXB1dGVTdHlsZVRlc3RzKCk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gcGl4ZWxNYXJnaW5SaWdodFZhbDtcblx0XHR9LFxuXHRcdHJlbGlhYmxlTWFyZ2luTGVmdDogZnVuY3Rpb24oKSB7XG5cblx0XHRcdC8vIFN1cHBvcnQ6IElFIDw9OCBvbmx5LCBBbmRyb2lkIDQuMCAtIDQuMyBvbmx5LCBGaXJlZm94IDw9MyAtIDM3XG5cdFx0XHRpZiAoIGJveFNpemluZ1JlbGlhYmxlVmFsID09IG51bGwgKSB7XG5cdFx0XHRcdGNvbXB1dGVTdHlsZVRlc3RzKCk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gcmVsaWFibGVNYXJnaW5MZWZ0VmFsO1xuXHRcdH0sXG5cdFx0cmVsaWFibGVNYXJnaW5SaWdodDogZnVuY3Rpb24oKSB7XG5cblx0XHRcdC8vIFN1cHBvcnQ6IEFuZHJvaWQgMi4zXG5cdFx0XHQvLyBDaGVjayBpZiBkaXYgd2l0aCBleHBsaWNpdCB3aWR0aCBhbmQgbm8gbWFyZ2luLXJpZ2h0IGluY29ycmVjdGx5XG5cdFx0XHQvLyBnZXRzIGNvbXB1dGVkIG1hcmdpbi1yaWdodCBiYXNlZCBvbiB3aWR0aCBvZiBjb250YWluZXIuICgjMzMzMylcblx0XHRcdC8vIFdlYktpdCBCdWcgMTMzNDMgLSBnZXRDb21wdXRlZFN0eWxlIHJldHVybnMgd3JvbmcgdmFsdWUgZm9yIG1hcmdpbi1yaWdodFxuXHRcdFx0Ly8gVGhpcyBzdXBwb3J0IGZ1bmN0aW9uIGlzIG9ubHkgZXhlY3V0ZWQgb25jZSBzbyBubyBtZW1vaXppbmcgaXMgbmVlZGVkLlxuXHRcdFx0dmFyIHJldCxcblx0XHRcdFx0bWFyZ2luRGl2ID0gZGl2LmFwcGVuZENoaWxkKCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcImRpdlwiICkgKTtcblxuXHRcdFx0Ly8gUmVzZXQgQ1NTOiBib3gtc2l6aW5nOyBkaXNwbGF5OyBtYXJnaW47IGJvcmRlcjsgcGFkZGluZ1xuXHRcdFx0bWFyZ2luRGl2LnN0eWxlLmNzc1RleHQgPSBkaXYuc3R5bGUuY3NzVGV4dCA9XG5cblx0XHRcdFx0Ly8gU3VwcG9ydDogQW5kcm9pZCAyLjNcblx0XHRcdFx0Ly8gVmVuZG9yLXByZWZpeCBib3gtc2l6aW5nXG5cdFx0XHRcdFwiLXdlYmtpdC1ib3gtc2l6aW5nOmNvbnRlbnQtYm94O2JveC1zaXppbmc6Y29udGVudC1ib3g7XCIgK1xuXHRcdFx0XHRcImRpc3BsYXk6YmxvY2s7bWFyZ2luOjA7Ym9yZGVyOjA7cGFkZGluZzowXCI7XG5cdFx0XHRtYXJnaW5EaXYuc3R5bGUubWFyZ2luUmlnaHQgPSBtYXJnaW5EaXYuc3R5bGUud2lkdGggPSBcIjBcIjtcblx0XHRcdGRpdi5zdHlsZS53aWR0aCA9IFwiMXB4XCI7XG5cdFx0XHRkb2N1bWVudEVsZW1lbnQuYXBwZW5kQ2hpbGQoIGNvbnRhaW5lciApO1xuXG5cdFx0XHRyZXQgPSAhcGFyc2VGbG9hdCggd2luZG93LmdldENvbXB1dGVkU3R5bGUoIG1hcmdpbkRpdiApLm1hcmdpblJpZ2h0ICk7XG5cblx0XHRcdGRvY3VtZW50RWxlbWVudC5yZW1vdmVDaGlsZCggY29udGFpbmVyICk7XG5cdFx0XHRkaXYucmVtb3ZlQ2hpbGQoIG1hcmdpbkRpdiApO1xuXG5cdFx0XHRyZXR1cm4gcmV0O1xuXHRcdH1cblx0fSApO1xufSApKCk7XG5cblxuZnVuY3Rpb24gY3VyQ1NTKCBlbGVtLCBuYW1lLCBjb21wdXRlZCApIHtcblx0dmFyIHdpZHRoLCBtaW5XaWR0aCwgbWF4V2lkdGgsIHJldCxcblx0XHRzdHlsZSA9IGVsZW0uc3R5bGU7XG5cblx0Y29tcHV0ZWQgPSBjb21wdXRlZCB8fCBnZXRTdHlsZXMoIGVsZW0gKTtcblx0cmV0ID0gY29tcHV0ZWQgPyBjb21wdXRlZC5nZXRQcm9wZXJ0eVZhbHVlKCBuYW1lICkgfHwgY29tcHV0ZWRbIG5hbWUgXSA6IHVuZGVmaW5lZDtcblxuXHQvLyBTdXBwb3J0OiBPcGVyYSAxMi4xeCBvbmx5XG5cdC8vIEZhbGwgYmFjayB0byBzdHlsZSBldmVuIHdpdGhvdXQgY29tcHV0ZWRcblx0Ly8gY29tcHV0ZWQgaXMgdW5kZWZpbmVkIGZvciBlbGVtcyBvbiBkb2N1bWVudCBmcmFnbWVudHNcblx0aWYgKCAoIHJldCA9PT0gXCJcIiB8fCByZXQgPT09IHVuZGVmaW5lZCApICYmICFqUXVlcnkuY29udGFpbnMoIGVsZW0ub3duZXJEb2N1bWVudCwgZWxlbSApICkge1xuXHRcdHJldCA9IGpRdWVyeS5zdHlsZSggZWxlbSwgbmFtZSApO1xuXHR9XG5cblx0Ly8gU3VwcG9ydDogSUU5XG5cdC8vIGdldFByb3BlcnR5VmFsdWUgaXMgb25seSBuZWVkZWQgZm9yIC5jc3MoJ2ZpbHRlcicpICgjMTI1MzcpXG5cdGlmICggY29tcHV0ZWQgKSB7XG5cblx0XHQvLyBBIHRyaWJ1dGUgdG8gdGhlIFwiYXdlc29tZSBoYWNrIGJ5IERlYW4gRWR3YXJkc1wiXG5cdFx0Ly8gQW5kcm9pZCBCcm93c2VyIHJldHVybnMgcGVyY2VudGFnZSBmb3Igc29tZSB2YWx1ZXMsXG5cdFx0Ly8gYnV0IHdpZHRoIHNlZW1zIHRvIGJlIHJlbGlhYmx5IHBpeGVscy5cblx0XHQvLyBUaGlzIGlzIGFnYWluc3QgdGhlIENTU09NIGRyYWZ0IHNwZWM6XG5cdFx0Ly8gaHR0cDovL2Rldi53My5vcmcvY3Nzd2cvY3Nzb20vI3Jlc29sdmVkLXZhbHVlc1xuXHRcdGlmICggIXN1cHBvcnQucGl4ZWxNYXJnaW5SaWdodCgpICYmIHJudW1ub25weC50ZXN0KCByZXQgKSAmJiBybWFyZ2luLnRlc3QoIG5hbWUgKSApIHtcblxuXHRcdFx0Ly8gUmVtZW1iZXIgdGhlIG9yaWdpbmFsIHZhbHVlc1xuXHRcdFx0d2lkdGggPSBzdHlsZS53aWR0aDtcblx0XHRcdG1pbldpZHRoID0gc3R5bGUubWluV2lkdGg7XG5cdFx0XHRtYXhXaWR0aCA9IHN0eWxlLm1heFdpZHRoO1xuXG5cdFx0XHQvLyBQdXQgaW4gdGhlIG5ldyB2YWx1ZXMgdG8gZ2V0IGEgY29tcHV0ZWQgdmFsdWUgb3V0XG5cdFx0XHRzdHlsZS5taW5XaWR0aCA9IHN0eWxlLm1heFdpZHRoID0gc3R5bGUud2lkdGggPSByZXQ7XG5cdFx0XHRyZXQgPSBjb21wdXRlZC53aWR0aDtcblxuXHRcdFx0Ly8gUmV2ZXJ0IHRoZSBjaGFuZ2VkIHZhbHVlc1xuXHRcdFx0c3R5bGUud2lkdGggPSB3aWR0aDtcblx0XHRcdHN0eWxlLm1pbldpZHRoID0gbWluV2lkdGg7XG5cdFx0XHRzdHlsZS5tYXhXaWR0aCA9IG1heFdpZHRoO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiByZXQgIT09IHVuZGVmaW5lZCA/XG5cblx0XHQvLyBTdXBwb3J0OiBJRTktMTErXG5cdFx0Ly8gSUUgcmV0dXJucyB6SW5kZXggdmFsdWUgYXMgYW4gaW50ZWdlci5cblx0XHRyZXQgKyBcIlwiIDpcblx0XHRyZXQ7XG59XG5cblxuZnVuY3Rpb24gYWRkR2V0SG9va0lmKCBjb25kaXRpb25GbiwgaG9va0ZuICkge1xuXG5cdC8vIERlZmluZSB0aGUgaG9vaywgd2UnbGwgY2hlY2sgb24gdGhlIGZpcnN0IHJ1biBpZiBpdCdzIHJlYWxseSBuZWVkZWQuXG5cdHJldHVybiB7XG5cdFx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHRcdGlmICggY29uZGl0aW9uRm4oKSApIHtcblxuXHRcdFx0XHQvLyBIb29rIG5vdCBuZWVkZWQgKG9yIGl0J3Mgbm90IHBvc3NpYmxlIHRvIHVzZSBpdCBkdWVcblx0XHRcdFx0Ly8gdG8gbWlzc2luZyBkZXBlbmRlbmN5KSwgcmVtb3ZlIGl0LlxuXHRcdFx0XHRkZWxldGUgdGhpcy5nZXQ7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gSG9vayBuZWVkZWQ7IHJlZGVmaW5lIGl0IHNvIHRoYXQgdGhlIHN1cHBvcnQgdGVzdCBpcyBub3QgZXhlY3V0ZWQgYWdhaW4uXG5cdFx0XHRyZXR1cm4gKCB0aGlzLmdldCA9IGhvb2tGbiApLmFwcGx5KCB0aGlzLCBhcmd1bWVudHMgKTtcblx0XHR9XG5cdH07XG59XG5cblxudmFyXG5cblx0Ly8gU3dhcHBhYmxlIGlmIGRpc3BsYXkgaXMgbm9uZSBvciBzdGFydHMgd2l0aCB0YWJsZVxuXHQvLyBleGNlcHQgXCJ0YWJsZVwiLCBcInRhYmxlLWNlbGxcIiwgb3IgXCJ0YWJsZS1jYXB0aW9uXCJcblx0Ly8gU2VlIGhlcmUgZm9yIGRpc3BsYXkgdmFsdWVzOiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL0NTUy9kaXNwbGF5XG5cdHJkaXNwbGF5c3dhcCA9IC9eKG5vbmV8dGFibGUoPyEtY1tlYV0pLispLyxcblxuXHRjc3NTaG93ID0geyBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLCB2aXNpYmlsaXR5OiBcImhpZGRlblwiLCBkaXNwbGF5OiBcImJsb2NrXCIgfSxcblx0Y3NzTm9ybWFsVHJhbnNmb3JtID0ge1xuXHRcdGxldHRlclNwYWNpbmc6IFwiMFwiLFxuXHRcdGZvbnRXZWlnaHQ6IFwiNDAwXCJcblx0fSxcblxuXHRjc3NQcmVmaXhlcyA9IFsgXCJXZWJraXRcIiwgXCJPXCIsIFwiTW96XCIsIFwibXNcIiBdLFxuXHRlbXB0eVN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggXCJkaXZcIiApLnN0eWxlO1xuXG4vLyBSZXR1cm4gYSBjc3MgcHJvcGVydHkgbWFwcGVkIHRvIGEgcG90ZW50aWFsbHkgdmVuZG9yIHByZWZpeGVkIHByb3BlcnR5XG5mdW5jdGlvbiB2ZW5kb3JQcm9wTmFtZSggbmFtZSApIHtcblxuXHQvLyBTaG9ydGN1dCBmb3IgbmFtZXMgdGhhdCBhcmUgbm90IHZlbmRvciBwcmVmaXhlZFxuXHRpZiAoIG5hbWUgaW4gZW1wdHlTdHlsZSApIHtcblx0XHRyZXR1cm4gbmFtZTtcblx0fVxuXG5cdC8vIENoZWNrIGZvciB2ZW5kb3IgcHJlZml4ZWQgbmFtZXNcblx0dmFyIGNhcE5hbWUgPSBuYW1lWyAwIF0udG9VcHBlckNhc2UoKSArIG5hbWUuc2xpY2UoIDEgKSxcblx0XHRpID0gY3NzUHJlZml4ZXMubGVuZ3RoO1xuXG5cdHdoaWxlICggaS0tICkge1xuXHRcdG5hbWUgPSBjc3NQcmVmaXhlc1sgaSBdICsgY2FwTmFtZTtcblx0XHRpZiAoIG5hbWUgaW4gZW1wdHlTdHlsZSApIHtcblx0XHRcdHJldHVybiBuYW1lO1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBzZXRQb3NpdGl2ZU51bWJlciggZWxlbSwgdmFsdWUsIHN1YnRyYWN0ICkge1xuXG5cdC8vIEFueSByZWxhdGl2ZSAoKy8tKSB2YWx1ZXMgaGF2ZSBhbHJlYWR5IGJlZW5cblx0Ly8gbm9ybWFsaXplZCBhdCB0aGlzIHBvaW50XG5cdHZhciBtYXRjaGVzID0gcmNzc051bS5leGVjKCB2YWx1ZSApO1xuXHRyZXR1cm4gbWF0Y2hlcyA/XG5cblx0XHQvLyBHdWFyZCBhZ2FpbnN0IHVuZGVmaW5lZCBcInN1YnRyYWN0XCIsIGUuZy4sIHdoZW4gdXNlZCBhcyBpbiBjc3NIb29rc1xuXHRcdE1hdGgubWF4KCAwLCBtYXRjaGVzWyAyIF0gLSAoIHN1YnRyYWN0IHx8IDAgKSApICsgKCBtYXRjaGVzWyAzIF0gfHwgXCJweFwiICkgOlxuXHRcdHZhbHVlO1xufVxuXG5mdW5jdGlvbiBhdWdtZW50V2lkdGhPckhlaWdodCggZWxlbSwgbmFtZSwgZXh0cmEsIGlzQm9yZGVyQm94LCBzdHlsZXMgKSB7XG5cdHZhciBpID0gZXh0cmEgPT09ICggaXNCb3JkZXJCb3ggPyBcImJvcmRlclwiIDogXCJjb250ZW50XCIgKSA/XG5cblx0XHQvLyBJZiB3ZSBhbHJlYWR5IGhhdmUgdGhlIHJpZ2h0IG1lYXN1cmVtZW50LCBhdm9pZCBhdWdtZW50YXRpb25cblx0XHQ0IDpcblxuXHRcdC8vIE90aGVyd2lzZSBpbml0aWFsaXplIGZvciBob3Jpem9udGFsIG9yIHZlcnRpY2FsIHByb3BlcnRpZXNcblx0XHRuYW1lID09PSBcIndpZHRoXCIgPyAxIDogMCxcblxuXHRcdHZhbCA9IDA7XG5cblx0Zm9yICggOyBpIDwgNDsgaSArPSAyICkge1xuXG5cdFx0Ly8gQm90aCBib3ggbW9kZWxzIGV4Y2x1ZGUgbWFyZ2luLCBzbyBhZGQgaXQgaWYgd2Ugd2FudCBpdFxuXHRcdGlmICggZXh0cmEgPT09IFwibWFyZ2luXCIgKSB7XG5cdFx0XHR2YWwgKz0galF1ZXJ5LmNzcyggZWxlbSwgZXh0cmEgKyBjc3NFeHBhbmRbIGkgXSwgdHJ1ZSwgc3R5bGVzICk7XG5cdFx0fVxuXG5cdFx0aWYgKCBpc0JvcmRlckJveCApIHtcblxuXHRcdFx0Ly8gYm9yZGVyLWJveCBpbmNsdWRlcyBwYWRkaW5nLCBzbyByZW1vdmUgaXQgaWYgd2Ugd2FudCBjb250ZW50XG5cdFx0XHRpZiAoIGV4dHJhID09PSBcImNvbnRlbnRcIiApIHtcblx0XHRcdFx0dmFsIC09IGpRdWVyeS5jc3MoIGVsZW0sIFwicGFkZGluZ1wiICsgY3NzRXhwYW5kWyBpIF0sIHRydWUsIHN0eWxlcyApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBBdCB0aGlzIHBvaW50LCBleHRyYSBpc24ndCBib3JkZXIgbm9yIG1hcmdpbiwgc28gcmVtb3ZlIGJvcmRlclxuXHRcdFx0aWYgKCBleHRyYSAhPT0gXCJtYXJnaW5cIiApIHtcblx0XHRcdFx0dmFsIC09IGpRdWVyeS5jc3MoIGVsZW0sIFwiYm9yZGVyXCIgKyBjc3NFeHBhbmRbIGkgXSArIFwiV2lkdGhcIiwgdHJ1ZSwgc3R5bGVzICk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0Ly8gQXQgdGhpcyBwb2ludCwgZXh0cmEgaXNuJ3QgY29udGVudCwgc28gYWRkIHBhZGRpbmdcblx0XHRcdHZhbCArPSBqUXVlcnkuY3NzKCBlbGVtLCBcInBhZGRpbmdcIiArIGNzc0V4cGFuZFsgaSBdLCB0cnVlLCBzdHlsZXMgKTtcblxuXHRcdFx0Ly8gQXQgdGhpcyBwb2ludCwgZXh0cmEgaXNuJ3QgY29udGVudCBub3IgcGFkZGluZywgc28gYWRkIGJvcmRlclxuXHRcdFx0aWYgKCBleHRyYSAhPT0gXCJwYWRkaW5nXCIgKSB7XG5cdFx0XHRcdHZhbCArPSBqUXVlcnkuY3NzKCBlbGVtLCBcImJvcmRlclwiICsgY3NzRXhwYW5kWyBpIF0gKyBcIldpZHRoXCIsIHRydWUsIHN0eWxlcyApO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiB2YWw7XG59XG5cbmZ1bmN0aW9uIGdldFdpZHRoT3JIZWlnaHQoIGVsZW0sIG5hbWUsIGV4dHJhICkge1xuXG5cdC8vIFN0YXJ0IHdpdGggb2Zmc2V0IHByb3BlcnR5LCB3aGljaCBpcyBlcXVpdmFsZW50IHRvIHRoZSBib3JkZXItYm94IHZhbHVlXG5cdHZhciB2YWx1ZUlzQm9yZGVyQm94ID0gdHJ1ZSxcblx0XHR2YWwgPSBuYW1lID09PSBcIndpZHRoXCIgPyBlbGVtLm9mZnNldFdpZHRoIDogZWxlbS5vZmZzZXRIZWlnaHQsXG5cdFx0c3R5bGVzID0gZ2V0U3R5bGVzKCBlbGVtICksXG5cdFx0aXNCb3JkZXJCb3ggPSBqUXVlcnkuY3NzKCBlbGVtLCBcImJveFNpemluZ1wiLCBmYWxzZSwgc3R5bGVzICkgPT09IFwiYm9yZGVyLWJveFwiO1xuXG5cdC8vIFNvbWUgbm9uLWh0bWwgZWxlbWVudHMgcmV0dXJuIHVuZGVmaW5lZCBmb3Igb2Zmc2V0V2lkdGgsIHNvIGNoZWNrIGZvciBudWxsL3VuZGVmaW5lZFxuXHQvLyBzdmcgLSBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD02NDkyODVcblx0Ly8gTWF0aE1MIC0gaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9NDkxNjY4XG5cdGlmICggdmFsIDw9IDAgfHwgdmFsID09IG51bGwgKSB7XG5cblx0XHQvLyBGYWxsIGJhY2sgdG8gY29tcHV0ZWQgdGhlbiB1bmNvbXB1dGVkIGNzcyBpZiBuZWNlc3Nhcnlcblx0XHR2YWwgPSBjdXJDU1MoIGVsZW0sIG5hbWUsIHN0eWxlcyApO1xuXHRcdGlmICggdmFsIDwgMCB8fCB2YWwgPT0gbnVsbCApIHtcblx0XHRcdHZhbCA9IGVsZW0uc3R5bGVbIG5hbWUgXTtcblx0XHR9XG5cblx0XHQvLyBDb21wdXRlZCB1bml0IGlzIG5vdCBwaXhlbHMuIFN0b3AgaGVyZSBhbmQgcmV0dXJuLlxuXHRcdGlmICggcm51bW5vbnB4LnRlc3QoIHZhbCApICkge1xuXHRcdFx0cmV0dXJuIHZhbDtcblx0XHR9XG5cblx0XHQvLyBDaGVjayBmb3Igc3R5bGUgaW4gY2FzZSBhIGJyb3dzZXIgd2hpY2ggcmV0dXJucyB1bnJlbGlhYmxlIHZhbHVlc1xuXHRcdC8vIGZvciBnZXRDb21wdXRlZFN0eWxlIHNpbGVudGx5IGZhbGxzIGJhY2sgdG8gdGhlIHJlbGlhYmxlIGVsZW0uc3R5bGVcblx0XHR2YWx1ZUlzQm9yZGVyQm94ID0gaXNCb3JkZXJCb3ggJiZcblx0XHRcdCggc3VwcG9ydC5ib3hTaXppbmdSZWxpYWJsZSgpIHx8IHZhbCA9PT0gZWxlbS5zdHlsZVsgbmFtZSBdICk7XG5cblx0XHQvLyBOb3JtYWxpemUgXCJcIiwgYXV0bywgYW5kIHByZXBhcmUgZm9yIGV4dHJhXG5cdFx0dmFsID0gcGFyc2VGbG9hdCggdmFsICkgfHwgMDtcblx0fVxuXG5cdC8vIFVzZSB0aGUgYWN0aXZlIGJveC1zaXppbmcgbW9kZWwgdG8gYWRkL3N1YnRyYWN0IGlycmVsZXZhbnQgc3R5bGVzXG5cdHJldHVybiAoIHZhbCArXG5cdFx0YXVnbWVudFdpZHRoT3JIZWlnaHQoXG5cdFx0XHRlbGVtLFxuXHRcdFx0bmFtZSxcblx0XHRcdGV4dHJhIHx8ICggaXNCb3JkZXJCb3ggPyBcImJvcmRlclwiIDogXCJjb250ZW50XCIgKSxcblx0XHRcdHZhbHVlSXNCb3JkZXJCb3gsXG5cdFx0XHRzdHlsZXNcblx0XHQpXG5cdCkgKyBcInB4XCI7XG59XG5cbmZ1bmN0aW9uIHNob3dIaWRlKCBlbGVtZW50cywgc2hvdyApIHtcblx0dmFyIGRpc3BsYXksIGVsZW0sIGhpZGRlbixcblx0XHR2YWx1ZXMgPSBbXSxcblx0XHRpbmRleCA9IDAsXG5cdFx0bGVuZ3RoID0gZWxlbWVudHMubGVuZ3RoO1xuXG5cdGZvciAoIDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KysgKSB7XG5cdFx0ZWxlbSA9IGVsZW1lbnRzWyBpbmRleCBdO1xuXHRcdGlmICggIWVsZW0uc3R5bGUgKSB7XG5cdFx0XHRjb250aW51ZTtcblx0XHR9XG5cblx0XHR2YWx1ZXNbIGluZGV4IF0gPSBkYXRhUHJpdi5nZXQoIGVsZW0sIFwib2xkZGlzcGxheVwiICk7XG5cdFx0ZGlzcGxheSA9IGVsZW0uc3R5bGUuZGlzcGxheTtcblx0XHRpZiAoIHNob3cgKSB7XG5cblx0XHRcdC8vIFJlc2V0IHRoZSBpbmxpbmUgZGlzcGxheSBvZiB0aGlzIGVsZW1lbnQgdG8gbGVhcm4gaWYgaXQgaXNcblx0XHRcdC8vIGJlaW5nIGhpZGRlbiBieSBjYXNjYWRlZCBydWxlcyBvciBub3Rcblx0XHRcdGlmICggIXZhbHVlc1sgaW5kZXggXSAmJiBkaXNwbGF5ID09PSBcIm5vbmVcIiApIHtcblx0XHRcdFx0ZWxlbS5zdHlsZS5kaXNwbGF5ID0gXCJcIjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gU2V0IGVsZW1lbnRzIHdoaWNoIGhhdmUgYmVlbiBvdmVycmlkZGVuIHdpdGggZGlzcGxheTogbm9uZVxuXHRcdFx0Ly8gaW4gYSBzdHlsZXNoZWV0IHRvIHdoYXRldmVyIHRoZSBkZWZhdWx0IGJyb3dzZXIgc3R5bGUgaXNcblx0XHRcdC8vIGZvciBzdWNoIGFuIGVsZW1lbnRcblx0XHRcdGlmICggZWxlbS5zdHlsZS5kaXNwbGF5ID09PSBcIlwiICYmIGlzSGlkZGVuKCBlbGVtICkgKSB7XG5cdFx0XHRcdHZhbHVlc1sgaW5kZXggXSA9IGRhdGFQcml2LmFjY2Vzcyhcblx0XHRcdFx0XHRlbGVtLFxuXHRcdFx0XHRcdFwib2xkZGlzcGxheVwiLFxuXHRcdFx0XHRcdGRlZmF1bHREaXNwbGF5KCBlbGVtLm5vZGVOYW1lIClcblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0aGlkZGVuID0gaXNIaWRkZW4oIGVsZW0gKTtcblxuXHRcdFx0aWYgKCBkaXNwbGF5ICE9PSBcIm5vbmVcIiB8fCAhaGlkZGVuICkge1xuXHRcdFx0XHRkYXRhUHJpdi5zZXQoXG5cdFx0XHRcdFx0ZWxlbSxcblx0XHRcdFx0XHRcIm9sZGRpc3BsYXlcIixcblx0XHRcdFx0XHRoaWRkZW4gPyBkaXNwbGF5IDogalF1ZXJ5LmNzcyggZWxlbSwgXCJkaXNwbGF5XCIgKVxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8vIFNldCB0aGUgZGlzcGxheSBvZiBtb3N0IG9mIHRoZSBlbGVtZW50cyBpbiBhIHNlY29uZCBsb29wXG5cdC8vIHRvIGF2b2lkIHRoZSBjb25zdGFudCByZWZsb3dcblx0Zm9yICggaW5kZXggPSAwOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKyApIHtcblx0XHRlbGVtID0gZWxlbWVudHNbIGluZGV4IF07XG5cdFx0aWYgKCAhZWxlbS5zdHlsZSApIHtcblx0XHRcdGNvbnRpbnVlO1xuXHRcdH1cblx0XHRpZiAoICFzaG93IHx8IGVsZW0uc3R5bGUuZGlzcGxheSA9PT0gXCJub25lXCIgfHwgZWxlbS5zdHlsZS5kaXNwbGF5ID09PSBcIlwiICkge1xuXHRcdFx0ZWxlbS5zdHlsZS5kaXNwbGF5ID0gc2hvdyA/IHZhbHVlc1sgaW5kZXggXSB8fCBcIlwiIDogXCJub25lXCI7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGVsZW1lbnRzO1xufVxuXG5qUXVlcnkuZXh0ZW5kKCB7XG5cblx0Ly8gQWRkIGluIHN0eWxlIHByb3BlcnR5IGhvb2tzIGZvciBvdmVycmlkaW5nIHRoZSBkZWZhdWx0XG5cdC8vIGJlaGF2aW9yIG9mIGdldHRpbmcgYW5kIHNldHRpbmcgYSBzdHlsZSBwcm9wZXJ0eVxuXHRjc3NIb29rczoge1xuXHRcdG9wYWNpdHk6IHtcblx0XHRcdGdldDogZnVuY3Rpb24oIGVsZW0sIGNvbXB1dGVkICkge1xuXHRcdFx0XHRpZiAoIGNvbXB1dGVkICkge1xuXG5cdFx0XHRcdFx0Ly8gV2Ugc2hvdWxkIGFsd2F5cyBnZXQgYSBudW1iZXIgYmFjayBmcm9tIG9wYWNpdHlcblx0XHRcdFx0XHR2YXIgcmV0ID0gY3VyQ1NTKCBlbGVtLCBcIm9wYWNpdHlcIiApO1xuXHRcdFx0XHRcdHJldHVybiByZXQgPT09IFwiXCIgPyBcIjFcIiA6IHJldDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fSxcblxuXHQvLyBEb24ndCBhdXRvbWF0aWNhbGx5IGFkZCBcInB4XCIgdG8gdGhlc2UgcG9zc2libHktdW5pdGxlc3MgcHJvcGVydGllc1xuXHRjc3NOdW1iZXI6IHtcblx0XHRcImFuaW1hdGlvbkl0ZXJhdGlvbkNvdW50XCI6IHRydWUsXG5cdFx0XCJjb2x1bW5Db3VudFwiOiB0cnVlLFxuXHRcdFwiZmlsbE9wYWNpdHlcIjogdHJ1ZSxcblx0XHRcImZsZXhHcm93XCI6IHRydWUsXG5cdFx0XCJmbGV4U2hyaW5rXCI6IHRydWUsXG5cdFx0XCJmb250V2VpZ2h0XCI6IHRydWUsXG5cdFx0XCJsaW5lSGVpZ2h0XCI6IHRydWUsXG5cdFx0XCJvcGFjaXR5XCI6IHRydWUsXG5cdFx0XCJvcmRlclwiOiB0cnVlLFxuXHRcdFwib3JwaGFuc1wiOiB0cnVlLFxuXHRcdFwid2lkb3dzXCI6IHRydWUsXG5cdFx0XCJ6SW5kZXhcIjogdHJ1ZSxcblx0XHRcInpvb21cIjogdHJ1ZVxuXHR9LFxuXG5cdC8vIEFkZCBpbiBwcm9wZXJ0aWVzIHdob3NlIG5hbWVzIHlvdSB3aXNoIHRvIGZpeCBiZWZvcmVcblx0Ly8gc2V0dGluZyBvciBnZXR0aW5nIHRoZSB2YWx1ZVxuXHRjc3NQcm9wczoge1xuXHRcdFwiZmxvYXRcIjogXCJjc3NGbG9hdFwiXG5cdH0sXG5cblx0Ly8gR2V0IGFuZCBzZXQgdGhlIHN0eWxlIHByb3BlcnR5IG9uIGEgRE9NIE5vZGVcblx0c3R5bGU6IGZ1bmN0aW9uKCBlbGVtLCBuYW1lLCB2YWx1ZSwgZXh0cmEgKSB7XG5cblx0XHQvLyBEb24ndCBzZXQgc3R5bGVzIG9uIHRleHQgYW5kIGNvbW1lbnQgbm9kZXNcblx0XHRpZiAoICFlbGVtIHx8IGVsZW0ubm9kZVR5cGUgPT09IDMgfHwgZWxlbS5ub2RlVHlwZSA9PT0gOCB8fCAhZWxlbS5zdHlsZSApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBNYWtlIHN1cmUgdGhhdCB3ZSdyZSB3b3JraW5nIHdpdGggdGhlIHJpZ2h0IG5hbWVcblx0XHR2YXIgcmV0LCB0eXBlLCBob29rcyxcblx0XHRcdG9yaWdOYW1lID0galF1ZXJ5LmNhbWVsQ2FzZSggbmFtZSApLFxuXHRcdFx0c3R5bGUgPSBlbGVtLnN0eWxlO1xuXG5cdFx0bmFtZSA9IGpRdWVyeS5jc3NQcm9wc1sgb3JpZ05hbWUgXSB8fFxuXHRcdFx0KCBqUXVlcnkuY3NzUHJvcHNbIG9yaWdOYW1lIF0gPSB2ZW5kb3JQcm9wTmFtZSggb3JpZ05hbWUgKSB8fCBvcmlnTmFtZSApO1xuXG5cdFx0Ly8gR2V0cyBob29rIGZvciB0aGUgcHJlZml4ZWQgdmVyc2lvbiwgdGhlbiB1bnByZWZpeGVkIHZlcnNpb25cblx0XHRob29rcyA9IGpRdWVyeS5jc3NIb29rc1sgbmFtZSBdIHx8IGpRdWVyeS5jc3NIb29rc1sgb3JpZ05hbWUgXTtcblxuXHRcdC8vIENoZWNrIGlmIHdlJ3JlIHNldHRpbmcgYSB2YWx1ZVxuXHRcdGlmICggdmFsdWUgIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdHR5cGUgPSB0eXBlb2YgdmFsdWU7XG5cblx0XHRcdC8vIENvbnZlcnQgXCIrPVwiIG9yIFwiLT1cIiB0byByZWxhdGl2ZSBudW1iZXJzICgjNzM0NSlcblx0XHRcdGlmICggdHlwZSA9PT0gXCJzdHJpbmdcIiAmJiAoIHJldCA9IHJjc3NOdW0uZXhlYyggdmFsdWUgKSApICYmIHJldFsgMSBdICkge1xuXHRcdFx0XHR2YWx1ZSA9IGFkanVzdENTUyggZWxlbSwgbmFtZSwgcmV0ICk7XG5cblx0XHRcdFx0Ly8gRml4ZXMgYnVnICM5MjM3XG5cdFx0XHRcdHR5cGUgPSBcIm51bWJlclwiO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBNYWtlIHN1cmUgdGhhdCBudWxsIGFuZCBOYU4gdmFsdWVzIGFyZW4ndCBzZXQgKCM3MTE2KVxuXHRcdFx0aWYgKCB2YWx1ZSA9PSBudWxsIHx8IHZhbHVlICE9PSB2YWx1ZSApIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBJZiBhIG51bWJlciB3YXMgcGFzc2VkIGluLCBhZGQgdGhlIHVuaXQgKGV4Y2VwdCBmb3IgY2VydGFpbiBDU1MgcHJvcGVydGllcylcblx0XHRcdGlmICggdHlwZSA9PT0gXCJudW1iZXJcIiApIHtcblx0XHRcdFx0dmFsdWUgKz0gcmV0ICYmIHJldFsgMyBdIHx8ICggalF1ZXJ5LmNzc051bWJlclsgb3JpZ05hbWUgXSA/IFwiXCIgOiBcInB4XCIgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gU3VwcG9ydDogSUU5LTExK1xuXHRcdFx0Ly8gYmFja2dyb3VuZC0qIHByb3BzIGFmZmVjdCBvcmlnaW5hbCBjbG9uZSdzIHZhbHVlc1xuXHRcdFx0aWYgKCAhc3VwcG9ydC5jbGVhckNsb25lU3R5bGUgJiYgdmFsdWUgPT09IFwiXCIgJiYgbmFtZS5pbmRleE9mKCBcImJhY2tncm91bmRcIiApID09PSAwICkge1xuXHRcdFx0XHRzdHlsZVsgbmFtZSBdID0gXCJpbmhlcml0XCI7XG5cdFx0XHR9XG5cblx0XHRcdC8vIElmIGEgaG9vayB3YXMgcHJvdmlkZWQsIHVzZSB0aGF0IHZhbHVlLCBvdGhlcndpc2UganVzdCBzZXQgdGhlIHNwZWNpZmllZCB2YWx1ZVxuXHRcdFx0aWYgKCAhaG9va3MgfHwgISggXCJzZXRcIiBpbiBob29rcyApIHx8XG5cdFx0XHRcdCggdmFsdWUgPSBob29rcy5zZXQoIGVsZW0sIHZhbHVlLCBleHRyYSApICkgIT09IHVuZGVmaW5lZCApIHtcblxuXHRcdFx0XHRzdHlsZVsgbmFtZSBdID0gdmFsdWU7XG5cdFx0XHR9XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHQvLyBJZiBhIGhvb2sgd2FzIHByb3ZpZGVkIGdldCB0aGUgbm9uLWNvbXB1dGVkIHZhbHVlIGZyb20gdGhlcmVcblx0XHRcdGlmICggaG9va3MgJiYgXCJnZXRcIiBpbiBob29rcyAmJlxuXHRcdFx0XHQoIHJldCA9IGhvb2tzLmdldCggZWxlbSwgZmFsc2UsIGV4dHJhICkgKSAhPT0gdW5kZWZpbmVkICkge1xuXG5cdFx0XHRcdHJldHVybiByZXQ7XG5cdFx0XHR9XG5cblx0XHRcdC8vIE90aGVyd2lzZSBqdXN0IGdldCB0aGUgdmFsdWUgZnJvbSB0aGUgc3R5bGUgb2JqZWN0XG5cdFx0XHRyZXR1cm4gc3R5bGVbIG5hbWUgXTtcblx0XHR9XG5cdH0sXG5cblx0Y3NzOiBmdW5jdGlvbiggZWxlbSwgbmFtZSwgZXh0cmEsIHN0eWxlcyApIHtcblx0XHR2YXIgdmFsLCBudW0sIGhvb2tzLFxuXHRcdFx0b3JpZ05hbWUgPSBqUXVlcnkuY2FtZWxDYXNlKCBuYW1lICk7XG5cblx0XHQvLyBNYWtlIHN1cmUgdGhhdCB3ZSdyZSB3b3JraW5nIHdpdGggdGhlIHJpZ2h0IG5hbWVcblx0XHRuYW1lID0galF1ZXJ5LmNzc1Byb3BzWyBvcmlnTmFtZSBdIHx8XG5cdFx0XHQoIGpRdWVyeS5jc3NQcm9wc1sgb3JpZ05hbWUgXSA9IHZlbmRvclByb3BOYW1lKCBvcmlnTmFtZSApIHx8IG9yaWdOYW1lICk7XG5cblx0XHQvLyBUcnkgcHJlZml4ZWQgbmFtZSBmb2xsb3dlZCBieSB0aGUgdW5wcmVmaXhlZCBuYW1lXG5cdFx0aG9va3MgPSBqUXVlcnkuY3NzSG9va3NbIG5hbWUgXSB8fCBqUXVlcnkuY3NzSG9va3NbIG9yaWdOYW1lIF07XG5cblx0XHQvLyBJZiBhIGhvb2sgd2FzIHByb3ZpZGVkIGdldCB0aGUgY29tcHV0ZWQgdmFsdWUgZnJvbSB0aGVyZVxuXHRcdGlmICggaG9va3MgJiYgXCJnZXRcIiBpbiBob29rcyApIHtcblx0XHRcdHZhbCA9IGhvb2tzLmdldCggZWxlbSwgdHJ1ZSwgZXh0cmEgKTtcblx0XHR9XG5cblx0XHQvLyBPdGhlcndpc2UsIGlmIGEgd2F5IHRvIGdldCB0aGUgY29tcHV0ZWQgdmFsdWUgZXhpc3RzLCB1c2UgdGhhdFxuXHRcdGlmICggdmFsID09PSB1bmRlZmluZWQgKSB7XG5cdFx0XHR2YWwgPSBjdXJDU1MoIGVsZW0sIG5hbWUsIHN0eWxlcyApO1xuXHRcdH1cblxuXHRcdC8vIENvbnZlcnQgXCJub3JtYWxcIiB0byBjb21wdXRlZCB2YWx1ZVxuXHRcdGlmICggdmFsID09PSBcIm5vcm1hbFwiICYmIG5hbWUgaW4gY3NzTm9ybWFsVHJhbnNmb3JtICkge1xuXHRcdFx0dmFsID0gY3NzTm9ybWFsVHJhbnNmb3JtWyBuYW1lIF07XG5cdFx0fVxuXG5cdFx0Ly8gTWFrZSBudW1lcmljIGlmIGZvcmNlZCBvciBhIHF1YWxpZmllciB3YXMgcHJvdmlkZWQgYW5kIHZhbCBsb29rcyBudW1lcmljXG5cdFx0aWYgKCBleHRyYSA9PT0gXCJcIiB8fCBleHRyYSApIHtcblx0XHRcdG51bSA9IHBhcnNlRmxvYXQoIHZhbCApO1xuXHRcdFx0cmV0dXJuIGV4dHJhID09PSB0cnVlIHx8IGlzRmluaXRlKCBudW0gKSA/IG51bSB8fCAwIDogdmFsO1xuXHRcdH1cblx0XHRyZXR1cm4gdmFsO1xuXHR9XG59ICk7XG5cbmpRdWVyeS5lYWNoKCBbIFwiaGVpZ2h0XCIsIFwid2lkdGhcIiBdLCBmdW5jdGlvbiggaSwgbmFtZSApIHtcblx0alF1ZXJ5LmNzc0hvb2tzWyBuYW1lIF0gPSB7XG5cdFx0Z2V0OiBmdW5jdGlvbiggZWxlbSwgY29tcHV0ZWQsIGV4dHJhICkge1xuXHRcdFx0aWYgKCBjb21wdXRlZCApIHtcblxuXHRcdFx0XHQvLyBDZXJ0YWluIGVsZW1lbnRzIGNhbiBoYXZlIGRpbWVuc2lvbiBpbmZvIGlmIHdlIGludmlzaWJseSBzaG93IHRoZW1cblx0XHRcdFx0Ly8gYnV0IGl0IG11c3QgaGF2ZSBhIGN1cnJlbnQgZGlzcGxheSBzdHlsZSB0aGF0IHdvdWxkIGJlbmVmaXRcblx0XHRcdFx0cmV0dXJuIHJkaXNwbGF5c3dhcC50ZXN0KCBqUXVlcnkuY3NzKCBlbGVtLCBcImRpc3BsYXlcIiApICkgJiZcblx0XHRcdFx0XHRlbGVtLm9mZnNldFdpZHRoID09PSAwID9cblx0XHRcdFx0XHRcdHN3YXAoIGVsZW0sIGNzc1Nob3csIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZ2V0V2lkdGhPckhlaWdodCggZWxlbSwgbmFtZSwgZXh0cmEgKTtcblx0XHRcdFx0XHRcdH0gKSA6XG5cdFx0XHRcdFx0XHRnZXRXaWR0aE9ySGVpZ2h0KCBlbGVtLCBuYW1lLCBleHRyYSApO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRzZXQ6IGZ1bmN0aW9uKCBlbGVtLCB2YWx1ZSwgZXh0cmEgKSB7XG5cdFx0XHR2YXIgbWF0Y2hlcyxcblx0XHRcdFx0c3R5bGVzID0gZXh0cmEgJiYgZ2V0U3R5bGVzKCBlbGVtICksXG5cdFx0XHRcdHN1YnRyYWN0ID0gZXh0cmEgJiYgYXVnbWVudFdpZHRoT3JIZWlnaHQoXG5cdFx0XHRcdFx0ZWxlbSxcblx0XHRcdFx0XHRuYW1lLFxuXHRcdFx0XHRcdGV4dHJhLFxuXHRcdFx0XHRcdGpRdWVyeS5jc3MoIGVsZW0sIFwiYm94U2l6aW5nXCIsIGZhbHNlLCBzdHlsZXMgKSA9PT0gXCJib3JkZXItYm94XCIsXG5cdFx0XHRcdFx0c3R5bGVzXG5cdFx0XHRcdCk7XG5cblx0XHRcdC8vIENvbnZlcnQgdG8gcGl4ZWxzIGlmIHZhbHVlIGFkanVzdG1lbnQgaXMgbmVlZGVkXG5cdFx0XHRpZiAoIHN1YnRyYWN0ICYmICggbWF0Y2hlcyA9IHJjc3NOdW0uZXhlYyggdmFsdWUgKSApICYmXG5cdFx0XHRcdCggbWF0Y2hlc1sgMyBdIHx8IFwicHhcIiApICE9PSBcInB4XCIgKSB7XG5cblx0XHRcdFx0ZWxlbS5zdHlsZVsgbmFtZSBdID0gdmFsdWU7XG5cdFx0XHRcdHZhbHVlID0galF1ZXJ5LmNzcyggZWxlbSwgbmFtZSApO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gc2V0UG9zaXRpdmVOdW1iZXIoIGVsZW0sIHZhbHVlLCBzdWJ0cmFjdCApO1xuXHRcdH1cblx0fTtcbn0gKTtcblxualF1ZXJ5LmNzc0hvb2tzLm1hcmdpbkxlZnQgPSBhZGRHZXRIb29rSWYoIHN1cHBvcnQucmVsaWFibGVNYXJnaW5MZWZ0LFxuXHRmdW5jdGlvbiggZWxlbSwgY29tcHV0ZWQgKSB7XG5cdFx0aWYgKCBjb21wdXRlZCApIHtcblx0XHRcdHJldHVybiAoIHBhcnNlRmxvYXQoIGN1ckNTUyggZWxlbSwgXCJtYXJnaW5MZWZ0XCIgKSApIHx8XG5cdFx0XHRcdGVsZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCAtXG5cdFx0XHRcdFx0c3dhcCggZWxlbSwgeyBtYXJnaW5MZWZ0OiAwIH0sIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGVsZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdDtcblx0XHRcdFx0XHR9IClcblx0XHRcdFx0KSArIFwicHhcIjtcblx0XHR9XG5cdH1cbik7XG5cbi8vIFN1cHBvcnQ6IEFuZHJvaWQgMi4zXG5qUXVlcnkuY3NzSG9va3MubWFyZ2luUmlnaHQgPSBhZGRHZXRIb29rSWYoIHN1cHBvcnQucmVsaWFibGVNYXJnaW5SaWdodCxcblx0ZnVuY3Rpb24oIGVsZW0sIGNvbXB1dGVkICkge1xuXHRcdGlmICggY29tcHV0ZWQgKSB7XG5cdFx0XHRyZXR1cm4gc3dhcCggZWxlbSwgeyBcImRpc3BsYXlcIjogXCJpbmxpbmUtYmxvY2tcIiB9LFxuXHRcdFx0XHRjdXJDU1MsIFsgZWxlbSwgXCJtYXJnaW5SaWdodFwiIF0gKTtcblx0XHR9XG5cdH1cbik7XG5cbi8vIFRoZXNlIGhvb2tzIGFyZSB1c2VkIGJ5IGFuaW1hdGUgdG8gZXhwYW5kIHByb3BlcnRpZXNcbmpRdWVyeS5lYWNoKCB7XG5cdG1hcmdpbjogXCJcIixcblx0cGFkZGluZzogXCJcIixcblx0Ym9yZGVyOiBcIldpZHRoXCJcbn0sIGZ1bmN0aW9uKCBwcmVmaXgsIHN1ZmZpeCApIHtcblx0alF1ZXJ5LmNzc0hvb2tzWyBwcmVmaXggKyBzdWZmaXggXSA9IHtcblx0XHRleHBhbmQ6IGZ1bmN0aW9uKCB2YWx1ZSApIHtcblx0XHRcdHZhciBpID0gMCxcblx0XHRcdFx0ZXhwYW5kZWQgPSB7fSxcblxuXHRcdFx0XHQvLyBBc3N1bWVzIGEgc2luZ2xlIG51bWJlciBpZiBub3QgYSBzdHJpbmdcblx0XHRcdFx0cGFydHMgPSB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgPyB2YWx1ZS5zcGxpdCggXCIgXCIgKSA6IFsgdmFsdWUgXTtcblxuXHRcdFx0Zm9yICggOyBpIDwgNDsgaSsrICkge1xuXHRcdFx0XHRleHBhbmRlZFsgcHJlZml4ICsgY3NzRXhwYW5kWyBpIF0gKyBzdWZmaXggXSA9XG5cdFx0XHRcdFx0cGFydHNbIGkgXSB8fCBwYXJ0c1sgaSAtIDIgXSB8fCBwYXJ0c1sgMCBdO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gZXhwYW5kZWQ7XG5cdFx0fVxuXHR9O1xuXG5cdGlmICggIXJtYXJnaW4udGVzdCggcHJlZml4ICkgKSB7XG5cdFx0alF1ZXJ5LmNzc0hvb2tzWyBwcmVmaXggKyBzdWZmaXggXS5zZXQgPSBzZXRQb3NpdGl2ZU51bWJlcjtcblx0fVxufSApO1xuXG5qUXVlcnkuZm4uZXh0ZW5kKCB7XG5cdGNzczogZnVuY3Rpb24oIG5hbWUsIHZhbHVlICkge1xuXHRcdHJldHVybiBhY2Nlc3MoIHRoaXMsIGZ1bmN0aW9uKCBlbGVtLCBuYW1lLCB2YWx1ZSApIHtcblx0XHRcdHZhciBzdHlsZXMsIGxlbixcblx0XHRcdFx0bWFwID0ge30sXG5cdFx0XHRcdGkgPSAwO1xuXG5cdFx0XHRpZiAoIGpRdWVyeS5pc0FycmF5KCBuYW1lICkgKSB7XG5cdFx0XHRcdHN0eWxlcyA9IGdldFN0eWxlcyggZWxlbSApO1xuXHRcdFx0XHRsZW4gPSBuYW1lLmxlbmd0aDtcblxuXHRcdFx0XHRmb3IgKCA7IGkgPCBsZW47IGkrKyApIHtcblx0XHRcdFx0XHRtYXBbIG5hbWVbIGkgXSBdID0galF1ZXJ5LmNzcyggZWxlbSwgbmFtZVsgaSBdLCBmYWxzZSwgc3R5bGVzICk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gbWFwO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCA/XG5cdFx0XHRcdGpRdWVyeS5zdHlsZSggZWxlbSwgbmFtZSwgdmFsdWUgKSA6XG5cdFx0XHRcdGpRdWVyeS5jc3MoIGVsZW0sIG5hbWUgKTtcblx0XHR9LCBuYW1lLCB2YWx1ZSwgYXJndW1lbnRzLmxlbmd0aCA+IDEgKTtcblx0fSxcblx0c2hvdzogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIHNob3dIaWRlKCB0aGlzLCB0cnVlICk7XG5cdH0sXG5cdGhpZGU6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiBzaG93SGlkZSggdGhpcyApO1xuXHR9LFxuXHR0b2dnbGU6IGZ1bmN0aW9uKCBzdGF0ZSApIHtcblx0XHRpZiAoIHR5cGVvZiBzdGF0ZSA9PT0gXCJib29sZWFuXCIgKSB7XG5cdFx0XHRyZXR1cm4gc3RhdGUgPyB0aGlzLnNob3coKSA6IHRoaXMuaGlkZSgpO1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzLmVhY2goIGZ1bmN0aW9uKCkge1xuXHRcdFx0aWYgKCBpc0hpZGRlbiggdGhpcyApICkge1xuXHRcdFx0XHRqUXVlcnkoIHRoaXMgKS5zaG93KCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRqUXVlcnkoIHRoaXMgKS5oaWRlKCk7XG5cdFx0XHR9XG5cdFx0fSApO1xuXHR9XG59ICk7XG5cblxuZnVuY3Rpb24gVHdlZW4oIGVsZW0sIG9wdGlvbnMsIHByb3AsIGVuZCwgZWFzaW5nICkge1xuXHRyZXR1cm4gbmV3IFR3ZWVuLnByb3RvdHlwZS5pbml0KCBlbGVtLCBvcHRpb25zLCBwcm9wLCBlbmQsIGVhc2luZyApO1xufVxualF1ZXJ5LlR3ZWVuID0gVHdlZW47XG5cblR3ZWVuLnByb3RvdHlwZSA9IHtcblx0Y29uc3RydWN0b3I6IFR3ZWVuLFxuXHRpbml0OiBmdW5jdGlvbiggZWxlbSwgb3B0aW9ucywgcHJvcCwgZW5kLCBlYXNpbmcsIHVuaXQgKSB7XG5cdFx0dGhpcy5lbGVtID0gZWxlbTtcblx0XHR0aGlzLnByb3AgPSBwcm9wO1xuXHRcdHRoaXMuZWFzaW5nID0gZWFzaW5nIHx8IGpRdWVyeS5lYXNpbmcuX2RlZmF1bHQ7XG5cdFx0dGhpcy5vcHRpb25zID0gb3B0aW9ucztcblx0XHR0aGlzLnN0YXJ0ID0gdGhpcy5ub3cgPSB0aGlzLmN1cigpO1xuXHRcdHRoaXMuZW5kID0gZW5kO1xuXHRcdHRoaXMudW5pdCA9IHVuaXQgfHwgKCBqUXVlcnkuY3NzTnVtYmVyWyBwcm9wIF0gPyBcIlwiIDogXCJweFwiICk7XG5cdH0sXG5cdGN1cjogZnVuY3Rpb24oKSB7XG5cdFx0dmFyIGhvb2tzID0gVHdlZW4ucHJvcEhvb2tzWyB0aGlzLnByb3AgXTtcblxuXHRcdHJldHVybiBob29rcyAmJiBob29rcy5nZXQgP1xuXHRcdFx0aG9va3MuZ2V0KCB0aGlzICkgOlxuXHRcdFx0VHdlZW4ucHJvcEhvb2tzLl9kZWZhdWx0LmdldCggdGhpcyApO1xuXHR9LFxuXHRydW46IGZ1bmN0aW9uKCBwZXJjZW50ICkge1xuXHRcdHZhciBlYXNlZCxcblx0XHRcdGhvb2tzID0gVHdlZW4ucHJvcEhvb2tzWyB0aGlzLnByb3AgXTtcblxuXHRcdGlmICggdGhpcy5vcHRpb25zLmR1cmF0aW9uICkge1xuXHRcdFx0dGhpcy5wb3MgPSBlYXNlZCA9IGpRdWVyeS5lYXNpbmdbIHRoaXMuZWFzaW5nIF0oXG5cdFx0XHRcdHBlcmNlbnQsIHRoaXMub3B0aW9ucy5kdXJhdGlvbiAqIHBlcmNlbnQsIDAsIDEsIHRoaXMub3B0aW9ucy5kdXJhdGlvblxuXHRcdFx0KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5wb3MgPSBlYXNlZCA9IHBlcmNlbnQ7XG5cdFx0fVxuXHRcdHRoaXMubm93ID0gKCB0aGlzLmVuZCAtIHRoaXMuc3RhcnQgKSAqIGVhc2VkICsgdGhpcy5zdGFydDtcblxuXHRcdGlmICggdGhpcy5vcHRpb25zLnN0ZXAgKSB7XG5cdFx0XHR0aGlzLm9wdGlvbnMuc3RlcC5jYWxsKCB0aGlzLmVsZW0sIHRoaXMubm93LCB0aGlzICk7XG5cdFx0fVxuXG5cdFx0aWYgKCBob29rcyAmJiBob29rcy5zZXQgKSB7XG5cdFx0XHRob29rcy5zZXQoIHRoaXMgKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0VHdlZW4ucHJvcEhvb2tzLl9kZWZhdWx0LnNldCggdGhpcyApO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fVxufTtcblxuVHdlZW4ucHJvdG90eXBlLmluaXQucHJvdG90eXBlID0gVHdlZW4ucHJvdG90eXBlO1xuXG5Ud2Vlbi5wcm9wSG9va3MgPSB7XG5cdF9kZWZhdWx0OiB7XG5cdFx0Z2V0OiBmdW5jdGlvbiggdHdlZW4gKSB7XG5cdFx0XHR2YXIgcmVzdWx0O1xuXG5cdFx0XHQvLyBVc2UgYSBwcm9wZXJ0eSBvbiB0aGUgZWxlbWVudCBkaXJlY3RseSB3aGVuIGl0IGlzIG5vdCBhIERPTSBlbGVtZW50LFxuXHRcdFx0Ly8gb3Igd2hlbiB0aGVyZSBpcyBubyBtYXRjaGluZyBzdHlsZSBwcm9wZXJ0eSB0aGF0IGV4aXN0cy5cblx0XHRcdGlmICggdHdlZW4uZWxlbS5ub2RlVHlwZSAhPT0gMSB8fFxuXHRcdFx0XHR0d2Vlbi5lbGVtWyB0d2Vlbi5wcm9wIF0gIT0gbnVsbCAmJiB0d2Vlbi5lbGVtLnN0eWxlWyB0d2Vlbi5wcm9wIF0gPT0gbnVsbCApIHtcblx0XHRcdFx0cmV0dXJuIHR3ZWVuLmVsZW1bIHR3ZWVuLnByb3AgXTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gUGFzc2luZyBhbiBlbXB0eSBzdHJpbmcgYXMgYSAzcmQgcGFyYW1ldGVyIHRvIC5jc3Mgd2lsbCBhdXRvbWF0aWNhbGx5XG5cdFx0XHQvLyBhdHRlbXB0IGEgcGFyc2VGbG9hdCBhbmQgZmFsbGJhY2sgdG8gYSBzdHJpbmcgaWYgdGhlIHBhcnNlIGZhaWxzLlxuXHRcdFx0Ly8gU2ltcGxlIHZhbHVlcyBzdWNoIGFzIFwiMTBweFwiIGFyZSBwYXJzZWQgdG8gRmxvYXQ7XG5cdFx0XHQvLyBjb21wbGV4IHZhbHVlcyBzdWNoIGFzIFwicm90YXRlKDFyYWQpXCIgYXJlIHJldHVybmVkIGFzLWlzLlxuXHRcdFx0cmVzdWx0ID0galF1ZXJ5LmNzcyggdHdlZW4uZWxlbSwgdHdlZW4ucHJvcCwgXCJcIiApO1xuXG5cdFx0XHQvLyBFbXB0eSBzdHJpbmdzLCBudWxsLCB1bmRlZmluZWQgYW5kIFwiYXV0b1wiIGFyZSBjb252ZXJ0ZWQgdG8gMC5cblx0XHRcdHJldHVybiAhcmVzdWx0IHx8IHJlc3VsdCA9PT0gXCJhdXRvXCIgPyAwIDogcmVzdWx0O1xuXHRcdH0sXG5cdFx0c2V0OiBmdW5jdGlvbiggdHdlZW4gKSB7XG5cblx0XHRcdC8vIFVzZSBzdGVwIGhvb2sgZm9yIGJhY2sgY29tcGF0LlxuXHRcdFx0Ly8gVXNlIGNzc0hvb2sgaWYgaXRzIHRoZXJlLlxuXHRcdFx0Ly8gVXNlIC5zdHlsZSBpZiBhdmFpbGFibGUgYW5kIHVzZSBwbGFpbiBwcm9wZXJ0aWVzIHdoZXJlIGF2YWlsYWJsZS5cblx0XHRcdGlmICggalF1ZXJ5LmZ4LnN0ZXBbIHR3ZWVuLnByb3AgXSApIHtcblx0XHRcdFx0alF1ZXJ5LmZ4LnN0ZXBbIHR3ZWVuLnByb3AgXSggdHdlZW4gKTtcblx0XHRcdH0gZWxzZSBpZiAoIHR3ZWVuLmVsZW0ubm9kZVR5cGUgPT09IDEgJiZcblx0XHRcdFx0KCB0d2Vlbi5lbGVtLnN0eWxlWyBqUXVlcnkuY3NzUHJvcHNbIHR3ZWVuLnByb3AgXSBdICE9IG51bGwgfHxcblx0XHRcdFx0XHRqUXVlcnkuY3NzSG9va3NbIHR3ZWVuLnByb3AgXSApICkge1xuXHRcdFx0XHRqUXVlcnkuc3R5bGUoIHR3ZWVuLmVsZW0sIHR3ZWVuLnByb3AsIHR3ZWVuLm5vdyArIHR3ZWVuLnVuaXQgKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHR3ZWVuLmVsZW1bIHR3ZWVuLnByb3AgXSA9IHR3ZWVuLm5vdztcblx0XHRcdH1cblx0XHR9XG5cdH1cbn07XG5cbi8vIFN1cHBvcnQ6IElFOVxuLy8gUGFuaWMgYmFzZWQgYXBwcm9hY2ggdG8gc2V0dGluZyB0aGluZ3Mgb24gZGlzY29ubmVjdGVkIG5vZGVzXG5Ud2Vlbi5wcm9wSG9va3Muc2Nyb2xsVG9wID0gVHdlZW4ucHJvcEhvb2tzLnNjcm9sbExlZnQgPSB7XG5cdHNldDogZnVuY3Rpb24oIHR3ZWVuICkge1xuXHRcdGlmICggdHdlZW4uZWxlbS5ub2RlVHlwZSAmJiB0d2Vlbi5lbGVtLnBhcmVudE5vZGUgKSB7XG5cdFx0XHR0d2Vlbi5lbGVtWyB0d2Vlbi5wcm9wIF0gPSB0d2Vlbi5ub3c7XG5cdFx0fVxuXHR9XG59O1xuXG5qUXVlcnkuZWFzaW5nID0ge1xuXHRsaW5lYXI6IGZ1bmN0aW9uKCBwICkge1xuXHRcdHJldHVybiBwO1xuXHR9LFxuXHRzd2luZzogZnVuY3Rpb24oIHAgKSB7XG5cdFx0cmV0dXJuIDAuNSAtIE1hdGguY29zKCBwICogTWF0aC5QSSApIC8gMjtcblx0fSxcblx0X2RlZmF1bHQ6IFwic3dpbmdcIlxufTtcblxualF1ZXJ5LmZ4ID0gVHdlZW4ucHJvdG90eXBlLmluaXQ7XG5cbi8vIEJhY2sgQ29tcGF0IDwxLjggZXh0ZW5zaW9uIHBvaW50XG5qUXVlcnkuZnguc3RlcCA9IHt9O1xuXG5cblxuXG52YXJcblx0ZnhOb3csIHRpbWVySWQsXG5cdHJmeHR5cGVzID0gL14oPzp0b2dnbGV8c2hvd3xoaWRlKSQvLFxuXHRycnVuID0gL3F1ZXVlSG9va3MkLztcblxuLy8gQW5pbWF0aW9ucyBjcmVhdGVkIHN5bmNocm9ub3VzbHkgd2lsbCBydW4gc3luY2hyb25vdXNseVxuZnVuY3Rpb24gY3JlYXRlRnhOb3coKSB7XG5cdHdpbmRvdy5zZXRUaW1lb3V0KCBmdW5jdGlvbigpIHtcblx0XHRmeE5vdyA9IHVuZGVmaW5lZDtcblx0fSApO1xuXHRyZXR1cm4gKCBmeE5vdyA9IGpRdWVyeS5ub3coKSApO1xufVxuXG4vLyBHZW5lcmF0ZSBwYXJhbWV0ZXJzIHRvIGNyZWF0ZSBhIHN0YW5kYXJkIGFuaW1hdGlvblxuZnVuY3Rpb24gZ2VuRngoIHR5cGUsIGluY2x1ZGVXaWR0aCApIHtcblx0dmFyIHdoaWNoLFxuXHRcdGkgPSAwLFxuXHRcdGF0dHJzID0geyBoZWlnaHQ6IHR5cGUgfTtcblxuXHQvLyBJZiB3ZSBpbmNsdWRlIHdpZHRoLCBzdGVwIHZhbHVlIGlzIDEgdG8gZG8gYWxsIGNzc0V4cGFuZCB2YWx1ZXMsXG5cdC8vIG90aGVyd2lzZSBzdGVwIHZhbHVlIGlzIDIgdG8gc2tpcCBvdmVyIExlZnQgYW5kIFJpZ2h0XG5cdGluY2x1ZGVXaWR0aCA9IGluY2x1ZGVXaWR0aCA/IDEgOiAwO1xuXHRmb3IgKCA7IGkgPCA0IDsgaSArPSAyIC0gaW5jbHVkZVdpZHRoICkge1xuXHRcdHdoaWNoID0gY3NzRXhwYW5kWyBpIF07XG5cdFx0YXR0cnNbIFwibWFyZ2luXCIgKyB3aGljaCBdID0gYXR0cnNbIFwicGFkZGluZ1wiICsgd2hpY2ggXSA9IHR5cGU7XG5cdH1cblxuXHRpZiAoIGluY2x1ZGVXaWR0aCApIHtcblx0XHRhdHRycy5vcGFjaXR5ID0gYXR0cnMud2lkdGggPSB0eXBlO1xuXHR9XG5cblx0cmV0dXJuIGF0dHJzO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVUd2VlbiggdmFsdWUsIHByb3AsIGFuaW1hdGlvbiApIHtcblx0dmFyIHR3ZWVuLFxuXHRcdGNvbGxlY3Rpb24gPSAoIEFuaW1hdGlvbi50d2VlbmVyc1sgcHJvcCBdIHx8IFtdICkuY29uY2F0KCBBbmltYXRpb24udHdlZW5lcnNbIFwiKlwiIF0gKSxcblx0XHRpbmRleCA9IDAsXG5cdFx0bGVuZ3RoID0gY29sbGVjdGlvbi5sZW5ndGg7XG5cdGZvciAoIDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KysgKSB7XG5cdFx0aWYgKCAoIHR3ZWVuID0gY29sbGVjdGlvblsgaW5kZXggXS5jYWxsKCBhbmltYXRpb24sIHByb3AsIHZhbHVlICkgKSApIHtcblxuXHRcdFx0Ly8gV2UncmUgZG9uZSB3aXRoIHRoaXMgcHJvcGVydHlcblx0XHRcdHJldHVybiB0d2Vlbjtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gZGVmYXVsdFByZWZpbHRlciggZWxlbSwgcHJvcHMsIG9wdHMgKSB7XG5cdC8qIGpzaGludCB2YWxpZHRoaXM6IHRydWUgKi9cblx0dmFyIHByb3AsIHZhbHVlLCB0b2dnbGUsIHR3ZWVuLCBob29rcywgb2xkZmlyZSwgZGlzcGxheSwgY2hlY2tEaXNwbGF5LFxuXHRcdGFuaW0gPSB0aGlzLFxuXHRcdG9yaWcgPSB7fSxcblx0XHRzdHlsZSA9IGVsZW0uc3R5bGUsXG5cdFx0aGlkZGVuID0gZWxlbS5ub2RlVHlwZSAmJiBpc0hpZGRlbiggZWxlbSApLFxuXHRcdGRhdGFTaG93ID0gZGF0YVByaXYuZ2V0KCBlbGVtLCBcImZ4c2hvd1wiICk7XG5cblx0Ly8gSGFuZGxlIHF1ZXVlOiBmYWxzZSBwcm9taXNlc1xuXHRpZiAoICFvcHRzLnF1ZXVlICkge1xuXHRcdGhvb2tzID0galF1ZXJ5Ll9xdWV1ZUhvb2tzKCBlbGVtLCBcImZ4XCIgKTtcblx0XHRpZiAoIGhvb2tzLnVucXVldWVkID09IG51bGwgKSB7XG5cdFx0XHRob29rcy51bnF1ZXVlZCA9IDA7XG5cdFx0XHRvbGRmaXJlID0gaG9va3MuZW1wdHkuZmlyZTtcblx0XHRcdGhvb2tzLmVtcHR5LmZpcmUgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0aWYgKCAhaG9va3MudW5xdWV1ZWQgKSB7XG5cdFx0XHRcdFx0b2xkZmlyZSgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdH1cblx0XHRob29rcy51bnF1ZXVlZCsrO1xuXG5cdFx0YW5pbS5hbHdheXMoIGZ1bmN0aW9uKCkge1xuXG5cdFx0XHQvLyBFbnN1cmUgdGhlIGNvbXBsZXRlIGhhbmRsZXIgaXMgY2FsbGVkIGJlZm9yZSB0aGlzIGNvbXBsZXRlc1xuXHRcdFx0YW5pbS5hbHdheXMoIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRob29rcy51bnF1ZXVlZC0tO1xuXHRcdFx0XHRpZiAoICFqUXVlcnkucXVldWUoIGVsZW0sIFwiZnhcIiApLmxlbmd0aCApIHtcblx0XHRcdFx0XHRob29rcy5lbXB0eS5maXJlKCk7XG5cdFx0XHRcdH1cblx0XHRcdH0gKTtcblx0XHR9ICk7XG5cdH1cblxuXHQvLyBIZWlnaHQvd2lkdGggb3ZlcmZsb3cgcGFzc1xuXHRpZiAoIGVsZW0ubm9kZVR5cGUgPT09IDEgJiYgKCBcImhlaWdodFwiIGluIHByb3BzIHx8IFwid2lkdGhcIiBpbiBwcm9wcyApICkge1xuXG5cdFx0Ly8gTWFrZSBzdXJlIHRoYXQgbm90aGluZyBzbmVha3Mgb3V0XG5cdFx0Ly8gUmVjb3JkIGFsbCAzIG92ZXJmbG93IGF0dHJpYnV0ZXMgYmVjYXVzZSBJRTktMTAgZG8gbm90XG5cdFx0Ly8gY2hhbmdlIHRoZSBvdmVyZmxvdyBhdHRyaWJ1dGUgd2hlbiBvdmVyZmxvd1ggYW5kXG5cdFx0Ly8gb3ZlcmZsb3dZIGFyZSBzZXQgdG8gdGhlIHNhbWUgdmFsdWVcblx0XHRvcHRzLm92ZXJmbG93ID0gWyBzdHlsZS5vdmVyZmxvdywgc3R5bGUub3ZlcmZsb3dYLCBzdHlsZS5vdmVyZmxvd1kgXTtcblxuXHRcdC8vIFNldCBkaXNwbGF5IHByb3BlcnR5IHRvIGlubGluZS1ibG9jayBmb3IgaGVpZ2h0L3dpZHRoXG5cdFx0Ly8gYW5pbWF0aW9ucyBvbiBpbmxpbmUgZWxlbWVudHMgdGhhdCBhcmUgaGF2aW5nIHdpZHRoL2hlaWdodCBhbmltYXRlZFxuXHRcdGRpc3BsYXkgPSBqUXVlcnkuY3NzKCBlbGVtLCBcImRpc3BsYXlcIiApO1xuXG5cdFx0Ly8gVGVzdCBkZWZhdWx0IGRpc3BsYXkgaWYgZGlzcGxheSBpcyBjdXJyZW50bHkgXCJub25lXCJcblx0XHRjaGVja0Rpc3BsYXkgPSBkaXNwbGF5ID09PSBcIm5vbmVcIiA/XG5cdFx0XHRkYXRhUHJpdi5nZXQoIGVsZW0sIFwib2xkZGlzcGxheVwiICkgfHwgZGVmYXVsdERpc3BsYXkoIGVsZW0ubm9kZU5hbWUgKSA6IGRpc3BsYXk7XG5cblx0XHRpZiAoIGNoZWNrRGlzcGxheSA9PT0gXCJpbmxpbmVcIiAmJiBqUXVlcnkuY3NzKCBlbGVtLCBcImZsb2F0XCIgKSA9PT0gXCJub25lXCIgKSB7XG5cdFx0XHRzdHlsZS5kaXNwbGF5ID0gXCJpbmxpbmUtYmxvY2tcIjtcblx0XHR9XG5cdH1cblxuXHRpZiAoIG9wdHMub3ZlcmZsb3cgKSB7XG5cdFx0c3R5bGUub3ZlcmZsb3cgPSBcImhpZGRlblwiO1xuXHRcdGFuaW0uYWx3YXlzKCBmdW5jdGlvbigpIHtcblx0XHRcdHN0eWxlLm92ZXJmbG93ID0gb3B0cy5vdmVyZmxvd1sgMCBdO1xuXHRcdFx0c3R5bGUub3ZlcmZsb3dYID0gb3B0cy5vdmVyZmxvd1sgMSBdO1xuXHRcdFx0c3R5bGUub3ZlcmZsb3dZID0gb3B0cy5vdmVyZmxvd1sgMiBdO1xuXHRcdH0gKTtcblx0fVxuXG5cdC8vIHNob3cvaGlkZSBwYXNzXG5cdGZvciAoIHByb3AgaW4gcHJvcHMgKSB7XG5cdFx0dmFsdWUgPSBwcm9wc1sgcHJvcCBdO1xuXHRcdGlmICggcmZ4dHlwZXMuZXhlYyggdmFsdWUgKSApIHtcblx0XHRcdGRlbGV0ZSBwcm9wc1sgcHJvcCBdO1xuXHRcdFx0dG9nZ2xlID0gdG9nZ2xlIHx8IHZhbHVlID09PSBcInRvZ2dsZVwiO1xuXHRcdFx0aWYgKCB2YWx1ZSA9PT0gKCBoaWRkZW4gPyBcImhpZGVcIiA6IFwic2hvd1wiICkgKSB7XG5cblx0XHRcdFx0Ly8gSWYgdGhlcmUgaXMgZGF0YVNob3cgbGVmdCBvdmVyIGZyb20gYSBzdG9wcGVkIGhpZGUgb3Igc2hvd1xuXHRcdFx0XHQvLyBhbmQgd2UgYXJlIGdvaW5nIHRvIHByb2NlZWQgd2l0aCBzaG93LCB3ZSBzaG91bGQgcHJldGVuZCB0byBiZSBoaWRkZW5cblx0XHRcdFx0aWYgKCB2YWx1ZSA9PT0gXCJzaG93XCIgJiYgZGF0YVNob3cgJiYgZGF0YVNob3dbIHByb3AgXSAhPT0gdW5kZWZpbmVkICkge1xuXHRcdFx0XHRcdGhpZGRlbiA9IHRydWU7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdG9yaWdbIHByb3AgXSA9IGRhdGFTaG93ICYmIGRhdGFTaG93WyBwcm9wIF0gfHwgalF1ZXJ5LnN0eWxlKCBlbGVtLCBwcm9wICk7XG5cblx0XHQvLyBBbnkgbm9uLWZ4IHZhbHVlIHN0b3BzIHVzIGZyb20gcmVzdG9yaW5nIHRoZSBvcmlnaW5hbCBkaXNwbGF5IHZhbHVlXG5cdFx0fSBlbHNlIHtcblx0XHRcdGRpc3BsYXkgPSB1bmRlZmluZWQ7XG5cdFx0fVxuXHR9XG5cblx0aWYgKCAhalF1ZXJ5LmlzRW1wdHlPYmplY3QoIG9yaWcgKSApIHtcblx0XHRpZiAoIGRhdGFTaG93ICkge1xuXHRcdFx0aWYgKCBcImhpZGRlblwiIGluIGRhdGFTaG93ICkge1xuXHRcdFx0XHRoaWRkZW4gPSBkYXRhU2hvdy5oaWRkZW47XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGRhdGFTaG93ID0gZGF0YVByaXYuYWNjZXNzKCBlbGVtLCBcImZ4c2hvd1wiLCB7fSApO1xuXHRcdH1cblxuXHRcdC8vIFN0b3JlIHN0YXRlIGlmIGl0cyB0b2dnbGUgLSBlbmFibGVzIC5zdG9wKCkudG9nZ2xlKCkgdG8gXCJyZXZlcnNlXCJcblx0XHRpZiAoIHRvZ2dsZSApIHtcblx0XHRcdGRhdGFTaG93LmhpZGRlbiA9ICFoaWRkZW47XG5cdFx0fVxuXHRcdGlmICggaGlkZGVuICkge1xuXHRcdFx0alF1ZXJ5KCBlbGVtICkuc2hvdygpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRhbmltLmRvbmUoIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRqUXVlcnkoIGVsZW0gKS5oaWRlKCk7XG5cdFx0XHR9ICk7XG5cdFx0fVxuXHRcdGFuaW0uZG9uZSggZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgcHJvcDtcblxuXHRcdFx0ZGF0YVByaXYucmVtb3ZlKCBlbGVtLCBcImZ4c2hvd1wiICk7XG5cdFx0XHRmb3IgKCBwcm9wIGluIG9yaWcgKSB7XG5cdFx0XHRcdGpRdWVyeS5zdHlsZSggZWxlbSwgcHJvcCwgb3JpZ1sgcHJvcCBdICk7XG5cdFx0XHR9XG5cdFx0fSApO1xuXHRcdGZvciAoIHByb3AgaW4gb3JpZyApIHtcblx0XHRcdHR3ZWVuID0gY3JlYXRlVHdlZW4oIGhpZGRlbiA/IGRhdGFTaG93WyBwcm9wIF0gOiAwLCBwcm9wLCBhbmltICk7XG5cblx0XHRcdGlmICggISggcHJvcCBpbiBkYXRhU2hvdyApICkge1xuXHRcdFx0XHRkYXRhU2hvd1sgcHJvcCBdID0gdHdlZW4uc3RhcnQ7XG5cdFx0XHRcdGlmICggaGlkZGVuICkge1xuXHRcdFx0XHRcdHR3ZWVuLmVuZCA9IHR3ZWVuLnN0YXJ0O1xuXHRcdFx0XHRcdHR3ZWVuLnN0YXJ0ID0gcHJvcCA9PT0gXCJ3aWR0aFwiIHx8IHByb3AgPT09IFwiaGVpZ2h0XCIgPyAxIDogMDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHQvLyBJZiB0aGlzIGlzIGEgbm9vcCBsaWtlIC5oaWRlKCkuaGlkZSgpLCByZXN0b3JlIGFuIG92ZXJ3cml0dGVuIGRpc3BsYXkgdmFsdWVcblx0fSBlbHNlIGlmICggKCBkaXNwbGF5ID09PSBcIm5vbmVcIiA/IGRlZmF1bHREaXNwbGF5KCBlbGVtLm5vZGVOYW1lICkgOiBkaXNwbGF5ICkgPT09IFwiaW5saW5lXCIgKSB7XG5cdFx0c3R5bGUuZGlzcGxheSA9IGRpc3BsYXk7XG5cdH1cbn1cblxuZnVuY3Rpb24gcHJvcEZpbHRlciggcHJvcHMsIHNwZWNpYWxFYXNpbmcgKSB7XG5cdHZhciBpbmRleCwgbmFtZSwgZWFzaW5nLCB2YWx1ZSwgaG9va3M7XG5cblx0Ly8gY2FtZWxDYXNlLCBzcGVjaWFsRWFzaW5nIGFuZCBleHBhbmQgY3NzSG9vayBwYXNzXG5cdGZvciAoIGluZGV4IGluIHByb3BzICkge1xuXHRcdG5hbWUgPSBqUXVlcnkuY2FtZWxDYXNlKCBpbmRleCApO1xuXHRcdGVhc2luZyA9IHNwZWNpYWxFYXNpbmdbIG5hbWUgXTtcblx0XHR2YWx1ZSA9IHByb3BzWyBpbmRleCBdO1xuXHRcdGlmICggalF1ZXJ5LmlzQXJyYXkoIHZhbHVlICkgKSB7XG5cdFx0XHRlYXNpbmcgPSB2YWx1ZVsgMSBdO1xuXHRcdFx0dmFsdWUgPSBwcm9wc1sgaW5kZXggXSA9IHZhbHVlWyAwIF07XG5cdFx0fVxuXG5cdFx0aWYgKCBpbmRleCAhPT0gbmFtZSApIHtcblx0XHRcdHByb3BzWyBuYW1lIF0gPSB2YWx1ZTtcblx0XHRcdGRlbGV0ZSBwcm9wc1sgaW5kZXggXTtcblx0XHR9XG5cblx0XHRob29rcyA9IGpRdWVyeS5jc3NIb29rc1sgbmFtZSBdO1xuXHRcdGlmICggaG9va3MgJiYgXCJleHBhbmRcIiBpbiBob29rcyApIHtcblx0XHRcdHZhbHVlID0gaG9va3MuZXhwYW5kKCB2YWx1ZSApO1xuXHRcdFx0ZGVsZXRlIHByb3BzWyBuYW1lIF07XG5cblx0XHRcdC8vIE5vdCBxdWl0ZSAkLmV4dGVuZCwgdGhpcyB3b24ndCBvdmVyd3JpdGUgZXhpc3Rpbmcga2V5cy5cblx0XHRcdC8vIFJldXNpbmcgJ2luZGV4JyBiZWNhdXNlIHdlIGhhdmUgdGhlIGNvcnJlY3QgXCJuYW1lXCJcblx0XHRcdGZvciAoIGluZGV4IGluIHZhbHVlICkge1xuXHRcdFx0XHRpZiAoICEoIGluZGV4IGluIHByb3BzICkgKSB7XG5cdFx0XHRcdFx0cHJvcHNbIGluZGV4IF0gPSB2YWx1ZVsgaW5kZXggXTtcblx0XHRcdFx0XHRzcGVjaWFsRWFzaW5nWyBpbmRleCBdID0gZWFzaW5nO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdHNwZWNpYWxFYXNpbmdbIG5hbWUgXSA9IGVhc2luZztcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gQW5pbWF0aW9uKCBlbGVtLCBwcm9wZXJ0aWVzLCBvcHRpb25zICkge1xuXHR2YXIgcmVzdWx0LFxuXHRcdHN0b3BwZWQsXG5cdFx0aW5kZXggPSAwLFxuXHRcdGxlbmd0aCA9IEFuaW1hdGlvbi5wcmVmaWx0ZXJzLmxlbmd0aCxcblx0XHRkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLmFsd2F5cyggZnVuY3Rpb24oKSB7XG5cblx0XHRcdC8vIERvbid0IG1hdGNoIGVsZW0gaW4gdGhlIDphbmltYXRlZCBzZWxlY3RvclxuXHRcdFx0ZGVsZXRlIHRpY2suZWxlbTtcblx0XHR9ICksXG5cdFx0dGljayA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0aWYgKCBzdG9wcGVkICkge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0XHR2YXIgY3VycmVudFRpbWUgPSBmeE5vdyB8fCBjcmVhdGVGeE5vdygpLFxuXHRcdFx0XHRyZW1haW5pbmcgPSBNYXRoLm1heCggMCwgYW5pbWF0aW9uLnN0YXJ0VGltZSArIGFuaW1hdGlvbi5kdXJhdGlvbiAtIGN1cnJlbnRUaW1lICksXG5cblx0XHRcdFx0Ly8gU3VwcG9ydDogQW5kcm9pZCAyLjNcblx0XHRcdFx0Ly8gQXJjaGFpYyBjcmFzaCBidWcgd29uJ3QgYWxsb3cgdXMgdG8gdXNlIGAxIC0gKCAwLjUgfHwgMCApYCAoIzEyNDk3KVxuXHRcdFx0XHR0ZW1wID0gcmVtYWluaW5nIC8gYW5pbWF0aW9uLmR1cmF0aW9uIHx8IDAsXG5cdFx0XHRcdHBlcmNlbnQgPSAxIC0gdGVtcCxcblx0XHRcdFx0aW5kZXggPSAwLFxuXHRcdFx0XHRsZW5ndGggPSBhbmltYXRpb24udHdlZW5zLmxlbmd0aDtcblxuXHRcdFx0Zm9yICggOyBpbmRleCA8IGxlbmd0aCA7IGluZGV4KysgKSB7XG5cdFx0XHRcdGFuaW1hdGlvbi50d2VlbnNbIGluZGV4IF0ucnVuKCBwZXJjZW50ICk7XG5cdFx0XHR9XG5cblx0XHRcdGRlZmVycmVkLm5vdGlmeVdpdGgoIGVsZW0sIFsgYW5pbWF0aW9uLCBwZXJjZW50LCByZW1haW5pbmcgXSApO1xuXG5cdFx0XHRpZiAoIHBlcmNlbnQgPCAxICYmIGxlbmd0aCApIHtcblx0XHRcdFx0cmV0dXJuIHJlbWFpbmluZztcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGRlZmVycmVkLnJlc29sdmVXaXRoKCBlbGVtLCBbIGFuaW1hdGlvbiBdICk7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHR9LFxuXHRcdGFuaW1hdGlvbiA9IGRlZmVycmVkLnByb21pc2UoIHtcblx0XHRcdGVsZW06IGVsZW0sXG5cdFx0XHRwcm9wczogalF1ZXJ5LmV4dGVuZCgge30sIHByb3BlcnRpZXMgKSxcblx0XHRcdG9wdHM6IGpRdWVyeS5leHRlbmQoIHRydWUsIHtcblx0XHRcdFx0c3BlY2lhbEVhc2luZzoge30sXG5cdFx0XHRcdGVhc2luZzogalF1ZXJ5LmVhc2luZy5fZGVmYXVsdFxuXHRcdFx0fSwgb3B0aW9ucyApLFxuXHRcdFx0b3JpZ2luYWxQcm9wZXJ0aWVzOiBwcm9wZXJ0aWVzLFxuXHRcdFx0b3JpZ2luYWxPcHRpb25zOiBvcHRpb25zLFxuXHRcdFx0c3RhcnRUaW1lOiBmeE5vdyB8fCBjcmVhdGVGeE5vdygpLFxuXHRcdFx0ZHVyYXRpb246IG9wdGlvbnMuZHVyYXRpb24sXG5cdFx0XHR0d2VlbnM6IFtdLFxuXHRcdFx0Y3JlYXRlVHdlZW46IGZ1bmN0aW9uKCBwcm9wLCBlbmQgKSB7XG5cdFx0XHRcdHZhciB0d2VlbiA9IGpRdWVyeS5Ud2VlbiggZWxlbSwgYW5pbWF0aW9uLm9wdHMsIHByb3AsIGVuZCxcblx0XHRcdFx0XHRcdGFuaW1hdGlvbi5vcHRzLnNwZWNpYWxFYXNpbmdbIHByb3AgXSB8fCBhbmltYXRpb24ub3B0cy5lYXNpbmcgKTtcblx0XHRcdFx0YW5pbWF0aW9uLnR3ZWVucy5wdXNoKCB0d2VlbiApO1xuXHRcdFx0XHRyZXR1cm4gdHdlZW47XG5cdFx0XHR9LFxuXHRcdFx0c3RvcDogZnVuY3Rpb24oIGdvdG9FbmQgKSB7XG5cdFx0XHRcdHZhciBpbmRleCA9IDAsXG5cblx0XHRcdFx0XHQvLyBJZiB3ZSBhcmUgZ29pbmcgdG8gdGhlIGVuZCwgd2Ugd2FudCB0byBydW4gYWxsIHRoZSB0d2VlbnNcblx0XHRcdFx0XHQvLyBvdGhlcndpc2Ugd2Ugc2tpcCB0aGlzIHBhcnRcblx0XHRcdFx0XHRsZW5ndGggPSBnb3RvRW5kID8gYW5pbWF0aW9uLnR3ZWVucy5sZW5ndGggOiAwO1xuXHRcdFx0XHRpZiAoIHN0b3BwZWQgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHRcdH1cblx0XHRcdFx0c3RvcHBlZCA9IHRydWU7XG5cdFx0XHRcdGZvciAoIDsgaW5kZXggPCBsZW5ndGggOyBpbmRleCsrICkge1xuXHRcdFx0XHRcdGFuaW1hdGlvbi50d2VlbnNbIGluZGV4IF0ucnVuKCAxICk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBSZXNvbHZlIHdoZW4gd2UgcGxheWVkIHRoZSBsYXN0IGZyYW1lOyBvdGhlcndpc2UsIHJlamVjdFxuXHRcdFx0XHRpZiAoIGdvdG9FbmQgKSB7XG5cdFx0XHRcdFx0ZGVmZXJyZWQubm90aWZ5V2l0aCggZWxlbSwgWyBhbmltYXRpb24sIDEsIDAgXSApO1xuXHRcdFx0XHRcdGRlZmVycmVkLnJlc29sdmVXaXRoKCBlbGVtLCBbIGFuaW1hdGlvbiwgZ290b0VuZCBdICk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0ZGVmZXJyZWQucmVqZWN0V2l0aCggZWxlbSwgWyBhbmltYXRpb24sIGdvdG9FbmQgXSApO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0fVxuXHRcdH0gKSxcblx0XHRwcm9wcyA9IGFuaW1hdGlvbi5wcm9wcztcblxuXHRwcm9wRmlsdGVyKCBwcm9wcywgYW5pbWF0aW9uLm9wdHMuc3BlY2lhbEVhc2luZyApO1xuXG5cdGZvciAoIDsgaW5kZXggPCBsZW5ndGggOyBpbmRleCsrICkge1xuXHRcdHJlc3VsdCA9IEFuaW1hdGlvbi5wcmVmaWx0ZXJzWyBpbmRleCBdLmNhbGwoIGFuaW1hdGlvbiwgZWxlbSwgcHJvcHMsIGFuaW1hdGlvbi5vcHRzICk7XG5cdFx0aWYgKCByZXN1bHQgKSB7XG5cdFx0XHRpZiAoIGpRdWVyeS5pc0Z1bmN0aW9uKCByZXN1bHQuc3RvcCApICkge1xuXHRcdFx0XHRqUXVlcnkuX3F1ZXVlSG9va3MoIGFuaW1hdGlvbi5lbGVtLCBhbmltYXRpb24ub3B0cy5xdWV1ZSApLnN0b3AgPVxuXHRcdFx0XHRcdGpRdWVyeS5wcm94eSggcmVzdWx0LnN0b3AsIHJlc3VsdCApO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9XG5cdH1cblxuXHRqUXVlcnkubWFwKCBwcm9wcywgY3JlYXRlVHdlZW4sIGFuaW1hdGlvbiApO1xuXG5cdGlmICggalF1ZXJ5LmlzRnVuY3Rpb24oIGFuaW1hdGlvbi5vcHRzLnN0YXJ0ICkgKSB7XG5cdFx0YW5pbWF0aW9uLm9wdHMuc3RhcnQuY2FsbCggZWxlbSwgYW5pbWF0aW9uICk7XG5cdH1cblxuXHRqUXVlcnkuZngudGltZXIoXG5cdFx0alF1ZXJ5LmV4dGVuZCggdGljaywge1xuXHRcdFx0ZWxlbTogZWxlbSxcblx0XHRcdGFuaW06IGFuaW1hdGlvbixcblx0XHRcdHF1ZXVlOiBhbmltYXRpb24ub3B0cy5xdWV1ZVxuXHRcdH0gKVxuXHQpO1xuXG5cdC8vIGF0dGFjaCBjYWxsYmFja3MgZnJvbSBvcHRpb25zXG5cdHJldHVybiBhbmltYXRpb24ucHJvZ3Jlc3MoIGFuaW1hdGlvbi5vcHRzLnByb2dyZXNzIClcblx0XHQuZG9uZSggYW5pbWF0aW9uLm9wdHMuZG9uZSwgYW5pbWF0aW9uLm9wdHMuY29tcGxldGUgKVxuXHRcdC5mYWlsKCBhbmltYXRpb24ub3B0cy5mYWlsIClcblx0XHQuYWx3YXlzKCBhbmltYXRpb24ub3B0cy5hbHdheXMgKTtcbn1cblxualF1ZXJ5LkFuaW1hdGlvbiA9IGpRdWVyeS5leHRlbmQoIEFuaW1hdGlvbiwge1xuXHR0d2VlbmVyczoge1xuXHRcdFwiKlwiOiBbIGZ1bmN0aW9uKCBwcm9wLCB2YWx1ZSApIHtcblx0XHRcdHZhciB0d2VlbiA9IHRoaXMuY3JlYXRlVHdlZW4oIHByb3AsIHZhbHVlICk7XG5cdFx0XHRhZGp1c3RDU1MoIHR3ZWVuLmVsZW0sIHByb3AsIHJjc3NOdW0uZXhlYyggdmFsdWUgKSwgdHdlZW4gKTtcblx0XHRcdHJldHVybiB0d2Vlbjtcblx0XHR9IF1cblx0fSxcblxuXHR0d2VlbmVyOiBmdW5jdGlvbiggcHJvcHMsIGNhbGxiYWNrICkge1xuXHRcdGlmICggalF1ZXJ5LmlzRnVuY3Rpb24oIHByb3BzICkgKSB7XG5cdFx0XHRjYWxsYmFjayA9IHByb3BzO1xuXHRcdFx0cHJvcHMgPSBbIFwiKlwiIF07XG5cdFx0fSBlbHNlIHtcblx0XHRcdHByb3BzID0gcHJvcHMubWF0Y2goIHJub3R3aGl0ZSApO1xuXHRcdH1cblxuXHRcdHZhciBwcm9wLFxuXHRcdFx0aW5kZXggPSAwLFxuXHRcdFx0bGVuZ3RoID0gcHJvcHMubGVuZ3RoO1xuXG5cdFx0Zm9yICggOyBpbmRleCA8IGxlbmd0aCA7IGluZGV4KysgKSB7XG5cdFx0XHRwcm9wID0gcHJvcHNbIGluZGV4IF07XG5cdFx0XHRBbmltYXRpb24udHdlZW5lcnNbIHByb3AgXSA9IEFuaW1hdGlvbi50d2VlbmVyc1sgcHJvcCBdIHx8IFtdO1xuXHRcdFx0QW5pbWF0aW9uLnR3ZWVuZXJzWyBwcm9wIF0udW5zaGlmdCggY2FsbGJhY2sgKTtcblx0XHR9XG5cdH0sXG5cblx0cHJlZmlsdGVyczogWyBkZWZhdWx0UHJlZmlsdGVyIF0sXG5cblx0cHJlZmlsdGVyOiBmdW5jdGlvbiggY2FsbGJhY2ssIHByZXBlbmQgKSB7XG5cdFx0aWYgKCBwcmVwZW5kICkge1xuXHRcdFx0QW5pbWF0aW9uLnByZWZpbHRlcnMudW5zaGlmdCggY2FsbGJhY2sgKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0QW5pbWF0aW9uLnByZWZpbHRlcnMucHVzaCggY2FsbGJhY2sgKTtcblx0XHR9XG5cdH1cbn0gKTtcblxualF1ZXJ5LnNwZWVkID0gZnVuY3Rpb24oIHNwZWVkLCBlYXNpbmcsIGZuICkge1xuXHR2YXIgb3B0ID0gc3BlZWQgJiYgdHlwZW9mIHNwZWVkID09PSBcIm9iamVjdFwiID8galF1ZXJ5LmV4dGVuZCgge30sIHNwZWVkICkgOiB7XG5cdFx0Y29tcGxldGU6IGZuIHx8ICFmbiAmJiBlYXNpbmcgfHxcblx0XHRcdGpRdWVyeS5pc0Z1bmN0aW9uKCBzcGVlZCApICYmIHNwZWVkLFxuXHRcdGR1cmF0aW9uOiBzcGVlZCxcblx0XHRlYXNpbmc6IGZuICYmIGVhc2luZyB8fCBlYXNpbmcgJiYgIWpRdWVyeS5pc0Z1bmN0aW9uKCBlYXNpbmcgKSAmJiBlYXNpbmdcblx0fTtcblxuXHRvcHQuZHVyYXRpb24gPSBqUXVlcnkuZngub2ZmID8gMCA6IHR5cGVvZiBvcHQuZHVyYXRpb24gPT09IFwibnVtYmVyXCIgP1xuXHRcdG9wdC5kdXJhdGlvbiA6IG9wdC5kdXJhdGlvbiBpbiBqUXVlcnkuZnguc3BlZWRzID9cblx0XHRcdGpRdWVyeS5meC5zcGVlZHNbIG9wdC5kdXJhdGlvbiBdIDogalF1ZXJ5LmZ4LnNwZWVkcy5fZGVmYXVsdDtcblxuXHQvLyBOb3JtYWxpemUgb3B0LnF1ZXVlIC0gdHJ1ZS91bmRlZmluZWQvbnVsbCAtPiBcImZ4XCJcblx0aWYgKCBvcHQucXVldWUgPT0gbnVsbCB8fCBvcHQucXVldWUgPT09IHRydWUgKSB7XG5cdFx0b3B0LnF1ZXVlID0gXCJmeFwiO1xuXHR9XG5cblx0Ly8gUXVldWVpbmdcblx0b3B0Lm9sZCA9IG9wdC5jb21wbGV0ZTtcblxuXHRvcHQuY29tcGxldGUgPSBmdW5jdGlvbigpIHtcblx0XHRpZiAoIGpRdWVyeS5pc0Z1bmN0aW9uKCBvcHQub2xkICkgKSB7XG5cdFx0XHRvcHQub2xkLmNhbGwoIHRoaXMgKTtcblx0XHR9XG5cblx0XHRpZiAoIG9wdC5xdWV1ZSApIHtcblx0XHRcdGpRdWVyeS5kZXF1ZXVlKCB0aGlzLCBvcHQucXVldWUgKTtcblx0XHR9XG5cdH07XG5cblx0cmV0dXJuIG9wdDtcbn07XG5cbmpRdWVyeS5mbi5leHRlbmQoIHtcblx0ZmFkZVRvOiBmdW5jdGlvbiggc3BlZWQsIHRvLCBlYXNpbmcsIGNhbGxiYWNrICkge1xuXG5cdFx0Ly8gU2hvdyBhbnkgaGlkZGVuIGVsZW1lbnRzIGFmdGVyIHNldHRpbmcgb3BhY2l0eSB0byAwXG5cdFx0cmV0dXJuIHRoaXMuZmlsdGVyKCBpc0hpZGRlbiApLmNzcyggXCJvcGFjaXR5XCIsIDAgKS5zaG93KClcblxuXHRcdFx0Ly8gQW5pbWF0ZSB0byB0aGUgdmFsdWUgc3BlY2lmaWVkXG5cdFx0XHQuZW5kKCkuYW5pbWF0ZSggeyBvcGFjaXR5OiB0byB9LCBzcGVlZCwgZWFzaW5nLCBjYWxsYmFjayApO1xuXHR9LFxuXHRhbmltYXRlOiBmdW5jdGlvbiggcHJvcCwgc3BlZWQsIGVhc2luZywgY2FsbGJhY2sgKSB7XG5cdFx0dmFyIGVtcHR5ID0galF1ZXJ5LmlzRW1wdHlPYmplY3QoIHByb3AgKSxcblx0XHRcdG9wdGFsbCA9IGpRdWVyeS5zcGVlZCggc3BlZWQsIGVhc2luZywgY2FsbGJhY2sgKSxcblx0XHRcdGRvQW5pbWF0aW9uID0gZnVuY3Rpb24oKSB7XG5cblx0XHRcdFx0Ly8gT3BlcmF0ZSBvbiBhIGNvcHkgb2YgcHJvcCBzbyBwZXItcHJvcGVydHkgZWFzaW5nIHdvbid0IGJlIGxvc3Rcblx0XHRcdFx0dmFyIGFuaW0gPSBBbmltYXRpb24oIHRoaXMsIGpRdWVyeS5leHRlbmQoIHt9LCBwcm9wICksIG9wdGFsbCApO1xuXG5cdFx0XHRcdC8vIEVtcHR5IGFuaW1hdGlvbnMsIG9yIGZpbmlzaGluZyByZXNvbHZlcyBpbW1lZGlhdGVseVxuXHRcdFx0XHRpZiAoIGVtcHR5IHx8IGRhdGFQcml2LmdldCggdGhpcywgXCJmaW5pc2hcIiApICkge1xuXHRcdFx0XHRcdGFuaW0uc3RvcCggdHJ1ZSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdFx0ZG9BbmltYXRpb24uZmluaXNoID0gZG9BbmltYXRpb247XG5cblx0XHRyZXR1cm4gZW1wdHkgfHwgb3B0YWxsLnF1ZXVlID09PSBmYWxzZSA/XG5cdFx0XHR0aGlzLmVhY2goIGRvQW5pbWF0aW9uICkgOlxuXHRcdFx0dGhpcy5xdWV1ZSggb3B0YWxsLnF1ZXVlLCBkb0FuaW1hdGlvbiApO1xuXHR9LFxuXHRzdG9wOiBmdW5jdGlvbiggdHlwZSwgY2xlYXJRdWV1ZSwgZ290b0VuZCApIHtcblx0XHR2YXIgc3RvcFF1ZXVlID0gZnVuY3Rpb24oIGhvb2tzICkge1xuXHRcdFx0dmFyIHN0b3AgPSBob29rcy5zdG9wO1xuXHRcdFx0ZGVsZXRlIGhvb2tzLnN0b3A7XG5cdFx0XHRzdG9wKCBnb3RvRW5kICk7XG5cdFx0fTtcblxuXHRcdGlmICggdHlwZW9mIHR5cGUgIT09IFwic3RyaW5nXCIgKSB7XG5cdFx0XHRnb3RvRW5kID0gY2xlYXJRdWV1ZTtcblx0XHRcdGNsZWFyUXVldWUgPSB0eXBlO1xuXHRcdFx0dHlwZSA9IHVuZGVmaW5lZDtcblx0XHR9XG5cdFx0aWYgKCBjbGVhclF1ZXVlICYmIHR5cGUgIT09IGZhbHNlICkge1xuXHRcdFx0dGhpcy5xdWV1ZSggdHlwZSB8fCBcImZ4XCIsIFtdICk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXMuZWFjaCggZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgZGVxdWV1ZSA9IHRydWUsXG5cdFx0XHRcdGluZGV4ID0gdHlwZSAhPSBudWxsICYmIHR5cGUgKyBcInF1ZXVlSG9va3NcIixcblx0XHRcdFx0dGltZXJzID0galF1ZXJ5LnRpbWVycyxcblx0XHRcdFx0ZGF0YSA9IGRhdGFQcml2LmdldCggdGhpcyApO1xuXG5cdFx0XHRpZiAoIGluZGV4ICkge1xuXHRcdFx0XHRpZiAoIGRhdGFbIGluZGV4IF0gJiYgZGF0YVsgaW5kZXggXS5zdG9wICkge1xuXHRcdFx0XHRcdHN0b3BRdWV1ZSggZGF0YVsgaW5kZXggXSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmb3IgKCBpbmRleCBpbiBkYXRhICkge1xuXHRcdFx0XHRcdGlmICggZGF0YVsgaW5kZXggXSAmJiBkYXRhWyBpbmRleCBdLnN0b3AgJiYgcnJ1bi50ZXN0KCBpbmRleCApICkge1xuXHRcdFx0XHRcdFx0c3RvcFF1ZXVlKCBkYXRhWyBpbmRleCBdICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGZvciAoIGluZGV4ID0gdGltZXJzLmxlbmd0aDsgaW5kZXgtLTsgKSB7XG5cdFx0XHRcdGlmICggdGltZXJzWyBpbmRleCBdLmVsZW0gPT09IHRoaXMgJiZcblx0XHRcdFx0XHQoIHR5cGUgPT0gbnVsbCB8fCB0aW1lcnNbIGluZGV4IF0ucXVldWUgPT09IHR5cGUgKSApIHtcblxuXHRcdFx0XHRcdHRpbWVyc1sgaW5kZXggXS5hbmltLnN0b3AoIGdvdG9FbmQgKTtcblx0XHRcdFx0XHRkZXF1ZXVlID0gZmFsc2U7XG5cdFx0XHRcdFx0dGltZXJzLnNwbGljZSggaW5kZXgsIDEgKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBTdGFydCB0aGUgbmV4dCBpbiB0aGUgcXVldWUgaWYgdGhlIGxhc3Qgc3RlcCB3YXNuJ3QgZm9yY2VkLlxuXHRcdFx0Ly8gVGltZXJzIGN1cnJlbnRseSB3aWxsIGNhbGwgdGhlaXIgY29tcGxldGUgY2FsbGJhY2tzLCB3aGljaFxuXHRcdFx0Ly8gd2lsbCBkZXF1ZXVlIGJ1dCBvbmx5IGlmIHRoZXkgd2VyZSBnb3RvRW5kLlxuXHRcdFx0aWYgKCBkZXF1ZXVlIHx8ICFnb3RvRW5kICkge1xuXHRcdFx0XHRqUXVlcnkuZGVxdWV1ZSggdGhpcywgdHlwZSApO1xuXHRcdFx0fVxuXHRcdH0gKTtcblx0fSxcblx0ZmluaXNoOiBmdW5jdGlvbiggdHlwZSApIHtcblx0XHRpZiAoIHR5cGUgIT09IGZhbHNlICkge1xuXHRcdFx0dHlwZSA9IHR5cGUgfHwgXCJmeFwiO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5lYWNoKCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBpbmRleCxcblx0XHRcdFx0ZGF0YSA9IGRhdGFQcml2LmdldCggdGhpcyApLFxuXHRcdFx0XHRxdWV1ZSA9IGRhdGFbIHR5cGUgKyBcInF1ZXVlXCIgXSxcblx0XHRcdFx0aG9va3MgPSBkYXRhWyB0eXBlICsgXCJxdWV1ZUhvb2tzXCIgXSxcblx0XHRcdFx0dGltZXJzID0galF1ZXJ5LnRpbWVycyxcblx0XHRcdFx0bGVuZ3RoID0gcXVldWUgPyBxdWV1ZS5sZW5ndGggOiAwO1xuXG5cdFx0XHQvLyBFbmFibGUgZmluaXNoaW5nIGZsYWcgb24gcHJpdmF0ZSBkYXRhXG5cdFx0XHRkYXRhLmZpbmlzaCA9IHRydWU7XG5cblx0XHRcdC8vIEVtcHR5IHRoZSBxdWV1ZSBmaXJzdFxuXHRcdFx0alF1ZXJ5LnF1ZXVlKCB0aGlzLCB0eXBlLCBbXSApO1xuXG5cdFx0XHRpZiAoIGhvb2tzICYmIGhvb2tzLnN0b3AgKSB7XG5cdFx0XHRcdGhvb2tzLnN0b3AuY2FsbCggdGhpcywgdHJ1ZSApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBMb29rIGZvciBhbnkgYWN0aXZlIGFuaW1hdGlvbnMsIGFuZCBmaW5pc2ggdGhlbVxuXHRcdFx0Zm9yICggaW5kZXggPSB0aW1lcnMubGVuZ3RoOyBpbmRleC0tOyApIHtcblx0XHRcdFx0aWYgKCB0aW1lcnNbIGluZGV4IF0uZWxlbSA9PT0gdGhpcyAmJiB0aW1lcnNbIGluZGV4IF0ucXVldWUgPT09IHR5cGUgKSB7XG5cdFx0XHRcdFx0dGltZXJzWyBpbmRleCBdLmFuaW0uc3RvcCggdHJ1ZSApO1xuXHRcdFx0XHRcdHRpbWVycy5zcGxpY2UoIGluZGV4LCAxICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gTG9vayBmb3IgYW55IGFuaW1hdGlvbnMgaW4gdGhlIG9sZCBxdWV1ZSBhbmQgZmluaXNoIHRoZW1cblx0XHRcdGZvciAoIGluZGV4ID0gMDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KysgKSB7XG5cdFx0XHRcdGlmICggcXVldWVbIGluZGV4IF0gJiYgcXVldWVbIGluZGV4IF0uZmluaXNoICkge1xuXHRcdFx0XHRcdHF1ZXVlWyBpbmRleCBdLmZpbmlzaC5jYWxsKCB0aGlzICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gVHVybiBvZmYgZmluaXNoaW5nIGZsYWdcblx0XHRcdGRlbGV0ZSBkYXRhLmZpbmlzaDtcblx0XHR9ICk7XG5cdH1cbn0gKTtcblxualF1ZXJ5LmVhY2goIFsgXCJ0b2dnbGVcIiwgXCJzaG93XCIsIFwiaGlkZVwiIF0sIGZ1bmN0aW9uKCBpLCBuYW1lICkge1xuXHR2YXIgY3NzRm4gPSBqUXVlcnkuZm5bIG5hbWUgXTtcblx0alF1ZXJ5LmZuWyBuYW1lIF0gPSBmdW5jdGlvbiggc3BlZWQsIGVhc2luZywgY2FsbGJhY2sgKSB7XG5cdFx0cmV0dXJuIHNwZWVkID09IG51bGwgfHwgdHlwZW9mIHNwZWVkID09PSBcImJvb2xlYW5cIiA/XG5cdFx0XHRjc3NGbi5hcHBseSggdGhpcywgYXJndW1lbnRzICkgOlxuXHRcdFx0dGhpcy5hbmltYXRlKCBnZW5GeCggbmFtZSwgdHJ1ZSApLCBzcGVlZCwgZWFzaW5nLCBjYWxsYmFjayApO1xuXHR9O1xufSApO1xuXG4vLyBHZW5lcmF0ZSBzaG9ydGN1dHMgZm9yIGN1c3RvbSBhbmltYXRpb25zXG5qUXVlcnkuZWFjaCgge1xuXHRzbGlkZURvd246IGdlbkZ4KCBcInNob3dcIiApLFxuXHRzbGlkZVVwOiBnZW5GeCggXCJoaWRlXCIgKSxcblx0c2xpZGVUb2dnbGU6IGdlbkZ4KCBcInRvZ2dsZVwiICksXG5cdGZhZGVJbjogeyBvcGFjaXR5OiBcInNob3dcIiB9LFxuXHRmYWRlT3V0OiB7IG9wYWNpdHk6IFwiaGlkZVwiIH0sXG5cdGZhZGVUb2dnbGU6IHsgb3BhY2l0eTogXCJ0b2dnbGVcIiB9XG59LCBmdW5jdGlvbiggbmFtZSwgcHJvcHMgKSB7XG5cdGpRdWVyeS5mblsgbmFtZSBdID0gZnVuY3Rpb24oIHNwZWVkLCBlYXNpbmcsIGNhbGxiYWNrICkge1xuXHRcdHJldHVybiB0aGlzLmFuaW1hdGUoIHByb3BzLCBzcGVlZCwgZWFzaW5nLCBjYWxsYmFjayApO1xuXHR9O1xufSApO1xuXG5qUXVlcnkudGltZXJzID0gW107XG5qUXVlcnkuZngudGljayA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgdGltZXIsXG5cdFx0aSA9IDAsXG5cdFx0dGltZXJzID0galF1ZXJ5LnRpbWVycztcblxuXHRmeE5vdyA9IGpRdWVyeS5ub3coKTtcblxuXHRmb3IgKCA7IGkgPCB0aW1lcnMubGVuZ3RoOyBpKysgKSB7XG5cdFx0dGltZXIgPSB0aW1lcnNbIGkgXTtcblxuXHRcdC8vIENoZWNrcyB0aGUgdGltZXIgaGFzIG5vdCBhbHJlYWR5IGJlZW4gcmVtb3ZlZFxuXHRcdGlmICggIXRpbWVyKCkgJiYgdGltZXJzWyBpIF0gPT09IHRpbWVyICkge1xuXHRcdFx0dGltZXJzLnNwbGljZSggaS0tLCAxICk7XG5cdFx0fVxuXHR9XG5cblx0aWYgKCAhdGltZXJzLmxlbmd0aCApIHtcblx0XHRqUXVlcnkuZnguc3RvcCgpO1xuXHR9XG5cdGZ4Tm93ID0gdW5kZWZpbmVkO1xufTtcblxualF1ZXJ5LmZ4LnRpbWVyID0gZnVuY3Rpb24oIHRpbWVyICkge1xuXHRqUXVlcnkudGltZXJzLnB1c2goIHRpbWVyICk7XG5cdGlmICggdGltZXIoKSApIHtcblx0XHRqUXVlcnkuZnguc3RhcnQoKTtcblx0fSBlbHNlIHtcblx0XHRqUXVlcnkudGltZXJzLnBvcCgpO1xuXHR9XG59O1xuXG5qUXVlcnkuZnguaW50ZXJ2YWwgPSAxMztcbmpRdWVyeS5meC5zdGFydCA9IGZ1bmN0aW9uKCkge1xuXHRpZiAoICF0aW1lcklkICkge1xuXHRcdHRpbWVySWQgPSB3aW5kb3cuc2V0SW50ZXJ2YWwoIGpRdWVyeS5meC50aWNrLCBqUXVlcnkuZnguaW50ZXJ2YWwgKTtcblx0fVxufTtcblxualF1ZXJ5LmZ4LnN0b3AgPSBmdW5jdGlvbigpIHtcblx0d2luZG93LmNsZWFySW50ZXJ2YWwoIHRpbWVySWQgKTtcblxuXHR0aW1lcklkID0gbnVsbDtcbn07XG5cbmpRdWVyeS5meC5zcGVlZHMgPSB7XG5cdHNsb3c6IDYwMCxcblx0ZmFzdDogMjAwLFxuXG5cdC8vIERlZmF1bHQgc3BlZWRcblx0X2RlZmF1bHQ6IDQwMFxufTtcblxuXG4vLyBCYXNlZCBvZmYgb2YgdGhlIHBsdWdpbiBieSBDbGludCBIZWxmZXJzLCB3aXRoIHBlcm1pc3Npb24uXG4vLyBodHRwOi8vd2ViLmFyY2hpdmUub3JnL3dlYi8yMDEwMDMyNDAxNDc0Ny9odHRwOi8vYmxpbmRzaWduYWxzLmNvbS9pbmRleC5waHAvMjAwOS8wNy9qcXVlcnktZGVsYXkvXG5qUXVlcnkuZm4uZGVsYXkgPSBmdW5jdGlvbiggdGltZSwgdHlwZSApIHtcblx0dGltZSA9IGpRdWVyeS5meCA/IGpRdWVyeS5meC5zcGVlZHNbIHRpbWUgXSB8fCB0aW1lIDogdGltZTtcblx0dHlwZSA9IHR5cGUgfHwgXCJmeFwiO1xuXG5cdHJldHVybiB0aGlzLnF1ZXVlKCB0eXBlLCBmdW5jdGlvbiggbmV4dCwgaG9va3MgKSB7XG5cdFx0dmFyIHRpbWVvdXQgPSB3aW5kb3cuc2V0VGltZW91dCggbmV4dCwgdGltZSApO1xuXHRcdGhvb2tzLnN0b3AgPSBmdW5jdGlvbigpIHtcblx0XHRcdHdpbmRvdy5jbGVhclRpbWVvdXQoIHRpbWVvdXQgKTtcblx0XHR9O1xuXHR9ICk7XG59O1xuXG5cbiggZnVuY3Rpb24oKSB7XG5cdHZhciBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwiaW5wdXRcIiApLFxuXHRcdHNlbGVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwic2VsZWN0XCIgKSxcblx0XHRvcHQgPSBzZWxlY3QuYXBwZW5kQ2hpbGQoIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwib3B0aW9uXCIgKSApO1xuXG5cdGlucHV0LnR5cGUgPSBcImNoZWNrYm94XCI7XG5cblx0Ly8gU3VwcG9ydDogaU9TPD01LjEsIEFuZHJvaWQ8PTQuMitcblx0Ly8gRGVmYXVsdCB2YWx1ZSBmb3IgYSBjaGVja2JveCBzaG91bGQgYmUgXCJvblwiXG5cdHN1cHBvcnQuY2hlY2tPbiA9IGlucHV0LnZhbHVlICE9PSBcIlwiO1xuXG5cdC8vIFN1cHBvcnQ6IElFPD0xMStcblx0Ly8gTXVzdCBhY2Nlc3Mgc2VsZWN0ZWRJbmRleCB0byBtYWtlIGRlZmF1bHQgb3B0aW9ucyBzZWxlY3Rcblx0c3VwcG9ydC5vcHRTZWxlY3RlZCA9IG9wdC5zZWxlY3RlZDtcblxuXHQvLyBTdXBwb3J0OiBBbmRyb2lkPD0yLjNcblx0Ly8gT3B0aW9ucyBpbnNpZGUgZGlzYWJsZWQgc2VsZWN0cyBhcmUgaW5jb3JyZWN0bHkgbWFya2VkIGFzIGRpc2FibGVkXG5cdHNlbGVjdC5kaXNhYmxlZCA9IHRydWU7XG5cdHN1cHBvcnQub3B0RGlzYWJsZWQgPSAhb3B0LmRpc2FibGVkO1xuXG5cdC8vIFN1cHBvcnQ6IElFPD0xMStcblx0Ly8gQW4gaW5wdXQgbG9zZXMgaXRzIHZhbHVlIGFmdGVyIGJlY29taW5nIGEgcmFkaW9cblx0aW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcImlucHV0XCIgKTtcblx0aW5wdXQudmFsdWUgPSBcInRcIjtcblx0aW5wdXQudHlwZSA9IFwicmFkaW9cIjtcblx0c3VwcG9ydC5yYWRpb1ZhbHVlID0gaW5wdXQudmFsdWUgPT09IFwidFwiO1xufSApKCk7XG5cblxudmFyIGJvb2xIb29rLFxuXHRhdHRySGFuZGxlID0galF1ZXJ5LmV4cHIuYXR0ckhhbmRsZTtcblxualF1ZXJ5LmZuLmV4dGVuZCgge1xuXHRhdHRyOiBmdW5jdGlvbiggbmFtZSwgdmFsdWUgKSB7XG5cdFx0cmV0dXJuIGFjY2VzcyggdGhpcywgalF1ZXJ5LmF0dHIsIG5hbWUsIHZhbHVlLCBhcmd1bWVudHMubGVuZ3RoID4gMSApO1xuXHR9LFxuXG5cdHJlbW92ZUF0dHI6IGZ1bmN0aW9uKCBuYW1lICkge1xuXHRcdHJldHVybiB0aGlzLmVhY2goIGZ1bmN0aW9uKCkge1xuXHRcdFx0alF1ZXJ5LnJlbW92ZUF0dHIoIHRoaXMsIG5hbWUgKTtcblx0XHR9ICk7XG5cdH1cbn0gKTtcblxualF1ZXJ5LmV4dGVuZCgge1xuXHRhdHRyOiBmdW5jdGlvbiggZWxlbSwgbmFtZSwgdmFsdWUgKSB7XG5cdFx0dmFyIHJldCwgaG9va3MsXG5cdFx0XHRuVHlwZSA9IGVsZW0ubm9kZVR5cGU7XG5cblx0XHQvLyBEb24ndCBnZXQvc2V0IGF0dHJpYnV0ZXMgb24gdGV4dCwgY29tbWVudCBhbmQgYXR0cmlidXRlIG5vZGVzXG5cdFx0aWYgKCBuVHlwZSA9PT0gMyB8fCBuVHlwZSA9PT0gOCB8fCBuVHlwZSA9PT0gMiApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBGYWxsYmFjayB0byBwcm9wIHdoZW4gYXR0cmlidXRlcyBhcmUgbm90IHN1cHBvcnRlZFxuXHRcdGlmICggdHlwZW9mIGVsZW0uZ2V0QXR0cmlidXRlID09PSBcInVuZGVmaW5lZFwiICkge1xuXHRcdFx0cmV0dXJuIGpRdWVyeS5wcm9wKCBlbGVtLCBuYW1lLCB2YWx1ZSApO1xuXHRcdH1cblxuXHRcdC8vIEFsbCBhdHRyaWJ1dGVzIGFyZSBsb3dlcmNhc2Vcblx0XHQvLyBHcmFiIG5lY2Vzc2FyeSBob29rIGlmIG9uZSBpcyBkZWZpbmVkXG5cdFx0aWYgKCBuVHlwZSAhPT0gMSB8fCAhalF1ZXJ5LmlzWE1MRG9jKCBlbGVtICkgKSB7XG5cdFx0XHRuYW1lID0gbmFtZS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0aG9va3MgPSBqUXVlcnkuYXR0ckhvb2tzWyBuYW1lIF0gfHxcblx0XHRcdFx0KCBqUXVlcnkuZXhwci5tYXRjaC5ib29sLnRlc3QoIG5hbWUgKSA/IGJvb2xIb29rIDogdW5kZWZpbmVkICk7XG5cdFx0fVxuXG5cdFx0aWYgKCB2YWx1ZSAhPT0gdW5kZWZpbmVkICkge1xuXHRcdFx0aWYgKCB2YWx1ZSA9PT0gbnVsbCApIHtcblx0XHRcdFx0alF1ZXJ5LnJlbW92ZUF0dHIoIGVsZW0sIG5hbWUgKTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIGhvb2tzICYmIFwic2V0XCIgaW4gaG9va3MgJiZcblx0XHRcdFx0KCByZXQgPSBob29rcy5zZXQoIGVsZW0sIHZhbHVlLCBuYW1lICkgKSAhPT0gdW5kZWZpbmVkICkge1xuXHRcdFx0XHRyZXR1cm4gcmV0O1xuXHRcdFx0fVxuXG5cdFx0XHRlbGVtLnNldEF0dHJpYnV0ZSggbmFtZSwgdmFsdWUgKyBcIlwiICk7XG5cdFx0XHRyZXR1cm4gdmFsdWU7XG5cdFx0fVxuXG5cdFx0aWYgKCBob29rcyAmJiBcImdldFwiIGluIGhvb2tzICYmICggcmV0ID0gaG9va3MuZ2V0KCBlbGVtLCBuYW1lICkgKSAhPT0gbnVsbCApIHtcblx0XHRcdHJldHVybiByZXQ7XG5cdFx0fVxuXG5cdFx0cmV0ID0galF1ZXJ5LmZpbmQuYXR0ciggZWxlbSwgbmFtZSApO1xuXG5cdFx0Ly8gTm9uLWV4aXN0ZW50IGF0dHJpYnV0ZXMgcmV0dXJuIG51bGwsIHdlIG5vcm1hbGl6ZSB0byB1bmRlZmluZWRcblx0XHRyZXR1cm4gcmV0ID09IG51bGwgPyB1bmRlZmluZWQgOiByZXQ7XG5cdH0sXG5cblx0YXR0ckhvb2tzOiB7XG5cdFx0dHlwZToge1xuXHRcdFx0c2V0OiBmdW5jdGlvbiggZWxlbSwgdmFsdWUgKSB7XG5cdFx0XHRcdGlmICggIXN1cHBvcnQucmFkaW9WYWx1ZSAmJiB2YWx1ZSA9PT0gXCJyYWRpb1wiICYmXG5cdFx0XHRcdFx0alF1ZXJ5Lm5vZGVOYW1lKCBlbGVtLCBcImlucHV0XCIgKSApIHtcblx0XHRcdFx0XHR2YXIgdmFsID0gZWxlbS52YWx1ZTtcblx0XHRcdFx0XHRlbGVtLnNldEF0dHJpYnV0ZSggXCJ0eXBlXCIsIHZhbHVlICk7XG5cdFx0XHRcdFx0aWYgKCB2YWwgKSB7XG5cdFx0XHRcdFx0XHRlbGVtLnZhbHVlID0gdmFsO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gdmFsdWU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cblx0cmVtb3ZlQXR0cjogZnVuY3Rpb24oIGVsZW0sIHZhbHVlICkge1xuXHRcdHZhciBuYW1lLCBwcm9wTmFtZSxcblx0XHRcdGkgPSAwLFxuXHRcdFx0YXR0ck5hbWVzID0gdmFsdWUgJiYgdmFsdWUubWF0Y2goIHJub3R3aGl0ZSApO1xuXG5cdFx0aWYgKCBhdHRyTmFtZXMgJiYgZWxlbS5ub2RlVHlwZSA9PT0gMSApIHtcblx0XHRcdHdoaWxlICggKCBuYW1lID0gYXR0ck5hbWVzWyBpKysgXSApICkge1xuXHRcdFx0XHRwcm9wTmFtZSA9IGpRdWVyeS5wcm9wRml4WyBuYW1lIF0gfHwgbmFtZTtcblxuXHRcdFx0XHQvLyBCb29sZWFuIGF0dHJpYnV0ZXMgZ2V0IHNwZWNpYWwgdHJlYXRtZW50ICgjMTA4NzApXG5cdFx0XHRcdGlmICggalF1ZXJ5LmV4cHIubWF0Y2guYm9vbC50ZXN0KCBuYW1lICkgKSB7XG5cblx0XHRcdFx0XHQvLyBTZXQgY29ycmVzcG9uZGluZyBwcm9wZXJ0eSB0byBmYWxzZVxuXHRcdFx0XHRcdGVsZW1bIHByb3BOYW1lIF0gPSBmYWxzZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGVsZW0ucmVtb3ZlQXR0cmlidXRlKCBuYW1lICk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59ICk7XG5cbi8vIEhvb2tzIGZvciBib29sZWFuIGF0dHJpYnV0ZXNcbmJvb2xIb29rID0ge1xuXHRzZXQ6IGZ1bmN0aW9uKCBlbGVtLCB2YWx1ZSwgbmFtZSApIHtcblx0XHRpZiAoIHZhbHVlID09PSBmYWxzZSApIHtcblxuXHRcdFx0Ly8gUmVtb3ZlIGJvb2xlYW4gYXR0cmlidXRlcyB3aGVuIHNldCB0byBmYWxzZVxuXHRcdFx0alF1ZXJ5LnJlbW92ZUF0dHIoIGVsZW0sIG5hbWUgKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZWxlbS5zZXRBdHRyaWJ1dGUoIG5hbWUsIG5hbWUgKTtcblx0XHR9XG5cdFx0cmV0dXJuIG5hbWU7XG5cdH1cbn07XG5qUXVlcnkuZWFjaCggalF1ZXJ5LmV4cHIubWF0Y2guYm9vbC5zb3VyY2UubWF0Y2goIC9cXHcrL2cgKSwgZnVuY3Rpb24oIGksIG5hbWUgKSB7XG5cdHZhciBnZXR0ZXIgPSBhdHRySGFuZGxlWyBuYW1lIF0gfHwgalF1ZXJ5LmZpbmQuYXR0cjtcblxuXHRhdHRySGFuZGxlWyBuYW1lIF0gPSBmdW5jdGlvbiggZWxlbSwgbmFtZSwgaXNYTUwgKSB7XG5cdFx0dmFyIHJldCwgaGFuZGxlO1xuXHRcdGlmICggIWlzWE1MICkge1xuXG5cdFx0XHQvLyBBdm9pZCBhbiBpbmZpbml0ZSBsb29wIGJ5IHRlbXBvcmFyaWx5IHJlbW92aW5nIHRoaXMgZnVuY3Rpb24gZnJvbSB0aGUgZ2V0dGVyXG5cdFx0XHRoYW5kbGUgPSBhdHRySGFuZGxlWyBuYW1lIF07XG5cdFx0XHRhdHRySGFuZGxlWyBuYW1lIF0gPSByZXQ7XG5cdFx0XHRyZXQgPSBnZXR0ZXIoIGVsZW0sIG5hbWUsIGlzWE1MICkgIT0gbnVsbCA/XG5cdFx0XHRcdG5hbWUudG9Mb3dlckNhc2UoKSA6XG5cdFx0XHRcdG51bGw7XG5cdFx0XHRhdHRySGFuZGxlWyBuYW1lIF0gPSBoYW5kbGU7XG5cdFx0fVxuXHRcdHJldHVybiByZXQ7XG5cdH07XG59ICk7XG5cblxuXG5cbnZhciByZm9jdXNhYmxlID0gL14oPzppbnB1dHxzZWxlY3R8dGV4dGFyZWF8YnV0dG9uKSQvaSxcblx0cmNsaWNrYWJsZSA9IC9eKD86YXxhcmVhKSQvaTtcblxualF1ZXJ5LmZuLmV4dGVuZCgge1xuXHRwcm9wOiBmdW5jdGlvbiggbmFtZSwgdmFsdWUgKSB7XG5cdFx0cmV0dXJuIGFjY2VzcyggdGhpcywgalF1ZXJ5LnByb3AsIG5hbWUsIHZhbHVlLCBhcmd1bWVudHMubGVuZ3RoID4gMSApO1xuXHR9LFxuXG5cdHJlbW92ZVByb3A6IGZ1bmN0aW9uKCBuYW1lICkge1xuXHRcdHJldHVybiB0aGlzLmVhY2goIGZ1bmN0aW9uKCkge1xuXHRcdFx0ZGVsZXRlIHRoaXNbIGpRdWVyeS5wcm9wRml4WyBuYW1lIF0gfHwgbmFtZSBdO1xuXHRcdH0gKTtcblx0fVxufSApO1xuXG5qUXVlcnkuZXh0ZW5kKCB7XG5cdHByb3A6IGZ1bmN0aW9uKCBlbGVtLCBuYW1lLCB2YWx1ZSApIHtcblx0XHR2YXIgcmV0LCBob29rcyxcblx0XHRcdG5UeXBlID0gZWxlbS5ub2RlVHlwZTtcblxuXHRcdC8vIERvbid0IGdldC9zZXQgcHJvcGVydGllcyBvbiB0ZXh0LCBjb21tZW50IGFuZCBhdHRyaWJ1dGUgbm9kZXNcblx0XHRpZiAoIG5UeXBlID09PSAzIHx8IG5UeXBlID09PSA4IHx8IG5UeXBlID09PSAyICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGlmICggblR5cGUgIT09IDEgfHwgIWpRdWVyeS5pc1hNTERvYyggZWxlbSApICkge1xuXG5cdFx0XHQvLyBGaXggbmFtZSBhbmQgYXR0YWNoIGhvb2tzXG5cdFx0XHRuYW1lID0galF1ZXJ5LnByb3BGaXhbIG5hbWUgXSB8fCBuYW1lO1xuXHRcdFx0aG9va3MgPSBqUXVlcnkucHJvcEhvb2tzWyBuYW1lIF07XG5cdFx0fVxuXG5cdFx0aWYgKCB2YWx1ZSAhPT0gdW5kZWZpbmVkICkge1xuXHRcdFx0aWYgKCBob29rcyAmJiBcInNldFwiIGluIGhvb2tzICYmXG5cdFx0XHRcdCggcmV0ID0gaG9va3Muc2V0KCBlbGVtLCB2YWx1ZSwgbmFtZSApICkgIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdFx0cmV0dXJuIHJldDtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuICggZWxlbVsgbmFtZSBdID0gdmFsdWUgKTtcblx0XHR9XG5cblx0XHRpZiAoIGhvb2tzICYmIFwiZ2V0XCIgaW4gaG9va3MgJiYgKCByZXQgPSBob29rcy5nZXQoIGVsZW0sIG5hbWUgKSApICE9PSBudWxsICkge1xuXHRcdFx0cmV0dXJuIHJldDtcblx0XHR9XG5cblx0XHRyZXR1cm4gZWxlbVsgbmFtZSBdO1xuXHR9LFxuXG5cdHByb3BIb29rczoge1xuXHRcdHRhYkluZGV4OiB7XG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCBlbGVtICkge1xuXG5cdFx0XHRcdC8vIGVsZW0udGFiSW5kZXggZG9lc24ndCBhbHdheXMgcmV0dXJuIHRoZVxuXHRcdFx0XHQvLyBjb3JyZWN0IHZhbHVlIHdoZW4gaXQgaGFzbid0IGJlZW4gZXhwbGljaXRseSBzZXRcblx0XHRcdFx0Ly8gaHR0cDovL2ZsdWlkcHJvamVjdC5vcmcvYmxvZy8yMDA4LzAxLzA5L2dldHRpbmctc2V0dGluZy1hbmQtcmVtb3ZpbmctdGFiaW5kZXgtdmFsdWVzLXdpdGgtamF2YXNjcmlwdC9cblx0XHRcdFx0Ly8gVXNlIHByb3BlciBhdHRyaWJ1dGUgcmV0cmlldmFsKCMxMjA3Milcblx0XHRcdFx0dmFyIHRhYmluZGV4ID0galF1ZXJ5LmZpbmQuYXR0ciggZWxlbSwgXCJ0YWJpbmRleFwiICk7XG5cblx0XHRcdFx0cmV0dXJuIHRhYmluZGV4ID9cblx0XHRcdFx0XHRwYXJzZUludCggdGFiaW5kZXgsIDEwICkgOlxuXHRcdFx0XHRcdHJmb2N1c2FibGUudGVzdCggZWxlbS5ub2RlTmFtZSApIHx8XG5cdFx0XHRcdFx0XHRyY2xpY2thYmxlLnRlc3QoIGVsZW0ubm9kZU5hbWUgKSAmJiBlbGVtLmhyZWYgP1xuXHRcdFx0XHRcdFx0XHQwIDpcblx0XHRcdFx0XHRcdFx0LTE7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXG5cdHByb3BGaXg6IHtcblx0XHRcImZvclwiOiBcImh0bWxGb3JcIixcblx0XHRcImNsYXNzXCI6IFwiY2xhc3NOYW1lXCJcblx0fVxufSApO1xuXG4vLyBTdXBwb3J0OiBJRSA8PTExIG9ubHlcbi8vIEFjY2Vzc2luZyB0aGUgc2VsZWN0ZWRJbmRleCBwcm9wZXJ0eVxuLy8gZm9yY2VzIHRoZSBicm93c2VyIHRvIHJlc3BlY3Qgc2V0dGluZyBzZWxlY3RlZFxuLy8gb24gdGhlIG9wdGlvblxuLy8gVGhlIGdldHRlciBlbnN1cmVzIGEgZGVmYXVsdCBvcHRpb24gaXMgc2VsZWN0ZWRcbi8vIHdoZW4gaW4gYW4gb3B0Z3JvdXBcbmlmICggIXN1cHBvcnQub3B0U2VsZWN0ZWQgKSB7XG5cdGpRdWVyeS5wcm9wSG9va3Muc2VsZWN0ZWQgPSB7XG5cdFx0Z2V0OiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdHZhciBwYXJlbnQgPSBlbGVtLnBhcmVudE5vZGU7XG5cdFx0XHRpZiAoIHBhcmVudCAmJiBwYXJlbnQucGFyZW50Tm9kZSApIHtcblx0XHRcdFx0cGFyZW50LnBhcmVudE5vZGUuc2VsZWN0ZWRJbmRleDtcblx0XHRcdH1cblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH0sXG5cdFx0c2V0OiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdHZhciBwYXJlbnQgPSBlbGVtLnBhcmVudE5vZGU7XG5cdFx0XHRpZiAoIHBhcmVudCApIHtcblx0XHRcdFx0cGFyZW50LnNlbGVjdGVkSW5kZXg7XG5cblx0XHRcdFx0aWYgKCBwYXJlbnQucGFyZW50Tm9kZSApIHtcblx0XHRcdFx0XHRwYXJlbnQucGFyZW50Tm9kZS5zZWxlY3RlZEluZGV4O1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xufVxuXG5qUXVlcnkuZWFjaCggW1xuXHRcInRhYkluZGV4XCIsXG5cdFwicmVhZE9ubHlcIixcblx0XCJtYXhMZW5ndGhcIixcblx0XCJjZWxsU3BhY2luZ1wiLFxuXHRcImNlbGxQYWRkaW5nXCIsXG5cdFwicm93U3BhblwiLFxuXHRcImNvbFNwYW5cIixcblx0XCJ1c2VNYXBcIixcblx0XCJmcmFtZUJvcmRlclwiLFxuXHRcImNvbnRlbnRFZGl0YWJsZVwiXG5dLCBmdW5jdGlvbigpIHtcblx0alF1ZXJ5LnByb3BGaXhbIHRoaXMudG9Mb3dlckNhc2UoKSBdID0gdGhpcztcbn0gKTtcblxuXG5cblxudmFyIHJjbGFzcyA9IC9bXFx0XFxyXFxuXFxmXS9nO1xuXG5mdW5jdGlvbiBnZXRDbGFzcyggZWxlbSApIHtcblx0cmV0dXJuIGVsZW0uZ2V0QXR0cmlidXRlICYmIGVsZW0uZ2V0QXR0cmlidXRlKCBcImNsYXNzXCIgKSB8fCBcIlwiO1xufVxuXG5qUXVlcnkuZm4uZXh0ZW5kKCB7XG5cdGFkZENsYXNzOiBmdW5jdGlvbiggdmFsdWUgKSB7XG5cdFx0dmFyIGNsYXNzZXMsIGVsZW0sIGN1ciwgY3VyVmFsdWUsIGNsYXp6LCBqLCBmaW5hbFZhbHVlLFxuXHRcdFx0aSA9IDA7XG5cblx0XHRpZiAoIGpRdWVyeS5pc0Z1bmN0aW9uKCB2YWx1ZSApICkge1xuXHRcdFx0cmV0dXJuIHRoaXMuZWFjaCggZnVuY3Rpb24oIGogKSB7XG5cdFx0XHRcdGpRdWVyeSggdGhpcyApLmFkZENsYXNzKCB2YWx1ZS5jYWxsKCB0aGlzLCBqLCBnZXRDbGFzcyggdGhpcyApICkgKTtcblx0XHRcdH0gKTtcblx0XHR9XG5cblx0XHRpZiAoIHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiAmJiB2YWx1ZSApIHtcblx0XHRcdGNsYXNzZXMgPSB2YWx1ZS5tYXRjaCggcm5vdHdoaXRlICkgfHwgW107XG5cblx0XHRcdHdoaWxlICggKCBlbGVtID0gdGhpc1sgaSsrIF0gKSApIHtcblx0XHRcdFx0Y3VyVmFsdWUgPSBnZXRDbGFzcyggZWxlbSApO1xuXHRcdFx0XHRjdXIgPSBlbGVtLm5vZGVUeXBlID09PSAxICYmXG5cdFx0XHRcdFx0KCBcIiBcIiArIGN1clZhbHVlICsgXCIgXCIgKS5yZXBsYWNlKCByY2xhc3MsIFwiIFwiICk7XG5cblx0XHRcdFx0aWYgKCBjdXIgKSB7XG5cdFx0XHRcdFx0aiA9IDA7XG5cdFx0XHRcdFx0d2hpbGUgKCAoIGNsYXp6ID0gY2xhc3Nlc1sgaisrIF0gKSApIHtcblx0XHRcdFx0XHRcdGlmICggY3VyLmluZGV4T2YoIFwiIFwiICsgY2xhenogKyBcIiBcIiApIDwgMCApIHtcblx0XHRcdFx0XHRcdFx0Y3VyICs9IGNsYXp6ICsgXCIgXCI7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly8gT25seSBhc3NpZ24gaWYgZGlmZmVyZW50IHRvIGF2b2lkIHVubmVlZGVkIHJlbmRlcmluZy5cblx0XHRcdFx0XHRmaW5hbFZhbHVlID0galF1ZXJ5LnRyaW0oIGN1ciApO1xuXHRcdFx0XHRcdGlmICggY3VyVmFsdWUgIT09IGZpbmFsVmFsdWUgKSB7XG5cdFx0XHRcdFx0XHRlbGVtLnNldEF0dHJpYnV0ZSggXCJjbGFzc1wiLCBmaW5hbFZhbHVlICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cblx0cmVtb3ZlQ2xhc3M6IGZ1bmN0aW9uKCB2YWx1ZSApIHtcblx0XHR2YXIgY2xhc3NlcywgZWxlbSwgY3VyLCBjdXJWYWx1ZSwgY2xhenosIGosIGZpbmFsVmFsdWUsXG5cdFx0XHRpID0gMDtcblxuXHRcdGlmICggalF1ZXJ5LmlzRnVuY3Rpb24oIHZhbHVlICkgKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5lYWNoKCBmdW5jdGlvbiggaiApIHtcblx0XHRcdFx0alF1ZXJ5KCB0aGlzICkucmVtb3ZlQ2xhc3MoIHZhbHVlLmNhbGwoIHRoaXMsIGosIGdldENsYXNzKCB0aGlzICkgKSApO1xuXHRcdFx0fSApO1xuXHRcdH1cblxuXHRcdGlmICggIWFyZ3VtZW50cy5sZW5ndGggKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5hdHRyKCBcImNsYXNzXCIsIFwiXCIgKTtcblx0XHR9XG5cblx0XHRpZiAoIHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiAmJiB2YWx1ZSApIHtcblx0XHRcdGNsYXNzZXMgPSB2YWx1ZS5tYXRjaCggcm5vdHdoaXRlICkgfHwgW107XG5cblx0XHRcdHdoaWxlICggKCBlbGVtID0gdGhpc1sgaSsrIF0gKSApIHtcblx0XHRcdFx0Y3VyVmFsdWUgPSBnZXRDbGFzcyggZWxlbSApO1xuXG5cdFx0XHRcdC8vIFRoaXMgZXhwcmVzc2lvbiBpcyBoZXJlIGZvciBiZXR0ZXIgY29tcHJlc3NpYmlsaXR5IChzZWUgYWRkQ2xhc3MpXG5cdFx0XHRcdGN1ciA9IGVsZW0ubm9kZVR5cGUgPT09IDEgJiZcblx0XHRcdFx0XHQoIFwiIFwiICsgY3VyVmFsdWUgKyBcIiBcIiApLnJlcGxhY2UoIHJjbGFzcywgXCIgXCIgKTtcblxuXHRcdFx0XHRpZiAoIGN1ciApIHtcblx0XHRcdFx0XHRqID0gMDtcblx0XHRcdFx0XHR3aGlsZSAoICggY2xhenogPSBjbGFzc2VzWyBqKysgXSApICkge1xuXG5cdFx0XHRcdFx0XHQvLyBSZW1vdmUgKmFsbCogaW5zdGFuY2VzXG5cdFx0XHRcdFx0XHR3aGlsZSAoIGN1ci5pbmRleE9mKCBcIiBcIiArIGNsYXp6ICsgXCIgXCIgKSA+IC0xICkge1xuXHRcdFx0XHRcdFx0XHRjdXIgPSBjdXIucmVwbGFjZSggXCIgXCIgKyBjbGF6eiArIFwiIFwiLCBcIiBcIiApO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIE9ubHkgYXNzaWduIGlmIGRpZmZlcmVudCB0byBhdm9pZCB1bm5lZWRlZCByZW5kZXJpbmcuXG5cdFx0XHRcdFx0ZmluYWxWYWx1ZSA9IGpRdWVyeS50cmltKCBjdXIgKTtcblx0XHRcdFx0XHRpZiAoIGN1clZhbHVlICE9PSBmaW5hbFZhbHVlICkge1xuXHRcdFx0XHRcdFx0ZWxlbS5zZXRBdHRyaWJ1dGUoIFwiY2xhc3NcIiwgZmluYWxWYWx1ZSApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzO1xuXHR9LFxuXG5cdHRvZ2dsZUNsYXNzOiBmdW5jdGlvbiggdmFsdWUsIHN0YXRlVmFsICkge1xuXHRcdHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuXG5cdFx0aWYgKCB0eXBlb2Ygc3RhdGVWYWwgPT09IFwiYm9vbGVhblwiICYmIHR5cGUgPT09IFwic3RyaW5nXCIgKSB7XG5cdFx0XHRyZXR1cm4gc3RhdGVWYWwgPyB0aGlzLmFkZENsYXNzKCB2YWx1ZSApIDogdGhpcy5yZW1vdmVDbGFzcyggdmFsdWUgKTtcblx0XHR9XG5cblx0XHRpZiAoIGpRdWVyeS5pc0Z1bmN0aW9uKCB2YWx1ZSApICkge1xuXHRcdFx0cmV0dXJuIHRoaXMuZWFjaCggZnVuY3Rpb24oIGkgKSB7XG5cdFx0XHRcdGpRdWVyeSggdGhpcyApLnRvZ2dsZUNsYXNzKFxuXHRcdFx0XHRcdHZhbHVlLmNhbGwoIHRoaXMsIGksIGdldENsYXNzKCB0aGlzICksIHN0YXRlVmFsICksXG5cdFx0XHRcdFx0c3RhdGVWYWxcblx0XHRcdFx0KTtcblx0XHRcdH0gKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcy5lYWNoKCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBjbGFzc05hbWUsIGksIHNlbGYsIGNsYXNzTmFtZXM7XG5cblx0XHRcdGlmICggdHlwZSA9PT0gXCJzdHJpbmdcIiApIHtcblxuXHRcdFx0XHQvLyBUb2dnbGUgaW5kaXZpZHVhbCBjbGFzcyBuYW1lc1xuXHRcdFx0XHRpID0gMDtcblx0XHRcdFx0c2VsZiA9IGpRdWVyeSggdGhpcyApO1xuXHRcdFx0XHRjbGFzc05hbWVzID0gdmFsdWUubWF0Y2goIHJub3R3aGl0ZSApIHx8IFtdO1xuXG5cdFx0XHRcdHdoaWxlICggKCBjbGFzc05hbWUgPSBjbGFzc05hbWVzWyBpKysgXSApICkge1xuXG5cdFx0XHRcdFx0Ly8gQ2hlY2sgZWFjaCBjbGFzc05hbWUgZ2l2ZW4sIHNwYWNlIHNlcGFyYXRlZCBsaXN0XG5cdFx0XHRcdFx0aWYgKCBzZWxmLmhhc0NsYXNzKCBjbGFzc05hbWUgKSApIHtcblx0XHRcdFx0XHRcdHNlbGYucmVtb3ZlQ2xhc3MoIGNsYXNzTmFtZSApO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRzZWxmLmFkZENsYXNzKCBjbGFzc05hbWUgKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0Ly8gVG9nZ2xlIHdob2xlIGNsYXNzIG5hbWVcblx0XHRcdH0gZWxzZSBpZiAoIHZhbHVlID09PSB1bmRlZmluZWQgfHwgdHlwZSA9PT0gXCJib29sZWFuXCIgKSB7XG5cdFx0XHRcdGNsYXNzTmFtZSA9IGdldENsYXNzKCB0aGlzICk7XG5cdFx0XHRcdGlmICggY2xhc3NOYW1lICkge1xuXG5cdFx0XHRcdFx0Ly8gU3RvcmUgY2xhc3NOYW1lIGlmIHNldFxuXHRcdFx0XHRcdGRhdGFQcml2LnNldCggdGhpcywgXCJfX2NsYXNzTmFtZV9fXCIsIGNsYXNzTmFtZSApO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gSWYgdGhlIGVsZW1lbnQgaGFzIGEgY2xhc3MgbmFtZSBvciBpZiB3ZSdyZSBwYXNzZWQgYGZhbHNlYCxcblx0XHRcdFx0Ly8gdGhlbiByZW1vdmUgdGhlIHdob2xlIGNsYXNzbmFtZSAoaWYgdGhlcmUgd2FzIG9uZSwgdGhlIGFib3ZlIHNhdmVkIGl0KS5cblx0XHRcdFx0Ly8gT3RoZXJ3aXNlIGJyaW5nIGJhY2sgd2hhdGV2ZXIgd2FzIHByZXZpb3VzbHkgc2F2ZWQgKGlmIGFueXRoaW5nKSxcblx0XHRcdFx0Ly8gZmFsbGluZyBiYWNrIHRvIHRoZSBlbXB0eSBzdHJpbmcgaWYgbm90aGluZyB3YXMgc3RvcmVkLlxuXHRcdFx0XHRpZiAoIHRoaXMuc2V0QXR0cmlidXRlICkge1xuXHRcdFx0XHRcdHRoaXMuc2V0QXR0cmlidXRlKCBcImNsYXNzXCIsXG5cdFx0XHRcdFx0XHRjbGFzc05hbWUgfHwgdmFsdWUgPT09IGZhbHNlID9cblx0XHRcdFx0XHRcdFwiXCIgOlxuXHRcdFx0XHRcdFx0ZGF0YVByaXYuZ2V0KCB0aGlzLCBcIl9fY2xhc3NOYW1lX19cIiApIHx8IFwiXCJcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSApO1xuXHR9LFxuXG5cdGhhc0NsYXNzOiBmdW5jdGlvbiggc2VsZWN0b3IgKSB7XG5cdFx0dmFyIGNsYXNzTmFtZSwgZWxlbSxcblx0XHRcdGkgPSAwO1xuXG5cdFx0Y2xhc3NOYW1lID0gXCIgXCIgKyBzZWxlY3RvciArIFwiIFwiO1xuXHRcdHdoaWxlICggKCBlbGVtID0gdGhpc1sgaSsrIF0gKSApIHtcblx0XHRcdGlmICggZWxlbS5ub2RlVHlwZSA9PT0gMSAmJlxuXHRcdFx0XHQoIFwiIFwiICsgZ2V0Q2xhc3MoIGVsZW0gKSArIFwiIFwiICkucmVwbGFjZSggcmNsYXNzLCBcIiBcIiApXG5cdFx0XHRcdFx0LmluZGV4T2YoIGNsYXNzTmFtZSApID4gLTFcblx0XHRcdCkge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cbn0gKTtcblxuXG5cblxudmFyIHJyZXR1cm4gPSAvXFxyL2csXG5cdHJzcGFjZXMgPSAvW1xceDIwXFx0XFxyXFxuXFxmXSsvZztcblxualF1ZXJ5LmZuLmV4dGVuZCgge1xuXHR2YWw6IGZ1bmN0aW9uKCB2YWx1ZSApIHtcblx0XHR2YXIgaG9va3MsIHJldCwgaXNGdW5jdGlvbixcblx0XHRcdGVsZW0gPSB0aGlzWyAwIF07XG5cblx0XHRpZiAoICFhcmd1bWVudHMubGVuZ3RoICkge1xuXHRcdFx0aWYgKCBlbGVtICkge1xuXHRcdFx0XHRob29rcyA9IGpRdWVyeS52YWxIb29rc1sgZWxlbS50eXBlIF0gfHxcblx0XHRcdFx0XHRqUXVlcnkudmFsSG9va3NbIGVsZW0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKSBdO1xuXG5cdFx0XHRcdGlmICggaG9va3MgJiZcblx0XHRcdFx0XHRcImdldFwiIGluIGhvb2tzICYmXG5cdFx0XHRcdFx0KCByZXQgPSBob29rcy5nZXQoIGVsZW0sIFwidmFsdWVcIiApICkgIT09IHVuZGVmaW5lZFxuXHRcdFx0XHQpIHtcblx0XHRcdFx0XHRyZXR1cm4gcmV0O1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0ID0gZWxlbS52YWx1ZTtcblxuXHRcdFx0XHRyZXR1cm4gdHlwZW9mIHJldCA9PT0gXCJzdHJpbmdcIiA/XG5cblx0XHRcdFx0XHQvLyBIYW5kbGUgbW9zdCBjb21tb24gc3RyaW5nIGNhc2VzXG5cdFx0XHRcdFx0cmV0LnJlcGxhY2UoIHJyZXR1cm4sIFwiXCIgKSA6XG5cblx0XHRcdFx0XHQvLyBIYW5kbGUgY2FzZXMgd2hlcmUgdmFsdWUgaXMgbnVsbC91bmRlZiBvciBudW1iZXJcblx0XHRcdFx0XHRyZXQgPT0gbnVsbCA/IFwiXCIgOiByZXQ7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRpc0Z1bmN0aW9uID0galF1ZXJ5LmlzRnVuY3Rpb24oIHZhbHVlICk7XG5cblx0XHRyZXR1cm4gdGhpcy5lYWNoKCBmdW5jdGlvbiggaSApIHtcblx0XHRcdHZhciB2YWw7XG5cblx0XHRcdGlmICggdGhpcy5ub2RlVHlwZSAhPT0gMSApIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIGlzRnVuY3Rpb24gKSB7XG5cdFx0XHRcdHZhbCA9IHZhbHVlLmNhbGwoIHRoaXMsIGksIGpRdWVyeSggdGhpcyApLnZhbCgpICk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR2YWwgPSB2YWx1ZTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gVHJlYXQgbnVsbC91bmRlZmluZWQgYXMgXCJcIjsgY29udmVydCBudW1iZXJzIHRvIHN0cmluZ1xuXHRcdFx0aWYgKCB2YWwgPT0gbnVsbCApIHtcblx0XHRcdFx0dmFsID0gXCJcIjtcblxuXHRcdFx0fSBlbHNlIGlmICggdHlwZW9mIHZhbCA9PT0gXCJudW1iZXJcIiApIHtcblx0XHRcdFx0dmFsICs9IFwiXCI7XG5cblx0XHRcdH0gZWxzZSBpZiAoIGpRdWVyeS5pc0FycmF5KCB2YWwgKSApIHtcblx0XHRcdFx0dmFsID0galF1ZXJ5Lm1hcCggdmFsLCBmdW5jdGlvbiggdmFsdWUgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHZhbHVlID09IG51bGwgPyBcIlwiIDogdmFsdWUgKyBcIlwiO1xuXHRcdFx0XHR9ICk7XG5cdFx0XHR9XG5cblx0XHRcdGhvb2tzID0galF1ZXJ5LnZhbEhvb2tzWyB0aGlzLnR5cGUgXSB8fCBqUXVlcnkudmFsSG9va3NbIHRoaXMubm9kZU5hbWUudG9Mb3dlckNhc2UoKSBdO1xuXG5cdFx0XHQvLyBJZiBzZXQgcmV0dXJucyB1bmRlZmluZWQsIGZhbGwgYmFjayB0byBub3JtYWwgc2V0dGluZ1xuXHRcdFx0aWYgKCAhaG9va3MgfHwgISggXCJzZXRcIiBpbiBob29rcyApIHx8IGhvb2tzLnNldCggdGhpcywgdmFsLCBcInZhbHVlXCIgKSA9PT0gdW5kZWZpbmVkICkge1xuXHRcdFx0XHR0aGlzLnZhbHVlID0gdmFsO1xuXHRcdFx0fVxuXHRcdH0gKTtcblx0fVxufSApO1xuXG5qUXVlcnkuZXh0ZW5kKCB7XG5cdHZhbEhvb2tzOiB7XG5cdFx0b3B0aW9uOiB7XG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCBlbGVtICkge1xuXG5cdFx0XHRcdHZhciB2YWwgPSBqUXVlcnkuZmluZC5hdHRyKCBlbGVtLCBcInZhbHVlXCIgKTtcblx0XHRcdFx0cmV0dXJuIHZhbCAhPSBudWxsID9cblx0XHRcdFx0XHR2YWwgOlxuXG5cdFx0XHRcdFx0Ly8gU3VwcG9ydDogSUUxMC0xMStcblx0XHRcdFx0XHQvLyBvcHRpb24udGV4dCB0aHJvd3MgZXhjZXB0aW9ucyAoIzE0Njg2LCAjMTQ4NTgpXG5cdFx0XHRcdFx0Ly8gU3RyaXAgYW5kIGNvbGxhcHNlIHdoaXRlc3BhY2Vcblx0XHRcdFx0XHQvLyBodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnLyNzdHJpcC1hbmQtY29sbGFwc2Utd2hpdGVzcGFjZVxuXHRcdFx0XHRcdGpRdWVyeS50cmltKCBqUXVlcnkudGV4dCggZWxlbSApICkucmVwbGFjZSggcnNwYWNlcywgXCIgXCIgKTtcblx0XHRcdH1cblx0XHR9LFxuXHRcdHNlbGVjdDoge1xuXHRcdFx0Z2V0OiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdFx0dmFyIHZhbHVlLCBvcHRpb24sXG5cdFx0XHRcdFx0b3B0aW9ucyA9IGVsZW0ub3B0aW9ucyxcblx0XHRcdFx0XHRpbmRleCA9IGVsZW0uc2VsZWN0ZWRJbmRleCxcblx0XHRcdFx0XHRvbmUgPSBlbGVtLnR5cGUgPT09IFwic2VsZWN0LW9uZVwiIHx8IGluZGV4IDwgMCxcblx0XHRcdFx0XHR2YWx1ZXMgPSBvbmUgPyBudWxsIDogW10sXG5cdFx0XHRcdFx0bWF4ID0gb25lID8gaW5kZXggKyAxIDogb3B0aW9ucy5sZW5ndGgsXG5cdFx0XHRcdFx0aSA9IGluZGV4IDwgMCA/XG5cdFx0XHRcdFx0XHRtYXggOlxuXHRcdFx0XHRcdFx0b25lID8gaW5kZXggOiAwO1xuXG5cdFx0XHRcdC8vIExvb3AgdGhyb3VnaCBhbGwgdGhlIHNlbGVjdGVkIG9wdGlvbnNcblx0XHRcdFx0Zm9yICggOyBpIDwgbWF4OyBpKysgKSB7XG5cdFx0XHRcdFx0b3B0aW9uID0gb3B0aW9uc1sgaSBdO1xuXG5cdFx0XHRcdFx0Ly8gSUU4LTkgZG9lc24ndCB1cGRhdGUgc2VsZWN0ZWQgYWZ0ZXIgZm9ybSByZXNldCAoIzI1NTEpXG5cdFx0XHRcdFx0aWYgKCAoIG9wdGlvbi5zZWxlY3RlZCB8fCBpID09PSBpbmRleCApICYmXG5cblx0XHRcdFx0XHRcdFx0Ly8gRG9uJ3QgcmV0dXJuIG9wdGlvbnMgdGhhdCBhcmUgZGlzYWJsZWQgb3IgaW4gYSBkaXNhYmxlZCBvcHRncm91cFxuXHRcdFx0XHRcdFx0XHQoIHN1cHBvcnQub3B0RGlzYWJsZWQgP1xuXHRcdFx0XHRcdFx0XHRcdCFvcHRpb24uZGlzYWJsZWQgOiBvcHRpb24uZ2V0QXR0cmlidXRlKCBcImRpc2FibGVkXCIgKSA9PT0gbnVsbCApICYmXG5cdFx0XHRcdFx0XHRcdCggIW9wdGlvbi5wYXJlbnROb2RlLmRpc2FibGVkIHx8XG5cdFx0XHRcdFx0XHRcdFx0IWpRdWVyeS5ub2RlTmFtZSggb3B0aW9uLnBhcmVudE5vZGUsIFwib3B0Z3JvdXBcIiApICkgKSB7XG5cblx0XHRcdFx0XHRcdC8vIEdldCB0aGUgc3BlY2lmaWMgdmFsdWUgZm9yIHRoZSBvcHRpb25cblx0XHRcdFx0XHRcdHZhbHVlID0galF1ZXJ5KCBvcHRpb24gKS52YWwoKTtcblxuXHRcdFx0XHRcdFx0Ly8gV2UgZG9uJ3QgbmVlZCBhbiBhcnJheSBmb3Igb25lIHNlbGVjdHNcblx0XHRcdFx0XHRcdGlmICggb25lICkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdmFsdWU7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdC8vIE11bHRpLVNlbGVjdHMgcmV0dXJuIGFuIGFycmF5XG5cdFx0XHRcdFx0XHR2YWx1ZXMucHVzaCggdmFsdWUgKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gdmFsdWVzO1xuXHRcdFx0fSxcblxuXHRcdFx0c2V0OiBmdW5jdGlvbiggZWxlbSwgdmFsdWUgKSB7XG5cdFx0XHRcdHZhciBvcHRpb25TZXQsIG9wdGlvbixcblx0XHRcdFx0XHRvcHRpb25zID0gZWxlbS5vcHRpb25zLFxuXHRcdFx0XHRcdHZhbHVlcyA9IGpRdWVyeS5tYWtlQXJyYXkoIHZhbHVlICksXG5cdFx0XHRcdFx0aSA9IG9wdGlvbnMubGVuZ3RoO1xuXG5cdFx0XHRcdHdoaWxlICggaS0tICkge1xuXHRcdFx0XHRcdG9wdGlvbiA9IG9wdGlvbnNbIGkgXTtcblx0XHRcdFx0XHRpZiAoIG9wdGlvbi5zZWxlY3RlZCA9XG5cdFx0XHRcdFx0XHRqUXVlcnkuaW5BcnJheSggalF1ZXJ5LnZhbEhvb2tzLm9wdGlvbi5nZXQoIG9wdGlvbiApLCB2YWx1ZXMgKSA+IC0xXG5cdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHRvcHRpb25TZXQgPSB0cnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIEZvcmNlIGJyb3dzZXJzIHRvIGJlaGF2ZSBjb25zaXN0ZW50bHkgd2hlbiBub24tbWF0Y2hpbmcgdmFsdWUgaXMgc2V0XG5cdFx0XHRcdGlmICggIW9wdGlvblNldCApIHtcblx0XHRcdFx0XHRlbGVtLnNlbGVjdGVkSW5kZXggPSAtMTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdmFsdWVzO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxufSApO1xuXG4vLyBSYWRpb3MgYW5kIGNoZWNrYm94ZXMgZ2V0dGVyL3NldHRlclxualF1ZXJ5LmVhY2goIFsgXCJyYWRpb1wiLCBcImNoZWNrYm94XCIgXSwgZnVuY3Rpb24oKSB7XG5cdGpRdWVyeS52YWxIb29rc1sgdGhpcyBdID0ge1xuXHRcdHNldDogZnVuY3Rpb24oIGVsZW0sIHZhbHVlICkge1xuXHRcdFx0aWYgKCBqUXVlcnkuaXNBcnJheSggdmFsdWUgKSApIHtcblx0XHRcdFx0cmV0dXJuICggZWxlbS5jaGVja2VkID0galF1ZXJ5LmluQXJyYXkoIGpRdWVyeSggZWxlbSApLnZhbCgpLCB2YWx1ZSApID4gLTEgKTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG5cdGlmICggIXN1cHBvcnQuY2hlY2tPbiApIHtcblx0XHRqUXVlcnkudmFsSG9va3NbIHRoaXMgXS5nZXQgPSBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdHJldHVybiBlbGVtLmdldEF0dHJpYnV0ZSggXCJ2YWx1ZVwiICkgPT09IG51bGwgPyBcIm9uXCIgOiBlbGVtLnZhbHVlO1xuXHRcdH07XG5cdH1cbn0gKTtcblxuXG5cblxuLy8gUmV0dXJuIGpRdWVyeSBmb3IgYXR0cmlidXRlcy1vbmx5IGluY2x1c2lvblxuXG5cbnZhciByZm9jdXNNb3JwaCA9IC9eKD86Zm9jdXNpbmZvY3VzfGZvY3Vzb3V0Ymx1cikkLztcblxualF1ZXJ5LmV4dGVuZCggalF1ZXJ5LmV2ZW50LCB7XG5cblx0dHJpZ2dlcjogZnVuY3Rpb24oIGV2ZW50LCBkYXRhLCBlbGVtLCBvbmx5SGFuZGxlcnMgKSB7XG5cblx0XHR2YXIgaSwgY3VyLCB0bXAsIGJ1YmJsZVR5cGUsIG9udHlwZSwgaGFuZGxlLCBzcGVjaWFsLFxuXHRcdFx0ZXZlbnRQYXRoID0gWyBlbGVtIHx8IGRvY3VtZW50IF0sXG5cdFx0XHR0eXBlID0gaGFzT3duLmNhbGwoIGV2ZW50LCBcInR5cGVcIiApID8gZXZlbnQudHlwZSA6IGV2ZW50LFxuXHRcdFx0bmFtZXNwYWNlcyA9IGhhc093bi5jYWxsKCBldmVudCwgXCJuYW1lc3BhY2VcIiApID8gZXZlbnQubmFtZXNwYWNlLnNwbGl0KCBcIi5cIiApIDogW107XG5cblx0XHRjdXIgPSB0bXAgPSBlbGVtID0gZWxlbSB8fCBkb2N1bWVudDtcblxuXHRcdC8vIERvbid0IGRvIGV2ZW50cyBvbiB0ZXh0IGFuZCBjb21tZW50IG5vZGVzXG5cdFx0aWYgKCBlbGVtLm5vZGVUeXBlID09PSAzIHx8IGVsZW0ubm9kZVR5cGUgPT09IDggKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gZm9jdXMvYmx1ciBtb3JwaHMgdG8gZm9jdXNpbi9vdXQ7IGVuc3VyZSB3ZSdyZSBub3QgZmlyaW5nIHRoZW0gcmlnaHQgbm93XG5cdFx0aWYgKCByZm9jdXNNb3JwaC50ZXN0KCB0eXBlICsgalF1ZXJ5LmV2ZW50LnRyaWdnZXJlZCApICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGlmICggdHlwZS5pbmRleE9mKCBcIi5cIiApID4gLTEgKSB7XG5cblx0XHRcdC8vIE5hbWVzcGFjZWQgdHJpZ2dlcjsgY3JlYXRlIGEgcmVnZXhwIHRvIG1hdGNoIGV2ZW50IHR5cGUgaW4gaGFuZGxlKClcblx0XHRcdG5hbWVzcGFjZXMgPSB0eXBlLnNwbGl0KCBcIi5cIiApO1xuXHRcdFx0dHlwZSA9IG5hbWVzcGFjZXMuc2hpZnQoKTtcblx0XHRcdG5hbWVzcGFjZXMuc29ydCgpO1xuXHRcdH1cblx0XHRvbnR5cGUgPSB0eXBlLmluZGV4T2YoIFwiOlwiICkgPCAwICYmIFwib25cIiArIHR5cGU7XG5cblx0XHQvLyBDYWxsZXIgY2FuIHBhc3MgaW4gYSBqUXVlcnkuRXZlbnQgb2JqZWN0LCBPYmplY3QsIG9yIGp1c3QgYW4gZXZlbnQgdHlwZSBzdHJpbmdcblx0XHRldmVudCA9IGV2ZW50WyBqUXVlcnkuZXhwYW5kbyBdID9cblx0XHRcdGV2ZW50IDpcblx0XHRcdG5ldyBqUXVlcnkuRXZlbnQoIHR5cGUsIHR5cGVvZiBldmVudCA9PT0gXCJvYmplY3RcIiAmJiBldmVudCApO1xuXG5cdFx0Ly8gVHJpZ2dlciBiaXRtYXNrOiAmIDEgZm9yIG5hdGl2ZSBoYW5kbGVyczsgJiAyIGZvciBqUXVlcnkgKGFsd2F5cyB0cnVlKVxuXHRcdGV2ZW50LmlzVHJpZ2dlciA9IG9ubHlIYW5kbGVycyA/IDIgOiAzO1xuXHRcdGV2ZW50Lm5hbWVzcGFjZSA9IG5hbWVzcGFjZXMuam9pbiggXCIuXCIgKTtcblx0XHRldmVudC5ybmFtZXNwYWNlID0gZXZlbnQubmFtZXNwYWNlID9cblx0XHRcdG5ldyBSZWdFeHAoIFwiKF58XFxcXC4pXCIgKyBuYW1lc3BhY2VzLmpvaW4oIFwiXFxcXC4oPzouKlxcXFwufClcIiApICsgXCIoXFxcXC58JClcIiApIDpcblx0XHRcdG51bGw7XG5cblx0XHQvLyBDbGVhbiB1cCB0aGUgZXZlbnQgaW4gY2FzZSBpdCBpcyBiZWluZyByZXVzZWRcblx0XHRldmVudC5yZXN1bHQgPSB1bmRlZmluZWQ7XG5cdFx0aWYgKCAhZXZlbnQudGFyZ2V0ICkge1xuXHRcdFx0ZXZlbnQudGFyZ2V0ID0gZWxlbTtcblx0XHR9XG5cblx0XHQvLyBDbG9uZSBhbnkgaW5jb21pbmcgZGF0YSBhbmQgcHJlcGVuZCB0aGUgZXZlbnQsIGNyZWF0aW5nIHRoZSBoYW5kbGVyIGFyZyBsaXN0XG5cdFx0ZGF0YSA9IGRhdGEgPT0gbnVsbCA/XG5cdFx0XHRbIGV2ZW50IF0gOlxuXHRcdFx0alF1ZXJ5Lm1ha2VBcnJheSggZGF0YSwgWyBldmVudCBdICk7XG5cblx0XHQvLyBBbGxvdyBzcGVjaWFsIGV2ZW50cyB0byBkcmF3IG91dHNpZGUgdGhlIGxpbmVzXG5cdFx0c3BlY2lhbCA9IGpRdWVyeS5ldmVudC5zcGVjaWFsWyB0eXBlIF0gfHwge307XG5cdFx0aWYgKCAhb25seUhhbmRsZXJzICYmIHNwZWNpYWwudHJpZ2dlciAmJiBzcGVjaWFsLnRyaWdnZXIuYXBwbHkoIGVsZW0sIGRhdGEgKSA9PT0gZmFsc2UgKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gRGV0ZXJtaW5lIGV2ZW50IHByb3BhZ2F0aW9uIHBhdGggaW4gYWR2YW5jZSwgcGVyIFczQyBldmVudHMgc3BlYyAoIzk5NTEpXG5cdFx0Ly8gQnViYmxlIHVwIHRvIGRvY3VtZW50LCB0aGVuIHRvIHdpbmRvdzsgd2F0Y2ggZm9yIGEgZ2xvYmFsIG93bmVyRG9jdW1lbnQgdmFyICgjOTcyNClcblx0XHRpZiAoICFvbmx5SGFuZGxlcnMgJiYgIXNwZWNpYWwubm9CdWJibGUgJiYgIWpRdWVyeS5pc1dpbmRvdyggZWxlbSApICkge1xuXG5cdFx0XHRidWJibGVUeXBlID0gc3BlY2lhbC5kZWxlZ2F0ZVR5cGUgfHwgdHlwZTtcblx0XHRcdGlmICggIXJmb2N1c01vcnBoLnRlc3QoIGJ1YmJsZVR5cGUgKyB0eXBlICkgKSB7XG5cdFx0XHRcdGN1ciA9IGN1ci5wYXJlbnROb2RlO1xuXHRcdFx0fVxuXHRcdFx0Zm9yICggOyBjdXI7IGN1ciA9IGN1ci5wYXJlbnROb2RlICkge1xuXHRcdFx0XHRldmVudFBhdGgucHVzaCggY3VyICk7XG5cdFx0XHRcdHRtcCA9IGN1cjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gT25seSBhZGQgd2luZG93IGlmIHdlIGdvdCB0byBkb2N1bWVudCAoZS5nLiwgbm90IHBsYWluIG9iaiBvciBkZXRhY2hlZCBET00pXG5cdFx0XHRpZiAoIHRtcCA9PT0gKCBlbGVtLm93bmVyRG9jdW1lbnQgfHwgZG9jdW1lbnQgKSApIHtcblx0XHRcdFx0ZXZlbnRQYXRoLnB1c2goIHRtcC5kZWZhdWx0VmlldyB8fCB0bXAucGFyZW50V2luZG93IHx8IHdpbmRvdyApO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIEZpcmUgaGFuZGxlcnMgb24gdGhlIGV2ZW50IHBhdGhcblx0XHRpID0gMDtcblx0XHR3aGlsZSAoICggY3VyID0gZXZlbnRQYXRoWyBpKysgXSApICYmICFldmVudC5pc1Byb3BhZ2F0aW9uU3RvcHBlZCgpICkge1xuXG5cdFx0XHRldmVudC50eXBlID0gaSA+IDEgP1xuXHRcdFx0XHRidWJibGVUeXBlIDpcblx0XHRcdFx0c3BlY2lhbC5iaW5kVHlwZSB8fCB0eXBlO1xuXG5cdFx0XHQvLyBqUXVlcnkgaGFuZGxlclxuXHRcdFx0aGFuZGxlID0gKCBkYXRhUHJpdi5nZXQoIGN1ciwgXCJldmVudHNcIiApIHx8IHt9IClbIGV2ZW50LnR5cGUgXSAmJlxuXHRcdFx0XHRkYXRhUHJpdi5nZXQoIGN1ciwgXCJoYW5kbGVcIiApO1xuXHRcdFx0aWYgKCBoYW5kbGUgKSB7XG5cdFx0XHRcdGhhbmRsZS5hcHBseSggY3VyLCBkYXRhICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIE5hdGl2ZSBoYW5kbGVyXG5cdFx0XHRoYW5kbGUgPSBvbnR5cGUgJiYgY3VyWyBvbnR5cGUgXTtcblx0XHRcdGlmICggaGFuZGxlICYmIGhhbmRsZS5hcHBseSAmJiBhY2NlcHREYXRhKCBjdXIgKSApIHtcblx0XHRcdFx0ZXZlbnQucmVzdWx0ID0gaGFuZGxlLmFwcGx5KCBjdXIsIGRhdGEgKTtcblx0XHRcdFx0aWYgKCBldmVudC5yZXN1bHQgPT09IGZhbHNlICkge1xuXHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0ZXZlbnQudHlwZSA9IHR5cGU7XG5cblx0XHQvLyBJZiBub2JvZHkgcHJldmVudGVkIHRoZSBkZWZhdWx0IGFjdGlvbiwgZG8gaXQgbm93XG5cdFx0aWYgKCAhb25seUhhbmRsZXJzICYmICFldmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKSApIHtcblxuXHRcdFx0aWYgKCAoICFzcGVjaWFsLl9kZWZhdWx0IHx8XG5cdFx0XHRcdHNwZWNpYWwuX2RlZmF1bHQuYXBwbHkoIGV2ZW50UGF0aC5wb3AoKSwgZGF0YSApID09PSBmYWxzZSApICYmXG5cdFx0XHRcdGFjY2VwdERhdGEoIGVsZW0gKSApIHtcblxuXHRcdFx0XHQvLyBDYWxsIGEgbmF0aXZlIERPTSBtZXRob2Qgb24gdGhlIHRhcmdldCB3aXRoIHRoZSBzYW1lIG5hbWUgbmFtZSBhcyB0aGUgZXZlbnQuXG5cdFx0XHRcdC8vIERvbid0IGRvIGRlZmF1bHQgYWN0aW9ucyBvbiB3aW5kb3csIHRoYXQncyB3aGVyZSBnbG9iYWwgdmFyaWFibGVzIGJlICgjNjE3MClcblx0XHRcdFx0aWYgKCBvbnR5cGUgJiYgalF1ZXJ5LmlzRnVuY3Rpb24oIGVsZW1bIHR5cGUgXSApICYmICFqUXVlcnkuaXNXaW5kb3coIGVsZW0gKSApIHtcblxuXHRcdFx0XHRcdC8vIERvbid0IHJlLXRyaWdnZXIgYW4gb25GT08gZXZlbnQgd2hlbiB3ZSBjYWxsIGl0cyBGT08oKSBtZXRob2Rcblx0XHRcdFx0XHR0bXAgPSBlbGVtWyBvbnR5cGUgXTtcblxuXHRcdFx0XHRcdGlmICggdG1wICkge1xuXHRcdFx0XHRcdFx0ZWxlbVsgb250eXBlIF0gPSBudWxsO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIFByZXZlbnQgcmUtdHJpZ2dlcmluZyBvZiB0aGUgc2FtZSBldmVudCwgc2luY2Ugd2UgYWxyZWFkeSBidWJibGVkIGl0IGFib3ZlXG5cdFx0XHRcdFx0alF1ZXJ5LmV2ZW50LnRyaWdnZXJlZCA9IHR5cGU7XG5cdFx0XHRcdFx0ZWxlbVsgdHlwZSBdKCk7XG5cdFx0XHRcdFx0alF1ZXJ5LmV2ZW50LnRyaWdnZXJlZCA9IHVuZGVmaW5lZDtcblxuXHRcdFx0XHRcdGlmICggdG1wICkge1xuXHRcdFx0XHRcdFx0ZWxlbVsgb250eXBlIF0gPSB0bXA7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGV2ZW50LnJlc3VsdDtcblx0fSxcblxuXHQvLyBQaWdneWJhY2sgb24gYSBkb25vciBldmVudCB0byBzaW11bGF0ZSBhIGRpZmZlcmVudCBvbmVcblx0Ly8gVXNlZCBvbmx5IGZvciBgZm9jdXMoaW4gfCBvdXQpYCBldmVudHNcblx0c2ltdWxhdGU6IGZ1bmN0aW9uKCB0eXBlLCBlbGVtLCBldmVudCApIHtcblx0XHR2YXIgZSA9IGpRdWVyeS5leHRlbmQoXG5cdFx0XHRuZXcgalF1ZXJ5LkV2ZW50KCksXG5cdFx0XHRldmVudCxcblx0XHRcdHtcblx0XHRcdFx0dHlwZTogdHlwZSxcblx0XHRcdFx0aXNTaW11bGF0ZWQ6IHRydWVcblx0XHRcdH1cblx0XHQpO1xuXG5cdFx0alF1ZXJ5LmV2ZW50LnRyaWdnZXIoIGUsIG51bGwsIGVsZW0gKTtcblx0fVxuXG59ICk7XG5cbmpRdWVyeS5mbi5leHRlbmQoIHtcblxuXHR0cmlnZ2VyOiBmdW5jdGlvbiggdHlwZSwgZGF0YSApIHtcblx0XHRyZXR1cm4gdGhpcy5lYWNoKCBmdW5jdGlvbigpIHtcblx0XHRcdGpRdWVyeS5ldmVudC50cmlnZ2VyKCB0eXBlLCBkYXRhLCB0aGlzICk7XG5cdFx0fSApO1xuXHR9LFxuXHR0cmlnZ2VySGFuZGxlcjogZnVuY3Rpb24oIHR5cGUsIGRhdGEgKSB7XG5cdFx0dmFyIGVsZW0gPSB0aGlzWyAwIF07XG5cdFx0aWYgKCBlbGVtICkge1xuXHRcdFx0cmV0dXJuIGpRdWVyeS5ldmVudC50cmlnZ2VyKCB0eXBlLCBkYXRhLCBlbGVtLCB0cnVlICk7XG5cdFx0fVxuXHR9XG59ICk7XG5cblxualF1ZXJ5LmVhY2goICggXCJibHVyIGZvY3VzIGZvY3VzaW4gZm9jdXNvdXQgbG9hZCByZXNpemUgc2Nyb2xsIHVubG9hZCBjbGljayBkYmxjbGljayBcIiArXG5cdFwibW91c2Vkb3duIG1vdXNldXAgbW91c2Vtb3ZlIG1vdXNlb3ZlciBtb3VzZW91dCBtb3VzZWVudGVyIG1vdXNlbGVhdmUgXCIgK1xuXHRcImNoYW5nZSBzZWxlY3Qgc3VibWl0IGtleWRvd24ga2V5cHJlc3Mga2V5dXAgZXJyb3IgY29udGV4dG1lbnVcIiApLnNwbGl0KCBcIiBcIiApLFxuXHRmdW5jdGlvbiggaSwgbmFtZSApIHtcblxuXHQvLyBIYW5kbGUgZXZlbnQgYmluZGluZ1xuXHRqUXVlcnkuZm5bIG5hbWUgXSA9IGZ1bmN0aW9uKCBkYXRhLCBmbiApIHtcblx0XHRyZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA+IDAgP1xuXHRcdFx0dGhpcy5vbiggbmFtZSwgbnVsbCwgZGF0YSwgZm4gKSA6XG5cdFx0XHR0aGlzLnRyaWdnZXIoIG5hbWUgKTtcblx0fTtcbn0gKTtcblxualF1ZXJ5LmZuLmV4dGVuZCgge1xuXHRob3ZlcjogZnVuY3Rpb24oIGZuT3ZlciwgZm5PdXQgKSB7XG5cdFx0cmV0dXJuIHRoaXMubW91c2VlbnRlciggZm5PdmVyICkubW91c2VsZWF2ZSggZm5PdXQgfHwgZm5PdmVyICk7XG5cdH1cbn0gKTtcblxuXG5cblxuc3VwcG9ydC5mb2N1c2luID0gXCJvbmZvY3VzaW5cIiBpbiB3aW5kb3c7XG5cblxuLy8gU3VwcG9ydDogRmlyZWZveFxuLy8gRmlyZWZveCBkb2Vzbid0IGhhdmUgZm9jdXMoaW4gfCBvdXQpIGV2ZW50c1xuLy8gUmVsYXRlZCB0aWNrZXQgLSBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD02ODc3ODdcbi8vXG4vLyBTdXBwb3J0OiBDaHJvbWUsIFNhZmFyaVxuLy8gZm9jdXMoaW4gfCBvdXQpIGV2ZW50cyBmaXJlIGFmdGVyIGZvY3VzICYgYmx1ciBldmVudHMsXG4vLyB3aGljaCBpcyBzcGVjIHZpb2xhdGlvbiAtIGh0dHA6Ly93d3cudzMub3JnL1RSL0RPTS1MZXZlbC0zLUV2ZW50cy8jZXZlbnRzLWZvY3VzZXZlbnQtZXZlbnQtb3JkZXJcbi8vIFJlbGF0ZWQgdGlja2V0IC0gaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTQ0OTg1N1xuaWYgKCAhc3VwcG9ydC5mb2N1c2luICkge1xuXHRqUXVlcnkuZWFjaCggeyBmb2N1czogXCJmb2N1c2luXCIsIGJsdXI6IFwiZm9jdXNvdXRcIiB9LCBmdW5jdGlvbiggb3JpZywgZml4ICkge1xuXG5cdFx0Ly8gQXR0YWNoIGEgc2luZ2xlIGNhcHR1cmluZyBoYW5kbGVyIG9uIHRoZSBkb2N1bWVudCB3aGlsZSBzb21lb25lIHdhbnRzIGZvY3VzaW4vZm9jdXNvdXRcblx0XHR2YXIgaGFuZGxlciA9IGZ1bmN0aW9uKCBldmVudCApIHtcblx0XHRcdGpRdWVyeS5ldmVudC5zaW11bGF0ZSggZml4LCBldmVudC50YXJnZXQsIGpRdWVyeS5ldmVudC5maXgoIGV2ZW50ICkgKTtcblx0XHR9O1xuXG5cdFx0alF1ZXJ5LmV2ZW50LnNwZWNpYWxbIGZpeCBdID0ge1xuXHRcdFx0c2V0dXA6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgZG9jID0gdGhpcy5vd25lckRvY3VtZW50IHx8IHRoaXMsXG5cdFx0XHRcdFx0YXR0YWNoZXMgPSBkYXRhUHJpdi5hY2Nlc3MoIGRvYywgZml4ICk7XG5cblx0XHRcdFx0aWYgKCAhYXR0YWNoZXMgKSB7XG5cdFx0XHRcdFx0ZG9jLmFkZEV2ZW50TGlzdGVuZXIoIG9yaWcsIGhhbmRsZXIsIHRydWUgKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRkYXRhUHJpdi5hY2Nlc3MoIGRvYywgZml4LCAoIGF0dGFjaGVzIHx8IDAgKSArIDEgKTtcblx0XHRcdH0sXG5cdFx0XHR0ZWFyZG93bjogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBkb2MgPSB0aGlzLm93bmVyRG9jdW1lbnQgfHwgdGhpcyxcblx0XHRcdFx0XHRhdHRhY2hlcyA9IGRhdGFQcml2LmFjY2VzcyggZG9jLCBmaXggKSAtIDE7XG5cblx0XHRcdFx0aWYgKCAhYXR0YWNoZXMgKSB7XG5cdFx0XHRcdFx0ZG9jLnJlbW92ZUV2ZW50TGlzdGVuZXIoIG9yaWcsIGhhbmRsZXIsIHRydWUgKTtcblx0XHRcdFx0XHRkYXRhUHJpdi5yZW1vdmUoIGRvYywgZml4ICk7XG5cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRkYXRhUHJpdi5hY2Nlc3MoIGRvYywgZml4LCBhdHRhY2hlcyApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblx0fSApO1xufVxudmFyIGxvY2F0aW9uID0gd2luZG93LmxvY2F0aW9uO1xuXG52YXIgbm9uY2UgPSBqUXVlcnkubm93KCk7XG5cbnZhciBycXVlcnkgPSAoIC9cXD8vICk7XG5cblxuXG4vLyBTdXBwb3J0OiBBbmRyb2lkIDIuM1xuLy8gV29ya2Fyb3VuZCBmYWlsdXJlIHRvIHN0cmluZy1jYXN0IG51bGwgaW5wdXRcbmpRdWVyeS5wYXJzZUpTT04gPSBmdW5jdGlvbiggZGF0YSApIHtcblx0cmV0dXJuIEpTT04ucGFyc2UoIGRhdGEgKyBcIlwiICk7XG59O1xuXG5cbi8vIENyb3NzLWJyb3dzZXIgeG1sIHBhcnNpbmdcbmpRdWVyeS5wYXJzZVhNTCA9IGZ1bmN0aW9uKCBkYXRhICkge1xuXHR2YXIgeG1sO1xuXHRpZiAoICFkYXRhIHx8IHR5cGVvZiBkYXRhICE9PSBcInN0cmluZ1wiICkge1xuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cblx0Ly8gU3VwcG9ydDogSUU5XG5cdHRyeSB7XG5cdFx0eG1sID0gKCBuZXcgd2luZG93LkRPTVBhcnNlcigpICkucGFyc2VGcm9tU3RyaW5nKCBkYXRhLCBcInRleHQveG1sXCIgKTtcblx0fSBjYXRjaCAoIGUgKSB7XG5cdFx0eG1sID0gdW5kZWZpbmVkO1xuXHR9XG5cblx0aWYgKCAheG1sIHx8IHhtbC5nZXRFbGVtZW50c0J5VGFnTmFtZSggXCJwYXJzZXJlcnJvclwiICkubGVuZ3RoICkge1xuXHRcdGpRdWVyeS5lcnJvciggXCJJbnZhbGlkIFhNTDogXCIgKyBkYXRhICk7XG5cdH1cblx0cmV0dXJuIHhtbDtcbn07XG5cblxudmFyXG5cdHJoYXNoID0gLyMuKiQvLFxuXHRydHMgPSAvKFs/Jl0pXz1bXiZdKi8sXG5cdHJoZWFkZXJzID0gL14oLio/KTpbIFxcdF0qKFteXFxyXFxuXSopJC9tZyxcblxuXHQvLyAjNzY1MywgIzgxMjUsICM4MTUyOiBsb2NhbCBwcm90b2NvbCBkZXRlY3Rpb25cblx0cmxvY2FsUHJvdG9jb2wgPSAvXig/OmFib3V0fGFwcHxhcHAtc3RvcmFnZXwuKy1leHRlbnNpb258ZmlsZXxyZXN8d2lkZ2V0KTokLyxcblx0cm5vQ29udGVudCA9IC9eKD86R0VUfEhFQUQpJC8sXG5cdHJwcm90b2NvbCA9IC9eXFwvXFwvLyxcblxuXHQvKiBQcmVmaWx0ZXJzXG5cdCAqIDEpIFRoZXkgYXJlIHVzZWZ1bCB0byBpbnRyb2R1Y2UgY3VzdG9tIGRhdGFUeXBlcyAoc2VlIGFqYXgvanNvbnAuanMgZm9yIGFuIGV4YW1wbGUpXG5cdCAqIDIpIFRoZXNlIGFyZSBjYWxsZWQ6XG5cdCAqICAgIC0gQkVGT1JFIGFza2luZyBmb3IgYSB0cmFuc3BvcnRcblx0ICogICAgLSBBRlRFUiBwYXJhbSBzZXJpYWxpemF0aW9uIChzLmRhdGEgaXMgYSBzdHJpbmcgaWYgcy5wcm9jZXNzRGF0YSBpcyB0cnVlKVxuXHQgKiAzKSBrZXkgaXMgdGhlIGRhdGFUeXBlXG5cdCAqIDQpIHRoZSBjYXRjaGFsbCBzeW1ib2wgXCIqXCIgY2FuIGJlIHVzZWRcblx0ICogNSkgZXhlY3V0aW9uIHdpbGwgc3RhcnQgd2l0aCB0cmFuc3BvcnQgZGF0YVR5cGUgYW5kIFRIRU4gY29udGludWUgZG93biB0byBcIipcIiBpZiBuZWVkZWRcblx0ICovXG5cdHByZWZpbHRlcnMgPSB7fSxcblxuXHQvKiBUcmFuc3BvcnRzIGJpbmRpbmdzXG5cdCAqIDEpIGtleSBpcyB0aGUgZGF0YVR5cGVcblx0ICogMikgdGhlIGNhdGNoYWxsIHN5bWJvbCBcIipcIiBjYW4gYmUgdXNlZFxuXHQgKiAzKSBzZWxlY3Rpb24gd2lsbCBzdGFydCB3aXRoIHRyYW5zcG9ydCBkYXRhVHlwZSBhbmQgVEhFTiBnbyB0byBcIipcIiBpZiBuZWVkZWRcblx0ICovXG5cdHRyYW5zcG9ydHMgPSB7fSxcblxuXHQvLyBBdm9pZCBjb21tZW50LXByb2xvZyBjaGFyIHNlcXVlbmNlICgjMTAwOTgpOyBtdXN0IGFwcGVhc2UgbGludCBhbmQgZXZhZGUgY29tcHJlc3Npb25cblx0YWxsVHlwZXMgPSBcIiovXCIuY29uY2F0KCBcIipcIiApLFxuXG5cdC8vIEFuY2hvciB0YWcgZm9yIHBhcnNpbmcgdGhlIGRvY3VtZW50IG9yaWdpblxuXHRvcmlnaW5BbmNob3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcImFcIiApO1xuXHRvcmlnaW5BbmNob3IuaHJlZiA9IGxvY2F0aW9uLmhyZWY7XG5cbi8vIEJhc2UgXCJjb25zdHJ1Y3RvclwiIGZvciBqUXVlcnkuYWpheFByZWZpbHRlciBhbmQgalF1ZXJ5LmFqYXhUcmFuc3BvcnRcbmZ1bmN0aW9uIGFkZFRvUHJlZmlsdGVyc09yVHJhbnNwb3J0cyggc3RydWN0dXJlICkge1xuXG5cdC8vIGRhdGFUeXBlRXhwcmVzc2lvbiBpcyBvcHRpb25hbCBhbmQgZGVmYXVsdHMgdG8gXCIqXCJcblx0cmV0dXJuIGZ1bmN0aW9uKCBkYXRhVHlwZUV4cHJlc3Npb24sIGZ1bmMgKSB7XG5cblx0XHRpZiAoIHR5cGVvZiBkYXRhVHlwZUV4cHJlc3Npb24gIT09IFwic3RyaW5nXCIgKSB7XG5cdFx0XHRmdW5jID0gZGF0YVR5cGVFeHByZXNzaW9uO1xuXHRcdFx0ZGF0YVR5cGVFeHByZXNzaW9uID0gXCIqXCI7XG5cdFx0fVxuXG5cdFx0dmFyIGRhdGFUeXBlLFxuXHRcdFx0aSA9IDAsXG5cdFx0XHRkYXRhVHlwZXMgPSBkYXRhVHlwZUV4cHJlc3Npb24udG9Mb3dlckNhc2UoKS5tYXRjaCggcm5vdHdoaXRlICkgfHwgW107XG5cblx0XHRpZiAoIGpRdWVyeS5pc0Z1bmN0aW9uKCBmdW5jICkgKSB7XG5cblx0XHRcdC8vIEZvciBlYWNoIGRhdGFUeXBlIGluIHRoZSBkYXRhVHlwZUV4cHJlc3Npb25cblx0XHRcdHdoaWxlICggKCBkYXRhVHlwZSA9IGRhdGFUeXBlc1sgaSsrIF0gKSApIHtcblxuXHRcdFx0XHQvLyBQcmVwZW5kIGlmIHJlcXVlc3RlZFxuXHRcdFx0XHRpZiAoIGRhdGFUeXBlWyAwIF0gPT09IFwiK1wiICkge1xuXHRcdFx0XHRcdGRhdGFUeXBlID0gZGF0YVR5cGUuc2xpY2UoIDEgKSB8fCBcIipcIjtcblx0XHRcdFx0XHQoIHN0cnVjdHVyZVsgZGF0YVR5cGUgXSA9IHN0cnVjdHVyZVsgZGF0YVR5cGUgXSB8fCBbXSApLnVuc2hpZnQoIGZ1bmMgKTtcblxuXHRcdFx0XHQvLyBPdGhlcndpc2UgYXBwZW5kXG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0KCBzdHJ1Y3R1cmVbIGRhdGFUeXBlIF0gPSBzdHJ1Y3R1cmVbIGRhdGFUeXBlIF0gfHwgW10gKS5wdXNoKCBmdW5jICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH07XG59XG5cbi8vIEJhc2UgaW5zcGVjdGlvbiBmdW5jdGlvbiBmb3IgcHJlZmlsdGVycyBhbmQgdHJhbnNwb3J0c1xuZnVuY3Rpb24gaW5zcGVjdFByZWZpbHRlcnNPclRyYW5zcG9ydHMoIHN0cnVjdHVyZSwgb3B0aW9ucywgb3JpZ2luYWxPcHRpb25zLCBqcVhIUiApIHtcblxuXHR2YXIgaW5zcGVjdGVkID0ge30sXG5cdFx0c2Vla2luZ1RyYW5zcG9ydCA9ICggc3RydWN0dXJlID09PSB0cmFuc3BvcnRzICk7XG5cblx0ZnVuY3Rpb24gaW5zcGVjdCggZGF0YVR5cGUgKSB7XG5cdFx0dmFyIHNlbGVjdGVkO1xuXHRcdGluc3BlY3RlZFsgZGF0YVR5cGUgXSA9IHRydWU7XG5cdFx0alF1ZXJ5LmVhY2goIHN0cnVjdHVyZVsgZGF0YVR5cGUgXSB8fCBbXSwgZnVuY3Rpb24oIF8sIHByZWZpbHRlck9yRmFjdG9yeSApIHtcblx0XHRcdHZhciBkYXRhVHlwZU9yVHJhbnNwb3J0ID0gcHJlZmlsdGVyT3JGYWN0b3J5KCBvcHRpb25zLCBvcmlnaW5hbE9wdGlvbnMsIGpxWEhSICk7XG5cdFx0XHRpZiAoIHR5cGVvZiBkYXRhVHlwZU9yVHJhbnNwb3J0ID09PSBcInN0cmluZ1wiICYmXG5cdFx0XHRcdCFzZWVraW5nVHJhbnNwb3J0ICYmICFpbnNwZWN0ZWRbIGRhdGFUeXBlT3JUcmFuc3BvcnQgXSApIHtcblxuXHRcdFx0XHRvcHRpb25zLmRhdGFUeXBlcy51bnNoaWZ0KCBkYXRhVHlwZU9yVHJhbnNwb3J0ICk7XG5cdFx0XHRcdGluc3BlY3QoIGRhdGFUeXBlT3JUcmFuc3BvcnQgKTtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fSBlbHNlIGlmICggc2Vla2luZ1RyYW5zcG9ydCApIHtcblx0XHRcdFx0cmV0dXJuICEoIHNlbGVjdGVkID0gZGF0YVR5cGVPclRyYW5zcG9ydCApO1xuXHRcdFx0fVxuXHRcdH0gKTtcblx0XHRyZXR1cm4gc2VsZWN0ZWQ7XG5cdH1cblxuXHRyZXR1cm4gaW5zcGVjdCggb3B0aW9ucy5kYXRhVHlwZXNbIDAgXSApIHx8ICFpbnNwZWN0ZWRbIFwiKlwiIF0gJiYgaW5zcGVjdCggXCIqXCIgKTtcbn1cblxuLy8gQSBzcGVjaWFsIGV4dGVuZCBmb3IgYWpheCBvcHRpb25zXG4vLyB0aGF0IHRha2VzIFwiZmxhdFwiIG9wdGlvbnMgKG5vdCB0byBiZSBkZWVwIGV4dGVuZGVkKVxuLy8gRml4ZXMgIzk4ODdcbmZ1bmN0aW9uIGFqYXhFeHRlbmQoIHRhcmdldCwgc3JjICkge1xuXHR2YXIga2V5LCBkZWVwLFxuXHRcdGZsYXRPcHRpb25zID0galF1ZXJ5LmFqYXhTZXR0aW5ncy5mbGF0T3B0aW9ucyB8fCB7fTtcblxuXHRmb3IgKCBrZXkgaW4gc3JjICkge1xuXHRcdGlmICggc3JjWyBrZXkgXSAhPT0gdW5kZWZpbmVkICkge1xuXHRcdFx0KCBmbGF0T3B0aW9uc1sga2V5IF0gPyB0YXJnZXQgOiAoIGRlZXAgfHwgKCBkZWVwID0ge30gKSApIClbIGtleSBdID0gc3JjWyBrZXkgXTtcblx0XHR9XG5cdH1cblx0aWYgKCBkZWVwICkge1xuXHRcdGpRdWVyeS5leHRlbmQoIHRydWUsIHRhcmdldCwgZGVlcCApO1xuXHR9XG5cblx0cmV0dXJuIHRhcmdldDtcbn1cblxuLyogSGFuZGxlcyByZXNwb25zZXMgdG8gYW4gYWpheCByZXF1ZXN0OlxuICogLSBmaW5kcyB0aGUgcmlnaHQgZGF0YVR5cGUgKG1lZGlhdGVzIGJldHdlZW4gY29udGVudC10eXBlIGFuZCBleHBlY3RlZCBkYXRhVHlwZSlcbiAqIC0gcmV0dXJucyB0aGUgY29ycmVzcG9uZGluZyByZXNwb25zZVxuICovXG5mdW5jdGlvbiBhamF4SGFuZGxlUmVzcG9uc2VzKCBzLCBqcVhIUiwgcmVzcG9uc2VzICkge1xuXG5cdHZhciBjdCwgdHlwZSwgZmluYWxEYXRhVHlwZSwgZmlyc3REYXRhVHlwZSxcblx0XHRjb250ZW50cyA9IHMuY29udGVudHMsXG5cdFx0ZGF0YVR5cGVzID0gcy5kYXRhVHlwZXM7XG5cblx0Ly8gUmVtb3ZlIGF1dG8gZGF0YVR5cGUgYW5kIGdldCBjb250ZW50LXR5cGUgaW4gdGhlIHByb2Nlc3Ncblx0d2hpbGUgKCBkYXRhVHlwZXNbIDAgXSA9PT0gXCIqXCIgKSB7XG5cdFx0ZGF0YVR5cGVzLnNoaWZ0KCk7XG5cdFx0aWYgKCBjdCA9PT0gdW5kZWZpbmVkICkge1xuXHRcdFx0Y3QgPSBzLm1pbWVUeXBlIHx8IGpxWEhSLmdldFJlc3BvbnNlSGVhZGVyKCBcIkNvbnRlbnQtVHlwZVwiICk7XG5cdFx0fVxuXHR9XG5cblx0Ly8gQ2hlY2sgaWYgd2UncmUgZGVhbGluZyB3aXRoIGEga25vd24gY29udGVudC10eXBlXG5cdGlmICggY3QgKSB7XG5cdFx0Zm9yICggdHlwZSBpbiBjb250ZW50cyApIHtcblx0XHRcdGlmICggY29udGVudHNbIHR5cGUgXSAmJiBjb250ZW50c1sgdHlwZSBdLnRlc3QoIGN0ICkgKSB7XG5cdFx0XHRcdGRhdGFUeXBlcy51bnNoaWZ0KCB0eXBlICk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8vIENoZWNrIHRvIHNlZSBpZiB3ZSBoYXZlIGEgcmVzcG9uc2UgZm9yIHRoZSBleHBlY3RlZCBkYXRhVHlwZVxuXHRpZiAoIGRhdGFUeXBlc1sgMCBdIGluIHJlc3BvbnNlcyApIHtcblx0XHRmaW5hbERhdGFUeXBlID0gZGF0YVR5cGVzWyAwIF07XG5cdH0gZWxzZSB7XG5cblx0XHQvLyBUcnkgY29udmVydGlibGUgZGF0YVR5cGVzXG5cdFx0Zm9yICggdHlwZSBpbiByZXNwb25zZXMgKSB7XG5cdFx0XHRpZiAoICFkYXRhVHlwZXNbIDAgXSB8fCBzLmNvbnZlcnRlcnNbIHR5cGUgKyBcIiBcIiArIGRhdGFUeXBlc1sgMCBdIF0gKSB7XG5cdFx0XHRcdGZpbmFsRGF0YVR5cGUgPSB0eXBlO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdGlmICggIWZpcnN0RGF0YVR5cGUgKSB7XG5cdFx0XHRcdGZpcnN0RGF0YVR5cGUgPSB0eXBlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIE9yIGp1c3QgdXNlIGZpcnN0IG9uZVxuXHRcdGZpbmFsRGF0YVR5cGUgPSBmaW5hbERhdGFUeXBlIHx8IGZpcnN0RGF0YVR5cGU7XG5cdH1cblxuXHQvLyBJZiB3ZSBmb3VuZCBhIGRhdGFUeXBlXG5cdC8vIFdlIGFkZCB0aGUgZGF0YVR5cGUgdG8gdGhlIGxpc3QgaWYgbmVlZGVkXG5cdC8vIGFuZCByZXR1cm4gdGhlIGNvcnJlc3BvbmRpbmcgcmVzcG9uc2Vcblx0aWYgKCBmaW5hbERhdGFUeXBlICkge1xuXHRcdGlmICggZmluYWxEYXRhVHlwZSAhPT0gZGF0YVR5cGVzWyAwIF0gKSB7XG5cdFx0XHRkYXRhVHlwZXMudW5zaGlmdCggZmluYWxEYXRhVHlwZSApO1xuXHRcdH1cblx0XHRyZXR1cm4gcmVzcG9uc2VzWyBmaW5hbERhdGFUeXBlIF07XG5cdH1cbn1cblxuLyogQ2hhaW4gY29udmVyc2lvbnMgZ2l2ZW4gdGhlIHJlcXVlc3QgYW5kIHRoZSBvcmlnaW5hbCByZXNwb25zZVxuICogQWxzbyBzZXRzIHRoZSByZXNwb25zZVhYWCBmaWVsZHMgb24gdGhlIGpxWEhSIGluc3RhbmNlXG4gKi9cbmZ1bmN0aW9uIGFqYXhDb252ZXJ0KCBzLCByZXNwb25zZSwganFYSFIsIGlzU3VjY2VzcyApIHtcblx0dmFyIGNvbnYyLCBjdXJyZW50LCBjb252LCB0bXAsIHByZXYsXG5cdFx0Y29udmVydGVycyA9IHt9LFxuXG5cdFx0Ly8gV29yayB3aXRoIGEgY29weSBvZiBkYXRhVHlwZXMgaW4gY2FzZSB3ZSBuZWVkIHRvIG1vZGlmeSBpdCBmb3IgY29udmVyc2lvblxuXHRcdGRhdGFUeXBlcyA9IHMuZGF0YVR5cGVzLnNsaWNlKCk7XG5cblx0Ly8gQ3JlYXRlIGNvbnZlcnRlcnMgbWFwIHdpdGggbG93ZXJjYXNlZCBrZXlzXG5cdGlmICggZGF0YVR5cGVzWyAxIF0gKSB7XG5cdFx0Zm9yICggY29udiBpbiBzLmNvbnZlcnRlcnMgKSB7XG5cdFx0XHRjb252ZXJ0ZXJzWyBjb252LnRvTG93ZXJDYXNlKCkgXSA9IHMuY29udmVydGVyc1sgY29udiBdO1xuXHRcdH1cblx0fVxuXG5cdGN1cnJlbnQgPSBkYXRhVHlwZXMuc2hpZnQoKTtcblxuXHQvLyBDb252ZXJ0IHRvIGVhY2ggc2VxdWVudGlhbCBkYXRhVHlwZVxuXHR3aGlsZSAoIGN1cnJlbnQgKSB7XG5cblx0XHRpZiAoIHMucmVzcG9uc2VGaWVsZHNbIGN1cnJlbnQgXSApIHtcblx0XHRcdGpxWEhSWyBzLnJlc3BvbnNlRmllbGRzWyBjdXJyZW50IF0gXSA9IHJlc3BvbnNlO1xuXHRcdH1cblxuXHRcdC8vIEFwcGx5IHRoZSBkYXRhRmlsdGVyIGlmIHByb3ZpZGVkXG5cdFx0aWYgKCAhcHJldiAmJiBpc1N1Y2Nlc3MgJiYgcy5kYXRhRmlsdGVyICkge1xuXHRcdFx0cmVzcG9uc2UgPSBzLmRhdGFGaWx0ZXIoIHJlc3BvbnNlLCBzLmRhdGFUeXBlICk7XG5cdFx0fVxuXG5cdFx0cHJldiA9IGN1cnJlbnQ7XG5cdFx0Y3VycmVudCA9IGRhdGFUeXBlcy5zaGlmdCgpO1xuXG5cdFx0aWYgKCBjdXJyZW50ICkge1xuXG5cdFx0Ly8gVGhlcmUncyBvbmx5IHdvcmsgdG8gZG8gaWYgY3VycmVudCBkYXRhVHlwZSBpcyBub24tYXV0b1xuXHRcdFx0aWYgKCBjdXJyZW50ID09PSBcIipcIiApIHtcblxuXHRcdFx0XHRjdXJyZW50ID0gcHJldjtcblxuXHRcdFx0Ly8gQ29udmVydCByZXNwb25zZSBpZiBwcmV2IGRhdGFUeXBlIGlzIG5vbi1hdXRvIGFuZCBkaWZmZXJzIGZyb20gY3VycmVudFxuXHRcdFx0fSBlbHNlIGlmICggcHJldiAhPT0gXCIqXCIgJiYgcHJldiAhPT0gY3VycmVudCApIHtcblxuXHRcdFx0XHQvLyBTZWVrIGEgZGlyZWN0IGNvbnZlcnRlclxuXHRcdFx0XHRjb252ID0gY29udmVydGVyc1sgcHJldiArIFwiIFwiICsgY3VycmVudCBdIHx8IGNvbnZlcnRlcnNbIFwiKiBcIiArIGN1cnJlbnQgXTtcblxuXHRcdFx0XHQvLyBJZiBub25lIGZvdW5kLCBzZWVrIGEgcGFpclxuXHRcdFx0XHRpZiAoICFjb252ICkge1xuXHRcdFx0XHRcdGZvciAoIGNvbnYyIGluIGNvbnZlcnRlcnMgKSB7XG5cblx0XHRcdFx0XHRcdC8vIElmIGNvbnYyIG91dHB1dHMgY3VycmVudFxuXHRcdFx0XHRcdFx0dG1wID0gY29udjIuc3BsaXQoIFwiIFwiICk7XG5cdFx0XHRcdFx0XHRpZiAoIHRtcFsgMSBdID09PSBjdXJyZW50ICkge1xuXG5cdFx0XHRcdFx0XHRcdC8vIElmIHByZXYgY2FuIGJlIGNvbnZlcnRlZCB0byBhY2NlcHRlZCBpbnB1dFxuXHRcdFx0XHRcdFx0XHRjb252ID0gY29udmVydGVyc1sgcHJldiArIFwiIFwiICsgdG1wWyAwIF0gXSB8fFxuXHRcdFx0XHRcdFx0XHRcdGNvbnZlcnRlcnNbIFwiKiBcIiArIHRtcFsgMCBdIF07XG5cdFx0XHRcdFx0XHRcdGlmICggY29udiApIHtcblxuXHRcdFx0XHRcdFx0XHRcdC8vIENvbmRlbnNlIGVxdWl2YWxlbmNlIGNvbnZlcnRlcnNcblx0XHRcdFx0XHRcdFx0XHRpZiAoIGNvbnYgPT09IHRydWUgKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRjb252ID0gY29udmVydGVyc1sgY29udjIgXTtcblxuXHRcdFx0XHRcdFx0XHRcdC8vIE90aGVyd2lzZSwgaW5zZXJ0IHRoZSBpbnRlcm1lZGlhdGUgZGF0YVR5cGVcblx0XHRcdFx0XHRcdFx0XHR9IGVsc2UgaWYgKCBjb252ZXJ0ZXJzWyBjb252MiBdICE9PSB0cnVlICkge1xuXHRcdFx0XHRcdFx0XHRcdFx0Y3VycmVudCA9IHRtcFsgMCBdO1xuXHRcdFx0XHRcdFx0XHRcdFx0ZGF0YVR5cGVzLnVuc2hpZnQoIHRtcFsgMSBdICk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gQXBwbHkgY29udmVydGVyIChpZiBub3QgYW4gZXF1aXZhbGVuY2UpXG5cdFx0XHRcdGlmICggY29udiAhPT0gdHJ1ZSApIHtcblxuXHRcdFx0XHRcdC8vIFVubGVzcyBlcnJvcnMgYXJlIGFsbG93ZWQgdG8gYnViYmxlLCBjYXRjaCBhbmQgcmV0dXJuIHRoZW1cblx0XHRcdFx0XHRpZiAoIGNvbnYgJiYgcy50aHJvd3MgKSB7XG5cdFx0XHRcdFx0XHRyZXNwb25zZSA9IGNvbnYoIHJlc3BvbnNlICk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRcdHJlc3BvbnNlID0gY29udiggcmVzcG9uc2UgKTtcblx0XHRcdFx0XHRcdH0gY2F0Y2ggKCBlICkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdFx0XHRcdHN0YXRlOiBcInBhcnNlcmVycm9yXCIsXG5cdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGNvbnYgPyBlIDogXCJObyBjb252ZXJzaW9uIGZyb20gXCIgKyBwcmV2ICsgXCIgdG8gXCIgKyBjdXJyZW50XG5cdFx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHsgc3RhdGU6IFwic3VjY2Vzc1wiLCBkYXRhOiByZXNwb25zZSB9O1xufVxuXG5qUXVlcnkuZXh0ZW5kKCB7XG5cblx0Ly8gQ291bnRlciBmb3IgaG9sZGluZyB0aGUgbnVtYmVyIG9mIGFjdGl2ZSBxdWVyaWVzXG5cdGFjdGl2ZTogMCxcblxuXHQvLyBMYXN0LU1vZGlmaWVkIGhlYWRlciBjYWNoZSBmb3IgbmV4dCByZXF1ZXN0XG5cdGxhc3RNb2RpZmllZDoge30sXG5cdGV0YWc6IHt9LFxuXG5cdGFqYXhTZXR0aW5nczoge1xuXHRcdHVybDogbG9jYXRpb24uaHJlZixcblx0XHR0eXBlOiBcIkdFVFwiLFxuXHRcdGlzTG9jYWw6IHJsb2NhbFByb3RvY29sLnRlc3QoIGxvY2F0aW9uLnByb3RvY29sICksXG5cdFx0Z2xvYmFsOiB0cnVlLFxuXHRcdHByb2Nlc3NEYXRhOiB0cnVlLFxuXHRcdGFzeW5jOiB0cnVlLFxuXHRcdGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDsgY2hhcnNldD1VVEYtOFwiLFxuXHRcdC8qXG5cdFx0dGltZW91dDogMCxcblx0XHRkYXRhOiBudWxsLFxuXHRcdGRhdGFUeXBlOiBudWxsLFxuXHRcdHVzZXJuYW1lOiBudWxsLFxuXHRcdHBhc3N3b3JkOiBudWxsLFxuXHRcdGNhY2hlOiBudWxsLFxuXHRcdHRocm93czogZmFsc2UsXG5cdFx0dHJhZGl0aW9uYWw6IGZhbHNlLFxuXHRcdGhlYWRlcnM6IHt9LFxuXHRcdCovXG5cblx0XHRhY2NlcHRzOiB7XG5cdFx0XHRcIipcIjogYWxsVHlwZXMsXG5cdFx0XHR0ZXh0OiBcInRleHQvcGxhaW5cIixcblx0XHRcdGh0bWw6IFwidGV4dC9odG1sXCIsXG5cdFx0XHR4bWw6IFwiYXBwbGljYXRpb24veG1sLCB0ZXh0L3htbFwiLFxuXHRcdFx0anNvbjogXCJhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L2phdmFzY3JpcHRcIlxuXHRcdH0sXG5cblx0XHRjb250ZW50czoge1xuXHRcdFx0eG1sOiAvXFxieG1sXFxiLyxcblx0XHRcdGh0bWw6IC9cXGJodG1sLyxcblx0XHRcdGpzb246IC9cXGJqc29uXFxiL1xuXHRcdH0sXG5cblx0XHRyZXNwb25zZUZpZWxkczoge1xuXHRcdFx0eG1sOiBcInJlc3BvbnNlWE1MXCIsXG5cdFx0XHR0ZXh0OiBcInJlc3BvbnNlVGV4dFwiLFxuXHRcdFx0anNvbjogXCJyZXNwb25zZUpTT05cIlxuXHRcdH0sXG5cblx0XHQvLyBEYXRhIGNvbnZlcnRlcnNcblx0XHQvLyBLZXlzIHNlcGFyYXRlIHNvdXJjZSAob3IgY2F0Y2hhbGwgXCIqXCIpIGFuZCBkZXN0aW5hdGlvbiB0eXBlcyB3aXRoIGEgc2luZ2xlIHNwYWNlXG5cdFx0Y29udmVydGVyczoge1xuXG5cdFx0XHQvLyBDb252ZXJ0IGFueXRoaW5nIHRvIHRleHRcblx0XHRcdFwiKiB0ZXh0XCI6IFN0cmluZyxcblxuXHRcdFx0Ly8gVGV4dCB0byBodG1sICh0cnVlID0gbm8gdHJhbnNmb3JtYXRpb24pXG5cdFx0XHRcInRleHQgaHRtbFwiOiB0cnVlLFxuXG5cdFx0XHQvLyBFdmFsdWF0ZSB0ZXh0IGFzIGEganNvbiBleHByZXNzaW9uXG5cdFx0XHRcInRleHQganNvblwiOiBqUXVlcnkucGFyc2VKU09OLFxuXG5cdFx0XHQvLyBQYXJzZSB0ZXh0IGFzIHhtbFxuXHRcdFx0XCJ0ZXh0IHhtbFwiOiBqUXVlcnkucGFyc2VYTUxcblx0XHR9LFxuXG5cdFx0Ly8gRm9yIG9wdGlvbnMgdGhhdCBzaG91bGRuJ3QgYmUgZGVlcCBleHRlbmRlZDpcblx0XHQvLyB5b3UgY2FuIGFkZCB5b3VyIG93biBjdXN0b20gb3B0aW9ucyBoZXJlIGlmXG5cdFx0Ly8gYW5kIHdoZW4geW91IGNyZWF0ZSBvbmUgdGhhdCBzaG91bGRuJ3QgYmVcblx0XHQvLyBkZWVwIGV4dGVuZGVkIChzZWUgYWpheEV4dGVuZClcblx0XHRmbGF0T3B0aW9uczoge1xuXHRcdFx0dXJsOiB0cnVlLFxuXHRcdFx0Y29udGV4dDogdHJ1ZVxuXHRcdH1cblx0fSxcblxuXHQvLyBDcmVhdGVzIGEgZnVsbCBmbGVkZ2VkIHNldHRpbmdzIG9iamVjdCBpbnRvIHRhcmdldFxuXHQvLyB3aXRoIGJvdGggYWpheFNldHRpbmdzIGFuZCBzZXR0aW5ncyBmaWVsZHMuXG5cdC8vIElmIHRhcmdldCBpcyBvbWl0dGVkLCB3cml0ZXMgaW50byBhamF4U2V0dGluZ3MuXG5cdGFqYXhTZXR1cDogZnVuY3Rpb24oIHRhcmdldCwgc2V0dGluZ3MgKSB7XG5cdFx0cmV0dXJuIHNldHRpbmdzID9cblxuXHRcdFx0Ly8gQnVpbGRpbmcgYSBzZXR0aW5ncyBvYmplY3Rcblx0XHRcdGFqYXhFeHRlbmQoIGFqYXhFeHRlbmQoIHRhcmdldCwgalF1ZXJ5LmFqYXhTZXR0aW5ncyApLCBzZXR0aW5ncyApIDpcblxuXHRcdFx0Ly8gRXh0ZW5kaW5nIGFqYXhTZXR0aW5nc1xuXHRcdFx0YWpheEV4dGVuZCggalF1ZXJ5LmFqYXhTZXR0aW5ncywgdGFyZ2V0ICk7XG5cdH0sXG5cblx0YWpheFByZWZpbHRlcjogYWRkVG9QcmVmaWx0ZXJzT3JUcmFuc3BvcnRzKCBwcmVmaWx0ZXJzICksXG5cdGFqYXhUcmFuc3BvcnQ6IGFkZFRvUHJlZmlsdGVyc09yVHJhbnNwb3J0cyggdHJhbnNwb3J0cyApLFxuXG5cdC8vIE1haW4gbWV0aG9kXG5cdGFqYXg6IGZ1bmN0aW9uKCB1cmwsIG9wdGlvbnMgKSB7XG5cblx0XHQvLyBJZiB1cmwgaXMgYW4gb2JqZWN0LCBzaW11bGF0ZSBwcmUtMS41IHNpZ25hdHVyZVxuXHRcdGlmICggdHlwZW9mIHVybCA9PT0gXCJvYmplY3RcIiApIHtcblx0XHRcdG9wdGlvbnMgPSB1cmw7XG5cdFx0XHR1cmwgPSB1bmRlZmluZWQ7XG5cdFx0fVxuXG5cdFx0Ly8gRm9yY2Ugb3B0aW9ucyB0byBiZSBhbiBvYmplY3Rcblx0XHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuXHRcdHZhciB0cmFuc3BvcnQsXG5cblx0XHRcdC8vIFVSTCB3aXRob3V0IGFudGktY2FjaGUgcGFyYW1cblx0XHRcdGNhY2hlVVJMLFxuXG5cdFx0XHQvLyBSZXNwb25zZSBoZWFkZXJzXG5cdFx0XHRyZXNwb25zZUhlYWRlcnNTdHJpbmcsXG5cdFx0XHRyZXNwb25zZUhlYWRlcnMsXG5cblx0XHRcdC8vIHRpbWVvdXQgaGFuZGxlXG5cdFx0XHR0aW1lb3V0VGltZXIsXG5cblx0XHRcdC8vIFVybCBjbGVhbnVwIHZhclxuXHRcdFx0dXJsQW5jaG9yLFxuXG5cdFx0XHQvLyBUbyBrbm93IGlmIGdsb2JhbCBldmVudHMgYXJlIHRvIGJlIGRpc3BhdGNoZWRcblx0XHRcdGZpcmVHbG9iYWxzLFxuXG5cdFx0XHQvLyBMb29wIHZhcmlhYmxlXG5cdFx0XHRpLFxuXG5cdFx0XHQvLyBDcmVhdGUgdGhlIGZpbmFsIG9wdGlvbnMgb2JqZWN0XG5cdFx0XHRzID0galF1ZXJ5LmFqYXhTZXR1cCgge30sIG9wdGlvbnMgKSxcblxuXHRcdFx0Ly8gQ2FsbGJhY2tzIGNvbnRleHRcblx0XHRcdGNhbGxiYWNrQ29udGV4dCA9IHMuY29udGV4dCB8fCBzLFxuXG5cdFx0XHQvLyBDb250ZXh0IGZvciBnbG9iYWwgZXZlbnRzIGlzIGNhbGxiYWNrQ29udGV4dCBpZiBpdCBpcyBhIERPTSBub2RlIG9yIGpRdWVyeSBjb2xsZWN0aW9uXG5cdFx0XHRnbG9iYWxFdmVudENvbnRleHQgPSBzLmNvbnRleHQgJiZcblx0XHRcdFx0KCBjYWxsYmFja0NvbnRleHQubm9kZVR5cGUgfHwgY2FsbGJhY2tDb250ZXh0LmpxdWVyeSApID9cblx0XHRcdFx0XHRqUXVlcnkoIGNhbGxiYWNrQ29udGV4dCApIDpcblx0XHRcdFx0XHRqUXVlcnkuZXZlbnQsXG5cblx0XHRcdC8vIERlZmVycmVkc1xuXHRcdFx0ZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcblx0XHRcdGNvbXBsZXRlRGVmZXJyZWQgPSBqUXVlcnkuQ2FsbGJhY2tzKCBcIm9uY2UgbWVtb3J5XCIgKSxcblxuXHRcdFx0Ly8gU3RhdHVzLWRlcGVuZGVudCBjYWxsYmFja3Ncblx0XHRcdHN0YXR1c0NvZGUgPSBzLnN0YXR1c0NvZGUgfHwge30sXG5cblx0XHRcdC8vIEhlYWRlcnMgKHRoZXkgYXJlIHNlbnQgYWxsIGF0IG9uY2UpXG5cdFx0XHRyZXF1ZXN0SGVhZGVycyA9IHt9LFxuXHRcdFx0cmVxdWVzdEhlYWRlcnNOYW1lcyA9IHt9LFxuXG5cdFx0XHQvLyBUaGUganFYSFIgc3RhdGVcblx0XHRcdHN0YXRlID0gMCxcblxuXHRcdFx0Ly8gRGVmYXVsdCBhYm9ydCBtZXNzYWdlXG5cdFx0XHRzdHJBYm9ydCA9IFwiY2FuY2VsZWRcIixcblxuXHRcdFx0Ly8gRmFrZSB4aHJcblx0XHRcdGpxWEhSID0ge1xuXHRcdFx0XHRyZWFkeVN0YXRlOiAwLFxuXG5cdFx0XHRcdC8vIEJ1aWxkcyBoZWFkZXJzIGhhc2h0YWJsZSBpZiBuZWVkZWRcblx0XHRcdFx0Z2V0UmVzcG9uc2VIZWFkZXI6IGZ1bmN0aW9uKCBrZXkgKSB7XG5cdFx0XHRcdFx0dmFyIG1hdGNoO1xuXHRcdFx0XHRcdGlmICggc3RhdGUgPT09IDIgKSB7XG5cdFx0XHRcdFx0XHRpZiAoICFyZXNwb25zZUhlYWRlcnMgKSB7XG5cdFx0XHRcdFx0XHRcdHJlc3BvbnNlSGVhZGVycyA9IHt9O1xuXHRcdFx0XHRcdFx0XHR3aGlsZSAoICggbWF0Y2ggPSByaGVhZGVycy5leGVjKCByZXNwb25zZUhlYWRlcnNTdHJpbmcgKSApICkge1xuXHRcdFx0XHRcdFx0XHRcdHJlc3BvbnNlSGVhZGVyc1sgbWF0Y2hbIDEgXS50b0xvd2VyQ2FzZSgpIF0gPSBtYXRjaFsgMiBdO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRtYXRjaCA9IHJlc3BvbnNlSGVhZGVyc1sga2V5LnRvTG93ZXJDYXNlKCkgXTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIG1hdGNoID09IG51bGwgPyBudWxsIDogbWF0Y2g7XG5cdFx0XHRcdH0sXG5cblx0XHRcdFx0Ly8gUmF3IHN0cmluZ1xuXHRcdFx0XHRnZXRBbGxSZXNwb25zZUhlYWRlcnM6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdHJldHVybiBzdGF0ZSA9PT0gMiA/IHJlc3BvbnNlSGVhZGVyc1N0cmluZyA6IG51bGw7XG5cdFx0XHRcdH0sXG5cblx0XHRcdFx0Ly8gQ2FjaGVzIHRoZSBoZWFkZXJcblx0XHRcdFx0c2V0UmVxdWVzdEhlYWRlcjogZnVuY3Rpb24oIG5hbWUsIHZhbHVlICkge1xuXHRcdFx0XHRcdHZhciBsbmFtZSA9IG5hbWUudG9Mb3dlckNhc2UoKTtcblx0XHRcdFx0XHRpZiAoICFzdGF0ZSApIHtcblx0XHRcdFx0XHRcdG5hbWUgPSByZXF1ZXN0SGVhZGVyc05hbWVzWyBsbmFtZSBdID0gcmVxdWVzdEhlYWRlcnNOYW1lc1sgbG5hbWUgXSB8fCBuYW1lO1xuXHRcdFx0XHRcdFx0cmVxdWVzdEhlYWRlcnNbIG5hbWUgXSA9IHZhbHVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdFx0fSxcblxuXHRcdFx0XHQvLyBPdmVycmlkZXMgcmVzcG9uc2UgY29udGVudC10eXBlIGhlYWRlclxuXHRcdFx0XHRvdmVycmlkZU1pbWVUeXBlOiBmdW5jdGlvbiggdHlwZSApIHtcblx0XHRcdFx0XHRpZiAoICFzdGF0ZSApIHtcblx0XHRcdFx0XHRcdHMubWltZVR5cGUgPSB0eXBlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdFx0fSxcblxuXHRcdFx0XHQvLyBTdGF0dXMtZGVwZW5kZW50IGNhbGxiYWNrc1xuXHRcdFx0XHRzdGF0dXNDb2RlOiBmdW5jdGlvbiggbWFwICkge1xuXHRcdFx0XHRcdHZhciBjb2RlO1xuXHRcdFx0XHRcdGlmICggbWFwICkge1xuXHRcdFx0XHRcdFx0aWYgKCBzdGF0ZSA8IDIgKSB7XG5cdFx0XHRcdFx0XHRcdGZvciAoIGNvZGUgaW4gbWFwICkge1xuXG5cdFx0XHRcdFx0XHRcdFx0Ly8gTGF6eS1hZGQgdGhlIG5ldyBjYWxsYmFjayBpbiBhIHdheSB0aGF0IHByZXNlcnZlcyBvbGQgb25lc1xuXHRcdFx0XHRcdFx0XHRcdHN0YXR1c0NvZGVbIGNvZGUgXSA9IFsgc3RhdHVzQ29kZVsgY29kZSBdLCBtYXBbIGNvZGUgXSBdO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdFx0XHRcdC8vIEV4ZWN1dGUgdGhlIGFwcHJvcHJpYXRlIGNhbGxiYWNrc1xuXHRcdFx0XHRcdFx0XHRqcVhIUi5hbHdheXMoIG1hcFsganFYSFIuc3RhdHVzIF0gKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHRcdH0sXG5cblx0XHRcdFx0Ly8gQ2FuY2VsIHRoZSByZXF1ZXN0XG5cdFx0XHRcdGFib3J0OiBmdW5jdGlvbiggc3RhdHVzVGV4dCApIHtcblx0XHRcdFx0XHR2YXIgZmluYWxUZXh0ID0gc3RhdHVzVGV4dCB8fCBzdHJBYm9ydDtcblx0XHRcdFx0XHRpZiAoIHRyYW5zcG9ydCApIHtcblx0XHRcdFx0XHRcdHRyYW5zcG9ydC5hYm9ydCggZmluYWxUZXh0ICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGRvbmUoIDAsIGZpbmFsVGV4dCApO1xuXHRcdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXG5cdFx0Ly8gQXR0YWNoIGRlZmVycmVkc1xuXHRcdGRlZmVycmVkLnByb21pc2UoIGpxWEhSICkuY29tcGxldGUgPSBjb21wbGV0ZURlZmVycmVkLmFkZDtcblx0XHRqcVhIUi5zdWNjZXNzID0ganFYSFIuZG9uZTtcblx0XHRqcVhIUi5lcnJvciA9IGpxWEhSLmZhaWw7XG5cblx0XHQvLyBSZW1vdmUgaGFzaCBjaGFyYWN0ZXIgKCM3NTMxOiBhbmQgc3RyaW5nIHByb21vdGlvbilcblx0XHQvLyBBZGQgcHJvdG9jb2wgaWYgbm90IHByb3ZpZGVkIChwcmVmaWx0ZXJzIG1pZ2h0IGV4cGVjdCBpdClcblx0XHQvLyBIYW5kbGUgZmFsc3kgdXJsIGluIHRoZSBzZXR0aW5ncyBvYmplY3QgKCMxMDA5MzogY29uc2lzdGVuY3kgd2l0aCBvbGQgc2lnbmF0dXJlKVxuXHRcdC8vIFdlIGFsc28gdXNlIHRoZSB1cmwgcGFyYW1ldGVyIGlmIGF2YWlsYWJsZVxuXHRcdHMudXJsID0gKCAoIHVybCB8fCBzLnVybCB8fCBsb2NhdGlvbi5ocmVmICkgKyBcIlwiICkucmVwbGFjZSggcmhhc2gsIFwiXCIgKVxuXHRcdFx0LnJlcGxhY2UoIHJwcm90b2NvbCwgbG9jYXRpb24ucHJvdG9jb2wgKyBcIi8vXCIgKTtcblxuXHRcdC8vIEFsaWFzIG1ldGhvZCBvcHRpb24gdG8gdHlwZSBhcyBwZXIgdGlja2V0ICMxMjAwNFxuXHRcdHMudHlwZSA9IG9wdGlvbnMubWV0aG9kIHx8IG9wdGlvbnMudHlwZSB8fCBzLm1ldGhvZCB8fCBzLnR5cGU7XG5cblx0XHQvLyBFeHRyYWN0IGRhdGFUeXBlcyBsaXN0XG5cdFx0cy5kYXRhVHlwZXMgPSBqUXVlcnkudHJpbSggcy5kYXRhVHlwZSB8fCBcIipcIiApLnRvTG93ZXJDYXNlKCkubWF0Y2goIHJub3R3aGl0ZSApIHx8IFsgXCJcIiBdO1xuXG5cdFx0Ly8gQSBjcm9zcy1kb21haW4gcmVxdWVzdCBpcyBpbiBvcmRlciB3aGVuIHRoZSBvcmlnaW4gZG9lc24ndCBtYXRjaCB0aGUgY3VycmVudCBvcmlnaW4uXG5cdFx0aWYgKCBzLmNyb3NzRG9tYWluID09IG51bGwgKSB7XG5cdFx0XHR1cmxBbmNob3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcImFcIiApO1xuXG5cdFx0XHQvLyBTdXBwb3J0OiBJRTgtMTErXG5cdFx0XHQvLyBJRSB0aHJvd3MgZXhjZXB0aW9uIGlmIHVybCBpcyBtYWxmb3JtZWQsIGUuZy4gaHR0cDovL2V4YW1wbGUuY29tOjgweC9cblx0XHRcdHRyeSB7XG5cdFx0XHRcdHVybEFuY2hvci5ocmVmID0gcy51cmw7XG5cblx0XHRcdFx0Ly8gU3VwcG9ydDogSUU4LTExK1xuXHRcdFx0XHQvLyBBbmNob3IncyBob3N0IHByb3BlcnR5IGlzbid0IGNvcnJlY3RseSBzZXQgd2hlbiBzLnVybCBpcyByZWxhdGl2ZVxuXHRcdFx0XHR1cmxBbmNob3IuaHJlZiA9IHVybEFuY2hvci5ocmVmO1xuXHRcdFx0XHRzLmNyb3NzRG9tYWluID0gb3JpZ2luQW5jaG9yLnByb3RvY29sICsgXCIvL1wiICsgb3JpZ2luQW5jaG9yLmhvc3QgIT09XG5cdFx0XHRcdFx0dXJsQW5jaG9yLnByb3RvY29sICsgXCIvL1wiICsgdXJsQW5jaG9yLmhvc3Q7XG5cdFx0XHR9IGNhdGNoICggZSApIHtcblxuXHRcdFx0XHQvLyBJZiB0aGVyZSBpcyBhbiBlcnJvciBwYXJzaW5nIHRoZSBVUkwsIGFzc3VtZSBpdCBpcyBjcm9zc0RvbWFpbixcblx0XHRcdFx0Ly8gaXQgY2FuIGJlIHJlamVjdGVkIGJ5IHRoZSB0cmFuc3BvcnQgaWYgaXQgaXMgaW52YWxpZFxuXHRcdFx0XHRzLmNyb3NzRG9tYWluID0gdHJ1ZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBDb252ZXJ0IGRhdGEgaWYgbm90IGFscmVhZHkgYSBzdHJpbmdcblx0XHRpZiAoIHMuZGF0YSAmJiBzLnByb2Nlc3NEYXRhICYmIHR5cGVvZiBzLmRhdGEgIT09IFwic3RyaW5nXCIgKSB7XG5cdFx0XHRzLmRhdGEgPSBqUXVlcnkucGFyYW0oIHMuZGF0YSwgcy50cmFkaXRpb25hbCApO1xuXHRcdH1cblxuXHRcdC8vIEFwcGx5IHByZWZpbHRlcnNcblx0XHRpbnNwZWN0UHJlZmlsdGVyc09yVHJhbnNwb3J0cyggcHJlZmlsdGVycywgcywgb3B0aW9ucywganFYSFIgKTtcblxuXHRcdC8vIElmIHJlcXVlc3Qgd2FzIGFib3J0ZWQgaW5zaWRlIGEgcHJlZmlsdGVyLCBzdG9wIHRoZXJlXG5cdFx0aWYgKCBzdGF0ZSA9PT0gMiApIHtcblx0XHRcdHJldHVybiBqcVhIUjtcblx0XHR9XG5cblx0XHQvLyBXZSBjYW4gZmlyZSBnbG9iYWwgZXZlbnRzIGFzIG9mIG5vdyBpZiBhc2tlZCB0b1xuXHRcdC8vIERvbid0IGZpcmUgZXZlbnRzIGlmIGpRdWVyeS5ldmVudCBpcyB1bmRlZmluZWQgaW4gYW4gQU1ELXVzYWdlIHNjZW5hcmlvICgjMTUxMTgpXG5cdFx0ZmlyZUdsb2JhbHMgPSBqUXVlcnkuZXZlbnQgJiYgcy5nbG9iYWw7XG5cblx0XHQvLyBXYXRjaCBmb3IgYSBuZXcgc2V0IG9mIHJlcXVlc3RzXG5cdFx0aWYgKCBmaXJlR2xvYmFscyAmJiBqUXVlcnkuYWN0aXZlKysgPT09IDAgKSB7XG5cdFx0XHRqUXVlcnkuZXZlbnQudHJpZ2dlciggXCJhamF4U3RhcnRcIiApO1xuXHRcdH1cblxuXHRcdC8vIFVwcGVyY2FzZSB0aGUgdHlwZVxuXHRcdHMudHlwZSA9IHMudHlwZS50b1VwcGVyQ2FzZSgpO1xuXG5cdFx0Ly8gRGV0ZXJtaW5lIGlmIHJlcXVlc3QgaGFzIGNvbnRlbnRcblx0XHRzLmhhc0NvbnRlbnQgPSAhcm5vQ29udGVudC50ZXN0KCBzLnR5cGUgKTtcblxuXHRcdC8vIFNhdmUgdGhlIFVSTCBpbiBjYXNlIHdlJ3JlIHRveWluZyB3aXRoIHRoZSBJZi1Nb2RpZmllZC1TaW5jZVxuXHRcdC8vIGFuZC9vciBJZi1Ob25lLU1hdGNoIGhlYWRlciBsYXRlciBvblxuXHRcdGNhY2hlVVJMID0gcy51cmw7XG5cblx0XHQvLyBNb3JlIG9wdGlvbnMgaGFuZGxpbmcgZm9yIHJlcXVlc3RzIHdpdGggbm8gY29udGVudFxuXHRcdGlmICggIXMuaGFzQ29udGVudCApIHtcblxuXHRcdFx0Ly8gSWYgZGF0YSBpcyBhdmFpbGFibGUsIGFwcGVuZCBkYXRhIHRvIHVybFxuXHRcdFx0aWYgKCBzLmRhdGEgKSB7XG5cdFx0XHRcdGNhY2hlVVJMID0gKCBzLnVybCArPSAoIHJxdWVyeS50ZXN0KCBjYWNoZVVSTCApID8gXCImXCIgOiBcIj9cIiApICsgcy5kYXRhICk7XG5cblx0XHRcdFx0Ly8gIzk2ODI6IHJlbW92ZSBkYXRhIHNvIHRoYXQgaXQncyBub3QgdXNlZCBpbiBhbiBldmVudHVhbCByZXRyeVxuXHRcdFx0XHRkZWxldGUgcy5kYXRhO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBBZGQgYW50aS1jYWNoZSBpbiB1cmwgaWYgbmVlZGVkXG5cdFx0XHRpZiAoIHMuY2FjaGUgPT09IGZhbHNlICkge1xuXHRcdFx0XHRzLnVybCA9IHJ0cy50ZXN0KCBjYWNoZVVSTCApID9cblxuXHRcdFx0XHRcdC8vIElmIHRoZXJlIGlzIGFscmVhZHkgYSAnXycgcGFyYW1ldGVyLCBzZXQgaXRzIHZhbHVlXG5cdFx0XHRcdFx0Y2FjaGVVUkwucmVwbGFjZSggcnRzLCBcIiQxXz1cIiArIG5vbmNlKysgKSA6XG5cblx0XHRcdFx0XHQvLyBPdGhlcndpc2UgYWRkIG9uZSB0byB0aGUgZW5kXG5cdFx0XHRcdFx0Y2FjaGVVUkwgKyAoIHJxdWVyeS50ZXN0KCBjYWNoZVVSTCApID8gXCImXCIgOiBcIj9cIiApICsgXCJfPVwiICsgbm9uY2UrKztcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBTZXQgdGhlIElmLU1vZGlmaWVkLVNpbmNlIGFuZC9vciBJZi1Ob25lLU1hdGNoIGhlYWRlciwgaWYgaW4gaWZNb2RpZmllZCBtb2RlLlxuXHRcdGlmICggcy5pZk1vZGlmaWVkICkge1xuXHRcdFx0aWYgKCBqUXVlcnkubGFzdE1vZGlmaWVkWyBjYWNoZVVSTCBdICkge1xuXHRcdFx0XHRqcVhIUi5zZXRSZXF1ZXN0SGVhZGVyKCBcIklmLU1vZGlmaWVkLVNpbmNlXCIsIGpRdWVyeS5sYXN0TW9kaWZpZWRbIGNhY2hlVVJMIF0gKTtcblx0XHRcdH1cblx0XHRcdGlmICggalF1ZXJ5LmV0YWdbIGNhY2hlVVJMIF0gKSB7XG5cdFx0XHRcdGpxWEhSLnNldFJlcXVlc3RIZWFkZXIoIFwiSWYtTm9uZS1NYXRjaFwiLCBqUXVlcnkuZXRhZ1sgY2FjaGVVUkwgXSApO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIFNldCB0aGUgY29ycmVjdCBoZWFkZXIsIGlmIGRhdGEgaXMgYmVpbmcgc2VudFxuXHRcdGlmICggcy5kYXRhICYmIHMuaGFzQ29udGVudCAmJiBzLmNvbnRlbnRUeXBlICE9PSBmYWxzZSB8fCBvcHRpb25zLmNvbnRlbnRUeXBlICkge1xuXHRcdFx0anFYSFIuc2V0UmVxdWVzdEhlYWRlciggXCJDb250ZW50LVR5cGVcIiwgcy5jb250ZW50VHlwZSApO1xuXHRcdH1cblxuXHRcdC8vIFNldCB0aGUgQWNjZXB0cyBoZWFkZXIgZm9yIHRoZSBzZXJ2ZXIsIGRlcGVuZGluZyBvbiB0aGUgZGF0YVR5cGVcblx0XHRqcVhIUi5zZXRSZXF1ZXN0SGVhZGVyKFxuXHRcdFx0XCJBY2NlcHRcIixcblx0XHRcdHMuZGF0YVR5cGVzWyAwIF0gJiYgcy5hY2NlcHRzWyBzLmRhdGFUeXBlc1sgMCBdIF0gP1xuXHRcdFx0XHRzLmFjY2VwdHNbIHMuZGF0YVR5cGVzWyAwIF0gXSArXG5cdFx0XHRcdFx0KCBzLmRhdGFUeXBlc1sgMCBdICE9PSBcIipcIiA/IFwiLCBcIiArIGFsbFR5cGVzICsgXCI7IHE9MC4wMVwiIDogXCJcIiApIDpcblx0XHRcdFx0cy5hY2NlcHRzWyBcIipcIiBdXG5cdFx0KTtcblxuXHRcdC8vIENoZWNrIGZvciBoZWFkZXJzIG9wdGlvblxuXHRcdGZvciAoIGkgaW4gcy5oZWFkZXJzICkge1xuXHRcdFx0anFYSFIuc2V0UmVxdWVzdEhlYWRlciggaSwgcy5oZWFkZXJzWyBpIF0gKTtcblx0XHR9XG5cblx0XHQvLyBBbGxvdyBjdXN0b20gaGVhZGVycy9taW1ldHlwZXMgYW5kIGVhcmx5IGFib3J0XG5cdFx0aWYgKCBzLmJlZm9yZVNlbmQgJiZcblx0XHRcdCggcy5iZWZvcmVTZW5kLmNhbGwoIGNhbGxiYWNrQ29udGV4dCwganFYSFIsIHMgKSA9PT0gZmFsc2UgfHwgc3RhdGUgPT09IDIgKSApIHtcblxuXHRcdFx0Ly8gQWJvcnQgaWYgbm90IGRvbmUgYWxyZWFkeSBhbmQgcmV0dXJuXG5cdFx0XHRyZXR1cm4ganFYSFIuYWJvcnQoKTtcblx0XHR9XG5cblx0XHQvLyBBYm9ydGluZyBpcyBubyBsb25nZXIgYSBjYW5jZWxsYXRpb25cblx0XHRzdHJBYm9ydCA9IFwiYWJvcnRcIjtcblxuXHRcdC8vIEluc3RhbGwgY2FsbGJhY2tzIG9uIGRlZmVycmVkc1xuXHRcdGZvciAoIGkgaW4geyBzdWNjZXNzOiAxLCBlcnJvcjogMSwgY29tcGxldGU6IDEgfSApIHtcblx0XHRcdGpxWEhSWyBpIF0oIHNbIGkgXSApO1xuXHRcdH1cblxuXHRcdC8vIEdldCB0cmFuc3BvcnRcblx0XHR0cmFuc3BvcnQgPSBpbnNwZWN0UHJlZmlsdGVyc09yVHJhbnNwb3J0cyggdHJhbnNwb3J0cywgcywgb3B0aW9ucywganFYSFIgKTtcblxuXHRcdC8vIElmIG5vIHRyYW5zcG9ydCwgd2UgYXV0by1hYm9ydFxuXHRcdGlmICggIXRyYW5zcG9ydCApIHtcblx0XHRcdGRvbmUoIC0xLCBcIk5vIFRyYW5zcG9ydFwiICk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGpxWEhSLnJlYWR5U3RhdGUgPSAxO1xuXG5cdFx0XHQvLyBTZW5kIGdsb2JhbCBldmVudFxuXHRcdFx0aWYgKCBmaXJlR2xvYmFscyApIHtcblx0XHRcdFx0Z2xvYmFsRXZlbnRDb250ZXh0LnRyaWdnZXIoIFwiYWpheFNlbmRcIiwgWyBqcVhIUiwgcyBdICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIElmIHJlcXVlc3Qgd2FzIGFib3J0ZWQgaW5zaWRlIGFqYXhTZW5kLCBzdG9wIHRoZXJlXG5cdFx0XHRpZiAoIHN0YXRlID09PSAyICkge1xuXHRcdFx0XHRyZXR1cm4ganFYSFI7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFRpbWVvdXRcblx0XHRcdGlmICggcy5hc3luYyAmJiBzLnRpbWVvdXQgPiAwICkge1xuXHRcdFx0XHR0aW1lb3V0VGltZXIgPSB3aW5kb3cuc2V0VGltZW91dCggZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0anFYSFIuYWJvcnQoIFwidGltZW91dFwiICk7XG5cdFx0XHRcdH0sIHMudGltZW91dCApO1xuXHRcdFx0fVxuXG5cdFx0XHR0cnkge1xuXHRcdFx0XHRzdGF0ZSA9IDE7XG5cdFx0XHRcdHRyYW5zcG9ydC5zZW5kKCByZXF1ZXN0SGVhZGVycywgZG9uZSApO1xuXHRcdFx0fSBjYXRjaCAoIGUgKSB7XG5cblx0XHRcdFx0Ly8gUHJvcGFnYXRlIGV4Y2VwdGlvbiBhcyBlcnJvciBpZiBub3QgZG9uZVxuXHRcdFx0XHRpZiAoIHN0YXRlIDwgMiApIHtcblx0XHRcdFx0XHRkb25lKCAtMSwgZSApO1xuXG5cdFx0XHRcdC8vIFNpbXBseSByZXRocm93IG90aGVyd2lzZVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRocm93IGU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBDYWxsYmFjayBmb3Igd2hlbiBldmVyeXRoaW5nIGlzIGRvbmVcblx0XHRmdW5jdGlvbiBkb25lKCBzdGF0dXMsIG5hdGl2ZVN0YXR1c1RleHQsIHJlc3BvbnNlcywgaGVhZGVycyApIHtcblx0XHRcdHZhciBpc1N1Y2Nlc3MsIHN1Y2Nlc3MsIGVycm9yLCByZXNwb25zZSwgbW9kaWZpZWQsXG5cdFx0XHRcdHN0YXR1c1RleHQgPSBuYXRpdmVTdGF0dXNUZXh0O1xuXG5cdFx0XHQvLyBDYWxsZWQgb25jZVxuXHRcdFx0aWYgKCBzdGF0ZSA9PT0gMiApIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBTdGF0ZSBpcyBcImRvbmVcIiBub3dcblx0XHRcdHN0YXRlID0gMjtcblxuXHRcdFx0Ly8gQ2xlYXIgdGltZW91dCBpZiBpdCBleGlzdHNcblx0XHRcdGlmICggdGltZW91dFRpbWVyICkge1xuXHRcdFx0XHR3aW5kb3cuY2xlYXJUaW1lb3V0KCB0aW1lb3V0VGltZXIgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gRGVyZWZlcmVuY2UgdHJhbnNwb3J0IGZvciBlYXJseSBnYXJiYWdlIGNvbGxlY3Rpb25cblx0XHRcdC8vIChubyBtYXR0ZXIgaG93IGxvbmcgdGhlIGpxWEhSIG9iamVjdCB3aWxsIGJlIHVzZWQpXG5cdFx0XHR0cmFuc3BvcnQgPSB1bmRlZmluZWQ7XG5cblx0XHRcdC8vIENhY2hlIHJlc3BvbnNlIGhlYWRlcnNcblx0XHRcdHJlc3BvbnNlSGVhZGVyc1N0cmluZyA9IGhlYWRlcnMgfHwgXCJcIjtcblxuXHRcdFx0Ly8gU2V0IHJlYWR5U3RhdGVcblx0XHRcdGpxWEhSLnJlYWR5U3RhdGUgPSBzdGF0dXMgPiAwID8gNCA6IDA7XG5cblx0XHRcdC8vIERldGVybWluZSBpZiBzdWNjZXNzZnVsXG5cdFx0XHRpc1N1Y2Nlc3MgPSBzdGF0dXMgPj0gMjAwICYmIHN0YXR1cyA8IDMwMCB8fCBzdGF0dXMgPT09IDMwNDtcblxuXHRcdFx0Ly8gR2V0IHJlc3BvbnNlIGRhdGFcblx0XHRcdGlmICggcmVzcG9uc2VzICkge1xuXHRcdFx0XHRyZXNwb25zZSA9IGFqYXhIYW5kbGVSZXNwb25zZXMoIHMsIGpxWEhSLCByZXNwb25zZXMgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQ29udmVydCBubyBtYXR0ZXIgd2hhdCAodGhhdCB3YXkgcmVzcG9uc2VYWFggZmllbGRzIGFyZSBhbHdheXMgc2V0KVxuXHRcdFx0cmVzcG9uc2UgPSBhamF4Q29udmVydCggcywgcmVzcG9uc2UsIGpxWEhSLCBpc1N1Y2Nlc3MgKTtcblxuXHRcdFx0Ly8gSWYgc3VjY2Vzc2Z1bCwgaGFuZGxlIHR5cGUgY2hhaW5pbmdcblx0XHRcdGlmICggaXNTdWNjZXNzICkge1xuXG5cdFx0XHRcdC8vIFNldCB0aGUgSWYtTW9kaWZpZWQtU2luY2UgYW5kL29yIElmLU5vbmUtTWF0Y2ggaGVhZGVyLCBpZiBpbiBpZk1vZGlmaWVkIG1vZGUuXG5cdFx0XHRcdGlmICggcy5pZk1vZGlmaWVkICkge1xuXHRcdFx0XHRcdG1vZGlmaWVkID0ganFYSFIuZ2V0UmVzcG9uc2VIZWFkZXIoIFwiTGFzdC1Nb2RpZmllZFwiICk7XG5cdFx0XHRcdFx0aWYgKCBtb2RpZmllZCApIHtcblx0XHRcdFx0XHRcdGpRdWVyeS5sYXN0TW9kaWZpZWRbIGNhY2hlVVJMIF0gPSBtb2RpZmllZDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0bW9kaWZpZWQgPSBqcVhIUi5nZXRSZXNwb25zZUhlYWRlciggXCJldGFnXCIgKTtcblx0XHRcdFx0XHRpZiAoIG1vZGlmaWVkICkge1xuXHRcdFx0XHRcdFx0alF1ZXJ5LmV0YWdbIGNhY2hlVVJMIF0gPSBtb2RpZmllZDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBpZiBubyBjb250ZW50XG5cdFx0XHRcdGlmICggc3RhdHVzID09PSAyMDQgfHwgcy50eXBlID09PSBcIkhFQURcIiApIHtcblx0XHRcdFx0XHRzdGF0dXNUZXh0ID0gXCJub2NvbnRlbnRcIjtcblxuXHRcdFx0XHQvLyBpZiBub3QgbW9kaWZpZWRcblx0XHRcdFx0fSBlbHNlIGlmICggc3RhdHVzID09PSAzMDQgKSB7XG5cdFx0XHRcdFx0c3RhdHVzVGV4dCA9IFwibm90bW9kaWZpZWRcIjtcblxuXHRcdFx0XHQvLyBJZiB3ZSBoYXZlIGRhdGEsIGxldCdzIGNvbnZlcnQgaXRcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRzdGF0dXNUZXh0ID0gcmVzcG9uc2Uuc3RhdGU7XG5cdFx0XHRcdFx0c3VjY2VzcyA9IHJlc3BvbnNlLmRhdGE7XG5cdFx0XHRcdFx0ZXJyb3IgPSByZXNwb25zZS5lcnJvcjtcblx0XHRcdFx0XHRpc1N1Y2Nlc3MgPSAhZXJyb3I7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0Ly8gRXh0cmFjdCBlcnJvciBmcm9tIHN0YXR1c1RleHQgYW5kIG5vcm1hbGl6ZSBmb3Igbm9uLWFib3J0c1xuXHRcdFx0XHRlcnJvciA9IHN0YXR1c1RleHQ7XG5cdFx0XHRcdGlmICggc3RhdHVzIHx8ICFzdGF0dXNUZXh0ICkge1xuXHRcdFx0XHRcdHN0YXR1c1RleHQgPSBcImVycm9yXCI7XG5cdFx0XHRcdFx0aWYgKCBzdGF0dXMgPCAwICkge1xuXHRcdFx0XHRcdFx0c3RhdHVzID0gMDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gU2V0IGRhdGEgZm9yIHRoZSBmYWtlIHhociBvYmplY3Rcblx0XHRcdGpxWEhSLnN0YXR1cyA9IHN0YXR1cztcblx0XHRcdGpxWEhSLnN0YXR1c1RleHQgPSAoIG5hdGl2ZVN0YXR1c1RleHQgfHwgc3RhdHVzVGV4dCApICsgXCJcIjtcblxuXHRcdFx0Ly8gU3VjY2Vzcy9FcnJvclxuXHRcdFx0aWYgKCBpc1N1Y2Nlc3MgKSB7XG5cdFx0XHRcdGRlZmVycmVkLnJlc29sdmVXaXRoKCBjYWxsYmFja0NvbnRleHQsIFsgc3VjY2Vzcywgc3RhdHVzVGV4dCwganFYSFIgXSApO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZGVmZXJyZWQucmVqZWN0V2l0aCggY2FsbGJhY2tDb250ZXh0LCBbIGpxWEhSLCBzdGF0dXNUZXh0LCBlcnJvciBdICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFN0YXR1cy1kZXBlbmRlbnQgY2FsbGJhY2tzXG5cdFx0XHRqcVhIUi5zdGF0dXNDb2RlKCBzdGF0dXNDb2RlICk7XG5cdFx0XHRzdGF0dXNDb2RlID0gdW5kZWZpbmVkO1xuXG5cdFx0XHRpZiAoIGZpcmVHbG9iYWxzICkge1xuXHRcdFx0XHRnbG9iYWxFdmVudENvbnRleHQudHJpZ2dlciggaXNTdWNjZXNzID8gXCJhamF4U3VjY2Vzc1wiIDogXCJhamF4RXJyb3JcIixcblx0XHRcdFx0XHRbIGpxWEhSLCBzLCBpc1N1Y2Nlc3MgPyBzdWNjZXNzIDogZXJyb3IgXSApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBDb21wbGV0ZVxuXHRcdFx0Y29tcGxldGVEZWZlcnJlZC5maXJlV2l0aCggY2FsbGJhY2tDb250ZXh0LCBbIGpxWEhSLCBzdGF0dXNUZXh0IF0gKTtcblxuXHRcdFx0aWYgKCBmaXJlR2xvYmFscyApIHtcblx0XHRcdFx0Z2xvYmFsRXZlbnRDb250ZXh0LnRyaWdnZXIoIFwiYWpheENvbXBsZXRlXCIsIFsganFYSFIsIHMgXSApO1xuXG5cdFx0XHRcdC8vIEhhbmRsZSB0aGUgZ2xvYmFsIEFKQVggY291bnRlclxuXHRcdFx0XHRpZiAoICEoIC0talF1ZXJ5LmFjdGl2ZSApICkge1xuXHRcdFx0XHRcdGpRdWVyeS5ldmVudC50cmlnZ2VyKCBcImFqYXhTdG9wXCIgKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBqcVhIUjtcblx0fSxcblxuXHRnZXRKU09OOiBmdW5jdGlvbiggdXJsLCBkYXRhLCBjYWxsYmFjayApIHtcblx0XHRyZXR1cm4galF1ZXJ5LmdldCggdXJsLCBkYXRhLCBjYWxsYmFjaywgXCJqc29uXCIgKTtcblx0fSxcblxuXHRnZXRTY3JpcHQ6IGZ1bmN0aW9uKCB1cmwsIGNhbGxiYWNrICkge1xuXHRcdHJldHVybiBqUXVlcnkuZ2V0KCB1cmwsIHVuZGVmaW5lZCwgY2FsbGJhY2ssIFwic2NyaXB0XCIgKTtcblx0fVxufSApO1xuXG5qUXVlcnkuZWFjaCggWyBcImdldFwiLCBcInBvc3RcIiBdLCBmdW5jdGlvbiggaSwgbWV0aG9kICkge1xuXHRqUXVlcnlbIG1ldGhvZCBdID0gZnVuY3Rpb24oIHVybCwgZGF0YSwgY2FsbGJhY2ssIHR5cGUgKSB7XG5cblx0XHQvLyBTaGlmdCBhcmd1bWVudHMgaWYgZGF0YSBhcmd1bWVudCB3YXMgb21pdHRlZFxuXHRcdGlmICggalF1ZXJ5LmlzRnVuY3Rpb24oIGRhdGEgKSApIHtcblx0XHRcdHR5cGUgPSB0eXBlIHx8IGNhbGxiYWNrO1xuXHRcdFx0Y2FsbGJhY2sgPSBkYXRhO1xuXHRcdFx0ZGF0YSA9IHVuZGVmaW5lZDtcblx0XHR9XG5cblx0XHQvLyBUaGUgdXJsIGNhbiBiZSBhbiBvcHRpb25zIG9iamVjdCAod2hpY2ggdGhlbiBtdXN0IGhhdmUgLnVybClcblx0XHRyZXR1cm4galF1ZXJ5LmFqYXgoIGpRdWVyeS5leHRlbmQoIHtcblx0XHRcdHVybDogdXJsLFxuXHRcdFx0dHlwZTogbWV0aG9kLFxuXHRcdFx0ZGF0YVR5cGU6IHR5cGUsXG5cdFx0XHRkYXRhOiBkYXRhLFxuXHRcdFx0c3VjY2VzczogY2FsbGJhY2tcblx0XHR9LCBqUXVlcnkuaXNQbGFpbk9iamVjdCggdXJsICkgJiYgdXJsICkgKTtcblx0fTtcbn0gKTtcblxuXG5qUXVlcnkuX2V2YWxVcmwgPSBmdW5jdGlvbiggdXJsICkge1xuXHRyZXR1cm4galF1ZXJ5LmFqYXgoIHtcblx0XHR1cmw6IHVybCxcblxuXHRcdC8vIE1ha2UgdGhpcyBleHBsaWNpdCwgc2luY2UgdXNlciBjYW4gb3ZlcnJpZGUgdGhpcyB0aHJvdWdoIGFqYXhTZXR1cCAoIzExMjY0KVxuXHRcdHR5cGU6IFwiR0VUXCIsXG5cdFx0ZGF0YVR5cGU6IFwic2NyaXB0XCIsXG5cdFx0YXN5bmM6IGZhbHNlLFxuXHRcdGdsb2JhbDogZmFsc2UsXG5cdFx0XCJ0aHJvd3NcIjogdHJ1ZVxuXHR9ICk7XG59O1xuXG5cbmpRdWVyeS5mbi5leHRlbmQoIHtcblx0d3JhcEFsbDogZnVuY3Rpb24oIGh0bWwgKSB7XG5cdFx0dmFyIHdyYXA7XG5cblx0XHRpZiAoIGpRdWVyeS5pc0Z1bmN0aW9uKCBodG1sICkgKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5lYWNoKCBmdW5jdGlvbiggaSApIHtcblx0XHRcdFx0alF1ZXJ5KCB0aGlzICkud3JhcEFsbCggaHRtbC5jYWxsKCB0aGlzLCBpICkgKTtcblx0XHRcdH0gKTtcblx0XHR9XG5cblx0XHRpZiAoIHRoaXNbIDAgXSApIHtcblxuXHRcdFx0Ly8gVGhlIGVsZW1lbnRzIHRvIHdyYXAgdGhlIHRhcmdldCBhcm91bmRcblx0XHRcdHdyYXAgPSBqUXVlcnkoIGh0bWwsIHRoaXNbIDAgXS5vd25lckRvY3VtZW50ICkuZXEoIDAgKS5jbG9uZSggdHJ1ZSApO1xuXG5cdFx0XHRpZiAoIHRoaXNbIDAgXS5wYXJlbnROb2RlICkge1xuXHRcdFx0XHR3cmFwLmluc2VydEJlZm9yZSggdGhpc1sgMCBdICk7XG5cdFx0XHR9XG5cblx0XHRcdHdyYXAubWFwKCBmdW5jdGlvbigpIHtcblx0XHRcdFx0dmFyIGVsZW0gPSB0aGlzO1xuXG5cdFx0XHRcdHdoaWxlICggZWxlbS5maXJzdEVsZW1lbnRDaGlsZCApIHtcblx0XHRcdFx0XHRlbGVtID0gZWxlbS5maXJzdEVsZW1lbnRDaGlsZDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBlbGVtO1xuXHRcdFx0fSApLmFwcGVuZCggdGhpcyApO1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzO1xuXHR9LFxuXG5cdHdyYXBJbm5lcjogZnVuY3Rpb24oIGh0bWwgKSB7XG5cdFx0aWYgKCBqUXVlcnkuaXNGdW5jdGlvbiggaHRtbCApICkge1xuXHRcdFx0cmV0dXJuIHRoaXMuZWFjaCggZnVuY3Rpb24oIGkgKSB7XG5cdFx0XHRcdGpRdWVyeSggdGhpcyApLndyYXBJbm5lciggaHRtbC5jYWxsKCB0aGlzLCBpICkgKTtcblx0XHRcdH0gKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcy5lYWNoKCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBzZWxmID0galF1ZXJ5KCB0aGlzICksXG5cdFx0XHRcdGNvbnRlbnRzID0gc2VsZi5jb250ZW50cygpO1xuXG5cdFx0XHRpZiAoIGNvbnRlbnRzLmxlbmd0aCApIHtcblx0XHRcdFx0Y29udGVudHMud3JhcEFsbCggaHRtbCApO1xuXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRzZWxmLmFwcGVuZCggaHRtbCApO1xuXHRcdFx0fVxuXHRcdH0gKTtcblx0fSxcblxuXHR3cmFwOiBmdW5jdGlvbiggaHRtbCApIHtcblx0XHR2YXIgaXNGdW5jdGlvbiA9IGpRdWVyeS5pc0Z1bmN0aW9uKCBodG1sICk7XG5cblx0XHRyZXR1cm4gdGhpcy5lYWNoKCBmdW5jdGlvbiggaSApIHtcblx0XHRcdGpRdWVyeSggdGhpcyApLndyYXBBbGwoIGlzRnVuY3Rpb24gPyBodG1sLmNhbGwoIHRoaXMsIGkgKSA6IGh0bWwgKTtcblx0XHR9ICk7XG5cdH0sXG5cblx0dW53cmFwOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gdGhpcy5wYXJlbnQoKS5lYWNoKCBmdW5jdGlvbigpIHtcblx0XHRcdGlmICggIWpRdWVyeS5ub2RlTmFtZSggdGhpcywgXCJib2R5XCIgKSApIHtcblx0XHRcdFx0alF1ZXJ5KCB0aGlzICkucmVwbGFjZVdpdGgoIHRoaXMuY2hpbGROb2RlcyApO1xuXHRcdFx0fVxuXHRcdH0gKS5lbmQoKTtcblx0fVxufSApO1xuXG5cbmpRdWVyeS5leHByLmZpbHRlcnMuaGlkZGVuID0gZnVuY3Rpb24oIGVsZW0gKSB7XG5cdHJldHVybiAhalF1ZXJ5LmV4cHIuZmlsdGVycy52aXNpYmxlKCBlbGVtICk7XG59O1xualF1ZXJ5LmV4cHIuZmlsdGVycy52aXNpYmxlID0gZnVuY3Rpb24oIGVsZW0gKSB7XG5cblx0Ly8gU3VwcG9ydDogT3BlcmEgPD0gMTIuMTJcblx0Ly8gT3BlcmEgcmVwb3J0cyBvZmZzZXRXaWR0aHMgYW5kIG9mZnNldEhlaWdodHMgbGVzcyB0aGFuIHplcm8gb24gc29tZSBlbGVtZW50c1xuXHQvLyBVc2UgT1IgaW5zdGVhZCBvZiBBTkQgYXMgdGhlIGVsZW1lbnQgaXMgbm90IHZpc2libGUgaWYgZWl0aGVyIGlzIHRydWVcblx0Ly8gU2VlIHRpY2tldHMgIzEwNDA2IGFuZCAjMTMxMzJcblx0cmV0dXJuIGVsZW0ub2Zmc2V0V2lkdGggPiAwIHx8IGVsZW0ub2Zmc2V0SGVpZ2h0ID4gMCB8fCBlbGVtLmdldENsaWVudFJlY3RzKCkubGVuZ3RoID4gMDtcbn07XG5cblxuXG5cbnZhciByMjAgPSAvJTIwL2csXG5cdHJicmFja2V0ID0gL1xcW1xcXSQvLFxuXHRyQ1JMRiA9IC9cXHI/XFxuL2csXG5cdHJzdWJtaXR0ZXJUeXBlcyA9IC9eKD86c3VibWl0fGJ1dHRvbnxpbWFnZXxyZXNldHxmaWxlKSQvaSxcblx0cnN1Ym1pdHRhYmxlID0gL14oPzppbnB1dHxzZWxlY3R8dGV4dGFyZWF8a2V5Z2VuKS9pO1xuXG5mdW5jdGlvbiBidWlsZFBhcmFtcyggcHJlZml4LCBvYmosIHRyYWRpdGlvbmFsLCBhZGQgKSB7XG5cdHZhciBuYW1lO1xuXG5cdGlmICggalF1ZXJ5LmlzQXJyYXkoIG9iaiApICkge1xuXG5cdFx0Ly8gU2VyaWFsaXplIGFycmF5IGl0ZW0uXG5cdFx0alF1ZXJ5LmVhY2goIG9iaiwgZnVuY3Rpb24oIGksIHYgKSB7XG5cdFx0XHRpZiAoIHRyYWRpdGlvbmFsIHx8IHJicmFja2V0LnRlc3QoIHByZWZpeCApICkge1xuXG5cdFx0XHRcdC8vIFRyZWF0IGVhY2ggYXJyYXkgaXRlbSBhcyBhIHNjYWxhci5cblx0XHRcdFx0YWRkKCBwcmVmaXgsIHYgKTtcblxuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHQvLyBJdGVtIGlzIG5vbi1zY2FsYXIgKGFycmF5IG9yIG9iamVjdCksIGVuY29kZSBpdHMgbnVtZXJpYyBpbmRleC5cblx0XHRcdFx0YnVpbGRQYXJhbXMoXG5cdFx0XHRcdFx0cHJlZml4ICsgXCJbXCIgKyAoIHR5cGVvZiB2ID09PSBcIm9iamVjdFwiICYmIHYgIT0gbnVsbCA/IGkgOiBcIlwiICkgKyBcIl1cIixcblx0XHRcdFx0XHR2LFxuXHRcdFx0XHRcdHRyYWRpdGlvbmFsLFxuXHRcdFx0XHRcdGFkZFxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdH0gKTtcblxuXHR9IGVsc2UgaWYgKCAhdHJhZGl0aW9uYWwgJiYgalF1ZXJ5LnR5cGUoIG9iaiApID09PSBcIm9iamVjdFwiICkge1xuXG5cdFx0Ly8gU2VyaWFsaXplIG9iamVjdCBpdGVtLlxuXHRcdGZvciAoIG5hbWUgaW4gb2JqICkge1xuXHRcdFx0YnVpbGRQYXJhbXMoIHByZWZpeCArIFwiW1wiICsgbmFtZSArIFwiXVwiLCBvYmpbIG5hbWUgXSwgdHJhZGl0aW9uYWwsIGFkZCApO1xuXHRcdH1cblxuXHR9IGVsc2Uge1xuXG5cdFx0Ly8gU2VyaWFsaXplIHNjYWxhciBpdGVtLlxuXHRcdGFkZCggcHJlZml4LCBvYmogKTtcblx0fVxufVxuXG4vLyBTZXJpYWxpemUgYW4gYXJyYXkgb2YgZm9ybSBlbGVtZW50cyBvciBhIHNldCBvZlxuLy8ga2V5L3ZhbHVlcyBpbnRvIGEgcXVlcnkgc3RyaW5nXG5qUXVlcnkucGFyYW0gPSBmdW5jdGlvbiggYSwgdHJhZGl0aW9uYWwgKSB7XG5cdHZhciBwcmVmaXgsXG5cdFx0cyA9IFtdLFxuXHRcdGFkZCA9IGZ1bmN0aW9uKCBrZXksIHZhbHVlICkge1xuXG5cdFx0XHQvLyBJZiB2YWx1ZSBpcyBhIGZ1bmN0aW9uLCBpbnZva2UgaXQgYW5kIHJldHVybiBpdHMgdmFsdWVcblx0XHRcdHZhbHVlID0galF1ZXJ5LmlzRnVuY3Rpb24oIHZhbHVlICkgPyB2YWx1ZSgpIDogKCB2YWx1ZSA9PSBudWxsID8gXCJcIiA6IHZhbHVlICk7XG5cdFx0XHRzWyBzLmxlbmd0aCBdID0gZW5jb2RlVVJJQ29tcG9uZW50KCBrZXkgKSArIFwiPVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KCB2YWx1ZSApO1xuXHRcdH07XG5cblx0Ly8gU2V0IHRyYWRpdGlvbmFsIHRvIHRydWUgZm9yIGpRdWVyeSA8PSAxLjMuMiBiZWhhdmlvci5cblx0aWYgKCB0cmFkaXRpb25hbCA9PT0gdW5kZWZpbmVkICkge1xuXHRcdHRyYWRpdGlvbmFsID0galF1ZXJ5LmFqYXhTZXR0aW5ncyAmJiBqUXVlcnkuYWpheFNldHRpbmdzLnRyYWRpdGlvbmFsO1xuXHR9XG5cblx0Ly8gSWYgYW4gYXJyYXkgd2FzIHBhc3NlZCBpbiwgYXNzdW1lIHRoYXQgaXQgaXMgYW4gYXJyYXkgb2YgZm9ybSBlbGVtZW50cy5cblx0aWYgKCBqUXVlcnkuaXNBcnJheSggYSApIHx8ICggYS5qcXVlcnkgJiYgIWpRdWVyeS5pc1BsYWluT2JqZWN0KCBhICkgKSApIHtcblxuXHRcdC8vIFNlcmlhbGl6ZSB0aGUgZm9ybSBlbGVtZW50c1xuXHRcdGpRdWVyeS5lYWNoKCBhLCBmdW5jdGlvbigpIHtcblx0XHRcdGFkZCggdGhpcy5uYW1lLCB0aGlzLnZhbHVlICk7XG5cdFx0fSApO1xuXG5cdH0gZWxzZSB7XG5cblx0XHQvLyBJZiB0cmFkaXRpb25hbCwgZW5jb2RlIHRoZSBcIm9sZFwiIHdheSAodGhlIHdheSAxLjMuMiBvciBvbGRlclxuXHRcdC8vIGRpZCBpdCksIG90aGVyd2lzZSBlbmNvZGUgcGFyYW1zIHJlY3Vyc2l2ZWx5LlxuXHRcdGZvciAoIHByZWZpeCBpbiBhICkge1xuXHRcdFx0YnVpbGRQYXJhbXMoIHByZWZpeCwgYVsgcHJlZml4IF0sIHRyYWRpdGlvbmFsLCBhZGQgKTtcblx0XHR9XG5cdH1cblxuXHQvLyBSZXR1cm4gdGhlIHJlc3VsdGluZyBzZXJpYWxpemF0aW9uXG5cdHJldHVybiBzLmpvaW4oIFwiJlwiICkucmVwbGFjZSggcjIwLCBcIitcIiApO1xufTtcblxualF1ZXJ5LmZuLmV4dGVuZCgge1xuXHRzZXJpYWxpemU6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiBqUXVlcnkucGFyYW0oIHRoaXMuc2VyaWFsaXplQXJyYXkoKSApO1xuXHR9LFxuXHRzZXJpYWxpemVBcnJheTogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIHRoaXMubWFwKCBmdW5jdGlvbigpIHtcblxuXHRcdFx0Ly8gQ2FuIGFkZCBwcm9wSG9vayBmb3IgXCJlbGVtZW50c1wiIHRvIGZpbHRlciBvciBhZGQgZm9ybSBlbGVtZW50c1xuXHRcdFx0dmFyIGVsZW1lbnRzID0galF1ZXJ5LnByb3AoIHRoaXMsIFwiZWxlbWVudHNcIiApO1xuXHRcdFx0cmV0dXJuIGVsZW1lbnRzID8galF1ZXJ5Lm1ha2VBcnJheSggZWxlbWVudHMgKSA6IHRoaXM7XG5cdFx0fSApXG5cdFx0LmZpbHRlciggZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgdHlwZSA9IHRoaXMudHlwZTtcblxuXHRcdFx0Ly8gVXNlIC5pcyggXCI6ZGlzYWJsZWRcIiApIHNvIHRoYXQgZmllbGRzZXRbZGlzYWJsZWRdIHdvcmtzXG5cdFx0XHRyZXR1cm4gdGhpcy5uYW1lICYmICFqUXVlcnkoIHRoaXMgKS5pcyggXCI6ZGlzYWJsZWRcIiApICYmXG5cdFx0XHRcdHJzdWJtaXR0YWJsZS50ZXN0KCB0aGlzLm5vZGVOYW1lICkgJiYgIXJzdWJtaXR0ZXJUeXBlcy50ZXN0KCB0eXBlICkgJiZcblx0XHRcdFx0KCB0aGlzLmNoZWNrZWQgfHwgIXJjaGVja2FibGVUeXBlLnRlc3QoIHR5cGUgKSApO1xuXHRcdH0gKVxuXHRcdC5tYXAoIGZ1bmN0aW9uKCBpLCBlbGVtICkge1xuXHRcdFx0dmFyIHZhbCA9IGpRdWVyeSggdGhpcyApLnZhbCgpO1xuXG5cdFx0XHRyZXR1cm4gdmFsID09IG51bGwgP1xuXHRcdFx0XHRudWxsIDpcblx0XHRcdFx0alF1ZXJ5LmlzQXJyYXkoIHZhbCApID9cblx0XHRcdFx0XHRqUXVlcnkubWFwKCB2YWwsIGZ1bmN0aW9uKCB2YWwgKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4geyBuYW1lOiBlbGVtLm5hbWUsIHZhbHVlOiB2YWwucmVwbGFjZSggckNSTEYsIFwiXFxyXFxuXCIgKSB9O1xuXHRcdFx0XHRcdH0gKSA6XG5cdFx0XHRcdFx0eyBuYW1lOiBlbGVtLm5hbWUsIHZhbHVlOiB2YWwucmVwbGFjZSggckNSTEYsIFwiXFxyXFxuXCIgKSB9O1xuXHRcdH0gKS5nZXQoKTtcblx0fVxufSApO1xuXG5cbmpRdWVyeS5hamF4U2V0dGluZ3MueGhyID0gZnVuY3Rpb24oKSB7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIG5ldyB3aW5kb3cuWE1MSHR0cFJlcXVlc3QoKTtcblx0fSBjYXRjaCAoIGUgKSB7fVxufTtcblxudmFyIHhoclN1Y2Nlc3NTdGF0dXMgPSB7XG5cblx0XHQvLyBGaWxlIHByb3RvY29sIGFsd2F5cyB5aWVsZHMgc3RhdHVzIGNvZGUgMCwgYXNzdW1lIDIwMFxuXHRcdDA6IDIwMCxcblxuXHRcdC8vIFN1cHBvcnQ6IElFOVxuXHRcdC8vICMxNDUwOiBzb21ldGltZXMgSUUgcmV0dXJucyAxMjIzIHdoZW4gaXQgc2hvdWxkIGJlIDIwNFxuXHRcdDEyMjM6IDIwNFxuXHR9LFxuXHR4aHJTdXBwb3J0ZWQgPSBqUXVlcnkuYWpheFNldHRpbmdzLnhocigpO1xuXG5zdXBwb3J0LmNvcnMgPSAhIXhoclN1cHBvcnRlZCAmJiAoIFwid2l0aENyZWRlbnRpYWxzXCIgaW4geGhyU3VwcG9ydGVkICk7XG5zdXBwb3J0LmFqYXggPSB4aHJTdXBwb3J0ZWQgPSAhIXhoclN1cHBvcnRlZDtcblxualF1ZXJ5LmFqYXhUcmFuc3BvcnQoIGZ1bmN0aW9uKCBvcHRpb25zICkge1xuXHR2YXIgY2FsbGJhY2ssIGVycm9yQ2FsbGJhY2s7XG5cblx0Ly8gQ3Jvc3MgZG9tYWluIG9ubHkgYWxsb3dlZCBpZiBzdXBwb3J0ZWQgdGhyb3VnaCBYTUxIdHRwUmVxdWVzdFxuXHRpZiAoIHN1cHBvcnQuY29ycyB8fCB4aHJTdXBwb3J0ZWQgJiYgIW9wdGlvbnMuY3Jvc3NEb21haW4gKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHNlbmQ6IGZ1bmN0aW9uKCBoZWFkZXJzLCBjb21wbGV0ZSApIHtcblx0XHRcdFx0dmFyIGksXG5cdFx0XHRcdFx0eGhyID0gb3B0aW9ucy54aHIoKTtcblxuXHRcdFx0XHR4aHIub3Blbihcblx0XHRcdFx0XHRvcHRpb25zLnR5cGUsXG5cdFx0XHRcdFx0b3B0aW9ucy51cmwsXG5cdFx0XHRcdFx0b3B0aW9ucy5hc3luYyxcblx0XHRcdFx0XHRvcHRpb25zLnVzZXJuYW1lLFxuXHRcdFx0XHRcdG9wdGlvbnMucGFzc3dvcmRcblx0XHRcdFx0KTtcblxuXHRcdFx0XHQvLyBBcHBseSBjdXN0b20gZmllbGRzIGlmIHByb3ZpZGVkXG5cdFx0XHRcdGlmICggb3B0aW9ucy54aHJGaWVsZHMgKSB7XG5cdFx0XHRcdFx0Zm9yICggaSBpbiBvcHRpb25zLnhockZpZWxkcyApIHtcblx0XHRcdFx0XHRcdHhoclsgaSBdID0gb3B0aW9ucy54aHJGaWVsZHNbIGkgXTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBPdmVycmlkZSBtaW1lIHR5cGUgaWYgbmVlZGVkXG5cdFx0XHRcdGlmICggb3B0aW9ucy5taW1lVHlwZSAmJiB4aHIub3ZlcnJpZGVNaW1lVHlwZSApIHtcblx0XHRcdFx0XHR4aHIub3ZlcnJpZGVNaW1lVHlwZSggb3B0aW9ucy5taW1lVHlwZSApO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gWC1SZXF1ZXN0ZWQtV2l0aCBoZWFkZXJcblx0XHRcdFx0Ly8gRm9yIGNyb3NzLWRvbWFpbiByZXF1ZXN0cywgc2VlaW5nIGFzIGNvbmRpdGlvbnMgZm9yIGEgcHJlZmxpZ2h0IGFyZVxuXHRcdFx0XHQvLyBha2luIHRvIGEgamlnc2F3IHB1enpsZSwgd2Ugc2ltcGx5IG5ldmVyIHNldCBpdCB0byBiZSBzdXJlLlxuXHRcdFx0XHQvLyAoaXQgY2FuIGFsd2F5cyBiZSBzZXQgb24gYSBwZXItcmVxdWVzdCBiYXNpcyBvciBldmVuIHVzaW5nIGFqYXhTZXR1cClcblx0XHRcdFx0Ly8gRm9yIHNhbWUtZG9tYWluIHJlcXVlc3RzLCB3b24ndCBjaGFuZ2UgaGVhZGVyIGlmIGFscmVhZHkgcHJvdmlkZWQuXG5cdFx0XHRcdGlmICggIW9wdGlvbnMuY3Jvc3NEb21haW4gJiYgIWhlYWRlcnNbIFwiWC1SZXF1ZXN0ZWQtV2l0aFwiIF0gKSB7XG5cdFx0XHRcdFx0aGVhZGVyc1sgXCJYLVJlcXVlc3RlZC1XaXRoXCIgXSA9IFwiWE1MSHR0cFJlcXVlc3RcIjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIFNldCBoZWFkZXJzXG5cdFx0XHRcdGZvciAoIGkgaW4gaGVhZGVycyApIHtcblx0XHRcdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlciggaSwgaGVhZGVyc1sgaSBdICk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBDYWxsYmFja1xuXHRcdFx0XHRjYWxsYmFjayA9IGZ1bmN0aW9uKCB0eXBlICkge1xuXHRcdFx0XHRcdHJldHVybiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdGlmICggY2FsbGJhY2sgKSB7XG5cdFx0XHRcdFx0XHRcdGNhbGxiYWNrID0gZXJyb3JDYWxsYmFjayA9IHhoci5vbmxvYWQgPVxuXHRcdFx0XHRcdFx0XHRcdHhoci5vbmVycm9yID0geGhyLm9uYWJvcnQgPSB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gbnVsbDtcblxuXHRcdFx0XHRcdFx0XHRpZiAoIHR5cGUgPT09IFwiYWJvcnRcIiApIHtcblx0XHRcdFx0XHRcdFx0XHR4aHIuYWJvcnQoKTtcblx0XHRcdFx0XHRcdFx0fSBlbHNlIGlmICggdHlwZSA9PT0gXCJlcnJvclwiICkge1xuXG5cdFx0XHRcdFx0XHRcdFx0Ly8gU3VwcG9ydDogSUU5XG5cdFx0XHRcdFx0XHRcdFx0Ly8gT24gYSBtYW51YWwgbmF0aXZlIGFib3J0LCBJRTkgdGhyb3dzXG5cdFx0XHRcdFx0XHRcdFx0Ly8gZXJyb3JzIG9uIGFueSBwcm9wZXJ0eSBhY2Nlc3MgdGhhdCBpcyBub3QgcmVhZHlTdGF0ZVxuXHRcdFx0XHRcdFx0XHRcdGlmICggdHlwZW9mIHhoci5zdGF0dXMgIT09IFwibnVtYmVyXCIgKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRjb21wbGV0ZSggMCwgXCJlcnJvclwiICk7XG5cdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRcdGNvbXBsZXRlKFxuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdC8vIEZpbGU6IHByb3RvY29sIGFsd2F5cyB5aWVsZHMgc3RhdHVzIDA7IHNlZSAjODYwNSwgIzE0MjA3XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHhoci5zdGF0dXMsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHhoci5zdGF0dXNUZXh0XG5cdFx0XHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRjb21wbGV0ZShcblx0XHRcdFx0XHRcdFx0XHRcdHhoclN1Y2Nlc3NTdGF0dXNbIHhoci5zdGF0dXMgXSB8fCB4aHIuc3RhdHVzLFxuXHRcdFx0XHRcdFx0XHRcdFx0eGhyLnN0YXR1c1RleHQsXG5cblx0XHRcdFx0XHRcdFx0XHRcdC8vIFN1cHBvcnQ6IElFOSBvbmx5XG5cdFx0XHRcdFx0XHRcdFx0XHQvLyBJRTkgaGFzIG5vIFhIUjIgYnV0IHRocm93cyBvbiBiaW5hcnkgKHRyYWMtMTE0MjYpXG5cdFx0XHRcdFx0XHRcdFx0XHQvLyBGb3IgWEhSMiBub24tdGV4dCwgbGV0IHRoZSBjYWxsZXIgaGFuZGxlIGl0IChnaC0yNDk4KVxuXHRcdFx0XHRcdFx0XHRcdFx0KCB4aHIucmVzcG9uc2VUeXBlIHx8IFwidGV4dFwiICkgIT09IFwidGV4dFwiICB8fFxuXHRcdFx0XHRcdFx0XHRcdFx0dHlwZW9mIHhoci5yZXNwb25zZVRleHQgIT09IFwic3RyaW5nXCIgP1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR7IGJpbmFyeTogeGhyLnJlc3BvbnNlIH0gOlxuXHRcdFx0XHRcdFx0XHRcdFx0XHR7IHRleHQ6IHhoci5yZXNwb25zZVRleHQgfSxcblx0XHRcdFx0XHRcdFx0XHRcdHhoci5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKVxuXHRcdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9O1xuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdC8vIExpc3RlbiB0byBldmVudHNcblx0XHRcdFx0eGhyLm9ubG9hZCA9IGNhbGxiYWNrKCk7XG5cdFx0XHRcdGVycm9yQ2FsbGJhY2sgPSB4aHIub25lcnJvciA9IGNhbGxiYWNrKCBcImVycm9yXCIgKTtcblxuXHRcdFx0XHQvLyBTdXBwb3J0OiBJRTlcblx0XHRcdFx0Ly8gVXNlIG9ucmVhZHlzdGF0ZWNoYW5nZSB0byByZXBsYWNlIG9uYWJvcnRcblx0XHRcdFx0Ly8gdG8gaGFuZGxlIHVuY2F1Z2h0IGFib3J0c1xuXHRcdFx0XHRpZiAoIHhoci5vbmFib3J0ICE9PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRcdFx0eGhyLm9uYWJvcnQgPSBlcnJvckNhbGxiYWNrO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcblxuXHRcdFx0XHRcdFx0Ly8gQ2hlY2sgcmVhZHlTdGF0ZSBiZWZvcmUgdGltZW91dCBhcyBpdCBjaGFuZ2VzXG5cdFx0XHRcdFx0XHRpZiAoIHhoci5yZWFkeVN0YXRlID09PSA0ICkge1xuXG5cdFx0XHRcdFx0XHRcdC8vIEFsbG93IG9uZXJyb3IgdG8gYmUgY2FsbGVkIGZpcnN0LFxuXHRcdFx0XHRcdFx0XHQvLyBidXQgdGhhdCB3aWxsIG5vdCBoYW5kbGUgYSBuYXRpdmUgYWJvcnRcblx0XHRcdFx0XHRcdFx0Ly8gQWxzbywgc2F2ZSBlcnJvckNhbGxiYWNrIHRvIGEgdmFyaWFibGVcblx0XHRcdFx0XHRcdFx0Ly8gYXMgeGhyLm9uZXJyb3IgY2Fubm90IGJlIGFjY2Vzc2VkXG5cdFx0XHRcdFx0XHRcdHdpbmRvdy5zZXRUaW1lb3V0KCBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFx0XHRpZiAoIGNhbGxiYWNrICkge1xuXHRcdFx0XHRcdFx0XHRcdFx0ZXJyb3JDYWxsYmFjaygpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fSApO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBDcmVhdGUgdGhlIGFib3J0IGNhbGxiYWNrXG5cdFx0XHRcdGNhbGxiYWNrID0gY2FsbGJhY2soIFwiYWJvcnRcIiApO1xuXG5cdFx0XHRcdHRyeSB7XG5cblx0XHRcdFx0XHQvLyBEbyBzZW5kIHRoZSByZXF1ZXN0ICh0aGlzIG1heSByYWlzZSBhbiBleGNlcHRpb24pXG5cdFx0XHRcdFx0eGhyLnNlbmQoIG9wdGlvbnMuaGFzQ29udGVudCAmJiBvcHRpb25zLmRhdGEgfHwgbnVsbCApO1xuXHRcdFx0XHR9IGNhdGNoICggZSApIHtcblxuXHRcdFx0XHRcdC8vICMxNDY4MzogT25seSByZXRocm93IGlmIHRoaXMgaGFzbid0IGJlZW4gbm90aWZpZWQgYXMgYW4gZXJyb3IgeWV0XG5cdFx0XHRcdFx0aWYgKCBjYWxsYmFjayApIHtcblx0XHRcdFx0XHRcdHRocm93IGU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXG5cdFx0XHRhYm9ydDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGlmICggY2FsbGJhY2sgKSB7XG5cdFx0XHRcdFx0Y2FsbGJhY2soKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH07XG5cdH1cbn0gKTtcblxuXG5cblxuLy8gSW5zdGFsbCBzY3JpcHQgZGF0YVR5cGVcbmpRdWVyeS5hamF4U2V0dXAoIHtcblx0YWNjZXB0czoge1xuXHRcdHNjcmlwdDogXCJ0ZXh0L2phdmFzY3JpcHQsIGFwcGxpY2F0aW9uL2phdmFzY3JpcHQsIFwiICtcblx0XHRcdFwiYXBwbGljYXRpb24vZWNtYXNjcmlwdCwgYXBwbGljYXRpb24veC1lY21hc2NyaXB0XCJcblx0fSxcblx0Y29udGVudHM6IHtcblx0XHRzY3JpcHQ6IC9cXGIoPzpqYXZhfGVjbWEpc2NyaXB0XFxiL1xuXHR9LFxuXHRjb252ZXJ0ZXJzOiB7XG5cdFx0XCJ0ZXh0IHNjcmlwdFwiOiBmdW5jdGlvbiggdGV4dCApIHtcblx0XHRcdGpRdWVyeS5nbG9iYWxFdmFsKCB0ZXh0ICk7XG5cdFx0XHRyZXR1cm4gdGV4dDtcblx0XHR9XG5cdH1cbn0gKTtcblxuLy8gSGFuZGxlIGNhY2hlJ3Mgc3BlY2lhbCBjYXNlIGFuZCBjcm9zc0RvbWFpblxualF1ZXJ5LmFqYXhQcmVmaWx0ZXIoIFwic2NyaXB0XCIsIGZ1bmN0aW9uKCBzICkge1xuXHRpZiAoIHMuY2FjaGUgPT09IHVuZGVmaW5lZCApIHtcblx0XHRzLmNhY2hlID0gZmFsc2U7XG5cdH1cblx0aWYgKCBzLmNyb3NzRG9tYWluICkge1xuXHRcdHMudHlwZSA9IFwiR0VUXCI7XG5cdH1cbn0gKTtcblxuLy8gQmluZCBzY3JpcHQgdGFnIGhhY2sgdHJhbnNwb3J0XG5qUXVlcnkuYWpheFRyYW5zcG9ydCggXCJzY3JpcHRcIiwgZnVuY3Rpb24oIHMgKSB7XG5cblx0Ly8gVGhpcyB0cmFuc3BvcnQgb25seSBkZWFscyB3aXRoIGNyb3NzIGRvbWFpbiByZXF1ZXN0c1xuXHRpZiAoIHMuY3Jvc3NEb21haW4gKSB7XG5cdFx0dmFyIHNjcmlwdCwgY2FsbGJhY2s7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHNlbmQ6IGZ1bmN0aW9uKCBfLCBjb21wbGV0ZSApIHtcblx0XHRcdFx0c2NyaXB0ID0galF1ZXJ5KCBcIjxzY3JpcHQ+XCIgKS5wcm9wKCB7XG5cdFx0XHRcdFx0Y2hhcnNldDogcy5zY3JpcHRDaGFyc2V0LFxuXHRcdFx0XHRcdHNyYzogcy51cmxcblx0XHRcdFx0fSApLm9uKFxuXHRcdFx0XHRcdFwibG9hZCBlcnJvclwiLFxuXHRcdFx0XHRcdGNhbGxiYWNrID0gZnVuY3Rpb24oIGV2dCApIHtcblx0XHRcdFx0XHRcdHNjcmlwdC5yZW1vdmUoKTtcblx0XHRcdFx0XHRcdGNhbGxiYWNrID0gbnVsbDtcblx0XHRcdFx0XHRcdGlmICggZXZ0ICkge1xuXHRcdFx0XHRcdFx0XHRjb21wbGV0ZSggZXZ0LnR5cGUgPT09IFwiZXJyb3JcIiA/IDQwNCA6IDIwMCwgZXZ0LnR5cGUgKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdCk7XG5cblx0XHRcdFx0Ly8gVXNlIG5hdGl2ZSBET00gbWFuaXB1bGF0aW9uIHRvIGF2b2lkIG91ciBkb21NYW5pcCBBSkFYIHRyaWNrZXJ5XG5cdFx0XHRcdGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoIHNjcmlwdFsgMCBdICk7XG5cdFx0XHR9LFxuXHRcdFx0YWJvcnQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRpZiAoIGNhbGxiYWNrICkge1xuXHRcdFx0XHRcdGNhbGxiYWNrKCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9O1xuXHR9XG59ICk7XG5cblxuXG5cbnZhciBvbGRDYWxsYmFja3MgPSBbXSxcblx0cmpzb25wID0gLyg9KVxcPyg/PSZ8JCl8XFw/XFw/LztcblxuLy8gRGVmYXVsdCBqc29ucCBzZXR0aW5nc1xualF1ZXJ5LmFqYXhTZXR1cCgge1xuXHRqc29ucDogXCJjYWxsYmFja1wiLFxuXHRqc29ucENhbGxiYWNrOiBmdW5jdGlvbigpIHtcblx0XHR2YXIgY2FsbGJhY2sgPSBvbGRDYWxsYmFja3MucG9wKCkgfHwgKCBqUXVlcnkuZXhwYW5kbyArIFwiX1wiICsgKCBub25jZSsrICkgKTtcblx0XHR0aGlzWyBjYWxsYmFjayBdID0gdHJ1ZTtcblx0XHRyZXR1cm4gY2FsbGJhY2s7XG5cdH1cbn0gKTtcblxuLy8gRGV0ZWN0LCBub3JtYWxpemUgb3B0aW9ucyBhbmQgaW5zdGFsbCBjYWxsYmFja3MgZm9yIGpzb25wIHJlcXVlc3RzXG5qUXVlcnkuYWpheFByZWZpbHRlciggXCJqc29uIGpzb25wXCIsIGZ1bmN0aW9uKCBzLCBvcmlnaW5hbFNldHRpbmdzLCBqcVhIUiApIHtcblxuXHR2YXIgY2FsbGJhY2tOYW1lLCBvdmVyd3JpdHRlbiwgcmVzcG9uc2VDb250YWluZXIsXG5cdFx0anNvblByb3AgPSBzLmpzb25wICE9PSBmYWxzZSAmJiAoIHJqc29ucC50ZXN0KCBzLnVybCApID9cblx0XHRcdFwidXJsXCIgOlxuXHRcdFx0dHlwZW9mIHMuZGF0YSA9PT0gXCJzdHJpbmdcIiAmJlxuXHRcdFx0XHQoIHMuY29udGVudFR5cGUgfHwgXCJcIiApXG5cdFx0XHRcdFx0LmluZGV4T2YoIFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCIgKSA9PT0gMCAmJlxuXHRcdFx0XHRyanNvbnAudGVzdCggcy5kYXRhICkgJiYgXCJkYXRhXCJcblx0XHQpO1xuXG5cdC8vIEhhbmRsZSBpZmYgdGhlIGV4cGVjdGVkIGRhdGEgdHlwZSBpcyBcImpzb25wXCIgb3Igd2UgaGF2ZSBhIHBhcmFtZXRlciB0byBzZXRcblx0aWYgKCBqc29uUHJvcCB8fCBzLmRhdGFUeXBlc1sgMCBdID09PSBcImpzb25wXCIgKSB7XG5cblx0XHQvLyBHZXQgY2FsbGJhY2sgbmFtZSwgcmVtZW1iZXJpbmcgcHJlZXhpc3RpbmcgdmFsdWUgYXNzb2NpYXRlZCB3aXRoIGl0XG5cdFx0Y2FsbGJhY2tOYW1lID0gcy5qc29ucENhbGxiYWNrID0galF1ZXJ5LmlzRnVuY3Rpb24oIHMuanNvbnBDYWxsYmFjayApID9cblx0XHRcdHMuanNvbnBDYWxsYmFjaygpIDpcblx0XHRcdHMuanNvbnBDYWxsYmFjaztcblxuXHRcdC8vIEluc2VydCBjYWxsYmFjayBpbnRvIHVybCBvciBmb3JtIGRhdGFcblx0XHRpZiAoIGpzb25Qcm9wICkge1xuXHRcdFx0c1sganNvblByb3AgXSA9IHNbIGpzb25Qcm9wIF0ucmVwbGFjZSggcmpzb25wLCBcIiQxXCIgKyBjYWxsYmFja05hbWUgKTtcblx0XHR9IGVsc2UgaWYgKCBzLmpzb25wICE9PSBmYWxzZSApIHtcblx0XHRcdHMudXJsICs9ICggcnF1ZXJ5LnRlc3QoIHMudXJsICkgPyBcIiZcIiA6IFwiP1wiICkgKyBzLmpzb25wICsgXCI9XCIgKyBjYWxsYmFja05hbWU7XG5cdFx0fVxuXG5cdFx0Ly8gVXNlIGRhdGEgY29udmVydGVyIHRvIHJldHJpZXZlIGpzb24gYWZ0ZXIgc2NyaXB0IGV4ZWN1dGlvblxuXHRcdHMuY29udmVydGVyc1sgXCJzY3JpcHQganNvblwiIF0gPSBmdW5jdGlvbigpIHtcblx0XHRcdGlmICggIXJlc3BvbnNlQ29udGFpbmVyICkge1xuXHRcdFx0XHRqUXVlcnkuZXJyb3IoIGNhbGxiYWNrTmFtZSArIFwiIHdhcyBub3QgY2FsbGVkXCIgKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiByZXNwb25zZUNvbnRhaW5lclsgMCBdO1xuXHRcdH07XG5cblx0XHQvLyBGb3JjZSBqc29uIGRhdGFUeXBlXG5cdFx0cy5kYXRhVHlwZXNbIDAgXSA9IFwianNvblwiO1xuXG5cdFx0Ly8gSW5zdGFsbCBjYWxsYmFja1xuXHRcdG92ZXJ3cml0dGVuID0gd2luZG93WyBjYWxsYmFja05hbWUgXTtcblx0XHR3aW5kb3dbIGNhbGxiYWNrTmFtZSBdID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXNwb25zZUNvbnRhaW5lciA9IGFyZ3VtZW50cztcblx0XHR9O1xuXG5cdFx0Ly8gQ2xlYW4tdXAgZnVuY3Rpb24gKGZpcmVzIGFmdGVyIGNvbnZlcnRlcnMpXG5cdFx0anFYSFIuYWx3YXlzKCBmdW5jdGlvbigpIHtcblxuXHRcdFx0Ly8gSWYgcHJldmlvdXMgdmFsdWUgZGlkbid0IGV4aXN0IC0gcmVtb3ZlIGl0XG5cdFx0XHRpZiAoIG92ZXJ3cml0dGVuID09PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRcdGpRdWVyeSggd2luZG93ICkucmVtb3ZlUHJvcCggY2FsbGJhY2tOYW1lICk7XG5cblx0XHRcdC8vIE90aGVyd2lzZSByZXN0b3JlIHByZWV4aXN0aW5nIHZhbHVlXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR3aW5kb3dbIGNhbGxiYWNrTmFtZSBdID0gb3ZlcndyaXR0ZW47XG5cdFx0XHR9XG5cblx0XHRcdC8vIFNhdmUgYmFjayBhcyBmcmVlXG5cdFx0XHRpZiAoIHNbIGNhbGxiYWNrTmFtZSBdICkge1xuXG5cdFx0XHRcdC8vIE1ha2Ugc3VyZSB0aGF0IHJlLXVzaW5nIHRoZSBvcHRpb25zIGRvZXNuJ3Qgc2NyZXcgdGhpbmdzIGFyb3VuZFxuXHRcdFx0XHRzLmpzb25wQ2FsbGJhY2sgPSBvcmlnaW5hbFNldHRpbmdzLmpzb25wQ2FsbGJhY2s7XG5cblx0XHRcdFx0Ly8gU2F2ZSB0aGUgY2FsbGJhY2sgbmFtZSBmb3IgZnV0dXJlIHVzZVxuXHRcdFx0XHRvbGRDYWxsYmFja3MucHVzaCggY2FsbGJhY2tOYW1lICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIENhbGwgaWYgaXQgd2FzIGEgZnVuY3Rpb24gYW5kIHdlIGhhdmUgYSByZXNwb25zZVxuXHRcdFx0aWYgKCByZXNwb25zZUNvbnRhaW5lciAmJiBqUXVlcnkuaXNGdW5jdGlvbiggb3ZlcndyaXR0ZW4gKSApIHtcblx0XHRcdFx0b3ZlcndyaXR0ZW4oIHJlc3BvbnNlQ29udGFpbmVyWyAwIF0gKTtcblx0XHRcdH1cblxuXHRcdFx0cmVzcG9uc2VDb250YWluZXIgPSBvdmVyd3JpdHRlbiA9IHVuZGVmaW5lZDtcblx0XHR9ICk7XG5cblx0XHQvLyBEZWxlZ2F0ZSB0byBzY3JpcHRcblx0XHRyZXR1cm4gXCJzY3JpcHRcIjtcblx0fVxufSApO1xuXG5cblxuXG4vLyBBcmd1bWVudCBcImRhdGFcIiBzaG91bGQgYmUgc3RyaW5nIG9mIGh0bWxcbi8vIGNvbnRleHQgKG9wdGlvbmFsKTogSWYgc3BlY2lmaWVkLCB0aGUgZnJhZ21lbnQgd2lsbCBiZSBjcmVhdGVkIGluIHRoaXMgY29udGV4dCxcbi8vIGRlZmF1bHRzIHRvIGRvY3VtZW50XG4vLyBrZWVwU2NyaXB0cyAob3B0aW9uYWwpOiBJZiB0cnVlLCB3aWxsIGluY2x1ZGUgc2NyaXB0cyBwYXNzZWQgaW4gdGhlIGh0bWwgc3RyaW5nXG5qUXVlcnkucGFyc2VIVE1MID0gZnVuY3Rpb24oIGRhdGEsIGNvbnRleHQsIGtlZXBTY3JpcHRzICkge1xuXHRpZiAoICFkYXRhIHx8IHR5cGVvZiBkYXRhICE9PSBcInN0cmluZ1wiICkge1xuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cdGlmICggdHlwZW9mIGNvbnRleHQgPT09IFwiYm9vbGVhblwiICkge1xuXHRcdGtlZXBTY3JpcHRzID0gY29udGV4dDtcblx0XHRjb250ZXh0ID0gZmFsc2U7XG5cdH1cblx0Y29udGV4dCA9IGNvbnRleHQgfHwgZG9jdW1lbnQ7XG5cblx0dmFyIHBhcnNlZCA9IHJzaW5nbGVUYWcuZXhlYyggZGF0YSApLFxuXHRcdHNjcmlwdHMgPSAha2VlcFNjcmlwdHMgJiYgW107XG5cblx0Ly8gU2luZ2xlIHRhZ1xuXHRpZiAoIHBhcnNlZCApIHtcblx0XHRyZXR1cm4gWyBjb250ZXh0LmNyZWF0ZUVsZW1lbnQoIHBhcnNlZFsgMSBdICkgXTtcblx0fVxuXG5cdHBhcnNlZCA9IGJ1aWxkRnJhZ21lbnQoIFsgZGF0YSBdLCBjb250ZXh0LCBzY3JpcHRzICk7XG5cblx0aWYgKCBzY3JpcHRzICYmIHNjcmlwdHMubGVuZ3RoICkge1xuXHRcdGpRdWVyeSggc2NyaXB0cyApLnJlbW92ZSgpO1xuXHR9XG5cblx0cmV0dXJuIGpRdWVyeS5tZXJnZSggW10sIHBhcnNlZC5jaGlsZE5vZGVzICk7XG59O1xuXG5cbi8vIEtlZXAgYSBjb3B5IG9mIHRoZSBvbGQgbG9hZCBtZXRob2RcbnZhciBfbG9hZCA9IGpRdWVyeS5mbi5sb2FkO1xuXG4vKipcbiAqIExvYWQgYSB1cmwgaW50byBhIHBhZ2VcbiAqL1xualF1ZXJ5LmZuLmxvYWQgPSBmdW5jdGlvbiggdXJsLCBwYXJhbXMsIGNhbGxiYWNrICkge1xuXHRpZiAoIHR5cGVvZiB1cmwgIT09IFwic3RyaW5nXCIgJiYgX2xvYWQgKSB7XG5cdFx0cmV0dXJuIF9sb2FkLmFwcGx5KCB0aGlzLCBhcmd1bWVudHMgKTtcblx0fVxuXG5cdHZhciBzZWxlY3RvciwgdHlwZSwgcmVzcG9uc2UsXG5cdFx0c2VsZiA9IHRoaXMsXG5cdFx0b2ZmID0gdXJsLmluZGV4T2YoIFwiIFwiICk7XG5cblx0aWYgKCBvZmYgPiAtMSApIHtcblx0XHRzZWxlY3RvciA9IGpRdWVyeS50cmltKCB1cmwuc2xpY2UoIG9mZiApICk7XG5cdFx0dXJsID0gdXJsLnNsaWNlKCAwLCBvZmYgKTtcblx0fVxuXG5cdC8vIElmIGl0J3MgYSBmdW5jdGlvblxuXHRpZiAoIGpRdWVyeS5pc0Z1bmN0aW9uKCBwYXJhbXMgKSApIHtcblxuXHRcdC8vIFdlIGFzc3VtZSB0aGF0IGl0J3MgdGhlIGNhbGxiYWNrXG5cdFx0Y2FsbGJhY2sgPSBwYXJhbXM7XG5cdFx0cGFyYW1zID0gdW5kZWZpbmVkO1xuXG5cdC8vIE90aGVyd2lzZSwgYnVpbGQgYSBwYXJhbSBzdHJpbmdcblx0fSBlbHNlIGlmICggcGFyYW1zICYmIHR5cGVvZiBwYXJhbXMgPT09IFwib2JqZWN0XCIgKSB7XG5cdFx0dHlwZSA9IFwiUE9TVFwiO1xuXHR9XG5cblx0Ly8gSWYgd2UgaGF2ZSBlbGVtZW50cyB0byBtb2RpZnksIG1ha2UgdGhlIHJlcXVlc3Rcblx0aWYgKCBzZWxmLmxlbmd0aCA+IDAgKSB7XG5cdFx0alF1ZXJ5LmFqYXgoIHtcblx0XHRcdHVybDogdXJsLFxuXG5cdFx0XHQvLyBJZiBcInR5cGVcIiB2YXJpYWJsZSBpcyB1bmRlZmluZWQsIHRoZW4gXCJHRVRcIiBtZXRob2Qgd2lsbCBiZSB1c2VkLlxuXHRcdFx0Ly8gTWFrZSB2YWx1ZSBvZiB0aGlzIGZpZWxkIGV4cGxpY2l0IHNpbmNlXG5cdFx0XHQvLyB1c2VyIGNhbiBvdmVycmlkZSBpdCB0aHJvdWdoIGFqYXhTZXR1cCBtZXRob2Rcblx0XHRcdHR5cGU6IHR5cGUgfHwgXCJHRVRcIixcblx0XHRcdGRhdGFUeXBlOiBcImh0bWxcIixcblx0XHRcdGRhdGE6IHBhcmFtc1xuXHRcdH0gKS5kb25lKCBmdW5jdGlvbiggcmVzcG9uc2VUZXh0ICkge1xuXG5cdFx0XHQvLyBTYXZlIHJlc3BvbnNlIGZvciB1c2UgaW4gY29tcGxldGUgY2FsbGJhY2tcblx0XHRcdHJlc3BvbnNlID0gYXJndW1lbnRzO1xuXG5cdFx0XHRzZWxmLmh0bWwoIHNlbGVjdG9yID9cblxuXHRcdFx0XHQvLyBJZiBhIHNlbGVjdG9yIHdhcyBzcGVjaWZpZWQsIGxvY2F0ZSB0aGUgcmlnaHQgZWxlbWVudHMgaW4gYSBkdW1teSBkaXZcblx0XHRcdFx0Ly8gRXhjbHVkZSBzY3JpcHRzIHRvIGF2b2lkIElFICdQZXJtaXNzaW9uIERlbmllZCcgZXJyb3JzXG5cdFx0XHRcdGpRdWVyeSggXCI8ZGl2PlwiICkuYXBwZW5kKCBqUXVlcnkucGFyc2VIVE1MKCByZXNwb25zZVRleHQgKSApLmZpbmQoIHNlbGVjdG9yICkgOlxuXG5cdFx0XHRcdC8vIE90aGVyd2lzZSB1c2UgdGhlIGZ1bGwgcmVzdWx0XG5cdFx0XHRcdHJlc3BvbnNlVGV4dCApO1xuXG5cdFx0Ly8gSWYgdGhlIHJlcXVlc3Qgc3VjY2VlZHMsIHRoaXMgZnVuY3Rpb24gZ2V0cyBcImRhdGFcIiwgXCJzdGF0dXNcIiwgXCJqcVhIUlwiXG5cdFx0Ly8gYnV0IHRoZXkgYXJlIGlnbm9yZWQgYmVjYXVzZSByZXNwb25zZSB3YXMgc2V0IGFib3ZlLlxuXHRcdC8vIElmIGl0IGZhaWxzLCB0aGlzIGZ1bmN0aW9uIGdldHMgXCJqcVhIUlwiLCBcInN0YXR1c1wiLCBcImVycm9yXCJcblx0XHR9ICkuYWx3YXlzKCBjYWxsYmFjayAmJiBmdW5jdGlvbigganFYSFIsIHN0YXR1cyApIHtcblx0XHRcdHNlbGYuZWFjaCggZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGNhbGxiYWNrLmFwcGx5KCB0aGlzLCByZXNwb25zZSB8fCBbIGpxWEhSLnJlc3BvbnNlVGV4dCwgc3RhdHVzLCBqcVhIUiBdICk7XG5cdFx0XHR9ICk7XG5cdFx0fSApO1xuXHR9XG5cblx0cmV0dXJuIHRoaXM7XG59O1xuXG5cblxuXG4vLyBBdHRhY2ggYSBidW5jaCBvZiBmdW5jdGlvbnMgZm9yIGhhbmRsaW5nIGNvbW1vbiBBSkFYIGV2ZW50c1xualF1ZXJ5LmVhY2goIFtcblx0XCJhamF4U3RhcnRcIixcblx0XCJhamF4U3RvcFwiLFxuXHRcImFqYXhDb21wbGV0ZVwiLFxuXHRcImFqYXhFcnJvclwiLFxuXHRcImFqYXhTdWNjZXNzXCIsXG5cdFwiYWpheFNlbmRcIlxuXSwgZnVuY3Rpb24oIGksIHR5cGUgKSB7XG5cdGpRdWVyeS5mblsgdHlwZSBdID0gZnVuY3Rpb24oIGZuICkge1xuXHRcdHJldHVybiB0aGlzLm9uKCB0eXBlLCBmbiApO1xuXHR9O1xufSApO1xuXG5cblxuXG5qUXVlcnkuZXhwci5maWx0ZXJzLmFuaW1hdGVkID0gZnVuY3Rpb24oIGVsZW0gKSB7XG5cdHJldHVybiBqUXVlcnkuZ3JlcCggalF1ZXJ5LnRpbWVycywgZnVuY3Rpb24oIGZuICkge1xuXHRcdHJldHVybiBlbGVtID09PSBmbi5lbGVtO1xuXHR9ICkubGVuZ3RoO1xufTtcblxuXG5cblxuLyoqXG4gKiBHZXRzIGEgd2luZG93IGZyb20gYW4gZWxlbWVudFxuICovXG5mdW5jdGlvbiBnZXRXaW5kb3coIGVsZW0gKSB7XG5cdHJldHVybiBqUXVlcnkuaXNXaW5kb3coIGVsZW0gKSA/IGVsZW0gOiBlbGVtLm5vZGVUeXBlID09PSA5ICYmIGVsZW0uZGVmYXVsdFZpZXc7XG59XG5cbmpRdWVyeS5vZmZzZXQgPSB7XG5cdHNldE9mZnNldDogZnVuY3Rpb24oIGVsZW0sIG9wdGlvbnMsIGkgKSB7XG5cdFx0dmFyIGN1clBvc2l0aW9uLCBjdXJMZWZ0LCBjdXJDU1NUb3AsIGN1clRvcCwgY3VyT2Zmc2V0LCBjdXJDU1NMZWZ0LCBjYWxjdWxhdGVQb3NpdGlvbixcblx0XHRcdHBvc2l0aW9uID0galF1ZXJ5LmNzcyggZWxlbSwgXCJwb3NpdGlvblwiICksXG5cdFx0XHRjdXJFbGVtID0galF1ZXJ5KCBlbGVtICksXG5cdFx0XHRwcm9wcyA9IHt9O1xuXG5cdFx0Ly8gU2V0IHBvc2l0aW9uIGZpcnN0LCBpbi1jYXNlIHRvcC9sZWZ0IGFyZSBzZXQgZXZlbiBvbiBzdGF0aWMgZWxlbVxuXHRcdGlmICggcG9zaXRpb24gPT09IFwic3RhdGljXCIgKSB7XG5cdFx0XHRlbGVtLnN0eWxlLnBvc2l0aW9uID0gXCJyZWxhdGl2ZVwiO1xuXHRcdH1cblxuXHRcdGN1ck9mZnNldCA9IGN1ckVsZW0ub2Zmc2V0KCk7XG5cdFx0Y3VyQ1NTVG9wID0galF1ZXJ5LmNzcyggZWxlbSwgXCJ0b3BcIiApO1xuXHRcdGN1ckNTU0xlZnQgPSBqUXVlcnkuY3NzKCBlbGVtLCBcImxlZnRcIiApO1xuXHRcdGNhbGN1bGF0ZVBvc2l0aW9uID0gKCBwb3NpdGlvbiA9PT0gXCJhYnNvbHV0ZVwiIHx8IHBvc2l0aW9uID09PSBcImZpeGVkXCIgKSAmJlxuXHRcdFx0KCBjdXJDU1NUb3AgKyBjdXJDU1NMZWZ0ICkuaW5kZXhPZiggXCJhdXRvXCIgKSA+IC0xO1xuXG5cdFx0Ly8gTmVlZCB0byBiZSBhYmxlIHRvIGNhbGN1bGF0ZSBwb3NpdGlvbiBpZiBlaXRoZXJcblx0XHQvLyB0b3Agb3IgbGVmdCBpcyBhdXRvIGFuZCBwb3NpdGlvbiBpcyBlaXRoZXIgYWJzb2x1dGUgb3IgZml4ZWRcblx0XHRpZiAoIGNhbGN1bGF0ZVBvc2l0aW9uICkge1xuXHRcdFx0Y3VyUG9zaXRpb24gPSBjdXJFbGVtLnBvc2l0aW9uKCk7XG5cdFx0XHRjdXJUb3AgPSBjdXJQb3NpdGlvbi50b3A7XG5cdFx0XHRjdXJMZWZ0ID0gY3VyUG9zaXRpb24ubGVmdDtcblxuXHRcdH0gZWxzZSB7XG5cdFx0XHRjdXJUb3AgPSBwYXJzZUZsb2F0KCBjdXJDU1NUb3AgKSB8fCAwO1xuXHRcdFx0Y3VyTGVmdCA9IHBhcnNlRmxvYXQoIGN1ckNTU0xlZnQgKSB8fCAwO1xuXHRcdH1cblxuXHRcdGlmICggalF1ZXJ5LmlzRnVuY3Rpb24oIG9wdGlvbnMgKSApIHtcblxuXHRcdFx0Ly8gVXNlIGpRdWVyeS5leHRlbmQgaGVyZSB0byBhbGxvdyBtb2RpZmljYXRpb24gb2YgY29vcmRpbmF0ZXMgYXJndW1lbnQgKGdoLTE4NDgpXG5cdFx0XHRvcHRpb25zID0gb3B0aW9ucy5jYWxsKCBlbGVtLCBpLCBqUXVlcnkuZXh0ZW5kKCB7fSwgY3VyT2Zmc2V0ICkgKTtcblx0XHR9XG5cblx0XHRpZiAoIG9wdGlvbnMudG9wICE9IG51bGwgKSB7XG5cdFx0XHRwcm9wcy50b3AgPSAoIG9wdGlvbnMudG9wIC0gY3VyT2Zmc2V0LnRvcCApICsgY3VyVG9wO1xuXHRcdH1cblx0XHRpZiAoIG9wdGlvbnMubGVmdCAhPSBudWxsICkge1xuXHRcdFx0cHJvcHMubGVmdCA9ICggb3B0aW9ucy5sZWZ0IC0gY3VyT2Zmc2V0LmxlZnQgKSArIGN1ckxlZnQ7XG5cdFx0fVxuXG5cdFx0aWYgKCBcInVzaW5nXCIgaW4gb3B0aW9ucyApIHtcblx0XHRcdG9wdGlvbnMudXNpbmcuY2FsbCggZWxlbSwgcHJvcHMgKTtcblxuXHRcdH0gZWxzZSB7XG5cdFx0XHRjdXJFbGVtLmNzcyggcHJvcHMgKTtcblx0XHR9XG5cdH1cbn07XG5cbmpRdWVyeS5mbi5leHRlbmQoIHtcblx0b2Zmc2V0OiBmdW5jdGlvbiggb3B0aW9ucyApIHtcblx0XHRpZiAoIGFyZ3VtZW50cy5sZW5ndGggKSB7XG5cdFx0XHRyZXR1cm4gb3B0aW9ucyA9PT0gdW5kZWZpbmVkID9cblx0XHRcdFx0dGhpcyA6XG5cdFx0XHRcdHRoaXMuZWFjaCggZnVuY3Rpb24oIGkgKSB7XG5cdFx0XHRcdFx0alF1ZXJ5Lm9mZnNldC5zZXRPZmZzZXQoIHRoaXMsIG9wdGlvbnMsIGkgKTtcblx0XHRcdFx0fSApO1xuXHRcdH1cblxuXHRcdHZhciBkb2NFbGVtLCB3aW4sXG5cdFx0XHRlbGVtID0gdGhpc1sgMCBdLFxuXHRcdFx0Ym94ID0geyB0b3A6IDAsIGxlZnQ6IDAgfSxcblx0XHRcdGRvYyA9IGVsZW0gJiYgZWxlbS5vd25lckRvY3VtZW50O1xuXG5cdFx0aWYgKCAhZG9jICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGRvY0VsZW0gPSBkb2MuZG9jdW1lbnRFbGVtZW50O1xuXG5cdFx0Ly8gTWFrZSBzdXJlIGl0J3Mgbm90IGEgZGlzY29ubmVjdGVkIERPTSBub2RlXG5cdFx0aWYgKCAhalF1ZXJ5LmNvbnRhaW5zKCBkb2NFbGVtLCBlbGVtICkgKSB7XG5cdFx0XHRyZXR1cm4gYm94O1xuXHRcdH1cblxuXHRcdGJveCA9IGVsZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cdFx0d2luID0gZ2V0V2luZG93KCBkb2MgKTtcblx0XHRyZXR1cm4ge1xuXHRcdFx0dG9wOiBib3gudG9wICsgd2luLnBhZ2VZT2Zmc2V0IC0gZG9jRWxlbS5jbGllbnRUb3AsXG5cdFx0XHRsZWZ0OiBib3gubGVmdCArIHdpbi5wYWdlWE9mZnNldCAtIGRvY0VsZW0uY2xpZW50TGVmdFxuXHRcdH07XG5cdH0sXG5cblx0cG9zaXRpb246IGZ1bmN0aW9uKCkge1xuXHRcdGlmICggIXRoaXNbIDAgXSApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHR2YXIgb2Zmc2V0UGFyZW50LCBvZmZzZXQsXG5cdFx0XHRlbGVtID0gdGhpc1sgMCBdLFxuXHRcdFx0cGFyZW50T2Zmc2V0ID0geyB0b3A6IDAsIGxlZnQ6IDAgfTtcblxuXHRcdC8vIEZpeGVkIGVsZW1lbnRzIGFyZSBvZmZzZXQgZnJvbSB3aW5kb3cgKHBhcmVudE9mZnNldCA9IHt0b3A6MCwgbGVmdDogMH0sXG5cdFx0Ly8gYmVjYXVzZSBpdCBpcyBpdHMgb25seSBvZmZzZXQgcGFyZW50XG5cdFx0aWYgKCBqUXVlcnkuY3NzKCBlbGVtLCBcInBvc2l0aW9uXCIgKSA9PT0gXCJmaXhlZFwiICkge1xuXG5cdFx0XHQvLyBBc3N1bWUgZ2V0Qm91bmRpbmdDbGllbnRSZWN0IGlzIHRoZXJlIHdoZW4gY29tcHV0ZWQgcG9zaXRpb24gaXMgZml4ZWRcblx0XHRcdG9mZnNldCA9IGVsZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHQvLyBHZXQgKnJlYWwqIG9mZnNldFBhcmVudFxuXHRcdFx0b2Zmc2V0UGFyZW50ID0gdGhpcy5vZmZzZXRQYXJlbnQoKTtcblxuXHRcdFx0Ly8gR2V0IGNvcnJlY3Qgb2Zmc2V0c1xuXHRcdFx0b2Zmc2V0ID0gdGhpcy5vZmZzZXQoKTtcblx0XHRcdGlmICggIWpRdWVyeS5ub2RlTmFtZSggb2Zmc2V0UGFyZW50WyAwIF0sIFwiaHRtbFwiICkgKSB7XG5cdFx0XHRcdHBhcmVudE9mZnNldCA9IG9mZnNldFBhcmVudC5vZmZzZXQoKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQWRkIG9mZnNldFBhcmVudCBib3JkZXJzXG5cdFx0XHRwYXJlbnRPZmZzZXQudG9wICs9IGpRdWVyeS5jc3MoIG9mZnNldFBhcmVudFsgMCBdLCBcImJvcmRlclRvcFdpZHRoXCIsIHRydWUgKTtcblx0XHRcdHBhcmVudE9mZnNldC5sZWZ0ICs9IGpRdWVyeS5jc3MoIG9mZnNldFBhcmVudFsgMCBdLCBcImJvcmRlckxlZnRXaWR0aFwiLCB0cnVlICk7XG5cdFx0fVxuXG5cdFx0Ly8gU3VidHJhY3QgcGFyZW50IG9mZnNldHMgYW5kIGVsZW1lbnQgbWFyZ2luc1xuXHRcdHJldHVybiB7XG5cdFx0XHR0b3A6IG9mZnNldC50b3AgLSBwYXJlbnRPZmZzZXQudG9wIC0galF1ZXJ5LmNzcyggZWxlbSwgXCJtYXJnaW5Ub3BcIiwgdHJ1ZSApLFxuXHRcdFx0bGVmdDogb2Zmc2V0LmxlZnQgLSBwYXJlbnRPZmZzZXQubGVmdCAtIGpRdWVyeS5jc3MoIGVsZW0sIFwibWFyZ2luTGVmdFwiLCB0cnVlIClcblx0XHR9O1xuXHR9LFxuXG5cdC8vIFRoaXMgbWV0aG9kIHdpbGwgcmV0dXJuIGRvY3VtZW50RWxlbWVudCBpbiB0aGUgZm9sbG93aW5nIGNhc2VzOlxuXHQvLyAxKSBGb3IgdGhlIGVsZW1lbnQgaW5zaWRlIHRoZSBpZnJhbWUgd2l0aG91dCBvZmZzZXRQYXJlbnQsIHRoaXMgbWV0aG9kIHdpbGwgcmV0dXJuXG5cdC8vICAgIGRvY3VtZW50RWxlbWVudCBvZiB0aGUgcGFyZW50IHdpbmRvd1xuXHQvLyAyKSBGb3IgdGhlIGhpZGRlbiBvciBkZXRhY2hlZCBlbGVtZW50XG5cdC8vIDMpIEZvciBib2R5IG9yIGh0bWwgZWxlbWVudCwgaS5lLiBpbiBjYXNlIG9mIHRoZSBodG1sIG5vZGUgLSBpdCB3aWxsIHJldHVybiBpdHNlbGZcblx0Ly9cblx0Ly8gYnV0IHRob3NlIGV4Y2VwdGlvbnMgd2VyZSBuZXZlciBwcmVzZW50ZWQgYXMgYSByZWFsIGxpZmUgdXNlLWNhc2VzXG5cdC8vIGFuZCBtaWdodCBiZSBjb25zaWRlcmVkIGFzIG1vcmUgcHJlZmVyYWJsZSByZXN1bHRzLlxuXHQvL1xuXHQvLyBUaGlzIGxvZ2ljLCBob3dldmVyLCBpcyBub3QgZ3VhcmFudGVlZCBhbmQgY2FuIGNoYW5nZSBhdCBhbnkgcG9pbnQgaW4gdGhlIGZ1dHVyZVxuXHRvZmZzZXRQYXJlbnQ6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLm1hcCggZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgb2Zmc2V0UGFyZW50ID0gdGhpcy5vZmZzZXRQYXJlbnQ7XG5cblx0XHRcdHdoaWxlICggb2Zmc2V0UGFyZW50ICYmIGpRdWVyeS5jc3MoIG9mZnNldFBhcmVudCwgXCJwb3NpdGlvblwiICkgPT09IFwic3RhdGljXCIgKSB7XG5cdFx0XHRcdG9mZnNldFBhcmVudCA9IG9mZnNldFBhcmVudC5vZmZzZXRQYXJlbnQ7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBvZmZzZXRQYXJlbnQgfHwgZG9jdW1lbnRFbGVtZW50O1xuXHRcdH0gKTtcblx0fVxufSApO1xuXG4vLyBDcmVhdGUgc2Nyb2xsTGVmdCBhbmQgc2Nyb2xsVG9wIG1ldGhvZHNcbmpRdWVyeS5lYWNoKCB7IHNjcm9sbExlZnQ6IFwicGFnZVhPZmZzZXRcIiwgc2Nyb2xsVG9wOiBcInBhZ2VZT2Zmc2V0XCIgfSwgZnVuY3Rpb24oIG1ldGhvZCwgcHJvcCApIHtcblx0dmFyIHRvcCA9IFwicGFnZVlPZmZzZXRcIiA9PT0gcHJvcDtcblxuXHRqUXVlcnkuZm5bIG1ldGhvZCBdID0gZnVuY3Rpb24oIHZhbCApIHtcblx0XHRyZXR1cm4gYWNjZXNzKCB0aGlzLCBmdW5jdGlvbiggZWxlbSwgbWV0aG9kLCB2YWwgKSB7XG5cdFx0XHR2YXIgd2luID0gZ2V0V2luZG93KCBlbGVtICk7XG5cblx0XHRcdGlmICggdmFsID09PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRcdHJldHVybiB3aW4gPyB3aW5bIHByb3AgXSA6IGVsZW1bIG1ldGhvZCBdO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIHdpbiApIHtcblx0XHRcdFx0d2luLnNjcm9sbFRvKFxuXHRcdFx0XHRcdCF0b3AgPyB2YWwgOiB3aW4ucGFnZVhPZmZzZXQsXG5cdFx0XHRcdFx0dG9wID8gdmFsIDogd2luLnBhZ2VZT2Zmc2V0XG5cdFx0XHRcdCk7XG5cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGVsZW1bIG1ldGhvZCBdID0gdmFsO1xuXHRcdFx0fVxuXHRcdH0sIG1ldGhvZCwgdmFsLCBhcmd1bWVudHMubGVuZ3RoICk7XG5cdH07XG59ICk7XG5cbi8vIFN1cHBvcnQ6IFNhZmFyaTw3LTgrLCBDaHJvbWU8MzctNDQrXG4vLyBBZGQgdGhlIHRvcC9sZWZ0IGNzc0hvb2tzIHVzaW5nIGpRdWVyeS5mbi5wb3NpdGlvblxuLy8gV2Via2l0IGJ1ZzogaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTI5MDg0XG4vLyBCbGluayBidWc6IGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD0yMjkyODBcbi8vIGdldENvbXB1dGVkU3R5bGUgcmV0dXJucyBwZXJjZW50IHdoZW4gc3BlY2lmaWVkIGZvciB0b3AvbGVmdC9ib3R0b20vcmlnaHQ7XG4vLyByYXRoZXIgdGhhbiBtYWtlIHRoZSBjc3MgbW9kdWxlIGRlcGVuZCBvbiB0aGUgb2Zmc2V0IG1vZHVsZSwganVzdCBjaGVjayBmb3IgaXQgaGVyZVxualF1ZXJ5LmVhY2goIFsgXCJ0b3BcIiwgXCJsZWZ0XCIgXSwgZnVuY3Rpb24oIGksIHByb3AgKSB7XG5cdGpRdWVyeS5jc3NIb29rc1sgcHJvcCBdID0gYWRkR2V0SG9va0lmKCBzdXBwb3J0LnBpeGVsUG9zaXRpb24sXG5cdFx0ZnVuY3Rpb24oIGVsZW0sIGNvbXB1dGVkICkge1xuXHRcdFx0aWYgKCBjb21wdXRlZCApIHtcblx0XHRcdFx0Y29tcHV0ZWQgPSBjdXJDU1MoIGVsZW0sIHByb3AgKTtcblxuXHRcdFx0XHQvLyBJZiBjdXJDU1MgcmV0dXJucyBwZXJjZW50YWdlLCBmYWxsYmFjayB0byBvZmZzZXRcblx0XHRcdFx0cmV0dXJuIHJudW1ub25weC50ZXN0KCBjb21wdXRlZCApID9cblx0XHRcdFx0XHRqUXVlcnkoIGVsZW0gKS5wb3NpdGlvbigpWyBwcm9wIF0gKyBcInB4XCIgOlxuXHRcdFx0XHRcdGNvbXB1dGVkO1xuXHRcdFx0fVxuXHRcdH1cblx0KTtcbn0gKTtcblxuXG4vLyBDcmVhdGUgaW5uZXJIZWlnaHQsIGlubmVyV2lkdGgsIGhlaWdodCwgd2lkdGgsIG91dGVySGVpZ2h0IGFuZCBvdXRlcldpZHRoIG1ldGhvZHNcbmpRdWVyeS5lYWNoKCB7IEhlaWdodDogXCJoZWlnaHRcIiwgV2lkdGg6IFwid2lkdGhcIiB9LCBmdW5jdGlvbiggbmFtZSwgdHlwZSApIHtcblx0alF1ZXJ5LmVhY2goIHsgcGFkZGluZzogXCJpbm5lclwiICsgbmFtZSwgY29udGVudDogdHlwZSwgXCJcIjogXCJvdXRlclwiICsgbmFtZSB9LFxuXHRcdGZ1bmN0aW9uKCBkZWZhdWx0RXh0cmEsIGZ1bmNOYW1lICkge1xuXG5cdFx0Ly8gTWFyZ2luIGlzIG9ubHkgZm9yIG91dGVySGVpZ2h0LCBvdXRlcldpZHRoXG5cdFx0alF1ZXJ5LmZuWyBmdW5jTmFtZSBdID0gZnVuY3Rpb24oIG1hcmdpbiwgdmFsdWUgKSB7XG5cdFx0XHR2YXIgY2hhaW5hYmxlID0gYXJndW1lbnRzLmxlbmd0aCAmJiAoIGRlZmF1bHRFeHRyYSB8fCB0eXBlb2YgbWFyZ2luICE9PSBcImJvb2xlYW5cIiApLFxuXHRcdFx0XHRleHRyYSA9IGRlZmF1bHRFeHRyYSB8fCAoIG1hcmdpbiA9PT0gdHJ1ZSB8fCB2YWx1ZSA9PT0gdHJ1ZSA/IFwibWFyZ2luXCIgOiBcImJvcmRlclwiICk7XG5cblx0XHRcdHJldHVybiBhY2Nlc3MoIHRoaXMsIGZ1bmN0aW9uKCBlbGVtLCB0eXBlLCB2YWx1ZSApIHtcblx0XHRcdFx0dmFyIGRvYztcblxuXHRcdFx0XHRpZiAoIGpRdWVyeS5pc1dpbmRvdyggZWxlbSApICkge1xuXG5cdFx0XHRcdFx0Ly8gQXMgb2YgNS84LzIwMTIgdGhpcyB3aWxsIHlpZWxkIGluY29ycmVjdCByZXN1bHRzIGZvciBNb2JpbGUgU2FmYXJpLCBidXQgdGhlcmVcblx0XHRcdFx0XHQvLyBpc24ndCBhIHdob2xlIGxvdCB3ZSBjYW4gZG8uIFNlZSBwdWxsIHJlcXVlc3QgYXQgdGhpcyBVUkwgZm9yIGRpc2N1c3Npb246XG5cdFx0XHRcdFx0Ly8gaHR0cHM6Ly9naXRodWIuY29tL2pxdWVyeS9qcXVlcnkvcHVsbC83NjRcblx0XHRcdFx0XHRyZXR1cm4gZWxlbS5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnRbIFwiY2xpZW50XCIgKyBuYW1lIF07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBHZXQgZG9jdW1lbnQgd2lkdGggb3IgaGVpZ2h0XG5cdFx0XHRcdGlmICggZWxlbS5ub2RlVHlwZSA9PT0gOSApIHtcblx0XHRcdFx0XHRkb2MgPSBlbGVtLmRvY3VtZW50RWxlbWVudDtcblxuXHRcdFx0XHRcdC8vIEVpdGhlciBzY3JvbGxbV2lkdGgvSGVpZ2h0XSBvciBvZmZzZXRbV2lkdGgvSGVpZ2h0XSBvciBjbGllbnRbV2lkdGgvSGVpZ2h0XSxcblx0XHRcdFx0XHQvLyB3aGljaGV2ZXIgaXMgZ3JlYXRlc3Rcblx0XHRcdFx0XHRyZXR1cm4gTWF0aC5tYXgoXG5cdFx0XHRcdFx0XHRlbGVtLmJvZHlbIFwic2Nyb2xsXCIgKyBuYW1lIF0sIGRvY1sgXCJzY3JvbGxcIiArIG5hbWUgXSxcblx0XHRcdFx0XHRcdGVsZW0uYm9keVsgXCJvZmZzZXRcIiArIG5hbWUgXSwgZG9jWyBcIm9mZnNldFwiICsgbmFtZSBdLFxuXHRcdFx0XHRcdFx0ZG9jWyBcImNsaWVudFwiICsgbmFtZSBdXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiB2YWx1ZSA9PT0gdW5kZWZpbmVkID9cblxuXHRcdFx0XHRcdC8vIEdldCB3aWR0aCBvciBoZWlnaHQgb24gdGhlIGVsZW1lbnQsIHJlcXVlc3RpbmcgYnV0IG5vdCBmb3JjaW5nIHBhcnNlRmxvYXRcblx0XHRcdFx0XHRqUXVlcnkuY3NzKCBlbGVtLCB0eXBlLCBleHRyYSApIDpcblxuXHRcdFx0XHRcdC8vIFNldCB3aWR0aCBvciBoZWlnaHQgb24gdGhlIGVsZW1lbnRcblx0XHRcdFx0XHRqUXVlcnkuc3R5bGUoIGVsZW0sIHR5cGUsIHZhbHVlLCBleHRyYSApO1xuXHRcdFx0fSwgdHlwZSwgY2hhaW5hYmxlID8gbWFyZ2luIDogdW5kZWZpbmVkLCBjaGFpbmFibGUsIG51bGwgKTtcblx0XHR9O1xuXHR9ICk7XG59ICk7XG5cblxualF1ZXJ5LmZuLmV4dGVuZCgge1xuXG5cdGJpbmQ6IGZ1bmN0aW9uKCB0eXBlcywgZGF0YSwgZm4gKSB7XG5cdFx0cmV0dXJuIHRoaXMub24oIHR5cGVzLCBudWxsLCBkYXRhLCBmbiApO1xuXHR9LFxuXHR1bmJpbmQ6IGZ1bmN0aW9uKCB0eXBlcywgZm4gKSB7XG5cdFx0cmV0dXJuIHRoaXMub2ZmKCB0eXBlcywgbnVsbCwgZm4gKTtcblx0fSxcblxuXHRkZWxlZ2F0ZTogZnVuY3Rpb24oIHNlbGVjdG9yLCB0eXBlcywgZGF0YSwgZm4gKSB7XG5cdFx0cmV0dXJuIHRoaXMub24oIHR5cGVzLCBzZWxlY3RvciwgZGF0YSwgZm4gKTtcblx0fSxcblx0dW5kZWxlZ2F0ZTogZnVuY3Rpb24oIHNlbGVjdG9yLCB0eXBlcywgZm4gKSB7XG5cblx0XHQvLyAoIG5hbWVzcGFjZSApIG9yICggc2VsZWN0b3IsIHR5cGVzIFssIGZuXSApXG5cdFx0cmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPT09IDEgP1xuXHRcdFx0dGhpcy5vZmYoIHNlbGVjdG9yLCBcIioqXCIgKSA6XG5cdFx0XHR0aGlzLm9mZiggdHlwZXMsIHNlbGVjdG9yIHx8IFwiKipcIiwgZm4gKTtcblx0fSxcblx0c2l6ZTogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIHRoaXMubGVuZ3RoO1xuXHR9XG59ICk7XG5cbmpRdWVyeS5mbi5hbmRTZWxmID0galF1ZXJ5LmZuLmFkZEJhY2s7XG5cblxuXG5cbi8vIFJlZ2lzdGVyIGFzIGEgbmFtZWQgQU1EIG1vZHVsZSwgc2luY2UgalF1ZXJ5IGNhbiBiZSBjb25jYXRlbmF0ZWQgd2l0aCBvdGhlclxuLy8gZmlsZXMgdGhhdCBtYXkgdXNlIGRlZmluZSwgYnV0IG5vdCB2aWEgYSBwcm9wZXIgY29uY2F0ZW5hdGlvbiBzY3JpcHQgdGhhdFxuLy8gdW5kZXJzdGFuZHMgYW5vbnltb3VzIEFNRCBtb2R1bGVzLiBBIG5hbWVkIEFNRCBpcyBzYWZlc3QgYW5kIG1vc3Qgcm9idXN0XG4vLyB3YXkgdG8gcmVnaXN0ZXIuIExvd2VyY2FzZSBqcXVlcnkgaXMgdXNlZCBiZWNhdXNlIEFNRCBtb2R1bGUgbmFtZXMgYXJlXG4vLyBkZXJpdmVkIGZyb20gZmlsZSBuYW1lcywgYW5kIGpRdWVyeSBpcyBub3JtYWxseSBkZWxpdmVyZWQgaW4gYSBsb3dlcmNhc2Vcbi8vIGZpbGUgbmFtZS4gRG8gdGhpcyBhZnRlciBjcmVhdGluZyB0aGUgZ2xvYmFsIHNvIHRoYXQgaWYgYW4gQU1EIG1vZHVsZSB3YW50c1xuLy8gdG8gY2FsbCBub0NvbmZsaWN0IHRvIGhpZGUgdGhpcyB2ZXJzaW9uIG9mIGpRdWVyeSwgaXQgd2lsbCB3b3JrLlxuXG4vLyBOb3RlIHRoYXQgZm9yIG1heGltdW0gcG9ydGFiaWxpdHksIGxpYnJhcmllcyB0aGF0IGFyZSBub3QgalF1ZXJ5IHNob3VsZFxuLy8gZGVjbGFyZSB0aGVtc2VsdmVzIGFzIGFub255bW91cyBtb2R1bGVzLCBhbmQgYXZvaWQgc2V0dGluZyBhIGdsb2JhbCBpZiBhblxuLy8gQU1EIGxvYWRlciBpcyBwcmVzZW50LiBqUXVlcnkgaXMgYSBzcGVjaWFsIGNhc2UuIEZvciBtb3JlIGluZm9ybWF0aW9uLCBzZWVcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9qcmJ1cmtlL3JlcXVpcmVqcy93aWtpL1VwZGF0aW5nLWV4aXN0aW5nLWxpYnJhcmllcyN3aWtpLWFub25cblxuaWYgKCB0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCApIHtcblx0ZGVmaW5lKCBcImpxdWVyeVwiLCBbXSwgZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIGpRdWVyeTtcblx0fSApO1xufVxuXG5cblxudmFyXG5cblx0Ly8gTWFwIG92ZXIgalF1ZXJ5IGluIGNhc2Ugb2Ygb3ZlcndyaXRlXG5cdF9qUXVlcnkgPSB3aW5kb3cualF1ZXJ5LFxuXG5cdC8vIE1hcCBvdmVyIHRoZSAkIGluIGNhc2Ugb2Ygb3ZlcndyaXRlXG5cdF8kID0gd2luZG93LiQ7XG5cbmpRdWVyeS5ub0NvbmZsaWN0ID0gZnVuY3Rpb24oIGRlZXAgKSB7XG5cdGlmICggd2luZG93LiQgPT09IGpRdWVyeSApIHtcblx0XHR3aW5kb3cuJCA9IF8kO1xuXHR9XG5cblx0aWYgKCBkZWVwICYmIHdpbmRvdy5qUXVlcnkgPT09IGpRdWVyeSApIHtcblx0XHR3aW5kb3cualF1ZXJ5ID0gX2pRdWVyeTtcblx0fVxuXG5cdHJldHVybiBqUXVlcnk7XG59O1xuXG4vLyBFeHBvc2UgalF1ZXJ5IGFuZCAkIGlkZW50aWZpZXJzLCBldmVuIGluIEFNRFxuLy8gKCM3MTAyI2NvbW1lbnQ6MTAsIGh0dHBzOi8vZ2l0aHViLmNvbS9qcXVlcnkvanF1ZXJ5L3B1bGwvNTU3KVxuLy8gYW5kIENvbW1vbkpTIGZvciBicm93c2VyIGVtdWxhdG9ycyAoIzEzNTY2KVxuaWYgKCAhbm9HbG9iYWwgKSB7XG5cdHdpbmRvdy5qUXVlcnkgPSB3aW5kb3cuJCA9IGpRdWVyeTtcbn1cblxucmV0dXJuIGpRdWVyeTtcbn0pKTtcbiIsIndpbmRvdy53aGF0SW5wdXQgPSAoZnVuY3Rpb24oKSB7XG5cbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8qXG4gICAgLS0tLS0tLS0tLS0tLS0tXG4gICAgdmFyaWFibGVzXG4gICAgLS0tLS0tLS0tLS0tLS0tXG4gICovXG5cbiAgLy8gYXJyYXkgb2YgYWN0aXZlbHkgcHJlc3NlZCBrZXlzXG4gIHZhciBhY3RpdmVLZXlzID0gW107XG5cbiAgLy8gY2FjaGUgZG9jdW1lbnQuYm9keVxuICB2YXIgYm9keTtcblxuICAvLyBib29sZWFuOiB0cnVlIGlmIHRvdWNoIGJ1ZmZlciB0aW1lciBpcyBydW5uaW5nXG4gIHZhciBidWZmZXIgPSBmYWxzZTtcblxuICAvLyB0aGUgbGFzdCB1c2VkIGlucHV0IHR5cGVcbiAgdmFyIGN1cnJlbnRJbnB1dCA9IG51bGw7XG5cbiAgLy8gYGlucHV0YCB0eXBlcyB0aGF0IGRvbid0IGFjY2VwdCB0ZXh0XG4gIHZhciBub25UeXBpbmdJbnB1dHMgPSBbXG4gICAgJ2J1dHRvbicsXG4gICAgJ2NoZWNrYm94JyxcbiAgICAnZmlsZScsXG4gICAgJ2ltYWdlJyxcbiAgICAncmFkaW8nLFxuICAgICdyZXNldCcsXG4gICAgJ3N1Ym1pdCdcbiAgXTtcblxuICAvLyBkZXRlY3QgdmVyc2lvbiBvZiBtb3VzZSB3aGVlbCBldmVudCB0byB1c2VcbiAgLy8gdmlhIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0V2ZW50cy93aGVlbFxuICB2YXIgbW91c2VXaGVlbCA9IGRldGVjdFdoZWVsKCk7XG5cbiAgLy8gbGlzdCBvZiBtb2RpZmllciBrZXlzIGNvbW1vbmx5IHVzZWQgd2l0aCB0aGUgbW91c2UgYW5kXG4gIC8vIGNhbiBiZSBzYWZlbHkgaWdub3JlZCB0byBwcmV2ZW50IGZhbHNlIGtleWJvYXJkIGRldGVjdGlvblxuICB2YXIgaWdub3JlTWFwID0gW1xuICAgIDE2LCAvLyBzaGlmdFxuICAgIDE3LCAvLyBjb250cm9sXG4gICAgMTgsIC8vIGFsdFxuICAgIDkxLCAvLyBXaW5kb3dzIGtleSAvIGxlZnQgQXBwbGUgY21kXG4gICAgOTMgIC8vIFdpbmRvd3MgbWVudSAvIHJpZ2h0IEFwcGxlIGNtZFxuICBdO1xuXG4gIC8vIG1hcHBpbmcgb2YgZXZlbnRzIHRvIGlucHV0IHR5cGVzXG4gIHZhciBpbnB1dE1hcCA9IHtcbiAgICAna2V5ZG93bic6ICdrZXlib2FyZCcsXG4gICAgJ2tleXVwJzogJ2tleWJvYXJkJyxcbiAgICAnbW91c2Vkb3duJzogJ21vdXNlJyxcbiAgICAnbW91c2Vtb3ZlJzogJ21vdXNlJyxcbiAgICAnTVNQb2ludGVyRG93bic6ICdwb2ludGVyJyxcbiAgICAnTVNQb2ludGVyTW92ZSc6ICdwb2ludGVyJyxcbiAgICAncG9pbnRlcmRvd24nOiAncG9pbnRlcicsXG4gICAgJ3BvaW50ZXJtb3ZlJzogJ3BvaW50ZXInLFxuICAgICd0b3VjaHN0YXJ0JzogJ3RvdWNoJ1xuICB9O1xuXG4gIC8vIGFkZCBjb3JyZWN0IG1vdXNlIHdoZWVsIGV2ZW50IG1hcHBpbmcgdG8gYGlucHV0TWFwYFxuICBpbnB1dE1hcFtkZXRlY3RXaGVlbCgpXSA9ICdtb3VzZSc7XG5cbiAgLy8gYXJyYXkgb2YgYWxsIHVzZWQgaW5wdXQgdHlwZXNcbiAgdmFyIGlucHV0VHlwZXMgPSBbXTtcblxuICAvLyBtYXBwaW5nIG9mIGtleSBjb2RlcyB0byBhIGNvbW1vbiBuYW1lXG4gIHZhciBrZXlNYXAgPSB7XG4gICAgOTogJ3RhYicsXG4gICAgMTM6ICdlbnRlcicsXG4gICAgMTY6ICdzaGlmdCcsXG4gICAgMjc6ICdlc2MnLFxuICAgIDMyOiAnc3BhY2UnLFxuICAgIDM3OiAnbGVmdCcsXG4gICAgMzg6ICd1cCcsXG4gICAgMzk6ICdyaWdodCcsXG4gICAgNDA6ICdkb3duJ1xuICB9O1xuXG4gIC8vIG1hcCBvZiBJRSAxMCBwb2ludGVyIGV2ZW50c1xuICB2YXIgcG9pbnRlck1hcCA9IHtcbiAgICAyOiAndG91Y2gnLFxuICAgIDM6ICd0b3VjaCcsIC8vIHRyZWF0IHBlbiBsaWtlIHRvdWNoXG4gICAgNDogJ21vdXNlJ1xuICB9O1xuXG4gIC8vIHRvdWNoIGJ1ZmZlciB0aW1lclxuICB2YXIgdGltZXI7XG5cblxuICAvKlxuICAgIC0tLS0tLS0tLS0tLS0tLVxuICAgIGZ1bmN0aW9uc1xuICAgIC0tLS0tLS0tLS0tLS0tLVxuICAqL1xuXG4gIC8vIGFsbG93cyBldmVudHMgdGhhdCBhcmUgYWxzbyB0cmlnZ2VyZWQgdG8gYmUgZmlsdGVyZWQgb3V0IGZvciBgdG91Y2hzdGFydGBcbiAgZnVuY3Rpb24gZXZlbnRCdWZmZXIoKSB7XG4gICAgY2xlYXJUaW1lcigpO1xuICAgIHNldElucHV0KGV2ZW50KTtcblxuICAgIGJ1ZmZlciA9IHRydWU7XG4gICAgdGltZXIgPSB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgIGJ1ZmZlciA9IGZhbHNlO1xuICAgIH0sIDY1MCk7XG4gIH1cblxuICBmdW5jdGlvbiBidWZmZXJlZEV2ZW50KGV2ZW50KSB7XG4gICAgaWYgKCFidWZmZXIpIHNldElucHV0KGV2ZW50KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVuQnVmZmVyZWRFdmVudChldmVudCkge1xuICAgIGNsZWFyVGltZXIoKTtcbiAgICBzZXRJbnB1dChldmVudCk7XG4gIH1cblxuICBmdW5jdGlvbiBjbGVhclRpbWVyKCkge1xuICAgIHdpbmRvdy5jbGVhclRpbWVvdXQodGltZXIpO1xuICB9XG5cbiAgZnVuY3Rpb24gc2V0SW5wdXQoZXZlbnQpIHtcbiAgICB2YXIgZXZlbnRLZXkgPSBrZXkoZXZlbnQpO1xuICAgIHZhciB2YWx1ZSA9IGlucHV0TWFwW2V2ZW50LnR5cGVdO1xuICAgIGlmICh2YWx1ZSA9PT0gJ3BvaW50ZXInKSB2YWx1ZSA9IHBvaW50ZXJUeXBlKGV2ZW50KTtcblxuICAgIC8vIGRvbid0IGRvIGFueXRoaW5nIGlmIHRoZSB2YWx1ZSBtYXRjaGVzIHRoZSBpbnB1dCB0eXBlIGFscmVhZHkgc2V0XG4gICAgaWYgKGN1cnJlbnRJbnB1dCAhPT0gdmFsdWUpIHtcbiAgICAgIHZhciBldmVudFRhcmdldCA9IHRhcmdldChldmVudCk7XG4gICAgICB2YXIgZXZlbnRUYXJnZXROb2RlID0gZXZlbnRUYXJnZXQubm9kZU5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICAgIHZhciBldmVudFRhcmdldFR5cGUgPSAoZXZlbnRUYXJnZXROb2RlID09PSAnaW5wdXQnKSA/IGV2ZW50VGFyZ2V0LmdldEF0dHJpYnV0ZSgndHlwZScpIDogbnVsbDtcblxuICAgICAgaWYgKFxuICAgICAgICAoLy8gb25seSBpZiB0aGUgdXNlciBmbGFnIHRvIGFsbG93IHR5cGluZyBpbiBmb3JtIGZpZWxkcyBpc24ndCBzZXRcbiAgICAgICAgIWJvZHkuaGFzQXR0cmlidXRlKCdkYXRhLXdoYXRpbnB1dC1mb3JtdHlwaW5nJykgJiZcblxuICAgICAgICAvLyBvbmx5IGlmIGN1cnJlbnRJbnB1dCBoYXMgYSB2YWx1ZVxuICAgICAgICBjdXJyZW50SW5wdXQgJiZcblxuICAgICAgICAvLyBvbmx5IGlmIHRoZSBpbnB1dCBpcyBga2V5Ym9hcmRgXG4gICAgICAgIHZhbHVlID09PSAna2V5Ym9hcmQnICYmXG5cbiAgICAgICAgLy8gbm90IGlmIHRoZSBrZXkgaXMgYFRBQmBcbiAgICAgICAga2V5TWFwW2V2ZW50S2V5XSAhPT0gJ3RhYicgJiZcblxuICAgICAgICAvLyBvbmx5IGlmIHRoZSB0YXJnZXQgaXMgYSBmb3JtIGlucHV0IHRoYXQgYWNjZXB0cyB0ZXh0XG4gICAgICAgIChcbiAgICAgICAgICAgZXZlbnRUYXJnZXROb2RlID09PSAndGV4dGFyZWEnIHx8XG4gICAgICAgICAgIGV2ZW50VGFyZ2V0Tm9kZSA9PT0gJ3NlbGVjdCcgfHxcbiAgICAgICAgICAgKGV2ZW50VGFyZ2V0Tm9kZSA9PT0gJ2lucHV0JyAmJiBub25UeXBpbmdJbnB1dHMuaW5kZXhPZihldmVudFRhcmdldFR5cGUpIDwgMClcbiAgICAgICAgKSkgfHwgKFxuICAgICAgICAgIC8vIGlnbm9yZSBtb2RpZmllciBrZXlzXG4gICAgICAgICAgaWdub3JlTWFwLmluZGV4T2YoZXZlbnRLZXkpID4gLTFcbiAgICAgICAgKVxuICAgICAgKSB7XG4gICAgICAgIC8vIGlnbm9yZSBrZXlib2FyZCB0eXBpbmdcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN3aXRjaElucHV0KHZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodmFsdWUgPT09ICdrZXlib2FyZCcpIGxvZ0tleXMoZXZlbnRLZXkpO1xuICB9XG5cbiAgZnVuY3Rpb24gc3dpdGNoSW5wdXQoc3RyaW5nKSB7XG4gICAgY3VycmVudElucHV0ID0gc3RyaW5nO1xuICAgIGJvZHkuc2V0QXR0cmlidXRlKCdkYXRhLXdoYXRpbnB1dCcsIGN1cnJlbnRJbnB1dCk7XG5cbiAgICBpZiAoaW5wdXRUeXBlcy5pbmRleE9mKGN1cnJlbnRJbnB1dCkgPT09IC0xKSBpbnB1dFR5cGVzLnB1c2goY3VycmVudElucHV0KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGtleShldmVudCkge1xuICAgIHJldHVybiAoZXZlbnQua2V5Q29kZSkgPyBldmVudC5rZXlDb2RlIDogZXZlbnQud2hpY2g7XG4gIH1cblxuICBmdW5jdGlvbiB0YXJnZXQoZXZlbnQpIHtcbiAgICByZXR1cm4gZXZlbnQudGFyZ2V0IHx8IGV2ZW50LnNyY0VsZW1lbnQ7XG4gIH1cblxuICBmdW5jdGlvbiBwb2ludGVyVHlwZShldmVudCkge1xuICAgIGlmICh0eXBlb2YgZXZlbnQucG9pbnRlclR5cGUgPT09ICdudW1iZXInKSB7XG4gICAgICByZXR1cm4gcG9pbnRlck1hcFtldmVudC5wb2ludGVyVHlwZV07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAoZXZlbnQucG9pbnRlclR5cGUgPT09ICdwZW4nKSA/ICd0b3VjaCcgOiBldmVudC5wb2ludGVyVHlwZTsgLy8gdHJlYXQgcGVuIGxpa2UgdG91Y2hcbiAgICB9XG4gIH1cblxuICAvLyBrZXlib2FyZCBsb2dnaW5nXG4gIGZ1bmN0aW9uIGxvZ0tleXMoZXZlbnRLZXkpIHtcbiAgICBpZiAoYWN0aXZlS2V5cy5pbmRleE9mKGtleU1hcFtldmVudEtleV0pID09PSAtMSAmJiBrZXlNYXBbZXZlbnRLZXldKSBhY3RpdmVLZXlzLnB1c2goa2V5TWFwW2V2ZW50S2V5XSk7XG4gIH1cblxuICBmdW5jdGlvbiB1bkxvZ0tleXMoZXZlbnQpIHtcbiAgICB2YXIgZXZlbnRLZXkgPSBrZXkoZXZlbnQpO1xuICAgIHZhciBhcnJheVBvcyA9IGFjdGl2ZUtleXMuaW5kZXhPZihrZXlNYXBbZXZlbnRLZXldKTtcblxuICAgIGlmIChhcnJheVBvcyAhPT0gLTEpIGFjdGl2ZUtleXMuc3BsaWNlKGFycmF5UG9zLCAxKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGJpbmRFdmVudHMoKSB7XG4gICAgYm9keSA9IGRvY3VtZW50LmJvZHk7XG5cbiAgICAvLyBwb2ludGVyIGV2ZW50cyAobW91c2UsIHBlbiwgdG91Y2gpXG4gICAgaWYgKHdpbmRvdy5Qb2ludGVyRXZlbnQpIHtcbiAgICAgIGJvZHkuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcmRvd24nLCBidWZmZXJlZEV2ZW50KTtcbiAgICAgIGJvZHkuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcm1vdmUnLCBidWZmZXJlZEV2ZW50KTtcbiAgICB9IGVsc2UgaWYgKHdpbmRvdy5NU1BvaW50ZXJFdmVudCkge1xuICAgICAgYm9keS5hZGRFdmVudExpc3RlbmVyKCdNU1BvaW50ZXJEb3duJywgYnVmZmVyZWRFdmVudCk7XG4gICAgICBib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ01TUG9pbnRlck1vdmUnLCBidWZmZXJlZEV2ZW50KTtcbiAgICB9IGVsc2Uge1xuXG4gICAgICAvLyBtb3VzZSBldmVudHNcbiAgICAgIGJvZHkuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgYnVmZmVyZWRFdmVudCk7XG4gICAgICBib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGJ1ZmZlcmVkRXZlbnQpO1xuXG4gICAgICAvLyB0b3VjaCBldmVudHNcbiAgICAgIGlmICgnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cpIHtcbiAgICAgICAgYm9keS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgZXZlbnRCdWZmZXIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIG1vdXNlIHdoZWVsXG4gICAgYm9keS5hZGRFdmVudExpc3RlbmVyKG1vdXNlV2hlZWwsIGJ1ZmZlcmVkRXZlbnQpO1xuXG4gICAgLy8ga2V5Ym9hcmQgZXZlbnRzXG4gICAgYm9keS5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdW5CdWZmZXJlZEV2ZW50KTtcbiAgICBib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgdW5CdWZmZXJlZEV2ZW50KTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIHVuTG9nS2V5cyk7XG4gIH1cblxuXG4gIC8qXG4gICAgLS0tLS0tLS0tLS0tLS0tXG4gICAgdXRpbGl0aWVzXG4gICAgLS0tLS0tLS0tLS0tLS0tXG4gICovXG5cbiAgLy8gZGV0ZWN0IHZlcnNpb24gb2YgbW91c2Ugd2hlZWwgZXZlbnQgdG8gdXNlXG4gIC8vIHZpYSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9FdmVudHMvd2hlZWxcbiAgZnVuY3Rpb24gZGV0ZWN0V2hlZWwoKSB7XG4gICAgcmV0dXJuIG1vdXNlV2hlZWwgPSAnb253aGVlbCcgaW4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JykgP1xuICAgICAgJ3doZWVsJyA6IC8vIE1vZGVybiBicm93c2VycyBzdXBwb3J0IFwid2hlZWxcIlxuXG4gICAgICBkb2N1bWVudC5vbm1vdXNld2hlZWwgIT09IHVuZGVmaW5lZCA/XG4gICAgICAgICdtb3VzZXdoZWVsJyA6IC8vIFdlYmtpdCBhbmQgSUUgc3VwcG9ydCBhdCBsZWFzdCBcIm1vdXNld2hlZWxcIlxuICAgICAgICAnRE9NTW91c2VTY3JvbGwnOyAvLyBsZXQncyBhc3N1bWUgdGhhdCByZW1haW5pbmcgYnJvd3NlcnMgYXJlIG9sZGVyIEZpcmVmb3hcbiAgfVxuXG5cbiAgLypcbiAgICAtLS0tLS0tLS0tLS0tLS1cbiAgICBpbml0XG5cbiAgICBkb24ndCBzdGFydCBzY3JpcHQgdW5sZXNzIGJyb3dzZXIgY3V0cyB0aGUgbXVzdGFyZCxcbiAgICBhbHNvIHBhc3NlcyBpZiBwb2x5ZmlsbHMgYXJlIHVzZWRcbiAgICAtLS0tLS0tLS0tLS0tLS1cbiAgKi9cblxuICBpZiAoXG4gICAgJ2FkZEV2ZW50TGlzdGVuZXInIGluIHdpbmRvdyAmJlxuICAgIEFycmF5LnByb3RvdHlwZS5pbmRleE9mXG4gICkge1xuXG4gICAgLy8gaWYgdGhlIGRvbSBpcyBhbHJlYWR5IHJlYWR5IGFscmVhZHkgKHNjcmlwdCB3YXMgcGxhY2VkIGF0IGJvdHRvbSBvZiA8Ym9keT4pXG4gICAgaWYgKGRvY3VtZW50LmJvZHkpIHtcbiAgICAgIGJpbmRFdmVudHMoKTtcblxuICAgIC8vIG90aGVyd2lzZSB3YWl0IGZvciB0aGUgZG9tIHRvIGxvYWQgKHNjcmlwdCB3YXMgcGxhY2VkIGluIHRoZSA8aGVhZD4pXG4gICAgfSBlbHNlIHtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBiaW5kRXZlbnRzKTtcbiAgICB9XG4gIH1cblxuXG4gIC8qXG4gICAgLS0tLS0tLS0tLS0tLS0tXG4gICAgYXBpXG4gICAgLS0tLS0tLS0tLS0tLS0tXG4gICovXG5cbiAgcmV0dXJuIHtcblxuICAgIC8vIHJldHVybnMgc3RyaW5nOiB0aGUgY3VycmVudCBpbnB1dCB0eXBlXG4gICAgYXNrOiBmdW5jdGlvbigpIHsgcmV0dXJuIGN1cnJlbnRJbnB1dDsgfSxcblxuICAgIC8vIHJldHVybnMgYXJyYXk6IGN1cnJlbnRseSBwcmVzc2VkIGtleXNcbiAgICBrZXlzOiBmdW5jdGlvbigpIHsgcmV0dXJuIGFjdGl2ZUtleXM7IH0sXG5cbiAgICAvLyByZXR1cm5zIGFycmF5OiBhbGwgdGhlIGRldGVjdGVkIGlucHV0IHR5cGVzXG4gICAgdHlwZXM6IGZ1bmN0aW9uKCkgeyByZXR1cm4gaW5wdXRUeXBlczsgfSxcblxuICAgIC8vIGFjY2VwdHMgc3RyaW5nOiBtYW51YWxseSBzZXQgdGhlIGlucHV0IHR5cGVcbiAgICBzZXQ6IHN3aXRjaElucHV0XG4gIH07XG5cbn0oKSk7XG4iLCIhZnVuY3Rpb24oJCkge1xuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIEZPVU5EQVRJT05fVkVSU0lPTiA9ICc2LjIuMic7XG5cbi8vIEdsb2JhbCBGb3VuZGF0aW9uIG9iamVjdFxuLy8gVGhpcyBpcyBhdHRhY2hlZCB0byB0aGUgd2luZG93LCBvciB1c2VkIGFzIGEgbW9kdWxlIGZvciBBTUQvQnJvd3NlcmlmeVxudmFyIEZvdW5kYXRpb24gPSB7XG4gIHZlcnNpb246IEZPVU5EQVRJT05fVkVSU0lPTixcblxuICAvKipcbiAgICogU3RvcmVzIGluaXRpYWxpemVkIHBsdWdpbnMuXG4gICAqL1xuICBfcGx1Z2luczoge30sXG5cbiAgLyoqXG4gICAqIFN0b3JlcyBnZW5lcmF0ZWQgdW5pcXVlIGlkcyBmb3IgcGx1Z2luIGluc3RhbmNlc1xuICAgKi9cbiAgX3V1aWRzOiBbXSxcblxuICAvKipcbiAgICogUmV0dXJucyBhIGJvb2xlYW4gZm9yIFJUTCBzdXBwb3J0XG4gICAqL1xuICBydGw6IGZ1bmN0aW9uKCl7XG4gICAgcmV0dXJuICQoJ2h0bWwnKS5hdHRyKCdkaXInKSA9PT0gJ3J0bCc7XG4gIH0sXG4gIC8qKlxuICAgKiBEZWZpbmVzIGEgRm91bmRhdGlvbiBwbHVnaW4sIGFkZGluZyBpdCB0byB0aGUgYEZvdW5kYXRpb25gIG5hbWVzcGFjZSBhbmQgdGhlIGxpc3Qgb2YgcGx1Z2lucyB0byBpbml0aWFsaXplIHdoZW4gcmVmbG93aW5nLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGx1Z2luIC0gVGhlIGNvbnN0cnVjdG9yIG9mIHRoZSBwbHVnaW4uXG4gICAqL1xuICBwbHVnaW46IGZ1bmN0aW9uKHBsdWdpbiwgbmFtZSkge1xuICAgIC8vIE9iamVjdCBrZXkgdG8gdXNlIHdoZW4gYWRkaW5nIHRvIGdsb2JhbCBGb3VuZGF0aW9uIG9iamVjdFxuICAgIC8vIEV4YW1wbGVzOiBGb3VuZGF0aW9uLlJldmVhbCwgRm91bmRhdGlvbi5PZmZDYW52YXNcbiAgICB2YXIgY2xhc3NOYW1lID0gKG5hbWUgfHwgZnVuY3Rpb25OYW1lKHBsdWdpbikpO1xuICAgIC8vIE9iamVjdCBrZXkgdG8gdXNlIHdoZW4gc3RvcmluZyB0aGUgcGx1Z2luLCBhbHNvIHVzZWQgdG8gY3JlYXRlIHRoZSBpZGVudGlmeWluZyBkYXRhIGF0dHJpYnV0ZSBmb3IgdGhlIHBsdWdpblxuICAgIC8vIEV4YW1wbGVzOiBkYXRhLXJldmVhbCwgZGF0YS1vZmYtY2FudmFzXG4gICAgdmFyIGF0dHJOYW1lICA9IGh5cGhlbmF0ZShjbGFzc05hbWUpO1xuXG4gICAgLy8gQWRkIHRvIHRoZSBGb3VuZGF0aW9uIG9iamVjdCBhbmQgdGhlIHBsdWdpbnMgbGlzdCAoZm9yIHJlZmxvd2luZylcbiAgICB0aGlzLl9wbHVnaW5zW2F0dHJOYW1lXSA9IHRoaXNbY2xhc3NOYW1lXSA9IHBsdWdpbjtcbiAgfSxcbiAgLyoqXG4gICAqIEBmdW5jdGlvblxuICAgKiBQb3B1bGF0ZXMgdGhlIF91dWlkcyBhcnJheSB3aXRoIHBvaW50ZXJzIHRvIGVhY2ggaW5kaXZpZHVhbCBwbHVnaW4gaW5zdGFuY2UuXG4gICAqIEFkZHMgdGhlIGB6ZlBsdWdpbmAgZGF0YS1hdHRyaWJ1dGUgdG8gcHJvZ3JhbW1hdGljYWxseSBjcmVhdGVkIHBsdWdpbnMgdG8gYWxsb3cgdXNlIG9mICQoc2VsZWN0b3IpLmZvdW5kYXRpb24obWV0aG9kKSBjYWxscy5cbiAgICogQWxzbyBmaXJlcyB0aGUgaW5pdGlhbGl6YXRpb24gZXZlbnQgZm9yIGVhY2ggcGx1Z2luLCBjb25zb2xpZGF0aW5nIHJlcGV0aXRpdmUgY29kZS5cbiAgICogQHBhcmFtIHtPYmplY3R9IHBsdWdpbiAtIGFuIGluc3RhbmNlIG9mIGEgcGx1Z2luLCB1c3VhbGx5IGB0aGlzYCBpbiBjb250ZXh0LlxuICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSAtIHRoZSBuYW1lIG9mIHRoZSBwbHVnaW4sIHBhc3NlZCBhcyBhIGNhbWVsQ2FzZWQgc3RyaW5nLlxuICAgKiBAZmlyZXMgUGx1Z2luI2luaXRcbiAgICovXG4gIHJlZ2lzdGVyUGx1Z2luOiBmdW5jdGlvbihwbHVnaW4sIG5hbWUpe1xuICAgIHZhciBwbHVnaW5OYW1lID0gbmFtZSA/IGh5cGhlbmF0ZShuYW1lKSA6IGZ1bmN0aW9uTmFtZShwbHVnaW4uY29uc3RydWN0b3IpLnRvTG93ZXJDYXNlKCk7XG4gICAgcGx1Z2luLnV1aWQgPSB0aGlzLkdldFlvRGlnaXRzKDYsIHBsdWdpbk5hbWUpO1xuXG4gICAgaWYoIXBsdWdpbi4kZWxlbWVudC5hdHRyKGBkYXRhLSR7cGx1Z2luTmFtZX1gKSl7IHBsdWdpbi4kZWxlbWVudC5hdHRyKGBkYXRhLSR7cGx1Z2luTmFtZX1gLCBwbHVnaW4udXVpZCk7IH1cbiAgICBpZighcGx1Z2luLiRlbGVtZW50LmRhdGEoJ3pmUGx1Z2luJykpeyBwbHVnaW4uJGVsZW1lbnQuZGF0YSgnemZQbHVnaW4nLCBwbHVnaW4pOyB9XG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogRmlyZXMgd2hlbiB0aGUgcGx1Z2luIGhhcyBpbml0aWFsaXplZC5cbiAgICAgICAgICAgKiBAZXZlbnQgUGx1Z2luI2luaXRcbiAgICAgICAgICAgKi9cbiAgICBwbHVnaW4uJGVsZW1lbnQudHJpZ2dlcihgaW5pdC56Zi4ke3BsdWdpbk5hbWV9YCk7XG5cbiAgICB0aGlzLl91dWlkcy5wdXNoKHBsdWdpbi51dWlkKTtcblxuICAgIHJldHVybjtcbiAgfSxcbiAgLyoqXG4gICAqIEBmdW5jdGlvblxuICAgKiBSZW1vdmVzIHRoZSBwbHVnaW5zIHV1aWQgZnJvbSB0aGUgX3V1aWRzIGFycmF5LlxuICAgKiBSZW1vdmVzIHRoZSB6ZlBsdWdpbiBkYXRhIGF0dHJpYnV0ZSwgYXMgd2VsbCBhcyB0aGUgZGF0YS1wbHVnaW4tbmFtZSBhdHRyaWJ1dGUuXG4gICAqIEFsc28gZmlyZXMgdGhlIGRlc3Ryb3llZCBldmVudCBmb3IgdGhlIHBsdWdpbiwgY29uc29saWRhdGluZyByZXBldGl0aXZlIGNvZGUuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwbHVnaW4gLSBhbiBpbnN0YW5jZSBvZiBhIHBsdWdpbiwgdXN1YWxseSBgdGhpc2AgaW4gY29udGV4dC5cbiAgICogQGZpcmVzIFBsdWdpbiNkZXN0cm95ZWRcbiAgICovXG4gIHVucmVnaXN0ZXJQbHVnaW46IGZ1bmN0aW9uKHBsdWdpbil7XG4gICAgdmFyIHBsdWdpbk5hbWUgPSBoeXBoZW5hdGUoZnVuY3Rpb25OYW1lKHBsdWdpbi4kZWxlbWVudC5kYXRhKCd6ZlBsdWdpbicpLmNvbnN0cnVjdG9yKSk7XG5cbiAgICB0aGlzLl91dWlkcy5zcGxpY2UodGhpcy5fdXVpZHMuaW5kZXhPZihwbHVnaW4udXVpZCksIDEpO1xuICAgIHBsdWdpbi4kZWxlbWVudC5yZW1vdmVBdHRyKGBkYXRhLSR7cGx1Z2luTmFtZX1gKS5yZW1vdmVEYXRhKCd6ZlBsdWdpbicpXG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogRmlyZXMgd2hlbiB0aGUgcGx1Z2luIGhhcyBiZWVuIGRlc3Ryb3llZC5cbiAgICAgICAgICAgKiBAZXZlbnQgUGx1Z2luI2Rlc3Ryb3llZFxuICAgICAgICAgICAqL1xuICAgICAgICAgIC50cmlnZ2VyKGBkZXN0cm95ZWQuemYuJHtwbHVnaW5OYW1lfWApO1xuICAgIGZvcih2YXIgcHJvcCBpbiBwbHVnaW4pe1xuICAgICAgcGx1Z2luW3Byb3BdID0gbnVsbDsvL2NsZWFuIHVwIHNjcmlwdCB0byBwcmVwIGZvciBnYXJiYWdlIGNvbGxlY3Rpb24uXG4gICAgfVxuICAgIHJldHVybjtcbiAgfSxcblxuICAvKipcbiAgICogQGZ1bmN0aW9uXG4gICAqIENhdXNlcyBvbmUgb3IgbW9yZSBhY3RpdmUgcGx1Z2lucyB0byByZS1pbml0aWFsaXplLCByZXNldHRpbmcgZXZlbnQgbGlzdGVuZXJzLCByZWNhbGN1bGF0aW5nIHBvc2l0aW9ucywgZXRjLlxuICAgKiBAcGFyYW0ge1N0cmluZ30gcGx1Z2lucyAtIG9wdGlvbmFsIHN0cmluZyBvZiBhbiBpbmRpdmlkdWFsIHBsdWdpbiBrZXksIGF0dGFpbmVkIGJ5IGNhbGxpbmcgYCQoZWxlbWVudCkuZGF0YSgncGx1Z2luTmFtZScpYCwgb3Igc3RyaW5nIG9mIGEgcGx1Z2luIGNsYXNzIGkuZS4gYCdkcm9wZG93bidgXG4gICAqIEBkZWZhdWx0IElmIG5vIGFyZ3VtZW50IGlzIHBhc3NlZCwgcmVmbG93IGFsbCBjdXJyZW50bHkgYWN0aXZlIHBsdWdpbnMuXG4gICAqL1xuICAgcmVJbml0OiBmdW5jdGlvbihwbHVnaW5zKXtcbiAgICAgdmFyIGlzSlEgPSBwbHVnaW5zIGluc3RhbmNlb2YgJDtcbiAgICAgdHJ5e1xuICAgICAgIGlmKGlzSlEpe1xuICAgICAgICAgcGx1Z2lucy5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICQodGhpcykuZGF0YSgnemZQbHVnaW4nKS5faW5pdCgpO1xuICAgICAgICAgfSk7XG4gICAgICAgfWVsc2V7XG4gICAgICAgICB2YXIgdHlwZSA9IHR5cGVvZiBwbHVnaW5zLFxuICAgICAgICAgX3RoaXMgPSB0aGlzLFxuICAgICAgICAgZm5zID0ge1xuICAgICAgICAgICAnb2JqZWN0JzogZnVuY3Rpb24ocGxncyl7XG4gICAgICAgICAgICAgcGxncy5mb3JFYWNoKGZ1bmN0aW9uKHApe1xuICAgICAgICAgICAgICAgcCA9IGh5cGhlbmF0ZShwKTtcbiAgICAgICAgICAgICAgICQoJ1tkYXRhLScrIHAgKyddJykuZm91bmRhdGlvbignX2luaXQnKTtcbiAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgfSxcbiAgICAgICAgICAgJ3N0cmluZyc6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgcGx1Z2lucyA9IGh5cGhlbmF0ZShwbHVnaW5zKTtcbiAgICAgICAgICAgICAkKCdbZGF0YS0nKyBwbHVnaW5zICsnXScpLmZvdW5kYXRpb24oJ19pbml0Jyk7XG4gICAgICAgICAgIH0sXG4gICAgICAgICAgICd1bmRlZmluZWQnOiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgIHRoaXNbJ29iamVjdCddKE9iamVjdC5rZXlzKF90aGlzLl9wbHVnaW5zKSk7XG4gICAgICAgICAgIH1cbiAgICAgICAgIH07XG4gICAgICAgICBmbnNbdHlwZV0ocGx1Z2lucyk7XG4gICAgICAgfVxuICAgICB9Y2F0Y2goZXJyKXtcbiAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgIH1maW5hbGx5e1xuICAgICAgIHJldHVybiBwbHVnaW5zO1xuICAgICB9XG4gICB9LFxuXG4gIC8qKlxuICAgKiByZXR1cm5zIGEgcmFuZG9tIGJhc2UtMzYgdWlkIHdpdGggbmFtZXNwYWNpbmdcbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBsZW5ndGggLSBudW1iZXIgb2YgcmFuZG9tIGJhc2UtMzYgZGlnaXRzIGRlc2lyZWQuIEluY3JlYXNlIGZvciBtb3JlIHJhbmRvbSBzdHJpbmdzLlxuICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlIC0gbmFtZSBvZiBwbHVnaW4gdG8gYmUgaW5jb3Jwb3JhdGVkIGluIHVpZCwgb3B0aW9uYWwuXG4gICAqIEBkZWZhdWx0IHtTdHJpbmd9ICcnIC0gaWYgbm8gcGx1Z2luIG5hbWUgaXMgcHJvdmlkZWQsIG5vdGhpbmcgaXMgYXBwZW5kZWQgdG8gdGhlIHVpZC5cbiAgICogQHJldHVybnMge1N0cmluZ30gLSB1bmlxdWUgaWRcbiAgICovXG4gIEdldFlvRGlnaXRzOiBmdW5jdGlvbihsZW5ndGgsIG5hbWVzcGFjZSl7XG4gICAgbGVuZ3RoID0gbGVuZ3RoIHx8IDY7XG4gICAgcmV0dXJuIE1hdGgucm91bmQoKE1hdGgucG93KDM2LCBsZW5ndGggKyAxKSAtIE1hdGgucmFuZG9tKCkgKiBNYXRoLnBvdygzNiwgbGVuZ3RoKSkpLnRvU3RyaW5nKDM2KS5zbGljZSgxKSArIChuYW1lc3BhY2UgPyBgLSR7bmFtZXNwYWNlfWAgOiAnJyk7XG4gIH0sXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIHBsdWdpbnMgb24gYW55IGVsZW1lbnRzIHdpdGhpbiBgZWxlbWAgKGFuZCBgZWxlbWAgaXRzZWxmKSB0aGF0IGFyZW4ndCBhbHJlYWR5IGluaXRpYWxpemVkLlxuICAgKiBAcGFyYW0ge09iamVjdH0gZWxlbSAtIGpRdWVyeSBvYmplY3QgY29udGFpbmluZyB0aGUgZWxlbWVudCB0byBjaGVjayBpbnNpZGUuIEFsc28gY2hlY2tzIHRoZSBlbGVtZW50IGl0c2VsZiwgdW5sZXNzIGl0J3MgdGhlIGBkb2N1bWVudGAgb2JqZWN0LlxuICAgKiBAcGFyYW0ge1N0cmluZ3xBcnJheX0gcGx1Z2lucyAtIEEgbGlzdCBvZiBwbHVnaW5zIHRvIGluaXRpYWxpemUuIExlYXZlIHRoaXMgb3V0IHRvIGluaXRpYWxpemUgZXZlcnl0aGluZy5cbiAgICovXG4gIHJlZmxvdzogZnVuY3Rpb24oZWxlbSwgcGx1Z2lucykge1xuXG4gICAgLy8gSWYgcGx1Z2lucyBpcyB1bmRlZmluZWQsIGp1c3QgZ3JhYiBldmVyeXRoaW5nXG4gICAgaWYgKHR5cGVvZiBwbHVnaW5zID09PSAndW5kZWZpbmVkJykge1xuICAgICAgcGx1Z2lucyA9IE9iamVjdC5rZXlzKHRoaXMuX3BsdWdpbnMpO1xuICAgIH1cbiAgICAvLyBJZiBwbHVnaW5zIGlzIGEgc3RyaW5nLCBjb252ZXJ0IGl0IHRvIGFuIGFycmF5IHdpdGggb25lIGl0ZW1cbiAgICBlbHNlIGlmICh0eXBlb2YgcGx1Z2lucyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHBsdWdpbnMgPSBbcGx1Z2luc107XG4gICAgfVxuXG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIC8vIEl0ZXJhdGUgdGhyb3VnaCBlYWNoIHBsdWdpblxuICAgICQuZWFjaChwbHVnaW5zLCBmdW5jdGlvbihpLCBuYW1lKSB7XG4gICAgICAvLyBHZXQgdGhlIGN1cnJlbnQgcGx1Z2luXG4gICAgICB2YXIgcGx1Z2luID0gX3RoaXMuX3BsdWdpbnNbbmFtZV07XG5cbiAgICAgIC8vIExvY2FsaXplIHRoZSBzZWFyY2ggdG8gYWxsIGVsZW1lbnRzIGluc2lkZSBlbGVtLCBhcyB3ZWxsIGFzIGVsZW0gaXRzZWxmLCB1bmxlc3MgZWxlbSA9PT0gZG9jdW1lbnRcbiAgICAgIHZhciAkZWxlbSA9ICQoZWxlbSkuZmluZCgnW2RhdGEtJytuYW1lKyddJykuYWRkQmFjaygnW2RhdGEtJytuYW1lKyddJyk7XG5cbiAgICAgIC8vIEZvciBlYWNoIHBsdWdpbiBmb3VuZCwgaW5pdGlhbGl6ZSBpdFxuICAgICAgJGVsZW0uZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyICRlbCA9ICQodGhpcyksXG4gICAgICAgICAgICBvcHRzID0ge307XG4gICAgICAgIC8vIERvbid0IGRvdWJsZS1kaXAgb24gcGx1Z2luc1xuICAgICAgICBpZiAoJGVsLmRhdGEoJ3pmUGx1Z2luJykpIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oXCJUcmllZCB0byBpbml0aWFsaXplIFwiK25hbWUrXCIgb24gYW4gZWxlbWVudCB0aGF0IGFscmVhZHkgaGFzIGEgRm91bmRhdGlvbiBwbHVnaW4uXCIpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCRlbC5hdHRyKCdkYXRhLW9wdGlvbnMnKSl7XG4gICAgICAgICAgdmFyIHRoaW5nID0gJGVsLmF0dHIoJ2RhdGEtb3B0aW9ucycpLnNwbGl0KCc7JykuZm9yRWFjaChmdW5jdGlvbihlLCBpKXtcbiAgICAgICAgICAgIHZhciBvcHQgPSBlLnNwbGl0KCc6JykubWFwKGZ1bmN0aW9uKGVsKXsgcmV0dXJuIGVsLnRyaW0oKTsgfSk7XG4gICAgICAgICAgICBpZihvcHRbMF0pIG9wdHNbb3B0WzBdXSA9IHBhcnNlVmFsdWUob3B0WzFdKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB0cnl7XG4gICAgICAgICAgJGVsLmRhdGEoJ3pmUGx1Z2luJywgbmV3IHBsdWdpbigkKHRoaXMpLCBvcHRzKSk7XG4gICAgICAgIH1jYXRjaChlcil7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihlcik7XG4gICAgICAgIH1maW5hbGx5e1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG4gIGdldEZuTmFtZTogZnVuY3Rpb25OYW1lLFxuICB0cmFuc2l0aW9uZW5kOiBmdW5jdGlvbigkZWxlbSl7XG4gICAgdmFyIHRyYW5zaXRpb25zID0ge1xuICAgICAgJ3RyYW5zaXRpb24nOiAndHJhbnNpdGlvbmVuZCcsXG4gICAgICAnV2Via2l0VHJhbnNpdGlvbic6ICd3ZWJraXRUcmFuc2l0aW9uRW5kJyxcbiAgICAgICdNb3pUcmFuc2l0aW9uJzogJ3RyYW5zaXRpb25lbmQnLFxuICAgICAgJ09UcmFuc2l0aW9uJzogJ290cmFuc2l0aW9uZW5kJ1xuICAgIH07XG4gICAgdmFyIGVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcbiAgICAgICAgZW5kO1xuXG4gICAgZm9yICh2YXIgdCBpbiB0cmFuc2l0aW9ucyl7XG4gICAgICBpZiAodHlwZW9mIGVsZW0uc3R5bGVbdF0gIT09ICd1bmRlZmluZWQnKXtcbiAgICAgICAgZW5kID0gdHJhbnNpdGlvbnNbdF07XG4gICAgICB9XG4gICAgfVxuICAgIGlmKGVuZCl7XG4gICAgICByZXR1cm4gZW5kO1xuICAgIH1lbHNle1xuICAgICAgZW5kID0gc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAkZWxlbS50cmlnZ2VySGFuZGxlcigndHJhbnNpdGlvbmVuZCcsIFskZWxlbV0pO1xuICAgICAgfSwgMSk7XG4gICAgICByZXR1cm4gJ3RyYW5zaXRpb25lbmQnO1xuICAgIH1cbiAgfVxufTtcblxuRm91bmRhdGlvbi51dGlsID0ge1xuICAvKipcbiAgICogRnVuY3Rpb24gZm9yIGFwcGx5aW5nIGEgZGVib3VuY2UgZWZmZWN0IHRvIGEgZnVuY3Rpb24gY2FsbC5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgLSBGdW5jdGlvbiB0byBiZSBjYWxsZWQgYXQgZW5kIG9mIHRpbWVvdXQuXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBkZWxheSAtIFRpbWUgaW4gbXMgdG8gZGVsYXkgdGhlIGNhbGwgb2YgYGZ1bmNgLlxuICAgKiBAcmV0dXJucyBmdW5jdGlvblxuICAgKi9cbiAgdGhyb3R0bGU6IGZ1bmN0aW9uIChmdW5jLCBkZWxheSkge1xuICAgIHZhciB0aW1lciA9IG51bGw7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGNvbnRleHQgPSB0aGlzLCBhcmdzID0gYXJndW1lbnRzO1xuXG4gICAgICBpZiAodGltZXIgPT09IG51bGwpIHtcbiAgICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgICAgICAgIHRpbWVyID0gbnVsbDtcbiAgICAgICAgfSwgZGVsYXkpO1xuICAgICAgfVxuICAgIH07XG4gIH1cbn07XG5cbi8vIFRPRE86IGNvbnNpZGVyIG5vdCBtYWtpbmcgdGhpcyBhIGpRdWVyeSBmdW5jdGlvblxuLy8gVE9ETzogbmVlZCB3YXkgdG8gcmVmbG93IHZzLiByZS1pbml0aWFsaXplXG4vKipcbiAqIFRoZSBGb3VuZGF0aW9uIGpRdWVyeSBtZXRob2QuXG4gKiBAcGFyYW0ge1N0cmluZ3xBcnJheX0gbWV0aG9kIC0gQW4gYWN0aW9uIHRvIHBlcmZvcm0gb24gdGhlIGN1cnJlbnQgalF1ZXJ5IG9iamVjdC5cbiAqL1xudmFyIGZvdW5kYXRpb24gPSBmdW5jdGlvbihtZXRob2QpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgbWV0aG9kLFxuICAgICAgJG1ldGEgPSAkKCdtZXRhLmZvdW5kYXRpb24tbXEnKSxcbiAgICAgICRub0pTID0gJCgnLm5vLWpzJyk7XG5cbiAgaWYoISRtZXRhLmxlbmd0aCl7XG4gICAgJCgnPG1ldGEgY2xhc3M9XCJmb3VuZGF0aW9uLW1xXCI+JykuYXBwZW5kVG8oZG9jdW1lbnQuaGVhZCk7XG4gIH1cbiAgaWYoJG5vSlMubGVuZ3RoKXtcbiAgICAkbm9KUy5yZW1vdmVDbGFzcygnbm8tanMnKTtcbiAgfVxuXG4gIGlmKHR5cGUgPT09ICd1bmRlZmluZWQnKXsvL25lZWRzIHRvIGluaXRpYWxpemUgdGhlIEZvdW5kYXRpb24gb2JqZWN0LCBvciBhbiBpbmRpdmlkdWFsIHBsdWdpbi5cbiAgICBGb3VuZGF0aW9uLk1lZGlhUXVlcnkuX2luaXQoKTtcbiAgICBGb3VuZGF0aW9uLnJlZmxvdyh0aGlzKTtcbiAgfWVsc2UgaWYodHlwZSA9PT0gJ3N0cmluZycpey8vYW4gaW5kaXZpZHVhbCBtZXRob2QgdG8gaW52b2tlIG9uIGEgcGx1Z2luIG9yIGdyb3VwIG9mIHBsdWdpbnNcbiAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7Ly9jb2xsZWN0IGFsbCB0aGUgYXJndW1lbnRzLCBpZiBuZWNlc3NhcnlcbiAgICB2YXIgcGx1Z0NsYXNzID0gdGhpcy5kYXRhKCd6ZlBsdWdpbicpOy8vZGV0ZXJtaW5lIHRoZSBjbGFzcyBvZiBwbHVnaW5cblxuICAgIGlmKHBsdWdDbGFzcyAhPT0gdW5kZWZpbmVkICYmIHBsdWdDbGFzc1ttZXRob2RdICE9PSB1bmRlZmluZWQpey8vbWFrZSBzdXJlIGJvdGggdGhlIGNsYXNzIGFuZCBtZXRob2QgZXhpc3RcbiAgICAgIGlmKHRoaXMubGVuZ3RoID09PSAxKXsvL2lmIHRoZXJlJ3Mgb25seSBvbmUsIGNhbGwgaXQgZGlyZWN0bHkuXG4gICAgICAgICAgcGx1Z0NsYXNzW21ldGhvZF0uYXBwbHkocGx1Z0NsYXNzLCBhcmdzKTtcbiAgICAgIH1lbHNle1xuICAgICAgICB0aGlzLmVhY2goZnVuY3Rpb24oaSwgZWwpey8vb3RoZXJ3aXNlIGxvb3AgdGhyb3VnaCB0aGUgalF1ZXJ5IGNvbGxlY3Rpb24gYW5kIGludm9rZSB0aGUgbWV0aG9kIG9uIGVhY2hcbiAgICAgICAgICBwbHVnQ2xhc3NbbWV0aG9kXS5hcHBseSgkKGVsKS5kYXRhKCd6ZlBsdWdpbicpLCBhcmdzKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfWVsc2V7Ly9lcnJvciBmb3Igbm8gY2xhc3Mgb3Igbm8gbWV0aG9kXG4gICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJXZSdyZSBzb3JyeSwgJ1wiICsgbWV0aG9kICsgXCInIGlzIG5vdCBhbiBhdmFpbGFibGUgbWV0aG9kIGZvciBcIiArIChwbHVnQ2xhc3MgPyBmdW5jdGlvbk5hbWUocGx1Z0NsYXNzKSA6ICd0aGlzIGVsZW1lbnQnKSArICcuJyk7XG4gICAgfVxuICB9ZWxzZXsvL2Vycm9yIGZvciBpbnZhbGlkIGFyZ3VtZW50IHR5cGVcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBXZSdyZSBzb3JyeSwgJHt0eXBlfSBpcyBub3QgYSB2YWxpZCBwYXJhbWV0ZXIuIFlvdSBtdXN0IHVzZSBhIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIG1ldGhvZCB5b3Ugd2lzaCB0byBpbnZva2UuYCk7XG4gIH1cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG53aW5kb3cuRm91bmRhdGlvbiA9IEZvdW5kYXRpb247XG4kLmZuLmZvdW5kYXRpb24gPSBmb3VuZGF0aW9uO1xuXG4vLyBQb2x5ZmlsbCBmb3IgcmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4oZnVuY3Rpb24oKSB7XG4gIGlmICghRGF0ZS5ub3cgfHwgIXdpbmRvdy5EYXRlLm5vdylcbiAgICB3aW5kb3cuRGF0ZS5ub3cgPSBEYXRlLm5vdyA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gbmV3IERhdGUoKS5nZXRUaW1lKCk7IH07XG5cbiAgdmFyIHZlbmRvcnMgPSBbJ3dlYmtpdCcsICdtb3onXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB2ZW5kb3JzLmxlbmd0aCAmJiAhd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZTsgKytpKSB7XG4gICAgICB2YXIgdnAgPSB2ZW5kb3JzW2ldO1xuICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSA9IHdpbmRvd1t2cCsnUmVxdWVzdEFuaW1hdGlvbkZyYW1lJ107XG4gICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUgPSAod2luZG93W3ZwKydDYW5jZWxBbmltYXRpb25GcmFtZSddXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8fCB3aW5kb3dbdnArJ0NhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZSddKTtcbiAgfVxuICBpZiAoL2lQKGFkfGhvbmV8b2QpLipPUyA2Ly50ZXN0KHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50KVxuICAgIHx8ICF3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8ICF3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUpIHtcbiAgICB2YXIgbGFzdFRpbWUgPSAwO1xuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAgICB2YXIgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgdmFyIG5leHRUaW1lID0gTWF0aC5tYXgobGFzdFRpbWUgKyAxNiwgbm93KTtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7IGNhbGxiYWNrKGxhc3RUaW1lID0gbmV4dFRpbWUpOyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0VGltZSAtIG5vdyk7XG4gICAgfTtcbiAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUgPSBjbGVhclRpbWVvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIFBvbHlmaWxsIGZvciBwZXJmb3JtYW5jZS5ub3csIHJlcXVpcmVkIGJ5IHJBRlxuICAgKi9cbiAgaWYoIXdpbmRvdy5wZXJmb3JtYW5jZSB8fCAhd2luZG93LnBlcmZvcm1hbmNlLm5vdyl7XG4gICAgd2luZG93LnBlcmZvcm1hbmNlID0ge1xuICAgICAgc3RhcnQ6IERhdGUubm93KCksXG4gICAgICBub3c6IGZ1bmN0aW9uKCl7IHJldHVybiBEYXRlLm5vdygpIC0gdGhpcy5zdGFydDsgfVxuICAgIH07XG4gIH1cbn0pKCk7XG5pZiAoIUZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kKSB7XG4gIEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kID0gZnVuY3Rpb24ob1RoaXMpIHtcbiAgICBpZiAodHlwZW9mIHRoaXMgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIC8vIGNsb3Nlc3QgdGhpbmcgcG9zc2libGUgdG8gdGhlIEVDTUFTY3JpcHQgNVxuICAgICAgLy8gaW50ZXJuYWwgSXNDYWxsYWJsZSBmdW5jdGlvblxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQgLSB3aGF0IGlzIHRyeWluZyB0byBiZSBib3VuZCBpcyBub3QgY2FsbGFibGUnKTtcbiAgICB9XG5cbiAgICB2YXIgYUFyZ3MgICA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSksXG4gICAgICAgIGZUb0JpbmQgPSB0aGlzLFxuICAgICAgICBmTk9QICAgID0gZnVuY3Rpb24oKSB7fSxcbiAgICAgICAgZkJvdW5kICA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBmVG9CaW5kLmFwcGx5KHRoaXMgaW5zdGFuY2VvZiBmTk9QXG4gICAgICAgICAgICAgICAgID8gdGhpc1xuICAgICAgICAgICAgICAgICA6IG9UaGlzLFxuICAgICAgICAgICAgICAgICBhQXJncy5jb25jYXQoQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKSkpO1xuICAgICAgICB9O1xuXG4gICAgaWYgKHRoaXMucHJvdG90eXBlKSB7XG4gICAgICAvLyBuYXRpdmUgZnVuY3Rpb25zIGRvbid0IGhhdmUgYSBwcm90b3R5cGVcbiAgICAgIGZOT1AucHJvdG90eXBlID0gdGhpcy5wcm90b3R5cGU7XG4gICAgfVxuICAgIGZCb3VuZC5wcm90b3R5cGUgPSBuZXcgZk5PUCgpO1xuXG4gICAgcmV0dXJuIGZCb3VuZDtcbiAgfTtcbn1cbi8vIFBvbHlmaWxsIHRvIGdldCB0aGUgbmFtZSBvZiBhIGZ1bmN0aW9uIGluIElFOVxuZnVuY3Rpb24gZnVuY3Rpb25OYW1lKGZuKSB7XG4gIGlmIChGdW5jdGlvbi5wcm90b3R5cGUubmFtZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdmFyIGZ1bmNOYW1lUmVnZXggPSAvZnVuY3Rpb25cXHMoW14oXXsxLH0pXFwoLztcbiAgICB2YXIgcmVzdWx0cyA9IChmdW5jTmFtZVJlZ2V4KS5leGVjKChmbikudG9TdHJpbmcoKSk7XG4gICAgcmV0dXJuIChyZXN1bHRzICYmIHJlc3VsdHMubGVuZ3RoID4gMSkgPyByZXN1bHRzWzFdLnRyaW0oKSA6IFwiXCI7XG4gIH1cbiAgZWxzZSBpZiAoZm4ucHJvdG90eXBlID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gZm4uY29uc3RydWN0b3IubmFtZTtcbiAgfVxuICBlbHNlIHtcbiAgICByZXR1cm4gZm4ucHJvdG90eXBlLmNvbnN0cnVjdG9yLm5hbWU7XG4gIH1cbn1cbmZ1bmN0aW9uIHBhcnNlVmFsdWUoc3RyKXtcbiAgaWYoL3RydWUvLnRlc3Qoc3RyKSkgcmV0dXJuIHRydWU7XG4gIGVsc2UgaWYoL2ZhbHNlLy50ZXN0KHN0cikpIHJldHVybiBmYWxzZTtcbiAgZWxzZSBpZighaXNOYU4oc3RyICogMSkpIHJldHVybiBwYXJzZUZsb2F0KHN0cik7XG4gIHJldHVybiBzdHI7XG59XG4vLyBDb252ZXJ0IFBhc2NhbENhc2UgdG8ga2ViYWItY2FzZVxuLy8gVGhhbmsgeW91OiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS84OTU1NTgwXG5mdW5jdGlvbiBoeXBoZW5hdGUoc3RyKSB7XG4gIHJldHVybiBzdHIucmVwbGFjZSgvKFthLXpdKShbQS1aXSkvZywgJyQxLSQyJykudG9Mb3dlckNhc2UoKTtcbn1cblxufShqUXVlcnkpO1xuIiwiLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEFQUC5KU1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuLy9cbi8vIEluaXRpYWxpemUgRm91bmRhdGlvblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuJChkb2N1bWVudCkuZm91bmRhdGlvbigpO1xuXG4vL1xuLy8gQ3VzdG9tIEpTXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
