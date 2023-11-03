import { Ref, getModelForClass, index, prop } from '@typegoose/typegoose'
import { UserDocument, UserModel } from '../user/user.entity.js'
import { PropertyClass, PropertyModel } from '../property/property.entity.js'

@index({ owner: 1, guest: 1, property: 1, checkIn: 1 }, { unique: true })
export class BookingClass {
	@prop({ required: true })
	public status?: String

	@prop({ required: true })
	public checkIn?: Date

	@prop({ required: true })
	public checkOut?: Date

	@prop({ required: true })
	public totalPrice?: Number

	@prop({ required: true, ref: () => UserModel })
	public owner?: Ref<UserDocument>

	@prop({ required: true, ref: () => UserModel })
	public guest?: Ref<UserDocument>

	@prop({ required: true, ref: () => PropertyClass })
	public property?: Ref<PropertyClass>
}

export const BookingModel = getModelForClass(BookingClass)
