const express = require('express')
const projects = express.Router()
const cors = require('cors')
const Reservation = require('../models/Reservation')
const Project = require('../models/Project')
var moment = require('moment');
projects.use(cors())

process.env.SECRET_KEY = 'secret'

projects.post('/addProject', (req, res) => {
  const today = moment(new Date())
  const ProjectData = {
    date:today,
    name: req.body.name,
    index: req.body.index,
    reservation:req.body.reservation,
    user:req.body.user,
   
  }

  Project.create(ProjectData)
    .then(pro => {
        //Card.updateOne({_id:req.body.card},{status:false},{ new: true })
      res.json({ status: pro._id +'Added!' })
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})
projects.get('/getMyProjects/:user', (req, res) => {
  Project.find({user:req.params.user})
    .then(projects => {

      res.json({ projects })

    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

projects.post('/deleteProject', (req, res) => {
  Project.deleteOne({ _id: req.body._id },{ new: true }).then(card => {

    res.json({ status: "Done !" })

  })
    .catch(err => {
      res.send('error: ' + err)
    })
})





module.exports = projects