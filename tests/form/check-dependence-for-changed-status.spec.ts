import {Form} from "../../plugin";
import Input from "../../plugin/classes/Input";

describe("Check name for changed status", () => {

	test("After execute change status of changed input must be true", () => {
		const form = new Form();

		const input_1 = new Input({name: 'name'});
		const input_2 = new Input({name: 'login'});

		form.subscribe(input_1);
		form.subscribe(input_2);

		form.change({
			name: "Jenesius"
		})

		expect(form.checkDependenceForChangedStatus(input_1.name)).toBe(true)
		expect(form.checkDependenceForChangedStatus(input_2.name)).toBe(false)
	})

})