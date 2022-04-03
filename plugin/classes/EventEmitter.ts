
type Callback = (v: void | any) => void | Promise<any>;

interface EventEmitterInterface{
	emit: (event: string, data?:any) => Promise<any>,
	on: (event: string, callback: Callback) => void
}
 class EventEmitter implements EventEmitterInterface {
	
	private eventsState: {[name: string]: Array<Callback>} = {};
	
	emit(event:string, data = null):Promise<any> {
		
		if (!this.eventsState[event]) return Promise.resolve();
		return Promise.all(this.eventsState[event].map(fn => fn(data)));

	}
	
	/**
	 * @param {String} event
	 * @param {Function} callback
	 */
	on(event: string, callback: Callback) {
		
		if (!(event in this.eventsState)) this.eventsState[event] = [];
		
		this.eventsState[event].push(callback);
		
	}

	
}


export default EventEmitter;
