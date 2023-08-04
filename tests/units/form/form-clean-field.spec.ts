import Form from "../../../src/classes/Form";

describe("Form clean field", () => {
    test("Clean that not exist", () => {
        const form = new Form()
        form.cleanField("name")
        expect(form.values).toEqual({})
        expect(form.changes).toEqual({})
    })
    test("Clean field", () => {
        const form = new Form();
        form.setValues({
            name: "Jack",
            age: 24
        })
        form.cleanField("name")
        expect(form.changes).toEqual({})
        expect(form.values).toEqual({age: 24})
    })
    test("Clean field that was set in changes", () => {
        const form = new Form();
        form.change({
            name: "Jack",
            age: 24
        })
        form.cleanField("name")
        expect(form.changes).toEqual({age: 24})
        expect(form.values).toEqual({age: 24})
    })
    test("Clean field from child", () => {
        const form = new Form();
        const child = new Form({
            name: "address"
        });
        form.subscribe(child);
        
        form.setValues({
            address: {
                city: "Minsk",
                country: "Belarus"
            }
        })
        
        child.cleanField("country")
        
        expect(form.changes).toEqual({})
        expect(form.values).toEqual({
            address: {
                city: "Minsk"
            }
        })
    })
    test("Clean multi field that has primitive value", () => {
        const form = new Form();
        form.setValues({
            name: "Jack"
        })
        form.cleanField("name.username.test");
        expect(form.changes).toEqual({})
        expect(form.values).toEqual({
            name: "Jack"
        })
    })
})