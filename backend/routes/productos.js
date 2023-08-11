const express = require('express');
const db = require('../database');
const path = require('path');
const router = express.Router();


router.get('/:id/stock', async (req, res) => {
    const productoId = req.params.id;


    try {
        const [rows] = await db.query("SELECT stock FROM Productos WHERE id_producto = ?", [productoId]);
        if (rows.length > 0) {
            res.json({ stock: rows[0].stock });
        } else {
            res.status(404).json({ error: "Producto no encontrado" });
        }
    } catch (error) {
        console.error("Error fetching stock:", error);
        res.status(500).json({ error: "Error fetching stock" });
    }
});
// Obtener todos los productos
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM Productos');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los productos');
    }
});

// Búsqueda de productos por término
router.get('/search', async (req, res) => {
    const searchTerm = req.query.search;
    if (!searchTerm) {
        return res.status(400).json({ error: "Debe proporcionar un término de búsqueda." });
    }
    try {
        const [rows] = await db.query('SELECT * FROM Productos WHERE nombre LIKE ?', [`%${searchTerm}%`]);
        res.json(rows);
    } catch (error) {
        console.error("Error en la búsqueda:", error);
        res.status(500).send('Error al buscar los productos');
    }
});


// Obtener un producto por ID
router.get('/:id', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM Productos WHERE id_producto = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).send('Producto no encontrado');
        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener el producto');
    }
});
// Agregar un nuevo producto
router.post('/', async (req, res) => {
    try {
        const { nombre, descripcion, precio, id_categoria, stock } = req.body;

        if (!req.files || !req.files.imagen) {
            return res.status(400).send('No se subió el archivo de imagen.');
        }

        let uploadedFile = req.files.imagen;
        const fileTypes = /jpeg|jpg|png|gif/;
        const mimetype = fileTypes.test(uploadedFile.mimetype);

        if (!mimetype) {
            return res.status(400).send('Formato de archivo no permitido.');
        }

        const absolutePath = path.join(__dirname, '../../public/assets/imgProductos', uploadedFile.name);
        // Ajuste: eliminamos el /public del inicio
        const relativePath = '/assets/imgProductos/' + uploadedFile.name; 
        
        console.log("Ruta absoluta:", absolutePath);
        console.log("Ruta relativa:", relativePath);
       
        uploadedFile.mv(absolutePath, async (err) => {
            if (err) return res.status(500).send(err);
        
            // Usa la ruta relativa ajustada cuando guardas en la base de datos
            await db.query('INSERT INTO Productos (nombre, descripcion, precio, id_categoria, imagen, stock) VALUES (?, ?, ?, ?, ?, ?)', [nombre, descripcion, precio, id_categoria, relativePath, stock]);
            res.status(201).send('Producto agregado correctamente');
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al agregar el producto');
    }
});


// Actualizar un producto
router.put('/:id', async (req, res) => {
    try {
        const { nombre, descripcion, precio, id_categoria, stock } = req.body;
        
        if (req.files && req.files.imagen) {
            let uploadedFile = req.files.imagen;
            const fileTypes = /jpeg|jpg|png|gif/;
            const mimetype = fileTypes.test(uploadedFile.mimetype);

            if (!mimetype) {
                return res.status(400).send('Formato de archivo no permitido.');
            }

            const absolutePath = path.join(__dirname, '../../public/assets/imgProductos', uploadedFile.name);
            const relativePath = '/assets/imgProductos/' + uploadedFile.name;

            uploadedFile.mv(absolutePath, async (err) => {
                if (err) return res.status(500).send(err);
                await db.query('UPDATE Productos SET nombre = ?, descripcion = ?, precio = ?, id_categoria = ?, imagen = ?, stock = ? WHERE id_producto = ?', [nombre, descripcion, precio, id_categoria, relativePath, stock, req.params.id]);
                res.send('Producto actualizado correctamente');
            });
        } else {
            await db.query('UPDATE Productos SET nombre = ?, descripcion = ?, precio = ?, id_categoria = ?, stock = ? WHERE id_producto = ?', [nombre, descripcion, precio, id_categoria, stock, req.params.id]);
            res.send('Producto actualizado correctamente');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar el producto');
    }
});


// Eliminar un producto
router.delete('/:id', async (req, res) => {
    try {
        await db.query('DELETE FROM Productos WHERE id_producto = ?', [req.params.id]);
        res.send('Producto eliminado correctamente');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al eliminar el producto');
    }
});


module.exports = router;
