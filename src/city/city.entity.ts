import { Ref, getModelForClass, index, prop } from '@typegoose/typegoose'
import { ProvinceClass, ProvinceModel } from '../province/province.entity.js'

@index({ nameCity: 1, nameDepartamento: 1, province: 1 }, { unique: true })
export class CityClass {
	@prop({ required: true })
	public nameCity?: String

	@prop({ required: true })
	public idCity?: String

	@prop({ required: true })
	public nameDepartamento?: String

	@prop({ required: true, ref: () => ProvinceClass })
	public province?: Ref<ProvinceClass>
}

export const CityModel = getModelForClass(CityClass)
