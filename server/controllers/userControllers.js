const User = require('../models/user');
const bcrypt = require('bcrypt');

module.exports = {
  registerUser: (req, res, next) => {
    User.findOne({ username: req.body.username }, (err, user) => {
      if (err) {
        next(err);
      } else if (user) {
        return res.status(400).json({ "message": "username already taken" });
      } else {
        bcrypt.hash(req.body.password, 8)
        .then(hash => {
          const newUser = new User({
            username: req.body.username,
            password: hash,
            email: req.body.email
          });

          newUser.save((err, doc) => {
            if (err) {
              return res.sendStatus(500);
            } else {
              next(null, doc);
            }
          });
        })
        .catch(e => {
          return res.sendStatus(500);
        })
      }
    });
  },
  logout: (req, res) => {
    req.logout();
    res.status(204).json({ "message": "user logged out" });
  },
  getUser: (req, res) => {
    req.user
    .populate({
      path: 'createdPools',
      select: '_id name'
    })
    .populate({
      path: 'followingPools',
      select: '_id name'
    })
    .execPopulate()
    .then(user => {
      const formattedUser = {
        username: user.username,
        email: user.email,
        createdPools: user.createdPools,
        followingPools: user.followingPools
      }
      res.json(formattedUser); 
    })
    .catch(err => {
      res.sendStatus(500);
    });
  },
  updatePassword: (req, res) => {
    const id = req.user._id;
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
    const id = req.user._id;
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