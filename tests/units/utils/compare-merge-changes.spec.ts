import {compareMergeChanges} from "./../../../src/utils/compare-changes";

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
		const result = compareMergeChanges(values, {});
		expect(result).toEqual([]);
	})
	it("Result should be array with one item, after providing simple changes", () => {
		const result = compareMergeChanges(values, {b: 2});
		expect(result).toEqual([
			{
				name: 'b',
				newValue: 2,
				oldValue: undefined
			}
		])
	})
	it('should include empty object', function () {
		const result = compareMergeChanges({}, {address: {}})
		expect(result).toEqual([
			{
				name: "address",
				newValue: {},
				oldValue: undefined
			}
		])
	});
	it("Result should be array with one item, after providing simple changes", () => {
		const result = compareMergeChanges(values, {address: { city: 1 }});
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
		const result = compareMergeChanges(values, {a: { name: 123 }})
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
		const result = compareMergeChanges(values, {b: {name: 'b'}})
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
		const result = compareMergeChanges(values, {deep: {name: 'Burdin', world: 'x'}});
		expect(result).toEqual([
			{
				name: 'deep',
				newValue: {
					name: 'Burdin',
					world: "x"
				},
				oldValue: {
					name: "Jenesius"
				}
			},
			{
				name: 'deep.name',
				newValue: 'Burdin',
				oldValue: 'Jenesius'
			},
			{
				name: 'deep.world',
				newValue: 'x',
				oldValue: undefined
			},
		])
	})
	it("Array should includes changes from source object if was provided primitive value.", () => {
		const result = compareMergeChanges(values, {info: {population: undefined}});
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
	it('should be ', function () {
		const source = {
			address: {city: {code: "A1"} },
			name: "Jenesius"
		}
		const changes = {
			address: null
		}

		expect(compareMergeChanges(source, changes)).toEqual([
			{ name: "address", newValue: null, oldValue: {city: {code: "A1"} } },
			{ name: "address.city", newValue: undefined, oldValue: {code: "A1"} },
			{ name: "address.city.code", newValue: undefined, oldValue: "A1" },
		])
	});
	it('should ', function () {
		const source = {
			address: {
				city: "Berlin",
				country: "german"
			}
		}
		const changes = {
			address: {
				country: "German"
			}
		}

		expect(compareMergeChanges(source, changes)).toEqual([
			{ name: "address",
				newValue: {city: "Berlin", country: "German"},
				oldValue: { city: "Berlin", country: "german" }
			},
			{ name: "address.country", newValue: "German", oldValue: 'german' },

		])
	});

	test("test", () => {
		const source = {
			age: 1,
			name: "Jack",
			application: {
				name: "AA-1",
				customers: {},
				environments: {}
			}
		};
		const changes = {
			name: "Jen-esius"
		};

		expect(compareMergeChanges(source, changes)).toHaveLength(1);
		expect(compareMergeChanges(source, changes)).toEqual([{ name: "name", newValue: "Jen-esius", oldValue: 'Jack' },])
	})
})