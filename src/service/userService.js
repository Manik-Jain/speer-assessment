import User from '../model/User.js'
import argon2 from 'argon2'
import StatusCodes from 'http-status-codes'
import Logger from '../model/Logger.js'
import CommonService from './commonService.js'
import StorageService from './storageService.js'
import SyncService from './syncService.js'
import {properties} from '../../conf/conf.js'
import {AppEnum} from '../../conf/appEnum.js'

const storageService = new StorageService();
const syncService = new SyncService();
const commonService = new CommonService();

export default class UserService {

    async prepareUser(req) {
        let user = new User(req)
        user.password = await argon2.hash(req.password)
        return user
    }

    sanitize(user) {
        const {
            name,
            email
        } = user

        let res = {
            id: user.userId || user.id,
            name,
            email
        }
        return res
    }

    async getUsers() {
        Logger.info('getting all users')

        let data = (properties.get('datastore.primary').toString() === AppEnum.DATABASE) ?
        await storageService.fetchAll(AppEnum.USER) : await syncService.fetchAllUsers()

        if (data != undefined && Array.isArray(data) && data.length != 0) {
            let users = data.map(user => this.sanitize(user))
            Logger.info(`returning ${users.length} users`)
            return users
        } else {
            Logger.error('returning empty response for getUsers')
            return data
        }
    }

    async getUser(email) {
        Logger.info(`getting user details for id : ${email}`)
        let user = await storageService.fetchByIdentifier('email', email, AppEnum.USER)

        if(user !== undefined) {
            Logger.info('Returning user details')
            return user
        } else {
            Logger.info('user not found')
            return user
        }

    }

    async addUser(input) {
        Logger.info('Request received to register a new user!')
        Logger.info('checking if unique user')

        await this.isDuplicateUser(input.email)

        Logger.info(`creating new user with user id : ${input.email}`)
        let user = await this.prepareUser(input)

        if (properties.get('datastore.sync') === true) {
            await syncService.addUser(user)
        }

        await storageService.addUser(user)
        return this.sanitize(user)
    }

    async isDuplicateUser(userEmail) {
        let users = await storageService.fetchAll(AppEnum.USER)
        if(users.find(user => user.email === userEmail) !== undefined) {
            const message = `user with email id : ${userEmail} already exists`
            commonService.logAndThrow(StatusCodes.BAD_REQUEST, message)
        }
    }
}