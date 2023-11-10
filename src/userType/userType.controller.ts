import { Request, Response, NextFunction } from 'express'
import { userTypeRepository } from './userType.repository.js'
import { userTypeclass} from '../userType/userType.entity.js'

const repository = new userTypeRepository()

async function findAll(req: Request, res: Response) {
    const userstype = await repository.findAll()
    if (!userstype) {
        return res.status(404).json({message: 'No usertype found'})
    }
    return res.status(200).json(userstype)
}

