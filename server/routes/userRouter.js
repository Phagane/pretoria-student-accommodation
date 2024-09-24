const express = require('express')
const authMiddleware = require('./../middleware/authMiddleware')
const {
    getProperties, 
    getPropertyDetails
} = require('./../controllers/userController')

const router = express.Router()

router.route('/home').get(getProperties)
router.route('/property/:propertyId').get(getPropertyDetails)

module.exports = router