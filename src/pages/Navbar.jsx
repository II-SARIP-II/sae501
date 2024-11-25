import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav>
            <Link to="/home">Accueil</Link> |
            <Link to="/about">À propos</Link> |
            <Link to="/notfound">Not Found</Link>
        </nav>
    );
}

export default Navbar;
