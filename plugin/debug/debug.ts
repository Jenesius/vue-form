export default new class debug{
    msg(text: string, params: any = '') {
        console.log(`%c[form]%c ${text}`, 'color: #42b883', 'color: black', params)
    }
}