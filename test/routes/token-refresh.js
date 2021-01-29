import request from 'supertest'
import should from 'should'
import app from '../../index.js'
import Token from '../../src/authorisation/token.js'

describe('Authorization', () => {

    describe('- POST /auth/refresh', () => {

        it(`should issue a new Authorization Bearer token`, async () => {
            let inputToken = {
                "email": "jain.manik@yahoo.co.in",
                "token": Token.getToken()
            }

            const response = await request(app)
                .post('/auth/refresh').set('authorization', 'Bearer ' + Token.getToken())
                .send(inputToken)

            should(response.status).is.equal(200)

        })

        it(`should return error for expired token`, async () => {
            let inputToken = {
                "email": "jain.manik@yahoo.co.in",
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImphaW4" 
            }

            const response = await request(app)
                .post('/auth/refresh').set('authorization', 'Bearer ' + Token.getToken())
                .send(inputToken)

            should(response.status).is.equal(500)

        })
    })
})