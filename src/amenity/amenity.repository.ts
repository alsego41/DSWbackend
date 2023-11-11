import { DocumentType } from '@typegoose/typegoose'
import { Repository } from '../shared/repository'
import {amenityclass, amenitymodel} from './amenity.entity.ts'

export class amenityRepository implements Repository<amenityclass>{
    public async findAll(): Promise<amenityclass[]> {
     const amenity = await amenitymodel.find().exec()
     return amenity   
    }
    public async findById(item: { _id: String }): Promise<amenityclass> {
        try{
            const amenity = await amenitymodel.findById(item._id).exec()
            return amenity
        } catch (err) {
            return null
        }
    }
    public async findbyname(nameAmenity: string): Promise<DocumentType<amenityclass> | null>{
        try{
            const amenity = await amenitymodel.findone({nameAmenity}).exec()
            return amenity
        } catch (err) {
            return null
        }
    }
    public async create(item: amenityclass,): Promise<DocumentType<amenityclass> | null> {
		const newamenity = new amenitymodel(item)
		return await newamenity.save()
    }
    public async update(item: {
		_id: String
		usertype: amenityclass
	}): Promise<DocumentType<amenityclass> | null> {
		const amenity = await amenitymodel.findByIdAndUpdate(item._id, item.amenity)
		return amenity
	}
    public async remove(item: {
		_id: String
	}): Promise<DocumentType<amenityclass> | null> {
		const amenity = await amenitymodel.findByIdAndDelete(item._id)
		return amenity
	}
}