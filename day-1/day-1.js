const fs = require("fs");
const data = fs.readFileSync("./day-1/data.txt", "utf8");

function splitData(numString) {
  const outputArrays = [[], []];
  const regex = /[0-9]+/g;
  const splitData = numString.match(regex);

  splitData.forEach((string, index) => {
    const num = Number(string);
    const targetArr = index % 2;
    outputArrays[targetArr].push(num);
  });

  return outputArrays;
}

function sortArrays(data) {
  const sortedArrs = [
    [...data[0]].sort((a, b) => {
      return a - b;
    }),
    [...data[1]].sort((a, b) => {
      return a - b;
    }),
  ];
  return sortedArrs;
}

function findDifference(data) {
  let total = 0;
  for (let i = 0; i < data[0].length; i++) {
    total += Math.abs(data[1][i] - data[0][i]);
  }
  return total;
}

function findSimilarity(data) {
  const firstArr = data[0];
  const secondArr = data[1];
  let total = 0;

  firstArr.forEach((num) => {
    const results = secondArr.filter((number) => number === num);
    total += results.length * num;
  });
  return total
}

const arrays = splitData(data);
const sortedArrays = sortArrays(arrays);
const difference = findDifference(sortedArrays);
const similarity = findSimilarity(sortedArrays)

console.log(difference);
console.log(similarity)

module.exports = { splitData, sortArrays, findDifference, findSimilarity };
