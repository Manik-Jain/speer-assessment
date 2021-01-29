import chai from 'chai'
import sinon from 'sinon'
import faker from 'faker'
import should from 'should'

import UserService from '../../src/service/userService.js'
import StorageService from '../../src/service/storageService.js'
import AppError from '../../src/error/AppError.js';

const expect = chai.expect;
const userService = new UserService()

var stubValue = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password : faker.random.alphaNumeric(),
};

describe('User Service', () => {

    describe('- add a new user',() => {
        it('should add a new user to the database', async() => {
            let user = await userService.addUser(stubValue)
            stubValue.id = user.id
            should(user).is.not.equals(undefined)
            should(user).hasOwnProperty('name')
        })
    })

    describe('- get users', () => {
        it('should return users', async() => {
            let users = await userService.getUsers();
            should(users).instanceof(Array).and.is.not.equals(undefined)
            should(users.map(entry => entry.id).includes(stubValue.id)).equals(true)
        })
    })
})