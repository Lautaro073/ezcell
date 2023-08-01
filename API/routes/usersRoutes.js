const express = require("express");
const usersController = require("../controller/usersController");

const router = express.Router();

// POST para crear un usuario (no necesita autenticación)
router.post("/createUser", usersController.createUser);

// POST para iniciar sesión (no necesita autenticación)
router.post("/login", usersController.login);

module.exports = router;
