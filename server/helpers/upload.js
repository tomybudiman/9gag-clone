const Multer = require('multer');
const jimp = require('jimp');
const md5 = require('md5');
const Storage = require('@google-cloud/storage');

const multer = Multer({
  storage : Multer.memoryStorage()
});

const uploadGoogleStorage = (req,res,next) => {
  const imageData = JSON.parse(req.body.image);
  const buffer = new Buffer(imageData.data,'base64');
  // Bucket Configuration
  const storage = new Storage({
    projectId : process.env.PROJECTID,
    keyFilename : process.env.KEYFILE
  });
  const bucket = storage.bucket(process.env.BUCKET);
  // Filename before upload
  const extRgx = /(?:\.([^.]+))?$/;
  const fileExt = extRgx.exec(imageData.filename)[0];
  const filename = md5(imageData.fileName+'-'+new Date())+fileExt;
  const file = bucket.file(filename);
  // File URL after uploaded
  const getUrl = (file) => {
    return `https://storage.googleapis.com/${process.env.BUCKET}/${file}`
  }
  // Resize image
  jimp.read(buffer).then(image => {
    image
    .scaleToFit(768,768)
    .quality(80)
    .getBuffer(jimp.MIME_JPEG,(err,result) => {
      if(err){
        res.send(err);
      }else{
        const stream = file.createWriteStream({
          metadata: {
            contentType: 'image/jpeg'
          }
        });
        stream.on('error',err => {
          req.uploadstatus = {
            status : false,
            msg : err
          };
          next();
        });
        stream.on('finish',() => {
          file.makePublic().then(() => {
            req.uploadstatus = {
              status : true
            };
            req.fileurl = getUrl(filename);
            next();
          });
        });
        stream.end(result);
      }
    });
  });
}

module.exports = {
  multer,
  uploadGoogleStorage
};
