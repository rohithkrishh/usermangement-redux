const express = require('express')
const userRouter = express.Router()

const userController = require('../controllers/userController')
const userAuthMiddleware = require('../middleware/userAuthMiddleware')
const upload = require('../utils/multer')




userRouter.get('/profile', userController.userProfile)
userRouter.put('/update/:id', userAuthMiddleware.protect, upload.single('profileImage'), userController.updateProfile)
userRouter.post('/logout', userController.logoutUser)


module.exports = userRouter