import bypassObject from "../../plugin/utils/bypass-object";

describe("Bypass object", () => {
	
	test('One field', () => {
		
		const v = {
			name: 'Jenesius'
		}
		
		expect(bypassObject(v)).toEqual([
			{
				path: ['name'],
				value: 'Jenesius'
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
				value: 11011
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
				value: 1
			},
			{
				path: ['person', 'profile', 'head', 'eyes'],
				value: 2
			}
		])
		
	});
	
	test('Composite name', () => {
		
		const v = {'address.name': null}
		
		expect(bypassObject(v)).toEqual([
			{
				path: ['address','name'],
				value: null
			}
		])
		
	})
	
})
