const fs = require("fs");
const data = fs.readFileSync("./day-3/data.txt", "utf8");

function extractData(data) {
  const regexMul = /mul\([0-9]+,[0-9]+\)|do\(\)|don\'t\(\)/g;
  const regexNum = /[0-9]+/g;
  const mults = data.match(regexMul);
  let enabled = true;
  const numArr = [];

  for (let i = 0; i < mults.length; i++) {
    mults[i] === "do()" ? (enabled = true) : null;
    mults[i] === "don't()" ? (enabled = false) : null;
    if (mults[i] !== "do()" && mults[i] !== "don't()") {
      if (enabled) {
        const strPair = mults[i].match(regexNum);
        const numPair = strPair.map((str) => {
          return Number(str);
        });
        numArr.push(numPair);
      }
    }
  }
  return numArr;
}

function multiplyAndAdd(numPairs) {
  let total = 0;
  numPairs.forEach((pair) => {
    total += pair[0] * pair[1];
  });
  return total;
}

const pairs = extractData(data)
const total = multiplyAndAdd(pairs)
console.log("total:", total)

module.exports = { extractData, multiplyAndAdd };
