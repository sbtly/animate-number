import NewtonSolver from "newton-raphson-method";

function assert(predicate, errorMessage) {
  if (!predicate) {
    throw new Error(errorMessage);
  }
}

// Representing points x + k * step for any integer k
class Stride {
  x;
  step;

  constructor(x, step) {
    this.x = x;
    this.step = step;

    this.subscript = this.subscript.bind(this);
    this.k = this.k.bind(this);
  }

  subscript(k) {
    return this.x + k * this.step;
  }

  // The largest k such that x + k * step <= y
  k(y) {
    assert(this.step > 0, "step is 0");
    return Math.floor((y - this.x) / this.step);
  }
}

// Find the largest solution x that |x(x)| = alpha where x is the position from the equilibrium position.
function criticalOverDampingSolve(curve, alpha, epsilon) {
  const dampingRatio = curve.getDampingRatio();
  let omega = curve.getOmega();

  assert(dampingRatio > 1 - epsilon, "dampingRatio > 1 - epsilon is not true");
  assert(0 < alpha && alpha < 1, "0 < alpha && alpha < 1 is not true");

  let zeta = dampingRatio;
  let v0 = curve.initialVelocity;

  // x'(turning) = 0, the turning point, x''(inflection) = 0, the inflection point
  let points;
  let increaseToInfinity; // Whether x'(t) > 0 for t > t1
  let criticalDamping = Math.abs(zeta - 1) < epsilon;
  if (criticalDamping) {
    let c2 = v0 - omega;

    if (Math.abs(c2) < epsilon) {
      // The equation becomes x(t) = -exp(-omega * t)
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
      // The equation becomes x(t) = c2 * exp(s2 * t)
      return Math.log(-alpha / c2) / s2;
    } else if (Math.abs(c2) < epsilon) {
      // The equation becomes x(t) = c1 * exp(s1 * t)
      return Math.log(-alpha / c1) / s1;
    }

    if (c1 * c2 < 0) {
      let turning = Math.log((-c2 * s2) / c1 / s1) / (s1 - s2);
      let inflection = Math.log((-c2 * s2 * s2) / c1 / s1 / s1) / (s1 - s2);
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
      // |x(turning)| > alpha, has solution between `turning` and infinity
      // Since `turning` is the turning point, the solution is unique
      const f = increaseToInfinity
        ? (t) => curve.curveFunc(t) - 1 + alpha
        : (t) => curve.curveFunc(t) - 1 - alpha;

      return NewtonSolver(f, curve.derivativeCurveFunc, points.inflection);
    } else {
      // |x(0)| = 1 > alpha, |x(turning)| < alpha, has solution between 0 and `turning`
      // Since `turning` is the turning point, the solution is unique
      // because if increaseToInfinity, decrease to the turning point, so x(turning) < -1
      assert(!increaseToInfinity, "!increaseToInfinity is not true");

      let f = (t) => curve.curveFunc(t) - 1 + alpha;
      return NewtonSolver(f, curve.derivativeCurveFunc, 0);
    }
  } else {
    assert(increaseToInfinity, "increaseToInfinity is not true");

    let f = (t) => curve.curveFunc(t) - 1 + alpha;
    return NewtonSolver(f, curve.derivativeCurveFunc, 0);
  }
}

function underDampingTurningPoints(curve, epsilon) {
  const dampingRatio = curve.getDampingRatio();
  let omega = curve.getOmega();

  assert(dampingRatio < 1.0, "dampingRatio < 1.0");

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
  assert(dampingRatio < 1.0, "dampingRatio < 1.0");

  let zeta = dampingRatio;
  let v0 = curve.initialVelocity;

  let a = -omega * zeta;
  let b = omega * Math.sqrt(1 - zeta * zeta);
  let c2 = (v0 + a) / b;

  let psi = Math.atan2(
    -2 * a * b - c2 * a * a + c2 * b * b,
    -a * a + b * b + 2 * c2 * a * b
  );
  return new Stride((-psi + Math.PI / 2) / b, Math.PI / b);
}

function underDampingSolve(curve, alpha, epsilon) {
  const dampingRatio = curve.getDampingRatio();
  let omega = curve.getOmega();

  assert(
    0.0 < dampingRatio && dampingRatio < 1.0,
    "0.0 < dampingRatio && dampingRatio < 1.0"
  );
  assert(0 < alpha && alpha < 1, "0 < alpha && alpha < 1");

  let zeta = dampingRatio;
  // debugger;
  let v0 = curve.initialVelocity;

  let a = -omega * zeta;
  let b = omega * Math.sqrt(1 - zeta * zeta);
  let c2 = (v0 + a) / b;

  // For any t >= t3, |x(t)| <= alpha
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

  if (
    Math.abs(
      Math.abs(curve.curveFunc(turningPoints.subscript(k1)) - 1) - alpha
    ) < epsilon
  ) {
    return turningPoints.subscript(k1);
  }

  // The solution is between turningPoints.subscript(k1 )and turningPoints.subscript(k1+) 1]
  let inflectionPoints = underDampingInflectionPoints(curve, epsilon);
  let k2 = inflectionPoints.k(turningPoints.subscript(k1 + 1));

  // Because the steps of turningPoints and inflectionPoints are the same
  assert(
    turningPoints.subscript(k1) < inflectionPoints.subscript(k2),
    "turningPoints[k1] < inflectionPoints[k2]"
  );

  let f;
  if (curve.curveFunc(turningPoints.subscript(k1)) > 1) {
    f = (t) => curve.curveFunc(t) - 1 - alpha;
  } else {
    f = (t) => curve.curveFunc(t) - 1 + alpha;
  }

  return NewtonSolver(
    f,
    curve.derivativeCurveFunc,
    inflectionPoints.subscript(k2)
  );
}

export function settlingDuration(curve, alpha, epsilon = 1e-8) {
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
