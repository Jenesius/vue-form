import parseFirstName from "../../../src/utils/parse-first-name";

describe("Parse first field's name", () => {
    
    test("One mode field must return full name and empty string", () => {
        expect(parseFirstName("username")).toEqual(["username", ''])
    })
    test("Word with one dot must split it by dot.", () => {
        expect(parseFirstName("address.name")).toEqual(["address", "name"])
    })
    test("Field with a lot of dots must return first name as first param, and other string like second param", () => {
        expect(parseFirstName("address.city.name")).toEqual(["address", "city.name"]);
    })
    test("Should throw the error if was not provided string.", () => {
        expect(parseFirstName.bind(null, 5)).toThrow()
    })
})
