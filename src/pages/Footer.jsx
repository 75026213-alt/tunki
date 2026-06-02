import { FaFacebook, FaInstagram, FaTiktok, FaTwitter } from "react-icons/fa";
import logo from "../assets/icono-logo.png";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.socialBlock}>
          <h2>Siguenos</h2>
          <div className={styles.socialLinks}>
            <a href="https://facebook.com" aria-label="Facebook">
              <FaFacebook />
            </a>
            <a href="https://instagram.com" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://twitter.com" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="https://tiktok.com" aria-label="TikTok">
              <FaTiktok />
            </a>
          </div>
        </div>

        <div className={styles.logoBlock}>
          <img src={logo} alt="Tunki Coffee" />
        </div>

        <nav className={styles.linkColumns} aria-label="Footer">
          <div>
            <h2>Empresa</h2>
            <a href="/">Inicio</a>
            <a href="/recetas">Nuestro Cafe</a>
            <a href="/tunki-amigo">Origen</a>
          </div>

          <div>
            <h2>Informacion</h2>
            <a href="/contacto">Contacto</a>
            <a href="/privacidad">Politica de Privacidad</a>
            <a href="/terminos">Terminos de Uso</a>
          </div>
        </nav>
      </div>

      <div className={styles.copyright}>
        <p>&copy; 2026 Tunki Coffee. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
