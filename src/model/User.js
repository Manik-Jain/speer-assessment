import { uuid } from 'uuidv4';

export default class User {

    constructor(req) {
        const id = uuid();
        this.id = id;
        this.userId = id;
        this.name = req.name;
        this.email = req.email;
    }
}