import React from 'react';
import axios from 'axios';

function AgregarAlCarritoBoton({ idProducto, nombreProducto }) {
    const agregarAlCarrito = async () => {
        try {
            const idCarrito = localStorage.getItem('idCarrito') || null;
            
            const respuesta = await axios.post('carrito', { 
                idCarrito, 
                idProducto
            });
            
            if (respuesta.data && respuesta.data.idCarrito) {
                localStorage.setItem('idCarrito', respuesta.data.idCarrito);
            }
            
            alert(`${nombreProducto} ha sido agregado al carrito.`);
        } catch (error) {
            alert('Hubo un error al agregar el producto al carrito.');
            console.error(error);
        }
    };

    return (
        <button onClick={agregarAlCarrito}>
            Agregar al carrito
        </button>
    );
}

export default AgregarAlCarritoBoton;
