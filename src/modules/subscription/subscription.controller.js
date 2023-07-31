const moment = require("moment");
const config = require("config");
const constants = require("../../utils/constants");
const validateObject = require("../../validators/userValidators");
const PlanService= require("../../services/plan.service")
const SubscriptionService = require("../../services/subscription.service");
const  {getContents} = require("../../utils/utils");
const newSubscription = async(request, response) => {
  try {
    const requestData = request.body;
    const validRequest = validateObject( 'addSubscription', requestData) ;
    if(validRequest) {
      return response.status(constants.ERROR_CODES.VALIDATION_ERROR).send({
        success: false,
        error: validRequest,
        message: constants.MESSAGES.VALIDATION_ERROR
      });
    }
    const plan = await PlanService.findOne({ id: requestData.plan_id });
    if(!plan){
      return response.status(constants.ERROR_CODES.VALIDATION_ERROR).send({
        success: false,
        message: constants.MESSAGES.PLANS.PLAN_NOT_FOUND
      })
    }
    const userSubscription = await SubscriptionService.findOne({
      user_id: request.user.id
    });
    let expiry = moment(new Date());
    if(userSubscription) {
      const previousExpiry = moment(userSubscription.expiry);
      expiry = (previousExpiry.diff(expiry) < 0)? previousExpiry.add(plan.days,'days') : expiry.add(plan.days,'days');
    }
    else{
      expiry = expiry.add(plan.days,'days');
    }
    let Subscription= {
      plan_code : plan.plan_code,
      expiry : expiry,
      startDate: new Date(),
      user_id: requestData.user_id
    };
    if(!userSubscription) {
      await SubscriptionService.create(Subscription);
    }
    else {
      await SubscriptionService.update(Subscription, {id: userSubscription.id});
    }
    return response.status(constants.CODES.SUCCESS).send({
      success: true,
      message: constants.MESSAGES.SUCCESS,
      data: Subscription
    });
  }
  catch(error) {
    return response.status(constants.ERROR_CODES.SOMETHING_WENT_WRONG).send({
      success: false,
      error: error.message
    });
  }
};
const getPlanVideos = (request, response) => {
  try{
    const Plan = request.user.plan;
    if(!Plan){
      return  response.status(constants.ERROR_CODES.FORBIDDEN).send({});
    }
    const videos = getContents(config.get('VIDEO_FOLDER')+'/'+Plan.plan_code);
    let result = [];
    
    console.log(videos)
    for( let v of videos) {
      result.push(`${config.get("VIDEO_URL")}/${Plan.plan_code}/${v}`);
    }
    return response.status(constants.CODES.SUCCESS).send({
      success: true,
      data: result
    })
  }
  catch(error){
   return response.status(constants.ERROR_CODES.SOMETHING_WENT_WRONG).send({
      success: false,
      error: error.message
    });
  }
};
module.exports= {newSubscription, getPlanVideos};
