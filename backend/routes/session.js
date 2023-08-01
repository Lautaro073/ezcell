const express = require('express');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

router.get('/start-session', (req, res) => {
    const sessionId = uuidv4();
    console.log('Generando nuevo sessionId:', sessionId);  // Generar un UUID único.
    res.json({ sessionId });
});
// Crear un carrito y retornar el id_carrito generado
router.post("/crear", async (req, res) => {
    try {
        const id_carrito = uuidv4();
        await db.query("INSERT INTO Carrito (id_carrito) VALUES (?)", [id_carrito]);
        res.json({ id_carrito });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al crear un nuevo carrito");
    }
});
module.exports = router;
