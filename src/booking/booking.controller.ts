import { Request, Response, NextFunction } from 'express'
import { BookingRepository } from './booking.repository.js'
import { BookingClass, BookingModel } from './booking.entity.js'
import { ProvinceRepository } from '../province/province.repository.js'

const repository = new BookingRepository()

async function findAll(req: Request, res: Response) {
	const bookings = await repository.findAll()
	return res.status(200).json(bookings)
}

async function findById(req: Request, res: Response) {
	const booking = await repository.findById({ _id: req.params.id })
	if (!booking) {
		return res.status(404).json({ message: 'booking not found' })
	}
	return res.status(200).json(booking)
}

async function create(req: Request, res: Response) {
	// let { property, city, decodedToken } = req.body
	// let newProperty: IProperty = {
	// 	nameProperty: property.nameProperty,
	// 	statusProperty: property.statusProperty,
	// 	city: city._id,
	// 	photo: property.photo,
	// 	address: property.address,
	// 	zone: property.zone,
	// 	m2: property.m2,
	// 	spaces: property.spaces,
	// 	roomQty: property.roomQty,
	// 	bathQty: property.bathQty,
	// 	backyard: property.backyard,
	// 	grill: property.grill,
	// 	price: property.price,
	// 	user: decodedToken.id,
	// }
	// await repository
	// 	.create(newProperty)
	// 	.then((property) => {
	// 		console.log(`Property ${property?._id} created`)
	// 		res.locals.property = property
	// 	})
	// 	.catch((err) => {
	// 		res.locals.err = { message: err._message, statusCode: 400 }
	// 	})
}

async function remove(req: Request, res: Response) {
	const _id = req.params.id
	console.log(_id)
	await repository.remove({ _id })
	return res.status(200).json({ message: 'Booking deleted' })
}

async function update(req: Request, res: Response) {
	// await repository
	// 	.update({
	// 		_id: req.body.decodedToken.id,
	// 		property: req.body.property,
	// 	})
	// 	.then((doc) => {
	// 		console.log(doc)
	// 		return res.status(200).json({ message: 'Property updated' })
	// 	})
	// 	.catch((err) => {
	// 		console.log(err)
	// 		return res.status(400).json({ message: "Couldn't update property" })
	// 	})
}

export const bookingController = {
	findAll,
	findById,
	create,
	remove,
	update,
}
