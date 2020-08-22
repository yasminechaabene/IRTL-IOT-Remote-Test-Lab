const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const ReservationSchema = new Schema({

    dateBeg: {
        type: Date,
        
    },
    dateEnd: {
        type: Date,
    },
    status: {
        type: Boolean,
        default: false

    },
    card: { type: Schema.Types.ObjectId, ref: 'Cards' },

    user: { type: Schema.Types.ObjectId, ref: 'users' },

})

module.exports = Reservation = mongoose.model('Reservations', ReservationSchema)