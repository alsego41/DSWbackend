import { CityRepository } from './city.repository.js'
import { CityClass } from './city.entity.js'
const cityRepo = new CityRepository()

async function fetchCity(cityData: any, provinceId: any) {
	const city = await cityRepo.findByName({
		nombre: cityData.nombre,
		departamento: cityData.departamento,
		province: provinceId,
	})
	if (!city) {
		const newCity: CityClass = {
			idCity: cityData.id,
			nameCity: cityData.nombre,
			nameDepartamento: cityData.departamento,
			province: provinceId,
		}
		return await cityRepo.create(newCity)
	}
	return city
}

export const CityService = {
	fetchCity,
}
