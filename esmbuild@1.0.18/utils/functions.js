// src/utils/functions.tsx
import { gsap } from "./gsap/gsap.js";
function findCommaIndices(arr) {
  const commaIndices = [];
  arr.forEach((element, index) => {
    if (element === "," || element === "-" || element === ".") {
      commaIndices.push(index);
    }
  });
  return commaIndices;
}
function generatePositions(array, object) {
  let cumulativeWidth = 0;
  const xPositions = array.map((digit) => {
    const digitWidth = object[digit] !== void 0 ? object[digit] : 33.2;
    const position = parseFloat(cumulativeWidth.toFixed(2));
    cumulativeWidth += digitWidth;
    return position;
  });
  return xPositions;
}
function calculateSuffixPosition(digitsArr, numWidths, positionArr) {
  const lastDigit = digitsArr[digitsArr.length - 1];
  const digitWidth = numWidths[lastDigit] || 33.2;
  const totalWidth = positionArr[positionArr.length - 1] + digitWidth;
  return totalWidth;
}
function getIndicesOfLoops(array1, array2) {
  return array2.flatMap((item) => array1.map((el, index) => el === item ? index : -1)).filter((index) => index !== -1).sort((a, b) => a - b);
}
function getStartNumsOfLoops(resultArr, fromArr, toArr, toIsLargerThenFrom, align) {
  const arr = [];
  const numsWhenUp = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const numsWhenDown = numsWhenUp.toReversed();
  const nums = toIsLargerThenFrom ? numsWhenUp : numsWhenDown;
  const result = align === "right" ? resultArr.toReversed() : resultArr;
  const from = align === "right" ? fromArr.toReversed() : fromArr;
  const to = align === "right" ? toArr.toReversed() : toArr;
  console.log("resultArr:", result);
  result.map((n, i) => {
    if (n === "diff") {
      isNaN(from[i]) ? arr.push(Math.floor(Math.random() * 10)) : arr.push(gsap.utils.wrap(nums, toIsLargerThenFrom ? Number(from[i]) + 1 : Number(from[i]) - 1));
    } else if (n === "show") {
      isNaN(to[i]) ? arr.push(0) : arr.push(gsap.utils.wrap(nums, Number(to[i]) - 1));
    } else if (n === "hide") {
      isNaN(from[i]) ? arr.push(0) : arr.push(gsap.utils.wrap(nums, toIsLargerThenFrom ? Number(from[i]) + 1 : Number(from[i]) - 1));
    } else {
      return;
    }
  });
  return align === "right" ? arr.toReversed() : arr;
}
function getResultFromArr(fromArr, toArr, rollAllDigits) {
  return fromArr.map((n, i) => {
    if (fromArr[i] === ",") {
      return ",";
    } else if (fromArr[i] === "-") {
      return "-";
    } else if (fromArr[i] === ".") {
      return ".";
    } else {
      if (rollAllDigits) {
        return "diff";
      } else {
        if (toArr[i] === void 0) {
          return "hide";
        } else if (fromArr[i] === toArr[i]) {
          return n;
        } else {
          return "diff";
        }
      }
    }
  });
}
function getResultFromArrFromEnd(fromArr, toArr, rollAllDigits) {
  const reversedFromArr = fromArr.toReversed();
  const reversedToArr = toArr.toReversed();
  const reversedArr = reversedFromArr.map((n, i) => {
    if (reversedFromArr[i] === ",") {
      return ",";
    } else if (reversedFromArr[i] === "-") {
      return "-";
    } else if (reversedFromArr[i] === ".") {
      return ".";
    } else {
      if (rollAllDigits) {
        return "diff";
      } else {
        if (reversedToArr[i] === void 0) {
          return "hide";
        } else if (reversedFromArr[i] === reversedToArr[i]) {
          return n;
        } else {
          return "diff";
        }
      }
    }
  });
  return reversedArr.reverse();
}
function getResultToArr(fromArr, toArr, rollAllDigits) {
  return toArr.map((n, i) => {
    if (toArr[i] === ",") {
      return ",";
    } else if (toArr[i] === "-") {
      return "-";
    } else if (toArr[i] === ".") {
      return ".";
    } else {
      if (rollAllDigits) {
        return "diff";
      } else {
        if (fromArr[i] === void 0) {
          return "show";
        } else if (fromArr[i] === toArr[i]) {
          return n;
        } else {
          return "diff";
        }
      }
    }
  });
}
function getResultToArrFromEnd(fromArr, toArr, rollAllDigits) {
  const reversedFromArr = fromArr.toReversed();
  const reversedToArr = toArr.toReversed();
  const reversedArr = reversedToArr.map((n, i) => {
    if (reversedToArr[i] === ",") {
      return ",";
    } else if (reversedToArr[i] === "-") {
      return "-";
    } else if (reversedToArr[i] === ".") {
      return ".";
    } else {
      if (rollAllDigits) {
        return "diff";
      } else {
        if (reversedFromArr[i] === void 0) {
          return "show";
        } else if (reversedFromArr[i] === reversedToArr[i]) {
          return n;
        } else {
          return "diff";
        }
      }
    }
  });
  return reversedArr.reverse();
}
function removeElementsByIndices(arr, indicesToRemove) {
  return arr.filter((value, index) => indicesToRemove.indexOf(index) === -1);
}
function getDigitsArray(input) {
  const inputString = input.toString();
  const sanitizedArray = Array.from(inputString.replace(/[-,.]/g, ""), (char) => char);
  return sanitizedArray;
}
function convertStringToArray(inputString) {
  return Array.from(inputString, (char) => /\d/.test(char) ? parseInt(char).toString() : char.toString());
}
function isToLargerThenFromWithQuestionmark(from, to) {
  const fromString = typeof from === "string" ? from.replace(/[^\d.-]/g, "9") : from.toString();
  const toString = typeof to === "string" ? to.replace(/[^\d.-]/g, "9") : to.toString();
  const fromNumber = parseFloat(fromString.replace(/,/g, ""));
  const toNumber = parseFloat(toString.replace(/,/g, ""));
  return toNumber === fromNumber ? true : toNumber > fromNumber;
}
function calculateWidth(inputString, numWidths) {
  const characters = inputString.split("");
  const totalWidth = characters.reduce((acc, char) => {
    if (numWidths.hasOwnProperty(char)) {
      acc += numWidths[char];
    } else {
      console.warn(`Character '${char}' not found in numWidths.`);
    }
    return acc;
  }, 0);
  return Number(totalWidth.toFixed(2));
}
var baseNumWidthsFramer = {
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
function getNumWidthsWhenBold(fontSize) {
  const widthsForFontSize = {};
  for (const char in baseNumWidthsFramer) {
    widthsForFontSize[char] = Number((baseNumWidthsFramer[char] * (fontSize / 10)).toFixed(3));
  }
  return widthsForFontSize;
}
export {
  calculateSuffixPosition,
  calculateWidth,
  convertStringToArray,
  findCommaIndices,
  generatePositions,
  getDigitsArray,
  getIndicesOfLoops,
  getNumWidthsWhenBold,
  getResultFromArr,
  getResultFromArrFromEnd,
  getResultToArr,
  getResultToArrFromEnd,
  getStartNumsOfLoops,
  isToLargerThenFromWithQuestionmark,
  removeElementsByIndices
};
