import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createOrdenCompra, getOrdenCompra, getProducto, updateProducto} from '../../assets/firebase';
import { useCarritoContext } from '../../context/CarritoContext';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';


const Checkout = () => {
    const initialValues={nombre: "", email: "", validateEmail: "", cedula: "", celular: "", direccion: ""}
    const [formValues, setFormValues]=useState(initialValues);
    const [formErrors, setFormErrors]=useState({});
    const [isSubmit, setIsSubmit] = useState(false);    
    const {totalPrice, carrito, emptyCart} = useCarritoContext()
    const datosFormulario = React.useRef()
    let navigate = useNavigate()

    const checkCarritoVacio = [...carrito]
    checkCarritoVacio.forEach(prodCarrito => {
        getProducto(prodCarrito.id).then(prodBDD => {
            if(prodBDD.stock < prodCarrito.cant) {
                toast.error(`El producto ${prodBDD.nombre} no tiene stock. Favor, intentar nuevamente más tarde.`);                    
                emptyCart();
                navigate("/")                          
            }
        })            
    })

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            consultarFormulario();
        }
      }, [formErrors]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
        e.target.reset()
    };

    const handleChange = (e)=>{
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }

    const validate = (values)=>{
        const errors ={};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;      
        
        if (!values.nombre) {
            errors.nombre = "Su Nombre es necesario";
        }
        if (!values.email) {
            errors.email = "El Email es requerido";
        } else if (!regex.test(values.email)) {
            errors.email = "Ese no es un formato válido de Email";
        }
        if (!values.validateEmail){
            errors.validateEmail = "Debe ingresar nuevamente el Email";            
        }else if (!regex.test(values.validateEmail)) {
            errors.validateEmail = "Ese no es un formato válido de Email";
        }else if (values.validateEmail!==values.email){
            errors.validateEmail = "Los Emails no coinciden";
        }
        if (!values.cedula){
            errors.cedula="Su Cédula de Identidad es requerida";
        }
        if (!values.celular){
            errors.celular="Su Número de Celular es requerido";
        }
        if (!values.direccion){
            errors.direccion="Su Dirección es requerida para completar el envío del o los productos";
        }
        return errors;
    };

    const consultarFormulario = (e) => {
        const datForm = new FormData(datosFormulario.current)
        const cliente = Object.fromEntries(datForm)
        const aux = [...carrito]
        aux.forEach(prodCarrito => {
            getProducto(prodCarrito.id).then(prodBDD => {
                if(prodBDD.stock >= prodCarrito.cant) {
                    prodBDD.stock -= prodCarrito.cant
                    updateProducto(prodCarrito.id, prodBDD)                    
                } else {
                    toast.error(`El producto ${prodBDD.nombre} no tiene stock disponible en este momento. Por favor, intente en otro momento.`);                    
                    emptyCart();
                    navigate("/")                      
                }
            })            
        })
        delete cliente["validateEmail"];

        createOrdenCompra(cliente,totalPrice(), new Date().toISOString().slice(0,10)).then(ordenCompra => {
            getOrdenCompra(ordenCompra.id).then(item => {
                toast.success(`Gracias por su compra. Su orden ${item.id} fue generada exitosamente. El pedido va en camino a su domicilio`)
                emptyCart()              
                navigate("/")
            }).catch(error => {
                toast.error("Su orden no fue generada. Favor, intente nuevamente")
                console.error(error)
            })                
        })
    }

    return (
        <div className="container checkout">
            <form onSubmit={handleSubmit} ref={datosFormulario}>
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre y Apellido</label>
                    <input type="text" className="form-control" name="nombre"  value={formValues.nombre} onChange={handleChange}/>
                    <p className='textCheckout'>{formErrors.nombre}</p>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="text" className="form-control" name="email" value={formValues.email} onChange={handleChange}/>
                    <p className='textCheckout'>{formErrors.email}</p>
                </div>
                <div className="mb-3">
                    <label htmlFor="email2" className="form-label">Repetir Email</label>
                    <input type="text" className="form-control" name="validateEmail" value={formValues.validateEmail} onChange={handleChange}/>
                    <p className='textCheckout'>{formErrors.validateEmail}</p>
                </div>
                <div className="mb-3">
                    <label htmlFor="cedula" className="form-label">Cédula de Identidad</label>
                    <input type="number" className="form-control" name="cedula" value={formValues.cedula} onChange={handleChange}/>
                    <p className='textCheckout'>{formErrors.cedula}</p>
                </div>
                <div className="mb-3">
                    <label htmlFor="celular" className="form-label">Celular</label>
                    <input type="number" className="form-control" name="celular" value={formValues.celular} onChange={handleChange}/>
                    <p className='textCheckout'>{formErrors.celular}</p>
                </div>
                <div className="mb-3">
                    <label htmlFor="direccion" className="form-label">Dirección</label>
                    <input type="text" className="form-control" name="direccion"  value={formValues.direccion} onChange={handleChange}/>
                    <p className='textCheckout'>{formErrors.direccion}</p>
                </div>
                <button type="submit" className="btn btn-primary">Finalizar Compra</button>
            </form>

        </div>
    );
}

export default Checkout;