import getCastObject from "../../plugin/utils/get-cast-object";

describe("Get cast object: utils", () => {
	test("simple", () => {
		
		const v = {
			name: 'Jenesius',
			city: 'Mogilev'
		};
		const cast = {
			name: true
		};
		
		expect(getCastObject(v, cast))
		.toEqual({
			name: 'Jenesius'
		})
		
	})
	
	test("Hard", () => {
		
		const v = {
			name: 'Jenesius',
			address: {
				city: {
					name: 'Mogilev'
				}
			},
			type: {
				a: 1,
				b: 2
			},
			tester: {tester: {tester: {tester: true}}},
			lel: 1,
			lol: 2,
			kek: 3,
			in: {
				in: { a: 1 },
				on: { b: 2 },
				of: { c: 3 }
			},
			school: {
				name: 'test'
			}
		};
		const cast = {
			name: true,
			address: {city: {name: true}},
			type: {a: true, b: true}
		};
		
		expect(getCastObject(v, cast))
		.toEqual({
			name: 'Jenesius',
			address: {
				city: {
					name: 'Mogilev'
				}
			},
			type: {
				a: 1,
				b: 2
			}
		})
		
	})
});
