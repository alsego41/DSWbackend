import { Ref, getModelForClass, index, prop } from '@typegoose/typegoose'
import { PropertyClass, PropertyModel } from '../property/property.entity.js'

export class UserClass {
	@prop({ required: true })
	public firstName?: String

	@prop({ required: true })
	public lastName?: String

	@prop({ required: true })
	public dni?: Number

	@prop({ required: true })
	public email?: String

	@prop({ required: true })
	public address?: String

	@prop({ required: true })
	public password?: String

	@prop({ required: true })
	public dob?: String

	@prop({ required: true })
	public gender?: String

	@prop({ required: false })
	public bankAccount?: String

	// @prop({ required: true, ref: () => PropertyClass })
	// public properties?: Ref<PropertyClass[]>
}

export const UserModel = getModelForClass(UserClass)
