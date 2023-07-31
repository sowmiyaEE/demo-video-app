const Sequelize = require("sequelize");
module.exports = (sequelize) => {
  const Role =  sequelize.define("role", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    role: {
        type: Sequelize.ENUM('system','public_user'),
        allowNull: false
    },
    code: {
        type: Sequelize.STRING,
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
    indexes: [
      {
        unique: true,
        fields: ['code'],
      }
    ]
  });
return Role;
}
