import { Request, Response, NextFunction } from 'express'
import { PropertyRepository } from './property.repository.js'
import { PropertyClass } from './property.entity.js'
import { PropertyService } from './property.service.js'

const repository = new PropertyRepository()

async function findAll(req: Request, res: Response) {
	const allProperties = await repository.findAll()
	return res.status(200).json(allProperties)
}

async function findById(req: Request, res: Response) {
	const property = await repository.findById({
		_id: req.params.id || req.body.property.id,
	})
	if (!property) {
		return res.status(404).json({ message: 'Property not found' })
	}
	return res.status(200).json(property)
}

async function findByIdFull(req: Request, res: Response) {
	const property = await repository.findByIdFull({
		_id: req.params.id || req.body.property.id,
	})
	if (!property) {
		return res.status(404).json({ message: 'Property not found' })
	}
	return res.status(200).json(property)
}

async function findByIdSh(req: Request, res: Response) {
	const property = await repository.findById({
		_id: req.params.id || req.body.property.id,
	})
	return property
}

function sanitizePropertyInput(
	req: Request,
	res: Response,
	next: NextFunction,
) {
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

async function findByCity(req: Request, res: Response) {
	// console.log(req.body)
	const properties = await repository.findByCity({
		city: req.body.city.id,
		roomQty: req.body.booking.roomQtyExp,
	})
	// return res.status(200).json(properties)
	// console.log(properties)
	return properties
}

async function findByProvince(req: Request, res: Response) {
	const properties = await repository.findByProvince({
		provinceId: req.body.province._id,
		roomQty: req.body.booking.roomQtyExp,
	})
	return properties
}

async function findByOwner(req: Request, res: Response) {
	const properties = await repository.findByOwner({
		owner: req.body.decodedToken.id,
	})
	return res.status(200).json(properties)
}

async function create(req: Request, res: Response) {
	const newProp: any = await PropertyService.createProperty(req.body)
	if (newProp.error) {
		return res.status(400).json({ error: newProp.error._message })
	}
	return res.status(201).json(newProp)
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
	findByIdSh,
	findByIdFull,
	findByCity,
	findByProvince,
	findByOwner,
	create,
	remove,
	update,
	sanitizePropertyInput,
}
