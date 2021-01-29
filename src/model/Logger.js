import logger from '../../conf/loggerConf.js'
import timeStamp from 'time-stamp'
import {properties} from '../../conf/conf.js'

export default class Logger {

    constructor(level, message) {
        this.timeStamp = timeStamp(properties.get('logger.timeStamp.format'))
        this.level = level;
        this.message = message;
    }

    static info(message) {
        logger().log(new Logger('info', message))
    }

    static error(message) {
        logger().log(new Logger('error', message))
    }
}