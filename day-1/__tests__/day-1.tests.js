const { splitData, sortArrays, findDifference } = require("../day-1");
const testData = 
`
14764   28773
59598   86587
`
const testData2 = [[5,7,1,5],[12,1,3,2]]

describe("splitData", () => {
  test("returns an array of 2 arrays", () => {
    const output = splitData(testData)
    expect(output).toHaveLength(2)
  });
  test("arrays contain numbers", () => {
    const output = splitData(testData)
    expect(typeof output[0][0]).toBe("number")
  });
  test("correctly splits array", () => {
    const output = splitData(testData)
    const expected = [[14764, 59598], [28773,86587]]
    expect(output).toEqual(expected)
  });
});

describe("sortArrays", ()=> {
  test("returns 2 arrays sorted in ascending order", ()=> {
    const output= sortArrays(testData2)
    expect(output).toEqual([[1,5,5,7],[1,2,3,12]])
    
  } )
})
describe("findDifference", ()=> {
  test("finds the difference between each number in an array when one is always smaller than the other", ()=> {
    const output= findDifference([[1,5,5,7],[1,6,6,12]])
    expect(output).toBe(7)    
  } )
  test("finds the difference when which is larger varies", ()=> {
    const output= findDifference([[1,5,5,7],[1,2,3,12]])
    expect(output).toBe(10)    
  } )
})
