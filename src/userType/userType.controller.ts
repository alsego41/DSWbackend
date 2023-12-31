import { Request, Response, NextFunction } from 'express'
import { userTypeRepository } from './userType.repository.js'
import { userTypeclass } from './userType.entity.js'
import { json } from 'stream/consumers'

const repository = new userTypeRepository()

async function findAll(req: Request, res: Response) {
	const userstype = await repository.findAll()
	if (!userstype) {
		return res.status(404).json({ message: 'No usertype found' })
	}
	return res.status(200).json(userstype)
}

async function sanitizedInput(req: Request, res: Response, next: NextFunction) {
	const { nametype } = req.body
	req.body.sanitizedInput = {
		nametype,
	}
	next()
}

async function findbyname(req: Request, res: Response) {
	const userType = await repository.findbyname(req.body.userType.nameType)
	console.log(userType)
	return userType
}

async function findById(req: Request, res: Response) {
	console.log(req.body)
	const usertype = await repository.findById({ _id: req.params.id })
	if (!usertype) {
		return res.status(404).json({ messsage: 'Usertype not found' })
	}
}

async function create(req: Request, res: Response) {
	const { nameType } = req.body
	if (!nameType) {
		return res.status(400).json({ message: 'Nametype missing' })
	}
	const alreadyuserType = await repository.findbyname(nameType)
	if (alreadyuserType) {
		return res.status(400).json({ message: 'Nametype already exist' })
	}
	let newuserType: userTypeclass = {
		nameType: nameType,
	}
	const userType = await repository.create(newuserType)
	return res.status(201).json({ userType })
}

async function remove(req: Request, res: Response) {
	const _id = req.params.id
	console.log(_id)
	await repository.remove({ _id })
	return res.status(200).json({ message: 'Usertype deleted' })
}

async function update(req: Request, res: Response) {
	await repository
		.update({
			_id: req.body.decodedToken.id,
			usertype: req.body.userType,
		})
		.then((doc) => {
			console.log(doc)
			return res.status(200).json({ message: 'Usertype updated' })
		})
		.catch((err) => {
			console.log(err)
			return res.status(400).json({ message: "Couldn't update usertype" })
		})
}

export const userTypeController = {
	findAll,
	findById,
	remove,
	update,
	sanitizedInput,
	findbyname,
	create,
}
