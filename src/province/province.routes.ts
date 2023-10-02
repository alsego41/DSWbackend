import { Router } from 'express'
import { provinceController } from './province.controller.js'
import { SharedController } from '../shared/controller.js'

export const provinceRouter = Router()

provinceRouter.get('/:id', provinceController.findById)
provinceRouter.get('/', provinceController.findAll)
provinceRouter.post(
	'/new',
	// SharedController.verifyToken,
	provinceController.create,
)
provinceRouter.delete('/delete/:id', provinceController.remove)
provinceRouter.patch(
	'/edit/:id',
	SharedController.verifyToken,
	provinceController.update,
)
