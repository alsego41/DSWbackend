import express from 'express'
import bcrypt from 'bcrypt'
import { propertySchema } from './models/propertySchema.js'
import { userSchema } from './models/userSchema.js'
import mongoose from 'mongoose'
import jwt, { Secret, JwtPayload } from 'jsonwebtoken'
import 'dotenv/config'
import { UserRepository } from './user/user.repository.js'
import { IUser, UserModel } from './user/user.entity.js'

const app = express()

const Property = mongoose.model('Property', propertySchema)
// const User2 = mongoose.model('User', userSchema)

const verifyToken = (req: any, res: any, next: any) => {
	const token: string =
		req.body.token || req.headers.authorization?.split('Bearer ')[1]
	console.log(token)
	if (!token) {
		return res.status(403).json({ message: 'Token required' })
	}
	try {
		const decodedToken = jwt.verify(token, process.env.JWT_TOKEN_KEY as Secret)
		console.log(decodedToken)
		req.body.decodedToken = decodedToken
		return next()
	} catch (err) {
		return res.status(401).json({ message: 'Invalid Token', err: err })
	}
}

app.post('/user/verify', verifyToken, async (req, res) => {
	return res.status(200).json({
		message: 'User has been verified successfully',
		payload: req.body.decodedToken,
	})
})
const repo = new UserRepository()

app.get('/user', async (req, res) => {
	const users = await repo.findAll()
	if (!users) {
		return res.status(404).json({ message: 'No users found' })
	}
	return res.status(200).json(users)
})

app.get('/user/:id', async (req, res) => {
	const user = await repo.findById({ _id: req.params.id })
	if (!user) {
		return res.status(404).json({ message: 'User not found' })
	}
	return res.status(200).json(user)
})

app.get('/property', async (req, res) => {
	const allProperties = await Property.find()
	// console.log(allProperties)
	return res.status(200).json(allProperties)
})

app.get('/property/:id', async (req, res) => {
	const property = await Property.findById(req.params.id)
	if (!property) {
		return res.status(404).json({ message: 'Property not found' })
	}
	return res.status(200).json(property)
})
// ver q pasa cuando no existe el id, xq explota el sv
app.get('/property/:id/user', async (req, res) => {
	const property = await Property.findById(req.params.id).populate('user')
	if (!property) {
		return res.status(404).json({ message: 'Property not found' })
	}
	return res.status(200).json(property)
})

// // agregar middleware user auth
app.post('/property/new', verifyToken, async (req, res) => {
	const newProperty = new Property({
		nameProperty: req.body.property.nameProperty,
		statusProperty: 'Disponible',
		photo: './assets/testcasa.jpg',
		address: req.body.property.address,
		zone: req.body.property.zone,
		m2: req.body.property.m2,
		spaces: req.body.property.spaces,
		roomQty: req.body.property.roomQty,
		bathQty: req.body.property.bathQty,
		backyard: req.body.property.backyard,
		grill: req.body.property.grill,
		user: req.body.decodedToken.id,
	})
	await newProperty
		.save()
		.then((property) => {
			// console.log(property)
			console.log(`Property ${property._id} created`)
			return res.status(201).json(property)
		})
		.catch((err) => {
			console.log(err._message)
			return res.status(400).json({ message: err._message })
		})
})

app.patch('/user/properties/new', verifyToken, async (req, res) => {
	await repo
		.updateOwnProperties({
			_id: req.body.decodedToken.id,
			body: { properties: req.body.idProperty },
		})
		.then((doc) => {
			// console.log(doc)
			return res.status(200).json({ message: 'User updated' })
		})
		.catch((err) => {
			// console.log(err)
			return res.status(400).json({ message: "Couldn't update user" })
		})
})

app.get('/user/properties', verifyToken, async (req, res) => {
	const user = await repo.findById({ _id: req.body.decodedToken.id })
	console.log(user)
	if (!user) {
		return res.status(404).json({ message: 'User not found' })
	}
	return res.status(200).json({ properties: user?.properties })
})

app.post('/user/login', async (req, res) => {
	const { email, password } = req.body
	const user = await repo.findOne(email)
	if (!user) {
		return res.status(404).json({ message: 'User not found', status: false })
	}
	let isPwdValid = await bcrypt.compare(password, user?.password)
	if (isPwdValid) {
		const token = jwt.sign(
			{ id: user?._id, properties: user?.properties },
			process.env.JWT_TOKEN_KEY as Secret,
			{ expiresIn: '30 minutes' },
		)
		return res
			.status(200)
			.json({ message: 'Login success', token, userStatus: true })
	} else {
		return res.status(401).json({ message: 'Login failed', status: false })
	}
})

app.post('/user/register', async (req, res) => {
	const { firstName, lastName, dni, email, address, password, dob, gender } =
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
			gender
		)
	) {
		return res.status(400).json({ message: 'Missing info in some inputs' })
	}
	const alreadyUser = await repo.findOne(email)
	if (alreadyUser) {
		return res.status(409).json({ message: 'User already exists' })
	}
	let newUser: IUser = {
		firstName,
		lastName,
		dni,
		email: email.toLowerCase(),
		address,
		password: await bcrypt.hash(password, 10),
		dob,
		gender,
		bankAccount: '',
		properties: [],
	}
	await repo
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
})

export default app
