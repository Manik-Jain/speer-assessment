import express from 'express'

import {
    ok,
    created
} from '../../conf/responseHandler.js'
import {authorise} from '../authorisation/authorisation.js'

import TweetService from '../service/tweetService.js'

let tweetService = new TweetService();

let router = express.Router()

router.post('/', authorise, async (req, res, next) => {
    try{
        const {body} = req
        let tweet = await tweetService.tweet(body)
        return created(res, tweet)
    } catch(error) {
        next(error)
    }
})

router.get('/user/:userId', authorise, async (req, res, next) => {
    try {
        let tweets = await tweetService.getUserTweets(req.params.userId)
        return ok(res, tweets)
    } catch(error) {
        next(error)
    }
})

router.get('/:id', authorise, async (req, res, next) => {
    try {
        let tweet = await tweetService.getTweet(req.params.id)
        return ok(res, tweet)
    } catch(error) {
        next(error)
    }
})

router.get('/', authorise, async (req, res, next) => {
    try {
        let tweets = await tweetService.getTweets()
        return ok(res, tweets)
    } catch(error) {
        next(error)
    }
})

router.put('/', authorise, async (req, res, next) => {
    try {
        const {body} = req
        let tweet = await tweetService.updateTweet(body)
        return ok(res, tweet)
    } catch(error) {
        next(error)
    }
})

export default router