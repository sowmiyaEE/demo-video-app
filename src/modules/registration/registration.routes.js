const Router = require("express").Router();
const controller = require("./registration.controller");
Router.post("/register-user", controller.registerUser);
module.exports = Router;