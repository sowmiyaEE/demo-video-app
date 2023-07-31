const Router = require("express").Router();
const controller = require("./auth.controller");
Router.post("/login", controller.login);
module.exports = Router;