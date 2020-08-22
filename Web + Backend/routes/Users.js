const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const uuidv4 = require('uuid/v4')
const multer = require('multer')

const User = require('../models/User')
const DIR = './public/';
users.use(cors())

process.env.SECRET_KEY = 'secret'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, uuidv4() + '-' + fileName)
  }
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
});



users.post('/user-profile/:id', upload.single('profileImg'), (req, res, next) => {
  const url = req.protocol + '://' + req.get('host')
  const userData = {
    id: req.params.id,
    profileImg: url + '/public/' + req.file.filename,
  }
  User.findByIdAndUpdate({ _id:userData.id},  { profileImg: userData.profileImg } , { new: true, useFindAndModify: false }).then(result => {
    res.status(201).json({
      message: "image updated successfully!",
      userUpdated: {
        _id: result._id,
        profileImg: result.profileImg
      }
    })
  }).catch(err => {
    console.log(err),
      res.status(500).json({
        error: err
      });
  })
})


users.post('/update', (req, res) => {
  const userData = {
    _id:req.body._id,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
  }
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    userData.password = hash
    User.findByIdAndUpdate({_id:userData._id}, { $set: { first_name: userData.first_name, last_name: userData.last_name,email:userData.email,password:userData.password } }, { new: true, useFindAndModify: false }
    ).then(user => {
      res.json({ status: user.first_name + 'Updated!' })
    })

      .catch(err => {
        res.send('error: ' + err)
      })
  })
})

users.post('/register', (req, res) => {
  const today = new Date()
  const userData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    class: req.body.class,
    role: "user",
    state: 0,
    profileImg: "none"
  }

  User.findOne({
    email: req.body.email
  })
    .then(user => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash
          User.create(userData)
            .then(user => {
              res.json({ status: user.email + 'Registered!' })
            })
            .catch(err => {
              res.send('error: ' + err)
            })
        })
      } else {
        res.json({ error: 'User already exists' })
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

users.post('/login', (req, res) => {
  User.findOne({
    email: req.body.email
  })
    .then(user => {
      if (user) {
       // if(user.role==="admin")
       // {localStorage.setItem("admin",true)}
        if (bcrypt.compareSync(req.body.password, user.password)) {
          // Passwords match
          const payload = {
            _id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            class: user.class,
            role: user.role,
            state: user.state,
            profileImg:user.profileImg
          }
         
          let token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: 1440
          })
            res.send(token)
           //res.json({ user })
        } else {
          // Passwords don't match
          res.json("1")
        }
      } else {
        res.json("1")
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})


users.get('/profile', (req, res) => {
 // var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

  User.findOne({
    _id: decoded._id
  })
    .then(user => {
      if (user) {
        res.json(user)
      } else {
        res.send('User does not exist')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

users.get('/getRole', (req, res) => {

  User.findOne({ email:req.body.email},'role')

    .then(user => {
      res.send(user.role)

    })
    .catch(err => {
      res.send('error: ' + err)
    })
})
users.post('/editUser/:user', (req, res) => {
  const cardData = {
    class: req.body.class,
  }
      User.findOneAndUpdate({ _id:req.params.user}, {$set:{ class: cardData.class }}, { new: true }).then(card => {

        res.json({ status: "Done !" })
    
      })
   
    .catch(err => {
      res.send('error: ' + err)
    })
})
users.get('/getRole/:email', (req, res) => {

  User.findOne({ email:req.params.email},'role')

    .then(user => {
      res.send(user.role)

    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

users.get('/getImage/:id', (req, res) => {

  User.findOne({_id:req.params.id},'profileImg')

    .then(user => {
      res.send(user.profileImg)

    })
    .catch(err => {
      res.send('error: ' + err)
    })
})
users.get('/getState/:email', (req, res) => {

  User.findOne({ email:req.params.email },'state')

    .then(user => {
     
      res.json( user.state)

    })
    .catch(err => {
      res.send('error: ' + err)
    })
})
users.get('/getActiveUsers', (req, res) => {

  User.find({ state:1,role:"user" })

    .then(users => {
     

      res.json({ users })

    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

users.get('/getInactiveUsers', (req, res) => {

  User.find({ state:0,role:"user" })

    .then(users => {
     

      res.json({ users })

    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

users.get('/getBlockedUsers', (req, res) => {

  User.find({ state:-1,role:"user" })

    .then(users => {
     

      res.json({ users })

    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

users.post('/deleteUser', (req, res) => {
  User.deleteOne({ _id: req.body._id },{ new: true }).then(card => {

    res.json({ status: "Done !" })

  })
    .catch(err => {
      res.send('error: ' + err)
    })
})

users.post('/approveUser', (req, res) => {
  User.updateOne({ _id: req.body._id }, { state: 1 },{ new: true }).then(card => {

    res.json({ status: "Done !" })

  })
    .catch(err => {
      res.send('error: ' + err)
    })
})

users.post('/disapproveUser', (req, res) => {
  User.updateOne({ _id: req.body._id }, { state: -1 },{ new: true }).then(card => {

    res.json({ status: "Done !" })

  })
    .catch(err => {
      res.send('error: ' + err)
    })
})

module.exports = users