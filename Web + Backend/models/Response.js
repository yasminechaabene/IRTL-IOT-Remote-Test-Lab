const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const ResponseSchema = new Schema({
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
    reclamation: { type: Schema.Types.ObjectId, ref: 'Reclamations' },
    user: { type: Schema.Types.ObjectId, ref: 'users' },

})

module.exports = Response = mongoose.model('Responses', ResponseSchema)