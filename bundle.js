/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),
/* 2 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 3 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "body {\n  background: #F9E784;\n  color: #511C29;\n  display: flex;\n  flex-direction: column;\n  height: 100vh;\n  margin: 0px;\n  overflow: hidden;\n  width: 100vw;\n}\n\nheader {\n  border: 1px solid;\n  font-size: 60px;\n  height: 10%;\n  width: 100%;\n\n}\n\nmain {\n  display: flex;\n  background:#511C29;\n  height: 90%;\n  width: 100%;\n}\n\np {\n  align-items: flex-start;\n  justify-content: flex-start;\n  text-align:top;\n  font-size: 25px;\n}\n\n.nav-container {\n  align-items: center;\n  color:#F9E784;\n  display:flex;\n  flex-direction: column;\n  height: 60%;\n  justify-content: space-evenly;\n  width: 15%;\n}\n\n.nav-displays {\n  height: 6%;\n  width: 80%;\n}\n\n.nav-search {\n  align-items: center;\n  display: flex;\n  flex-direction: column;\n  height: 70%;\n  justify-content: space-around;\n  width: 100%;\n}\n\n.content-container {\n  background: #F9E784;\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  width: 85%;\n}\n\n.user-prompts-container {\n  border: 1px solid;\n  display: flex;\n  height: 8%;\n  justify-content: space-around;\n  width:100%;\n}\n\n.user-text-prompts {\n  align-items: center;\n  display:flex;\n  height: 100%;\n  justify-content: center;\n  width: 50%;\n}\n\n.login-container,.logout-container {\n  align-items: center;\n  display:flex;\n  height: 100%;\n  justify-content: center;\n  width: 35%;\n}\n\n.rooms-prompts-container{\n  align-items: center;\n  display:flex;\n  font-size: 25px;\n  height: 5%;\n  justify-content: center;\n  width:100%;\n}\n\n.room-viewing-container {\n  align-items: center;\n  display: flex;\n  flex-wrap:wrap;\n  font-size:30px;\n  height: 77%;\n  justify-content:space-around;\n  overflow-y: scroll;\n  width: 100%;\n}\n\n.room-card {\n  background: blanchedalmond;\n  box-shadow: 0px 8px 10px 0px rgba(0, 0, 0, 0.3);\n  display: flex;\n  flex-direction: column;\n  font-size: 17px;\n  height: 50%;\n  margin: 20px;\n  width: 25%;\n}\n\n.room-details {\n  height:80%;\n  padding:10px;\n  width:100%;\n}\n\n.room-image {\n  height: 70%;\n  width: 92%;\n}\n\n.room-card-buttons {\n  display:flex;\n  height:10%;\n  justify-content: space-around;\n  width: 100%;\n}\n\n.manager-container {\n  align-items: center;\n  display: flex;\n  height: 10%;\n  justify-content: space-around;\n  width: 100%;\n}\n\n.daily-info {\n  height: 60%;\n  width: 30%;\n}\n\n.manager-user-view {\n  align-items: center;\n  display: flex;\n  height: 60%;\n  width: 30%;\n}\n\n#availabilitySearch {\n  width: 85%;\n}\n\ninput, button, select {\n  border: 1px solid black;\n  border-radius: 5px;\n  transition: transform 0.3s;\n}\n\ninput:hover, button:hover, select:hover {\n  border: 1px solid black;\n  border-radius: 5px;\n  transform: scale(1.05);\n  cursor:pointer;\n}\n\n.hidden {\n  visibility:hidden\n}\n", "",{"version":3,"sources":["webpack://./src/css/styles.css"],"names":[],"mappings":"AAAA;EACE,mBAAmB;EACnB,cAAc;EACd,aAAa;EACb,sBAAsB;EACtB,aAAa;EACb,WAAW;EACX,gBAAgB;EAChB,YAAY;AACd;;AAEA;EACE,iBAAiB;EACjB,eAAe;EACf,WAAW;EACX,WAAW;;AAEb;;AAEA;EACE,aAAa;EACb,kBAAkB;EAClB,WAAW;EACX,WAAW;AACb;;AAEA;EACE,uBAAuB;EACvB,2BAA2B;EAC3B,cAAc;EACd,eAAe;AACjB;;AAEA;EACE,mBAAmB;EACnB,aAAa;EACb,YAAY;EACZ,sBAAsB;EACtB,WAAW;EACX,6BAA6B;EAC7B,UAAU;AACZ;;AAEA;EACE,UAAU;EACV,UAAU;AACZ;;AAEA;EACE,mBAAmB;EACnB,aAAa;EACb,sBAAsB;EACtB,WAAW;EACX,6BAA6B;EAC7B,WAAW;AACb;;AAEA;EACE,mBAAmB;EACnB,aAAa;EACb,sBAAsB;EACtB,YAAY;EACZ,UAAU;AACZ;;AAEA;EACE,iBAAiB;EACjB,aAAa;EACb,UAAU;EACV,6BAA6B;EAC7B,UAAU;AACZ;;AAEA;EACE,mBAAmB;EACnB,YAAY;EACZ,YAAY;EACZ,uBAAuB;EACvB,UAAU;AACZ;;AAEA;EACE,mBAAmB;EACnB,YAAY;EACZ,YAAY;EACZ,uBAAuB;EACvB,UAAU;AACZ;;AAEA;EACE,mBAAmB;EACnB,YAAY;EACZ,eAAe;EACf,UAAU;EACV,uBAAuB;EACvB,UAAU;AACZ;;AAEA;EACE,mBAAmB;EACnB,aAAa;EACb,cAAc;EACd,cAAc;EACd,WAAW;EACX,4BAA4B;EAC5B,kBAAkB;EAClB,WAAW;AACb;;AAEA;EACE,0BAA0B;EAC1B,+CAA+C;EAC/C,aAAa;EACb,sBAAsB;EACtB,eAAe;EACf,WAAW;EACX,YAAY;EACZ,UAAU;AACZ;;AAEA;EACE,UAAU;EACV,YAAY;EACZ,UAAU;AACZ;;AAEA;EACE,WAAW;EACX,UAAU;AACZ;;AAEA;EACE,YAAY;EACZ,UAAU;EACV,6BAA6B;EAC7B,WAAW;AACb;;AAEA;EACE,mBAAmB;EACnB,aAAa;EACb,WAAW;EACX,6BAA6B;EAC7B,WAAW;AACb;;AAEA;EACE,WAAW;EACX,UAAU;AACZ;;AAEA;EACE,mBAAmB;EACnB,aAAa;EACb,WAAW;EACX,UAAU;AACZ;;AAEA;EACE,UAAU;AACZ;;AAEA;EACE,uBAAuB;EACvB,kBAAkB;EAClB,0BAA0B;AAC5B;;AAEA;EACE,uBAAuB;EACvB,kBAAkB;EAClB,sBAAsB;EACtB,cAAc;AAChB;;AAEA;EACE;AACF","sourcesContent":["body {\n  background: #F9E784;\n  color: #511C29;\n  display: flex;\n  flex-direction: column;\n  height: 100vh;\n  margin: 0px;\n  overflow: hidden;\n  width: 100vw;\n}\n\nheader {\n  border: 1px solid;\n  font-size: 60px;\n  height: 10%;\n  width: 100%;\n\n}\n\nmain {\n  display: flex;\n  background:#511C29;\n  height: 90%;\n  width: 100%;\n}\n\np {\n  align-items: flex-start;\n  justify-content: flex-start;\n  text-align:top;\n  font-size: 25px;\n}\n\n.nav-container {\n  align-items: center;\n  color:#F9E784;\n  display:flex;\n  flex-direction: column;\n  height: 60%;\n  justify-content: space-evenly;\n  width: 15%;\n}\n\n.nav-displays {\n  height: 6%;\n  width: 80%;\n}\n\n.nav-search {\n  align-items: center;\n  display: flex;\n  flex-direction: column;\n  height: 70%;\n  justify-content: space-around;\n  width: 100%;\n}\n\n.content-container {\n  background: #F9E784;\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  width: 85%;\n}\n\n.user-prompts-container {\n  border: 1px solid;\n  display: flex;\n  height: 8%;\n  justify-content: space-around;\n  width:100%;\n}\n\n.user-text-prompts {\n  align-items: center;\n  display:flex;\n  height: 100%;\n  justify-content: center;\n  width: 50%;\n}\n\n.login-container,.logout-container {\n  align-items: center;\n  display:flex;\n  height: 100%;\n  justify-content: center;\n  width: 35%;\n}\n\n.rooms-prompts-container{\n  align-items: center;\n  display:flex;\n  font-size: 25px;\n  height: 5%;\n  justify-content: center;\n  width:100%;\n}\n\n.room-viewing-container {\n  align-items: center;\n  display: flex;\n  flex-wrap:wrap;\n  font-size:30px;\n  height: 77%;\n  justify-content:space-around;\n  overflow-y: scroll;\n  width: 100%;\n}\n\n.room-card {\n  background: blanchedalmond;\n  box-shadow: 0px 8px 10px 0px rgba(0, 0, 0, 0.3);\n  display: flex;\n  flex-direction: column;\n  font-size: 17px;\n  height: 50%;\n  margin: 20px;\n  width: 25%;\n}\n\n.room-details {\n  height:80%;\n  padding:10px;\n  width:100%;\n}\n\n.room-image {\n  height: 70%;\n  width: 92%;\n}\n\n.room-card-buttons {\n  display:flex;\n  height:10%;\n  justify-content: space-around;\n  width: 100%;\n}\n\n.manager-container {\n  align-items: center;\n  display: flex;\n  height: 10%;\n  justify-content: space-around;\n  width: 100%;\n}\n\n.daily-info {\n  height: 60%;\n  width: 30%;\n}\n\n.manager-user-view {\n  align-items: center;\n  display: flex;\n  height: 60%;\n  width: 30%;\n}\n\n#availabilitySearch {\n  width: 85%;\n}\n\ninput, button, select {\n  border: 1px solid black;\n  border-radius: 5px;\n  transition: transform 0.3s;\n}\n\ninput:hover, button:hover, select:hover {\n  border: 1px solid black;\n  border-radius: 5px;\n  transform: scale(1.05);\n  cursor:pointer;\n}\n\n.hidden {\n  visibility:hidden\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 4 */
/***/ ((module) => {



function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),
/* 5 */
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
let apiCalls = {

fetchOne(param) {
    return fetch(`http://localhost:3001/api/v1/${param}`)
      .then((response) => response.json())
      .then((response) => response[param])
      .catch((error) => console.log(error));
  },

fetchCustomer(param) {
    return fetch(`http://localhost:3001/api/v1/customers/${param}`)
      .then((response) => response.json())
      .catch((error) => console.log(error));
  },

fetchOneCustomerData(custID) {
    return[this.fetchCustomer(custID),this.fetchOne("rooms"), this.fetchOne("bookings")];
  },

fetchManagerData() {
    return[this.fetchOne("customers"),this.fetchOne("rooms"), this.fetchOne("bookings")];
  },

postBooking(id,date,roomNum) {
    return fetch('http://localhost:3001/api/v1/bookings', {
      method: "POST",
      body:JSON.stringify({ "userID": id, "date": date, "roomNumber": roomNum }),
      headers: {"Content-Type": "application/json"}
    })
    .then(response => response.json())
    .catch((error) => console.log(error))
  },

removeBooking(bookingInfo) {
    return fetch(`http://localhost:3001/api/v1/bookings/${bookingInfo}`, {
      method: "DELETE",
      headers: {"Content-Type": "application/json"}
    })
    .then(response => response.json())
    .catch((error) => console.log(error));
  }

};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (apiCalls);


/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
let domUpdates = {

loadCustomer(customer,cardView,textPrompts,roomPrompt,isManager,currentDate){
  this.displayBookings(customer.bookings,cardView,roomPrompt,isManager,currentDate);
  this.greetCustomer(customer.name,customer.calculateSpend(),textPrompts);
},

show(selector) {
  selector.classList.remove('hidden');
},

hide(selector) {
  selector.classList.add('hidden');
},

fetchError(roomPrompts,error) {
  roomPrompts.innerHTML = "Server Down, Please Try Again Later."
},

updateError(roomPrompts,text) {
  roomPrompts.innerHTML = `Error, You booking was not ${text}. Please Try Again Later.`
},

setCalendar(calendarMin,calendar) {
  calendar.value = calendarMin;
  calendar.min = calendarMin;
},

managerViews(manager,mgrInfo,currentDate,bookings,roomsData,customersData,mgrDropDown,textPrompts,roomPrompt,cardView,bookNowButton,isManager) {
  this.managerToolbarText(manager,mgrInfo,roomsData)
  textPrompts.innerText = `Hello Manager, today's date is ${currentDate}.`
  this.mgrLoadCustomerSelect(customersData,mgrDropDown);
  this.mgrRoomsAvailableToday(manager,roomPrompt,cardView,isManager);
},

managerToolbarText (manager,mgrInfo,roomsData) {
  mgrInfo.innerHTML = `
  Today's Hotel Revenue is $${manager.dailyRevenue(manager.occupiedRooms).toFixed(2)}<br>
  Today's Occupancy is ${manager.percentOccupied(roomsData,manager.occupiedRooms)}%`;
},

mgrRoomsAvailableToday(manager,roomPrompt,cardView,isManager) {
  cardView.innerHTML = this.populateSearchCards(manager.roomsAvailableToday,roomPrompt,isManager);
  roomPrompt.innerHTML = "Today's Available Rooms are below --- To View, Search, and Edit a Users Rooms Use the Manager Toolbar Above";
},

mgrLoadCustomerSelect(customersData,mgrDropDown) {
 mgrDropDown.innerHTML="";

  customersData.forEach(customer => {
    mgrDropDown.innerHTML +=`
      <option value ="${customer.id}" data-userID="${customer.id}">${customer.name}</input>
      `;
  });
},

greetCustomer(customerName,totalSpend,prompts) {
  prompts.innerText = `Hello! and Welcome back ${customerName}, your total spend at the Hotel is:     $${totalSpend}`
},

displayBookings(bookings,cardView,roomPrompt,isManager,currentDate) {
  cardView.innerHTML = "";
  cardView.innerHTML = this.populateBookingCards(bookings,roomPrompt,isManager,currentDate) || "No past or future bookings found, be sure to book a stay!";
},

displayBookingConfirm(roomPrompt,searchForm,text,calendarMin,calendar) {
  roomPrompt.innerHTML = `Your ${text} Booking is Confirmed!`;
  searchForm.reset();
  this.setCalendar(calendarMin,calendar);
},

displaySearchResults(results,cardView,roomPrompt) {
  cardView.innerHTML = "";
  cardView.innerHTML = this.populateSearchCards(results,roomPrompt) || this.noSearchResults(cardView,roomPrompt)
},

noSearchResults(cardView,roomsMessage){
  roomsMessage.innerHTML = "No Rooms have availability that date."
  return cardView.innerHTML = "SORRY no rooms available that date, please adjust your parameters and search again!"
},

populateSearchCards(displayData,roomPrompt,isManager) {
  let cardData= "";
   displayData.map(item =>{

     let hide = "";

     if(isManager) {
       hide = "hidden";
     }

    cardData +=
    `<section class="room-card">
      <section class = "room-details">
        Night of Stay: ${item.bookingDate}<br>
        Room Type: ${item.roomType} with ${item.bedSize} bed<br>
        Nightly Rate: $${item.costPerNight}
        <img class="room-image" src="./images/roomphoto.jpeg" alt="hotel room ${item.number}">
      </section>
      <section class ="room-card-buttons ${hide}">
        <button id="newBooking" data-user="${item.customerID}" data-date="${item.bookingDate}" data-room=${item.number} class="card-button">Book Now!</button>
      </section>
    </section>`;

    roomPrompt.innerHTML = `${displayData.length} rooms have availability on ${displayData[0].bookingDate}`;
  });
  return cardData
},

populateBookingCards(displayData,roomPrompt,isManager,currentDate) {
  let cardData= "";

  displayData
    .reverse()
    .map(item =>{
      let hide = "hidden";

      if(isManager && (new Date(currentDate) < new Date(item.date))) {
        hide = "";
      }

      cardData +=
      `<section class="room-card">
        <section class ="room-details">
          Date of Stay: ${item.date}<br> Room Number: ${item.roomNumber}<br> Cost of stay: $${item.amount}
          <img class="room-image" src="./images/roomphoto.jpeg" alt="hotel room ${item.roomNumber}">
        </section>
        <section class ="room-card-buttons ${hide}">
        <button id="deleteBooking" data-booking-id ="${item.id}" class="card-button">Delete Booking</button>
        </section>
      </section>`
  });
  roomPrompt.innerHTML = `You have made ${displayData.length} bookings with Hotel Colorado.`;
  return cardData;
},

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (domUpdates);


/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Customer {
  constructor(customerData) {
    this.id = customerData.id;
    this.name = customerData.name;
    this.bookings = [];
  }

  loadExistingBookings(allBookings) {
    this.bookings = allBookings.filter(booking => booking.userID === this.id)
  };

  addCostPerNight(roomData) {
    this.bookings.forEach(booking => {
      roomData.forEach(room => {
        if(room.number === booking.roomNumber){
          booking.amount = room.costPerNight
        }
      });
    });
  };

  calculateSpend() {
    return Number(this.bookings.reduce((acc,booking)=>{
        acc += booking.amount
      return acc
    },0).toFixed(2))
  };

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Customer);


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Manager {

  percentOccupied (allRooms,occupiedRooms) {
    return Number(((occupiedRooms.length  / allRooms.length) * 100).toFixed(0));
  };

  dailyRevenue(occupiedRooms) {
    return Number(occupiedRooms
          .reduce((acc,cur) =>{
            acc += cur.costPerNight
            return acc
          },0).toFixed(2));
  };

};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Manager);


/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Rooms{
  constructor(roomData) {
    this.allRooms = roomData;
  }

  dateFilter(date,bookingInfo,custID) {
    return this.allRooms.reduce((acc,cur) =>{
      bookingInfo.forEach(booking => {
        cur.customerID = custID;
        cur.bookingDate = date;
        if(booking.date === date) {
          acc = acc.filter(room => room.number !== booking.roomNumber)
        };
      })
      return acc
    },this.allRooms);
  };

  roomSearchFilter(date,bookingInfo,type,bed,customerID) {
    return this.dateFilter(date,bookingInfo,customerID)
      .filter(room => (room.roomType === (type || room.roomType)) && ((room.bedSize === (bed || room.bedSize)) ));
  };

  percentOccupied(currentDate,bookingInfo){
       return ((this.allRooms.length - this.dateFilter(currentDate,bookingInfo).length) / this.allRooms.length)*100
  };

};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Rooms);


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _apiCalls_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _domUpdates_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var _classes_Customer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8);
/* harmony import */ var _classes_Manager_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9);
/* harmony import */ var _classes_Rooms_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(10);







