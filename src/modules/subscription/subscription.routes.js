const Router = require("express").Router();
const controller = require("./subscription.controller");
Router.post('/new', controller.newSubscription);
Router.get("/get-videos", controller.getPlanVideos)
module.exports = Router;
