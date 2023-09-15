import { Router } from 'express'
import { userController } from './user.controller.js'

export const userRouter = Router()

userRouter.post(
	'/verify',
	userController.verifyToken,
	userController.testTokenVerification,
)
userRouter.get('/', userController.findAll)
userRouter.post('/login', userController.login)
userRouter.post('/register', userController.register)
userRouter.post('/delete/:id', userController.remove)
userRouter.patch(
	'/properties/new',
	userController.verifyToken,
	userController.updateOwnProperties,
)
userRouter.patch('/edit', userController.verifyToken, userController.update)
// Fixear esto, se va a la ruta de /:id cuando se hace llamada a /properties
// Unica fix de momento, precedencia?
userRouter.get(
	'/properties/',
	userController.verifyToken,
	userController.populate,
)
userRouter.get('/:id', userController.findById)
