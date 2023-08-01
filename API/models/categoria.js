// models/categoria.js
const Sequelize = require('sequelize');
const { Model, DataTypes } = require('sequelize');
const config = require('../config/config.json');
const sequelize = new Sequelize(config.development);  


class Categoria extends Model {}

Categoria.init({
  name: DataTypes.STRING,
}, { sequelize, modelName: 'categoria' });

module.exports = Categoria;
