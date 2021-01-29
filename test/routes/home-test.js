import request from 'supertest'
import app from '../../index.js'
import should from 'should'

describe('Home Page', () => {
    describe('- GET /', () => {

        it(`returns the message 'App is up'`, async () => {
            const response = await request(app).get('/')
            should(response.body).have.property('message', 'App is up')   
        })
    })
})