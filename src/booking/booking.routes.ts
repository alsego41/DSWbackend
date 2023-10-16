import { Router } from 'express'
import { bookingController } from './booking.controller.js'
import { SharedController } from '../shared/controller.js'

export const bookingRouter = Router()

bookingRouter.get('/:id', bookingController.findById)
bookingRouter.get('/', bookingController.findAll)
bookingRouter.post(
	'/new',
	SharedController.verifyToken,
	bookingController.create,
)
bookingRouter.post('/delete/:id', bookingController.remove)
bookingRouter.patch(
	'/edit/:id',
	SharedController.verifyToken,
	bookingController.update,
)
