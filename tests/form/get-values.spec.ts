import Form from "./../../plugin/classes/Form"

describe('Form:getValues', () => {

	test('Without arguments. Should return all values.', function () {
		const form = new Form();
		form.setValues({ name: 'Jenesius' })

		expect(form.getValues()).toEqual({name: 'Jenesius'})
	});

	test('String arguments. Should return only values for provided names.', function () {
		const form = new Form();
		form.setValues({ name: 'Jenesius', age: '23', status: 'Master' })

		expect(form.getValues('name', 'status')).toEqual({name: 'Jenesius', status: 'Master'});
	});

	test('Deep values. Should grand provided names.', () => {
		const form = new Form();
		form.setValues({name: 'test', address: { city: 'Berlin', country: "German"}})

		expect(form.getValues('address.city')).toEqual({
			address: {
				city: 'Berlin'
			}
		})
	})

})