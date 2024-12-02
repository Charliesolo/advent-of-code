const { extractData, countSafeLevels } = require("../day-2")

const testData = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`

describe("extractData", () => {
    test("should return an array", () => {
        const output = extractData(testData)
        expect(Array.isArray(output)).toBe(true)
    })
    test("should return an array equal in length to number of lines", () => {
        const output = extractData(testData)
        expect(output.length).toBe(6)
    })
    test("each nested array should contain the numbers of that line", () => {
        const output = extractData(testData)
        expect(output[0]).toEqual([7,6,4,2,1])
    })
})

describe("countSafeLevels", () => {
    test("should not count arrays that have a difference larger than 3 between consecutive numbers", () => {
        const output = countSafeLevels([[7,6,4,2,1], [1,2,4,5,6], [15,9,5,1,0]])
        expect(output).toBe(2)
    })
    test("should not count arrays that are not sorted", () => {
        const output = countSafeLevels(extractData(
            `7 6 4 2 1
            1 2 7 8 9
            9 7 6 2 1
            1 3 2 4 5
            8 6 4 4 1
            1 3 6 7 9`))
        expect(output).toBe(2)
    })
})