import { Schema, Document, model } from 'mongoose'

export interface IProperty {
	nameProperty: String
	statusProperty: String
	city: String
	photo: String
	address: String
	zone: String
	m2: Number
	spaces: Number
	roomQty: Number
	bathQty: Number
	backyard: Boolean
	grill: Boolean
	price: Number
	user: String
}

export type PropertyDocument = IProperty & Document

export const propertySchema = new Schema({
	nameProperty: { type: String, required: true },
	statusProperty: String,
	city: { type: Schema.Types.ObjectId, ref: 'City' },
	photo: String,
	address: { type: String, required: true },
	zone: { type: String, required: true },
	m2: { type: Number, required: true },
	spaces: { type: Number, required: true },
	roomQty: { type: Number, required: true },
	bathQty: { type: Number, required: true },
	backyard: Boolean,
	grill: Boolean,
	price: Number,
	user: { type: Schema.Types.ObjectId, ref: 'User' },
})

export const PropertyModel = model<IProperty>('Property', propertySchema)
