const { Sequelize } = require('sequelize');

// Initialize Sequelize
const sequelize = new Sequelize('society_management', 'root', '', {
  host: 'localhost',
  dialect: 'mysql', 
});

// Test the connection
sequelize
  .authenticate()
  .then(() => console.log('Database connected successfully!'))
  .catch((error) => console.error('Unable to connect to the database:', error));

module.exports = sequelize;
