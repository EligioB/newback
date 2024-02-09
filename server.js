const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000
const errorHandler = require('./middleware/errorMiddleware')
const colors = require('colors')
const connectdb = require('./config/db')

connectdb ()

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/tareas', require('./routes/tareasRoutes'))
app.use('/api/tareas', require('./routes/usersRoutes'))

app.listen(port, ()=> console.log(`Servidor iniciado en el puerto ${port}`))

app.use(errorHandler)