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
    test("After treating changes, the data should mixed with values", () => {
        const form = new Form();
        form.setValues({ address: { country: "Belarus" } })
        form.change({ address: { city: "Mogilev" } });

        expect(form.values).toEqual({ address: { country: "Belarus", city: "Mogilev" } });
        expect(form.changes).toEqual({ address: { city: "Mogilev" } });
    })
    test("Using clean options all fields that don't consist in changes must be setted to null", () => {
        const form = new Form();
        form.setValues({ address: { country: "Belarus" }, name: "Jenesius" });
        form.setValues({ address: { city: "Mogilev" } }, { clean: true, change: true });

        expect(form.changed).toBe(true);
        expect(form.changes).toEqual({ address: { city: "Mogilev", country: null }, name: null })
        expect(form.values).toEqual( { address: { city: "Mogilev", country: null }, name: null })
    })
    test("Using target option for clean just child position", () => {
        const form = new Form();
        form.setValues({ address: { country: "Belarus" }, name: "Jenesius" });
        form.setValues({ city: "Mogilev" }, { targetName: "address", clean: true });

        // Is not change option. In this case filed address.country should be empty, not null.
        expect(form.values).toEqual({ address: { city: "Mogilev" }, name: "Jenesius" });
    })
    test("Using target option with change and clean for clean just child position", () => {
        const form = new Form();
        form.setValues({ address: { country: "Belarus" }, name: "Jenesius" });
        form.setValues({ city: "Mogilev" }, { targetName: "address", clean: true, change: true });

        // Is not change option. In this case filed address.country should be empty, not STORE.cleanValue.
        expect(form.values).toEqual({ address: { city: "Mogilev", country: null }, name: "Jenesius" });
    })
    test("Using target option with change for clean just child position", () => {
        const form = new Form();
        form.setValues({ address: { country: "Belarus" }, name: "Jenesius" });
        form.setValues({ city: "Mogilev" }, { targetName: "address", change: true });

        // Is not change option. In this case filed address.country should be empty, not null.
        expect(form.values).toEqual({ address: { city: "Mogilev", country: "Belarus" }, name: "Jenesius" });
    })
})