import { Repository } from '../shared/repository'
import {
	IProperty,
	PropertyDocument,
	PropertyModel,
} from './property.entity.js'

export class PropertyRepository implements Repository<IProperty> {
	public async findAll(): Promise<PropertyDocument[]> {
		const properties = await PropertyModel.find().exec()
		return properties
	}

	public async findById(item: {
		_id: String
	}): Promise<PropertyDocument | null> {
		try {
			const property = await PropertyModel.findById(item._id).exec()
			return property
		} catch (err) {
			return null
		}
	}

	public async create(item: IProperty): Promise<PropertyDocument | null> {
		console.log(item)
		const newProperty = new PropertyModel(item)
		return await newProperty.save()
	}

	// Fixear
	public async update(item: {
		_id: String
		property: IProperty
	}): Promise<PropertyDocument | null> {
		const property = await PropertyModel.findByIdAndUpdate(
			item._id,
			item.property,
		)
		return property
	}

	public async remove(item: { _id: String }): Promise<PropertyDocument | null> {
		const property = await PropertyModel.findByIdAndDelete(item._id)
		return property
	}
}
