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
    test("Simple path", () => {
        const data = {};
        insertByName(data, "name", "Jenesius")
        expect(data).toEqual({name: "Jenesius"})
    })
    test("Deepen name", () => {
        const data = {}
        insertByName(data, "name.local", "JNSS")
        expect(data).toEqual({name: { local: "JNSS"}})
    })
    test("Merge field", () => {
        const data = {address: {city: "Berlin"}}
        insertByName(data, "address.country", "German")
        expect(data)
        .toEqual({
            address: {
                city: "Berlin",
                country: "German"
            }
        })
    })

    test("Override value", () => {
        const data = {name: "Jenesius"}
        insertByName(data, "name", "JNSS")
        expect(data)
        .toEqual({name: "JNSS"})
    })
    
})