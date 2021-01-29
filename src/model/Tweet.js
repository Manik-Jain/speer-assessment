import { uuid as v4} from 'uuidv4';

export default class Tweet {

    constructor(req) {
        const id = v4();
        this.id = id;
        this.tweetId = id;
        this.data = req.data;
    }
}