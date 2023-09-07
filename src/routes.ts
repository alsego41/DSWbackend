import express from 'express'
import bcrypt from 'bcrypt'
import { propertySchema } from './models/propertySchema.js'
import { userSchema } from './models/userSchema.js'
import mongoose from 'mongoose'
import jwt, { Secret, JwtPayload } from 'jsonwebtoken'
import 'dotenv/config'

const app = express()

const Property = mongoose.model('Property', propertySchema)
const User = mongoose.model('User', userSchema)

const verifyToken = (req: any, res: any, next: any) => {
	const token: string =
		req.body.token || req.headers.authorization?.split('Bearer ')[1]
	// console.log(token)
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

app.get('/property', async (req, res) => {
	const allProperties = await Property.find().populate('user')
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
	await User.findByIdAndUpdate(
		req.body.decodedToken.id,
		{
			$push: { properties: req.body.idProperty },
		},
		{ new: true },
	)
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
	const user = await User.findById(req.body.decodedToken.id).populate(
		'properties',
	)
	if (!user) {
		return res.status(404).json({ message: 'User not found' })
	}
	return res.status(200).json({ properties: user?.properties })
})

app.post('/user/login', async (req, res) => {
	const { email, password } = req.body
	const user = await User.findOne({ email })
	if (!user) {
		return res.status(404).json({ message: 'User not found', status: false })
	}
	if (await bcrypt.compare(password, user?.password || '')) {
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
	const { firstName, lastName, DNI, email, address, password, dob } = req.body
	if (!(firstName && lastName && DNI && email && address && password && dob)) {
		return res.status(400).json({ message: 'Missing info in some inputs' })
	}
	const alreadyUser = await User.findOne({ email: email })
	if (alreadyUser) {
		return res.status(409).json({ message: 'User already exists' })
	}
	let newUser = new User({
		firstName: firstName,
		lastName: lastName,
		dni: DNI,
		email: email.toLowerCase(),
		address: address,
		password: await bcrypt.hash(password, 10),
		dob: dob,
		bankAccount: '',
	})
	await newUser
		.save()
		.then((user) => {
			console.log(`User ${user._id} created`)
			return res.status(201).json({ message: 'User created' })
		})
		.catch((err) => {
			console.log(err._message)
			return res.status(400).json({ message: err._message })
		})
})

export default app
