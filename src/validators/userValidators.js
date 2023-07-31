const Joi = require("joi");
const userSchemas = {
    createUser: {
      first_name: Joi.required(),
      last_name: Joi.required(),
      email: Joi.required(),
      password: Joi.required(),
      phone_number: Joi.required()
    },
    loginUser: {
      email: Joi.required(),
      password: Joi.required()
    },
    addSubscription: {
      plan_id: Joi.required(),
      user_id: Joi.required()
    }
};
const validateObject = (type, object) => {
    return objectValidation(userSchemas[type], object);
}
const objectValidation = (schema, object)=> {
  const isValid = Joi.object().keys(schema).validate(object);
  if (isValid.hasOwnProperty('error')) {
    return isValid.error;
  }
  return false;
}
module.exports = validateObject
