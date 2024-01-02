// src/utils/stack-functions.tsx
function findSignIndices(arr) {
  const signIndices = [];
  arr.forEach((element, index) => {
    if (element === "," || element === "-" || element === ".") {
      signIndices.push(index);
    }
  });
  return signIndices;
}
function findEtcIndices(arr) {
  const etcIndices = [];
  arr.forEach((element, index) => {
    if (element === "-" || element === ".") {
      etcIndices.push(index);
    }
  });
  return etcIndices;
}
function findCommaIndices(arr) {
  const commaIndices = [];
  arr.forEach((element, index) => {
    if (element === ",") {
      commaIndices.push(index);
    }
  });
  return commaIndices;
}
function findDotIndices(arr) {
  const commaIndices = [];
  arr.forEach((element, index) => {
    if (element === ".") {
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
function getIndicesOfLoops(array1Prop, array2Prop, align) {
  const array1 = align === "right" ? array1Prop.toReversed() : array1Prop;
  const array2 = align === "right" ? array2Prop.toReversed() : array2Prop;
  const result = array2.flatMap((item) => array1.map((el, index) => el === item ? index : -1)).filter((index) => index !== -1);
  return align === "right" ? result.toReversed().sort((a, b) => a - b) : result.sort((a, b) => a - b);
}
function addCommasToString(inputString) {
  const arr = inputString.split("");
  const replacedArr = arr.map((n, i) => {
    if (n === "?" || n === "\uFF1F" || !isNaN(n)) {
    } else {
      return n;
    }
  });
  const replacedArrToLocaleNum = Number(replacedArr.join("")).toLocaleString();
  const replacedArrToString = replacedArrToLocaleNum.split("");
  const commaIndices = [];
  replacedArrToString.forEach((n, i) => {
    if (n === ",") {
      commaIndices.push(i);
    }
  });
  const resultArr = [];
  let j = 0;
  replacedArrToString.forEach((n, i) => {
    if (n === ",") {
      resultArr.push(",");
    } else {
      resultArr.push(arr[j]);
      j = j + 1;
    }
  });
  return resultArr.join("");
}
function getStartNumsOfLoops(resultArr, fromArr, toArr, align) {
  const arr = [];
  const result = align === "right" ? resultArr.toReversed() : resultArr;
  const from = align === "right" ? fromArr.toReversed() : fromArr;
  result.map((n, i) => {
    if (n === "diff") {
      arr.push(from[i]);
    } else if (n === "show") {
      arr.push("0");
    } else if (n === "hide") {
      arr.push(from[i]);
    } else {
      return;
    }
  });
  return align === "right" ? arr.toReversed() : arr;
}
function getEndNumsOfLoops(resultArr, fromArr, toArr, align) {
  const arr = [];
  const result = align === "right" ? resultArr.toReversed() : resultArr;
  const to = align === "right" ? toArr.toReversed() : toArr;
  result.map((n, i) => {
    if (n === "diff") {
      arr.push(to[i]);
    } else if (n === "show") {
      arr.push(to[i]);
    } else if (n === "hide") {
      arr.push("0");
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
      if (toArr[i] === void 0) {
        return "hide";
      } else if (fromArr[i] === toArr[i]) {
        return rollAllDigits ? "diff" : n;
      } else {
        return "diff";
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
      if (reversedToArr[i] === void 0) {
        return "hide";
      } else if (reversedFromArr[i] === reversedToArr[i]) {
        return rollAllDigits ? "diff" : n;
      } else {
        return "diff";
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
      if (fromArr[i] === void 0) {
        return "show";
      } else if (fromArr[i] === toArr[i]) {
        return rollAllDigits ? "diff" : n;
      } else {
        return "diff";
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
      if (reversedFromArr[i] === void 0) {
        return "show";
      } else if (reversedFromArr[i] === reversedToArr[i]) {
        return rollAllDigits ? "diff" : n;
      } else {
        return "diff";
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
  return toNumber > fromNumber;
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
function returnStackItemsLoop(startNumProp, endNumProp, loopCount, toIsLargerThenFrom) {
  const rightArr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const leftArr = rightArr.toReversed();
  const array = toIsLargerThenFrom ? rightArr : leftArr;
  const result = [];
  let startNum;
  let endNum;
  if (isNaN(Number(startNumProp)) && isNaN(Number(endNumProp))) {
    startNum = toIsLargerThenFrom ? "0" : "9";
    endNum = toIsLargerThenFrom ? "9" : "0";
  } else if (isNaN(Number(startNumProp))) {
    startNum = "0";
    endNum = endNumProp;
  } else if (isNaN(Number(endNumProp))) {
    startNum = startNumProp;
    endNum = "9";
  } else {
    startNum = startNumProp;
    endNum = endNumProp;
  }
  for (let i = 0; i < loopCount; i++) {
    let startIndex = array.indexOf(startNum);
    let endIndex = array.indexOf(endNum);
    if (startIndex === -1 || endIndex === -1) {
      console.error("Invalid startNum or endNum");
      return;
    }
    if (startIndex < endIndex) {
      result.push(...array.slice(startIndex, endIndex + 1));
    } else if (startIndex === endIndex) {
      result.push(...array.slice(startIndex));
      result.push(...array.slice(0, endIndex + 1));
    } else {
      result.push(...array.slice(startIndex));
      result.push(...array.slice(0, endIndex + 1));
    }
    startNum = array[(endIndex + 1) % array.length];
  }
  let output = [];
  if (isNaN(Number(startNumProp)) && isNaN(Number(endNumProp))) {
    output = [startNumProp, ...result, endNumProp];
  } else if (isNaN(Number(startNumProp))) {
    output = [startNumProp, ...result];
  } else if (isNaN(Number(endNumProp))) {
    output = [...result, endNumProp];
  } else {
    output = result;
  }
  return toIsLargerThenFrom ? output : output.toReversed();
}
function returnStackItemsRepeat(startNum, endNum, loopCount) {
  const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const result = [];
  for (let i = 0; i < loopCount; i++) {
    let startIndex = array.indexOf(startNum);
    let endIndex = array.indexOf(endNum);
    if (startIndex === -1 || endIndex === -1) {
      console.error("Invalid startNum or endNum");
      return;
    }
    if (startIndex <= endIndex) {
      result.push(...array.slice(startIndex, endIndex + 1));
    } else {
      result.push(...array.slice(startIndex));
      result.push(...array.slice(0, endIndex + 1));
    }
  }
  return result;
}
function indicesOf(arr, item) {
  return arr.reduce((acc, v, i) => (v === item && acc.push(i), acc), []);
}
function countChangesBeforeIndex(resultToArr, index, align) {
  if (index >= resultToArr.length) {
    console.error("Index out of bounds");
    return;
  }
  const subArray = align === "right" ? resultToArr.slice(index, resultToArr.length - 1) : resultToArr.slice(0, index);
  const count = subArray.filter((item) => item === "diff" || item === "show" || item === "hide").length;
  return count;
}
function countStagger(arr, index, align) {
  if (align === "right") {
    return arr.length - 1 - index;
  } else {
    return index;
  }
}
function countStaggerFromEnd(arr, index, align) {
  if (align !== "right") {
    return arr.length - index;
  } else {
    return index;
  }
}
export {
  addCommasToString,
  calculateSuffixPosition,
  calculateWidth,
  convertStringToArray,
  countChangesBeforeIndex,
  countStagger,
  countStaggerFromEnd,
  findCommaIndices,
  findDotIndices,
  findEtcIndices,
  findSignIndices,
  generatePositions,
  getDigitsArray,
  getEndNumsOfLoops,
  getIndicesOfLoops,
  getNumWidthsWhenBold,
  getResultFromArr,
  getResultFromArrFromEnd,
  getResultToArr,
  getResultToArrFromEnd,
  getStartNumsOfLoops,
  indicesOf,
  isToLargerThenFromWithQuestionmark,
  removeElementsByIndices,
  returnStackItemsLoop,
  returnStackItemsRepeat
};
