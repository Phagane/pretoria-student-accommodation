const express = require('express');
const { addProperty, getLandlordProperties } = require('./../controllers/propertyController');
const { authMiddleware } = require('./../middleware/authMiddleware'); // Assuming an authentication middleware

const router = express.Router()

router.route('/addProperty').post(authMiddleware, addProperty)
router.route('/properties').get(authMiddleware, getLandlordProperties);
module.exports = router;