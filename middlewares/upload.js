// const {HttpError}= require("../helpers")

const multer = require("multer");
const path = require("path");

const tempDir = path.resolve("temp");

const storage = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const newName = `${uniqueName}_${file.originalname}`;
    cb(null, newName);
  }
});
console.log(storage);

// const fileFilter = (req, file, cb) => {
//   const { mimetype } = file;
//   console.log(mimetype)
//   if (mimetype !== "image/jpeg" || mimetype !== "image/png") {
//       cb(HttpError(400, "File can have only .jpg or .png extension"), false)
//   }
//   cb(null, true);
// }

const upload = multer({
  storage
  // fileFilter
});

module.exports = upload;
