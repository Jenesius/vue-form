import CompareEvent from "../../../src/classes/CompareEvent";

describe("Compare Event", () => {
	test("Should restore fields that bind with address", () => {
		const newValue = {
			address: {
				city: "Mogilev"
			},
			name: "Jenesius",
			age: 24
		}
		const event = new CompareEvent({}, newValue);
		const addressEvent = CompareEvent.restoreByName(event, 'address');

		expect(addressEvent.comparison).toEqual([
			{
				name: '', newValue: { city: "Mogilev" }, oldValue: undefined
			},
			{
				name: "city", newValue: "Mogilev", oldValue: undefined
			}
		])
	})
	test("Should restore fields that bind with address", () => {
		const newValue = {
			address: {
				city: "Mogilev"
			},
			name: "Jenesius",
			age: 24
		}
		const event = new CompareEvent({} ,newValue);
		const addressEvent = CompareEvent.restoreByName(event, 'coordinate');

		expect(addressEvent.comparison).toEqual([])
	})
})