const fs = require("fs");
const data = fs.readFileSync("./day-2/data.txt", "utf8");

function extractData(data) {
  const regex = /.*/g;
  const levels = data.match(regex);
  const tidyLevels = levels.filter((item) => item !== "");
  const outputArr = tidyLevels.map((string) => {
    const arr = string.split(" ");
    const filterArr = arr.filter((item) => item);
    return filterArr.map((strNum) => {
      return Number(strNum);
    });
  });
  return outputArr;
}

function countSafeLevels(levels) {
  let safeCount = 0;
  levels.forEach((level) => {
    const isSafe = checkIfSafe(level);
    const canBeDampened = !isSafe && dampenLevels(level);
    if (isSafe || canBeDampened) {
      safeCount++;
    }
  });
  return safeCount;
}

function checkIfSafe(level) {
  let safe = true;
  let isAsc = null;
  for (let i = 1; i < level.length; i++) {
    const diff = level[i] - level[i - 1];
    if (Math.abs(diff) > 3) {
      safe = false;
      break;
    }
    if (level[i - 1] === level[i]) {
      safe = false;
      break;
    }
    if (isAsc === null) {
      isAsc = diff > 0;
    } else if ((isAsc && diff < 0) || (!isAsc && diff > 0)) {
      safe = false;
      break;
    }
  }
  return safe;
}

function dampenLevels(level) {
  for (let i = 0; i < level.length; i++) {
    const reducedLevel = [...level.slice(0, i), ...level.slice(i + 1)];
    if (checkIfSafe(reducedLevel)) {
      return true;
    }
  }
  return false;
}

const levels = extractData(data);
console.log("Safe levels: ", countSafeLevels(levels));

module.exports = { extractData, countSafeLevels, dampenLevels };
