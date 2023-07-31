const constants = require("../../utils/constants.js");
const config = require("config");
const VideoService = require("../../services/video.service");
const fs = require("fs");
const uploadVideoFile = async(request, response) => {
  try {
    if(!request.body.plan_code || !request.body.name){
      return response.status(constants.ERROR_CODES.SOMETHING_WENT_WRONG).send({
        success: false,
        message: "plan_code & name is required."
      });
     } 
     const ext = request.body.filename.split(".").pop();
     if(!['mp4','mkv', 'zip'].includes(ext)){
       return response.status(constants.ERROR_CODES.SOMETHING_WENT_WRONG).send({
        success: false,
        message: "invaild extension"
       });
       
     }
    fs.renameSync(`${config.get("DEFAULT_FOLDER")}/${request.body.filename}`, `${config.get("VIDEO_FOLDER")}/${request.body.plan_code.toUpperCase()}/${request.body.filename}`);
    const video = await VideoService.create({
       plan_code: request.body.plan_code.toUpperCase(),
       video_url: `${config.get("VIDEO_URL")}/${request.body.plan_code.toUpperCase()}/${request.body.filename}`,
       created_by: request.user.id,
       video_name: request.body.name,
       size: 10000
    });
    return response.status(constants.CODES.SUCCESS).send({
      success: true,
      data: video,
      message: "Video uploaded successfully."
    });
  }
  catch(error){
   return response.status(constants.ERROR_CODES.SOMETHING_WENT_WRONG).send({
      success: false,
      message: error.message
    })
  }
};


module.exports= {uploadVideoFile};
