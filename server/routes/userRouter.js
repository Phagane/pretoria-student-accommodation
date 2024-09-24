const express = require('express')
const authMiddleware = require('./../middleware/authMiddleware')
const {
    getProperties, 
    getPropertyDetails,
    applyForAccommodation,
    requestToView
} = require('./../controllers/userController')

const router = express.Router()

router.route('/home').get(getProperties)
router.route('/property/:propertyId').get(getPropertyDetails)
router.route('/property/:propertyId/apply').post(applyForAccommodation)
router.route('/property/:propertyId/request').post(requestToView)

module.exports = router