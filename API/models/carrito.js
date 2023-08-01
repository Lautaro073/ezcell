// models/Cart.js
const Sequelize = require('sequelize');

const { Model, DataTypes } = require('sequelize');
const config = require('../config/config.json');
const sequelize = new Sequelize(config.development);  
class Cart extends Model {}

Cart.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
}, {
    sequelize,
    modelName: 'cart'
});

module.exports = Cart;
