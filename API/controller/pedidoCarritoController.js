const { CartItem } = require('../models');

exports.crearCartItem = async (req, res) => {
    try {
        const cartItem = await CartItem.create(req.body);
        res.status(201).send(cartItem);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.obtenerCartItems = async (req, res) => {
    try {
        const cartItems = await CartItem.findAll();
        res.send(cartItems);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.actualizarCartItem = async (req, res) => {
    try {
        await CartItem.update(req.body, { where: { id: req.params.id } });
        res.send({ message: 'Producto del carrito actualizado con éxito.' });
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.eliminarCartItem = async (req, res) => {
    try {
        await CartItem.destroy({ where: { id: req.params.id } });
        res.send({ message: 'Producto del carrito eliminado con éxito.' });
    } catch (error) {
        res.status(500).send(error);
    }
};
