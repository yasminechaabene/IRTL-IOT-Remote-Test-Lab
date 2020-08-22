const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const ReclamationSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: Boolean,
        default:false
        
    },
    user: { type: Schema.Types.ObjectId, ref: 'users' },

})

module.exports = Reclamation = mongoose.model('Reclamations', ReclamationSchema)