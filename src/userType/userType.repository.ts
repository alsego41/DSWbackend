import { DocumentType } from '@typegoose/typegoose'
import { Repository } from '../shared/repository'
import{userTypeclass, userTypeModel } from './userType.entity.js'

export class userTypeRepository implements Repository<userTypeclass>{
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
    public async findbyname(nameType: String): Promise<DocumentType<userTypeclass> | null> {
		try {
			const user = await userTypeModel.findbyname({ nameType }).exec()
			return user
		} catch (err) {
			return null
		}
	}
    public async create(
		item: userTypeclass,
	): Promise<DocumentType<userTypeclass> | null> {
		const newUser = new userTypeModel(item)
		return await newUser.save()
	}
    public async update(item: {
		_id: String
		usertype: userTypeclass
	}): Promise<DocumentType<userTypeclass> | null> {
		const usertype = await userTypeModel.findByIdAndUpdate(item._id, item.usertype)
		return usertype
	}
    public async remove(item: {
		_id: String
	}): Promise<DocumentType<userTypeclass> | null> {
		const usertype = await userTypeModel.findByIdAndDelete(item._id)
		return usertype
	}

}