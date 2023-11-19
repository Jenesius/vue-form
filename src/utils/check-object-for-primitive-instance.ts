/**
 *
 * @description Some data objects can be transmitted as a universal object, which is inherently single. Deep iteration
 * should not occur for such objects.
 * */
export default function checkObjectForNotIterableInstance(object: unknown) {
	return !!ARRAY_NOT_ITERABLE_OBJECT_INSTANCE.find(instance => object instanceof instance)
}

const ARRAY_NOT_ITERABLE_OBJECT_INSTANCE = [
	Error,
	Date,
	Blob,
]