//DataModelQuerySelectors/////
const searchRoomButton = document.querySelector('.nav-search');
const goToBookingsButton = document.querySelector('.nav-displays');
const mgrDropDown = document.querySelector('#managerUserPick');
const bookNowButton = document.querySelector('.card-button');

//DOMQuerySelectors/////
const logonButton = document.querySelector('#submitLogon');
const logoffButton = document.querySelector('.logout-button');
const userTextPrompts = document.querySelector('.user-text-prompts');
const roomPrompts = document.querySelector('.rooms-prompts-container');
const roomsDisplay = document.querySelector('.room-viewing-container');
const navArea = document.querySelector('.nav-container');
const loginArea = document.querySelector('.login-container');
const mgrArea = document.querySelector('.manager-container');
const mgrInfo = document.querySelector('.daily-info');
const mgrCustSelect = document.querySelector('#mgrSelection');
const calendar = document.querySelector('#calendarDate');

//GlobalVariables/////
let bookingsData, roomsData, customersData, customer, rooms, customerSpend, bookButton, currentDate, manager, isManager, calendarMin;

//Fetch Data/////
const retrieveDataAfterLogin = (parsedID) => {
  Promise.all(_apiCalls_js__WEBPACK_IMPORTED_MODULE_1__.default.fetchOneCustomerData(parsedID)).then(data => {setGlobalVariables(data);_domUpdates_js__WEBPACK_IMPORTED_MODULE_2__.default.show(navArea);_domUpdates_js__WEBPACK_IMPORTED_MODULE_2__.default.hide(loginArea);_domUpdates_js__WEBPACK_IMPORTED_MODULE_2__.default.show(logoffButton);}).catch(error => _domUpdates_js__WEBPACK_IMPORTED_MODULE_2__.default.fetchError(roomPrompts));
};

