import mongoose from "mongoose"

export const propertySchema = new mongoose.Schema({
    nameProperty: {type: String, required: true},
    statusProperty: String,
    photo: String,
    address: {type: String, required: true},
    zone: {type: String, required: true},
    m2: {type: Number, required: true},
    spaces: {type: Number, required: true},
    roomQty: {type: Number, required: true},
    bathQty: {type: Number, required: true},
    backyard: Boolean,
    grill: Boolean
    // fechaCreacion: Date.now
})

// const Property = mongoose.model('Property', propertySchema)

// const newProperty = new Property({
//     nameProperty: "Casa elegante Barrio España",
//     statusProperty: "Disponible",
//     photo: "./assets/testcasa.jpg",
//     address: "Buenos Aires 132",
//     zone: "España",
//     m2: 40,
//     spaces: 3,
//     roomQty: 2,
//     bathQty: 1,
//     backyard: true,
//     grill: false
// })

// save a property
// await newProperty.save()

// retrieve all properties
// const allProperties = await Property.find()