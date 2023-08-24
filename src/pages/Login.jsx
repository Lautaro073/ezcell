import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CargarProducto from './cargarProductos';

function Login() {
    const navigate = useNavigate();
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('login', { user, password });

            const token = response.data.token;
            localStorage.setItem('authToken', token); 
            alert('Inicio de sesión exitoso!'); // Mensaje de éxito
            navigate("/login/cargarProductos");
        }  catch (error) {
            console.error("Error:", error.response ? error.response.data : error.message);
            alert('Error al iniciar sesión. Por favor, intenta de nuevo.');
        }
        
    };
    
    
    
    return (
        <section className="vh-100" style={{backgroundColor: '#508bfc'}}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card shadow-2-strong" style={{borderRadius: '1rem'}}>
                            <div className="card-body p-5 text-center">

                                <h3 className="mb-5">Iniciar Sesion</h3>

                                <div className="form-outline mb-4">
                                    <input type="email" id="typeEmailX-2" className="form-control form-control-lg" value={user} onChange={e => setUser(e.target.value)} />
                                    <label className="form-label" htmlFor="typeEmailX-2">Usuario</label>
                                </div>

                                <div className="form-outline mb-4">
                                    <input type="password" id="typePasswordX-2" className="form-control form-control-lg" value={password} onChange={e => setPassword(e.target.value)} />
                                    <label className="form-label" htmlFor="typePasswordX-2">Password</label>
                                </div>

                                {/* Checkbox */}
                                <div className="form-check d-flex justify-content-start mb-4">
                                    <input className="form-check-input" type="checkbox" value="" id="form1Example3" />
                                    <label className="form-check-label" htmlFor="form1Example3"> Remember password </label>
                                </div>

                                <button className="btn btn-primary btn-lg btn-block" type="submit" onClick={handleSubmit}>Login</button>

                                <hr className="my-4" />

                              

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default function LoginForm(){
    return(
        <>
            <Login/> 
        </>
    )
    
}