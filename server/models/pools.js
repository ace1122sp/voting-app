const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PoolSchema = new Schema({
  id: {
    type: String,
    required: true
  },
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
    type: [String],
  },
  options: {
    type: Schema.Types.Mixed
  }
});

const Pool = mongoose.model('Pool', PoolSchema);

module.exports = Pool;
