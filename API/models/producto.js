// models/producto.js
const Sequelize = require('sequelize');
const { Model, DataTypes } = require('sequelize');
const config = require('../config/config.json');
const sequelize = new Sequelize(config.development);  

class Producto extends Model {}

Producto.init({
  nombre: DataTypes.STRING,
  descripcion: DataTypes.STRING,
  precio: DataTypes.FLOAT,
  imagenURL: DataTypes.STRING,
  categoriaId: DataTypes.INTEGER
}, { sequelize, modelName: 'producto' });

module.exports = Producto;
