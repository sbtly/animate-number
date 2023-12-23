import { useEffect, useRef, useState, useLayoutEffect, useMemo } from "react";
import { addPropertyControls, ControlType } from "framer";
import { gsap, springs as spring } from "./utils/gsap/gsap";
import SplitType from "split-type";
import { css } from "@emotion/css";

import Loop from "./Loop";
import {
  findCommaIndices,
  generatePositions,
  calculateSuffixPosition,
  getIndicesOfLoops,
  getStartNumsOfLoops,
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
} from "./utils/functions";

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

const fromNum = css`
  /* position: relative; */
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  label: fromNum;
`;

const toNum = css`
  /* color: red; */
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  label: toNum;
`;

const prefix = css`
  position: relative;
  display: inline-block;
  label: prefix;
`;

const suffix = css`
  position: relative;
  display: inline-block;
  label: suffix;
`;

export function AnimateNumber(props) {
  const wrapperRef = useRef();
  const prefixRef = useRef();
  const suffixRef = useRef();

  const q = useMemo(() => gsap.utils.selector(wrapperRef), [wrapperRef]);

  const [state, setState] = useState(false);
  const [playLoop, setPlayLoop] = useState(false);
  // const [localeFrom, setLocaleFrom] = useState(props.from?.replace(/\B(?=(\d{3})+(?!\d))/g, ','));
  // const [localeTo, setLocaleTo] = useState(props.to?.replace(/\B(?=(\d{3})+(?!\d))/g, ','));

  const [resultFromArr, setResultFromArr] = useState([]);
  const [resultFromArrOnlyNum, setResultFromArrOnlyNum] = useState([]);
  const [resultToArr, setResultToArr] = useState([]);
  const [resultToArrOnlyNum, setResultToArrOnlyNum] = useState([]);
  const [toArrCommaIndices, setToArrCommaIndices] = useState([]);
  const [loadingPositionArr, setLoadingPositionArr] = useState([]);
  const [loadingPositionArrOnlyNum, setLoadingPositionArrOnlyNum] = useState(
    []
  );
  const [fromPositionArr, setFromPositionArr] = useState([]);
  const [fromPositionArrOnlyNum, setFromPositionArrOnlyNum] = useState([]);
  const [endPositionArr, setEndPositionArr] = useState([]);
  const [endPositionArrOnlyNum, setEndPositionArrOnlyNum] = useState([]);
  const [suffixFromPosition, setSuffixFromPosition] = useState();
  const [suffixLoadingPosition, setSuffixLoadingPosition] = useState();
  const [suffixEndPosition, setSuffixEndPosition] = useState();
  const [loopIndices, setLoopIndices] = useState([]);
  const [loopArr, setLoopArr] = useState([]);
  const [toIsLargerThenFrom, setToIsLargerThenFrom] = useState();
  const [toIsLongerThenFrom, setToIsLongerThenFrom] = useState();

  // const [numWidths, setNumWidths] = useState(getNumWidthsWhenBold(props.fontSize));

  const tl = useRef();
  const outFromCharsMotion = useRef();
  const outFromCommaMotion = useRef();
  const repositionFromCharsMotion = useRef();
  const repositionLoopsMotion = useRef();
  const showLoopsMotion = useRef();
  const showToCommaMotion = useRef();
  const hideLoopsMotion = useRef();
  const hideLoopsGroupMotion = useRef();
  const repositionFromSameCharsMotion = useRef();
  const repositionToCommaMotion = useRef();
  const showToCharsMotion = useRef();

  const moveSuffixToEndMotion = useRef();
  const hidePreSuffixMotion = useRef();
  const showPreSuffixMotion = useRef();
  const movePrefixToEndMotion = useRef();

  // align right이면서 toIsLongerThenFrom이 아닐 때 (from길이 > to길이), 마지막에 width가 줄어들때 prefix도 따라서 띡- 이동하는거 보정하기 위한 모션
  const resetPrefixToEndMotion = useRef();

  const changeWidthMotion = useRef();
  const repositionAllByAlignMotion = useRef();

  const resultToShowLoops = ["diff", "show", "hide"];
  const numWidths = getNumWidthsWhenBold(props.fontSize);

  const presets = {
    slow: {
      hideLoopEasing: spring.small,
      inEasing: spring.slow2,
      loopPreset: "slow",
      outStaggerDelay: 0.05,
      inStaggerDelay: 0.05,
      // outStaggerDelay: 0.04,
      // inStaggerDelay: 0.04,
      expandEasing: spring.slow2,
      shrinkEasing: spring.basic,
    },
    normal: {
      // hideLoopEasing: spring.small,
      hideLoopEasing: spring.quick,
      inEasing: spring.small,
      // loopPreset: "normal",
      loopPreset: "fast",
      outStaggerDelay: 0.03,
      inStaggerDelay: 0.03,
      expandEasing: spring.basic,
      shrinkEasing: spring.basic2,
    },
    bounce: {
      // hideLoopEasing: spring.small,
      hideLoopEasing: spring.quick,
      inEasing: spring.bounce2,
      // loopPreset: "fast",
      loopPreset: "faster",
      // outStaggerDelay: 0.03,
      // inStaggerDelay: 0.03,
      outStaggerDelay: 0.04,
      inStaggerDelay: 0.04,
      expandEasing: spring.basic2,
      shrinkEasing: spring.basic2,
    },
  };
  const hideLoopEasing = presets[props.preset].hideLoopEasing;
  const inEasing = presets[props.preset].inEasing;
  const expandEasing = presets[props.preset].expandEasing;
  const shrinkEasing = presets[props.preset].shrinkEasing;

  const outStaggerDelay = presets[props.preset].outStaggerDelay;
  const inStaggerDelay =
    presets[props.preset].inStaggerDelay + props.addInStaggerDelay;
  const loopingDuration = props.loopingDuration ?? 0.3; // 0.3? 0.4가 최소일듯
  const loopInDelay = 0.03;

  const deps = [
    props.please,
    state,
    props.replay,
    props.rollAllDigits,
    props.quickMode,
    props.hidePreSuffixWhileMoving,
    props.loopingDuration,
    props.fontSize,
    props.fontColor,
    JSON.stringify(props.from),
    JSON.stringify(props.to),
    props.from,
    props.to,
    props.prefix,
    props.suffix,
    props.align,
    props.preset,
    props.delay,
    props.addInStaggerDelay,
  ]; // toIsLargetThenFrom 안넣으면 from/to 바꿔도 div에 바로 반영이 안됨
  const key = JSON.stringify(deps.join("-"));
  console.log(key);

  const [toArrOnlyNum, setToArrOnlyNum] = useState([]);

  useEffect(() => {
    // 쉼표, 마이너스, 온점 무시한 array도 만들어 - Loop 개수 & LoopStartNum 계산에 필요함 - 근데 물음표는 무시하면 안됨
    const fromArrOnlyNum = getDigitsArray(props.from);
    const toArrOnlyNum = getDigitsArray(props.to);
    console.log(isNaN(props.from), isNaN(props.to));
    console.log(props.from, props.to);
    console.log(fromArrOnlyNum, toArrOnlyNum);
    setToArrOnlyNum(toArrOnlyNum);
    // from, to 중에 뭐가 더 큰 값인지 판단 - 모션 up, down 방향에 사용될 기준 (물음표는 9로 대체)
    setToIsLargerThenFrom(
      isToLargerThenFromWithQuestionmark(props.from, props.to)
    );

    // 쉼표 무시 안하고! 자릿수 array도 만들어
    const fromArr = isNaN(props.from)
      ? convertStringToArray(props.from)
      : props.from?.toLocaleString().split("");
    // : props.from?.replace(/\B(?=(\d{3})+(?!\d))/g, ',').split("")
    const toArr = isNaN(props.to)
      ? convertStringToArray(props.to)
      : props.to?.toLocaleString().split("");
    // : props.to?.replace(/\B(?=(\d{3})+(?!\d))/g, ',').split("")
    console.log(fromArr, toArr);

    // from, to 중 뭐가 더 긴지 판단 - 어디에 Loop 개수를 맞출지에 사용될 기준
    // 자릿수가 동일한 경우 일단 숫자값으로 판단.. 사실은 사용된 숫자들 width 비교해서 판단하는게 맞을듯 이거때문에 안드에서 overflow 잘릴 위험도 있어보임 ㅠ 자릿수가 동일한 경우에만 width 직접 계산하는것도 나쁘지 않을지도?
    const toIsLongerThenFrom =
      fromArr.length === toArr.length
        ? isToLargerThenFromWithQuestionmark(props.from, props.to)
        : fromArr.length < toArr.length;

    setToIsLongerThenFrom(toIsLongerThenFrom);
    console.log(
      "isToLonger: ",
      toIsLongerThenFrom,
      "isToLarger: ",
      isToLargerThenFromWithQuestionmark(props.from, props.to)
    );

    // - from, to 각각 자릿수 판별값 보여줄 새로운 array 만들어
    let resultFromArr = [];
    let resultToArr = [];
    let resultFromArrOnlyNum = [];
    let resultToArrOnlyNum = [];

    resultFromArr =
      props.align === "right"
        ? getResultFromArrFromEnd(fromArr, toArr, props.rollAllDigits)
        : getResultFromArr(fromArr, toArr, props.rollAllDigits);

    resultToArr =
      props.align === "right"
        ? getResultToArrFromEnd(fromArr, toArr, props.rollAllDigits)
        : getResultToArr(fromArr, toArr, props.rollAllDigits);

    resultFromArrOnlyNum =
      props.align === "right"
        ? getResultFromArrFromEnd(
            fromArrOnlyNum,
            toArrOnlyNum,
            props.rollAllDigits
          )
        : getResultFromArr(fromArrOnlyNum, toArrOnlyNum, props.rollAllDigits);
    resultToArrOnlyNum =
      props.align === "right"
        ? getResultToArrFromEnd(
            fromArrOnlyNum,
            toArrOnlyNum,
            props.rollAllDigits
          )
        : getResultToArr(fromArrOnlyNum, toArrOnlyNum, props.rollAllDigits);

    setResultFromArr(resultFromArr);
    setResultFromArrOnlyNum(resultFromArrOnlyNum);
    setResultToArr(resultToArr);
    setResultToArrOnlyNum(resultToArrOnlyNum);

    console.log(resultFromArr, resultToArr);
    console.log(resultFromArrOnlyNum, resultToArrOnlyNum);

    // from들의 x값을 계산한 array를 만들어 - translateX 해야될 값 구하기 위해
    const fromPositionArr = generatePositions(fromArr, numWidths);
    setFromPositionArr(fromPositionArr);
    console.log("fromPositionArr: ", fromPositionArr);

    // 로딩중일때 x값을 계산한 array를 만들어
    const loadingPositionArr = generatePositions(
      // toIsLargerThenFrom ? resultToArr : resultFromArr,
      toIsLongerThenFrom ? resultToArr : resultFromArr,
      numWidths
    );
    setLoadingPositionArr(loadingPositionArr);
    console.log("loadingPositionArr: ", loadingPositionArr);

    // fromArr에서 콤마들의 index만 모은 array를 만들어
    const fromArrCommaIndices = findCommaIndices(fromArr);
    console.log("from comma ", fromArrCommaIndices);

    // toArr에서 콤마들의 index만 모은 array를 만들어
    const toArrCommaIndices = findCommaIndices(toArr);
    console.log("to comma ", toArrCommaIndices);
    setToArrCommaIndices(toArrCommaIndices);

    // fromPositionArr에서 숫자들것만 따로 뺀 array 만들어
    const fromPositionArrOnlyNum = removeElementsByIndices(
      fromPositionArr,
      fromArrCommaIndices
    );
    setFromPositionArrOnlyNum(fromPositionArrOnlyNum);
    console.log("fromPositionArrOnlyNum: ", fromPositionArrOnlyNum);

    // loadingPositionArr에서 숫자들것만 따로 뺀 array 만들어
    const loadingPositionArrOnlyNum = removeElementsByIndices(
      loadingPositionArr,
      // toIsLargerThenFrom ? toArrCommaIndices : fromArrCommaIndices
      toIsLongerThenFrom ? toArrCommaIndices : fromArrCommaIndices
    );
    setLoadingPositionArrOnlyNum(loadingPositionArrOnlyNum);
    console.log("loadingPositionArrOnlyNum: ", loadingPositionArrOnlyNum);

    // 로딩 끝난 후 x값을 계산한 array도 만들어
    const endPositionArr = generatePositions(toArr, numWidths);
    setEndPositionArr(endPositionArr);
    console.log("endPositionArr: ", endPositionArr);

    // 로딩 끝난 후 x값에서 숫자들것만 따로 뺀 array도 만들어
    const endPositionArrOnlyNum = removeElementsByIndices(
      endPositionArr,
      toArrCommaIndices
    );
    setEndPositionArrOnlyNum(endPositionArrOnlyNum);
    console.log("endPositionArrOnlyNum: ", endPositionArrOnlyNum);

    // 각 Loop들의 index를 모은 array를 만들어
    const loopIndices = getIndicesOfLoops(
      // fromArr.length < toArr.length ? resultToArrOnlyNum : resultFromArrOnlyNum,
      // toIsLargerThenFrom ? resultToArrOnlyNum : resultFromArrOnlyNum,
      toIsLongerThenFrom ? resultToArrOnlyNum : resultFromArrOnlyNum,
      resultToShowLoops
    );
    setLoopIndices(loopIndices);
    console.log(loopIndices, toIsLongerThenFrom);

    // 각 Loop들의 startNum을 모은 array를 만들어
    const loopStartNums = getStartNumsOfLoops(
      // fromArr.length < toArr.length ? resultToArrOnlyNum : resultFromArrOnlyNum,
      // toIsLargerThenFrom ? resultToArrOnlyNum : resultFromArrOnlyNum,
      toIsLongerThenFrom ? resultToArrOnlyNum : resultFromArrOnlyNum,
      fromArrOnlyNum,
      toArrOnlyNum,
      toIsLargerThenFrom,
      props.align
    );
    setLoopArr(loopStartNums);
    console.log(loopStartNums, props.align);

    const suffixFromPos = calculateSuffixPosition(
      fromArr,
      numWidths,
      fromPositionArr
    );
    setSuffixFromPosition(suffixFromPos);

    const suffixLoadingPos = calculateSuffixPosition(
      // toIsLargerThenFrom ? resultToArr : resultFromArr,
      toIsLongerThenFrom ? resultToArr : resultFromArr,
      numWidths,
      loadingPositionArr
    );
    setSuffixLoadingPosition(suffixLoadingPos);

    const suffixEndPos = calculateSuffixPosition(
      toArr,
      numWidths,
      endPositionArr
    );
    setSuffixEndPosition(suffixEndPos);
    // console.log("suffix pos: ", suffixFromPos, suffixLoadingPos, suffixEndPos);
  }, deps);

  // useEffect(() => {
  //   const a = new SplitType(wrapperRef.current, {type: 'chars'})
  //   tl.current = gsap.timeline().to(a.chars, {y: 20, stagger: 0.1})
  // }, deps)

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // console.log('inEasing is ', inEasing)
      // tl.current = null;

      // from, to 값의 width 구하기 - suffix width가 왤케 안잡히지..
      // const fromValWidth = calculateWidth(props.from?.replace(/\B(?=(\d{3})+(?!\d))/g, ','), numWidths);
      // const toValWidth = calculateWidth(props.to?.replace(/\B(?=(\d{3})+(?!\d))/g, ','), numWidths);
      const fromValWidth = calculateWidth(
        props.from.toLocaleString(),
        numWidths
      );
      const toValWidth = calculateWidth(props.to.toLocaleString(), numWidths);
      const prefixWidth = prefixRef.current.clientWidth;
      const suffixWidth = suffixRef.current.clientWidth;

      // 일단 잘라..
      const fromSplit = new SplitType(q(`.${fromNum}`), { types: "chars" });
      const toSplit = new SplitType(q(`.${toNum}`), { types: "chars" });

      // 같은 모션 적용할 애들끼리 하나의 array로 모아
      const fromSplitCharsOnlyNum = []; // to 자리로 이동시킬 from 숫자들 (콤마 제외)
      const outFromChars = []; // 위로 돌아가면서 나갈 숫자들
      // const hideFromChars = []; // Loop 없이 사라질 자릿수의 나갈 숫자들
      const outFromCommas = []; // 제자리에서 사라질 콤마
      const sameFromChars = []; // 위치 이동 할 똑같이 유지되는 숫자들

      // from 타겟을 부호들 / 숫자들로 나눠
      resultFromArr.forEach((el, i) => {
        if (el === "," || el === "-" || el === ".") {
          // 문장부호 타겟만 모으기
          outFromCommas.push(fromSplit.chars[i]);
        } else {
          // 콤마가 아닌 숫자 타겟만 모으기
          fromSplitCharsOnlyNum.push(fromSplit.chars[i]);
        }
      });

      // from 타겟을 3개로 나눠 - Loop이랑 이어지며 나갈 애, 그냥 사라질 애, 유지될 애
      resultFromArrOnlyNum.forEach((el, i) => {
        if (props.rollAllDigits) {
          outFromChars.push(fromSplitCharsOnlyNum[i]);
        } else {
          if (el === "?" || el === "？" || !isNaN(el)) {
            // el이 숫자인 타겟만 모으기 (변하지 않는 자릿수 타겟만 모으기)
            sameFromChars.push(fromSplitCharsOnlyNum[i]);
          } else {
            // el이 숫자가 아닌 diff, show, hide 타겟만 모으기 (바뀌어야 해서 나갈 자릿수 타겟만 모으기)
            outFromChars.push(fromSplitCharsOnlyNum[i]);
            // if (el === "hide") {
            //   hideFromChars.push(fromSplitCharsOnlyNum[i]);
            // } else {
            //   outFromChars.push(fromSplitCharsOnlyNum[i]);
            // }
          }
        }
      });
      // console.log(outFromCommas, sameFromChars, outFromChars);

      const toSplitCharsOnlyNum = [];
      const inToCommas = [];
      const inToChars = [];
      const sameToChars = [];

      // to 타겟을 부호들 / 숫자들로 나눠
      resultToArr.forEach((el, i) => {
        if (el === "," || el === "-" || el === ".") {
          // 문장부호 타겟만 모으기
          inToCommas.push(toSplit.chars[i]);
        } else {
          // 숫자 타겟만 모으기
          toSplitCharsOnlyNum.push(toSplit.chars[i]);
        }
      });

      // to 타겟을 2개로 나눠 - 새로 생길 애, 유지될 애(유지될애는 안씀)
      resultToArrOnlyNum.forEach((el, i) => {
        if (props.rollAllDigits) {
          inToChars.push(toSplitCharsOnlyNum[i]);
        } else {
          if (el === "?" || el === "？" || !isNaN(el)) {
            sameToChars.push(toSplitCharsOnlyNum[i]);
          } else {
            inToChars.push(toSplitCharsOnlyNum[i]);
          }
        }
      });

      gsap.set(toSplit.chars, { opacity: 0 });
      gsap.set(wrapperRef.current, {
        width: prefixWidth + fromValWidth + suffixWidth,
        // width: prefixWidth + toValWidth + suffixWidth // framer에서만 toValWidth로 변경
      });

      props.align !== "right" &&
        gsap.set(suffixRef.current, { x: suffixFromPosition });

      tl.current = gsap.timeline({
        // paused: true,
        delay: props.delay,
      });

      toIsLargerThenFrom
        ? (outFromCharsMotion.current = gsap.to(outFromChars, {
            rotateX: 60,
            y: "-50%",
            opacity: 0,
            stagger: {
              from: props.align === "right" ? "end" : 0,
              each: props.quickMode ? 0.03 : outStaggerDelay,
            },
            ...spring.small,
          }))
        : props.quickMode
        ? (outFromCharsMotion.current = gsap.to(outFromChars, {
            rotateX: -60,
            y: "50%",
            opacity: 0,
            stagger: {
              from: props.align === "right" ? "end" : 0,
              each: function (index, target, list) {
                return resultFromArrOnlyNum[index] === "hide" // 퀵모드에서 28,834,229원에서 0원으로 될때, 원이 이동한 뒤로 out된 숫자들 잔상 보이는거 막기 위해 추가된 모션
                  ? 0
                  : index * (props.quickMode ? 0.03 : outStaggerDelay);
              },
            },
            ...spring.quick,
          }))
        : (outFromCharsMotion.current = gsap.to(outFromChars, {
            rotateX: -60,
            y: "50%",
            opacity: 0,
            stagger: {
              from: props.align === "right" ? "end" : 0,
              each: props.quickMode ? 0.03 : outStaggerDelay,
            },
            ...spring.small,
          }));

      outFromCommaMotion.current = gsap.to(outFromCommas, {
        opacity: 0,
        ...spring.rapid,
      });

      repositionLoopsMotion.current = gsap.to(q(`.${loopContainerStyle}`), {
        x: function (i) {
          return toIsLongerThenFrom
            ? endPositionArrOnlyNum[loopIndices[i]]
            : fromPositionArrOnlyNum[loopIndices[i]];
        },
        duration: 0,
      });

      showLoopsMotion.current = gsap.fromTo(
        q(`.${loopContainerStyle}`),
        {
          opacity: 0,
        },
        {
          opacity: 1,
          stagger: {
            from: props.align === "right" ? "end" : 0,
            each: outStaggerDelay,
          },
          delay: loopInDelay,
          ...spring.rapid,
        }
      );

      showToCommaMotion.current = gsap.fromTo(
        inToCommas,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          // 이 stagger 안하면 0에서 -100,000,000.00 이런거 될때 쉼표랑 부호들이 너무 먼저 보임
          stagger: function (i) {
            // console.log(toArrCommaIndices, endPositionArr);
            return props.align === "right"
              ? (endPositionArr.length - 1 - toArrCommaIndices[i]) *
                  (props.quickMode ? 0.03 : inStaggerDelay)
              : toArrCommaIndices[i] *
                  (props.quickMode ? 0.03 : inStaggerDelay);
          },
          // ...(props.quickMode ? quickModeEasing : expandEasing)
          ...expandEasing,
        }
      );

      // toIsLargerThenFrom
      toIsLongerThenFrom
        ? (hideLoopsMotion.current = gsap.to(q(`.${loopContainerStyle}`), {
            opacity: 0,
            stagger: {
              from: props.align === "right" ? "end" : 0,
              each: inStaggerDelay,
            },
            ...hideLoopEasing,
          }))
        : (hideLoopsMotion.current = gsap.to(q(`.${loopContainerStyle}`), {
            opacity: 0,
            stagger: {
              from: props.align === "right" ? "end" : 0,
              each: function (index, target, list) {
                // console.log(resultFromArrOnlyNum[index]);
                return resultFromArrOnlyNum[index] === "hide" // 28,834,229원에서 0원으로 될때, 원이 이동한 뒤로 loop이 보이는거 막기 위해 추가된 모션
                  ? 0
                  : index * inStaggerDelay;
              },
            },
            ...hideLoopEasing,
          }));

      // 숫자가 늘어날땐 뒷자리가 너무 빨리 사라져서 공백이 보여서 별로라 줄어들때만
      // toIsLongerThenFrom
      //   ? (hideLoopsGroupMotion.current = null)
      //   : (hideLoopsGroupMotion.current = gsap.to(q(`.loopsGroup`), {
      //       opacity: 0,
      //       ...hideLoopEasing
      //     }));

      repositionFromSameCharsMotion.current = gsap.to(fromSplitCharsOnlyNum, {
        x: function (i) {
          // 앞에 등장시 translateX랑 연결돼서, loading이 아니라 from에서 빼줘야 제대로 이동함
          if (props.align === "right") {
            const fromReversed = fromPositionArrOnlyNum.toReversed();
            const endReversed = endPositionArrOnlyNum.toReversed();
            const widthDiff = fromValWidth - toValWidth;
            const map = fromReversed?.map((n, i) => {
              return endReversed[i] - n + widthDiff;
            });
            const mapReversed = map?.toReversed();
            return mapReversed[i];
          } else {
            return endPositionArrOnlyNum[i] - fromPositionArrOnlyNum[i];
          }
        },
        ...(toIsLongerThenFrom ? expandEasing : shrinkEasing),
        // ...(props.quickMode
        //   ? quickModeEasing
        //   : toIsLongerThenFrom
        //   ? expandEasing
        //   : shrinkEasing)
      });

      repositionToCommaMotion.current = gsap.to(inToCommas, {
        x: 0,
        // ...(props.quickMode ? quickModeEasing : expandEasing)
        ...expandEasing,
      });

      toIsLargerThenFrom
        ? (showToCharsMotion.current = gsap.fromTo(
            inToChars,
            { rotateX: -50, opacity: 0, y: "50%" }, // loop이랑 y움직임이 달라서 rotate값도 더 줄여야 자연스러움
            {
              rotateX: 0,
              opacity: 1,
              y: "0%",
              stagger: {
                from: props.align === "right" ? "end" : 0,
                each: props.quickMode ? 0.03 : inStaggerDelay,
              },
              ...inEasing,
            }
          ))
        : (showToCharsMotion.current = gsap.fromTo(
            inToChars,
            { rotateX: 50, opacity: 0, y: "-50%" },
            {
              rotateX: 0,
              opacity: 1,
              y: "0%",
              stagger: {
                from: props.align === "right" ? "end" : 0,
                each: props.quickMode ? 0.03 : inStaggerDelay,
              },
              ...inEasing,
            }
          ));

      if (props.hidePreSuffixWhileMoving) {
        if (props.align !== "right") {
          hidePreSuffixMotion.current = gsap.to(q(`.${suffix}`), {
            opacity: 0,
            ...spring.rapid,
          });
          showPreSuffixMotion.current = gsap.fromTo(
            q(`.${suffix}`),
            {
              x: toIsLongerThenFrom
                ? suffixEndPosition - 6
                : suffixEndPosition + 6,
            },
            {
              opacity: 1,
              x: suffixEndPosition,
              immediateRender: false,
              ...inEasing,
            }
          );
        } else {
          hidePreSuffixMotion.current = gsap.to(q(`.${prefix}`), {
            opacity: 0,
            ...spring.rapid,
          });
          showPreSuffixMotion.current = gsap.to(q(`.${prefix}`), {
            opacity: 1,
            ...spring.rapid,
          });
        }
      } else {
        hidePreSuffixMotion.current = null;
        showPreSuffixMotion.current = null;
      }

      !props.hidePreSuffixWhileMoving && props.align !== "right"
        ? (moveSuffixToEndMotion.current = gsap.to(q(`.${suffix}`), {
            x: suffixEndPosition,
            // delay: props.quickMode
            //   ? 0
            //   : // : toIsLargerThenFrom
            //   toIsLongerThenFrom
            //   ? 0
            //   : Math.max(0, endPositionArrOnlyNum.length - 2) * inStaggerDelay, // 28,845,249에서 12,911,141처럼 자릿수는 똑같은데 숫자폭이 줄어들어서 suffix가 당겨지는 경우, 이 delay가 없으면 suffix랑 loop이랑 겹쳐보임 - 근데 다시 없애보니 괜찮은거같아서 일단 없앰..
            ...(toIsLongerThenFrom ? expandEasing : shrinkEasing),
          }))
        : (moveSuffixToEndMotion.current = null);

      !props.hidePreSuffixWhileMoving && props.align === "right"
        ? toIsLongerThenFrom
          ? (movePrefixToEndMotion.current = gsap.from(q(`.${prefix}`), {
              x: toValWidth - fromValWidth,
              immediateRender: false,
              ...expandEasing,
            }))
          : (movePrefixToEndMotion.current = gsap.to(q(`.${prefix}`), {
              x: fromValWidth - toValWidth,
              ...shrinkEasing,
            }))
        : (movePrefixToEndMotion.current = null);

      if (props.align === "center") {
        // // 프레이머에서만 width 바뀌는거 disable
        // changeWidthMotion.current = null;
        toIsLongerThenFrom
          ? (changeWidthMotion.current = gsap.to(wrapperRef.current, {
              width: prefixWidth + toValWidth + suffixWidth,
              x: (toValWidth - fromValWidth) / 2,
              duration: 0.001,
            }))
          : (changeWidthMotion.current = gsap.to(wrapperRef.current, {
              width: prefixWidth + toValWidth + suffixWidth,
              x: 0,
              duration: 0.001,
            }));

        toIsLongerThenFrom
          ? (repositionAllByAlignMotion.current = gsap.to(wrapperRef.current, {
              x: 0,
              // ...(props.quickMode ? quickModeEasing : expandEasing)
              ...expandEasing,
            }))
          : (repositionAllByAlignMotion.current = gsap.to(wrapperRef.current, {
              x: (fromValWidth - toValWidth) / 2,
              // ...(props.quickMode ? quickModeEasing : shrinkEasing)
              ...shrinkEasing,
            }));
      } else if (props.align === "right") {
        repositionAllByAlignMotion.current = null;
        // // 프레이머에서만 width, prefix 바뀌는거 disable
        // changeWidthMotion.current = null;
        // resetPrefixToEndMotion.current = null;

        !toIsLongerThenFrom
          ? (resetPrefixToEndMotion.current = gsap.to(q(`.${prefix}`), {
              x: 0,
              duration: 0.001,
            }))
          : (resetPrefixToEndMotion.current = null);

        toIsLongerThenFrom
          ? (changeWidthMotion.current = gsap.to(wrapperRef.current, {
              width: prefixWidth + toValWidth + suffixWidth,
              duration: 0.001,
            }))
          : (changeWidthMotion.current = gsap.to(wrapperRef.current, {
              width: prefixWidth + toValWidth + suffixWidth,
              x: 0,
              duration: 0.001,
            }));
      } else {
        // left 일 때
        repositionAllByAlignMotion.current = null;
        toIsLongerThenFrom
          ? (changeWidthMotion.current = gsap.to(wrapperRef.current, {
              width: prefixWidth + toValWidth + suffixWidth,
              duration: 0.001,
            }))
          : (changeWidthMotion.current = gsap.to(wrapperRef.current, {
              width: prefixWidth + toValWidth + suffixWidth,
              duration: 0.001,
            }));
      }

      if (props.quickMode) {
        toIsLongerThenFrom
          ? tl.current
              ?.addLabel("outFrom")
              .add(changeWidthMotion.current, "outFrom")
              .add(repositionAllByAlignMotion.current, "outFrom")
              .add(outFromCharsMotion.current, "outFrom")
              .add(outFromCommaMotion.current, "outFrom")
              .add(repositionFromSameCharsMotion.current, "outFrom")
              .add(repositionToCommaMotion.current, "outFrom")
              .add(moveSuffixToEndMotion.current, "outFrom")
              .add(movePrefixToEndMotion.current, "outFrom")
              .addLabel("showTo", "outFrom+=0.05")
              .add(showToCommaMotion.current, "showTo")
              .add(showToCharsMotion.current, "showTo")
          : tl.current
              ?.addLabel("outFrom")
              .add(repositionAllByAlignMotion.current, "outFrom")
              .add(outFromCharsMotion.current, "outFrom")
              .add(outFromCommaMotion.current, "outFrom")
              .addLabel("showTo", "outFrom+=0.05")
              .add(showToCommaMotion.current, "showTo")
              .add(repositionFromSameCharsMotion.current, "showTo")
              .add(repositionToCommaMotion.current, "showTo")
              .add(moveSuffixToEndMotion.current, "showTo")
              .add(movePrefixToEndMotion.current, "showTo")
              .add(showToCharsMotion.current, "showTo")
              .addLabel("endMotion")
              .add(changeWidthMotion.current, "endMotion")
              .add(resetPrefixToEndMotion.current, "endMotion");
      } else {
        toIsLongerThenFrom
          ? tl.current
              ?.addLabel("outFrom")
              .add(changeWidthMotion.current, "outFrom")
              .add(repositionAllByAlignMotion.current, "outFrom")
              .add(outFromCharsMotion.current, "outFrom")
              .add(outFromCommaMotion.current, "outFrom")
              .add(hidePreSuffixMotion.current, "outFrom")
              .addLabel("repositionAllDigits", "outFrom")
              .add(repositionFromSameCharsMotion.current, "outFrom") // 다름
              .add(repositionToCommaMotion.current, "outFrom") // 다름
              .add(moveSuffixToEndMotion.current, "outFrom") // 다름
              .add(movePrefixToEndMotion.current, "outFrom") // 다름
              .add(repositionLoopsMotion.current, "repositionAllDigits")
              .add(showLoopsMotion.current, "repositionAllDigits")
              .addLabel("showComma", "repositionAllDigits")
              .add(showToCommaMotion.current, "showComma")
              .addLabel("endLooping", `outFrom+=${loopingDuration}`)
              .addLabel("repositionToEnd", "endLooping")
              .addLabel("hideLoop", "endLooping")
              .addLabel("showTo", "endLooping")
              .add(hideLoopsMotion.current, "hideLoop")
              .add(hideLoopsGroupMotion.current, "hideLoop")

              .add(showToCharsMotion.current, "showTo")
              .add(showPreSuffixMotion.current, "showTo")
          : tl.current // from자릿수 > to자릿수 인 경우 - 숫자가 줄어드는 경우
              ?.addLabel("outFrom")
              .add(outFromCharsMotion.current, "outFrom")
              .addLabel("repositionAllDigits", "outFrom")
              .add(repositionLoopsMotion.current, "repositionAllDigits")
              .add(showLoopsMotion.current, "repositionAllDigits")
              .addLabel("endLooping", `outFrom+=${loopingDuration}`)
              .addLabel("repositionToEnd", "endLooping")
              .addLabel("hideLoop", "endLooping")
              .addLabel("showTo", "endLooping")
              .add(outFromCommaMotion.current, "endLooping")
              .add(hidePreSuffixMotion.current, "endLooping")
              .add(showToCommaMotion.current, "endLooping")
              .add(hideLoopsMotion.current, "hideLoop")
              .add(hideLoopsGroupMotion.current, "hideLoop")
              .add(repositionAllByAlignMotion.current, "repositionToEnd")
              .add(repositionFromSameCharsMotion.current, "repositionToEnd")
              .add(repositionToCommaMotion.current, "repositionToEnd")
              .add(moveSuffixToEndMotion.current, "repositionToEnd")
              .add(movePrefixToEndMotion.current, "repositionToEnd")
              .add(showToCharsMotion.current, "showTo")
              .add(showPreSuffixMotion.current, "showTo+=0.1")
              .addLabel("endMotion")
              .add(changeWidthMotion.current, "endMotion")
              .add(resetPrefixToEndMotion.current, "endMotion");
      }
    });

    return () => {
      ctx.revert();
    };
  }, deps);

  useEffect(() => {
    tl.current?.restart(true, false);
    gsap.delayedCall(props.delay + loopInDelay, () => {
      setPlayLoop(!playLoop);
    });
  }, deps);

  useEffect(() => {
    setState(!state);
  }, []);

  // useEffect(() => {
  //   setLocaleFrom(props.from?.replace(/\B(?=(\d{3})+(?!\d))/g, ','))
  //   setLocaleTo(props.to?.replace(/\B(?=(\d{3})+(?!\d))/g, ','))
  // }, [props.from, props.to])

  // console.log(props.to?.toLocaleString())
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        justifyContent:
          props.align === "center"
            ? "center"
            : props.align === "left"
            ? "start"
            : "end",
        width: "100%",
        height: "100%",
      }}
    >
      <div
        // onClick={() => setState(!state)}
        key={key}
        ref={wrapperRef}
        style={{
          position: "relative",
          fontSize: props.fontSize,
          fontWeight: "bold",
          color: props.fontColor,
          fontFamily: "Toss Product Sans",
          // border: "1px solid red",
          display: "flex",
          // maxWidth: "fit-content"
        }}
      >
        <div ref={prefixRef} className={prefix}>
          {/* {props.prefix}&nbsp; */}
          {props.prefix}
        </div>
        <div
          style={{
            position: "relative",
            display: "flex",
            ...(props.align === "right" && {
              flex: 1,
              justifyContent: "end",
            }),
          }}
        >
          <div
            className={fromNum}
            style={{
              left: props.align === "right" ? "unset" : 0,
              // color: "red"
            }}
          >
            {props.from && props.from?.toLocaleString()}
            {/* {localeFrom} */}
            {/* {props.from?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} */}
          </div>
          <div
            className="loopsGroup"
            style={{
              position: "absolute",
              display: "flex",
              flexDirection: "column",
              top: 0,
              left: 0,
            }}
          >
            {!props.quickMode &&
              loopArr.map((n, i) => {
                return (
                  <Loop
                    key={i}
                    i={i}
                    play={playLoop}
                    // preset={presets[props.preset].loopPreset}
                    preset={i%2 === 0 ? 'faster' : 'fast'}
                    fontSize={props.fontSize}
                    startNum={n}
                    please={props.please}
                    endNum={toArrOnlyNum[loopIndices[i]]}
                    // align에 따라서 stagger 시작하는 순서도 반대로 해줘야 함
                    startStaggerDelay={
                      props.align === "right"
                        ? outStaggerDelay * (loopArr.length - 1 - i)
                        : outStaggerDelay * i
                    }
                    toIsLargerThenFrom={toIsLargerThenFrom}
                  />
                );
              })}
          </div>
          <div
            className={toNum}
            style={{ left: props.align === "right" ? "unset" : 0 }}
          >
            {props.to && props.to?.toLocaleString()}
            {/* {localeTo} */}
            {/* {props.to?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} */}
          </div>
        </div>
        <div ref={suffixRef} className={suffix}>
          {props.suffix}
        </div>
      </div>
    </div>
  );
}

