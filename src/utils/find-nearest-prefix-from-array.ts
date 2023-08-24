import isPrefixName from "./is-prefix-name";

export default function findNearestPrefixFromArray<T extends string>(arrayPrefixes: T[], name: string): T | undefined {
    let answer: T | undefined;
    
    arrayPrefixes.forEach(prefix => {
        
        if (!isPrefixName(name, prefix)) return;
        if (prefix.length > (answer?.length || 0)) answer = prefix;
    })
    
    return answer?.length ? answer : undefined
}
