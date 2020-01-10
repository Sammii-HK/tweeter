const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
// const routes = require('./config/routes')
// const errorHandler = require('./lib/errorHandler')
// const { port, dbUri } = require('./config/environment')
require('dotenv').config()

const app = express()

mongoose.connect(dbUri, {useNewUrlParser: true})

const db = mongoose.connection
db.on('error', console.error)
db.once('open', () => console.log('Successfully connected to MongoDB'))

app.use(express.static(`${__dirname}/dist`))
app.use(bodyParser.json())
// use routes with api before
// app.use('/api', routes)
// app.use(errorHandler)

app.listen(port, () => console.log(`Listening on port ${port}`))
