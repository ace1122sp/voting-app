const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OptionSchema = new Schema({
  _id: {
    type: Number,
  },
  value: {
    type: String
  },
  votes: {
    type: Number,
    default: 0
  }
});

const PoolSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    max: 30,
    min: 3
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  creator: {
    type: String,
    default: 'n/a',
    max: 30,
    trim: true
  },
  followers: {
    type: Schema.Types.Mixed,
    default: {}
  },
  options: {
    type: [OptionSchema]
  }
});

const Pool = mongoose.model('Pool', PoolSchema);

module.exports = Pool;
