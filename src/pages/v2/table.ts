import EventEmitter from "jenesius-event-emitter";
import {Form} from "../../../plugin";

export default class Table extends EventEmitter{

	constructor() {
		super();

		this.on(Form.EVENT_VALUE, () => this.setChanged(true));
	}

	values: any[] = []
	add(v: any) {
		this.values.push(v);
		this.emit(Form.EVENT_VALUE);
	}
	changed: boolean = false;
	setChanged(v:boolean) {
		if (v === this.changed) return;

		this.changed = v;
		this.emit(Form.EVENT_CHANGED, v);
	}
	changes: any[] = []
	read() {

	}
	save() {}


}