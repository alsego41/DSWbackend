import { Schema, Document, model } from 'mongoose'

export interface IUser {
	firstName: String
	lastName: String
	dni: Number
	email: String
	address: String
	password: string
	dob: String
	gender: String
	bankAccount: String
	properties: String[]
}

export type UserDocument = IUser & Document

const userSchema: Schema = new Schema<IUser>({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	dni: { type: Number, required: true },
	email: { type: String, required: true },
	address: { type: String, required: true },
	password: { type: String, required: true },
	dob: { type: String, required: true },
	gender: { type: String, required: true },
	bankAccount: String,
	properties: [{ type: Schema.Types.ObjectId, ref: 'Property' }],
})

export const UserModel = model<IUser>('User', userSchema)
