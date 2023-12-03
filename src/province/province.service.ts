import { ProvinceRepository } from './province.repository.js'
import { ProvinceClass } from './province.entity.js'
const provRepo = new ProvinceRepository()

async function fetchProvince(provinceData: any) {
	const province = await provRepo.findByProvId({ id: provinceData.id })
	if (!province) {
		const newProv: ProvinceClass = {
			idProvince: provinceData.id,
			nameProvince: provinceData.nombre,
		}
		return await provRepo.create(newProv)
	}
	return province
}

export const ProvinceService = { fetchProvince }
