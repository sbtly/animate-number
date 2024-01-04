var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __reExport = (target, module, desc) => {
  if (module && typeof module === "object" || typeof module === "function") {
    for (let key of __getOwnPropNames(module))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module) => {
  return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
};

// node_modules/@emotion/sheet/dist/emotion-sheet.cjs.dev.js
var require_emotion_sheet_cjs_dev = __commonJS({
  "node_modules/@emotion/sheet/dist/emotion-sheet.cjs.dev.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function sheetForTag(tag) {
      if (tag.sheet) {
        return tag.sheet;
      }
      for (var i = 0; i < document.styleSheets.length; i++) {
        if (document.styleSheets[i].ownerNode === tag) {
          return document.styleSheets[i];
        }
      }
    }
    function createStyleElement(options) {
      var tag = document.createElement("style");
      tag.setAttribute("data-emotion", options.key);
      if (options.nonce !== void 0) {
        tag.setAttribute("nonce", options.nonce);
      }
      tag.appendChild(document.createTextNode(""));
      tag.setAttribute("data-s", "");
      return tag;
    }
    var StyleSheet = /* @__PURE__ */ function() {
      function StyleSheet2(options) {
        var _this = this;
        this._insertTag = function(tag) {
          var before;
          if (_this.tags.length === 0) {
            if (_this.insertionPoint) {
              before = _this.insertionPoint.nextSibling;
            } else if (_this.prepend) {
              before = _this.container.firstChild;
            } else {
              before = _this.before;
            }
          } else {
            before = _this.tags[_this.tags.length - 1].nextSibling;
          }
          _this.container.insertBefore(tag, before);
          _this.tags.push(tag);
        };
        this.isSpeedy = options.speedy === void 0 ? false : options.speedy;
        this.tags = [];
        this.ctr = 0;
        this.nonce = options.nonce;
        this.key = options.key;
        this.container = options.container;
        this.prepend = options.prepend;
        this.insertionPoint = options.insertionPoint;
        this.before = null;
      }
      var _proto = StyleSheet2.prototype;
      _proto.hydrate = function hydrate2(nodes) {
        nodes.forEach(this._insertTag);
      };
      _proto.insert = function insert(rule) {
        if (this.ctr % (this.isSpeedy ? 65e3 : 1) === 0) {
          this._insertTag(createStyleElement(this));
        }
        var tag = this.tags[this.tags.length - 1];
        if (true) {
          var isImportRule = rule.charCodeAt(0) === 64 && rule.charCodeAt(1) === 105;
          if (isImportRule && this._alreadyInsertedOrderInsensitiveRule) {
            console.error("You're attempting to insert the following rule:\n" + rule + "\n\n`@import` rules must be before all other types of rules in a stylesheet but other rules have already been inserted. Please ensure that `@import` rules are before all other rules.");
          }
          this._alreadyInsertedOrderInsensitiveRule = this._alreadyInsertedOrderInsensitiveRule || !isImportRule;
        }
        if (this.isSpeedy) {
          var sheet2 = sheetForTag(tag);
          try {
            sheet2.insertRule(rule, sheet2.cssRules.length);
          } catch (e) {
            if (!/:(-moz-placeholder|-moz-focus-inner|-moz-focusring|-ms-input-placeholder|-moz-read-write|-moz-read-only|-ms-clear|-ms-expand|-ms-reveal){/.test(rule)) {
              console.error('There was a problem inserting the following rule: "' + rule + '"', e);
            }
          }
        } else {
          tag.appendChild(document.createTextNode(rule));
        }
        this.ctr++;
      };
      _proto.flush = function flush2() {
        this.tags.forEach(function(tag) {
          return tag.parentNode && tag.parentNode.removeChild(tag);
        });
        this.tags = [];
        this.ctr = 0;
        if (true) {
          this._alreadyInsertedOrderInsensitiveRule = false;
        }
      };
      return StyleSheet2;
    }();
    exports.StyleSheet = StyleSheet;
  }
});

// node_modules/@emotion/sheet/dist/emotion-sheet.cjs.js
var require_emotion_sheet_cjs = __commonJS({
  "node_modules/@emotion/sheet/dist/emotion-sheet.cjs.js"(exports, module) {
    "use strict";
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_emotion_sheet_cjs_dev();
    }
  }
});

// node_modules/stylis/dist/umd/stylis.js
var require_stylis = __commonJS({
  "node_modules/stylis/dist/umd/stylis.js"(exports, module) {
    (function(e, r) {
      typeof exports === "object" && typeof module !== "undefined" ? r(exports) : typeof define === "function" && define.amd ? define(["exports"], r) : (e = e || self, r(e.stylis = {}));
    })(exports, function(e) {
      "use strict";
      var r = "-ms-";
      var a = "-moz-";
      var c = "-webkit-";
      var n = "comm";
      var t = "rule";
      var s = "decl";
      var i = "@page";
      var u = "@media";
      var o = "@import";
      var f = "@charset";
      var l = "@viewport";
      var p = "@supports";
      var h = "@document";
      var v = "@namespace";
      var d = "@keyframes";
      var b = "@font-face";
      var w = "@counter-style";
      var m = "@font-feature-values";
      var g = "@layer";
      var k = Math.abs;
      var $ = String.fromCharCode;
      var x = Object.assign;
      function E(e2, r2) {
        return M(e2, 0) ^ 45 ? (((r2 << 2 ^ M(e2, 0)) << 2 ^ M(e2, 1)) << 2 ^ M(e2, 2)) << 2 ^ M(e2, 3) : 0;
      }
      function y(e2) {
        return e2.trim();
      }
      function T(e2, r2) {
        return (e2 = r2.exec(e2)) ? e2[0] : e2;
      }
      function A(e2, r2, a2) {
        return e2.replace(r2, a2);
      }
      function O(e2, r2) {
        return e2.indexOf(r2);
      }
      function M(e2, r2) {
        return e2.charCodeAt(r2) | 0;
      }
      function C(e2, r2, a2) {
        return e2.slice(r2, a2);
      }
      function R(e2) {
        return e2.length;
      }
      function S(e2) {
        return e2.length;
      }
      function z(e2, r2) {
        return r2.push(e2), e2;
      }
      function N(e2, r2) {
        return e2.map(r2).join("");
      }
      e.line = 1;
      e.column = 1;
      e.length = 0;
      e.position = 0;
      e.character = 0;
      e.characters = "";
      function P(r2, a2, c2, n2, t2, s2, i2) {
        return { value: r2, root: a2, parent: c2, type: n2, props: t2, children: s2, line: e.line, column: e.column, length: i2, return: "" };
      }
      function j(e2, r2) {
        return x(P("", null, null, "", null, null, 0), e2, { length: -e2.length }, r2);
      }
      function U() {
        return e.character;
      }
      function _() {
        e.character = e.position > 0 ? M(e.characters, --e.position) : 0;
        if (e.column--, e.character === 10)
          e.column = 1, e.line--;
        return e.character;
      }
      function F() {
        e.character = e.position < e.length ? M(e.characters, e.position++) : 0;
        if (e.column++, e.character === 10)
          e.column = 1, e.line++;
        return e.character;
      }
      function I() {
        return M(e.characters, e.position);
      }
      function L() {
        return e.position;
      }
      function D(r2, a2) {
        return C(e.characters, r2, a2);
      }
      function Y(e2) {
        switch (e2) {
          case 0:
          case 9:
          case 10:
          case 13:
          case 32:
            return 5;
          case 33:
          case 43:
          case 44:
          case 47:
          case 62:
          case 64:
          case 126:
          case 59:
          case 123:
          case 125:
            return 4;
          case 58:
            return 3;
          case 34:
          case 39:
          case 40:
          case 91:
            return 2;
          case 41:
          case 93:
            return 1;
        }
        return 0;
      }
      function K(r2) {
        return e.line = e.column = 1, e.length = R(e.characters = r2), e.position = 0, [];
      }
      function V(r2) {
        return e.characters = "", r2;
      }
      function W(r2) {
        return y(D(e.position - 1, q(r2 === 91 ? r2 + 2 : r2 === 40 ? r2 + 1 : r2)));
      }
      function B(e2) {
        return V(H(K(e2)));
      }
      function G(r2) {
        while (e.character = I())
          if (e.character < 33)
            F();
          else
            break;
        return Y(r2) > 2 || Y(e.character) > 3 ? "" : " ";
      }
      function H(r2) {
        while (F())
          switch (Y(e.character)) {
            case 0:
              z(Q(e.position - 1), r2);
              break;
            case 2:
              z(W(e.character), r2);
              break;
            default:
              z($(e.character), r2);
          }
        return r2;
      }
      function Z(r2, a2) {
        while (--a2 && F())
          if (e.character < 48 || e.character > 102 || e.character > 57 && e.character < 65 || e.character > 70 && e.character < 97)
            break;
        return D(r2, L() + (a2 < 6 && I() == 32 && F() == 32));
      }
      function q(r2) {
        while (F())
          switch (e.character) {
            case r2:
              return e.position;
            case 34:
            case 39:
              if (r2 !== 34 && r2 !== 39)
                q(e.character);
              break;
            case 40:
              if (r2 === 41)
                q(r2);
              break;
            case 92:
              F();
              break;
          }
        return e.position;
      }
      function J(r2, a2) {
        while (F())
          if (r2 + e.character === 47 + 10)
            break;
          else if (r2 + e.character === 42 + 42 && I() === 47)
            break;
        return "/*" + D(a2, e.position - 1) + "*" + $(r2 === 47 ? r2 : F());
      }
      function Q(r2) {
        while (!Y(I()))
          F();
        return D(r2, e.position);
      }
      function X(e2) {
        return V(ee("", null, null, null, [""], e2 = K(e2), 0, [0], e2));
      }
      function ee(e2, r2, a2, c2, n2, t2, s2, i2, u2) {
        var o2 = 0;
        var f2 = 0;
        var l2 = s2;
        var p2 = 0;
        var h2 = 0;
        var v2 = 0;
        var d2 = 1;
        var b2 = 1;
        var w2 = 1;
        var m2 = 0;
        var g2 = "";
        var k2 = n2;
        var x2 = t2;
        var E2 = c2;
        var y2 = g2;
        while (b2)
          switch (v2 = m2, m2 = F()) {
            case 40:
              if (v2 != 108 && M(y2, l2 - 1) == 58) {
                if (O(y2 += A(W(m2), "&", "&\f"), "&\f") != -1)
                  w2 = -1;
                break;
              }
            case 34:
            case 39:
            case 91:
              y2 += W(m2);
              break;
            case 9:
            case 10:
            case 13:
            case 32:
              y2 += G(v2);
              break;
            case 92:
              y2 += Z(L() - 1, 7);
              continue;
            case 47:
              switch (I()) {
                case 42:
                case 47:
                  z(ae(J(F(), L()), r2, a2), u2);
                  break;
                default:
                  y2 += "/";
              }
              break;
            case 123 * d2:
              i2[o2++] = R(y2) * w2;
            case 125 * d2:
            case 59:
            case 0:
              switch (m2) {
                case 0:
                case 125:
                  b2 = 0;
                case 59 + f2:
                  if (w2 == -1)
                    y2 = A(y2, /\f/g, "");
                  if (h2 > 0 && R(y2) - l2)
                    z(h2 > 32 ? ce(y2 + ";", c2, a2, l2 - 1) : ce(A(y2, " ", "") + ";", c2, a2, l2 - 2), u2);
                  break;
                case 59:
                  y2 += ";";
                default:
                  z(E2 = re(y2, r2, a2, o2, f2, n2, i2, g2, k2 = [], x2 = [], l2), t2);
                  if (m2 === 123)
                    if (f2 === 0)
                      ee(y2, r2, E2, E2, k2, t2, l2, i2, x2);
                    else
                      switch (p2 === 99 && M(y2, 3) === 110 ? 100 : p2) {
                        case 100:
                        case 108:
                        case 109:
                        case 115:
                          ee(e2, E2, E2, c2 && z(re(e2, E2, E2, 0, 0, n2, i2, g2, n2, k2 = [], l2), x2), n2, x2, l2, i2, c2 ? k2 : x2);
                          break;
                        default:
                          ee(y2, E2, E2, E2, [""], x2, 0, i2, x2);
                      }
              }
              o2 = f2 = h2 = 0, d2 = w2 = 1, g2 = y2 = "", l2 = s2;
              break;
            case 58:
              l2 = 1 + R(y2), h2 = v2;
            default:
              if (d2 < 1) {
                if (m2 == 123)
                  --d2;
                else if (m2 == 125 && d2++ == 0 && _() == 125)
                  continue;
              }
              switch (y2 += $(m2), m2 * d2) {
                case 38:
                  w2 = f2 > 0 ? 1 : (y2 += "\f", -1);
                  break;
                case 44:
                  i2[o2++] = (R(y2) - 1) * w2, w2 = 1;
                  break;
                case 64:
                  if (I() === 45)
                    y2 += W(F());
                  p2 = I(), f2 = l2 = R(g2 = y2 += Q(L())), m2++;
                  break;
                case 45:
                  if (v2 === 45 && R(y2) == 2)
                    d2 = 0;
              }
          }
        return t2;
      }
      function re(e2, r2, a2, c2, n2, s2, i2, u2, o2, f2, l2) {
        var p2 = n2 - 1;
        var h2 = n2 === 0 ? s2 : [""];
        var v2 = S(h2);
        for (var d2 = 0, b2 = 0, w2 = 0; d2 < c2; ++d2)
          for (var m2 = 0, g2 = C(e2, p2 + 1, p2 = k(b2 = i2[d2])), $2 = e2; m2 < v2; ++m2)
            if ($2 = y(b2 > 0 ? h2[m2] + " " + g2 : A(g2, /&\f/g, h2[m2])))
              o2[w2++] = $2;
        return P(e2, r2, a2, n2 === 0 ? t : u2, o2, f2, l2);
      }
      function ae(e2, r2, a2) {
        return P(e2, r2, a2, n, $(U()), C(e2, 2, -2), 0);
      }
      function ce(e2, r2, a2, c2) {
        return P(e2, r2, a2, s, C(e2, 0, c2), C(e2, c2 + 1, -1), c2);
      }
      function ne(e2, n2, t2) {
        switch (E(e2, n2)) {
          case 5103:
            return c + "print-" + e2 + e2;
          case 5737:
          case 4201:
          case 3177:
          case 3433:
          case 1641:
          case 4457:
          case 2921:
          case 5572:
          case 6356:
          case 5844:
          case 3191:
          case 6645:
          case 3005:
          case 6391:
          case 5879:
          case 5623:
          case 6135:
          case 4599:
          case 4855:
          case 4215:
          case 6389:
          case 5109:
          case 5365:
          case 5621:
          case 3829:
            return c + e2 + e2;
          case 4789:
            return a + e2 + e2;
          case 5349:
          case 4246:
          case 4810:
          case 6968:
          case 2756:
            return c + e2 + a + e2 + r + e2 + e2;
          case 5936:
            switch (M(e2, n2 + 11)) {
              case 114:
                return c + e2 + r + A(e2, /[svh]\w+-[tblr]{2}/, "tb") + e2;
              case 108:
                return c + e2 + r + A(e2, /[svh]\w+-[tblr]{2}/, "tb-rl") + e2;
              case 45:
                return c + e2 + r + A(e2, /[svh]\w+-[tblr]{2}/, "lr") + e2;
            }
          case 6828:
          case 4268:
          case 2903:
            return c + e2 + r + e2 + e2;
          case 6165:
            return c + e2 + r + "flex-" + e2 + e2;
          case 5187:
            return c + e2 + A(e2, /(\w+).+(:[^]+)/, c + "box-$1$2" + r + "flex-$1$2") + e2;
          case 5443:
            return c + e2 + r + "flex-item-" + A(e2, /flex-|-self/g, "") + (!T(e2, /flex-|baseline/) ? r + "grid-row-" + A(e2, /flex-|-self/g, "") : "") + e2;
          case 4675:
            return c + e2 + r + "flex-line-pack" + A(e2, /align-content|flex-|-self/g, "") + e2;
          case 5548:
            return c + e2 + r + A(e2, "shrink", "negative") + e2;
          case 5292:
            return c + e2 + r + A(e2, "basis", "preferred-size") + e2;
          case 6060:
            return c + "box-" + A(e2, "-grow", "") + c + e2 + r + A(e2, "grow", "positive") + e2;
          case 4554:
            return c + A(e2, /([^-])(transform)/g, "$1" + c + "$2") + e2;
          case 6187:
            return A(A(A(e2, /(zoom-|grab)/, c + "$1"), /(image-set)/, c + "$1"), e2, "") + e2;
          case 5495:
          case 3959:
            return A(e2, /(image-set\([^]*)/, c + "$1$`$1");
          case 4968:
            return A(A(e2, /(.+:)(flex-)?(.*)/, c + "box-pack:$3" + r + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + c + e2 + e2;
          case 4200:
            if (!T(e2, /flex-|baseline/))
              return r + "grid-column-align" + C(e2, n2) + e2;
            break;
          case 2592:
          case 3360:
            return r + A(e2, "template-", "") + e2;
          case 4384:
          case 3616:
            if (t2 && t2.some(function(e3, r2) {
              return n2 = r2, T(e3.props, /grid-\w+-end/);
            })) {
              return ~O(e2 + (t2 = t2[n2].value), "span") ? e2 : r + A(e2, "-start", "") + e2 + r + "grid-row-span:" + (~O(t2, "span") ? T(t2, /\d+/) : +T(t2, /\d+/) - +T(e2, /\d+/)) + ";";
            }
            return r + A(e2, "-start", "") + e2;
          case 4896:
          case 4128:
            return t2 && t2.some(function(e3) {
              return T(e3.props, /grid-\w+-start/);
            }) ? e2 : r + A(A(e2, "-end", "-span"), "span ", "") + e2;
          case 4095:
          case 3583:
          case 4068:
          case 2532:
            return A(e2, /(.+)-inline(.+)/, c + "$1$2") + e2;
          case 8116:
          case 7059:
          case 5753:
          case 5535:
          case 5445:
          case 5701:
          case 4933:
          case 4677:
          case 5533:
          case 5789:
          case 5021:
          case 4765:
            if (R(e2) - 1 - n2 > 6)
              switch (M(e2, n2 + 1)) {
                case 109:
                  if (M(e2, n2 + 4) !== 45)
                    break;
                case 102:
                  return A(e2, /(.+:)(.+)-([^]+)/, "$1" + c + "$2-$3$1" + a + (M(e2, n2 + 3) == 108 ? "$3" : "$2-$3")) + e2;
                case 115:
                  return ~O(e2, "stretch") ? ne(A(e2, "stretch", "fill-available"), n2, t2) + e2 : e2;
              }
            break;
          case 5152:
          case 5920:
            return A(e2, /(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/, function(a2, c2, n3, t3, s2, i2, u2) {
              return r + c2 + ":" + n3 + u2 + (t3 ? r + c2 + "-span:" + (s2 ? i2 : +i2 - +n3) + u2 : "") + e2;
            });
          case 4949:
            if (M(e2, n2 + 6) === 121)
              return A(e2, ":", ":" + c) + e2;
            break;
          case 6444:
            switch (M(e2, M(e2, 14) === 45 ? 18 : 11)) {
              case 120:
                return A(e2, /(.+:)([^;\s!]+)(;|(\s+)?!.+)?/, "$1" + c + (M(e2, 14) === 45 ? "inline-" : "") + "box$3$1" + c + "$2$3$1" + r + "$2box$3") + e2;
              case 100:
                return A(e2, ":", ":" + r) + e2;
            }
            break;
          case 5719:
          case 2647:
          case 2135:
          case 3927:
          case 2391:
            return A(e2, "scroll-", "scroll-snap-") + e2;
        }
        return e2;
      }
      function te(e2, r2) {
        var a2 = "";
        var c2 = S(e2);
        for (var n2 = 0; n2 < c2; n2++)
          a2 += r2(e2[n2], n2, e2, r2) || "";
        return a2;
      }
      function se(e2, r2, a2, c2) {
        switch (e2.type) {
          case g:
            if (e2.children.length)
              break;
          case o:
          case s:
            return e2.return = e2.return || e2.value;
          case n:
            return "";
          case d:
            return e2.return = e2.value + "{" + te(e2.children, c2) + "}";
          case t:
            e2.value = e2.props.join(",");
        }
        return R(a2 = te(e2.children, c2)) ? e2.return = e2.value + "{" + a2 + "}" : "";
      }
      function ie(e2) {
        var r2 = S(e2);
        return function(a2, c2, n2, t2) {
          var s2 = "";
          for (var i2 = 0; i2 < r2; i2++)
            s2 += e2[i2](a2, c2, n2, t2) || "";
          return s2;
        };
      }
      function ue(e2) {
        return function(r2) {
          if (!r2.root) {
            if (r2 = r2.return)
              e2(r2);
          }
        };
      }
      function oe(e2, n2, i2, u2) {
        if (e2.length > -1) {
          if (!e2.return)
            switch (e2.type) {
              case s:
                e2.return = ne(e2.value, e2.length, i2);
                return;
              case d:
                return te([j(e2, { value: A(e2.value, "@", "@" + c) })], u2);
              case t:
                if (e2.length)
                  return N(e2.props, function(n3) {
                    switch (T(n3, /(::plac\w+|:read-\w+)/)) {
                      case ":read-only":
                      case ":read-write":
                        return te([j(e2, { props: [A(n3, /:(read-\w+)/, ":" + a + "$1")] })], u2);
                      case "::placeholder":
                        return te([j(e2, { props: [A(n3, /:(plac\w+)/, ":" + c + "input-$1")] }), j(e2, { props: [A(n3, /:(plac\w+)/, ":" + a + "$1")] }), j(e2, { props: [A(n3, /:(plac\w+)/, r + "input-$1")] })], u2);
                    }
                    return "";
                  });
            }
        }
      }
      function fe(e2) {
        switch (e2.type) {
          case t:
            e2.props = e2.props.map(function(r2) {
              return N(B(r2), function(r3, a2, c2) {
                switch (M(r3, 0)) {
                  case 12:
                    return C(r3, 1, R(r3));
                  case 0:
                  case 40:
                  case 43:
                  case 62:
                  case 126:
                    return r3;
                  case 58:
                    if (c2[++a2] === "global")
                      c2[a2] = "", c2[++a2] = "\f" + C(c2[a2], a2 = 1, -1);
                  case 32:
                    return a2 === 1 ? "" : r3;
                  default:
                    switch (a2) {
                      case 0:
                        e2 = r3;
                        return S(c2) > 1 ? "" : r3;
                      case (a2 = S(c2) - 1):
                      case 2:
                        return a2 === 2 ? r3 + e2 + e2 : r3 + e2;
                      default:
                        return r3;
                    }
                }
              });
            });
        }
      }
      e.CHARSET = f;
      e.COMMENT = n;
      e.COUNTER_STYLE = w;
      e.DECLARATION = s;
      e.DOCUMENT = h;
      e.FONT_FACE = b;
      e.FONT_FEATURE_VALUES = m;
      e.IMPORT = o;
      e.KEYFRAMES = d;
      e.LAYER = g;
      e.MEDIA = u;
      e.MOZ = a;
      e.MS = r;
      e.NAMESPACE = v;
      e.PAGE = i;
      e.RULESET = t;
      e.SUPPORTS = p;
      e.VIEWPORT = l;
      e.WEBKIT = c;
      e.abs = k;
      e.alloc = K;
      e.append = z;
      e.assign = x;
      e.caret = L;
      e.char = U;
      e.charat = M;
      e.combine = N;
      e.comment = ae;
      e.commenter = J;
      e.compile = X;
      e.copy = j;
      e.dealloc = V;
      e.declaration = ce;
      e.delimit = W;
      e.delimiter = q;
      e.escaping = Z;
      e.from = $;
      e.hash = E;
      e.identifier = Q;
      e.indexof = O;
      e.match = T;
      e.middleware = ie;
      e.namespace = fe;
      e.next = F;
      e.node = P;
      e.parse = ee;
      e.peek = I;
      e.prefix = ne;
      e.prefixer = oe;
      e.prev = _;
      e.replace = A;
      e.ruleset = re;
      e.rulesheet = ue;
      e.serialize = te;
      e.sizeof = S;
      e.slice = D;
      e.stringify = se;
      e.strlen = R;
      e.substr = C;
      e.token = Y;
      e.tokenize = B;
      e.tokenizer = H;
      e.trim = y;
      e.whitespace = G;
      Object.defineProperty(e, "__esModule", { value: true });
    });
  }
});

// node_modules/@emotion/weak-memoize/dist/emotion-weak-memoize.cjs.dev.js
var require_emotion_weak_memoize_cjs_dev = __commonJS({
  "node_modules/@emotion/weak-memoize/dist/emotion-weak-memoize.cjs.dev.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var weakMemoize = function weakMemoize2(func) {
      var cache3 = new WeakMap();
      return function(arg) {
        if (cache3.has(arg)) {
          return cache3.get(arg);
        }
        var ret = func(arg);
        cache3.set(arg, ret);
        return ret;
      };
    };
    exports["default"] = weakMemoize;
  }
});

// node_modules/@emotion/weak-memoize/dist/emotion-weak-memoize.cjs.js
var require_emotion_weak_memoize_cjs = __commonJS({
  "node_modules/@emotion/weak-memoize/dist/emotion-weak-memoize.cjs.js"(exports, module) {
    "use strict";
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_emotion_weak_memoize_cjs_dev();
    }
  }
});

// node_modules/@emotion/memoize/dist/emotion-memoize.cjs.dev.js
var require_emotion_memoize_cjs_dev = __commonJS({
  "node_modules/@emotion/memoize/dist/emotion-memoize.cjs.dev.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function memoize(fn) {
      var cache3 = Object.create(null);
      return function(arg) {
        if (cache3[arg] === void 0)
          cache3[arg] = fn(arg);
        return cache3[arg];
      };
    }
    exports["default"] = memoize;
  }
});

