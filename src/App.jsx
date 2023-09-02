import Inicio from "./components/Inicio";
import Producto from "./components/Producto";
import Carrito from "./components/Carrito";
import Checkout from "./components/Checkout";
import Checkouterror from "./components/Checkout/error";
import Checkoutpendiente from "./components/Checkout/pendiente";
import Checkoutexito from "./components/Checkout/exito";
import Navegacion from "./components/Navegacion";
import ListaProductos from "./components/ListaProductos";
import Login from "./pages/Login";
import CargarProductos from "./pages/cargarProductos";
import SearchPage from "./components/Navegacion/SearchPage";
//import ProductosPorCategoria from './components/ProductoPorCategoria';
import { BrowserRouter  as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import PrivateRoute from './PrivateRoute'; // Asegúrate de poner la ruta correcta al componente.
function App() {
 

  const agregarAlCarrito = async (id_producto, cantidad = 1) => {
    try {
      const sessionId = localStorage.getItem("sessionId");

      // Si por alguna razón no tienes un sessionId, lo mejor sería parar la función aquí.
      if (!sessionId) {
        alert("Error al obtener la sesión. Por favor, refresca la página.");
        return;
      }
      console.log(`Enviando petición al carrito con ID: ${sessionId}`);

      await axios.post(`carrito/${sessionId}`, {
        id_producto,
        cantidad,
      });

      alert("Producto agregado al carrito!");
    } catch (error) {
      console.error("Error al agregar al carrito:", error);
    }
  };
  useEffect(() => {
    let currentSessionId = localStorage.getItem("sessionId");
    console.log("Sesión ID actual:", currentSessionId);

    // Si no hay un sessionId en el almacenamiento local, solicitamos uno nuevo.
    if (!currentSessionId) {
      axios
        .get("session/start-session")
        .then((response) => {
          const newSessionId = response.data.sessionId;

          if (newSessionId) {
            // Almacenamos el sessionId en el almacenamiento local
            localStorage.setItem("sessionId", newSessionId);
            
            // Enviamos el sessionId a la base de datos.
            axios
              .post("session/guardar", {
                id_carrito: newSessionId,
              })
              .then(() => {
                console.log(
                  "ID del carrito guardado en la base de datos:",
                  newSessionId
                );
              })
              .catch((error) => {
                console.error(
                  "Error al guardar el ID del carrito en la base de datos:",
                  error
                );
              });
          }
        });
    }
}, []);


  /*useEffect(() => {
    const sessionId = localStorage.getItem('sessionId');
    
    console.log('Sesión ID actual:', sessionId);
    if (!sessionId) {
        axios.get('session/start-session')
            .then(response => {
                const newSessionId = response.data.sessionId;
                if (newSessionId) {
                    // Si no recibimos un sessionId válido, crea un nuevo carrito
                    axios.post('session/crear')
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
  }, []);*/

  return (
    <Router>
    <Navegacion />
    <Routes>
      <Route path="/" element={<Inicio agregarAlCarrito={agregarAlCarrito} />} />
      
        <Route
          path="/producto/:id"
          element={<Producto agregarAlCarrito={agregarAlCarrito} />}
        />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/checkout/error" element={<Checkouterror />} />
        <Route path="/checkout/pendiente" element={<Checkoutpendiente />} />
        <Route path="/checkout/exito" element={<Checkoutexito />} />
        <Route
          path="/productos"
          element={<ListaProductos agregarAlCarrito={agregarAlCarrito} />}
        />
        <Route
          path="/buscar"
          element={<SearchPage agregarAlCarrito={agregarAlCarrito} />}
        />
       <Route path="/login" element={<Login />} />
        <Route path="/login" element={<PrivateRoute />}>
            <Route path="cargarProductos" element={<CargarProductos />} />
        </Route>
        <Route path="*" element={<Inicio agregarAlCarrito={agregarAlCarrito} />} /> {/* Esto captura cualquier ruta no definida */}
      </Routes>
    </Router>
  );
}


export default App;
