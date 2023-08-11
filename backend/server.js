const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const mercadopago = require('mercadopago');

mercadopago.configure({
  access_token: 'TEST-6229067183884225-080917-6a286f43b742af0e5267783a37a15c8d-1128342054'
});
/*mercadopago.configure({
  access_token: 'APP_USR-6229067183884225-080917-d5744e088841b5a2de969ce102b274c6-1128342054'
});*/
// Importaciones de tus rutas
const productoRoutes = require('./routes/productos');
const ordenes = require('./routes/ordenes');
const userRoutes = require('./routes/users');
const carritoRoutes = require('./routes/carrito');
const checkoutRouter = require('./routes/checkout');
const sessionRoutes = require('./routes/session');
const categoriaRoutes = require('./routes/categorias');
const mp =require('./routes/mp')
const path = require('path');

const app = express();

// Comprueba y crea el directorio para imágenes si no existe
const dirPath = 'C:\\Users\\El Yisus Pai\\Desktop\\ezecell\\public\\assets\\imgProductos';
if (!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath, { recursive: true });
}

app.use('/assets/imgProductos', express.static(path.join(__dirname, 'public/assets/imgProductos')));

// Configuraciones y middlewares
app.use(morgan('dev')); 
app.use('/public', express.static('public')); 
app.use(cors({ origin: '*' }));
app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/assets', express.static('public/assets'));

// Rutas
app.use('/api', userRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/ordenes',  ordenes); // Cambiado para mantener consistencia
app.use('/api/carrito', carritoRoutes);
app.use('/api/checkout', checkoutRouter); 
app.use('/api/session', sessionRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/create_preference', mp)
// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en ${PORT}`);
});
