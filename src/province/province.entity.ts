import { getModelForClass, prop } from '@typegoose/typegoose'

export class ProvinceClass {
	@prop({ required: true, unique: true })
	public nameProvince?: String
	@prop({ required: true })
	public idProvince?: String
}

export const ProvinceModel = getModelForClass(ProvinceClass)
