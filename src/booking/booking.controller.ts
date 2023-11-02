import { Request, Response, NextFunction } from 'express'
import { BookingRepository } from './booking.repository.js'
import { BookingClass, BookingModel } from './booking.entity.js'
import { ProvinceRepository } from '../province/province.repository.js'
import mongoose from 'mongoose'

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

async function findDateCollisions(req: Request, res: Response) {
	const { checkInExp, checkOutExp, propertyId } = req.body.booking
	const dCheckIn = new Date(checkInExp)
	const dCheckOut = new Date(checkOutExp)
	// console.log(dCheckIn, dCheckOut)
	const bookings = await repository.findDateCollisions({
		checkInExp: dCheckIn,
		checkOutExp: dCheckOut,
		propertyId,
	})
	// return res.status(200).json({ bookingsFound: bookings })
	return bookings
}

async function create(req: Request, res: Response) {
	const session = await mongoose.startSession()
	session.startTransaction()
	const { booking } = req.body
	try {
		// const options = { session }
		const booking1: BookingClass = {
			status: booking.status,
			checkIn: new Date(booking.checkIn),
			checkOut: new Date(booking.checkOut),
			totalPrice: booking.totalPrice,
			owner: booking.owner,
			guest: booking.guest,
			property: booking.property,
		}
		await BookingModel.create(booking1)
		await session.commitTransaction()
		return res.status(200).json({ booking1 })
	} catch (error) {
		await session.abortTransaction()
		console.error('Transaction aborted. Error:', error)
		return res.status(400).json({ message: 'Transaction aborted' })
	} finally {
		session.endSession()
	}
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
	findDateCollisions,
	create,
	remove,
	update,
}
