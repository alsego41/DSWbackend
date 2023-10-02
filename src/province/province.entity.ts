import { getModelForClass, prop } from '@typegoose/typegoose'

export class ProvinceClass {
	@prop({ required: true, unique: true })
	public nameProvince?: String
}

export const ProvinceModel = getModelForClass(ProvinceClass)
