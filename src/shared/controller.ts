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
		// console.log(decodedToken)
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
	const session = await mongoose.startSession()
	session.startTransaction()
	try {
		let province = await provinceController.findByProvId(req, res)
		if (!province) {
			province = await provinceController.create(req, res)
		}
		req.body.province._id = province?._id.toHexString()
		let city = await cityController.findOne(req, res)
		if (!city) {
			city = await cityController.create(req, res)
		}
		req.body.city._id = city?._id.toHexString()
		const property = await propertyController.create(req, res)
		res.status(201).json({ message: 'Propiedad creada' })
	} catch (error) {
		await session.abortTransaction()
		console.error('Transaction aborted. Error:', error)
		return res.status(400).json({ message: 'Transaction aborted' })
	} finally {
		session.endSession()
	}
}

async function availPropertiesByDates(req: Request, res: Response) {
	const session = await mongoose.startSession()
	session.startTransaction()
	try {
		const province = await provinceController.findByName(req, res)
		req.body.city.province = province._id.toHexString()
		const city = await cityController.findByName(req, res)
		req.body.city.id = city._id
		let properties = await propertyController.findByCity(req, res)

		async function checkAvail(prop: any) {
			req.body.booking.propertyId = prop._id
			let isAvailable = await bookingController.findDateCollisions(req, res)
			console.log('La propiedad ', prop._id, 'esta disponible ? ', isAvailable)
			if (isAvailable) {
				return prop
			}
		}
		let propsFiltered: any[] = []
		for (let i = 0; i < properties?.length!; i++) {
			let result = await checkAvail(properties![i])
			if (result) {
				propsFiltered.push(result)
			}
		}
		return res.status(200).json({ province, city, propsFiltered })
	} catch (error) {
		await session.abortTransaction()
		console.error('Transaction aborted. Error:', error)
		return res.status(400).json({ message: 'Transaction aborted' })
	} finally {
		session.endSession()
	}
}

export const SharedController = {
	verifyToken,
	testTokenVerification,
	createProp,
	availPropertiesByDates,
}
