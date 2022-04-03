import EventEmitter from "./EventEmitter";
import {reactive, ref} from "vue";

export class Input extends EventEmitter{
	
	state = reactive<{
		value: any
	}>({
		value: undefined
	})
	
	value = ref();
	changes: any;
	
	name: string;
	
	constructor(params: InputParams) {
		super();
		this.name = params.name;
	}
	
	setValue(v: any) {
		
		console.log(`Input %c${this.name} %cset value %c${v}`, 'color: green', 'color: black', 'color: red')
		
		this.state.value = v;
		
		this.emit('input', this.state.value);
	}
	getValue(){
		return this.state.value;
	}
}

export interface InputParams {
	name: string
}
