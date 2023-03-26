const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

const fs = require('fs')

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const routes = require('./routes/routes.js')(app, fs)

const server = app.listen(3000, () => {
    console.log('Listening on port %s...', server.address().port)
})