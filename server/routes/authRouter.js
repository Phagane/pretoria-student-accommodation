const express = require('express')
const {signUp, signIn, userInfo} = require('../controllers/authCountroller')
const protect = require('./../middleware/authMiddleware')

const router = express.Router()

router.route('/signup').post(signUp)
router.route('/sign-in').post(signIn)
module.exports = router