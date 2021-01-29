import winston from 'winston'
import {
    properties
} from './conf.js'

function logger() {
    return winston.createLogger({
        level: 'info',
        format: winston.format.json(),
        transports: [
            new winston.transports.Console(),
            new winston.transports.File({
                filename: properties.get('logger.file')
            })
        ]
    });
}

export default logger