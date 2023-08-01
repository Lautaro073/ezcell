const express = require("express");
const ordersController = require("../controller/pedidoController");
const authMiddleware = require("../middlewares/authMiddleware"); // Asegúrate de que la ruta sea correcta

const router = express.Router();

// GET (sin autenticación)
router.get("/", ordersController.obtenerOrders);

// POST (con autenticación)
router.post("/", authMiddleware, ordersController.crearOrder);

// PUT (con autenticación)
router.put("/:id", authMiddleware, ordersController.actualizarOrder);

// DELETE (con autenticación)
router.delete("/:id", authMiddleware, ordersController.eliminarOrder);

module.exports = router;