// node_modules/@emotion/memoize/dist/emotion-memoize.cjs.js
var require_emotion_memoize_cjs = __commonJS({
  "node_modules/@emotion/memoize/dist/emotion-memoize.cjs.js"(exports, module) {
    "use strict";
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_emotion_memoize_cjs_dev();
    }
  }
});

// node_modules/@emotion/cache/dist/emotion-cache.cjs.dev.js
var require_emotion_cache_cjs_dev = __commonJS({
  "node_modules/@emotion/cache/dist/emotion-cache.cjs.dev.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var sheet2 = require_emotion_sheet_cjs();
    var stylis = require_stylis();
    var weakMemoize = require_emotion_weak_memoize_cjs();
    var memoize = require_emotion_memoize_cjs();
    function _interopDefault(e) {
      return e && e.__esModule ? e : { "default": e };
    }
    var weakMemoize__default = /* @__PURE__ */ _interopDefault(weakMemoize);
    var memoize__default = /* @__PURE__ */ _interopDefault(memoize);
    var identifierWithPointTracking = function identifierWithPointTracking2(begin, points, index) {
      var previous = 0;
      var character = 0;
      while (true) {
        previous = character;
        character = stylis.peek();
        if (previous === 38 && character === 12) {
          points[index] = 1;
        }
        if (stylis.token(character)) {
          break;
        }
        stylis.next();
      }
      return stylis.slice(begin, stylis.position);
    };
    var toRules = function toRules2(parsed, points) {
      var index = -1;
      var character = 44;
      do {
        switch (stylis.token(character)) {
          case 0:
            if (character === 38 && stylis.peek() === 12) {
              points[index] = 1;
            }
            parsed[index] += identifierWithPointTracking(stylis.position - 1, points, index);
            break;
          case 2:
            parsed[index] += stylis.delimit(character);
            break;
          case 4:
            if (character === 44) {
              parsed[++index] = stylis.peek() === 58 ? "&\f" : "";
              points[index] = parsed[index].length;
              break;
            }
          default:
            parsed[index] += stylis.from(character);
        }
      } while (character = stylis.next());
      return parsed;
    };
    var getRules = function getRules2(value, points) {
      return stylis.dealloc(toRules(stylis.alloc(value), points));
    };
    var fixedElements = /* @__PURE__ */ new WeakMap();
    var compat = function compat2(element) {
      if (element.type !== "rule" || !element.parent || element.length < 1) {
        return;
      }
      var value = element.value, parent = element.parent;
      var isImplicitRule = element.column === parent.column && element.line === parent.line;
      while (parent.type !== "rule") {
        parent = parent.parent;
        if (!parent)
          return;
      }
      if (element.props.length === 1 && value.charCodeAt(0) !== 58 && !fixedElements.get(parent)) {
        return;
      }
      if (isImplicitRule) {
        return;
      }
      fixedElements.set(element, true);
      var points = [];
      var rules = getRules(value, points);
      var parentRules = parent.props;
      for (var i = 0, k = 0; i < rules.length; i++) {
        for (var j = 0; j < parentRules.length; j++, k++) {
          element.props[k] = points[i] ? rules[i].replace(/&\f/g, parentRules[j]) : parentRules[j] + " " + rules[i];
        }
      }
    };
    var removeLabel = function removeLabel2(element) {
      if (element.type === "decl") {
        var value = element.value;
        if (value.charCodeAt(0) === 108 && value.charCodeAt(2) === 98) {
          element["return"] = "";
          element.value = "";
        }
      }
    };
    var ignoreFlag = "emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason";
    var isIgnoringComment = function isIgnoringComment2(element) {
      return element.type === "comm" && element.children.indexOf(ignoreFlag) > -1;
    };
    var createUnsafeSelectorsAlarm = function createUnsafeSelectorsAlarm2(cache3) {
      return function(element, index, children) {
        if (element.type !== "rule" || cache3.compat)
          return;
        var unsafePseudoClasses = element.value.match(/(:first|:nth|:nth-last)-child/g);
        if (unsafePseudoClasses) {
          var isNested = !!element.parent;
          var commentContainer = isNested ? element.parent.children : children;
          for (var i = commentContainer.length - 1; i >= 0; i--) {
            var node = commentContainer[i];
            if (node.line < element.line) {
              break;
            }
            if (node.column < element.column) {
              if (isIgnoringComment(node)) {
                return;
              }
              break;
            }
          }
          unsafePseudoClasses.forEach(function(unsafePseudoClass) {
            console.error('The pseudo class "' + unsafePseudoClass + '" is potentially unsafe when doing server-side rendering. Try changing it to "' + unsafePseudoClass.split("-child")[0] + '-of-type".');
          });
        }
      };
    };
    var isImportRule = function isImportRule2(element) {
      return element.type.charCodeAt(1) === 105 && element.type.charCodeAt(0) === 64;
    };
    var isPrependedWithRegularRules = function isPrependedWithRegularRules2(index, children) {
      for (var i = index - 1; i >= 0; i--) {
        if (!isImportRule(children[i])) {
          return true;
        }
      }
      return false;
    };
    var nullifyElement = function nullifyElement2(element) {
      element.type = "";
      element.value = "";
      element["return"] = "";
      element.children = "";
      element.props = "";
    };
    var incorrectImportAlarm = function incorrectImportAlarm2(element, index, children) {
      if (!isImportRule(element)) {
        return;
      }
      if (element.parent) {
        console.error("`@import` rules can't be nested inside other rules. Please move it to the top level and put it before regular rules. Keep in mind that they can only be used within global styles.");
        nullifyElement(element);
      } else if (isPrependedWithRegularRules(index, children)) {
        console.error("`@import` rules can't be after other rules. Please put your `@import` rules before your other rules.");
        nullifyElement(element);
      }
    };
    function prefix2(value, length) {
      switch (stylis.hash(value, length)) {
        case 5103:
          return stylis.WEBKIT + "print-" + value + value;
        case 5737:
        case 4201:
        case 3177:
        case 3433:
        case 1641:
        case 4457:
        case 2921:
        case 5572:
        case 6356:
        case 5844:
        case 3191:
        case 6645:
        case 3005:
        case 6391:
        case 5879:
        case 5623:
        case 6135:
        case 4599:
        case 4855:
        case 4215:
        case 6389:
        case 5109:
        case 5365:
        case 5621:
        case 3829:
          return stylis.WEBKIT + value + value;
        case 5349:
        case 4246:
        case 4810:
        case 6968:
        case 2756:
          return stylis.WEBKIT + value + stylis.MOZ + value + stylis.MS + value + value;
        case 6828:
        case 4268:
          return stylis.WEBKIT + value + stylis.MS + value + value;
        case 6165:
          return stylis.WEBKIT + value + stylis.MS + "flex-" + value + value;
        case 5187:
          return stylis.WEBKIT + value + stylis.replace(value, /(\w+).+(:[^]+)/, stylis.WEBKIT + "box-$1$2" + stylis.MS + "flex-$1$2") + value;
        case 5443:
          return stylis.WEBKIT + value + stylis.MS + "flex-item-" + stylis.replace(value, /flex-|-self/, "") + value;
        case 4675:
          return stylis.WEBKIT + value + stylis.MS + "flex-line-pack" + stylis.replace(value, /align-content|flex-|-self/, "") + value;
        case 5548:
          return stylis.WEBKIT + value + stylis.MS + stylis.replace(value, "shrink", "negative") + value;
        case 5292:
          return stylis.WEBKIT + value + stylis.MS + stylis.replace(value, "basis", "preferred-size") + value;
        case 6060:
          return stylis.WEBKIT + "box-" + stylis.replace(value, "-grow", "") + stylis.WEBKIT + value + stylis.MS + stylis.replace(value, "grow", "positive") + value;
        case 4554:
          return stylis.WEBKIT + stylis.replace(value, /([^-])(transform)/g, "$1" + stylis.WEBKIT + "$2") + value;
        case 6187:
          return stylis.replace(stylis.replace(stylis.replace(value, /(zoom-|grab)/, stylis.WEBKIT + "$1"), /(image-set)/, stylis.WEBKIT + "$1"), value, "") + value;
        case 5495:
        case 3959:
          return stylis.replace(value, /(image-set\([^]*)/, stylis.WEBKIT + "$1$`$1");
        case 4968:
          return stylis.replace(stylis.replace(value, /(.+:)(flex-)?(.*)/, stylis.WEBKIT + "box-pack:$3" + stylis.MS + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + stylis.WEBKIT + value + value;
        case 4095:
        case 3583:
        case 4068:
        case 2532:
          return stylis.replace(value, /(.+)-inline(.+)/, stylis.WEBKIT + "$1$2") + value;
        case 8116:
        case 7059:
        case 5753:
        case 5535:
        case 5445:
        case 5701:
        case 4933:
        case 4677:
        case 5533:
        case 5789:
        case 5021:
        case 4765:
          if (stylis.strlen(value) - 1 - length > 6)
            switch (stylis.charat(value, length + 1)) {
              case 109:
                if (stylis.charat(value, length + 4) !== 45)
                  break;
              case 102:
                return stylis.replace(value, /(.+:)(.+)-([^]+)/, "$1" + stylis.WEBKIT + "$2-$3$1" + stylis.MOZ + (stylis.charat(value, length + 3) == 108 ? "$3" : "$2-$3")) + value;
              case 115:
                return ~stylis.indexof(value, "stretch") ? prefix2(stylis.replace(value, "stretch", "fill-available"), length) + value : value;
            }
          break;
        case 4949:
          if (stylis.charat(value, length + 1) !== 115)
            break;
        case 6444:
          switch (stylis.charat(value, stylis.strlen(value) - 3 - (~stylis.indexof(value, "!important") && 10))) {
            case 107:
              return stylis.replace(value, ":", ":" + stylis.WEBKIT) + value;
            case 101:
              return stylis.replace(value, /(.+:)([^;!]+)(;|!.+)?/, "$1" + stylis.WEBKIT + (stylis.charat(value, 14) === 45 ? "inline-" : "") + "box$3$1" + stylis.WEBKIT + "$2$3$1" + stylis.MS + "$2box$3") + value;
          }
          break;
        case 5936:
          switch (stylis.charat(value, length + 11)) {
            case 114:
              return stylis.WEBKIT + value + stylis.MS + stylis.replace(value, /[svh]\w+-[tblr]{2}/, "tb") + value;
            case 108:
              return stylis.WEBKIT + value + stylis.MS + stylis.replace(value, /[svh]\w+-[tblr]{2}/, "tb-rl") + value;
            case 45:
              return stylis.WEBKIT + value + stylis.MS + stylis.replace(value, /[svh]\w+-[tblr]{2}/, "lr") + value;
          }
          return stylis.WEBKIT + value + stylis.MS + value + value;
      }
      return value;
    }
    var prefixer = function prefixer2(element, index, children, callback) {
      if (element.length > -1) {
        if (!element["return"])
          switch (element.type) {
            case stylis.DECLARATION:
              element["return"] = prefix2(element.value, element.length);
              break;
            case stylis.KEYFRAMES:
              return stylis.serialize([stylis.copy(element, {
                value: stylis.replace(element.value, "@", "@" + stylis.WEBKIT)
              })], callback);
            case stylis.RULESET:
              if (element.length)
                return stylis.combine(element.props, function(value) {
                  switch (stylis.match(value, /(::plac\w+|:read-\w+)/)) {
                    case ":read-only":
                    case ":read-write":
                      return stylis.serialize([stylis.copy(element, {
                        props: [stylis.replace(value, /:(read-\w+)/, ":" + stylis.MOZ + "$1")]
                      })], callback);
                    case "::placeholder":
                      return stylis.serialize([stylis.copy(element, {
                        props: [stylis.replace(value, /:(plac\w+)/, ":" + stylis.WEBKIT + "input-$1")]
                      }), stylis.copy(element, {
                        props: [stylis.replace(value, /:(plac\w+)/, ":" + stylis.MOZ + "$1")]
                      }), stylis.copy(element, {
                        props: [stylis.replace(value, /:(plac\w+)/, stylis.MS + "input-$1")]
                      })], callback);
                  }
                  return "";
                });
          }
      }
    };
    var isBrowser = typeof document !== "undefined";
    var getServerStylisCache = isBrowser ? void 0 : weakMemoize__default["default"](function() {
      return memoize__default["default"](function() {
        var cache3 = {};
        return function(name) {
          return cache3[name];
        };
      });
    });
    var defaultStylisPlugins = [prefixer];
    var createCache = function createCache2(options) {
      var key = options.key;
      if (!key) {
        throw new Error("You have to configure `key` for your cache. Please make sure it's unique (and not equal to 'css') as it's used for linking styles to your cache.\nIf multiple caches share the same key they might \"fight\" for each other's style elements.");
      }
      if (isBrowser && key === "css") {
        var ssrStyles = document.querySelectorAll("style[data-emotion]:not([data-s])");
        Array.prototype.forEach.call(ssrStyles, function(node) {
          var dataEmotionAttribute = node.getAttribute("data-emotion");
          if (dataEmotionAttribute.indexOf(" ") === -1) {
            return;
          }
          document.head.appendChild(node);
          node.setAttribute("data-s", "");
        });
      }
      var stylisPlugins = options.stylisPlugins || defaultStylisPlugins;
      if (true) {
        if (/[^a-z-]/.test(key)) {
          throw new Error('Emotion key must only contain lower case alphabetical characters and - but "' + key + '" was passed');
        }
      }
      var inserted = {};
      var container;
      var nodesToHydrate = [];
      if (isBrowser) {
        container = options.container || document.head;
        Array.prototype.forEach.call(document.querySelectorAll('style[data-emotion^="' + key + ' "]'), function(node) {
          var attrib = node.getAttribute("data-emotion").split(" ");
          for (var i = 1; i < attrib.length; i++) {
            inserted[attrib[i]] = true;
          }
          nodesToHydrate.push(node);
        });
      }
      var _insert;
      var omnipresentPlugins = [compat, removeLabel];
      if (true) {
        omnipresentPlugins.push(createUnsafeSelectorsAlarm({
          get compat() {
            return cache3.compat;
          }
        }), incorrectImportAlarm);
      }
      if (isBrowser) {
        var currentSheet;
        var finalizingPlugins = [stylis.stringify, true ? function(element) {
          if (!element.root) {
            if (element["return"]) {
              currentSheet.insert(element["return"]);
            } else if (element.value && element.type !== stylis.COMMENT) {
              currentSheet.insert(element.value + "{}");
            }
          }
        } : stylis.rulesheet(function(rule) {
          currentSheet.insert(rule);
        })];
        var serializer = stylis.middleware(omnipresentPlugins.concat(stylisPlugins, finalizingPlugins));
        var stylis$1 = function stylis$12(styles) {
          return stylis.serialize(stylis.compile(styles), serializer);
        };
        _insert = function insert(selector, serialized, sheet3, shouldCache) {
          currentSheet = sheet3;
          if (serialized.map !== void 0) {
            currentSheet = {
              insert: function insert2(rule) {
                sheet3.insert(rule + serialized.map);
              }
            };
          }
          stylis$1(selector ? selector + "{" + serialized.styles + "}" : serialized.styles);
          if (shouldCache) {
            cache3.inserted[serialized.name] = true;
          }
        };
      } else {
        var _finalizingPlugins = [stylis.stringify];
        var _serializer = stylis.middleware(omnipresentPlugins.concat(stylisPlugins, _finalizingPlugins));
        var _stylis = function _stylis2(styles) {
          return stylis.serialize(stylis.compile(styles), _serializer);
        };
        var serverStylisCache = getServerStylisCache(stylisPlugins)(key);
        var getRules2 = function getRules3(selector, serialized) {
          var name = serialized.name;
          if (serverStylisCache[name] === void 0) {
            serverStylisCache[name] = _stylis(selector ? selector + "{" + serialized.styles + "}" : serialized.styles);
          }
          return serverStylisCache[name];
        };
        _insert = function _insert2(selector, serialized, sheet3, shouldCache) {
          var name = serialized.name;
          var rules = getRules2(selector, serialized);
          if (cache3.compat === void 0) {
            if (shouldCache) {
              cache3.inserted[name] = true;
            }
            if (serialized.map !== void 0) {
              return rules + serialized.map;
            }
            return rules;
          } else {
            if (shouldCache) {
              cache3.inserted[name] = rules;
            } else {
              return rules;
            }
          }
        };
      }
      var cache3 = {
        key,
        sheet: new sheet2.StyleSheet({
          key,
          container,
          nonce: options.nonce,
          speedy: options.speedy,
          prepend: options.prepend,
          insertionPoint: options.insertionPoint
        }),
        nonce: options.nonce,
        inserted,
        registered: {},
        insert: _insert
      };
      cache3.sheet.hydrate(nodesToHydrate);
      return cache3;
    };
    exports["default"] = createCache;
  }
});

// node_modules/@emotion/cache/dist/emotion-cache.cjs.js
var require_emotion_cache_cjs = __commonJS({
  "node_modules/@emotion/cache/dist/emotion-cache.cjs.js"(exports, module) {
    "use strict";
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_emotion_cache_cjs_dev();
    }
  }
});

// node_modules/@emotion/hash/dist/emotion-hash.cjs.dev.js
var require_emotion_hash_cjs_dev = __commonJS({
  "node_modules/@emotion/hash/dist/emotion-hash.cjs.dev.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function murmur2(str) {
      var h = 0;
      var k, i = 0, len = str.length;
      for (; len >= 4; ++i, len -= 4) {
        k = str.charCodeAt(i) & 255 | (str.charCodeAt(++i) & 255) << 8 | (str.charCodeAt(++i) & 255) << 16 | (str.charCodeAt(++i) & 255) << 24;
        k = (k & 65535) * 1540483477 + ((k >>> 16) * 59797 << 16);
        k ^= k >>> 24;
        h = (k & 65535) * 1540483477 + ((k >>> 16) * 59797 << 16) ^ (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
      }
      switch (len) {
        case 3:
          h ^= (str.charCodeAt(i + 2) & 255) << 16;
        case 2:
          h ^= (str.charCodeAt(i + 1) & 255) << 8;
        case 1:
          h ^= str.charCodeAt(i) & 255;
          h = (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
      }
      h ^= h >>> 13;
      h = (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
      return ((h ^ h >>> 15) >>> 0).toString(36);
    }
    exports["default"] = murmur2;
  }
});

// node_modules/@emotion/hash/dist/emotion-hash.cjs.js
var require_emotion_hash_cjs = __commonJS({
  "node_modules/@emotion/hash/dist/emotion-hash.cjs.js"(exports, module) {
    "use strict";
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_emotion_hash_cjs_dev();
    }
  }
});

// node_modules/@emotion/unitless/dist/emotion-unitless.cjs.dev.js
var require_emotion_unitless_cjs_dev = __commonJS({
  "node_modules/@emotion/unitless/dist/emotion-unitless.cjs.dev.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var unitlessKeys = {
      animationIterationCount: 1,
      aspectRatio: 1,
      borderImageOutset: 1,
      borderImageSlice: 1,
      borderImageWidth: 1,
      boxFlex: 1,
      boxFlexGroup: 1,
      boxOrdinalGroup: 1,
      columnCount: 1,
      columns: 1,
      flex: 1,
      flexGrow: 1,
      flexPositive: 1,
      flexShrink: 1,
      flexNegative: 1,
      flexOrder: 1,
      gridRow: 1,
      gridRowEnd: 1,
      gridRowSpan: 1,
      gridRowStart: 1,
      gridColumn: 1,
      gridColumnEnd: 1,
      gridColumnSpan: 1,
      gridColumnStart: 1,
      msGridRow: 1,
      msGridRowSpan: 1,
      msGridColumn: 1,
      msGridColumnSpan: 1,
      fontWeight: 1,
      lineHeight: 1,
      opacity: 1,
      order: 1,
      orphans: 1,
      tabSize: 1,
      widows: 1,
      zIndex: 1,
      zoom: 1,
      WebkitLineClamp: 1,
      fillOpacity: 1,
      floodOpacity: 1,
      stopOpacity: 1,
      strokeDasharray: 1,
      strokeDashoffset: 1,
      strokeMiterlimit: 1,
      strokeOpacity: 1,
      strokeWidth: 1
    };
    exports["default"] = unitlessKeys;
  }
});

