const express = require("express");
const userRoutes = express.Router();
const bcyrpt = require("bcrypt");

const User = require("../models/user");

userRoutes.route("/register").post((req, res) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(200).json({ message: "Email exists!" });
    } else {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      bcyrpt.hash(user.password, 10)
      .then(hash => {
        user.password = hash;
        user.save();
      })
      .then(() => {
        return res.status(200).json({ "message": "Registration successfull!" });
      })
      .catch(err => {
        return err;
      });
    }
  });
});

userRoutes.route("/login").post((req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email })
  .then(user => {
    if (user) {
    //   if (password == user.password) {
    //     return res.status(200).json({ message: "Login successful!" });
    //   } else {
    //     return res.status(200).json({ message: "Incorrect password!" });
    //   }
    // } else {
    //   return res.status(200).json({ message: "Email not found!" });
      bcyrpt.compare(password, user.password)
      .then(isMatch => {
        if (isMatch) {
          return res.status(200).json({ "message": "Login successfull!" });
        } else {
          return res.status(200).json({ "message": "Incorrect password!" });
        }
      })
      .catch(err => {
        return err;
      });
    } else {
      return res.status(200).json({ "message": "Email not found!" });
    }
  })
  .catch(err => {
    return err;
  });
});

module.exports = userRoutes;
