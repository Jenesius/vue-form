import Form from "../../../src/classes/Form";

describe("Form revert changes", () => {
    test("Revert data from parent component", () => {
        const form = new Form();
        form.change({
            name: "Jenesius"
        })
        form.revert()
        expect(form.values).toEqual({})
    })
    test("Revert data only for child", () => {
        const form = new Form();
        const child = new Form({
            name: "address"
        })
        form.subscribe(child);
        
        form.change({
            address: {
                city: "Mogilev"
            },
            username: "Jenesius"
        })
        
        child.revert();
        expect(form.values).toEqual({
            username: "Jenesius"
        })
        expect(child.values).toEqual({});
    })
    test("Revert data from parent", () => {
        const form = new Form();
        const child = new Form({name: "address"});
        form.subscribe(child);
        
        form.change({
            address: {
                name: "aa"
            },
            aa: 123
        })
        form.revert();
        expect(form.values).toEqual({})
        expect(child.values).toEqual({})
    })
    test("Reverting changes that has default values.", () => {
        const form = new Form();
        form.setValues({
            coordinate: {
                x: "13"
            }
        })
        form.change({
            ["coordinate.x"]: "100"
        })
        
        expect(form.values).toEqual({coordinate: {x: "100"}})
        expect(form.changes).toEqual({coordinate: {x: "100"}})
        
        expect(form.changed).toBe(true)
        
        form.revert();
        
        expect(form.values).toEqual({coordinate: {x: "13"}})
        expect(form.changes).toEqual({})
    })
    
})