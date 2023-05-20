import compareChanges from "@/utils/compare-changes";

describe("Testing compare changes", () => {
	test("Old value is empty object. It should return all props from new values.",() => {
		const newValue = {
			name: "Jenesius",
			address: {
				city: "Mogilev",
				country: "Belarus"
			}
		}
		expect(compareChanges(newValue, {})).toEqual([
			{ name: "name", newValue: "Jenesius", oldValue: undefined },
			{ name: "address", newValue: {city: "Mogilev", country: "Belarus"}, oldValue: undefined },
			{ name: "address.city", newValue: "Mogilev", oldValue: undefined },
			{ name: "address.country", newValue: "Belarus", oldValue: undefined },
		])
	})
	test("New value is empty object. It should return all props from old values",() => {
		const oldValue = {
			coordinate: {
				x: 1,
				y: 2
			}
		}
		expect(compareChanges({}, oldValue)).toEqual([
			{ name: "coordinate", newValue: undefined, oldValue: { x: 1, y: 2 } },
			{ name: "coordinate.x", newValue: undefined, oldValue: 1 },
			{ name: "coordinate.y", newValue: undefined, oldValue: 2 },
		])
	})
	test("Equal values should return empty array.",() => {
		const newValue = {
			name: "Jenesius",
			address: {
				planet: "Earth"
			}
		}
		const oldValue = {
			name: "Jenesius",
			address: {
				planet: "Earth"
			}
		}
		expect(compareChanges(newValue, oldValue)).toEqual([])
	})
	test("It should return only one field that was changed.",() => {
		const newValue = {
			name: "Jenesius",
			age: 24
		}
		const oldValue = {
			name: "Jenesius",
		}
		expect(compareChanges(newValue, oldValue)).toEqual([
			{ name: "age", newValue: 24, oldValue: undefined }
		])
	})

	test("",() => {

	})
	test("",() => {})
	test("",() => {})
	test("",() => {})
	test("",() => {})
	test("",() => {})
	test("",() => {})
	test("",() => {})
	test("",() => {})
	test("",() => {})
	test("",() => {})

})