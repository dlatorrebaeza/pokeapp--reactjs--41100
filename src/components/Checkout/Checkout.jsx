import React from 'react';
import { useNavigate } from 'react-router-dom';
const Checkout = () => {

    const datosFormulario = React.useRef()
    let navigate = useNavigate()

    const consultarFormulario = (e) => {
        e.preventDefault()
        console.log(datosFormulario)
        const datForm = new FormData(datosFormulario.current)
        const cliente = Object.fromEntries(datForm)
        console.log(cliente)
        e.target.reset()
        navigate("/")
    }

    return (
        <div className="container checkout">
            <form onSubmit={consultarFormulario} ref={datosFormulario}>
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre</label>
                    <input type="text" className="form-control" name="nombre" placeholder='Ingrese su Nombre' required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" name="email" placeholder='Ingrese su Correo Electrónico' required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Repita su Email</label>
                    <input type="email" className="form-control" name="reemail" placeholder='Ingrese nuevamente su Correo Electrónico' required />
                </div>
                <div className="mb-3">
                    <label htmlFor="dni" className="form-label">Cédula de Identidad</label>
                    <input type="number" className="form-control" name="dni" placeholder='Ingrese su número de Cédula de Identidad' required />
                </div>
                <div className="mb-3">
                    <label htmlFor="celular" className="form-label">Numero Telefonico</label>
                    <input type="number" className="form-control" name="celular" placeholder='Ingrese su Número Telefónico' required />
                </div>
                <div className="mb-3">
                    <label htmlFor="direccion" className="form-label">Dirección</label>
                    <input type="text" className="form-control" name="direccion" placeholder='Ingrese su Dirección Particular' required />
                </div>
                <button type="submit" className="btn btn-primary">Finalizar Compra</button>
            </form>

        </div>
    );
}

export default Checkout;
