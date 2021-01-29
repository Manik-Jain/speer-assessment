import StatusCodes from 'http-status-codes'
import {
    properties
} from './conf.js'

function errorHandler(err, req, res, next) {
    if (err) {
        return res.status(err.status || StatusCodes.INTERNAL_SERVER_ERROR).send({
            'status': err.status || StatusCodes.INTERNAL_SERVER_ERROR,
            'message': err.message || properties.get('error.handler.default.message').toString()
        })
    }
    next()
}

function notFound(req, res, next) {
    return res.status(StatusCodes.NOT_FOUND).send({
        'status': StatusCodes.NOT_FOUND,
        'message': properties.get('error.handler.notFound.message').toString()
    })
}

export {
    errorHandler,
    notFound
}