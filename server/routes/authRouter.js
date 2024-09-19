const express = require('express')
const {signUp, signIn} = require('../controllers/authCountroller')

const router = express.Router()

router.route('/signup').post(signUp)
router.route('/sign-in').post(signIn)
module.exports = router