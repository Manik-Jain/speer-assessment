import request from 'supertest'
import should from 'should'
import app from '../../index.js'
import Token from '../../src/authorisation/token.js'

describe('Authorization', () => {
    describe('- POST /auth', () => {

        it(`should return the Authorization Bearer token`, async () => {
            let userDetails = {
                "email": "jain.manik@yahoo.co.in",
                "password": "ManikJain"
            }

            const response = await request(app)
                .post('/auth')
                .send(userDetails)

            let token = response.body.token
            Token.setToken(token)

            should(response.status).is.equal(200)
            should(token).is.not.equal(undefined)
        })

        it(`should return return an error message with missing email property`, async () => {
            let userDetails = {
                "password": "ManikJain"
            }

            const response = await request(app)
                .post('/auth')
                .send(userDetails)

            should(response.status).is.equal(400)
            should(response.body.message).is.equal('missing mandatory keys')
            should(response.body.invalid[0]).is.equal('email')
        })

        it(`should return return an error message with missing password property`, async () => {
            let userDetails = {
                "email": "jain.manik@yahoo.co.in"
            }

            const response = await request(app)
                .post('/auth')
                .send(userDetails)

            should(response.status).is.equal(400)
            should(response.body.message).is.equal('missing mandatory keys')
            should(response.body.invalid[0]).is.equal('password')
        })

        it(`should return wrong credentials error when input password is wrong`, async () => {
            let userDetails = {
                "email": "jain.manik@yahoo.co.in",
                "password": "Man"
            }

            const response = await request(app)
                .post('/auth')
                .send(userDetails)

            should(response.status).is.equal(401)
            should(response.body.message).is.equal('incorrect credentials provided')
        })

        it(`should return wrong credentials error when input password is empty`, async () => {
            let userDetails = {
                "email": "jain.manik@yahoo.co.in",
                "password": ""
            }

            const response = await request(app)
                .post('/auth')
                .send(userDetails)

            should(response.status).is.equal(401)
            should(response.body.message).is.equal('incorrect credentials provided')
        })

        it(`should return wrong credentials error when input password is a single space`, async () => {
            let userDetails = {
                "email": "jain.manik@yahoo.co.in",
                "password": " "
            }

            const response = await request(app)
                .post('/auth')
                .send(userDetails)

            should(response.status).is.equal(401)
            should(response.body.message).is.equal('incorrect credentials provided')
        })

        it(`should return wrong credentials error when input username format is incorrect`, async () => {
            let userDetails = {
                "email": "jain.manikyahoo.co.in",
                "password": "Manik"
            }

            const response = await request(app)
                .post('/auth')
                .send(userDetails)

            should(response.status).is.equal(401)
            should(response.body.message).is.equal('incorrect credentials provided')
        })

        it(`should return wrong credentials error when input username/password combination is not found`, async () => {
            let userDetails = {
                "email": "jain.manik@yahoo.co.in",
                "password": "Manik"
            }

            const response = await request(app)
                .post('/auth')
                .send(userDetails)

            should(response.status).is.equal(401)
            should(response.body.message).is.equal('incorrect credentials provided')
        })
    })
})