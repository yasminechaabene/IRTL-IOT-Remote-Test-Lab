const express = require('express')
const cards = express.Router()
const cors = require('cors')
const CardModel = require('../models/CardModel')
const Card = require('../models/Card')
var mongoose = require('mongoose');
cards.use(cors())

process.env.SECRET_KEY = 'secret'

cards.get('/getAllCards', (req, res) => {
  Card.find()
  .populate('model')
    .then(card => {

      res.json({ card })

    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

cards.get('/getAvailableCards', (req, res) => {
  Card.find()
  .populate('reservations')
    .then(card => {

      res.json({ card })

    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

cards.get('/getCardsByModel', (req, res) => {

  Card.find({ model: mongoose.Types.ObjectId(req.body._id) })

    .then(cards => {
      console.log(mongoose.Types.ObjectId(req.body._id))

      res.json({ cards })

    })
    .catch(err => {
      res.send('error: ' + err)
    })
})
cards.get('/getCardsByModel/:model', (req, res) => {

  Card.find({ model: mongoose.Types.ObjectId(req.params.model) })

    .then(cards => {
     // console.log(mongoose.Types.ObjectId(req.body._id))

      res.json({ cards })

    })
    .catch(err => {
      res.send('error: ' + err)
    })
})
cards.get('/getCardById/:cardId', (req, res) => {

  Card.findOne({ _id: mongoose.Types.ObjectId(req.params.cardId) })

    .then(card => {
      console.log(mongoose.Types.ObjectId(req.body._id))

      res.json({ card })

    })
    .catch(err => {
      res.send('error: ' + err)
    })
})




cards.get('/getModelPerCard', (req, res) => {

  Card.findOne({ _id: req.body._id }).
    populate('model').then(response => {


      res.json(response)
      //console.log(response.model.name)

    })


    .catch(err => {
      res.send('error: ' + err)
    })
})
cards.post('/addCard', (req, res) => {
  const today = new Date()
  const cardData = {
    name: req.body.name,
    model: req.body.model,
    ip: req.body.ip,
    status: req.body.status,
    date: today,
  }
  Card.create(cardData)
    .then(cards => {
      CardModel.updateOne({ _id: cardData.model }, { cards: cardData.model }, { new: true });
      res.json({ status: cards.name + ' ' + cards._id + ' Added! to ' + cardData.model })
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})
cards.post('/editCard/:cardId', (req, res) => {
  const cardData = {
    name: req.body.name,
    //model: req.body.model,
    status: req.body.status,
    ip:req.body.ip,
  }
      Card.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.params.cardId) }, {$set:{ name: cardData.name , status: cardData.status,ip:cardData.ip }}, { new: true }).then(card => {

        res.json({ status: "Done !" })
    
      })
   
    .catch(err => {
      res.send('error: ' + err)
    })
})

cards.post('/updateStatus', (req, res) => {
  Card.updateOne({ _id: req.body._id }, { status: req.body.status }, { new: true }).then(card => {

    res.json({ status: "Done !" })

  })
    .catch(err => {
      res.send('error: ' + err)
    })
})

cards.post('/deleteCard', (req, res) => {
  Card.deleteOne({ _id: req.body._id },{ new: true }).then(card => {

    res.json({ status: "Done !" })

  })
    .catch(err => {
      res.send('error: ' + err)
    })
})


module.exports = cards