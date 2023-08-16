import convertOptionsObject from "../../../src/utils/convert-options-object";

describe("Test for convertOptionsObject", () => {

	test('Simple test', () => {
		const data = {
			1: 'Title1',
			2: 'Title2'
		}
		expect(convertOptionsObject(data)).toEqual([{value: "1", label: 'Title1'}, {value: "2", label: 'Title2'}])
	})

	test('Hard values of object', () => {
		const data = {
			'Man Jack': {name: "Jack"},
			'Girl Jen': {name: "Jen"}
		}
		expect(convertOptionsObject(data, 'reverse')).toEqual([
			{
				value: {name: "Jack"},
				label: 'Man Jack'
			},
			{
				value: {name: "Jen"},
				label: 'Girl Jen'
			}
		])
	})

})