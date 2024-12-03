const { extractData, multiplyAndAdd } = require("../day-3");
const testData =
  "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))";
const testData2 =
  "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";

describe("extract data", () => {
  test("function should return an array of items", () => {
    const output = extractData(testData);
    expect(Array.isArray(output)).toBe(true);
  });
  test("function should return an array of only pairs gotten when enabled", () => {
    const output = extractData(testData2);
    expect(output.length).toBe(2);
    });
});

describe("multiplyAndAdd", () => {
  test("multiplies each pair and add the total", () => {
    const output = multiplyAndAdd([
      [2, 4],
      [5, 5],
      [11, 8],
      [8, 5],
    ])
    expect(output).toBe(161);
  });
});
