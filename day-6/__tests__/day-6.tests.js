const { arrayMap, findGuard, moveGuard, totalXs } = require("../day-6");
const testData = `
....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`;

describe("arrayMap", () => {
  test("returns an array of with one item per row", () => {
    const output = arrayMap(testData);
    expect(output.length).toBe(10);
  });
  test("each item in the array should be an array representing the row", () => {
    const output = arrayMap(testData);
    expect(output[0].length).toBe(10);
    expect(Array.isArray(output[0])).toBe(true);
  });
});

describe("findGuard", () => {
  test("returns an array with 2 numbers representing the guards position", () => {
    const map = arrayMap(testData);
    const output = findGuard(map);
    expect(output).toEqual([6, 4, "up"]);
  });
  test("works if guard facing different direction", () => {
    const mapData = `
    ....#.....
    .........#
    ..........
    ..#.......
    .......#..
    ..........
    .#..<.....
    ........#.
    #.........
    ......#...
    
    `;
    const map = arrayMap(mapData);
    const output = findGuard(map);
    expect(output).toEqual([6, 4, "left"]);
  });
});

describe("moveGuard", () => {
  test("moves guard right in a straight line and replaces path with 'x's", () => {
    const mapData = `
    ....#.....
    .........#
    ..........
    ..#.......
    .......#..
    ..........
    .#..>.....
    ........#.
    #.........
    ......#...
    
    `;
    const map = arrayMap(mapData);
    const output = moveGuard(map);
    expect(output[6]).toEqual([
      ".",
      "#",
      ".",
      ".",
      "x",
      "x",
      "x",
      "x",
      "x",
      "x",
    ]);
  });
  test("moves guard left in a straight line and replaces path with 'x's", () => {
    const mapData = `
    ....#.....
    .........#
    ..........
    ..#.......
    .......#..
    .........<
    .#........
    ........#.
    #.........
    ......#...
    
    `;
    const map = arrayMap(mapData);
    const output = moveGuard(map);
    expect(output[5]).toEqual([
      "x",
      "x",
      "x",
      "x",
      "x",
      "x",
      "x",
      "x",
      "x",
      "x",
    ]);
  });
  test("moves guard up in a straight line and replaces path with 'x's", () => {
    const mapData = `
    ....
    ....
    ....
    ^.#.
    `;
    const map = arrayMap(mapData);
    const output = moveGuard(map);
    output.forEach((row) => {
      expect(row[0]).toBe("x");
    });
  });
  test("moves guard down in a straight line and replaces path with 'x's", () => {
    const mapData = `
    v...
    ....
    ....
    ..#.
    `;
    const map = arrayMap(mapData);
    const output = moveGuard(map);
    output.forEach((row) => {
      expect(row[0]).toBe("x");
    });
  });
  test("guard rotates 90 degrees to the right when meeting an obstacle", () => {
    const mapData = `
    ..v.
    ....
    ....
    #.#.
    `;
    const map = arrayMap(mapData);
    const output = moveGuard(map);
    const expected = arrayMap(`
      ..x.
      ..x.
      xxx.
      #.#.
      `);
    expect(output).toEqual(expected);
  });
  test("works with more complex maps", () => {
    const map = arrayMap(testData);
    const output = moveGuard(map);
    const expected = arrayMap(`
      ....#.....
      ....xxxxx#
      ....x...x.
      ..#.x...x.
      ..xxxxx#x.
      ..x.x.x.x.
      .#xxxxxxx.
      .xxxxxxx#.
      #xxxxxxx..
      ......#x..
      `);
    expect(output).toEqual(expected);
  });
});

describe('totatXs', () => { 
  test('should return the number of xs', () => { 
    const testData = arrayMap(`
      ....#.....
      ....xxxxx#
      ....x...x.
      ..#.x...x.
      ..xxxxx#x.
      ..x.x.x.x.
      .#xxxxxxx.
      .xxxxxxx#.
      #xxxxxxx..
      ......#x..
      `);
      const output = totalXs(testData)
      expect(output).toBe(41)
   })
 })