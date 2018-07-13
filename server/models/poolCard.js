const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PoolCardSchema = new Schema({
  poolId: {
    type: String,
    required: true
  }, 
  poolName: {
    type: String, 
    required: true,
    trim: true, 
    max: 30, 
    min: 3
  }
});

const PoolCard = mongoose.model('PoolCards', PoolCardSchema);

module.exports = PoolCard;