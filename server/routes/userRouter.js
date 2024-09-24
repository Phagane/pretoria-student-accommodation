const express = require('express')
const authMiddleware = require('./../middleware/authMiddleware')
const {getProperties} = require('./../controllers/userController')

const router = express.Router()

router.route('/home').get(getProperties)

module.exports = router