import mongoose from "mongoose"

export const nameCitySchema = new mongoose.Schema({ 
    nameCity:  {type: String, required: true}, 
    fans: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Person' }],
    properties: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }]
})