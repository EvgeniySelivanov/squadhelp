const fs = require('fs');
const path = require('path');
const multer = require('multer');
const ServerError = require('../errors/ServerError');
const env = process.env.NODE_ENV || 'development';
const devFilePath = path.resolve(__dirname, '..', '..', 'public/images');

const filePath = env === 'production'
  ? '/var/www/html/images/'
  : devFilePath;

if (!fs.existsSync(filePath)) {
  fs.mkdirSync(filePath, {
    recursive: true,
  });
}

const storageContestFiles = multer.diskStorage({
  destination: function (req, file, cb) { cb(null, filePath) },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + '_' + file.originalname)
  }
});

const uploadAvatars = multer({ storage: storageContestFiles }).single('file');
const updateContestFile = multer({ storage: storageContestFiles }).single('file');
const uploadLogoFiles = multer({ storage: storageContestFiles }).single('file');

module.exports.uploadAvatar = (req, res, next) => {
  uploadAvatars(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      next(new ServerError());
    } else if (err) {
      next(new ServerError());
    }
    return next();
  });
};


module.exports.updateContestFile = (req, res, next) => {
  updateContestFile(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      next(new ServerError());
    } else if (err) {
      next(new ServerError());
    }
    return next();
  });
};

module.exports.uploadLogoFiles = (req, res, next) => {
  uploadLogoFiles(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      next(new ServerError());
    } else if (err) {
      next(new ServerError());
    }
    return next();
  });
};

