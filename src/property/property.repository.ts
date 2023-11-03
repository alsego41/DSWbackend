import { DocumentType, mongoose } from '@typegoose/typegoose'
import { Repository } from '../shared/repository'
import { PropertyClass, PropertyModel } from './property.entity.js'

export class PropertyRepository implements Repository<PropertyClass> {
	public async findAll(): Promise<DocumentType<PropertyClass>[]> {
		const properties = await PropertyModel.find().exec()
		return properties
	}

	public async findById(item: {
		_id: String
	}): Promise<DocumentType<PropertyClass> | null> {
		try {
			const property = await PropertyModel.findById(item._id).exec()
			return property
		} catch (err) {
			return null
		}
	}

	public async findByCity(item: {
		city: string
	}): Promise<DocumentType<PropertyClass>[] | undefined> {
		const cityId = new mongoose.Types.ObjectId(item.city)
		// console.log(cityId)
		const properties = await PropertyModel.find({
			city: item.city,
			statusProperty: 'Disponible',
		}).exec()
		// .select('_id')
		return properties
	}

	public async create(
		item: PropertyClass,
	): Promise<DocumentType<PropertyClass> | null> {
		console.log(item)
		const newProperty = PropertyModel.create(item)
		return newProperty
	}

	// Fixear
	public async update(item: {
		_id: String
		property: PropertyClass
	}): Promise<DocumentType<PropertyClass> | null> {
		const property = await PropertyModel.findByIdAndUpdate(
			item._id,
			item.property,
		)
		return property
	}

	public async remove(item: {
		_id: String
	}): Promise<DocumentType<PropertyClass> | null> {
		const property = await PropertyModel.findByIdAndDelete(item._id)
		return property
	}
}
