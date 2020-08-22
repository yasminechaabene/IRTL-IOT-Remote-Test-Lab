const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const CardModelSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
  },
  cards: [{ type: Schema.Types.ObjectId, ref: 'Cards' }],

})

module.exports = CardModel = mongoose.model('CardModels', CardModelSchema)