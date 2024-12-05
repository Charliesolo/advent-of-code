const fs = require("fs");
const data = fs.readFileSync("./day-5/data.txt", "utf-8");

function getRules(data) {
  const regex = /[0-9][0-9]\|[0-9][0-9]/g;
  const strings = data.match(regex);
  const rules = [[], []];
  strings.forEach((string) => {
    const splitStrings = string.split("|");
    rules[0].push(Number(splitStrings[0]));
    rules[1].push(Number(splitStrings[1]));
  });
  return rules;
}

function getPageNumbers(data) {
  const regex = /.*,.*/gm;
  const strings = data.match(regex);
  const pageNumbers = strings.map((string) => {
    const stringArr = string.split(",");
    return stringArr.map((str) => {
      return Number(str);
    });
  });
  return pageNumbers;
}

function filterInvalidPageNumbers(rules, pageNumbers) {
  const validPageNumbers = [];
  pageNumbers.forEach((set) => {
    if (checkIfValid(rules, set)) {
      validPageNumbers.push(set);
    }
  });
  return validPageNumbers;
}

function totalMiddleValue(validPageNumbers) {
  let total = 0;
  validPageNumbers.forEach((set) => {
    total += set[Math.floor(set.length / 2)];
  });
  return total;
}

function returnInvalidPageNumbers(rules, pageNumbers) {
  const invalidPageNumbers = [];
  pageNumbers.forEach((set) => {
    if (!checkIfValid(rules, set)) {
      invalidPageNumbers.push(set);
    }
  });
  return invalidPageNumbers;
}

function checkIfValid(rules, set) {
  let isValid = true;
  for (let i = 0; i < rules[0].length; i++) {
    const firstPosition = rules[0][i];
    const secondPosition = rules[1][i];
    const indexFirst = set.indexOf(firstPosition);
    const indexSecond = set.indexOf(secondPosition);
    if (indexFirst > -1 && indexSecond > -1) {
      if (indexSecond < indexFirst) {
        isValid = false;
      }
    }
  }
  return isValid;
}

function reorderSet(rules, set){
    const newSet = [...set]
    for (let i = 0; i < rules[0].length; i++) {
        const firstPosition = rules[0][i];
        const secondPosition = rules[1][i];
        const indexFirst = newSet.indexOf(firstPosition);
        const indexSecond = newSet.indexOf(secondPosition);
        if (indexFirst > -1 && indexSecond > -1) {
          if (indexSecond < indexFirst) {
            [newSet[indexFirst], newSet[indexSecond]] = [newSet[indexSecond], newSet[indexFirst]]
            i = 0
          }
        }
    }
    return newSet
}

function totalReorderedSets(rules, pageNumbers){
    const invalidPageNumbers = returnInvalidPageNumbers(rules, pageNumbers)
     const reorderedSets = invalidPageNumbers.map((set) => {
        return reorderSet(rules, set)
    })
    return totalMiddleValue(reorderedSets)

}

const rules = getRules(data);
const pageNumbers = getPageNumbers(data);
const validPageNumbers = filterInvalidPageNumbers(rules, pageNumbers);
const output = totalMiddleValue(validPageNumbers);
console.log({output});
const reorderedTotal = totalReorderedSets(rules, pageNumbers)
console.log({reorderedTotal});

module.exports = {
  getRules,
  getPageNumbers,
  filterInvalidPageNumbers,
  totalMiddleValue,
  returnInvalidPageNumbers,
  reorderSet,
  totalReorderedSets
};
