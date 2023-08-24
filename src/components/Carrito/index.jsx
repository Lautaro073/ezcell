import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
 // Asegúrate de importar correctamente el componente PaymentButton
 import '../../config'; 
function Carrito() {
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();
  const sessionId = localStorage.getItem("sessionId");
  const carritoId = sessionId; // Asumimos que carritoId es igual a sessionId para simplificar

  const cargarProductos = useCallback(() => {
    axios
      .get(`carrito/${carritoId}`)
      .then((respuesta) => {
        console.log("Productos desde el servidor:", respuesta.data);
        setProductos(respuesta.data);
      });
  }, [carritoId]);

  useEffect(() => {
    cargarProductos();
  }, [cargarProductos]);

  const irAPago = () => {
    navigate("/checkout");
  };
  const agregarProducto = async (productoId) => {
    console.log("Producto ID:", productoId); // Agrega esta línea
    try {
      const stockActual = await verificarStock(productoId);
  
      // Obtén el producto del estado productos del carrito
      const producto = productos.find((p) => p.id_producto === productoId);
      
      // Verifica si ya hay productos en el carrito
      if (producto) {
        // Verifica si agregar más productos excederá el stock disponible
        if (producto.cantidad + 1 > stockActual) {
          alert("No hay suficiente stock disponible para agregar más productos.");
          return;
        }
      } else {
        // Si no hay productos del mismo tipo en el carrito, verifica si la cantidad a agregar supera el stock disponible
        if (1 > stockActual) {
          alert("No hay suficiente stock disponible para agregar el producto.");
          return;
        }
      }
  
      // Continúa con el proceso de agregar el producto al carrito
      const response = await axios.post(`carrito/${carritoId}`, {
        id_producto: productoId,
        cantidad: 1,
      });
  
      if (response.status === 201 || response.status === 200) {
        cargarProductos();
      }
    } catch (error) {
      console.error("Error al agregar producto:", error);
    }
  };
  const quitarProducto = async (productoId) => {
    console.log("ID recibido:", productoId);
    console.log("Lista de productos:", productos);
    try {
      const producto = productos.find((p) => p.id_producto === productoId);
      if (!producto) {
        console.error("Producto no encontrado:", productoId);
        return;
      }

      let response;
      // Usando la cantidad del producto para decidir si lo actualizamos o lo eliminamos.
      if (producto.cantidad > 1) {
        response = await axios.put(
          `carrito/${carritoId}/${productoId}`,
          {
            cantidad: producto.cantidad - 1,
          }
        );
      } else {
        response = await axios.delete(
          `carrito/${carritoId}/${productoId}`
        );
      }

      if (response.status === 200) {
        cargarProductos();
      }
    } catch (error) {
      console.error("Error al quitar producto:", error);
    }
  };

  const verificarStock = async (productoId) => {
    if (!productoId) {
      console.error("Producto ID no definido");
      return 0;
    }
    const response = await axios.get(`productos/${productoId}/stock`);

    return response.data.stock;
  };

  const calcularTotal = () => {
    return productos.reduce(
      (acc, producto) => acc + producto.precio * producto.cantidad,
      0
    );
  };
  
  
 const [paymentUrl, setPaymentUrl] = useState('');

 const handlePayment = async () => {
  try {
    // Concatena los nombres de todos los productos en el carrito
    const productNames = productos.map(producto => producto.nombre).join(", ");
    
    const response = await axios.post('https://ezcell.repl.cocreate_preference', {
      title: `Compra de: ${productNames}`, // Incluye los nombres de los productos en el título
      quantity: 1,
      price: calcularTotal()
    });

    setPaymentUrl(response.data);
  } catch (error) {
    console.log('Error al crear la preferencia', error);
  }
};
useEffect(() => {
  // Verifica si el parámetro "status" está presente en la URL
  const queryParams = new URLSearchParams(window.location.search);
  const paymentStatus = queryParams.get("status");

  if (paymentStatus) {
    if (paymentStatus === "success") {
      navigate("/checkout");
    } else if (paymentStatus === "pending") {
      navigate("/checkout/pendiente");
    } else if (paymentStatus === "failure") {
      navigate("/checkout/error");
    } else {
      navigate("/checkout/error");
    }
  }
}, []);
  return (
    <div className="container mt-4">
      <h2>Productos en el Carrito</h2>
      {productos.length === 0 ? (
        <div className="alert alert-warning" role="alert">
          No hay productos en el carrito.
        </div>
      ) : (
        <div className="list-group"></div>
      )}
      {productos.map((producto, index) => {
        console.log("Producto durante el mapeo:", producto);
        return (
          <div className="list-group-item" key={index}>
            <div className="d-flex justify-content-between align-items-center">
              <img
                src={producto.imagen}
                alt={producto.nombre}
                width="50"
                height="50"
                className="mr-3"
              />
              <h5 className="mb-1">{producto.nombre}</h5>
              <div>
                <button
                  className="btn btn-sm btn-danger mr-2"
                  onClick={() => quitarProducto(producto.id_producto)}
                >
                  -
                </button>
                <span className="badge bg-white text-dark rounded-pill mr-2 ml-2">
                  {producto.cantidad}
                </span>
                <button
                  className="btn btn-sm btn-success ml-2"
                  onClick={() => agregarProducto(producto.id_producto)}
                >
                  +
                </button>

                <div className="badge bg-primary rounded-pill">
                  ${calcularTotal()}
                </div>
              </div>
            </div>
            {/* Aquí puedes añadir más detalles o botones para cada producto */}
          </div>
        );
      })}
      {productos.length > 0 && (
        <div className="mt-3">{paymentUrl ? (
        <a className="btn btn-primary"  href={paymentUrl} rel="noopener noreferrer">Pagar con Mercado Pago</a>
      ) : (
        <button className="btn btn-success" onClick={handlePayment}> Proceder al Pago - Total: ${calcularTotal()}</button>
      )}
    </div>
         )}
    </div>
  );
}

export default Carrito;