import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import '../../css/nav.css';  // Importamos el archivo CSS que ya hemos creado.
import logo from '../../assets/logo.png';  // Asegúrate de tener la ruta correcta a tu archivo de logo.
import { useState, useEffect } from 'react';
import axios from 'axios';

function NavbarPrincipal({children}) {
 // Reemplaza con tu endpoint específico
 const [cantidadProductos, setCantidadProductos] = useState(0);
 const [totalCarrito, setTotalCarrito] = useState(0.0);

 const obtenerUserIdActual = () => {
     return localStorage.getItem('userId');  // Esta función necesita definirse de alguna forma. La estoy asumiendo basado en el código anterior.
 };

 useEffect(() => {
     const userId = obtenerUserIdActual();

     if (userId) {
         axios.get(`https://localhost:3000/c${userId}`)
             .then(response => {
                 const productos = response.data;
                 
                 const cantidad = productos.length;
                 let total = 0;
                 productos.forEach(item => {
                     total += item.precio * item.cantidad; 
                 });

                 setCantidadProductos(cantidad);
                 setTotalCarrito(total);
             })
             .catch(error => {
                 console.error("Error al obtener el carrito", error);
             });
     }
 }, []);
 return (
    <section className="header-main border-bottom bg-white">
        <div className="container-fluid">
            <div className="row p-2 pt-3 pb-3 d-flex align-items-center">
                <div className="col-md-2">
                    <Link to="/inicio" className="nav-link logo">
                        <img src={logo} className="d-none d-md-flex" width="125" alt="Logo" />
                    </Link>
                </div>
                <div className="col-md-8">
                    <div className="d-flex form-inputs">
                        <input className="form-control" type="text" placeholder="Busca tu Producto..." />
                        <i className="bx bx-search"></i>
                    </div>
                </div>
                <div className="col-md-2 link">
                    <div className="d-flex d-none d-md-flex flex-row align-items-center">
                        <Link to="/carrito" className="nav-link">
                            <span className="shop-bag"><i className='bx bxs-shopping-bag'></i></span>
                        </Link>
                        <Link to="/checkout" className="nav-link">
                            <div className="d-flex flex-column ms-2">
                                <span className="qty">{cantidadProductos} Productos</span>
                                <span className="fw-bold">${totalCarrito}</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </section>
);
}

function NavbarCategorias({ children }) {
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        async function obtenerCategorias() {
            try {
                const response = await axios.get('http://localhost:3000/api/categorias');
                setCategorias(response.data);
            } catch (error) {
                console.error("Error al obtener las categorías:", error);
            }
        }

        obtenerCategorias();
    }, []);

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <h2 className="navbar-brand d-md-none d-md-flex">Categorias</h2>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            {categorias.map(categoria => (
                                <li className="nav-item" key={categoria.id_categoria}>
                                    <Link className="nav-link" to={`/${categoria.nombre_categoria.toLowerCase()}`}>{categoria.nombre_categoria}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </nav>
            {children}
        </>
    );
}


export default function Navegacion() {
    return (
        <>
            <NavbarPrincipal />
           <NavbarCategorias/>
        </>
    );
}

