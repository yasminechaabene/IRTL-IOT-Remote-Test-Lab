var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var app = express()
const mongoose = require('mongoose')
var port = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(cors())
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)

const mongoURI = 'mongodb://localhost:27017/iot_lab'

mongoose
  .connect(
    mongoURI,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err))

var Users = require('./routes/Users')
var CardModels = require('./routes/CardModels')
var Cards = require('./routes/Cards')
var Reservations = require('./routes/Reservations')
var Projects = require('./routes/Projects')
var Reclamations = require('./routes/Reclamations')
var Responses = require('./routes/Responses')
var Patterns = require('./routes/Patterns')


app.use('/users', Users)
app.use('/models', CardModels)
app.use('/cards', Cards)
app.use('/reservations', Reservations)
app.use('/projects', Projects)
app.use('/reclamations', Reclamations)
app.use('/responses', Responses)
app.use('/patterns', Patterns)


app.listen(port, function() {
  console.log('Server is running on port: ' + port)
})