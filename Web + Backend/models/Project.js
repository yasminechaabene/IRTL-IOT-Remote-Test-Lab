const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const ProjectSchema = new Schema({

    date: {
        type: Date,
        default: Date.now
    },
   
    name: {
        type: String,
        required: true

    },
    index: {
        type: String,
        required: true
        

    },
    reservation: { type: Schema.Types.ObjectId, ref: 'Reservations' },
    user: { type: Schema.Types.ObjectId, ref: 'users' },

    

})

module.exports = Project = mongoose.model('Projects', ProjectSchema)