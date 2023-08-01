const express = require("express");
const cartItemsController = require("../controller/pedidoCarritoController");
const authMiddleware = require("../middlewares/authMiddleware"); // Asegúrate de que la ruta sea correcta

const router = express.Router();

// GET (sin autenticación)
router.get("/", cartItemsController.obtenerCartItems);

// POST (con autenticación)
router.post("/", authMiddleware, cartItemsController.crearCartItem);

// PUT (con autenticación)
router.put("/:id", authMiddleware, cartItemsController.actualizarCartItem);

// DELETE (con autenticación)
router.delete("/:id", authMiddleware, cartItemsController.eliminarCartItem);

module.exports = router;