// node_modules/@emotion/unitless/dist/emotion-unitless.cjs.js
var require_emotion_unitless_cjs = __commonJS({
  "node_modules/@emotion/unitless/dist/emotion-unitless.cjs.js"(exports, module) {
    "use strict";
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_emotion_unitless_cjs_dev();
    }
  }
});

// node_modules/@emotion/serialize/dist/emotion-serialize.cjs.dev.js
var require_emotion_serialize_cjs_dev = __commonJS({
  "node_modules/@emotion/serialize/dist/emotion-serialize.cjs.dev.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var hashString = require_emotion_hash_cjs();
    var unitless = require_emotion_unitless_cjs();
    var memoize = require_emotion_memoize_cjs();
    function _interopDefault(e) {
      return e && e.__esModule ? e : { "default": e };
    }
    var hashString__default = /* @__PURE__ */ _interopDefault(hashString);
    var unitless__default = /* @__PURE__ */ _interopDefault(unitless);
    var memoize__default = /* @__PURE__ */ _interopDefault(memoize);
    var ILLEGAL_ESCAPE_SEQUENCE_ERROR = `You have illegal escape sequence in your template literal, most likely inside content's property value.
Because you write your CSS inside a JavaScript string you actually have to do double escaping, so for example "content: '\\00d7';" should become "content: '\\\\00d7';".
You can read more about this here:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences`;
    var UNDEFINED_AS_OBJECT_KEY_ERROR = "You have passed in falsy value as style object's key (can happen when in example you pass unexported component as computed key).";
    var hyphenateRegex = /[A-Z]|^ms/g;
    var animationRegex = /_EMO_([^_]+?)_([^]*?)_EMO_/g;
    var isCustomProperty = function isCustomProperty2(property) {
      return property.charCodeAt(1) === 45;
    };
    var isProcessableValue = function isProcessableValue2(value) {
      return value != null && typeof value !== "boolean";
    };
    var processStyleName = /* @__PURE__ */ memoize__default["default"](function(styleName) {
      return isCustomProperty(styleName) ? styleName : styleName.replace(hyphenateRegex, "-$&").toLowerCase();
    });
    var processStyleValue = function processStyleValue2(key, value) {
      switch (key) {
        case "animation":
        case "animationName": {
          if (typeof value === "string") {
            return value.replace(animationRegex, function(match, p1, p2) {
              cursor = {
                name: p1,
                styles: p2,
                next: cursor
              };
              return p1;
            });
          }
        }
      }
      if (unitless__default["default"][key] !== 1 && !isCustomProperty(key) && typeof value === "number" && value !== 0) {
        return value + "px";
      }
      return value;
    };
    if (true) {
      contentValuePattern = /(var|attr|counters?|url|element|(((repeating-)?(linear|radial))|conic)-gradient)\(|(no-)?(open|close)-quote/;
      contentValues = ["normal", "none", "initial", "inherit", "unset"];
      oldProcessStyleValue = processStyleValue;
      msPattern = /^-ms-/;
      hyphenPattern = /-(.)/g;
      hyphenatedCache = {};
      processStyleValue = function processStyleValue2(key, value) {
        if (key === "content") {
          if (typeof value !== "string" || contentValues.indexOf(value) === -1 && !contentValuePattern.test(value) && (value.charAt(0) !== value.charAt(value.length - 1) || value.charAt(0) !== '"' && value.charAt(0) !== "'")) {
            throw new Error("You seem to be using a value for 'content' without quotes, try replacing it with `content: '\"" + value + "\"'`");
          }
        }
        var processed = oldProcessStyleValue(key, value);
        if (processed !== "" && !isCustomProperty(key) && key.indexOf("-") !== -1 && hyphenatedCache[key] === void 0) {
          hyphenatedCache[key] = true;
          console.error("Using kebab-case for css properties in objects is not supported. Did you mean " + key.replace(msPattern, "ms-").replace(hyphenPattern, function(str, _char) {
            return _char.toUpperCase();
          }) + "?");
        }
        return processed;
      };
    }
    var contentValuePattern;
    var contentValues;
    var oldProcessStyleValue;
    var msPattern;
    var hyphenPattern;
    var hyphenatedCache;
    var noComponentSelectorMessage = "Component selectors can only be used in conjunction with @emotion/babel-plugin, the swc Emotion plugin, or another Emotion-aware compiler transform.";
    function handleInterpolation(mergedProps, registered, interpolation) {
      if (interpolation == null) {
        return "";
      }
      if (interpolation.__emotion_styles !== void 0) {
        if (interpolation.toString() === "NO_COMPONENT_SELECTOR") {
          throw new Error(noComponentSelectorMessage);
        }
        return interpolation;
      }
      switch (typeof interpolation) {
        case "boolean": {
          return "";
        }
        case "object": {
          if (interpolation.anim === 1) {
            cursor = {
              name: interpolation.name,
              styles: interpolation.styles,
              next: cursor
            };
            return interpolation.name;
          }
          if (interpolation.styles !== void 0) {
            var next = interpolation.next;
            if (next !== void 0) {
              while (next !== void 0) {
                cursor = {
                  name: next.name,
                  styles: next.styles,
                  next: cursor
                };
                next = next.next;
              }
            }
            var styles = interpolation.styles + ";";
            if (interpolation.map !== void 0) {
              styles += interpolation.map;
            }
            return styles;
          }
          return createStringFromObject(mergedProps, registered, interpolation);
        }
        case "function": {
          if (mergedProps !== void 0) {
            var previousCursor = cursor;
            var result = interpolation(mergedProps);
            cursor = previousCursor;
            return handleInterpolation(mergedProps, registered, result);
          } else if (true) {
            console.error("Functions that are interpolated in css calls will be stringified.\nIf you want to have a css call based on props, create a function that returns a css call like this\nlet dynamicStyle = (props) => css`color: ${props.color}`\nIt can be called directly with props or interpolated in a styled call like this\nlet SomeComponent = styled('div')`${dynamicStyle}`");
          }
          break;
        }
        case "string":
          if (true) {
            var matched = [];
            var replaced = interpolation.replace(animationRegex, function(match, p1, p2) {
              var fakeVarName = "animation" + matched.length;
              matched.push("const " + fakeVarName + " = keyframes`" + p2.replace(/^@keyframes animation-\w+/, "") + "`");
              return "${" + fakeVarName + "}";
            });
            if (matched.length) {
              console.error("`keyframes` output got interpolated into plain string, please wrap it with `css`.\n\nInstead of doing this:\n\n" + [].concat(matched, ["`" + replaced + "`"]).join("\n") + "\n\nYou should wrap it with `css` like this:\n\n" + ("css`" + replaced + "`"));
            }
          }
          break;
      }
      if (registered == null) {
        return interpolation;
      }
      var cached = registered[interpolation];
      return cached !== void 0 ? cached : interpolation;
    }
    function createStringFromObject(mergedProps, registered, obj) {
      var string = "";
      if (Array.isArray(obj)) {
        for (var i = 0; i < obj.length; i++) {
          string += handleInterpolation(mergedProps, registered, obj[i]) + ";";
        }
      } else {
        for (var _key in obj) {
          var value = obj[_key];
          if (typeof value !== "object") {
            if (registered != null && registered[value] !== void 0) {
              string += _key + "{" + registered[value] + "}";
            } else if (isProcessableValue(value)) {
              string += processStyleName(_key) + ":" + processStyleValue(_key, value) + ";";
            }
          } else {
            if (_key === "NO_COMPONENT_SELECTOR" && true) {
              throw new Error(noComponentSelectorMessage);
            }
            if (Array.isArray(value) && typeof value[0] === "string" && (registered == null || registered[value[0]] === void 0)) {
              for (var _i = 0; _i < value.length; _i++) {
                if (isProcessableValue(value[_i])) {
                  string += processStyleName(_key) + ":" + processStyleValue(_key, value[_i]) + ";";
                }
              }
            } else {
              var interpolated = handleInterpolation(mergedProps, registered, value);
              switch (_key) {
                case "animation":
                case "animationName": {
                  string += processStyleName(_key) + ":" + interpolated + ";";
                  break;
                }
                default: {
                  if (_key === "undefined") {
                    console.error(UNDEFINED_AS_OBJECT_KEY_ERROR);
                  }
                  string += _key + "{" + interpolated + "}";
                }
              }
            }
          }
        }
      }
      return string;
    }
    var labelPattern = /label:\s*([^\s;\n{]+)\s*(;|$)/g;
    var sourceMapPattern;
    if (true) {
      sourceMapPattern = /\/\*#\ssourceMappingURL=data:application\/json;\S+\s+\*\//g;
    }
    var cursor;
    var serializeStyles = function serializeStyles2(args, registered, mergedProps) {
      if (args.length === 1 && typeof args[0] === "object" && args[0] !== null && args[0].styles !== void 0) {
        return args[0];
      }
      var stringMode = true;
      var styles = "";
      cursor = void 0;
      var strings = args[0];
      if (strings == null || strings.raw === void 0) {
        stringMode = false;
        styles += handleInterpolation(mergedProps, registered, strings);
      } else {
        if (strings[0] === void 0) {
          console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
        }
        styles += strings[0];
      }
      for (var i = 1; i < args.length; i++) {
        styles += handleInterpolation(mergedProps, registered, args[i]);
        if (stringMode) {
          if (strings[i] === void 0) {
            console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
          }
          styles += strings[i];
        }
      }
      var sourceMap;
      if (true) {
        styles = styles.replace(sourceMapPattern, function(match2) {
          sourceMap = match2;
          return "";
        });
      }
      labelPattern.lastIndex = 0;
      var identifierName = "";
      var match;
      while ((match = labelPattern.exec(styles)) !== null) {
        identifierName += "-" + match[1];
      }
      var name = hashString__default["default"](styles) + identifierName;
      if (true) {
        return {
          name,
          styles,
          map: sourceMap,
          next: cursor,
          toString: function toString2() {
            return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
          }
        };
      }
      return {
        name,
        styles,
        next: cursor
      };
    };
    exports.serializeStyles = serializeStyles;
  }
});

// node_modules/@emotion/serialize/dist/emotion-serialize.cjs.js
var require_emotion_serialize_cjs = __commonJS({
  "node_modules/@emotion/serialize/dist/emotion-serialize.cjs.js"(exports, module) {
    "use strict";
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_emotion_serialize_cjs_dev();
    }
  }
});

