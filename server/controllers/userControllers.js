const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user');

module.exports = {
  createUser: (req, res) => {
    const user = {
      username: req.body.user.username,
      password: req.body.user.password,
      email: req.body.user.email
    };

    let newUser = new User({
      username: user.username,
      email: user.email,
      password: user.password
    });
    newUser.save()
      .then(doc => {
        res.json(doc);
      })
      .catch(err => {
        console.error(err.message);
        return res.sendStatus(500);
      });
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
        return res.sendStatus(200);
      }
    });
  }
};