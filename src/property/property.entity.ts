import { Ref, getModelForClass, index, prop } from '@typegoose/typegoose'
import { UserClass, UserModel } from '../user/user.entity.js'
import { CityClass, CityModel } from '../city/city.entity.js'

export class PropertyClass {
	@prop({ required: true })
	public nameProperty?: String

	@prop({ required: true })
	public statusProperty?: String

	@prop({ required: true, ref: () => CityClass })
	public city?: Ref<CityClass>

	@prop({ required: false })
	public photo?: String

	@prop({ required: true })
	public address?: String

	@prop({ required: true })
	public zone?: String

	@prop({ required: true })
	public m2?: Number

	@prop({ required: true })
	public spaces?: Number

	@prop({ required: true })
	public roomQty?: Number

	@prop({ required: true })
	public bathQty?: Number

	@prop({ required: true })
	public backyard?: Boolean

	@prop({ required: true })
	public grill?: Boolean

	@prop({ required: true })
	public price?: Number

	@prop({ required: true, ref: () => UserModel })
	public user?: Ref<UserClass>
}

export const PropertyModel = getModelForClass(PropertyClass)