// node_modules/@emotion/utils/dist/emotion-utils.cjs.dev.js
var require_emotion_utils_cjs_dev = __commonJS({
  "node_modules/@emotion/utils/dist/emotion-utils.cjs.dev.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var isBrowser = typeof document !== "undefined";
    function getRegisteredStyles2(registered, registeredStyles, classNames) {
      var rawClassName = "";
      classNames.split(" ").forEach(function(className) {
        if (registered[className] !== void 0) {
          registeredStyles.push(registered[className] + ";");
        } else {
          rawClassName += className + " ";
        }
      });
      return rawClassName;
    }
    var registerStyles = function registerStyles2(cache3, serialized, isStringTag) {
      var className = cache3.key + "-" + serialized.name;
      if ((isStringTag === false || isBrowser === false && cache3.compat !== void 0) && cache3.registered[className] === void 0) {
        cache3.registered[className] = serialized.styles;
      }
    };
    var insertStyles = function insertStyles2(cache3, serialized, isStringTag) {
      registerStyles(cache3, serialized, isStringTag);
      var className = cache3.key + "-" + serialized.name;
      if (cache3.inserted[serialized.name] === void 0) {
        var stylesForSSR = "";
        var current = serialized;
        do {
          var maybeStyles = cache3.insert(serialized === current ? "." + className : "", current, cache3.sheet, true);
          if (!isBrowser && maybeStyles !== void 0) {
            stylesForSSR += maybeStyles;
          }
          current = current.next;
        } while (current !== void 0);
        if (!isBrowser && stylesForSSR.length !== 0) {
          return stylesForSSR;
        }
      }
    };
    exports.getRegisteredStyles = getRegisteredStyles2;
    exports.insertStyles = insertStyles;
    exports.registerStyles = registerStyles;
  }
});

// node_modules/@emotion/utils/dist/emotion-utils.cjs.js
var require_emotion_utils_cjs = __commonJS({
  "node_modules/@emotion/utils/dist/emotion-utils.cjs.js"(exports, module) {
    "use strict";
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_emotion_utils_cjs_dev();
    }
  }
});

// node_modules/@emotion/css/create-instance/dist/emotion-css-create-instance.cjs.dev.js
var require_emotion_css_create_instance_cjs_dev = __commonJS({
  "node_modules/@emotion/css/create-instance/dist/emotion-css-create-instance.cjs.dev.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var createCache = require_emotion_cache_cjs();
    var serialize = require_emotion_serialize_cjs();
    var utils = require_emotion_utils_cjs();
    function _interopDefault(e) {
      return e && e.__esModule ? e : { "default": e };
    }
    var createCache__default = /* @__PURE__ */ _interopDefault(createCache);
    function insertWithoutScoping(cache3, serialized) {
      if (cache3.inserted[serialized.name] === void 0) {
        return cache3.insert("", serialized, cache3.sheet, true);
      }
    }
    function merge2(registered, css2, className) {
      var registeredStyles = [];
      var rawClassName = utils.getRegisteredStyles(registered, registeredStyles, className);
      if (registeredStyles.length < 2) {
        return className;
      }
      return rawClassName + css2(registeredStyles);
    }
    var createEmotion = function createEmotion2(options) {
      var cache3 = createCache__default["default"](options);
      cache3.sheet.speedy = function(value) {
        if (this.ctr !== 0) {
          throw new Error("speedy must be changed before any rules are inserted");
        }
        this.isSpeedy = value;
      };
      cache3.compat = true;
      var css2 = function css3() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        var serialized = serialize.serializeStyles(args, cache3.registered, void 0);
        utils.insertStyles(cache3, serialized, false);
        return cache3.key + "-" + serialized.name;
      };
      var keyframes2 = function keyframes3() {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }
        var serialized = serialize.serializeStyles(args, cache3.registered);
        var animation = "animation-" + serialized.name;
        insertWithoutScoping(cache3, {
          name: serialized.name,
          styles: "@keyframes " + animation + "{" + serialized.styles + "}"
        });
        return animation;
      };
      var injectGlobal2 = function injectGlobal3() {
        for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          args[_key3] = arguments[_key3];
        }
        var serialized = serialize.serializeStyles(args, cache3.registered);
        insertWithoutScoping(cache3, serialized);
      };
      var cx2 = function cx3() {
        for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
          args[_key4] = arguments[_key4];
        }
        return merge2(cache3.registered, css2, classnames(args));
      };
      return {
        css: css2,
        cx: cx2,
        injectGlobal: injectGlobal2,
        keyframes: keyframes2,
        hydrate: function hydrate2(ids) {
          ids.forEach(function(key) {
            cache3.inserted[key] = true;
          });
        },
        flush: function flush2() {
          cache3.registered = {};
          cache3.inserted = {};
          cache3.sheet.flush();
        },
        sheet: cache3.sheet,
        cache: cache3,
        getRegisteredStyles: utils.getRegisteredStyles.bind(null, cache3.registered),
        merge: merge2.bind(null, cache3.registered, css2)
      };
    };
    var classnames = function classnames2(args) {
      var cls = "";
      for (var i = 0; i < args.length; i++) {
        var arg = args[i];
        if (arg == null)
          continue;
        var toAdd = void 0;
        switch (typeof arg) {
          case "boolean":
            break;
          case "object": {
            if (Array.isArray(arg)) {
              toAdd = classnames2(arg);
            } else {
              toAdd = "";
              for (var k in arg) {
                if (arg[k] && k) {
                  toAdd && (toAdd += " ");
                  toAdd += k;
                }
              }
            }
            break;
          }
          default: {
            toAdd = arg;
          }
        }
        if (toAdd) {
          cls && (cls += " ");
          cls += toAdd;
        }
      }
      return cls;
    };
    exports["default"] = createEmotion;
  }
});

