import { useState } from "react";
import { FaApple, FaFacebookF, FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import fondoLogin from "../../assets/Login/fondo_login.jpg";
import { useAuth } from "../../hooks/useAuth.js";

export default function Login() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isRegistering) {
        if (!username || !email || !password) {
          setError("Todos los campos son requeridos");
          return;
        }
        await register(email, username, password);
      } else {
        if (!email || !password) {
          setError("Email y contraseña son requeridos");
          return;
        }
        await login(email, password);
      }
      navigate("/cafe");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className={`${styles.loginPage} ${isRegistering ? styles.registerMode : ""}`}
      style={{ "--login-bg": `url(${fondoLogin})` }}
    >
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <span>{isRegistering ? "Comienza tu historia" : "Bienvenido de nuevo"}</span>
          <h1>{isRegistering ? "Regístrate" : "Iniciar sesión"}</h1>
        </div>

        {error && <div className={styles.errorMessage}>{error}</div>}

        <form className={styles.form} onSubmit={handleSubmit}>
          {isRegistering && (
            <label className={styles.field}>
              <span>Nombre de usuario</span>
              <input 
                type="text" 
                name="username" 
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
          )}

          <label className={styles.field}>
            <span>Correo electrónico</span>
            <input 
              type="email" 
              name="email" 
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label className={styles.field}>
            <span>Contraseña</span>
            <input
              type="password"
              name="password"
              autoComplete={isRegistering ? "new-password" : "current-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          {!isRegistering && (
            <div className={styles.formMeta}>
              <label>
                <input type="checkbox" />
                Recordarme
              </label>
              <a href="/recuperar">Olvidé mi contraseña</a>
            </div>
          )}

          <button className={styles.primaryButton} type="submit" disabled={loading}>
            {loading ? "Cargando..." : isRegistering ? "Crear cuenta" : "Iniciar sesión"}
          </button>
        </form>

        <div className={styles.divider}>
          <span>{isRegistering ? "O regístrate con" : "O continúa con"}</span>
        </div>

        <div className={styles.socialButtons}>
          <button type="button" aria-label="Continuar con Gmail">
            <FaGoogle />
          </button>
          <button type="button" aria-label="Continuar con Facebook">
            <FaFacebookF />
          </button>
          <button type="button" aria-label="Continuar con Apple">
            <FaApple />
          </button>
        </div>

        <p className={styles.registerText}>
          {isRegistering ? "¿Ya tienes una cuenta?" : "¿No tienes una cuenta?"}
          <button type="button" onClick={() => setIsRegistering(!isRegistering)}>
            {isRegistering ? "Inicia sesión" : "Regístrate"}
          </button>
        </p>
      </div>
    </section>
  );
}
