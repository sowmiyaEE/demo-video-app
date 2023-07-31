const {verifyToken,systemUser } = require("../middlewares/authorization/auth.middleware")

const userRegisterRoute = require("../modules/registration/registration.routes");
const signInRoute = require("../modules/auth/auth.routes");
const planRoute = require("../modules/plans/plan.routes")
const subscriptionRoute = require("../modules/subscription/subscription.routes")
const uploadRoute = require("../modules/upload/upload.routes");
const initialize = (app) => {
  try{
    app.use('/api/register',userRegisterRoute);
    app.use('/api/login', signInRoute);
    app.use('/api/plan',verifyToken, systemUser , planRoute);
    app.use('/api/subscription', verifyToken, subscriptionRoute);
    app.use('/api/upload', verifyToken, systemUser,uploadRoute);
  }
  catch(error){
    throw error;
  }
}
module.exports= {initialize};
