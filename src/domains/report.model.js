var mongoose = require('mongoose');

var reportSchema = mongoose.Schema({
  loc: {
    type: [Number],
    index: '2d'
  },
  address: String,
  reports: [
    {
      category: String,
      date: Date,
      createdAt: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

module.exports = mongoose.model('Report', reportSchema);
