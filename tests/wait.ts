export default function wait(n = 10) {
    return new Promise(resolve => setTimeout(resolve, n))
}