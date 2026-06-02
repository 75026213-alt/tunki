import { NavLink } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaShoppingCart, FaTimes, FaUser } from "react-icons/fa";
import styles from "./Header.module.css";
import logo from "../assets/icono-logo.png";
import { useAuth } from "../hooks/useAuth.js";

const getLinkClass = ({ isActive }) =>
  isActive ? `${styles.link} ${styles.active}` : styles.link;

const getIconClass = ({ isActive }) =>
  isActive ? `${styles.icon} ${styles.activeIcon}` : styles.icon;

const scrollToPageStart = () => {
  window.setTimeout(() => {
    const root = document.documentElement;
    const previousScrollBehavior = root.style.scrollBehavior;

    root.style.scrollBehavior = "auto";
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    root.style.scrollBehavior = previousScrollBehavior;
  }, 0);
};

export default function Header() {
  const { isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const userPath = isAuthenticated ? "/profile" : "/login";
  const navClass = isMenuOpen ? `${styles.navbar} ${styles.open}` : styles.navbar;
  const handleNavigation = () => {
    setIsMenuOpen(false);
    scrollToPageStart();
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src={logo} alt="Tunki Logo" />
      </div>

      <nav className={navClass}>
        <NavLink to="/" end className={getLinkClass} onClick={handleNavigation}>Home</NavLink>
        <NavLink to="/origen" end className={getLinkClass} onClick={handleNavigation}>Origen</NavLink>
        <NavLink to="/cafe" end className={getLinkClass} onClick={handleNavigation}>Cafe</NavLink>
        <NavLink to="/recetas" end className={getLinkClass} onClick={handleNavigation}>Recetas</NavLink>
        <NavLink to="/tunki-amigo" end className={getLinkClass} onClick={handleNavigation}>Tunki Amigo</NavLink>
      </nav>

      <div className={styles.icons}>
        <NavLink to={userPath} className={getIconClass} onClick={handleNavigation}>
          <FaUser />
        </NavLink>
        <NavLink to="/carrito" className={getIconClass} onClick={handleNavigation}>
          <FaShoppingCart />
        </NavLink>
        <button
          className={styles.menuButton}
          type="button"
          onClick={() => setIsMenuOpen((current) => !current)}
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </header>
  );
}
