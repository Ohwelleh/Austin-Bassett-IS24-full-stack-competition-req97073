// Loading the required modules.
const express = require('express') // Web framework of Nodejs and provides HTTP utility methods.
const cors = require('cors') // Allowing cross origin resource sharing.
const bodyParser = require('body-parser') // Helps process the body of requests.
const favicon = require('serve-favicon')

const app = express()
const fs = require('fs') // Node's built-in file system helper, used to serve the JSON file.

// Setting up the middleware.
app.use(favicon(__dirname + '/favicon.ico'))

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(function(req, res, next){
res.header("Access-Control-Allow-Origin", "*")
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT')
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
   if ('OPTIONS' == req.method) {
      res.sendStatus(200)
    }
    else {
      next()
    }
})

// Loading in the route handler while also passing it the app and file system.
const routes = require('./routes/routes.js')(app, fs)

// Launch the server on port 3000.
const server = app.listen(3000, () => {
    console.log('Listening on port %s...', server.address().port)
})