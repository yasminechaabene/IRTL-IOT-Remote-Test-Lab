const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const PatternSchema = new Schema({
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
        default:true
        
    },
   
})

module.exports = Card = mongoose.model('Patterns', PatternSchema)