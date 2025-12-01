import Oe from "path";
import to from "tty";
import qn from "fs";
import no from "dotenv";
import ct from "child_process";
import ro from "os";
const so = "1.51.1", oo = "@dotenvx/dotenvx", io = "a secure dotenv–from the creator of `dotenv`", co = {
  version: so,
  name: oo,
  description: io
};
var ht, jn;
function ao() {
  if (jn) return ht;
  jn = 1;
  const { name: e, version: o, description: f } = co;
  return ht = { name: e, version: o, description: f }, ht;
}
var yt, Gn;
function uo() {
  if (Gn) return yt;
  Gn = 1;
  const { WriteStream: e } = to;
  return yt = { getColorDepth: () => {
    try {
      return e.prototype.getColorDepth();
    } catch {
      const h = process.env.TERM;
      return h && (h.includes("256color") || h.includes("xterm")) ? 8 : 4;
    }
  } }, yt;
}
var pt, Yn;
function Hs() {
  if (Yn) return pt;
  Yn = 1;
  const e = uo(), o = /* @__PURE__ */ new Map([
    ["blue", 34],
    ["gray", 37],
    ["green", 32],
    ["olive", 33],
    ["orangered", 31],
    // mapped to red
    ["plum", 35],
    // mapped to magenta
    ["red", 31],
    ["electricblue", 36],
    ["dodgerblue", 36]
  ]), f = /* @__PURE__ */ new Map([
    ["blue", 21],
    ["gray", 244],
    ["green", 34],
    ["olive", 142],
    ["orangered", 202],
    ["plum", 182],
    ["red", 196],
    ["electricblue", 45],
    ["dodgerblue", 33]
  ]);
  function h(r) {
    const c = e.getColorDepth();
    if (!f.has(r))
      throw new Error(`Invalid color ${r}`);
    if (c >= 8) {
      const p = f.get(r);
      return (A) => `\x1B[38;5;${p}m${A}\x1B[39m`;
    }
    if (c >= 4) {
      const p = o.get(r);
      return (A) => `\x1B[${p}m${A}\x1B[39m`;
    }
    return (p) => p;
  }
  function v(r) {
    return e.getColorDepth() >= 4 ? `\x1B[1m${r}\x1B[22m` : r;
  }
  return pt = {
    getColor: h,
    bold: v
  }, pt;
}
var gt, Zn;
function at() {
  if (Zn) return gt;
  Zn = 1;
  const e = ao(), { getColor: o, bold: f } = Hs(), h = {
    error: 0,
    warn: 1,
    success: 2,
    successv: 2,
    info: 2,
    help: 2,
    verbose: 4,
    debug: 5,
    silly: 6
  }, v = (B) => f(o("red")(B)), r = o("orangered"), c = o("green"), p = o("olive"), A = o("dodgerblue"), K = o("plum"), H = o("plum");
  let N = h.info, _ = "dotenvx", R = e.version;
  function m(B, x) {
    const U = w(B, x);
    console.error(U);
  }
  function S(B, x) {
    if (h[B] === void 0)
      throw new Error(`MISSING_LOG_LEVEL: '${B}'. implement in logger.`);
    if (h[B] <= N) {
      const U = w(B, x);
      console.log(U);
    }
  }
  function w(B, x) {
    const U = typeof x == "object" ? JSON.stringify(x) : x;
    switch (B.toLowerCase()) {
      // errors
      case "error":
        return v(U);
      // warns
      case "warn":
        return r(U);
      // successes
      case "success":
        return c(U);
      case "successv":
        return p(`[${_}@${R}] ${U}`);
      // info
      case "info":
        return U;
      // help
      case "help":
        return A(U);
      // verbose
      case "verbose":
        return K(U);
      // debug
      case "debug":
        return H(U);
    }
  }
  const T = {
    // track level
    level: "info",
    // errors
    error: (B) => m("error", B),
    // warns
    warn: (B) => S("warn", B),
    // success
    success: (B) => S("success", B),
    successv: (B) => S("successv", B),
    // info
    info: (B) => S("info", B),
    // help
    help: (B) => S("help", B),
    // verbose
    verbose: (B) => S("verbose", B),
    // debug
    debug: (B) => S("debug", B),
    setLevel: (B) => {
      h[B] !== void 0 && (N = h[B], T.level = B);
    },
    setName: (B) => {
      _ = B, T.name = B;
    },
    setVersion: (B) => {
      R = B, T.version = B;
    }
  };
  function M(B) {
    const x = B.debug ? "debug" : B.verbose ? "verbose" : B.quiet ? "error" : B.logLevel;
    x && (T.setLevel(x), (!B.quiet || B.quiet && x !== "error") && T.debug(`Setting log level to ${x}`));
  }
  function D(B) {
    const x = B.logName;
    x && T.setName(x);
  }
  function j(B) {
    const x = B.logVersion;
    x && T.setVersion(x);
  }
  return gt = {
    logger: T,
    getColor: o,
    setLogLevel: M,
    setLogName: D,
    setLogVersion: j,
    levels: h
  }, gt;
}
var vt = {}, bt = {}, mt, Xn;
function ut() {
  if (Xn) return mt;
  Xn = 1;
  const e = "\\\\/", o = `[^${e}]`, f = "\\.", h = "\\+", v = "\\?", r = "\\/", c = "(?=.)", p = "[^/]", A = `(?:${r}|$)`, K = `(?:^|${r})`, H = `${f}{1,2}${A}`, N = `(?!${f})`, _ = `(?!${K}${H})`, R = `(?!${f}{0,1}${A})`, m = `(?!${H})`, S = `[^.${r}]`, w = `${p}*?`, M = {
    DOT_LITERAL: f,
    PLUS_LITERAL: h,
    QMARK_LITERAL: v,
    SLASH_LITERAL: r,
    ONE_CHAR: c,
    QMARK: p,
    END_ANCHOR: A,
    DOTS_SLASH: H,
    NO_DOT: N,
    NO_DOTS: _,
    NO_DOT_SLASH: R,
    NO_DOTS_SLASH: m,
    QMARK_NO_DOT: S,
    STAR: w,
    START_ANCHOR: K,
    SEP: "/"
  }, D = {
    ...M,
    SLASH_LITERAL: `[${e}]`,
    QMARK: o,
    STAR: `${o}*?`,
    DOTS_SLASH: `${f}{1,2}(?:[${e}]|$)`,
    NO_DOT: `(?!${f})`,
    NO_DOTS: `(?!(?:^|[${e}])${f}{1,2}(?:[${e}]|$))`,
    NO_DOT_SLASH: `(?!${f}{0,1}(?:[${e}]|$))`,
    NO_DOTS_SLASH: `(?!${f}{1,2}(?:[${e}]|$))`,
    QMARK_NO_DOT: `[^.${e}]`,
    START_ANCHOR: `(?:^|[${e}])`,
    END_ANCHOR: `(?:[${e}]|$)`,
    SEP: "\\"
  }, j = {
    alnum: "a-zA-Z0-9",
    alpha: "a-zA-Z",
    ascii: "\\x00-\\x7F",
    blank: " \\t",
    cntrl: "\\x00-\\x1F\\x7F",
    digit: "0-9",
    graph: "\\x21-\\x7E",
    lower: "a-z",
    print: "\\x20-\\x7E ",
    punct: "\\-!\"#$%&'()\\*+,./:;<=>?@[\\]^_`{|}~",
    space: " \\t\\r\\n\\v\\f",
    upper: "A-Z",
    word: "A-Za-z0-9_",
    xdigit: "A-Fa-f0-9"
  };
  return mt = {
    MAX_LENGTH: 1024 * 64,
    POSIX_REGEX_SOURCE: j,
    // regular expressions
    REGEX_BACKSLASH: /\\(?![*+?^${}(|)[\]])/g,
    REGEX_NON_SPECIAL_CHARS: /^[^@![\].,$*+?^{}()|\\/]+/,
    REGEX_SPECIAL_CHARS: /[-*+?.^${}(|)[\]]/,
    REGEX_SPECIAL_CHARS_BACKREF: /(\\?)((\W)(\3*))/g,
    REGEX_SPECIAL_CHARS_GLOBAL: /([-*+?.^${}(|)[\]])/g,
    REGEX_REMOVE_BACKSLASH: /(?:\[.*?[^\\]\]|\\(?=.))/g,
    // Replace globs with equivalent patterns to reduce parsing time.
    REPLACEMENTS: {
      __proto__: null,
      "***": "*",
      "**/**": "**",
      "**/**/**": "**"
    },
    // Digits
    CHAR_0: 48,
    /* 0 */
    CHAR_9: 57,
    /* 9 */
    // Alphabet chars.
    CHAR_UPPERCASE_A: 65,
    /* A */
    CHAR_LOWERCASE_A: 97,
    /* a */
    CHAR_UPPERCASE_Z: 90,
    /* Z */
    CHAR_LOWERCASE_Z: 122,
    /* z */
    CHAR_LEFT_PARENTHESES: 40,
    /* ( */
    CHAR_RIGHT_PARENTHESES: 41,
    /* ) */
    CHAR_ASTERISK: 42,
    /* * */
    // Non-alphabetic chars.
    CHAR_AMPERSAND: 38,
    /* & */
    CHAR_AT: 64,
    /* @ */
    CHAR_BACKWARD_SLASH: 92,
    /* \ */
    CHAR_CARRIAGE_RETURN: 13,
    /* \r */
    CHAR_CIRCUMFLEX_ACCENT: 94,
    /* ^ */
    CHAR_COLON: 58,
    /* : */
    CHAR_COMMA: 44,
    /* , */
    CHAR_DOT: 46,
    /* . */
    CHAR_DOUBLE_QUOTE: 34,
    /* " */
    CHAR_EQUAL: 61,
    /* = */
    CHAR_EXCLAMATION_MARK: 33,
    /* ! */
    CHAR_FORM_FEED: 12,
    /* \f */
    CHAR_FORWARD_SLASH: 47,
    /* / */
    CHAR_GRAVE_ACCENT: 96,
    /* ` */
    CHAR_HASH: 35,
    /* # */
    CHAR_HYPHEN_MINUS: 45,
    /* - */
    CHAR_LEFT_ANGLE_BRACKET: 60,
    /* < */
    CHAR_LEFT_CURLY_BRACE: 123,
    /* { */
    CHAR_LEFT_SQUARE_BRACKET: 91,
    /* [ */
    CHAR_LINE_FEED: 10,
    /* \n */
    CHAR_NO_BREAK_SPACE: 160,
    /* \u00A0 */
    CHAR_PERCENT: 37,
    /* % */
    CHAR_PLUS: 43,
    /* + */
    CHAR_QUESTION_MARK: 63,
    /* ? */
    CHAR_RIGHT_ANGLE_BRACKET: 62,
    /* > */
    CHAR_RIGHT_CURLY_BRACE: 125,
    /* } */
    CHAR_RIGHT_SQUARE_BRACKET: 93,
    /* ] */
    CHAR_SEMICOLON: 59,
    /* ; */
    CHAR_SINGLE_QUOTE: 39,
    /* ' */
    CHAR_SPACE: 32,
    /*   */
    CHAR_TAB: 9,
    /* \t */
    CHAR_UNDERSCORE: 95,
    /* _ */
    CHAR_VERTICAL_LINE: 124,
    /* | */
    CHAR_ZERO_WIDTH_NOBREAK_SPACE: 65279,
    /* \uFEFF */
    /**
     * Create EXTGLOB_CHARS
     */
    extglobChars(B) {
      return {
        "!": { type: "negate", open: "(?:(?!(?:", close: `))${B.STAR})` },
        "?": { type: "qmark", open: "(?:", close: ")?" },
        "+": { type: "plus", open: "(?:", close: ")+" },
        "*": { type: "star", open: "(?:", close: ")*" },
        "@": { type: "at", open: "(?:", close: ")" }
      };
    },
    /**
     * Create GLOB_CHARS
     */
    globChars(B) {
      return B === !0 ? D : M;
    }
  }, mt;
}
var Wn;
function lt() {
  return Wn || (Wn = 1, (function(e) {
    const {
      REGEX_BACKSLASH: o,
      REGEX_REMOVE_BACKSLASH: f,
      REGEX_SPECIAL_CHARS: h,
      REGEX_SPECIAL_CHARS_GLOBAL: v
    } = /* @__PURE__ */ ut();
    e.isObject = (r) => r !== null && typeof r == "object" && !Array.isArray(r), e.hasRegexChars = (r) => h.test(r), e.isRegexChar = (r) => r.length === 1 && e.hasRegexChars(r), e.escapeRegex = (r) => r.replace(v, "\\$1"), e.toPosixSlashes = (r) => r.replace(o, "/"), e.isWindows = () => {
      if (typeof navigator < "u" && navigator.platform) {
        const r = navigator.platform.toLowerCase();
        return r === "win32" || r === "windows";
      }
      return typeof process < "u" && process.platform ? process.platform === "win32" : !1;
    }, e.removeBackslashes = (r) => r.replace(f, (c) => c === "\\" ? "" : c), e.escapeLast = (r, c, p) => {
      const A = r.lastIndexOf(c, p);
      return A === -1 ? r : r[A - 1] === "\\" ? e.escapeLast(r, c, A - 1) : `${r.slice(0, A)}\\${r.slice(A)}`;
    }, e.removePrefix = (r, c = {}) => {
      let p = r;
      return p.startsWith("./") && (p = p.slice(2), c.prefix = "./"), p;
    }, e.wrapOutput = (r, c = {}, p = {}) => {
      const A = p.contains ? "" : "^", K = p.contains ? "" : "$";
      let H = `${A}(?:${r})${K}`;
      return c.negated === !0 && (H = `(?:^(?!${H}).*$)`), H;
    }, e.basename = (r, { windows: c } = {}) => {
      const p = r.split(c ? /[\\/]/ : "/"), A = p[p.length - 1];
      return A === "" ? p[p.length - 2] : A;
    };
  })(bt)), bt;
}
var Et, zn;
function lo() {
  if (zn) return Et;
  zn = 1;
  const e = /* @__PURE__ */ lt(), {
    CHAR_ASTERISK: o,
    /* * */
    CHAR_AT: f,
    /* @ */
    CHAR_BACKWARD_SLASH: h,
    /* \ */
    CHAR_COMMA: v,
    /* , */
    CHAR_DOT: r,
    /* . */
    CHAR_EXCLAMATION_MARK: c,
    /* ! */
    CHAR_FORWARD_SLASH: p,
    /* / */
    CHAR_LEFT_CURLY_BRACE: A,
    /* { */
    CHAR_LEFT_PARENTHESES: K,
    /* ( */
    CHAR_LEFT_SQUARE_BRACKET: H,
    /* [ */
    CHAR_PLUS: N,
    /* + */
    CHAR_QUESTION_MARK: _,
    /* ? */
    CHAR_RIGHT_CURLY_BRACE: R,
    /* } */
    CHAR_RIGHT_PARENTHESES: m,
    /* ) */
    CHAR_RIGHT_SQUARE_BRACKET: S
    /* ] */
  } = /* @__PURE__ */ ut(), w = (D) => D === p || D === h, T = (D) => {
    D.isPrefix !== !0 && (D.depth = D.isGlobstar ? 1 / 0 : 1);
  };
  return Et = (D, j) => {
    const B = j || {}, x = D.length - 1, U = B.parts === !0 || B.scanToEnd === !0, $ = [], F = [], V = [];
    let W = D, z = -1, k = 0, Z = 0, d = !1, b = !1, l = !1, i = !1, g = !1, y = !1, t = !1, s = !1, a = !1, n = !1, u = 0, O, C, E = { value: "", depth: 0, isGlob: !1 };
    const I = () => z >= x, L = () => W.charCodeAt(z + 1), q = () => (O = C, W.charCodeAt(++z));
    for (; z < x; ) {
      C = q();
      let ne;
      if (C === h) {
        t = E.backslashes = !0, C = q(), C === A && (y = !0);
        continue;
      }
      if (y === !0 || C === A) {
        for (u++; I() !== !0 && (C = q()); ) {
          if (C === h) {
            t = E.backslashes = !0, q();
            continue;
          }
          if (C === A) {
            u++;
            continue;
          }
          if (y !== !0 && C === r && (C = q()) === r) {
            if (d = E.isBrace = !0, l = E.isGlob = !0, n = !0, U === !0)
              continue;
            break;
          }
          if (y !== !0 && C === v) {
            if (d = E.isBrace = !0, l = E.isGlob = !0, n = !0, U === !0)
              continue;
            break;
          }
          if (C === R && (u--, u === 0)) {
            y = !1, d = E.isBrace = !0, n = !0;
            break;
          }
        }
        if (U === !0)
          continue;
        break;
      }
      if (C === p) {
        if ($.push(z), F.push(E), E = { value: "", depth: 0, isGlob: !1 }, n === !0) continue;
        if (O === r && z === k + 1) {
          k += 2;
          continue;
        }
        Z = z + 1;
        continue;
      }
      if (B.noext !== !0 && (C === N || C === f || C === o || C === _ || C === c) === !0 && L() === K) {
        if (l = E.isGlob = !0, i = E.isExtglob = !0, n = !0, C === c && z === k && (a = !0), U === !0) {
          for (; I() !== !0 && (C = q()); ) {
            if (C === h) {
              t = E.backslashes = !0, C = q();
              continue;
            }
            if (C === m) {
              l = E.isGlob = !0, n = !0;
              break;
            }
          }
          continue;
        }
        break;
      }
      if (C === o) {
        if (O === o && (g = E.isGlobstar = !0), l = E.isGlob = !0, n = !0, U === !0)
          continue;
        break;
      }
      if (C === _) {
        if (l = E.isGlob = !0, n = !0, U === !0)
          continue;
        break;
      }
      if (C === H) {
        for (; I() !== !0 && (ne = q()); ) {
          if (ne === h) {
            t = E.backslashes = !0, q();
            continue;
          }
          if (ne === S) {
            b = E.isBracket = !0, l = E.isGlob = !0, n = !0;
            break;
          }
        }
        if (U === !0)
          continue;
        break;
      }
      if (B.nonegate !== !0 && C === c && z === k) {
        s = E.negated = !0, k++;
        continue;
      }
      if (B.noparen !== !0 && C === K) {
        if (l = E.isGlob = !0, U === !0) {
          for (; I() !== !0 && (C = q()); ) {
            if (C === K) {
              t = E.backslashes = !0, C = q();
              continue;
            }
            if (C === m) {
              n = !0;
              break;
            }
          }
          continue;
        }
        break;
      }
      if (l === !0) {
        if (n = !0, U === !0)
          continue;
        break;
      }
    }
    B.noext === !0 && (i = !1, l = !1);
    let X = W, P = "", G = "";
    k > 0 && (P = W.slice(0, k), W = W.slice(k), Z -= k), X && l === !0 && Z > 0 ? (X = W.slice(0, Z), G = W.slice(Z)) : l === !0 ? (X = "", G = W) : X = W, X && X !== "" && X !== "/" && X !== W && w(X.charCodeAt(X.length - 1)) && (X = X.slice(0, -1)), B.unescape === !0 && (G && (G = e.removeBackslashes(G)), X && t === !0 && (X = e.removeBackslashes(X)));
    const ee = {
      prefix: P,
      input: D,
      start: k,
      base: X,
      glob: G,
      isBrace: d,
      isBracket: b,
      isGlob: l,
      isExtglob: i,
      isGlobstar: g,
      negated: s,
      negatedExtglob: a
    };
    if (B.tokens === !0 && (ee.maxDepth = 0, w(C) || F.push(E), ee.tokens = F), B.parts === !0 || B.tokens === !0) {
      let ne;
      for (let se = 0; se < $.length; se++) {
        const J = ne ? ne + 1 : k, ce = $[se], Q = D.slice(J, ce);
        B.tokens && (se === 0 && k !== 0 ? (F[se].isPrefix = !0, F[se].value = P) : F[se].value = Q, T(F[se]), ee.maxDepth += F[se].depth), (se !== 0 || Q !== "") && V.push(Q), ne = ce;
      }
      if (ne && ne + 1 < D.length) {
        const se = D.slice(ne + 1);
        V.push(se), B.tokens && (F[F.length - 1].value = se, T(F[F.length - 1]), ee.maxDepth += F[F.length - 1].depth);
      }
      ee.slashes = $, ee.parts = V;
    }
    return ee;
  }, Et;
}
var _t, $n;
function fo() {
  if ($n) return _t;
  $n = 1;
  const e = /* @__PURE__ */ ut(), o = /* @__PURE__ */ lt(), {
    MAX_LENGTH: f,
    POSIX_REGEX_SOURCE: h,
    REGEX_NON_SPECIAL_CHARS: v,
    REGEX_SPECIAL_CHARS_BACKREF: r,
    REPLACEMENTS: c
  } = e, p = (H, N) => {
    if (typeof N.expandRange == "function")
      return N.expandRange(...H, N);
    H.sort();
    const _ = `[${H.join("-")}]`;
    try {
      new RegExp(_);
    } catch {
      return H.map((m) => o.escapeRegex(m)).join("..");
    }
    return _;
  }, A = (H, N) => `Missing ${H}: "${N}" - use "\\\\${N}" to match literal characters`, K = (H, N) => {
    if (typeof H != "string")
      throw new TypeError("Expected a string");
    H = c[H] || H;
    const _ = { ...N }, R = typeof _.maxLength == "number" ? Math.min(f, _.maxLength) : f;
    let m = H.length;
    if (m > R)
      throw new SyntaxError(`Input length: ${m}, exceeds maximum allowed length: ${R}`);
    const S = { type: "bos", value: "", output: _.prepend || "" }, w = [S], T = _.capture ? "" : "?:", M = e.globChars(_.windows), D = e.extglobChars(M), {
      DOT_LITERAL: j,
      PLUS_LITERAL: B,
      SLASH_LITERAL: x,
      ONE_CHAR: U,
      DOTS_SLASH: $,
      NO_DOT: F,
      NO_DOT_SLASH: V,
      NO_DOTS_SLASH: W,
      QMARK: z,
      QMARK_NO_DOT: k,
      STAR: Z,
      START_ANCHOR: d
    } = M, b = (J) => `(${T}(?:(?!${d}${J.dot ? $ : j}).)*?)`, l = _.dot ? "" : F, i = _.dot ? z : k;
    let g = _.bash === !0 ? b(_) : Z;
    _.capture && (g = `(${g})`), typeof _.noext == "boolean" && (_.noextglob = _.noext);
    const y = {
      input: H,
      index: -1,
      start: 0,
      dot: _.dot === !0,
      consumed: "",
      output: "",
      prefix: "",
      backtrack: !1,
      negated: !1,
      brackets: 0,
      braces: 0,
      parens: 0,
      quotes: 0,
      globstar: !1,
      tokens: w
    };
    H = o.removePrefix(H, y), m = H.length;
    const t = [], s = [], a = [];
    let n = S, u;
    const O = () => y.index === m - 1, C = y.peek = (J = 1) => H[y.index + J], E = y.advance = () => H[++y.index] || "", I = () => H.slice(y.index + 1), L = (J = "", ce = 0) => {
      y.consumed += J, y.index += ce;
    }, q = (J) => {
      y.output += J.output != null ? J.output : J.value, L(J.value);
    }, X = () => {
      let J = 1;
      for (; C() === "!" && (C(2) !== "(" || C(3) === "?"); )
        E(), y.start++, J++;
      return J % 2 === 0 ? !1 : (y.negated = !0, y.start++, !0);
    }, P = (J) => {
      y[J]++, a.push(J);
    }, G = (J) => {
      y[J]--, a.pop();
    }, ee = (J) => {
      if (n.type === "globstar") {
        const ce = y.braces > 0 && (J.type === "comma" || J.type === "brace"), Q = J.extglob === !0 || t.length && (J.type === "pipe" || J.type === "paren");
        J.type !== "slash" && J.type !== "paren" && !ce && !Q && (y.output = y.output.slice(0, -n.output.length), n.type = "star", n.value = "*", n.output = g, y.output += n.output);
      }
      if (t.length && J.type !== "paren" && (t[t.length - 1].inner += J.value), (J.value || J.output) && q(J), n && n.type === "text" && J.type === "text") {
        n.output = (n.output || n.value) + J.value, n.value += J.value;
        return;
      }
      J.prev = n, w.push(J), n = J;
    }, ne = (J, ce) => {
      const Q = { ...D[ce], conditions: 1, inner: "" };
      Q.prev = n, Q.parens = y.parens, Q.output = y.output;
      const de = (_.capture ? "(" : "") + Q.open;
      P("parens"), ee({ type: J, value: ce, output: y.output ? "" : U }), ee({ type: "paren", extglob: !0, value: E(), output: de }), t.push(Q);
    }, se = (J) => {
      let ce = J.close + (_.capture ? ")" : ""), Q;
      if (J.type === "negate") {
        let de = g;
        if (J.inner && J.inner.length > 1 && J.inner.includes("/") && (de = b(_)), (de !== g || O() || /^\)+$/.test(I())) && (ce = J.close = `)$))${de}`), J.inner.includes("*") && (Q = I()) && /^\.[^\\/.]+$/.test(Q)) {
          const he = K(Q, { ...N, fastpaths: !1 }).output;
          ce = J.close = `)${he})${de})`;
        }
        J.prev.type === "bos" && (y.negatedExtglob = !0);
      }
      ee({ type: "paren", extglob: !0, value: u, output: ce }), G("parens");
    };
    if (_.fastpaths !== !1 && !/(^[*!]|[/()[\]{}"])/.test(H)) {
      let J = !1, ce = H.replace(r, (Q, de, he, le, re, ie) => le === "\\" ? (J = !0, Q) : le === "?" ? de ? de + le + (re ? z.repeat(re.length) : "") : ie === 0 ? i + (re ? z.repeat(re.length) : "") : z.repeat(he.length) : le === "." ? j.repeat(he.length) : le === "*" ? de ? de + le + (re ? g : "") : g : de ? Q : `\\${Q}`);
      return J === !0 && (_.unescape === !0 ? ce = ce.replace(/\\/g, "") : ce = ce.replace(/\\+/g, (Q) => Q.length % 2 === 0 ? "\\\\" : Q ? "\\" : "")), ce === H && _.contains === !0 ? (y.output = H, y) : (y.output = o.wrapOutput(ce, y, N), y);
    }
    for (; !O(); ) {
      if (u = E(), u === "\0")
        continue;
      if (u === "\\") {
        const Q = C();
        if (Q === "/" && _.bash !== !0 || Q === "." || Q === ";")
          continue;
        if (!Q) {
          u += "\\", ee({ type: "text", value: u });
          continue;
        }
        const de = /^\\+/.exec(I());
        let he = 0;
        if (de && de[0].length > 2 && (he = de[0].length, y.index += he, he % 2 !== 0 && (u += "\\")), _.unescape === !0 ? u = E() : u += E(), y.brackets === 0) {
          ee({ type: "text", value: u });
          continue;
        }
      }
      if (y.brackets > 0 && (u !== "]" || n.value === "[" || n.value === "[^")) {
        if (_.posix !== !1 && u === ":") {
          const Q = n.value.slice(1);
          if (Q.includes("[") && (n.posix = !0, Q.includes(":"))) {
            const de = n.value.lastIndexOf("["), he = n.value.slice(0, de), le = n.value.slice(de + 2), re = h[le];
            if (re) {
              n.value = he + re, y.backtrack = !0, E(), !S.output && w.indexOf(n) === 1 && (S.output = U);
              continue;
            }
          }
        }
        (u === "[" && C() !== ":" || u === "-" && C() === "]") && (u = `\\${u}`), u === "]" && (n.value === "[" || n.value === "[^") && (u = `\\${u}`), _.posix === !0 && u === "!" && n.value === "[" && (u = "^"), n.value += u, q({ value: u });
        continue;
      }
      if (y.quotes === 1 && u !== '"') {
        u = o.escapeRegex(u), n.value += u, q({ value: u });
        continue;
      }
      if (u === '"') {
        y.quotes = y.quotes === 1 ? 0 : 1, _.keepQuotes === !0 && ee({ type: "text", value: u });
        continue;
      }
      if (u === "(") {
        P("parens"), ee({ type: "paren", value: u });
        continue;
      }
      if (u === ")") {
        if (y.parens === 0 && _.strictBrackets === !0)
          throw new SyntaxError(A("opening", "("));
        const Q = t[t.length - 1];
        if (Q && y.parens === Q.parens + 1) {
          se(t.pop());
          continue;
        }
        ee({ type: "paren", value: u, output: y.parens ? ")" : "\\)" }), G("parens");
        continue;
      }
      if (u === "[") {
        if (_.nobracket === !0 || !I().includes("]")) {
          if (_.nobracket !== !0 && _.strictBrackets === !0)
            throw new SyntaxError(A("closing", "]"));
          u = `\\${u}`;
        } else
          P("brackets");
        ee({ type: "bracket", value: u });
        continue;
      }
      if (u === "]") {
        if (_.nobracket === !0 || n && n.type === "bracket" && n.value.length === 1) {
          ee({ type: "text", value: u, output: `\\${u}` });
          continue;
        }
        if (y.brackets === 0) {
          if (_.strictBrackets === !0)
            throw new SyntaxError(A("opening", "["));
          ee({ type: "text", value: u, output: `\\${u}` });
          continue;
        }
        G("brackets");
        const Q = n.value.slice(1);
        if (n.posix !== !0 && Q[0] === "^" && !Q.includes("/") && (u = `/${u}`), n.value += u, q({ value: u }), _.literalBrackets === !1 || o.hasRegexChars(Q))
          continue;
        const de = o.escapeRegex(n.value);
        if (y.output = y.output.slice(0, -n.value.length), _.literalBrackets === !0) {
          y.output += de, n.value = de;
          continue;
        }
        n.value = `(${T}${de}|${n.value})`, y.output += n.value;
        continue;
      }
      if (u === "{" && _.nobrace !== !0) {
        P("braces");
        const Q = {
          type: "brace",
          value: u,
          output: "(",
          outputIndex: y.output.length,
          tokensIndex: y.tokens.length
        };
        s.push(Q), ee(Q);
        continue;
      }
      if (u === "}") {
        const Q = s[s.length - 1];
        if (_.nobrace === !0 || !Q) {
          ee({ type: "text", value: u, output: u });
          continue;
        }
        let de = ")";
        if (Q.dots === !0) {
          const he = w.slice(), le = [];
          for (let re = he.length - 1; re >= 0 && (w.pop(), he[re].type !== "brace"); re--)
            he[re].type !== "dots" && le.unshift(he[re].value);
          de = p(le, _), y.backtrack = !0;
        }
        if (Q.comma !== !0 && Q.dots !== !0) {
          const he = y.output.slice(0, Q.outputIndex), le = y.tokens.slice(Q.tokensIndex);
          Q.value = Q.output = "\\{", u = de = "\\}", y.output = he;
          for (const re of le)
            y.output += re.output || re.value;
        }
        ee({ type: "brace", value: u, output: de }), G("braces"), s.pop();
        continue;
      }
      if (u === "|") {
        t.length > 0 && t[t.length - 1].conditions++, ee({ type: "text", value: u });
        continue;
      }
      if (u === ",") {
        let Q = u;
        const de = s[s.length - 1];
        de && a[a.length - 1] === "braces" && (de.comma = !0, Q = "|"), ee({ type: "comma", value: u, output: Q });
        continue;
      }
      if (u === "/") {
        if (n.type === "dot" && y.index === y.start + 1) {
          y.start = y.index + 1, y.consumed = "", y.output = "", w.pop(), n = S;
          continue;
        }
        ee({ type: "slash", value: u, output: x });
        continue;
      }
      if (u === ".") {
        if (y.braces > 0 && n.type === "dot") {
          n.value === "." && (n.output = j);
          const Q = s[s.length - 1];
          n.type = "dots", n.output += u, n.value += u, Q.dots = !0;
          continue;
        }
        if (y.braces + y.parens === 0 && n.type !== "bos" && n.type !== "slash") {
          ee({ type: "text", value: u, output: j });
          continue;
        }
        ee({ type: "dot", value: u, output: j });
        continue;
      }
      if (u === "?") {
        if (!(n && n.value === "(") && _.noextglob !== !0 && C() === "(" && C(2) !== "?") {
          ne("qmark", u);
          continue;
        }
        if (n && n.type === "paren") {
          const de = C();
          let he = u;
          (n.value === "(" && !/[!=<:]/.test(de) || de === "<" && !/<([!=]|\w+>)/.test(I())) && (he = `\\${u}`), ee({ type: "text", value: u, output: he });
          continue;
        }
        if (_.dot !== !0 && (n.type === "slash" || n.type === "bos")) {
          ee({ type: "qmark", value: u, output: k });
          continue;
        }
        ee({ type: "qmark", value: u, output: z });
        continue;
      }
      if (u === "!") {
        if (_.noextglob !== !0 && C() === "(" && (C(2) !== "?" || !/[!=<:]/.test(C(3)))) {
          ne("negate", u);
          continue;
        }
        if (_.nonegate !== !0 && y.index === 0) {
          X();
          continue;
        }
      }
      if (u === "+") {
        if (_.noextglob !== !0 && C() === "(" && C(2) !== "?") {
          ne("plus", u);
          continue;
        }
        if (n && n.value === "(" || _.regex === !1) {
          ee({ type: "plus", value: u, output: B });
          continue;
        }
        if (n && (n.type === "bracket" || n.type === "paren" || n.type === "brace") || y.parens > 0) {
          ee({ type: "plus", value: u });
          continue;
        }
        ee({ type: "plus", value: B });
        continue;
      }
      if (u === "@") {
        if (_.noextglob !== !0 && C() === "(" && C(2) !== "?") {
          ee({ type: "at", extglob: !0, value: u, output: "" });
          continue;
        }
        ee({ type: "text", value: u });
        continue;
      }
      if (u !== "*") {
        (u === "$" || u === "^") && (u = `\\${u}`);
        const Q = v.exec(I());
        Q && (u += Q[0], y.index += Q[0].length), ee({ type: "text", value: u });
        continue;
      }
      if (n && (n.type === "globstar" || n.star === !0)) {
        n.type = "star", n.star = !0, n.value += u, n.output = g, y.backtrack = !0, y.globstar = !0, L(u);
        continue;
      }
      let J = I();
      if (_.noextglob !== !0 && /^\([^?]/.test(J)) {
        ne("star", u);
        continue;
      }
      if (n.type === "star") {
        if (_.noglobstar === !0) {
          L(u);
          continue;
        }
        const Q = n.prev, de = Q.prev, he = Q.type === "slash" || Q.type === "bos", le = de && (de.type === "star" || de.type === "globstar");
        if (_.bash === !0 && (!he || J[0] && J[0] !== "/")) {
          ee({ type: "star", value: u, output: "" });
          continue;
        }
        const re = y.braces > 0 && (Q.type === "comma" || Q.type === "brace"), ie = t.length && (Q.type === "pipe" || Q.type === "paren");
        if (!he && Q.type !== "paren" && !re && !ie) {
          ee({ type: "star", value: u, output: "" });
          continue;
        }
        for (; J.slice(0, 3) === "/**"; ) {
          const oe = H[y.index + 4];
          if (oe && oe !== "/")
            break;
          J = J.slice(3), L("/**", 3);
        }
        if (Q.type === "bos" && O()) {
          n.type = "globstar", n.value += u, n.output = b(_), y.output = n.output, y.globstar = !0, L(u);
          continue;
        }
        if (Q.type === "slash" && Q.prev.type !== "bos" && !le && O()) {
          y.output = y.output.slice(0, -(Q.output + n.output).length), Q.output = `(?:${Q.output}`, n.type = "globstar", n.output = b(_) + (_.strictSlashes ? ")" : "|$)"), n.value += u, y.globstar = !0, y.output += Q.output + n.output, L(u);
          continue;
        }
        if (Q.type === "slash" && Q.prev.type !== "bos" && J[0] === "/") {
          const oe = J[1] !== void 0 ? "|$" : "";
          y.output = y.output.slice(0, -(Q.output + n.output).length), Q.output = `(?:${Q.output}`, n.type = "globstar", n.output = `${b(_)}${x}|${x}${oe})`, n.value += u, y.output += Q.output + n.output, y.globstar = !0, L(u + E()), ee({ type: "slash", value: "/", output: "" });
          continue;
        }
        if (Q.type === "bos" && J[0] === "/") {
          n.type = "globstar", n.value += u, n.output = `(?:^|${x}|${b(_)}${x})`, y.output = n.output, y.globstar = !0, L(u + E()), ee({ type: "slash", value: "/", output: "" });
          continue;
        }
        y.output = y.output.slice(0, -n.output.length), n.type = "globstar", n.output = b(_), n.value += u, y.output += n.output, y.globstar = !0, L(u);
        continue;
      }
      const ce = { type: "star", value: u, output: g };
      if (_.bash === !0) {
        ce.output = ".*?", (n.type === "bos" || n.type === "slash") && (ce.output = l + ce.output), ee(ce);
        continue;
      }
      if (n && (n.type === "bracket" || n.type === "paren") && _.regex === !0) {
        ce.output = u, ee(ce);
        continue;
      }
      (y.index === y.start || n.type === "slash" || n.type === "dot") && (n.type === "dot" ? (y.output += V, n.output += V) : _.dot === !0 ? (y.output += W, n.output += W) : (y.output += l, n.output += l), C() !== "*" && (y.output += U, n.output += U)), ee(ce);
    }
    for (; y.brackets > 0; ) {
      if (_.strictBrackets === !0) throw new SyntaxError(A("closing", "]"));
      y.output = o.escapeLast(y.output, "["), G("brackets");
    }
    for (; y.parens > 0; ) {
      if (_.strictBrackets === !0) throw new SyntaxError(A("closing", ")"));
      y.output = o.escapeLast(y.output, "("), G("parens");
    }
    for (; y.braces > 0; ) {
      if (_.strictBrackets === !0) throw new SyntaxError(A("closing", "}"));
      y.output = o.escapeLast(y.output, "{"), G("braces");
    }
    if (_.strictSlashes !== !0 && (n.type === "star" || n.type === "bracket") && ee({ type: "maybe_slash", value: "", output: `${x}?` }), y.backtrack === !0) {
      y.output = "";
      for (const J of y.tokens)
        y.output += J.output != null ? J.output : J.value, J.suffix && (y.output += J.suffix);
    }
    return y;
  };
  return K.fastpaths = (H, N) => {
    const _ = { ...N }, R = typeof _.maxLength == "number" ? Math.min(f, _.maxLength) : f, m = H.length;
    if (m > R)
      throw new SyntaxError(`Input length: ${m}, exceeds maximum allowed length: ${R}`);
    H = c[H] || H;
    const {
      DOT_LITERAL: S,
      SLASH_LITERAL: w,
      ONE_CHAR: T,
      DOTS_SLASH: M,
      NO_DOT: D,
      NO_DOTS: j,
      NO_DOTS_SLASH: B,
      STAR: x,
      START_ANCHOR: U
    } = e.globChars(_.windows), $ = _.dot ? j : D, F = _.dot ? B : D, V = _.capture ? "" : "?:", W = { negated: !1, prefix: "" };
    let z = _.bash === !0 ? ".*?" : x;
    _.capture && (z = `(${z})`);
    const k = (l) => l.noglobstar === !0 ? z : `(${V}(?:(?!${U}${l.dot ? M : S}).)*?)`, Z = (l) => {
      switch (l) {
        case "*":
          return `${$}${T}${z}`;
        case ".*":
          return `${S}${T}${z}`;
        case "*.*":
          return `${$}${z}${S}${T}${z}`;
        case "*/*":
          return `${$}${z}${w}${T}${F}${z}`;
        case "**":
          return $ + k(_);
        case "**/*":
          return `(?:${$}${k(_)}${w})?${F}${T}${z}`;
        case "**/*.*":
          return `(?:${$}${k(_)}${w})?${F}${z}${S}${T}${z}`;
        case "**/.*":
          return `(?:${$}${k(_)}${w})?${S}${T}${z}`;
        default: {
          const i = /^(.*?)\.(\w+)$/.exec(l);
          if (!i) return;
          const g = Z(i[1]);
          return g ? g + S + i[2] : void 0;
        }
      }
    }, d = o.removePrefix(H, W);
    let b = Z(d);
    return b && _.strictSlashes !== !0 && (b += `${w}?`), b;
  }, _t = K, _t;
}
var wt, Qn;
function ho() {
  if (Qn) return wt;
  Qn = 1;
  const e = /* @__PURE__ */ lo(), o = /* @__PURE__ */ fo(), f = /* @__PURE__ */ lt(), h = /* @__PURE__ */ ut(), v = (c) => c && typeof c == "object" && !Array.isArray(c), r = (c, p, A = !1) => {
    if (Array.isArray(c)) {
      const w = c.map((M) => r(M, p, A));
      return (M) => {
        for (const D of w) {
          const j = D(M);
          if (j) return j;
        }
        return !1;
      };
    }
    const K = v(c) && c.tokens && c.input;
    if (c === "" || typeof c != "string" && !K)
      throw new TypeError("Expected pattern to be a non-empty string");
    const H = p || {}, N = H.windows, _ = K ? r.compileRe(c, p) : r.makeRe(c, p, !1, !0), R = _.state;
    delete _.state;
    let m = () => !1;
    if (H.ignore) {
      const w = { ...p, ignore: null, onMatch: null, onResult: null };
      m = r(H.ignore, w, A);
    }
    const S = (w, T = !1) => {
      const { isMatch: M, match: D, output: j } = r.test(w, _, p, { glob: c, posix: N }), B = { glob: c, state: R, regex: _, posix: N, input: w, output: j, match: D, isMatch: M };
      return typeof H.onResult == "function" && H.onResult(B), M === !1 ? (B.isMatch = !1, T ? B : !1) : m(w) ? (typeof H.onIgnore == "function" && H.onIgnore(B), B.isMatch = !1, T ? B : !1) : (typeof H.onMatch == "function" && H.onMatch(B), T ? B : !0);
    };
    return A && (S.state = R), S;
  };
  return r.test = (c, p, A, { glob: K, posix: H } = {}) => {
    if (typeof c != "string")
      throw new TypeError("Expected input to be a string");
    if (c === "")
      return { isMatch: !1, output: "" };
    const N = A || {}, _ = N.format || (H ? f.toPosixSlashes : null);
    let R = c === K, m = R && _ ? _(c) : c;
    return R === !1 && (m = _ ? _(c) : c, R = m === K), (R === !1 || N.capture === !0) && (N.matchBase === !0 || N.basename === !0 ? R = r.matchBase(c, p, A, H) : R = p.exec(m)), { isMatch: !!R, match: R, output: m };
  }, r.matchBase = (c, p, A) => (p instanceof RegExp ? p : r.makeRe(p, A)).test(f.basename(c)), r.isMatch = (c, p, A) => r(p, A)(c), r.parse = (c, p) => Array.isArray(c) ? c.map((A) => r.parse(A, p)) : o(c, { ...p, fastpaths: !1 }), r.scan = (c, p) => e(c, p), r.compileRe = (c, p, A = !1, K = !1) => {
    if (A === !0)
      return c.output;
    const H = p || {}, N = H.contains ? "" : "^", _ = H.contains ? "" : "$";
    let R = `${N}(?:${c.output})${_}`;
    c && c.negated === !0 && (R = `^(?!${R}).*$`);
    const m = r.toRegex(R, p);
    return K === !0 && (m.state = c), m;
  }, r.makeRe = (c, p = {}, A = !1, K = !1) => {
    if (!c || typeof c != "string")
      throw new TypeError("Expected a non-empty string");
    let H = { negated: !1, fastpaths: !0 };
    return p.fastpaths !== !1 && (c[0] === "." || c[0] === "*") && (H.output = o.fastpaths(c, p)), H.output || (H = o(c, p)), r.compileRe(H, p, A, K);
  }, r.toRegex = (c, p) => {
    try {
      const A = p || {};
      return new RegExp(c, A.flags || (A.nocase ? "i" : ""));
    } catch (A) {
      if (p && p.debug === !0) throw A;
      return /$^/;
    }
  }, r.constants = h, wt = r, wt;
}
var St, Jn;
function Ns() {
  if (Jn) return St;
  Jn = 1;
  const e = /* @__PURE__ */ ho(), o = /* @__PURE__ */ lt();
  function f(h, v, r = !1) {
    return v && (v.windows === null || v.windows === void 0) && (v = { ...v, windows: o.isWindows() }), e(h, v, r);
  }
  return Object.assign(f, e), St = f, St;
}
var er;
function yo() {
  if (er) return vt;
  er = 1;
  var e = Object.create, o = Object.defineProperty, f = Object.getOwnPropertyDescriptor, h = Object.getOwnPropertyNames, v = Object.getPrototypeOf, r = Object.prototype.hasOwnProperty, c = (Y, te, ae, ue) => {
    if (te && typeof te == "object" || typeof te == "function") for (var ye = h(te), me = 0, _e = ye.length, we; me < _e; me++)
      we = ye[me], !r.call(Y, we) && we !== ae && o(Y, we, {
        get: ((Se) => te[Se]).bind(null, we),
        enumerable: !(ue = f(te, we)) || ue.enumerable
      });
    return Y;
  }, p = (Y, te, ae) => (ae = Y != null ? e(v(Y)) : {}, c(!Y || !Y.__esModule ? o(ae, "default", {
    value: Y,
    enumerable: !0
  }) : ae, Y));
  const A = p(Oe), K = p(qn);
  function H(Y) {
    let te = (0, A.normalize)(Y);
    return te.length > 1 && te[te.length - 1] === A.sep && (te = te.substring(0, te.length - 1)), te;
  }
  const N = /[\\/]/g;
  function _(Y, te) {
    return Y.replace(N, te);
  }
  const R = /^[a-z]:[\\/]$/i;
  function m(Y) {
    return Y === "/" || R.test(Y);
  }
  function S(Y, te) {
    const { resolvePaths: ae, normalizePath: ue, pathSeparator: ye } = te, me = process.platform === "win32" && Y.includes("/") || Y.startsWith(".");
    if (ae && (Y = (0, A.resolve)(Y)), (ue || me) && (Y = H(Y)), Y === ".") return "";
    const _e = Y[Y.length - 1] !== ye;
    return _(_e ? Y + ye : Y, ye);
  }
  function w(Y, te) {
    return te + Y;
  }
  function T(Y, te) {
    return function(ae, ue) {
      return ue.startsWith(Y) ? ue.slice(Y.length) + ae : _((0, A.relative)(Y, ue), te.pathSeparator) + te.pathSeparator + ae;
    };
  }
  function M(Y) {
    return Y;
  }
  function D(Y, te, ae) {
    return te + Y + ae;
  }
  function j(Y, te) {
    const { relativePaths: ae, includeBasePath: ue } = te;
    return ae && Y ? T(Y, te) : ue ? w : M;
  }
  function B(Y) {
    return function(te, ae) {
      ae.push(te.substring(Y.length) || ".");
    };
  }
  function x(Y) {
    return function(te, ae, ue) {
      const ye = te.substring(Y.length) || ".";
      ue.every((me) => me(ye, !0)) && ae.push(ye);
    };
  }
  const U = (Y, te) => {
    te.push(Y || ".");
  }, $ = (Y, te, ae) => {
    const ue = Y || ".";
    ae.every((ye) => ye(ue, !0)) && te.push(ue);
  }, F = () => {
  };
  function V(Y, te) {
    const { includeDirs: ae, filters: ue, relativePaths: ye } = te;
    return ae ? ye ? ue && ue.length ? x(Y) : B(Y) : ue && ue.length ? $ : U : F;
  }
  const W = (Y, te, ae, ue) => {
    ue.every((ye) => ye(Y, !1)) && ae.files++;
  }, z = (Y, te, ae, ue) => {
    ue.every((ye) => ye(Y, !1)) && te.push(Y);
  }, k = (Y, te, ae, ue) => {
    ae.files++;
  }, Z = (Y, te) => {
    te.push(Y);
  }, d = () => {
  };
  function b(Y) {
    const { excludeFiles: te, filters: ae, onlyCounts: ue } = Y;
    return te ? d : ae && ae.length ? ue ? W : z : ue ? k : Z;
  }
  const l = (Y) => Y, i = () => [""].slice(0, 0);
  function g(Y) {
    return Y.group ? i : l;
  }
  const y = (Y, te, ae) => {
    Y.push({
      directory: te,
      files: ae,
      dir: te
    });
  }, t = () => {
  };
  function s(Y) {
    return Y.group ? y : t;
  }
  const a = function(Y, te, ae) {
    const { queue: ue, fs: ye, options: { suppressErrors: me } } = te;
    ue.enqueue(), ye.realpath(Y, (_e, we) => {
      if (_e) return ue.dequeue(me ? null : _e, te);
      ye.stat(we, (Se, xe) => {
        if (Se) return ue.dequeue(me ? null : Se, te);
        if (xe.isDirectory() && O(Y, we, te)) return ue.dequeue(null, te);
        ae(xe, we), ue.dequeue(null, te);
      });
    });
  }, n = function(Y, te, ae) {
    const { queue: ue, fs: ye, options: { suppressErrors: me } } = te;
    ue.enqueue();
    try {
      const _e = ye.realpathSync(Y), we = ye.statSync(_e);
      if (we.isDirectory() && O(Y, _e, te)) return;
      ae(we, _e);
    } catch (_e) {
      if (!me) throw _e;
    }
  };
  function u(Y, te) {
    return !Y.resolveSymlinks || Y.excludeSymlinks ? null : te ? n : a;
  }
  function O(Y, te, ae) {
    if (ae.options.useRealPaths) return C(te, ae);
    let ue = (0, A.dirname)(Y), ye = 1;
    for (; ue !== ae.root && ye < 2; ) {
      const me = ae.symlinks.get(ue);
      !!me && (me === te || me.startsWith(te) || te.startsWith(me)) ? ye++ : ue = (0, A.dirname)(ue);
    }
    return ae.symlinks.set(Y, te), ye > 1;
  }
  function C(Y, te) {
    return te.visited.includes(Y + te.options.pathSeparator);
  }
  const E = (Y) => Y.counts, I = (Y) => Y.groups, L = (Y) => Y.paths, q = (Y) => Y.paths.slice(0, Y.options.maxFiles), X = (Y, te, ae) => (ne(te, ae, Y.counts, Y.options.suppressErrors), null), P = (Y, te, ae) => (ne(te, ae, Y.paths, Y.options.suppressErrors), null), G = (Y, te, ae) => (ne(te, ae, Y.paths.slice(0, Y.options.maxFiles), Y.options.suppressErrors), null), ee = (Y, te, ae) => (ne(te, ae, Y.groups, Y.options.suppressErrors), null);
  function ne(Y, te, ae, ue) {
    te(Y && !ue ? Y : null, ae);
  }
  function se(Y, te) {
    const { onlyCounts: ae, group: ue, maxFiles: ye } = Y;
    return ae ? te ? E : X : ue ? te ? I : ee : ye ? te ? q : G : te ? L : P;
  }
  const J = { withFileTypes: !0 }, ce = (Y, te, ae, ue, ye) => {
    if (Y.queue.enqueue(), ue < 0) return Y.queue.dequeue(null, Y);
    const { fs: me } = Y;
    Y.visited.push(te), Y.counts.directories++, me.readdir(te || ".", J, (_e, we = []) => {
      ye(we, ae, ue), Y.queue.dequeue(Y.options.suppressErrors ? null : _e, Y);
    });
  }, Q = (Y, te, ae, ue, ye) => {
    const { fs: me } = Y;
    if (ue < 0) return;
    Y.visited.push(te), Y.counts.directories++;
    let _e = [];
    try {
      _e = me.readdirSync(te || ".", J);
    } catch (we) {
      if (!Y.options.suppressErrors) throw we;
    }
    ye(_e, ae, ue);
  };
  function de(Y) {
    return Y ? Q : ce;
  }
  var he = class {
    count = 0;
    constructor(Y) {
      this.onQueueEmpty = Y;
    }
    enqueue() {
      return this.count++, this.count;
    }
    dequeue(Y, te) {
      this.onQueueEmpty && (--this.count <= 0 || Y) && (this.onQueueEmpty(Y, te), Y && (te.controller.abort(), this.onQueueEmpty = void 0));
    }
  }, le = class {
    _files = 0;
    _directories = 0;
    set files(Y) {
      this._files = Y;
    }
    get files() {
      return this._files;
    }
    set directories(Y) {
      this._directories = Y;
    }
    get directories() {
      return this._directories;
    }
    /**
    * @deprecated use `directories` instead
    */
    /* c8 ignore next 3 */
    get dirs() {
      return this._directories;
    }
  }, re = class {
    aborted = !1;
    abort() {
      this.aborted = !0;
    }
  }, ie = class {
    root;
    isSynchronous;
    state;
    joinPath;
    pushDirectory;
    pushFile;
    getArray;
    groupFiles;
    resolveSymlink;
    walkDirectory;
    callbackInvoker;
    constructor(Y, te, ae) {
      this.isSynchronous = !ae, this.callbackInvoker = se(te, this.isSynchronous), this.root = S(Y, te), this.state = {
        root: m(this.root) ? this.root : this.root.slice(0, -1),
        paths: [""].slice(0, 0),
        groups: [],
        counts: new le(),
        options: te,
        queue: new he((ue, ye) => this.callbackInvoker(ye, ue, ae)),
        symlinks: /* @__PURE__ */ new Map(),
        visited: [""].slice(0, 0),
        controller: new re(),
        fs: te.fs || K
      }, this.joinPath = j(this.root, te), this.pushDirectory = V(this.root, te), this.pushFile = b(te), this.getArray = g(te), this.groupFiles = s(te), this.resolveSymlink = u(te, this.isSynchronous), this.walkDirectory = de(this.isSynchronous);
    }
    start() {
      return this.pushDirectory(this.root, this.state.paths, this.state.options.filters), this.walkDirectory(this.state, this.root, this.root, this.state.options.maxDepth, this.walk), this.isSynchronous ? this.callbackInvoker(this.state, null) : null;
    }
    walk = (Y, te, ae) => {
      const { paths: ue, options: { filters: ye, resolveSymlinks: me, excludeSymlinks: _e, exclude: we, maxFiles: Se, signal: xe, useRealPaths: Ke, pathSeparator: ze }, controller: st } = this.state;
      if (st.aborted || xe && xe.aborted || Se && ue.length > Se) return;
      const ft = this.getArray(this.state.paths);
      for (let dt = 0; dt < Y.length; ++dt) {
        const He = Y[dt];
        if (He.isFile() || He.isSymbolicLink() && !me && !_e) {
          const Pe = this.joinPath(He.name, te);
          this.pushFile(Pe, ft, this.state.counts, ye);
        } else if (He.isDirectory()) {
          let Pe = D(He.name, te, this.state.options.pathSeparator);
          if (we && we(He.name, Pe)) continue;
          this.pushDirectory(Pe, ue, ye), this.walkDirectory(this.state, Pe, Pe, ae - 1, this.walk);
        } else if (this.resolveSymlink && He.isSymbolicLink()) {
          let Pe = w(He.name, te);
          this.resolveSymlink(Pe, this.state, (Qs, Le) => {
            if (Qs.isDirectory()) {
              if (Le = S(Le, this.state.options), we && we(He.name, Ke ? Le : Pe + ze)) return;
              this.walkDirectory(this.state, Le, Ke ? Le : Pe + ze, ae - 1, this.walk);
            } else {
              Le = Ke ? Le : Pe;
              const Js = (0, A.basename)(Le), eo = S((0, A.dirname)(Le), this.state.options);
              Le = this.joinPath(Js, eo), this.pushFile(Le, ft, this.state.counts, ye);
            }
          });
        }
      }
      this.groupFiles(this.state.groups, te, ft);
    };
  };
  function oe(Y, te) {
    return new Promise((ae, ue) => {
      fe(Y, te, (ye, me) => {
        if (ye) return ue(ye);
        ae(me);
      });
    });
  }
  function fe(Y, te, ae) {
    new ie(Y, te, ae).start();
  }
  function pe(Y, te) {
    return new ie(Y, te).start();
  }
  var be = class {
    constructor(Y, te) {
      this.root = Y, this.options = te;
    }
    withPromise() {
      return oe(this.root, this.options);
    }
    withCallback(Y) {
      fe(this.root, this.options, Y);
    }
    sync() {
      return pe(this.root, this.options);
    }
  };
  let ge = null;
  try {
    require.resolve("picomatch"), ge = /* @__PURE__ */ Ns();
  } catch {
  }
  var ve = class {
    globCache = {};
    options = {
      maxDepth: 1 / 0,
      suppressErrors: !0,
      pathSeparator: A.sep,
      filters: []
    };
    globFunction;
    constructor(Y) {
      this.options = {
        ...this.options,
        ...Y
      }, this.globFunction = this.options.globFunction;
    }
    group() {
      return this.options.group = !0, this;
    }
    withPathSeparator(Y) {
      return this.options.pathSeparator = Y, this;
    }
    withBasePath() {
      return this.options.includeBasePath = !0, this;
    }
    withRelativePaths() {
      return this.options.relativePaths = !0, this;
    }
    withDirs() {
      return this.options.includeDirs = !0, this;
    }
    withMaxDepth(Y) {
      return this.options.maxDepth = Y, this;
    }
    withMaxFiles(Y) {
      return this.options.maxFiles = Y, this;
    }
    withFullPaths() {
      return this.options.resolvePaths = !0, this.options.includeBasePath = !0, this;
    }
    withErrors() {
      return this.options.suppressErrors = !1, this;
    }
    withSymlinks({ resolvePaths: Y = !0 } = {}) {
      return this.options.resolveSymlinks = !0, this.options.useRealPaths = Y, this.withFullPaths();
    }
    withAbortSignal(Y) {
      return this.options.signal = Y, this;
    }
    normalize() {
      return this.options.normalizePath = !0, this;
    }
    filter(Y) {
      return this.options.filters.push(Y), this;
    }
    onlyDirs() {
      return this.options.excludeFiles = !0, this.options.includeDirs = !0, this;
    }
    exclude(Y) {
      return this.options.exclude = Y, this;
    }
    onlyCounts() {
      return this.options.onlyCounts = !0, this;
    }
    crawl(Y) {
      return new be(Y || ".", this.options);
    }
    withGlobFunction(Y) {
      return this.globFunction = Y, this;
    }
    /**
    * @deprecated Pass options using the constructor instead:
    * ```ts
    * new fdir(options).crawl("/path/to/root");
    * ```
    * This method will be removed in v7.0
    */
    /* c8 ignore next 4 */
    crawlWithOptions(Y, te) {
      return this.options = {
        ...this.options,
        ...te
      }, new be(Y || ".", this.options);
    }
    glob(...Y) {
      return this.globFunction ? this.globWithOptions(Y) : this.globWithOptions(Y, { dot: !0 });
    }
    globWithOptions(Y, ...te) {
      const ae = this.globFunction || ge;
      if (!ae) throw new Error("Please specify a glob function to use glob matching.");
      var ue = this.globCache[Y.join("\0")];
      return ue || (ue = ae(Y, ...te), this.globCache[Y.join("\0")] = ue), this.options.filters.push((ye) => ue(ye)), this;
    }
  };
  return vt.fdir = ve, vt;
}
var Bt, tr;
function po() {
  if (tr) return Bt;
  tr = 1;
  const { fdir: e } = yo(), o = Oe, f = /* @__PURE__ */ Ns();
  class h {
    constructor(r = "./", c = [".env*"], p = []) {
      this.ignore = ["node_modules/**", ".git/**"], this.cwd = o.resolve(r), this.envFile = c, this.excludeEnvFile = p;
    }
    run() {
      return this._filepaths();
    }
    _filepaths() {
      const r = f(this._exclude()), c = f(this._patterns(), {
        ignore: this._exclude()
      });
      return new e().withRelativePaths().exclude((p, A) => r(A)).filter((p) => c(p)).crawl(this.cwd).sync();
    }
    _patterns() {
      return Array.isArray(this.envFile) ? this.envFile.map((r) => `**/${r}`) : [`**/${this.envFile}`];
    }
    _excludePatterns() {
      return Array.isArray(this.excludeEnvFile) ? this.excludeEnvFile.map((r) => `**/${r}`) : [`**/${this.excludeEnvFile}`];
    }
    _exclude() {
      return this._excludePatterns().length > 0 ? this.ignore.concat(this._excludePatterns()) : this.ignore;
    }
  }
  return Bt = h, Bt;
}
var At, nr;
function Ue() {
  if (nr) return At;
  nr = 1;
  const e = qn, o = "utf8";
  function f(r, c = null) {
    return c || (c = o), e.readFileSync(r, c);
  }
  function h(r, c) {
    return e.writeFileSync(r, c, o);
  }
  return At = {
    chmodSync: e.chmodSync,
    existsSync: e.existsSync,
    readdirSync: e.readdirSync,
    readFileSync: e.readFileSync,
    writeFileSync: e.writeFileSync,
    appendFileSync: e.appendFileSync,
    // fsx special commands
    readFileX: f,
    writeFileX: h
  }, At;
}
var xt, rr;
function go() {
  if (rr) return xt;
  rr = 1;
  function e(o) {
    let f;
    try {
      f = new URL(o);
    } catch {
      throw new Error("INVALID_DOTENV_KEY: Incomplete format. It should be a dotenv uri. (dotenv://:key_1234@dotenvx.com/vault/.env.vault?environment=development)");
    }
    const h = f.password;
    if (!h)
      throw new Error("INVALID_DOTENV_KEY: Missing key part");
    return Buffer.from(h.slice(-64), "hex");
  }
  return xt = e, xt;
}
var Rt, sr;
function vo() {
  if (sr) return Rt;
  sr = 1;
  const e = no, o = go();
  function f(h, v) {
    const r = o(v);
    try {
      return e.decrypt(h, r);
    } catch (c) {
      if (c.code === "DECRYPTION_FAILED") {
        const p = new Error("[DECRYPTION_FAILED] Unable to decrypt .env.vault with DOTENV_KEY.");
        throw p.code = "DECRYPTION_FAILED", p.help = "[DECRYPTION_FAILED] Run with debug flag [dotenvx run --debug -- yourcommand] or manually run [echo $DOTENV_KEY] to compare it to the one in .env.keys.", p.debug = `[DECRYPTION_FAILED] DOTENV_KEY is ${v}`, p;
      }
      if (c.code === "ERR_CRYPTO_INVALID_AUTH_TAG") {
        const p = new Error("[INVALID_CIPHERTEXT] Unable to decrypt what appears to be invalid ciphertext.");
        throw p.code = "INVALID_CIPHERTEXT", p.help = "[INVALID_CIPHERTEXT] Run with debug flag [dotenvx run --debug -- yourcommand] or manually check .env.vault.", p.debug = `[INVALID_CIPHERTEXT] ciphertext is '${h}'`, p;
      }
      throw c;
    }
  }
  return Rt = f, Rt;
}
var It = {}, Ot = {}, or;
function Te() {
  return or || (or = 1, (function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.wrapCipher = e.Hash = e.nextTick = e.isLE = void 0, e.isBytes = o, e.abool = f, e.anumber = h, e.abytes = v, e.ahash = r, e.aexists = c, e.aoutput = p, e.u8 = A, e.u32 = K, e.clean = H, e.createView = N, e.bytesToHex = m, e.hexToBytes = T, e.hexToNumber = M, e.bytesToNumberBE = D, e.numberToBytesBE = j, e.utf8ToBytes = x, e.bytesToUtf8 = U, e.toBytes = $, e.overlapBytes = F, e.complexOverlapBytes = V, e.concatBytes = W, e.checkOpts = z, e.equalBytes = k, e.getOutput = b, e.setBigUint64 = l, e.u64Lengths = i, e.isAligned32 = g, e.copyBytes = y;
    function o(t) {
      return t instanceof Uint8Array || ArrayBuffer.isView(t) && t.constructor.name === "Uint8Array";
    }
    function f(t) {
      if (typeof t != "boolean")
        throw new Error(`boolean expected, not ${t}`);
    }
    function h(t) {
      if (!Number.isSafeInteger(t) || t < 0)
        throw new Error("positive integer expected, got " + t);
    }
    function v(t, ...s) {
      if (!o(t))
        throw new Error("Uint8Array expected");
      if (s.length > 0 && !s.includes(t.length))
        throw new Error("Uint8Array expected of length " + s + ", got length=" + t.length);
    }
    function r(t) {
      if (typeof t != "function" || typeof t.create != "function")
        throw new Error("Hash should be wrapped by utils.createHasher");
      h(t.outputLen), h(t.blockLen);
    }
    function c(t, s = !0) {
      if (t.destroyed)
        throw new Error("Hash instance has been destroyed");
      if (s && t.finished)
        throw new Error("Hash#digest() has already been called");
    }
    function p(t, s) {
      v(t);
      const a = s.outputLen;
      if (t.length < a)
        throw new Error("digestInto() expects output buffer of length at least " + a);
    }
    function A(t) {
      return new Uint8Array(t.buffer, t.byteOffset, t.byteLength);
    }
    function K(t) {
      return new Uint32Array(t.buffer, t.byteOffset, Math.floor(t.byteLength / 4));
    }
    function H(...t) {
      for (let s = 0; s < t.length; s++)
        t[s].fill(0);
    }
    function N(t) {
      return new DataView(t.buffer, t.byteOffset, t.byteLength);
    }
    e.isLE = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
    const _ = /* @ts-ignore */ typeof Uint8Array.from([]).toHex == "function" && typeof Uint8Array.fromHex == "function", R = /* @__PURE__ */ Array.from({ length: 256 }, (t, s) => s.toString(16).padStart(2, "0"));
    function m(t) {
      if (v(t), _)
        return t.toHex();
      let s = "";
      for (let a = 0; a < t.length; a++)
        s += R[t[a]];
      return s;
    }
    const S = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
    function w(t) {
      if (t >= S._0 && t <= S._9)
        return t - S._0;
      if (t >= S.A && t <= S.F)
        return t - (S.A - 10);
      if (t >= S.a && t <= S.f)
        return t - (S.a - 10);
    }
    function T(t) {
      if (typeof t != "string")
        throw new Error("hex string expected, got " + typeof t);
      if (_)
        return Uint8Array.fromHex(t);
      const s = t.length, a = s / 2;
      if (s % 2)
        throw new Error("hex string expected, got unpadded hex of length " + s);
      const n = new Uint8Array(a);
      for (let u = 0, O = 0; u < a; u++, O += 2) {
        const C = w(t.charCodeAt(O)), E = w(t.charCodeAt(O + 1));
        if (C === void 0 || E === void 0) {
          const I = t[O] + t[O + 1];
          throw new Error('hex string expected, got non-hex character "' + I + '" at index ' + O);
        }
        n[u] = C * 16 + E;
      }
      return n;
    }
    function M(t) {
      if (typeof t != "string")
        throw new Error("hex string expected, got " + typeof t);
      return BigInt(t === "" ? "0" : "0x" + t);
    }
    function D(t) {
      return M(m(t));
    }
    function j(t, s) {
      return T(t.toString(16).padStart(s * 2, "0"));
    }
    const B = async () => {
    };
    e.nextTick = B;
    function x(t) {
      if (typeof t != "string")
        throw new Error("string expected");
      return new Uint8Array(new TextEncoder().encode(t));
    }
    function U(t) {
      return new TextDecoder().decode(t);
    }
    function $(t) {
      if (typeof t == "string")
        t = x(t);
      else if (o(t))
        t = y(t);
      else
        throw new Error("Uint8Array expected, got " + typeof t);
      return t;
    }
    function F(t, s) {
      return t.buffer === s.buffer && // best we can do, may fail with an obscure Proxy
      t.byteOffset < s.byteOffset + s.byteLength && // a starts before b end
      s.byteOffset < t.byteOffset + t.byteLength;
    }
    function V(t, s) {
      if (F(t, s) && t.byteOffset < s.byteOffset)
        throw new Error("complex overlap of input and output is not supported");
    }
    function W(...t) {
      let s = 0;
      for (let n = 0; n < t.length; n++) {
        const u = t[n];
        v(u), s += u.length;
      }
      const a = new Uint8Array(s);
      for (let n = 0, u = 0; n < t.length; n++) {
        const O = t[n];
        a.set(O, u), u += O.length;
      }
      return a;
    }
    function z(t, s) {
      if (s == null || typeof s != "object")
        throw new Error("options must be defined");
      return Object.assign(t, s);
    }
    function k(t, s) {
      if (t.length !== s.length)
        return !1;
      let a = 0;
      for (let n = 0; n < t.length; n++)
        a |= t[n] ^ s[n];
      return a === 0;
    }
    class Z {
    }
    e.Hash = Z;
    const d = /* @__NO_SIDE_EFFECTS__ */ (t, s) => {
      function a(n, ...u) {
        if (v(n), !e.isLE)
          throw new Error("Non little-endian hardware is not yet supported");
        if (t.nonceLength !== void 0) {
          const q = u[0];
          if (!q)
            throw new Error("nonce / iv required");
          t.varSizeNonce ? v(q) : v(q, t.nonceLength);
        }
        const O = t.tagLength;
        O && u[1] !== void 0 && v(u[1]);
        const C = s(n, ...u), E = (q, X) => {
          if (X !== void 0) {
            if (q !== 2)
              throw new Error("cipher output not supported");
            v(X);
          }
        };
        let I = !1;
        return {
          encrypt(q, X) {
            if (I)
              throw new Error("cannot encrypt() twice with same key + nonce");
            return I = !0, v(q), E(C.encrypt.length, X), C.encrypt(q, X);
          },
          decrypt(q, X) {
            if (v(q), O && q.length < O)
              throw new Error("invalid ciphertext length: smaller than tagLength=" + O);
            return E(C.decrypt.length, X), C.decrypt(q, X);
          }
        };
      }
      return Object.assign(a, t), a;
    };
    e.wrapCipher = d;
    function b(t, s, a = !0) {
      if (s === void 0)
        return new Uint8Array(t);
      if (s.length !== t)
        throw new Error("invalid output length, expected " + t + ", got: " + s.length);
      if (a && !g(s))
        throw new Error("invalid output, must be aligned");
      return s;
    }
    function l(t, s, a, n) {
      if (typeof t.setBigUint64 == "function")
        return t.setBigUint64(s, a, n);
      const u = BigInt(32), O = BigInt(4294967295), C = Number(a >> u & O), E = Number(a & O), I = n ? 4 : 0, L = n ? 0 : 4;
      t.setUint32(s + I, C, n), t.setUint32(s + L, E, n);
    }
    function i(t, s, a) {
      f(a);
      const n = new Uint8Array(16), u = N(n);
      return l(u, 0, BigInt(s), a), l(u, 8, BigInt(t), a), n;
    }
    function g(t) {
      return t.byteOffset % 4 === 0;
    }
    function y(t) {
      return Uint8Array.from(t);
    }
  })(Ot)), Ot;
}
var Ct = {}, Re = {}, ir;
function Dn() {
  return ir || (ir = 1, Object.defineProperty(Re, "__esModule", { value: !0 }), Re.AEAD_TAG_LENGTH = Re.XCHACHA20_NONCE_LENGTH = Re.CURVE25519_PUBLIC_KEY_SIZE = Re.ETH_PUBLIC_KEY_SIZE = Re.UNCOMPRESSED_PUBLIC_KEY_SIZE = Re.COMPRESSED_PUBLIC_KEY_SIZE = Re.SECRET_KEY_LENGTH = void 0, Re.SECRET_KEY_LENGTH = 32, Re.COMPRESSED_PUBLIC_KEY_SIZE = 33, Re.UNCOMPRESSED_PUBLIC_KEY_SIZE = 65, Re.ETH_PUBLIC_KEY_SIZE = 64, Re.CURVE25519_PUBLIC_KEY_SIZE = 32, Re.XCHACHA20_NONCE_LENGTH = 24, Re.AEAD_TAG_LENGTH = 16), Re;
}
var cr;
function it() {
  return cr || (cr = 1, (function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.ephemeralKeySize = e.symmetricNonceLength = e.symmetricAlgorithm = e.isHkdfKeyCompressed = e.isEphemeralKeyCompressed = e.ellipticCurve = e.ECIES_CONFIG = void 0;
    var o = Dn(), f = (
      /** @class */
      /* @__PURE__ */ (function() {
        function K() {
          this.ellipticCurve = "secp256k1", this.isEphemeralKeyCompressed = !1, this.isHkdfKeyCompressed = !1, this.symmetricAlgorithm = "aes-256-gcm", this.symmetricNonceLength = 16;
        }
        return K;
      })()
    );
    e.ECIES_CONFIG = new f();
    var h = function() {
      return e.ECIES_CONFIG.ellipticCurve;
    };
    e.ellipticCurve = h;
    var v = function() {
      return e.ECIES_CONFIG.isEphemeralKeyCompressed;
    };
    e.isEphemeralKeyCompressed = v;
    var r = function() {
      return e.ECIES_CONFIG.isHkdfKeyCompressed;
    };
    e.isHkdfKeyCompressed = r;
    var c = function() {
      return e.ECIES_CONFIG.symmetricAlgorithm;
    };
    e.symmetricAlgorithm = c;
    var p = function() {
      return e.ECIES_CONFIG.symmetricNonceLength;
    };
    e.symmetricNonceLength = p;
    var A = function() {
      var K = {
        secp256k1: e.ECIES_CONFIG.isEphemeralKeyCompressed ? o.COMPRESSED_PUBLIC_KEY_SIZE : o.UNCOMPRESSED_PUBLIC_KEY_SIZE,
        x25519: o.CURVE25519_PUBLIC_KEY_SIZE,
        ed25519: o.CURVE25519_PUBLIC_KEY_SIZE
      };
      if (e.ECIES_CONFIG.ellipticCurve in K)
        return K[e.ECIES_CONFIG.ellipticCurve];
      throw new Error("Not implemented");
    };
    e.ephemeralKeySize = A;
  })(Ct)), Ct;
}
var Tt = {}, $e = {}, ke = {}, Pt = {}, Lt = {}, Qe = {}, ar;
function bo() {
  return ar || (ar = 1, Object.defineProperty(Qe, "__esModule", { value: !0 }), Qe.crypto = void 0, Qe.crypto = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0), Qe;
}
var ur;
function Ks() {
  return ur || (ur = 1, (function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.gcm = e.ctr = e.cbc = e.utils = void 0, e.randomBytes = h, e.getWebcryptoSubtle = v, e.managedNonce = r;
    const o = /* @__PURE__ */ bo(), f = /* @__PURE__ */ Te();
    function h(K = 32) {
      if (o.crypto && typeof o.crypto.getRandomValues == "function")
        return o.crypto.getRandomValues(new Uint8Array(K));
      if (o.crypto && typeof o.crypto.randomBytes == "function")
        return Uint8Array.from(o.crypto.randomBytes(K));
      throw new Error("crypto.getRandomValues must be defined");
    }
    function v() {
      if (o.crypto && typeof o.crypto.subtle == "object" && o.crypto.subtle != null)
        return o.crypto.subtle;
      throw new Error("crypto.subtle must be defined");
    }
    function r(K) {
      const { nonceLength: H } = K;
      return (0, f.anumber)(H), ((N, ..._) => ({
        encrypt(R, ...m) {
          const S = h(H), w = K(N, S, ..._).encrypt(R, ...m), T = (0, f.concatBytes)(S, w);
          return w.fill(0), T;
        },
        decrypt(R, ...m) {
          const S = R.subarray(0, H), w = R.subarray(H);
          return K(N, S, ..._).decrypt(w, ...m);
        }
      }));
    }
    e.utils = {
      async encrypt(K, H, N, _) {
        const R = v(), m = await R.importKey("raw", K, H, !0, ["encrypt"]), S = await R.encrypt(N, m, _);
        return new Uint8Array(S);
      },
      async decrypt(K, H, N, _) {
        const R = v(), m = await R.importKey("raw", K, H, !0, ["decrypt"]), S = await R.decrypt(N, m, _);
        return new Uint8Array(S);
      }
    };
    const c = {
      CBC: "AES-CBC",
      CTR: "AES-CTR",
      GCM: "AES-GCM"
    };
    function p(K, H, N) {
      if (K === c.CBC)
        return { name: c.CBC, iv: H };
      if (K === c.CTR)
        return { name: c.CTR, counter: H, length: 64 };
      if (K === c.GCM)
        return N ? { name: c.GCM, iv: H, additionalData: N } : { name: c.GCM, iv: H };
      throw new Error("unknown aes block mode");
    }
    function A(K) {
      return (H, N, _) => {
        (0, f.abytes)(H), (0, f.abytes)(N);
        const R = { name: K, length: H.length * 8 }, m = p(K, N, _);
        let S = !1;
        return {
          // keyLength,
          encrypt(w) {
            if ((0, f.abytes)(w), S)
              throw new Error("Cannot encrypt() twice with same key / nonce");
            return S = !0, e.utils.encrypt(H, R, m, w);
          },
          decrypt(w) {
            return (0, f.abytes)(w), e.utils.decrypt(H, R, m, w);
          }
        };
      };
    }
    e.cbc = A(c.CBC), e.ctr = A(c.CTR), e.gcm = A(c.GCM);
  })(Lt)), Lt;
}
var Ht = {}, Be = {}, Ie = {}, Nt = {}, Je = {}, lr;
function mo() {
  return lr || (lr = 1, Object.defineProperty(Je, "__esModule", { value: !0 }), Je.crypto = void 0, Je.crypto = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0), Je;
}
var fr;
function Ne() {
  return fr || (fr = 1, (function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.wrapXOFConstructorWithOpts = e.wrapConstructorWithOpts = e.wrapConstructor = e.Hash = e.nextTick = e.swap32IfBE = e.byteSwapIfBE = e.swap8IfBE = e.isLE = void 0, e.isBytes = f, e.anumber = h, e.abytes = v, e.ahash = r, e.aexists = c, e.aoutput = p, e.u8 = A, e.u32 = K, e.clean = H, e.createView = N, e.rotr = _, e.rotl = R, e.byteSwap = m, e.byteSwap32 = S, e.bytesToHex = M, e.hexToBytes = B, e.asyncLoop = U, e.utf8ToBytes = $, e.bytesToUtf8 = F, e.toBytes = V, e.kdfInputToBytes = W, e.concatBytes = z, e.checkOpts = k, e.createHasher = d, e.createOptHasher = b, e.createXOFer = l, e.randomBytes = i;
    const o = /* @__PURE__ */ mo();
    function f(g) {
      return g instanceof Uint8Array || ArrayBuffer.isView(g) && g.constructor.name === "Uint8Array";
    }
    function h(g) {
      if (!Number.isSafeInteger(g) || g < 0)
        throw new Error("positive integer expected, got " + g);
    }
    function v(g, ...y) {
      if (!f(g))
        throw new Error("Uint8Array expected");
      if (y.length > 0 && !y.includes(g.length))
        throw new Error("Uint8Array expected of length " + y + ", got length=" + g.length);
    }
    function r(g) {
      if (typeof g != "function" || typeof g.create != "function")
        throw new Error("Hash should be wrapped by utils.createHasher");
      h(g.outputLen), h(g.blockLen);
    }
    function c(g, y = !0) {
      if (g.destroyed)
        throw new Error("Hash instance has been destroyed");
      if (y && g.finished)
        throw new Error("Hash#digest() has already been called");
    }
    function p(g, y) {
      v(g);
      const t = y.outputLen;
      if (g.length < t)
        throw new Error("digestInto() expects output buffer of length at least " + t);
    }
    function A(g) {
      return new Uint8Array(g.buffer, g.byteOffset, g.byteLength);
    }
    function K(g) {
      return new Uint32Array(g.buffer, g.byteOffset, Math.floor(g.byteLength / 4));
    }
    function H(...g) {
      for (let y = 0; y < g.length; y++)
        g[y].fill(0);
    }
    function N(g) {
      return new DataView(g.buffer, g.byteOffset, g.byteLength);
    }
    function _(g, y) {
      return g << 32 - y | g >>> y;
    }
    function R(g, y) {
      return g << y | g >>> 32 - y >>> 0;
    }
    e.isLE = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
    function m(g) {
      return g << 24 & 4278190080 | g << 8 & 16711680 | g >>> 8 & 65280 | g >>> 24 & 255;
    }
    e.swap8IfBE = e.isLE ? (g) => g : (g) => m(g), e.byteSwapIfBE = e.swap8IfBE;
    function S(g) {
      for (let y = 0; y < g.length; y++)
        g[y] = m(g[y]);
      return g;
    }
    e.swap32IfBE = e.isLE ? (g) => g : S;
    const w = /* @ts-ignore */ typeof Uint8Array.from([]).toHex == "function" && typeof Uint8Array.fromHex == "function", T = /* @__PURE__ */ Array.from({ length: 256 }, (g, y) => y.toString(16).padStart(2, "0"));
    function M(g) {
      if (v(g), w)
        return g.toHex();
      let y = "";
      for (let t = 0; t < g.length; t++)
        y += T[g[t]];
      return y;
    }
    const D = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
    function j(g) {
      if (g >= D._0 && g <= D._9)
        return g - D._0;
      if (g >= D.A && g <= D.F)
        return g - (D.A - 10);
      if (g >= D.a && g <= D.f)
        return g - (D.a - 10);
    }
    function B(g) {
      if (typeof g != "string")
        throw new Error("hex string expected, got " + typeof g);
      if (w)
        return Uint8Array.fromHex(g);
      const y = g.length, t = y / 2;
      if (y % 2)
        throw new Error("hex string expected, got unpadded hex of length " + y);
      const s = new Uint8Array(t);
      for (let a = 0, n = 0; a < t; a++, n += 2) {
        const u = j(g.charCodeAt(n)), O = j(g.charCodeAt(n + 1));
        if (u === void 0 || O === void 0) {
          const C = g[n] + g[n + 1];
          throw new Error('hex string expected, got non-hex character "' + C + '" at index ' + n);
        }
        s[a] = u * 16 + O;
      }
      return s;
    }
    const x = async () => {
    };
    e.nextTick = x;
    async function U(g, y, t) {
      let s = Date.now();
      for (let a = 0; a < g; a++) {
        t(a);
        const n = Date.now() - s;
        n >= 0 && n < y || (await (0, e.nextTick)(), s += n);
      }
    }
    function $(g) {
      if (typeof g != "string")
        throw new Error("string expected");
      return new Uint8Array(new TextEncoder().encode(g));
    }
    function F(g) {
      return new TextDecoder().decode(g);
    }
    function V(g) {
      return typeof g == "string" && (g = $(g)), v(g), g;
    }
    function W(g) {
      return typeof g == "string" && (g = $(g)), v(g), g;
    }
    function z(...g) {
      let y = 0;
      for (let s = 0; s < g.length; s++) {
        const a = g[s];
        v(a), y += a.length;
      }
      const t = new Uint8Array(y);
      for (let s = 0, a = 0; s < g.length; s++) {
        const n = g[s];
        t.set(n, a), a += n.length;
      }
      return t;
    }
    function k(g, y) {
      if (y !== void 0 && {}.toString.call(y) !== "[object Object]")
        throw new Error("options should be object or undefined");
      return Object.assign(g, y);
    }
    class Z {
    }
    e.Hash = Z;
    function d(g) {
      const y = (s) => g().update(V(s)).digest(), t = g();
      return y.outputLen = t.outputLen, y.blockLen = t.blockLen, y.create = () => g(), y;
    }
    function b(g) {
      const y = (s, a) => g(a).update(V(s)).digest(), t = g({});
      return y.outputLen = t.outputLen, y.blockLen = t.blockLen, y.create = (s) => g(s), y;
    }
    function l(g) {
      const y = (s, a) => g(a).update(V(s)).digest(), t = g({});
      return y.outputLen = t.outputLen, y.blockLen = t.blockLen, y.create = (s) => g(s), y;
    }
    e.wrapConstructor = d, e.wrapConstructorWithOpts = b, e.wrapXOFConstructorWithOpts = l;
    function i(g = 32) {
      if (o.crypto && typeof o.crypto.getRandomValues == "function")
        return o.crypto.getRandomValues(new Uint8Array(g));
      if (o.crypto && typeof o.crypto.randomBytes == "function")
        return Uint8Array.from(o.crypto.randomBytes(g));
      throw new Error("crypto.getRandomValues must be defined");
    }
  })(Nt)), Nt;
}
var dr;
function Eo() {
  if (dr) return Ie;
  dr = 1, Object.defineProperty(Ie, "__esModule", { value: !0 }), Ie.SHA512_IV = Ie.SHA384_IV = Ie.SHA224_IV = Ie.SHA256_IV = Ie.HashMD = void 0, Ie.setBigUint64 = o, Ie.Chi = f, Ie.Maj = h;
  const e = /* @__PURE__ */ Ne();
  function o(r, c, p, A) {
    if (typeof r.setBigUint64 == "function")
      return r.setBigUint64(c, p, A);
    const K = BigInt(32), H = BigInt(4294967295), N = Number(p >> K & H), _ = Number(p & H), R = A ? 4 : 0, m = A ? 0 : 4;
    r.setUint32(c + R, N, A), r.setUint32(c + m, _, A);
  }
  function f(r, c, p) {
    return r & c ^ ~r & p;
  }
  function h(r, c, p) {
    return r & c ^ r & p ^ c & p;
  }
  class v extends e.Hash {
    constructor(c, p, A, K) {
      super(), this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.blockLen = c, this.outputLen = p, this.padOffset = A, this.isLE = K, this.buffer = new Uint8Array(c), this.view = (0, e.createView)(this.buffer);
    }
    update(c) {
      (0, e.aexists)(this), c = (0, e.toBytes)(c), (0, e.abytes)(c);
      const { view: p, buffer: A, blockLen: K } = this, H = c.length;
      for (let N = 0; N < H; ) {
        const _ = Math.min(K - this.pos, H - N);
        if (_ === K) {
          const R = (0, e.createView)(c);
          for (; K <= H - N; N += K)
            this.process(R, N);
          continue;
        }
        A.set(c.subarray(N, N + _), this.pos), this.pos += _, N += _, this.pos === K && (this.process(p, 0), this.pos = 0);
      }
      return this.length += c.length, this.roundClean(), this;
    }
    digestInto(c) {
      (0, e.aexists)(this), (0, e.aoutput)(c, this), this.finished = !0;
      const { buffer: p, view: A, blockLen: K, isLE: H } = this;
      let { pos: N } = this;
      p[N++] = 128, (0, e.clean)(this.buffer.subarray(N)), this.padOffset > K - N && (this.process(A, 0), N = 0);
      for (let w = N; w < K; w++)
        p[w] = 0;
      o(A, K - 8, BigInt(this.length * 8), H), this.process(A, 0);
      const _ = (0, e.createView)(c), R = this.outputLen;
      if (R % 4)
        throw new Error("_sha2: outputLen should be aligned to 32bit");
      const m = R / 4, S = this.get();
      if (m > S.length)
        throw new Error("_sha2: outputLen bigger than state");
      for (let w = 0; w < m; w++)
        _.setUint32(4 * w, S[w], H);
    }
    digest() {
      const { buffer: c, outputLen: p } = this;
      this.digestInto(c);
      const A = c.slice(0, p);
      return this.destroy(), A;
    }
    _cloneInto(c) {
      c || (c = new this.constructor()), c.set(...this.get());
      const { blockLen: p, buffer: A, length: K, finished: H, destroyed: N, pos: _ } = this;
      return c.destroyed = N, c.finished = H, c.length = K, c.pos = _, K % p && c.buffer.set(A), c;
    }
    clone() {
      return this._cloneInto();
    }
  }
  return Ie.HashMD = v, Ie.SHA256_IV = Uint32Array.from([
    1779033703,
    3144134277,
    1013904242,
    2773480762,
    1359893119,
    2600822924,
    528734635,
    1541459225
  ]), Ie.SHA224_IV = Uint32Array.from([
    3238371032,
    914150663,
    812702999,
    4144912697,
    4290775857,
    1750603025,
    1694076839,
    3204075428
  ]), Ie.SHA384_IV = Uint32Array.from([
    3418070365,
    3238371032,
    1654270250,
    914150663,
    2438529370,
    812702999,
    355462360,
    4144912697,
    1731405415,
    4290775857,
    2394180231,
    1750603025,
    3675008525,
    1694076839,
    1203062813,
    3204075428
  ]), Ie.SHA512_IV = Uint32Array.from([
    1779033703,
    4089235720,
    3144134277,
    2227873595,
    1013904242,
    4271175723,
    2773480762,
    1595750129,
    1359893119,
    2917565137,
    2600822924,
    725511199,
    528734635,
    4215389547,
    1541459225,
    327033209
  ]), Ie;
}
var Ee = {}, hr;
function _o() {
  if (hr) return Ee;
  hr = 1, Object.defineProperty(Ee, "__esModule", { value: !0 }), Ee.toBig = Ee.shrSL = Ee.shrSH = Ee.rotrSL = Ee.rotrSH = Ee.rotrBL = Ee.rotrBH = Ee.rotr32L = Ee.rotr32H = Ee.rotlSL = Ee.rotlSH = Ee.rotlBL = Ee.rotlBH = Ee.add5L = Ee.add5H = Ee.add4L = Ee.add4H = Ee.add3L = Ee.add3H = void 0, Ee.add = T, Ee.fromBig = f, Ee.split = h;
  const e = /* @__PURE__ */ BigInt(2 ** 32 - 1), o = /* @__PURE__ */ BigInt(32);
  function f(F, V = !1) {
    return V ? { h: Number(F & e), l: Number(F >> o & e) } : { h: Number(F >> o & e) | 0, l: Number(F & e) | 0 };
  }
  function h(F, V = !1) {
    const W = F.length;
    let z = new Uint32Array(W), k = new Uint32Array(W);
    for (let Z = 0; Z < W; Z++) {
      const { h: d, l: b } = f(F[Z], V);
      [z[Z], k[Z]] = [d, b];
    }
    return [z, k];
  }
  const v = (F, V) => BigInt(F >>> 0) << o | BigInt(V >>> 0);
  Ee.toBig = v;
  const r = (F, V, W) => F >>> W;
  Ee.shrSH = r;
  const c = (F, V, W) => F << 32 - W | V >>> W;
  Ee.shrSL = c;
  const p = (F, V, W) => F >>> W | V << 32 - W;
  Ee.rotrSH = p;
  const A = (F, V, W) => F << 32 - W | V >>> W;
  Ee.rotrSL = A;
  const K = (F, V, W) => F << 64 - W | V >>> W - 32;
  Ee.rotrBH = K;
  const H = (F, V, W) => F >>> W - 32 | V << 64 - W;
  Ee.rotrBL = H;
  const N = (F, V) => V;
  Ee.rotr32H = N;
  const _ = (F, V) => F;
  Ee.rotr32L = _;
  const R = (F, V, W) => F << W | V >>> 32 - W;
  Ee.rotlSH = R;
  const m = (F, V, W) => V << W | F >>> 32 - W;
  Ee.rotlSL = m;
  const S = (F, V, W) => V << W - 32 | F >>> 64 - W;
  Ee.rotlBH = S;
  const w = (F, V, W) => F << W - 32 | V >>> 64 - W;
  Ee.rotlBL = w;
  function T(F, V, W, z) {
    const k = (V >>> 0) + (z >>> 0);
    return { h: F + W + (k / 2 ** 32 | 0) | 0, l: k | 0 };
  }
  const M = (F, V, W) => (F >>> 0) + (V >>> 0) + (W >>> 0);
  Ee.add3L = M;
  const D = (F, V, W, z) => V + W + z + (F / 2 ** 32 | 0) | 0;
  Ee.add3H = D;
  const j = (F, V, W, z) => (F >>> 0) + (V >>> 0) + (W >>> 0) + (z >>> 0);
  Ee.add4L = j;
  const B = (F, V, W, z, k) => V + W + z + k + (F / 2 ** 32 | 0) | 0;
  Ee.add4H = B;
  const x = (F, V, W, z, k) => (F >>> 0) + (V >>> 0) + (W >>> 0) + (z >>> 0) + (k >>> 0);
  Ee.add5L = x;
  const U = (F, V, W, z, k, Z) => V + W + z + k + Z + (F / 2 ** 32 | 0) | 0;
  Ee.add5H = U;
  const $ = {
    fromBig: f,
    split: h,
    toBig: v,
    shrSH: r,
    shrSL: c,
    rotrSH: p,
    rotrSL: A,
    rotrBH: K,
    rotrBL: H,
    rotr32H: N,
    rotr32L: _,
    rotlSH: R,
    rotlSL: m,
    rotlBH: S,
    rotlBL: w,
    add: T,
    add3L: M,
    add3H: D,
    add4L: j,
    add4H: B,
    add5H: U,
    add5L: x
  };
  return Ee.default = $, Ee;
}
var yr;
function Un() {
  if (yr) return Be;
  yr = 1, Object.defineProperty(Be, "__esModule", { value: !0 }), Be.sha512_224 = Be.sha512_256 = Be.sha384 = Be.sha512 = Be.sha224 = Be.sha256 = Be.SHA512_256 = Be.SHA512_224 = Be.SHA384 = Be.SHA512 = Be.SHA224 = Be.SHA256 = void 0;
  const e = /* @__PURE__ */ Eo(), o = /* @__PURE__ */ _o(), f = /* @__PURE__ */ Ne(), h = /* @__PURE__ */ Uint32Array.from([
    1116352408,
    1899447441,
    3049323471,
    3921009573,
    961987163,
    1508970993,
    2453635748,
    2870763221,
    3624381080,
    310598401,
    607225278,
    1426881987,
    1925078388,
    2162078206,
    2614888103,
    3248222580,
    3835390401,
    4022224774,
    264347078,
    604807628,
    770255983,
    1249150122,
    1555081692,
    1996064986,
    2554220882,
    2821834349,
    2952996808,
    3210313671,
    3336571891,
    3584528711,
    113926993,
    338241895,
    666307205,
    773529912,
    1294757372,
    1396182291,
    1695183700,
    1986661051,
    2177026350,
    2456956037,
    2730485921,
    2820302411,
    3259730800,
    3345764771,
    3516065817,
    3600352804,
    4094571909,
    275423344,
    430227734,
    506948616,
    659060556,
    883997877,
    958139571,
    1322822218,
    1537002063,
    1747873779,
    1955562222,
    2024104815,
    2227730452,
    2361852424,
    2428436474,
    2756734187,
    3204031479,
    3329325298
  ]), v = /* @__PURE__ */ new Uint32Array(64);
  class r extends e.HashMD {
    constructor(D = 32) {
      super(64, D, 8, !1), this.A = e.SHA256_IV[0] | 0, this.B = e.SHA256_IV[1] | 0, this.C = e.SHA256_IV[2] | 0, this.D = e.SHA256_IV[3] | 0, this.E = e.SHA256_IV[4] | 0, this.F = e.SHA256_IV[5] | 0, this.G = e.SHA256_IV[6] | 0, this.H = e.SHA256_IV[7] | 0;
    }
    get() {
      const { A: D, B: j, C: B, D: x, E: U, F: $, G: F, H: V } = this;
      return [D, j, B, x, U, $, F, V];
    }
    // prettier-ignore
    set(D, j, B, x, U, $, F, V) {
      this.A = D | 0, this.B = j | 0, this.C = B | 0, this.D = x | 0, this.E = U | 0, this.F = $ | 0, this.G = F | 0, this.H = V | 0;
    }
    process(D, j) {
      for (let k = 0; k < 16; k++, j += 4)
        v[k] = D.getUint32(j, !1);
      for (let k = 16; k < 64; k++) {
        const Z = v[k - 15], d = v[k - 2], b = (0, f.rotr)(Z, 7) ^ (0, f.rotr)(Z, 18) ^ Z >>> 3, l = (0, f.rotr)(d, 17) ^ (0, f.rotr)(d, 19) ^ d >>> 10;
        v[k] = l + v[k - 7] + b + v[k - 16] | 0;
      }
      let { A: B, B: x, C: U, D: $, E: F, F: V, G: W, H: z } = this;
      for (let k = 0; k < 64; k++) {
        const Z = (0, f.rotr)(F, 6) ^ (0, f.rotr)(F, 11) ^ (0, f.rotr)(F, 25), d = z + Z + (0, e.Chi)(F, V, W) + h[k] + v[k] | 0, l = ((0, f.rotr)(B, 2) ^ (0, f.rotr)(B, 13) ^ (0, f.rotr)(B, 22)) + (0, e.Maj)(B, x, U) | 0;
        z = W, W = V, V = F, F = $ + d | 0, $ = U, U = x, x = B, B = d + l | 0;
      }
      B = B + this.A | 0, x = x + this.B | 0, U = U + this.C | 0, $ = $ + this.D | 0, F = F + this.E | 0, V = V + this.F | 0, W = W + this.G | 0, z = z + this.H | 0, this.set(B, x, U, $, F, V, W, z);
    }
    roundClean() {
      (0, f.clean)(v);
    }
    destroy() {
      this.set(0, 0, 0, 0, 0, 0, 0, 0), (0, f.clean)(this.buffer);
    }
  }
  Be.SHA256 = r;
  class c extends r {
    constructor() {
      super(28), this.A = e.SHA224_IV[0] | 0, this.B = e.SHA224_IV[1] | 0, this.C = e.SHA224_IV[2] | 0, this.D = e.SHA224_IV[3] | 0, this.E = e.SHA224_IV[4] | 0, this.F = e.SHA224_IV[5] | 0, this.G = e.SHA224_IV[6] | 0, this.H = e.SHA224_IV[7] | 0;
    }
  }
  Be.SHA224 = c;
  const p = o.split([
    "0x428a2f98d728ae22",
    "0x7137449123ef65cd",
    "0xb5c0fbcfec4d3b2f",
    "0xe9b5dba58189dbbc",
    "0x3956c25bf348b538",
    "0x59f111f1b605d019",
    "0x923f82a4af194f9b",
    "0xab1c5ed5da6d8118",
    "0xd807aa98a3030242",
    "0x12835b0145706fbe",
    "0x243185be4ee4b28c",
    "0x550c7dc3d5ffb4e2",
    "0x72be5d74f27b896f",
    "0x80deb1fe3b1696b1",
    "0x9bdc06a725c71235",
    "0xc19bf174cf692694",
    "0xe49b69c19ef14ad2",
    "0xefbe4786384f25e3",
    "0x0fc19dc68b8cd5b5",
    "0x240ca1cc77ac9c65",
    "0x2de92c6f592b0275",
    "0x4a7484aa6ea6e483",
    "0x5cb0a9dcbd41fbd4",
    "0x76f988da831153b5",
    "0x983e5152ee66dfab",
    "0xa831c66d2db43210",
    "0xb00327c898fb213f",
    "0xbf597fc7beef0ee4",
    "0xc6e00bf33da88fc2",
    "0xd5a79147930aa725",
    "0x06ca6351e003826f",
    "0x142929670a0e6e70",
    "0x27b70a8546d22ffc",
    "0x2e1b21385c26c926",
    "0x4d2c6dfc5ac42aed",
    "0x53380d139d95b3df",
    "0x650a73548baf63de",
    "0x766a0abb3c77b2a8",
    "0x81c2c92e47edaee6",
    "0x92722c851482353b",
    "0xa2bfe8a14cf10364",
    "0xa81a664bbc423001",
    "0xc24b8b70d0f89791",
    "0xc76c51a30654be30",
    "0xd192e819d6ef5218",
    "0xd69906245565a910",
    "0xf40e35855771202a",
    "0x106aa07032bbd1b8",
    "0x19a4c116b8d2d0c8",
    "0x1e376c085141ab53",
    "0x2748774cdf8eeb99",
    "0x34b0bcb5e19b48a8",
    "0x391c0cb3c5c95a63",
    "0x4ed8aa4ae3418acb",
    "0x5b9cca4f7763e373",
    "0x682e6ff3d6b2b8a3",
    "0x748f82ee5defb2fc",
    "0x78a5636f43172f60",
    "0x84c87814a1f0ab72",
    "0x8cc702081a6439ec",
    "0x90befffa23631e28",
    "0xa4506cebde82bde9",
    "0xbef9a3f7b2c67915",
    "0xc67178f2e372532b",
    "0xca273eceea26619c",
    "0xd186b8c721c0c207",
    "0xeada7dd6cde0eb1e",
    "0xf57d4f7fee6ed178",
    "0x06f067aa72176fba",
    "0x0a637dc5a2c898a6",
    "0x113f9804bef90dae",
    "0x1b710b35131c471b",
    "0x28db77f523047d84",
    "0x32caab7b40c72493",
    "0x3c9ebe0a15c9bebc",
    "0x431d67c49c100d4c",
    "0x4cc5d4becb3e42b6",
    "0x597f299cfc657e2a",
    "0x5fcb6fab3ad6faec",
    "0x6c44198c4a475817"
  ].map((M) => BigInt(M))), A = p[0], K = p[1], H = /* @__PURE__ */ new Uint32Array(80), N = /* @__PURE__ */ new Uint32Array(80);
  class _ extends e.HashMD {
    constructor(D = 64) {
      super(128, D, 16, !1), this.Ah = e.SHA512_IV[0] | 0, this.Al = e.SHA512_IV[1] | 0, this.Bh = e.SHA512_IV[2] | 0, this.Bl = e.SHA512_IV[3] | 0, this.Ch = e.SHA512_IV[4] | 0, this.Cl = e.SHA512_IV[5] | 0, this.Dh = e.SHA512_IV[6] | 0, this.Dl = e.SHA512_IV[7] | 0, this.Eh = e.SHA512_IV[8] | 0, this.El = e.SHA512_IV[9] | 0, this.Fh = e.SHA512_IV[10] | 0, this.Fl = e.SHA512_IV[11] | 0, this.Gh = e.SHA512_IV[12] | 0, this.Gl = e.SHA512_IV[13] | 0, this.Hh = e.SHA512_IV[14] | 0, this.Hl = e.SHA512_IV[15] | 0;
    }
    // prettier-ignore
    get() {
      const { Ah: D, Al: j, Bh: B, Bl: x, Ch: U, Cl: $, Dh: F, Dl: V, Eh: W, El: z, Fh: k, Fl: Z, Gh: d, Gl: b, Hh: l, Hl: i } = this;
      return [D, j, B, x, U, $, F, V, W, z, k, Z, d, b, l, i];
    }
    // prettier-ignore
    set(D, j, B, x, U, $, F, V, W, z, k, Z, d, b, l, i) {
      this.Ah = D | 0, this.Al = j | 0, this.Bh = B | 0, this.Bl = x | 0, this.Ch = U | 0, this.Cl = $ | 0, this.Dh = F | 0, this.Dl = V | 0, this.Eh = W | 0, this.El = z | 0, this.Fh = k | 0, this.Fl = Z | 0, this.Gh = d | 0, this.Gl = b | 0, this.Hh = l | 0, this.Hl = i | 0;
    }
    process(D, j) {
      for (let t = 0; t < 16; t++, j += 4)
        H[t] = D.getUint32(j), N[t] = D.getUint32(j += 4);
      for (let t = 16; t < 80; t++) {
        const s = H[t - 15] | 0, a = N[t - 15] | 0, n = o.rotrSH(s, a, 1) ^ o.rotrSH(s, a, 8) ^ o.shrSH(s, a, 7), u = o.rotrSL(s, a, 1) ^ o.rotrSL(s, a, 8) ^ o.shrSL(s, a, 7), O = H[t - 2] | 0, C = N[t - 2] | 0, E = o.rotrSH(O, C, 19) ^ o.rotrBH(O, C, 61) ^ o.shrSH(O, C, 6), I = o.rotrSL(O, C, 19) ^ o.rotrBL(O, C, 61) ^ o.shrSL(O, C, 6), L = o.add4L(u, I, N[t - 7], N[t - 16]), q = o.add4H(L, n, E, H[t - 7], H[t - 16]);
        H[t] = q | 0, N[t] = L | 0;
      }
      let { Ah: B, Al: x, Bh: U, Bl: $, Ch: F, Cl: V, Dh: W, Dl: z, Eh: k, El: Z, Fh: d, Fl: b, Gh: l, Gl: i, Hh: g, Hl: y } = this;
      for (let t = 0; t < 80; t++) {
        const s = o.rotrSH(k, Z, 14) ^ o.rotrSH(k, Z, 18) ^ o.rotrBH(k, Z, 41), a = o.rotrSL(k, Z, 14) ^ o.rotrSL(k, Z, 18) ^ o.rotrBL(k, Z, 41), n = k & d ^ ~k & l, u = Z & b ^ ~Z & i, O = o.add5L(y, a, u, K[t], N[t]), C = o.add5H(O, g, s, n, A[t], H[t]), E = O | 0, I = o.rotrSH(B, x, 28) ^ o.rotrBH(B, x, 34) ^ o.rotrBH(B, x, 39), L = o.rotrSL(B, x, 28) ^ o.rotrBL(B, x, 34) ^ o.rotrBL(B, x, 39), q = B & U ^ B & F ^ U & F, X = x & $ ^ x & V ^ $ & V;
        g = l | 0, y = i | 0, l = d | 0, i = b | 0, d = k | 0, b = Z | 0, { h: k, l: Z } = o.add(W | 0, z | 0, C | 0, E | 0), W = F | 0, z = V | 0, F = U | 0, V = $ | 0, U = B | 0, $ = x | 0;
        const P = o.add3L(E, L, X);
        B = o.add3H(P, C, I, q), x = P | 0;
      }
      ({ h: B, l: x } = o.add(this.Ah | 0, this.Al | 0, B | 0, x | 0)), { h: U, l: $ } = o.add(this.Bh | 0, this.Bl | 0, U | 0, $ | 0), { h: F, l: V } = o.add(this.Ch | 0, this.Cl | 0, F | 0, V | 0), { h: W, l: z } = o.add(this.Dh | 0, this.Dl | 0, W | 0, z | 0), { h: k, l: Z } = o.add(this.Eh | 0, this.El | 0, k | 0, Z | 0), { h: d, l: b } = o.add(this.Fh | 0, this.Fl | 0, d | 0, b | 0), { h: l, l: i } = o.add(this.Gh | 0, this.Gl | 0, l | 0, i | 0), { h: g, l: y } = o.add(this.Hh | 0, this.Hl | 0, g | 0, y | 0), this.set(B, x, U, $, F, V, W, z, k, Z, d, b, l, i, g, y);
    }
    roundClean() {
      (0, f.clean)(H, N);
    }
    destroy() {
      (0, f.clean)(this.buffer), this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    }
  }
  Be.SHA512 = _;
  class R extends _ {
    constructor() {
      super(48), this.Ah = e.SHA384_IV[0] | 0, this.Al = e.SHA384_IV[1] | 0, this.Bh = e.SHA384_IV[2] | 0, this.Bl = e.SHA384_IV[3] | 0, this.Ch = e.SHA384_IV[4] | 0, this.Cl = e.SHA384_IV[5] | 0, this.Dh = e.SHA384_IV[6] | 0, this.Dl = e.SHA384_IV[7] | 0, this.Eh = e.SHA384_IV[8] | 0, this.El = e.SHA384_IV[9] | 0, this.Fh = e.SHA384_IV[10] | 0, this.Fl = e.SHA384_IV[11] | 0, this.Gh = e.SHA384_IV[12] | 0, this.Gl = e.SHA384_IV[13] | 0, this.Hh = e.SHA384_IV[14] | 0, this.Hl = e.SHA384_IV[15] | 0;
    }
  }
  Be.SHA384 = R;
  const m = /* @__PURE__ */ Uint32Array.from([
    2352822216,
    424955298,
    1944164710,
    2312950998,
    502970286,
    855612546,
    1738396948,
    1479516111,
    258812777,
    2077511080,
    2011393907,
    79989058,
    1067287976,
    1780299464,
    286451373,
    2446758561
  ]), S = /* @__PURE__ */ Uint32Array.from([
    573645204,
    4230739756,
    2673172387,
    3360449730,
    596883563,
    1867755857,
    2520282905,
    1497426621,
    2519219938,
    2827943907,
    3193839141,
    1401305490,
    721525244,
    746961066,
    246885852,
    2177182882
  ]);
  class w extends _ {
    constructor() {
      super(28), this.Ah = m[0] | 0, this.Al = m[1] | 0, this.Bh = m[2] | 0, this.Bl = m[3] | 0, this.Ch = m[4] | 0, this.Cl = m[5] | 0, this.Dh = m[6] | 0, this.Dl = m[7] | 0, this.Eh = m[8] | 0, this.El = m[9] | 0, this.Fh = m[10] | 0, this.Fl = m[11] | 0, this.Gh = m[12] | 0, this.Gl = m[13] | 0, this.Hh = m[14] | 0, this.Hl = m[15] | 0;
    }
  }
  Be.SHA512_224 = w;
  class T extends _ {
    constructor() {
      super(32), this.Ah = S[0] | 0, this.Al = S[1] | 0, this.Bh = S[2] | 0, this.Bl = S[3] | 0, this.Ch = S[4] | 0, this.Cl = S[5] | 0, this.Dh = S[6] | 0, this.Dl = S[7] | 0, this.Eh = S[8] | 0, this.El = S[9] | 0, this.Fh = S[10] | 0, this.Fl = S[11] | 0, this.Gh = S[12] | 0, this.Gl = S[13] | 0, this.Hh = S[14] | 0, this.Hl = S[15] | 0;
    }
  }
  return Be.SHA512_256 = T, Be.sha256 = (0, f.createHasher)(() => new r()), Be.sha224 = (0, f.createHasher)(() => new c()), Be.sha512 = (0, f.createHasher)(() => new _()), Be.sha384 = (0, f.createHasher)(() => new R()), Be.sha512_256 = (0, f.createHasher)(() => new T()), Be.sha512_224 = (0, f.createHasher)(() => new w()), Be;
}
var Ce = {}, Kt = {}, pr;
function Ve() {
  return pr || (pr = 1, (function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.notImplemented = e.bitMask = e.utf8ToBytes = e.randomBytes = e.isBytes = e.hexToBytes = e.concatBytes = e.bytesToUtf8 = e.bytesToHex = e.anumber = e.abytes = void 0, e.abool = r, e._abool2 = c, e._abytes2 = p, e.numberToHexUnpadded = A, e.hexToNumber = K, e.bytesToNumberBE = H, e.bytesToNumberLE = N, e.numberToBytesBE = _, e.numberToBytesLE = R, e.numberToVarBytesBE = m, e.ensureBytes = S, e.equalBytes = w, e.copyBytes = T, e.asciiToBytes = M, e.inRange = j, e.aInRange = B, e.bitLen = x, e.bitGet = U, e.bitSet = $, e.createHmacDrbg = V, e.validateObject = z, e.isHash = k, e._validateObject = Z, e.memoized = b;
    const o = /* @__PURE__ */ Ne();
    var f = /* @__PURE__ */ Ne();
    Object.defineProperty(e, "abytes", { enumerable: !0, get: function() {
      return f.abytes;
    } }), Object.defineProperty(e, "anumber", { enumerable: !0, get: function() {
      return f.anumber;
    } }), Object.defineProperty(e, "bytesToHex", { enumerable: !0, get: function() {
      return f.bytesToHex;
    } }), Object.defineProperty(e, "bytesToUtf8", { enumerable: !0, get: function() {
      return f.bytesToUtf8;
    } }), Object.defineProperty(e, "concatBytes", { enumerable: !0, get: function() {
      return f.concatBytes;
    } }), Object.defineProperty(e, "hexToBytes", { enumerable: !0, get: function() {
      return f.hexToBytes;
    } }), Object.defineProperty(e, "isBytes", { enumerable: !0, get: function() {
      return f.isBytes;
    } }), Object.defineProperty(e, "randomBytes", { enumerable: !0, get: function() {
      return f.randomBytes;
    } }), Object.defineProperty(e, "utf8ToBytes", { enumerable: !0, get: function() {
      return f.utf8ToBytes;
    } });
    const h = /* @__PURE__ */ BigInt(0), v = /* @__PURE__ */ BigInt(1);
    function r(l, i) {
      if (typeof i != "boolean")
        throw new Error(l + " boolean expected, got " + i);
    }
    function c(l, i = "") {
      if (typeof l != "boolean") {
        const g = i && `"${i}"`;
        throw new Error(g + "expected boolean, got type=" + typeof l);
      }
      return l;
    }
    function p(l, i, g = "") {
      const y = (0, o.isBytes)(l), t = l?.length, s = i !== void 0;
      if (!y || s && t !== i) {
        const a = g && `"${g}" `, n = s ? ` of length ${i}` : "", u = y ? `length=${t}` : `type=${typeof l}`;
        throw new Error(a + "expected Uint8Array" + n + ", got " + u);
      }
      return l;
    }
    function A(l) {
      const i = l.toString(16);
      return i.length & 1 ? "0" + i : i;
    }
    function K(l) {
      if (typeof l != "string")
        throw new Error("hex string expected, got " + typeof l);
      return l === "" ? h : BigInt("0x" + l);
    }
    function H(l) {
      return K((0, o.bytesToHex)(l));
    }
    function N(l) {
      return (0, o.abytes)(l), K((0, o.bytesToHex)(Uint8Array.from(l).reverse()));
    }
    function _(l, i) {
      return (0, o.hexToBytes)(l.toString(16).padStart(i * 2, "0"));
    }
    function R(l, i) {
      return _(l, i).reverse();
    }
    function m(l) {
      return (0, o.hexToBytes)(A(l));
    }
    function S(l, i, g) {
      let y;
      if (typeof i == "string")
        try {
          y = (0, o.hexToBytes)(i);
        } catch (s) {
          throw new Error(l + " must be hex string or Uint8Array, cause: " + s);
        }
      else if ((0, o.isBytes)(i))
        y = Uint8Array.from(i);
      else
        throw new Error(l + " must be hex string or Uint8Array");
      const t = y.length;
      if (typeof g == "number" && t !== g)
        throw new Error(l + " of length " + g + " expected, got " + t);
      return y;
    }
    function w(l, i) {
      if (l.length !== i.length)
        return !1;
      let g = 0;
      for (let y = 0; y < l.length; y++)
        g |= l[y] ^ i[y];
      return g === 0;
    }
    function T(l) {
      return Uint8Array.from(l);
    }
    function M(l) {
      return Uint8Array.from(l, (i, g) => {
        const y = i.charCodeAt(0);
        if (i.length !== 1 || y > 127)
          throw new Error(`string contains non-ASCII character "${l[g]}" with code ${y} at position ${g}`);
        return y;
      });
    }
    const D = (l) => typeof l == "bigint" && h <= l;
    function j(l, i, g) {
      return D(l) && D(i) && D(g) && i <= l && l < g;
    }
    function B(l, i, g, y) {
      if (!j(i, g, y))
        throw new Error("expected valid " + l + ": " + g + " <= n < " + y + ", got " + i);
    }
    function x(l) {
      let i;
      for (i = 0; l > h; l >>= v, i += 1)
        ;
      return i;
    }
    function U(l, i) {
      return l >> BigInt(i) & v;
    }
    function $(l, i, g) {
      return l | (g ? v : h) << BigInt(i);
    }
    const F = (l) => (v << BigInt(l)) - v;
    e.bitMask = F;
    function V(l, i, g) {
      if (typeof l != "number" || l < 2)
        throw new Error("hashLen must be a number");
      if (typeof i != "number" || i < 2)
        throw new Error("qByteLen must be a number");
      if (typeof g != "function")
        throw new Error("hmacFn must be a function");
      const y = (L) => new Uint8Array(L), t = (L) => Uint8Array.of(L);
      let s = y(l), a = y(l), n = 0;
      const u = () => {
        s.fill(1), a.fill(0), n = 0;
      }, O = (...L) => g(a, s, ...L), C = (L = y(0)) => {
        a = O(t(0), L), s = O(), L.length !== 0 && (a = O(t(1), L), s = O());
      }, E = () => {
        if (n++ >= 1e3)
          throw new Error("drbg: tried 1000 values");
        let L = 0;
        const q = [];
        for (; L < i; ) {
          s = O();
          const X = s.slice();
          q.push(X), L += s.length;
        }
        return (0, o.concatBytes)(...q);
      };
      return (L, q) => {
        u(), C(L);
        let X;
        for (; !(X = q(E())); )
          C();
        return u(), X;
      };
    }
    const W = {
      bigint: (l) => typeof l == "bigint",
      function: (l) => typeof l == "function",
      boolean: (l) => typeof l == "boolean",
      string: (l) => typeof l == "string",
      stringOrUint8Array: (l) => typeof l == "string" || (0, o.isBytes)(l),
      isSafeInteger: (l) => Number.isSafeInteger(l),
      array: (l) => Array.isArray(l),
      field: (l, i) => i.Fp.isValid(l),
      hash: (l) => typeof l == "function" && Number.isSafeInteger(l.outputLen)
    };
    function z(l, i, g = {}) {
      const y = (t, s, a) => {
        const n = W[s];
        if (typeof n != "function")
          throw new Error("invalid validator function");
        const u = l[t];
        if (!(a && u === void 0) && !n(u, l))
          throw new Error("param " + String(t) + " is invalid. Expected " + s + ", got " + u);
      };
      for (const [t, s] of Object.entries(i))
        y(t, s, !1);
      for (const [t, s] of Object.entries(g))
        y(t, s, !0);
      return l;
    }
    function k(l) {
      return typeof l == "function" && Number.isSafeInteger(l.outputLen);
    }
    function Z(l, i, g = {}) {
      if (!l || typeof l != "object")
        throw new Error("expected valid options object");
      function y(t, s, a) {
        const n = l[t];
        if (a && n === void 0)
          return;
        const u = typeof n;
        if (u !== s || n === null)
          throw new Error(`param "${t}" is invalid: expected ${s}, got ${u}`);
      }
      Object.entries(i).forEach(([t, s]) => y(t, s, !1)), Object.entries(g).forEach(([t, s]) => y(t, s, !0));
    }
    const d = () => {
      throw new Error("not implemented");
    };
    e.notImplemented = d;
    function b(l) {
      const i = /* @__PURE__ */ new WeakMap();
      return (g, ...y) => {
        const t = i.get(g);
        if (t !== void 0)
          return t;
        const s = l(g, ...y);
        return i.set(g, s), s;
      };
    }
  })(Kt)), Kt;
}
var Ae = {}, gr;
function Ge() {
  if (gr) return Ae;
  gr = 1, Object.defineProperty(Ae, "__esModule", { value: !0 }), Ae.isNegativeLE = void 0, Ae.mod = N, Ae.pow = _, Ae.pow2 = R, Ae.invert = m, Ae.tonelliShanks = D, Ae.FpSqrt = j, Ae.validateField = U, Ae.FpPow = $, Ae.FpInvertBatch = F, Ae.FpDiv = V, Ae.FpLegendre = W, Ae.FpIsSquare = z, Ae.nLength = k, Ae.Field = Z, Ae.FpSqrtOdd = d, Ae.FpSqrtEven = b, Ae.hashToPrivateScalar = l, Ae.getFieldBytesLength = i, Ae.getMinHashLength = g, Ae.mapHashToField = y;
  const e = /* @__PURE__ */ Ve(), o = BigInt(0), f = BigInt(1), h = /* @__PURE__ */ BigInt(2), v = /* @__PURE__ */ BigInt(3), r = /* @__PURE__ */ BigInt(4), c = /* @__PURE__ */ BigInt(5), p = /* @__PURE__ */ BigInt(7), A = /* @__PURE__ */ BigInt(8), K = /* @__PURE__ */ BigInt(9), H = /* @__PURE__ */ BigInt(16);
  function N(t, s) {
    const a = t % s;
    return a >= o ? a : s + a;
  }
  function _(t, s, a) {
    return $(Z(a), t, s);
  }
  function R(t, s, a) {
    let n = t;
    for (; s-- > o; )
      n *= n, n %= a;
    return n;
  }
  function m(t, s) {
    if (t === o)
      throw new Error("invert: expected non-zero number");
    if (s <= o)
      throw new Error("invert: expected positive modulus, got " + s);
    let a = N(t, s), n = s, u = o, O = f;
    for (; a !== o; ) {
      const E = n / a, I = n % a, L = u - O * E;
      n = a, a = I, u = O, O = L;
    }
    if (n !== f)
      throw new Error("invert: does not exist");
    return N(u, s);
  }
  function S(t, s, a) {
    if (!t.eql(t.sqr(s), a))
      throw new Error("Cannot find square root");
  }
  function w(t, s) {
    const a = (t.ORDER + f) / r, n = t.pow(s, a);
    return S(t, n, s), n;
  }
  function T(t, s) {
    const a = (t.ORDER - c) / A, n = t.mul(s, h), u = t.pow(n, a), O = t.mul(s, u), C = t.mul(t.mul(O, h), u), E = t.mul(O, t.sub(C, t.ONE));
    return S(t, E, s), E;
  }
  function M(t) {
    const s = Z(t), a = D(t), n = a(s, s.neg(s.ONE)), u = a(s, n), O = a(s, s.neg(n)), C = (t + p) / H;
    return (E, I) => {
      let L = E.pow(I, C), q = E.mul(L, n);
      const X = E.mul(L, u), P = E.mul(L, O), G = E.eql(E.sqr(q), I), ee = E.eql(E.sqr(X), I);
      L = E.cmov(L, q, G), q = E.cmov(P, X, ee);
      const ne = E.eql(E.sqr(q), I), se = E.cmov(L, q, ne);
      return S(E, se, I), se;
    };
  }
  function D(t) {
    if (t < v)
      throw new Error("sqrt is not defined for small field");
    let s = t - f, a = 0;
    for (; s % h === o; )
      s /= h, a++;
    let n = h;
    const u = Z(t);
    for (; W(u, n) === 1; )
      if (n++ > 1e3)
        throw new Error("Cannot find square root: probably non-prime P");
    if (a === 1)
      return w;
    let O = u.pow(n, s);
    const C = (s + f) / h;
    return function(I, L) {
      if (I.is0(L))
        return L;
      if (W(I, L) !== 1)
        throw new Error("Cannot find square root");
      let q = a, X = I.mul(I.ONE, O), P = I.pow(L, s), G = I.pow(L, C);
      for (; !I.eql(P, I.ONE); ) {
        if (I.is0(P))
          return I.ZERO;
        let ee = 1, ne = I.sqr(P);
        for (; !I.eql(ne, I.ONE); )
          if (ee++, ne = I.sqr(ne), ee === q)
            throw new Error("Cannot find square root");
        const se = f << BigInt(q - ee - 1), J = I.pow(X, se);
        q = ee, X = I.sqr(J), P = I.mul(P, X), G = I.mul(G, J);
      }
      return G;
    };
  }
  function j(t) {
    return t % r === v ? w : t % A === c ? T : t % H === K ? M(t) : D(t);
  }
  const B = (t, s) => (N(t, s) & f) === f;
  Ae.isNegativeLE = B;
  const x = [
    "create",
    "isValid",
    "is0",
    "neg",
    "inv",
    "sqrt",
    "sqr",
    "eql",
    "add",
    "sub",
    "mul",
    "pow",
    "div",
    "addN",
    "subN",
    "mulN",
    "sqrN"
  ];
  function U(t) {
    const s = {
      ORDER: "bigint",
      MASK: "bigint",
      BYTES: "number",
      BITS: "number"
    }, a = x.reduce((n, u) => (n[u] = "function", n), s);
    return (0, e._validateObject)(t, a), t;
  }
  function $(t, s, a) {
    if (a < o)
      throw new Error("invalid exponent, negatives unsupported");
    if (a === o)
      return t.ONE;
    if (a === f)
      return s;
    let n = t.ONE, u = s;
    for (; a > o; )
      a & f && (n = t.mul(n, u)), u = t.sqr(u), a >>= f;
    return n;
  }
  function F(t, s, a = !1) {
    const n = new Array(s.length).fill(a ? t.ZERO : void 0), u = s.reduce((C, E, I) => t.is0(E) ? C : (n[I] = C, t.mul(C, E)), t.ONE), O = t.inv(u);
    return s.reduceRight((C, E, I) => t.is0(E) ? C : (n[I] = t.mul(C, n[I]), t.mul(C, E)), O), n;
  }
  function V(t, s, a) {
    return t.mul(s, typeof a == "bigint" ? m(a, t.ORDER) : t.inv(a));
  }
  function W(t, s) {
    const a = (t.ORDER - f) / h, n = t.pow(s, a), u = t.eql(n, t.ONE), O = t.eql(n, t.ZERO), C = t.eql(n, t.neg(t.ONE));
    if (!u && !O && !C)
      throw new Error("invalid Legendre symbol result");
    return u ? 1 : O ? 0 : -1;
  }
  function z(t, s) {
    return W(t, s) === 1;
  }
  function k(t, s) {
    s !== void 0 && (0, e.anumber)(s);
    const a = s !== void 0 ? s : t.toString(2).length, n = Math.ceil(a / 8);
    return { nBitLength: a, nByteLength: n };
  }
  function Z(t, s, a = !1, n = {}) {
    if (t <= o)
      throw new Error("invalid field: expected ORDER > 0, got " + t);
    let u, O, C = !1, E;
    if (typeof s == "object" && s != null) {
      if (n.sqrt || a)
        throw new Error("cannot specify opts in two arguments");
      const P = s;
      P.BITS && (u = P.BITS), P.sqrt && (O = P.sqrt), typeof P.isLE == "boolean" && (a = P.isLE), typeof P.modFromBytes == "boolean" && (C = P.modFromBytes), E = P.allowedLengths;
    } else
      typeof s == "number" && (u = s), n.sqrt && (O = n.sqrt);
    const { nBitLength: I, nByteLength: L } = k(t, u);
    if (L > 2048)
      throw new Error("invalid field: expected ORDER of <= 2048 bytes");
    let q;
    const X = Object.freeze({
      ORDER: t,
      isLE: a,
      BITS: I,
      BYTES: L,
      MASK: (0, e.bitMask)(I),
      ZERO: o,
      ONE: f,
      allowedLengths: E,
      create: (P) => N(P, t),
      isValid: (P) => {
        if (typeof P != "bigint")
          throw new Error("invalid field element: expected bigint, got " + typeof P);
        return o <= P && P < t;
      },
      is0: (P) => P === o,
      // is valid and invertible
      isValidNot0: (P) => !X.is0(P) && X.isValid(P),
      isOdd: (P) => (P & f) === f,
      neg: (P) => N(-P, t),
      eql: (P, G) => P === G,
      sqr: (P) => N(P * P, t),
      add: (P, G) => N(P + G, t),
      sub: (P, G) => N(P - G, t),
      mul: (P, G) => N(P * G, t),
      pow: (P, G) => $(X, P, G),
      div: (P, G) => N(P * m(G, t), t),
      // Same as above, but doesn't normalize
      sqrN: (P) => P * P,
      addN: (P, G) => P + G,
      subN: (P, G) => P - G,
      mulN: (P, G) => P * G,
      inv: (P) => m(P, t),
      sqrt: O || ((P) => (q || (q = j(t)), q(X, P))),
      toBytes: (P) => a ? (0, e.numberToBytesLE)(P, L) : (0, e.numberToBytesBE)(P, L),
      fromBytes: (P, G = !0) => {
        if (E) {
          if (!E.includes(P.length) || P.length > L)
            throw new Error("Field.fromBytes: expected " + E + " bytes, got " + P.length);
          const ne = new Uint8Array(L);
          ne.set(P, a ? 0 : ne.length - P.length), P = ne;
        }
        if (P.length !== L)
          throw new Error("Field.fromBytes: expected " + L + " bytes, got " + P.length);
        let ee = a ? (0, e.bytesToNumberLE)(P) : (0, e.bytesToNumberBE)(P);
        if (C && (ee = N(ee, t)), !G && !X.isValid(ee))
          throw new Error("invalid field element: outside of range 0..ORDER");
        return ee;
      },
      // TODO: we don't need it here, move out to separate fn
      invertBatch: (P) => F(X, P),
      // We can't move this out because Fp6, Fp12 implement it
      // and it's unclear what to return in there.
      cmov: (P, G, ee) => ee ? G : P
    });
    return Object.freeze(X);
  }
  function d(t, s) {
    if (!t.isOdd)
      throw new Error("Field doesn't have isOdd");
    const a = t.sqrt(s);
    return t.isOdd(a) ? a : t.neg(a);
  }
  function b(t, s) {
    if (!t.isOdd)
      throw new Error("Field doesn't have isOdd");
    const a = t.sqrt(s);
    return t.isOdd(a) ? t.neg(a) : a;
  }
  function l(t, s, a = !1) {
    t = (0, e.ensureBytes)("privateHash", t);
    const n = t.length, u = k(s).nByteLength + 8;
    if (u < 24 || n < u || n > 1024)
      throw new Error("hashToPrivateScalar: expected " + u + "-1024 bytes of input, got " + n);
    const O = a ? (0, e.bytesToNumberLE)(t) : (0, e.bytesToNumberBE)(t);
    return N(O, s - f) + f;
  }
  function i(t) {
    if (typeof t != "bigint")
      throw new Error("field order must be bigint");
    const s = t.toString(2).length;
    return Math.ceil(s / 8);
  }
  function g(t) {
    const s = i(t);
    return s + Math.ceil(s / 2);
  }
  function y(t, s, a = !1) {
    const n = t.length, u = i(s), O = g(s);
    if (n < 16 || n < O || n > 1024)
      throw new Error("expected " + O + "-1024 bytes of input, got " + n);
    const C = a ? (0, e.bytesToNumberLE)(t) : (0, e.bytesToNumberBE)(t), E = N(C, s - f) + f;
    return a ? (0, e.numberToBytesLE)(E, u) : (0, e.numberToBytesBE)(E, u);
  }
  return Ae;
}
var vr;
function Vn() {
  if (vr) return Ce;
  vr = 1, Object.defineProperty(Ce, "__esModule", { value: !0 }), Ce.wNAF = void 0, Ce.negateCt = v, Ce.normalizeZ = r, Ce.mulEndoUnsafe = w, Ce.pippenger = T, Ce.precomputeMSMUnsafe = M, Ce.validateBasic = D, Ce._createCurveFields = B;
  const e = /* @__PURE__ */ Ve(), o = /* @__PURE__ */ Ge(), f = BigInt(0), h = BigInt(1);
  function v(x, U) {
    const $ = U.negate();
    return x ? $ : U;
  }
  function r(x, U) {
    const $ = (0, o.FpInvertBatch)(x.Fp, U.map((F) => F.Z));
    return U.map((F, V) => x.fromAffine(F.toAffine($[V])));
  }
  function c(x, U) {
    if (!Number.isSafeInteger(x) || x <= 0 || x > U)
      throw new Error("invalid window size, expected [1.." + U + "], got W=" + x);
  }
  function p(x, U) {
    c(x, U);
    const $ = Math.ceil(U / x) + 1, F = 2 ** (x - 1), V = 2 ** x, W = (0, e.bitMask)(x), z = BigInt(x);
    return { windows: $, windowSize: F, mask: W, maxNumber: V, shiftBy: z };
  }
  function A(x, U, $) {
    const { windowSize: F, mask: V, maxNumber: W, shiftBy: z } = $;
    let k = Number(x & V), Z = x >> z;
    k > F && (k -= W, Z += h);
    const d = U * F, b = d + Math.abs(k) - 1, l = k === 0, i = k < 0, g = U % 2 !== 0;
    return { nextN: Z, offset: b, isZero: l, isNeg: i, isNegF: g, offsetF: d };
  }
  function K(x, U) {
    if (!Array.isArray(x))
      throw new Error("array expected");
    x.forEach(($, F) => {
      if (!($ instanceof U))
        throw new Error("invalid point at index " + F);
    });
  }
  function H(x, U) {
    if (!Array.isArray(x))
      throw new Error("array of scalars expected");
    x.forEach(($, F) => {
      if (!U.isValid($))
        throw new Error("invalid scalar at index " + F);
    });
  }
  const N = /* @__PURE__ */ new WeakMap(), _ = /* @__PURE__ */ new WeakMap();
  function R(x) {
    return _.get(x) || 1;
  }
  function m(x) {
    if (x !== f)
      throw new Error("invalid wNAF");
  }
  class S {
    // Parametrized with a given Point class (not individual point)
    constructor(U, $) {
      this.BASE = U.BASE, this.ZERO = U.ZERO, this.Fn = U.Fn, this.bits = $;
    }
    // non-const time multiplication ladder
    _unsafeLadder(U, $, F = this.ZERO) {
      let V = U;
      for (; $ > f; )
        $ & h && (F = F.add(V)), V = V.double(), $ >>= h;
      return F;
    }
    /**
     * Creates a wNAF precomputation window. Used for caching.
     * Default window size is set by `utils.precompute()` and is equal to 8.
     * Number of precomputed points depends on the curve size:
     * 2^(𝑊−1) * (Math.ceil(𝑛 / 𝑊) + 1), where:
     * - 𝑊 is the window size
     * - 𝑛 is the bitlength of the curve order.
     * For a 256-bit curve and window size 8, the number of precomputed points is 128 * 33 = 4224.
     * @param point Point instance
     * @param W window size
     * @returns precomputed point tables flattened to a single array
     */
    precomputeWindow(U, $) {
      const { windows: F, windowSize: V } = p($, this.bits), W = [];
      let z = U, k = z;
      for (let Z = 0; Z < F; Z++) {
        k = z, W.push(k);
        for (let d = 1; d < V; d++)
          k = k.add(z), W.push(k);
        z = k.double();
      }
      return W;
    }
    /**
     * Implements ec multiplication using precomputed tables and w-ary non-adjacent form.
     * More compact implementation:
     * https://github.com/paulmillr/noble-secp256k1/blob/47cb1669b6e506ad66b35fe7d76132ae97465da2/index.ts#L502-L541
     * @returns real and fake (for const-time) points
     */
    wNAF(U, $, F) {
      if (!this.Fn.isValid(F))
        throw new Error("invalid scalar");
      let V = this.ZERO, W = this.BASE;
      const z = p(U, this.bits);
      for (let k = 0; k < z.windows; k++) {
        const { nextN: Z, offset: d, isZero: b, isNeg: l, isNegF: i, offsetF: g } = A(F, k, z);
        F = Z, b ? W = W.add(v(i, $[g])) : V = V.add(v(l, $[d]));
      }
      return m(F), { p: V, f: W };
    }
    /**
     * Implements ec unsafe (non const-time) multiplication using precomputed tables and w-ary non-adjacent form.
     * @param acc accumulator point to add result of multiplication
     * @returns point
     */
    wNAFUnsafe(U, $, F, V = this.ZERO) {
      const W = p(U, this.bits);
      for (let z = 0; z < W.windows && F !== f; z++) {
        const { nextN: k, offset: Z, isZero: d, isNeg: b } = A(F, z, W);
        if (F = k, !d) {
          const l = $[Z];
          V = V.add(b ? l.negate() : l);
        }
      }
      return m(F), V;
    }
    getPrecomputes(U, $, F) {
      let V = N.get($);
      return V || (V = this.precomputeWindow($, U), U !== 1 && (typeof F == "function" && (V = F(V)), N.set($, V))), V;
    }
    cached(U, $, F) {
      const V = R(U);
      return this.wNAF(V, this.getPrecomputes(V, U, F), $);
    }
    unsafe(U, $, F, V) {
      const W = R(U);
      return W === 1 ? this._unsafeLadder(U, $, V) : this.wNAFUnsafe(W, this.getPrecomputes(W, U, F), $, V);
    }
    // We calculate precomputes for elliptic curve point multiplication
    // using windowed method. This specifies window size and
    // stores precomputed values. Usually only base point would be precomputed.
    createCache(U, $) {
      c($, this.bits), _.set(U, $), N.delete(U);
    }
    hasCache(U) {
      return R(U) !== 1;
    }
  }
  Ce.wNAF = S;
  function w(x, U, $, F) {
    let V = U, W = x.ZERO, z = x.ZERO;
    for (; $ > f || F > f; )
      $ & h && (W = W.add(V)), F & h && (z = z.add(V)), V = V.double(), $ >>= h, F >>= h;
    return { p1: W, p2: z };
  }
  function T(x, U, $, F) {
    K($, x), H(F, U);
    const V = $.length, W = F.length;
    if (V !== W)
      throw new Error("arrays of points and scalars must have equal length");
    const z = x.ZERO, k = (0, e.bitLen)(BigInt(V));
    let Z = 1;
    k > 12 ? Z = k - 3 : k > 4 ? Z = k - 2 : k > 0 && (Z = 2);
    const d = (0, e.bitMask)(Z), b = new Array(Number(d) + 1).fill(z), l = Math.floor((U.BITS - 1) / Z) * Z;
    let i = z;
    for (let g = l; g >= 0; g -= Z) {
      b.fill(z);
      for (let t = 0; t < W; t++) {
        const s = F[t], a = Number(s >> BigInt(g) & d);
        b[a] = b[a].add($[t]);
      }
      let y = z;
      for (let t = b.length - 1, s = z; t > 0; t--)
        s = s.add(b[t]), y = y.add(s);
      if (i = i.add(y), g !== 0)
        for (let t = 0; t < Z; t++)
          i = i.double();
    }
    return i;
  }
  function M(x, U, $, F) {
    c(F, U.BITS), K($, x);
    const V = x.ZERO, W = 2 ** F - 1, z = Math.ceil(U.BITS / F), k = (0, e.bitMask)(F), Z = $.map((d) => {
      const b = [];
      for (let l = 0, i = d; l < W; l++)
        b.push(i), i = i.add(d);
      return b;
    });
    return (d) => {
      if (H(d, U), d.length > $.length)
        throw new Error("array of scalars must be smaller than array of points");
      let b = V;
      for (let l = 0; l < z; l++) {
        if (b !== V)
          for (let g = 0; g < F; g++)
            b = b.double();
        const i = BigInt(z * F - (l + 1) * F);
        for (let g = 0; g < d.length; g++) {
          const y = d[g], t = Number(y >> i & k);
          t && (b = b.add(Z[g][t - 1]));
        }
      }
      return b;
    };
  }
  function D(x) {
    return (0, o.validateField)(x.Fp), (0, e.validateObject)(x, {
      n: "bigint",
      h: "bigint",
      Gx: "field",
      Gy: "field"
    }, {
      nBitLength: "isSafeInteger",
      nByteLength: "isSafeInteger"
    }), Object.freeze({
      ...(0, o.nLength)(x.n, x.nBitLength),
      ...x,
      p: x.Fp.ORDER
    });
  }
  function j(x, U, $) {
    if (U) {
      if (U.ORDER !== x)
        throw new Error("Field.ORDER must match order: Fp == p, Fn == n");
      return (0, o.validateField)(U), U;
    } else
      return (0, o.Field)(x, { isLE: $ });
  }
  function B(x, U, $ = {}, F) {
    if (F === void 0 && (F = x === "edwards"), !U || typeof U != "object")
      throw new Error(`expected valid ${x} CURVE object`);
    for (const Z of ["p", "n", "h"]) {
      const d = U[Z];
      if (!(typeof d == "bigint" && d > f))
        throw new Error(`CURVE.${Z} must be positive bigint`);
    }
    const V = j(U.p, $.Fp, F), W = j(U.n, $.Fn, F), k = ["Gx", "Gy", "a", x === "weierstrass" ? "b" : "d"];
    for (const Z of k)
      if (!V.isValid(U[Z]))
        throw new Error(`CURVE.${Z} must be valid field element of CURVE.Fp`);
    return U = Object.freeze(Object.assign({}, U)), { CURVE: U, Fp: V, Fn: W };
  }
  return Ce;
}
var qe = {}, br;
function wo() {
  if (br) return qe;
  br = 1, Object.defineProperty(qe, "__esModule", { value: !0 }), qe.PrimeEdwardsPoint = void 0, qe.edwards = A, qe.eddsa = H, qe.twistedEdwards = R;
  const e = /* @__PURE__ */ Ve(), o = /* @__PURE__ */ Vn(), f = /* @__PURE__ */ Ge(), h = BigInt(0), v = BigInt(1), r = BigInt(2), c = BigInt(8);
  function p(m, S, w, T) {
    const M = m.sqr(w), D = m.sqr(T), j = m.add(m.mul(S.a, M), D), B = m.add(m.ONE, m.mul(S.d, m.mul(M, D)));
    return m.eql(j, B);
  }
  function A(m, S = {}) {
    const w = (0, o._createCurveFields)("edwards", m, S, S.FpFnLE), { Fp: T, Fn: M } = w;
    let D = w.CURVE;
    const { h: j } = D;
    (0, e._validateObject)(S, {}, { uvRatio: "function" });
    const B = r << BigInt(M.BYTES * 8) - v, x = (Z) => T.create(Z), U = S.uvRatio || ((Z, d) => {
      try {
        return { isValid: !0, value: T.sqrt(T.div(Z, d)) };
      } catch {
        return { isValid: !1, value: h };
      }
    });
    if (!p(T, D, D.Gx, D.Gy))
      throw new Error("bad curve params: generator point");
    function $(Z, d, b = !1) {
      const l = b ? v : h;
      return (0, e.aInRange)("coordinate " + Z, d, l, B), d;
    }
    function F(Z) {
      if (!(Z instanceof z))
        throw new Error("ExtendedPoint expected");
    }
    const V = (0, e.memoized)((Z, d) => {
      const { X: b, Y: l, Z: i } = Z, g = Z.is0();
      d == null && (d = g ? c : T.inv(i));
      const y = x(b * d), t = x(l * d), s = T.mul(i, d);
      if (g)
        return { x: h, y: v };
      if (s !== v)
        throw new Error("invZ was invalid");
      return { x: y, y: t };
    }), W = (0, e.memoized)((Z) => {
      const { a: d, d: b } = D;
      if (Z.is0())
        throw new Error("bad point: ZERO");
      const { X: l, Y: i, Z: g, T: y } = Z, t = x(l * l), s = x(i * i), a = x(g * g), n = x(a * a), u = x(t * d), O = x(a * x(u + s)), C = x(n + x(b * x(t * s)));
      if (O !== C)
        throw new Error("bad point: equation left != right (1)");
      const E = x(l * i), I = x(g * y);
      if (E !== I)
        throw new Error("bad point: equation left != right (2)");
      return !0;
    });
    class z {
      constructor(d, b, l, i) {
        this.X = $("x", d), this.Y = $("y", b), this.Z = $("z", l, !0), this.T = $("t", i), Object.freeze(this);
      }
      static CURVE() {
        return D;
      }
      static fromAffine(d) {
        if (d instanceof z)
          throw new Error("extended point not allowed");
        const { x: b, y: l } = d || {};
        return $("x", b), $("y", l), new z(b, l, v, x(b * l));
      }
      // Uses algo from RFC8032 5.1.3.
      static fromBytes(d, b = !1) {
        const l = T.BYTES, { a: i, d: g } = D;
        d = (0, e.copyBytes)((0, e._abytes2)(d, l, "point")), (0, e._abool2)(b, "zip215");
        const y = (0, e.copyBytes)(d), t = d[l - 1];
        y[l - 1] = t & -129;
        const s = (0, e.bytesToNumberLE)(y), a = b ? B : T.ORDER;
        (0, e.aInRange)("point.y", s, h, a);
        const n = x(s * s), u = x(n - v), O = x(g * n - i);
        let { isValid: C, value: E } = U(u, O);
        if (!C)
          throw new Error("bad point: invalid y coordinate");
        const I = (E & v) === v, L = (t & 128) !== 0;
        if (!b && E === h && L)
          throw new Error("bad point: x=0 and x_0=1");
        return L !== I && (E = x(-E)), z.fromAffine({ x: E, y: s });
      }
      static fromHex(d, b = !1) {
        return z.fromBytes((0, e.ensureBytes)("point", d), b);
      }
      get x() {
        return this.toAffine().x;
      }
      get y() {
        return this.toAffine().y;
      }
      precompute(d = 8, b = !0) {
        return k.createCache(this, d), b || this.multiply(r), this;
      }
      // Useful in fromAffine() - not for fromBytes(), which always created valid points.
      assertValidity() {
        W(this);
      }
      // Compare one point to another.
      equals(d) {
        F(d);
        const { X: b, Y: l, Z: i } = this, { X: g, Y: y, Z: t } = d, s = x(b * t), a = x(g * i), n = x(l * t), u = x(y * i);
        return s === a && n === u;
      }
      is0() {
        return this.equals(z.ZERO);
      }
      negate() {
        return new z(x(-this.X), this.Y, this.Z, x(-this.T));
      }
      // Fast algo for doubling Extended Point.
      // https://hyperelliptic.org/EFD/g1p/auto-twisted-extended.html#doubling-dbl-2008-hwcd
      // Cost: 4M + 4S + 1*a + 6add + 1*2.
      double() {
        const { a: d } = D, { X: b, Y: l, Z: i } = this, g = x(b * b), y = x(l * l), t = x(r * x(i * i)), s = x(d * g), a = b + l, n = x(x(a * a) - g - y), u = s + y, O = u - t, C = s - y, E = x(n * O), I = x(u * C), L = x(n * C), q = x(O * u);
        return new z(E, I, q, L);
      }
      // Fast algo for adding 2 Extended Points.
      // https://hyperelliptic.org/EFD/g1p/auto-twisted-extended.html#addition-add-2008-hwcd
      // Cost: 9M + 1*a + 1*d + 7add.
      add(d) {
        F(d);
        const { a: b, d: l } = D, { X: i, Y: g, Z: y, T: t } = this, { X: s, Y: a, Z: n, T: u } = d, O = x(i * s), C = x(g * a), E = x(t * l * u), I = x(y * n), L = x((i + g) * (s + a) - O - C), q = I - E, X = I + E, P = x(C - b * O), G = x(L * q), ee = x(X * P), ne = x(L * P), se = x(q * X);
        return new z(G, ee, se, ne);
      }
      subtract(d) {
        return this.add(d.negate());
      }
      // Constant-time multiplication.
      multiply(d) {
        if (!M.isValidNot0(d))
          throw new Error("invalid scalar: expected 1 <= sc < curve.n");
        const { p: b, f: l } = k.cached(this, d, (i) => (0, o.normalizeZ)(z, i));
        return (0, o.normalizeZ)(z, [b, l])[0];
      }
      // Non-constant-time multiplication. Uses double-and-add algorithm.
      // It's faster, but should only be used when you don't care about
      // an exposed private key e.g. sig verification.
      // Does NOT allow scalars higher than CURVE.n.
      // Accepts optional accumulator to merge with multiply (important for sparse scalars)
      multiplyUnsafe(d, b = z.ZERO) {
        if (!M.isValid(d))
          throw new Error("invalid scalar: expected 0 <= sc < curve.n");
        return d === h ? z.ZERO : this.is0() || d === v ? this : k.unsafe(this, d, (l) => (0, o.normalizeZ)(z, l), b);
      }
      // Checks if point is of small order.
      // If you add something to small order point, you will have "dirty"
      // point with torsion component.
      // Multiplies point by cofactor and checks if the result is 0.
      isSmallOrder() {
        return this.multiplyUnsafe(j).is0();
      }
      // Multiplies point by curve order and checks if the result is 0.
      // Returns `false` is the point is dirty.
      isTorsionFree() {
        return k.unsafe(this, D.n).is0();
      }
      // Converts Extended point to default (x, y) coordinates.
      // Can accept precomputed Z^-1 - for example, from invertBatch.
      toAffine(d) {
        return V(this, d);
      }
      clearCofactor() {
        return j === v ? this : this.multiplyUnsafe(j);
      }
      toBytes() {
        const { x: d, y: b } = this.toAffine(), l = T.toBytes(b);
        return l[l.length - 1] |= d & v ? 128 : 0, l;
      }
      toHex() {
        return (0, e.bytesToHex)(this.toBytes());
      }
      toString() {
        return `<Point ${this.is0() ? "ZERO" : this.toHex()}>`;
      }
      // TODO: remove
      get ex() {
        return this.X;
      }
      get ey() {
        return this.Y;
      }
      get ez() {
        return this.Z;
      }
      get et() {
        return this.T;
      }
      static normalizeZ(d) {
        return (0, o.normalizeZ)(z, d);
      }
      static msm(d, b) {
        return (0, o.pippenger)(z, M, d, b);
      }
      _setWindowSize(d) {
        this.precompute(d);
      }
      toRawBytes() {
        return this.toBytes();
      }
    }
    z.BASE = new z(D.Gx, D.Gy, v, x(D.Gx * D.Gy)), z.ZERO = new z(h, v, v, h), z.Fp = T, z.Fn = M;
    const k = new o.wNAF(z, M.BITS);
    return z.BASE.precompute(8), z;
  }
  class K {
    constructor(S) {
      this.ep = S;
    }
    // Static methods that must be implemented by subclasses
    static fromBytes(S) {
      (0, e.notImplemented)();
    }
    static fromHex(S) {
      (0, e.notImplemented)();
    }
    get x() {
      return this.toAffine().x;
    }
    get y() {
      return this.toAffine().y;
    }
    // Common implementations
    clearCofactor() {
      return this;
    }
    assertValidity() {
      this.ep.assertValidity();
    }
    toAffine(S) {
      return this.ep.toAffine(S);
    }
    toHex() {
      return (0, e.bytesToHex)(this.toBytes());
    }
    toString() {
      return this.toHex();
    }
    isTorsionFree() {
      return !0;
    }
    isSmallOrder() {
      return !1;
    }
    add(S) {
      return this.assertSame(S), this.init(this.ep.add(S.ep));
    }
    subtract(S) {
      return this.assertSame(S), this.init(this.ep.subtract(S.ep));
    }
    multiply(S) {
      return this.init(this.ep.multiply(S));
    }
    multiplyUnsafe(S) {
      return this.init(this.ep.multiplyUnsafe(S));
    }
    double() {
      return this.init(this.ep.double());
    }
    negate() {
      return this.init(this.ep.negate());
    }
    precompute(S, w) {
      return this.init(this.ep.precompute(S, w));
    }
    /** @deprecated use `toBytes` */
    toRawBytes() {
      return this.toBytes();
    }
  }
  qe.PrimeEdwardsPoint = K;
  function H(m, S, w = {}) {
    if (typeof S != "function")
      throw new Error('"hash" function param is required');
    (0, e._validateObject)(w, {}, {
      adjustScalarBytes: "function",
      randomBytes: "function",
      domain: "function",
      prehash: "function",
      mapToCurve: "function"
    });
    const { prehash: T } = w, { BASE: M, Fp: D, Fn: j } = m, B = w.randomBytes || e.randomBytes, x = w.adjustScalarBytes || ((a) => a), U = w.domain || ((a, n, u) => {
      if ((0, e._abool2)(u, "phflag"), n.length || u)
        throw new Error("Contexts/pre-hash are not supported");
      return a;
    });
    function $(a) {
      return j.create((0, e.bytesToNumberLE)(a));
    }
    function F(a) {
      const n = l.secretKey;
      a = (0, e.ensureBytes)("private key", a, n);
      const u = (0, e.ensureBytes)("hashed private key", S(a), 2 * n), O = x(u.slice(0, n)), C = u.slice(n, 2 * n), E = $(O);
      return { head: O, prefix: C, scalar: E };
    }
    function V(a) {
      const { head: n, prefix: u, scalar: O } = F(a), C = M.multiply(O), E = C.toBytes();
      return { head: n, prefix: u, scalar: O, point: C, pointBytes: E };
    }
    function W(a) {
      return V(a).pointBytes;
    }
    function z(a = Uint8Array.of(), ...n) {
      const u = (0, e.concatBytes)(...n);
      return $(S(U(u, (0, e.ensureBytes)("context", a), !!T)));
    }
    function k(a, n, u = {}) {
      a = (0, e.ensureBytes)("message", a), T && (a = T(a));
      const { prefix: O, scalar: C, pointBytes: E } = V(n), I = z(u.context, O, a), L = M.multiply(I).toBytes(), q = z(u.context, L, E, a), X = j.create(I + q * C);
      if (!j.isValid(X))
        throw new Error("sign failed: invalid s");
      const P = (0, e.concatBytes)(L, j.toBytes(X));
      return (0, e._abytes2)(P, l.signature, "result");
    }
    const Z = { zip215: !0 };
    function d(a, n, u, O = Z) {
      const { context: C, zip215: E } = O, I = l.signature;
      a = (0, e.ensureBytes)("signature", a, I), n = (0, e.ensureBytes)("message", n), u = (0, e.ensureBytes)("publicKey", u, l.publicKey), E !== void 0 && (0, e._abool2)(E, "zip215"), T && (n = T(n));
      const L = I / 2, q = a.subarray(0, L), X = (0, e.bytesToNumberLE)(a.subarray(L, I));
      let P, G, ee;
      try {
        P = m.fromBytes(u, E), G = m.fromBytes(q, E), ee = M.multiplyUnsafe(X);
      } catch {
        return !1;
      }
      if (!E && P.isSmallOrder())
        return !1;
      const ne = z(C, G.toBytes(), P.toBytes(), n);
      return G.add(P.multiplyUnsafe(ne)).subtract(ee).clearCofactor().is0();
    }
    const b = D.BYTES, l = {
      secretKey: b,
      publicKey: b,
      signature: 2 * b,
      seed: b
    };
    function i(a = B(l.seed)) {
      return (0, e._abytes2)(a, l.seed, "seed");
    }
    function g(a) {
      const n = s.randomSecretKey(a);
      return { secretKey: n, publicKey: W(n) };
    }
    function y(a) {
      return (0, e.isBytes)(a) && a.length === j.BYTES;
    }
    function t(a, n) {
      try {
        return !!m.fromBytes(a, n);
      } catch {
        return !1;
      }
    }
    const s = {
      getExtendedPublicKey: V,
      randomSecretKey: i,
      isValidSecretKey: y,
      isValidPublicKey: t,
      /**
       * Converts ed public key to x public key. Uses formula:
       * - ed25519:
       *   - `(u, v) = ((1+y)/(1-y), sqrt(-486664)*u/x)`
       *   - `(x, y) = (sqrt(-486664)*u/v, (u-1)/(u+1))`
       * - ed448:
       *   - `(u, v) = ((y-1)/(y+1), sqrt(156324)*u/x)`
       *   - `(x, y) = (sqrt(156324)*u/v, (1+u)/(1-u))`
       */
      toMontgomery(a) {
        const { y: n } = m.fromBytes(a), u = l.publicKey, O = u === 32;
        if (!O && u !== 57)
          throw new Error("only defined for 25519 and 448");
        const C = O ? D.div(v + n, v - n) : D.div(n - v, n + v);
        return D.toBytes(C);
      },
      toMontgomerySecret(a) {
        const n = l.secretKey;
        (0, e._abytes2)(a, n);
        const u = S(a.subarray(0, n));
        return x(u).subarray(0, n);
      },
      /** @deprecated */
      randomPrivateKey: i,
      /** @deprecated */
      precompute(a = 8, n = m.BASE) {
        return n.precompute(a, !1);
      }
    };
    return Object.freeze({
      keygen: g,
      getPublicKey: W,
      sign: k,
      verify: d,
      utils: s,
      Point: m,
      lengths: l
    });
  }
  function N(m) {
    const S = {
      a: m.a,
      d: m.d,
      p: m.Fp.ORDER,
      n: m.n,
      h: m.h,
      Gx: m.Gx,
      Gy: m.Gy
    }, w = m.Fp, T = (0, f.Field)(S.n, m.nBitLength, !0), M = { Fp: w, Fn: T, uvRatio: m.uvRatio }, D = {
      randomBytes: m.randomBytes,
      adjustScalarBytes: m.adjustScalarBytes,
      domain: m.domain,
      prehash: m.prehash,
      mapToCurve: m.mapToCurve
    };
    return { CURVE: S, curveOpts: M, hash: m.hash, eddsaOpts: D };
  }
  function _(m, S) {
    const w = S.Point;
    return Object.assign({}, S, {
      ExtendedPoint: w,
      CURVE: m,
      nBitLength: w.Fn.BITS,
      nByteLength: w.Fn.BYTES
    });
  }
  function R(m) {
    const { CURVE: S, curveOpts: w, hash: T, eddsaOpts: M } = N(m), D = A(S, w), j = H(D, T, M);
    return _(m, j);
  }
  return qe;
}
var qt = {}, mr;
function qs() {
  return mr || (mr = 1, (function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e._DST_scalar = void 0, e.expand_message_xmd = A, e.expand_message_xof = K, e.hash_to_field = H, e.isogenyMap = N, e.createHasher = _;
    const o = /* @__PURE__ */ Ve(), f = /* @__PURE__ */ Ge(), h = o.bytesToNumberBE;
    function v(R, m) {
      if (c(R), c(m), R < 0 || R >= 1 << 8 * m)
        throw new Error("invalid I2OSP input: " + R);
      const S = Array.from({ length: m }).fill(0);
      for (let w = m - 1; w >= 0; w--)
        S[w] = R & 255, R >>>= 8;
      return new Uint8Array(S);
    }
    function r(R, m) {
      const S = new Uint8Array(R.length);
      for (let w = 0; w < R.length; w++)
        S[w] = R[w] ^ m[w];
      return S;
    }
    function c(R) {
      if (!Number.isSafeInteger(R))
        throw new Error("number expected");
    }
    function p(R) {
      if (!(0, o.isBytes)(R) && typeof R != "string")
        throw new Error("DST must be Uint8Array or string");
      return typeof R == "string" ? (0, o.utf8ToBytes)(R) : R;
    }
    function A(R, m, S, w) {
      (0, o.abytes)(R), c(S), m = p(m), m.length > 255 && (m = w((0, o.concatBytes)((0, o.utf8ToBytes)("H2C-OVERSIZE-DST-"), m)));
      const { outputLen: T, blockLen: M } = w, D = Math.ceil(S / T);
      if (S > 65535 || D > 255)
        throw new Error("expand_message_xmd: invalid lenInBytes");
      const j = (0, o.concatBytes)(m, v(m.length, 1)), B = v(0, M), x = v(S, 2), U = new Array(D), $ = w((0, o.concatBytes)(B, R, x, v(0, 1), j));
      U[0] = w((0, o.concatBytes)($, v(1, 1), j));
      for (let V = 1; V <= D; V++) {
        const W = [r($, U[V - 1]), v(V + 1, 1), j];
        U[V] = w((0, o.concatBytes)(...W));
      }
      return (0, o.concatBytes)(...U).slice(0, S);
    }
    function K(R, m, S, w, T) {
      if ((0, o.abytes)(R), c(S), m = p(m), m.length > 255) {
        const M = Math.ceil(2 * w / 8);
        m = T.create({ dkLen: M }).update((0, o.utf8ToBytes)("H2C-OVERSIZE-DST-")).update(m).digest();
      }
      if (S > 65535 || m.length > 255)
        throw new Error("expand_message_xof: invalid lenInBytes");
      return T.create({ dkLen: S }).update(R).update(v(S, 2)).update(m).update(v(m.length, 1)).digest();
    }
    function H(R, m, S) {
      (0, o._validateObject)(S, {
        p: "bigint",
        m: "number",
        k: "number",
        hash: "function"
      });
      const { p: w, k: T, m: M, hash: D, expand: j, DST: B } = S;
      if (!(0, o.isHash)(S.hash))
        throw new Error("expected valid hash");
      (0, o.abytes)(R), c(m);
      const x = w.toString(2).length, U = Math.ceil((x + T) / 8), $ = m * M * U;
      let F;
      if (j === "xmd")
        F = A(R, B, $, D);
      else if (j === "xof")
        F = K(R, B, $, T, D);
      else if (j === "_internal_pass")
        F = R;
      else
        throw new Error('expand must be "xmd" or "xof"');
      const V = new Array(m);
      for (let W = 0; W < m; W++) {
        const z = new Array(M);
        for (let k = 0; k < M; k++) {
          const Z = U * (k + W * M), d = F.subarray(Z, Z + U);
          z[k] = (0, f.mod)(h(d), w);
        }
        V[W] = z;
      }
      return V;
    }
    function N(R, m) {
      const S = m.map((w) => Array.from(w).reverse());
      return (w, T) => {
        const [M, D, j, B] = S.map(($) => $.reduce((F, V) => R.add(R.mul(F, w), V))), [x, U] = (0, f.FpInvertBatch)(R, [D, B], !0);
        return w = R.mul(M, x), T = R.mul(T, R.mul(j, U)), { x: w, y: T };
      };
    }
    e._DST_scalar = (0, o.utf8ToBytes)("HashToScalar-");
    function _(R, m, S) {
      if (typeof m != "function")
        throw new Error("mapToCurve() must be defined");
      function w(M) {
        return R.fromAffine(m(M));
      }
      function T(M) {
        const D = M.clearCofactor();
        return D.equals(R.ZERO) ? R.ZERO : (D.assertValidity(), D);
      }
      return {
        defaults: S,
        hashToCurve(M, D) {
          const j = Object.assign({}, S, D), B = H(M, 2, j), x = w(B[0]), U = w(B[1]);
          return T(x.add(U));
        },
        encodeToCurve(M, D) {
          const j = S.encodeDST ? { DST: S.encodeDST } : {}, B = Object.assign({}, S, j, D), x = H(M, 1, B), U = w(x[0]);
          return T(U);
        },
        /** See {@link H2CHasher} */
        mapToCurve(M) {
          if (!Array.isArray(M))
            throw new Error("expected array of bigints");
          for (const D of M)
            if (typeof D != "bigint")
              throw new Error("expected array of bigints");
          return T(w(M));
        },
        // hash_to_scalar can produce 0: https://www.rfc-editor.org/errata/eid8393
        // RFC 9380, draft-irtf-cfrg-bbs-signatures-08
        hashToScalar(M, D) {
          const j = R.Fn.ORDER, B = Object.assign({}, S, { p: j, m: 1, DST: e._DST_scalar }, D);
          return H(M, 1, B)[0][0];
        }
      };
    }
  })(qt)), qt;
}
var ot = {}, Er;
function So() {
  if (Er) return ot;
  Er = 1, Object.defineProperty(ot, "__esModule", { value: !0 }), ot.montgomery = c;
  const e = /* @__PURE__ */ Ve(), o = /* @__PURE__ */ Ge(), f = BigInt(0), h = BigInt(1), v = BigInt(2);
  function r(p) {
    return (0, e._validateObject)(p, {
      adjustScalarBytes: "function",
      powPminus2: "function"
    }), Object.freeze({ ...p });
  }
  function c(p) {
    const A = r(p), { P: K, type: H, adjustScalarBytes: N, powPminus2: _, randomBytes: R } = A, m = H === "x25519";
    if (!m && H !== "x448")
      throw new Error("invalid type");
    const S = R || e.randomBytes, w = m ? 255 : 448, T = m ? 32 : 56, M = BigInt(m ? 9 : 5), D = BigInt(m ? 121665 : 39081), j = m ? v ** BigInt(254) : v ** BigInt(447), B = m ? BigInt(8) * v ** BigInt(251) - h : BigInt(4) * v ** BigInt(445) - h, x = j + B + h, U = (y) => (0, o.mod)(y, K), $ = F(M);
    function F(y) {
      return (0, e.numberToBytesLE)(U(y), T);
    }
    function V(y) {
      const t = (0, e.ensureBytes)("u coordinate", y, T);
      return m && (t[31] &= 127), U((0, e.bytesToNumberLE)(t));
    }
    function W(y) {
      return (0, e.bytesToNumberLE)(N((0, e.ensureBytes)("scalar", y, T)));
    }
    function z(y, t) {
      const s = d(V(t), W(y));
      if (s === f)
        throw new Error("invalid private or public key received");
      return F(s);
    }
    function k(y) {
      return z(y, $);
    }
    function Z(y, t, s) {
      const a = U(y * (t - s));
      return t = U(t - a), s = U(s + a), { x_2: t, x_3: s };
    }
    function d(y, t) {
      (0, e.aInRange)("u", y, f, K), (0, e.aInRange)("scalar", t, j, x);
      const s = t, a = y;
      let n = h, u = f, O = y, C = h, E = f;
      for (let L = BigInt(w - 1); L >= f; L--) {
        const q = s >> L & h;
        E ^= q, { x_2: n, x_3: O } = Z(E, n, O), { x_2: u, x_3: C } = Z(E, u, C), E = q;
        const X = n + u, P = U(X * X), G = n - u, ee = U(G * G), ne = P - ee, se = O + C, J = O - C, ce = U(J * X), Q = U(se * G), de = ce + Q, he = ce - Q;
        O = U(de * de), C = U(a * U(he * he)), n = U(P * ee), u = U(ne * (P + U(D * ne)));
      }
      ({ x_2: n, x_3: O } = Z(E, n, O)), { x_2: u, x_3: C } = Z(E, u, C);
      const I = _(u);
      return U(n * I);
    }
    const b = {
      secretKey: T,
      publicKey: T,
      seed: T
    }, l = (y = S(T)) => ((0, e.abytes)(y, b.seed), y);
    function i(y) {
      const t = l(y);
      return { secretKey: t, publicKey: k(t) };
    }
    return {
      keygen: i,
      getSharedSecret: (y, t) => z(y, t),
      getPublicKey: (y) => k(y),
      scalarMult: z,
      scalarMultBase: k,
      utils: {
        randomSecretKey: l,
        randomPrivateKey: l
      },
      GuBytes: $.slice(),
      lengths: b
    };
  }
  return ot;
}
var _r;
function Bo() {
  return _r || (_r = 1, (function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.hash_to_ristretto255 = e.hashToRistretto255 = e.encodeToCurve = e.hashToCurve = e.RistrettoPoint = e.edwardsToMontgomery = e.ED25519_TORSION_SUBGROUP = e.ristretto255_hasher = e.ristretto255 = e.ed25519_hasher = e.x25519 = e.ed25519ph = e.ed25519ctx = e.ed25519 = void 0, e.edwardsToMontgomeryPub = O, e.edwardsToMontgomeryPriv = C;
    const o = /* @__PURE__ */ Un(), f = /* @__PURE__ */ Ne(), h = /* @__PURE__ */ Vn(), v = /* @__PURE__ */ wo(), r = /* @__PURE__ */ qs(), c = /* @__PURE__ */ Ge(), p = /* @__PURE__ */ So(), A = /* @__PURE__ */ Ve(), K = /* @__PURE__ */ BigInt(0), H = BigInt(1), N = BigInt(2), _ = BigInt(3), R = BigInt(5), m = BigInt(8), S = BigInt("0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffed"), w = {
      p: S,
      n: BigInt("0x1000000000000000000000000000000014def9dea2f79cd65812631a5cf5d3ed"),
      h: m,
      a: BigInt("0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffec"),
      d: BigInt("0x52036cee2b6ffe738cc740797779e89800700a4d4141d8ab75eb4dca135978a3"),
      Gx: BigInt("0x216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a"),
      Gy: BigInt("0x6666666666666666666666666666666666666666666666666666666666666658")
    };
    function T(E) {
      const I = BigInt(10), L = BigInt(20), q = BigInt(40), X = BigInt(80), P = S, ee = E * E % P * E % P, ne = (0, c.pow2)(ee, N, P) * ee % P, se = (0, c.pow2)(ne, H, P) * E % P, J = (0, c.pow2)(se, R, P) * se % P, ce = (0, c.pow2)(J, I, P) * J % P, Q = (0, c.pow2)(ce, L, P) * ce % P, de = (0, c.pow2)(Q, q, P) * Q % P, he = (0, c.pow2)(de, X, P) * de % P, le = (0, c.pow2)(he, X, P) * de % P, re = (0, c.pow2)(le, I, P) * J % P;
      return { pow_p_5_8: (0, c.pow2)(re, N, P) * E % P, b2: ee };
    }
    function M(E) {
      return E[0] &= 248, E[31] &= 127, E[31] |= 64, E;
    }
    const D = /* @__PURE__ */ BigInt("19681161376707505956807079304988542015446066515923890162744021073123829784752");
    function j(E, I) {
      const L = S, q = (0, c.mod)(I * I * I, L), X = (0, c.mod)(q * q * I, L), P = T(E * X).pow_p_5_8;
      let G = (0, c.mod)(E * q * P, L);
      const ee = (0, c.mod)(I * G * G, L), ne = G, se = (0, c.mod)(G * D, L), J = ee === E, ce = ee === (0, c.mod)(-E, L), Q = ee === (0, c.mod)(-E * D, L);
      return J && (G = ne), (ce || Q) && (G = se), (0, c.isNegativeLE)(G, L) && (G = (0, c.mod)(-G, L)), { isValid: J || ce, value: G };
    }
    const B = (0, c.Field)(w.p, { isLE: !0 }), x = (0, c.Field)(w.n, { isLE: !0 }), U = {
      ...w,
      Fp: B,
      hash: o.sha512,
      adjustScalarBytes: M,
      // dom2
      // Ratio of u to v. Allows us to combine inversion and square root. Uses algo from RFC8032 5.1.3.
      // Constant-time, u/√v
      uvRatio: j
    };
    e.ed25519 = (0, v.twistedEdwards)(U);
    function $(E, I, L) {
      if (I.length > 255)
        throw new Error("Context is too big");
      return (0, f.concatBytes)((0, f.utf8ToBytes)("SigEd25519 no Ed25519 collisions"), new Uint8Array([L ? 1 : 0, I.length]), I, E);
    }
    e.ed25519ctx = (0, v.twistedEdwards)({
      ...U,
      domain: $
    }), e.ed25519ph = (0, v.twistedEdwards)(Object.assign({}, U, {
      domain: $,
      prehash: o.sha512
    })), e.x25519 = (() => {
      const E = B.ORDER;
      return (0, p.montgomery)({
        P: E,
        type: "x25519",
        powPminus2: (I) => {
          const { pow_p_5_8: L, b2: q } = T(I);
          return (0, c.mod)((0, c.pow2)(L, _, E) * q, E);
        },
        adjustScalarBytes: M
      });
    })();
    const F = (S + _) / m, V = B.pow(N, F), W = B.sqrt(B.neg(B.ONE));
    function z(E) {
      const I = (S - R) / m, L = BigInt(486662);
      let q = B.sqr(E);
      q = B.mul(q, N);
      let X = B.add(q, B.ONE), P = B.neg(L), G = B.sqr(X), ee = B.mul(G, X), ne = B.mul(q, L);
      ne = B.mul(ne, P), ne = B.add(ne, G), ne = B.mul(ne, P);
      let se = B.sqr(ee);
      G = B.sqr(se), se = B.mul(se, ee), se = B.mul(se, ne), G = B.mul(G, se);
      let J = B.pow(G, I);
      J = B.mul(J, se);
      let ce = B.mul(J, W);
      G = B.sqr(J), G = B.mul(G, ee);
      let Q = B.eql(G, ne), de = B.cmov(ce, J, Q), he = B.mul(P, q), le = B.mul(J, E);
      le = B.mul(le, V);
      let re = B.mul(le, W), ie = B.mul(ne, q);
      G = B.sqr(le), G = B.mul(G, ee);
      let oe = B.eql(G, ie), fe = B.cmov(re, le, oe);
      G = B.sqr(de), G = B.mul(G, ee);
      let pe = B.eql(G, ne), be = B.cmov(he, P, pe), ge = B.cmov(fe, de, pe), ve = B.isOdd(ge);
      return ge = B.cmov(ge, B.neg(ge), pe !== ve), { xMn: be, xMd: X, yMn: ge, yMd: H };
    }
    const k = (0, c.FpSqrtEven)(B, B.neg(BigInt(486664)));
    function Z(E) {
      const { xMn: I, xMd: L, yMn: q, yMd: X } = z(E);
      let P = B.mul(I, X);
      P = B.mul(P, k);
      let G = B.mul(L, q), ee = B.sub(I, L), ne = B.add(I, L), se = B.mul(G, ne), J = B.eql(se, B.ZERO);
      P = B.cmov(P, B.ZERO, J), G = B.cmov(G, B.ONE, J), ee = B.cmov(ee, B.ONE, J), ne = B.cmov(ne, B.ONE, J);
      const [ce, Q] = (0, c.FpInvertBatch)(B, [G, ne], !0);
      return { x: B.mul(P, ce), y: B.mul(ee, Q) };
    }
    e.ed25519_hasher = (0, r.createHasher)(e.ed25519.Point, (E) => Z(E[0]), {
      DST: "edwards25519_XMD:SHA-512_ELL2_RO_",
      encodeDST: "edwards25519_XMD:SHA-512_ELL2_NU_",
      p: S,
      m: 1,
      k: 128,
      expand: "xmd",
      hash: o.sha512
    });
    const d = D, b = /* @__PURE__ */ BigInt("25063068953384623474111414158702152701244531502492656460079210482610430750235"), l = /* @__PURE__ */ BigInt("54469307008909316920995813868745141605393597292927456921205312896311721017578"), i = /* @__PURE__ */ BigInt("1159843021668779879193775521855586647937357759715417654439879720876111806838"), g = /* @__PURE__ */ BigInt("40440834346308536858101042469323190826248399146238708352240133220865137265952"), y = (E) => j(H, E), t = /* @__PURE__ */ BigInt("0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"), s = (E) => e.ed25519.Point.Fp.create((0, A.bytesToNumberLE)(E) & t);
    function a(E) {
      const { d: I } = w, L = S, q = (ie) => B.create(ie), X = q(d * E * E), P = q((X + H) * i);
      let G = BigInt(-1);
      const ee = q((G - I * X) * q(X + I));
      let { isValid: ne, value: se } = j(P, ee), J = q(se * E);
      (0, c.isNegativeLE)(J, L) || (J = q(-J)), ne || (se = J), ne || (G = X);
      const ce = q(G * (X - H) * g - ee), Q = se * se, de = q((se + se) * ee), he = q(ce * b), le = q(H - Q), re = q(H + Q);
      return new e.ed25519.Point(q(de * re), q(le * he), q(he * re), q(de * le));
    }
    function n(E) {
      (0, f.abytes)(E, 64);
      const I = s(E.subarray(0, 32)), L = a(I), q = s(E.subarray(32, 64)), X = a(q);
      return new u(L.add(X));
    }
    class u extends v.PrimeEdwardsPoint {
      constructor(I) {
        super(I);
      }
      static fromAffine(I) {
        return new u(e.ed25519.Point.fromAffine(I));
      }
      assertSame(I) {
        if (!(I instanceof u))
          throw new Error("RistrettoPoint expected");
      }
      init(I) {
        return new u(I);
      }
      /** @deprecated use `import { ristretto255_hasher } from '@noble/curves/ed25519.js';` */
      static hashToCurve(I) {
        return n((0, A.ensureBytes)("ristrettoHash", I, 64));
      }
      static fromBytes(I) {
        (0, f.abytes)(I, 32);
        const { a: L, d: q } = w, X = S, P = (pe) => B.create(pe), G = s(I);
        if (!(0, A.equalBytes)(B.toBytes(G), I) || (0, c.isNegativeLE)(G, X))
          throw new Error("invalid ristretto255 encoding 1");
        const ee = P(G * G), ne = P(H + L * ee), se = P(H - L * ee), J = P(ne * ne), ce = P(se * se), Q = P(L * q * J - ce), { isValid: de, value: he } = y(P(Q * ce)), le = P(he * se), re = P(he * le * Q);
        let ie = P((G + G) * le);
        (0, c.isNegativeLE)(ie, X) && (ie = P(-ie));
        const oe = P(ne * re), fe = P(ie * oe);
        if (!de || (0, c.isNegativeLE)(fe, X) || oe === K)
          throw new Error("invalid ristretto255 encoding 2");
        return new u(new e.ed25519.Point(ie, oe, H, fe));
      }
      /**
       * Converts ristretto-encoded string to ristretto point.
       * Described in [RFC9496](https://www.rfc-editor.org/rfc/rfc9496#name-decode).
       * @param hex Ristretto-encoded 32 bytes. Not every 32-byte string is valid ristretto encoding
       */
      static fromHex(I) {
        return u.fromBytes((0, A.ensureBytes)("ristrettoHex", I, 32));
      }
      static msm(I, L) {
        return (0, h.pippenger)(u, e.ed25519.Point.Fn, I, L);
      }
      /**
       * Encodes ristretto point to Uint8Array.
       * Described in [RFC9496](https://www.rfc-editor.org/rfc/rfc9496#name-encode).
       */
      toBytes() {
        let { X: I, Y: L, Z: q, T: X } = this.ep;
        const P = S, G = (re) => B.create(re), ee = G(G(q + L) * G(q - L)), ne = G(I * L), se = G(ne * ne), { value: J } = y(G(ee * se)), ce = G(J * ee), Q = G(J * ne), de = G(ce * Q * X);
        let he;
        if ((0, c.isNegativeLE)(X * de, P)) {
          let re = G(L * d), ie = G(I * d);
          I = re, L = ie, he = G(ce * l);
        } else
          he = Q;
        (0, c.isNegativeLE)(I * de, P) && (L = G(-L));
        let le = G((q - L) * he);
        return (0, c.isNegativeLE)(le, P) && (le = G(-le)), B.toBytes(le);
      }
      /**
       * Compares two Ristretto points.
       * Described in [RFC9496](https://www.rfc-editor.org/rfc/rfc9496#name-equals).
       */
      equals(I) {
        this.assertSame(I);
        const { X: L, Y: q } = this.ep, { X, Y: P } = I.ep, G = (se) => B.create(se), ee = G(L * P) === G(q * X), ne = G(q * P) === G(L * X);
        return ee || ne;
      }
      is0() {
        return this.equals(u.ZERO);
      }
    }
    u.BASE = new u(e.ed25519.Point.BASE), u.ZERO = new u(e.ed25519.Point.ZERO), u.Fp = B, u.Fn = x, e.ristretto255 = { Point: u }, e.ristretto255_hasher = {
      hashToCurve(E, I) {
        const L = I?.DST || "ristretto255_XMD:SHA-512_R255MAP_RO_", q = (0, r.expand_message_xmd)(E, L, 64, o.sha512);
        return n(q);
      },
      hashToScalar(E, I = { DST: r._DST_scalar }) {
        const L = (0, r.expand_message_xmd)(E, I.DST, 64, o.sha512);
        return x.create((0, A.bytesToNumberLE)(L));
      }
    }, e.ED25519_TORSION_SUBGROUP = [
      "0100000000000000000000000000000000000000000000000000000000000000",
      "c7176a703d4dd84fba3c0b760d10670f2a2053fa2c39ccc64ec7fd7792ac037a",
      "0000000000000000000000000000000000000000000000000000000000000080",
      "26e8958fc2b227b045c3f489f2ef98f0d5dfac05d3c63339b13802886d53fc05",
      "ecffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff7f",
      "26e8958fc2b227b045c3f489f2ef98f0d5dfac05d3c63339b13802886d53fc85",
      "0000000000000000000000000000000000000000000000000000000000000000",
      "c7176a703d4dd84fba3c0b760d10670f2a2053fa2c39ccc64ec7fd7792ac03fa"
    ];
    function O(E) {
      return e.ed25519.utils.toMontgomery((0, A.ensureBytes)("pub", E));
    }
    e.edwardsToMontgomery = O;
    function C(E) {
      return e.ed25519.utils.toMontgomerySecret((0, A.ensureBytes)("pub", E));
    }
    e.RistrettoPoint = u, e.hashToCurve = e.ed25519_hasher.hashToCurve, e.encodeToCurve = e.ed25519_hasher.encodeToCurve, e.hashToRistretto255 = e.ristretto255_hasher.hashToCurve, e.hash_to_ristretto255 = e.ristretto255_hasher.hashToCurve;
  })(Ht)), Ht;
}
var Dt = {}, et = {}, Ut = {}, Vt = {}, wr;
function Ds() {
  return wr || (wr = 1, (function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.hmac = e.HMAC = void 0;
    const o = /* @__PURE__ */ Ne();
    class f extends o.Hash {
      constructor(r, c) {
        super(), this.finished = !1, this.destroyed = !1, (0, o.ahash)(r);
        const p = (0, o.toBytes)(c);
        if (this.iHash = r.create(), typeof this.iHash.update != "function")
          throw new Error("Expected instance of class which extends utils.Hash");
        this.blockLen = this.iHash.blockLen, this.outputLen = this.iHash.outputLen;
        const A = this.blockLen, K = new Uint8Array(A);
        K.set(p.length > A ? r.create().update(p).digest() : p);
        for (let H = 0; H < K.length; H++)
          K[H] ^= 54;
        this.iHash.update(K), this.oHash = r.create();
        for (let H = 0; H < K.length; H++)
          K[H] ^= 106;
        this.oHash.update(K), (0, o.clean)(K);
      }
      update(r) {
        return (0, o.aexists)(this), this.iHash.update(r), this;
      }
      digestInto(r) {
        (0, o.aexists)(this), (0, o.abytes)(r, this.outputLen), this.finished = !0, this.iHash.digestInto(r), this.oHash.update(r), this.oHash.digestInto(r), this.destroy();
      }
      digest() {
        const r = new Uint8Array(this.oHash.outputLen);
        return this.digestInto(r), r;
      }
      _cloneInto(r) {
        r || (r = Object.create(Object.getPrototypeOf(this), {}));
        const { oHash: c, iHash: p, finished: A, destroyed: K, blockLen: H, outputLen: N } = this;
        return r = r, r.finished = A, r.destroyed = K, r.blockLen = H, r.outputLen = N, r.oHash = c._cloneInto(r.oHash), r.iHash = p._cloneInto(r.iHash), r;
      }
      clone() {
        return this._cloneInto();
      }
      destroy() {
        this.destroyed = !0, this.oHash.destroy(), this.iHash.destroy();
      }
    }
    e.HMAC = f;
    const h = (v, r, c) => new f(v, r).update(c).digest();
    e.hmac = h, e.hmac.create = (v, r) => new f(v, r);
  })(Vt)), Vt;
}
var Sr;
function Us() {
  return Sr || (Sr = 1, (function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.DER = e.DERErr = void 0, e._splitEndoScalar = p, e._normFnElement = w, e.weierstrassN = T, e.SWUFpSqrtRatio = D, e.mapToCurveSimpleSWU = j, e.ecdh = x, e.ecdsa = U, e.weierstrassPoints = $, e._legacyHelperEquat = W, e.weierstrass = Z;
    const o = /* @__PURE__ */ Ds(), f = /* @__PURE__ */ Ne(), h = /* @__PURE__ */ Ve(), v = /* @__PURE__ */ Vn(), r = /* @__PURE__ */ Ge(), c = (d, b) => (d + (d >= 0 ? b : -b) / R) / b;
    function p(d, b, l) {
      const [[i, g], [y, t]] = b, s = c(t * d, l), a = c(-g * d, l);
      let n = d - s * i - a * y, u = -s * g - a * t;
      const O = n < N, C = u < N;
      O && (n = -n), C && (u = -u);
      const E = (0, h.bitMask)(Math.ceil((0, h.bitLen)(l) / 2)) + _;
      if (n < N || n >= E || u < N || u >= E)
        throw new Error("splitScalar (endomorphism): failed, k=" + d);
      return { k1neg: O, k1: n, k2neg: C, k2: u };
    }
    function A(d) {
      if (!["compact", "recovered", "der"].includes(d))
        throw new Error('Signature format must be "compact", "recovered", or "der"');
      return d;
    }
    function K(d, b) {
      const l = {};
      for (let i of Object.keys(b))
        l[i] = d[i] === void 0 ? b[i] : d[i];
      return (0, h._abool2)(l.lowS, "lowS"), (0, h._abool2)(l.prehash, "prehash"), l.format !== void 0 && A(l.format), l;
    }
    class H extends Error {
      constructor(b = "") {
        super(b);
      }
    }
    e.DERErr = H, e.DER = {
      // asn.1 DER encoding utils
      Err: H,
      // Basic building block is TLV (Tag-Length-Value)
      _tlv: {
        encode: (d, b) => {
          const { Err: l } = e.DER;
          if (d < 0 || d > 256)
            throw new l("tlv.encode: wrong tag");
          if (b.length & 1)
            throw new l("tlv.encode: unpadded data");
          const i = b.length / 2, g = (0, h.numberToHexUnpadded)(i);
          if (g.length / 2 & 128)
            throw new l("tlv.encode: long form length too big");
          const y = i > 127 ? (0, h.numberToHexUnpadded)(g.length / 2 | 128) : "";
          return (0, h.numberToHexUnpadded)(d) + y + g + b;
        },
        // v - value, l - left bytes (unparsed)
        decode(d, b) {
          const { Err: l } = e.DER;
          let i = 0;
          if (d < 0 || d > 256)
            throw new l("tlv.encode: wrong tag");
          if (b.length < 2 || b[i++] !== d)
            throw new l("tlv.decode: wrong tlv");
          const g = b[i++], y = !!(g & 128);
          let t = 0;
          if (!y)
            t = g;
          else {
            const a = g & 127;
            if (!a)
              throw new l("tlv.decode(long): indefinite length not supported");
            if (a > 4)
              throw new l("tlv.decode(long): byte length is too big");
            const n = b.subarray(i, i + a);
            if (n.length !== a)
              throw new l("tlv.decode: length bytes not complete");
            if (n[0] === 0)
              throw new l("tlv.decode(long): zero leftmost byte");
            for (const u of n)
              t = t << 8 | u;
            if (i += a, t < 128)
              throw new l("tlv.decode(long): not minimal encoding");
          }
          const s = b.subarray(i, i + t);
          if (s.length !== t)
            throw new l("tlv.decode: wrong value length");
          return { v: s, l: b.subarray(i + t) };
        }
      },
      // https://crypto.stackexchange.com/a/57734 Leftmost bit of first byte is 'negative' flag,
      // since we always use positive integers here. It must always be empty:
      // - add zero byte if exists
      // - if next byte doesn't have a flag, leading zero is not allowed (minimal encoding)
      _int: {
        encode(d) {
          const { Err: b } = e.DER;
          if (d < N)
            throw new b("integer: negative integers are not allowed");
          let l = (0, h.numberToHexUnpadded)(d);
          if (Number.parseInt(l[0], 16) & 8 && (l = "00" + l), l.length & 1)
            throw new b("unexpected DER parsing assertion: unpadded hex");
          return l;
        },
        decode(d) {
          const { Err: b } = e.DER;
          if (d[0] & 128)
            throw new b("invalid signature integer: negative");
          if (d[0] === 0 && !(d[1] & 128))
            throw new b("invalid signature integer: unnecessary leading zero");
          return (0, h.bytesToNumberBE)(d);
        }
      },
      toSig(d) {
        const { Err: b, _int: l, _tlv: i } = e.DER, g = (0, h.ensureBytes)("signature", d), { v: y, l: t } = i.decode(48, g);
        if (t.length)
          throw new b("invalid signature: left bytes after parsing");
        const { v: s, l: a } = i.decode(2, y), { v: n, l: u } = i.decode(2, a);
        if (u.length)
          throw new b("invalid signature: left bytes after parsing");
        return { r: l.decode(s), s: l.decode(n) };
      },
      hexFromSig(d) {
        const { _tlv: b, _int: l } = e.DER, i = b.encode(2, l.encode(d.r)), g = b.encode(2, l.encode(d.s)), y = i + g;
        return b.encode(48, y);
      }
    };
    const N = BigInt(0), _ = BigInt(1), R = BigInt(2), m = BigInt(3), S = BigInt(4);
    function w(d, b) {
      const { BYTES: l } = d;
      let i;
      if (typeof b == "bigint")
        i = b;
      else {
        let g = (0, h.ensureBytes)("private key", b);
        try {
          i = d.fromBytes(g);
        } catch {
          throw new Error(`invalid private key: expected ui8a of size ${l}, got ${typeof b}`);
        }
      }
      if (!d.isValidNot0(i))
        throw new Error("invalid private key: out of range [1..N-1]");
      return i;
    }
    function T(d, b = {}) {
      const l = (0, v._createCurveFields)("weierstrass", d, b), { Fp: i, Fn: g } = l;
      let y = l.CURVE;
      const { h: t, n: s } = y;
      (0, h._validateObject)(b, {}, {
        allowInfinityPoint: "boolean",
        clearCofactor: "function",
        isTorsionFree: "function",
        fromBytes: "function",
        toBytes: "function",
        endo: "object",
        wrapPrivateKey: "boolean"
      });
      const { endo: a } = b;
      if (a && (!i.is0(y.a) || typeof a.beta != "bigint" || !Array.isArray(a.basises)))
        throw new Error('invalid endo: expected "beta": bigint and "basises": array');
      const n = B(i, g);
      function u() {
        if (!i.isOdd)
          throw new Error("compression is not supported: Field does not have .isOdd()");
      }
      function O(le, re, ie) {
        const { x: oe, y: fe } = re.toAffine(), pe = i.toBytes(oe);
        if ((0, h._abool2)(ie, "isCompressed"), ie) {
          u();
          const be = !i.isOdd(fe);
          return (0, h.concatBytes)(M(be), pe);
        } else
          return (0, h.concatBytes)(Uint8Array.of(4), pe, i.toBytes(fe));
      }
      function C(le) {
        (0, h._abytes2)(le, void 0, "Point");
        const { publicKey: re, publicKeyUncompressed: ie } = n, oe = le.length, fe = le[0], pe = le.subarray(1);
        if (oe === re && (fe === 2 || fe === 3)) {
          const be = i.fromBytes(pe);
          if (!i.isValid(be))
            throw new Error("bad point: is not on curve, wrong x");
          const ge = L(be);
          let ve;
          try {
            ve = i.sqrt(ge);
          } catch (ae) {
            const ue = ae instanceof Error ? ": " + ae.message : "";
            throw new Error("bad point: is not on curve, sqrt error" + ue);
          }
          u();
          const Y = i.isOdd(ve);
          return (fe & 1) === 1 !== Y && (ve = i.neg(ve)), { x: be, y: ve };
        } else if (oe === ie && fe === 4) {
          const be = i.BYTES, ge = i.fromBytes(pe.subarray(0, be)), ve = i.fromBytes(pe.subarray(be, be * 2));
          if (!q(ge, ve))
            throw new Error("bad point: is not on curve");
          return { x: ge, y: ve };
        } else
          throw new Error(`bad point: got length ${oe}, expected compressed=${re} or uncompressed=${ie}`);
      }
      const E = b.toBytes || O, I = b.fromBytes || C;
      function L(le) {
        const re = i.sqr(le), ie = i.mul(re, le);
        return i.add(i.add(ie, i.mul(le, y.a)), y.b);
      }
      function q(le, re) {
        const ie = i.sqr(re), oe = L(le);
        return i.eql(ie, oe);
      }
      if (!q(y.Gx, y.Gy))
        throw new Error("bad curve params: generator point");
      const X = i.mul(i.pow(y.a, m), S), P = i.mul(i.sqr(y.b), BigInt(27));
      if (i.is0(i.add(X, P)))
        throw new Error("bad curve params: a or b");
      function G(le, re, ie = !1) {
        if (!i.isValid(re) || ie && i.is0(re))
          throw new Error(`bad point coordinate ${le}`);
        return re;
      }
      function ee(le) {
        if (!(le instanceof Q))
          throw new Error("ProjectivePoint expected");
      }
      function ne(le) {
        if (!a || !a.basises)
          throw new Error("no endo");
        return p(le, a.basises, g.ORDER);
      }
      const se = (0, h.memoized)((le, re) => {
        const { X: ie, Y: oe, Z: fe } = le;
        if (i.eql(fe, i.ONE))
          return { x: ie, y: oe };
        const pe = le.is0();
        re == null && (re = pe ? i.ONE : i.inv(fe));
        const be = i.mul(ie, re), ge = i.mul(oe, re), ve = i.mul(fe, re);
        if (pe)
          return { x: i.ZERO, y: i.ZERO };
        if (!i.eql(ve, i.ONE))
          throw new Error("invZ was invalid");
        return { x: be, y: ge };
      }), J = (0, h.memoized)((le) => {
        if (le.is0()) {
          if (b.allowInfinityPoint && !i.is0(le.Y))
            return;
          throw new Error("bad point: ZERO");
        }
        const { x: re, y: ie } = le.toAffine();
        if (!i.isValid(re) || !i.isValid(ie))
          throw new Error("bad point: x or y not field elements");
        if (!q(re, ie))
          throw new Error("bad point: equation left != right");
        if (!le.isTorsionFree())
          throw new Error("bad point: not in prime-order subgroup");
        return !0;
      });
      function ce(le, re, ie, oe, fe) {
        return ie = new Q(i.mul(ie.X, le), ie.Y, ie.Z), re = (0, v.negateCt)(oe, re), ie = (0, v.negateCt)(fe, ie), re.add(ie);
      }
      class Q {
        /** Does NOT validate if the point is valid. Use `.assertValidity()`. */
        constructor(re, ie, oe) {
          this.X = G("x", re), this.Y = G("y", ie, !0), this.Z = G("z", oe), Object.freeze(this);
        }
        static CURVE() {
          return y;
        }
        /** Does NOT validate if the point is valid. Use `.assertValidity()`. */
        static fromAffine(re) {
          const { x: ie, y: oe } = re || {};
          if (!re || !i.isValid(ie) || !i.isValid(oe))
            throw new Error("invalid affine point");
          if (re instanceof Q)
            throw new Error("projective point not allowed");
          return i.is0(ie) && i.is0(oe) ? Q.ZERO : new Q(ie, oe, i.ONE);
        }
        static fromBytes(re) {
          const ie = Q.fromAffine(I((0, h._abytes2)(re, void 0, "point")));
          return ie.assertValidity(), ie;
        }
        static fromHex(re) {
          return Q.fromBytes((0, h.ensureBytes)("pointHex", re));
        }
        get x() {
          return this.toAffine().x;
        }
        get y() {
          return this.toAffine().y;
        }
        /**
         *
         * @param windowSize
         * @param isLazy true will defer table computation until the first multiplication
         * @returns
         */
        precompute(re = 8, ie = !0) {
          return he.createCache(this, re), ie || this.multiply(m), this;
        }
        // TODO: return `this`
        /** A point on curve is valid if it conforms to equation. */
        assertValidity() {
          J(this);
        }
        hasEvenY() {
          const { y: re } = this.toAffine();
          if (!i.isOdd)
            throw new Error("Field doesn't support isOdd");
          return !i.isOdd(re);
        }
        /** Compare one point to another. */
        equals(re) {
          ee(re);
          const { X: ie, Y: oe, Z: fe } = this, { X: pe, Y: be, Z: ge } = re, ve = i.eql(i.mul(ie, ge), i.mul(pe, fe)), Y = i.eql(i.mul(oe, ge), i.mul(be, fe));
          return ve && Y;
        }
        /** Flips point to one corresponding to (x, -y) in Affine coordinates. */
        negate() {
          return new Q(this.X, i.neg(this.Y), this.Z);
        }
        // Renes-Costello-Batina exception-free doubling formula.
        // There is 30% faster Jacobian formula, but it is not complete.
        // https://eprint.iacr.org/2015/1060, algorithm 3
        // Cost: 8M + 3S + 3*a + 2*b3 + 15add.
        double() {
          const { a: re, b: ie } = y, oe = i.mul(ie, m), { X: fe, Y: pe, Z: be } = this;
          let ge = i.ZERO, ve = i.ZERO, Y = i.ZERO, te = i.mul(fe, fe), ae = i.mul(pe, pe), ue = i.mul(be, be), ye = i.mul(fe, pe);
          return ye = i.add(ye, ye), Y = i.mul(fe, be), Y = i.add(Y, Y), ge = i.mul(re, Y), ve = i.mul(oe, ue), ve = i.add(ge, ve), ge = i.sub(ae, ve), ve = i.add(ae, ve), ve = i.mul(ge, ve), ge = i.mul(ye, ge), Y = i.mul(oe, Y), ue = i.mul(re, ue), ye = i.sub(te, ue), ye = i.mul(re, ye), ye = i.add(ye, Y), Y = i.add(te, te), te = i.add(Y, te), te = i.add(te, ue), te = i.mul(te, ye), ve = i.add(ve, te), ue = i.mul(pe, be), ue = i.add(ue, ue), te = i.mul(ue, ye), ge = i.sub(ge, te), Y = i.mul(ue, ae), Y = i.add(Y, Y), Y = i.add(Y, Y), new Q(ge, ve, Y);
        }
        // Renes-Costello-Batina exception-free addition formula.
        // There is 30% faster Jacobian formula, but it is not complete.
        // https://eprint.iacr.org/2015/1060, algorithm 1
        // Cost: 12M + 0S + 3*a + 3*b3 + 23add.
        add(re) {
          ee(re);
          const { X: ie, Y: oe, Z: fe } = this, { X: pe, Y: be, Z: ge } = re;
          let ve = i.ZERO, Y = i.ZERO, te = i.ZERO;
          const ae = y.a, ue = i.mul(y.b, m);
          let ye = i.mul(ie, pe), me = i.mul(oe, be), _e = i.mul(fe, ge), we = i.add(ie, oe), Se = i.add(pe, be);
          we = i.mul(we, Se), Se = i.add(ye, me), we = i.sub(we, Se), Se = i.add(ie, fe);
          let xe = i.add(pe, ge);
          return Se = i.mul(Se, xe), xe = i.add(ye, _e), Se = i.sub(Se, xe), xe = i.add(oe, fe), ve = i.add(be, ge), xe = i.mul(xe, ve), ve = i.add(me, _e), xe = i.sub(xe, ve), te = i.mul(ae, Se), ve = i.mul(ue, _e), te = i.add(ve, te), ve = i.sub(me, te), te = i.add(me, te), Y = i.mul(ve, te), me = i.add(ye, ye), me = i.add(me, ye), _e = i.mul(ae, _e), Se = i.mul(ue, Se), me = i.add(me, _e), _e = i.sub(ye, _e), _e = i.mul(ae, _e), Se = i.add(Se, _e), ye = i.mul(me, Se), Y = i.add(Y, ye), ye = i.mul(xe, Se), ve = i.mul(we, ve), ve = i.sub(ve, ye), ye = i.mul(we, me), te = i.mul(xe, te), te = i.add(te, ye), new Q(ve, Y, te);
        }
        subtract(re) {
          return this.add(re.negate());
        }
        is0() {
          return this.equals(Q.ZERO);
        }
        /**
         * Constant time multiplication.
         * Uses wNAF method. Windowed method may be 10% faster,
         * but takes 2x longer to generate and consumes 2x memory.
         * Uses precomputes when available.
         * Uses endomorphism for Koblitz curves.
         * @param scalar by which the point would be multiplied
         * @returns New point
         */
        multiply(re) {
          const { endo: ie } = b;
          if (!g.isValidNot0(re))
            throw new Error("invalid scalar: out of range");
          let oe, fe;
          const pe = (be) => he.cached(this, be, (ge) => (0, v.normalizeZ)(Q, ge));
          if (ie) {
            const { k1neg: be, k1: ge, k2neg: ve, k2: Y } = ne(re), { p: te, f: ae } = pe(ge), { p: ue, f: ye } = pe(Y);
            fe = ae.add(ye), oe = ce(ie.beta, te, ue, be, ve);
          } else {
            const { p: be, f: ge } = pe(re);
            oe = be, fe = ge;
          }
          return (0, v.normalizeZ)(Q, [oe, fe])[0];
        }
        /**
         * Non-constant-time multiplication. Uses double-and-add algorithm.
         * It's faster, but should only be used when you don't care about
         * an exposed secret key e.g. sig verification, which works over *public* keys.
         */
        multiplyUnsafe(re) {
          const { endo: ie } = b, oe = this;
          if (!g.isValid(re))
            throw new Error("invalid scalar: out of range");
          if (re === N || oe.is0())
            return Q.ZERO;
          if (re === _)
            return oe;
          if (he.hasCache(this))
            return this.multiply(re);
          if (ie) {
            const { k1neg: fe, k1: pe, k2neg: be, k2: ge } = ne(re), { p1: ve, p2: Y } = (0, v.mulEndoUnsafe)(Q, oe, pe, ge);
            return ce(ie.beta, ve, Y, fe, be);
          } else
            return he.unsafe(oe, re);
        }
        multiplyAndAddUnsafe(re, ie, oe) {
          const fe = this.multiplyUnsafe(ie).add(re.multiplyUnsafe(oe));
          return fe.is0() ? void 0 : fe;
        }
        /**
         * Converts Projective point to affine (x, y) coordinates.
         * @param invertedZ Z^-1 (inverted zero) - optional, precomputation is useful for invertBatch
         */
        toAffine(re) {
          return se(this, re);
        }
        /**
         * Checks whether Point is free of torsion elements (is in prime subgroup).
         * Always torsion-free for cofactor=1 curves.
         */
        isTorsionFree() {
          const { isTorsionFree: re } = b;
          return t === _ ? !0 : re ? re(Q, this) : he.unsafe(this, s).is0();
        }
        clearCofactor() {
          const { clearCofactor: re } = b;
          return t === _ ? this : re ? re(Q, this) : this.multiplyUnsafe(t);
        }
        isSmallOrder() {
          return this.multiplyUnsafe(t).is0();
        }
        toBytes(re = !0) {
          return (0, h._abool2)(re, "isCompressed"), this.assertValidity(), E(Q, this, re);
        }
        toHex(re = !0) {
          return (0, h.bytesToHex)(this.toBytes(re));
        }
        toString() {
          return `<Point ${this.is0() ? "ZERO" : this.toHex()}>`;
        }
        // TODO: remove
        get px() {
          return this.X;
        }
        get py() {
          return this.X;
        }
        get pz() {
          return this.Z;
        }
        toRawBytes(re = !0) {
          return this.toBytes(re);
        }
        _setWindowSize(re) {
          this.precompute(re);
        }
        static normalizeZ(re) {
          return (0, v.normalizeZ)(Q, re);
        }
        static msm(re, ie) {
          return (0, v.pippenger)(Q, g, re, ie);
        }
        static fromPrivateKey(re) {
          return Q.BASE.multiply(w(g, re));
        }
      }
      Q.BASE = new Q(y.Gx, y.Gy, i.ONE), Q.ZERO = new Q(i.ZERO, i.ONE, i.ZERO), Q.Fp = i, Q.Fn = g;
      const de = g.BITS, he = new v.wNAF(Q, b.endo ? Math.ceil(de / 2) : de);
      return Q.BASE.precompute(8), Q;
    }
    function M(d) {
      return Uint8Array.of(d ? 2 : 3);
    }
    function D(d, b) {
      const l = d.ORDER;
      let i = N;
      for (let I = l - _; I % R === N; I /= R)
        i += _;
      const g = i, y = R << g - _ - _, t = y * R, s = (l - _) / t, a = (s - _) / R, n = t - _, u = y, O = d.pow(b, s), C = d.pow(b, (s + _) / R);
      let E = (I, L) => {
        let q = O, X = d.pow(L, n), P = d.sqr(X);
        P = d.mul(P, L);
        let G = d.mul(I, P);
        G = d.pow(G, a), G = d.mul(G, X), X = d.mul(G, L), P = d.mul(G, I);
        let ee = d.mul(P, X);
        G = d.pow(ee, u);
        let ne = d.eql(G, d.ONE);
        X = d.mul(P, C), G = d.mul(ee, q), P = d.cmov(X, P, ne), ee = d.cmov(G, ee, ne);
        for (let se = g; se > _; se--) {
          let J = se - R;
          J = R << J - _;
          let ce = d.pow(ee, J);
          const Q = d.eql(ce, d.ONE);
          X = d.mul(P, q), q = d.mul(q, q), ce = d.mul(ee, q), P = d.cmov(X, P, Q), ee = d.cmov(ce, ee, Q);
        }
        return { isValid: ne, value: P };
      };
      if (d.ORDER % S === m) {
        const I = (d.ORDER - m) / S, L = d.sqrt(d.neg(b));
        E = (q, X) => {
          let P = d.sqr(X);
          const G = d.mul(q, X);
          P = d.mul(P, G);
          let ee = d.pow(P, I);
          ee = d.mul(ee, G);
          const ne = d.mul(ee, L), se = d.mul(d.sqr(ee), X), J = d.eql(se, q);
          let ce = d.cmov(ne, ee, J);
          return { isValid: J, value: ce };
        };
      }
      return E;
    }
    function j(d, b) {
      (0, r.validateField)(d);
      const { A: l, B: i, Z: g } = b;
      if (!d.isValid(l) || !d.isValid(i) || !d.isValid(g))
        throw new Error("mapToCurveSimpleSWU: invalid opts");
      const y = D(d, g);
      if (!d.isOdd)
        throw new Error("Field does not have .isOdd()");
      return (t) => {
        let s, a, n, u, O, C, E, I;
        s = d.sqr(t), s = d.mul(s, g), a = d.sqr(s), a = d.add(a, s), n = d.add(a, d.ONE), n = d.mul(n, i), u = d.cmov(g, d.neg(a), !d.eql(a, d.ZERO)), u = d.mul(u, l), a = d.sqr(n), C = d.sqr(u), O = d.mul(C, l), a = d.add(a, O), a = d.mul(a, n), C = d.mul(C, u), O = d.mul(C, i), a = d.add(a, O), E = d.mul(s, n);
        const { isValid: L, value: q } = y(a, C);
        I = d.mul(s, t), I = d.mul(I, q), E = d.cmov(E, n, L), I = d.cmov(I, q, L);
        const X = d.isOdd(t) === d.isOdd(I);
        I = d.cmov(d.neg(I), I, X);
        const P = (0, r.FpInvertBatch)(d, [u], !0)[0];
        return E = d.mul(E, P), { x: E, y: I };
      };
    }
    function B(d, b) {
      return {
        secretKey: b.BYTES,
        publicKey: 1 + d.BYTES,
        publicKeyUncompressed: 1 + 2 * d.BYTES,
        publicKeyHasPrefix: !0,
        signature: 2 * b.BYTES
      };
    }
    function x(d, b = {}) {
      const { Fn: l } = d, i = b.randomBytes || h.randomBytes, g = Object.assign(B(d.Fp, l), { seed: (0, r.getMinHashLength)(l.ORDER) });
      function y(E) {
        try {
          return !!w(l, E);
        } catch {
          return !1;
        }
      }
      function t(E, I) {
        const { publicKey: L, publicKeyUncompressed: q } = g;
        try {
          const X = E.length;
          return I === !0 && X !== L || I === !1 && X !== q ? !1 : !!d.fromBytes(E);
        } catch {
          return !1;
        }
      }
      function s(E = i(g.seed)) {
        return (0, r.mapHashToField)((0, h._abytes2)(E, g.seed, "seed"), l.ORDER);
      }
      function a(E, I = !0) {
        return d.BASE.multiply(w(l, E)).toBytes(I);
      }
      function n(E) {
        const I = s(E);
        return { secretKey: I, publicKey: a(I) };
      }
      function u(E) {
        if (typeof E == "bigint")
          return !1;
        if (E instanceof d)
          return !0;
        const { secretKey: I, publicKey: L, publicKeyUncompressed: q } = g;
        if (l.allowedLengths || I === L)
          return;
        const X = (0, h.ensureBytes)("key", E).length;
        return X === L || X === q;
      }
      function O(E, I, L = !0) {
        if (u(E) === !0)
          throw new Error("first arg must be private key");
        if (u(I) === !1)
          throw new Error("second arg must be public key");
        const q = w(l, E);
        return d.fromHex(I).multiply(q).toBytes(L);
      }
      return Object.freeze({ getPublicKey: a, getSharedSecret: O, keygen: n, Point: d, utils: {
        isValidSecretKey: y,
        isValidPublicKey: t,
        randomSecretKey: s,
        // TODO: remove
        isValidPrivateKey: y,
        randomPrivateKey: s,
        normPrivateKeyToScalar: (E) => w(l, E),
        precompute(E = 8, I = d.BASE) {
          return I.precompute(E, !1);
        }
      }, lengths: g });
    }
    function U(d, b, l = {}) {
      (0, f.ahash)(b), (0, h._validateObject)(l, {}, {
        hmac: "function",
        lowS: "boolean",
        randomBytes: "function",
        bits2int: "function",
        bits2int_modN: "function"
      });
      const i = l.randomBytes || h.randomBytes, g = l.hmac || ((ie, ...oe) => (0, o.hmac)(b, ie, (0, h.concatBytes)(...oe))), { Fp: y, Fn: t } = d, { ORDER: s, BITS: a } = t, { keygen: n, getPublicKey: u, getSharedSecret: O, utils: C, lengths: E } = x(d, l), I = {
        prehash: !1,
        lowS: typeof l.lowS == "boolean" ? l.lowS : !1,
        format: void 0,
        //'compact' as ECDSASigFormat,
        extraEntropy: !1
      }, L = "compact";
      function q(ie) {
        const oe = s >> _;
        return ie > oe;
      }
      function X(ie, oe) {
        if (!t.isValidNot0(oe))
          throw new Error(`invalid signature ${ie}: out of range 1..Point.Fn.ORDER`);
        return oe;
      }
      function P(ie, oe) {
        A(oe);
        const fe = E.signature, pe = oe === "compact" ? fe : oe === "recovered" ? fe + 1 : void 0;
        return (0, h._abytes2)(ie, pe, `${oe} signature`);
      }
      class G {
        constructor(oe, fe, pe) {
          this.r = X("r", oe), this.s = X("s", fe), pe != null && (this.recovery = pe), Object.freeze(this);
        }
        static fromBytes(oe, fe = L) {
          P(oe, fe);
          let pe;
          if (fe === "der") {
            const { r: Y, s: te } = e.DER.toSig((0, h._abytes2)(oe));
            return new G(Y, te);
          }
          fe === "recovered" && (pe = oe[0], fe = "compact", oe = oe.subarray(1));
          const be = t.BYTES, ge = oe.subarray(0, be), ve = oe.subarray(be, be * 2);
          return new G(t.fromBytes(ge), t.fromBytes(ve), pe);
        }
        static fromHex(oe, fe) {
          return this.fromBytes((0, h.hexToBytes)(oe), fe);
        }
        addRecoveryBit(oe) {
          return new G(this.r, this.s, oe);
        }
        recoverPublicKey(oe) {
          const fe = y.ORDER, { r: pe, s: be, recovery: ge } = this;
          if (ge == null || ![0, 1, 2, 3].includes(ge))
            throw new Error("recovery id invalid");
          if (s * R < fe && ge > 1)
            throw new Error("recovery id is ambiguous for h>1 curve");
          const Y = ge === 2 || ge === 3 ? pe + s : pe;
          if (!y.isValid(Y))
            throw new Error("recovery id 2 or 3 invalid");
          const te = y.toBytes(Y), ae = d.fromBytes((0, h.concatBytes)(M((ge & 1) === 0), te)), ue = t.inv(Y), ye = ne((0, h.ensureBytes)("msgHash", oe)), me = t.create(-ye * ue), _e = t.create(be * ue), we = d.BASE.multiplyUnsafe(me).add(ae.multiplyUnsafe(_e));
          if (we.is0())
            throw new Error("point at infinify");
          return we.assertValidity(), we;
        }
        // Signatures should be low-s, to prevent malleability.
        hasHighS() {
          return q(this.s);
        }
        toBytes(oe = L) {
          if (A(oe), oe === "der")
            return (0, h.hexToBytes)(e.DER.hexFromSig(this));
          const fe = t.toBytes(this.r), pe = t.toBytes(this.s);
          if (oe === "recovered") {
            if (this.recovery == null)
              throw new Error("recovery bit must be present");
            return (0, h.concatBytes)(Uint8Array.of(this.recovery), fe, pe);
          }
          return (0, h.concatBytes)(fe, pe);
        }
        toHex(oe) {
          return (0, h.bytesToHex)(this.toBytes(oe));
        }
        // TODO: remove
        assertValidity() {
        }
        static fromCompact(oe) {
          return G.fromBytes((0, h.ensureBytes)("sig", oe), "compact");
        }
        static fromDER(oe) {
          return G.fromBytes((0, h.ensureBytes)("sig", oe), "der");
        }
        normalizeS() {
          return this.hasHighS() ? new G(this.r, t.neg(this.s), this.recovery) : this;
        }
        toDERRawBytes() {
          return this.toBytes("der");
        }
        toDERHex() {
          return (0, h.bytesToHex)(this.toBytes("der"));
        }
        toCompactRawBytes() {
          return this.toBytes("compact");
        }
        toCompactHex() {
          return (0, h.bytesToHex)(this.toBytes("compact"));
        }
      }
      const ee = l.bits2int || function(oe) {
        if (oe.length > 8192)
          throw new Error("input is too large");
        const fe = (0, h.bytesToNumberBE)(oe), pe = oe.length * 8 - a;
        return pe > 0 ? fe >> BigInt(pe) : fe;
      }, ne = l.bits2int_modN || function(oe) {
        return t.create(ee(oe));
      }, se = (0, h.bitMask)(a);
      function J(ie) {
        return (0, h.aInRange)("num < 2^" + a, ie, N, se), t.toBytes(ie);
      }
      function ce(ie, oe) {
        return (0, h._abytes2)(ie, void 0, "message"), oe ? (0, h._abytes2)(b(ie), void 0, "prehashed message") : ie;
      }
      function Q(ie, oe, fe) {
        if (["recovered", "canonical"].some((me) => me in fe))
          throw new Error("sign() legacy options not supported");
        const { lowS: pe, prehash: be, extraEntropy: ge } = K(fe, I);
        ie = ce(ie, be);
        const ve = ne(ie), Y = w(t, oe), te = [J(Y), J(ve)];
        if (ge != null && ge !== !1) {
          const me = ge === !0 ? i(E.secretKey) : ge;
          te.push((0, h.ensureBytes)("extraEntropy", me));
        }
        const ae = (0, h.concatBytes)(...te), ue = ve;
        function ye(me) {
          const _e = ee(me);
          if (!t.isValidNot0(_e))
            return;
          const we = t.inv(_e), Se = d.BASE.multiply(_e).toAffine(), xe = t.create(Se.x);
          if (xe === N)
            return;
          const Ke = t.create(we * t.create(ue + xe * Y));
          if (Ke === N)
            return;
          let ze = (Se.x === xe ? 0 : 2) | Number(Se.y & _), st = Ke;
          return pe && q(Ke) && (st = t.neg(Ke), ze ^= 1), new G(xe, st, ze);
        }
        return { seed: ae, k2sig: ye };
      }
      function de(ie, oe, fe = {}) {
        ie = (0, h.ensureBytes)("message", ie);
        const { seed: pe, k2sig: be } = Q(ie, oe, fe);
        return (0, h.createHmacDrbg)(b.outputLen, t.BYTES, g)(pe, be);
      }
      function he(ie) {
        let oe;
        const fe = typeof ie == "string" || (0, h.isBytes)(ie), pe = !fe && ie !== null && typeof ie == "object" && typeof ie.r == "bigint" && typeof ie.s == "bigint";
        if (!fe && !pe)
          throw new Error("invalid signature, expected Uint8Array, hex string or Signature instance");
        if (pe)
          oe = new G(ie.r, ie.s);
        else if (fe) {
          try {
            oe = G.fromBytes((0, h.ensureBytes)("sig", ie), "der");
          } catch (be) {
            if (!(be instanceof e.DER.Err))
              throw be;
          }
          if (!oe)
            try {
              oe = G.fromBytes((0, h.ensureBytes)("sig", ie), "compact");
            } catch {
              return !1;
            }
        }
        return oe || !1;
      }
      function le(ie, oe, fe, pe = {}) {
        const { lowS: be, prehash: ge, format: ve } = K(pe, I);
        if (fe = (0, h.ensureBytes)("publicKey", fe), oe = ce((0, h.ensureBytes)("message", oe), ge), "strict" in pe)
          throw new Error("options.strict was renamed to lowS");
        const Y = ve === void 0 ? he(ie) : G.fromBytes((0, h.ensureBytes)("sig", ie), ve);
        if (Y === !1)
          return !1;
        try {
          const te = d.fromBytes(fe);
          if (be && Y.hasHighS())
            return !1;
          const { r: ae, s: ue } = Y, ye = ne(oe), me = t.inv(ue), _e = t.create(ye * me), we = t.create(ae * me), Se = d.BASE.multiplyUnsafe(_e).add(te.multiplyUnsafe(we));
          return Se.is0() ? !1 : t.create(Se.x) === ae;
        } catch {
          return !1;
        }
      }
      function re(ie, oe, fe = {}) {
        const { prehash: pe } = K(fe, I);
        return oe = ce(oe, pe), G.fromBytes(ie, "recovered").recoverPublicKey(oe).toBytes();
      }
      return Object.freeze({
        keygen: n,
        getPublicKey: u,
        getSharedSecret: O,
        utils: C,
        lengths: E,
        Point: d,
        sign: de,
        verify: le,
        recoverPublicKey: re,
        Signature: G,
        hash: b
      });
    }
    function $(d) {
      const { CURVE: b, curveOpts: l } = F(d), i = T(b, l);
      return z(d, i);
    }
    function F(d) {
      const b = {
        a: d.a,
        b: d.b,
        p: d.Fp.ORDER,
        n: d.n,
        h: d.h,
        Gx: d.Gx,
        Gy: d.Gy
      }, l = d.Fp;
      let i = d.allowedPrivateKeyLengths ? Array.from(new Set(d.allowedPrivateKeyLengths.map((t) => Math.ceil(t / 2)))) : void 0;
      const g = (0, r.Field)(b.n, {
        BITS: d.nBitLength,
        allowedLengths: i,
        modFromBytes: d.wrapPrivateKey
      }), y = {
        Fp: l,
        Fn: g,
        allowInfinityPoint: d.allowInfinityPoint,
        endo: d.endo,
        isTorsionFree: d.isTorsionFree,
        clearCofactor: d.clearCofactor,
        fromBytes: d.fromBytes,
        toBytes: d.toBytes
      };
      return { CURVE: b, curveOpts: y };
    }
    function V(d) {
      const { CURVE: b, curveOpts: l } = F(d), i = {
        hmac: d.hmac,
        randomBytes: d.randomBytes,
        lowS: d.lowS,
        bits2int: d.bits2int,
        bits2int_modN: d.bits2int_modN
      };
      return { CURVE: b, curveOpts: l, hash: d.hash, ecdsaOpts: i };
    }
    function W(d, b, l) {
      function i(g) {
        const y = d.sqr(g), t = d.mul(y, g);
        return d.add(d.add(t, d.mul(g, b)), l);
      }
      return i;
    }
    function z(d, b) {
      const { Fp: l, Fn: i } = b;
      function g(t) {
        return (0, h.inRange)(t, _, i.ORDER);
      }
      const y = W(l, d.a, d.b);
      return Object.assign({}, {
        CURVE: d,
        Point: b,
        ProjectivePoint: b,
        normPrivateKeyToScalar: (t) => w(i, t),
        weierstrassEquation: y,
        isWithinCurveOrder: g
      });
    }
    function k(d, b) {
      const l = b.Point;
      return Object.assign({}, b, {
        ProjectivePoint: l,
        CURVE: Object.assign({}, d, (0, r.nLength)(l.Fn.ORDER, l.Fn.BITS))
      });
    }
    function Z(d) {
      const { CURVE: b, curveOpts: l, hash: i, ecdsaOpts: g } = V(d), y = T(b, l), t = U(y, i, g);
      return k(d, t);
    }
  })(Ut)), Ut;
}
var Br;
function Ao() {
  if (Br) return et;
  Br = 1, Object.defineProperty(et, "__esModule", { value: !0 }), et.getHash = o, et.createCurve = f;
  const e = /* @__PURE__ */ Us();
  function o(h) {
    return { hash: h };
  }
  function f(h, v) {
    const r = (c) => (0, e.weierstrass)({ ...h, hash: c });
    return { ...r(v), create: r };
  }
  return et;
}
var Ar;
function xo() {
  return Ar || (Ar = 1, (function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.encodeToCurve = e.hashToCurve = e.secp256k1_hasher = e.schnorr = e.secp256k1 = void 0;
    const o = /* @__PURE__ */ Un(), f = /* @__PURE__ */ Ne(), h = /* @__PURE__ */ Ao(), v = /* @__PURE__ */ qs(), r = /* @__PURE__ */ Ge(), c = /* @__PURE__ */ Us(), p = /* @__PURE__ */ Ve(), A = {
      p: BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"),
      n: BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"),
      h: BigInt(1),
      a: BigInt(0),
      b: BigInt(7),
      Gx: BigInt("0x79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798"),
      Gy: BigInt("0x483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8")
    }, K = {
      beta: BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"),
      basises: [
        [BigInt("0x3086d221a7d46bcde86c90e49284eb15"), -BigInt("0xe4437ed6010e88286f547fa90abfe4c3")],
        [BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"), BigInt("0x3086d221a7d46bcde86c90e49284eb15")]
      ]
    }, H = /* @__PURE__ */ BigInt(0), N = /* @__PURE__ */ BigInt(1), _ = /* @__PURE__ */ BigInt(2);
    function R(k) {
      const Z = A.p, d = BigInt(3), b = BigInt(6), l = BigInt(11), i = BigInt(22), g = BigInt(23), y = BigInt(44), t = BigInt(88), s = k * k * k % Z, a = s * s * k % Z, n = (0, r.pow2)(a, d, Z) * a % Z, u = (0, r.pow2)(n, d, Z) * a % Z, O = (0, r.pow2)(u, _, Z) * s % Z, C = (0, r.pow2)(O, l, Z) * O % Z, E = (0, r.pow2)(C, i, Z) * C % Z, I = (0, r.pow2)(E, y, Z) * E % Z, L = (0, r.pow2)(I, t, Z) * I % Z, q = (0, r.pow2)(L, y, Z) * E % Z, X = (0, r.pow2)(q, d, Z) * a % Z, P = (0, r.pow2)(X, g, Z) * C % Z, G = (0, r.pow2)(P, b, Z) * s % Z, ee = (0, r.pow2)(G, _, Z);
      if (!m.eql(m.sqr(ee), k))
        throw new Error("Cannot find square root");
      return ee;
    }
    const m = (0, r.Field)(A.p, { sqrt: R });
    e.secp256k1 = (0, h.createCurve)({ ...A, Fp: m, lowS: !0, endo: K }, o.sha256);
    const S = {};
    function w(k, ...Z) {
      let d = S[k];
      if (d === void 0) {
        const b = (0, o.sha256)((0, p.utf8ToBytes)(k));
        d = (0, p.concatBytes)(b, b), S[k] = d;
      }
      return (0, o.sha256)((0, p.concatBytes)(d, ...Z));
    }
    const T = (k) => k.toBytes(!0).slice(1), M = e.secp256k1.Point, D = (k) => k % _ === H;
    function j(k) {
      const { Fn: Z, BASE: d } = M, b = (0, c._normFnElement)(Z, k), l = d.multiply(b);
      return { scalar: D(l.y) ? b : Z.neg(b), bytes: T(l) };
    }
    function B(k) {
      const Z = m;
      if (!Z.isValidNot0(k))
        throw new Error("invalid x: Fail if x ≥ p");
      const d = Z.create(k * k), b = Z.create(d * k + BigInt(7));
      let l = Z.sqrt(b);
      D(l) || (l = Z.neg(l));
      const i = M.fromAffine({ x: k, y: l });
      return i.assertValidity(), i;
    }
    const x = p.bytesToNumberBE;
    function U(...k) {
      return M.Fn.create(x(w("BIP0340/challenge", ...k)));
    }
    function $(k) {
      return j(k).bytes;
    }
    function F(k, Z, d = (0, f.randomBytes)(32)) {
      const { Fn: b } = M, l = (0, p.ensureBytes)("message", k), { bytes: i, scalar: g } = j(Z), y = (0, p.ensureBytes)("auxRand", d, 32), t = b.toBytes(g ^ x(w("BIP0340/aux", y))), s = w("BIP0340/nonce", t, i, l), { bytes: a, scalar: n } = j(s), u = U(a, i, l), O = new Uint8Array(64);
      if (O.set(a, 0), O.set(b.toBytes(b.create(n + u * g)), 32), !V(O, l, i))
        throw new Error("sign: Invalid signature produced");
      return O;
    }
    function V(k, Z, d) {
      const { Fn: b, BASE: l } = M, i = (0, p.ensureBytes)("signature", k, 64), g = (0, p.ensureBytes)("message", Z), y = (0, p.ensureBytes)("publicKey", d, 32);
      try {
        const t = B(x(y)), s = x(i.subarray(0, 32));
        if (!(0, p.inRange)(s, N, A.p))
          return !1;
        const a = x(i.subarray(32, 64));
        if (!(0, p.inRange)(a, N, A.n))
          return !1;
        const n = U(b.toBytes(s), T(t), g), u = l.multiplyUnsafe(a).add(t.multiplyUnsafe(b.neg(n))), { x: O, y: C } = u.toAffine();
        return !(u.is0() || !D(C) || O !== s);
      } catch {
        return !1;
      }
    }
    e.schnorr = (() => {
      const d = (l = (0, f.randomBytes)(48)) => (0, r.mapHashToField)(l, A.n);
      e.secp256k1.utils.randomSecretKey;
      function b(l) {
        const i = d(l);
        return { secretKey: i, publicKey: $(i) };
      }
      return {
        keygen: b,
        getPublicKey: $,
        sign: F,
        verify: V,
        Point: M,
        utils: {
          randomSecretKey: d,
          randomPrivateKey: d,
          taggedHash: w,
          // TODO: remove
          lift_x: B,
          pointToBytes: T,
          numberToBytesBE: p.numberToBytesBE,
          bytesToNumberBE: p.bytesToNumberBE,
          mod: r.mod
        },
        lengths: {
          secretKey: 32,
          publicKey: 32,
          publicKeyHasPrefix: !1,
          signature: 64,
          seed: 48
        }
      };
    })();
    const W = (0, v.isogenyMap)(m, [
      // xNum
      [
        "0x8e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38daaaaa8c7",
        "0x7d3d4c80bc321d5b9f315cea7fd44c5d595d2fc0bf63b92dfff1044f17c6581",
        "0x534c328d23f234e6e2a413deca25caece4506144037c40314ecbd0b53d9dd262",
        "0x8e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38daaaaa88c"
      ],
      // xDen
      [
        "0xd35771193d94918a9ca34ccbb7b640dd86cd409542f8487d9fe6b745781eb49b",
        "0xedadc6f64383dc1df7c4b2d51b54225406d36b641f5e41bbc52a56612a8c6d14",
        "0x0000000000000000000000000000000000000000000000000000000000000001"
        // LAST 1
      ],
      // yNum
      [
        "0x4bda12f684bda12f684bda12f684bda12f684bda12f684bda12f684b8e38e23c",
        "0xc75e0c32d5cb7c0fa9d0a54b12a0a6d5647ab046d686da6fdffc90fc201d71a3",
        "0x29a6194691f91a73715209ef6512e576722830a201be2018a765e85a9ecee931",
        "0x2f684bda12f684bda12f684bda12f684bda12f684bda12f684bda12f38e38d84"
      ],
      // yDen
      [
        "0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffff93b",
        "0x7a06534bb8bdb49fd5e9e6632722c2989467c1bfc8e8d978dfb425d2685c2573",
        "0x6484aa716545ca2cf3a70c3fa8fe337e0a3d21162f0d6299a7bf8192bfd2a76f",
        "0x0000000000000000000000000000000000000000000000000000000000000001"
        // LAST 1
      ]
    ].map((k) => k.map((Z) => BigInt(Z)))), z = (0, c.mapToCurveSimpleSWU)(m, {
      A: BigInt("0x3f8731abdd661adca08a5558f0f5d272e953d363cb6f0e5d405447c01a444533"),
      B: BigInt("1771"),
      Z: m.create(BigInt("-11"))
    });
    e.secp256k1_hasher = (0, v.createHasher)(e.secp256k1.Point, (k) => {
      const { x: Z, y: d } = z(m.create(k[0]));
      return W(Z, d);
    }, {
      DST: "secp256k1_XMD:SHA-256_SSWU_RO_",
      encodeDST: "secp256k1_XMD:SHA-256_SSWU_NU_",
      p: m.ORDER,
      m: 1,
      k: 128,
      expand: "xmd",
      hash: o.sha256
    }), e.hashToCurve = e.secp256k1_hasher.hashToCurve, e.encodeToCurve = e.secp256k1_hasher.encodeToCurve;
  })(Dt)), Dt;
}
var kt = {}, xr;
function Vs() {
  return xr || (xr = 1, (function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.decodeHex = e.remove0x = void 0;
    var o = /* @__PURE__ */ Te(), f = function(v) {
      return v.startsWith("0x") || v.startsWith("0X") ? v.slice(2) : v;
    };
    e.remove0x = f;
    var h = function(v) {
      return (0, o.hexToBytes)((0, e.remove0x)(v));
    };
    e.decodeHex = h;
  })(kt)), kt;
}
var Rr;
function Ro() {
  return Rr || (Rr = 1, (function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.hexToPublicKey = e.convertPublicKeyFormat = e.getSharedPoint = e.getPublicKey = e.isValidPrivateKey = e.getValidSecret = void 0;
    var o = /* @__PURE__ */ Ks(), f = /* @__PURE__ */ Bo(), h = /* @__PURE__ */ xo(), v = it(), r = Dn(), c = Vs(), p = function(w) {
      var T;
      do
        T = (0, o.randomBytes)(r.SECRET_KEY_LENGTH);
      while (!(0, e.isValidPrivateKey)(T, w));
      return T;
    };
    e.getValidSecret = p;
    var A = function(w, T) {
      return R(T, function(M) {
        return M.utils.isValidSecretKey(w);
      }, function() {
        return !0;
      }, function() {
        return !0;
      });
    };
    e.isValidPrivateKey = A;
    var K = function(w, T) {
      return R(T, function(M) {
        return M.getPublicKey(w);
      }, function(M) {
        return M.getPublicKey(w);
      }, function(M) {
        return M.getPublicKey(w);
      });
    };
    e.getPublicKey = K;
    var H = function(w, T, M, D) {
      return R(D, function(j) {
        return j.getSharedSecret(w, T, M);
      }, function(j) {
        return j.getSharedSecret(w, T);
      }, function(j) {
        return S(j, w, T);
      });
    };
    e.getSharedPoint = H;
    var N = function(w, T, M) {
      return R(M, function(D) {
        return D.getSharedSecret(
          Uint8Array.from(Array(31).fill(0).concat([1])),
          // 1 as private key
          w,
          T
        );
      }, function() {
        return w;
      }, function() {
        return w;
      });
    };
    e.convertPublicKeyFormat = N;
    var _ = function(w, T) {
      var M = (0, c.decodeHex)(w);
      return R(T, function() {
        return m(M);
      }, function() {
        return M;
      }, function() {
        return M;
      });
    };
    e.hexToPublicKey = _;
    function R(w, T, M, D) {
      var j = w || (0, v.ellipticCurve)();
      if (j === "secp256k1")
        return T(h.secp256k1);
      if (j === "x25519")
        return M(f.x25519);
      if (j === "ed25519")
        return D(f.ed25519);
      throw new Error("Not implemented");
    }
    var m = function(w) {
      if (w.length === r.ETH_PUBLIC_KEY_SIZE) {
        var T = new Uint8Array(1 + w.length);
        return T.set([4]), T.set(w, 1), T;
      }
      return w;
    }, S = function(w, T, M) {
      var D = w.utils.getExtendedPublicKey(T).scalar, j = w.Point.fromBytes(M).multiply(D);
      return j.toBytes();
    };
  })(Pt)), Pt;
}
var Ft = {}, Fe = {}, Ir;
function Io() {
  if (Ir) return Fe;
  Ir = 1, Object.defineProperty(Fe, "__esModule", { value: !0 }), Fe.hkdf = void 0, Fe.extract = f, Fe.expand = r;
  const e = /* @__PURE__ */ Ds(), o = /* @__PURE__ */ Ne();
  function f(p, A, K) {
    return (0, o.ahash)(p), K === void 0 && (K = new Uint8Array(p.outputLen)), (0, e.hmac)(p, (0, o.toBytes)(K), (0, o.toBytes)(A));
  }
  const h = /* @__PURE__ */ Uint8Array.from([0]), v = /* @__PURE__ */ Uint8Array.of();
  function r(p, A, K, H = 32) {
    (0, o.ahash)(p), (0, o.anumber)(H);
    const N = p.outputLen;
    if (H > 255 * N)
      throw new Error("Length should be <= 255*HashLen");
    const _ = Math.ceil(H / N);
    K === void 0 && (K = v);
    const R = new Uint8Array(_ * N), m = e.hmac.create(p, A), S = m._cloneInto(), w = new Uint8Array(m.outputLen);
    for (let T = 0; T < _; T++)
      h[0] = T + 1, S.update(T === 0 ? v : w).update(K).update(h).digestInto(w), R.set(w, N * T), m._cloneInto(S);
    return m.destroy(), S.destroy(), (0, o.clean)(w, h), R.slice(0, H);
  }
  const c = (p, A, K, H, N) => r(p, f(p, A, K), H, N);
  return Fe.hkdf = c, Fe;
}
var Or;
function Oo() {
  return Or || (Or = 1, (function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.getSharedKey = e.deriveKey = void 0;
    var o = /* @__PURE__ */ Te(), f = /* @__PURE__ */ Io(), h = /* @__PURE__ */ Un(), v = function(c, p, A) {
      return (0, f.hkdf)(h.sha256, c, p, A, 32);
    };
    e.deriveKey = v;
    var r = function() {
      for (var c = [], p = 0; p < arguments.length; p++)
        c[p] = arguments[p];
      return (0, e.deriveKey)(o.concatBytes.apply(void 0, c));
    };
    e.getSharedKey = r;
  })(Ft)), Ft;
}
var Mt = {}, Me = {}, jt = {}, De = {}, Cr;
function Co() {
  if (Cr) return De;
  Cr = 1, Object.defineProperty(De, "__esModule", { value: !0 }), De.polyval = De.ghash = void 0, De._toGHASHKey = p;
  const e = /* @__PURE__ */ Te(), o = 16, f = /* @__PURE__ */ new Uint8Array(16), h = (0, e.u32)(f), v = 225, r = (_, R, m, S) => {
    const w = S & 1;
    return {
      s3: m << 31 | S >>> 1,
      s2: R << 31 | m >>> 1,
      s1: _ << 31 | R >>> 1,
      s0: _ >>> 1 ^ v << 24 & -(w & 1)
      // reduce % poly
    };
  }, c = (_) => (_ >>> 0 & 255) << 24 | (_ >>> 8 & 255) << 16 | (_ >>> 16 & 255) << 8 | _ >>> 24 & 255 | 0;
  function p(_) {
    _.reverse();
    const R = _[15] & 1;
    let m = 0;
    for (let S = 0; S < _.length; S++) {
      const w = _[S];
      _[S] = w >>> 1 | m, m = (w & 1) << 7;
    }
    return _[0] ^= -R & 225, _;
  }
  const A = (_) => _ > 64 * 1024 ? 8 : _ > 1024 ? 4 : 2;
  class K {
    // We select bits per window adaptively based on expectedLength
    constructor(R, m) {
      this.blockLen = o, this.outputLen = o, this.s0 = 0, this.s1 = 0, this.s2 = 0, this.s3 = 0, this.finished = !1, R = (0, e.toBytes)(R), (0, e.abytes)(R, 16);
      const S = (0, e.createView)(R);
      let w = S.getUint32(0, !1), T = S.getUint32(4, !1), M = S.getUint32(8, !1), D = S.getUint32(12, !1);
      const j = [];
      for (let V = 0; V < 128; V++)
        j.push({ s0: c(w), s1: c(T), s2: c(M), s3: c(D) }), { s0: w, s1: T, s2: M, s3: D } = r(w, T, M, D);
      const B = A(m || 1024);
      if (![1, 2, 4, 8].includes(B))
        throw new Error("ghash: invalid window size, expected 2, 4 or 8");
      this.W = B;
      const U = 128 / B, $ = this.windowSize = 2 ** B, F = [];
      for (let V = 0; V < U; V++)
        for (let W = 0; W < $; W++) {
          let z = 0, k = 0, Z = 0, d = 0;
          for (let b = 0; b < B; b++) {
            if (!(W >>> B - b - 1 & 1))
              continue;
            const { s0: i, s1: g, s2: y, s3: t } = j[B * V + b];
            z ^= i, k ^= g, Z ^= y, d ^= t;
          }
          F.push({ s0: z, s1: k, s2: Z, s3: d });
        }
      this.t = F;
    }
    _updateBlock(R, m, S, w) {
      R ^= this.s0, m ^= this.s1, S ^= this.s2, w ^= this.s3;
      const { W: T, t: M, windowSize: D } = this;
      let j = 0, B = 0, x = 0, U = 0;
      const $ = (1 << T) - 1;
      let F = 0;
      for (const V of [R, m, S, w])
        for (let W = 0; W < 4; W++) {
          const z = V >>> 8 * W & 255;
          for (let k = 8 / T - 1; k >= 0; k--) {
            const Z = z >>> T * k & $, { s0: d, s1: b, s2: l, s3: i } = M[F * D + Z];
            j ^= d, B ^= b, x ^= l, U ^= i, F += 1;
          }
        }
      this.s0 = j, this.s1 = B, this.s2 = x, this.s3 = U;
    }
    update(R) {
      (0, e.aexists)(this), R = (0, e.toBytes)(R), (0, e.abytes)(R);
      const m = (0, e.u32)(R), S = Math.floor(R.length / o), w = R.length % o;
      for (let T = 0; T < S; T++)
        this._updateBlock(m[T * 4 + 0], m[T * 4 + 1], m[T * 4 + 2], m[T * 4 + 3]);
      return w && (f.set(R.subarray(S * o)), this._updateBlock(h[0], h[1], h[2], h[3]), (0, e.clean)(h)), this;
    }
    destroy() {
      const { t: R } = this;
      for (const m of R)
        m.s0 = 0, m.s1 = 0, m.s2 = 0, m.s3 = 0;
    }
    digestInto(R) {
      (0, e.aexists)(this), (0, e.aoutput)(R, this), this.finished = !0;
      const { s0: m, s1: S, s2: w, s3: T } = this, M = (0, e.u32)(R);
      return M[0] = m, M[1] = S, M[2] = w, M[3] = T, R;
    }
    digest() {
      const R = new Uint8Array(o);
      return this.digestInto(R), this.destroy(), R;
    }
  }
  class H extends K {
    constructor(R, m) {
      R = (0, e.toBytes)(R), (0, e.abytes)(R);
      const S = p((0, e.copyBytes)(R));
      super(S, m), (0, e.clean)(S);
    }
    update(R) {
      R = (0, e.toBytes)(R), (0, e.aexists)(this);
      const m = (0, e.u32)(R), S = R.length % o, w = Math.floor(R.length / o);
      for (let T = 0; T < w; T++)
        this._updateBlock(c(m[T * 4 + 3]), c(m[T * 4 + 2]), c(m[T * 4 + 1]), c(m[T * 4 + 0]));
      return S && (f.set(R.subarray(w * o)), this._updateBlock(c(h[3]), c(h[2]), c(h[1]), c(h[0])), (0, e.clean)(h)), this;
    }
    digestInto(R) {
      (0, e.aexists)(this), (0, e.aoutput)(R, this), this.finished = !0;
      const { s0: m, s1: S, s2: w, s3: T } = this, M = (0, e.u32)(R);
      return M[0] = m, M[1] = S, M[2] = w, M[3] = T, R.reverse();
    }
  }
  function N(_) {
    const R = (S, w) => _(w, S.length).update((0, e.toBytes)(S)).digest(), m = _(new Uint8Array(16), 0);
    return R.outputLen = m.outputLen, R.blockLen = m.blockLen, R.create = (S, w) => _(S, w), R;
  }
  return De.ghash = N((_, R) => new K(_, R)), De.polyval = N((_, R) => new H(_, R)), De;
}
var Tr;
function To() {
  return Tr || (Tr = 1, (function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.unsafe = e.aeskwp = e.aeskw = e.siv = e.gcmsiv = e.gcm = e.cfb = e.cbc = e.ecb = e.ctr = void 0;
    const o = /* @__PURE__ */ Co(), f = /* @__PURE__ */ Te(), h = 16, v = 4, r = /* @__PURE__ */ new Uint8Array(h), c = 283;
    function p(s) {
      return s << 1 ^ c & -(s >> 7);
    }
    function A(s, a) {
      let n = 0;
      for (; a > 0; a >>= 1)
        n ^= s & -(a & 1), s = p(s);
      return n;
    }
    const K = /* @__PURE__ */ (() => {
      const s = new Uint8Array(256);
      for (let n = 0, u = 1; n < 256; n++, u ^= p(u))
        s[n] = u;
      const a = new Uint8Array(256);
      a[0] = 99;
      for (let n = 0; n < 255; n++) {
        let u = s[255 - n];
        u |= u << 8, a[s[n]] = (u ^ u >> 4 ^ u >> 5 ^ u >> 6 ^ u >> 7 ^ 99) & 255;
      }
      return (0, f.clean)(s), a;
    })(), H = /* @__PURE__ */ K.map((s, a) => K.indexOf(a)), N = (s) => s << 24 | s >>> 8, _ = (s) => s << 8 | s >>> 24, R = (s) => s << 24 & 4278190080 | s << 8 & 16711680 | s >>> 8 & 65280 | s >>> 24 & 255;
    function m(s, a) {
      if (s.length !== 256)
        throw new Error("Wrong sbox length");
      const n = new Uint32Array(256).map((q, X) => a(s[X])), u = n.map(_), O = u.map(_), C = O.map(_), E = new Uint32Array(256 * 256), I = new Uint32Array(256 * 256), L = new Uint16Array(256 * 256);
      for (let q = 0; q < 256; q++)
        for (let X = 0; X < 256; X++) {
          const P = q * 256 + X;
          E[P] = n[q] ^ u[X], I[P] = O[q] ^ C[X], L[P] = s[q] << 8 | s[X];
        }
      return { sbox: s, sbox2: L, T0: n, T1: u, T2: O, T3: C, T01: E, T23: I };
    }
    const S = /* @__PURE__ */ m(K, (s) => A(s, 3) << 24 | s << 16 | s << 8 | A(s, 2)), w = /* @__PURE__ */ m(H, (s) => A(s, 11) << 24 | A(s, 13) << 16 | A(s, 9) << 8 | A(s, 14)), T = /* @__PURE__ */ (() => {
      const s = new Uint8Array(16);
      for (let a = 0, n = 1; a < 16; a++, n = p(n))
        s[a] = n;
      return s;
    })();
    function M(s) {
      (0, f.abytes)(s);
      const a = s.length;
      if (![16, 24, 32].includes(a))
        throw new Error("aes: invalid key size, should be 16, 24 or 32, got " + a);
      const { sbox2: n } = S, u = [];
      (0, f.isAligned32)(s) || u.push(s = (0, f.copyBytes)(s));
      const O = (0, f.u32)(s), C = O.length, E = (L) => B(n, L, L, L, L), I = new Uint32Array(a + 28);
      I.set(O);
      for (let L = C; L < I.length; L++) {
        let q = I[L - 1];
        L % C === 0 ? q = E(N(q)) ^ T[L / C - 1] : C > 6 && L % C === 4 && (q = E(q)), I[L] = I[L - C] ^ q;
      }
      return (0, f.clean)(...u), I;
    }
    function D(s) {
      const a = M(s), n = a.slice(), u = a.length, { sbox2: O } = S, { T0: C, T1: E, T2: I, T3: L } = w;
      for (let q = 0; q < u; q += 4)
        for (let X = 0; X < 4; X++)
          n[q + X] = a[u - q - 4 + X];
      (0, f.clean)(a);
      for (let q = 4; q < u - 4; q++) {
        const X = n[q], P = B(O, X, X, X, X);
        n[q] = C[P & 255] ^ E[P >>> 8 & 255] ^ I[P >>> 16 & 255] ^ L[P >>> 24];
      }
      return n;
    }
    function j(s, a, n, u, O, C) {
      return s[n << 8 & 65280 | u >>> 8 & 255] ^ a[O >>> 8 & 65280 | C >>> 24 & 255];
    }
    function B(s, a, n, u, O) {
      return s[a & 255 | n & 65280] | s[u >>> 16 & 255 | O >>> 16 & 65280] << 16;
    }
    function x(s, a, n, u, O) {
      const { sbox2: C, T01: E, T23: I } = S;
      let L = 0;
      a ^= s[L++], n ^= s[L++], u ^= s[L++], O ^= s[L++];
      const q = s.length / 4 - 2;
      for (let ne = 0; ne < q; ne++) {
        const se = s[L++] ^ j(E, I, a, n, u, O), J = s[L++] ^ j(E, I, n, u, O, a), ce = s[L++] ^ j(E, I, u, O, a, n), Q = s[L++] ^ j(E, I, O, a, n, u);
        a = se, n = J, u = ce, O = Q;
      }
      const X = s[L++] ^ B(C, a, n, u, O), P = s[L++] ^ B(C, n, u, O, a), G = s[L++] ^ B(C, u, O, a, n), ee = s[L++] ^ B(C, O, a, n, u);
      return { s0: X, s1: P, s2: G, s3: ee };
    }
    function U(s, a, n, u, O) {
      const { sbox2: C, T01: E, T23: I } = w;
      let L = 0;
      a ^= s[L++], n ^= s[L++], u ^= s[L++], O ^= s[L++];
      const q = s.length / 4 - 2;
      for (let ne = 0; ne < q; ne++) {
        const se = s[L++] ^ j(E, I, a, O, u, n), J = s[L++] ^ j(E, I, n, a, O, u), ce = s[L++] ^ j(E, I, u, n, a, O), Q = s[L++] ^ j(E, I, O, u, n, a);
        a = se, n = J, u = ce, O = Q;
      }
      const X = s[L++] ^ B(C, a, O, u, n), P = s[L++] ^ B(C, n, a, O, u), G = s[L++] ^ B(C, u, n, a, O), ee = s[L++] ^ B(C, O, u, n, a);
      return { s0: X, s1: P, s2: G, s3: ee };
    }
    function $(s, a, n, u) {
      (0, f.abytes)(a, h), (0, f.abytes)(n);
      const O = n.length;
      u = (0, f.getOutput)(O, u), (0, f.complexOverlapBytes)(n, u);
      const C = a, E = (0, f.u32)(C);
      let { s0: I, s1: L, s2: q, s3: X } = x(s, E[0], E[1], E[2], E[3]);
      const P = (0, f.u32)(n), G = (0, f.u32)(u);
      for (let ne = 0; ne + 4 <= P.length; ne += 4) {
        G[ne + 0] = P[ne + 0] ^ I, G[ne + 1] = P[ne + 1] ^ L, G[ne + 2] = P[ne + 2] ^ q, G[ne + 3] = P[ne + 3] ^ X;
        let se = 1;
        for (let J = C.length - 1; J >= 0; J--)
          se = se + (C[J] & 255) | 0, C[J] = se & 255, se >>>= 8;
        ({ s0: I, s1: L, s2: q, s3: X } = x(s, E[0], E[1], E[2], E[3]));
      }
      const ee = h * Math.floor(P.length / v);
      if (ee < O) {
        const ne = new Uint32Array([I, L, q, X]), se = (0, f.u8)(ne);
        for (let J = ee, ce = 0; J < O; J++, ce++)
          u[J] = n[J] ^ se[ce];
        (0, f.clean)(ne);
      }
      return u;
    }
    function F(s, a, n, u, O) {
      (0, f.abytes)(n, h), (0, f.abytes)(u), O = (0, f.getOutput)(u.length, O);
      const C = n, E = (0, f.u32)(C), I = (0, f.createView)(C), L = (0, f.u32)(u), q = (0, f.u32)(O), X = a ? 0 : 12, P = u.length;
      let G = I.getUint32(X, a), { s0: ee, s1: ne, s2: se, s3: J } = x(s, E[0], E[1], E[2], E[3]);
      for (let Q = 0; Q + 4 <= L.length; Q += 4)
        q[Q + 0] = L[Q + 0] ^ ee, q[Q + 1] = L[Q + 1] ^ ne, q[Q + 2] = L[Q + 2] ^ se, q[Q + 3] = L[Q + 3] ^ J, G = G + 1 >>> 0, I.setUint32(X, G, a), { s0: ee, s1: ne, s2: se, s3: J } = x(s, E[0], E[1], E[2], E[3]);
      const ce = h * Math.floor(L.length / v);
      if (ce < P) {
        const Q = new Uint32Array([ee, ne, se, J]), de = (0, f.u8)(Q);
        for (let he = ce, le = 0; he < P; he++, le++)
          O[he] = u[he] ^ de[le];
        (0, f.clean)(Q);
      }
      return O;
    }
    e.ctr = (0, f.wrapCipher)({ blockSize: 16, nonceLength: 16 }, function(a, n) {
      function u(O, C) {
        if ((0, f.abytes)(O), C !== void 0 && ((0, f.abytes)(C), !(0, f.isAligned32)(C)))
          throw new Error("unaligned destination");
        const E = M(a), I = (0, f.copyBytes)(n), L = [E, I];
        (0, f.isAligned32)(O) || L.push(O = (0, f.copyBytes)(O));
        const q = $(E, I, O, C);
        return (0, f.clean)(...L), q;
      }
      return {
        encrypt: (O, C) => u(O, C),
        decrypt: (O, C) => u(O, C)
      };
    });
    function V(s) {
      if ((0, f.abytes)(s), s.length % h !== 0)
        throw new Error("aes-(cbc/ecb).decrypt ciphertext should consist of blocks with size " + h);
    }
    function W(s, a, n) {
      (0, f.abytes)(s);
      let u = s.length;
      const O = u % h;
      if (!a && O !== 0)
        throw new Error("aec/(cbc-ecb): unpadded plaintext with disabled padding");
      (0, f.isAligned32)(s) || (s = (0, f.copyBytes)(s));
      const C = (0, f.u32)(s);
      if (a) {
        let I = h - O;
        I || (I = h), u = u + I;
      }
      n = (0, f.getOutput)(u, n), (0, f.complexOverlapBytes)(s, n);
      const E = (0, f.u32)(n);
      return { b: C, o: E, out: n };
    }
    function z(s, a) {
      if (!a)
        return s;
      const n = s.length;
      if (!n)
        throw new Error("aes/pcks5: empty ciphertext not allowed");
      const u = s[n - 1];
      if (u <= 0 || u > 16)
        throw new Error("aes/pcks5: wrong padding");
      const O = s.subarray(0, -u);
      for (let C = 0; C < u; C++)
        if (s[n - C - 1] !== u)
          throw new Error("aes/pcks5: wrong padding");
      return O;
    }
    function k(s) {
      const a = new Uint8Array(16), n = (0, f.u32)(a);
      a.set(s);
      const u = h - s.length;
      for (let O = h - u; O < h; O++)
        a[O] = u;
      return n;
    }
    e.ecb = (0, f.wrapCipher)({ blockSize: 16 }, function(a, n = {}) {
      const u = !n.disablePadding;
      return {
        encrypt(O, C) {
          const { b: E, o: I, out: L } = W(O, u, C), q = M(a);
          let X = 0;
          for (; X + 4 <= E.length; ) {
            const { s0: P, s1: G, s2: ee, s3: ne } = x(q, E[X + 0], E[X + 1], E[X + 2], E[X + 3]);
            I[X++] = P, I[X++] = G, I[X++] = ee, I[X++] = ne;
          }
          if (u) {
            const P = k(O.subarray(X * 4)), { s0: G, s1: ee, s2: ne, s3: se } = x(q, P[0], P[1], P[2], P[3]);
            I[X++] = G, I[X++] = ee, I[X++] = ne, I[X++] = se;
          }
          return (0, f.clean)(q), L;
        },
        decrypt(O, C) {
          V(O);
          const E = D(a);
          C = (0, f.getOutput)(O.length, C);
          const I = [E];
          (0, f.isAligned32)(O) || I.push(O = (0, f.copyBytes)(O)), (0, f.complexOverlapBytes)(O, C);
          const L = (0, f.u32)(O), q = (0, f.u32)(C);
          for (let X = 0; X + 4 <= L.length; ) {
            const { s0: P, s1: G, s2: ee, s3: ne } = U(E, L[X + 0], L[X + 1], L[X + 2], L[X + 3]);
            q[X++] = P, q[X++] = G, q[X++] = ee, q[X++] = ne;
          }
          return (0, f.clean)(...I), z(C, u);
        }
      };
    }), e.cbc = (0, f.wrapCipher)({ blockSize: 16, nonceLength: 16 }, function(a, n, u = {}) {
      const O = !u.disablePadding;
      return {
        encrypt(C, E) {
          const I = M(a), { b: L, o: q, out: X } = W(C, O, E);
          let P = n;
          const G = [I];
          (0, f.isAligned32)(P) || G.push(P = (0, f.copyBytes)(P));
          const ee = (0, f.u32)(P);
          let ne = ee[0], se = ee[1], J = ee[2], ce = ee[3], Q = 0;
          for (; Q + 4 <= L.length; )
            ne ^= L[Q + 0], se ^= L[Q + 1], J ^= L[Q + 2], ce ^= L[Q + 3], { s0: ne, s1: se, s2: J, s3: ce } = x(I, ne, se, J, ce), q[Q++] = ne, q[Q++] = se, q[Q++] = J, q[Q++] = ce;
          if (O) {
            const de = k(C.subarray(Q * 4));
            ne ^= de[0], se ^= de[1], J ^= de[2], ce ^= de[3], { s0: ne, s1: se, s2: J, s3: ce } = x(I, ne, se, J, ce), q[Q++] = ne, q[Q++] = se, q[Q++] = J, q[Q++] = ce;
          }
          return (0, f.clean)(...G), X;
        },
        decrypt(C, E) {
          V(C);
          const I = D(a);
          let L = n;
          const q = [I];
          (0, f.isAligned32)(L) || q.push(L = (0, f.copyBytes)(L));
          const X = (0, f.u32)(L);
          E = (0, f.getOutput)(C.length, E), (0, f.isAligned32)(C) || q.push(C = (0, f.copyBytes)(C)), (0, f.complexOverlapBytes)(C, E);
          const P = (0, f.u32)(C), G = (0, f.u32)(E);
          let ee = X[0], ne = X[1], se = X[2], J = X[3];
          for (let ce = 0; ce + 4 <= P.length; ) {
            const Q = ee, de = ne, he = se, le = J;
            ee = P[ce + 0], ne = P[ce + 1], se = P[ce + 2], J = P[ce + 3];
            const { s0: re, s1: ie, s2: oe, s3: fe } = U(I, ee, ne, se, J);
            G[ce++] = re ^ Q, G[ce++] = ie ^ de, G[ce++] = oe ^ he, G[ce++] = fe ^ le;
          }
          return (0, f.clean)(...q), z(E, O);
        }
      };
    }), e.cfb = (0, f.wrapCipher)({ blockSize: 16, nonceLength: 16 }, function(a, n) {
      function u(O, C, E) {
        (0, f.abytes)(O);
        const I = O.length;
        if (E = (0, f.getOutput)(I, E), (0, f.overlapBytes)(O, E))
          throw new Error("overlapping src and dst not supported.");
        const L = M(a);
        let q = n;
        const X = [L];
        (0, f.isAligned32)(q) || X.push(q = (0, f.copyBytes)(q)), (0, f.isAligned32)(O) || X.push(O = (0, f.copyBytes)(O));
        const P = (0, f.u32)(O), G = (0, f.u32)(E), ee = C ? G : P, ne = (0, f.u32)(q);
        let se = ne[0], J = ne[1], ce = ne[2], Q = ne[3];
        for (let he = 0; he + 4 <= P.length; ) {
          const { s0: le, s1: re, s2: ie, s3: oe } = x(L, se, J, ce, Q);
          G[he + 0] = P[he + 0] ^ le, G[he + 1] = P[he + 1] ^ re, G[he + 2] = P[he + 2] ^ ie, G[he + 3] = P[he + 3] ^ oe, se = ee[he++], J = ee[he++], ce = ee[he++], Q = ee[he++];
        }
        const de = h * Math.floor(P.length / v);
        if (de < I) {
          ({ s0: se, s1: J, s2: ce, s3: Q } = x(L, se, J, ce, Q));
          const he = (0, f.u8)(new Uint32Array([se, J, ce, Q]));
          for (let le = de, re = 0; le < I; le++, re++)
            E[le] = O[le] ^ he[re];
          (0, f.clean)(he);
        }
        return (0, f.clean)(...X), E;
      }
      return {
        encrypt: (O, C) => u(O, !0, C),
        decrypt: (O, C) => u(O, !1, C)
      };
    });
    function Z(s, a, n, u, O) {
      const C = O ? O.length : 0, E = s.create(n, u.length + C);
      O && E.update(O);
      const I = (0, f.u64Lengths)(8 * u.length, 8 * C, a);
      E.update(u), E.update(I);
      const L = E.digest();
      return (0, f.clean)(I), L;
    }
    e.gcm = (0, f.wrapCipher)({ blockSize: 16, nonceLength: 12, tagLength: 16, varSizeNonce: !0 }, function(a, n, u) {
      if (n.length < 8)
        throw new Error("aes/gcm: invalid nonce length");
      const O = 16;
      function C(I, L, q) {
        const X = Z(o.ghash, !1, I, q, u);
        for (let P = 0; P < L.length; P++)
          X[P] ^= L[P];
        return X;
      }
      function E() {
        const I = M(a), L = r.slice(), q = r.slice();
        if (F(I, !1, q, q, L), n.length === 12)
          q.set(n);
        else {
          const P = r.slice(), G = (0, f.createView)(P);
          (0, f.setBigUint64)(G, 8, BigInt(n.length * 8), !1);
          const ee = o.ghash.create(L).update(n).update(P);
          ee.digestInto(q), ee.destroy();
        }
        const X = F(I, !1, q, r);
        return { xk: I, authKey: L, counter: q, tagMask: X };
      }
      return {
        encrypt(I) {
          const { xk: L, authKey: q, counter: X, tagMask: P } = E(), G = new Uint8Array(I.length + O), ee = [L, q, X, P];
          (0, f.isAligned32)(I) || ee.push(I = (0, f.copyBytes)(I)), F(L, !1, X, I, G.subarray(0, I.length));
          const ne = C(q, P, G.subarray(0, G.length - O));
          return ee.push(ne), G.set(ne, I.length), (0, f.clean)(...ee), G;
        },
        decrypt(I) {
          const { xk: L, authKey: q, counter: X, tagMask: P } = E(), G = [L, q, P, X];
          (0, f.isAligned32)(I) || G.push(I = (0, f.copyBytes)(I));
          const ee = I.subarray(0, -O), ne = I.subarray(-O), se = C(q, P, ee);
          if (G.push(se), !(0, f.equalBytes)(se, ne))
            throw new Error("aes/gcm: invalid ghash tag");
          const J = F(L, !1, X, ee);
          return (0, f.clean)(...G), J;
        }
      };
    });
    const d = (s, a, n) => (u) => {
      if (!Number.isSafeInteger(u) || a > u || u > n) {
        const O = "[" + a + ".." + n + "]";
        throw new Error("" + s + ": expected value in range " + O + ", got " + u);
      }
    };
    e.gcmsiv = (0, f.wrapCipher)({ blockSize: 16, nonceLength: 12, tagLength: 16, varSizeNonce: !0 }, function(a, n, u) {
      const C = d("AAD", 0, 68719476736), E = d("plaintext", 0, 2 ** 36), I = d("nonce", 12, 12), L = d("ciphertext", 16, 2 ** 36 + 16);
      (0, f.abytes)(a, 16, 24, 32), I(n.length), u !== void 0 && C(u.length);
      function q() {
        const G = M(a), ee = new Uint8Array(a.length), ne = new Uint8Array(16), se = [G, ee];
        let J = n;
        (0, f.isAligned32)(J) || se.push(J = (0, f.copyBytes)(J));
        const ce = (0, f.u32)(J);
        let Q = 0, de = ce[0], he = ce[1], le = ce[2], re = 0;
        for (const oe of [ne, ee].map(f.u32)) {
          const fe = (0, f.u32)(oe);
          for (let pe = 0; pe < fe.length; pe += 2) {
            const { s0: be, s1: ge } = x(G, Q, de, he, le);
            fe[pe + 0] = be, fe[pe + 1] = ge, Q = ++re;
          }
        }
        const ie = { authKey: ne, encKey: M(ee) };
        return (0, f.clean)(...se), ie;
      }
      function X(G, ee, ne) {
        const se = Z(o.polyval, !0, ee, ne, u);
        for (let le = 0; le < 12; le++)
          se[le] ^= n[le];
        se[15] &= 127;
        const J = (0, f.u32)(se);
        let ce = J[0], Q = J[1], de = J[2], he = J[3];
        return { s0: ce, s1: Q, s2: de, s3: he } = x(G, ce, Q, de, he), J[0] = ce, J[1] = Q, J[2] = de, J[3] = he, se;
      }
      function P(G, ee, ne) {
        let se = (0, f.copyBytes)(ee);
        se[15] |= 128;
        const J = F(G, !0, se, ne);
        return (0, f.clean)(se), J;
      }
      return {
        encrypt(G) {
          E(G.length);
          const { encKey: ee, authKey: ne } = q(), se = X(ee, ne, G), J = [ee, ne, se];
          (0, f.isAligned32)(G) || J.push(G = (0, f.copyBytes)(G));
          const ce = new Uint8Array(G.length + 16);
          return ce.set(se, G.length), ce.set(P(ee, se, G)), (0, f.clean)(...J), ce;
        },
        decrypt(G) {
          L(G.length);
          const ee = G.subarray(-16), { encKey: ne, authKey: se } = q(), J = [ne, se];
          (0, f.isAligned32)(G) || J.push(G = (0, f.copyBytes)(G));
          const ce = P(ne, ee, G.subarray(0, -16)), Q = X(ne, se, ce);
          if (J.push(Q), !(0, f.equalBytes)(ee, Q))
            throw (0, f.clean)(...J), new Error("invalid polyval tag");
          return (0, f.clean)(...J), ce;
        }
      };
    }), e.siv = e.gcmsiv;
    function b(s) {
      return s instanceof Uint32Array || ArrayBuffer.isView(s) && s.constructor.name === "Uint32Array";
    }
    function l(s, a) {
      if ((0, f.abytes)(a, 16), !b(s))
        throw new Error("_encryptBlock accepts result of expandKeyLE");
      const n = (0, f.u32)(a);
      let { s0: u, s1: O, s2: C, s3: E } = x(s, n[0], n[1], n[2], n[3]);
      return n[0] = u, n[1] = O, n[2] = C, n[3] = E, a;
    }
    function i(s, a) {
      if ((0, f.abytes)(a, 16), !b(s))
        throw new Error("_decryptBlock accepts result of expandKeyLE");
      const n = (0, f.u32)(a);
      let { s0: u, s1: O, s2: C, s3: E } = U(s, n[0], n[1], n[2], n[3]);
      return n[0] = u, n[1] = O, n[2] = C, n[3] = E, a;
    }
    const g = {
      /*
      High-level pseudocode:
      ```
      A: u64 = IV
      out = []
      for (let i=0, ctr = 0; i<6; i++) {
        for (const chunk of chunks(plaintext, 8)) {
          A ^= swapEndianess(ctr++)
          [A, res] = chunks(encrypt(A || chunk), 8);
          out ||= res
        }
      }
      out = A || out
      ```
      Decrypt is the same, but reversed.
      */
      encrypt(s, a) {
        if (a.length >= 2 ** 32)
          throw new Error("plaintext should be less than 4gb");
        const n = M(s);
        if (a.length === 16)
          l(n, a);
        else {
          const u = (0, f.u32)(a);
          let O = u[0], C = u[1];
          for (let E = 0, I = 1; E < 6; E++)
            for (let L = 2; L < u.length; L += 2, I++) {
              const { s0: q, s1: X, s2: P, s3: G } = x(n, O, C, u[L], u[L + 1]);
              O = q, C = X ^ R(I), u[L] = P, u[L + 1] = G;
            }
          u[0] = O, u[1] = C;
        }
        n.fill(0);
      },
      decrypt(s, a) {
        if (a.length - 8 >= 2 ** 32)
          throw new Error("ciphertext should be less than 4gb");
        const n = D(s), u = a.length / 8 - 1;
        if (u === 1)
          i(n, a);
        else {
          const O = (0, f.u32)(a);
          let C = O[0], E = O[1];
          for (let I = 0, L = u * 6; I < 6; I++)
            for (let q = u * 2; q >= 1; q -= 2, L--) {
              E ^= R(L);
              const { s0: X, s1: P, s2: G, s3: ee } = U(n, C, E, O[q], O[q + 1]);
              C = X, E = P, O[q] = G, O[q + 1] = ee;
            }
          O[0] = C, O[1] = E;
        }
        n.fill(0);
      }
    }, y = /* @__PURE__ */ new Uint8Array(8).fill(166);
    e.aeskw = (0, f.wrapCipher)({ blockSize: 8 }, (s) => ({
      encrypt(a) {
        if (!a.length || a.length % 8 !== 0)
          throw new Error("invalid plaintext length");
        if (a.length === 8)
          throw new Error("8-byte keys not allowed in AESKW, use AESKWP instead");
        const n = (0, f.concatBytes)(y, a);
        return g.encrypt(s, n), n;
      },
      decrypt(a) {
        if (a.length % 8 !== 0 || a.length < 24)
          throw new Error("invalid ciphertext length");
        const n = (0, f.copyBytes)(a);
        if (g.decrypt(s, n), !(0, f.equalBytes)(n.subarray(0, 8), y))
          throw new Error("integrity check failed");
        return n.subarray(0, 8).fill(0), n.subarray(8);
      }
    }));
    const t = 2790873510;
    e.aeskwp = (0, f.wrapCipher)({ blockSize: 8 }, (s) => ({
      encrypt(a) {
        if (!a.length)
          throw new Error("invalid plaintext length");
        const n = Math.ceil(a.length / 8) * 8, u = new Uint8Array(8 + n);
        u.set(a, 8);
        const O = (0, f.u32)(u);
        return O[0] = t, O[1] = R(a.length), g.encrypt(s, u), u;
      },
      decrypt(a) {
        if (a.length < 16)
          throw new Error("invalid ciphertext length");
        const n = (0, f.copyBytes)(a), u = (0, f.u32)(n);
        g.decrypt(s, n);
        const O = R(u[1]) >>> 0, C = Math.ceil(O / 8) * 8;
        if (u[0] !== t || n.length - 8 !== C)
          throw new Error("integrity check failed");
        for (let E = O; E < C; E++)
          if (n[8 + E] !== 0)
            throw new Error("integrity check failed");
        return n.subarray(0, 8).fill(0), n.subarray(8, 8 + O);
      }
    })), e.unsafe = {
      expandKeyLE: M,
      expandKeyDecLE: D,
      encrypt: x,
      decrypt: U,
      encryptBlock: l,
      decryptBlock: i,
      ctrCounter: $,
      ctr32: F
    };
  })(jt)), jt;
}
var Pr;
function Po() {
  if (Pr) return Me;
  Pr = 1, Object.defineProperty(Me, "__esModule", { value: !0 }), Me.aes256cbc = Me.aes256gcm = void 0;
  var e = /* @__PURE__ */ To(), o = function(h, v, r) {
    return (0, e.gcm)(h, v, r);
  };
  Me.aes256gcm = o;
  var f = function(h, v, r) {
    return (0, e.cbc)(h, v);
  };
  return Me.aes256cbc = f, Me;
}
var je = {}, Gt = {}, tt = {}, Lr;
function Lo() {
  if (Lr) return tt;
  Lr = 1, Object.defineProperty(tt, "__esModule", { value: !0 }), tt.rotl = c, tt.createCipher = R;
  const e = /* @__PURE__ */ Te(), o = (m) => Uint8Array.from(m.split("").map((S) => S.charCodeAt(0))), f = o("expand 16-byte k"), h = o("expand 32-byte k"), v = (0, e.u32)(f), r = (0, e.u32)(h);
  function c(m, S) {
    return m << S | m >>> 32 - S;
  }
  function p(m) {
    return m.byteOffset % 4 === 0;
  }
  const A = 64, K = 16, H = 2 ** 32 - 1, N = new Uint32Array();
  function _(m, S, w, T, M, D, j, B) {
    const x = M.length, U = new Uint8Array(A), $ = (0, e.u32)(U), F = p(M) && p(D), V = F ? (0, e.u32)(M) : N, W = F ? (0, e.u32)(D) : N;
    for (let z = 0; z < x; j++) {
      if (m(S, w, T, $, j, B), j >= H)
        throw new Error("arx: counter overflow");
      const k = Math.min(A, x - z);
      if (F && k === A) {
        const Z = z / 4;
        if (z % 4 !== 0)
          throw new Error("arx: invalid block position");
        for (let d = 0, b; d < K; d++)
          b = Z + d, W[b] = V[b] ^ $[d];
        z += A;
        continue;
      }
      for (let Z = 0, d; Z < k; Z++)
        d = z + Z, D[d] = M[d] ^ U[Z];
      z += k;
    }
  }
  function R(m, S) {
    const { allowShortKeys: w, extendNonceFn: T, counterLength: M, counterRight: D, rounds: j } = (0, e.checkOpts)({ allowShortKeys: !1, counterLength: 8, counterRight: !1, rounds: 20 }, S);
    if (typeof m != "function")
      throw new Error("core must be a function");
    return (0, e.anumber)(M), (0, e.anumber)(j), (0, e.abool)(D), (0, e.abool)(w), (B, x, U, $, F = 0) => {
      (0, e.abytes)(B), (0, e.abytes)(x), (0, e.abytes)(U);
      const V = U.length;
      if ($ === void 0 && ($ = new Uint8Array(V)), (0, e.abytes)($), (0, e.anumber)(F), F < 0 || F >= H)
        throw new Error("arx: counter overflow");
      if ($.length < V)
        throw new Error(`arx: output (${$.length}) is shorter than data (${V})`);
      const W = [];
      let z = B.length, k, Z;
      if (z === 32)
        W.push(k = (0, e.copyBytes)(B)), Z = r;
      else if (z === 16 && w)
        k = new Uint8Array(32), k.set(B), k.set(B, 16), Z = v, W.push(k);
      else
        throw new Error(`arx: invalid 32-byte key, got length=${z}`);
      p(x) || W.push(x = (0, e.copyBytes)(x));
      const d = (0, e.u32)(k);
      if (T) {
        if (x.length !== 24)
          throw new Error("arx: extended nonce must be 24 bytes");
        T(Z, d, (0, e.u32)(x.subarray(0, 16)), d), x = x.subarray(16);
      }
      const b = 16 - M;
      if (b !== x.length)
        throw new Error(`arx: nonce must be ${b} or 16 bytes`);
      if (b !== 12) {
        const i = new Uint8Array(12);
        i.set(x, D ? 0 : 12 - x.length), x = i, W.push(x);
      }
      const l = (0, e.u32)(x);
      return _(m, Z, d, l, U, $, F, j), (0, e.clean)(...W), $;
    };
  }
  return tt;
}
var Ye = {}, Hr;
function Ho() {
  if (Hr) return Ye;
  Hr = 1, Object.defineProperty(Ye, "__esModule", { value: !0 }), Ye.poly1305 = void 0, Ye.wrapConstructorWithKey = h;
  const e = /* @__PURE__ */ Te(), o = (v, r) => v[r++] & 255 | (v[r++] & 255) << 8;
  class f {
    constructor(r) {
      this.blockLen = 16, this.outputLen = 16, this.buffer = new Uint8Array(16), this.r = new Uint16Array(10), this.h = new Uint16Array(10), this.pad = new Uint16Array(8), this.pos = 0, this.finished = !1, r = (0, e.toBytes)(r), (0, e.abytes)(r, 32);
      const c = o(r, 0), p = o(r, 2), A = o(r, 4), K = o(r, 6), H = o(r, 8), N = o(r, 10), _ = o(r, 12), R = o(r, 14);
      this.r[0] = c & 8191, this.r[1] = (c >>> 13 | p << 3) & 8191, this.r[2] = (p >>> 10 | A << 6) & 7939, this.r[3] = (A >>> 7 | K << 9) & 8191, this.r[4] = (K >>> 4 | H << 12) & 255, this.r[5] = H >>> 1 & 8190, this.r[6] = (H >>> 14 | N << 2) & 8191, this.r[7] = (N >>> 11 | _ << 5) & 8065, this.r[8] = (_ >>> 8 | R << 8) & 8191, this.r[9] = R >>> 5 & 127;
      for (let m = 0; m < 8; m++)
        this.pad[m] = o(r, 16 + 2 * m);
    }
    process(r, c, p = !1) {
      const A = p ? 0 : 2048, { h: K, r: H } = this, N = H[0], _ = H[1], R = H[2], m = H[3], S = H[4], w = H[5], T = H[6], M = H[7], D = H[8], j = H[9], B = o(r, c + 0), x = o(r, c + 2), U = o(r, c + 4), $ = o(r, c + 6), F = o(r, c + 8), V = o(r, c + 10), W = o(r, c + 12), z = o(r, c + 14);
      let k = K[0] + (B & 8191), Z = K[1] + ((B >>> 13 | x << 3) & 8191), d = K[2] + ((x >>> 10 | U << 6) & 8191), b = K[3] + ((U >>> 7 | $ << 9) & 8191), l = K[4] + (($ >>> 4 | F << 12) & 8191), i = K[5] + (F >>> 1 & 8191), g = K[6] + ((F >>> 14 | V << 2) & 8191), y = K[7] + ((V >>> 11 | W << 5) & 8191), t = K[8] + ((W >>> 8 | z << 8) & 8191), s = K[9] + (z >>> 5 | A), a = 0, n = a + k * N + Z * (5 * j) + d * (5 * D) + b * (5 * M) + l * (5 * T);
      a = n >>> 13, n &= 8191, n += i * (5 * w) + g * (5 * S) + y * (5 * m) + t * (5 * R) + s * (5 * _), a += n >>> 13, n &= 8191;
      let u = a + k * _ + Z * N + d * (5 * j) + b * (5 * D) + l * (5 * M);
      a = u >>> 13, u &= 8191, u += i * (5 * T) + g * (5 * w) + y * (5 * S) + t * (5 * m) + s * (5 * R), a += u >>> 13, u &= 8191;
      let O = a + k * R + Z * _ + d * N + b * (5 * j) + l * (5 * D);
      a = O >>> 13, O &= 8191, O += i * (5 * M) + g * (5 * T) + y * (5 * w) + t * (5 * S) + s * (5 * m), a += O >>> 13, O &= 8191;
      let C = a + k * m + Z * R + d * _ + b * N + l * (5 * j);
      a = C >>> 13, C &= 8191, C += i * (5 * D) + g * (5 * M) + y * (5 * T) + t * (5 * w) + s * (5 * S), a += C >>> 13, C &= 8191;
      let E = a + k * S + Z * m + d * R + b * _ + l * N;
      a = E >>> 13, E &= 8191, E += i * (5 * j) + g * (5 * D) + y * (5 * M) + t * (5 * T) + s * (5 * w), a += E >>> 13, E &= 8191;
      let I = a + k * w + Z * S + d * m + b * R + l * _;
      a = I >>> 13, I &= 8191, I += i * N + g * (5 * j) + y * (5 * D) + t * (5 * M) + s * (5 * T), a += I >>> 13, I &= 8191;
      let L = a + k * T + Z * w + d * S + b * m + l * R;
      a = L >>> 13, L &= 8191, L += i * _ + g * N + y * (5 * j) + t * (5 * D) + s * (5 * M), a += L >>> 13, L &= 8191;
      let q = a + k * M + Z * T + d * w + b * S + l * m;
      a = q >>> 13, q &= 8191, q += i * R + g * _ + y * N + t * (5 * j) + s * (5 * D), a += q >>> 13, q &= 8191;
      let X = a + k * D + Z * M + d * T + b * w + l * S;
      a = X >>> 13, X &= 8191, X += i * m + g * R + y * _ + t * N + s * (5 * j), a += X >>> 13, X &= 8191;
      let P = a + k * j + Z * D + d * M + b * T + l * w;
      a = P >>> 13, P &= 8191, P += i * S + g * m + y * R + t * _ + s * N, a += P >>> 13, P &= 8191, a = (a << 2) + a | 0, a = a + n | 0, n = a & 8191, a = a >>> 13, u += a, K[0] = n, K[1] = u, K[2] = O, K[3] = C, K[4] = E, K[5] = I, K[6] = L, K[7] = q, K[8] = X, K[9] = P;
    }
    finalize() {
      const { h: r, pad: c } = this, p = new Uint16Array(10);
      let A = r[1] >>> 13;
      r[1] &= 8191;
      for (let N = 2; N < 10; N++)
        r[N] += A, A = r[N] >>> 13, r[N] &= 8191;
      r[0] += A * 5, A = r[0] >>> 13, r[0] &= 8191, r[1] += A, A = r[1] >>> 13, r[1] &= 8191, r[2] += A, p[0] = r[0] + 5, A = p[0] >>> 13, p[0] &= 8191;
      for (let N = 1; N < 10; N++)
        p[N] = r[N] + A, A = p[N] >>> 13, p[N] &= 8191;
      p[9] -= 8192;
      let K = (A ^ 1) - 1;
      for (let N = 0; N < 10; N++)
        p[N] &= K;
      K = ~K;
      for (let N = 0; N < 10; N++)
        r[N] = r[N] & K | p[N];
      r[0] = (r[0] | r[1] << 13) & 65535, r[1] = (r[1] >>> 3 | r[2] << 10) & 65535, r[2] = (r[2] >>> 6 | r[3] << 7) & 65535, r[3] = (r[3] >>> 9 | r[4] << 4) & 65535, r[4] = (r[4] >>> 12 | r[5] << 1 | r[6] << 14) & 65535, r[5] = (r[6] >>> 2 | r[7] << 11) & 65535, r[6] = (r[7] >>> 5 | r[8] << 8) & 65535, r[7] = (r[8] >>> 8 | r[9] << 5) & 65535;
      let H = r[0] + c[0];
      r[0] = H & 65535;
      for (let N = 1; N < 8; N++)
        H = (r[N] + c[N] | 0) + (H >>> 16) | 0, r[N] = H & 65535;
      (0, e.clean)(p);
    }
    update(r) {
      (0, e.aexists)(this), r = (0, e.toBytes)(r), (0, e.abytes)(r);
      const { buffer: c, blockLen: p } = this, A = r.length;
      for (let K = 0; K < A; ) {
        const H = Math.min(p - this.pos, A - K);
        if (H === p) {
          for (; p <= A - K; K += p)
            this.process(r, K);
          continue;
        }
        c.set(r.subarray(K, K + H), this.pos), this.pos += H, K += H, this.pos === p && (this.process(c, 0, !1), this.pos = 0);
      }
      return this;
    }
    destroy() {
      (0, e.clean)(this.h, this.r, this.buffer, this.pad);
    }
    digestInto(r) {
      (0, e.aexists)(this), (0, e.aoutput)(r, this), this.finished = !0;
      const { buffer: c, h: p } = this;
      let { pos: A } = this;
      if (A) {
        for (c[A++] = 1; A < 16; A++)
          c[A] = 0;
        this.process(c, 0, !0);
      }
      this.finalize();
      let K = 0;
      for (let H = 0; H < 8; H++)
        r[K++] = p[H] >>> 0, r[K++] = p[H] >>> 8;
      return r;
    }
    digest() {
      const { buffer: r, outputLen: c } = this;
      this.digestInto(r);
      const p = r.slice(0, c);
      return this.destroy(), p;
    }
  }
  function h(v) {
    const r = (p, A) => v(A).update((0, e.toBytes)(p)).digest(), c = v(new Uint8Array(32));
    return r.outputLen = c.outputLen, r.blockLen = c.blockLen, r.create = (p) => v(p), r;
  }
  return Ye.poly1305 = h((v) => new f(v)), Ye;
}
var Nr;
function No() {
  return Nr || (Nr = 1, (function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.xchacha20poly1305 = e.chacha20poly1305 = e._poly1305_aead = e.chacha12 = e.chacha8 = e.xchacha20 = e.chacha20 = e.chacha20orig = void 0, e.hchacha = r;
    const o = /* @__PURE__ */ Lo(), f = /* @__PURE__ */ Ho(), h = /* @__PURE__ */ Te();
    function v(N, _, R, m, S, w = 20) {
      let T = N[0], M = N[1], D = N[2], j = N[3], B = _[0], x = _[1], U = _[2], $ = _[3], F = _[4], V = _[5], W = _[6], z = _[7], k = S, Z = R[0], d = R[1], b = R[2], l = T, i = M, g = D, y = j, t = B, s = x, a = U, n = $, u = F, O = V, C = W, E = z, I = k, L = Z, q = d, X = b;
      for (let G = 0; G < w; G += 2)
        l = l + t | 0, I = (0, o.rotl)(I ^ l, 16), u = u + I | 0, t = (0, o.rotl)(t ^ u, 12), l = l + t | 0, I = (0, o.rotl)(I ^ l, 8), u = u + I | 0, t = (0, o.rotl)(t ^ u, 7), i = i + s | 0, L = (0, o.rotl)(L ^ i, 16), O = O + L | 0, s = (0, o.rotl)(s ^ O, 12), i = i + s | 0, L = (0, o.rotl)(L ^ i, 8), O = O + L | 0, s = (0, o.rotl)(s ^ O, 7), g = g + a | 0, q = (0, o.rotl)(q ^ g, 16), C = C + q | 0, a = (0, o.rotl)(a ^ C, 12), g = g + a | 0, q = (0, o.rotl)(q ^ g, 8), C = C + q | 0, a = (0, o.rotl)(a ^ C, 7), y = y + n | 0, X = (0, o.rotl)(X ^ y, 16), E = E + X | 0, n = (0, o.rotl)(n ^ E, 12), y = y + n | 0, X = (0, o.rotl)(X ^ y, 8), E = E + X | 0, n = (0, o.rotl)(n ^ E, 7), l = l + s | 0, X = (0, o.rotl)(X ^ l, 16), C = C + X | 0, s = (0, o.rotl)(s ^ C, 12), l = l + s | 0, X = (0, o.rotl)(X ^ l, 8), C = C + X | 0, s = (0, o.rotl)(s ^ C, 7), i = i + a | 0, I = (0, o.rotl)(I ^ i, 16), E = E + I | 0, a = (0, o.rotl)(a ^ E, 12), i = i + a | 0, I = (0, o.rotl)(I ^ i, 8), E = E + I | 0, a = (0, o.rotl)(a ^ E, 7), g = g + n | 0, L = (0, o.rotl)(L ^ g, 16), u = u + L | 0, n = (0, o.rotl)(n ^ u, 12), g = g + n | 0, L = (0, o.rotl)(L ^ g, 8), u = u + L | 0, n = (0, o.rotl)(n ^ u, 7), y = y + t | 0, q = (0, o.rotl)(q ^ y, 16), O = O + q | 0, t = (0, o.rotl)(t ^ O, 12), y = y + t | 0, q = (0, o.rotl)(q ^ y, 8), O = O + q | 0, t = (0, o.rotl)(t ^ O, 7);
      let P = 0;
      m[P++] = T + l | 0, m[P++] = M + i | 0, m[P++] = D + g | 0, m[P++] = j + y | 0, m[P++] = B + t | 0, m[P++] = x + s | 0, m[P++] = U + a | 0, m[P++] = $ + n | 0, m[P++] = F + u | 0, m[P++] = V + O | 0, m[P++] = W + C | 0, m[P++] = z + E | 0, m[P++] = k + I | 0, m[P++] = Z + L | 0, m[P++] = d + q | 0, m[P++] = b + X | 0;
    }
    function r(N, _, R, m) {
      let S = N[0], w = N[1], T = N[2], M = N[3], D = _[0], j = _[1], B = _[2], x = _[3], U = _[4], $ = _[5], F = _[6], V = _[7], W = R[0], z = R[1], k = R[2], Z = R[3];
      for (let b = 0; b < 20; b += 2)
        S = S + D | 0, W = (0, o.rotl)(W ^ S, 16), U = U + W | 0, D = (0, o.rotl)(D ^ U, 12), S = S + D | 0, W = (0, o.rotl)(W ^ S, 8), U = U + W | 0, D = (0, o.rotl)(D ^ U, 7), w = w + j | 0, z = (0, o.rotl)(z ^ w, 16), $ = $ + z | 0, j = (0, o.rotl)(j ^ $, 12), w = w + j | 0, z = (0, o.rotl)(z ^ w, 8), $ = $ + z | 0, j = (0, o.rotl)(j ^ $, 7), T = T + B | 0, k = (0, o.rotl)(k ^ T, 16), F = F + k | 0, B = (0, o.rotl)(B ^ F, 12), T = T + B | 0, k = (0, o.rotl)(k ^ T, 8), F = F + k | 0, B = (0, o.rotl)(B ^ F, 7), M = M + x | 0, Z = (0, o.rotl)(Z ^ M, 16), V = V + Z | 0, x = (0, o.rotl)(x ^ V, 12), M = M + x | 0, Z = (0, o.rotl)(Z ^ M, 8), V = V + Z | 0, x = (0, o.rotl)(x ^ V, 7), S = S + j | 0, Z = (0, o.rotl)(Z ^ S, 16), F = F + Z | 0, j = (0, o.rotl)(j ^ F, 12), S = S + j | 0, Z = (0, o.rotl)(Z ^ S, 8), F = F + Z | 0, j = (0, o.rotl)(j ^ F, 7), w = w + B | 0, W = (0, o.rotl)(W ^ w, 16), V = V + W | 0, B = (0, o.rotl)(B ^ V, 12), w = w + B | 0, W = (0, o.rotl)(W ^ w, 8), V = V + W | 0, B = (0, o.rotl)(B ^ V, 7), T = T + x | 0, z = (0, o.rotl)(z ^ T, 16), U = U + z | 0, x = (0, o.rotl)(x ^ U, 12), T = T + x | 0, z = (0, o.rotl)(z ^ T, 8), U = U + z | 0, x = (0, o.rotl)(x ^ U, 7), M = M + D | 0, k = (0, o.rotl)(k ^ M, 16), $ = $ + k | 0, D = (0, o.rotl)(D ^ $, 12), M = M + D | 0, k = (0, o.rotl)(k ^ M, 8), $ = $ + k | 0, D = (0, o.rotl)(D ^ $, 7);
      let d = 0;
      m[d++] = S, m[d++] = w, m[d++] = T, m[d++] = M, m[d++] = W, m[d++] = z, m[d++] = k, m[d++] = Z;
    }
    e.chacha20orig = (0, o.createCipher)(v, {
      counterRight: !1,
      counterLength: 8,
      allowShortKeys: !0
    }), e.chacha20 = (0, o.createCipher)(v, {
      counterRight: !1,
      counterLength: 4,
      allowShortKeys: !1
    }), e.xchacha20 = (0, o.createCipher)(v, {
      counterRight: !1,
      counterLength: 8,
      extendNonceFn: r,
      allowShortKeys: !1
    }), e.chacha8 = (0, o.createCipher)(v, {
      counterRight: !1,
      counterLength: 4,
      rounds: 8
    }), e.chacha12 = (0, o.createCipher)(v, {
      counterRight: !1,
      counterLength: 4,
      rounds: 12
    });
    const c = /* @__PURE__ */ new Uint8Array(16), p = (N, _) => {
      N.update(_);
      const R = _.length % 16;
      R && N.update(c.subarray(R));
    }, A = /* @__PURE__ */ new Uint8Array(32);
    function K(N, _, R, m, S) {
      const w = N(_, R, A), T = f.poly1305.create(w);
      S && p(T, S), p(T, m);
      const M = (0, h.u64Lengths)(m.length, S ? S.length : 0, !0);
      T.update(M);
      const D = T.digest();
      return (0, h.clean)(w, M), D;
    }
    const H = (N) => (_, R, m) => ({
      encrypt(w, T) {
        const M = w.length;
        T = (0, h.getOutput)(M + 16, T, !1), T.set(w);
        const D = T.subarray(0, -16);
        N(_, R, D, D, 1);
        const j = K(N, _, R, D, m);
        return T.set(j, M), (0, h.clean)(j), T;
      },
      decrypt(w, T) {
        T = (0, h.getOutput)(w.length - 16, T, !1);
        const M = w.subarray(0, -16), D = w.subarray(-16), j = K(N, _, R, M, m);
        if (!(0, h.equalBytes)(D, j))
          throw new Error("invalid tag");
        return T.set(w.subarray(0, -16)), N(_, R, T, T, 1), (0, h.clean)(j), T;
      }
    });
    e._poly1305_aead = H, e.chacha20poly1305 = (0, h.wrapCipher)({ blockSize: 64, nonceLength: 12, tagLength: 16 }, (0, e._poly1305_aead)(e.chacha20)), e.xchacha20poly1305 = (0, h.wrapCipher)({ blockSize: 64, nonceLength: 24, tagLength: 16 }, (0, e._poly1305_aead)(e.xchacha20));
  })(Gt)), Gt;
}
var Kr;
function Ko() {
  if (Kr) return je;
  Kr = 1, Object.defineProperty(je, "__esModule", { value: !0 }), je.chacha20 = je.xchacha20 = void 0;
  var e = /* @__PURE__ */ No(), o = function(h, v, r) {
    return (0, e.xchacha20poly1305)(h, v, r);
  };
  je.xchacha20 = o;
  var f = function(h, v, r) {
    return (0, e.chacha20poly1305)(h, v, r);
  };
  return je.chacha20 = f, je;
}
var qr;
function qo() {
  return qr || (qr = 1, (function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.aesDecrypt = e.aesEncrypt = e.symDecrypt = e.symEncrypt = void 0;
    var o = Po(), f = Ko(), h = /* @__PURE__ */ Te(), v = /* @__PURE__ */ Ks(), r = it(), c = Dn(), p = function(_, R, m) {
      return K(H, _, R, m);
    };
    e.symEncrypt = p;
    var A = function(_, R, m) {
      return K(N, _, R, m);
    };
    e.symDecrypt = A, e.aesEncrypt = e.symEncrypt, e.aesDecrypt = e.symDecrypt;
    function K(_, R, m, S) {
      var w = (0, r.symmetricAlgorithm)();
      if (w === "aes-256-gcm")
        return _(o.aes256gcm, R, m, (0, r.symmetricNonceLength)(), c.AEAD_TAG_LENGTH, S);
      if (w === "xchacha20")
        return _(f.xchacha20, R, m, c.XCHACHA20_NONCE_LENGTH, c.AEAD_TAG_LENGTH, S);
      if (w === "aes-256-cbc")
        return _(o.aes256cbc, R, m, 16, 0);
      throw new Error("Not implemented");
    }
    function H(_, R, m, S, w, T) {
      var M = (0, v.randomBytes)(S), D = _(R, M, T), j = D.encrypt(m);
      if (w === 0)
        return (0, h.concatBytes)(M, j);
      var B = j.length - w, x = j.subarray(0, B), U = j.subarray(B);
      return (0, h.concatBytes)(M, U, x);
    }
    function N(_, R, m, S, w, T) {
      var M = m.subarray(0, S), D = _(R, Uint8Array.from(M), T), j = m.subarray(S);
      if (w === 0)
        return D.decrypt(j);
      var B = j.subarray(0, w), x = j.subarray(w);
      return D.decrypt((0, h.concatBytes)(x, B));
    }
  })(Mt)), Mt;
}
var Dr;
function kn() {
  return Dr || (Dr = 1, (function(e) {
    var o = ke && ke.__createBinding || (Object.create ? (function(h, v, r, c) {
      c === void 0 && (c = r);
      var p = Object.getOwnPropertyDescriptor(v, r);
      (!p || ("get" in p ? !v.__esModule : p.writable || p.configurable)) && (p = { enumerable: !0, get: function() {
        return v[r];
      } }), Object.defineProperty(h, c, p);
    }) : (function(h, v, r, c) {
      c === void 0 && (c = r), h[c] = v[r];
    })), f = ke && ke.__exportStar || function(h, v) {
      for (var r in h) r !== "default" && !Object.prototype.hasOwnProperty.call(v, r) && o(v, h, r);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), f(Ro(), e), f(Oo(), e), f(Vs(), e), f(qo(), e);
  })(ke)), ke;
}
var nt = {}, Ur;
function ks() {
  if (Ur) return nt;
  Ur = 1, Object.defineProperty(nt, "__esModule", { value: !0 }), nt.PublicKey = void 0;
  var e = /* @__PURE__ */ Te(), o = kn(), f = (
    /** @class */
    (function() {
      function h(v, r) {
        var c = (0, o.convertPublicKeyFormat)(v, !0, r), p = (0, o.convertPublicKeyFormat)(v, !1, r);
        this.data = c, this.dataUncompressed = c.length !== p.length ? p : null;
      }
      return h.fromHex = function(v, r) {
        return new h((0, o.hexToPublicKey)(v, r), r);
      }, Object.defineProperty(h.prototype, "_uncompressed", {
        get: function() {
          return this.dataUncompressed !== null ? this.dataUncompressed : this.data;
        },
        enumerable: !1,
        configurable: !0
      }), Object.defineProperty(h.prototype, "uncompressed", {
        /** @deprecated - use `PublicKey.toBytes(false)` instead. You may also need `Buffer.from`. */
        get: function() {
          return Buffer.from(this._uncompressed);
        },
        enumerable: !1,
        configurable: !0
      }), Object.defineProperty(h.prototype, "compressed", {
        /** @deprecated - use `PublicKey.toBytes()` instead. You may also need `Buffer.from`. */
        get: function() {
          return Buffer.from(this.data);
        },
        enumerable: !1,
        configurable: !0
      }), h.prototype.toBytes = function(v) {
        return v === void 0 && (v = !0), v ? this.data : this._uncompressed;
      }, h.prototype.toHex = function(v) {
        return v === void 0 && (v = !0), (0, e.bytesToHex)(this.toBytes(v));
      }, h.prototype.decapsulate = function(v, r) {
        r === void 0 && (r = !1);
        var c = this.toBytes(r), p = v.multiply(this, r);
        return (0, o.getSharedKey)(c, p);
      }, h.prototype.equals = function(v) {
        return (0, e.equalBytes)(this.data, v.data);
      }, h;
    })()
  );
  return nt.PublicKey = f, nt;
}
var Vr;
function Do() {
  if (Vr) return $e;
  Vr = 1, Object.defineProperty($e, "__esModule", { value: !0 }), $e.PrivateKey = void 0;
  var e = /* @__PURE__ */ Te(), o = kn(), f = ks(), h = (
    /** @class */
    (function() {
      function v(r, c) {
        if (this.curve = c, r === void 0)
          this.data = (0, o.getValidSecret)(c);
        else if ((0, o.isValidPrivateKey)(r, c))
          this.data = r;
        else
          throw new Error("Invalid private key");
        this.publicKey = new f.PublicKey((0, o.getPublicKey)(this.data, c), c);
      }
      return v.fromHex = function(r, c) {
        return new v((0, o.decodeHex)(r), c);
      }, Object.defineProperty(v.prototype, "secret", {
        /** @description From version 0.5.0, `Uint8Array` will be returned instead of `Buffer`. */
        get: function() {
          return Buffer.from(this.data);
        },
        enumerable: !1,
        configurable: !0
      }), v.prototype.toHex = function() {
        return (0, e.bytesToHex)(this.data);
      }, v.prototype.encapsulate = function(r, c) {
        c === void 0 && (c = !1);
        var p = this.publicKey.toBytes(c), A = this.multiply(r, c);
        return (0, o.getSharedKey)(p, A);
      }, v.prototype.multiply = function(r, c) {
        return c === void 0 && (c = !1), (0, o.getSharedPoint)(this.data, r.toBytes(!0), c, this.curve);
      }, v.prototype.equals = function(r) {
        return (0, e.equalBytes)(this.data, r.data);
      }, v;
    })()
  );
  return $e.PrivateKey = h, $e;
}
var kr;
function Fr() {
  return kr || (kr = 1, (function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.PublicKey = e.PrivateKey = void 0;
    var o = Do();
    Object.defineProperty(e, "PrivateKey", { enumerable: !0, get: function() {
      return o.PrivateKey;
    } });
    var f = ks();
    Object.defineProperty(e, "PublicKey", { enumerable: !0, get: function() {
      return f.PublicKey;
    } });
  })(Tt)), Tt;
}
var Mr;
function Fn() {
  return Mr || (Mr = 1, (function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.utils = e.PublicKey = e.PrivateKey = e.ECIES_CONFIG = void 0, e.encrypt = r, e.decrypt = p;
    var o = /* @__PURE__ */ Te(), f = it(), h = Fr(), v = kn();
    function r(N, _) {
      return Buffer.from(c(N, _));
    }
    function c(N, _) {
      var R = (0, f.ellipticCurve)(), m = new h.PrivateKey(void 0, R), S = N instanceof Uint8Array ? new h.PublicKey(N, R) : h.PublicKey.fromHex(N, R), w = m.encapsulate(S, (0, f.isHkdfKeyCompressed)()), T = m.publicKey.toBytes((0, f.isEphemeralKeyCompressed)()), M = (0, v.symEncrypt)(w, _);
      return (0, o.concatBytes)(T, M);
    }
    function p(N, _) {
      return Buffer.from(A(N, _));
    }
    function A(N, _) {
      var R = (0, f.ellipticCurve)(), m = N instanceof Uint8Array ? new h.PrivateKey(N, R) : h.PrivateKey.fromHex(N, R), S = (0, f.ephemeralKeySize)(), w = new h.PublicKey(_.subarray(0, S), R), T = _.subarray(S), M = w.decapsulate(m, (0, f.isHkdfKeyCompressed)());
      return (0, v.symDecrypt)(M, T);
    }
    var K = it();
    Object.defineProperty(e, "ECIES_CONFIG", { enumerable: !0, get: function() {
      return K.ECIES_CONFIG;
    } });
    var H = Fr();
    Object.defineProperty(e, "PrivateKey", { enumerable: !0, get: function() {
      return H.PrivateKey;
    } }), Object.defineProperty(e, "PublicKey", { enumerable: !0, get: function() {
      return H.PublicKey;
    } }), e.utils = {
      // TODO: remove these after 0.5.0
      aesEncrypt: v.aesEncrypt,
      aesDecrypt: v.aesDecrypt,
      symEncrypt: v.symEncrypt,
      symDecrypt: v.symDecrypt,
      decodeHex: v.decodeHex,
      getValidSecret: v.getValidSecret,
      remove0x: v.remove0x
    };
  })(It)), It;
}
var Yt, jr;
function Fs() {
  if (jr) return Yt;
  jr = 1;
  function e(o, f = 7) {
    return o && o.length > 0 ? o.slice(0, f) + "…" : "";
  }
  return Yt = e, Yt;
}
var Zt, Gr;
function Ze() {
  if (Gr) return Zt;
  Gr = 1;
  const e = Fs();
  class o {
    constructor(h = {}) {
      this.filepath = h.filepath, this.envFilepath = h.envFilepath, this.key = h.key, this.privateKey = h.privateKey, this.privateKeyName = h.privateKeyName, this.command = h.command, this.message = h.message;
    }
    missingEnvFile() {
      const h = "MISSING_ENV_FILE", v = `[${h}] missing ${this.envFilepath} file (${this.filepath})`, r = `[${h}] https://github.com/dotenvx/dotenvx/issues/484`, c = new Error(v);
      return c.code = h, c.help = r, c;
    }
    missingKey() {
      const h = "MISSING_KEY", v = `[${h}] missing ${this.key} key`, r = new Error(v);
      return r.code = h, r;
    }
    missingPrivateKey() {
      const h = "MISSING_PRIVATE_KEY", v = `[${h}] could not decrypt ${this.key} using private key '${this.privateKeyName}=${e(this.privateKey)}'`, r = `[${h}] https://github.com/dotenvx/dotenvx/issues/464`, c = new Error(v);
      return c.code = h, c.help = r, c;
    }
    invalidPrivateKey() {
      const h = "INVALID_PRIVATE_KEY", v = `[${h}] could not decrypt ${this.key} using private key '${this.privateKeyName}=${e(this.privateKey)}'`, r = `[${h}] https://github.com/dotenvx/dotenvx/issues/465`, c = new Error(v);
      return c.code = h, c.help = r, c;
    }
    looksWrongPrivateKey() {
      const h = "WRONG_PRIVATE_KEY", v = `[${h}] could not decrypt ${this.key} using private key '${this.privateKeyName}=${e(this.privateKey)}'`, r = `[${h}] https://github.com/dotenvx/dotenvx/issues/466`, c = new Error(v);
      return c.code = h, c.help = r, c;
    }
    malformedEncryptedData() {
      const h = "MALFORMED_ENCRYPTED_DATA", v = `[${h}] could not decrypt ${this.key} because encrypted data appears malformed`, r = `[${h}] https://github.com/dotenvx/dotenvx/issues/467`, c = new Error(v);
      return c.code = h, c.help = r, c;
    }
    decryptionFailed() {
      const h = "DECRYPTION_FAILED", v = this.message, r = new Error(v);
      return r.code = h, r;
    }
    commandSubstitutionFailed() {
      const h = "COMMAND_SUBSTITUTION_FAILED", v = `[${h}] could not eval ${this.key} containing command '${this.command}': ${this.message}`, r = `[${h}] https://github.com/dotenvx/dotenvx/issues/532`, c = new Error(v);
      return c.code = h, c.help = r, c;
    }
    dangerousDependencyHoist() {
      const h = "DANGEROUS_DEPENDENCY_HOIST", v = `[${h}] your environment has hoisted an incompatible version of a dotenvx dependency: ${this.message}`, r = `[${h}] https://github.com/dotenvx/dotenvx/issues/622`, c = new Error(v);
      return c.code = h, c.help = r, c;
    }
  }
  return Zt = o, Zt;
}
var Xt, Yr;
function Ms() {
  if (Yr) return Xt;
  Yr = 1;
  const { decrypt: e } = Fn(), o = Ze(), f = "encrypted:";
  function h(v, r, c, p) {
    let A, K;
    if (!r.startsWith(f))
      return r;
    if (p = p || "", p.length <= 0)
      K = new o({ key: v, privateKeyName: c, privateKey: p }).missingPrivateKey();
    else {
      const H = p.split(",");
      for (const N of H) {
        const _ = Buffer.from(N, "hex"), R = r.substring(f.length), m = Buffer.from(R, "base64");
        try {
          A = e(_, m).toString(), K = null;
          break;
        } catch (S) {
          S.message === "Invalid private key" ? K = new o({ key: v, privateKeyName: c, privateKey: p }).invalidPrivateKey() : S.message === "Unsupported state or unable to authenticate data" ? K = new o({ key: v, privateKeyName: c, privateKey: p }).looksWrongPrivateKey() : S.message === "Point of length 65 was invalid. Expected 33 compressed bytes or 65 uncompressed bytes" ? K = new o({ key: v, privateKeyName: c, privateKey: p }).malformedEncryptedData() : K = new o({ key: v, privateKeyName: c, privateKey: p, message: S.message }).decryptionFailed();
        }
      }
    }
    if (K)
      throw K;
    return A;
  }
  return Xt = h, Xt;
}
var Wt, Zr;
function Uo() {
  if (Zr) return Wt;
  Zr = 1;
  function e(o) {
    return o.replace(/[\r\n]+$/, "");
  }
  return Wt = e, Wt;
}
var zt, Xr;
function Vo() {
  if (Xr) return zt;
  Xr = 1;
  const { execSync: e } = ct, o = Uo(), f = Ze();
  function h(v, r, c, p) {
    return (r.match(/\$\(([^)]+(?:\)[^(]*)*)\)/g) || []).reduce((K, H) => {
      const N = H.slice(2, -1);
      let _;
      try {
        _ = e(N, { env: { ...c, ...p } }).toString();
      } catch (R) {
        throw new f({ key: v, command: N, message: R.message.trim() }).commandSubstitutionFailed();
      }
      return _ = o(_), K.replace(H, _);
    }, r);
  }
  return zt = h, zt;
}
var $t, Wr;
function ko() {
  if (Wr) return $t;
  Wr = 1;
  function e(o) {
    return o.replace(/\\\$/g, "$");
  }
  return $t = e, $t;
}
var Qt, zr;
function js() {
  if (zr) return Qt;
  zr = 1;
  const e = Ms(), o = Vo(), f = ko();
  class h {
    static LINE = /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg;
    constructor(r, c = null, p = process.env, A = !1, K = null) {
      this.src = r, this.privateKey = c, this.privateKeyName = K, this.processEnv = p, this.overload = A, this.parsed = {}, this.preExisted = {}, this.injected = {}, this.errors = [], this.runningParsed = {}, this.literals = {};
    }
    run() {
      const r = this.getLines();
      let c;
      for (; (c = h.LINE.exec(r)) !== null; ) {
        const p = c[1], A = c[2], K = this.quote(A);
        this.parsed[p] = this.clean(A, K), !this.overload && this.inProcessEnv(p) && (this.parsed[p] = this.processEnv[p]);
        try {
          this.parsed[p] = this.decrypt(p, this.parsed[p]);
        } catch (N) {
          this.errors.push(N);
        }
        let H = !1;
        if (K !== "'" && (!this.inProcessEnv(p) || this.processEnv[p] === this.parsed[p])) {
          const N = this.parsed[p];
          try {
            this.parsed[p] = this.eval(p, N);
          } catch (_) {
            this.errors.push(_);
          }
          N !== this.parsed[p] && (H = !0);
        }
        !H && K !== "'" && (!this.processEnv[p] || this.overload) && (this.parsed[p] = f(this.expand(this.parsed[p]))), K === "'" && (this.literals[p] = this.parsed[p]), this.runningParsed[p] = this.parsed[p], Object.prototype.hasOwnProperty.call(this.processEnv, p) && !this.overload ? this.preExisted[p] = this.processEnv[p] : this.injected[p] = this.parsed[p];
      }
      return {
        parsed: this.parsed,
        processEnv: this.processEnv,
        injected: this.injected,
        preExisted: this.preExisted,
        errors: this.errors
      };
    }
    trimmer(r) {
      return (r || "").trim();
    }
    quote(r) {
      const p = this.trimmer(r)[0];
      let A = "";
      switch (p) {
        // single
        case "'":
          A = "'";
          break;
        // double
        case '"':
          A = '"';
          break;
        // backtick
        case "`":
          A = "`";
          break;
        // empty
        default:
          A = "";
      }
      return A;
    }
    clean(r, c) {
      let p = this.trimmer(r);
      return p = p.replace(/^(['"`])([\s\S]*)\1$/mg, "$2"), c === '"' && (p = p.replace(/\\n/g, `
`), p = p.replace(/\\r/g, "\r"), p = p.replace(/\\t/g, "	")), p;
    }
    decrypt(r, c) {
      return e(r, c, this.privateKeyName, this.privateKey);
    }
    eval(r, c) {
      return o(r, c, this.processEnv, this.runningParsed);
    }
    expand(r) {
      let c = { ...this.runningParsed, ...this.processEnv };
      this.overload && (c = { ...this.processEnv, ...this.runningParsed });
      const p = /(?<!\\)\${([^{}]+)}|(?<!\\)\$([A-Za-z_][A-Za-z0-9_]*)/g;
      let A = r, K;
      for (; (K = p.exec(A)) !== null; ) {
        const [H, N, _] = K, R = N || _, m = /(:\+|\+|:-|-)/, S = R.match(m), w = S ? S[0] : null, T = R.split(w);
        let M, D;
        const j = T.shift();
        if ([":+", "+"].includes(w) ? (M = c[j] ? T.join(w) : "", D = null) : (M = T.join(w), D = c[j]), D ? A = A.replace(H, D) : A = A.replace(H, M), A === c[j] || this.literals[j] && /\$\{[^}]+\}|\$[A-Za-z_][A-Za-z0-9_]*/.test(this.literals[j]))
          break;
        p.lastIndex = 0;
      }
      return A;
    }
    inProcessEnv(r) {
      return Object.prototype.hasOwnProperty.call(this.processEnv, r);
    }
    getLines() {
      return (this.src || "").toString().replace(/\r\n?/mg, `
`);
    }
  }
  return Qt = h, Qt;
}
var Jt, $r;
function Xe() {
  if ($r) return Jt;
  $r = 1;
  const e = /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg;
  function o(f, h = !1, v = !1, r = !1) {
    const c = {};
    let p = f.toString();
    v || (p = p.replace(/\r\n?/mg, `
`));
    let A;
    for (; (A = e.exec(p)) != null; ) {
      const K = A[1];
      let H = A[2] || "";
      H = H.trim();
      const N = H[0];
      H = H.replace(/^(['"`])([\s\S]*)\1$/mg, "$2"), N === '"' && !h && (H = H.replace(/\\n/g, `
`), H = H.replace(/\\r/g, "\r"), H = H.replace(/\\t/g, "	")), r ? (c[K] = c[K] || [], c[K].push(H)) : c[K] = H;
    }
    return c;
  }
  return Jt = o, Jt;
}
var en, Qr;
function Fo() {
  if (Qr) return en;
  Qr = 1;
  function e(o) {
    let f;
    try {
      f = new URL(o);
    } catch (v) {
      throw new Error(`INVALID_DOTENV_KEY: ${v.message}`);
    }
    const h = f.searchParams.get("environment");
    if (!h)
      throw new Error("INVALID_DOTENV_KEY: Missing environment part");
    return h;
  }
  return en = e, en;
}
var tn, Jr;
function Gs() {
  if (Jr) return tn;
  Jr = 1;
  const e = qn;
  function o(f) {
    const h = e.readFileSync(f);
    return h.length >= 2 && h[0] === 255 && h[1] === 254 ? "utf16le" : (h.length >= 3 && h[0] === 239 && h[1] === 187 && h[2] === 191, "utf8");
  }
  return tn = o, tn;
}
var nn, es;
function Ys() {
  if (es) return nn;
  es = 1;
  const e = Oe;
  function o(f) {
    const h = e.basename(f), r = [...h.split(".").slice(2)];
    return r.length === 0 ? h.replace(".env", "development") : r.length === 1 ? r[0] : r.length === 2 ? r.join("_") : r.slice(0, 2).join("_");
  }
  return nn = o, nn;
}
var rn, ts;
function We() {
  if (ts) return rn;
  ts = 1;
  const e = Oe, o = Ys();
  function f(h) {
    const v = e.basename(h).toLowerCase();
    return v === ".env" ? "DOTENV_PRIVATE_KEY" : `DOTENV_PRIVATE_KEY_${o(v).toUpperCase()}`;
  }
  return rn = f, rn;
}
var sn, ns;
function rt() {
  if (ns) return sn;
  ns = 1;
  const e = Oe, o = Ys();
  function f(h) {
    const v = e.basename(h).toLowerCase();
    return v === ".env" ? "DOTENV_PUBLIC_KEY" : `DOTENV_PUBLIC_KEY_${o(v).toUpperCase()}`;
  }
  return sn = f, sn;
}
var on, rs;
function Zs() {
  if (rs) return on;
  rs = 1;
  const e = Oe, o = ct, f = We(), h = rt();
  class v {
    constructor(c) {
      this.envFilepath = c;
    }
    run() {
      let c = {};
      try {
        const p = e.resolve(process.cwd(), "node_modules/.bin/dotenvx-pro"), A = o.execSync(`${p} keypair -f ${this.envFilepath}`, { stdio: ["pipe", "pipe", "ignore"] }).toString().trim();
        c = JSON.parse(A);
      } catch {
        try {
          const A = o.execSync(`dotenvx-pro keypair -f ${this.envFilepath}`, { stdio: ["pipe", "pipe", "ignore"] }).toString().trim();
          c = JSON.parse(A);
        } catch {
          const K = f(this.envFilepath), H = h(this.envFilepath);
          c[K] = null, c[H] = null;
        }
      }
      return c;
    }
  }
  return on = v, on;
}
var cn, ss;
function Mo() {
  if (ss) return cn;
  ss = 1;
  const e = Ue(), o = Xe(), f = rt();
  function h(c) {
    if (process.env[c] && process.env[c].length > 0)
      return process.env[c];
  }
  function v(c, p) {
    if (e.existsSync(p)) {
      const A = e.readFileX(p), K = o(A);
      if (K[c] && K[c].length > 0)
        return K[c];
    }
  }
  function r(c) {
    let p = null;
    const A = f(c);
    return p = h(A), p || (p = v(A, c), p) ? p : null;
  }
  return cn = r, cn;
}
var an, os;
function jo() {
  if (os) return an;
  os = 1;
  const e = Ue(), o = Oe, f = "DOTENV_PUBLIC_KEY", h = "DOTENV_PRIVATE_KEY", v = Xe(), r = We();
  function c(H) {
    if (process.env[H] && process.env[H].length > 0)
      return process.env[H];
  }
  function p(H, N, _ = null) {
    let R = o.resolve(o.dirname(N), ".env.keys");
    if (_ && (R = o.resolve(_)), e.existsSync(R)) {
      const m = e.readFileX(R), S = v(m);
      if (S[H] && S[H].length > 0)
        return S[H];
    }
  }
  function A(H) {
    if (!e.existsSync(H))
      return null;
    const N = e.readFileX(H), _ = v(N);
    let R;
    for (const m of Object.keys(_))
      (m === f || m.startsWith(f)) && (R = m);
    return R ? R.replace(f, h) : null;
  }
  function K(H, N = null) {
    let _ = null, R = r(H);
    return _ = c(R), _ || (_ = p(R, H, N), _) || (R = A(H), R && (_ = c(R), _ || (_ = p(R, H, N), _))) ? _ : null;
  }
  return an = K, an;
}
var un, is;
function Mn() {
  if (is) return un;
  is = 1;
  const e = rt(), o = Mo(), f = We(), h = jo();
  class v {
    constructor(c = ".env", p = null) {
      this.envFile = c, this.envKeysFilepath = p;
    }
    run() {
      const c = {}, p = this._envFilepaths();
      for (const A of p) {
        const K = e(A), H = o(A);
        c[K] = H;
        const N = f(A), _ = h(A, this.envKeysFilepath);
        c[N] = _;
      }
      return c;
    }
    _envFilepaths() {
      return Array.isArray(this.envFile) ? this.envFile : [this.envFile];
    }
  }
  return un = v, un;
}
var ln, cs;
function Xs() {
  if (cs) return ln;
  cs = 1;
  const e = We(), o = Zs(), f = Mn();
  function h(v, r = null, c = !0) {
    const p = e(v);
    let A = {};
    c && (A = new o(v).run());
    const K = new f(v, r).run();
    return A[p] || K[p];
  }
  return ln = { findPrivateKey: h }, ln;
}
var fn, as;
function Go() {
  if (as) return fn;
  as = 1;
  const e = "DOTENV_PRIVATE_KEY";
  function o(f) {
    return Object.keys(f).filter((h) => h.startsWith(e));
  }
  return fn = o, fn;
}
var dn, us;
function Yo() {
  if (us) return dn;
  us = 1;
  const e = "DOTENV_PRIVATE_KEY";
  function o(f) {
    return f === e ? ".env" : `.env.${f.substring(`${e}_`.length).split("_").join(".").toLowerCase()}`;
  }
  return dn = o, dn;
}
var hn, ls;
function Ws() {
  if (ls) return hn;
  ls = 1;
  const e = Go(), o = Yo(), f = "envFile", h = "envVaultFile", v = [{ type: f, value: ".env" }], r = [{ type: h, value: ".env.vault" }];
  function c(A) {
    const K = [];
    for (const H of A) {
      const N = o(H);
      K.push({ type: f, value: N });
    }
    return K;
  }
  function p(A = [], K, H = "") {
    const N = e(K);
    if (!A || A.length <= 0)
      return N.length > 0 ? c(N) : H.length > 0 ? r : v;
    {
      let _ = !1;
      for (const R of A)
        H.length > 0 && R.type === h && (_ = !0), H.length <= 0 && R.type === f && (_ = !0);
      return _ ? A : H.length > 0 ? [...r, ...A] : [...v, ...A];
    }
  }
  return hn = p, hn;
}
var yn, fs;
function zs() {
  if (fs) return yn;
  fs = 1;
  const e = Ue(), o = Oe, f = "env", h = "envFile", v = "envVaultFile", r = vo(), c = js(), p = Ze(), A = Xe(), K = Fo(), H = Gs(), { findPrivateKey: N } = Xs(), _ = We(), R = Ws();
  class m {
    constructor(w = [], T = !1, M = "", D = process.env, j = null, B = !0) {
      this.envs = R(w, D, M), this.overload = T, this.DOTENV_KEY = M, this.processEnv = D, this.envKeysFilepath = j, this.opsOn = B, this.processedEnvs = [], this.readableFilepaths = /* @__PURE__ */ new Set(), this.readableStrings = /* @__PURE__ */ new Set(), this.uniqueInjectedKeys = /* @__PURE__ */ new Set(), this.beforeEnv = { ...this.processEnv };
    }
    run() {
      for (const w of this.envs)
        w.type === v ? this._injectEnvVaultFile(w.value) : w.type === h ? this._injectEnvFile(w.value) : w.type === f && this._injectEnv(w.value);
      return {
        processedEnvs: this.processedEnvs,
        readableStrings: [...this.readableStrings],
        readableFilepaths: [...this.readableFilepaths],
        uniqueInjectedKeys: [...this.uniqueInjectedKeys],
        beforeEnv: this.beforeEnv,
        afterEnv: { ...this.processEnv }
      };
    }
    _injectEnv(w) {
      const T = {};
      T.type = f, T.string = w;
      try {
        const { parsed: M, errors: D, injected: j, preExisted: B } = new c(w, null, this.processEnv, this.overload).run();
        T.parsed = M, T.errors = D, T.injected = j, T.preExisted = B, this.inject(T.parsed), this.readableStrings.add(w);
        for (const x of Object.keys(j))
          this.uniqueInjectedKeys.add(x);
      } catch (M) {
        T.errors = [M];
      }
      this.processedEnvs.push(T);
    }
    _injectEnvFile(w) {
      const T = {};
      T.type = h, T.filepath = w;
      const M = o.resolve(w);
      try {
        const D = H(M), j = e.readFileX(M, { encoding: D });
        this.readableFilepaths.add(w);
        const B = N(w, this.envKeysFilepath, this.opsOn), x = _(w), { parsed: U, errors: $, injected: F, preExisted: V } = new c(j, B, this.processEnv, this.overload, x).run();
        T.privateKeyName = x, T.privateKey = B, T.src = j, T.parsed = U, T.errors = $, T.injected = F, T.preExisted = V, this.inject(T.parsed);
        for (const W of Object.keys(F))
          this.uniqueInjectedKeys.add(W);
      } catch (D) {
        D.code === "ENOENT" || D.code === "EISDIR" ? T.errors = [new p({ envFilepath: w, filepath: M }).missingEnvFile()] : T.errors = [D];
      }
      this.processedEnvs.push(T);
    }
    _injectEnvVaultFile(w) {
      const T = {};
      T.type = v, T.filepath = w;
      const M = o.resolve(w);
      if (this.readableFilepaths.add(w), !e.existsSync(M)) {
        const x = "MISSING_ENV_VAULT_FILE", U = `you set DOTENV_KEY but your .env.vault file is missing: ${M}`, $ = new Error(U);
        throw $.code = x, $;
      }
      if (this.DOTENV_KEY.length < 1) {
        const x = "MISSING_DOTENV_KEY", U = `your DOTENV_KEY appears to be blank: '${this.DOTENV_KEY}'`, $ = new Error(U);
        throw $.code = x, $;
      }
      let D;
      const j = this._dotenvKeys(), B = this._parsedVault(M);
      for (let x = 0; x < j.length; x++)
        try {
          const U = j[x].trim();
          D = this._decrypted(U, B);
          break;
        } catch (U) {
          if (x + 1 >= j.length)
            throw U;
        }
      try {
        const { parsed: x, errors: U, injected: $, preExisted: F } = new c(D, null, this.processEnv, this.overload).run();
        T.parsed = x, T.errors = U, T.injected = $, T.preExisted = F, this.inject(T.parsed);
        for (const V of Object.keys($))
          this.uniqueInjectedKeys.add(V);
      } catch (x) {
        T.errors = [x];
      }
      this.processedEnvs.push(T);
    }
    inject(w) {
      for (const T of Object.keys(w))
        this.processEnv[T] = w[T];
    }
    // handle scenario for comma separated keys - for use with key rotation
    // example: DOTENV_KEY="dotenv://:key_1234@dotenvx.com/vault/.env.vault?environment=prod,dotenv://:key_7890@dotenvx.com/vault/.env.vault?environment=prod"
    _dotenvKeys() {
      return this.DOTENV_KEY.split(",");
    }
    // { "DOTENV_VAULT_DEVELOPMENT": "<ciphertext>" }
    _parsedVault(w) {
      const T = e.readFileX(w);
      return A(T);
    }
    _decrypted(w, T) {
      const D = `DOTENV_VAULT_${K(w).toUpperCase()}`, j = T[D];
      if (!j) {
        const B = new Error(`NOT_FOUND_DOTENV_ENVIRONMENT: cannot locate environment ${D} in your .env.vault file`);
        throw B.code = "NOT_FOUND_DOTENV_ENVIRONMENT", B;
      }
      return r(j, w);
    }
  }
  return yn = m, yn;
}
var pn, ds;
function Zo() {
  if (ds) return pn;
  ds = 1;
  const { encrypt: e } = Fn(), o = "encrypted:";
  function f(h, v) {
    const r = e(v, Buffer.from(h)), c = Buffer.from(r, "hex").toString("base64");
    return `${o}${c}`;
  }
  return pn = f, pn;
}
var gn, hs;
function Xo() {
  if (hs) return gn;
  hs = 1;
  const e = /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg;
  function o(f) {
    const h = {};
    let v = f.toString();
    v = v.replace(/\r\n?/mg, `
`);
    let r;
    for (; (r = e.exec(v)) != null; ) {
      const c = r[1];
      let p = r[2] || "";
      p = p.trim();
      const A = p[0];
      p = p.replace(/^(['"`])([\s\S]*)\1$/mg, "$2"), A === p[0] ? h[c] = "" : h[c] = A;
    }
    return h;
  }
  return gn = o, gn;
}
var vn, ys;
function Wo() {
  if (ys) return vn;
  ys = 1;
  function e(o) {
    return o.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
  }
  return vn = e, vn;
}
var bn, ps;
function zo() {
  if (ps) return bn;
  ps = 1;
  function e(o) {
    return o.replace(/\$/g, "$$$$");
  }
  return bn = e, bn;
}
var mn, gs;
function $s() {
  if (gs) return mn;
  gs = 1;
  const e = Xo(), o = Xe(), f = Wo(), h = zo();
  function v(r, c, p) {
    let A, K = "";
    const H = o(r, !0, !0), N = e(r);
    if (Object.prototype.hasOwnProperty.call(H, c)) {
      const _ = N[c];
      K += `${c}=${_}${p}${_}`;
      const R = H[c], m = f(R);
      let S = "";
      if (m === "") {
        S = "$";
        const M = r.match(new RegExp(`${c}\\s*=\\s*

`, "m"));
        if (_ === "" && M) {
          const D = M[0].match(/\n/g).length - 1;
          for (let j = 0; j < D; j++)
            K += `
`;
        }
      }
      const w = new RegExp(
        "^(\\s*)?(export\\s+)?" + // export
        c + // KEY
        "\\s*=\\s*[\"'`]?" + // open quote
        m + // escaped value
        "[\"'`]?" + // close quote
        S,
        "gm"
        // (g)lobal (m)ultiline
      ), T = h(K);
      A = r.replace(w, `$1$2${T}`);
    } else
      K += `${c}="${p}"`, r.endsWith(`
`) ? K = K + `
` : K = `
` + K, A = r + K;
    return A;
  }
  return mn = v, mn;
}
var En, vs;
function $o() {
  if (vs) return En;
  vs = 1;
  const e = rt(), o = Zs(), f = Mn();
  function h(v, r = !0) {
    const c = e(v);
    let p = {};
    r && (p = new o(v).run());
    const A = new f(v).run();
    return p[c] || A[c];
  }
  return En = h, En;
}
var _n, bs;
function Qo() {
  if (bs) return _n;
  bs = 1;
  const { PrivateKey: e } = Fn();
  function o(f) {
    let h;
    f ? h = new e(Buffer.from(f, "hex")) : h = new e();
    const v = h.publicKey.toHex(), r = h.secret.toString("hex");
    return {
      publicKey: v,
      privateKey: r
    };
  }
  return _n = o, _n;
}
var wn, ms;
function Jo() {
  if (ms) return wn;
  ms = 1;
  const e = /^encrypted:.+/;
  function o(f) {
    return e.test(f);
  }
  return wn = o, wn;
}
var Sn, Es;
function ei() {
  if (Es) return Sn;
  Es = 1;
  const e = Ue(), o = Oe, f = "envFile", h = Ze(), v = We(), r = rt(), c = Zo(), p = Ms(), A = $s(), K = Xe(), H = Gs(), N = Ws(), { findPrivateKey: _ } = Xs(), R = $o(), m = Qo(), S = Fs(), w = Jo();
  class T {
    constructor(D, j, B = [], x = !0, U = null) {
      this.envs = N(B, process.env), this.key = D, this.value = j, this.encrypt = x, this.envKeysFilepath = U, this.processedEnvs = [], this.changedFilepaths = /* @__PURE__ */ new Set(), this.unchangedFilepaths = /* @__PURE__ */ new Set(), this.readableFilepaths = /* @__PURE__ */ new Set();
    }
    run() {
      for (const D of this.envs)
        D.type === f && this._setEnvFile(D.value);
      return {
        processedEnvs: this.processedEnvs,
        changedFilepaths: [...this.changedFilepaths],
        unchangedFilepaths: [...this.unchangedFilepaths]
      };
    }
    _setEnvFile(D) {
      const j = {};
      j.key = this.key || null, j.value = this.value || null, j.type = f;
      const B = o.basename(D), x = o.resolve(D);
      j.filepath = x, j.envFilepath = D, j.changed = !1;
      try {
        const U = this._detectEncoding(x);
        let $ = e.readFileX(x, { encoding: U });
        const F = K($);
        j.originalValue = F[j.key] || null;
        const V = !w(j.originalValue);
        if (this.readableFilepaths.add(D), this.encrypt) {
          let k, Z;
          const d = r(D), b = v(D), l = _(D, this.envKeysFilepath), i = R(D);
          let g = o.join(o.dirname(x), ".env.keys");
          this.envKeysFilepath && (g = o.resolve(this.envKeysFilepath));
          const y = o.relative(o.dirname(x), g);
          if (l) {
            const t = m(l);
            if (k = t.publicKey, Z = t.privateKey, j.originalValue && (j.originalValue = p(j.key, j.originalValue, b, Z)), i && i !== k) {
              const s = new Error(`derived public key (${S(k)}) does not match the existing public key (${S(i)})`);
              throw s.code = "INVALID_DOTENV_PRIVATE_KEY", s.help = `debug info: ${b}=${S(l)} (derived ${d}=${S(k)} vs existing ${d}=${S(i)})`, s;
            }
            if (!i) {
              const s = this._preserveShebang($), a = s.firstLinePreserved;
              $ = s.envSrc;
              const n = this._prependPublicKey(d, k, B, y);
              $ = `${a}${n}
${$}`;
            }
          } else if (i)
            k = i;
          else {
            let t = "";
            e.existsSync(g) && (t = e.readFileX(g));
            const s = this._preserveShebang($), a = s.firstLinePreserved;
            $ = s.envSrc;
            const n = m();
            k = n.publicKey, Z = n.privateKey;
            const u = this._prependPublicKey(d, k, B, y), O = [
              "#/------------------!DOTENV_PRIVATE_KEYS!-------------------/",
              "#/ private decryption keys. DO NOT commit to source control /",
              "#/     [how it works](https://dotenvx.com/encryption)       /",
              "#/----------------------------------------------------------/"
            ].join(`
`), C = [
              `# ${B}`,
              `${b}=${Z}`,
              ""
            ].join(`
`);
            $ = `${a}${u}
${$}`, t = t.length > 1 ? t : `${O}
`, t = `${t}
${C}`, e.writeFileX(g, t), j.privateKeyAdded = !0, j.envKeysFilepath = this.envKeysFilepath || o.join(o.dirname(D), o.basename(g));
          }
          j.publicKey = k, j.privateKey = Z, j.encryptedValue = c(this.value, k), j.privateKeyName = b;
        }
        const W = V && this.encrypt, z = this.value !== j.originalValue;
        W || z ? (j.envSrc = A($, this.key, j.encryptedValue || this.value), this.changedFilepaths.add(D), j.changed = !0) : (j.envSrc = $, this.unchangedFilepaths.add(D), j.changed = !1);
      } catch (U) {
        U.code === "ENOENT" ? j.error = new h({ envFilepath: D, filepath: x }).missingEnvFile() : j.error = U;
      }
      this.processedEnvs.push(j);
    }
    _detectEncoding(D) {
      return H(D);
    }
    _prependPublicKey(D, j, B, x = ".env.keys") {
      const U = x === ".env.keys" ? "" : ` # -fk ${x}`;
      return [
        "#/-------------------[DOTENV_PUBLIC_KEY]--------------------/",
        "#/            public-key encryption for .env files          /",
        "#/       [how it works](https://dotenvx.com/encryption)     /",
        "#/----------------------------------------------------------/",
        `${D}="${j}"${U}`,
        "",
        `# ${B}`
      ].join(`
`);
    }
    _preserveShebang(D) {
      const [j, ...B] = D.split(`
`);
      let x = "";
      return j.startsWith("#!") && (x = j + `
`, D = B.join(`
`)), {
        firstLinePreserved: x,
        envSrc: D
      };
    }
  }
  return Sn = T, Sn;
}
var Bn, _s;
function ti() {
  if (_s) return Bn;
  _s = 1;
  const e = zs(), o = Ze();
  class f {
    constructor(v, r = [], c = !1, p = "", A = !1, K = null) {
      this.key = v, this.envs = r, this.overload = c, this.DOTENV_KEY = p, this.all = A, this.envKeysFilepath = K;
    }
    run() {
      const v = { ...process.env }, { processedEnvs: r } = new e(this.envs, this.overload, this.DOTENV_KEY, v, this.envKeysFilepath).run(), c = [];
      for (const p of r)
        for (const A of p.errors)
          c.push(A);
      if (this.key) {
        const p = {}, A = v[this.key];
        return p[this.key] = A, A === void 0 && c.push(new o({ key: this.key }).missingKey()), { parsed: p, errors: c };
      } else {
        if (this.all)
          return { parsed: v, errors: c };
        const p = {};
        for (const A of r)
          if (A.parsed)
            for (const K of Object.keys(A.parsed))
              p[K] = v[K];
        return { parsed: p, errors: c };
      }
    }
  }
  return Bn = f, Bn;
}
var An, ws;
function ni() {
  if (ws) return An;
  ws = 1;
  const e = Ue(), o = [".env.vault", ".env.project", ".env.keys", ".env.me", ".env.x", ".env.example"];
  function f(h) {
    try {
      return e.readdirSync(h).filter(
        (c) => c.startsWith(".env") && !c.endsWith(".previous") && !o.includes(c)
      );
    } catch (v) {
      if (v.code === "ENOENT") {
        const r = new Error(`missing directory (${h})`);
        throw r.code = "MISSING_DIRECTORY", r;
      } else
        throw v;
    }
  }
  return An = f, An;
}
var xn, Ss;
function ri() {
  if (Ss) return xn;
  Ss = 1;
  const e = Ue(), o = Oe, f = Ze(), h = ni(), v = $s(), r = Xe();
  class c {
    constructor(A = ".", K) {
      this.directory = A, this.envFile = K || h(A), this.exampleFilename = ".env.example", this.exampleFilepath = o.resolve(this.directory, this.exampleFilename);
    }
    run() {
      if (this.envFile.length < 1) {
        const m = "MISSING_ENV_FILES", S = "no .env* files found", w = '? add one with [echo "HELLO=World" > .env] and then run [dotenvx genexample]', T = new Error(S);
        throw T.code = m, T.help = w, T;
      }
      const A = /* @__PURE__ */ new Set(), K = /* @__PURE__ */ new Set(), H = this._envFilepaths(), N = {}, _ = {};
      let R = `# ${this.exampleFilename} - generated with dotenvx
`;
      for (const m of H) {
        const S = o.resolve(this.directory, m);
        if (!e.existsSync(S)) {
          const M = new f({ envFilepath: m, filepath: S }).missingEnvFile();
          throw M.help = `? add it with [echo "HELLO=World" > ${m}] and then run [dotenvx genexample]`, M;
        }
        let w = e.readFileX(S);
        const T = r(w);
        for (const M in T)
          A.add(M), w = v(w, M, "");
        R += `
${w}`;
      }
      if (e.existsSync(this.exampleFilepath)) {
        R = e.readFileX(this.exampleFilepath);
        const m = r(R);
        for (const S of [...A])
          S in m ? _[S] = m[S] : (R += `${S}=''
`, K.add(S), N[S] = "");
      } else
        for (const m of [...A])
          K.add(m), N[m] = "";
      return {
        envExampleFile: R,
        envFile: this.envFile,
        exampleFilepath: this.exampleFilepath,
        addedKeys: [...K],
        injected: N,
        preExisted: _
      };
    }
    _envFilepaths() {
      return Array.isArray(this.envFile) ? this.envFile : [this.envFile];
    }
  }
  return xn = c, xn;
}
var Rn, Bs;
function si() {
  if (Bs) return Rn;
  Bs = 1;
  const e = Oe, o = ct, { logger: f } = at();
  class h {
    constructor() {
      this.radarLib = null;
      try {
        this.radarLib = this._radarNpm(), f.warn("[DEPRECATION NOTICE] dotenvx-radar is renamed dotenv-ops. [See https://dotenvx.com/docs/ops]"), f.successv(`📡 radar: ${this.radarLib.status}`);
      } catch {
        try {
          this.radarLib = this._radarCli(), f.warn("[DEPRECATION NOTICE] dotenvx-radar is renamed dotenv-ops. [See https://dotenvx.com/docs/ops]"), f.successv(`📡 radar: ${this.radarLib.status}`);
        } catch {
        }
      }
    }
    observe(r) {
      if (this.radarLib && this.radarLib.status !== "off") {
        const c = this.encode(r);
        this.radarLib.observe(c);
      }
    }
    encode(r) {
      return Buffer.from(JSON.stringify(r)).toString("base64");
    }
    _radarNpm() {
      const r = e.resolve(process.cwd(), "node_modules/.bin/dotenvx-radar");
      return {
        status: o.execSync(`${r} status`, { stdio: ["pipe", "pipe", "ignore"] }).toString().trim(),
        observe: (p) => {
          try {
            o.spawn(r, ["observe", p], {
              stdio: "ignore",
              detached: !0
            }).unref();
          } catch {
          }
        }
      };
    }
    _radarCli() {
      return {
        status: o.execSync("dotenvx-radar status", { stdio: ["pipe", "pipe", "ignore"] }).toString().trim(),
        observe: (c) => {
          try {
            o.spawn("dotenvx-radar", ["observe", c], {
              stdio: "ignore",
              detached: !0
            }).unref();
          } catch {
          }
        }
      };
    }
  }
  return Rn = h, Rn;
}
var In, As;
function oi() {
  if (As) return In;
  As = 1;
  const e = Oe, o = ct, { logger: f } = at();
  class h {
    constructor() {
      this.opsLib = null;
      try {
        this.opsLib = this._opsNpm(), f.successv(`📡 radar: ${this.opsLib.status}`);
      } catch {
        try {
          this.opsLib = this._opsCli(), f.successv(`📡 radar: ${this.opsLib.status}`);
        } catch {
        }
      }
    }
    observe(r) {
      if (this.opsLib && this.opsLib.status !== "off") {
        const c = this.encode(r);
        this.opsLib.observe(c);
      }
    }
    encode(r) {
      return Buffer.from(JSON.stringify(r)).toString("base64");
    }
    _opsNpm() {
      const r = e.resolve(process.cwd(), "node_modules/.bin/dotenvx-ops");
      return {
        status: o.execSync(`${r} status`, { stdio: ["pipe", "pipe", "ignore"] }).toString().trim(),
        observe: (p) => {
          try {
            o.spawn(r, ["observe", p], {
              stdio: "ignore",
              detached: !0
            }).unref();
          } catch {
          }
        }
      };
    }
    _opsCli() {
      return {
        status: o.execSync("dotenvx-ops status", { stdio: ["pipe", "pipe", "ignore"] }).toString().trim(),
        observe: (c) => {
          try {
            o.spawn("dotenvx-ops", ["observe", c], {
              stdio: "ignore",
              detached: !0
            }).unref();
          } catch {
          }
        }
      };
    }
  }
  return In = h, In;
}
var On, xs;
function ii() {
  if (xs) return On;
  xs = 1;
  function e(o) {
    const f = process.env.DOTENV_ENV || process.env.NODE_ENV || "development";
    if (o === "nextjs") {
      const h = ["development", "test", "production"].includes(f) && f;
      return [
        h && { type: "envFile", value: `.env.${h}.local` },
        h !== "test" && { type: "envFile", value: ".env.local" },
        h && { type: "envFile", value: `.env.${h}` },
        { type: "envFile", value: ".env" }
      ].filter(Boolean);
    } else {
      if (o === "flow")
        return [
          { type: "envFile", value: `.env.${f}.local` },
          { type: "envFile", value: `.env.${f}` },
          { type: "envFile", value: ".env.local" },
          { type: "envFile", value: ".env" },
          { type: "envFile", value: ".env.defaults" }
        ];
      throw new Error(`INVALID_CONVENTION: '${o}'. permitted conventions: ['nextjs', 'flow']`);
    }
  }
  return On = e, On;
}
var Cn, Rs;
function ci() {
  if (Rs) return Cn;
  Rs = 1;
  const e = ro, o = Oe;
  function f(h) {
    return h[0] === "~" ? o.join(e.homedir(), h.slice(1)) : h;
  }
  return Cn = f, Cn;
}
var Tn, Is;
function ai() {
  if (Is) return Tn;
  Is = 1;
  const e = ci();
  function o(f) {
    let h = [];
    if (f && f.path)
      if (!Array.isArray(f.path))
        h = [e(f.path)];
      else {
        h = [];
        for (const v of f.path)
          h.push(e(v));
      }
    return h;
  }
  return Tn = o, Tn;
}
var Pn, Os;
function ui() {
  if (Os) return Pn;
  Os = 1;
  const { logger: e } = at();
  class o {
    constructor(h = {}) {
      this.DOTENV_KEY = h.DOTENV_KEY || process.env.DOTENV_KEY;
    }
    dotenvKey() {
      this.DOTENV_KEY && (e.warn("[DEPRECATION NOTICE] Setting DOTENV_KEY with .env.vault is deprecated."), e.warn("[DEPRECATION NOTICE] Run [dotenvx ext vault migrate] for instructions on converting your .env.vault file to encrypted .env files (using public key encryption algorithm secp256k1)"), e.warn("[DEPRECATION NOTICE] Read more at [https://github.com/dotenvx/dotenvx/blob/main/CHANGELOG.md#0380]"));
    }
  }
  return Pn = o, Pn;
}
var Ln, Cs;
function li() {
  if (Cs) return Ln;
  Cs = 1;
  const e = Oe, o = ii(), f = ai(), h = ui();
  function v(r, c = void 0) {
    const p = f(r);
    let A = [];
    r.convention && (A = o(r.convention).concat(A)), new h({ DOTENV_KEY: c }).dotenvKey();
    for (const K of p)
      c ? A.push({
        type: "envVaultFile",
        value: e.join(e.dirname(K), ".env.vault")
      }) : A.push({ type: "envFile", value: K });
    return A;
  }
  return Ln = v, Ln;
}
var Hn, Ts;
function fi() {
  if (Ts) return Hn;
  Ts = 1;
  function e(b) {
    return Array.isArray(b) ? b : [b];
  }
  const o = "", f = " ", h = "\\", v = /^\s+$/, r = /(?:[^\\]|^)\\$/, c = /^\\!/, p = /^\\#/, A = /\r?\n/g, K = /^\.*\/|^\.+$/, H = "/";
  let N = "node-ignore";
  typeof Symbol < "u" && (N = Symbol.for("node-ignore"));
  const _ = N, R = (b, l, i) => Object.defineProperty(b, l, { value: i }), m = /([0-z])-([0-z])/g, S = () => !1, w = (b) => b.replace(
    m,
    (l, i, g) => i.charCodeAt(0) <= g.charCodeAt(0) ? l : o
  ), T = (b) => {
    const { length: l } = b;
    return b.slice(0, l - l % 2);
  }, M = [
    [
      // remove BOM
      // TODO:
      // Other similar zero-width characters?
      /^\uFEFF/,
      () => o
    ],
    // > Trailing spaces are ignored unless they are quoted with backslash ("\")
    [
      // (a\ ) -> (a )
      // (a  ) -> (a)
      // (a ) -> (a)
      // (a \ ) -> (a  )
      /((?:\\\\)*?)(\\?\s+)$/,
      (b, l, i) => l + (i.indexOf("\\") === 0 ? f : o)
    ],
    // replace (\ ) with ' '
    // (\ ) -> ' '
    // (\\ ) -> '\\ '
    // (\\\ ) -> '\\ '
    [
      /(\\+?)\s/g,
      (b, l) => {
        const { length: i } = l;
        return l.slice(0, i - i % 2) + f;
      }
    ],
    // Escape metacharacters
    // which is written down by users but means special for regular expressions.
    // > There are 12 characters with special meanings:
    // > - the backslash \,
    // > - the caret ^,
    // > - the dollar sign $,
    // > - the period or dot .,
    // > - the vertical bar or pipe symbol |,
    // > - the question mark ?,
    // > - the asterisk or star *,
    // > - the plus sign +,
    // > - the opening parenthesis (,
    // > - the closing parenthesis ),
    // > - and the opening square bracket [,
    // > - the opening curly brace {,
    // > These special characters are often called "metacharacters".
    [
      /[\\$.|*+(){^]/g,
      (b) => `\\${b}`
    ],
    [
      // > a question mark (?) matches a single character
      /(?!\\)\?/g,
      () => "[^/]"
    ],
    // leading slash
    [
      // > A leading slash matches the beginning of the pathname.
      // > For example, "/*.c" matches "cat-file.c" but not "mozilla-sha1/sha1.c".
      // A leading slash matches the beginning of the pathname
      /^\//,
      () => "^"
    ],
    // replace special metacharacter slash after the leading slash
    [
      /\//g,
      () => "\\/"
    ],
    [
      // > A leading "**" followed by a slash means match in all directories.
      // > For example, "**/foo" matches file or directory "foo" anywhere,
      // > the same as pattern "foo".
      // > "**/foo/bar" matches file or directory "bar" anywhere that is directly
      // >   under directory "foo".
      // Notice that the '*'s have been replaced as '\\*'
      /^\^*\\\*\\\*\\\//,
      // '**/foo' <-> 'foo'
      () => "^(?:.*\\/)?"
    ],
    // starting
    [
      // there will be no leading '/'
      //   (which has been replaced by section "leading slash")
      // If starts with '**', adding a '^' to the regular expression also works
      /^(?=[^^])/,
      function() {
        return /\/(?!$)/.test(this) ? "^" : "(?:^|\\/)";
      }
    ],
    // two globstars
    [
      // Use lookahead assertions so that we could match more than one `'/**'`
      /\\\/\\\*\\\*(?=\\\/|$)/g,
      // Zero, one or several directories
      // should not use '*', or it will be replaced by the next replacer
      // Check if it is not the last `'/**'`
      (b, l, i) => l + 6 < i.length ? "(?:\\/[^\\/]+)*" : "\\/.+"
    ],
    // normal intermediate wildcards
    [
      // Never replace escaped '*'
      // ignore rule '\*' will match the path '*'
      // 'abc.*/' -> go
      // 'abc.*'  -> skip this rule,
      //    coz trailing single wildcard will be handed by [trailing wildcard]
      /(^|[^\\]+)(\\\*)+(?=.+)/g,
      // '*.js' matches '.js'
      // '*.js' doesn't match 'abc'
      (b, l, i) => {
        const g = i.replace(/\\\*/g, "[^\\/]*");
        return l + g;
      }
    ],
    [
      // unescape, revert step 3 except for back slash
      // For example, if a user escape a '\\*',
      // after step 3, the result will be '\\\\\\*'
      /\\\\\\(?=[$.|*+(){^])/g,
      () => h
    ],
    [
      // '\\\\' -> '\\'
      /\\\\/g,
      () => h
    ],
    [
      // > The range notation, e.g. [a-zA-Z],
      // > can be used to match one of the characters in a range.
      // `\` is escaped by step 3
      /(\\)?\[([^\]/]*?)(\\*)($|\])/g,
      (b, l, i, g, y) => l === h ? `\\[${i}${T(g)}${y}` : y === "]" && g.length % 2 === 0 ? `[${w(i)}${g}]` : "[]"
    ],
    // ending
    [
      // 'js' will not match 'js.'
      // 'ab' will not match 'abc'
      /(?:[^*])$/,
      // WTF!
      // https://git-scm.com/docs/gitignore
      // changes in [2.22.1](https://git-scm.com/docs/gitignore/2.22.1)
      // which re-fixes #24, #38
      // > If there is a separator at the end of the pattern then the pattern
      // > will only match directories, otherwise the pattern can match both
      // > files and directories.
      // 'js*' will not match 'a.js'
      // 'js/' will not match 'a.js'
      // 'js' will match 'a.js' and 'a.js/'
      (b) => /\/$/.test(b) ? `${b}$` : `${b}(?=$|\\/$)`
    ],
    // trailing wildcard
    [
      /(\^|\\\/)?\\\*$/,
      (b, l) => `${l ? `${l}[^/]+` : "[^/]*"}(?=$|\\/$)`
    ]
  ], D = /* @__PURE__ */ Object.create(null), j = (b, l) => {
    let i = D[b];
    return i || (i = M.reduce(
      (g, [y, t]) => g.replace(y, t.bind(b)),
      b
    ), D[b] = i), l ? new RegExp(i, "i") : new RegExp(i);
  }, B = (b) => typeof b == "string", x = (b) => b && B(b) && !v.test(b) && !r.test(b) && b.indexOf("#") !== 0, U = (b) => b.split(A);
  class $ {
    constructor(l, i, g, y) {
      this.origin = l, this.pattern = i, this.negative = g, this.regex = y;
    }
  }
  const F = (b, l) => {
    const i = b;
    let g = !1;
    b.indexOf("!") === 0 && (g = !0, b = b.substr(1)), b = b.replace(c, "!").replace(p, "#");
    const y = j(b, l);
    return new $(
      i,
      b,
      g,
      y
    );
  }, V = (b, l) => {
    throw new l(b);
  }, W = (b, l, i) => B(b) ? b ? W.isNotRelative(b) ? i(
    `path should be a \`path.relative()\`d string, but got "${l}"`,
    RangeError
  ) : !0 : i("path must not be empty", TypeError) : i(
    `path must be a string, but got \`${l}\``,
    TypeError
  ), z = (b) => K.test(b);
  W.isNotRelative = z, W.convert = (b) => b;
  class k {
    constructor({
      ignorecase: l = !0,
      ignoreCase: i = l,
      allowRelativePaths: g = !1
    } = {}) {
      R(this, _, !0), this._rules = [], this._ignoreCase = i, this._allowRelativePaths = g, this._initCache();
    }
    _initCache() {
      this._ignoreCache = /* @__PURE__ */ Object.create(null), this._testCache = /* @__PURE__ */ Object.create(null);
    }
    _addPattern(l) {
      if (l && l[_]) {
        this._rules = this._rules.concat(l._rules), this._added = !0;
        return;
      }
      if (x(l)) {
        const i = F(l, this._ignoreCase);
        this._added = !0, this._rules.push(i);
      }
    }
    // @param {Array<string> | string | Ignore} pattern
    add(l) {
      return this._added = !1, e(
        B(l) ? U(l) : l
      ).forEach(this._addPattern, this), this._added && this._initCache(), this;
    }
    // legacy
    addPattern(l) {
      return this.add(l);
    }
    //          |           ignored : unignored
    // negative |   0:0   |   0:1   |   1:0   |   1:1
    // -------- | ------- | ------- | ------- | --------
    //     0    |  TEST   |  TEST   |  SKIP   |    X
    //     1    |  TESTIF |  SKIP   |  TEST   |    X
    // - SKIP: always skip
    // - TEST: always test
    // - TESTIF: only test if checkUnignored
    // - X: that never happen
    // @param {boolean} whether should check if the path is unignored,
    //   setting `checkUnignored` to `false` could reduce additional
    //   path matching.
    // @returns {TestResult} true if a file is ignored
    _testOne(l, i) {
      let g = !1, y = !1;
      return this._rules.forEach((t) => {
        const { negative: s } = t;
        if (y === s && g !== y || s && !g && !y && !i)
          return;
        t.regex.test(l) && (g = !s, y = s);
      }), {
        ignored: g,
        unignored: y
      };
    }
    // @returns {TestResult}
    _test(l, i, g, y) {
      const t = l && W.convert(l);
      return W(
        t,
        l,
        this._allowRelativePaths ? S : V
      ), this._t(t, i, g, y);
    }
    _t(l, i, g, y) {
      if (l in i)
        return i[l];
      if (y || (y = l.split(H)), y.pop(), !y.length)
        return i[l] = this._testOne(l, g);
      const t = this._t(
        y.join(H) + H,
        i,
        g,
        y
      );
      return i[l] = t.ignored ? t : this._testOne(l, g);
    }
    ignores(l) {
      return this._test(l, this._ignoreCache, !1).ignored;
    }
    createFilter() {
      return (l) => !this.ignores(l);
    }
    filter(l) {
      return e(l).filter(this.createFilter());
    }
    // @returns {TestResult}
    test(l) {
      return this._test(l, this._testCache, !0);
    }
  }
  const Z = (b) => new k(b), d = (b) => W(b && W.convert(b), b, S);
  if (Z.isPathValid = d, Z.default = Z, Hn = Z, // Detect `process` so that it can run in browsers.
  typeof process < "u" && (process.env && process.env.IGNORE_TEST_WIN32 || process.platform === "win32")) {
    const b = (i) => /^\\\\\?\\/.test(i) || /["<>|\u0000-\u001F]+/u.test(i) ? i : i.replace(/\\/g, "/");
    W.convert = b;
    const l = /^[a-z]:\//i;
    W.isNotRelative = (i) => l.test(i) || z(i);
  }
  return Hn;
}
var Nn, Ps;
function di() {
  if (Ps) return Nn;
  Ps = 1;
  const e = Ue(), o = fi();
  function f() {
    if (!e.existsSync(".gitignore"))
      return !1;
    const h = e.readFileX(".gitignore");
    return !!o(h).add(h).ignores(".env.keys");
  }
  return Nn = f, Nn;
}
var Kn, Ls;
function hi() {
  if (Ls) return Kn;
  Ls = 1;
  const e = Oe, { setLogLevel: o, setLogName: f, setLogVersion: h, logger: v } = at(), { getColor: r, bold: c } = Hs(), p = po(), A = zs(), K = ei(), H = ti(), N = Mn(), _ = ri(), R = si(), m = oi(), S = li(), w = js(), T = Ue(), M = di();
  return Kn = {
    // dotenv proxies
    config: function(V = {}) {
      let W = process.env;
      V && V.processEnv != null && (W = V.processEnv);
      const z = V.overload || V.override, k = V.ignore || [], Z = V.strict, d = V.envKeysFile;
      let b = process.env.DOTENV_KEY;
      V && V.DOTENV_KEY && (b = V.DOTENV_KEY);
      const l = V.opsOff !== !0;
      V && (o(V), f(V), h(V));
      try {
        const i = S(V, b), {
          beforeEnv: g,
          afterEnv: y,
          processedEnvs: t,
          readableFilepaths: s,
          uniqueInjectedKeys: a
        } = new A(i, z, b, W, d, l).run();
        if (l) {
          try {
            new R().observe({ beforeEnv: g, processedEnvs: t, afterEnv: y });
          } catch {
          }
          try {
            new m().observe({ beforeEnv: g, processedEnvs: t, afterEnv: y });
          } catch {
          }
        }
        let n;
        const u = {};
        for (const C of t) {
          C.type === "envVaultFile" && (v.verbose(`loading env from encrypted ${C.filepath} (${e.resolve(C.filepath)})`), v.debug(`decrypting encrypted env from ${C.filepath} (${e.resolve(C.filepath)})`)), C.type === "envFile" && v.verbose(`loading env from ${C.filepath} (${e.resolve(C.filepath)})`);
          for (const E of C.errors || []) {
            if (k.includes(E.code)) {
              v.verbose(`ignored: ${E.message}`);
              continue;
            }
            if (Z) throw E;
            n = E, E.code === "MISSING_ENV_FILE" && V.convention || (v.error(E.message), E.help && v.error(E.help));
          }
          Object.assign(u, C.injected || {}), Object.assign(u, C.preExisted || {}), v.debug(C.parsed);
          for (const [E, I] of Object.entries(C.injected || {}))
            v.verbose(`${E} set`), v.debug(`${E} set to ${I}`);
          for (const [E, I] of Object.entries(C.preExisted || {}))
            v.verbose(`${E} pre-exists (protip: use --overload to override)`), v.debug(`${E} pre-exists as ${I} (protip: use --overload to override)`);
        }
        let O = `injecting env (${a.length})`;
        return s.length > 0 && (O += ` from ${s.join(", ")}`), v.successv(O), n ? { parsed: u, error: n } : { parsed: u };
      } catch (i) {
        if (Z) throw i;
        return v.error(i.message), i.help && v.help(i.help), { parsed: {}, error: i };
      }
    },
    parse: function(V, W = {}) {
      let z = process.env;
      W && W.processEnv != null && (z = W.processEnv);
      const k = W.privateKey || null, Z = W.overload || W.override, { parsed: d, errors: b } = new w(V, k, z, Z).run();
      for (const l of b)
        v.error(l.message), l.help && v.error(l.help);
      return d;
    },
    // actions related
    set: function(V, W, z = {}) {
      let k = !0;
      (z.plain || z.encrypt === !1) && (k = !1);
      const Z = S(z), d = z.envKeysFile, {
        processedEnvs: b,
        changedFilepaths: l,
        unchangedFilepaths: i
      } = new K(V, W, Z, k, d).run();
      let g = "";
      k && (g = " with encryption");
      for (const y of b)
        v.verbose(`setting for ${y.envFilepath}`), y.error ? y.error.code === "MISSING_ENV_FILE" ? (v.warn(y.error.message), v.help(`? add one with [echo "HELLO=World" > ${y.envFilepath}] and re-run [dotenvx set]`)) : (v.warn(y.error.message), y.error.help && v.help(y.error.help)) : (T.writeFileX(y.filepath, y.envSrc), v.verbose(`${y.key} set${g} (${y.envFilepath})`), v.debug(`${y.key} set${g} to ${y.value} (${y.envFilepath})`));
      l.length > 0 ? v.success(`✔ set ${V}${g} (${l.join(",")})`) : i.length > 0 && v.info(`no changes (${i})`);
      for (const y of b)
        y.privateKeyAdded && (v.success(`✔ key added to ${y.envKeysFilepath} (${y.privateKeyName})`), M() || v.help("⮕  next run [dotenvx ext gitignore --pattern .env.keys] to gitignore .env.keys"), v.help(`⮕  next run [${y.privateKeyName}='${y.privateKey}' dotenvx get ${V}] to test decryption locally`));
      return {
        processedEnvs: b,
        changedFilepaths: l,
        unchangedFilepaths: i
      };
    },
    get: function(V, W = {}) {
      const z = S(W), k = W.ignore || [], { parsed: Z, errors: d } = new H(V, z, W.overload, process.env.DOTENV_KEY, W.all, W.envKeysFile).run();
      for (const b of d || [])
        if (!k.includes(b.code)) {
          if (W.strict) throw b;
          v.error(b.message), b.help && v.error(b.help);
        }
      if (V) {
        const b = Z[V];
        return b === void 0 ? void 0 : b;
      } else if (W.format === "eval") {
        let b = "";
        for (const [l, i] of Object.entries(Z))
          b += `${l}=${escape(i)}
`;
        return b = b.trim(), b;
      } else if (W.format === "shell") {
        let b = "";
        for (const [l, i] of Object.entries(Z))
          b += `${l}=${i} `;
        return b = b.trim(), b;
      } else
        return Z;
    },
    ls: function(V, W, z) {
      return new p(V, W, z).run();
    },
    keypair: function(V, W, z = null) {
      const k = new N(V, z).run();
      return W ? k[W] : k;
    },
    genexample: function(V, W) {
      return new _(V, W).run();
    },
    // expose for libs depending on @dotenvx/dotenvx - like dotenvx-radar
    setLogLevel: o,
    logger: v,
    getColor: r,
    bold: c
  }, Kn;
}
var yi = hi();
yi.config({ path: process.env.INIT_CWD ? `${process.env.INIT_CWD}/.env` : ".env", ignore: ["MISSING_ENV_FILE"], quiet: !0 });
const _i = {
  php: {
    version: process.env.BROWSER_PHP_VERSION != null ? process.env.BROWSER_PHP_VERSION : "8.4",
    cli: process.env.BROWSER_PHP_CLI ?? "xterm"
  },
  composer: {
    name: process.env.BROWSER_PHP_COMPOSER_NAME ?? "composer",
    version: process.env.BROWSER_PHP_COMPOSER_VERSION ?? "2.9.2",
    path: process.env.BROWSER_PHP_COMPOSER_PATH ?? "vendor/bin"
  },
  server: {
    host: process.env.BROWSER_PHP_SERVER_HOST ?? "http://localhost",
    port: process.env.BROWSER_PHP_SERVER_PORT ?? "2222",
    path: process.env.BROWSER_PHP_SERVER_PATH ?? "public",
    debug: process.env.BROWSER_PHP_SERVER_DEBUG != null && process.env.BROWSER_PHP_SERVER_DEBUG != "false"
  }
};
export {
  _i as default
};
