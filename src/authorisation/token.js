export default class Token {

    constructor() {
        this.token = undefined
    }

    static setToken(token){
        this.token = token
    }

    static getToken() {
        return this.token
    }

}