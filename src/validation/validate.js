import propertiesReader from 'properties-reader'
import path from 'path'

import {
    isValidEmail,
    isValidPhoneNumber,
    isValidName,
    isValidPassword
} from './validationLibrary.js'

import {badRequest} from '../../conf/responseHandler.js'

let properties = propertiesReader(path.resolve('properties/properties.file'));

function isValidRequest(req, res, next) {
    let mustHaveKeys = properties.get(req.property).split(',')
    let missingKeys = mustHaveKeys.filter(key => !Object.keys(req.body).includes(key))

    if (missingKeys.length != 0) {
        badRequest(res, {
            'message': 'missing mandatory keys',
            'invalid': missingKeys
        })
    } else {
        next();
    }
}

function validateUserRequest(req, res, next) {
    let validationError = [];
    if(!isValidEmail(req.body.email)) {
        validationError.push('email')
    }

    if(!isValidName(req.body.name)) {
        validationError.push('name')
    }

    if(!isValidPassword(req.body.password)) {
        validationError.push('password')
    }

    if (validationError.length != 0) {
        badRequest(res, {
            'message': 'Validation error',
            'invalid': validationError
        })
    } else {
        next();
    } 
}

export {
    isValidRequest, 
    validateUserRequest
}