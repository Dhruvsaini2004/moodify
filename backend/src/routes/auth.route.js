const { Router } = require('express')
const authRouter = Router()
const authController = require('../controllers/auth.controller')
const { identifyUser } = require('../middlewares/auth.middleware')

authRouter.post('/register', authController.registerController)

authRouter.post('/login', authController.loginController)

authRouter.get('/get-me', identifyUser ,authController.getUserController)

authRouter.get('/logout', identifyUser ,authController.logoutController)
module.exports = authRouter