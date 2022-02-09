const router = require("express").Router();
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
let User = require("../models/user.model");

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
  const user = await User.findOne({ email: req.params.email });
  console.log("user revi", user.image);
  const file = gfs
    .find({
      filename: user.image,
    })
    .toArray((err, files) => {
      if (!files || files.length === 0) {
        return res.status(404).json({
          err: "no files exist",
        });
      }
      gfs.openDownloadStreamByName(user.image).pipe(res);
    });
  user.image = res

    .save()
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error: " + err));
});

//   gfs.find({ filename: user.image }, (err, file) => {
//     console.log("getting h343 !!!!");
//     if (!file || file.length === 0) {
//       return res.status(404).json(`${err} file not found`);
//     }
// console.log("gfs", );
// if (file.contentType === "image/jpg") {
// const readstream = gfs().createReadStream(user.image);
// readstream.pipe(res);
// console.log("body: %j", res);
// }
// });

// .then((user) => res.json(user))
// .catch((err) => res.status(400).json("Error: " + err));

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

// search for file

module.exports = router;
