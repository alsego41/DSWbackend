import { DocumentType } from '@typegoose/typegoose'
import { Repository } from '../shared/repository'
import { CityClass, CityModel } from './city.entity.js'

export class CityRepository implements Repository<CityClass> {
	public async findAll(): Promise<DocumentType<CityClass>[]> {
		const cities = await CityModel.find().exec()
		return cities
	}

	public async findOne(city: {
		id: string
		nombre: string
		departamento: string
	}): Promise<any> {
		const cityDoc = await CityModel.findOne({
			idCity: city.id,
			nameCity: city.nombre,
			nameDepartamento: city.departamento,
		})
		return cityDoc
	}

	public async findByName(city: {
		nombre: string
		departamento: string
		province: string
	}): Promise<any> {
		const cityDoc = await CityModel.findOne({
			nameCity: city.nombre,
			nameDepartamento: city.departamento,
			province: city.province,
		})
		return cityDoc
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
		const cityDoc = await CityModel.create(item)
		return cityDoc
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
