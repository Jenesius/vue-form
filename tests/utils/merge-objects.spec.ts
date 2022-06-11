import mergeObjects from "../../plugin/utils/merge-objects";

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
	
	test('1', () => {
		
		let a = {};
		mergeObjects(a, {sub: {name: null}})
		expect(a).toEqual({
			sub: {name: null}
		})
		
	})
	
})
