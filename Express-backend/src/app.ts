import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import env from "./utils/env"
import { router } from "./routes"
import { errorMiddleware } from "./middlewares/error.middleware"
import './passport/passportStrategies'

const app = express()

//default settings
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname + "/public"))
app.use(cookieParser(env.signature_cookie))
app.use(router)

app.use(errorMiddleware)

// const PORT: number = env.port ? parseInt(env.port) : 3001;
// app.listen(PORT, ()=>console.log(`Server ready from PORT ${env.port}`))

const PORT: number = env.port ? parseInt(env.port) : 3001;
app.listen(PORT, ()=>console.log(`Server ready from PORT ${env.port}`))