const express = require('express')
const cardModels = express.Router()
const cors = require('cors')
const CardModel = require('../models/CardModel')
const Card = require('../models/Card')
var mongoose = require('mongoose');
cardModels.use(cors())

process.env.SECRET_KEY = 'secret'

cardModels.post('/addModel', (req, res) => {
  const today = new Date()
  const modelData = {
    name: req.body.name,
    description: req.body.description,
    image: "null",
    //cards:[],

  }

  CardModel.findOne({
    name: req.body.name
  })
    .then(cardModel => {
      if (!cardModel) {
        CardModel.create(modelData)
          .then(cardModel => {
            res.json({ status: cardModel.name + '  Added!' })
          })
          .catch(err => {
            res.send('error: ' + err)
          })

      } else {
        res.json({ error: 'Model already exists' })
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

cardModels.get('/getModels', (req, res) => {
  CardModel.find()
    .then(cardModel => {

      res.json({ cardModel })

    })
    .catch(err => {
      res.send('error: ' + err)
    })
})
cardModels.get('/getModel/:model', (req, res) => {
  CardModel.findOne({ _id: req.params.model })
    .then(cardModel => {

      res.json({ cardModel })

    })
    .catch(err => {
      res.send('error: ' + err)
    })
})


cardModels.post('/editModel/:model', (req, res) => {
  const cardData = {
    name: req.body.name,
    //model: req.body.model,
    description: req.body.description,
  }
  CardModel.findOneAndUpdate({ _id: req.params.model }, { $set: { name: cardData.name, description: cardData.description } }, { new: true }).then(card => {

    res.json({ status: "Done !" })

  })

    .catch(err => {
      res.send('error: ' + err)
    })
})
cardModels.post('/deleteModel', (req, res) => {
  CardModel.deleteOne({ _id: req.body._id }, { new: true }).then(card => {

    res.json({ status: "Done !" })

  })
    .catch(err => {
      res.send('error: ' + err)
    })
})


module.exports = cardModels