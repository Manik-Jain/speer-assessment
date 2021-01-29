import should from 'should'

import AuthService from '../../src/service/authService.js'

describe('Auth Service', () => {

    it('- should generate a JWT token', () => {
        const authService = new AuthService();
        const token = authService.generateToken({email : 'user@gmail.com'})
        should(token).is.not.equals(undefined)
    })
})