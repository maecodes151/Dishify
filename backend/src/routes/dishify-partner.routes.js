const express = require('express');
const  authMiddleware = require("../middlewares/auth.middleware")
const dishifyPartnerController = require('../controllers/dishify-partner.controller');

const router = express.Router();



/*/api/dishify-partner/:id*/
router.get("/:id", authMiddleware.authUserMiddleware, dishifyPartnerController.getDishifyPartnerById);

module.exports = router;