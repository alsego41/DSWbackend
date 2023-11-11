import { Router } from 'express'
import { SharedController } from '../shared/controller.js'

export const sharedRouter = Router()

sharedRouter.post(
	'/newprop',
	SharedController.verifyToken,
	SharedController.createProp,
)

sharedRouter.post(
	'/newBooking',
	SharedController.verifyToken,
	SharedController.createBooking,
)

sharedRouter.post(
	'/availProps/city',
	SharedController.availPropertiesByCityByDates,
)

sharedRouter.post(
	'/availProps/province',
	SharedController.availPropertiesByProvinceByDates,
)
