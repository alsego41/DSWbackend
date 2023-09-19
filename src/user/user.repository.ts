import { Repository } from '../shared/repository'
import { IUser, UserDocument, UserModel } from './user.entity.js'

export class UserRepository implements Repository<IUser> {
	public async findAll(): Promise<UserDocument[]> {
		const users = await UserModel.find().exec()
		return users
	}
	public async findById(item: { _id: String }): Promise<UserDocument | null> {
		try {
			const user = await UserModel.findById(item._id).exec()
			return user
		} catch (err) {
			return null
		}
	}
	public async populate(item: { _id: string }): Promise<UserDocument | null> {
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
	public async findOne(email: String): Promise<UserDocument | null> {
		try {
			const user = await UserModel.findOne({ email }).exec()
			return user
		} catch (err) {
			return null
		}
	}
	public async create(item: IUser): Promise<UserDocument | null> {
		const newUser = new UserModel(item)
		return await newUser.save()
	}
	public async update(item: {
		_id: String
		user: IUser
	}): Promise<UserDocument | null> {
		const user = await UserModel.findByIdAndUpdate(item._id, item.user)
		return user
	}
	public async updateOwnProperties(item: {
		_id: string
		idProperty: string
	}): Promise<UserDocument | null> {
		const user = await UserModel.findByIdAndUpdate(
			item._id,
			{
				$push: { properties: item.idProperty },
			},
			{ new: true },
		)
		return user
	}
	public async remove(item: { _id: String }): Promise<UserDocument | null> {
		const user = await UserModel.findByIdAndDelete(item._id)
		return user
	}
}
