import { Request, Response, NextFunction } from 'express'
import { PropertyRepository } from './property.repository.js'
import { PropertyClass } from './property.entity.js'
import { ProvinceRepository } from '../province/province.repository.js'

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

async function findByCity(req: Request, res: Response) {
	console.log(req.body.city.id)
	const properties = await repository.findByCity({ city: req.body.city.id })
	// return res.status(200).json(properties)
	// console.log(properties)
	return properties
}

async function findByOwner(req: Request, res: Response) {
	const properties = await repository.findByOwner({
		owner: req.body.decodedToken.id,
	})
	return res.status(200).json(properties)
}

async function create(req: Request, res: Response) {
	let { property, city, decodedToken } = req.body
	let newProperty: PropertyClass = {
		nameProperty: property.nameProperty,
		statusProperty: property.statusProperty,
		city: city._id,
		photo: property.photo,
		address: property.address,
		zone: property.zone,
		m2: property.m2,
		spaces: property.spaces,
		roomQty: property.roomQty,
		bathQty: property.bathQty,
		backyard: property.backyard,
		grill: property.grill,
		price: property.price,
		user: decodedToken.id,
	}
	await repository
		.create(newProperty)
		.then((property) => {
			console.log(`Property ${property?._id} created`)
			res.locals.property = property
		})
		.catch((err) => {
			res.locals.err = { message: err._message, statusCode: 400 }
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
	findByCity,
	findByOwner,
	create,
	remove,
	update,
}
