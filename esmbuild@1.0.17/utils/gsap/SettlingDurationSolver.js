var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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

// node_modules/newton-raphson-method/index.js
var require_newton_raphson_method = __commonJS({
  "node_modules/newton-raphson-method/index.js"(exports, module) {
    "use strict";
    module.exports = newtonRaphson;
    function newtonRaphson(f, fp, x0, options) {
      var x1, y, yp, tol, maxIter, iter, yph, ymh, yp2h, ym2h, h, hr, verbose, eps;
      if (typeof fp !== "function") {
        options = x0;
        x0 = fp;
        fp = null;
      }
      options = options || {};
      tol = options.tolerance === void 0 ? 1e-7 : options.tolerance;
      eps = options.epsilon === void 0 ? 2220446049250313e-31 : options.epsilon;
      maxIter = options.maxIterations === void 0 ? 20 : options.maxIterations;
      h = options.h === void 0 ? 1e-4 : options.h;
      verbose = options.verbose === void 0 ? false : options.verbose;
      hr = 1 / h;
      iter = 0;
      while (iter++ < maxIter) {
        y = f(x0);
        if (fp) {
          yp = fp(x0);
        } else {
          yph = f(x0 + h);
          ymh = f(x0 - h);
          yp2h = f(x0 + 2 * h);
          ym2h = f(x0 - 2 * h);
          yp = (ym2h - yp2h + 8 * (yph - ymh)) * hr / 12;
        }
        if (Math.abs(yp) <= eps * Math.abs(y)) {
          if (verbose) {
            console.log("Newton-Raphson: failed to converged due to nearly zero first derivative");
          }
          return false;
        }
        x1 = x0 - y / yp;
        if (Math.abs(x1 - x0) <= tol * Math.abs(x1)) {
          if (verbose) {
            console.log("Newton-Raphson: converged to x = " + x1 + " after " + iter + " iterations");
          }
          return x1;
        }
        x0 = x1;
      }
      if (verbose) {
        console.log("Newton-Raphson: Maximum iterations reached (" + maxIter + ")");
      }
      return false;
    }
  }
});

