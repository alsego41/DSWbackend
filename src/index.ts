import express from 'express'
import cors from 'cors'
import routes from './routes.js'
import mongoose from 'mongoose'
import 'dotenv/config'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
	console.log(req.method)
	console.log(req.originalUrl)
	next()
})

app.use('/', routes)

app.use((req, res) => {
	res.status(404).send('404 - Not Found')
})

app.listen(3000, () => {
	console.log('Listening in 3000')
})

try {
	await mongoose.connect(process.env.MONGO_URI || '')
	console.log('connected to database')
} catch (error) {
	console.log(error)
}