const retrieveManagerLogin = () => {
  Promise.all(_apiCalls_js__WEBPACK_IMPORTED_MODULE_1__.default.fetchManagerData()).then(data => {setGlobalVariables(data);_domUpdates_js__WEBPACK_IMPORTED_MODULE_2__.default.hide(loginArea);_domUpdates_js__WEBPACK_IMPORTED_MODULE_2__.default.show(mgrArea);_domUpdates_js__WEBPACK_IMPORTED_MODULE_2__.default.show(logoffButton);}).catch(error => _domUpdates_js__WEBPACK_IMPORTED_MODULE_2__.default.fetchError(roomPrompts));
};

const addBooking = (input) => {
  Promise.all([_apiCalls_js__WEBPACK_IMPORTED_MODULE_1__.default.postBooking(parseInt(input.user),input.date,parseInt(input.room))]).then(data => refreshBookings('New')).catch(error => _domUpdates_js__WEBPACK_IMPORTED_MODULE_2__.default.updateError(roomPrompts,"Added"));
};

const deleteBooking = (bookingID) => {
  Promise.all([_apiCalls_js__WEBPACK_IMPORTED_MODULE_1__.default.removeBooking(bookingID)]).then(data => refreshBookings('Removed')).catch(error => _domUpdates_js__WEBPACK_IMPORTED_MODULE_2__.default.updateError(roomPrompts,"Deleted"));
};

