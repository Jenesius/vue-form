import Form from "../../../src/classes/Form";

describe("Form pure values", () => {
    test("By default should return empty object", () => {
        const form = new Form()
        expect(form.pureValues).toEqual({})
    })
    test("Should return values that was set after setValues", () => {
        const form = new Form();
        form.setValues({
            name: "Jack"
        })
        expect(form.pureValues).toEqual({
            name: "Jack"
        })
    })
    test("Should return empty object after change function", () => {
        const form = new Form();
        form.change({
            name: "Jack"
        })
        expect(form.pureValues).toEqual({})
    })
    test("Get pure values from child", () => {
        const form = new Form();
        const child = new Form({
            name: "address"
        })
        form.subscribe(child);
        
        form.setValues({
            address: {
                city: "Name"
            }
        })
        expect(child.pureValues).toEqual({
            city: "Name"
        })
    })
    test("Should return empty object for child component", () => {
        const form = new Form();
        const child = new Form({
            name: "address"
        })
        form.subscribe(child);

        expect(child.pureValues).toEqual({})
    })
})