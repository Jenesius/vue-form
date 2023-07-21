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
        expect(form.values).toEqual({ address: { country: { code: COUNTRY_CODE } }, name: NAME })
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
    test("New value rewrite null by composite object.", () => {
        const form = new Form();
        form.setValues({address: {city: null}, a: "a"});
        form.setValues({address: { city: { index: 0, platform: { planet: "Earth" } } } } );

        expect(form.values).toEqual({address: { city: { index: 0, platform: { planet: "Earth" } } }, a: "a"})
    })
    test("Using change:true and after setValues, the name that provided in second setValues must clean 'changed' status field to false", () => {
        const form = new Form();
        form.setValues({name: "Jenesius"});
        form.setValues({name: "Bur"}, {change: true} );
        expect(form.changes).toEqual({name: "Bur"});
        form.setValues({name: "Burdin"});
        expect(form.changes).toEqual({});
    })
    test("Using change:true for rewriting null value", () => {
        const form = new Form();
        form.setValues({address: {city: null, index: 0}, a: "a"});
        form.setValues({address: { city: { platform: { planet: "Earth" } } } }, {change: true});

        expect(form.changes).toEqual({address: { city: { platform: { planet: "Earth" } } }})
    })
    test("After execution setValues without change param, form must clean changes fields that consist in setValues", () => {
        const form = new Form();
        form.setValues({address: {city: null, index: 0}, a: "a"});
        form.setValues({address: { city: { platform: { planet: "Earth" } } } }, {change: true});
        form.setValues({address: "0x000000"});
        expect(form.changes).toEqual({address: "0x000000"})
    })
    test("After execution setValues for composite object without change param, form must clean changes fields that consist in setValues", () => {
        const form = new Form();
        form.setValues({address: null, a: "a"});
        form.setValues({address: "0x000000"}, {change: true});
        form.setValues({address: { country: { index: 0 } } });
        expect(form.changes).toEqual({})
    })
})