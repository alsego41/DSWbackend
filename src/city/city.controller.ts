import { Request, Response, NextFunction } from 'express'
import { CityRepository } from './city.repository.js'
import { CityClass, CityModel } from './city.entity.js'

const cityRepository = new CityRepository()

async function findAll(req: Request, res: Response) {
	const allcities = await cityRepository.findAll()
	return res.status(200).json(allcities)
}

async function findById(req: Request, res: Response) {
	const city = await cityRepository.findById({ _id: req.params.id })
	if (!city) {
		return res.status(404).json({ message: 'city not found' })
	}
	return res.status(200).json(city)
}

async function create(req: Request, res: Response) {
	let newCity: CityClass = {
		nameCity: req.body.city,
		province: req.body.provinceId,
	}
	await cityRepository
		.create(newCity)
		.then((city) => {
			console.log(`city ${city?._id} created`)
			return res.status(201).json(city)
		})
		.catch((err) => {
			console.log(err)
			return res
				.status(400)
				.json({ message: err._message || 'Already created' })
		})
}

async function remove(req: Request, res: Response) {
	const _id = req.params.id
	console.log(_id)
	await cityRepository.remove({ _id })
	return res.status(200).json({ message: 'city deleted' })
}

async function update(req: Request, res: Response) {
	await cityRepository
		.update({
			_id: req.body.decodedToken.id,
			city: req.body.city,
		})
		.then((doc) => {
			console.log(doc)
			return res.status(200).json({ message: 'city updated' })
		})
		.catch((err) => {
			console.log(err)
			return res.status(400).json({ message: "Couldn't update city" })
		})
}

export const cityController = {
	findAll,
	findById,
	create,
	remove,
	update,
}
