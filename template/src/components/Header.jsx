import { Link } from 'react-router-dom'
import './Header.css'

function Header() {
  return (
    <header className="app-header">
      <div className="header-inner">
        <Link to="/" className="brand">
          CountryPeek
        </Link>
        <nav>
          <Link to="/favourites">Favourites</Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
