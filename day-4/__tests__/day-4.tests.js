const { rowData, countMatches, countXs } = require("../day-4");

const testData = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;

describe("rowData", () => {
  test("should return an array with 1 item per row ", () => {
    const output = rowData(testData);
    expect(output.length).toBe(10);
  });
});

describe("countMatches", () => {
  test("should count forward 'XMAS's ", () => {
    const rows = rowData(`MMMSXXMASM
            XMASXMXAMM`);
    const output = countMatches(rows);
    expect(output).toBe(2);
  });
  test("works with rows with no matches 'XMAS's ", () => {
    const rows = rowData(`MMMSXXXASM
            XMASXMXAMM`);
    const output = countMatches(rows);
    expect(output).toBe(1);
  });
  test("counts forward and backward 'XMAS's ", () => {
    const rows = rowData(`SAMXMASM
            XMASAMXAMM`);
    const output = countMatches(rows);
    expect(output).toBe(4);
  });
  test("counts forward vertical 'XMAS's ", () => {
    const rows = rowData(`
        XXXXXXXX
        XXXXMXXX
        XXXXAXXX
        XXXXSXXX`);
    const output = countMatches(rows);
    expect(output).toBe(1);
  });
  test("counts backward vertical 'XMAS's ", () => {
    const rows = rowData(`
        XXXXSXXX
        XXXXAXXX
        XXXXMXXX
        XXXXXXXX`);
    const output = countMatches(rows);
    expect(output).toBe(1);
  });
  test("counts left to right diagonal 'XMAS's ", () => {
    const rows = rowData(`
        XXXXSXXX
        XMXXXXXX
        XXAXXXXX
        XXXSXXXX`);
    const output = countMatches(rows);
    expect(output).toBe(1);
  });
  test("counts left to right backward diagonal 'XMAS's ", () => {
    const rows = rowData(`
        SXXXSXXX
        XAXXXXXX
        XXMXXXXX
        XXXXXXXX`);
    const output = countMatches(rows);
    expect(output).toBe(1);
  });
  test("counts right to left diagonal 'XMAS's ", () => {
    const rows = rowData(`
        XXXSXXXX
        XXAXXXXX
        XMXXXXXX
        XXXSXXXX`);
    const output = countMatches(rows);
    expect(output).toBe(1);
  });
  test("counts left to right diagonal 'XMAS's ", () => {
    const rows = rowData(`
        XXXXXXXX
        XXXXXMXX
        XXXXAXXX
        XXXSXXXX`);
    const output = countMatches(rows);
    expect(output).toBe(1);
  });
  test("it works", () => {
    const rows = rowData(testData);
    const output = countMatches(rows);
    expect(output).toBe(18);
  });
});

describe("countXs", () =>{
    test("works with both left to right", ()=> {
        const rows = rowData(`
            XXXXXXXX
            XXXMXSXX
            XXXXAXXX
            XXXMXSXX`);
        const output = countXs(rows);
        expect(output).toBe(1);
    })
    test("works with top left to right, bottom right to left", ()=> {
        const rows = rowData(`
            XXXXXXXX
            XXXMXMXX
            XXXXAXXX
            XXXSXSXX`);
        const output = countXs(rows);
        expect(output).toBe(1);
    })
    test("works with top right to left, bottom left to rigth", ()=> {
        const rows = rowData(`
            XXXXXXXX
            XXXSXSXX
            XXXXAXXX
            XXXMXMXX`);
        const output = countXs(rows);
        expect(output).toBe(1);
    })
    test("works with both right to left", ()=> {
        const rows = rowData(`
            XXXXXXXX
            XXXSXMXX
            XXXXAXXX
            XXXSXMXX`);
        const output = countXs(rows);
        expect(output).toBe(1);
    })
    test("it works", ()=> {
        const rows = rowData(testData);
        const output = countXs(rows);
        expect(output).toBe(9);
    })
})
