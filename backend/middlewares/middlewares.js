const jwt = require('jsonwebtoken');

function verifyAdmin(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).send('Token no proporcionado.');

    jwt.verify(token, 'yourSecretKey', (err, decoded) => {
        if (err) return res.status(500).send('Error al autenticar el token.');
        
        // Verifica si el rol es de administrador
        if (decoded.rol !== 'admin') return res.status(403).send('No autorizado.');

        next(); // Si todo está bien, pasa al siguiente middleware o ruta
    });
}

// Luego, usa el middleware en las rutas que quieras proteger:
router.post('/agregarProducto', verifyAdmin, (req, res) => {
    // Lógica para agregar producto...
});
