import { DocumentType } from '@typegoose/typegoose'
import { Repository } from '../shared/repository'
import { CityClass, CityModel } from './city.entity.js'

export class CityRepository implements Repository<CityClass> {
	public async findAll(): Promise<DocumentType<CityClass>[]> {
		const cities = await CityModel.find().populate('province').exec()
		return cities
	}

	public async findById(item: {
		_id: String
	}): Promise<DocumentType<CityClass> | null> {
		try {
			const city = await CityModel.findById(item._id).exec()
			return city
		} catch (err) {
			return null
		}
	}

	public async create(
		item: CityClass,
	): Promise<DocumentType<CityClass> | null> {
		console.log(item)
		const cityDoc = await CityModel.create(item)
		// const newcity = new CityModel(item)
		return await cityDoc.save()
	}

	// Fixear
	public async update(item: {
		_id: String
		city: CityClass
	}): Promise<DocumentType<CityClass> | null> {
		const city = await CityModel.findByIdAndUpdate(item._id, item.city)
		return city
	}

	public async remove(item: {
		_id: String
	}): Promise<DocumentType<CityClass> | null> {
		const city = await CityModel.findByIdAndDelete(item._id)
		return city
	}
}
