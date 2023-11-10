import { Router } from 'express'
import { cityController } from './city.controller.js'
import { SharedController } from '../shared/controller.js'

export const cityRouter = Router()

cityRouter.get('/:id', cityController.findById)
cityRouter.get('/', cityController.findAll)
cityRouter.post(
	'/new',
	// SharedController.verifyToken,
	cityController.create,
)
cityRouter.delete('/delete/:id', cityController.remove)
cityRouter.patch(
	'/edit/:id',
	SharedController.verifyToken,
	cityController.update,
)
