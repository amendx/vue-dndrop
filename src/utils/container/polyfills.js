/* eslint-disable no-void */
/* eslint-disable no-empty */
/* eslint-disable no-extend-native */
function applyPolyfills () {
  (function (constructor) {
    if (constructor && constructor.prototype && !constructor.prototype.matches) {
      constructor.prototype.matches =
                constructor.prototype.matchesSelector ||
                    constructor.prototype.mozMatchesSelector ||
                    constructor.prototype.msMatchesSelector ||
                    constructor.prototype.oMatchesSelector ||
                    constructor.prototype.webkitMatchesSelector ||
                    function (s) {
                      const matches = (this.document || this.ownerDocument).querySelectorAll(s); let i = matches.length;
                      while (--i >= 0 && matches.item(i) !== this) { }
                      return i > -1;
                    };
    }
  })(Element);
  // Production steps of ECMA-262, Edition 5, 15.4.4.17
  // Reference: http://es5.github.io/#x15.4.4.17
  if (!Array.prototype.some) {
    Array.prototype.some = function (fun /*, thisArg */) {
      'use strict';
      if (this == null) {
        throw new TypeError('Array.prototype.some called on null or undefined');
      }
      if (typeof fun !== 'function') {
        throw new TypeError();
      }
      const t = Object(this);
      const len = t.length >>> 0;
      const thisArg = arguments.length >= 2 ? arguments[1] : void 0;
      for (let i = 0; i < len; i++) {
        if (i in t && fun.call(thisArg, t[i], i, t)) {
          return true;
        }
      }
      return false;
    };
  }
}
if (typeof window !== 'undefined') {
  applyPolyfills();
}
