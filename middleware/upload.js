const multer = require('multer');
const path = require('path');

//set filepath and filename for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/images'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

//set function to filter files to ensure correct type
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')){
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};

//set upload process
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

module.exports = upload;