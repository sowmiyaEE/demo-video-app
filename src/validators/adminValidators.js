const Joi = require("joi");
const adminSchemas = {
    createPlan: {
      plan_name: Joi.required(),
      plan_price: Joi.required(),
      description: Joi.required(),
      plan_code: Joi.required(),
      days: Joi.required()
    },
    updatePlan: {
      id: Joi.required(),
      plan_name: Joi.required(),
      plan_price: Joi.required(),
      description: Joi.required(),
      plan_code: Joi.required(),
      days: Joi.required()
    },
    removePlan: {
      id: Joi.required()
    }
};
const validateObject = (type, object) => {
    return objectValidation(adminSchemas[type], object);
}
const objectValidation = (schema, object)=> {
  const isValid = Joi.object().keys(schema).validate(object);
  if (isValid.hasOwnProperty('error')) {
    return isValid.error;
  }
  return false;
}
module.exports = validateObject
