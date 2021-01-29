import express from 'express'

import {
    isValidRequest,
    validateUserRequest
} from '../validation/validate.js'

import UserService from '../service/userService.js'
import {authorise} from '../authorisation/authorisation.js'

import {
    ok,
    created
} from '../../conf/responseHandler.js'

import {allow} from '../security/allow.js'
import {Role} from '../security/Role.js'

let router = express.Router()
let userService = new UserService();

let property = (req, res, next) => {
    req.property = 'user.mustHave.keys'
    next();
}

function hasRole(roles) {
    return async (req, res, next) => {
        let validation = await allow(req.headers['user'], roles)
        if(validation.isValidated) {
            next()
        } else {
            res.status(401).send({
                message : validation.message
            })
        }
    }
}

//only the users with a valid login token and user roles should be able to view all the users
router.get('/', authorise, hasRole([Role.ADMIN]), async (req, res, next) => {
    try {
        return ok(res, await userService.getUsers(req, res))
    } catch(error) {
        next(error)
    }
})

router.post('/', property, isValidRequest, validateUserRequest, async (req, res, next) => {
    try{
        const {body} = req
        let user = await userService.addUser(body)
        return created(res, user)
    } catch(error) {
        next(error)
    }
})

export default router