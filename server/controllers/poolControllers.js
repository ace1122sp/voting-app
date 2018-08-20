const Pool = require('../models/pool');
const User = require('../models/user');

module.exports = {
  getPools: (req, res) => {
    let findCriteria = {};
    const lastPoolId = req.query.offset;
    if (lastPoolId) findCriteria = { _id: { $lt: lastPoolId } };

    Pool.find(findCriteria)
      .sort({ _id: -1 })
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
      creator: req.user.username,
      options: data.options
    });
    
    pool.save()
      .then(doc => {
        let poolId = doc._id;
        User.findById(req.user._id, ((err, user) => {
          if (err) {
            console.error(err.message);
          } else {
            user.addPool(poolId, (err, user) => {
              if (err) {
                console.error(err.message)
              } else {
                console.log(`pool added to user's createdPools`);
              }
            });
          }
        }));
        console.log(`pool created`);
        return res.status(201).json(doc);
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
        res.sendStatus(500);
      } else {
        if (doc === null) return res.sendStatus(410);
        res.status(200).json(doc); 
      }
    });
  },
  
  deletePool: (req, res) => {
    const poolId = req.params.poolId;
    
    Pool.findByIdAndRemove(poolId, (err, doc) => {
      if (err) {
        console.error(err.message);
        return res.sendStatus(500); 
      }
      
      User.findById(req.user._id, (err, user) => {
        if (err) {
          console.error(err.message);
        } else {
          user.removePool(poolId, (err, user) => {
            if (err) {
              console.err(err.message);
            } else {
              console.log(`pool removed from user`);
            }
          })
        }
      });
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

    User.findById(req.user._id, (err, user) => {
      if (err) {
        console.error(err.message);
        return res.sendStatus(500);
      } else {
        user.follow(poolId, err => {
          if (err) {
            console.error(err.message);
            return res.sendStatus(500);
          } else {
            console.log(`user ${req.user._id} now follows pool ${poolId}`);
            res.sendStatus(200); 
          }
        });
      }
    });
  },
  
  unfollowPool: (req, res) => {
    const poolId = req.params.poolId;

    User.findById(req.user._id, (err, user) => {
      if (err) {
        console.error(err.message);
        return res.sendStatus(500);
      } else {
        user.unfollow(poolId, err => {
          if (err) {
            console.error(err.message);
            return res.sendStatus(500);
          } else {
            console.log(`user ${req.user._id} has unfollowed pool ${poolId}`);
            res.sendStatus(204);
          }
        });
      }
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
      
      doc.update({ $push: { options: option } }, (err, report) => {
        if (err) {
          console.error(err.message);
          return res.sendStatus(400);
        }
        console.log(`added option to pool ${poolId}`);
        res.json(report);
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
      doc.update({ $set: { options: updatedOptions } }, { runValidators: true, multi: true }, (err, report) => {
        if (err) {
          console.error(err.message);
          return res.status(403).send('Pool must have minimum 2 different options.');
        }
        console.log(report);
        if (doc == null) return res.sendStatus(404);
        res.sendStatus(204);
      });
    });
  }
}