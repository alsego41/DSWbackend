import { DocumentType } from '@typegoose/typegoose'
import { Repository } from '../shared/repository'
import{userTypeclass, userTypeModel } from './userType.entity.js'

export class userTypeRepository implements Repository<userTypeclass>{
    public async public async findAll(): Promise<userTypeclass[]> {
        const userstype = await userTypeModel.find().exec()
        return userstype
    }
    public async public async findById(item: { _id: String }): Promise<userTypeclass | null> {
        try {
            const usertype = await userTypeModel.findById(item._id).exec()
            return usertype
        } catch (err) {
            return null
        }
    }
}