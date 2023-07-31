const Sequelize = require("sequelize");
module.exports = (sequelize) => {
  const Plan =  sequelize.define("plan", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    plan_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    plan_code: {
        type: Sequelize.STRING
    },
    days: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    description: {
       type: Sequelize.STRING,
       allowNull: false   
    },
    plan_price: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
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
    indexes: [{
      fields: ['plan_code'],
      unique: true
    }]
  });
return Plan;
}
