const { Producto } = require('../models');

// Crear un nuevo producto
exports.crearProducto = async (req, res) => {
    try {
        const producto = await Producto.create(req.body);
        res.status(201).send(producto);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Leer todos los productos
exports.obtenerProductos = async (req, res) => {
    try {
        const productos = await Producto.findAll();
        res.send(productos);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Actualizar un producto por ID
exports.actualizarProducto = async (req, res) => {
    try {
        await Producto.update(req.body, { where: { id: req.params.id } });
        res.send({ message: 'Producto actualizado con éxito.' });
    } catch (error) {
        res.status(500).send(error);
    }
};

// Eliminar un producto por ID
exports.eliminarProducto = async (req, res) => {
    try {
        await Producto.destroy({ where: { id: req.params.id } });
        res.send({ message: 'Producto eliminado con éxito.' });
    } catch (error) {
        res.status(500).send(error);
    }
};
