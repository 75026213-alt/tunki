import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useAuth } from "../hooks/useAuth.js";
import styles from "./LoginModal.module.css";

export default function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isRegistering) {
        if (!username || !email || !password) {
          setError("Todos los campos son requeridos");
          setLoading(false);
          return;
        }
        await register(email, username, password);
      } else {
        if (!email || !password) {
          setError("Email y contraseña son requeridos");
          setLoading(false);
          return;
        }
        await login(email, password);
      }
      onLoginSuccess?.();
      handleClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setEmail("");
    setPassword("");
    setUsername("");
    setError("");
    setIsRegistering(false);
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button
          className={styles.closeButton}
          onClick={handleClose}
          aria-label="Cerrar"
        >
          <FaTimes />
        </button>

        <div className={styles.header}>
          <h2>{isRegistering ? "Crear cuenta" : "Iniciar sesión"}</h2>
          <p>{isRegistering ? "para continuar con tu compra" : "para continuar con tu compra"}</p>
        </div>

        {error && <div className={styles.errorMessage}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          {isRegistering && (
            <label className={styles.field}>
              <span>Nombre de usuario</span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Tu nombre de usuario"
                autoComplete="username"
              />
            </label>
          )}

          <label className={styles.field}>
            <span>Correo electrónico</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              autoComplete="email"
            />
          </label>

          <label className={styles.field}>
            <span>Contraseña</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete={isRegistering ? "new-password" : "current-password"}
            />
          </label>

          <button type="submit" className={styles.submitButton} disabled={loading}>
            {loading ? "Cargando..." : isRegistering ? "Crear cuenta" : "Iniciar sesión"}
          </button>
        </form>

        <div className={styles.toggle}>
          <span>{isRegistering ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?"}</span>
          <button
            type="button"
            onClick={() => {
              setIsRegistering(!isRegistering);
              setError("");
            }}
            className={styles.toggleButton}
          >
            {isRegistering ? "Inicia sesión" : "Regístrate"}
          </button>
        </div>
      </div>
    </div>
  );
}
