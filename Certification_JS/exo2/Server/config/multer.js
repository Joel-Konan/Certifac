let multer = require("multer");
const fs = require('fs');

    
// Determiner où les fichiers seront stocker
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let dirImages = './public/uploadsImages';
        let dirImagesCategorie = './public/categories';
        console.log("Upload :",file)
        if (file.fieldname === "image") {
            fs.mkdir(dirImages, (err) => {
                cb(null, dirImages);
            });
        } else if (file.fieldname === "catimage") {
            fs.mkdir(dirImages, (err) => {
                cb(null, dirImagesCategorie);
            });
        }
    },
    filename: (req, file, cb) => {
        if (file.fieldname === "image") {
            cb(null, "image_" + file.originalname);
        } else if (file.fieldname === "catimage") {
            cb(null, "cat_" + file.originalname);
        }
    }
});

// Donner accès aux fichiers qui seront acceptés
const fileFilter = (req, file, cb) => {
    if (file.fieldname === "image") {
        mimetypeImage(file, cb);
    } else if (file.fieldname === "catimage") {
        mimetypeImage(file, cb);
    } 
};

// Exportation de multer
const UploadsFiles = multer ({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 9 // 9Go Min
    },
    fileFilter: fileFilter
})
exports.upload = UploadsFiles;




function mimetypeImage(file, cb) {
    if (
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpeg" 
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}