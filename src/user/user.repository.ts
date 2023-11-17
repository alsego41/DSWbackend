import { DocumentType } from '@typegoose/typegoose'
import { Repository } from '../shared/repository'
import { UserClass, UserModel } from './user.entity.js'

export class UserRepository implements Repository<UserClass> {
	public async findAll(): Promise<DocumentType<UserClass>[]> {
		const users = await UserModel.find().exec()
		return users
	}
	public async findById(item: {
		_id: String
	}): Promise<DocumentType<UserClass> | null> {
		try {
			const user = await UserModel.findById(item._id).exec()
			return user
		} catch (err) {
			return null
		}
	}
	public async populate(item: {
		_id: string
	}): Promise<DocumentType<UserClass> | null> {
		try {
			console.log(item._id)
			const user = await UserModel.findById(item._id)
				.populate('properties')
				.exec()
			return user
		} catch (err) {
			return null
		}
	}
	public async findOne(email: String): Promise<DocumentType<UserClass> | null> {
		try {
			const user = await UserModel.findOne({ email })
				.populate('userType')
				.exec()
			return user
		} catch (err) {
			return null
		}
	}
	public async create(
		item: UserClass,
	): Promise<DocumentType<UserClass> | null> {
		const newUser = new UserModel(item)
		return await newUser.save()
	}
	public async update(item: {
		_id: String
		user: UserClass
	}): Promise<DocumentType<UserClass> | null> {
		const user = await UserModel.findByIdAndUpdate(item._id, item.user)
		return user
	}
	public async updateOwnProperties(item: {
		_id: string
		idProperty: string
	}): Promise<DocumentType<UserClass> | null> {
		const user = await UserModel.findByIdAndUpdate(
			item._id,
			{
				$push: { properties: item.idProperty },
			},
			{ new: true },
		)
		return user
	}
	public async remove(item: {
		_id: String
	}): Promise<DocumentType<UserClass> | null> {
		const user = await UserModel.findByIdAndDelete(item._id)
		return user
	}

	public async updateType(item: {
		userId: String
		userTypeId: String
	}): Promise<DocumentType<UserClass> | null> {
		const userUpdated = await UserModel.findByIdAndUpdate(
			item.userId,
			{ userType: item.userTypeId },
			{ new: true },
		)
		return userUpdated
	}
}
