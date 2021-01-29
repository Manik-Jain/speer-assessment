import express from 'express'
import user from './user.js'
import auth from './auth.js' 
import home from './home.js'
import tweet from './tweet.js'

let router  = express.Router()

router.use('/', home)
router.use('/users', user)
router.use('/auth', auth)
router.use('/tweet', tweet)

export default router