import express from 'express'
import 'dotenv/config'
import { userRouter } from './user/user.routes.js'
import { propertyRouter } from './property/property.routes.js'

const app = express()

app.use('/user', userRouter)
app.use('/property', propertyRouter)

export default app
