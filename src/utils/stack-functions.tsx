export function findSignIndices(arr) {
  const signIndices = [];

  arr.forEach((element, index) => {
    if (element === "," || element === "-" || element === ".") {
      signIndices.push(index);
    }
  });

  return signIndices;
}
export function findEtcIndices(arr) {
  const etcIndices = [];

  arr.forEach((element, index) => {
    if (element === "-" || element === ".") {
      etcIndices.push(index);
    }
  });

  return etcIndices;
}
export function findCommaIndices(arr) {
  const commaIndices = [];

  arr.forEach((element, index) => {
    if (element === ",") {
      commaIndices.push(index);
    }
  });

  return commaIndices;
}

export function findDotIndices(arr) {
  const commaIndices = [];

  arr.forEach((element, index) => {
    if (element === ".") {
      commaIndices.push(index);
    }
  });

  return commaIndices;
}

export function generatePositions(array, object) {
  let cumulativeWidth = 0;
  const xPositions = array.map((digit) => {
    const digitWidth = object[digit] !== undefined ? object[digit] : 33.2;
    const position = parseFloat(cumulativeWidth.toFixed(2));
    cumulativeWidth += digitWidth;
    return position;
  });
  return xPositions;
}

export function calculateSuffixPosition(digitsArr, numWidths, positionArr) {
  // Step 1: Find the last item on digitsArr
  const lastDigit = digitsArr[digitsArr.length - 1];

  // Step 2: Find that digit's width by numWidths's key
  const digitWidth = numWidths[lastDigit] || 33.2;

  // Step 3: Add that digit's width with positionArr's last item
  const totalWidth = positionArr[positionArr.length - 1] + digitWidth;

  return totalWidth;
}

export function getIndicesOfLoops(array1Prop, array2Prop, align) {
  const array1 = align === "right" ? array1Prop.toReversed() : array1Prop;
  const array2 = align === "right" ? array2Prop.toReversed() : array2Prop;
  const result = array2
    .flatMap((item) => array1.map((el, index) => (el === item ? index : -1)))
    .filter((index) => index !== -1);

  return align === "right"
    ? result.toReversed().sort((a, b) => a - b)
    : result.sort((a, b) => a - b);
}

