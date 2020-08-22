const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const UserSchema = new Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  class: {
    type: String,
    required: true
  },
  role: {
    type: String,
  },
  state: {
    type:Number,
  },
  profileImg: {
    type: String
},
reclamations: [{ type: Schema.Types.ObjectId, ref: 'Reclamations' }],
reservations: [{ type: Schema.Types.ObjectId, ref: 'Reservations' }],
projects: [{ type: Schema.Types.ObjectId, ref: 'Projects' }],
})


module.exports = User = mongoose.model('users', UserSchema)