import { Request, Response, NextFunction } from 'express'
import { CityRepository } from './city.repository.js'
import { CityClass, CityModel } from './city.entity.js'
import mongoose from 'mongoose'

const cityRepository = new CityRepository()

async function findAll(req: Request, res: Response) {
	const allcities = await cityRepository.findAll()
	return res.status(200).json(allcities)
}

async function findOne(req: Request, res: Response) {
	const city = await cityRepository.findOne({
		id: req.body.city.id,
	})
	return city
}

async function findByName(req: Request, res: Response) {
	const city = await cityRepository.findByName({
		nombre: req.body.city.nombre,
		departamento: req.body.city.departamento,
		province: req.body.city.province,
	})
	return city
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
		nameCity: req.body.city.nombre,
		idCity: req.body.city.id,
		nameDepartamento: req.body.city.departamento,
		province: req.body.province._id,
	}
	const city = await cityRepository.create(newCity)
	return city
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
	findOne,
	findByName,
	create,
	remove,
	update,
}
