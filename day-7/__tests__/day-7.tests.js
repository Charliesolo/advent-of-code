const { processData, checkEquation, checkSpecificCombo, totalValidEquations, checkSpecificCombo2, totalValidEquations2 } = require("../day-7");
const testData = `
190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20
`;

describe("processData", () => {
  test("should return an array equal in length to lines given", () => {
    const output = processData(testData)
    expect(output.length).toBe(9)
  });
  test("each item in the array should be an array consiting of one array and an array of numbers", () => {
    const output = processData(testData)
    expect(output).toEqual([
        [190, 10, 19],
        [3267, 81,40,27],
        [83, 17,5],
        [156, 15,6],
        [7290, 6,8,6,15],
        [161011, 16,10,13],
        [192,17,8,14],
        [21037,9,7,18,13],
        [292,11,6,16,20],
    ])
  });
});

describe("checkEquation", () =>{
    test("returns true if first item can be reached by adding subsequent items", () => {
        const output = checkEquation([10, 2, 3, 5])
        expect(output).toBe(true)
    })
    test("returns true if first item can be reached by multiplying subsequent items", () => {
        const output = checkEquation([30, 2, 3, 5])
        expect(output).toBe(true)
    })
    test("returns true if first item can be using a mixture of operators", () => {
        const output = checkEquation([292, 11, 6, 16, 20])
        expect(output).toBe(true)
    })
    test("returns false if first item cannot be reached using a mixture of operators", () => {
        const output = checkEquation([161011, 11, 6, 16, 20])
        expect(output).toBe(false)
    })
} )

describe("checkSpecificCombo", () =>{
    test("returns true if first item can be using a mixture of operators", () => {
        const output = checkSpecificCombo(292, [11, 6, 16, 20], "+*+")
        expect(output).toBe(true)
    })
} ) 

describe("totalValidEquations", () => {
test("totals the target of all valid equations in an array", () => {
    const data = processData(testData)
    const output = totalValidEquations(data)
    expect(output).toBe(3749)
})
})

describe("checkSpecificCombo2", () =>{
    test("returns true if first item can be using a mixture of operators", () => {
        const output = checkSpecificCombo2(7290, [6, 8, 6, 15], "*|*")
        expect(output).toBe(true)
    })
    test("returns true if first item can be using a mixture of operators", () => {
        const output = checkSpecificCombo2(192, [17, 8, 14], "|+")
        expect(output).toBe(true)
    })
    test("returns true if first item can be using a mixture of operators", () => {
        const output = checkSpecificCombo2(156, [15, 6], "|")
        expect(output).toBe(true)
    })
    test("returns true if first item can be using a mixture of operators", () => {
        const output = checkSpecificCombo2(306, [2, 15, 6], "*|")
        expect(output).toBe(true)
    })
    test("returns true if first item can be using a mixture of operators", () => {
        const output = checkSpecificCombo2(292, [11, 6,16,20], "+*+")
        expect(output).toBe(true)
    })
    test("returns true if first item can be using a mixture of operators", () => {
        const output = checkSpecificCombo2(190, [10, 19], "*")
        expect(output).toBe(true)
    })
} ) 

describe("totalValidEquations2", () => {
    test("totals the target of all valid equations in an array", () => {
        const data = processData(testData)
        const output = totalValidEquations2(data)
        expect(output).toBe(11387)
    })
    })