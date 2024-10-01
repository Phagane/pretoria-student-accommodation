const express = require('express');
const { addProperty, 
        getLandlordProperties, 
        updatePropertyById, 
        deletePropertyById, 
        getPropertyById,
        getTenants,
        deleteTenant,
        getLandlordNotifications,
        acceptApplicant,
        rejectApplicant,
        acceptViewingRequest,
        rejectViewingRequest,
        updateTenantInfo ,
        addTenantToProperty,
    } = require('./../controllers/landlordController');
const { authMiddleware } = require('./../middleware/authMiddleware'); 

const router = express.Router()

router.route('/addProperty').post(authMiddleware, addProperty)
router.route('/properties').get(authMiddleware, getLandlordProperties)
router.route('/properties/:propertyId').get(authMiddleware, getPropertyById)
router.route('/properties/:propertyId').put(authMiddleware, updatePropertyById)
router.route('/properties/:propertyId').delete(authMiddleware, deletePropertyById)
router.route('/properties/:propertyId/tenants').get(authMiddleware, getTenants)
router.route('/properties/:propertyId/tenants/:tenantId').delete(authMiddleware, deleteTenant)
router.route('/notifications').get(authMiddleware, getLandlordNotifications)
router.route('/accept-applicant').post(authMiddleware, acceptApplicant)
router.route('/reject-applicant').post(authMiddleware, rejectApplicant)
router.route('/accept-viewing-request').post(authMiddleware, acceptViewingRequest)
router.route('/reject-viewing-request').post(authMiddleware, rejectViewingRequest)
router.route('/properties/:propertyId/tenants/:tenantId').put(authMiddleware, updateTenantInfo )
router.route('/add-tenant/:propertyId').post(authMiddleware, addTenantToProperty)

module.exports = router;