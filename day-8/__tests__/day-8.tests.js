const { processData, findAntennas, findAntiNodes, countUnique } = require("../day-8");

const testData = `
............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............
`

describe("processData", () => {
    test("returns an array of length equal to number of lines given", () => {
        const output = processData(testData)
        expect(output.length).toBe(12)

    })
})

describe("findAntenna", () => {
    test("returns an  object containing an array of antennas", () => {
        const map = processData(testData)
        const output = findAntennas(map)
        expect(output.antennas.length).toBe(7)
    })
    test("returns an  object showing the number of columns and rows of the map", () => {
        const map = processData(testData)
        const output = findAntennas(map)
        expect(output).toHaveProperty("rows", 12)
        expect(output).toHaveProperty("cols", 12)
    })
})

describe("findAntiNodes", () => {
    test("correctly returns the coordinates of 2 antiNodes for a map containing 2 matching antennas", () => {
        const mapData = 
`....
.a..
..a.
....`
        const map = processData(mapData)
        const antennas = findAntennas(map)
        const output = findAntiNodes(antennas)
        expect(output).toEqual([[0,0],[3,3]])
        
    })
    test("correctly returns the coordinates of antiNodes for a map containing 3 matching antennas", () => {
        const mapData2 = 
`
....
.aa.
..a.
....`
        const map = processData(mapData2)
        const antennas = findAntennas(map)
        const output = findAntiNodes(antennas)
        expect(output).toEqual(expect.arrayContaining([[1,0],[1,3],[0,2],[3,2],[0,0],[3,3]]))
        
    })
    test("does not return antiNodes outside bounds of map", () => {
        const mapData2 = 
`
....
..aa
....
....`
        const map = processData(mapData2)
        const antennas = findAntennas(map)
        const output = findAntiNodes(antennas)
        expect(output).toEqual([[1,1]])
        
    })
    test("works with different types of antenna", () => {
        const mapData2 = 
`
....
..aa
.bb.
....`
        const map = processData(mapData2)
        const antennas = findAntennas(map)
        const output = findAntiNodes(antennas)
        expect(output).toEqual(expect.arrayContaining([[1,1] , [2,0], [2,3]]))
        
    })
    test("works on larger maps", () => {
        const map = processData(testData)
        const antennas = findAntennas(map)
        const output = findAntiNodes(antennas)
        expect(output.length).toBe(15)
        
    })
})

describe("countUnique", () => {
    test("returns the number of unique arrays given", () => {
        const map = processData(testData)
        const antennas = findAntennas(map)
        const antiNodes = findAntiNodes(antennas)
        const output = countUnique(antiNodes)
        expect(output).toBe(14)
        
    })
})