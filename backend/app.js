const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const router = express.Router();

const app = express()

app.use(cors())
app.use(bodyParser.json() ,router)
app.use(bodyParser.urlencoded({extended:true}) ,router)

const routes = require('./routes')

app.use(routes.test)
app.use(routes.login)
app.use(routes.getStudents)
app.use(routes.email)

module.exports = app
