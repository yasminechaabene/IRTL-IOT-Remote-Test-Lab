const express = require('express')
const patterns = express.Router()
const cors = require('cors')
const Pattern = require('../models/Pattern')
var mongoose = require('mongoose');
patterns.use(cors())

process.env.SECRET_KEY = 'secret'

patterns.get('/getAllPatterns', (req, res) => {
  Pattern.find()
    .then(patterns => {

      res.json({ patterns })

    })
    .catch(err => {
      res.send('error: ' + err)
    })
})




patterns.post('/addPattern', (req, res) => {
  const today = new Date()
  const patternData = {
    name: req.body.name,
    date: today,
  }
  Pattern.create(patternData)
  .then(rec => {
    res.json({ status: patternData.name + '  Added!' })
  })
  .catch(err => {
    res.send('error: ' + err)
  })
})


patterns.get('/getCardById/:patternId', (req, res) => {

  Pattern.findOne({ _id: mongoose.Types.ObjectId(req.params.cardId) })

    .then(pattern => {
      console.log(mongoose.Types.ObjectId(req.body._id))

      res.json({ pattern })

    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

patterns.post('/access', (req, res) => {
  Pattern.updateOne({ _id: req.body._id }, { status: req.body.status },{ new: true }).then(rec => {

    res.json({ status: "Done !" })

  })
    .catch(err => {
      res.send('error: ' + err)
    })
})
patterns.post('/deletePat', (req, res) => {
  Pattern.deleteOne({ _id: req.body._id },{ new: true }).then(card => {

    res.json({ status: "Done !" })

  })
    .catch(err => {
      res.send('error: ' + err)
    })
})

module.exports = patterns