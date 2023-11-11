import { Request, Response, NextFunction } from 'express'
import jwt, { Secret } from 'jsonwebtoken'
import { provinceController } from '../province/province.controller.js'
import { cityController } from '../city/city.controller.js'
import { propertyController } from '../property/property.controller.js'
import { userController } from '../user/user.controller.js'
import { bookingController } from '../booking/booking.controller.js'
import { mongoose } from '@typegoose/typegoose'
import { userTypeController } from '../usertype/userType.controller.js'
import { error } from 'console'

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

async function availPropertiesByProvinceByDates(req: Request, res: Response) {
	const session = await mongoose.startSession()
	session.startTransaction()
	try {
		const province = await provinceController.findByProvId(req, res)
		req.body.province._id = province._id.toHexString()
		let properties = await propertyController.findByProvince(req, res)
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
		return res.status(200).json({ propsFiltered })
	} catch (error) {
		await session.abortTransaction()
		console.error('Transaction aborted. Error:', error)
		return res.status(400).json({ message: 'Transaction aborted' })
	} finally {
		session.endSession()
	}
}

async function availPropertiesByCityByDates(req: Request, res: Response) {
	const session = await mongoose.startSession()
	session.startTransaction()
	try {
		// const province = await provinceController.findByProvId(req, res)
		// req.body.city.province = province._id.toHexString()
		const city = await cityController.findOne(req, res)
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
		return res.status(200).json({ propsFiltered })
	} catch (error) {
		await session.abortTransaction()
		console.error('Transaction aborted. Error:', error)
		return res.status(400).json({ message: 'Transaction aborted' })
	} finally {
		session.endSession()
	}
}

async function createBooking(req: Request, res: Response) {
	const session = await mongoose.startSession()
	session.startTransaction()
	try {
		const property = await propertyController.findByIdSh(req, res)
		req.body.property = property
		const newBooking = await bookingController.create(req, res)
		if (!newBooking) {
			throw new Error('Booking creation failed')
		}
		await session.commitTransaction()
		console.log('Booking created')
		return res.status(200).json({ property, newBooking })
	} catch (error) {
		await session.abortTransaction()
		console.error('Transaction aborted. Error:', error)
		return res.status(400).json({ message: 'Booking creation failed' })
	} finally {
		session.endSession()
	}
}

async function createuser(req: Request, res: Response) {
	const session = await mongoose.startSession()
	session.startTransaction()
	try {
		const userType = await userTypeController.findbyname(req, res)
		req.body.userType = userType
		const newUser = await userController.register(req, res)
		if (!newUser) {
			throw new Error('User creation failed')
		}
		await session.commitTransaction()
		console.log('User created')
		return res.status(200).json({ userType, newUser })
	} catch (error) {
		await session.abortTransaction()
		console.error('transaction aborted. Error:', error)
		return res.status(400).json({ message: 'User creation faild' })
	} finally {
		session.endSession()
	}
}

export const SharedController = {
	verifyToken,
	testTokenVerification,
	createProp,
	availPropertiesByCityByDates,
	availPropertiesByProvinceByDates,
	createBooking,
	createuser,
}
