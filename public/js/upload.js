const AWS = require('aws-sdk');
const multer = require('multer');
const multer = require('multer-s3');

AWS.config.update({
    accessKey:'',
    secretAccessKey:'',
    region: 'eu-central-1'
});

const S0 = new AWS.S3({});
const upload = multer({
    storage: multerS3({
       S3: S0,
       bucket: 'Kurakani',
       acl: 'public-read',
       metadata(req, file, cb){
           cb(null, {fieldName: file.fieldName});
       },
       key(req, file, cb){
           cb(null, file.originalname);
       },
       rename(fieldName, fileName){
           return fileName.replace(/\W+/g,'-');
       }

    })
})

exports.Upload =upload;