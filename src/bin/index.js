const express = require('express');
const config = require('config');
const cors = require("cors");
const morgan = require('morgan');
const connection = require('../connectors/sequelize_connector');
const {connect} = require('../models');
connect(connection);
const fs =  require("fs");
//connection.sync();
const {initialize} = require('../connectors/initialize_routes');
let app = express();
app.use(cors({ origin: '*' }));
app.use(
  express.urlencoded({extended: true})
);
app.use(express.json());
app.use(morgan('dev'));
initialize(app);


fs.realpath( __dirname+ '../../../'+config.get('VIDEO_FOLDER'), (error, resolvedPath) => {
  if (error) {
    console.log(error);
  }
  else {
    console.log(resolvedPath);
    app.use(express.static(resolvedPath));       
  }
});

app.listen(config.get('PORT'), () => {
  console.log(`Server Running on ${config.get('PORT')}`);
});
