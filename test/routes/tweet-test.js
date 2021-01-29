import request from 'supertest'
import should from 'should'
import app from '../../index.js'
import Token from '../../src/authorisation/token.js'

describe('Tweet Routes', () => {
    describe('- POST /tweet', () => {

        it('should return error if tweet more than 25 characters', async () => {
            const response = await request(app).post('/tweet')
                                    .set('authorization', 'Bearer ' + Token.getToken())
                                    .send({
                                        "email": "jain.manik@yahoo.co.in",
                                        "data" : "My first tweet is going to be really more than 25 characters as it should be giving error" +
                                         "My first tweet is going to be really more than 25 characters as it should be giving error"
            })

            should(response.status).is.equal(400)
            should(response.body.message).is.equal('Tweet exceeds the allowed length')
        })

        it('should create a new tweet', async () => {
            let tweet = {
                "email": "jain.manik@yahoo.co.in",
                "data" : "My first tweet"       
            }

            const response = await request(app).post('/tweet').set('authorization', 'Bearer ' + Token.getToken()).send(tweet)
            should(response.status).is.equal(201)
            should(response.body).have.properties('id', 'tweetId', 'data', 'userId')
        })
    })

    describe('- GET /tweet', () => {

        it('should return error when token is not provided', async () => {
            const response = await request(app).get('/tweet').expect({
                "status": 401,
                "message": "No authorization token was found"
            })

            should(response.status).is.equal(401)
            should(response.body.message).is.equal('No authorization token was found')
        })

        it('should return error when wrong token is provided', async () => {
            const response = await request(app).get('/tweet').set('authorization', 'Bearer 1234')

            should(response.status).is.equal(401)
            should(response.body.message).is.equal('jwt malformed')
        })

        it('should return error when empty token is provided', async () => {
            const response = await request(app).get('/tweet').set('authorization', 'Bearer ')

            should(response.status).is.equal(401)
            should(response.body.message).is.equal('Format is Authorization: Bearer [token]')
        })

        it('should return entries', async () => {
            const response = await request(app).get('/tweet').set('authorization', 'Bearer ' + Token.getToken())
            
            should(response.status).is.equal(200)
            should(response.body.length).is.not.equals(0)
        })
    })

    describe('- GET /tweet/:id', () => {

        it('should return error when token is not provided', async () => {
            const response = await request(app).get('/tweet/1').expect({
                "status": 401,
                "message": "No authorization token was found"
            })

            should(response.status).is.equal(401)
            should(response.body.message).is.equal('No authorization token was found')
        })

        it('should return error when wrong token is provided', async () => {
            const response = await request(app).get('/tweet/1').set('authorization', 'Bearer 1234')
            
            should(response.status).is.equal(401)
            should(response.body.message).is.equal('jwt malformed')
        })

        it('should return error when empty token is provided', async () => {
            const response = await request(app).get('/tweet/1').set('authorization', 'Bearer ')
            
            should(response.status).is.equal(401)
            should(response.body.message).is.equal('Format is Authorization: Bearer [token]')
        })

        it('should return tweet by specific input id', async () => {
            const response = await request(app).get('/tweet/90310418-f081-4a7b-8074-00f1dcff2a99').set('authorization', 'Bearer ' + Token.getToken())
            should(response.status).is.equals(200)
        })

        it('should return error when input tweet id is not found', async () => {
            const response = await request(app).get('/tweet/1').set('authorization', 'Bearer ' + Token.getToken())
            
            should(response.body.status).is.equals(404)
            should(response.body.message).is.equals('tweet 1 not found')
        })
    })

    describe('- GET /tweet/user/:userId', () => {

        it('should return error when token is not provided', async () => {
            const response = await request(app).get('/tweet/user/1').expect({
                "status": 401,
                "message": "No authorization token was found"
            })

            should(response.status).is.equal(401)
            should(response.body.message).is.equal('No authorization token was found')
        })

        it('should return error when wrong token is provided', async () => {
            const response = await request(app).get('/tweet/user/1').set('authorization', 'Bearer 1234')
            
            should(response.status).is.equal(401)
            should(response.body.message).is.equal('jwt malformed')
        })

        it('should return error when empty token is provided', async () => {
            const response = await request(app).get('/tweet/user/1').set('authorization', 'Bearer ')
            
            should(response.status).is.equal(401)
            should(response.body.message).is.equal('Format is Authorization: Bearer [token]')
        })

        it('should return entry by specific input id', async () => {
            const response = await request(app).get('/tweet/user/59cbdb49-937f-43d6-a988-137959e5ac56').set('authorization', 'Bearer ' + Token.getToken())
            should(response.status).is.equals(200)
        })

        it('should return error when input entry id is not found', async () => {
            const response = await request(app).get('/tweet/user/1').set('authorization', 'Bearer ' + Token.getToken())
            
            should(response.body.status).is.equals(404)
            should(response.body.message).is.equals('userId 1 not found')
        })
    })

    describe('- PUT /tweet', () => {

        it('should return error when token is not provided', async () => {

            let tweet = {
                "email": "jain.manik@yahoo.co.in",
                "data" : "My first tweet"       
            }

            const response = await request(app).put('/tweet').send(tweet).expect({
                "status": 401,
                "message": "No authorization token was found"
            })

            should(response.status).is.equal(401)
            should(response.body.message).is.equal('No authorization token was found')
        })

        it('should return error when wrong token is provided', async () => {
            let tweet = {
                "email": "jain.manik@yahoo.co.in",
                "data" : "My first tweet"       
            }
            const response = await request(app).put('/tweet').set('authorization', 'Bearer 1234').send(tweet)
            
            should(response.status).is.equal(401)
            should(response.body.message).is.equal('jwt malformed')
        })

        it('should return error when empty token is provided', async () => {
            let tweet = {
                "email": "jain.manik@yahoo.co.in",
                "data" : "My first tweet"       
            }
            const response = await request(app).get('/tweet').set('authorization', 'Bearer ').send(tweet)
            
            should(response.status).is.equal(401)
            should(response.body.message).is.equal('Format is Authorization: Bearer [token]')
        })

        it('should update tweet by specific input id', async () => {
            let tweet = {
                "email": "jain.manik@yahoo.co.in",
                "data" : "My first tweet"       
            }
            const response = await request(app).get('/tweet').set('authorization', 'Bearer ' + Token.getToken()).send(tweet)
            should(response.status).is.equals(200)
        })
    })
})