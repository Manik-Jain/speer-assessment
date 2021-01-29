import should from 'should'

import {
    isValidEmail,
    isValidPhoneNumber,
    isValidName,
    isValidPassword
} from '../../src/validation/validationLibrary.js'

describe('Tesing Validation Library', () => {

    describe('test email validation', () => { 
        it('-should return false when email is empty', () => {
            const result = isValidEmail('')
            should(result).equals(null)
        })

        it('-should return false when email contains only username', () => {
            const result = isValidEmail('user')
            should(result).equals(null)
        })

        it('-should return false when email contains only username without domain', () => {
            const result = isValidEmail('user.name')
            should(result).equals(null)
        })

        it('-should return false when email domain is wrongly provided', () => {
            const result = isValidEmail('user.namedomain.com')
            should(result).equals(null)
        })

        it('-should return true when email is good', () => {
            const result = isValidEmail('user.name@domain.com')
            should(result).is.not.equal(null)
        })
    })

    describe('test phone number validation', () => { 
        it('-should return false when phone number is empty', () => {
            const result = isValidPhoneNumber('')
            should(result).equals(null)
        })

        it('-should return false when phone number contains text', () => {
            const result = isValidPhoneNumber('user')
            should(result).equals(null)
        })

        it('-should return false when phone number contains only strings with digits', () => {
            const result = isValidPhoneNumber('1234manik')
            should(result).equals(null)
        })

        it('-should return false when phone number contains special characters', () => {
            const result = isValidPhoneNumber('1234!')
            should(result).equals(null)
        })

        it('-should return false when phone number contains less than 10 digits', () => {
            const result = isValidPhoneNumber('1234')
            should(result).equals(null)
        })

        it('-should return true when phone number is good', () => {
            const result = isValidPhoneNumber('1234567890')
            should(result).not.equals(null)
        })
    })

    describe('test user name validation', () => { 
        it('-should return false when username is empty', () => {
            const result = isValidName('')
            should(result).equals(null)
        })

        it('-should return false when username contains digits', () => {
            const result = isValidName('manik1234')
            should(result).equals(null)
        })

        it('-should return false when username contains special characters', () => {
            const result = isValidName('manik!jain')
            should(result).equals(null)
        })

        it('-should return true when phone number is good', () => {
            const result = isValidName('manik jain')
            should(result).is.not.equal(null)
        })
    })

    describe('test password validation', () => { 
        it('-should return false when password is empty', () => {
            const result = isValidPassword('')
            should(result).equals(false)
        })

        it('-should return false when password is empty', () => {
            const result = isValidPassword('')
            should(result).equals(false)
        })

        it('-should return false when password contains less than 8 characters', () => {
            const result = isValidPassword('manik!')
            should(result).equals(false)
        })

        it('-should return true when phone number is good', () => {
            const result = isValidPassword('manikjain')
            should(result).equals(true)
        })
    })
    

})