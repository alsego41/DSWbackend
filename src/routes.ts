import express from 'express'
import 'dotenv/config'
import { userRouter } from './user/user.routes.js'
import { propertyRouter } from './property/property.routes.js'
import { provinceRouter } from './province/province.routes.js'
import { cityRouter } from './city/city.routes.js'
import { sharedRouter } from './shared/routes.js'

const app = express()

app.use('/user', userRouter)
app.use('/property', propertyRouter)
app.use('/province', provinceRouter)
app.use('/city', cityRouter)
app.use('/sh', sharedRouter)

export default app
