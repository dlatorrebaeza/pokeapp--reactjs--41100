import {Link} from 'react-router-dom'
import { useDarkModeContext } from '../../context/DarkModeContext';
 
const Item = ({prod}) => {

    const {darkMode} = useDarkModeContext();
    return (
        <div className={`card mb-3 cardProducto ${darkMode ? 'text-black bg-secondary' : 'border-light'}`}>
                        <img src={prod.img} className="card-img-top" alt="..." />
                        <div className='card-body cardBody'>
                            <h5 className="card-title">{prod.nombre}</h5>
                            <p className="card-text">{prod.tipo}</p>
                            <p className="card-text">${new Intl.NumberFormat('de-DE').format(prod.precio)}</p>
                            <button className='btn btn-dark'><Link className='nav-link' to={`/product/${prod.id}`}>Ver Producto</Link></button>
                        </div>
        </div>
    );
}

export default Item;