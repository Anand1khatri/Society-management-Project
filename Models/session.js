
const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Session = sequelize.define('Session', {
  sid: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  expires: {
    type: DataTypes.DATE,
  },
  data: {
    type: DataTypes.STRING,
  },
});

module.exports = Session;
