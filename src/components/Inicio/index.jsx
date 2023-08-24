import Carrusel from "./carrusel";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
function Inicio(props) {
  const { id } = useParams();
  const productId = id;
  const [productos, setProductos] = useState([]);
  const { agregarAlCarrito } = props;
  useEffect(() => {
    async function obtenerProductos() {
      try {
        const response = await axios.get("productos");
        setProductos(response.data);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    }

    obtenerProductos();
  }, []);
  return (
    <>
      <Carrusel />
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
                  <button
                    className="btn btn-primary"
                    onClick={() => agregarAlCarrito(producto.id_producto, 1)}
                  >
                    Agregar al Carrito
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Inicio;
