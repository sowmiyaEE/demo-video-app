const Sequelize = require("sequelize");
module.exports = (sequelize) => {
  const Subscription =  sequelize.define("subscription", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    plan_code: {
        type: Sequelize.STRING,
        allowNull: false
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    expiry: {
        type: Sequelize.DATE,
        allowNull: false
    },
    startDate: {
        type: Sequelize.DATE,
        allowNull: true
    },
    is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
  },
  {
    timestamps: true
  });
return Subscription;
}
