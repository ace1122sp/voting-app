const User = require('../models/user');

module.exports = {
  registerUser: (req, res, next) => {
    User.findOne({ username: req.body.username }, (err, user) => {
      if (err) {
        next(err);
      } else if (user) {
        return res.status(400).json({ "message": "username already taken" });
      } else {
        const newUser = new User({
          username: req.body.username,
          password: req.body.password,
          email: req.body.email
        });
                
        newUser.save((err, doc) => {
          if (err) {
            return res.sendStatus(500);
          } else {
            next(null, doc);
          }
        });
      }
    });
  },
  logout: (req, res) => {
    req.logout();
    res.status(204).json({ "message": "user logged out" });
  },
  getUser: (req, res) => {
    const user = {
      username: req.user.username,
      email: req.user.email,
      createdPools: req.user.createdPools,
      followingPools: req.user.followingPools,
    }
    res.json(user); 
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