// node_modules/@emotion/css/dist/emotion-css.cjs.dev.js
var require_emotion_css_cjs_dev = __commonJS({
  "node_modules/@emotion/css/dist/emotion-css.cjs.dev.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var createInstance_dist_emotionCssCreateInstance = require_emotion_css_create_instance_cjs_dev();
    require_emotion_cache_cjs();
    require_emotion_serialize_cjs();
    require_emotion_utils_cjs();
    var _createEmotion = createInstance_dist_emotionCssCreateInstance["default"]({
      key: "css"
    });
    var flush2 = _createEmotion.flush;
    var hydrate2 = _createEmotion.hydrate;
    var cx2 = _createEmotion.cx;
    var merge2 = _createEmotion.merge;
    var getRegisteredStyles2 = _createEmotion.getRegisteredStyles;
    var injectGlobal2 = _createEmotion.injectGlobal;
    var keyframes2 = _createEmotion.keyframes;
    var css2 = _createEmotion.css;
    var sheet2 = _createEmotion.sheet;
    var cache3 = _createEmotion.cache;
    exports.cache = cache3;
    exports.css = css2;
    exports.cx = cx2;
    exports.flush = flush2;
    exports.getRegisteredStyles = getRegisteredStyles2;
    exports.hydrate = hydrate2;
    exports.injectGlobal = injectGlobal2;
    exports.keyframes = keyframes2;
    exports.merge = merge2;
    exports.sheet = sheet2;
  }
});

// node_modules/@emotion/css/dist/emotion-css.cjs.js
var require_emotion_css_cjs = __commonJS({
  "node_modules/@emotion/css/dist/emotion-css.cjs.js"(exports, module) {
    "use strict";
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_emotion_css_cjs_dev();
    }
  }
});

// src/AnimateNumber2.tsx
import { useEffect, useRef, useState, useLayoutEffect, useMemo } from "react";
import { addPropertyControls, ControlType } from "framer";
import { gsap, springs as spring } from "./utils/gsap/gsap.js";

// node_modules/split-type/dist/index.js
(function() {
  function append() {
    var length = arguments.length;
    for (var i = 0; i < length; i++) {
      var node = i < 0 || arguments.length <= i ? void 0 : arguments[i];
      if (node.nodeType === 1 || node.nodeType === 11)
        this.appendChild(node);
      else
        this.appendChild(document.createTextNode(String(node)));
    }
  }
  function replaceChildren() {
    while (this.lastChild) {
      this.removeChild(this.lastChild);
    }
    if (arguments.length)
      this.append.apply(this, arguments);
  }
  function replaceWith() {
    var parent = this.parentNode;
    for (var _len = arguments.length, nodes = new Array(_len), _key = 0; _key < _len; _key++) {
      nodes[_key] = arguments[_key];
    }
    var i = nodes.length;
    if (!parent)
      return;
    if (!i)
      parent.removeChild(this);
    while (i--) {
      var node = nodes[i];
      if (typeof node !== "object") {
        node = this.ownerDocument.createTextNode(node);
      } else if (node.parentNode) {
        node.parentNode.removeChild(node);
      }
      if (!i) {
        parent.replaceChild(node, this);
      } else {
        parent.insertBefore(this.previousSibling, node);
      }
    }
  }
  if (typeof Element !== "undefined") {
    if (!Element.prototype.append) {
      Element.prototype.append = append;
      DocumentFragment.prototype.append = append;
    }
    if (!Element.prototype.replaceChildren) {
      Element.prototype.replaceChildren = replaceChildren;
      DocumentFragment.prototype.replaceChildren = replaceChildren;
    }
    if (!Element.prototype.replaceWith) {
      Element.prototype.replaceWith = replaceWith;
      DocumentFragment.prototype.replaceWith = replaceWith;
    }
  }
})();
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties(Constructor, staticProps);
  return Constructor;
}
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray(arr);
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr))
    return arr;
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter))
    return Array.from(iter);
}
function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr)))
    return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = void 0;
  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i)
        break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null)
        _i["return"]();
    } finally {
      if (_d)
        throw _e;
    }
  }
  return _arr;
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function extend(target, object) {
  return Object.getOwnPropertyNames(Object(target)).reduce(function(extended, key) {
    var currentValue = Object.getOwnPropertyDescriptor(Object(target), key);
    var newValue = Object.getOwnPropertyDescriptor(Object(object), key);
    return Object.defineProperty(extended, key, newValue || currentValue);
  }, {});
}
function isString(value) {
  return typeof value === "string";
}
function isArray(value) {
  return Array.isArray(value);
}
function parseSettings() {
  var settings = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  var object = extend(settings);
  var types;
  if (object.types !== void 0) {
    types = object.types;
  } else if (object.split !== void 0) {
    types = object.split;
  }
  if (types !== void 0) {
    object.types = (isString(types) || isArray(types) ? String(types) : "").split(",").map(function(type) {
      return String(type).trim();
    }).filter(function(type) {
      return /((line)|(word)|(char))/i.test(type);
    });
  }
  if (object.absolute || object.position) {
    object.absolute = object.absolute || /absolute/.test(settings.position);
  }
  return object;
}
function parseTypes(value) {
  var types = isString(value) || isArray(value) ? String(value) : "";
  return {
    none: !types,
    lines: /line/i.test(types),
    words: /word/i.test(types),
    chars: /char/i.test(types)
  };
}
function isObject(value) {
  return value !== null && typeof value === "object";
}
function isNode(input) {
  return isObject(input) && /^(1|3|11)$/.test(input.nodeType);
}
function isLength(value) {
  return typeof value === "number" && value > -1 && value % 1 === 0;
}
function isArrayLike(value) {
  return isObject(value) && isLength(value.length);
}
function toArray(value) {
  if (isArray(value))
    return value;
  if (value == null)
    return [];
  return isArrayLike(value) ? Array.prototype.slice.call(value) : [value];
}
function getTargetElements(target) {
  var elements = target;
  if (isString(target)) {
    if (/^(#[a-z]\w+)$/.test(target.trim())) {
      elements = document.getElementById(target.trim().slice(1));
    } else {
      elements = document.querySelectorAll(target);
    }
  }
  return toArray(elements).reduce(function(result, element) {
    return [].concat(_toConsumableArray(result), _toConsumableArray(toArray(element).filter(isNode)));
  }, []);
}
var entries = Object.entries;
var expando = "_splittype";
var cache = {};
var uid = 0;
function set(owner, key, value) {
  if (!isObject(owner)) {
    console.warn("[data.set] owner is not an object");
    return null;
  }
  var id = owner[expando] || (owner[expando] = ++uid);
  var data = cache[id] || (cache[id] = {});
  if (value === void 0) {
    if (!!key && Object.getPrototypeOf(key) === Object.prototype) {
      cache[id] = _objectSpread2(_objectSpread2({}, data), key);
    }
  } else if (key !== void 0) {
    data[key] = value;
  }
  return value;
}
function get(owner, key) {
  var id = isObject(owner) ? owner[expando] : null;
  var data = id && cache[id] || {};
  if (key === void 0) {
    return data;
  }
  return data[key];
}
function remove(element) {
  var id = element && element[expando];
  if (id) {
    delete element[id];
    delete cache[id];
  }
}
function clear() {
  Object.keys(cache).forEach(function(key) {
    delete cache[key];
  });
}
function cleanup() {
  entries(cache).forEach(function(_ref) {
    var _ref2 = _slicedToArray(_ref, 2), id = _ref2[0], _ref2$ = _ref2[1], isRoot = _ref2$.isRoot, isSplit = _ref2$.isSplit;
    if (!isRoot || !isSplit) {
      cache[id] = null;
      delete cache[id];
    }
  });
}
function toWords(value) {
  var separator = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : " ";
  var string = value ? String(value) : "";
  return string.trim().replace(/\s+/g, " ").split(separator);
}
var rsAstralRange = "\\ud800-\\udfff";
var rsComboMarksRange = "\\u0300-\\u036f\\ufe20-\\ufe23";
var rsComboSymbolsRange = "\\u20d0-\\u20f0";
var rsVarRange = "\\ufe0e\\ufe0f";
var rsAstral = "[".concat(rsAstralRange, "]");
var rsCombo = "[".concat(rsComboMarksRange).concat(rsComboSymbolsRange, "]");
var rsFitz = "\\ud83c[\\udffb-\\udfff]";
var rsModifier = "(?:".concat(rsCombo, "|").concat(rsFitz, ")");
var rsNonAstral = "[^".concat(rsAstralRange, "]");
var rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}";
var rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]";
var rsZWJ = "\\u200d";
var reOptMod = "".concat(rsModifier, "?");
var rsOptVar = "[".concat(rsVarRange, "]?");
var rsOptJoin = "(?:" + rsZWJ + "(?:" + [rsNonAstral, rsRegional, rsSurrPair].join("|") + ")" + rsOptVar + reOptMod + ")*";
var rsSeq = rsOptVar + reOptMod + rsOptJoin;
var rsSymbol = "(?:".concat(["".concat(rsNonAstral).concat(rsCombo, "?"), rsCombo, rsRegional, rsSurrPair, rsAstral].join("|"), "\n)");
var reUnicode = RegExp("".concat(rsFitz, "(?=").concat(rsFitz, ")|").concat(rsSymbol).concat(rsSeq), "g");
var unicodeRange = [rsZWJ, rsAstralRange, rsComboMarksRange, rsComboSymbolsRange, rsVarRange];
var reHasUnicode = RegExp("[".concat(unicodeRange.join(""), "]"));
function asciiToArray(string) {
  return string.split("");
}
function hasUnicode(string) {
  return reHasUnicode.test(string);
}
function unicodeToArray(string) {
  return string.match(reUnicode) || [];
}
function stringToArray(string) {
  return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
}
function toString(value) {
  return value == null ? "" : String(value);
}
function toChars(string) {
  var separator = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
  string = toString(string);
  if (string && isString(string)) {
    if (!separator && hasUnicode(string)) {
      return stringToArray(string);
    }
  }
  return string.split(separator);
}
function createElement(name, attributes) {
  var element = document.createElement(name);
  if (!attributes) {
    return element;
  }
  Object.keys(attributes).forEach(function(attribute) {
    var rawValue = attributes[attribute];
    var value = isString(rawValue) ? rawValue.trim() : rawValue;
    if (value === null || value === "")
      return;
    if (attribute === "children") {
      element.append.apply(element, _toConsumableArray(toArray(value)));
    } else {
      element.setAttribute(attribute, value);
    }
  });
  return element;
}
var defaults = {
  splitClass: "",
  lineClass: "line",
  wordClass: "word",
  charClass: "char",
  types: ["lines", "words", "chars"],
  absolute: false,
  tagName: "div"
};
function splitWordsAndChars(textNode, settings) {
  settings = extend(defaults, settings);
  var types = parseTypes(settings.types);
  var TAG_NAME = settings.tagName;
  var VALUE = textNode.nodeValue;
  var splitText = document.createDocumentFragment();
  var words = [];
  var chars = [];
  if (/^\s/.test(VALUE)) {
    splitText.append(" ");
  }
  words = toWords(VALUE).reduce(function(result, WORD, idx, arr) {
    var wordElement;
    var characterElementsForCurrentWord;
    if (types.chars) {
      characterElementsForCurrentWord = toChars(WORD).map(function(CHAR) {
        var characterElement = createElement(TAG_NAME, {
          "class": "".concat(settings.splitClass, " ").concat(settings.charClass),
          style: "display: inline-block;",
          children: CHAR
        });
        set(characterElement, "isChar", true);
        chars = [].concat(_toConsumableArray(chars), [characterElement]);
        return characterElement;
      });
    }
    if (types.words || types.lines) {
      wordElement = createElement(TAG_NAME, {
        "class": "".concat(settings.wordClass, " ").concat(settings.splitClass),
        style: "display: inline-block; ".concat(types.words && settings.absolute ? "position: relative;" : ""),
        children: types.chars ? characterElementsForCurrentWord : WORD
      });
      set(wordElement, {
        isWord: true,
        isWordStart: true,
        isWordEnd: true
      });
      splitText.appendChild(wordElement);
    } else {
      characterElementsForCurrentWord.forEach(function(characterElement) {
        splitText.appendChild(characterElement);
      });
    }
    if (idx < arr.length - 1) {
      splitText.append(" ");
    }
    return types.words ? result.concat(wordElement) : result;
  }, []);
  if (/\s$/.test(VALUE)) {
    splitText.append(" ");
  }
  textNode.replaceWith(splitText);
  return {
    words,
    chars
  };
}
function split(node, settings) {
  var type = node.nodeType;
  var wordsAndChars = {
    words: [],
    chars: []
  };
  if (!/(1|3|11)/.test(type)) {
    return wordsAndChars;
  }
  if (type === 3 && /\S/.test(node.nodeValue)) {
    return splitWordsAndChars(node, settings);
  }
  var childNodes = toArray(node.childNodes);
  if (childNodes.length) {
    set(node, "isSplit", true);
    if (!get(node).isRoot) {
      node.style.display = "inline-block";
      node.style.position = "relative";
      var nextSibling = node.nextSibling;
      var prevSibling = node.previousSibling;
      var text = node.textContent || "";
      var textAfter = nextSibling ? nextSibling.textContent : " ";
      var textBefore = prevSibling ? prevSibling.textContent : " ";
      set(node, {
        isWordEnd: /\s$/.test(text) || /^\s/.test(textAfter),
        isWordStart: /^\s/.test(text) || /\s$/.test(textBefore)
      });
    }
  }
  return childNodes.reduce(function(result, child) {
    var _split = split(child, settings), words = _split.words, chars = _split.chars;
    return {
      words: [].concat(_toConsumableArray(result.words), _toConsumableArray(words)),
      chars: [].concat(_toConsumableArray(result.chars), _toConsumableArray(chars))
    };
  }, wordsAndChars);
}
function getPosition(node, isWord, settings, scrollPos) {
  if (!settings.absolute) {
    return {
      top: isWord ? node.offsetTop : null
    };
  }
  var parent = node.offsetParent;
  var _scrollPos = _slicedToArray(scrollPos, 2), scrollX = _scrollPos[0], scrollY = _scrollPos[1];
  var parentX = 0;
  var parentY = 0;
  if (parent && parent !== document.body) {
    var parentRect = parent.getBoundingClientRect();
    parentX = parentRect.x + scrollX;
    parentY = parentRect.y + scrollY;
  }
  var _node$getBoundingClie = node.getBoundingClientRect(), width = _node$getBoundingClie.width, height = _node$getBoundingClie.height, x = _node$getBoundingClie.x, y = _node$getBoundingClie.y;
  var top = y + scrollY - parentY;
  var left = x + scrollX - parentX;
  return {
    width,
    height,
    top,
    left
  };
}
function unSplitWords(element) {
  if (!get(element).isWord) {
    toArray(element.children).forEach(function(child) {
      return unSplitWords(child);
    });
  } else {
    remove(element);
    element.replaceWith.apply(element, _toConsumableArray(element.childNodes));
  }
}
var createFragment = function createFragment2() {
  return document.createDocumentFragment();
};
function repositionAfterSplit(element, settings, scrollPos) {
  var types = parseTypes(settings.types);
  var TAG_NAME = settings.tagName;
  var nodes = element.getElementsByTagName("*");
  var wordsInEachLine = [];
  var wordsInCurrentLine = [];
  var lineOffsetY = null;
  var elementHeight;
  var elementWidth;
  var contentBox;
  var lines = [];
  var parent = element.parentElement;
  var nextSibling = element.nextElementSibling;
  var splitText = createFragment();
  var cs = window.getComputedStyle(element);
  var align = cs.textAlign;
  var fontSize = parseFloat(cs.fontSize);
  var lineThreshold = fontSize * 0.2;
  if (settings.absolute) {
    contentBox = {
      left: element.offsetLeft,
      top: element.offsetTop,
      width: element.offsetWidth
    };
    elementWidth = element.offsetWidth;
    elementHeight = element.offsetHeight;
    set(element, {
      cssWidth: element.style.width,
      cssHeight: element.style.height
    });
  }
  toArray(nodes).forEach(function(node) {
    var isWordLike = node.parentElement === element;
    var _getPosition = getPosition(node, isWordLike, settings, scrollPos), width = _getPosition.width, height = _getPosition.height, top = _getPosition.top, left = _getPosition.left;
    if (/^br$/i.test(node.nodeName))
      return;
    if (types.lines && isWordLike) {
      if (lineOffsetY === null || top - lineOffsetY >= lineThreshold) {
        lineOffsetY = top;
        wordsInEachLine.push(wordsInCurrentLine = []);
      }
      wordsInCurrentLine.push(node);
    }
    if (settings.absolute) {
      set(node, {
        top,
        left,
        width,
        height
      });
    }
  });
  if (parent) {
    parent.removeChild(element);
  }
  if (types.lines) {
    lines = wordsInEachLine.map(function(wordsInThisLine) {
      var lineElement = createElement(TAG_NAME, {
        "class": "".concat(settings.splitClass, " ").concat(settings.lineClass),
        style: "display: block; text-align: ".concat(align, "; width: 100%;")
      });
      set(lineElement, "isLine", true);
      var lineDimensions = {
        height: 0,
        top: 1e4
      };
      splitText.appendChild(lineElement);
      wordsInThisLine.forEach(function(wordOrElement, idx, arr) {
        var _data$get = get(wordOrElement), isWordEnd = _data$get.isWordEnd, top = _data$get.top, height = _data$get.height;
        var next = arr[idx + 1];
        lineDimensions.height = Math.max(lineDimensions.height, height);
        lineDimensions.top = Math.min(lineDimensions.top, top);
        lineElement.appendChild(wordOrElement);
        if (isWordEnd && get(next).isWordStart) {
          lineElement.append(" ");
        }
      });
      if (settings.absolute) {
        set(lineElement, {
          height: lineDimensions.height,
          top: lineDimensions.top
        });
      }
      return lineElement;
    });
    if (!types.words) {
      unSplitWords(splitText);
    }
    element.replaceChildren(splitText);
  }
  if (settings.absolute) {
    element.style.width = "".concat(element.style.width || elementWidth, "px");
    element.style.height = "".concat(elementHeight, "px");
    toArray(nodes).forEach(function(node) {
      var _data$get2 = get(node), isLine = _data$get2.isLine, top = _data$get2.top, left = _data$get2.left, width = _data$get2.width, height = _data$get2.height;
      var parentData = get(node.parentElement);
      var isChildOfLineNode = !isLine && parentData.isLine;
      node.style.top = "".concat(isChildOfLineNode ? top - parentData.top : top, "px");
      node.style.left = isLine ? "".concat(contentBox.left, "px") : "".concat(left - (isChildOfLineNode ? contentBox.left : 0), "px");
      node.style.height = "".concat(height, "px");
      node.style.width = isLine ? "".concat(contentBox.width, "px") : "".concat(width, "px");
      node.style.position = "absolute";
    });
  }
  if (parent) {
    if (nextSibling)
      parent.insertBefore(element, nextSibling);
    else
      parent.appendChild(element);
  }
  return lines;
}
var _defaults = extend(defaults, {});
var SplitType = /* @__PURE__ */ function() {
  _createClass(SplitType2, null, [{
    key: "clearData",
    value: function clearData() {
      clear();
    }
  }, {
    key: "setDefaults",
    value: function setDefaults(options) {
      _defaults = extend(_defaults, parseSettings(options));
      return defaults;
    }
  }, {
    key: "revert",
    value: function revert(elements) {
      getTargetElements(elements).forEach(function(element) {
        var _data$get = get(element), isSplit = _data$get.isSplit, html = _data$get.html, cssWidth = _data$get.cssWidth, cssHeight = _data$get.cssHeight;
        if (isSplit) {
          element.innerHTML = html;
          element.style.width = cssWidth || "";
          element.style.height = cssHeight || "";
          remove(element);
        }
      });
    }
  }, {
    key: "create",
    value: function create(target, options) {
      return new SplitType2(target, options);
    }
  }, {
    key: "data",
    get: function get2() {
      return cache;
    }
  }, {
    key: "defaults",
    get: function get2() {
      return _defaults;
    },
    set: function set2(options) {
      _defaults = extend(_defaults, parseSettings(options));
    }
  }]);
  function SplitType2(elements, options) {
    _classCallCheck(this, SplitType2);
    this.isSplit = false;
    this.settings = extend(_defaults, parseSettings(options));
    this.elements = getTargetElements(elements);
    this.split();
  }
  _createClass(SplitType2, [{
    key: "split",
    value: function split$1(options) {
      var _this = this;
      this.revert();
      this.elements.forEach(function(element) {
        set(element, "html", element.innerHTML);
      });
      this.lines = [];
      this.words = [];
      this.chars = [];
      var scrollPos = [window.pageXOffset, window.pageYOffset];
      if (options !== void 0) {
        this.settings = extend(this.settings, parseSettings(options));
      }
      var types = parseTypes(this.settings.types);
      if (types.none) {
        return;
      }
      this.elements.forEach(function(element) {
        set(element, "isRoot", true);
        var _split2 = split(element, _this.settings), words = _split2.words, chars = _split2.chars;
        _this.words = [].concat(_toConsumableArray(_this.words), _toConsumableArray(words));
        _this.chars = [].concat(_toConsumableArray(_this.chars), _toConsumableArray(chars));
      });
      this.elements.forEach(function(element) {
        if (types.lines || _this.settings.absolute) {
          var lines = repositionAfterSplit(element, _this.settings, scrollPos);
          _this.lines = [].concat(_toConsumableArray(_this.lines), _toConsumableArray(lines));
        }
      });
      this.isSplit = true;
      window.scrollTo(scrollPos[0], scrollPos[1]);
      cleanup();
    }
  }, {
    key: "revert",
    value: function revert() {
      if (this.isSplit) {
        this.lines = null;
        this.words = null;
        this.chars = null;
        this.isSplit = false;
      }
      SplitType2.revert(this.elements);
    }
  }]);
  return SplitType2;
}();

