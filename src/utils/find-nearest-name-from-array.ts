import checkCompositeName from "./check-composite-name";

export default function findNearestNameFromArray<T extends string>(array: T[], name: string): T | undefined {
	let answer: T | undefined;
	
	array.forEach(n => {
		
		if (!checkCompositeName(n, name)) return;
		if (n.length > (answer?.length || 0)) answer = n;
	})
	
	return answer?.length ? answer : undefined
}
