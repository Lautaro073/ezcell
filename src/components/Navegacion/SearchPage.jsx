// SearchPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function SearchPage({agregarAlCarrito}) {
    const [productos, setProductos] = useState([]);
    const searchQuery = new URLSearchParams(window.location.search).get('search');
  
    useEffect(() => {
      axios
        .get(`productos/search?search=${searchQuery}`)
        .then((response) => {
          setProductos(response.data);
        })
        .catch((error) => {
          console.error("Error en la búsqueda:", error);
        });
    }, [searchQuery]);

    return (
        <>
          <div className="container mt-5">
            <h2 className="mb-4">Productos disponibles:</h2>
            {productos.length > 0 ? (
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
            ) : (
            <p>No se encontraron productos con el nombre "{searchQuery}".</p>
            )}
          </div>
        </>
      );
    }      

export default SearchPage;
