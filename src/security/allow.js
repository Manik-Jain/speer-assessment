import StorageService from '../service/storageService.js'
import Logger from '../model/Logger.js'
import {AppEnum} from './../../conf/appEnum.js'

const storageService = new StorageService();

async function allow(email, roles) {

    let response = {
        isValidated : false,
        message : ''
    }

    if(!Array.isArray(roles)) {
        Logger.info(`No Roles have been defined for user : ${email}`)
        response.message = `No Roles have been defined for user : ${email}`
        return response
    }

    let users = await storageService.fetchAll(AppEnum.USER)

    if(users === undefined || users.length === 0) {
        Logger.info(`No user exists`)
        response.message = `No user exists`
        return response
    } else {
        let extractedUser = users.find(entry => entry.email === email)
        if(extractedUser === undefined || !roles.includes(extractedUser.role)) {
            Logger.info(`Un-sufficient privelige for user : ${email}`)
            response.message = `Un-sufficient privelige for user : ${email}`
            return response
        } 
        response.isValidated = true
        return response
    }
}

export {
    allow
}