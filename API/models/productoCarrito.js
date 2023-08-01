// models/CartItems.js
const Sequelize = require('sequelize');
const { Model, DataTypes } = require('sequelize');
const config = require('../config/config.json');
const sequelize = new Sequelize(config.development);  



class CartItems extends Model {}

CartItems.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'cartItem'
});

module.exports = CartItems;
