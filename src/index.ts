import express from "express"
import cors from "cors"
import routes from "./routes.js"

const app = express()

app.use(cors())
// app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use((req, res, next) => {
    console.log(req.method);
    console.log(req.originalUrl);
    next()
})

app.use('/', routes)

app.listen(3000, () => {
    console.log("Listening in 3000");
})
