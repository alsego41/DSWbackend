import express from "express"
import bcrypt from 'bcrypt'
import { User } from "./models/user.js"
import { Property } from "./models/property.js"

const app = express()

const testProperties = [
  new Property(
    102,
    "Casa elegante Barrio España",
    "Disponible",
    "./assets/testcasa.jpg",
    "Buenos Aires 132",
    "España",
    40,
    3,
    2,
    1,
    true,
    false
  ),
  new Property(
    103,
    "Casa elegante Barrio Martin",
    "Disponible",
    "./assets/testcasa.jpg",
    "Buenos Aires 132",
    "Martin",
    50,
    3,
    2,
    1,
    true,
    false
  ),
  new Property(  
    104,
    "Casa elegante Barrio Banana",
    "Disponible",
    "./assets/testcasa.jpg",
    "Buenos Aires 132",
    "Banana",
    30,
    3,
    2,
    1,
    true,
    false
  ),
  new Property(
      105,
      "Casa elegante Barrio Urquiza",
      "Disponible",
      "./assets/testcasa.jpg",
      "Buenos Aires 132",
      "Urquiza",
      40,
      3,
      2,
      1,
      true,
      false
),
new Property(
      106,
      "Casa elegante Barrio Chascomus",
      "Disponible",
      "./assets/testcasa.jpg",
      "Buenos Aires 132",
      "Chascomus",
      40,
      3,
      2,
      1,
      true,
      false
),
new Property(
      107,
      "Casa elegante Barrio Pichincha",
      "Disponible",
      "./assets/testcasa.jpg",
      "Santiago 105",
      "Pichincha",
      58,
      4,
      2,
      1,
      false,
      true
),
new Property(
      108,
      "Casa elegante Barrio Echesortu",
      "Disponible",
      "./assets/testcasa.jpg",
      "San Luis 4107",
      "Echesortu",
      60,
      4,
      3,
      2,
      true,
      true
),
new Property(
      109,
      "Casa elegante Barrio Abasto",
      "Disponible",
      "./assets/testcasa.jpg",
      "Pasco 1881",
      "Abasto",
      38,
      2,
      1,
      1,
      false,
      false
),
new Property(
      110,
      "Casa Barrio Republica de la sexta",
      "Disponible",
      "./assets/testcasa.jpg",
      "Colon 1880",
      "Republica de la sexta",
      50,
      4,
      2,
      1,
      true,
      true
),
new Property(
      111,
      "Casa Barrio Luis Agote",
      "Disponible",
      "./assets/testcasa.jpg",
      "Alsina 525",
      "Luis Agote",
      42,
      4,
      2,
      1,
      true,
      true
),
new Property(
      112,
      "Casa Barrio Centro",
      "Disponible",
      "./assets/testcasa.jpg",
      "Paraguay 408",
      "Centro",
      37,
      2,
      1,
      1,
      false,
      false
),
new Property(
      113,
      "Casa Barrio Centro",
      "Disponible",
      "./assets/testcasa.jpg",
      "Urquiza 1101",
      "Centro",
      33,
      3,
      1,
      1,
      false,
      false
),
new Property(
      114,
      "Casa Barrio Centro",
      "Disponible",
      "./assets/testcasa.jpg",
      "San Juan 1159",
      "Centro",
      39,
      3,
      1,
      1,
      false,
      true
),
new Property(
      115,
      "Casa elegante Barrio Echesortu",
      "Disponible",
      "./assets/testcasa.jpg",
      "San Nicolas 1059",
      "Echesortu",
      51,
      4,
      2,
      1,
      true,
      true
),
  new Property(
    116,
    "Casa elegante Barrio Echesortu",
    "Disponible",
    "./assets/testcasa.jpg",
    "Alsina 1337",
    "Echesortu",
    42,
    4,
    2,
    1,
    true,
    true
  ),
  new Property(
    117,
    "Casa elegante Barrio Bella Vista",
    "Disponible",
    "./assets/testcasa.jpg",
    "Lavalle 2530",
    "Echesortu",
    47,
    4,
    2,
    1,
    true,
    true
  ),
]

const testUsers = [
    new User( 
     1,
     "Juan",
     "Perez",
     41231232,
     "juanperez@gmail.com",
    "Corrientes 123",
     "$2b$10$5tWEbslzYwthO3cXxuHwqO.7kyjwI//PKJzBt/HvZ63reArx7Wrw.",
     "2000-01-12",
     ""
    ),
  
  new User(
     2,
     "Pipo",
     "Perez",
     41232232,
     "pipoperez@gmail.com",
     "Corrientes 123",
     "$2b$10$Sl3w4OvQdwg8sJ8A0HXzPO2Bo6kauMqa/UxURw9RFaG9z7qo1omcC",
     "1998-01-02",
     ""
  ),
  new User(
     3,
     "Juan",
     "Carlos",
     41248261,
     "Juanca@gmail.com",
    "Calle falsa 123",
     "$2b$10$Sl3w4OvQdwg8sJ8A0HXzPO2Bo6kauMqa/UxURw9RFaG9z7qo1omcC",
     "1969-12-15",
    ""
  ),
  new User(
     4,
     "Susana",
    "Gimenez",
     17594268,
     "lasugimenez@gmail.com",
     "Callao 5894",
     "$2b$10$Sl3w4OvQdwg8sJ8A0HXzPO2Bo6kauMqa/UxURw9RFaG9z7qo1omcC",
     "1958-11-15",
     ""
  ),
  new User(
     5,
    "Mirta",
    "Legrand",
    10000000,
     "laschiqui@gmail.com",
     "Panama 1587",
     "$2b$10$Sl3w4OvQdwg8sJ8A0HXzPO2Bo6kauMqa/UxURw9RFaG9z7qo1omcC",
     "1900-01-14",
     ""
  ),
  
]

// perez123, pperez123

app.get('/', (req,res) => {
    res.send("<h1>HOLA</h1>")
})

app.get('/property', (req, res) => {    
    res.json(testProperties)
})

app.get('/property/:id', (req, res) => {
  const property = testProperties.find(prop => prop.idProperty === Number(req.params.id))
  if (!property) { res.status(404).send({message: 'Property not found'}) }  
  res.json(property)
})

// agregar middleware user auth
app.post('/property/new', (req, res) => {
  console.log(req.body);
  let newProperty = new Property(
    Math.trunc(Math.random() * 100000),
    req.body.nameProperty,
    "Disponible",
    "./assets/testcasa.jpg",
    req.body.address,
    req.body.zone,
    req.body.m2,
    req.body.spaces,
    req.body.roomQty,
    req.body.bathQty,
    req.body.backyard,
    req.body.grill
  )
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
  let newUser = new User(
    Math.trunc(Math.random() * 100000),
    req.body.firstName,
    req.body.lastName,
    req.body.DNI,
    req.body.email,
    req.body.address,
    await bcrypt.hash(req.body.password, 10),
    req.body.dob,
    ""
  )
  testUsers.push(newUser)
})

export default app