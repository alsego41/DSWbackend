import { Router } from 'express'
import { userController } from './user.controller.js'
import { SharedController } from '../shared/controller.js'

export const userRouter = Router()

userRouter.post(
	'/verify',
	SharedController.verifyToken,
	SharedController.testTokenVerification,
)
userRouter.get(
	'/properties/',
	SharedController.verifyToken,
	userController.populate,
)
userRouter.get('/:id', userController.findById)
userRouter.get('/', userController.findAll)
userRouter.post('/login', userController.login)
userRouter.post('/register', userController.register)
userRouter.post('/delete/:id', userController.remove)
userRouter.patch(
	'/properties/new',
	SharedController.verifyToken,
	userController.updateOwnProperties,
)
userRouter.patch('/edit', SharedController.verifyToken, userController.update)
