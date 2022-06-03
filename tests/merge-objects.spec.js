import mergeObjects from "../plugin/utils/mergeObjects";

describe('', () => {
	
	test('1', () => {
		
		let a = {};
		mergeObjects(a, {sub: {name: null}})
		expect(a).toEqual({
			sub: {name: null}
		})
		
	})
	
})
