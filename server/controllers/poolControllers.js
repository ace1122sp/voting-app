const Pool = require('../models/pool');

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
    const data = req.body;

    let pool = new Pool({
      name: data.name,
      creator: req.user._id,
      options: data.options
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

    Pool.findById(poolId, (err, doc) => {
      if (err) {
        console.error(err.message);
        return res.sendStatus(500);
      } 
      
      let updatedOptions = [...doc.options];
      
      updatedOptions.forEach(option => {
        if (option.id == optionId) option.votes++;
      });
      
      doc.update({ $set: { options: updatedOptions } }, { multi: true }, (err, doc) => {
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
    const poolId = req.params.poolId;

    const option = {
      id: req.body.id,
      value: req.body.value
    };
    
    Pool.findById(poolId, (err, doc) => {
      if (err) {
        console.error(err.message);
        return res.sendStatus(500);
      }

      if (doc == null) return res.sendStatus(404);
      
      doc.update({ $push: { options: option } }, { new: true }, (err, report) => {
        if (err) {
          console.error(err.message);
          return res.sendStatus(400);
        }
        
        console.log(`added option to pool ${poolId}`);
        res.json(doc);
      });
    });
  },

  removeOption: (req, res) => {
    const poolId = req.params.poolId;
    const optionId = parseInt(req.params.optionId);

    Pool.findById(poolId, (err, doc) => {
      if (err) {
        console.error(err.message);
        return res.sendStatus(500);
      }
      let updatedOptions = doc.options.filter(option => option.id !== optionId);
      doc.update({ $set: { options: updatedOptions } }, { runValidators: true, new: true, multi: true }, (err, report) => {
        if (err) {
          console.error(err.message);
          return res.status(403).send('Pool must have minimum 2 different options.');
        }
        
        if (doc == null) return res.sendStatus(404);
        
        console.log(`option removed from pool ${poolId}`);
        res.json(doc);
      });
    });
  }
}