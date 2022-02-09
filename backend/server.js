const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// const Grid = require("gridfs-stream");
// Grid.mongo = mongoose.mongo;

const app = express();
const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;
// let gfs;
// module.exports.monke = function () {
//   return gfs;
// };

mongoose.connect(uri, { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once("open", () => {
  //   gfs = Grid(connection.db);
  //   console.log("GFS CONNEXTION ---\n", gfs.files);
  //   gfs.collection("users");
  console.log("MongoDB database connection established successfully");
});

// import routes
const usersRouter = require("./routes/users");

app.use(cors());
app.use(express.json());
app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
