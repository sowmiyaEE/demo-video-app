const {models} = require("../models");
class user {
  static async create(data){
      try{
        return await models.users.create(data);
      }
      catch(error) {
        console.log(error);
        throw error;
      }
    }
    static async findOne(cond) {
        try {
          return await models.users.findOne({
            where: cond,
            raw: true
          });
        } catch (error) {
            throw error;
        }
    }
}
module.exports = user;