const refreshBookings = (text) => {
  Promise.all([_apiCalls_js__WEBPACK_IMPORTED_MODULE_1__.default.fetchOne('bookings')]).then(data => { populateManager(data[0],roomsData); populateCustomer(data[0],roomsData,isManager,currentDate);   _domUpdates_js__WEBPACK_IMPORTED_MODULE_2__.default.displayBookingConfirm(roomPrompts,searchRoomButton,text,calendarMin,calendar); bookingsData = data[0];}).catch(error => _domUpdates_js__WEBPACK_IMPORTED_MODULE_2__.default.fetchError(roomPrompts,error));
};

//Functions//////
const setGlobalVariables = (fetchedData) => {
  customersData = fetchedData[0];
  roomsData = fetchedData[1];
  bookingsData = fetchedData[2];
  currentDate = computeDate();
  _domUpdates_js__WEBPACK_IMPORTED_MODULE_2__.default.setCalendar(calendarMin,calendar);
  rooms = new _classes_Rooms_js__WEBPACK_IMPORTED_MODULE_5__.default(roomsData);

  if (fetchedData[0].length === 50){
    manager = new _classes_Manager_js__WEBPACK_IMPORTED_MODULE_4__.default();
    isManager = true;
    populateManager(bookingsData,roomsData);
  } else {
    customer = new _classes_Customer_js__WEBPACK_IMPORTED_MODULE_3__.default(customersData);
    populateCustomer(bookingsData,roomsData);
  }
}

const computeDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  let month = date.getMonth()+1;
  const day = date.getDate();

  if(month < 10 ) {
    month = `0${month.toString()}`;
  }

  calendarMin = `${year}-${month}-${day}`;
  return `${year}/${month}/${day}`;
}

const populateCustomer = (bookings,roomsInfo,isManager,currentDate) => {
  customer.loadExistingBookings(bookings);
  customer.addCostPerNight(roomsInfo);
  _domUpdates_js__WEBPACK_IMPORTED_MODULE_2__.default.loadCustomer(customer,roomsDisplay,userTextPrompts,roomPrompts,isManager,currentDate);
}

const populateManager = (bookings,roomsInfo) => {
  if(!isManager) {
    return
  };
  manager.roomsAvailableToday = rooms.dateFilter(currentDate,bookings);
  manager.occupiedRooms = roomsData.filter(room => !manager.roomsAvailableToday.includes(room));
  _domUpdates_js__WEBPACK_IMPORTED_MODULE_2__.default.managerViews(manager,mgrInfo,currentDate,bookings,roomsData,customersData,mgrDropDown,userTextPrompts,roomPrompts,roomsDisplay,bookNowButton,isManager);
  _domUpdates_js__WEBPACK_IMPORTED_MODULE_2__.default.managerToolbarText(manager,mgrInfo,roomsData);
}


