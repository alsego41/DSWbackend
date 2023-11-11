import { Router } from 'express'
import { userTypeController } from './userType.controller.js'
import { SharedController } from '../shared/controller'

export const userTypeRouter = Router()

userTypeRouter.get('/:id', userTypeController.findById)
userTypeRouter.get('/', userTypeController.findAll)
userTypeRouter.post('/delete/:id', userTypeController.remove)
userTypeRouter.post('/create', userTypeController.sanitizedInput, userTypeController.create)
userTypeRouter.patch('/edit', userTypeController.update)
