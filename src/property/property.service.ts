import { PropertyRepository } from './property.repository.js'
import { ProvinceService } from '../province/province.service.js'
import { CityService } from '../city/city.service.js'
import { PropertyClass } from './property.entity.js'
import { mongoose } from '@typegoose/typegoose'
const propRepo = new PropertyRepository()

async function createProperty(data: any) {
	const { decodedToken, property } = data
	const session = await mongoose.startSession()
	session.startTransaction()
	try {
		const province = await ProvinceService.fetchProvince(data.province)
		const city = await CityService.fetchCity(data.city, province._id)
		const prop: PropertyClass = {
			nameProperty: property.nameProperty,
			statusProperty: property.statusProperty,
			city: city._id,
			photo: property.photo,
			address: property.address,
			zone: property.zone,
			m2: property.m2,
			spaces: property.spaces,
			roomQty: property.roomQty,
			bathQty: property.bathQty,
			backyard: property.backyard,
			grill: property.grill,
			price: property.price,
			user: decodedToken.id,
		}
		const newProp = await propRepo.create(prop)
		session.commitTransaction()
		session.endSession()
		return { property: newProp }
	} catch (error) {
		session.abortTransaction()
		session.endSession()
		return { error }
	}
}

export const PropertyService = {
	createProperty,
}
