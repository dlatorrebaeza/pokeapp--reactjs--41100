import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import ItemList from '../ItemList/ItemList.jsx';
import {getProductos, getProducto, updateProducto, deleteProducto, cargarBDD} from '../../assets/firebase.js';
const ItemListContainer = () => {

    const [productos, setProductos] = useState([]);
    const {category} = useParams()

    useEffect(() => {
            if(category) {
                getProductos().then(products => {
                    const productsList= products.filter(prod => prod.stock > 0).filter(prod => prod.idCategoria === category)
                    const cardProductos = ItemList({productsList})
                    setProductos(cardProductos)
                })
            } else {
                getProductos().then(products => {
                    const productsList= products.filter(prod => prod.stock > 0)
                    const cardProductos = ItemList({productsList})
                    setProductos(cardProductos)
                })
            }

            /*  getProducto("0cDHsuYv8s9XeL5CCmJG").then(prod => {
                prod.stock -= 5
                delete prod.id 
                updateProducto("0cDHsuYv8s9XeL5CCmJG", prod).then(estado => console.log(estado))
            }) */
            // cargarBDD()

    },[category]);
    
    return (
        <div className= 'row cardProductos' >
            {productos}
        </div>
       
    );
}

export default ItemListContainer;