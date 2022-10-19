import {searchChangesByComparison} from "../../plugin/utils/search-changes-by-comparison";

const values = {
    a: 1,
    deep: {
        name: "Jenesius"
    },
    info: {
        population: {
            name: "Belarus",
            count: 10000000,
            tags: ["BY", "RB"],
            nearestCountries: {
                Poland: {
                    code: "P"
                },
                Ukraine: {
                    code: "U"
                }
            }
        }
    }
}

describe("find changes", () => {
    it("Result should be empty array. Provided empty changes", () => {
        const result = searchChangesByComparison(values, {});
        expect(result).toEqual([]);
    })
    it("Result should be array with one item, after providing simple changes", () => {
        const result = searchChangesByComparison(values, {b: 2});
        expect(result).toEqual([
            {
                name: 'b',
                newValue: 2,
                oldValue: undefined
            }
        ])
    })
    it("Result should be array with one item, after providing simple changes", () => {
        const result = searchChangesByComparison(values, {address: { city: 1 }});
        expect(result).toEqual([
            {
                name: 'address',
                newValue: { city: 1 },
                oldValue: undefined
            },
            {
                name: 'address.city',
                newValue: 1,
                oldValue: undefined
            }
        ])
    })
    it("Primitive value ot composite", () => {
        const result = searchChangesByComparison(values, {a: { name: 123 }})
        expect(result).toEqual([
            {
                name: 'a', oldValue: 1, newValue: {name: 123}
            },
            {
                name: 'a.name', oldValue: undefined, newValue: 123
            }
        ])
    })
    it("Changes not exist in OldValues", () => {
        const result = searchChangesByComparison(values, {b: {name: 'b'}})
        expect(result).toEqual([
            {
                name: 'b', oldValue: undefined, newValue: {name: 'b'}
            },
            {
                name: 'b.name', oldValue: undefined, newValue: 'b'
            }
        ])
    })
    it("Depp changes. Result should be full heavy object.", () => {
        const result = searchChangesByComparison(values, {deep: {city: 'Mogilev', name: 'Burdin'}});
        expect(result).toEqual([
            {
                name: 'deep',
                newValue: {
                    city: 'Mogilev', name: 'Burdin'
                },
                oldValue: { name: "Jenesius" }
            },
            {
                name: 'deep.city',
                newValue: 'Mogilev',
                oldValue: undefined
            },
            {
                name: 'deep.name',
                newValue: 'Burdin',
                oldValue: 'Jenesius'
            }
        ])
    })
    it("Array should includes changes from source object if was provided primitive value.", () => {
        const result = searchChangesByComparison(values, {info: {population: undefined}});
        expect(result).toEqual([
            {
                name: "info", newValue: { population: undefined }, oldValue: values.info
            },
            {
                name: "info.population", newValue: undefined, oldValue: values.info.population
            },
            {
                name: "info.population.name", newValue: undefined, oldValue: "Belarus",
            },
            {
                name: "info.population.count", newValue: undefined, oldValue: 10000000
            },
            {
                name: "info.population.tags", newValue: undefined, oldValue: ["BY", "RB"]
            },
            {
                name: "info.population.nearestCountries", newValue: undefined, oldValue: values.info.population.nearestCountries
            },
            {
                name: "info.population.nearestCountries.Poland", newValue: undefined, oldValue: values.info.population.nearestCountries.Poland,
            },
            {
                name: "info.population.nearestCountries.Poland.code", newValue: undefined, oldValue: 'P',
            },
            {
                name: "info.population.nearestCountries.Ukraine", newValue: undefined, oldValue: values.info.population.nearestCountries.Ukraine,
            },
            {
                name: "info.population.nearestCountries.Ukraine.code", newValue: undefined, oldValue: 'U',
            }
        ]);
    })
})