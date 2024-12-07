const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db'); // Your Sequelize instance

const Society = sequelize.define('Society', {
    society_id: {
        type: DataTypes.STRING,
        primaryKey: true,   
    },
    society_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    society_description: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'society', // Ensure this matches your DB table name
    timestamps: false
});

module.exports = Society;
