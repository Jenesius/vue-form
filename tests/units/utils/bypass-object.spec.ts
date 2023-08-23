import bypassObject from "../../../src/utils/bypass-object";

describe("Bypass object", () => {
	
	test('One field', () => {
		
		const v = {
			name: 'Jenesius'
		}
		
		expect(bypassObject(v)).toEqual([
			{
				path: ['name'],
				value: 'Jenesius',
				name: 'name',
				set: expect.any(Function)
			}
		])
		
	});
	
	test('Deep field', () => {
		
		const v = {
			address: {
				city: {
					index: 11011
				}
			}
		}
		
		expect(bypassObject(v)).toEqual([
			{
				path: ['address', 'city', 'index'],
				value: 11011,
				name: "address.city.index",
				set: expect.any(Function)
			}
		])
		
	});
	
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
		
		expect(bypassObject(v)).toEqual([
			{
				path: ['person', 'profile', 'head', 'mouth'],
				value: 1,
				name: "person.profile.head.mouth",
				set: expect.any(Function)
			},
			{
				path: ['person', 'profile', 'head', 'eyes'],
				value: 2,
				name: "person.profile.head.eyes",
				set: expect.any(Function)
			}
		])
		
	});
	
	test('Composite name', () => {
		
		const v = {'address.name': null}
		
		expect(bypassObject(v)).toEqual([
			{
				path: ['address','name'],
				value: null,
				name: "address.name",
				set: expect.any(Function)
			}
		])
		
	})

	test("One field iteration", () => {
		const values = {
			name: 'test'
		}
		expect(bypassObject(values)).toEqual([
			{
				value: 'test',
				path: ['name'],
				name: 'name',
				set: expect.any(Function)
			}
		])
	})
	test("Deepen object", () => {
		jest.fn()
		const values = {
			address: {
				city: "Berlin"
			}
		}
		// .map(a => ({value: a.value, path: a.path}))
		expect(bypassObject(values)).toEqual(
			[
				{
					value: 'Berlin',
					path: ['address', 'city'],
					name: 'address.city',
					set: expect.any(Function)
				}
			]
		)
	})
	test("Setting values", () => {

		const values = {
			a: 1,
			b: 2,
			c: 3
		}
		const array = bypassObject(values).map(a => ++a.value);
		expect(array).toEqual([2,3,4])
	})
	test('Values of data', () => {
		const values = {
			a: 1,
			b: "Jenesius",
			c: 1
		}
		expect(bypassObject(values).map(a => a.value)).toEqual([1, "Jenesius", 1])
	})
	test("plain name", () => {
		const values = {
			"address.city": "Berlin"
		}
		expect(bypassObject(values)).toEqual(
			[
				{
					value: 'Berlin',
					path: ["address", "city"],
					name: "address.city",
					set: expect.any(Function)
				}
			]
		)
	})
})
