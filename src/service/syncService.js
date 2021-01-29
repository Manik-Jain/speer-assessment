import {
    writeData,
    readData
} from '../dao/dao.js'

import StatusCodes from 'http-status-codes'
import Logger from '../model/Logger.js'
import CommonService from './commonService.js'

const commonService = new CommonService();
const entryFilePath = 'data/entries.json'
const userFilePath = 'data/users.json'

export default class SyncService {

    async addEntry(entry) {
        let data = await readData(entryFilePath)

        if (data != undefined && Array.isArray(data)) {
            data.push(entry)
        } else {
            data = [entry]
        }
        return await writeData(entryFilePath, data)
    }

    async addUser(user) {
        let data = await readData(userFilePath)
        
        if (data != undefined && Array.isArray(data) && data.length != 0) {
            if (data.filter(entry => entry.email === user.email).length != 0) {
                const message = `user with email id : ${user.email} already exists`
                commonService.logAndThrow(StatusCodes.BAD_REQUEST, message)
            } else {
                data.push(user)
            }
        } else {
            data = [user]
        }
        await writeData(userFilePath, data)
    }

    async getEntryById(id) {
        let entries = await readData(entryFilePath)
        if (entries != undefined && Array.isArray(entries) && entries.length != 0) {
            let entry = entries.find(obj => obj.id === id)
            if (entry) {
                Logger.info(`returning entry id : ${id} `)
                return entry
            } else {
                commonService.logAndThrow(StatusCodes.NOT_FOUND, `entry ${id} not found`)
            }
        } else {
            commonService.logAndThrow(StatusCodes.NOT_FOUND, `entry ${id} not found`)
        }
    }

    async fetchAllEntries() {
        return await readData(entryFilePath)
    }

    async fetchAllUsers() {
        return await readData(userFilePath)  
    }
 }