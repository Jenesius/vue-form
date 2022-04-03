import EventEmitter from "./EventEmitter";

export class Input extends EventEmitter{
	
	value: any;
	changes: any;
	
	name: string;
	
	constructor(params: InputParams) {
		super();
		this.name = params.name;
	}
	
	setValue(v: any) {
		this.value = v;
		
		this.emit('input', this.value);
	}
	getValue(){
		return this.value;
	}
}

export interface InputParams {
	name: string
}
