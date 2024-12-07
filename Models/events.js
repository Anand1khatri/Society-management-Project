const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db'); 
const Society = require('./societies');


const Event = sequelize.define('Event', {
  event_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
  },
  event_name: {
      type: DataTypes.STRING,
      allowNull: false,
  },
  event_date: {
      type: DataTypes.DATE,
      allowNull: false,
  },
  event_fee: {
      type: DataTypes.INTEGER,
      allowNull: true,
  },
  event_description: {
      type: DataTypes.TEXT,
      allowNull: false,
  },
  society_sid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
          model: Society,
          key: 'society_id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
  },
}, {
  tableName: 'event', // Explicitly specify the table name
  timestamps: false, // If your table doesn't have createdAt and updatedAt columns
});

module.exports = Event;
