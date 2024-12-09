const fs = require("fs");
const data = fs.readFileSync("./day-8/data.txt", "utf-8");

exports.processData = (data) => {
  const splitData = data.trim().split("\n");
  const map = splitData.map((line) => {
    return line.split("");
  });
  return map;
};

exports.findAntennas = (map) => {
  const output = {};
  output.antennas = [];
  output.rows = map.length;
  output.cols = map[0].length;
  for (let i = 0; i < map.length; i++) {
    const row = map[i];
    for (let j = 0; j < row.length; j++) {
      if (row[j] !== ".") {
        output.antennas.push([row[j], i, j]);
      }
    }
  }
  return output;
};

function onlyUnique(value, index, array) {
  return array.indexOf(value) === index;
}

exports.findAntiNodes = (mapInfo) => {
  const { antennas, rows, cols } = mapInfo;
  const antiNodes = [];
  const values = antennas.map((antenna) => {
    return antenna[0];
  });
  const uniqueValues = values.filter(onlyUnique);

  uniqueValues.forEach((antennaType) => {
    for (let i = 0; i < antennas.length; i++) {
      if (antennas[i][0] === antennaType) {
        const currentAntenna = antennas[i];
        for (let j = i + 1; j < antennas.length; j++) {
          if (antennas[j][0] === antennaType) {
            const comparisonAntenna = antennas[j];
            const rowDiff = comparisonAntenna[1] - currentAntenna[1];
            const colDiff = comparisonAntenna[2] - currentAntenna[2];
            if(currentAntenna[1] - rowDiff >= 0 && currentAntenna[2] - colDiff >= 0 && currentAntenna[1] - rowDiff < rows && currentAntenna[2] - colDiff < cols){
                antiNodes.push([
                  currentAntenna[1] - rowDiff,
                  currentAntenna[2] - colDiff,
                ]);
            }
            if(comparisonAntenna[1] + rowDiff < rows && comparisonAntenna[2] + colDiff < cols &&
                comparisonAntenna[1] + rowDiff >= 0 && comparisonAntenna[2] + colDiff >= 0
            )
            antiNodes.push([
              comparisonAntenna[1] + rowDiff,
              comparisonAntenna[2] + colDiff,
            ]);
          }
        }
      }
    }
  });
  return antiNodes;
};

exports.countUnique = (antiNodes) => {
    const stringNodes = antiNodes.map((antiNode) => {
        return antiNode.toString()
    })
    const uniqueStrings = stringNodes.filter(onlyUnique)
    console.log(uniqueStrings)

    return uniqueStrings.length


}

const map = this.processData(data)
const antennas = this.findAntennas(map)
const antiNodes = this.findAntiNodes(antennas)
const output = this.countUnique(antiNodes)
console.log(output)
