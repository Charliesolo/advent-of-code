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
  const operators = generatePermutations(equationElements.length);
  operators.forEach((operator) => {
    if (checkSpecificCombo(target, equationElements, operator)) {
      valid = true;
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

function totalValidEquations(numArrays) {
  let runningTotal = 0;
  numArrays.forEach((array) => {
    if (checkEquation(array)) {
      runningTotal += array[0];
    }
  });
  return runningTotal;
}

function generatePermutations2(length) {
  if (length <= 0) return [];
  let permutations = ["+", "*", "|"];
  for (let i = 1; i < length; i++) {
    const newPermutations = [];
    permutations.forEach((permutation) => {
      newPermutations.push(permutation + "+");
      newPermutations.push(permutation + "*");
      newPermutations.push(permutation + "|");
    });
    permutations = newPermutations;
  }
  return permutations;
}

function checkSpecificCombo2(target, nums, permutation) {
  let numbers = [...nums];
  let operators = permutation;
  let runningTotal = 0;
  let previousResult = 0
  for (let i = 1; i < numbers.length; i++) {
    operator = operators[i - 1];
    if (i === 1) {
      if (operator === "+") {
        previousResult = numbers[i - 1] + numbers[i];
        runningTotal = previousResult
      }
      if (operator === "*") {
        previousResult = numbers[i - 1] * numbers[i];
        runningTotal = previousResult
      }
      if (operator === "|") {
        previousResult = Number(String(numbers[i - 1]) + String(numbers[i]));
        runningTotal = previousResult
      }
    } 
    else {
      if (operator === "+") {
        runningTotal = previousResult + numbers[i];
        previousResult = runningTotal
      }
      if (operator === "*") {
        runningTotal = previousResult * numbers[i];
        previousResult = runningTotal
      }
      if (operator === "|") {
        previousResult = Number(String(previousResult) + String(numbers[i]));
            if(i === numbers.length-1){
                runningTotal = previousResult
            }
          }
    }
  }
  if (runningTotal === target) {
    return true;
  } else {
    return false;
  }
}

function checkEquation2(nums) {
    let valid = false;
    const target = nums[0];
    const equationElements = [...nums];
    equationElements.shift();
    const operators = generatePermutations2(equationElements.length);
    operators.forEach((operator) => {
      if (checkSpecificCombo2(target, equationElements, operator)) {
        valid = true;
      }
    });
    return valid;
  }

  function totalValidEquations2(numArrays) {
    let runningTotal = 0;
    numArrays.forEach((array) => {
      if (checkEquation2(array)) {
        runningTotal += array[0];
      }
    });
    return runningTotal;
  }

const processedData = processData(data)
const total = totalValidEquations2(processedData)
console.log(total)

module.exports = {
  processData,
  checkEquation,
  checkSpecificCombo,
  totalValidEquations,
  checkSpecificCombo2,
  totalValidEquations2
};
