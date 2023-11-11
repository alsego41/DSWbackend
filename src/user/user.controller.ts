import { Request, Response, NextFunction } from 'express'
import { UserRepository } from './user.repository.js'
import bcrypt from 'bcrypt'
import jwt, { Secret } from 'jsonwebtoken'
import { UserClass } from './user.entity.js'
import { PropertyClass } from '../property/property.entity.js'

const repository = new UserRepository()

async function findAll(req: Request, res: Response) {
	const users = await repository.findAll()
	if (!users) {
		return res.status(404).json({ message: 'No users found' })
	}
	return res.status(200).json(users)
}

async function populate(req: Request, res: Response) {
	console.log(req.body)
	const user = await repository.populate({
		_id: req.body.decodedToken.id,
	})
	if (!user) {
		return res.status(404).json({ message: 'User not found2' })
	}
	return res.status(200).json(user)
}

async function sanitizeUserInput(req: Request, res: Response, next:NextFunction) {
	const { firstName, lastName, dni, email, address, password, dob, gender } =
		req.body
    req.body.sanitizedInput = {
		firstName,
		lastName,
		dni,
		email: email.toLowerCase(),
		address,
		password: await bcrypt.hash(password, 10),
		dob,
		gender,
		bankAccount: '',

	}

	next()
}

async function findById(req: Request, res: Response) {
	console.log(req.body)
	const user = await repository.findById({ _id: req.params.id })
	if (!user) {
		return res.status(404).json({ message: 'User not found22' })
	}
	return res.status(200).json(user)
}

async function login(req: Request, res: Response) {
	const { email, password } = req.body
	const user = await repository.findOne(email)
	if (!user) {
		return res.status(404).json({ message: 'User not found', status: false })
	}
	let isPwdValid = await bcrypt.compare(password, user?.password as string)
	if (isPwdValid) {
		const token = jwt.sign(
			{
				id: user?._id,
				// properties: user?.properties
			},
			process.env.JWT_TOKEN_KEY as Secret,
			{ expiresIn: '30 minutes' },
		)
		return res
			.status(200)
			.json({ message: 'Login success', token, userStatus: true })
	} else {
		return res.status(401).json({ message: 'Login failed', status: false })
	}
}

async function register(req: Request, res: Response) {
	const { firstName, lastName, dni, email, address, password, dob, gender, userType } =
		req.body
	if (
		!(
			firstName &&
			lastName &&
			dni &&
			email &&
			address &&
			password &&
			dob &&
			gender &&
			userType
		)
	) {
		return res.status(400).json({ message: 'Missing info in some inputs' })
	}
	const alreadyUser = await repository.findOne(email)
	if (alreadyUser) {
		return res.status(409).json({ message: 'User already exists' })
	}
	let newUser: UserClass = {
		firstName,
		lastName,
		dni,
		email: email.toLowerCase(),
		address,
		password: await bcrypt.hash(password, 10),
		dob,
		gender,
		bankAccount: '',
		userType = req.body.userType,
		// properties: undefined,
	}
	await repository
		.create(newUser)
		.then((user) => {
			console.log(user?._id)
			return res.status(201).json({ message: 'User created' })
		})
		.catch((err) => {
			console.log('create catch')
			console.log(err._message)
			return res.status(400).json({ message: err._message })
		})
}

async function remove(req: Request, res: Response) {
	const _id = req.params.id
	console.log(_id)
	await repository.remove({ _id })
	return res.status(200).json({ message: 'User deleted' })
}

async function updateOwnProperties(req: Request, res: Response) {
	await repository
		.updateOwnProperties({
			_id: req.body.decodedToken.id,
			idProperty: req.body.property._id,
		})
		.then((doc) => {
			console.log(doc)
			res.locals.user = doc
		})
		.catch((err) => {
			console.log(err)
			res.locals.err = { message: "Couldn't update user", statusCode: 400 }
		})
}

async function update(req: Request, res: Response) {
	await repository
		.update({
			_id: req.body.decodedToken.id,
			user: req.body.user,
		})
		.then((doc) => {
			console.log(doc)
			return res.status(200).json({ message: 'User updated' })
		})
		.catch((err) => {
			console.log(err)
			return res.status(400).json({ message: "Couldn't update user" })
		})
}

export const userController = {
	findAll,
	findById,
	populate,
	login,
	register,
	remove,
	updateOwnProperties,
	update,
	sanitizeUserInput,
}
