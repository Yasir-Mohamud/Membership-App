const router = require("express").Router();

let User = require("../models/user.model");

// creates user
router.route("/add").post((req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    phoneNumber: req.body.phoneNumber,
    isActive: req.body.isActive,
  });

  newUser
    .save()
    .then(() => res.json("User Added"))
    .catch((err) => res.status(400).json("Error : " + err));
});

// gets user by email
router.route("/:email").get((req, res) => {
  User.findOne({ email: req.params.email })
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => response.status(400).json("Error: " + err));
});

//updates user
router.route("/update/:email").post((req, res) => {
  User.findOne({ email: req.params.email })
    .then((user) => {
      user.name = req.body.name;
      user.email = req.body.email;
      user.password = req.body.password;
      user.phoneNumber = req.body.phoneNumber;
      user.isActive = req.body.isActive;
      user
        .save()
        .then(() => res.json("User updated!"))
        .catch((err) => console.log("Error " + err));
    })
    .catch((err) => response.status(400).json("Error: " + err));
});

module.exports = router;
