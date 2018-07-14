const express = require('express');
const mongoose = require('mongoose');
const Pool = require('../models/pool');

module.exports = {
  getPools: (req, res) => {
    Pool.find({})
      .limit(10)
      .select('_id name')
      .exec((error, doc) => {
        if (error) {
          console.error(error.message);
          return res.sendStatus(500); // temporary solution
        } else {
          return res.json(doc);
        }
      });
  },
  createPool: (req, res) => {
    const data = req.body.pool;
    let pool = new Pool({
      name: data.name,
      creator: data.creator,
      options: data.options  
    });
    pool.save()
      .then(doc => {
        console.log(`requested pool ${doc.name}`);
        return res.sendStatus(200);
      })
      .catch(err => {
        console.error(err.message);
        return res.sendStatus(500); // this is temporary handled
      });
  },
  getPool: (req, res) => {
    const id = req.params.poolId;
    Pool.findById(id, (error, doc) => {
      if (error) {
        console.error(error.message);
        return res.sendStatus(500); // this is temporary handled
      } else {
        return res.json(doc);
      }
    });
  },
  deletePool: (req, res) => {
    const id = req.params.poolId;
    Pool.findByIdAndRemove(id, (error, doc) => {
      if (error) {
        console.error(error.message);
        return res.sendStatus(500); // this is temporary handled
      } else {
        console.log(`successfuly deleted pool: ${id}`);
        return res.sendStatus(200);
      }
    });
  },
  vote: (req, res) => {},
  followPool: (req, res) => {},
  unfollowPool: (req, res) => {},
  addOption: (req, res) => {},
  removeOption: (req, res) => {}
}