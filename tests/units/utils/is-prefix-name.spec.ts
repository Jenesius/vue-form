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
})