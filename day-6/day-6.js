const fs = require("fs");
const data = fs.readFileSync("./day-6/data.txt", "utf-8");

function arrayMap(data) {
  const regex = /[^\n ]+/g;
  const strings = data.match(regex);
  const map = strings.map((string) => {
    return string.split("");
  });
  return map;
}

function findGuard(map) {
  const coordinates = [];
  for (let i = 0; i < map.length; i++) {
    const indexUp = map[i].indexOf("^");
    const indexRight = map[i].indexOf(">");
    const indexDown = map[i].indexOf("v");
    const indexLeft = map[i].indexOf("<");
    if (indexUp > -1) {
      coordinates.push(i, indexUp, "up");
    }
    if (indexRight > -1) {
      coordinates.push(i, indexRight, "right");
    }
    if (indexDown > -1) {
      coordinates.push(i, indexDown, "down");
    }
    if (indexLeft > -1) {
      coordinates.push(i, indexLeft, "left");
    }
  }
  return coordinates;
}

function moveGuard(map, count = 0) {
  const [row, col, direction] = findGuard(map);
  if (!direction) {
    return map;
  }
  if (direction === "right") {
    map[row][col] = "x";
    if (col + 1 < map[row].length) {
      if (map[row][col + 1] === "#") {
        map[row][col] = "v";
      } else {
        map[row][col + 1] = ">";
      }
    } else {
      return map;
    }
  }
  if (direction === "left") {
    map[row][col] = "x";
    if (col - 1 > -1) {
      if (map[row][col - 1] === "#") {
        map[row][col] = "^";
      } else {
        map[row][col - 1] = "<";
      }
    } else {
      return map;
    }
  }
  if (direction === "up") {
    map[row][col] = "x";
    if (row - 1 > -1) {
      if (map[row - 1][col] === "#") {
        map[row][col] = ">";
        count--;
      } else {
        map[row - 1][col] = "^";
        count++;
      }
    } else {
      return map;
    }
  }
  if (direction === "down") {
    map[row][col] = "x";
    if (row + 1 < map.length) {
      if (map[row + 1][col] === "#") {
        map[row][col] = "<";
      } else {
        map[row + 1][col] = "v";
      }
    } else {
      return map;
    }
  }
  count++;
  if (count > 5000) {
    return map;
  }
  return moveGuard(map, count);
}

function totalXs(map) {
  let total = 0;
  map.forEach((row) => {
    row.forEach((point) => {
      if (point === "x" || point === "X") {
        total++;
      }
    });
  });
  return total;
}

const map = arrayMap(data);
const movedMap = moveGuard(map);
const movedMapTwo = moveGuard(movedMap);
const total = totalXs(movedMapTwo);
console.log({ total });

module.exports = { arrayMap, findGuard, moveGuard, totalXs };
