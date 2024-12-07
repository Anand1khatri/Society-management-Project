const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const events = require('./events');

const Competition = sequelize.define('Competition', {
  competition_id: {
    type: DataTypes.STRING,
    primaryKey: true,
    //autoIncrement: true
  },
  competition_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  competition_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  competition_fee: {
    type: DataTypes.STRING,
    allowNull: false
  },
  competition_description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  event_event_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'events',
      key: 'event_id'
    },
    onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
  },
},{
  tableName: 'competition', // Explicitly specify the table name
  timestamps: false, // If your table doesn't have createdAt and updatedAt columns
});

module.exports = Competition;
