import { userTypeRepository } from './userType.repository.js'
const userTypeRepo = new userTypeRepository()

async function getHostType() {
	const userType = await userTypeRepo.findbyname('Host')
	return userType
}

export const UserTypeService = { getHostType }
