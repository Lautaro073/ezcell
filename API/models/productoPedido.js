// models/OrderItems.js
const Sequelize = require('sequelize');
const { Model, DataTypes } = require('sequelize');
const config = require('../config/config.json');
const sequelize = new Sequelize(config.development); 


class OrderItems extends Model {}

OrderItems.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    priceAtPurchase: {
        type: DataTypes.FLOAT,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'orderItem'
});

module.exports = OrderItems;
