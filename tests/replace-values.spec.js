import replaceValues from "../plugin/utils/replaceValues";

describe("ReplaceValues util", () => {
	
	test('Simple Object', () => {
		
		const v = {
			name: 'Jenesius'
		}
		
		expect(replaceValues(v)).toEqual({
			name: true
		})
		
	})
	
	test('Object with two fields', () => {
		
		const v = {
			city: "Mogilev",
			name: "Jenesius"
		}
		expect(replaceValues(v)).toEqual({
			city: true, name: true
		})
	})
	
	test('Hard object', () => {
		
		const v = {
			address: {
				city: {
					name: 'Mogilev'
				},
				description: "Small town"
			},
			age: 23,
			isNew: true
		}
		expect(replaceValues(v)).toEqual({
			address: {
				city: {
					name: true
				},
				description: true
			},
			age: true,
			isNew: true
		})
	})
	
})
