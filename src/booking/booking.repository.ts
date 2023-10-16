import { DocumentType } from '@typegoose/typegoose'
import { Repository } from '../shared/repository'
import { BookingClass, BookingModel } from './booking.entity.js'

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
