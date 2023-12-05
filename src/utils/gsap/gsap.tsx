import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { SplitText } from "gsap/SplitText";
import getSpringEasing from "./SpringCurve";
import { ixdEasing } from "./token";

gsap.registerPlugin(CustomEase, ScrollTrigger);
// gsap.registerPlugin(CustomEase, ScrollTrigger, SplitText);

CustomEase.create("ease", "0.6, 0, 0, 0.6");
CustomEase.create("out", "0.25, 0.1, 0.25, 1");
CustomEase.create("expo", "0.16, 1, 0.3, 1");
CustomEase.create("back", "0.34, 1.56, 0.64, 1");
CustomEase.create("back2", ".26,1.57,.48,1.1");
CustomEase.create("bezier1", "0.5, 0.2, 0.8, 0.5");
CustomEase.create("bezier2", "0.2, 0.5, 0.5, 0.8");
CustomEase.create("inout", "0.46,0.03,0.52,0.96");
// CustomEase.create("inout", "0.45,0.05,0.55,0.95");

const { easingFn: slowEase, duration: slowDuration } = getSpringEasing(
  ixdEasing.spring.slow
);
const { easingFn: slow2Ease, duration: slow2Duration } = getSpringEasing(
  ixdEasing.spring.slow2
);
const { easingFn: basicEase, duration: basicDuration } = getSpringEasing(
  ixdEasing.spring.basic
);
const { easingFn: basic2Ease, duration: basic2Duration } = getSpringEasing(
  ixdEasing.spring.basic2
);
const { easingFn: bounce2Ease, duration: bounce2Duration } = getSpringEasing(
  ixdEasing.spring.bounce2
);
const { easingFn: smallEase, duration: smallDuration } = getSpringEasing(
  ixdEasing.spring.small
);
const { easingFn: mediumEase, duration: mediumDuration } = getSpringEasing(
  ixdEasing.spring.medium
);
const { easingFn: largeEase, duration: largeDuration } = getSpringEasing(
  ixdEasing.spring.large
);
const { easingFn: quickEase, duration: quickDuration } = getSpringEasing(
  ixdEasing.spring.quick
);
const { easingFn: rapidEase, duration: rapidDuration } = getSpringEasing(
  ixdEasing.spring.rapid
);

export const springs = {
  slow: {
    ease: slowEase,
    duration: slowDuration,
  },
  basic: {
    ease: basicEase,
    duration: basicDuration,
  },
  slow2: {
    ease: slow2Ease,
    duration: slow2Duration,
  },
  basic2: {
    ease: basic2Ease,
    duration: basic2Duration,
  },
  bounce2: {
    ease: bounce2Ease,
    duration: bounce2Duration,
  },
  small: {
    ease: smallEase,
    duration: smallDuration,
  },
  medium: {
    ease: mediumEase,
    duration: mediumDuration,
  },
  large: {
    ease: largeEase,
    duration: largeDuration,
  },
  quick: {
    ease: quickEase,
    duration: quickDuration,
  },
  rapid: {
    ease: rapidEase,
    duration: rapidDuration,
  },
};

gsap.registerEffect({
  name: "addSpace",
  effect: (targets) => gsap.to(gsap.effects.addSpace, { duration: targets[0] }),
  extendTimeline: true,
});

export * from "gsap";
export * from "gsap/CustomEase";
export * from "gsap/ScrollTrigger";
// export * from "gsap/SplitText";
