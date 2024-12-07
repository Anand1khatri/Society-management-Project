const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Event = require('./events');


const attendees = sequelize.define('attendees', {
  attendee_id: {
    type: DataTypes.STRING,
    primaryKey: true,
    // autoIncrement: true
  },
  event_id: {
    type: DataTypes.STRING,
    allowNull: false,

    references: {
        model: 'Event',
        key: 'event_id'
      },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    
  },
  
  attendee_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  attendee_phone: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  attendee_email: {
    type: DataTypes.STRING,
  },
},{
  tableName: 'eventattendee', // Explicitly specify the table name
  timestamps: false, // If your table doesn't have createdAt and updatedAt columns
});
module.exports = attendees;
