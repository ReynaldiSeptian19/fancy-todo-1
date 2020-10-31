require('dotenv').config()
const express = require('express')
const app = express()
const { urlencoded } = require('express')
const port = +process.env.PORT
const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./middlewares/errorHandler')

app.use(urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

app.use(router)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
}) 