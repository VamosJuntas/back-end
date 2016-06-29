var mongoose = require('mongoose');

var reportSchema = mongoose.Schema({
  geolocation: {
    type: [Number],
    index: '2d'
  },
  category: String,
  date: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Report', reportSchema);
