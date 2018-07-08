const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    trim: true,
    max: 30,
    min: 4
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    min: 9,
    max: 50
  },
  createdPools: {
    type: [String]
  },
  followingPools: {
    type: [String]
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
