import insertByName from "../../../src/utils/insert-by-name";

describe("Insert by name", () => {
    test("Should insert simple field", () => {
        const data = {}
        insertByName(data, "name", "Jenesius");
        expect(data).toEqual({name: "Jenesius"})
    })
    test("Should parse and insert hard field name", () => {
        const data = {};
        insertByName(data, "address.name.city", "Berlin");
        expect(data).toEqual({address: { name: { city: "Berlin" } }})
    })
    test("Override data", () => {
        const data = {
            address: null
        }
        insertByName(data, "address.city.name", "Berlin");
        expect(data).toEqual({address: { city: { name: "Berlin" } }})
    })
    test("Insert empty object", () => {
        const data = {};
        insertByName(data, "address", {});
        expect(data).toEqual({
            address: {}
        })
    })
})