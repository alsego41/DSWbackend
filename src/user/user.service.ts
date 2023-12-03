import { UserClass } from './user.entity.js'
import { UserRepository } from './user.repository.js'
const userRepo = new UserRepository()

async function updateToHost(userId: string, userTypeId: string) {
	const updUser = await userRepo.updateType({ userId, userTypeId })
	return updUser
}

export const UserService = {
	updateToHost,
}
