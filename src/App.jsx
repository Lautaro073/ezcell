import Inicio from './components/Inicio';
import Producto from './components/Producto';
import Carrito from './components/Carrito';
import Checkout from './components/Checkout';
import Navegacion from './components/Navegacion';
import ListaProductos from './components/ListaProductos';
import Login from './pages/Login';
import CargarProductos from './pages/cargarProductos';
//import ProductosPorCategoria from './components/ProductoPorCategoria';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from 'react';
import axios from 'axios';
function App() {
  //axios.defaults.baseURL = 'http://localhost:3000/api/';

  const agregarAlCarrito = async (id_producto, cantidad = 1) => {
    try {
        const sessionId = localStorage.getItem('sessionId');
        
        // Si por alguna razón no tienes un sessionId, lo mejor sería parar la función aquí.
        if (!sessionId) {
            alert("Error al obtener la sesión. Por favor, refresca la página.");
            return;
        }

        await axios.post(`http://localhost:3000/api/carrito/${sessionId}`, { id_producto, cantidad });
        
        alert("Producto agregado al carrito!");
    } catch (error) {
        console.error("Error al agregar al carrito:", error);
    }
}
useEffect(() => {
  const sessionId = localStorage.getItem('sessionId');
  
  console.log('Sesión ID actual:', sessionId);
  if (!sessionId) {
      axios.get('http://localhost:3000/api/session/start-session')
          .then(response => {
              const newSessionId = response.data.sessionId;
              if (!newSessionId) {
                  // Si no recibimos un sessionId válido, crea un nuevo carrito
                  axios.post('http://localhost:3000/api/session/crear')
                      .then(response => {
                          const carritoId = response.data.id_carrito;
                          if (carritoId) {
                              localStorage.setItem('sessionId', carritoId);
                          } else {
                              console.error('Error al obtener el ID del carrito');
                          }
                      })
                      .catch(error => {
                          console.error('Error al crear un nuevo carrito:', error);
                      });
              } else {
                  localStorage.setItem('sessionId', newSessionId);
              }
          })
          .catch(error => {
              console.error('Error al iniciar la sesión:', error);
          });
  }
}, []);
  return (
    <Router>
      <Navegacion />
       <Routes>
             <Route path="/" element={<Inicio agregarAlCarrito={agregarAlCarrito} />} />
             <Route path="/producto/:id" element={<Producto agregarAlCarrito={agregarAlCarrito} />} />
             <Route path="/carrito" element={<Carrito />} />
             <Route path="/checkout" element={<Checkout />} />
             <Route path="/productos" element={<ListaProductos agregarAlCarrito={agregarAlCarrito} />} />
             <Route path="/login" element={<Login />} />
             <Route path="/cargarProductos" element={<CargarProductos />} />
             <Route path="*" element={<Inicio agregarAlCarrito={agregarAlCarrito}/>} />  {/* Esto captura cualquier ruta no definida */}
        </Routes>
    </Router>
  );
}

export default App;

