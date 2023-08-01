const express = require("express");
const productosController = require("../controller/productosController");


const router = express.Router();

// GET (sin autenticación)
router.get("/", productosController.obtenerProductos);

// POST (con autenticación)
router.post("/", productosController.crearProducto);

// PUT (con autenticación)
router.put("/:id", productosController.actualizarProducto);

// DELETE (con autenticación)
router.delete("/:id", productosController.eliminarProducto);

module.exports = router;
