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

const upload = multer({
  storage

});

module.exports = upload;
