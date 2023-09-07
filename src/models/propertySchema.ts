import mongoose from 'mongoose'

export const propertySchema = new mongoose.Schema({
	nameProperty: { type: String, required: true },
	statusProperty: String,
	photo: String,
	address: { type: String, required: true },
	zone: { type: String, required: true },
	m2: { type: Number, required: true },
	spaces: { type: Number, required: true },
	roomQty: { type: Number, required: true },
	bathQty: { type: Number, required: true },
	backyard: Boolean,
	grill: Boolean,
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
})
