import plainObject from "../../plugin/utils/plain-object";

describe('Plain object', () => {
	
	test('One field', () => {
		const v = {
			name: 'Jenesius'
		}
		
		expect(plainObject(v)).toEqual({
			name: 'Jenesius'
		});
		
	})
	
	test('Deep field', () => {
		const v = {
			address: { city: { index: 1 } }
		}
		expect(plainObject(v)).toEqual({
			'address.city.index': 1
		})
		
	})
	
	
})
