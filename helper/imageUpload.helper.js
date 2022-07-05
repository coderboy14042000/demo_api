const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './upload');
  },
  filename: (req, file, callback) => {
    callback(null, new Date().getTime() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, callback) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    callback(null, true);
  } else {
    callback(new Error("Unsuported Files.(Please Upload Only Jpeg/png MaxSize 10Mb)."), false);
  }
};

module.exports = {
  upload: multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 10, //it means it upload max 10 mb file.
    },
    fileFilter: fileFilter,
  }),
};
