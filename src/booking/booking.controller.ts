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

async function findByGuest(req: Request, res: Response) {
	const bookings = await repository.findByGuest({
		guest: req.body.decodedToken.id,
	})
	return res.status(200).json(bookings)
}

async function findByOwner(req: Request, res: Response) {
	const bookings = await repository.findByOwner({
		owner: req.body.decodedToken.id,
	})
	return res.status(200).json(bookings)
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
	const { booking, decodedToken, property } = req.body

	function dateDiffInDays(start: Date, end: Date) {
		const _MS_PER_DAY = 1000 * 60 * 60 * 24
		const utc1 = Date.UTC(
			start.getFullYear(),
			start.getMonth(),
			start.getDate(),
		)
		const utc2 = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate())
		return Math.floor((utc2 - utc1) / _MS_PER_DAY)
	}
	const checkIn = new Date(booking.checkIn)
	const checkOut = new Date(booking.checkOut)
	const difference = dateDiffInDays(checkIn, checkOut)
	// console.log(difference)

	try {
		// const options = { session }
		// me llega la idpropiedad, el guestid y las fechas
		// asigno el estado, busco la propiedad, meto su ownerid y su precio * dias
		const newBooking: BookingClass = {
			status: 'Reservada',
			checkIn,
			checkOut,
			totalPrice: property.price * difference, //
			owner: property.user, //
			guest: decodedToken.id,
			property: property._id,
		}
		if (checkIn === null || checkOut === null) {
			throw new Error('Invalid Dates')
		}
		// await BookingModel.create(booking1)
		await session.commitTransaction()
		// return res.status(200).json({ booking1 })
		return newBooking
	} catch (error) {
		await session.abortTransaction()
		console.error('Transaction aborted. Error:', error)
		// return res.status(400).json({ message: 'Transaction aborted' })
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
	findByGuest,
	findByOwner,
	findDateCollisions,
	create,
	remove,
	update,
}
