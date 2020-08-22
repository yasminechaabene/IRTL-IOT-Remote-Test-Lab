const express = require('express')
const responses = express.Router()
const cors = require('cors')
const Response = require('../models/Response')
const Reclamation = require('../models/Reclamation')
var mongoose = require('mongoose');
responses.use(cors())

process.env.SECRET_KEY = 'secret'

responses.post('/addResponse', (req, res) => {
  /// const today = new Date()
  const recData = {
    name: req.body.name,
    reclamation: req.body.reclamation,
    description: req.body.description,
    user: req.body.user,
    //cards:[],

  }


  Response.create(recData)
    .then(res => {
     return Reclamation.updateOne({ _id: recData.reclamation }, { status: true }, { new: true })
      // res.json({ status: res.name+ ' Added! to ' })
     // res.json({ status: res.name + '  Added!' })
    }) .then(rec => {
      res.json({ status:  '  Added!' })
    })
    .catch(err => {
      res.send('error: ' + err)
    })

}

)

responses.get('/getMyResponses/:user', (req, res) => {
  Response.find({ status: false, user: req.params.user }).
    populate('reclamation')
    .then(responses => {

      res.json({ responses })

    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

responses.get('/getResponse/:id', (req, res) => {
  Response.findOne({ _id:req.params.id}).
    populate('reclamation')
    .then(responses => {

      res.json({ responses })

    })
    .catch(err => {
      res.send('error: ' + err)
    })
})






module.exports = responses