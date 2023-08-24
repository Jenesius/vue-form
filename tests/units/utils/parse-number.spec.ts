import {parseNumber} from "../../../src/utils/parse-number";

describe("Parse Number", () => {
    test("Should parse number", () => {
        expect(parseNumber("123")).toBe(123)
    })
    test("Should parse negative number", () => {
        expect(parseNumber("-100")).toBe(-100)
    })
    test("Should parse number with letters", () => {
        expect(parseNumber("A1B2zz3")).toBe(123)
    })
    test("Should parse empty string and return 0", () => {
        expect(parseNumber("AFRKRK")).toBe(0)
    })
    test("Should parse empty string and return default value", () => {
        expect(parseNumber("oprty", 25)).toBe(25)
    })
    test("Float number", () => {
        expect(parseNumber("13123.10")).toBe(13123.10)
    })
    test("Float number with comma", () =>{
        expect(parseNumber("123,15")).toBe(123.15);
    })
})