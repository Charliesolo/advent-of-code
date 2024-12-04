const fs = require("fs");
const data = fs.readFileSync("./day-4/data.txt", "utf8");

function rowData(data) {
  const regex = /\w+/g;
  const rows = data.match(regex);
  return rows;
}

function countMatches(rows) {
  const xmasRegex = /XMAS/g;
  const samxRegex = /SAMX/g;
  let total = 0;
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const forwardMatches = row.match(xmasRegex);
    forwardMatches ? (total += forwardMatches.length) : null;
    const backwardMatches = row.match(samxRegex);
    backwardMatches ? (total += backwardMatches.length) : null;
    for (let j = 0; j < row.length; j++) {
      if (row[j] === "X" && i + 3 < rows.length) {
        if (
          rows[i + 1][j] === "M" &&
          rows[i + 2][j] === "A" &&
          rows[i + 3][j] === "S"
        ) {
          total++;
        }
      }
      if (row[j] === "S" && i + 3 < rows.length) {
        if (
          rows[i + 1][j] === "A" &&
          rows[i + 2][j] === "M" &&
          rows[i + 3][j] === "X"
        ) {
          total++;
        }
      }
      if (row[j] === "X" && j + 3 < row.length && i + 3 < rows.length) {
        if (
          rows[i + 1][j + 1] === "M" &&
          rows[i + 2][j + 2] === "A" &&
          rows[i + 3][j + 3] === "S"
        ) {
          total++;
        }
      }
      if (row[j] === "S" && j + 3 < row.length && i + 3 < rows.length) {
        if (
          rows[i + 1][j + 1] === "A" &&
          rows[i + 2][j + 2] === "M" &&
          rows[i + 3][j + 3] === "X"
        ) {
          total++;
        }
      }
      if (row[j] === "S" && j - 3 >= 0 && i + 3 < rows.length) {
        if (
          rows[i + 1][j - 1] === "A" &&
          rows[i + 2][j - 2] === "M" &&
          rows[i + 3][j - 3] === "X"
        ) {
          total++;
        }
      }
      if (row[j] === "X" && j - 3 >= 0 && i + 3 < rows.length) {
        if (
          rows[i + 1][j - 1] === "M" &&
          rows[i + 2][j - 2] === "A" &&
          rows[i + 3][j - 3] === "S"
        ) {
          total++;
        }
      }
    }
  }
  return total;
}

const rows = rowData(data)
const total = countMatches(rows)
console.log({total})

module.exports = { rowData, countMatches };
