const Sequelize = require('sequelize');
const config = require('../config/config.json');

const sequelize = new Sequelize(config.development);

const Producto = require('./producto');
const Categoria = require('./categoria');
const Usuario = require('./usuario');
const Carrito = require('./carrito');
const CartItem = require('./productoCarrito');
const Orders = require('./pedido');
const OrderItem = require('./productoPedido');

// Establecer las relaciones aquí

// Relaciones existentes
Producto.belongsTo(Categoria);
Categoria.hasMany(Producto);

// Nuevas Relaciones
Usuario.hasMany(Orders);
Orders.belongsTo(Usuario); // Aquí estaba "Order", lo cambié a "Orders"

Usuario.hasOne(Carrito);
Carrito.belongsTo(Usuario);

Carrito.hasMany(CartItem);
CartItem.belongsTo(Carrito);

Orders.hasMany(OrderItem); // Aquí estaba "Pedido", lo cambié a "Orders"
OrderItem.belongsTo(Orders); // Aquí estaba "Pedido", lo cambié a "Orders"

Producto.belongsToMany(Carrito, { through: CartItem });
Carrito.belongsToMany(Producto, { through: CartItem });

Producto.belongsToMany(Orders, { through: OrderItem });
Orders.belongsToMany(Producto, { through: OrderItem }); // Aquí estaba "Order", lo cambié a "Orders"

// Exportar modelos y sequelize
module.exports = {
    Producto,
    Categoria,
    Usuario,
    Carrito,
    CartItem,
    Orders,   // Aquí estaba "Pedido", lo cambié a "Orders"
    OrderItem,
    sequelize
};

