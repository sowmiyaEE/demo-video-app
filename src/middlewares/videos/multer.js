const multer = require('multer');
const config  = require("config");

const storage   = multer.diskStorage({
    destination : function (request, file, cb) {
     try{
       cb(null, config.get("DEFAULT_FOLDER"));
     }
     catch(err){
       console.log(err);
       cb(err);
     }
    },
    filename    : function (request, file, cb) {
    try{
    let fileName = file.originalname;
    let fileArray = fileName.split('.');
    const ext = fileArray.pop();
    fileName = fileArray.join("_").replaceAll(" ", "_")+"_"+parseInt(Math.random()*1000000);
    fileName +=  '.' + ext;
    request.body.filename = fileName
    cb(null, fileName);
    }
     catch(err){
       cb(err);
     }
    }
});
module.exports  = multer({storage:  storage });
