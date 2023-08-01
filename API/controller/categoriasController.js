const { Categoria } = require('../models');

exports.crearCategoria = (req, res) => {
  Categoria.create(req.body)
    .then(categoria => res.status(201).send(categoria))
    .catch(error => res.status(500).send(error));
};

exports.obtenerCategorias = (req, res) => {
  Categoria.findAll()
    .then(categorias => res.send(categorias))
    .catch(error => res.status(500).send(error));
};

exports.actualizarCategoria = (req, res) => {
  Categoria.update(req.body, { where: { id: req.params.id } })
    .then(() => res.send({ message: 'Categoría actualizada con éxito.' }))
    .catch(error => res.status(500).send(error));
};

exports.eliminarCategoria = (req, res) => {
  Categoria.destroy({ where: { id: req.params.id } })
    .then(() => res.send({ message: 'Categoría eliminada con éxito.' }))
    .catch(error => res.status(500).send(error));
};
