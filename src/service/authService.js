import jwtSigner from 'jsonwebtoken'
import {
    properties
} from '../../conf/conf.js'
import Logger from '../model/Logger.js'
import localStorageInstance from '../../conf/localStorage.js'
import {validateToken} from '../authorisation/authorisation.js'
import CommonService from './commonService.js'
import StatusCodes from 'http-status-codes'

const commonService = new CommonService()

export default class AuthService {

    generateToken(input) {
        Logger.info(`generating token for user [${input.email}]`)
        const token = jwtSigner.sign({
                username: input.email
            },
            properties.get('app.secret'), {
                expiresIn: properties.get('jwt.lifetime').toString()
            }
        )

        const refreshToken = jwtSigner.sign({
                username: input.email
            },
            properties.get('app.secret'), {
                expiresIn: properties.get('jwt.refreshToken.lifetime').toString()
            }
        )

        let response = {
            'token': token,
            'refreshToken' : refreshToken,
        }

        localStorageInstance().write(input.email, response, (data) => {
            console.log('token generated')
        })

        Logger.info(`token generated for user [${input.email}]`)
        return token
    }

    refreshToken(input) {
        let tokenDetails = validateToken(input.token)
        if(tokenDetails) {
            return this.generateToken(input)
        } else {
            commonService.logAndThrow(StatusCodes.FORBIDDEN, 'Refresh Token is invalid')
        }
    }

    logout(userEmail) {
        Logger.info('Initiating user logout...')
        localStorageInstance().purge(userEmail, () => {
            Logger.info(`Session successfully ended for [${userEmail}]`)
            console.log('session ended')
        })
    }
}