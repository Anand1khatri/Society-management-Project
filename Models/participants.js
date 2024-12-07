const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Competitions = require('./Competition');


const Participant = sequelize.define('Participant', {
  participant_id: {
    type: DataTypes.STRING,
    primaryKey: true,
    // autoIncrement: true
  },
  participant_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  
  participant_phone: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  participant_email: {
    type: DataTypes.STRING,
    allowNull: false
  },

  competition_id: {
    type: DataTypes.STRING,
    references: {
      model: 'Competitions',
      key: 'competition_id'
    },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
  },
},{
  tableName: 'comp_part', // Explicitly specify the table name
  timestamps: false, // If your table doesn't have createdAt and updatedAt columns
});
module.exports = Participant;
