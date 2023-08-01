import axios from 'axios';

function CheckoutForm() {
    const handleCheckout = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const checkoutData = {
            nombreCompleto: formData.get('nombreCompleto'),
            direccion: formData.get('direccionEnvio'),  // Aquí
            telefono: formData.get('numeroTelefono'),   // Aquí
            email: formData.get('correoElectronico'),   // Aquí
            carritoId: localStorage.getItem('carritoId')
        };

        try {
            const response = await axios.post('http://localhost:3000/api/checkout', checkoutData);
            if (response.status === 200) {
                alert('Compra realizada con éxito!');
                localStorage.removeItem('carritoId');
            }
        } catch (error) {
            alert('Ocurrió un error al realizar la compra. Por favor intenta nuevamente.');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Realizar Compra</h2>
            <form onSubmit={handleCheckout}>
                <div className="mb-3">
                    <label htmlFor="nombreCompleto" className="form-label">Nombre completo</label>
                    <input type="text" className="form-control" id="nombreCompleto" name="nombreCompleto" placeholder="Nombre completo" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="direccionEnvio" className="form-label">Dirección de envío</label>
                    <input type="text" className="form-control" id="direccionEnvio" name="direccionEnvio" placeholder="Dirección de envío" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="numeroTelefono" className="form-label">Número de teléfono</label>
                    <input type="text" className="form-control" id="numeroTelefono" name="numeroTelefono" placeholder="Número de teléfono" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="correoElectronico" className="form-label">Correo electrónico para confirmación</label>
                    <input type="email" className="form-control" id="correoElectronico" name="correoElectronico" placeholder="Correo electrónico para confirmación" required />
                </div>
                <button type="submit" className="btn btn-primary">Realizar Compra</button>
            </form>
        </div>
    );
}

export default CheckoutForm;
