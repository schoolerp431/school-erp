const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
  department: String,
  message: String,
  createdBy: String,
  approved: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Event', eventSchema)
