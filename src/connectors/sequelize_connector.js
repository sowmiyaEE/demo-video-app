const Sequelize = require('sequelize');
const config = require('config');
const seqInstance = new Sequelize(
    config.get('DATABASE.NAME'),
    config.get('DATABASE.USER'),
    config.get('DATABASE.PASSWORD'),
    {
      host: config.get('DATABASE.HOST'),
      port: config.get('DATABASE.PORT'),
      dialect: config.get('DATABASE.DB_DIALECT'),
      // timezone: process.env.TIME_ZONE,
      freezeTableName: false,
      benchmark: false,
      logging: (...msg) => console.log(msg),
      pool: {
        max: 5,
        min: 0,
        idle: 10000,
        acquire: 30000,
      },
    }
  );
//  console.log(seqInstance.authenticate());
if (config.get('DATABASE.DEBUG') ) {
    seqInstance
      .authenticate()
      .then((r) => {
        console.log('Connection has been established successfully.');
      })
      .catch((error) => {
        console.log('Unable to connect to the database:', error);
        throw error;
      });
}
module.exports = seqInstance;