addPropertyControls(AnimateNumber, {
  replay: {
    type: ControlType.Boolean,
    defaultValue: true,
  },
  rollAllDigits: {
    type: ControlType.Boolean,
    defaultValue: false,
  },
  quickMode: {
    type: ControlType.Boolean,
    defaultValue: false,
  },
  hidePreSuffixWhileMoving: {
    type: ControlType.Boolean,
    defaultValue: false,
  },
  please: {
    type: ControlType.Boolean,
    defaultValue: false,
  },
  addInStaggerDelay: {
    type: ControlType.Enum,
    defaultValue: 0,
    options: [0, 0.1, 0.3],
    displaySegmentedControl: true,
  },
  delay: {
    type: ControlType.Number,
    defaultValue: 0,
    step: 0.1,
    displayStepper: true,
  },
  loopingDuration: {
    type: ControlType.Number,
    defaultValue: 0.9,
    step: 0.1,
    displayStepper: true,
  },
  fontSize: {
    type: ControlType.Number,
    defaultValue: 24,
    step: 1,
    displayStepper: true,
  },
  fontColor: {
    type: ControlType.Color,
    defaultValue: "#3182F6",
  },
  from: {
    type: ControlType.Number,
    defaultValue: 0,
    step: 1,
    displayStepper: true,
  },
  to: {
    type: ControlType.Number,
    defaultValue: 1000,
    step: 1,
    displayStepper: true,
  },
  // from: {
  //   type: ControlType.String,
  //   defaultValue: "1000",
  // },
  // to: {
  //   type: ControlType.String,
  //   defaultValue: "1000",
  // },
  prefix: {
    type: ControlType.String,
    defaultValue: "",
  },
  suffix: {
    type: ControlType.String,
    defaultValue: "원",
  },
  align: {
    type: ControlType.Enum,
    defaultValue: "left",
    options: ["left", "center", "right"],
    displaySegmentedControl: true,
  },
  preset: {
    type: ControlType.Enum,
    defaultValue: "normal",
    options: ["normal", "slow", "bounce"],
    displaySegmentedControl: true,
  },
});
