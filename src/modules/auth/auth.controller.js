const constants = require("../../utils/constants");
const {createToken} = require("../../utils/utils.js");
const validate = require("../../validators/userValidators");
const UserService = require("../../services/user.service");
const SubscriptionService = require("../../services/subscription.service");

const login = async(request, response) => {
    try {
      const requestData = request.body;
      const validateRequest= validate("loginUser", requestData);
      if(validateRequest) {
          return response.status(constants.ERROR_CODES.VALIDATION_ERROR).send({
            success: false,
            error: validateRequest
          })
      }
      const user = await UserService.findOne({
        email: requestData.email
      });
      if(!user){
        return response.status(constants.ERROR_CODES.VALIDATION_ERROR).send({
          success: false,
          message: constants.MESSAGES.USERS.EMAIL_NOT_FOUND
        })
      }
      if(user.password !== requestData.password ){
        return response.status(constants.ERROR_CODES.VALIDATION_ERROR).send({
          success: false,
          message: constants.MESSAGES.USERS.INCORRECT_PASSWORD
        })
      }
      const userSubscription = await SubscriptionService.findOne({user_id: user.id});
      let planDetails = {};
      if(userSubscription) {
        planDetails = {
          plan_code: userSubscription.plan_code,
          expiry: userSubscription.expiry
        }
      }
      user.userSubscription = planDetails;
      const token = createToken(
        {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            role: user.role,
            plan: planDetails
        }    
      );
      delete user.password;
      return response.status(constants.CODES.SUCCESS).send({
        success: true,
        message: constants.MESSAGES.USERS.LOGIN_SUCCESSFUL,
        data: user,
        token: token
      })
    }
    catch(error){
      return response.status(constants.ERROR_CODES.SOMETHING_WENT_WRONG).send({
        success: false,
        message: error.message
      })
    }
};
module.exports = {
    login
}
