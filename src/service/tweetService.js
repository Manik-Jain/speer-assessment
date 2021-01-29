import CommonService from './commonService.js'
import StorageService from './storageService.js'
import UserService from './userService.js'
import StatusCodes from 'http-status-codes'
import Tweet from '../model/Tweet.js'
import {AppEnum} from '../../conf/appEnum.js'
import Logger from '../model/Logger.js'

let commonService = new CommonService();
let userService = new UserService();
let storageService = new StorageService();

export default class TweetService {

    async tweet(req) {
        if(req.data.split(' ').length > 25) {
            const message = `Tweet exceeds the allowed length`
            commonService.logAndThrow(StatusCodes.BAD_REQUEST, message)
        } else {
            let tweet = new Tweet(req)
            let user = await userService.getUser(req.email)
            if(user === undefined) {
                commonService.logAndThrow(StatusCodes.BAD_REQUEST, 'Invalid user email')
            } else {
                tweet.userId = user[0].userId
                await storageService.addTweet(tweet)
                return tweet
            }
        }
    }

    async getUserTweets(id) {
        Logger.info(`getting tweet for user : ${id}`)
        let entry = await storageService.fetchByIdentifier('userId', `${id}`, AppEnum.TWEET)
        if (entry.length != 0) {
            return entry
        } else {
            commonService.logAndThrow(StatusCodes.NOT_FOUND, `userId ${id} not found`)
        }
    }

    async getTweet(id) {
        Logger.info(`getting tweet for id : ${id}`)
        let entry = await storageService.fetchByIdentifier('tweetId', `${id}`, AppEnum.TWEET)
        if (entry.length != 0) {
            return entry
        } else {
            commonService.logAndThrow(StatusCodes.NOT_FOUND, `tweet ${id} not found`)
        }
    }

    async getTweets() {
        Logger.info('getting all tweets')
        let data = await storageService.fetchAll(AppEnum.TWEET) 
        Logger.info(`returning ${data.length} entries`)
        return data
    }

    async updateTweet(input) {
        Logger.info('updating tweet with new value')
        await storageService.update('tweetId', input.tweetId, input.tweet, AppEnum.TWEET)
    }

    async delete(tweetId) {

    }
}