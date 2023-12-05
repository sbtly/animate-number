import { settlingDuration } from "./SettlingDurationSolver";

export default function getSpringEasing({ stiffness, damping }) {
  const curve = new SpringCurve({ stiffness, damping });
  const duration = curve.getSettlingDuration();
  // console.log(JSON.stringify({ stiffness, damping, duration }));
  return {
    duration,
    easingFn: (t) => curve.curveFunc(t * duration)
  };
}

export class SpringCurve {
  _response;

  getResponse() {
    return Math.max(1e-5, this._response);
  }

  _dampingRatio;

  getDampingRatio() {
    return Math.max(0, this._dampingRatio);
  }

  initialVelocity;

  getOmega() {
    return (2 * Math.PI) / this.getResponse();
  }

  getStiffness(mass = 1.0) {
    const omega = this.getOmega();
    return mass * omega * omega;
  }

  getDamping(mass = 1.0) {
    return (
      this.getDampingRatio() * 2 * Math.sqrt(this.getStiffness(mass) * mass)
    );
  }

  getSettlingDuration() {
    return settlingDuration(this, 1e-3, 1e-8);
  }

  // p { stiffness, damping }
  constructor(p) {
    const initialMass = 1;
    const initialVelocity = 0.0;

    const stiffness = Math.max(1e-5, p.stiffness);
    const mass = Math.max(1e-5, initialMass);
    const damping = Math.max(0.0, p.damping);

    const response = (2 * Math.PI) / Math.sqrt(stiffness / mass);
    const dampingRatio = Math.min(
      1.0,
      damping / 2 / Math.sqrt(stiffness * mass)
    );

    this._response = response;
    this._dampingRatio = dampingRatio;
    this.initialVelocity = initialVelocity;

    this.getDamping = this.getDamping.bind(this);
    this.getDampingRatio = this.getDampingRatio.bind(this);
    this.getOmega = this.getOmega.bind(this);
    this.getResponse = this.getResponse.bind(this);
    this.getSettlingDuration = this.getSettlingDuration.bind(this);
    this.getStiffness = this.getStiffness.bind(this);
    this.curveFunc = this.curveFunc.bind(this);
    this.derivativeCurveFunc = this.derivativeCurveFunc.bind(this);
  }

  curveFunc(t) {
    let v0 = this.initialVelocity;
    let zeta = this.getDampingRatio();
    let y;
    const omega = this.getOmega();

    if (Math.abs(zeta - 1.0) < 1e-8) {
      let c1 = -1.0;
      let c2 = v0 - omega;
      y = (c1 + c2 * t) * Math.exp(-omega * t);
    } else if (zeta > 1) {
      let s1 = omega * (-zeta + Math.sqrt(zeta * zeta - 1));
      let s2 = omega * (-zeta - Math.sqrt(zeta * zeta - 1));
      let c1 = (-s2 - v0) / (s2 - s1);
      let c2 = (s1 + v0) / (s2 - s1);
      y = c1 * Math.exp(s1 * t) + c2 * Math.exp(s2 * t);
    } else {
      let a = -omega * zeta;
      let b = omega * Math.sqrt(1 - zeta * zeta);
      let c2 = (v0 + a) / b;
      let theta = Math.atan(c2);
      // Alternatively y = (-cos(b * t) + c2 * sin(b * t)) * Math.exp(a * t)
      y =
        Math.sqrt(1 + c2 * c2) *
        Math.exp(a * t) *
        Math.cos(b * t + theta + Math.PI);
    }

    return y + 1;
  }

  derivativeCurveFunc(t) {
    let v0 = this.initialVelocity;
    let zeta = this.getDampingRatio();
    const omega = this.getOmega();

    if (zeta === 1.0) {
      let c1 = -1.0;
      let c2 = v0 - omega;
      return (c2 - omega * c1 - omega * c2 * t) * Math.exp(-omega * t);
    } else if (zeta > 1) {
      let s1 = omega * (-zeta + Math.sqrt(zeta * zeta - 1));
      let s2 = omega * (-zeta - Math.sqrt(zeta * zeta - 1));
      let c1 = (-s2 - v0) / (s2 - s1);
      let c2 = (s1 + v0) / (s2 - s1);
      return c1 * s1 * Math.exp(s1 * t) + c2 * s2 * Math.exp(s2 * t);
    } else {
      let a = -omega * zeta;
      let b = omega * Math.sqrt(1 - zeta * zeta);
      let c2 = (v0 + a) / b;
      let theta = Math.atan(c2);
      return (
        Math.sqrt(1 + c2 * c2) *
        Math.exp(a * t) *
        (a * Math.cos(b * t + theta + Math.PI) -
          b * Math.sin(b * t + theta + Math.PI))
      );
    }
  }
}
