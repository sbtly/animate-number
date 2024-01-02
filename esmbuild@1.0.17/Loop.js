var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
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
      var cache2 = new WeakMap();
      return function(arg) {
        if (cache2.has(arg)) {
          return cache2.get(arg);
        }
        var ret = func(arg);
        cache2.set(arg, ret);
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
      var cache2 = Object.create(null);
      return function(arg) {
        if (cache2[arg] === void 0)
          cache2[arg] = fn(arg);
        return cache2[arg];
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
    var createUnsafeSelectorsAlarm = function createUnsafeSelectorsAlarm2(cache2) {
      return function(element, index, children) {
        if (element.type !== "rule" || cache2.compat)
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
    function prefix(value, length) {
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
                return ~stylis.indexof(value, "stretch") ? prefix(stylis.replace(value, "stretch", "fill-available"), length) + value : value;
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
              element["return"] = prefix(element.value, element.length);
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
        var cache2 = {};
        return function(name) {
          return cache2[name];
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
            return cache2.compat;
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
            cache2.inserted[serialized.name] = true;
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
          if (cache2.compat === void 0) {
            if (shouldCache) {
              cache2.inserted[name] = true;
            }
            if (serialized.map !== void 0) {
              return rules + serialized.map;
            }
            return rules;
          } else {
            if (shouldCache) {
              cache2.inserted[name] = rules;
            } else {
              return rules;
            }
          }
        };
      }
      var cache2 = {
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
      cache2.sheet.hydrate(nodesToHydrate);
      return cache2;
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
          toString: function toString() {
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
    var registerStyles = function registerStyles2(cache2, serialized, isStringTag) {
      var className = cache2.key + "-" + serialized.name;
      if ((isStringTag === false || isBrowser === false && cache2.compat !== void 0) && cache2.registered[className] === void 0) {
        cache2.registered[className] = serialized.styles;
      }
    };
    var insertStyles = function insertStyles2(cache2, serialized, isStringTag) {
      registerStyles(cache2, serialized, isStringTag);
      var className = cache2.key + "-" + serialized.name;
      if (cache2.inserted[serialized.name] === void 0) {
        var stylesForSSR = "";
        var current = serialized;
        do {
          var maybeStyles = cache2.insert(serialized === current ? "." + className : "", current, cache2.sheet, true);
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
    function insertWithoutScoping(cache2, serialized) {
      if (cache2.inserted[serialized.name] === void 0) {
        return cache2.insert("", serialized, cache2.sheet, true);
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
      var cache2 = createCache__default["default"](options);
      cache2.sheet.speedy = function(value) {
        if (this.ctr !== 0) {
          throw new Error("speedy must be changed before any rules are inserted");
        }
        this.isSpeedy = value;
      };
      cache2.compat = true;
      var css2 = function css3() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        var serialized = serialize.serializeStyles(args, cache2.registered, void 0);
        utils.insertStyles(cache2, serialized, false);
        return cache2.key + "-" + serialized.name;
      };
      var keyframes2 = function keyframes3() {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }
        var serialized = serialize.serializeStyles(args, cache2.registered);
        var animation = "animation-" + serialized.name;
        insertWithoutScoping(cache2, {
          name: serialized.name,
          styles: "@keyframes " + animation + "{" + serialized.styles + "}"
        });
        return animation;
      };
      var injectGlobal2 = function injectGlobal3() {
        for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          args[_key3] = arguments[_key3];
        }
        var serialized = serialize.serializeStyles(args, cache2.registered);
        insertWithoutScoping(cache2, serialized);
      };
      var cx2 = function cx3() {
        for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
          args[_key4] = arguments[_key4];
        }
        return merge2(cache2.registered, css2, classnames(args));
      };
      return {
        css: css2,
        cx: cx2,
        injectGlobal: injectGlobal2,
        keyframes: keyframes2,
        hydrate: function hydrate2(ids) {
          ids.forEach(function(key) {
            cache2.inserted[key] = true;
          });
        },
        flush: function flush2() {
          cache2.registered = {};
          cache2.inserted = {};
          cache2.sheet.flush();
        },
        sheet: cache2.sheet,
        cache: cache2,
        getRegisteredStyles: utils.getRegisteredStyles.bind(null, cache2.registered),
        merge: merge2.bind(null, cache2.registered, css2)
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
    var cache2 = _createEmotion.cache;
    exports.cache = cache2;
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

// src/Loop.tsx
import { useEffect, useRef, useLayoutEffect, useMemo } from "react";
import { gsap } from "./utils/gsap/gsap.js";

// node_modules/@emotion/css/dist/emotion-css.cjs.mjs
var import_emotion_css_cjs = __toModule(require_emotion_css_cjs());

// src/Loop.tsx
var loopContainerStyle = import_emotion_css_cjs.css`
  position: absolute;
  display: flex;
  font-weight: bold;
  flex-direction: column;
  align-items: center;
  mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 1) 20%,
    rgba(0, 0, 0, 1) 80%,
    rgba(0, 0, 0, 0) 100%
  );
`;
var loopStyle = import_emotion_css_cjs.css`
  position: absolute;
  text-align: center;
`;
function Loop(props) {
  const animation = useRef();
  const animations = useRef([]);
  const wrapperRef = useRef();
  const q = useMemo(() => gsap.utils.selector(wrapperRef), [wrapperRef]);
  const dir = props.toIsLargerThenFrom ? "up" : "down";
  const repeatCount = 25;
  const easings = {
    slow: {
      staggerDelay: 0.18,
      duration: 0.6,
      repeatDelay: 1.2,
      ease: "out",
      y: 70
    },
    normal: {
      staggerDelay: 0.14,
      duration: 0.5,
      repeatDelay: 0.9,
      ease: "out",
      y: 100
    },
    fast: {
      staggerDelay: 0.13,
      duration: 0.4,
      repeatDelay: 0.8,
      ease: "out",
      y: 110
    },
    faster: {
      staggerDelay: 0.12,
      duration: 0.35,
      repeatDelay: 0.7,
      ease: "out",
      y: 110
    }
  };
  const preset = easings[props.preset];
  const baseNumWidths = {
    "0": 6.695,
    "1": 4.602,
    "2": 6.125,
    "3": 6.359,
    "4": 6.352,
    "5": 6.234,
    "6": 6.438,
    "7": 5.594,
    "8": 6.617,
    "9": 6.438,
    "-": 4.641,
    ",": 3.047,
    ".": 2.742,
    "?": 5.203,
    "\uFF1F": 8.656
  };
  const number1Width = 4.948 * 1.1;
  const random = props.please ? props.i % 2 === 0 ? 0 : 0.0255 : 0;
  const staggerDelay = preset.staggerDelay + random;
  const repeatDelay = preset.repeatDelay + random * 10;
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      var _a, _b;
      animation.current = gsap.timeline({
        paused: true,
        delay: props.startStaggerDelay,
        defaults: { ease: preset.ease, duration: preset.duration }
      });
      if (dir === "up") {
        q(`.${loopStyle}`).forEach((target, i) => {
          animations.current[i] = gsap.timeline({
            repeat: repeatCount,
            repeatDelay
          }).addLabel("start").fromTo(target, { rotateX: 80, y: `${preset.y}%` }, { rotateX: -80, y: `${-preset.y}%` }, "start").fromTo(target, { opacity: 0 }, { opacity: 1, duration: preset.duration / 2 }, "start").to(target, { opacity: 0, duration: preset.duration / 2 }, `start+=${preset.duration / 2}`);
        });
        (_a = animations.current) == null ? void 0 : _a.forEach((tl, i) => {
          var _a2;
          const startIndex = props.startNum === void 0 ? i : props.startNum > i ? i - props.startNum + 10 : i - props.startNum;
          (_a2 = animation.current) == null ? void 0 : _a2.add(tl, staggerDelay * startIndex);
        });
      } else {
        q(`.${loopStyle}`).forEach((target, i) => {
          animations.current[i] = gsap.timeline({
            repeat: repeatCount,
            repeatDelay
          }).addLabel("start").fromTo(target, { rotateX: -80, y: `${-preset.y}%` }, { rotateX: 80, y: `${preset.y}%` }, "start").fromTo(target, { opacity: 0 }, { opacity: 1, duration: preset.duration / 2 }, "start").to(target, { opacity: 0, duration: preset.duration / 2 }, `start+=${preset.duration / 2}`);
        });
        (_b = animations.current) == null ? void 0 : _b.toReversed().forEach((tl, i) => {
          var _a2;
          const startIndex = props.startNum === void 0 ? i : props.startNum > i ? i - props.startNum + 10 : i - props.startNum;
          (_a2 = animation.current) == null ? void 0 : _a2.add(tl, staggerDelay * startIndex);
        });
      }
    });
    return () => {
      ctx.revert();
    };
  }, [props.startNum, props.startStaggerDelay, dir, preset, staggerDelay, repeatDelay]);
  useEffect(() => {
    var _a;
    (_a = animation.current) == null ? void 0 : _a.restart(true, false);
  }, [props.play]);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    className: loopContainerStyle,
    style: __spreadValues({
      fontSize: props.fontSize,
      fontFamily: "Toss Product Sans"
    }, props.style),
    ref: wrapperRef
  }, /* @__PURE__ */ React.createElement("div", {
    className: loopStyle
  }, "0"), /* @__PURE__ */ React.createElement("div", {
    className: loopStyle
  }, "1"), /* @__PURE__ */ React.createElement("div", {
    className: loopStyle
  }, "2"), /* @__PURE__ */ React.createElement("div", {
    className: loopStyle
  }, "3"), /* @__PURE__ */ React.createElement("div", {
    className: loopStyle
  }, "4"), /* @__PURE__ */ React.createElement("div", {
    className: loopStyle
  }, "5"), /* @__PURE__ */ React.createElement("div", {
    className: loopStyle
  }, "6"), /* @__PURE__ */ React.createElement("div", {
    className: loopStyle
  }, "7"), /* @__PURE__ */ React.createElement("div", {
    className: loopStyle
  }, "8"), /* @__PURE__ */ React.createElement("div", {
    className: loopStyle
  }, "9"), /* @__PURE__ */ React.createElement("span", {
    style: {
      background: "lime",
      opacity: 0,
      paddingTop: "10%",
      paddingBottom: "10%",
      position: "relative"
    }
  }, "0")));
}
export {
  Loop as default
};
