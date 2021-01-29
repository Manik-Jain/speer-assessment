import express from 'express'
import {isValidRequest} from '../validation/validate.js'
import {authenticate} from '../authorisation/authorisation.js'
import {ok} from '../../conf/responseHandler.js'

import AuthService from '../service/authService.js'

var router = express.Router()
let authService = new AuthService();

let property = (req, res, next) => {
    req.property = 'auth.mustHave.keys'
    next();
}

router.post('/', property, isValidRequest, authenticate, (req, res, next) => {
    try {
        const {body} = req
        let token = authService.generateToken(body)
        return ok(res, {'token' : token})
    } catch(error) {
        next(error)
    }
})

router.post('/logout', (req, res, next) => {
    try {
        authService.logout(req.headers['user'])
        return ok(res, {'message' : 'user logged out successfully'})
    } catch(error) {
        next(error)
    }
})

router.post('/refresh', (req,res, next) => {
    try{
        const {body} = req
        let refreshedToken = authService.refreshToken(body)
        return ok(res, {'token' : refreshedToken})
    } catch(error) {
        next(error)
    }
})

export default router