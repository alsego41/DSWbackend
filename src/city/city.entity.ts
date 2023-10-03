import { Ref, getModelForClass, index, prop } from '@typegoose/typegoose'
import { ProvinceClass } from '../province/province.entity.js'

@index({ nameCity: 1, province: 1 }, { unique: true })
export class CityClass {
	@prop({ required: true })
	public nameCity?: String

	@prop({ required: true, ref: () => ProvinceClass })
	public province?: Ref<ProvinceClass>
}

export const CityModel = getModelForClass(CityClass)
