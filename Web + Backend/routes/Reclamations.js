const express = require('express')
const reclamations = express.Router()
const cors = require('cors')
const Reclamation = require('../models/Reclamation')
var mongoose = require('mongoose');
reclamations.use(cors())

process.env.SECRET_KEY = 'secret'

reclamations.post('/addRec', (req, res) => {
  /// const today = new Date()
  const recData = {
    name: req.body.name,
    user: req.body.user,
    description: req.body.description,
    //cards:[],

  }


  Reclamation.create(recData)
    .then(rec => {
      res.json({ status: rec.name + '  Added!' })
    })
    .catch(err => {
      res.send('error: ' + err)
    })

}

)

reclamations.get('/getReclamations', (req, res) => {
  Reclamation.find({ status:false }).
  populate('user')
    .then(rec => {

      res.json({ rec })

    })
    .catch(err => {
      res.send('error: ' + err)
    })
})
reclamations.get('/getHistory', (req, res) => {
  Reclamation.find({ status:true })
  .populate('user')
    .then(rec => {

      res.json({ rec })

    })
    .catch(err => {
      res.send('error: ' + err)
    })
})



reclamations.post('/checkRec', (req, res) => {
  Reclamation.updateOne({ _id: req.body._id }, { status: true },{ new: true }).then(rec => {

    res.json({ status: "Done !" })

  })
    .catch(err => {
      res.send('error: ' + err)
    })
})

reclamations.post('/deleteRec', (req, res) => {
  Reclamation.deleteOne({ _id: req.body._id },{ new: true }).then(card => {

    res.json({ status: "Done !" })

  })
    .catch(err => {
      res.send('error: ' + err)
    })
})

module.exports = reclamations