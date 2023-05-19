import checkCompositeName from "./check-composite-name";

export default function findNearestNameFromArray(name: string, array: string[]): string | undefined {
	let answer = "";
	
	array.forEach(n => {
		
		if (!checkCompositeName(n, name)) return;
		if (n.length > answer.length) answer = n;
	})
	
	return answer.length === 0 ? undefined: answer
}
