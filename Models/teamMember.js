const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Society = require('./societies');


const Members = sequelize.define('Members', {
  member_id: {
    type: DataTypes.STRING,
    primaryKey: true,
    // autoIncrement: true
  },
  roll_no: {
    type: DataTypes.STRING,
    allowNull: false
  },
  
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  position: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Department: {
    type: DataTypes.STRING,
    allowNull: false
  },

  society_id: {
    type: DataTypes.STRING,
    references: {
      model: 'Society',
      key: 'society_id'
    },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
  },
},{
  tableName: 'team_member', // Explicitly specify the table name
  timestamps: false, // If your table doesn't have createdAt and updatedAt columns
});
module.exports = Members;
