const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const CardSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    ip: {
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
    model: { type: Schema.Types.ObjectId, ref: 'CardModels' },
    reservations: [{ type: Schema.Types.ObjectId, ref: 'Reservations' }],

})

module.exports = Card = mongoose.model('Cards', CardSchema)