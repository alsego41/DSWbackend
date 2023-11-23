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

async function sanitizeUserInput(
	req: Request,
	res: Response,
	next: NextFunction,
) {
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
	// console.log(req.body)
	const user = await repository.findById({
		_id: req.params.id || req.body.decodedToken.id,
	})
	if (!user) {
		return res.status(404).json({ message: 'User not found' })
	}
	return res.status(200).json(user)
}

async function findByIdSh(req: Request, res: Response) {
	const user = await repository.findById({
		_id: req.params.id || req.body.decodedToken.id,
	})
	return user
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
				firstName: user?.firstName,
				lastName: user?.lastName,
				email: user?.email,
				userType: user?.userType,
				// properties: user?.properties
			},
			process.env.JWT_TOKEN_KEY as Secret,
			{ expiresIn: '30 minutes' },
		)
		const userInfo = {
			firstName: user?.firstName,
			lastName: user?.lastName,
			email: user?.email,
			userType: user?.userType,
		}
		return res
			.status(200)
			.json({ message: 'Login success', token, userInfo, userStatus: true })
	} else {
		return res.status(401).json({ message: 'Login failed', status: false })
	}
}

async function register(req: Request, res: Response) {
	const { firstName, lastName, dni, email, address, password, dob, gender } =
		req.body.user
	if (
		!(
			firstName &&
			lastName &&
			dni &&
			email &&
			address &&
			password &&
			dob &&
			gender
		)
	) {
		console.log('User info missing')
		return undefined
	}
	const alreadyUser = await repository.findOne(email)
	if (alreadyUser) {
		console.log('User Already exists')
		return undefined
	}
	console.log('Creating user')
	console.log(req.body.userType)
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
		userType: req.body.userType._id,
	}
	console.log(newUser)
	const user = await repository.create(newUser)
	return user
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

async function updateType(req: Request, res: Response) {
	const userUpdated = await repository.updateType({
		userId: req.body.user._id,
		userTypeId: req.body.userType._id,
	})
	return userUpdated
}

export const userController = {
	findAll,
	findById,
	findByIdSh,
	populate,
	login,
	register,
	remove,
	updateOwnProperties,
	update,
	updateType,
	sanitizeUserInput,
}
