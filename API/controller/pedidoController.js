const { Order } = require('../models');

exports.crearOrder = async (req, res) => {
    try {
        const order = await Order.create(req.body);
        res.status(201).send(order);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.obtenerOrders = async (req, res) => {
    try {
        const orders = await Order.findAll();
        res.send(orders);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.actualizarOrder = async (req, res) => {
    try {
        await Order.update(req.body, { where: { id: req.params.id } });
        res.send({ message: 'Pedido actualizado con éxito.' });
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.eliminarOrder = async (req, res) => {
    try {
        await Order.destroy({ where: { id: req.params.id } });
        res.send({ message: 'Pedido eliminado con éxito.' });
    } catch (error) {
        res.status(500).send(error);
    }
};
