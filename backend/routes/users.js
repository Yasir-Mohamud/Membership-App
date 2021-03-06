const router = require("express").Router();
let User = require("../models/user.model");
const multer = require("multer");
const crypto = require("crypto");
const path = require("path");
const { GridFsStorage } = require("multer-gridfs-storage");
require("dotenv").config();
const uri = process.env.ATLAS_URI;
const mongoose = require("mongoose");

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;

let gfs;
connection.once("open", () => {
  // init stream
  gfs = new mongoose.mongo.GridFSBucket(connection.db, {
    bucketName: "users",
  });
});

const storage = new GridFsStorage({
  url: uri,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "users",
        };
        resolve(fileInfo);
      });
    });
  },
});
const upload = multer({ storage });
// const { monke: gfs } = require("../server.js");

// creates user
router.route("/add").post(upload.single("image"), (req, res) => {
  console.log("body: %j", req.body);
  console.log("body: %j", req.file);

  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    phoneNumber: req.body.phoneNumber,
    isActive: req.body.isActive,
    image: req.file.filename,
  });

  newUser
    .save()
    .then(() => res.json(" User Added"))
    .catch((err) => res.status(400).json("Error post: " + err));
});

// gets user by email
router.route("/:email").get(async (req, res) => {
  User.findOne({ email: req.params.email })
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error: " + err));
});

// gets all users
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

// search for image file
router.route("/image/:filename").get((req, res) => {
  // console.log('id', req.params.id)
  const file = gfs
    .find({
      filename: req.params.filename,
    })
    .toArray((err, files) => {
      if (!files || files.length === 0) {
        return res.status(404).json({
          err: "no files exist",
        });
      }
      gfs.openDownloadStreamByName(req.params.filename).pipe(res);
    });
});

module.exports = router;
