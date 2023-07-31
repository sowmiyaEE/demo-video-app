const Router = require("express").Router();
const controller = require("./plan.controller");
Router.post("/add-plan", controller.createPlan);
Router.put("/plan-details", controller.updatePlan);
Router.get("/get-all", controller.getPlans);
Router.delete("/remove-plan", controller.removePlan);
module.exports = Router;
