import express from 'express'
import { propertySchema } from './models/propertySchema.js'
import mongoose from 'mongoose'
import 'dotenv/config'
import { userRouter } from './user/user.routes.js'

const app = express()

const Property = mongoose.model('Property', propertySchema)
app.use('/user', userRouter)

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
// app.post('/property/new', async (req, res) => {
// 	const newProperty = new Property({
// 		nameProperty: req.body.property.nameProperty,
// 		statusProperty: 'Disponible',
// 		photo: './assets/testcasa.jpg',
// 		address: req.body.property.address,
// 		zone: req.body.property.zone,
// 		m2: req.body.property.m2,
// 		spaces: req.body.property.spaces,
// 		roomQty: req.body.property.roomQty,
// 		bathQty: req.body.property.bathQty,
// 		backyard: req.body.property.backyard,
// 		grill: req.body.property.grill,
// 		user: req.body.decodedToken.id,
// 	})
// 	await newProperty
// 		.save()
// 		.then((property) => {
// 			// console.log(property)
// 			console.log(`Property ${property._id} created`)
// 			return res.status(201).json(property)
// 		})
// 		.catch((err) => {
// 			console.log(err._message)
// 			return res.status(400).json({ message: err._message })
// 		})
// })

export default app
