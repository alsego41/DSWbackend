export interface Repository<T> {
	findAll(): Promise<T[]>
	findById(item: { _id: String }): Promise<T | null>
	create(item: T): Promise<T | null>
	update(item: { _id: String }): Promise<T | null>
	remove(item: { _id: String }): Promise<T | null>
}
