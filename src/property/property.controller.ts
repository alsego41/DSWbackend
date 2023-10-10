import { Request, Response, NextFunction} from 'express'
import { PropertyRepository } from './property.repository.js'
import { IProperty } from './property.entity.js'

const repository = new PropertyRepository()

async function findAll(req: Request, res: Response) {
	const allProperties = await repository.findAll()
	return res.status(200).json(allProperties)
}

async function findById(req: Request, res: Response) {
	const property = await repository.findById({ _id: req.params.id })
	if (!property) {
		return res.status(404).json({ message: 'Property not found' })
	}
	return res.status(200).json(property)
}

function sanitizePropertyInput(req: Request, res: Response, next:NextFunction){
    req.body.sanitizedInput = {
		nameProperty: req.body.nameProperty,
		statusProperty: 'Disponible',
		photo: './assets/testcasa.jpg',
		address: req.body.address,
		zone: req.body.zone,
		m2: req.body.m2,
		spaces: req.body.spaces,
		roomQty: req.body.roomQty,
		bathQty: req.body.bathQty,
		backyard: req.body.backyard,
		grill: req.body.grill,
		user: req.body.decodedToken.id,
	}
	// more checks

	next()
}

async function create (req: Request, res: Response) {
	let newProperty: IProperty = {
		nameProperty: req.body.nameProperty,
		statusProperty: 'Disponible',
		photo: './assets/testcasa.jpg',
		address: req.body.address,
		zone: req.body.zone,
		m2: req.body.m2,
		spaces: req.body.spaces,
		roomQty: req.body.roomQty,
		bathQty: req.body.bathQty,
		backyard: req.body.backyard,
		grill: req.body.grill,
		user: req.body.decodedToken.id,
	}
	await repository
		.create(newProperty)
		.then((property) => {
			// console.log(property)
			console.log(`Property ${property?._id} created`)
			return res.status(201).json(property)
		})
		.catch((err) => {
			console.log(err._message)
			return res.status(400).json({ message: err._message })
		})
}

async function remove(req: Request, res: Response) {
	const _id = req.params.id
	console.log(_id)
	await repository.remove({ _id })
	return res.status(200).json({ message: 'Property deleted' })
}

async function update(req: Request, res: Response) {
	await repository
		.update({
			_id: req.body.decodedToken.id,
			property: req.body.property,
		})
		.then((doc) => {
			console.log(doc)
			return res.status(200).json({ message: 'Property updated' })
		})
		.catch((err) => {
			console.log(err)
			return res.status(400).json({ message: "Couldn't update property" })
		})
}

export const propertyController = {
	findAll,
	findById,
	create,
	remove,
	update,
	sanitizePropertyInput,
}
