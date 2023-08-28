import mongoose from "mongoose"

export const nameCitySchema = new mongoose.Schema({ 
    nameCity:  {type: String, required: true}, 
    properties: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }]
})