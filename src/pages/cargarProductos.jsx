import React, { useState, useEffect } from "react";
import axios from "axios";

function CargarProducto() {
  const [nombreProducto, setNombreProducto] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState(0);
  const [idCategoria, setIdCategoria] = useState(1);
  const [categorias, setCategorias] = useState([]);
  const [imagen, setImagen] = useState(null);
  const [imagenUrl, setImagenUrl] = useState("");
  const [stock, setStock] = useState(0);
  const [productoId, setProductoId] = useState(null);
  const [productoSeleccionado, setProductoSeleccionado] = useState("");
 
  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        const response = await axios.get(
          "categorias"
        );
        setCategorias(response.data);
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
      }
    };

    obtenerCategorias();
  }, []);

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
      await axios.post("productos", formData);
      alert("Producto agregado correctamente");
    } catch (error) {
      console.error("Hubo un error al cargar el producto:", error);
      alert("Error al agregar el producto");
    }
  };
  const handleUpdate = async () => {
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
        await axios.put(`productos/${productoId}`, formData);
        alert("Producto actualizado correctamente");
    } catch (error) {
        console.error("Hubo un error al actualizar el producto:", error);
        alert("Error al actualizar el producto");
    }
};

  const handleDelete = async () => {
    try {
      await axios.delete(`productos/${productoId}`);
      alert("Producto eliminado correctamente");
      // Puedes limpiar el formulario o redirigir al usuario después de eliminar el producto
      setProductoId(null);
      setNombreProducto("");
      setDescripcion("");
      // ... limpiar otros campos
    } catch (error) {
      console.error("Hubo un error al eliminar el producto:", error);
      alert("Error al eliminar el producto");
    }
  };
  const seleccionarProducto = async (id) => {
    try {
      const response = await axios.get(
        `productos/${id}`
      );
      const producto = response.data;
      setNombreProducto(producto.nombre);
      setDescripcion(producto.descripcion);
      setPrecio(producto.precio);
      setIdCategoria(producto.id_categoria);
      setStock(producto.stock);
      setImagenUrl(producto.imagen); // Asegúrate de manejar la URL de la imagen correctamente
      setProductoId(producto.id_producto);
    } catch (error) {
      console.error("Error al obtener el producto:", error);
      alert("Error al seleccionar el producto");
    }
  };
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const response = await axios.get("productos");
        setProductos(response.data);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };

    obtenerProductos();
  }, []);

  return (
    <div className="container">
      <h2>Cargar Producto</h2>
      <form onSubmit={handleSubmit} style={{ paddingBottom: '20px' }} encType="multipart/form-data">
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
          <label className="form-label">Categoría</label>
          <select
            className="form-control"
            value={idCategoria}
            onChange={(e) => setIdCategoria(e.target.value)}
            required
          >
            {categorias.map((categoria) => (
              <option
                key={categoria.id_categoria}
                value={categoria.id_categoria}
              >
                {categoria.nombre_categoria}
              </option>
            ))}
          </select>
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
        <div className="mb-3">
          <label className="form-label">Seleccionar producto</label>
          <select
            className="form-select"
            value={productoSeleccionado}
            onChange={(e) => {
              setProductoSeleccionado(e.target.value);
              seleccionarProducto(e.target.value);
            }}
          >
            <option value="" disabled>
              Seleccione un producto
            </option>
            {productos.map((producto) => (
              <option key={producto.id_producto} value={producto.id_producto}>
                {producto.nombre}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Cargar Producto
        </button>
       
        <button
          type="button"
          onClick={handleUpdate}
          className="btn btn-secondary"
        >
          Actualizar Producto
        </button>
       
        <button type="button" onClick={handleDelete} className="btn btn-danger">
          Eliminar Producto
        </button>
        
      </form>
    </div>
  );
}

export default CargarProducto;
