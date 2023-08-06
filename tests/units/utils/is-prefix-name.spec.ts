import isPrefixName from "./../../../src/utils/is-prefix-name";

describe("Is prefix name", () => {
    test("Simple name", () => {
        expect(isPrefixName("address.city.name", "address")).toBe(true)
    })
    test("Multi name name", () => {
        expect(isPrefixName("user.type.index", "user.type")).toBe(true)
    })
    test("Should return false if second param is not prefix", () => {
        expect(isPrefixName("position.city.type", "city")).toBe(false)
    })
    test("Should return false is prefix is not full name", () => {
        expect(isPrefixName("position.city", "posit")).toBe(false)
        expect(isPrefixName("position.city", "position.cit")).toBe(false)
    })
})