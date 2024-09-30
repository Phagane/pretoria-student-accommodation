const express = require('express')
const { authMiddleware } = require('./../middleware/authMiddleware'); 
const {
    getProperties, 
    getPropertyDetails,
    applyForAccommodation,
    requestToView,
    getUserInfoWithTenantDetails,
} = require('./../controllers/userController')

const router = express.Router()

router.route('/home').get(getProperties)
router.route('/property/:propertyId').get(getPropertyDetails)
router.route('/property/:propertyId/apply').post(authMiddleware ,applyForAccommodation)
router.route('/property/:propertyId/request').post(requestToView)
router.route('/user-info').get(authMiddleware, getUserInfoWithTenantDetails)

module.exports = router