const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const arrayMinSizeTest = val => val.length > 1;

const OptionSchema = new Schema({
  id: {
    type: Number,
    min: 1,
    max: 20,
    required: true
  },
  value: {
    type: String,
    max: 50,
    required: true
  },
  votes: {
    type: Number,
    default: 0,
    min: 0
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
    type: Schema.Types.ObjectId,
    required: true
  },
  followers: {
    type: Schema.Types.Mixed,
    default: {}
  },
  options: {
    type: [OptionSchema],
    validate: [{ validator: arrayMinSizeTest, msg: 'Pool must have minimum 2 different options.' }],
    required: true
  }
});

const Pool = mongoose.model('Pool', PoolSchema);

module.exports = Pool;
