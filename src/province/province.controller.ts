import { Request, Response, NextFunction } from 'express'
import { ProvinceRepository } from '../province/province.repository.js'
import { ProvinceClass, ProvinceModel } from '../province/province.entity.js'

const provRepository = new ProvinceRepository()

async function findAll(req: Request, res: Response) {
	const allProvinces = await provRepository.findAll()
	return res.status(200).json(allProvinces)
}

async function findOrCreate(req: Request, res: Response) {
	const prov = await provRepository.findOne(req.body.province.id)
	if (!prov) {
		const newProv = await provRepository.create({
			nameProvince: req.body.province.nombre,
			idProvince: req.body.province.id,
		})
		res.locals.prov = newProv
	} else {
		res.locals.prov = prov
	}
}

async function findById(req: Request, res: Response) {
	const province = await provRepository.findById({ _id: req.params.id })
	if (!province) {
		return res.status(404).json({ message: 'province not found' })
	}
	return res.status(200).json(province)
}

async function create(req: Request, res: Response) {
	let newProvince: ProvinceClass = {
		nameProvince: req.body.province,
	}
	await provRepository
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
	await provRepository.remove({ _id })
	return res.status(200).json({ message: 'Province deleted' })
}

async function update(req: Request, res: Response) {
	await provRepository
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
	findOrCreate,
	create,
	remove,
	update,
}