// src/utils/gsap/SettlingDurationSolver.tsx
var import_newton_raphson_method = __toModule(require_newton_raphson_method());
function assert(predicate, errorMessage) {
  if (!predicate) {
    throw new Error(errorMessage);
  }
}
var Stride = class {
  constructor(x, step) {
    this.x = x;
    this.step = step;
    this.subscript = this.subscript.bind(this);
    this.k = this.k.bind(this);
  }
  subscript(k) {
    return this.x + k * this.step;
  }
  k(y) {
    assert(this.step > 0, "step is 0");
    return Math.floor((y - this.x) / this.step);
  }
};
function criticalOverDampingSolve(curve, alpha, epsilon) {
  const dampingRatio = curve.getDampingRatio();
  let omega = curve.getOmega();
  assert(dampingRatio > 1 - epsilon, "dampingRatio > 1 - epsilon is not true");
  assert(0 < alpha && alpha < 1, "0 < alpha && alpha < 1 is not true");
  let zeta = dampingRatio;
  let v0 = curve.initialVelocity;
  let points;
  let increaseToInfinity;
  let criticalDamping = Math.abs(zeta - 1) < epsilon;
  if (criticalDamping) {
    let c2 = v0 - omega;
    if (Math.abs(c2) < epsilon) {
      return -Math.log(alpha) / omega;
    }
    let inflection = (2 * c2 + omega) / omega / c2;
    let turning = inflection - 1 / omega;
    points = { turning, inflection };
    increaseToInfinity = c2 < 0;
  } else {
    let s1 = omega * (-zeta + Math.sqrt(zeta * zeta - 1));
    let s2 = omega * (-zeta - Math.sqrt(zeta * zeta - 1));
    let c1 = (-s2 - v0) / (s2 - s1);
    let c2 = (s1 + v0) / (s2 - s1);
    if (Math.abs(c1) < epsilon) {
      return Math.log(-alpha / c2) / s2;
    } else if (Math.abs(c2) < epsilon) {
      return Math.log(-alpha / c1) / s1;
    }
    if (c1 * c2 < 0) {
      let turning = Math.log(-c2 * s2 / c1 / s1) / (s1 - s2);
      let inflection = Math.log(-c2 * s2 * s2 / c1 / s1 / s1) / (s1 - s2);
      points = { turning, inflection };
      increaseToInfinity = c1 < 0;
    } else {
      points = null;
      increaseToInfinity = true;
    }
  }
  if (points != null) {
    if (Math.abs(curve.curveFunc(points.turning) - 1) === alpha) {
      return points.turning;
    } else if (Math.abs(curve.curveFunc(points.turning) - 1) > alpha) {
      const f = increaseToInfinity ? (t) => curve.curveFunc(t) - 1 + alpha : (t) => curve.curveFunc(t) - 1 - alpha;
      return (0, import_newton_raphson_method.default)(f, curve.derivativeCurveFunc, points.inflection);
    } else {
      assert(!increaseToInfinity, "!increaseToInfinity is not true");
      let f = (t) => curve.curveFunc(t) - 1 + alpha;
      return (0, import_newton_raphson_method.default)(f, curve.derivativeCurveFunc, 0);
    }
  } else {
    assert(increaseToInfinity, "increaseToInfinity is not true");
    let f = (t) => curve.curveFunc(t) - 1 + alpha;
    return (0, import_newton_raphson_method.default)(f, curve.derivativeCurveFunc, 0);
  }
}
function underDampingTurningPoints(curve, epsilon) {
  const dampingRatio = curve.getDampingRatio();
  let omega = curve.getOmega();
  assert(dampingRatio < 1, "dampingRatio < 1.0");
  let zeta = dampingRatio;
  let v0 = curve.initialVelocity;
  let a = -omega * zeta;
  let b = omega * Math.sqrt(1 - zeta * zeta);
  let c2 = (v0 + a) / b;
  let phi = Math.atan2(-b - c2 * a, v0);
  return new Stride((-phi + Math.PI / 2) / b, Math.PI / b);
}
function underDampingInflectionPoints(curve, epsilon) {
  const dampingRatio = curve.getDampingRatio();
  let omega = curve.getOmega();
  assert(dampingRatio < 1, "dampingRatio < 1.0");
  let zeta = dampingRatio;
  let v0 = curve.initialVelocity;
  let a = -omega * zeta;
  let b = omega * Math.sqrt(1 - zeta * zeta);
  let c2 = (v0 + a) / b;
  let psi = Math.atan2(-2 * a * b - c2 * a * a + c2 * b * b, -a * a + b * b + 2 * c2 * a * b);
  return new Stride((-psi + Math.PI / 2) / b, Math.PI / b);
}
function underDampingSolve(curve, alpha, epsilon) {
  const dampingRatio = curve.getDampingRatio();
  let omega = curve.getOmega();
  assert(0 < dampingRatio && dampingRatio < 1, "0.0 < dampingRatio && dampingRatio < 1.0");
  assert(0 < alpha && alpha < 1, "0 < alpha && alpha < 1");
  let zeta = dampingRatio;
  let v0 = curve.initialVelocity;
  let a = -omega * zeta;
  let b = omega * Math.sqrt(1 - zeta * zeta);
  let c2 = (v0 + a) / b;
  let t3 = Math.log(alpha / Math.sqrt(1 + c2 * c2)) / a;
  let turningPoints = underDampingTurningPoints(curve, epsilon);
  let k3 = turningPoints.k(t3);
  let k1;
  for (let i = k3; i > Number.MIN_SAFE_INTEGER; i--) {
    if (Math.abs(curve.curveFunc(turningPoints.subscript(i)) - 1) >= alpha) {
      k1 = i;
      break;
    }
  }
  if (Math.abs(Math.abs(curve.curveFunc(turningPoints.subscript(k1)) - 1) - alpha) < epsilon) {
    return turningPoints.subscript(k1);
  }
  let inflectionPoints = underDampingInflectionPoints(curve, epsilon);
  let k2 = inflectionPoints.k(turningPoints.subscript(k1 + 1));
  assert(turningPoints.subscript(k1) < inflectionPoints.subscript(k2), "turningPoints[k1] < inflectionPoints[k2]");
  let f;
  if (curve.curveFunc(turningPoints.subscript(k1)) > 1) {
    f = (t) => curve.curveFunc(t) - 1 - alpha;
  } else {
    f = (t) => curve.curveFunc(t) - 1 + alpha;
  }
  return (0, import_newton_raphson_method.default)(f, curve.derivativeCurveFunc, inflectionPoints.subscript(k2));
}
function settlingDuration(curve, alpha, epsilon = 1e-8) {
  const dampingRatio = curve.getDampingRatio();
  try {
    if (dampingRatio > 1 - epsilon) {
      return criticalOverDampingSolve(curve, alpha, epsilon);
    } else if (dampingRatio > epsilon) {
      return underDampingSolve(curve, alpha, epsilon);
    } else {
      return 1e10;
    }
  } catch (e) {
    console.log(e);
    return 0;
  }
}
export {
  settlingDuration
};
