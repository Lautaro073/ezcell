import React, { useState } from "react";
import axios from "axios";
//import AgregarAlCarritoBoton from "../components/Carrito/AgregarAlCarritoBoton"; // Ajusta la ruta según donde esté tu componente

// Suponiendo que tienes un componente que muestra una lista de productos
/*function ListaProductos({ productos }) {
  return (
    <div>
      {productos.map((producto) => (
        <div key={producto.id} className="producto-item">
          <h2>{producto.nombre}</h2>
          <img
            src={producto.imagen}
            alt={producto.nombre}
            width="150"
            height="150"
          />
          <p>{producto.descripcion}</p>
          <p>${producto.precio}</p> // Asumo que usas euros, cambia el símbolo
          según tu moneda.
          <AgregarAlCarritoBoton
            idProducto={producto.id}
            nombreProducto={producto.nombre}
          />
        </div>
      ))}
    </div>
  );
}*/

function CargarProducto() {
  const [nombreProducto, setNombreProducto] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState(0);
  const [idCategoria, setIdCategoria] = useState(1); // Asumo que es un número y que tiene un valor por defecto.
  const [imagen, setImagen] = useState(null);
  const [stock, setStock] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nombre", nombreProducto);
    formData.append("descripcion", descripcion);
    formData.append("precio", precio);
    formData.append("id_categoria", idCategoria);
    formData.append("stock", stock);
    if (imagen) {
      formData.append("imagen", imagen, imagen.name);
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/productos",
        formData
        
      );
      alert("Producto agregado correctamente");
      // Limpiar el formulario, si es necesario
      setNombreProducto("");
      setDescripcion("");
      setPrecio(0);
      setImagen(null);
      setStock(0);
    } catch (error) {
      console.error("Hubo un error al cargar el producto:", error);
      alert("Error al agregar el producto");
    }
  };
  return (
    <div className="container">
      <h2>Cargar Producto</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">

        <div className="mb-3">
          <label className="form-label">Nombre del Producto</label>
          <input
            type="text"
            className="form-control"
            value={nombreProducto}
            onChange={(e) => setNombreProducto(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea
            className="form-control"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Precio</label>
          <input
            type="number"
            className="form-control"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Imagen del Producto</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => setImagen(e.target.files[0])}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Categoría (ID)</label>
          <input
            type="number"
            className="form-control"
            value={idCategoria}
            onChange={(e) => setIdCategoria(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Stock</label>
          <input
            type="number"
            className="form-control"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Cargar Producto
        </button>
      </form>
    </div>
  );
}

export default CargarProducto;
