const validator = require('validator');
const Pool = require('../models/pool');

// write validation module
// validator.forOptions .

module.exports = {
  getPools: (req, res) => {
    Pool.find({})
      .limit(10)
      .select('_id name')
      .exec((err, doc) => {
        if (err) {
          console.error(err.message);
          return res.sendStatus(500); 
        }
        res.status(200).json(doc);
      });
  },
  
  createPool: (req, res) => {

    // validation
    const data = req.body.pool;
    if (!data.name || !data.options) return res.sendStatus(400);
    if (!Array.isArray(data.options)) return res.sendStatus(400);
    
    const options = data.options.map(option => {
      return {
        _id: parseInt(option._id) || '',
        value: JSON.stringify(option.value) || ''
      };
    });
    
    let pool = new Pool({
      name: JSON.stringify(data.name),
      creator: JSON.stringify(data.creator) || 'n/a',
      options
    });
    
    pool.save()
      .then(doc => {
        console.log(`pool created`);
        res.status(201).json(doc);
      })
      .catch(err => {
        console.error(err.message);
        res.sendStatus(400); 
      });
  },
  
  getPool: (req, res) => {
    const poolId = req.params.poolId;
    if (!validator.isMongoId(poolId)) return res.sendStatus(400);
    Pool.findById(poolId, (err, doc) => {
      if (err) {
        console.error(err.message);
        return res.sendStatus(500);
      } 
      res.status(200).json(doc);
    });
  },
  
  deletePool: (req, res) => {
    const poolId = req.params.poolId;
    if (!validator.isMongoId(poolId)) return res.sendStatus(400);
    Pool.findByIdAndRemove(poolId, (err, doc) => {
      if (err) {
        console.error(err.message);
        return res.sendStatus(500); 
      }
      console.log(`successfuly deleted pool: ${poolId}`);
      res.sendStatus(204); 
    });
  },
  
  vote: (req, res) => {
    const poolId = req.params.poolId;
    const optionId = req.body.optionId;
    if (!validator.isMongoId(poolId) || !validator.isInt(optionId)) return res.sendStatus(400);

    Pool.findById(poolId, (err, doc) => {
      if (err) {
        console.error(err.message);
        return res.sendStatus(500);
      } 
      
      let updatedOptions = [...doc.options];
      
      updatedOptions.forEach(option => {
        if (option._id == optionId) option.votes++;
      });
      
      doc.update({ $set: { options: updatedOptions } }, (err, doc) => {
        if (err) {
          console.error(err.message);
          return res.sendStatus(500);
        }
        res.sendStatus(200);
      });
    });
  },
  
  followPool: (req, res) => {
    const poolId = req.params.poolId;
    const followerId = req.body.followerId;

    if (!validator.isMongoId(poolId) || !validator.isMongoId(followerId)) return res.sendStatus(400);

    Pool.findById(poolId, (err, doc) => {
      if (err) {
        console.error(err.message); 
        return res.sendStatus(500); 
      } 
      
      const updatedFollowers = Object.assign({}, doc.followers, { [followerId]: true });
      
      doc.update({ $set: { followers: updatedFollowers } }, (err, doc) => {
        if (err) {
          console.error(err.message);
          return res.sendStatus(500);
        } 
        console.log(`user ${followerId} added to followers of pool ${poolId}`);
        res.sendStatus(200); 
      });
    });
  },
  
  unfollowPool: (req, res) => {
    const poolId = req.params.poolId;
    const followerId = req.params.followerId;

    if (!validator.isMongoId(poolId) || !validator.isMongoId(followerId)) return res.sendStatus(400);

    Pool.findById(poolId, (err, doc) => {
      if (err) {
        console.error(err.message);
        return res.sendStatus(500); 
      }
      const updatedFollowers = Object.assign({}, doc.followers);
      delete updatedFollowers[followerId];
      doc.update({ $set: { followers: updatedFollowers } }, (err, doc) => {
        if (err) {
          console.error(err.message);
          return res.sendStatus(500);
        }
        console.log(`user ${followerId} removed from followers of pool ${poolId}`);
        res.sendStatus(204);
      });
    });
  },

  addOption: (req, res) => {
    const id = req.params.poolId;
    const option = { // need to validate option
      _id: req.body.option.id,
      value: req.body.option.value,
    };

    Pool.findById(id, (err, doc) => {
      if (err) {
        console.error(err.message);
        return res.sendStatus(500);
      }
      doc.update({ $push: { options: option } }, (err, doc) => {
        if (err) {
          console.error(err.message);
          return res.sendStatus(500);
        }
        console.log(`added option to pool ${id}`);
        res.json(doc);
      });
    });
  },

  removeOption: (req, res) => {
    const poolId = req.params.poolId;
    const optionId = req.params.optionId;

    Pool.findById(poolId, (err, doc) => {
      if (err) {
        console.error(err.message);
        return res.sendStatus(500);
      }
      let updatedOptions = doc.options.filter(option => option.id !== optionId);
      doc.update({ $set: { options: updatedOptions } }, { runValidators: true }, (err, doc) => {
        if (err) {
          console.error(err.message);
          return res.sendStatus(500);
        }
        console.log(`option removed from pool ${poolId}`);
        res.json(doc);
      });
    });
  }
}