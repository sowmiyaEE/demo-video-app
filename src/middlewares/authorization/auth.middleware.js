const jsonwebtoken  = require("jsonwebtoken");
const constants = require("../../utils/constants");
const config = require("config");

const verifyToken = (request, response,next ) => {
  try{
    if (!request.headers['authorization']) {
        return response.status(constants.ERROR_CODES.UNAUTHORIZED).send({
          success: false,
          message: constants.MESSAGES.UNAUTHORISED
        });
      }
    const token = request.headers.authorization.split(' ')[1];
    const data = jsonwebtoken.verify(token, config.get("JWT.secret"));
    request.user = data;
    return next();
  }
  catch(error){
    return response.status(constants.ERROR_CODES.UNAUTHORIZED).send({
      success: false,
      message: constants.MESSAGES.UNAUTHORISED
    });
  }
}

const systemUser = (request, response,next ) => {
  if(request.user){
    if(request.user.role == constants.ROLES.SYSTEM){
      return next();
    }
  }
  return response.status(constants.ERROR_CODES.UNAUTHORIZED).send({
    success: false,
    message: constants.MESSAGES.UNAUTHORISED
  });
};
module.exports = {verifyToken,systemUser }
