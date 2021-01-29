import argon2 from 'argon2'
import jwt from 'jsonwebtoken'
import {properties} from '../../conf/conf.js'
import SyncService from '../service/syncService.js'
import StorageService from '../service/storageService.js'
import {AppEnum} from '../../conf/appEnum.js'

const syncService = new SyncService();
const storageService =  new StorageService();

async function authenticate(req, res, next) {
    let users = properties.get('datastore.primary').toString() === AppEnum.DATABASE ?
        await storageService.fetchAll(AppEnum.USER) : await syncService.fetchAllUsers()
        
    if (users === undefined || users.length === 0) {
        res.status(401).send({
            'message': 'incorrect credentials provided'
        })
    } else {
        let user = users.filter(entry => entry.email === req.body.email)
        if (user === undefined || !Array.isArray(user) ||
            user[0] === undefined || !await isVerified(user[0].password, req.body.password)) {
                res.status(401).send({
                    'message': 'incorrect credentials provided'
                })
        } else {
            next();
        }
    }
}

const isVerified = async (storedPaswd, inputPaswd) => {
    let isVerified = await argon2.verify(storedPaswd, inputPaswd)
    return isVerified
}

function authorise(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token) {
        let tokenDetails = jwt.verify(token, properties.get('app.secret'), 
        {algorithms: [properties.get('jwt.algo')] })
        
        if(tokenDetails) {
            req.user = tokenDetails
            next()
        } else {
            res.status(401).send({
                'message' : 'token has expired'
            })
        }
    } else {
        res.status(401).send({
            'message' : 'token not provided'
        })
    }
}

function validateToken(token) {
    return jwt.verify(token, properties.get('app.secret'), 
                {algorithms: [properties.get('jwt.algo')] })
}

export {
    authenticate,
    authorise,
    validateToken
}