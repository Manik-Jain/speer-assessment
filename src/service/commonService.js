import Logger from '../model/Logger.js'
import AppError from '../error/AppError.js'

export default class CommonService {

    logAndThrow(status, message) {
        Logger.error(message)
        throw new AppError(status, message)
    }
}