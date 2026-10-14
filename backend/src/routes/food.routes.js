const express = require('express');
const fooditemController=require("../controllers/fooditem.controller");
const authMiddleware=require("../middlewares/auth.middleware");
const router = express.Router();
const multer = require('multer');


const upload=multer({
storage:multer.memoryStorage(),
})

/* POST /api/food/ [protected]*/ 
router.post('/',
 authMiddleware.authdishifyPartnerMiddleware, 
 upload.single("video"),
 fooditemController.createFood)


/* GET /api/food/ [protected] */
router.get("/", authMiddleware.authUserMiddleware,fooditemController.getFoodItems)



router.post('/like', authMiddleware.authUserMiddleware, fooditemController.likeFood)


router.post('/save', authMiddleware.authUserMiddleware, fooditemController.saveFood)


router.get('/save' ,authMiddleware.authUserMiddleware, fooditemController.getSaveFood)

 
module.exports = router;