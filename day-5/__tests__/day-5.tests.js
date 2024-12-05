const {
  getRules,
  getPageNumbers,
  filterInvalidPageNumbers,
  totalMiddleValue,
  returnInvalidPageNumbers,
  reorderSet,
  totalReorderedSets,
} = require("../day-5");
const testData = `
47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47
`;

describe("getRules", () => {
  test("should return an array with 2 sub arrays", () => {
    const output = getRules(testData);
    expect(output.length).toBe(2);
  });
  test("each array should be an array containing 1 number for each rule", () => {
    const output = getRules(testData);
    expect(output[0].length).toBe(21);
    expect(output[1].length).toBe(21);
  });
});

describe("getPageNumbers", () => {
  test("should return an array with an item for each line of page numbers", () => {
    const output = getPageNumbers(testData);
    expect(output.length).toBe(6);
  });
  test("each item should be an array of numbers", () => {
    const output = getPageNumbers(testData);
    output.forEach((array) => {
      array.forEach((item) => {
        expect(typeof item).toBe("number");
      });
    });
  });
});

describe("filterInvalidPageNumbers", () => {
  test("returns an array of arrays", () => {
    const rules = getRules(testData);
    const pageNumbers = getPageNumbers(testData);
    const output = filterInvalidPageNumbers(rules, pageNumbers);
    expect(Array.isArray(output[0])).toBe(true);
  });
  test("does not filter valid page numbers", () => {
    const rules = getRules(testData);
    const pageNumbers = getPageNumbers(`
        75,47,61,53,29
        97,61,53,29,13
        75,29,13
        `);
    const output = filterInvalidPageNumbers(rules, pageNumbers);
    expect(output.length).toBe(3);
  });
  test("does filter invalid page numbers", () => {
    const rules = getRules(testData);
    const pageNumbers = getPageNumbers(`
        75,47,61,53,29
        97,61,53,29,13
        75,29,13
        75,97,47,61,53
        `);
    const output = filterInvalidPageNumbers(rules, pageNumbers);
    expect(output.length).toBe(3);
  });
  test("works with full data set", () => {
    const rules = getRules(testData);
    const pageNumbers = getPageNumbers(testData);
    const output = filterInvalidPageNumbers(rules, pageNumbers);
    expect(output.length).toBe(3);
  });
});

describe("totalMiddleValue", () => {
  test("provides the total of the middle value of an array", () => {
    const rules = getRules(testData);
    const pageNumbers = getPageNumbers(testData);
    const validPageNumbers = filterInvalidPageNumbers(rules, pageNumbers);
    const output = totalMiddleValue(validPageNumbers);
    expect(output).toBe(143);
  });
});

describe("returnInvalidPageNumbers", () => {
  test("returns an array of invalid sets", () => {
    const rules = getRules(testData);
    const pageNumbers = getPageNumbers(testData);
    const invalidPageNumbers = returnInvalidPageNumbers(rules, pageNumbers);
    expect(invalidPageNumbers.length).toBe(3);
  });
});

describe("reorderSet", () => {
  test("when given an invalid set returns the same set in the right order", () => {
    const rules = getRules(testData);
    const set = [61, 13, 29];
    const output = reorderSet(rules, set);
    expect(output).toEqual([61, 29, 13]);
  });
  test("works on longer sets", () => {
    const rules = getRules(testData);
    const set = [97, 13, 75, 29, 47];
    const output = reorderSet(rules, set);
    expect(output).toEqual([97, 75, 47, 29, 13]);
  });
});

describe("totalReorderedSets", () => {
  test("works", () => {
    const rules = getRules(testData);
    const pageNumbers = getPageNumbers(testData);
    const output = totalReorderedSets(rules, pageNumbers)
    expect(output).toBe(123)

  });
});
