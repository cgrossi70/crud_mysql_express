// TODO: validar todos los datos que vienen
// TODO: Validar el id puede hacer que la consulta se rompa
// TODO: SOlo actalizar los campos que vienen en updateUser

import express from 'express'
import userRoutes from './routes/users.routes'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'

// Enviroment variables
dotenv.config()
const port = process.env.PORT || 3000

const app = express()

// Middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

//Routes
app.use('/users',userRoutes)

// Initializa
app.listen(port)
console.log('Server listening on port ', port)