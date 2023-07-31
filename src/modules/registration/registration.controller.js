const constants = require("../../utils/constants");
const {createToken} = require("../../utils/utils.js");
const validate = require("../../validators/userValidators");
const UserService = require("../../services/user.service");
const registerUser = async(request, response) => {
  try{
    const requestData = request.body;
    const validateRequest= validate( "createUser",requestData);
    if(validateRequest) {
        return response.status(constants.ERROR_CODES.VALIDATION_ERROR).send({
          success: false,
          error: validateRequest
        })
    }
    const user = await UserService.findOne({
      email: requestData.email
    });
    if(user){
      return response.status(constants.ERROR_CODES.VALIDATION_ERROR).send({
        success: false,
        message: constants.MESSAGES.USERS.EMAIL_ALREADY_EXISTS
      });
    }
    requestData.otp = 1234;
    requestData.role = constants.ROLES.USER;
    requestData.status = 'active';
    requestData.code = 'VDA'+ parseInt(Math.random()*10000);
    const userCreated = await UserService.create(requestData);
    const token = createToken({
      id: userCreated.id,
      first_name: userCreated.first_name,
      last_name: userCreated.last_name,
      role: userCreated.role    
    });
    delete userCreated.password;
    return response.status(constants.CODES.SUCCESS).send({
      success: true,
      message: constants.MESSAGES.USERS.USER_CREATE_SUCCESS,
      data:userCreated ,
      token: token
    })
  }
  catch(error){
    return response.status(constants.ERROR_CODES.SOMETHING_WENT_WRONG).send({
      success: false,
      message: error.message
    })
  }
}

module.exports = {
    registerUser
}
