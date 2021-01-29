 import knexInstance from '../../conf/knex.js'
 import Logger from '../model/Logger.js'
 import KnexDao from '../dao/knexDao.js'
 import {AppEnum} from '../../conf/appEnum.js'

 const knex = knexInstance()
 const knexDao = new KnexDao();

 export default class StorageService {

     async addUser(input) {
         try {
             const {
                 userId,
                 name,
                 email,
                 password
             } = input

             return await knexDao.create(AppEnum.USER, {
                 userId,
                 name,
                 email,
                 password
             })
         } catch (error) {
             Logger.error(error)
             throw error
         }

     }

     async addEntry(input) {
         try {
            const {
                entryId,
                name,
                email,
                phoneNumber,
                content
            } = input

            return await knexDao.create(AppEnum.ENTRIES, {
                entryId,
                name,
                email,
                phoneNumber,
                content
            })
         } catch(error) {
            Logger.error(error)
            throw error
         }

     }

     async addTweet(input) {
        try{
            const {
                tweetId,
                data,
                userId
            } = input

            return await knexDao.create(AppEnum.TWEET, {
                tweetId,
                data,
                userId
            })
        } catch(error) {
            Logger.error(error)
            throw error
         }
     }

     async fetchAll(tableName) {
         try {
            return await knexDao.fetchAll(tableName)
         } catch(error) {
            Logger.error(error)
            throw error
         }
     }

     async fetchByIdentifier(columnIdentifier, value, tableName) {
        try {
            return await knexDao.fetchOne(columnIdentifier, value, tableName)
        } catch(error) {
            Logger.error(error)
            throw error
        }
     }

     async update(identifier, data, table) {
         try {
            return await knexDao.update(identifier, data, table)
         } catch(error) {
            Logger.error(error)
            throw error
         }

     }
 }