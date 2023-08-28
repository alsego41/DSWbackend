import mongoose from "mongoose"

export const userSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName:  {type: String, required: true},
    dni: {type: Number, required: true},
    email:  {type: String, required: true},
    address:  {type: String, required: true},
    password:  {type: String, required: true},
    dob:  {type: String, required: true},
    bankAccount:  String,
    properties: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }]
})