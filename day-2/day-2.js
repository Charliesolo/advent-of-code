const fs = require("fs");
const data = fs.readFileSync("./day-2/data.txt", "utf8");

function extractData(data) {
  const regex = /.*/g;
  const levels = data.match(regex);
  const tidyLevels = levels.filter((item) => item !== "");
  const outputArr = tidyLevels.map((string) => {
    const arr = string.split(" ");
    const filterArr = arr.filter((item) => item)
    return filterArr.map((strNum) => {
      return Number(strNum);
    });
  });
  return outputArr;
}

function countSafeLevels(levels) {
  let safeCount = 0;
  levels.forEach((level) => {
    let safe = true;
    let isAsc = null;
    for (let i = 1; i < level.length; i++) {
      const diff = level[i - 1] - level[i];
      if (Math.abs(diff) > 3) {
        safe = false;
        break
      }
      if(level[i - 1] === level[i]){
        safe = false;
        break
      }
      if (isAsc === null) {
        isAsc = level[i - 1] < level[i];
      }
    if (isAsc && level[i - 1] > level[i]) {
        safe = false;
        break
    }
    if (isAsc === false && level[i - 1] < level[i]) {
        safe = false;
        break
    }
      
    }
    if (safe) {
        safeCount++;
    }
  });
  return safeCount;
}

const realData = extractData(data)
console.log(countSafeLevels(realData))

module.exports = { extractData, countSafeLevels };
