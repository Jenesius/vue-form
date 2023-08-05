export default function runPromiseQueue(guards:Array<any>): Promise<void> {
	return guards
	.reduce(
		(promiseAccumulator, fn) => promiseAccumulator.then((x:any) => fn?.(x)),
		Promise.resolve()
	);
}
