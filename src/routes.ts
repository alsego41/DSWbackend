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
    {
      idProperty: 107,
      nameProperty: "Casa elegante Barrio Pichincha",
      statusProperty: "Disponible",
      photo: "./assets/testcasa.jpg",
      address: "Santiago 105",
      zone: "Pichincha",
      m2: 58,
      spaces: 4,
      roomQty: 2,
      bathQty: 1,
      backyard: false,
      grill: true
    },
    {
      idProperty: 108,
      nameProperty: "Casa elegante Barrio Echesortu",
      statusProperty: "Disponible",
      photo: "./assets/testcasa.jpg",
      address: "San Luis 4107",
      zone: "Echesortu",
      m2: 60,
      spaces: 4,
      roomQty: 3,
      bathQty: 2,
      backyard: true,
      grill: true
    },
    {
      idProperty: 109,
      nameProperty: "Casa elegante Barrio Abasto",
      statusProperty: "Disponible",
      photo: "./assets/testcasa.jpg",
      address: "Pasco 1881",
      zone: "Abasto",
      m2: 38,
      spaces: 2,
      roomQty: 1,
      bathQty: 1,
      backyard: false,
      grill: false
    },
    {
      idProperty: 110,
      nameProperty: "Casa Barrio Republica de la sexta",
      statusProperty: "Disponible",
      photo: "./assets/testcasa.jpg",
      address: "Colon 1880",
      zone: "Republica de la sexta",
      m2: 50,
      spaces: 4,
      roomQty: 2,
      bathQty: 1,
      backyard: true,
      grill: true
    },
    {
      idProperty: 111,
      nameProperty: "Casa Barrio Luis Agote",
      statusProperty: "Disponible",
      photo: "./assets/testcasa.jpg",
      address: "Alsina 525",
      zone: "Luis Agote",
      m2: 42,
      spaces: 4,
      roomQty: 2,
      bathQty: 1,
      backyard: true,
      grill: true
    },
    {
      idProperty: 112,
      nameProperty: "Casa Barrio Centro",
      statusProperty: "Disponible",
      photo: "./assets/testcasa.jpg",
      address: "Paraguay 408",
      zone: "Centro",
      m2: 37,
      spaces: 2,
      roomQty: 1,
      bathQty: 1,
      backyard: false,
      grill: false
    },
    {
      idProperty: 113,
      nameProperty: "Casa Barrio Centro",
      statusProperty: "Disponible",
      photo: "./assets/testcasa.jpg",
      address: "Urquiza 1101",
      zone: "Centro",
      m2: 33,
      spaces: 3,
      roomQty: 1,
      bathQty: 1,
      backyard: false,
      grill: false
    },
    {
      idProperty: 114,
      nameProperty: "Casa Barrio Centro",
      statusProperty: "Disponible",
      photo: "./assets/testcasa.jpg",
      address: "San Juan 1159",
      zone: "Centro",
      m2: 39,
      spaces: 3,
      roomQty: 1,
      bathQty: 1,
      backyard: false,
      grill: true
    },
    {
      idProperty: 115,
      nameProperty: "Casa elegante Barrio Echesortu",
      statusProperty: "Disponible",
      photo: "./assets/testcasa.jpg",
      address: "San Nicolas 1059",
      zone: "Echesortu",
      m2: 51,
      spaces: 4,
      roomQty: 2,
      bathQty: 1,
      backyard: true,
      grill: true
    },
    {
      idProperty: 116,
      nameProperty: "Casa elegante Barrio Echesortu",
      statusProperty: "Disponible",
      photo: "./assets/testcasa.jpg",
      address: "Alsina 1337",
      zone: "Echesortu",
      m2: 42,
      spaces: 4,
      roomQty: 2,
      bathQty: 1,
      backyard: true,
      grill: true
    },
    {
      idProperty: 117,
      nameProperty: "Casa elegante Barrio Bella Vista",
      statusProperty: "Disponible",
      photo: "./assets/testcasa.jpg",
      address: "Lavalle 2530",
      zone: "Echesortu",
      m2: 47,
      spaces: 4,
      roomQty: 2,
      bathQty: 1,
      backyard: true,
      grill: true
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
  },
  {
    idUser: 3,
    firstName: "Juan",
    lastName: "Carlos",
    dni: 41248261,
    email: "Juanca@gmail.com",
    address: "Calle falsa 123",
    password: "$2b$10$Sl3w4OvQdwg8sJ8A0HXzPO2Bo6kauMqa/UxURw9RFaG9z7qo1omcC",
    birthDate: "1969-12-15",
    bankAccount: ""
  },
  {
    idUser: 4,
    firstName: "Susana",
    lastName: "Gimenez",
    dni: 17594268,
    email: "lasugimenez@gmail.com",
    address: "Callao 5894",
    password: "$2b$10$Sl3w4OvQdwg8sJ8A0HXzPO2Bo6kauMqa/UxURw9RFaG9z7qo1omcC",
    birthDate: "1958-11-15",
    bankAccount: ""
  },
  {
    idUser: 5,
    firstName: "Mirta",
    lastName: "Legrand",
    dni: 10000000,
    email: "laschiqui@gmail.com",
    address: "Panama 1587",
    password: "$2b$10$Sl3w4OvQdwg8sJ8A0HXzPO2Bo6kauMqa/UxURw9RFaG9z7qo1omcC",
    birthDate: "1900-01-14",
    bankAccount: ""
  },
  
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