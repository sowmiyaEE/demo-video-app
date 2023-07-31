const Sequelize = require("sequelize");
module.exports = (sequelize) => {
  const Video =  sequelize.define("video", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    video_url: {
        type: Sequelize.STRING,
    },
    video_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    plan_code: {
        type: Sequelize.STRING(40),
        allowNull: false
    },
    size: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    is_active: {
        type: Sequelize.TINYINT(1),
        allowNull: false,
        defaultValue: 1
    },
    created_by: {
        type: Sequelize.INTEGER
    },
    updated_by: {
        type: Sequelize.INTEGER
    }
  },
  {
    timestamps: true,
  });
return Video;
}
