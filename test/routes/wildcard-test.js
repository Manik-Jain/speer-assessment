import request from 'supertest'
import should from 'should'
import app from '../../index.js'
import Token from '../../src/authorisation/token.js'

describe('Wildcard routes', ()=> {
    describe('- GET /manik', () => {

        it('should return 404 Not found', async() => {
            const response = await request(app).get('/manik').set('authorization', 'Bearer ' + Token.getToken())

            should(response.status).is.equals(404)
            should(response.body.message).is.equals('The requested URL cannot be found')
        })
    })
})