const router = require("express").Router();
const Admin = require("../models/admin.model");

// create an admin
router.route("/add").post((req, res) => {
  console.log("body: %j", req.body);
  const admin = new Admin({
    email: req.body.email,
    password: req.body.password,
  });

  admin
    .save()
    .then((res) => res.json("Admin Added"))
    .catch((err) => res.status(400).json("Error post: " + err));
});

// get an admin
router.route("/:email").get((req, res) => {
  Admin.findOne({ email: req.params.email })
    .then((admin) => res.json(admin))
    .catch((err) => res.status(400).json("Error: " + err));
});

// delete an admin
router.route("/:email").delete((req, res) => {
  Admin.findOneAndDelete(req.params.email)
    .then((res) => res.json("Admin Deleted"))
    .catch((err) => res.json(`Admin Not Deleted! ${err} `));
});

// handles admin login
router.route("/login").post(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Email and Password are required" });

  const foundAdmin = await Admin.findOne({ email: email });
  if (!foundAdmin) return res.sendStatus(401); //unauthorized
  if (foundAdmin.password === password) {
    res.json({ sucess: `Admin is logged in` });
  } else {
    res.sendStatus(400);
  }
});

module.exports = router;
