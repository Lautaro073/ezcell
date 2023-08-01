const express = require("express");
const categoriasController = require("../controller/categoriasController");
const authMiddleware = require("../middlewares/authMiddleware"); // Asegúrate de que la ruta sea correcta

const router = express.Router();

// GET (sin autenticación)
router.get("/", categoriasController.obtenerCategorias);

// POST (con autenticación)
router.post("/", authMiddleware, categoriasController.crearCategoria);

// PUT (con autenticación)
router.put("/:id", authMiddleware, categoriasController.actualizarCategoria);

// DELETE (con autenticación)
router.delete("/:id", authMiddleware, categoriasController.eliminarCategoria);

module.exports = router;
