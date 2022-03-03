import multer from 'multer'
import path from 'path'
export const imageFilter = function(req, file, cb) {
    // Accept images only
    try{
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);}catch(err){
        console.log(err)
    }
};
export const  storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});