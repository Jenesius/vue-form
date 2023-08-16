import mergeObjects from "./../../../src/utils/merge-objects";

describe('MergeObject', () => {
	
	test('Merging to simple object', () => {
		expect(mergeObjects({ a: 1 }, { b: 2}))
		.toEqual({ a: 1, b: 2})
	})
	test('Merging to simple object with deeo values', () => {
		expect(mergeObjects({ a: 1, c: {a: 1} }, { b: 2, c: {b: 2}}))
		.toEqual({ a: 1, b: 2, c: {a: 1, b: 2}})
	})
	test('Merge deep value', () => {
		expect(mergeObjects({}, {a: {a: {a: {a: 1}}}})).toEqual({a: {a: {a: {a: 1}}}})
		
	})

	test("Init value of property is NULL", () => {

		const value = {
			address: null
		}
		mergeObjects(value, {
			address: { city: 'Mogilev' }
		})

		expect(value).toEqual({
			address: {
				city: 'Mogilev'
			}
		})
	})

	test('empty target merger object', () => {

		const value = {};
		mergeObjects(value, {
			address: {
				city: {
					name: 11
				}
			}
		})
		expect(value).toEqual({
			address: {
				city: {
					name: 11
				}
			}
		})

	})

	test('Simple null value', () => {
		
		let a = {};
		mergeObjects(a, {sub: {name: null}})
		expect(a).toEqual({
			sub: {name: null}
		})
		
	})

	
})
