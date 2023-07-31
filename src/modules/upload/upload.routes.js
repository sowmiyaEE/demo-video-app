const Router = require("express").Router();
const controller= require("./upload.controller");
const upload = require("../../middlewares/videos/multer");
Router.post("/upload-video", 
  upload.single('file'), 
  controller.uploadVideoFile
);
module.exports= Router;
