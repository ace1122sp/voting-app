const express = require('express');
const mongoose = require('mongoose');
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
          return res.sendStatus(500); // temporary solution
        } else {
          return res.json(doc);
        }
      });
  },
  createPool: (req, res) => {
    const data = req.body.pool;
    let pool = new Pool({
      name: JSON.stringify(data.name),
      creator: JSON.stringify(data.creator),
      options: data.options  
    });
    // only perform if pool valid
    pool.save()
      .then(doc => {
        console.log(`pool created`);
        return res.sendStatus(200);
      })
      .catch(err => {
        console.error(err.message);
        return res.sendStatus(500); // this is temporary handled
      });
  },
  getPool: (req, res) => {
    const id = req.params.poolId;
    Pool.findById(id, (err, doc) => {
      if (err) {
        console.error(err.message);
        return res.sendStatus(500); // this is temporary handled
      } else {
        return res.json(doc);
      }
    });
  },
  deletePool: (req, res) => {
    const id = req.params.poolId;
    Pool.findByIdAndRemove(id, (err, doc) => {
      if (err) {
        console.error(err.message);
        return res.sendStatus(500); // this is temporary handled
      } else {
        console.log(`successfuly deleted pool: ${id}`);
        return res.sendStatus(200);
      }
    });
  },
  vote: (req, res) => {
    const id = req.params.poolId;
    const optionId = req.body.optionId;

    Pool.findById(id, (err, doc) => {
      if (err) {
        console.error(err.message);
        return res.sendStatus(500);
      } else {
        let updatedOptions = [...doc.options];
        updatedOptions.map(option => {
          if (option.id == optionId) option.votes++;
          return option;
        });

        doc.update({ $set: { options: updatedOptions } }, (err, doc) => {
          if (err) {
            console.error(err.message);
            return res.sendStatus(500);
          } else {
            return res.sendStatus(200);
          }
        });
      }
    });
  },
  followPool: (req, res) => {
    const poolId = req.params.poolId;
    const followerId = JSON.stringify(req.body.followerId);

    Pool.findById(poolId, (err, doc) => {
      if (err) {
        console.error(err.message); 
        return res.sendStatus(500); // temp handle
      } else {
        const updatedFollowers = Object.assign({}, doc.followers, { [followerId]: true });
        doc.update({ $set: { followers: updatedFollowers } }, (err, doc) => {
          if (err) {
            console.error(err.message);
            return res.sendStatus(500); // temp handle
          } else {
            return res.json(doc);
          } 
        });
      }
    });
  },
  unfollowPool: (req, res) => {
    const poolId = req.params.poolId;
    const followerId = req.params.followerId;

    Pool.findById(poolId, (err, doc) => {
      if (err) {
        console.error(err.message);
        return res.sendStatus(500); // temp handle
      } else {
        const updatedFollowers = Object.assign({}, doc.followers);
        delete updatedFollowers[followerId];
        doc.update({ $set: { followers: updatedFollowers } }, (err, doc) => {
          if (err) {
            console.error(err.message);
            return res.sendStatus(500); // temp handle
          } else {
            return res.json(doc);
          }
        });
      }
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
      } else {
        doc.update({ $push: { options: option } }, (err, doc) => {
          if (err) {
            console.error(err.message);
            return res.sendStatus(500);
          } else {
            return res.json(doc);
          }
        });
      }
    });
  },
  removeOption: (req, res) => {
    const poolId = req.params.poolId;
    const optionId = req.params.optionId;

    Pool.findById(poolId, (err, doc) => {
      if (err) {
        console.error(err.message);
        return res.sendStatus(500);
      } else {
        let updatedOptions = doc.options.filter(option => option.id !== optionId);
        doc.update({ $set: { options: updatedOptions } }, (err, doc) => {
          if (err) {
            console.error(err.message);
            return res.sendStatus(500);
          } else {
            return res.json(doc);
          }
        });
      }
    });
  }
}