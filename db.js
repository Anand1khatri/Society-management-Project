// db.js
const { Sequelize } = require('sequelize');

// Set up your Sequelize connection here
const sequelize = new Sequelize('society_management', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',  // or 'postgres', 'sqlite', etc. depending on your database
});

module.exports = sequelize;
