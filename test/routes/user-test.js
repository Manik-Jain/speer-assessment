import request from 'supertest'
import should from 'should'
import app from '../../index.js'
import { uuid } from 'uuidv4';
import Token from '../../src/authorisation/token.js'

describe('User Routes', () => {
    describe('- POST /users', ()=> {

        it('should return error if madatory propeties are missing', async () => {
            const response = await request(app).post('/users').send({})

            should(response.status).is.equal(400)
            should(response.body.message).is.equal('missing mandatory keys')
            should(response.body.invalid).have.lengthOf(3)
        })

        it('should return error if email id is incorrect', async () => {
            let user = {
                "name":"ManikJain",
                "email": "jain.manikyahoo.co.in",
                "password": "ManikJain"
            }

            const response = await request(app).post('/users').send(user)

            should(response.status).is.equal(400)
            should(response.body.message).is.equal('Validation error')
            should(response.body.invalid).have.lengthOf(1)
            should(response.body.invalid[0]).is.equals('email')
        })

        it('should return error if email id already exists', async () => {
            let user = {
                "name":"ManikJain",
                "email": "jain.manik@yahoo.co.in",
                "password": "ManikJain"
            }

            const response = await request(app).post('/users').send(user)

            should(response.body.status).is.equal(400)
            should(response.body.message).is.equals(`user with email id : ${user.email} already exists`)
        })

        it('should return error if value is mising', async () => {
            let user = {
                "name":"",
                "email": "jain.manik@yahoo.co.in",
                "password": "ManikJain"
            }

            const response = await request(app).post('/users').send(user)

            should(response.status).is.equal(400)
            should(response.body.message).is.equal('Validation error')
            should(response.body.invalid).have.lengthOf(1)
            should(response.body.invalid[0]).is.equals('name')
        })

        it('should create a new user', async () => {
            let user = {
                "name":"Manik Jain",
                "email": uuid() + "@gmail.com",
                "password": "ManikJain"
            }

            const response = await request(app).post('/users').send(user)

            should(response.status).is.equals(201)
        })
    })

    describe('- GET /users', () => {

        it('should return error when token is not provided', async () => {
            const response = await request(app).get('/users').expect({
                "status": 401,
                "message": "No authorization token was found"
            })

            should(response.status).is.equals(401)
            should(response.body.message).is.equals('No authorization token was found')
        })

        it('should return error when wrong token is provided', async () => {
            const response = await request(app).get('/users').set('authorization', 'Bearer 1234')

            should(response.status).is.equals(401)
            should(response.body.message).is.equals('jwt malformed')
        })

        it('should return error when empty token is provided', async () => {
            const response = await request(app).get('/users').set('authorization', 'Bearer ')

            should(response.status).is.equals(401)
            should(response.body.message).is.equals('Format is Authorization: Bearer [token]')
        })

        it('should return users', async () => {
            const response = await request(app).get('/users')
                                .set('authorization', 'Bearer ' + Token.getToken())
                                .set('user', 'jain.manik@yahoo.co.in')

            should(response.status).is.equals(200)
            should(response.body.length).is.not.equals(0)
        })

    })
})