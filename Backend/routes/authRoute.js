const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const upload = require('../utils/multer')


router.post('/signup', upload.single('profileImage'), authController.signup)
router.post('/login', authController.login)


module.exports = router;
