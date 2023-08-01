const express = require('express');
const bodyParser = require('body-parser');  // Si estás usando Express 4.16+ puedes usar express.json() en lugar de bodyParser
const { sequelize } = require('./models');  // Importar Sequelize para sincronizar con la base de datos
//const authenticateJWT = require('./middlewares/authMiddleware');


const app = express();


// Sincroniza automáticamente los modelos con la base de datos
sequelize.sync({ force: true })
  .then(() => {
    console.log('Tablas sincronizadas con la base de datos');
    // Inicia tu servidor aquí, o realiza cualquier otra operación necesaria
  })
  .catch((error) => {
    console.error('Error al sincronizar las tablas:', error);
  });

// Resto del código para iniciar el servidor y las rutas, etc.

// Middlewares
app.use(bodyParser.json());  // Usa express.json() si estás en Express 4.16+
app.use(bodyParser.urlencoded({ extended: true }));

// Importar rutas
const productosRoutes = require('./routes/productosRoutes.js');
const categoriasRoutes = require('./routes/categoriasRoutes.js');
const usersRoutes = require('./routes/usersRoutes.js');
const cartItemsRoutes = require('./routes/productoCarritoRoutes.js');
const ordersRoutes = require('./routes/pedidoRoutes.js');

// Usar rutas
app.use('/productos', productosRoutes);  // Solo como ejemplo, puedes no requerir JWT en rutas GET
app.use('/categorias', categoriasRoutes);  
app.use('/users', usersRoutes);  // Excluí el middleware de JWT aquí porque generalmente permites registrarte e iniciar sesión sin autenticación
app.use('/cartItems', cartItemsRoutes);  
app.use('/orders', ordersRoutes);

// Puedes manejar errores de JWT aquí si quieres dar un mensaje específico
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send('Invalid token...');
    }
});

// Iniciar el servidor y sincronizar con Sequelize
const PORT = process.env.PORT || 3001;
sequelize.sync()  // Puedes pasar { force: true } si quieres reiniciar la base de datos cada vez
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(error => {
        console.error('Unable to connect to the database:', error);
    });
