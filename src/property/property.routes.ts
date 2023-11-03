import { Router } from 'express'
import { propertyController } from './property.controller.js'
import { SharedController } from '../shared/controller.js'

export const propertyRouter = Router()

propertyRouter.get(
	'/ownerlist',
	SharedController.verifyToken,
	propertyController.findByOwner,
)
propertyRouter.get('/:id', propertyController.findById)
propertyRouter.get('/', propertyController.findAll)
// propertyRouter.post(
// 	'/new',
// 	SharedController.verifyToken,
// 	propertyController.create,
// )
propertyRouter.post(
	'/find',
	// SharedController.verifyToken,
	propertyController.findByCity,
)
propertyRouter.post('/delete/:id', propertyController.remove)
propertyRouter.patch(
	'/edit/:id',
	SharedController.verifyToken,
	propertyController.update,
)
