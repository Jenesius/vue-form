import concatName from "../../../src/utils/concat-name";

describe("Concat name", () => {
    test("", () => {
        expect(concatName("jack")).toBe('jack')
    })
    test("Should parse and insert hard field name", () => {
        expect(concatName("jack", "add")).toBe('jack.add')
    })
    test("Override data", () => {
        expect(concatName("jack", "")).toBe('jack')
    })
    test("Insert empty object", () => {
        expect(concatName("", "jack", "", undefined)).toBe('jack')
    })
})