import { Router } from 'express'
import { SharedController } from '../shared/controller.js'

export const sharedRouter = Router()

sharedRouter.post(
	'/newprop',
	// SharedController.verifyToken,
	SharedController.createProp,
)