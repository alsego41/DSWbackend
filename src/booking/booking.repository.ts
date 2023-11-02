import { DocumentType } from '@typegoose/typegoose'
import { Repository } from '../shared/repository'
import { BookingClass, BookingModel } from './booking.entity.js'
import { Document } from 'mongoose'

export class BookingRepository implements Repository<BookingClass> {
	public async findAll(): Promise<DocumentType<BookingClass>[]> {
		const bookings = await BookingModel.find().exec()
		return bookings
	}

	public async findById(item: {
		_id: String
	}): Promise<DocumentType<BookingClass> | null> {
		try {
			const booking = await BookingModel.findById(item._id).exec()
			return booking
		} catch (err) {
			return null
		}
	}

	public async findDateCollisions(item: {
		checkInExp: Date
		checkOutExp: Date
		propertyId: string
	}): Promise<boolean | null> {
		// console.log(typeof item.checkInExp)
		// console.log(item.checkInExp)
		console.log('Id de la propiedad')
		console.log(item.propertyId)
		console.log('Checkeando disponibilidad en el periodo dado')
		const bookings = await BookingModel.find({
			$or: [
				{
					$and: [
						{ checkIn: { $gte: item.checkInExp } },
						{ checkIn: { $lte: item.checkOutExp } },
					],
				},
				{
					$and: [
						{ checkIn: { $lte: item.checkInExp } },
						{ checkOut: { $gte: item.checkInExp } },
					],
				},
			],
			property: item.propertyId,
		}).exec()
		let isAvailable: boolean
		// console.log(bookings)
		bookings.length === 0 ? (isAvailable = true) : (isAvailable = false)
		// console.log(bookings.length)
		console.log(isAvailable)
		return isAvailable
	}

	public async create(
		item: BookingClass,
	): Promise<DocumentType<BookingClass> | null> {
		console.log(item)
		const newbooking = BookingModel.create(item)
		return newbooking
	}

	// Fixear
	public async update(item: {
		_id: String
		booking: BookingClass
	}): Promise<DocumentType<BookingClass> | null> {
		const booking = await BookingModel.findByIdAndUpdate(item._id, item.booking)
		return booking
	}

	public async remove(item: {
		_id: String
	}): Promise<DocumentType<BookingClass> | null> {
		const booking = await BookingModel.findByIdAndDelete(item._id)
		return booking
	}
}
