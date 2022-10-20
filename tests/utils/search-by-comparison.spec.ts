import {searchByComparison} from "../../plugin/utils/search-changes-by-comparison";


describe("test", () => {
    it("1", () => {
        const defaultValues = {
            a: 1,
            d: 4
        }
        const changes = {
            a: 2,
            c: 3
        }

        const result = searchByComparison(defaultValues, changes);
        expect(result).toEqual([
            { name: 'a', oldValue: 1, newValue: 2 },
            { name: 'c', newValue: 3, oldValue: undefined },
            { name: 'd', newValue: undefined, oldValue: 4 }
        ])
    })

    it("2", () => {
        const input = {a: 1, b: 2, e: {e: 1}};
        const output = {a: {a: 1}, c: 3, e: {a: 1}};

        const result = searchByComparison(input, output);
        expect(result).toEqual([
            {
                name: "a",
                newValue: {a: 1},
                oldValue: 1,
            },
            {
                name: "a.a",
                oldValue: undefined,
                newValue: 1
            },
            {
                name: "b",
                newValue: undefined,
                oldValue: 2
            },
            { name: "c", newValue: 3, oldValue: undefined },
            { name: "e", newValue: {a: 1}, oldValue: {e: 1} },
            { name: "e.a", newValue: 1, oldValue: undefined },
            { name: "e.e", newValue: undefined, oldValue: 1 },

        ])

    })
    it("3", () => {
        const input  = { address: { city: { code: "A1" } } };
        const output = { address: { city: { code: "A2" } } };

        const result = searchByComparison(input, output);
        expect(result).toEqual([
            {
                name: 'address',
                oldValue: { city: { code: "A1" } },
                newValue: { city: { code: "A2" } }
            },
            {
                name: 'address.city',
                oldValue: { code: "A1" },
                newValue: { code: "A2" }
            },
            {
                name: 'address.city.code',
                oldValue: 'A1',
                newValue: 'A2'
            }
        ])
    })
    it ('4', () => {
        const input  = { address: { city: { code: "A1" } } };
        const output = { address: { city: { _code: "A2" } } };

        const result = searchByComparison(input, output);
        expect(result).toEqual([
            {
                name: 'address',
                oldValue: { city: { code: "A1" } },
                newValue: { city: { _code: "A2" } }
            },
            {
                name: 'address.city',
                oldValue: { code: "A1" },
                newValue: { _code: "A2" }
            },

            {
                name: 'address.city._code',
                oldValue: undefined,
                newValue: "A2"
            },
            {
                name: 'address.city.code',
                oldValue: 'A1',
                newValue: undefined
            },
        ])
    })
})