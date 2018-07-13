const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PoolCard = require('./poolCard');

const PoolCardSetSchema = new Schema({
  set: {
    type: [PoolCard],
    max: 10
  }
});

const PoolCardSet = mongoose.model('PoolCardSet', PoolCardSetSchema);

module.exports = PoolCardSet;