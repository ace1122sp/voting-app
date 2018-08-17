const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
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
    required: true, 
    min: 5,
    max: 30
  },
  email: {
    type: String,
    required: true,
    min: 9,
    max: 50
  },
  createdPools: {
    type: [{type: Schema.Types.ObjectId, ref: 'Pool'}],
    default: []
  },
  followingPools: {
    type: [{type: Schema.Types.ObjectId, ref: 'Pool'}],
    default: []
  }
});

UserSchema.methods = {
  follow: function(poolId, cb) {
    this.followingPools.push(poolId);
    this.save()
      .then(doc => cb(null, doc))
      .catch(err => cb(err, null));
  },
  unfollow: function(poolId, cb) {
    let updatedFollowingPools = this.followingPools.filter(pool => pool != poolId);
    this.followingPools = [...updatedFollowingPools];
    this.save()
      .then(doc => cb(null, doc))
      .catch(err => cb(err, null));
  },
  addPool: function (poolId, cb) {
    this.createdPools.push(poolId);
    this.save()
      .then(doc => cb(null, doc))
      .catch(err => cb(err, null));
  }, 
  removePool: function(poolId, cb) {
    let updatedCreatedPools = this.createdPools.filter(pool => pool != poolId);
    this.createdPools = [...updatedCreatedPools];
    this.save()
      .then(doc => cb(null, doc))
      .catch(err => cb(err, null));
  } 
}

const User = mongoose.model('User', UserSchema);

module.exports = User;