export function addCommasToString(inputString) {
  // 물음표를 9로 바꿔서 쉼표 찍은 다음 다시 원래대로 물음표로 바꾼 array를 리턴하는 함수
  const arr = inputString.split("");
  const replacedArr = arr.map((n, i) => {
    if (n === "?" || n === "？" || !isNaN(n)) {
      // string일때 앞자리가 0인 경우에도 그대로 살아있게 하기 위해 모든 숫자를 9로 치환해서 쉼표 위치 계산 (이거 안하면 01.??원 이런게 1.??원으로 바뀌어버림)
    } else {
      return n;
    }
  });
  // console.log(replacedArr.join(""));
  const replacedArrToLocaleNum = Number(replacedArr.join("")).toLocaleString();
  const replacedArrToString = replacedArrToLocaleNum.split("");
  // console.log(replacedArrToString);
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

export function getStartNumsOfLoops(resultArr, fromArr, toArr, align) {
  const arr = [];
  // 우측정렬인 경우, 모든 array를 reverse해놓고 비교한 뒤에 마지막에 return도 reverse 하면 됨
  const result = align === "right" ? resultArr.toReversed() : resultArr;
  const from = align === "right" ? fromArr.toReversed() : fromArr;
  // const to = align === "right" ? toArr.toReversed() : toArr;

  // console.log("resultArr:", result);
  result.map((n, i) => {
    if (n === "diff") {
      // 값이 달라지는 경우, from 숫자로 시작
      arr.push(from[i]);
    } else if (n === "show") {
      // from에 없었는데 to에 새로 등장하는 경우, 0으로 시작 (나중에 to[i]로 해보기)
      arr.push("0"); // 숫자 아니라 string으로 넘겨야 Stack에서 계산됨
    } else if (n === "hide") {
      arr.push(from[i]);
    } else {
      return;
    }
  });

  return align === "right" ? arr.toReversed() : arr;
}
export function getEndNumsOfLoops(resultArr, fromArr, toArr, align) {
  const arr = [];
  // 우측정렬인 경우, 모든 array를 reverse해놓고 비교한 뒤에 마지막에 return도 reverse 하면 됨
  const result = align === "right" ? resultArr.toReversed() : resultArr;
  // const from = align === "right" ? fromArr.toReversed() : fromArr;
  const to = align === "right" ? toArr.toReversed() : toArr;

  // console.log("resultArr:", result);
  result.map((n, i) => {
    if (n === "diff") {
      // 값이 달라지는 경우, from 숫자로 시작
      arr.push(to[i]);
    } else if (n === "show") {
      arr.push(to[i]);
    } else if (n === "hide") {
      // from에 있었는데 to에 사라지는 경우, 0으로 끝 (나중에 to[i]로 해보기)
      arr.push("0"); // 숫자 아니라 string으로 넘겨야 Stack에서 계산됨
    } else {
      return;
    }
  });

  return align === "right" ? arr.toReversed() : arr;
}

export function getResultFromArr(fromArr, toArr, rollAllDigits) {
  return fromArr.map((n, i) => {
    if (fromArr[i] === ",") {
      // 콤마인 경우
      return ",";
    } else if (fromArr[i] === "-") {
      return "-";
    } else if (fromArr[i] === ".") {
      return ".";
    } else {
      if (toArr[i] === undefined) {
        // 없어질 자릿수인 경우
        return "hide";
      } else if (fromArr[i] === toArr[i]) {
        // 값이 같은 경우
        return rollAllDigits ? "diff" : n;
      } else {
        // 값이 다른 경우
        return "diff";
      }
      // } else {
      //   if (rollAllDigits) {
      //     return "diff";
      //   } else {
      //     if (toArr[i] === undefined) {
      //       // 없어질 자릿수인 경우
      //       return "hide";
      //     } else if (fromArr[i] === toArr[i]) {
      //       // 값이 같은 경우
      //       return n;
      //     } else {
      //       // 값이 다른 경우
      //       return "diff";
      //     }
      //   }
    }
  });
}

// 우측정렬일때 뒤에서부터 비교하는 함수
export function getResultFromArrFromEnd(fromArr, toArr, rollAllDigits) {
  const reversedFromArr = fromArr.toReversed();
  const reversedToArr = toArr.toReversed();

  const reversedArr = reversedFromArr.map((n, i) => {
    if (reversedFromArr[i] === ",") {
      return ",";
    } else if (reversedFromArr[i] === "-") {
      return "-";
    } else if (reversedFromArr[i] === ".") {
      return ".";
      // } else {
      //   if (rollAllDigits) {
      //     return "diff";
      //   } else {
      //     if (reversedToArr[i] === undefined) {
      //       return "hide";
      //     } else if (reversedFromArr[i] === reversedToArr[i]) {
      //       return n;
      //     } else {
      //       return "diff";
      //     }
      //   }
    } else {
      if (reversedToArr[i] === undefined) {
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

export function getResultToArr(fromArr, toArr, rollAllDigits) {
  return toArr.map((n, i) => {
    if (toArr[i] === ",") {
      // 콤마인 경우
      return ",";
    } else if (toArr[i] === "-") {
      return "-";
    } else if (toArr[i] === ".") {
      return ".";
      // } else {
      //   if (rollAllDigits) {
      //     return "diff";
      //   } else {
      //     if (fromArr[i] === undefined) {
      //       // 새로 생기는 자릿수인 경우
      //       return "show";
      //     } else if (fromArr[i] === toArr[i]) {
      //       // 값이 같은 경우
      //       return n;
      //     } else {
      //       // 값이 다른 경우
      //       return "diff";
      //     }
      //   }
    } else {
      if (fromArr[i] === undefined) {
        // 새로 생기는 자릿수인 경우
        return "show";
      } else if (fromArr[i] === toArr[i]) {
        // 값이 같은 경우
        return rollAllDigits ? "diff" : n;
      } else {
        // 값이 다른 경우
        return "diff";
      }
      // } else {
      //   if (rollAllDigits) {
      //     return "diff";
      //   } else {
      //     if (fromArr[i] === undefined) {
      //       // 새로 생기는 자릿수인 경우
      //       return "show";
      //     } else if (fromArr[i] === toArr[i]) {
      //       // 값이 같은 경우
      //       return n;
      //     } else {
      //       // 값이 다른 경우
      //       return "diff";
      //     }
      //   }
    }
  });
}

// 우측정렬일때 뒤에서부터 비교하는 함수
export function getResultToArrFromEnd(fromArr, toArr, rollAllDigits) {
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
      if (reversedFromArr[i] === undefined) {
        return "show";
      } else if (reversedFromArr[i] === reversedToArr[i]) {
        return rollAllDigits ? "diff" : n;
      } else {
        return "diff";
      }
      // } else {
      //   if (rollAllDigits) {
      //     return "diff";
      //   } else {
      //     if (reversedFromArr[i] === undefined) {
      //       return "show";
      //     } else if (reversedFromArr[i] === reversedToArr[i]) {
      //       return n;
      //     } else {
      //       return "diff";
      //     }
      //   }
    }
  });

  return reversedArr.reverse();
}

export function removeElementsByIndices(arr, indicesToRemove) {
  return arr.filter((value, index) => indicesToRemove.indexOf(index) === -1);
}

// 인풋 숫자에서 부호 제외하고 숫자와 물음표로만 array로 만드는 함수
export function getDigitsArray(input) {
  // Convert the input to a string to handle both numbers and strings
  const inputString = input.toString();

  // Remove dashes, commas, and dots, then convert to an array of characters
  const sanitizedArray = Array.from(
    inputString.replace(/[-,.]/g, ""),
    (char) => char
  );

  return sanitizedArray;
}

// 인풋 숫자에서 물음표 포함 자릿수별로 array로 만드는 함수
export function convertStringToArray(inputString) {
  return Array.from(inputString, (char) =>
    /\d/.test(char) ? parseInt(char).toString() : char.toString()
  );
}

// 물음표를 숫자 9로 대치한 다음 from < to 인지 return 하는 함수
// 0으로 대치하면 -0004 < 이런식으로 난감해져서 걍 9로 대치함
export function isToLargerThenFromWithQuestionmark(from, to) {
  // Convert 'from' and 'to' to strings with '?' replaced by '9' if they are strings
  const fromString =
    typeof from === "string" ? from.replace(/[^\d.-]/g, "9") : from.toString();
  const toString =
    typeof to === "string" ? to.replace(/[^\d.-]/g, "9") : to.toString();

  // Convert the strings to numbers
  const fromNumber = parseFloat(fromString.replace(/,/g, "")); // Remove commas
  const toNumber = parseFloat(toString.replace(/,/g, "")); // Remove commas

  // Check if toNumber is greater than fromNumber
  return toNumber > fromNumber;
}

// from, to 값(string) width 계산하는 함수 - prefix/suffix 제외
export function calculateWidth(inputString, numWidths) {
  // Convert the input string to an array of characters
  const characters = inputString.split("");

  // Use reduce to sum up the widths based on the characters in the input string
  const totalWidth = characters.reduce((acc, char) => {
    // Check if the character exists in the numWidths object
    if (numWidths.hasOwnProperty(char)) {
      // Add the width to the accumulator
      acc += numWidths[char];
    } else {
      // If the character is not in numWidths, you may want to handle it accordingly
      console.warn(`Character '${char}' not found in numWidths.`);
    }

    return acc;
  }, 0);

  return Number(totalWidth.toFixed(2));
}

const numWidths = {
  50: {
    "0": 33.156,
    "1": 24.656,
    "2": 30.75,
    "3": 33.156,
    "4": 31.852,
    "5": 32.055,
    "6": 33.203,
    "7": 28.102,
    "8": 33.156,
    "9": 33.203,
    "-": 23.203,
    ",": 15.203,
    ".": 13.703,
    "?": 25.852,
    "？": 43.25,
  },
  40: {
    "0": 26.523,
    "1": 19.727,
    "2": 24.602,
    "3": 26.523,
    "4": 25.484,
    "5": 25.641,
    "6": 26.563,
    "7": 22.484,
    "8": 26.523,
    "9": 26.563,
    "-": 18.563,
    ",": 12.164,
    ".": 10.961,
    "?": 20.688,
    "？": 34.602,
  },
  10: {
    "0": 6.633,
    "1": 4.938,
    "2": 6.156,
    "3": 6.633,
    "4": 6.375,
    "5": 6.414,
    "6": 6.641,
    "7": 5.625,
    "8": 6.633,
    "9": 6.641,
    "-": 4.641,
    ",": 3.047,
    ".": 2.742,
    "?": 5.172,
    "？": 8.656,
  },
  17: {
    "0": 11.273,
    "1": 8.383,
    "2": 10.461,
    "3": 11.273,
    "4": 10.836,
    "5": 10.898,
    "6": 11.289,
    "7": 9.555,
    "8": 11.273,
    "9": 11.289,
    "-": 7.891,
    ",": 5.172,
    ".": 4.664,
    "?": 8.789,
    "？": 14.711,
  },
  13: {
    "0": 8.625,
    "1": 6.414,
    "2": 8,
    "3": 8.625,
    "4": 8.281,
    "5": 8.336,
    "6": 8.633,
    "7": 7.313,
    "8": 8.625,
    "9": 8.633,
    "-": 6.039,
    ",": 3.953,
    ".": 3.563,
    "?": 6.727,
    "？": 11.25,
  },
};

const baseNumWidths = {
  "0": 6.633,
  "1": 4.938,
  "2": 6.156,
  "3": 6.633,
  "4": 6.375,
  "5": 6.414,
  "6": 6.641,
  "7": 5.625,
  "8": 6.633,
  "9": 6.641,
  "-": 4.641,
  ",": 3.047,
  ".": 2.742,
  "?": 5.172,
  "？": 8.656,
};

const baseNumWidthsFramer = {
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
  "？": 8.656,
};

export function getNumWidthsWhenBold(fontSize) {
  // Create an object to store the widths for the given font size
  const widthsForFontSize = {};

  // Calculate the widths for each character based on the provided font size and base font size
  for (const char in baseNumWidthsFramer) {
    widthsForFontSize[char] = Number(
      (baseNumWidthsFramer[char] * (fontSize / 10)).toFixed(3)
    );
  }

  return widthsForFontSize;
}

export function returnStackItemsLoop(
  startNumProp,
  endNumProp,
  loopCount,
  toIsLargerThenFrom
) {
  // const rightArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const rightArr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const leftArr = rightArr.toReversed();
  const array = toIsLargerThenFrom ? rightArr : leftArr;
  // const array = toIsLargerThenFrom ? leftArr : rightArr;
  const result = [];

  let startNum;
  let endNum;
  // console.log(isNaN(Number(startNumProp)));
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
      // start/end 숫자가 같은 경우 한바퀴 돌리기
      result.push(...array.slice(startIndex));
      result.push(...array.slice(0, endIndex + 1));
    } else {
      result.push(...array.slice(startIndex));
      result.push(...array.slice(0, endIndex + 1));
    }

    // Update startNum for the next iteration
    startNum = array[(endIndex + 1) % array.length];
  }

  let output = [];
  if (isNaN(Number(startNumProp)) && isNaN(Number(endNumProp))) {
    output = [startNumProp, ...result, endNumProp];
  } else if (isNaN(Number(startNumProp))) {
    // return output.toSpliced(0, 1, startNumProp);
    output = [startNumProp, ...result];
  } else if (isNaN(Number(endNumProp))) {
    // return output.toSpliced(output.length - 1, 1, endNumProp);
    output = [...result, endNumProp];
  } else {
    output = result;
  }

  // return toIsLargerThenFrom ? output.toReversed() : output;
  return toIsLargerThenFrom ? output : output.toReversed();
}

export function returnStackItemsRepeat(startNum, endNum, loopCount) {
  // 0, 1, 0, 1 하는 방식
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

export function indicesOf(arr, item) {
  return arr.reduce((acc, v, i) => (v === item && acc.push(i), acc), []);
}

export function countChangesBeforeIndex(resultToArr, index, align) {
  // Make sure the index is within the bounds of the array
  if (index >= resultToArr.length) {
    console.error("Index out of bounds");
    return;
  }

  // Slice the array from the beginning up to the specified index (exclusive)
  const subArray =
    align === "right"
      ? resultToArr.slice(index, resultToArr.length - 1)
      : resultToArr.slice(0, index);

  // Use the filter function to count occurrences of 'diff'
  const count = subArray.filter(
    (item) => item === "diff" || item === "show" || item === "hide"
  ).length;

  return count;
}

export function countStagger(arr, index, align) {
  if (align === "right") {
    return arr.length - 1 - index;
  } else {
    return index;
  }
}

export function countStaggerFromEnd(arr, index, align) {
  if (align !== "right") {
    return arr.length - index;
  } else {
    return index;
  }
}
