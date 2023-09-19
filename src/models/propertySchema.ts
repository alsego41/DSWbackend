import mongoose from 'mongoose'
import { prop, getModelForClass } from "@typegoose/typegoose"


class Property{
	@prop()
		nameProperty:string
	@prop()
	statusProperty:string
	@prop()
	photo:string
	@prop()
	address:string
	@prop()
	zone:string
	@prop()
	m2:number
	@prop()
	spaces:number
	@prop()
	roomQty:number
	@prop()
	bathQty:number
	@prop()
	Baclyard:boolean
	@prop()
	grill:boolean
	@prop()
	user:{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}
	
}

const propertyModel = getModelForClass(Property)
export default propertyModel
