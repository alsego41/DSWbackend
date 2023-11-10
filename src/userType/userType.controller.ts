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

async function sanitizedInput(req: Request, res: Response, next:NextFunction) {
    const {nametype} = req.body
    req.body.sanitizedInput ={
       nametype
    }
    next()
}

async function findById(req: Request, res: Response) {
    console.log(req.body)
    const usertype = await repository.findById({_id: req.params.id})
    if (!usertype) {
        return res.status(404).json({ messsage: 'Usertype not found'})
    }
    
}