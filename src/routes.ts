import express from "express"
import bcrypt from 'bcrypt'
import { propertySchema } from "./models/propertySchema.js"
import { userSchema } from "./models/userSchema.js"
import mongoose from "mongoose"

const app = express()

const Property = mongoose.model('Property', propertySchema)
const User = mongoose.model('User', userSchema)

// app.get('/', (req,res) => {
//     // res.send("<h1>HOLA</h1>")
// })

app.get('/property', async (req, res) => {    
    const allProperties = await Property.find()
    // console.log(allProperties)
    res.status(200).json(allProperties)
})

app.get('/property/:id', async (req, res) => {
  const property = await Property.findById(req.params.id)
  if (!property) { res.status(404).json({message: 'Property not found'}) }  
  res.status(200).json(property)
})
// ver q pasa cuando no existe el id, xq explota el sv
app.get('/property/:id/user', async (req, res) => {
  const property = await Property.findById(req.params.id).populate('user')
  if (!property) { res.status(404).json({message: 'Property not found'}) }  
  res.status(200).json(property)
})

// // agregar middleware user auth
app.post('/property/new',  async (req, res) => {
  // console.log(req.body);
  const newProperty = new Property({
    nameProperty: req.body.nameProperty,
    statusProperty: "Disponible",
    photo: "./assets/testcasa.jpg",
    address: req.body.address,
    zone: req.body.zone,
    m2: req.body.m2,
    spaces: req.body.spaces,
    roomQty: req.body.roomQty,
    bathQty: req.body.bathQty,
    backyard: req.body.backyard,
    grill: req.body.grill,
    user: "64e935364a16b7b86ce88414"
  })
  await newProperty.save()
  .then(property => {
    console.log(`Property ${property._id} created`)
   res.status(201).json({message: "Property created"})
 })
  .catch(err => {
   console.log(err._message)
   res.status(400).json({message: err._message})
 })
})

app.post('/user/login', async (req, res) => {
  // console.log(req.body);
  const user = await User.findOne({email: req.body.email})
  if (!user) { res.status(404).json({message: 'User not found'}) }
  let login : Boolean = false
  await bcrypt.compare(req.body.password, user?.password || "", (err, result) => {
    if (err) res.status(500).json({status: false})
    login = result
    login ? 
      res.status(200).json({status: true}) :
      res.status(401).json({status: false})
  })
})

app.post('/user/register', async (req, res) => {
  // console.log(req.body)
  let newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    dni: req.body.DNI,
    email: req.body.email,
    address: req.body.address,
    password: await bcrypt.hash(req.body.password, 10),
    dob: req.body.dob,
    bankAccount: ""
})
 await newUser.save()
 .then(user => {
   console.log(`User ${user._id} created`)
  res.status(201).json({message: "User created"})
})
 .catch(err => {
  console.log(err._message)
  res.status(400).json({message: err._message})
})
})

export default app