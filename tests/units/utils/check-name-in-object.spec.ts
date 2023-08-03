import checkNameInObject from "../../../src/utils/check-name-in-object";

describe("Tests for check name in object", () => {

    test("Simple test. Should be true in inline object", () => {
        const obj = {
            name: 'Jenesius'
        }
        expect(checkNameInObject(obj, 'name')).toBe(true);
    })

    test("Should be false when provided wrong name", () => {
        const obj = {
            label: "Mark"
        }
        expect(checkNameInObject(obj, 'name')).toBe(false);
    })
    test('Should be false when provided long composite name', () => {
        const obj = {
            user: {
                address: {
                    city: {
                        name: 'Mogilve'
                    }
                }
            }
        }
        expect(checkNameInObject(obj, 'user.email.short')).toBe(false);
    })
    test("Should be false when some intermediate value is primitive", () => {
        const obj = {
            user: {
                address: null
            }
        }
        expect(checkNameInObject(obj, 'user.address.city.name')).toBe(false);
    })

    test('True, when long composite name included', () => {
        const obj = {
            user: {
                address: {
                    city: {
                        name: "mogilev"
                    }
                }
            }
        }
        expect(checkNameInObject(obj, 'user.address.city.name')).toBe(true);
    })

})