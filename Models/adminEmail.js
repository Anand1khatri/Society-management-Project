const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db'); // Adjust to your actual path

const AdminEmail = sequelize.define('AdminEmail', {
  email: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
}
}, 
{
  tableName: 'admin_emails',
  timestamps: false // Disable timestamps for this table
});

module.exports = AdminEmail;
