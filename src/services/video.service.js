const {models} = require("../models");
class video {
  static async create(data){
      try{
        return await models.videos.create(data);
      }
      catch(error) {
        console.log(error);
        throw error;
      }
    }
    static async findOne(cond) {
        try {
          return await models.videos.findOne({
            where: cond,
            raw: true
          });
        } catch (error) {
            throw error;
        }
    }
     static async findAll(cond) {
        try {
          return await models.videos.findAll({
            where: cond,
            raw: true
          });
        } catch (error) {
            throw error;
        }
    }
}
module.exports = video;
