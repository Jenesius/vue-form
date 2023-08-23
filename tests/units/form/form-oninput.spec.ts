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
    test("Using oninput for child item", () => {
        const form = new Form();
        const child = new Form({
            name: "address"
        })
        form.subscribe(child)
        const mockChange = jest.fn((value) => value);
        
        child.oninput('city', mockChange);
        
        form.setValues({
            address: {
                city: "Berlin"
            }
        })
        child.setValues({
            city: "Minsk"
        })
        
        expect(mockChange.mock.calls.length).toBe(2);
        expect(mockChange.mock.results[0].value).toBe("Berlin")
        expect(mockChange.mock.results[1].value).toBe("Minsk")
    })
    
    test("Using multi name for child item", () => {
        const form = new Form();
        const child = new Form({
            name: "address"
        })
        form.subscribe(child)
        const mockChange = jest.fn((value) => value);
    
        child.oninput('city.index', mockChange);
        
        form.setValues({
            address: {
                city: {
                    index: 23
                }
            }
        })
        expect(mockChange.mock.calls.length).toBe(1);
        expect(mockChange.mock.results[0].value).toBe(23)
    })
    test("Using child and target together", () => {
        const form = new Form();
        const child = new Form({
            name: "address.city"
        })
        
        form.subscribe(child)
        const mockChange = jest.fn((value) => value);
    
        form.oninput('address.city.index.type', mockChange);
        
        child.setValues({
            type: "A"
        }, {
            target: "index"
        })
    
        expect(mockChange.mock.calls.length).toBe(1);
        expect(mockChange.mock.results[0].value).toBe("A")
    })
    test("Should execute mock for each deep item with target", () => {
        const form = new Form();
        const mockChange = jest.fn(value => value);
        form.oninput('address', mockChange)
        form.oninput('address.city', mockChange)
        form.oninput('address.city.index', mockChange)
        form.oninput('address.city.index.type', mockChange)
        
        form.setValues({
            type: "A"
        }, {target: "address.city.index"})
        
        expect(mockChange.mock.results.length).toBe(4);
        expect(mockChange.mock.results[0].value).toEqual({city: {index: {type: "A"}}});
        expect(mockChange.mock.results[1].value).toEqual({index: {type: "A"}});
        expect(mockChange.mock.results[2].value).toEqual({type: "A"});
        expect(mockChange.mock.results[3].value).toBe("A");
    })
    test("Should execute mock for each deep item without target", () => {
        const form = new Form();
        const mockChange = jest.fn(value => value);
        form.oninput('address', mockChange)
        form.oninput('address.city', mockChange)
        form.oninput('address.city.index', mockChange)
        form.oninput('address.city.index.type', mockChange)
        
        form.setValues({
            address: {
                city: {
                    index: {
                        type: "B"
                    }
                }
            }
        })
        
        expect(mockChange.mock.results.length).toBe(4);
        expect(mockChange.mock.results[0].value).toEqual({city: {index: {type: "B"}}});
        expect(mockChange.mock.results[1].value).toEqual({index: {type: "B"}});
        expect(mockChange.mock.results[2].value).toEqual({type: "B"});
        expect(mockChange.mock.results[3].value).toBe("B");
    })
    test("Revert should not execute field that not be effected", () => {
        const form = new Form();
        form.setValues({
            name: "Jack"
        })
        const mockChange = jest.fn(v => v);
        form.oninput('login', mockChange);
        form.revert();
        
        expect(mockChange.mock.calls.length).toBe(0);
    })
    test("Revert should execute oninput", () => {
        const form = new Form();
        form.change({
            name: "Jack"
        })
        const mockChange = jest.fn(v => v);
        form.oninput('name', mockChange);
        form.revert();
        
        expect(mockChange.mock.calls.length).toBe(1);
        expect(mockChange.mock.results[0].value).toBe(undefined);
        expect(form.changes).toEqual({})
    })
    test("Setting the same value should not execute event", () => {
        const form = new Form();
        const mockOninput = jest.fn(x => x);
        form.oninput('age', mockOninput);

        form.setValues({age: 1})
        form.setValues({age: 3})
        form.setValues({age: 3});
        form.setValues({age: 3});
        expect(mockOninput.mock.results.length).toBe(2)
        expect(mockOninput.mock.results[0].value).toBe(1)
        expect(mockOninput.mock.results[1].value).toBe(3)
    })
    test("Setting the same value after change should not execute event", () => {
        const form = new Form();
        const mockOninput = jest.fn(x => x);
        form.oninput('age', mockOninput);

        form.change({age: 23})
        form.setValues({age: 24})

        expect(mockOninput.mock.results.length).toBe(2)
        expect(mockOninput.mock.results[0].value).toBe(23)
        expect(mockOninput.mock.results[1].value).toBe(24)
    })
})