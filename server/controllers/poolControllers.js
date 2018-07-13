const express = require('express');
const mongoose = require('mongoose');
const Pool = require('../models/pool');
const PoolCard = require('../models/poolCard');

module.exports = {
  getPools: () => {},
  createPool: (req, res) => {
    const data = req.body.pool;
    let pool = new Pool({
      name: data.name,
      creator: data.creator,
      options: data.options  
    });
    pool.save()
      .then(doc => {
        let card = new PoolCard({
          poolId: doc._id,
          poolName: doc.name
        });
        card.save()
          .then(savedCard => {
            return res.json(savedCard);
          })
          .catch(err => {
            console.error(err.message);
            return res.sendStatus(500); // this is temporary handled
          });
      })
      .catch(err => {
        console.error(err.message);
        return res.sendStatus(500); // this is temporary handled
      });
  },
  getPool: () => {},
  deletePool: () => {},
  vote: () => {},
  followPool: () => {},
  unfollowPool: () => {},
  addOption: () => {},
  removeOption: () => {}
}