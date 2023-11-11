import { Request, Response, NextFunction } from 'express'
import { amenityRepository } from './amenity.repository.js'
import {amenityclass} from './amenity.entity.js'

const repository = new amenityRepository()

async function findAll(req:Request, res: Response) {
    const amenity = await repository.findAll()
    if(!amenity){
        return res.status(404).json({ message: 'No amenity found'})
    }
    return res.status(200).json(amenity)
}

async function sanitizedInput(req:Request, res: Response, next: NextFunction) {
    const {nameAmenity} = req.body
    req.body.sanitizedInput = {
        nameAmenity
    }
    next()
}

async function findById(req: Request, res: Response) {
	console.log(req.body)
	const amenity = await repository.findById({ _id: req.params.id })
	if (!amenity) {
		return res.status(404).json({ messsage: 'Amenity not found' })
	}
}

async function remove(req:Request, res: Response) {
    const _id = req.params.id
    console.log(_id)
    await repository.remove({_id})
    return res.status(200).json({ message:'Amenity deleted'})
    
}
async function update(req: Request, res: Response) {
	await repository
		.update({
			_id: req.body.decodedToken.id,
			amenity: req.body.amenity,
		})
		.then((doc) => {
			console.log(doc)
			return res.status(200).json({ message: 'Amenity updated' })
		})
		.catch((err) => {
			console.log(err)
			return res.status(400).json({ message: "Couldn't update Amenity" })
		})
}

export const amenitycontroller = {
    findAll,
    findById,
    remove,
    update,
    sanitizedInput,
}
