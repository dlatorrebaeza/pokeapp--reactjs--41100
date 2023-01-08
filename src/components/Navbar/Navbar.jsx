import BotonDarkMode from "./BotonDarkMode/BotonDarkMode";
import Categorias from "./Categorías/Categorias";
import CartWidget from "../CartWidget/CartWidget";
import { useDarkModeContext } from "../../context/DarkModeContext";

const Navbar = () => {
    const {darkMode} = useDarkModeContext();
    return (
        <nav className={`navbar navbar-expand-lg navbar-dark ${darkMode ? 'bg-primary' : 'bg-dark'}`}>
            <div className="container-fluid">
                <img src="../img/pokeball-logo.png" alt="pokeball-logo" width={60}/>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <Categorias/>
                    <CartWidget/>
                    <BotonDarkMode/>
                </div>
            </div>
        </nav>

    );
}

export default Navbar;
