require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const errorHandler = require('./errorHandler')
const winston = require('winston')
const validateBearerToken = require('./validateBearerToken.js')

const app = express()

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))
app.use(cors())
app.use(helmet())

app.use(validateBearerToken)
// BORDER BETWEEN INITIATION AND ROUTES

app.get('/', (req, res) => {
    res.send('Hello, boilerplate!')
})

app.use(errorHandler)

module.exports = app