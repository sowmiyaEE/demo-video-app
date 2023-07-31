const config  = require("config");
const jsonwebtoken = require("jsonwebtoken");
const fs = require("fs");
const createToken = (payload)=> {
  return jsonwebtoken.sign(payload, config.get('JWT.secret'),
    {  expiresIn: config.get('JWT.expiry')});
};

const getVideoFolder = (name) => { 
  return `${config.get('VIDEO_FOLDER')}/${name}` 
};

const createFolder = (folder) => {
  if(!fs.existsSync(folder)){
      fs.mkdirSync(folder);
    }
};
const getContents = (fileName) => {
 /*fs.realpath( __dirname+ fileName, (error, resolvedPath) => {
  if (error) {
    console.log(error);
  }
  else {*/
   let files= fs.readdirSync(fileName);  
   return files;      
  /*}
 });*/
   
};
module.exports =  {createToken, getVideoFolder, createFolder, getContents};
