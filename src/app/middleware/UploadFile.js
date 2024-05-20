const multer = require("multer");
const { MimeType } = require("../constant");
const storage = (path) => {
  return multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path);
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
    },
  });
};
function upload(path, allow_mime_type) {
  return multer({
    storage: storage(path),
    fileFilter: function (req, file, cb) {
      if (allow_mime_type.includes(file.mimetype)) {
        cb(null, true);
      } else {
        req.body.error_upload = "invalid file";
        return cb(null, false, new Error("goes wrong on the mimetype"));
      }
    },
  });
}

module.exports = upload;
