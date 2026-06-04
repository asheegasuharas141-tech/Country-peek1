import { NavLink } from 'react-router-dom'
import './Header.css'

function Header() {
  return (
    <header className="site-header">
      <div className="brand">CountryPeek</div>
      <nav className="site-nav">
        <NavLink to="/" end className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          Home
        </NavLink>
        <NavLink to="/favourites" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          Favourites
        </NavLink>
      </nav>
    </header>
  )
}

export default Header
