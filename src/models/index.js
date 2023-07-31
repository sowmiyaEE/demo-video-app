const User = require("./user.model");
const Role = require("./role.model");
const Plan = require("./plan.model");
const Subscription = require("./subscription.model");
const Video = require("./video.model");
class connection {
  static models = {};
  static connect = (con) => { 
    this.models.roles = Role(con);
    this.models.users= User(con);
    this.models.plans = Plan(con);
    this.models.subscriptions = Subscription(con);
    this.models.videos = Video(con);
   }
}
module.exports = {
  models: connection.models,
  connect: connection.connect
}
