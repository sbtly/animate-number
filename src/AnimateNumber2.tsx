import { useEffect, useRef, useState, useLayoutEffect, useMemo } from "react";
import { addPropertyControls, ControlType } from "framer";
import { gsap, springs as spring } from "./utils/gsap/gsap";
import SplitType from "split-type";
import { css } from "@emotion/css";

import Stack, { stack } from "./Stack";
import {
  findCommaIndices,
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
  findEtcIndices,
  findSignIndices,
  findDotIndices,
  addCommasToString,
  countStagger,
  countStaggerFromEnd,
  indicesOf,
} from "./utils/stack-functions";

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

export function AnimateNumber2(props) {
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

  const from = props.from ?? 0;
  const to = props.to ?? 1000;
  const rollAllDigits = props.rollAllDigits ?? false;

  const resultToShowLoops = ["diff", "show", "hide"];

  const fontSize = props.fontSize ?? 50;
  const numWidths = getNumWidthsWhenBold(fontSize);

  const mode = props.mode;
  const loopCount = props.mode === "custom" ? props.loopCount : 1; // 최소 3은 되어야 함..

  const presets = {
    quickNormal: {
      stagger: 0.035,
      hideStagger: 0.01,
      stackEasing: spring.medium,
      // moveEasing: spring.small,
      moveEasing: spring.quick,
      // moveEasing: {
      //   ease: "expo",
      //   duration: 0.35
      // },
      showEasing: spring.small,
      hideEasing: spring.rapid,
      expandEasing: (length) => {
        return {
          ease: "expo",
          // duration: loopCount * 0.2 + length * 0.03
          duration: 0.5 + length * 0.02,
        };
      },
      shrinkEasing: (length) => {
        return { ease: "expo", duration: 0.4 + length * 0.01 };
        // return spring.small;
      },
    },
    quickBounce: {
      stagger: 0.035,
      hideStagger: 0.01,
      stackEasing: spring.bounce3,
      // moveEasing: spring.small,
      moveEasing: spring.quick,
      // moveEasing: {
      //   ease: "expo",
      //   duration: 0.35
      // },
      showEasing: spring.small,
      hideEasing: spring.rapid,
      expandEasing: (length) => {
        return {
          ease: "expo",
          // duration: loopCount * 0.2 + length * 0.03
          duration: 0.4 + length * 0.02,
        };
      },
      shrinkEasing: (length) => {
        return { ease: "expo", duration: 0.35 + length * 0.01 };
        // return spring.small;
      },
    },
    basicNormal: {
      stagger: 0.04,
      hideStagger: 0.03,
      stackEasing: spring.basic,
      moveEasing: spring.small,
      // moveEasing: spring.quick,
      // moveEasing: {
      //   ease: "expo",
      //   duration: 0.4
      // },
      showEasing: spring.basic,
      hideEasing: spring.rapid,
      expandEasing: (length) => {
        return {
          ease: "expo",
          duration: 0.6 + length * 0.05,
        };
      },
      shrinkEasing: (length) => {
        return {
          ease: "expo",
          // duration: loopCount * 0.8 + length * 0.01
          duration: 0.55 + length * 0.06,
        };
      },
    },
    basicBounce: {
      stagger: 0.04,
      hideStagger: 0.03,
      stackEasing: spring.bounce2,
      // moveEasing: spring.small,
      moveEasing: spring.quick,
      // moveEasing: {
      //   ease: "expo",
      //   duration: 0.4
      // },
      showEasing: spring.small,
      hideEasing: spring.rapid,
      expandEasing: (length) => {
        return {
          ease: "expo",
          duration: 0.6 + length * 0.05,
        };
      },
      shrinkEasing: (length) => {
        return {
          ease: "expo",
          // duration: loopCount * 0.8 + length * 0.01
          duration: 0.55 + length * 0.06,
        };
      },
    },
    custom: {
      stagger: 0.05,
      hideStagger: 0.04,
      stackEasing: {
        ease: "expo",
        duration: loopCount * 0.6,
      },
      moveEasing: {
        ease: "expo",
        duration: loopCount * 0.6,
      },
      showEasing: {
        ease: "expo",
        duration: loopCount * 0.6,
      },
      hideEasing: {
        ease: "expo",
        duration: loopCount * 0.1,
      },
      expandEasing: (length) => {
        return {
          ease: "expo",
          // duration: loopCount * 0.6 + length * 0.05
          // duration: loopCount * 0.35 + length * 0.05
          duration: 0.9 + loopCount * 0.08 + length * 0.04,
        };
      },
      shrinkEasing: (length) => {
        return {
          ease: "expo",
          // duration: loopCount * 0.6 - length * 0.04
          // duration: loopCount * 0.6 + length * 0.04
          duration: 0.7 + loopCount * 0.02 + length * 0.1,
          // duration: length * 0.2 + length * 0.04
        };
      },
    },
  };

  const delay = props.delay;
  const preset = presets[mode];

  const stagger = preset?.stagger;
  const hideStagger = preset?.hideStagger;
  const stackEasing = preset?.stackEasing;
  const moveEasing = preset?.moveEasing;
  const showEasing = preset?.showEasing;
  const hideEasing = preset?.hideEasing;
  const expandEasing = preset?.expandEasing;
  const shrinkEasing = preset?.shrinkEasing;

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
    props.addInStaggerDelay,
  ]; // toIsLargetThenFrom 안넣으면 from/to 바꿔도 div에 바로 반영이 안됨
  const key = JSON.stringify(deps.join("-"));

  useEffect(() => {
    // from, to 중에 뭐가 더 큰 값인지 판단 - 모션 up, down 방향에 사용될 기준 (물음표는 9로 대체)
    const toIsLargerThenFrom = isToLargerThenFromWithQuestionmark(from, to);
    setToIsLargerThenFrom(toIsLargerThenFrom);

    // 자릿수별 array를 만들어서 (문장부호 다 포함)
    const fromArr = isNaN(from)
      ? convertStringToArray(addCommasToString(from))
      : from.toLocaleString().split("");
    const toArr = isNaN(to)
      ? convertStringToArray(addCommasToString(to))
      : to.toLocaleString().split("");
    setFromArr(fromArr);
    setToArr(toArr);
    console.log("fromArr: ", fromArr, ", toArr: ", toArr);

    // from들의 x값을 계산한 array를 만들어 - translateX 해야될 값 구하기 위해
    const fromPositionArr = generatePositions(fromArr, numWidths);
    setFromPositionArr(fromPositionArr);
    console.log("fromPositionArr: ", fromPositionArr);

    // to들의 x값을 계산한 array도 만들어
    const endPositionArr = generatePositions(toArr, numWidths);
    setEndPositionArr(endPositionArr);
    console.log("endPositionArr: ", endPositionArr);

    // fromArr에서 부호들의 index만 모은 array를 만들어
    const fromArrSignsIndices = findSignIndices(fromArr);
    // setFromArrSignsIndices(fromArrSignsIndices);
    console.log("from etc ", fromArrSignsIndices);

    // toArr에서 부호들의 index만 모은 array를 만들어
    const toArrSignsIndices = findSignIndices(toArr);
    // setToArrSignsIndices(toArrSignsIndices);
    console.log("to etc ", toArrSignsIndices);

    // fromPositionArr에서 숫자들것만 따로 뺀 array 만들어 (Stack들 위치 계산에 필요)
    const fromPositionArrOnlyNum = removeElementsByIndices(
      fromPositionArr,
      fromArrSignsIndices
    );
    setFromPositionArrOnlyNum(fromPositionArrOnlyNum);
    console.log("fromPositionArrOnlyNum: ", fromPositionArrOnlyNum);

    // to들의 x값에서 숫자들것만 따로 뺀 array도 만들어 (Stack들 위치 계산에 필요)
    const endPositionArrOnlyNum = removeElementsByIndices(
      endPositionArr,
      toArrSignsIndices
    );
    setEndPositionArrOnlyNum(endPositionArrOnlyNum);
    console.log("endPositionArrOnlyNum: ", endPositionArrOnlyNum);

    // 문장부호 다 빼고 숫자들만으로 array 만들어서 (물음표는 무시안하고)
    const fromArrOnlyNum = getDigitsArray(from);
    const toArrOnlyNum = getDigitsArray(to);
    setFromArrOnlyNum(fromArrOnlyNum);
    setToArrOnlyNum(toArrOnlyNum);
    console.log(
      "fromArrOnlyNum: ",
      fromArrOnlyNum,
      ", toArrOnlyNum: ",
      toArrOnlyNum
    );
    const toIsLongerThenFrom = fromArrOnlyNum.length < toArrOnlyNum.length;

    // 전체 아이템간/숫자들간 비교해서 동일한 자릿수(해당 자릿수 문자), 달라지는 자릿수(diff), 사라지는 자릿수(hide), 새로 등장하는 자릿수(show)로 구분한 array 만들기
    let resultFromArr = [];
    let resultToArr = [];
    let resultFromArrOnlyNum = [];
    let resultToArrOnlyNum = [];

    resultFromArr =
      props.align === "right"
        ? getResultFromArrFromEnd(fromArr, toArr, rollAllDigits)
        : getResultFromArr(fromArr, toArr, rollAllDigits);

    resultToArr =
      props.align === "right"
        ? getResultToArrFromEnd(fromArr, toArr, rollAllDigits)
        : getResultToArr(fromArr, toArr, rollAllDigits);

    setResultFromArr(resultFromArr);
    setResultToArr(resultToArr);
    console.log(
      "resultFromArr: ",
      resultFromArr,
      ", resultToArr: ",
      resultToArr
    );

    resultFromArrOnlyNum =
      props.align === "right"
        ? getResultFromArrFromEnd(fromArrOnlyNum, toArrOnlyNum, rollAllDigits)
        : getResultFromArr(fromArrOnlyNum, toArrOnlyNum, rollAllDigits);
    resultToArrOnlyNum =
      props.align === "right"
        ? getResultToArrFromEnd(fromArrOnlyNum, toArrOnlyNum, rollAllDigits)
        : getResultToArr(fromArrOnlyNum, toArrOnlyNum, rollAllDigits);

    setResultFromArrOnlyNum(resultFromArrOnlyNum);
    setResultToArrOnlyNum(resultToArrOnlyNum);
    console.log(
      "resultFromArrOnlyNum: ",
      resultFromArrOnlyNum,
      ", resultToArrOnlyNum: ",
      resultToArrOnlyNum
    );

    // from, to중에 긴 걸 기준으로, diff/show/hide인 자릿수들의 index 모으기 - 이 위치들에 Stack 생성해야함
    const loopIndices = getIndicesOfLoops(
      // toIsLongerThenFrom ? resultToArrOnlyNum : resultFromArrOnlyNum, (TODO: 뭔가 문제면 이거 해보기)
      // fromArr.length < toArr.length ? resultToArrOnlyNum : resultFromArrOnlyNum,
      toIsLongerThenFrom ? resultToArrOnlyNum : resultFromArrOnlyNum,
      resultToShowLoops
    );
    setLoopIndices(loopIndices);
    console.log(
      "loopIndices: ",
      loopIndices,
      ", from길이 < to길이: ",
      fromArr.length < toArr.length
    );

    // 각 stack들의 startNum 구하기 (align을 고려해서)
    const loopStartNums = getStartNumsOfLoops(
      toIsLongerThenFrom ? resultToArrOnlyNum : resultFromArrOnlyNum,
      fromArrOnlyNum,
      toArrOnlyNum,
      props.align
    );
    setLoopStartNums(loopStartNums);
    console.log("loopStartNums: ", loopStartNums);

    // 각 stack들의 endNum 구하기 (align을 고려해서)
    const loopEndNums = getEndNumsOfLoops(
      toIsLongerThenFrom ? resultToArrOnlyNum : resultFromArrOnlyNum,
      fromArrOnlyNum,
      toArrOnlyNum,
      props.align
    );
    setLoopEndNums(loopEndNums);
    console.log("loopEndNums: ", loopEndNums);

    const suffixFromPos = calculateSuffixPosition(
      fromArr,
      numWidths,
      fromPositionArr
    );
    setSuffixFromPosition(suffixFromPos);

    const suffixEndPos = calculateSuffixPosition(
      toArr,
      numWidths,
      endPositionArr
    );
    setSuffixEndPosition(suffixEndPos);
  }, deps);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // from, to 각 자리수별 width 합계 구하기
      const fromValWidth = calculateWidth(
        isNaN(from) ? addCommasToString(from) : from.toLocaleString(), // 소수점 둘째자리까지만 지원함
        numWidths
      );
      const toValWidth = calculateWidth(
        isNaN(to) ? addCommasToString(to) : to.toLocaleString(),
        numWidths
      );

      const toHasLongerWidthThenFrom = fromValWidth < toValWidth;

      const prefixWidth = prefixRef.current?.clientWidth;
      const suffixWidth = suffixRef.current?.clientWidth;

      // 일단 잘라..
      const fromSplit = new SplitType(q(`.${fromNum}`), { types: "chars" });
      const toSplit = new SplitType(q(`.${toNum}`), { types: "chars" });

      // fromSplit 타겟중에서 부호와, 숫자로 나누고 -> 숫자를 다시 유지될 숫자, 아닌 숫자 구분하기
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
        if (el === "?" || el === "？" || !isNaN(el)) {
          fromSplitSameNumbers.push(fromSplitNumbers[i]);
          fromSplitSameNumbersIndices.push(i);
        } else {
          fromSplitDiffNumbers.push(fromSplitNumbers[i]);
        }
      });
      console.log("fromSplitSameNumbers", fromSplitSameNumbers);
      console.log("fromSplitSameNumbersIndices", fromSplitSameNumbersIndices);

      // from, to 각각 dash 있는지 판별
      const fromHasDash = fromArr[0] === "-";
      const toHasDash = toArr[0] === "-";

      // dash 상태
      let dashResult;
      let dashTarget;
      if (fromHasDash && toHasDash) {
        dashResult = "same";
        dashTarget = fromSplit.chars[0]; // 유지되면 from의 dash 사용하기
      } else if (fromHasDash) {
        dashResult = "hide";
        dashTarget = fromSplit.chars[0]; // 사라지면 from의 dash 사용하기
      } else if (toHasDash) {
        dashResult = "show";
        dashTarget = toSplit.chars[0]; // 등장하면 to의 dash 사용하기
      } else {
        dashResult = "none";
      }
      console.log("dashResult: ", dashResult, ", dashTarget: ", dashTarget);

      // from, to 각각 dot 있는지 판별
      const fromDotIndex = fromArr.indexOf(".");
      const toDotIndex = toArr.indexOf(".");
      const fromHasDot = fromDotIndex !== -1;
      const toHasDot = toDotIndex !== -1;
      console.log("fromDotIndex: ", fromDotIndex, ", toDotIndex: ", toDotIndex);
      console.log("fromHasDot: ", fromHasDot, ", toHasDot: ", toHasDot);

      // dot 상태
      let dotResult;
      let dotTarget;
      if (fromHasDot && toHasDot) {
        dotResult = "same";
        dotTarget = fromSplit.chars[fromDotIndex]; // 유지되면 from의 dash 사용하기
      } else if (fromHasDot) {
        dotResult = "hide";
        dotTarget = fromSplit.chars[fromDotIndex]; // 사라지면 from의 dash 사용하기
      } else if (toHasDot) {
        dotResult = "show";
        dotTarget = toSplit.chars[toDotIndex]; // 등장하면 to의 dash 사용하기
      } else {
        dotResult = "none";
      }
      console.log("dotResult: ", dotResult, ", dotTarget: ", dotTarget);

      // 콤마 모으기
      const fromCommaIndices =
        props.align === "right"
          ? indicesOf(fromArr, ",").toReversed()
          : indicesOf(fromArr, ",");
      const toCommaIndices =
        props.align === "right"
          ? indicesOf(toArr, ",").toReversed()
          : indicesOf(toArr, ",");

      console.log(
        "fromCommaIndices: ",
        fromCommaIndices,
        ", toCommaIndices: ",
        toCommaIndices
      );

      // from, to 둘중에 긴걸 기준으로 비교해서 result 만들기
      const fromHasMoreComma = fromCommaIndices.length > toCommaIndices.length;
      const hasMoreCommaArr = fromHasMoreComma
        ? fromCommaIndices
        : toCommaIndices;
      let sameCommaTarget = [];
      let showCommaTarget = [];
      let showCommaTargetIndices = [];
      let hideCommaTarget = [];
      let hideCommaTargetIndices = [];

      hasMoreCommaArr.forEach((n, i) => {
        if (
          fromCommaIndices[i] !== undefined &&
          toCommaIndices[i] !== undefined
        ) {
          sameCommaTarget.push(fromSplit.chars[fromCommaIndices[i]]);
        } else if (
          fromCommaIndices[i] === undefined &&
          toCommaIndices[i] !== undefined
        ) {
          showCommaTarget.push(toSplit.chars[toCommaIndices[i]]);
          showCommaTargetIndices.push(toCommaIndices[i]);
        } else if (
          fromCommaIndices[i] !== undefined &&
          toCommaIndices[i] === undefined
        ) {
          hideCommaTarget.push(fromSplit.chars[fromCommaIndices[i]]);
          hideCommaTargetIndices.push(fromCommaIndices[i]);
        }
      });
      console.log(
        "sameCommaTarget: ",
        sameCommaTarget,
        ", showCommaTarget: ",
        showCommaTarget,
        ", hideCommaTarget: ",
        hideCommaTarget
      );

      // stack을 유지될 애, 등장할 애, 나갈 애 3개로 나눠
      const sameStacks = [];
      const hideStacks = [];
      const showStacks = [];
      const sameStacksIndices = [];
      const hideStacksIndices = [];
      const showStacksIndices = [];

      const resultArrOnlyNum =
        resultFromArrOnlyNum.length < resultToArrOnlyNum.length
          ? resultToArrOnlyNum
          : resultFromArrOnlyNum;
      setResultArrOnlyNum(resultArrOnlyNum);

      q(`.${stack}`).forEach((el, i) => {
        if (
          !isNaN(Number(resultArrOnlyNum[loopIndices[i]])) ||
          resultArrOnlyNum[loopIndices[i]] === "diff"
        ) {
          sameStacks.push(el);
          sameStacksIndices.push(loopIndices[i]);
        } else if (resultArrOnlyNum[loopIndices[i]] === "show") {
          showStacks.push(el);
          showStacksIndices.push(loopIndices[i]);
        } else if (resultArrOnlyNum[loopIndices[i]] === "hide") {
          hideStacks.push(el);
          hideStacksIndices.push(loopIndices[i]);
        }
      });

      console.log(sameStacks, showStacks, hideStacks);
      console.log(
        "sameStacksIndices: ",
        sameStacksIndices,
        ", showStacksIndices: ",
        showStacksIndices,
        ", hideStacksIndices: ",
        hideStacksIndices
      );

      // // 초기 모션 세팅
      // gsap.set(wrapperRef.current, {
      //   width: prefixWidth + fromValWidth + suffixWidth
      // });
      // gsap.set(toSplit.chars, { opacity: 0 });
      // gsap.set(fromSplitDiffNumbers, { opacity: 0 });
      // gsap.set(showStacks, {
      //   opacity: 0,
      //   x: (i) => endPositionArrOnlyNum[showStacksIndices[i]]
      // });
      // gsap.set(sameStacks, {
      //   opacity: 1,
      //   x: (i) => {
      //     // console.log(i, sameStacksIndices[i], fromPositionArrOnlyNum);
      //     return props.align === "right"
      //       ? toHasLongerWidthThenFrom
      //         ? fromPositionArrOnlyNum[
      //             sameStacksIndices[i] -
      //               (toArrOnlyNum.length - fromArrOnlyNum.length)
      //           ]
      //         : fromPositionArrOnlyNum[sameStacksIndices[i]]
      //       : fromPositionArrOnlyNum[sameStacksIndices[i]];
      //   }
      // });
      // gsap.set(hideStacks, {
      //   x: (i) => fromPositionArrOnlyNum[hideStacksIndices[i]]
      // });
      // gsap.set(suffixRef.current, {
      //   x: props.align === "right" ? 0 : suffixFromPosition
      // });

      initialSetMotions.current = gsap.timeline();

      initialSetMotions.current
        ?.addLabel("start")
        .fromTo(
          wrapperRef.current,
          { opacity: 1 },
          { opacity: 1, duration: 0.001 }, // 이거 안하면 gsap 초기 세팅이 자꾸 꼬임
          "start"
        )
        .set(
          wrapperRef.current,
          {
            width: prefixWidth + fromValWidth + suffixWidth,
          },
          "start"
        )
        .set(toSplit.chars, { opacity: 0 }, "start")
        .set(fromSplitDiffNumbers, { opacity: props.loading ? 1 : 0 }, "start")
        .set(
          showStacks,
          {
            opacity: 0,
            x: (i) =>
              props.align === "right" && !toHasLongerWidthThenFrom
                ? endPositionArrOnlyNum[showStacksIndices[i]] +
                  (fromValWidth - toValWidth)
                : endPositionArrOnlyNum[showStacksIndices[i]],
          },
          "start"
        )
        .set(
          sameStacks,
          {
            opacity: props.loading ? 0 : 1,
            x: (i) => {
              // console.log(i, sameStacksIndices[i], fromPositionArrOnlyNum);
              return props.align === "right" &&
                fromArrOnlyNum.length < toArrOnlyNum.length
                ? fromPositionArrOnlyNum[
                    sameStacksIndices[i] -
                      (toArrOnlyNum.length - fromArrOnlyNum.length)
                  ]
                : fromPositionArrOnlyNum[sameStacksIndices[i]];
            },
          },
          "start"
        )
        .set(
          hideStacks,
          {
            opacity: props.loading ? 0 : 1,
            // x: (i) => fromPositionArrOnlyNum[hideStacksIndices[i]]
            x: (i) =>
              props.align === "right" &&
              fromArrOnlyNum.length < toArrOnlyNum.length
                ? fromPositionArrOnlyNum[
                    hideStacksIndices[i] -
                      (toArrOnlyNum.length - fromArrOnlyNum.length)
                  ]
                : fromPositionArrOnlyNum[hideStacksIndices[i]],
          },
          "start"
        )
        .set(
          suffixRef.current,
          {
            x: props.align === "right" ? 0 : suffixFromPosition,
          },
          "start"
        );

      // 모션 시작
      masterTl.current = gsap.timeline({ paused: true });
      loadingTl.current = props.loading
        ? gsap.timeline().to(fromSplit.chars, {
            opacity: 0.2,
            duration: 0.8,
            stagger: {
              each: 0.1,
              repeat: -1,
              ease: "none",
              yoyoEase: true,
            },
          })
        : null;

      resetAfterLoading.current = gsap
        .timeline({ defaults: { ease: "none", duration: 0.1 } })
        .to(fromSplit.chars, { opacity: 1 })
        .to(fromSplitDiffNumbers, { opacity: 0 }, 0)
        .to(sameStacks, { opacity: 1 }, 0)
        .to(hideStacks, { opacity: 1 }, 0);

      tl.current = gsap.timeline({
        // paused: true,
        // delay: delay,
        onStart: () => {
          setPlayLoop(!playLoop);
          loadingTl.current?.pause();
        },
      });

      moveFromSameCharsToEndMotion.current =
        props.align === "right"
          ? gsap.to(fromSplitSameNumbers, {
              x: (i) =>
                endPositionArrOnlyNum[
                  fromSplitSameNumbersIndices[i] +
                    (toArrOnlyNum.length - fromArrOnlyNum.length)
                ] -
                fromPositionArrOnlyNum[fromSplitSameNumbersIndices[i]] -
                (toValWidth - fromValWidth),
              delay: (i) =>
                stagger *
                countStagger(
                  resultFromArrOnlyNum, // indices가 다 onlyNum 기준으로 뽑혀서 onlyNum 기준으로 stagger 계산해야함
                  fromSplitSameNumbersIndices[i],
                  props.align
                ),
              ...moveEasing,
            })
          : gsap.to(fromSplitSameNumbers, {
              x: (i) =>
                endPositionArrOnlyNum[fromSplitSameNumbersIndices[i]] -
                fromPositionArrOnlyNum[fromSplitSameNumbersIndices[i]],
              delay: (i) =>
                stagger *
                countStagger(
                  resultFromArrOnlyNum,
                  fromSplitSameNumbersIndices[i],
                  props.align
                ),
              ...moveEasing,
            });

      moveStacksToEndMotion.current =
        props.align === "right"
          ? toHasLongerWidthThenFrom
            ? gsap
                .timeline()
                .set(sameStacks, {
                  x: (i) => {
                    return fromArrOnlyNum.length < toArrOnlyNum.length
                      ? fromPositionArrOnlyNum[
                          sameStacksIndices[i] -
                            (toArrOnlyNum.length - fromArrOnlyNum.length)
                        ] +
                          (toValWidth - fromValWidth)
                      : fromPositionArrOnlyNum[sameStacksIndices[i]] +
                          (toValWidth - fromValWidth);
                  },
                })
                .to(sameStacks, {
                  x: (i) =>
                    fromArrOnlyNum.length < toArrOnlyNum.length
                      ? endPositionArrOnlyNum[sameStacksIndices[i]]
                      : endPositionArrOnlyNum[
                          sameStacksIndices[i] +
                            (toArrOnlyNum.length - fromArrOnlyNum.length)
                        ],
                  delay: (i) => {
                    return (
                      stagger *
                      countStagger(
                        resultArrOnlyNum, // sameStacksIndices가 fromOnlyNum, toOnlyNum 중 length가 더 긴걸 기준으로 index가 잡히니까 resultArr를 씀 (toHasLongerWidthThenFrom과 다른 기준임 - 우측정렬일땐 from.length를 넘어서는 index가 나오기도 함)
                        sameStacksIndices[i],
                        props.align
                      )
                    );
                  },

                  ...moveEasing,
                })
            : gsap
                .timeline()
                .set(sameStacks, {
                  x: (i) => {
                    return fromArrOnlyNum.length < toArrOnlyNum.length
                      ? fromPositionArrOnlyNum[
                          sameStacksIndices[i] -
                            (toArrOnlyNum.length - fromArrOnlyNum.length)
                        ]
                      : fromPositionArrOnlyNum[sameStacksIndices[i]];
                  },
                })
                .to(sameStacks, {
                  // x: (i) =>
                  //   endPositionArrOnlyNum[sameStacksIndices[i]] +
                  //   (fromValWidth - toValWidth),
                  x: (i) =>
                    fromArrOnlyNum.length < toArrOnlyNum.length
                      ? endPositionArrOnlyNum[sameStacksIndices[i]] +
                        (fromValWidth - toValWidth)
                      : endPositionArrOnlyNum[
                          sameStacksIndices[i] +
                            (toArrOnlyNum.length - fromArrOnlyNum.length)
                        ] +
                        (fromValWidth - toValWidth),
                  delay: (i) =>
                    stagger *
                    countStagger(
                      resultArrOnlyNum,
                      sameStacksIndices[i],
                      props.align
                    ),
                  ...moveEasing,
                })
          : gsap.to(sameStacks, {
              x: (i) => endPositionArrOnlyNum[sameStacksIndices[i]],
              delay: (i) =>
                stagger *
                countStagger(
                  resultArrOnlyNum,
                  sameStacksIndices[i],
                  props.align
                ),
              ...moveEasing,
            });

      // console.log(
      //   "ss",
      //   fromCommaIndices,
      //   countStagger(resultFromArrOnlyNum, fromCommaIndices[0] - 2, props.align)
      // );
      moveSameCommasToEndMotion.current = gsap.to(sameCommaTarget, {
        x: (i) =>
          props.align === "right"
            ? endPositionArr[toCommaIndices[i]] -
              fromPositionArr[fromCommaIndices[i]] -
              (toValWidth - fromValWidth)
            : endPositionArr[toCommaIndices[i]] -
              fromPositionArr[fromCommaIndices[i]],
        delay: (i) =>
          props.align === "right" && hideStacks.length !== 0
            ? stagger *
              countStagger(resultToArrOnlyNum, toCommaIndices[i], props.align) // 콤마, 점은 옆 숫자랑 같이 딜레이 먹이는게 더 깔끔해서 OnlyNum 기준으로 stagger 계산
            : stagger *
              countStagger(
                resultFromArrOnlyNum,
                fromHasDash ? fromCommaIndices[i] - 2 : fromCommaIndices[i] - 1, // 콤마 바로 앞 숫자랑 같은 딜레이 먹여지게 -1 빼기 (대시가 있는 경우 대시까지 -2 빼기)
                props.align
              ),
        ...moveEasing,
      });

      showToCommasMotion.current = gsap.to(showCommaTarget, {
        opacity: 1,
        ...showEasing,
        delay: (i) =>
          stagger *
          countStagger(
            resultToArrOnlyNum,
            // showCommaTargetIndices[i],
            toHasDash
              ? showCommaTargetIndices[i] - 2
              : showCommaTargetIndices[i] - 1,
            props.align
          ),
      });

      hideOutCommasMotion.current = gsap.to(hideCommaTarget, {
        opacity: 0,
        ...hideEasing,
        delay: (i) =>
          hideStacks?.length !== 0
            ? 0
            : hideStagger *
              countStaggerFromEnd(
                resultFromArrOnlyNum,
                hideCommaTargetIndices[i],
                props.align
              ),
      });

      handleDashMotion.current = gsap
        .timeline({
          delay:
            dashResult === "hide" && hideStacks.length !== 0
              ? 0
              : dashResult === "show" && props.prefix === ""
              ? stagger * countStagger(resultToArrOnlyNum, 0, props.align)
              : resultFromArrOnlyNum.length === resultToArrOnlyNum.length
              ? stagger * countStagger(resultFromArrOnlyNum, 0, props.align)
              : toHasLongerWidthThenFrom
              ? stagger * countStagger(resultFromArrOnlyNum, 0, props.align)
              : hideStacks.length === 0
              ? stagger * countStagger(resultToArr, 0, props.align)
              : props.mode === "custom"
              ? loopCount * 0.02
              : 0.05 + hideStacks.length * 0.01,

          // delay: toHasLongerWidthThenFrom
          //   ? stagger * countStagger(resultFromArr, 0, props.align)
          //   : dashResult === "hide" && hideStacks.length !== 0
          //   ? 0
          //   : hideStacks.length === 0
          //   ? stagger * countStagger(resultFromArr, 0, props.align)
          //   : props.mode === "custom"
          //   ? loopCount * 0.02
          //   : hideStacks.length * 0.01

          // delay:
          //   hideStacks?.length !== 0 // -1111 -> 4900 처럼 자릿수는 똑같은데 대시만 사라지는 경우, 우측정렬일때, 딜레이가 0이면 대시가 너무 빨리 사라져서 이럴땐 기본 딜레이 적용해주는게 더 이쁨
          //     ? 0
          //     : stagger *
          //       (countStagger(
          //         toHasLongerWidthThenFrom
          //           ? resultFromArrOnlyNum
          //           : resultToArrOnlyNum,
          //         0,
          //         props.align
          //       ) -
          //         (fromArrOnlyNum.length === toArrOnlyNum.length ? 0 : 0))
        })
        .to(dashTarget, {
          opacity: dashResult === "hide" ? 0 : 1,
          ...(dashResult === "hide" ? hideEasing : showEasing),
        })
        .fromTo(
          dashTarget,
          {
            x:
              dashResult === "show"
                ? props.align === "right" && props.prefix !== ""
                  ? toValWidth - fromValWidth
                  : 0
                : 0,
          },
          {
            x:
              dashResult === "same"
                ? props.align === "right"
                  ? -(toValWidth - fromValWidth)
                  : 0
                : 0,
            // ...moveEasing
            immediateRender: false,
            ...(toHasLongerWidthThenFrom // dash는 prefix랑 같이 이동하는게 자연스러워서 dot, comma처럼 moveEasing 고정이 아닌 prefix/suffix와 같이 감 + 자릿수 안변하고 숫자폭만 변할 경우 숫자와 같이 이동하는 moveEasing이 더 자연스러움
              ? showStacks?.length === 0
                ? moveEasing
                : expandEasing(showStacks?.length)
              : hideStacks?.length === 0
              ? moveEasing
              : shrinkEasing(hideStacks?.length)),
          },
          0
        );

      handleDotMotion.current = gsap
        .timeline({
          delay:
            dotResult === "hide" && hideStacks.length !== 0
              ? 0
              : stagger * // dot은 dash, comma랑 다르게 사라져도 항상 숫자들 사이에서 혼자 사라져서, 주변 숫자들이 사라지는 타이밍(hideStagger/countStaggerFromEnd)와 맞추는게 아니라 바뀌는 타이밍(stagger/coundStagger)에 맞춰야 더 자연스러움
                (dotResult === "show"
                  ? countStagger(resultToArrOnlyNum, toDotIndex, props.align)
                  : dotResult === "hide"
                  ? countStagger(
                      resultFromArrOnlyNum,
                      fromHasDash ? fromDotIndex - 2 : fromDotIndex - 1,
                      props.align
                    )
                  : fromDotIndex < toDotIndex
                  ? countStagger(
                      resultFromArrOnlyNum,
                      resultFromArrOnlyNum.length,
                      props.align
                    )
                  : countStagger(
                      resultToArrOnlyNum,
                      toHasDash ? toDotIndex - 2 : toDotIndex - 1,
                      props.align
                    )),
        })
        .to(
          dotTarget,
          {
            opacity: dotResult === "hide" ? 0 : 1,
            ...(dotResult === "hide" ? hideEasing : showEasing),
          },
          0
        )
        .to(
          dotTarget,
          {
            x:
              dotResult === "same"
                ? props.align === "right"
                  ? endPositionArr[toDotIndex] -
                    fromPositionArr[fromDotIndex] -
                    (toValWidth - fromValWidth)
                  : endPositionArr[toDotIndex] - fromPositionArr[fromDotIndex]
                : 0,
            // ...moveEasing
            ...(fromDotIndex === toDotIndex
              ? moveEasing
              : fromDotIndex < toDotIndex
              ? expandEasing(showStacks?.length)
              : shrinkEasing(hideStacks?.length)),
          },
          0
        );

      showNewStacksMotion.current = gsap.to(showStacks, {
        opacity: 1,
        ...showEasing,
        delay: (i) =>
          stagger *
          countStagger(resultToArrOnlyNum, showStacksIndices[i], props.align),
      });

      hideOutStacksMotion.current = gsap.to(hideStacks, {
        opacity: 0,
        delay: (i) =>
          hideStagger *
          countStaggerFromEnd(
            resultFromArrOnlyNum,
            hideStacksIndices[i],
            props.align
          ), // 항상 끝에서부터 사라지도록
        ...hideEasing,
      });

      props.align === "center"
        ? toHasLongerWidthThenFrom
          ? (moveAllWhenAlignCenterMotion.current = gsap
              .timeline()
              .set(wrapperRef.current, {
                x: (toValWidth - fromValWidth) / 2,
              })
              .to(wrapperRef.current, {
                x: 0,
                delay:
                  resultFromArrOnlyNum.length === resultToArrOnlyNum.length
                    ? stagger *
                      countStagger(
                        resultFromArrOnlyNum,
                        resultFromArrOnlyNum.length - 1,
                        props.align
                      )
                    : stagger *
                      countStagger(
                        resultFromArr,
                        resultFromArr.length - 1,
                        props.align
                      ),

                ...(showStacks?.length === 0
                  ? moveEasing
                  : expandEasing(showStacks?.length)),
              }))
          : (moveAllWhenAlignCenterMotion.current = gsap.to(
              wrapperRef.current,
              {
                x: (fromValWidth - toValWidth) / 2,
                delay:
                  resultFromArrOnlyNum.length === resultToArrOnlyNum.length
                    ? stagger *
                      countStagger(
                        resultFromArrOnlyNum,
                        resultFromArrOnlyNum.length - 1,
                        props.align
                      )
                    : hideStacks.length === 0
                    ? stagger *
                      countStagger(
                        resultToArr,
                        resultToArr.length - 1,
                        props.align
                      )
                    : props.mode === "custom"
                    ? loopCount * 0.02
                    : 0.05 + hideStacks.length * 0.01,

                ...(hideStacks?.length === 0
                  ? moveEasing
                  : shrinkEasing(hideStacks?.length)),
              }
            ))
        : (moveAllWhenAlignCenterMotion.current = null);

      props.align === "center"
        ? (repositionAllWhenAlignCenterMotion.current = gsap.set(
            wrapperRef.current,
            {
              x: 0,
            }
          ))
        : (repositionAllWhenAlignCenterMotion.current = null);

      props.align === "right"
        ? toHasLongerWidthThenFrom
          ? (movePrefixToEndMotion.current = gsap
              .timeline()
              .set(prefixRef.current, {
                x: toValWidth - fromValWidth,
              })
              .to(prefixRef.current, {
                x: 0,
                delay:
                  resultFromArrOnlyNum.length === resultToArrOnlyNum.length
                    ? stagger *
                      countStagger(resultFromArrOnlyNum, 0, props.align)
                    : stagger * countStagger(resultFromArr, 0, props.align),
                // delay:
                //   hideStacks.length !== 0
                //     ? 0
                //     : stagger *
                //       countStagger(resultFromArrOnlyNum, 0, props.align),
                ...(showStacks?.length === 0
                  ? moveEasing
                  : expandEasing(showStacks?.length)),
              }))
          : (movePrefixToEndMotion.current = gsap.to(prefixRef.current, {
              x: fromValWidth - toValWidth,
              delay:
                resultFromArrOnlyNum.length === resultToArrOnlyNum.length
                  ? stagger * countStagger(resultFromArrOnlyNum, 0, props.align)
                  : hideStacks.length === 0
                  ? stagger * countStagger(resultToArr, 0, props.align)
                  : props.mode === "custom"
                  ? loopCount * 0.02
                  : 0.05 + hideStacks.length * 0.01,

              // delay:
              //   resultFromArrOnlyNum.length === resultToArrOnlyNum.length
              //     ? stagger *
              //       countStagger(
              //         resultFromArrOnlyNum,
              //         resultFromArrOnlyNum.length - 1,
              //         props.align
              //       )
              //     : hideStacks.length === 0
              //     ? stagger *
              //       countStagger(
              //         resultFromArr,
              //         resultFromArr.length - 1,
              //         props.align
              //       )
              //     : props.mode === "custom"
              //     ? loopCount * 0.02
              //     : hideStacks.length * 0.01,

              // delay:
              //   hideStacks.length !== 0
              //     ? 0
              //     : stagger * countStagger(resultToArrOnlyNum, 0, props.align),
              ...(hideStacks?.length === 0
                ? moveEasing
                : shrinkEasing(hideStacks?.length)),
            }))
        : (movePrefixToEndMotion.current = null);

      props.align === "right"
        ? (repositionAllWhenAlignRightMotion.current = gsap
            .timeline()
            .set(prefixRef.current, { x: 0 }))
            .set(
              sameStacks,
              {
                x: (i) =>
                  fromArrOnlyNum.length < toArrOnlyNum.length
                    ? endPositionArrOnlyNum[sameStacksIndices[i]]
                    : endPositionArrOnlyNum[
                        sameStacksIndices[i] +
                          (toArrOnlyNum.length - fromArrOnlyNum.length)
                      ],
              },
              0
            )
            .set(
              showStacks,
              {
                x: (i) =>
                  fromArrOnlyNum.length < toArrOnlyNum.length
                    ? endPositionArrOnlyNum[showStacksIndices[i]]
                    : endPositionArrOnlyNum[
                        showStacksIndices[i] +
                          (toArrOnlyNum.length - fromArrOnlyNum.length)
                      ],
              },
              0
            )
        : (repositionAllWhenAlignRightMotion.current = null);

      // console.log(hideStacks);
      props.align !== "right"
        ? (moveSuffixToEndMotion.current = gsap.to(suffixRef.current, {
            x: suffixEndPosition,

            delay:
              resultFromArrOnlyNum.length === resultToArrOnlyNum.length
                ? stagger *
                  countStagger(
                    resultFromArrOnlyNum,
                    resultFromArrOnlyNum.length - 1,
                    props.align
                  )
                : toHasLongerWidthThenFrom
                ? stagger *
                  countStagger(
                    resultFromArr,
                    resultFromArr.length - 1,
                    props.align
                  )
                : hideStacks.length === 0
                ? stagger *
                  countStagger(resultToArr, resultToArr.length - 1, props.align)
                : props.mode === "custom"
                ? loopCount * 0.02
                : 0.05 + hideStacks.length * 0.01,

            // delay: 0.1,
            ...(toHasLongerWidthThenFrom
              ? showStacks?.length === 0
                ? moveEasing
                : expandEasing(showStacks?.length)
              : hideStacks?.length === 0
              ? moveEasing
              : shrinkEasing(hideStacks?.length)),
          }))
        : (moveSuffixToEndMotion.current = null);

      changeWidthMotion.current = gsap
        .timeline()
        // .to(prefixRef.current, { opacity: 1, duration: 1 })
        .set(wrapperRef.current, {
          width: prefixWidth + toValWidth + suffixWidth,
        });

      tl.current
        ?.addLabel("start", 0.1)
        .add(
          toHasLongerWidthThenFrom ? changeWidthMotion.current : null,
          "start"
        )
        .add(moveAllWhenAlignCenterMotion.current, "start")
        .add(moveFromSameCharsToEndMotion.current, "start")
        .add(moveStacksToEndMotion.current, "start")
        .add(handleDashMotion.current, "start")
        .add(handleDotMotion.current, "start")
        .add(moveSameCommasToEndMotion.current, "start")
        .add(showToCommasMotion.current, "start")
        .add(hideOutCommasMotion.current, "start")
        .add(showNewStacksMotion.current, "start")
        .add(hideOutStacksMotion.current, "start")
        .add(moveSuffixToEndMotion.current, "start")
        .add(movePrefixToEndMotion.current, "start")
        .addLabel("endMotion")
        .add(
          toHasLongerWidthThenFrom ? null : changeWidthMotion.current,
          "endMotion"
        )
        .add(repositionAllWhenAlignRightMotion.current, "endMotion") // align right일때만 쓰임
        .add(repositionAllWhenAlignCenterMotion.current, "endMotion"); // align right일때만 쓰임

      masterTl.current
        ?.add(loadingTl.current)
        .add(
          resetAfterLoading.current,
          props.loading ? props.loadingDuration : delay
        )
        .add(tl.current);
      masterTl.current?.pause(0);
    });

    return () => {
      ctx.revert();
    };
  }, deps);

  useEffect(() => {
    console.log("restart");
    masterTl.current?.restart(true, false);
    setResetLoop(!resetLoop);
  }, deps);

  useEffect(() => {
    setState(!state);
  }, []);

  useEffect(() => {
    setResetLoop(!resetLoop);
  }, [props.align]);

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
        onClick={() => setState(!state)}
        key={key}
        ref={wrapperRef}
        style={{
          position: "relative",
          fontSize: fontSize,
          fontWeight: "bold",
          color: props.fontColor,
          fontFamily: "Toss Product Sans",
          // border: "1px solid red",
          display: "flex",
          // maxWidth: "fit-content"
        }}
      >
        {props.prefix === "" ? (
          <div ref={prefixRef} className={prefix}>
            {props.prefix}
          </div>
        ) : (
          <div ref={prefixRef} className={prefix}>
            {props.prefix}&nbsp;
          </div>
        )}
        {/* <div ref={prefixRef} className={prefix}>
          {props.prefix}
        </div> */}
        <div
          className="numbers"
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
            {isNaN(from) ? addCommasToString(from) : from.toLocaleString()}
          </div>
          {loopIndices?.map((n, i) => {
            // console.log(loopIndices, resultArrOnlyNum);
            // console.log(countStagger(resultArrOnlyNum, n, props.align));
            return (
              <Stack
                key={i}
                play={playLoop}
                reset={resetLoop}
                startNum={loopStartNums[i]}
                endNum={loopEndNums[i]}
                mode={props.mode}
                loopCount={loopCount}
                stackEasing={stackEasing}
                isHideStack={resultArrOnlyNum[n] === "hide"}
                // align에 따라서 stagger 시작하는 순서도 반대로 해줘야 함
                startStaggerDelay={
                  resultArrOnlyNum[n] === "hide"
                    ? hideStagger *
                      countStaggerFromEnd(resultArrOnlyNum, n, props.align)
                    : stagger * countStagger(resultArrOnlyNum, n, props.align)
                }
                toIsLargerThenFrom={toIsLargerThenFrom}
              />
            );
          })}
          <div
            className={toNum}
            style={{ left: props.align === "right" ? "unset" : 0 }}
          >
            {isNaN(to) ? addCommasToString(to) : to.toLocaleString()}
          </div>
        </div>
        <div ref={suffixRef} className={suffix}>
          {props.suffix}
        </div>
        <div style={{ opacity: 0 }}>0</div>
      </div>
    </div>
  );
}

