const router = require("express").Router();

let User = require("../models/user.model");

// creates user
router.route("/add").post((req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  newUser
    .save()
    .then(() => res.json("User Added"))
    .catch((err) => res.status(400).json("Error : " + err));
});

module.exports = router;
