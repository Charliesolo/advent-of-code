const fs = require("fs");
const data = fs.readFileSync("./day-7/data.txt", "utf-8");

function processData(data) {
  const regex = /.+/g;
  const lines = data.match(regex);
  const array = lines.map((line) => {
    const strings = line.split(" ");
    strings[0] = strings[0].replace(":", "");
    const numbers = strings.map((string) => {
      return Number(string);
    });
    return numbers;
  });
  return array;
}

function checkEquation(nums) {
  let valid = false;
  const target = nums[0];
  const equationElements = [...nums];
  equationElements.shift();
  const sum = equationElements.reduce((acc, cur) => acc + cur, 0);
  const product = equationElements.reduce((acc, cur) => acc * cur, 1);
  const operators = generatePermutations(equationElements.length);
  if (sum === target || product === target) {
    valid = true;
  }
  operators.forEach((operator) => {
    if (checkSpecificCombo(target, equationElements, operator)) {
        valid = true
    }
  });
  return valid;
}

function generatePermutations(length) {
  if (length <= 0) return [];
  let permutations = ["+", "*"];
  for (let i = 1; i < length; i++) {
    const newPermutations = [];
    permutations.forEach((permutation) => {
      newPermutations.push(permutation + "+");
      newPermutations.push(permutation + "*");
    });
    permutations = newPermutations;
  }
  return permutations;
}

function checkSpecificCombo(target, numbers, permutation) {
  let runningTotal = 0;
  for (let i = 1; i < numbers.length; i++) {
    operator = permutation[i - 1];
    if (i === 1) {
      if (operator === "+") {
        runningTotal = numbers[i - 1] + numbers[i];
      }
      if (operator === "*") {
        runningTotal = numbers[i - 1] * numbers[i];
      }
    } else {
      if (operator === "+") {
        runningTotal += numbers[i];
      }
      if (operator === "*") {
        runningTotal *= numbers[i];
      }
    }
  }
  if (runningTotal === target) {
    return true;
  } else {
    return false;
  }
}

function totalValidEquations(numArrays){
    let runningTotal = 0
    numArrays.forEach((array) => {
        if(checkEquation(array)){
            runningTotal += array[0]
        }
    })
return runningTotal
}

const processedData = processData(data)
const total = totalValidEquations(processedData)
console.log(total)


module.exports = { processData, checkEquation, checkSpecificCombo, totalValidEquations };
