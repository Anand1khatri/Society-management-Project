const crypto = require('crypto');
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db'); // Adjust to your actual path

const User = sequelize.define('User', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('student', 'admin', 'society_manager'),
        defaultValue: 'student'
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true
    },
}, {
    tableName: 'users',
    timestamps: false
});

// Generate a derived salt and hash the password before creating a new user
User.beforeCreate(async (user) => {
    const salt = crypto.createHash('sha256').update(user.email || user.username).digest('hex'); // Derive salt
    const hashedPassword = crypto
        .pbkdf2Sync(user.password, salt, 1000, 64, 'sha256')
        .toString('hex');

    user.password = hashedPassword;
});

// Hash the password before updating a user
User.beforeUpdate(async (user) => {
    if (user.password) {
        const salt = crypto.createHash('sha256').update(user.email || user.username).digest('hex'); // Derive salt
        const hashedPassword = crypto
            .pbkdf2Sync(user.password, salt, 1000, 64, 'sha256')
            .toString('hex');

        user.password = hashedPassword;
    }
});

// Instance method to compare passwords
User.prototype.comparePassword = function (password) {
    const salt = crypto.createHash('sha256').update(this.email || this.username).digest('hex'); // Derive salt
    const hashedPassword = crypto
        .pbkdf2Sync(password, salt, 1000, 64, 'sha256')
        .toString('hex');
    return this.password === hashedPassword;
};

module.exports = User;
