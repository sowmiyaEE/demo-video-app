const Sequelize = require("sequelize");
module.exports = (sequelize) => {
  const User =  sequelize.define("user", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    role: {
        type: Sequelize.STRING,
        references: {
          model: 'roles',
          key: 'code'
        }
    },
    first_name: {
        type: Sequelize.STRING(40),
        allowNull: false
    },
    last_name: {
        type: Sequelize.STRING(40),
        allowNull: false
    },
    code: {
        type: Sequelize.STRING(40),
        allowNull: false
    },
    email: {
        type: Sequelize.STRING(200),
        allowNull: false
    },
    password: {
        type: Sequelize.STRING(200),
        allowNull: false
    },
    otp: {
        type: Sequelize.STRING(8),
        allowNull: false
    },
    status: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    phone_number: {
        type: Sequelize.STRING(12),
        allowNull: false
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
return User;
}
