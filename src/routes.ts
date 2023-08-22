import express from "express"
import bcrypt from 'bcrypt'

const app = express()

const testProperties = [
    {
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
    },
    {
      idProperty: 103,
      nameProperty: "Casa elegante Barrio Martin",
      statusProperty: "Disponible",
      photo: "./assets/testcasa.jpg",
      address: "Buenos Aires 132",
      zone: "Martin",
      m2: 50,
      spaces: 3,
      roomQty: 2,
      bathQty: 1,
      backyard: true,
      grill: false
    },
    {
      idProperty: 104,
      nameProperty: "Casa elegante Barrio Banana",
      statusProperty: "Disponible",
      photo: "./assets/testcasa.jpg",
      address: "Buenos Aires 132",
      zone: "Banana",
      m2: 30,
      spaces: 3,
      roomQty: 2,
      bathQty: 1,
      backyard: true,
      grill: false
    },
    {
      idProperty: 105,
      nameProperty: "Casa elegante Barrio Urquiza",
      statusProperty: "Disponible",
      photo: "./assets/testcasa.jpg",
      address: "Buenos Aires 132",
      zone: "Urquiza",
      m2: 40,
      spaces: 3,
      roomQty: 2,
      bathQty: 1,
      backyard: true,
      grill: false
    },
    {
      idProperty: 106,
      nameProperty: "Casa elegante Barrio Chascomus",
      statusProperty: "Disponible",
      photo: "./assets/testcasa.jpg",
      address: "Buenos Aires 132",
      zone: "Chascomus",
      m2: 40,
      spaces: 3,
      roomQty: 2,
      bathQty: 1,
      backyard: true,
      grill: false
    },
]

const testUsers = [
  {
    idUser: 1,
    firstName: "Juan",
    lastName: "Perez",
    dni: 41231232,
    email: "juanperez@gmail.com",
    address: "Corrientes 123",
    password: "$2b$10$5tWEbslzYwthO3cXxuHwqO.7kyjwI//PKJzBt/HvZ63reArx7Wrw.",
    birthDate: "2000-01-12",
    bankAccount: ""
  },
  {
    idUser: 2,
    firstName: "Pipo",
    lastName: "Perez",
    dni: 41232232,
    email: "pipoperez@gmail.com",
    address: "Corrientes 123",
    password: "$2b$10$Sl3w4OvQdwg8sJ8A0HXzPO2Bo6kauMqa/UxURw9RFaG9z7qo1omcC",
    birthDate: "1998-01-02",
    bankAccount: ""
  }
]

// perez123, pperez123

app.get('/', (req,res) => {
    res.send("<h1>HOLA</h1>")
})

app.get('/property', (req, res) => {    
    res.json(testProperties)
})

app.get('/property/:id', (req, res) => {
  res.json(testProperties.find(prop => prop.idProperty === Number(req.params.id)))
})

// agregar middleware user auth
app.post('/property/new', (req, res) => {
  console.log(req.body);
  let newProperty = {
    idProperty: Math.trunc(Math.random() * 100000),
    nameProperty: req.body.nameProperty,
    statusProperty: "Disponible",
    photo: "./assets/testcasa.jpg",
    address: req.body.address,
    zone: req.body.zone,
    m2: req.body.m2,
    spaces: req.body.spaces,
    roomQty: req.body.roomQty,
    bathQty: req.body.bathQty,
    backyard: req.body.backyard,
    grill: req.body.grill
  }
  testProperties.push(newProperty)
})

app.post('/user/login', async (req, res) => {
  console.log(req.body);
  let user = testUsers.find(user => user.email === req.body.email)
  let login : Boolean = false
  await bcrypt.compare(req.body.password, user?.password || "", (err, result) => {
    if (err) res.status(500).json({status: false})
    login = result
    login ? 
      res.status(200).json({status: true}) :
      res.status(401).json({status: false})
  })
})

app.post('/user/register', async (req, res) => {
  console.log(req.body)
  let newUser = {
    idUser: Math.trunc(Math.random() * 100000),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    dni: req.body.DNI,
    email: req.body.email,
    address: req.body.address,
    password: await bcrypt.hash(req.body.password, 10),
    birthDate: req.body.dob,
    bankAccount: ""
  }
  testUsers.push(newUser)
})

export default app