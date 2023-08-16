import iterateEndpoint from "./../../../src/utils/iterate-endpoint";

describe("Iterate endpoint", () => {
	test("One field iteration", () => {
		const values = {
			name: 'test'
		}
		expect(JSON.stringify(iterateEndpoint(values))).toEqual(JSON.stringify([{value: 'test', path: ['name'], set(){}}]))
	})
	test("Deepen object", () => {
		jest.fn()
		const values = {
			address: {
				city: "Berlin"
			}
		}
		// .map(a => ({value: a.value, path: a.path}))
		expect(JSON.stringify(iterateEndpoint(values))).toEqual(JSON.stringify([{value: 'Berlin', path: ['address', 'city']}]))
	})
	test("Setting values", () => {

		const values = {
			a: 1,
			b: 2,
			c: 3
		}
		const array = iterateEndpoint(values).map(a => ++a.value);
		expect(array).toEqual([2,3,4])
	})
	test('Values of data', () => {
		const values = {
			a: 1,
			b: "Jenesius",
			c: 1
		}
		expect(iterateEndpoint(values).map(a => a.value)).toEqual([1, "Jenesius", 1])
	})
	test("plain name", () => {
		const values = {
			"address.city": "Berlin"
		}
		expect(JSON.stringify(iterateEndpoint(values))).toEqual(JSON.stringify([{value: 'Berlin', path: ["address", "city"]}]))
	})
	test('Two deep fields', () => {
		const v = {
			person: {
				profile: {
					head: {
						mouth: 1,
						eyes: 2
					}
				}
			}
		};
		expect(JSON.stringify(iterateEndpoint(v))).toEqual(JSON.stringify([
			{
				value: 1,
				path: ['person', 'profile', 'head', 'mouth'],

			},
			{
				value: 2,
				path: ['person', 'profile', 'head', 'eyes'],

			}
		]))

	});
})

