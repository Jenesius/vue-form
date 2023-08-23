import Form from "../../../src/classes/Form";

describe("Form.setValues", () => {
    test("Simple parsing values.", () => {
        const form = new Form();
        form.setValues({
            "address.city": "Berlin"
        })
        expect(form.values).toEqual({
            address: { city: "Berlin" }
        })
    })
    test("Multi run setValues.", () => {
        const form = new Form();
        form.setValues({ name: "Jack" })
        form.setValues({ age: 23 })
        form.setValues({ sex: 'm' })
        
        expect(form.values).toEqual({
            name: "Jack", age: 23, sex: 'm'
        })
    })
    test("Value must be override.", () => {
        const form = new Form();
        form.setValues({
            address: { city: "Berlin" }
        })
        form.setValues({
            "address.city": "New York"
        })
        expect(form.values).toEqual({
            address: {
                city: "New York"
            }
        })
    })
    test("By default changes should be empty.", () => {
        const form = new Form();
        expect(form.changes).toEqual({})
    })
    test("After executing setValues changes must be empty.", () => {
        const form = new Form();
        form.setValues({
            name: 'test'
        })
        expect(form.changes).toEqual({})
    })
    test("Changes should include just field that will be changed.", () => {
        const form = new Form();
        form.setValues({
            name: 'Jax'
        })
        form.change({
            age: 'test'
        })
        expect(form.changes).toEqual({
            age: 'test'
        })
    })
    test("Adding to field to changes.", () => {
        const form = new Form();
        
        form.setValues( { name: "Jenesius" } )
        form.setValues( {
            age: 23
        })
        form.setValues({
            address: {
                name: "home"
            }
        })
        form.change({
            address: {
                city: "Berlin"
            }
        })
        form.change({
            login: 'test'
        })
        expect(form.changes).toEqual({
            address: { city: "Berlin" },
            login: "test"
        })
    })
    test("Form's values must be equal to provided values.", () => {
        const form = new Form();
        form.setValues({
            name: 'Jack',
            address: {
                city: "Berlin"
            }
        })
        expect(form.values).toEqual({name: "Jack", address: { city: 'Berlin' }})
    })
    test("Should clean value if clean options is provided", () => {
        const form = new Form();
        const ADDRESS_CODE = 123456;
        form.setValues({ address: { city: "Berlin" } })
        form.setValues({ address: { code: ADDRESS_CODE } }, {clean: true})
        expect(form.values).toEqual({ address: { code: ADDRESS_CODE } })
    })
    test("After treating changes, the data should mixed with values", () => {
        const form = new Form();
        form.setValues({ address: { country: "Belarus" } })
        form.change({ address: { city: "Mogilev" } });
        
        expect(form.values).toEqual({ address: { country: "Belarus", city: "Mogilev" } });
        expect(form.changes).toEqual({ address: { city: "Mogilev" } });
    })
    test("Inserting empty object", () => {
        const form = new Form();
        form.setValues({ address: {} })
        form.setValues({ name: { } });
        
        expect(form.values).toEqual({ address: { }, name: { } });
    })
    test("Using clean option for simple value", () => {
        const form = new Form();
        form.setValues({
            name: "Jack"
        })
        form.setValues({age: 24}, {clean: true});
        expect(form.values).toEqual({age: 24})
    })
    test("Using clean options, the result values should be equal to provided values", () => {
        const form = new Form();
        form.setValues({
            address: {
                city: "Berlin",
                country: {code: 1}
            },
            name: "Jack"
        })
        form.setValues({address: {}}, {clean: true});
        expect(form.values).toEqual({address: {}})
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
    /**
     * @description Тест используется для того, чтобы показать суть clean опции вместе с change. Если она указана, значения, которые
     * не входят в исходный объект - они должны не просто убираться, а замещаться значение cleanValue.
     *
     * @explain Если указана опция clean вместе с change, в таком случае происходит полное сравнение переданных значений
     * со значениями в #values(Pure values). В данном примере в вызове setValues(clean: true) мы игнорируем значения
     * записанные ранее в changes, а полностью полагаемся на #values.
     */
    test("Using clean options all fields that don't consist in changes must be setted to null", () => {
        const form = new Form();
        form.setValues({ address: { country: "Belarus" }, name: "Jenesius" });
        form.setValues({address: {index: 1}, age: 24}, {change: true})
        form.setValues({ address: { city: "Mogilev" } }, { clean: true, change: true });

        expect(form.changed).toBe(true);
        expect(form.changes).toEqual({ address: { city: "Mogilev", country: undefined }, name: undefined })
        expect(form.values).toEqual( { address: { city: "Mogilev", country: undefined }, name: undefined })
    })
    test("Using clean with target should change field to undefined", () => {
        const form = new Form();
        form.setValues({
            city: "Mogilev",
            name: "123"
        }, {target: "address", change: true});
        
        form.setValues({
            country: "Minsk"
        }, {
            target: "address",
            clean: true,
            change: true
        })
        
        expect(form.changes).toEqual({
            address: {
                country: "Minsk"
            }
        })
        
    })
    test("Clean without change", () => {
        const form = new Form();
        form.setValues({ address: { city: 1, country: 2 } , name: "Jack"});
        form.setValues({ 'address.index': 123 }, {clean: true});
        expect(form.values).toEqual({
            address: {
                index: 123
            }
        })
    })
    test("Simple rewrite changes", () => {
        const form = new Form();
        form.setValues({name: "Jenesius"});
        form.setValues({name: "Burd"}, {change: true});
        form.setValues({name: "Burdin"});
        
        expect(form.changes).toEqual({});
        expect(form.values).toEqual({name: "Burdin"});
    })
    test("Mixing changes", () => {
        const form = new Form();
        form.setValues({
            address: {
                city: "Mogilev",
                country: "Belarus"
            }
        })
        
        form.setValues({
            address: {
                index: 123
            }
        }, { change: true, clean: true })
        
        expect(form.changes).toEqual({
            address: {
                index: 123
            }
        })
        
    })
    test("Using target option for set child value", () => {
        const form = new Form();
        form.setValues({name: "Berlin"}, {
            target: "address.city"
        })
        expect(form.values).toEqual({
            address: {
                city: {
                    name: "Berlin"
                }
            }
        })
    })
    test("Using target option for children item", () => {
        const form = new Form();
        const child = new Form({name: "mode"});
        form.subscribe(child);
        
        child.setValues({
            type: "T"
        }, { target: "compiler" })
        
        expect(form.values).toEqual({
            mode: {
                compiler: {
                    type: "T"
                }
            }
        })
    })
    test("Using target option for children item with change param", () => {
        const form = new Form();
        const child = new Form({name: "mode"});
        form.subscribe(child);
    
        child.setValues({
            name: "test"
        })
        child.setValues({
            type: "T"
        }, { target: "compiler", change: true })
    
        expect(form.values).toEqual({
            mode: {
                name: "test",
                compiler: {
                    type: "T"
                }
            }
        })
        expect(form.changes).toEqual({
            mode: {
                compiler: {
                    type: 'T'
                }
            }
        })
    })
    test("Using target option for clean just child position", () => {
        const form = new Form();
        form.setValues({ address: { country: "Belarus" }, name: "Jenesius" });
        form.setValues({ city: "Mogilev" }, { target: "address", clean: true });

        // Is not change option. In this case filed address.country should be empty, not null.
        expect(form.values).toEqual({ address: { city: "Mogilev" }, name: "Jenesius" });
    })
    /**
     * @description Тест используется для случая, в котором target ещё не был создан в form.values
     * */
    test("Using target for values that not exist in Form's values.", () => {
        const form = new Form();
        form.setValues({name: "Jack"}, {target: "application.customer"});
        
        expect(form.values).toEqual({
            application: {
                customer: {
                    name: "Jack"
                }
            }
        })
    })
    test("Using target with child", () => {
        const parent = new Form();
        const child = new Form({name: "customer"});
        parent.subscribe(child);
        child.setValues({ city: "Berlin" }, {target: "address"});
        
        expect(parent.values).toEqual({
            customer: {
                address: {
                    city: "Berlin"
                }
            }
        })
    })
    test("Using multi child with target", () => {
        const parent = new Form();
        const child1 = new Form({
            name: "address"
        });
        const child2 = new Form({
            name: "planet"
        });
        const child3 = new Form({
            name: "country"
        });
        
        parent.subscribe(child1);
        child1.subscribe(child2);
        child2.subscribe(child3);
        
        
        child3.setValues({ type: "default", value: 1 }, {target: "code"})
        
        expect(parent.values).toEqual({
            address: {
                planet: {
                    country: {
                        code: {
                            type: "default",
                            value: 1
                        }
                    }
                }
            }
        })
        
    })
    test("Using target option with change and clean for clean just child position", () => {
        const form = new Form();
        form.setValues({ address: { country: "Belarus" }, name: "Jenesius" });
        form.setValues({ city: "Mogilev" }, { target: "address", clean: true, change: true });

        // Is not change option. In this case filed address.country should be empty, not STORE.cleanValue.
        expect(form.values).toEqual({ address: { city: "Mogilev" }, name: "Jenesius" });
    })
    test("Using target option with change for clean just child position", () => {
        const form = new Form();
        form.setValues({ address: { country: "Belarus" }, name: "Jenesius" });
        form.setValues({ city: "Mogilev" }, { target: "address", change: true });

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
        expect(form.changes).toEqual({})
    })
    test("After execution setValues for composite object without change param, form must clean changes fields that consist in setValues", () => {
        const form = new Form();
        form.setValues({address: null, a: "a"});
        form.setValues({address: "0x000000"}, {change: true});
        form.setValues({address: { country: { index: 0 } } });
        expect(form.changes).toEqual({})
    })
    /**
     * @description Новое значение является примитивом, в отличии от предшествующего значения. То есть сложные объект за
     * меняется на примитив.
     * */
    test("New value is simplest value that was provided.", () => {
        const form = new Form();
        form.setValues({username: {name: "Jenesius"}})
        form.setValues({username: "Jenesius"});
        expect(form.values).toEqual({username: "Jenesius"})
    })
    test("Primitive value swapped to deep object. Changes must be cleaned.", () => {
        const form = new Form();
        form.setValues({
            address: {
                city: "Stone"
            }
        }, {change: true});
        expect(form.changes).toEqual({address: {city: "Stone"}})
        form.setValues({
            address: {
                city: {
                    index: 0
                }
            }
        })
        expect(form.changes).toEqual({})
    })
    test("Value of field should be mixed with provided new data.", () => {
        const form = new Form();
        form.setValues({
            address: {
                city: {
                    name: "Berlin"
                },
                country: "DE",
                index: 1
            }
        })
        form.setValues({
            address: {}
        })
        
        expect(form.values).toEqual({address: { city: {name: "Berlin"}, country: "DE", index: 1 }})
    })
    test("Using multi target object with child Form", () => {
        const form = new Form();
        const child = new Form({
            name: "address"
        })
        form.subscribe(child)
        child.setValues({
            index: 1
        }, {
            target: "planet.city"
        })
        
        expect(form.values).toEqual({
            address: {
                planet: {
                    city: {
                        index: 1
                    }
                }
            }
        })
    })
    test("Using clean options with change", () => {
        const form = new Form();
        
        form.change({
            username: "Jack"
        })
        
        form.setValues({}, {
            change: true, clean: true
        })
        
        expect(Object.keys(form.changes).length).toBe(0)
    })
    test("Reverting data after enter the same value", () => {
        const form = new Form();
        form.setValues({
            name: "Jack"
        })
        form.change({
            name: "Jack-1"
        })
        
        expect(form.changes).toEqual({ name: "Jack-1" })
        
        form.change({
            name: "Jack"
        })
        
        expect(form.changes).toEqual({})
    })
    test("Setting equal object using setValues after change", () => {
        const form = new Form()
        form.change({
            username: "Jack"
        })
        form.setValues({
            username: "Jack"
        })

        expect(form.changes).toEqual({})
        expect(form.values).toEqual({ username: "Jack" })
    })
    
})