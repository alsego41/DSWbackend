import { DocumentType } from '@typegoose/typegoose'
import { Repository } from '../shared/repository'
import { userTypeclass, userTypeModel } from './userType.entity.js'

export class userTypeRepository implements Repository<userTypeclass> {
	public async findAll(): Promise<userTypeclass[]> {
		const userstype = await userTypeModel.find().exec()
		return userstype
	}
	public async findById(item: { _id: String }): Promise<userTypeclass | null> {
		try {
			const usertype = await userTypeModel.findById(item._id).exec()
			return usertype
		} catch (err) {
			return null
		}
	}
	public async findbyname(
		nameType: any,
	): Promise<DocumentType<userTypeclass> | null> {
		try {
			console.log(nameType)
			const userType = await userTypeModel.findOne({ nameType }).exec()
			return userType
		} catch (err) {
			return null
		}
	}
	public async create(
		item: userTypeclass,
	): Promise<DocumentType<userTypeclass> | null> {
		const newuserType = new userTypeModel(item)
		return await newuserType.save()
	}
	public async update(item: {
		_id: String
		usertype: userTypeclass
	}): Promise<DocumentType<userTypeclass> | null> {
		const usertype = await userTypeModel.findByIdAndUpdate(
			item._id,
			item.usertype,
		)
		return usertype
	}
	public async remove(item: {
		_id: String
	}): Promise<DocumentType<userTypeclass> | null> {
		const usertype = await userTypeModel.findByIdAndDelete(item._id)
		return usertype
	}
}
