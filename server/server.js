const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

const fs = require('fs')


function ignoreFavIcon(req, res, next){
    if(req.originalUrl.includes('favicon.ico')){
        res.status(204).end()
    }
    next()
}

app.use(ignoreFavIcon)

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const routes = require('./routes/routes.js')(app, fs)

const server = app.listen(3000, () => {
    console.log('Listening on port %s...', server.address().port)
})