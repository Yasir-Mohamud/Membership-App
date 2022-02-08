const multer = require("multer");
const crypto = require("crypto");
const path = require("path");
const { GridFsStorage } = require("multer-gridfs-storage");

var storage = new GridFsStorage({
  url: process.env.ATLAS_URI,
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

// const storage = multer.diskStorage({
//   destination: function (req, file, callback) {
//     callback(null, "../public/uploads/");
//   },
//   filename: function (req, file, callback) {
//     callback(null, file.originalname);
//   },
// });

const upload = multer({ storage });

// fileFilter: function (req, file, callback) {
//     if (file.mimetype == "image/png" || file.mimetype == "image/jpg") {
//       callback(null, true);
//     } else {
//       console.log("not supported , only jpg and png");
//       console.log(file);
//       callback(null, false);
//     }
//   },
//   limits: {
//     fileSize: 1024 * 1024 * 2,
//   },
module.exports = upload;
