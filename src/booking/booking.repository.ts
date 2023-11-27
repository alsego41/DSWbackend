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

	public async findDateCollisions(item: {
		checkInExp: Date
		checkOutExp: Date
		propertyId: string
	}): Promise<boolean | null> {
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
		bookings.length === 0 ? (isAvailable = true) : (isAvailable = false)
		return isAvailable
	}

	public async findByOwner(item: {
		owner: string
	}): Promise<DocumentType<BookingClass>[] | undefined> {
		const bookings = await BookingModel.find({ owner: item.owner })
			.populate([
				{
					path: 'property',
					populate: { path: 'city', populate: { path: 'province' } },
				},
				{ path: 'guest', select: 'firstName lastName dni email dob' },
			])
			.exec()
		return bookings
	}

	public async findByGuest(item: {
		guest: string
	}): Promise<DocumentType<BookingClass>[] | undefined> {
		const bookings = await BookingModel.find({ guest: item.guest })
			.populate([
				{ path: 'owner', select: 'firstName lastName email' },
				{
					path: 'property',
					populate: { path: 'city', populate: { path: 'province' } },
				},
			])
			.exec()
		return bookings
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
