import mongoose from 'mongoose'
import { prop, getModelForClass } from "@typegoose/typegoose"


class City{
	@prop()
	nameCity: string
	@prop()
	properties: [{type: mongoose.Schema.Types.ObjectId, ref: 'Property'}]
}

const cityModel =getModelForClass(City)
export default cityModel
