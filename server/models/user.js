const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
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
    type: [Schema.Types.ObjectId],
    default: []
  },
  followingPools: {
    type: [Schema.Types.ObjectId],
    default: []
  }
});

UserSchema.methods = {
  follow: function() { // to take poolId and to update followingPools
    
  },
  unfollow: function() {}, // to remove poolId from followingPools
  addPool: function() {}, // to add poolId to createdPools
  removePool: function() {} // to remove poolId from createdPools
}

const User = mongoose.model('User', UserSchema);

module.exports = User;
