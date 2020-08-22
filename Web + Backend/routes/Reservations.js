const express = require('express')
const reservations = express.Router()
const cors = require('cors')
const Reservation = require('../models/Reservation')
const Card = require('../models/Card')
const User = require('../models/User')
var moment = require('moment');
reservations.use(cors())

process.env.SECRET_KEY = 'secret'

reservations.post('/reserve', (req, res) => {
  const today = moment(new Date())
  const reservData = {
    dateBeg: req.body.dateBeg,
    dateEnd: req.body.dateEnd,
    card: req.body.card,
    user: req.body.user,

  }

  Reservation.create(reservData)
    .then(reserv => {
      //Card.updateOne({_id:req.body.card},{status:false},{ new: true })
      Card.findOneAndUpdate({ _id: reservData.card }, { $push: { reservations: reserv._id } }, { new: true }, {safe: true, upsert: true},)
      console.log("done !")
      res.json({ status: reserv._id + 'Added! to ' + reservData.user })
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

reservations.get('/getModels', (req, res) => {
  Reservation.find()
    .then(reservation => {

      res.json({ reservation })

    })
    .catch(err => {
      res.send('error: ' + err)
    })
})
reservations.post('/updateStatus', (req, res) => {
  Reservation.updateOne({ _id: req.body._id }, { status: false }, { new: true }).then(card => {

    res.json({ status: "Done !" })

  })
    .catch(err => {
      res.send('error: ' + err)
    })
})

reservations.post('/quit', (req, res) => {
  Reservation.updateOne({ _id: req.body._id }, { status: true }, { new: true }).then(card => {

    res.json({ status: "Done !" })

  })
    .catch(err => {
      res.send('error: ' + err)
    })
})

reservations.get('/getAvailableCards', (req, res) => {
  const time=moment(Date.now()).format("hh:mm:ss ")
  Reservation.find({dateEnd:{$ne: req.body.date}})
    .populate('card')
    .then(card => {

      res.json({card})

    })
    .catch(err => {
      res.send('error: ' + err)
    })
})
reservations.get('/getAllCards', (req, res) => {
  //const time=moment(Date.now()).format("hh:mm:ss ")
  Reservation.find()
   .populate('card')
    .then(card => {

      res.json({card})


    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

reservations.get('/getMyReservation/:user', (req, res) => {
  //const time=moment(Date.now()).format("hh:mm:ss ")
  Reservation.find({user:req.params.user,status:false})
   .populate('card')
    .then(reservation => {

      res.json({reservation})


    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

reservations.get('/getHistory', (req, res) => {
  //const time=moment(Date.now()).format("hh:mm:ss ")
  Reservation.find()
   .populate('card')
   .populate('user')
    .then(reservation => {

      res.json({reservation})


    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

module.exports = reservations