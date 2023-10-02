import { Request, Response, NextFunction } from 'express'
import { ProvinceRepository } from '../province/province.repository.js'
import { ProvinceClass, ProvinceModel } from '../province/province.entity.js'

const propRepository = new ProvinceRepository()

async function findAll(req: Request, res: Response) {
	const allProvinces = await propRepository.findAll()
	return res.status(200).json(allProvinces)
}

async function findById(req: Request, res: Response) {
	const province = await propRepository.findById({ _id: req.params.id })
	if (!province) {
		return res.status(404).json({ message: 'province not found' })
	}
	return res.status(200).json(province)
}

async function create(req: Request, res: Response) {
	let newProvince: ProvinceClass = {
		nameProvince: req.body.province,
	}
	await propRepository
		.create(newProvince)
		.then((province) => {
			console.log(`province ${province?._id} created`)
			return res.status(201).json(province)
		})
		.catch((err) => {
			console.log(err._message)
			return res
				.status(400)
				.json({ message: err._message || 'Already created' })
		})
}

async function remove(req: Request, res: Response) {
	const _id = req.params.id
	console.log(_id)
	await propRepository.remove({ _id })
	return res.status(200).json({ message: 'province deleted' })
}

async function update(req: Request, res: Response) {
	await propRepository
		.update({
			_id: req.body.decodedToken.id,
			province: req.body.province,
		})
		.then((doc) => {
			console.log(doc)
			return res.status(200).json({ message: 'province updated' })
		})
		.catch((err) => {
			console.log(err)
			return res.status(400).json({ message: "Couldn't update province" })
		})
}

export const provinceController = {
	findAll,
	findById,
	create,
	remove,
	update,
}
