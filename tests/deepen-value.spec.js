import deepenValue from "../plugin/utils/deepenValue";

describe("utils", () => {

	test("Simple name with simple value", () => {
		expect(deepenValue('name', null)).toEqual({name: null})
	})
	test("Composite name with simple value", () => {
		expect(deepenValue('name.sub', null)).toEqual({name: {sub: null}})
	})
	test("Simple name with composite value", () => {
		expect(deepenValue('name', {sub: null})).toEqual({name: {sub: null}})
	})
	test("Composite name with composite value", () => {
		expect(deepenValue('name.test', {sub: null})).toEqual(
			{name: {test: {sub: null}}}
		)
	})
	
	test("Composite name with double composite value", () => {
		expect(deepenValue('name.test', {sub: {level: null}})).toEqual(
			{name: {test: {sub: {level: null}}}}
		)
	})
	
	test("Composite HARD value", () => {
		expect(deepenValue('name.test', {
			sub: {a: 1, b: 2, c: 3},
			dd: 1,
			c: {a: 1, b: 1}
		})).toEqual({
			name: {
				test: {
					sub: {a: 1, b: 2, c: 3},
					dd: 1,
					c: {a: 1, b: 1}
				}
			}
		})
	})

	test("Composite values with composite value's name", () => {
		expect(deepenValue('name.value', {
			'sub.name': null
		})).toEqual({
			name: {
				value: {
					sub: {
						name: null
					}
				}
			}
		})
	})
	
	test(`Composite values with HARD composite value's name`, () => {
		expect(deepenValue('name.value', {
			'sub.name': {
				'test.name.value': 1,
				'test.name.data': 2,
				'test.abort': 3
			},
			'sub.name.test.name.age': 4
		})).toEqual({
			name: {
				value: {
					sub: {
						name: {
							test: {
								name: {
									value: 1,
									data: 2,
									age: 4
								},
								abort: 3
							}
						}
					}
				}
			}
		})
	})
	
})
/**
 * name 15     -> {name: 15}
 * name.sub 15 -> {name: {sub: 15}}
 * name { test: 15} -> {name: {test: 15}}
 * name.test {sub: 15} -> {name: {test: {sub: 15}}}
 *
 * name.test {sub: {level: 15}} -> {name: {test: {sub: {level: {15}}}}}
 *
 * name.test {sub: {a: 1, b: 2, c: 3}, dd: 1, c: {a: 1,b: 1}}
 * 	->
 * 	{
 * 	    name: {
 * 	        test: {
 * 	            sub: {
 * 	                a: 1, b: 2, c: 3
 * 	            },
 * 	            dd: 1,
 * 	            c: {
 * 	                a: 1, b: 1
 * 	            }
 * 	        }
 * 	    }
 * 	}
 *
 * */
