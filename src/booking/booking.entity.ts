import { Ref, getModelForClass, index, prop } from '@typegoose/typegoose'
import { UserClass, UserModel } from '../user/user.entity.js'
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

	@prop({ required: true, ref: () => UserClass })
	public owner?: Ref<UserClass>

	@prop({ required: true, ref: () => UserClass })
	public guest?: Ref<UserClass>

	@prop({ required: true, ref: () => PropertyClass })
	public property?: Ref<PropertyClass>
}

export const BookingModel = getModelForClass(BookingClass)
