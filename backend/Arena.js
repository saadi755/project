const mongoose = require('mongoose');

const arenaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  sport: {
    type: String,
    required: true,
    enum: ['cricket', 'football', 'padel', 'badminton', 'futsal']
  },
  location: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  pricePerSlot: {
    type: Number,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Arena', arenaSchema);