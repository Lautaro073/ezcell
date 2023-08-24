// SearchResults.js
import React from 'react';
import '../../css/productos.css'
import axios from "axios";
function SearchResults({ productos }) { 
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
    return (
      <>
        <div className="container mt-5">
          <h2 className="mb-4">Productos disponibles:</h2>
          <div className="row">
            {productos.map((producto) => (
              <div key={producto.id_producto} className="col-md-4 mb-4">
                <div className="card">
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="img-fluid"
                  />
                  <div className="card-body">
                    <h5 className="card-title">
                      {producto.nombre} - ${producto.precio}
                    </h5>
                    <p className="card-text">{producto.descripcion}</p>
                    <button className="btn btn-primary" onClick={() => agregarAlCarrito(producto.id_producto, 1)}>Agregar al Carrito</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
  
  export default SearchResults;