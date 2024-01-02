import { useEffect, useRef, useState, useLayoutEffect, useMemo } from "react";
import { gsap, springs as spring } from "./utils/gsap/gsap";

import { css } from "@emotion/css";
import {
  returnStackItemsLoop,
  returnStackItemsRepeat,
} from "./utils/stack-functions";

export const stack = css`
  position: absolute;
  left: 0;
  /* background: salmon; */
  mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 1) 15%,
    rgba(0, 0, 0, 1) 75%,
    rgba(0, 0, 0, 0) 100%
  );
`;

export const stackContainer = css`
  display: flex;
  gap: 0px;
  flex-direction: column;
  position: absolute;
  left: 0;
`;

export default function Stack(props) {
  const [arr, setArr] = useState([]);
  const wrapperRef = useRef();
  const tl = useRef();
  const rollMotion = useRef();

  useEffect(() => {
    const arr = returnStackItemsLoop(
      props.startNum,
      props.endNum,
      props.loopCount,
      props.toIsLargerThenFrom
    );
    setArr(arr);
    // console.log(
    //   "stack ",
    //   props.startNum,
    //   props.endNum,
    //   props.toIsLargerThenFrom
    // );
    // console.log(arr);
  }, [props.startNum, props.endNum, props.loopCount, props.toIsLargerThenFrom]);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      tl.current = gsap.timeline({
        paused: true,
        delay: props.startStaggerDelay,
      });

      rollMotion.current =
        props.mode === "quickNormal" || props.mode === "quickBounce"
          ? gsap.fromTo(
              wrapperRef.current,
              {
                yPercent: props.toIsLargerThenFrom ? 0 : -(100 - 100 / 2),
              },
              {
                yPercent: props.toIsLargerThenFrom ? -(100 - 100 / 2) : 0,
                ...props.stackEasing,
              }
            )
          : gsap.fromTo(
              wrapperRef.current,
              {
                yPercent: props.toIsLargerThenFrom
                  ? 0
                  : -(100 - 100 / arr?.length),
              },
              {
                yPercent: props.toIsLargerThenFrom
                  ? -(100 - 100 / arr?.length)
                  : 0,
                ...props.stackEasing,
              }
            );

      tl.current?.add(rollMotion.current);
    });
    return () => {
      ctx.revert();
    };
  }, [
    arr,
    props.startStaggerDelay,
    props.mode,
    // props.loopCount,
    props.toIsLargerThenFrom,
    props.stackEasing,
  ]);

  useEffect(() => {
    tl.current?.pause(0);
  }, [props.reset]);

  useEffect(() => {
    tl.current?.restart(true, false);
  }, [props.play]);

  return (
    <div className={stack} style={{ ...props.style }}>
      <div ref={wrapperRef} className={stackContainer}>
        {props.mode === "quickNormal" || props.mode === "quickBounce" ? (
          <>
            <div
              style={{
                opacity: props.toIsLargerThenFrom
                  ? 1
                  : props.isHideStack
                  ? 0
                  : 1,
              }}
            >
              {props.toIsLargerThenFrom ? props.startNum : props.endNum}
            </div>
            <div
              style={{
                opacity: props.toIsLargerThenFrom
                  ? props.isHideStack
                    ? 0
                    : 1
                  : 1,
              }}
            >
              {props.toIsLargerThenFrom ? props.endNum : props.startNum}
            </div>
          </>
        ) : (
          arr?.map((n, i) => {
            return <div key={i}>{n}</div>;
          })
        )}
      </div>
      <div style={{ opacity: 0 }}>0</div>
    </div>
  );
}
