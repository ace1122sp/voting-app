const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user');

module.exports = {
  createUser: (req, res) => {
    const user = {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email
    };

    let newUser = new User({
      username: user.username,
      email: user.email,
      password: user.password
    });
    
    User.findOne({ username: user.username }, (err, doc) => {
      if (err) {
        console.error(err.message);
        return res.sendStatus(500);
      }

      if (doc === null) {
        newUser.save()
          .then(doc => {
            res.status(201).json(doc);
          })
          .catch(err => {
            console.error(err.message);
            return res.sendStatus(400);
          });
      } else {
        console.log(`username ${doc.username} already taken`);
        return res.sendStatus(400);
      }
    })
  },
  getUser: (req, res) => {
    const id = req.params.userId;

    User.findById(id, 'username createdPools followingPools', (err, doc) => {
      if (err) {
        console.error(err.message);
        return res.sendStatus(500);
      } else {
        return res.json(doc);
      }
    });
  },
  updatePassword: (req, res) => {
    const id = req.params.userId;
    const newPassword = req.body.newPassword;

    User.findById(id, (err, doc) => {
      if (err) {
        console.error(err.message);
        return res.sendStatus(500);
      } else {
        doc.update({ $set: { password: newPassword } })
          .then(doc => {
            return res.sendStatus(200);
          })
          .catch(err => {
            console.error(err.message);
            return res.sendStatus(500);
          });
      }
    });
  },
  deleteUser: (req, res) => {
    const id = req.params.userId;
    User.findByIdAndRemove(id, (err, doc) => {
      if (err) {
        console.error(err.message);
        return res.sendStatus(500);
      } else {
        console.log(`User ${id} successfuly deleted.`);
        return res.sendStatus(204);
      }
    });
  }
};