const {models} = require("../models");
class user {
  static async create(data){
      try{
        return await models.plans.create(data);
      }
      catch(error) {
        console.log(error);
        throw error;
      }
    }
    static async findOne(cond) {
        try {
          return await models.plans.findOne({
            where: cond,
            raw: true
          });
        } catch (error) {
            throw error;
        }
    }
    static async findAll(cond) {
        try {
          return await models.plans.findAll({
            where: cond,
            raw: true
          });
        } catch (error) {
            throw error;
        }
    }
    static async update(data,cond) {
        try {
          return await models.plans.update(data, {
            where: cond
          });
        } catch (error) {
            throw error;
        }
    }
     static async delete(cond) {
        try {
          return await models.plans.destroy( {
            where: cond
          });
        } catch (error) {
            throw error;
        }
    }
}
module.exports = user;
