import { DocumentType } from '@typegoose/typegoose'
import { Repository } from '../shared/repository'
import { ProvinceClass, ProvinceModel } from './province.entity.js'

export class ProvinceRepository implements Repository<ProvinceClass> {
	public async findAll(): Promise<DocumentType<ProvinceClass>[]> {
		const provinces = await ProvinceModel.find().exec()
		return provinces
	}

	public async findById(item: {
		_id: String
	}): Promise<DocumentType<ProvinceClass> | null> {
		try {
			const province = await ProvinceModel.findById(item._id).exec()
			return province
		} catch (err) {
			return null
		}
	}

	public async create(
		item: ProvinceClass,
	): Promise<DocumentType<ProvinceClass> | null> {
		console.log(item)
		const provinceDoc = await ProvinceModel.create(item)
		// const newprovince = new ProvinceModel(item)
		return await provinceDoc.save()
	}

	// Fixear
	public async update(item: {
		_id: String
		province: ProvinceClass
	}): Promise<DocumentType<ProvinceClass> | null> {
		const province = await ProvinceModel.findByIdAndUpdate(
			item._id,
			item.province,
		)
		return province
	}

	public async remove(item: {
		_id: String
	}): Promise<DocumentType<ProvinceClass> | null> {
		const province = await ProvinceModel.findByIdAndDelete(item._id)
		return province
	}
}