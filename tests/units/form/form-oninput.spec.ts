import Form from "../../../src/classes/Form";

describe("Form oninput handler", () => {
    test("Simple oninput for field", () => {
        const form = new Form()
        const mockChange = jest.fn((value) => value);
        
        form.oninput("name", mockChange);
        
        form.setValues({
            name: "Jack"
        })
        
        expect(mockChange.mock.results[0].value).toBe("Jack")
        expect(mockChange.mock.calls.length).toBe(1)
    })
    test("Field that not been effect should not be oninput executed.", () => {
        const form = new Form();
        const mockChange = jest.fn((value) => value);
        
        form.oninput('name', mockChange);
        form.setValues({
            username: "Test",
            nameper: "test",
            _name_: "test",
            nam: "test"
        })
        expect(mockChange.mock.calls.length).toBe(0)
    })
    test("Oninput for object value", () => {
        const form = new Form()
        const mockChange = jest.fn((value) => value);
    
        form.oninput("address", mockChange);
    
        form.setValues({
            address: {
                city: "Name"
            }
        })
    
        expect(mockChange.mock.results[0].value).toEqual({city: "Name"})
        expect(mockChange.mock.calls.length).toBe(1)
    })
    test("Using target for oninput primitive value", () => {
        const form = new Form()
        const mockChange = jest.fn((value) => value);
        
        form.oninput("address.city", mockChange);
        form.setValues({city: "Minsk"}, {target: "address"})
        expect(mockChange.mock.calls.length).toBe(1)
        expect(mockChange.mock.results[0].value).toEqual("Minsk")
    })
    /**
     * @issue https://github.com/Jenesius/vue-form/issues/123
     * */
    test("Using target for oninput", () => {
        const form = new Form()
        const mockChange = jest.fn((value) => value);
    
        form.oninput("address", mockChange);
        form.setValues({city: "Minsk"}, {target: "address"})
        expect(mockChange.mock.calls.length).toBe(1)
        expect(mockChange.mock.results[0].value).toEqual({city: "Minsk"})
    })
})