var mongoose = require('mongoose');

var placeSchema = mongoose.Schema({
    geolocation: {
      type: [Number],
      index: '2d'
    },
    address: String,
    category: String,
    date: Date,
    createdAt: {
      type: Date,
      default: Date.now
    }
});

module.exports = mongoose.model('Place', placeSchema);
