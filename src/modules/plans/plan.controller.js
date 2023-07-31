const PlanService = require("../../services/plan.service");
const constants = require("../../utils/constants");
const validate = require("../../validators/adminValidators");
const config = require("config");
const sequelize = require("sequelize");
const {createFolder} = require("../../utils/utils");

const createPlan = async(request, response) => {
  try {
    const requestData = request.body;
    const validRequest = validate( 'createPlan', requestData);
    if(validRequest){
      return response.status(constants.ERROR_CODES.VALIDATION_ERROR).send({
        success: false,
        message: constants.MESSAGES.VALIDATION_ERROR,
        error: validRequest
      });
    }
    const planCode = requestData.plan_code.split(" ").join("_").toUpperCase();
    let plan = await PlanService.findOne({[sequelize.Op.or]:[
      {plan_name: requestData.plan_name},
      {plan_code: planCode}
    ]});
    if(plan){
      return response.status(constants.ERROR_CODES.VALIDATION_ERROR).send({
        success: false,
        message: constants.MESSAGES.PLANS.DUPLICATE_ENTRY,
        data: plan
      })
    }
    requestData.createdBy= request.user.id;
    requestData.plan_code = planCode;
    plan = await PlanService.create(requestData);
    createFolder(config.get("VIDEO_FOLDER") + '/'+plan.plan_code);
    return response.status(constants.CODES.SUCCESS).send({
      success: true,
      message: constants.MESSAGES.PLANS.PLAN_CREATED,
      data: plan
    });    
  }
  catch(error) {
    return response.status(constants.ERROR_CODES.SOMETHING_WENT_WRONG).send({
      success: false,
      message: constants.MESSAGES.SOMETHING_WENT_WRONG,
      error: error.message
    });
  }
};
const updatePlan = async(request, response) => {
  try {
    const requestData = request.body;
    const validRequest = validate('updatePlan', requestData);
    if(validRequest){
      return response.status(constants.ERROR_CODES.VALIDATION_ERROR).send({
        success: false,
        message: constants.MESSAGES.VALIDATION_ERROR,
        error: validRequest
      });
    }
    let plan = await PlanService.findOne({id: requestData.id});
    if(!plan){
      return response.status(constants.ERROR_CODES.VALIDATION_ERROR).send({
        success: false,
        message: constants.MESSAGES.PLANS.PLAN_NOT_FOUND
      })
    }
    requestData.updatedBy= request.user.id;
    plan = await PlanService.update(requestData, {id: requestData.id});
    return response.status(constants.CODES.SUCCESS).send({
      success: true,
      message: constants.MESSAGES.PLANS.PLAN_UPDATED,
      data: plan
    });    
  }
  catch(error) {
   return response.status(constants.ERROR_CODES.SOMETHING_WENT_WRONG).send({
      success: false,
      message: constants.MESSAGES.SOMETHING_WENT_WRONG,
      error: error.message
    });
  }
};

const getPlans = async(request, response) => {
  try {
    let plan = await PlanService.findAll();
    return response.status(constants.CODES.SUCCESS).send({
      success: true,
      message: constants.MESSAGES.SUCCESS,
      data: plan
    });    
  }
  catch(error) {
   return response.status(constants.ERROR_CODES.SOMETHING_WENT_WRONG).send({
      success: false,
      message: constants.MESSAGES.SOMETHING_WENT_WRONG,
      error: error.message
    });
  }
};

const removePlan = async(request, response) => {
  try {
    const requestData = request.query;
    const validRequest = validate('removePlan', requestData);
    if(validRequest){
      return response.status(constants.ERROR_CODES.VALIDATION_ERROR).send({
        success: false,
        message: constants.MESSAGES.VALIDATION_ERROR,
        error: validRequest
      });
    }
    let plan = await PlanService.delete({id: requestData.id});
    return response.status(constants.CODES.SUCCESS).send({
      success: true,
      message: constants.MESSAGES.PLANS.PLAN_DELETED,
      data: plan
    });    
  }
  catch(error) {
   return response.status(constants.ERROR_CODES.SOMETHING_WENT_WRONG).send({
      success: false,
      message: constants.MESSAGES.SOMETHING_WENT_WRONG,
      error: error.message
    });
  }
};
module.exports = {createPlan, updatePlan, getPlans, removePlan };