const searchRooms = (date,bookingInfo,type,bed,customerID) => {
  const results = rooms.roomSearchFilter(date,bookingInfo,type,bed,customerID);
  _domUpdates_js__WEBPACK_IMPORTED_MODULE_2__.default.displaySearchResults(results,roomsDisplay,roomPrompts);
}

const transformFormDate = (date) => {
  const result = date.split("").map(num => {
    if(num === "-"){
      return "/";
    } else {
      return num;
    }
  });
  return result.join("")
};

const determineValidLogin = (custID,pwd) => {
  let splitId = custID.split("customer");

  if(custID === 'manager' && pwd === 'overlook2021'){
    return retrieveManagerLogin();
  }

  if(splitId.length !== 2){
    return roomPrompts.innerHTML = "Invalid UserID, please check spelling and enter again";
  }

  let parsedId = parseInt(splitId[1]);
  if(!(parsedId >= 1  && parsedId <=50)) {
    return roomPrompts.innerHTML = "Invalid UserID Number, please verify and try again";
  }

  if(pwd !== "overlook2021") {
    return roomPrompts.innerHTML = "Invalid Password, please retype your password"
  }
   roomPrompts.innerHTML = "Successful Login, loading Hotel Colorado Website Now!";
   retrieveDataAfterLogin(parsedId);
};

