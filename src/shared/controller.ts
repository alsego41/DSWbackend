import { Request, Response, NextFunction } from 'express'
import jwt, { Secret } from 'jsonwebtoken'
import { provinceController } from '../province/province.controller.js'
import { cityController } from '../city/city.controller.js'
import { propertyController } from '../property/property.controller.js'
import { userController } from '../user/user.controller.js'
import { bookingController } from '../booking/booking.controller.js'
import { mongoose } from '@typegoose/typegoose'

async function verifyToken(req: Request, res: Response, next: NextFunction) {
	const token: string =
		req.body.token || req.headers.authorization?.split('Bearer ')[1]
	console.log(token)
	if (!token) {
		return res.status(403).json({ message: 'Token required' })
	}
	try {
		const decodedToken = jwt.verify(token, process.env.JWT_TOKEN_KEY as Secret)
		console.log(decodedToken)
		req.body.decodedToken = decodedToken
		return next()
	} catch (err) {
		return res.status(401).json({ message: 'Invalid Token', err: err })
	}
}

async function testTokenVerification(req: Request, res: Response) {
	return res.status(200).json({
		message: 'User has been verified successfully',
		payload: req.body.decodedToken,
	})
}

async function createProp(req: Request, res: Response) {
	const province = await provinceController.findOrCreate(req, res)
	req.body.province._id = res.locals.prov._id.toHexString() || ''
	const city = await cityController.findOrCreate(req, res)
	req.body.city._id = res.locals.city._id.toHexString() || ''
	const property = await propertyController.create(req, res)
	req.body.property._id = res.locals.property._id.toHexString() || ''
	const user = await userController.updateOwnProperties(req, res)
	if (res.locals.err) {
		res
			.status(res.locals.err.statusCode)
			.json({ message: res.locals.err.message })
	} else {
		res.status(201).json({
			province: res.locals.prov,
			city: res.locals.city,
			property: res.locals.property,
			user: res.locals.user,
		})
	}
}

async function availPropertiesByDates(req: Request, res: Response) {
	// const session = await mongoose.startSession()
	// session.startTransaction()
	// Buscar provincia por nombre
	const province = await provinceController.findOne(req, res)
	// console.log(province._id.toHexString())
	req.body.city.province = province._id.toHexString()
	// Buscar ciudad por nombre
	const city = await cityController.findByName(req, res)
	console.log(city)
	req.body.city.id = city._id
	// Buscar propiedades por ciudad
	const properties = await propertyController.findByCity(req, res)
	console.log(properties)
	return res.status(200).json({ province, city, properties })
	// console.log(req.body)
	// const { booking } = req.body
	// try {
	// 	// const options = { session }
	// 	const booking1: BookingClass = {
	// 		status: booking.status,
	// 		checkIn: new Date(booking.checkIn),
	// 		checkOut: new Date(booking.checkOut),
	// 		totalPrice: booking.totalPrice,
	// 		owner: booking.owner,
	// 		guest: booking.guest,
	// 		property: booking.property,
	// 	}
	// 	await BookingModel.create(booking1)
	// 	await session.commitTransaction()
	// 	return res.status(200).json({ booking1 })
	// } catch (error) {
	// 	await session.abortTransaction()
	// 	console.error('Transaction aborted. Error:', error)
	// 	return res.status(400).json({ message: 'Transaction aborted' })
	// } finally {
	// 	session.endSession()
	// }
}

export const SharedController = {
	verifyToken,
	testTokenVerification,
	createProp,
	availPropertiesByDates,
}
