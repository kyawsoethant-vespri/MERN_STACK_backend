const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + "../../public");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname.trim());
    }
})

const upload = multer({storage: storage})

module.exports = upload;