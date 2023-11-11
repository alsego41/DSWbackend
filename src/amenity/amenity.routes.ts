import { Router } from 'express'
import { amenitycontroller } from './amenity.controller'
import { SharedController } from '../shared/controller'

export const amenityrouter = Router()

amenityrouter.get('/:id', amenitycontroller.findById)
amenityrouter.get('/', amenitycontroller.findAll)
amenityrouter.post('/deleted/:id', amenitycontroller.remove)
amenityrouter.post('/', amenitycontroller.sanitizedInput)
amenityrouter.patch('/edit', amenitycontroller.update)