// node_modules/@emotion/css/dist/emotion-css.cjs.mjs
var import_emotion_css_cjs = __toModule(require_emotion_css_cjs());

// src/AnimateNumber2.tsx
import Stack, { stack } from "./Stack.js";
import {
  generatePositions,
  calculateSuffixPosition,
  getIndicesOfLoops,
  getStartNumsOfLoops,
  getEndNumsOfLoops,
  getResultFromArr,
  getResultFromArrFromEnd,
  getResultToArr,
  getResultToArrFromEnd,
  removeElementsByIndices,
  getDigitsArray,
  convertStringToArray,
  isToLargerThenFromWithQuestionmark,
  calculateWidth,
  getNumWidthsWhenBold,
  findSignIndices,
  addCommasToString,
  countStagger,
  countStaggerFromEnd,
  indicesOf
} from "./utils/stack-functions.js";
var fromNum = import_emotion_css_cjs.css`
  /* position: relative; */
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  label: fromNum;
`;
var toNum = import_emotion_css_cjs.css`
  /* color: red; */
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  label: toNum;
`;
var prefix = import_emotion_css_cjs.css`
  position: relative;
  display: inline-block;
  label: prefix;
`;
var suffix = import_emotion_css_cjs.css`
  position: relative;
  display: inline-block;
  label: suffix;
`;
function AnimateNumber2(props) {
  var _a, _b, _c, _d;
  const wrapperRef = useRef();
  const prefixRef = useRef();
  const suffixRef = useRef();
  const q = useMemo(() => gsap.utils.selector(wrapperRef), [wrapperRef]);
  const [state, setState] = useState(false);
  const [playLoop, setPlayLoop] = useState(false);
  const [resetLoop, setResetLoop] = useState(true);
  const [fromArr, setFromArr] = useState([]);
  const [toArr, setToArr] = useState([]);
  const [fromArrOnlyNum, setFromArrOnlyNum] = useState([]);
  const [toArrOnlyNum, setToArrOnlyNum] = useState([]);
  const [resultArrOnlyNum, setResultArrOnlyNum] = useState([]);
  const [resultFromArr, setResultFromArr] = useState([]);
  const [resultFromArrOnlyNum, setResultFromArrOnlyNum] = useState([]);
  const [resultToArr, setResultToArr] = useState([]);
  const [resultToArrOnlyNum, setResultToArrOnlyNum] = useState([]);
  const [fromPositionArr, setFromPositionArr] = useState([]);
  const [fromPositionArrOnlyNum, setFromPositionArrOnlyNum] = useState([]);
  const [endPositionArr, setEndPositionArr] = useState([]);
  const [endPositionArrOnlyNum, setEndPositionArrOnlyNum] = useState([]);
  const [suffixFromPosition, setSuffixFromPosition] = useState();
  const [suffixEndPosition, setSuffixEndPosition] = useState();
  const [loopIndices, setLoopIndices] = useState([]);
  const [loopStartNums, setLoopStartNums] = useState([]);
  const [loopEndNums, setLoopEndNums] = useState([]);
  const [toIsLargerThenFrom, setToIsLargerThenFrom] = useState();
  const tl = useRef();
  const masterTl = useRef();
  const loadingTl = useRef();
  const resetAfterLoading = useRef();
  const initialSetMotions = useRef();
  const moveFromSameCharsToEndMotion = useRef();
  const moveStacksToEndMotion = useRef();
  const handleDashMotion = useRef();
  const moveSameCommasToEndMotion = useRef();
  const showToCommasMotion = useRef();
  const hideOutCommasMotion = useRef();
  const handleDotMotion = useRef();
  const showNewStacksMotion = useRef();
  const hideOutStacksMotion = useRef();
  const moveSuffixToEndMotion = useRef();
  const movePrefixToEndMotion = useRef();
  const changeWidthMotion = useRef();
  const repositionAllWhenAlignRightMotion = useRef();
  const moveAllWhenAlignCenterMotion = useRef();
  const repositionAllWhenAlignCenterMotion = useRef();
  const from = (_a = props.from) != null ? _a : 0;
  const to = (_b = props.to) != null ? _b : 1e3;
  const rollAllDigits = (_c = props.rollAllDigits) != null ? _c : false;
  const resultToShowLoops = ["diff", "show", "hide"];
  const fontSize = (_d = props.fontSize) != null ? _d : 50;
  const numWidths = getNumWidthsWhenBold(fontSize);
  const mode = props.mode;
  const loopCount = props.mode === "custom" ? props.loopCount : 1;
  const presets = {
    quickNormal: {
      stagger: 0.035,
      hideStagger: 0.01,
      stackEasing: spring.medium,
      moveEasing: spring.quick,
      showEasing: spring.small,
      hideEasing: spring.rapid,
      expandEasing: (length) => {
        return {
          ease: "expo",
          duration: 0.5 + length * 0.02
        };
      },
      shrinkEasing: (length) => {
        return { ease: "expo", duration: 0.4 + length * 0.01 };
      }
    },
    quickBounce: {
      stagger: 0.035,
      hideStagger: 0.01,
      stackEasing: spring.bounce3,
      moveEasing: spring.quick,
      showEasing: spring.small,
      hideEasing: spring.rapid,
      expandEasing: (length) => {
        return {
          ease: "expo",
          duration: 0.4 + length * 0.02
        };
      },
      shrinkEasing: (length) => {
        return { ease: "expo", duration: 0.35 + length * 0.01 };
      }
    },
    basicNormal: {
      stagger: 0.04,
      hideStagger: 0.03,
      stackEasing: spring.basic,
      moveEasing: spring.small,
      showEasing: spring.basic,
      hideEasing: spring.rapid,
      expandEasing: (length) => {
        return {
          ease: "expo",
          duration: 0.6 + length * 0.05
        };
      },
      shrinkEasing: (length) => {
        return {
          ease: "expo",
          duration: 0.55 + length * 0.06
        };
      }
    },
    basicBounce: {
      stagger: 0.04,
      hideStagger: 0.03,
      stackEasing: spring.bounce2,
      moveEasing: spring.quick,
      showEasing: spring.small,
      hideEasing: spring.rapid,
      expandEasing: (length) => {
        return {
          ease: "expo",
          duration: 0.6 + length * 0.05
        };
      },
      shrinkEasing: (length) => {
        return {
          ease: "expo",
          duration: 0.55 + length * 0.06
        };
      }
    },
    custom: {
      stagger: 0.05,
      hideStagger: 0.04,
      stackEasing: {
        ease: "expo",
        duration: loopCount * 0.6
      },
      moveEasing: {
        ease: "expo",
        duration: loopCount * 0.6
      },
      showEasing: {
        ease: "expo",
        duration: loopCount * 0.6
      },
      hideEasing: {
        ease: "expo",
        duration: loopCount * 0.1
      },
      expandEasing: (length) => {
        return {
          ease: "expo",
          duration: 0.9 + loopCount * 0.08 + length * 0.04
        };
      },
      shrinkEasing: (length) => {
        return {
          ease: "expo",
          duration: 0.7 + loopCount * 0.02 + length * 0.1
        };
      }
    }
  };
  const delay = props.delay;
  const preset = presets[mode];
  const stagger = preset == null ? void 0 : preset.stagger;
  const hideStagger = preset == null ? void 0 : preset.hideStagger;
  const stackEasing = preset == null ? void 0 : preset.stackEasing;
  const moveEasing = preset == null ? void 0 : preset.moveEasing;
  const showEasing = preset == null ? void 0 : preset.showEasing;
  const hideEasing = preset == null ? void 0 : preset.hideEasing;
  const expandEasing = preset == null ? void 0 : preset.expandEasing;
  const shrinkEasing = preset == null ? void 0 : preset.shrinkEasing;
  const deps = [
    state,
    props.replay,
    props.loading,
    props.loadingDuration,
    props.rollAllDigits,
    props.mode,
    props.loopCount,
    props.fontSize,
    props.fontColor,
    JSON.stringify(props.from),
    JSON.stringify(props.to),
    props.from,
    props.to,
    props.prefix,
    props.suffix,
    props.align,
    props.delay,
    props.addInStaggerDelay
  ];
  const key = JSON.stringify(deps.join("-"));
  useEffect(() => {
    const toIsLargerThenFrom2 = isToLargerThenFromWithQuestionmark(from, to);
    setToIsLargerThenFrom(toIsLargerThenFrom2);
    const fromArr2 = isNaN(from) ? convertStringToArray(addCommasToString(from)) : from.toLocaleString().split("");
    const toArr2 = isNaN(to) ? convertStringToArray(addCommasToString(to)) : to.toLocaleString().split("");
    setFromArr(fromArr2);
    setToArr(toArr2);
    console.log("fromArr: ", fromArr2, ", toArr: ", toArr2);
    const fromPositionArr2 = generatePositions(fromArr2, numWidths);
    setFromPositionArr(fromPositionArr2);
    console.log("fromPositionArr: ", fromPositionArr2);
    const endPositionArr2 = generatePositions(toArr2, numWidths);
    setEndPositionArr(endPositionArr2);
    console.log("endPositionArr: ", endPositionArr2);
    const fromArrSignsIndices = findSignIndices(fromArr2);
    console.log("from etc ", fromArrSignsIndices);
    const toArrSignsIndices = findSignIndices(toArr2);
    console.log("to etc ", toArrSignsIndices);
    const fromPositionArrOnlyNum2 = removeElementsByIndices(fromPositionArr2, fromArrSignsIndices);
    setFromPositionArrOnlyNum(fromPositionArrOnlyNum2);
    console.log("fromPositionArrOnlyNum: ", fromPositionArrOnlyNum2);
    const endPositionArrOnlyNum2 = removeElementsByIndices(endPositionArr2, toArrSignsIndices);
    setEndPositionArrOnlyNum(endPositionArrOnlyNum2);
    console.log("endPositionArrOnlyNum: ", endPositionArrOnlyNum2);
    const fromArrOnlyNum2 = getDigitsArray(from);
    const toArrOnlyNum2 = getDigitsArray(to);
    setFromArrOnlyNum(fromArrOnlyNum2);
    setToArrOnlyNum(toArrOnlyNum2);
    console.log("fromArrOnlyNum: ", fromArrOnlyNum2, ", toArrOnlyNum: ", toArrOnlyNum2);
    const toIsLongerThenFrom = fromArrOnlyNum2.length < toArrOnlyNum2.length;
    let resultFromArr2 = [];
    let resultToArr2 = [];
    let resultFromArrOnlyNum2 = [];
    let resultToArrOnlyNum2 = [];
    resultFromArr2 = props.align === "right" ? getResultFromArrFromEnd(fromArr2, toArr2, rollAllDigits) : getResultFromArr(fromArr2, toArr2, rollAllDigits);
    resultToArr2 = props.align === "right" ? getResultToArrFromEnd(fromArr2, toArr2, rollAllDigits) : getResultToArr(fromArr2, toArr2, rollAllDigits);
    setResultFromArr(resultFromArr2);
    setResultToArr(resultToArr2);
    console.log("resultFromArr: ", resultFromArr2, ", resultToArr: ", resultToArr2);
    resultFromArrOnlyNum2 = props.align === "right" ? getResultFromArrFromEnd(fromArrOnlyNum2, toArrOnlyNum2, rollAllDigits) : getResultFromArr(fromArrOnlyNum2, toArrOnlyNum2, rollAllDigits);
    resultToArrOnlyNum2 = props.align === "right" ? getResultToArrFromEnd(fromArrOnlyNum2, toArrOnlyNum2, rollAllDigits) : getResultToArr(fromArrOnlyNum2, toArrOnlyNum2, rollAllDigits);
    setResultFromArrOnlyNum(resultFromArrOnlyNum2);
    setResultToArrOnlyNum(resultToArrOnlyNum2);
    console.log("resultFromArrOnlyNum: ", resultFromArrOnlyNum2, ", resultToArrOnlyNum: ", resultToArrOnlyNum2);
    const loopIndices2 = getIndicesOfLoops(toIsLongerThenFrom ? resultToArrOnlyNum2 : resultFromArrOnlyNum2, resultToShowLoops);
    setLoopIndices(loopIndices2);
    console.log("loopIndices: ", loopIndices2, ", from\uAE38\uC774 < to\uAE38\uC774: ", fromArr2.length < toArr2.length);
    const loopStartNums2 = getStartNumsOfLoops(toIsLongerThenFrom ? resultToArrOnlyNum2 : resultFromArrOnlyNum2, fromArrOnlyNum2, toArrOnlyNum2, props.align);
    setLoopStartNums(loopStartNums2);
    console.log("loopStartNums: ", loopStartNums2);
    const loopEndNums2 = getEndNumsOfLoops(toIsLongerThenFrom ? resultToArrOnlyNum2 : resultFromArrOnlyNum2, fromArrOnlyNum2, toArrOnlyNum2, props.align);
    setLoopEndNums(loopEndNums2);
    console.log("loopEndNums: ", loopEndNums2);
    const suffixFromPos = calculateSuffixPosition(fromArr2, numWidths, fromPositionArr2);
    setSuffixFromPosition(suffixFromPos);
    const suffixEndPos = calculateSuffixPosition(toArr2, numWidths, endPositionArr2);
    setSuffixEndPosition(suffixEndPos);
  }, deps);
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      var _a2, _b2, _c2, _d2, _e, _f;
      const fromValWidth = calculateWidth(isNaN(from) ? addCommasToString(from) : from.toLocaleString(), numWidths);
      const toValWidth = calculateWidth(isNaN(to) ? addCommasToString(to) : to.toLocaleString(), numWidths);
      const toHasLongerWidthThenFrom = fromValWidth < toValWidth;
      const prefixWidth = (_a2 = prefixRef.current) == null ? void 0 : _a2.clientWidth;
      const suffixWidth = (_b2 = suffixRef.current) == null ? void 0 : _b2.clientWidth;
      const fromSplit = new SplitType(q(`.${fromNum}`), { types: "chars" });
      const toSplit = new SplitType(q(`.${toNum}`), { types: "chars" });
      const fromSplitSigns = [];
      const fromSplitNumbers = [];
      const fromSplitSameNumbers = [];
      const fromSplitSameNumbersIndices = [];
      const fromSplitDiffNumbers = [];
      resultFromArr.forEach((el, i) => {
        if (el === "," || el === "." || el === "-") {
          fromSplitSigns.push(fromSplit.chars[i]);
        } else {
          fromSplitNumbers.push(fromSplit.chars[i]);
        }
      });
      resultFromArrOnlyNum.forEach((el, i) => {
        if (el === "?" || el === "\uFF1F" || !isNaN(el)) {
          fromSplitSameNumbers.push(fromSplitNumbers[i]);
          fromSplitSameNumbersIndices.push(i);
        } else {
          fromSplitDiffNumbers.push(fromSplitNumbers[i]);
        }
      });
      console.log("fromSplitSameNumbers", fromSplitSameNumbers);
      console.log("fromSplitSameNumbersIndices", fromSplitSameNumbersIndices);
      const fromHasDash = fromArr[0] === "-";
      const toHasDash = toArr[0] === "-";
      let dashResult;
      let dashTarget;
      if (fromHasDash && toHasDash) {
        dashResult = "same";
        dashTarget = fromSplit.chars[0];
      } else if (fromHasDash) {
        dashResult = "hide";
        dashTarget = fromSplit.chars[0];
      } else if (toHasDash) {
        dashResult = "show";
        dashTarget = toSplit.chars[0];
      } else {
        dashResult = "none";
      }
      console.log("dashResult: ", dashResult, ", dashTarget: ", dashTarget);
      const fromDotIndex = fromArr.indexOf(".");
      const toDotIndex = toArr.indexOf(".");
      const fromHasDot = fromDotIndex !== -1;
      const toHasDot = toDotIndex !== -1;
      console.log("fromDotIndex: ", fromDotIndex, ", toDotIndex: ", toDotIndex);
      console.log("fromHasDot: ", fromHasDot, ", toHasDot: ", toHasDot);
      let dotResult;
      let dotTarget;
      if (fromHasDot && toHasDot) {
        dotResult = "same";
        dotTarget = fromSplit.chars[fromDotIndex];
      } else if (fromHasDot) {
        dotResult = "hide";
        dotTarget = fromSplit.chars[fromDotIndex];
      } else if (toHasDot) {
        dotResult = "show";
        dotTarget = toSplit.chars[toDotIndex];
      } else {
        dotResult = "none";
      }
      console.log("dotResult: ", dotResult, ", dotTarget: ", dotTarget);
      const fromCommaIndices = props.align === "right" ? indicesOf(fromArr, ",").toReversed() : indicesOf(fromArr, ",");
      const toCommaIndices = props.align === "right" ? indicesOf(toArr, ",").toReversed() : indicesOf(toArr, ",");
      console.log("fromCommaIndices: ", fromCommaIndices, ", toCommaIndices: ", toCommaIndices);
      const fromHasMoreComma = fromCommaIndices.length > toCommaIndices.length;
      const hasMoreCommaArr = fromHasMoreComma ? fromCommaIndices : toCommaIndices;
      let sameCommaTarget = [];
      let showCommaTarget = [];
      let showCommaTargetIndices = [];
      let hideCommaTarget = [];
      let hideCommaTargetIndices = [];
      hasMoreCommaArr.forEach((n, i) => {
        if (fromCommaIndices[i] !== void 0 && toCommaIndices[i] !== void 0) {
          sameCommaTarget.push(fromSplit.chars[fromCommaIndices[i]]);
        } else if (fromCommaIndices[i] === void 0 && toCommaIndices[i] !== void 0) {
          showCommaTarget.push(toSplit.chars[toCommaIndices[i]]);
          showCommaTargetIndices.push(toCommaIndices[i]);
        } else if (fromCommaIndices[i] !== void 0 && toCommaIndices[i] === void 0) {
          hideCommaTarget.push(fromSplit.chars[fromCommaIndices[i]]);
          hideCommaTargetIndices.push(fromCommaIndices[i]);
        }
      });
      console.log("sameCommaTarget: ", sameCommaTarget, ", showCommaTarget: ", showCommaTarget, ", hideCommaTarget: ", hideCommaTarget);
      const sameStacks = [];
      const hideStacks = [];
      const showStacks = [];
      const sameStacksIndices = [];
      const hideStacksIndices = [];
      const showStacksIndices = [];
      const resultArrOnlyNum2 = resultFromArrOnlyNum.length < resultToArrOnlyNum.length ? resultToArrOnlyNum : resultFromArrOnlyNum;
      setResultArrOnlyNum(resultArrOnlyNum2);
      q(`.${stack}`).forEach((el, i) => {
        if (!isNaN(Number(resultArrOnlyNum2[loopIndices[i]])) || resultArrOnlyNum2[loopIndices[i]] === "diff") {
          sameStacks.push(el);
          sameStacksIndices.push(loopIndices[i]);
        } else if (resultArrOnlyNum2[loopIndices[i]] === "show") {
          showStacks.push(el);
          showStacksIndices.push(loopIndices[i]);
        } else if (resultArrOnlyNum2[loopIndices[i]] === "hide") {
          hideStacks.push(el);
          hideStacksIndices.push(loopIndices[i]);
        }
      });
      console.log(sameStacks, showStacks, hideStacks);
      console.log("sameStacksIndices: ", sameStacksIndices, ", showStacksIndices: ", showStacksIndices, ", hideStacksIndices: ", hideStacksIndices);
      initialSetMotions.current = gsap.timeline();
      (_c2 = initialSetMotions.current) == null ? void 0 : _c2.addLabel("start").fromTo(wrapperRef.current, { opacity: 1 }, { opacity: 1, duration: 1e-3 }, "start").set(wrapperRef.current, {
        width: prefixWidth + fromValWidth + suffixWidth
      }, "start").set(toSplit.chars, { opacity: 0 }, "start").set(fromSplitDiffNumbers, { opacity: props.loading ? 1 : 0 }, "start").set(showStacks, {
        opacity: 0,
        x: (i) => props.align === "right" && !toHasLongerWidthThenFrom ? endPositionArrOnlyNum[showStacksIndices[i]] + (fromValWidth - toValWidth) : endPositionArrOnlyNum[showStacksIndices[i]]
      }, "start").set(sameStacks, {
        opacity: props.loading ? 0 : 1,
        x: (i) => {
          return props.align === "right" && fromArrOnlyNum.length < toArrOnlyNum.length ? fromPositionArrOnlyNum[sameStacksIndices[i] - (toArrOnlyNum.length - fromArrOnlyNum.length)] : fromPositionArrOnlyNum[sameStacksIndices[i]];
        }
      }, "start").set(hideStacks, {
        opacity: props.loading ? 0 : 1,
        x: (i) => props.align === "right" && fromArrOnlyNum.length < toArrOnlyNum.length ? fromPositionArrOnlyNum[hideStacksIndices[i] - (toArrOnlyNum.length - fromArrOnlyNum.length)] : fromPositionArrOnlyNum[hideStacksIndices[i]]
      }, "start").set(suffixRef.current, {
        x: props.align === "right" ? 0 : suffixFromPosition
      }, "start");
      masterTl.current = gsap.timeline({ paused: true });
      loadingTl.current = props.loading ? gsap.timeline().to(fromSplit.chars, {
        opacity: 0.2,
        duration: 0.8,
        stagger: {
          each: 0.1,
          repeat: -1,
          ease: "none",
          yoyoEase: true
        }
      }) : null;
      resetAfterLoading.current = gsap.timeline({ defaults: { ease: "none", duration: 0.1 } }).to(fromSplit.chars, { opacity: 1 }).to(fromSplitDiffNumbers, { opacity: 0 }, 0).to(sameStacks, { opacity: 1 }, 0).to(hideStacks, { opacity: 1 }, 0);
      tl.current = gsap.timeline({
        onStart: () => {
          var _a3;
          setPlayLoop(!playLoop);
          (_a3 = loadingTl.current) == null ? void 0 : _a3.pause();
        }
      });
      moveFromSameCharsToEndMotion.current = props.align === "right" ? gsap.to(fromSplitSameNumbers, __spreadValues({
        x: (i) => endPositionArrOnlyNum[fromSplitSameNumbersIndices[i] + (toArrOnlyNum.length - fromArrOnlyNum.length)] - fromPositionArrOnlyNum[fromSplitSameNumbersIndices[i]] - (toValWidth - fromValWidth),
        delay: (i) => stagger * countStagger(resultFromArrOnlyNum, fromSplitSameNumbersIndices[i], props.align)
      }, moveEasing)) : gsap.to(fromSplitSameNumbers, __spreadValues({
        x: (i) => endPositionArrOnlyNum[fromSplitSameNumbersIndices[i]] - fromPositionArrOnlyNum[fromSplitSameNumbersIndices[i]],
        delay: (i) => stagger * countStagger(resultFromArrOnlyNum, fromSplitSameNumbersIndices[i], props.align)
      }, moveEasing));
      moveStacksToEndMotion.current = props.align === "right" ? toHasLongerWidthThenFrom ? gsap.timeline().set(sameStacks, {
        x: (i) => {
          return fromArrOnlyNum.length < toArrOnlyNum.length ? fromPositionArrOnlyNum[sameStacksIndices[i] - (toArrOnlyNum.length - fromArrOnlyNum.length)] + (toValWidth - fromValWidth) : fromPositionArrOnlyNum[sameStacksIndices[i]] + (toValWidth - fromValWidth);
        }
      }).to(sameStacks, __spreadValues({
        x: (i) => fromArrOnlyNum.length < toArrOnlyNum.length ? endPositionArrOnlyNum[sameStacksIndices[i]] : endPositionArrOnlyNum[sameStacksIndices[i] + (toArrOnlyNum.length - fromArrOnlyNum.length)],
        delay: (i) => {
          return stagger * countStagger(resultArrOnlyNum2, sameStacksIndices[i], props.align);
        }
      }, moveEasing)) : gsap.timeline().set(sameStacks, {
        x: (i) => {
          return fromArrOnlyNum.length < toArrOnlyNum.length ? fromPositionArrOnlyNum[sameStacksIndices[i] - (toArrOnlyNum.length - fromArrOnlyNum.length)] : fromPositionArrOnlyNum[sameStacksIndices[i]];
        }
      }).to(sameStacks, __spreadValues({
        x: (i) => fromArrOnlyNum.length < toArrOnlyNum.length ? endPositionArrOnlyNum[sameStacksIndices[i]] + (fromValWidth - toValWidth) : endPositionArrOnlyNum[sameStacksIndices[i] + (toArrOnlyNum.length - fromArrOnlyNum.length)] + (fromValWidth - toValWidth),
        delay: (i) => stagger * countStagger(resultArrOnlyNum2, sameStacksIndices[i], props.align)
      }, moveEasing)) : gsap.to(sameStacks, __spreadValues({
        x: (i) => endPositionArrOnlyNum[sameStacksIndices[i]],
        delay: (i) => stagger * countStagger(resultArrOnlyNum2, sameStacksIndices[i], props.align)
      }, moveEasing));
      moveSameCommasToEndMotion.current = gsap.to(sameCommaTarget, __spreadValues({
        x: (i) => props.align === "right" ? endPositionArr[toCommaIndices[i]] - fromPositionArr[fromCommaIndices[i]] - (toValWidth - fromValWidth) : endPositionArr[toCommaIndices[i]] - fromPositionArr[fromCommaIndices[i]],
        delay: (i) => props.align === "right" && hideStacks.length !== 0 ? stagger * countStagger(resultToArrOnlyNum, toCommaIndices[i], props.align) : stagger * countStagger(resultFromArrOnlyNum, fromHasDash ? fromCommaIndices[i] - 2 : fromCommaIndices[i] - 1, props.align)
      }, moveEasing));
      showToCommasMotion.current = gsap.to(showCommaTarget, __spreadProps(__spreadValues({
        opacity: 1
      }, showEasing), {
        delay: (i) => stagger * countStagger(resultToArrOnlyNum, toHasDash ? showCommaTargetIndices[i] - 2 : showCommaTargetIndices[i] - 1, props.align)
      }));
      hideOutCommasMotion.current = gsap.to(hideCommaTarget, __spreadProps(__spreadValues({
        opacity: 0
      }, hideEasing), {
        delay: (i) => (hideStacks == null ? void 0 : hideStacks.length) !== 0 ? 0 : hideStagger * countStaggerFromEnd(resultFromArrOnlyNum, hideCommaTargetIndices[i], props.align)
      }));
      handleDashMotion.current = gsap.timeline({
        delay: dashResult === "hide" && hideStacks.length !== 0 ? 0 : dashResult === "show" && props.prefix === "" ? stagger * countStagger(resultToArrOnlyNum, 0, props.align) : resultFromArrOnlyNum.length === resultToArrOnlyNum.length ? stagger * countStagger(resultFromArrOnlyNum, 0, props.align) : toHasLongerWidthThenFrom ? stagger * countStagger(resultFromArrOnlyNum, 0, props.align) : hideStacks.length === 0 ? stagger * countStagger(resultToArr, 0, props.align) : props.mode === "custom" ? loopCount * 0.02 : 0.05 + hideStacks.length * 0.01
      }).to(dashTarget, __spreadValues({
        opacity: dashResult === "hide" ? 0 : 1
      }, dashResult === "hide" ? hideEasing : showEasing)).fromTo(dashTarget, {
        x: dashResult === "show" ? props.align === "right" && props.prefix !== "" ? toValWidth - fromValWidth : 0 : 0
      }, __spreadValues({
        x: dashResult === "same" ? props.align === "right" ? -(toValWidth - fromValWidth) : 0 : 0,
        immediateRender: false
      }, toHasLongerWidthThenFrom ? (showStacks == null ? void 0 : showStacks.length) === 0 ? moveEasing : expandEasing(showStacks == null ? void 0 : showStacks.length) : (hideStacks == null ? void 0 : hideStacks.length) === 0 ? moveEasing : shrinkEasing(hideStacks == null ? void 0 : hideStacks.length)), 0);
      handleDotMotion.current = gsap.timeline({
        delay: dotResult === "hide" && hideStacks.length !== 0 ? 0 : stagger * (dotResult === "show" ? countStagger(resultToArrOnlyNum, toDotIndex, props.align) : dotResult === "hide" ? countStagger(resultFromArrOnlyNum, fromHasDash ? fromDotIndex - 2 : fromDotIndex - 1, props.align) : fromDotIndex < toDotIndex ? countStagger(resultFromArrOnlyNum, resultFromArrOnlyNum.length, props.align) : countStagger(resultToArrOnlyNum, toHasDash ? toDotIndex - 2 : toDotIndex - 1, props.align))
      }).to(dotTarget, __spreadValues({
        opacity: dotResult === "hide" ? 0 : 1
      }, dotResult === "hide" ? hideEasing : showEasing), 0).to(dotTarget, __spreadValues({
        x: dotResult === "same" ? props.align === "right" ? endPositionArr[toDotIndex] - fromPositionArr[fromDotIndex] - (toValWidth - fromValWidth) : endPositionArr[toDotIndex] - fromPositionArr[fromDotIndex] : 0
      }, fromDotIndex === toDotIndex ? moveEasing : fromDotIndex < toDotIndex ? expandEasing(showStacks == null ? void 0 : showStacks.length) : shrinkEasing(hideStacks == null ? void 0 : hideStacks.length)), 0);
      showNewStacksMotion.current = gsap.to(showStacks, __spreadProps(__spreadValues({
        opacity: 1
      }, showEasing), {
        delay: (i) => stagger * countStagger(resultToArrOnlyNum, showStacksIndices[i], props.align)
      }));
      hideOutStacksMotion.current = gsap.to(hideStacks, __spreadValues({
        opacity: 0,
        delay: (i) => hideStagger * countStaggerFromEnd(resultFromArrOnlyNum, hideStacksIndices[i], props.align)
      }, hideEasing));
      props.align === "center" ? toHasLongerWidthThenFrom ? moveAllWhenAlignCenterMotion.current = gsap.timeline().set(wrapperRef.current, {
        x: (toValWidth - fromValWidth) / 2
      }).to(wrapperRef.current, __spreadValues({
        x: 0,
        delay: resultFromArrOnlyNum.length === resultToArrOnlyNum.length ? stagger * countStagger(resultFromArrOnlyNum, resultFromArrOnlyNum.length - 1, props.align) : stagger * countStagger(resultFromArr, resultFromArr.length - 1, props.align)
      }, (showStacks == null ? void 0 : showStacks.length) === 0 ? moveEasing : expandEasing(showStacks == null ? void 0 : showStacks.length))) : moveAllWhenAlignCenterMotion.current = gsap.to(wrapperRef.current, __spreadValues({
        x: (fromValWidth - toValWidth) / 2,
        delay: resultFromArrOnlyNum.length === resultToArrOnlyNum.length ? stagger * countStagger(resultFromArrOnlyNum, resultFromArrOnlyNum.length - 1, props.align) : hideStacks.length === 0 ? stagger * countStagger(resultToArr, resultToArr.length - 1, props.align) : props.mode === "custom" ? loopCount * 0.02 : 0.05 + hideStacks.length * 0.01
      }, (hideStacks == null ? void 0 : hideStacks.length) === 0 ? moveEasing : shrinkEasing(hideStacks == null ? void 0 : hideStacks.length))) : moveAllWhenAlignCenterMotion.current = null;
      props.align === "center" ? repositionAllWhenAlignCenterMotion.current = gsap.set(wrapperRef.current, {
        x: 0
      }) : repositionAllWhenAlignCenterMotion.current = null;
      props.align === "right" ? toHasLongerWidthThenFrom ? movePrefixToEndMotion.current = gsap.timeline().set(prefixRef.current, {
        x: toValWidth - fromValWidth
      }).to(prefixRef.current, __spreadValues({
        x: 0,
        delay: resultFromArrOnlyNum.length === resultToArrOnlyNum.length ? stagger * countStagger(resultFromArrOnlyNum, 0, props.align) : stagger * countStagger(resultFromArr, 0, props.align)
      }, (showStacks == null ? void 0 : showStacks.length) === 0 ? moveEasing : expandEasing(showStacks == null ? void 0 : showStacks.length))) : movePrefixToEndMotion.current = gsap.to(prefixRef.current, __spreadValues({
        x: fromValWidth - toValWidth,
        delay: resultFromArrOnlyNum.length === resultToArrOnlyNum.length ? stagger * countStagger(resultFromArrOnlyNum, 0, props.align) : hideStacks.length === 0 ? stagger * countStagger(resultToArr, 0, props.align) : props.mode === "custom" ? loopCount * 0.02 : 0.05 + hideStacks.length * 0.01
      }, (hideStacks == null ? void 0 : hideStacks.length) === 0 ? moveEasing : shrinkEasing(hideStacks == null ? void 0 : hideStacks.length))) : movePrefixToEndMotion.current = null;
      props.align === "right" ? (repositionAllWhenAlignRightMotion.current = gsap.timeline().set(prefixRef.current, { x: 0 })).set(sameStacks, {
        x: (i) => fromArrOnlyNum.length < toArrOnlyNum.length ? endPositionArrOnlyNum[sameStacksIndices[i]] : endPositionArrOnlyNum[sameStacksIndices[i] + (toArrOnlyNum.length - fromArrOnlyNum.length)]
      }, 0).set(showStacks, {
        x: (i) => fromArrOnlyNum.length < toArrOnlyNum.length ? endPositionArrOnlyNum[showStacksIndices[i]] : endPositionArrOnlyNum[showStacksIndices[i] + (toArrOnlyNum.length - fromArrOnlyNum.length)]
      }, 0) : repositionAllWhenAlignRightMotion.current = null;
      props.align !== "right" ? moveSuffixToEndMotion.current = gsap.to(suffixRef.current, __spreadValues({
        x: suffixEndPosition,
        delay: resultFromArrOnlyNum.length === resultToArrOnlyNum.length ? stagger * countStagger(resultFromArrOnlyNum, resultFromArrOnlyNum.length - 1, props.align) : toHasLongerWidthThenFrom ? stagger * countStagger(resultFromArr, resultFromArr.length - 1, props.align) : hideStacks.length === 0 ? stagger * countStagger(resultToArr, resultToArr.length - 1, props.align) : props.mode === "custom" ? loopCount * 0.02 : 0.05 + hideStacks.length * 0.01
      }, toHasLongerWidthThenFrom ? (showStacks == null ? void 0 : showStacks.length) === 0 ? moveEasing : expandEasing(showStacks == null ? void 0 : showStacks.length) : (hideStacks == null ? void 0 : hideStacks.length) === 0 ? moveEasing : shrinkEasing(hideStacks == null ? void 0 : hideStacks.length))) : moveSuffixToEndMotion.current = null;
      changeWidthMotion.current = gsap.timeline().set(wrapperRef.current, {
        width: prefixWidth + toValWidth + suffixWidth
      });
      (_d2 = tl.current) == null ? void 0 : _d2.addLabel("start", 0.1).add(toHasLongerWidthThenFrom ? changeWidthMotion.current : null, "start").add(moveAllWhenAlignCenterMotion.current, "start").add(moveFromSameCharsToEndMotion.current, "start").add(moveStacksToEndMotion.current, "start").add(handleDashMotion.current, "start").add(handleDotMotion.current, "start").add(moveSameCommasToEndMotion.current, "start").add(showToCommasMotion.current, "start").add(hideOutCommasMotion.current, "start").add(showNewStacksMotion.current, "start").add(hideOutStacksMotion.current, "start").add(moveSuffixToEndMotion.current, "start").add(movePrefixToEndMotion.current, "start").addLabel("endMotion").add(toHasLongerWidthThenFrom ? null : changeWidthMotion.current, "endMotion").add(repositionAllWhenAlignRightMotion.current, "endMotion").add(repositionAllWhenAlignCenterMotion.current, "endMotion");
      (_e = masterTl.current) == null ? void 0 : _e.add(loadingTl.current).add(resetAfterLoading.current, props.loading ? props.loadingDuration : delay).add(tl.current);
      (_f = masterTl.current) == null ? void 0 : _f.pause(0);
    });
    return () => {
      ctx.revert();
    };
  }, deps);
  useEffect(() => {
    var _a2;
    console.log("restart");
    (_a2 = masterTl.current) == null ? void 0 : _a2.restart(true, false);
    setResetLoop(!resetLoop);
  }, deps);
  useEffect(() => {
    setState(!state);
  }, []);
  useEffect(() => {
    setResetLoop(!resetLoop);
  }, [props.align]);
  return /* @__PURE__ */ React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      justifyContent: props.align === "center" ? "center" : props.align === "left" ? "start" : "end",
      width: "100%",
      height: "100%"
    }
  }, /* @__PURE__ */ React.createElement("div", {
    onClick: () => setState(!state),
    key,
    ref: wrapperRef,
    style: {
      position: "relative",
      fontSize,
      fontWeight: "bold",
      color: props.fontColor,
      fontFamily: "Toss Product Sans",
      display: "flex"
    }
  }, props.prefix === "" ? /* @__PURE__ */ React.createElement("div", {
    ref: prefixRef,
    className: prefix
  }, props.prefix) : /* @__PURE__ */ React.createElement("div", {
    ref: prefixRef,
    className: prefix
  }, props.prefix, "\xA0"), /* @__PURE__ */ React.createElement("div", {
    className: "numbers",
    style: __spreadValues({
      position: "relative",
      display: "flex"
    }, props.align === "right" && {
      flex: 1,
      justifyContent: "end"
    })
  }, /* @__PURE__ */ React.createElement("div", {
    className: fromNum,
    style: {
      left: props.align === "right" ? "unset" : 0
    }
  }, isNaN(from) ? addCommasToString(from) : from.toLocaleString()), loopIndices == null ? void 0 : loopIndices.map((n, i) => {
    return /* @__PURE__ */ React.createElement(Stack, {
      key: i,
      play: playLoop,
      reset: resetLoop,
      startNum: loopStartNums[i],
      endNum: loopEndNums[i],
      mode: props.mode,
      loopCount,
      stackEasing,
      isHideStack: resultArrOnlyNum[n] === "hide",
      startStaggerDelay: resultArrOnlyNum[n] === "hide" ? hideStagger * countStaggerFromEnd(resultArrOnlyNum, n, props.align) : stagger * countStagger(resultArrOnlyNum, n, props.align),
      toIsLargerThenFrom
    });
  }), /* @__PURE__ */ React.createElement("div", {
    className: toNum,
    style: { left: props.align === "right" ? "unset" : 0 }
  }, isNaN(to) ? addCommasToString(to) : to.toLocaleString())), /* @__PURE__ */ React.createElement("div", {
    ref: suffixRef,
    className: suffix
  }, props.suffix), /* @__PURE__ */ React.createElement("div", {
    style: { opacity: 0, width: 0 }
  }, "0")));
}
addPropertyControls(AnimateNumber2, {
  replay: {
    type: ControlType.Boolean,
    defaultValue: true,
    enabledTitle: "\u25B6\uFE0F",
    disabledTitle: "\u25B6\uFE0F"
  },
  loading: {
    type: ControlType.Boolean,
    defaultValue: false,
    enabledTitle: "ON",
    disabledTitle: "OFF"
  },
  loadingDuration: {
    type: ControlType.Number,
    defaultValue: 3,
    step: 0.5,
    displayStepper: true
  },
  delay: {
    type: ControlType.Number,
    defaultValue: 0,
    step: 0.1,
    displayStepper: true
  },
  from: {
    type: ControlType.Number,
    defaultValue: 0,
    displayStepper: true
  },
  to: {
    type: ControlType.Number,
    defaultValue: 1e3,
    displayStepper: true,
    description: "\n"
  },
  mode: {
    type: ControlType.Enum,
    defaultValue: "basicBounce",
    options: [
      "quickNormal",
      "quickBounce",
      "basicNormal",
      "basicBounce",
      "custom"
    ],
    displaySegmentedControl: true,
    segmentedControlDirection: "vertical"
  },
  loopCount: {
    type: ControlType.Number,
    defaultValue: 3,
    min: 3,
    step: 1,
    displayStepper: true,
    hidden(props) {
      return props.mode !== "custom";
    }
  },
  rollAllDigits: {
    type: ControlType.Boolean,
    defaultValue: false
  },
  fontSize: {
    type: ControlType.Number,
    defaultValue: 24,
    step: 1,
    displayStepper: true
  },
  fontColor: {
    type: ControlType.Color,
    defaultValue: "#3182F6",
    description: "\n"
  },
  prefix: {
    type: ControlType.String,
    defaultValue: ""
  },
  suffix: {
    type: ControlType.String,
    defaultValue: ""
  },
  align: {
    type: ControlType.Enum,
    defaultValue: "left",
    options: ["left", "center", "right"],
    displaySegmentedControl: true
  }
});
export {
  AnimateNumber2
};
