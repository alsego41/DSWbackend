import mongoose from "mongoose"

const propertySchema = new mongoose.Schema({
    idProperty: Number,
    nameProperty: String,
    statusProperty: String,
    photo: String,
    address: String,
    zone: String,
    m2: Number,
    spaces: Number,
    roomQty: Number,
    bathQty: Number,
    backyard: Boolean,
    grill: Boolean
})

const Property = mongoose.model('Property', propertySchema)

const newProperty = new Property({
    idProperty: 102,
    nameProperty: "Casa elegante Barrio España",
    statusProperty: "Disponible",
    photo: "./assets/testcasa.jpg",
    address: "Buenos Aires 132",
    zone: "España",
    m2: 40,
    spaces: 3,
    roomQty: 2,
    bathQty: 1,
    backyard: true,
    grill: false
})

// save a property
// await newProperty.save()


// retrieve all properties
// const allProperties = await Property.find()