addPropertyControls(AnimateNumber2, {
  replay: {
    type: ControlType.Boolean,
    defaultValue: true,
    enabledTitle: "▶️",
    disabledTitle: "▶️",
  },
  loading: {
    type: ControlType.Boolean,
    defaultValue: false,
    enabledTitle: "ON",
    disabledTitle: "OFF",
  },
  loadingDuration: {
    type: ControlType.Number,
    defaultValue: 3,
    step: 0.5,
    displayStepper: true,
  },
  delay: {
    type: ControlType.Number,
    defaultValue: 0,
    step: 0.1,
    displayStepper: true,
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
    description: "\n",
  },
  mode: {
    type: ControlType.Enum,
    defaultValue: "basicBounce",
    options: [
      "quickNormal",
      "quickBounce",
      "basicNormal",
      "basicBounce",
      "custom",
    ],
    displaySegmentedControl: true,
    segmentedControlDirection: "vertical",
  },
  loopCount: {
    type: ControlType.Number,
    defaultValue: 3,
    min: 3,
    step: 1,
    displayStepper: true,
    hidden(props) {
      return props.mode !== "custom";
    },
  },
  rollAllDigits: {
    type: ControlType.Boolean,
    defaultValue: false,
  },
  // addInStaggerDelay: {
  //   type: ControlType.Enum,
  //   defaultValue: 0,
  //   options: [0, 0.1, 0.3],
  //   displaySegmentedControl: true,
  // },

  fontSize: {
    type: ControlType.Number,
    defaultValue: 24,
    step: 1,
    displayStepper: true,
  },
  fontColor: {
    type: ControlType.Color,
    defaultValue: "#3182F6",
    description: "\n",
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
    defaultValue: "",
  },
  align: {
    type: ControlType.Enum,
    defaultValue: "left",
    options: ["left", "center", "right"],
    displaySegmentedControl: true,
  },
});
