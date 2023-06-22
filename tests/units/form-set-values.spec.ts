import Form from "../../src/classes/Form";

describe("Form.setValues", () => {
    test("Should clean value if clean options is provided", () => {
        const form = new Form();
        const ADDRESS_CODE = 123456;
        form.setValues({ address: { city: "Berlin" } })
        form.setValues({ address: { code: ADDRESS_CODE } }, {clean: true})
        expect(form.values).toEqual({ address: { code: ADDRESS_CODE } })
    })
    test("Only child values should be cleaned after using clean option on child element.", () => {
        const form = new Form();
        const childForm = new Form({
            name: "address"
        })
        const COUNTRY_CODE = 123, NAME = "JACK";
        
        form.subscribe(childForm);
        form.setValues({ address: { country: { name: "German" }, test: 1 }, name: NAME })
        childForm.setValues({ country: { code: COUNTRY_CODE } }, {clean: true})
        expect(form.values).toEqual({ address: { code: COUNTRY_CODE }, name: NAME })
    })

})