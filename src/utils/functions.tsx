import {gsap} from "./gsap/gsap";

export function findCommaIndices(arr) {
  const commaIndices = [];

  arr.forEach((element, index) => {
    if (element === "," || element === "-" || element === ".") {
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

export function getIndicesOfLoops(array1, array2) {
  return array2
    .flatMap((item) => array1.map((el, index) => (el === item ? index : -1)))
    .filter((index) => index !== -1)
    .sort((a, b) => a - b);
}

export function getStartNumsOfLoops(
  resultArr,
  fromArr,
  toArr,
  toIsLargerThenFrom,
  align
) {
  const arr = [];
  const numsWhenUp = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const numsWhenDown = numsWhenUp.toReversed();
  const nums = toIsLargerThenFrom ? numsWhenUp : numsWhenDown;

  // 우측정렬인 경우, 모든 array를 reverse해놓고 비교한 뒤에 마지막에 return도 reverse 하면 됨
  const result = align === "right" ? resultArr.toReversed() : resultArr;
  const from = align === "right" ? fromArr.toReversed() : fromArr;
  const to = align === "right" ? toArr.toReversed() : toArr;

  console.log("resultArr:", result);
  result.map((n, i) => {
    if (n === "diff") {
      // 값이 달라지는 경우, from < to ? from 숫자+1 : from숫자-1로 시작
      // 근데 from 해당 자릿수가 숫자가 아닌 경우 (물음표), 시작 숫자는 랜덤으로 지정
      isNaN(from[i])
        ? arr.push(Math.floor(Math.random() * 10)) // 원래 0이었는데 ??? 이런식으로 물음표가 연속될 때 도는 내내 숫자가 다 같아버려서 랜덤으로 변경함
        : arr.push(
            gsap.utils.wrap(
              nums,
              toIsLargerThenFrom ? Number(from[i]) + 1 : Number(from[i]) - 1
            )
          );
    } else if (n === "show") {
      // from에 없었는데 to에 새로 등장하는 경우, to 숫자 - 1로 시작
      isNaN(to[i])
        ? arr.push(0)
        : arr.push(gsap.utils.wrap(nums, Number(to[i]) - 1));
    } else if (n === "hide") {
      // from에 있었는데 to에 사라지는 경우, from < to ? from 숫자+1 : from숫자-1로 시작
      isNaN(from[i])
        ? arr.push(0)
        : arr.push(
            gsap.utils.wrap(
              nums,
              toIsLargerThenFrom ? Number(from[i]) + 1 : Number(from[i]) - 1
            )
          );
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
      if (rollAllDigits) {
        return "diff";
      } else {
        if (toArr[i] === undefined) {
          // 없어질 자릿수인 경우
          return "hide";
        } else if (fromArr[i] === toArr[i]) {
          // 값이 같은 경우
          return n;
        } else {
          // 값이 다른 경우
          return "diff";
        }
      }
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
    } else {
      if (rollAllDigits) {
        return "diff";
      } else {
        if (reversedToArr[i] === undefined) {
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

export function getResultToArr(fromArr, toArr, rollAllDigits) {
  return toArr.map((n, i) => {
    if (toArr[i] === ",") {
      // 콤마인 경우
      return ",";
    } else if (toArr[i] === "-") {
      return "-";
    } else if (toArr[i] === ".") {
      return ".";
    } else {
      if (rollAllDigits) {
        return "diff";
      } else {
        if (fromArr[i] === undefined) {
          // 새로 생기는 자릿수인 경우
          return "show";
        } else if (fromArr[i] === toArr[i]) {
          // 값이 같은 경우
          return n;
        } else {
          // 값이 다른 경우
          return "diff";
        }
      }
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
      if (rollAllDigits) {
        return "diff";
      } else {
        if (reversedFromArr[i] === undefined) {
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
  // 숫자가 같은 경우, 올라가는 효과를 적용하기 위해 true로 지정하기
  return toNumber === fromNumber ? true : toNumber > fromNumber;
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
    "？": 43.25
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
    "？": 34.602
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
    "？": 8.656
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
    "？": 14.711
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
    "？": 11.25
  }
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
  "？": 8.656
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
  "？": 8.656
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
