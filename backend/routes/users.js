const router = require("express").Router();

const { monke: gfs } = require("../server.js");
let User = require("../models/user.model");
const upload = require("../middleware/upload");

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
  console.log("gfs", gfs().files);
  gfs().files.findOne({ filename: user.image }, (err, file) => {
    console.log("getting h343 !!!!");
    if (!file || file.length === 0) {
      return res.status(404).json(`${err} file not found`);
    }

    // if (file.contentType === "image/jpg") {
    const readstream = gfs().createReadStream({ filename: user.image });
    readstream.pipe(res);
    console.log("body: %j", res);
    // }
  });

  //   User.image = res
  // .then((user) => res.json(user))
  // .catch((err) => res.status(400).json("Error: " + err));
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

// search for file

module.exports = router;
