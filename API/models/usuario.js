const Sequelize = require('sequelize');
const { DataTypes, Model } = require('sequelize');
const config = require('../config/config.json');
const sequelize = new Sequelize(config.development);

class User extends Model {}

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: { // Actualizado a "username"
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'cliente'
    }
}, {
    sequelize,
    modelName: 'User',
    timestamps: false
});

module.exports = User;

