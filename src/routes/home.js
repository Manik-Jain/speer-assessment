import express from 'express'
import {ok} from '../../conf/responseHandler.js'
import Logger from '../model/Logger.js'

let router  = express.Router()

router.get('/', (req, res) => {
    Logger.info('App Health status accessed')
    return ok(res, {
        message: 'App is up'
    })
})

export default router