//Event Listeners/////
logonButton.addEventListener("click", (event) => {
  let input = event.target.parentNode.children;
  determineValidLogin(input[1].value,input[4].value)
});

logoffButton.addEventListener("click", (event) => {
  document.location.reload(true);
});

goToBookingsButton.addEventListener("click",() => {
  _domUpdates_js__WEBPACK_IMPORTED_MODULE_2__.default.displayBookings(customer.bookings,roomsDisplay,roomPrompts,isManager,currentDate)
});

searchRoomButton.addEventListener("click",(event) => {
  if(event.target.id === "availabilitySearch" && event.target.parentNode.children[1].value !== ''){
    event.preventDefault();
    const formattedDate = transformFormDate(event.target.parentNode.children[1].value);
    searchRooms(formattedDate,bookingsData,event.target.parentNode.children[3].value,event.target.parentNode.children[5].value,customer.id)
  };
});

roomsDisplay.addEventListener("click", (event) => {
  let input = event.target.dataset;

  if(event.target.id === "newBooking"){
    addBooking(input);
  };

  if(event.target.id === "deleteBooking"){
    deleteBooking(input.bookingId);
  };
});

mgrCustSelect.addEventListener("change",(event)=>{
  customer = new _classes_Customer_js__WEBPACK_IMPORTED_MODULE_3__.default(customersData[parseInt(event.target.value)-1]);
  populateCustomer(bookingsData,roomsData,isManager,currentDate);
  _domUpdates_js__WEBPACK_IMPORTED_MODULE_2__.default.show(navArea);
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map