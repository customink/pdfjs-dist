/**
 * @licstart The following is the entire license notice for the
 * Javascript code in this page
 *
 * Copyright 2020 Mozilla Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @licend The above is the entire license notice for the
 * Javascript code in this page
 */
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

if (typeof globalThis === "undefined" || !globalThis._pdfjsCompatibilityChecked) {
  if (typeof globalThis === "undefined" || globalThis.Math !== Math) {
    globalThis = require("core-js/es/global-this");
  }

  globalThis._pdfjsCompatibilityChecked = true;

  var _require = require("./is_node.js"),
      isNodeJS = _require.isNodeJS;

  var hasDOM = (typeof window === "undefined" ? "undefined" : _typeof(window)) === "object" && (typeof document === "undefined" ? "undefined" : _typeof(document)) === "object";
  var userAgent = typeof navigator !== "undefined" && navigator.userAgent || "";
  var isIE = /Trident/.test(userAgent);

  (function checkNodeBtoa() {
    if (globalThis.btoa || !isNodeJS) {
      return;
    }

    globalThis.btoa = function (chars) {
      return Buffer.from(chars, "binary").toString("base64");
    };
  })();

  (function checkNodeAtob() {
    if (globalThis.atob || !isNodeJS) {
      return;
    }

    globalThis.atob = function (input) {
      return Buffer.from(input, "base64").toString("binary");
    };
  })();

  (function checkChildNodeRemove() {
    if (!hasDOM) {
      return;
    }

    if (typeof Element.prototype.remove !== "undefined") {
      return;
    }

    Element.prototype.remove = function () {
      if (this.parentNode) {
        this.parentNode.removeChild(this);
      }
    };
  })();

  (function checkDOMTokenListAddRemove() {
    if (!hasDOM || isNodeJS) {
      return;
    }

    var div = document.createElement("div");
    div.classList.add("testOne", "testTwo");

    if (div.classList.contains("testOne") === true && div.classList.contains("testTwo") === true) {
      return;
    }

    var OriginalDOMTokenListAdd = DOMTokenList.prototype.add;
    var OriginalDOMTokenListRemove = DOMTokenList.prototype.remove;

    DOMTokenList.prototype.add = function () {
      for (var _len = arguments.length, tokens = new Array(_len), _key = 0; _key < _len; _key++) {
        tokens[_key] = arguments[_key];
      }

      for (var _i = 0, _tokens = tokens; _i < _tokens.length; _i++) {
        var token = _tokens[_i];
        OriginalDOMTokenListAdd.call(this, token);
      }
    };

    DOMTokenList.prototype.remove = function () {
      for (var _len2 = arguments.length, tokens = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        tokens[_key2] = arguments[_key2];
      }

      for (var _i2 = 0, _tokens2 = tokens; _i2 < _tokens2.length; _i2++) {
        var token = _tokens2[_i2];
        OriginalDOMTokenListRemove.call(this, token);
      }
    };
  })();

  (function checkDOMTokenListToggle() {
    if (!hasDOM || isNodeJS) {
      return;
    }

    var div = document.createElement("div");

    if (div.classList.toggle("test", 0) === false) {
      return;
    }

    DOMTokenList.prototype.toggle = function (token) {
      var force = arguments.length > 1 ? !!arguments[1] : !this.contains(token);
      return this[force ? "add" : "remove"](token), force;
    };
  })();

  (function checkWindowHistoryPushStateReplaceState() {
    if (!hasDOM || !isIE) {
      return;
    }

    var OriginalPushState = window.history.pushState;
    var OriginalReplaceState = window.history.replaceState;

    window.history.pushState = function (state, title, url) {
      var args = url === undefined ? [state, title] : [state, title, url];
      OriginalPushState.apply(this, args);
    };

    window.history.replaceState = function (state, title, url) {
      var args = url === undefined ? [state, title] : [state, title, url];
      OriginalReplaceState.apply(this, args);
    };
  })();

  (function checkStringStartsWith() {
    if (String.prototype.startsWith) {
      return;
    }

    require("core-js/es/string/starts-with.js");
  })();

  (function checkStringEndsWith() {
    if (String.prototype.endsWith) {
      return;
    }

    require("core-js/es/string/ends-with.js");
  })();

  (function checkStringIncludes() {
    if (String.prototype.includes) {
      return;
    }

    require("core-js/es/string/includes.js");
  })();

  (function checkArrayIncludes() {
    if (Array.prototype.includes) {
      return;
    }

    require("core-js/es/array/includes.js");
  })();

  (function checkArrayFrom() {
    if (Array.from) {
      return;
    }

    require("core-js/es/array/from.js");
  })();

  (function checkObjectAssign() {
    if (Object.assign) {
      return;
    }

    require("core-js/es/object/assign.js");
  })();

  (function checkMathLog2() {
    if (Math.log2) {
      return;
    }

    Math.log2 = require("core-js/es/math/log2.js");
  })();

  (function checkNumberIsNaN() {
    if (Number.isNaN) {
      return;
    }

    Number.isNaN = require("core-js/es/number/is-nan.js");
  })();

  (function checkNumberIsInteger() {
    if (Number.isInteger) {
      return;
    }

    Number.isInteger = require("core-js/es/number/is-integer.js");
  })();

  (function checkPromise() {
    if (globalThis.Promise && globalThis.Promise.allSettled) {
      return;
    }

    globalThis.Promise = require("core-js/es/promise/index.js");
  })();

  (function checkURL() {
    globalThis.URL = require("core-js/web/url.js");
  })();

  (function checkReadableStream() {
    var isReadableStreamSupported = false;

    if (typeof ReadableStream !== "undefined") {
      try {
        new ReadableStream({
          start: function start(controller) {
            controller.close();
          }
        });
        isReadableStreamSupported = true;
      } catch (e) {}
    }

    if (isReadableStreamSupported) {
      return;
    }

    globalThis.ReadableStream = require("web-streams-polyfill/dist/ponyfill.js").ReadableStream;
  })();

  (function checkWeakMap() {
    if (globalThis.WeakMap) {
      return;
    }

    globalThis.WeakMap = require("core-js/es/weak-map/index.js");
  })();

  (function checkWeakSet() {
    if (globalThis.WeakSet) {
      return;
    }

    globalThis.WeakSet = require("core-js/es/weak-set/index.js");
  })();

  (function checkStringCodePointAt() {
    if (String.prototype.codePointAt) {
      return;
    }

    require("core-js/es/string/code-point-at.js");
  })();

  (function checkStringFromCodePoint() {
    if (String.fromCodePoint) {
      return;
    }

    String.fromCodePoint = require("core-js/es/string/from-code-point.js");
  })();

  (function checkSymbol() {
    if (globalThis.Symbol) {
      return;
    }

    require("core-js/es/symbol/index.js");
  })();

  (function checkStringPadStart() {
    if (String.prototype.padStart) {
      return;
    }

    require("core-js/es/string/pad-start.js");
  })();

  (function checkStringPadEnd() {
    if (String.prototype.padEnd) {
      return;
    }

    require("core-js/es/string/pad-end.js");
  })();

  (function checkObjectValues() {
    if (Object.values) {
      return;
    }

    Object.values = require("core-js/es/object/values.js");
  })();
}