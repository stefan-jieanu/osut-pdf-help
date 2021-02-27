const file_filter = function(req, file, cb) {
    // Accept pdf only
    /*if (!file.originalname.match('/\.(png|PNG)$/')) {
        req.fileValidationError = 'Only pdf allowed!';
        return cb(new Error('Only pdf allowed!'), false);
    }*/
    console.log("VAlidating pdf");

    cb(null, true);
};
exports.file_filter = file_filter;