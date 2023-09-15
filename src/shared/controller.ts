import { Request, Response, NextFunction } from 'express'
import jwt, { Secret } from 'jsonwebtoken'

async function verifyToken(req: Request, res: Response, next: NextFunction) {
	const token: string =
		req.body.token || req.headers.authorization?.split('Bearer ')[1]
	console.log(token)
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

async function testTokenVerification(req: Request, res: Response) {
	return res.status(200).json({
		message: 'User has been verified successfully',
		payload: req.body.decodedToken,
	})
}

export const SharedController = {
	verifyToken,
	testTokenVerification,
}
