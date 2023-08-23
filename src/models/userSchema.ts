import mongoose from "mongoose"

export const userSchema = new mongoose.Schema({
    firstname: {type: String, required: true},
    lastname:  {type: String, required: true},
    dni: {type: Number, required: true},
    email:  {type: String, required: true},
    address:  {type: String, required: true},
    password:  {type: String, required: true},
    birthDate:  {type: String, required: true},
    bankAccount:  String
})

// const User = mongoose.model('User', userSchema)

// const newUser = new User({
//     firstName: "Pipo",
//     lastName: "Perez",
//     dni: 41232232,
//     email: "pipoperez@gmail.com",
//     address: "Corrientes 123",
//     password: "$2b$10$Sl3w4OvQdwg8sJ8A0HXzPO2Bo6kauMqa/UxURw9RFaG9z7qo1omcC",
//     birthDate: "1998-01-02",
//     bankAccount: ""
// })

// await newUser.save()