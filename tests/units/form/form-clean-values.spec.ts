import Form from "../../../src/classes/Form";

describe("Form clean values", () => {
    test("Simple clean values", () => {
        const form = new Form();
        form.setValues({
            name: "Jack"
        })
        expect(form.getValueByName('name')).toBe("Jack");
        form.cleanValues();
        expect(form.getValueByName('name')).toBe(undefined);
        expect(form.values).toEqual({})
    })
    test("Clean values with overwrite", () => {
        const form = new Form();
        form.setValues({
            name: "Jack",
            age: 23
        })
        expect(form.getValueByName('name')).toBe("Jack");
        form.cleanValues({
            name: "Jenesius"
        });
        expect(form.getValueByName('name')).toBe("Jenesius");
        expect(form.values).toEqual({name: "Jenesius"})
    })
    test("Clean values for children item", () => {
        const form = new Form();
        form.setValues({
            address: {
                city: "Mogilev"
            }
        })
        const child = new Form({name: "address"});
        form.subscribe(child);
        
        child.cleanValues();
        
        expect(form.values).toEqual({
            address: {}
        })
        expect(child.values).toEqual({});
    })
    test("Clean values for children item with override", () => {
        const form = new Form();
        form.setValues({
            address: {
                city: "Mogilev"
            }
        })
        const child = new Form({name: "address"});
        form.subscribe(child);
        
        child.cleanValues({
            country: "Belarus"
        });
        
        expect(form.values).toEqual({
            address: {
                country: "Belarus"
            }
        })
        expect(child.values).toEqual({
            country: "Belarus"
        });
    })
    
})