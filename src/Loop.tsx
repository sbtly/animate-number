import { useEffect, useRef, useState, useLayoutEffect, useMemo } from "react";
import {gsap} from './utils/gsap/gsap'
import { css } from "@emotion/css";

const loopContainerStyle = css`
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

const loopStyle = css`
  position: absolute;
  text-align: center;
`;

export default function Loop(props) {
  const animation = useRef();
  const animations = useRef([]);

  const wrapperRef = useRef();
  const q = useMemo(() => gsap.utils.selector(wrapperRef), [wrapperRef]);

  const dir = props.toIsLargerThenFrom ? "up" : "down";

  const repeatCount = 25; // 원래 infinite 하고 멈춰야하는데 귀찮아서 걍 일케함..

  const easings = {
    slow: {
      // staggerDelay: 0.17,
      staggerDelay: 0.18,
      duration: 0.6,
      repeatDelay: 1.2,
      ease: "out",
      y: 70
      // staggerDelay: 0.26,
      // duration: 0.6,
      // repeatDelay: 2,
      // ease: "out",
      // y: 50
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
    }
  };

  const preset = easings[props.preset];
  // console.log("preset: ", preset);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      animation.current = gsap.timeline({
        paused: true,
        delay: props.startStaggerDelay,
        defaults: { ease: preset.ease, duration: preset.duration }
      });

      if (dir === "up") {
        q(`.${loopStyle}`).forEach((target, i) => {
          animations.current[i] = gsap
            .timeline({
              // paused: true,
              repeat: repeatCount,
              repeatDelay: preset.repeatDelay
            })
            .addLabel("start")
            .fromTo(
              target,
              { rotateX: 80, y: `${preset.y}%` },
              { rotateX: -80, y: `${-preset.y}%` },
              "start"
            )
            .fromTo(
              target,
              { opacity: 0 },
              { opacity: 1, duration: preset.duration / 2 },
              "start"
            )
            .to(
              target,
              { opacity: 0, duration: preset.duration / 2 },
              `start+=${preset.duration / 2}`
            );
        });

        animations.current?.forEach((tl, i) => {
          const startIndex =
            props.startNum === undefined
              ? i
              : props.startNum > i
              ? i - props.startNum + 10
              : i - props.startNum;
          animation.current?.add(tl, preset.staggerDelay * startIndex);
        });
      } else {
        q(`.${loopStyle}`).forEach((target, i) => {
          animations.current[i] = gsap
            .timeline({
              // paused: true,
              repeat: repeatCount,
              repeatDelay: preset.repeatDelay
            })
            .addLabel("start")
            .fromTo(
              target,
              { rotateX: -80, y: `${-preset.y}%` },
              { rotateX: 80, y: `${preset.y}%` },
              "start"
            )
            .fromTo(
              target,
              { opacity: 0 },
              { opacity: 1, duration: preset.duration / 2 },
              "start"
            )
            .to(
              target,
              { opacity: 0, duration: preset.duration / 2 },
              `start+=${preset.duration / 2}`
            );
        });

        animations.current?.toReversed().forEach((tl, i) => {
          const startIndex =
            props.startNum === undefined
              ? i
              : props.startNum > i
              ? i - props.startNum + 10
              : i - props.startNum;
          animation.current?.add(tl, preset.staggerDelay * startIndex);
        });
      }
    });
    return () => {
      ctx.revert();
    };
  }, [props.startNum, props.startStaggerDelay, dir, preset]);

  useEffect(() => {
    animation.current?.restart(true, false);
  }, [props.play]);

  return (
    <>
      <div
        className={loopContainerStyle}
        style={{ fontSize: props.fontSize, fontFamily: 'Toss Product Sans', ...props.style }}
        ref={wrapperRef}
      >
        <div className={loopStyle}>0</div>
        <div className={loopStyle}>1</div>
        <div className={loopStyle}>2</div>
        <div className={loopStyle}>3</div>
        <div className={loopStyle}>4</div>
        <div className={loopStyle}>5</div>
        <div className={loopStyle}>6</div>
        <div className={loopStyle}>7</div>
        <div className={loopStyle}>8</div>
        <div className={loopStyle}>9</div>

        <span
          style={{
            background: "lime",
            opacity: 0,
            paddingTop: "10%",
            paddingBottom: "10%",
            position: "relative"
          }}
        >
          0
        </span>
      </div>
    </>
  );
}
