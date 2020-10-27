require('dotenv').config()
const express = require('express')
const app = express()
const { urlencoded } = require('express')
const port = 3000
const router = require('./routes/index')

app.use(urlencoded({extended: true}))

app.use(express.json())

app.use(router)

app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
}) 