import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaPen,
  FaPhone,
  FaSignOutAlt,
  FaShoppingBag,
  FaUser,
  FaUserCog,
} from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth.js";
import styles from "./Profile.module.css";

const sections = [
  { id: "info", label: "Información", icon: FaUser },
  { id: "orders", label: "Mis pedidos", icon: FaShoppingBag },
  { id: "actions", label: "Acciones", icon: FaUserCog },
];

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("info");
  const [orders] = useState([
    {
      id: "ORD-1717225200000",
      date: "2026-06-01",
      total: 42.5,
      status: "completada",
      items: "Cafe en Grano Tunki",
      delivery: "pickup",
    },
    {
      id: "ORD-1717225100000",
      date: "2026-05-31",
      total: 50.5,
      status: "pendiente",
      items: "Cafe Molido",
      delivery: "agency",
    },
  ]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user) {
    return (
      <section className={styles.profilePage}>
        <div className={styles.container}>
          <p className={styles.loginMessage}>Por favor inicia sesión para ver tu perfil</p>
        </div>
      </section>
    );
  }

  const displayName = user.username || user.email;
  const initials = (displayName || "T").charAt(0).toUpperCase();

  return (
    <section className={styles.profilePage}>
      <div className={styles.container}>
        <div className={styles.shell}>
          <aside className={styles.sidebar} aria-label="Opciones de perfil">
            <h1>Mi Perfil</h1>

            <nav className={styles.profileNav}>
              {sections.map(({ id, label, icon: Icon }) => (
                <button
                  className={`${styles.navItem} ${activeSection === id ? styles.activeNav : ""}`}
                  key={id}
                  onClick={() => setActiveSection(id)}
                  type="button"
                >
                  <Icon />
                  <span>{label}</span>
                </button>
              ))}
            </nav>

            <button className={styles.logoutLink} onClick={handleLogout} type="button">
              <FaSignOutAlt />
              <span>Cerrar sesión</span>
            </button>
          </aside>

          <main className={styles.content}>
            <section
              className={activeSection === "info" ? styles.userPanel : styles.hiddenPanel}
              aria-label="Información personal"
            >
              <div className={styles.identity}>
                <div className={styles.avatarWrap}>
                  <div className={styles.avatar}>{initials}</div>
                  <button className={styles.editAvatar} type="button" aria-label="Editar foto">
                    <FaPen />
                  </button>
                </div>

                <div>
                  <h2>{displayName}</h2>
                  <p>Puno, Perú</p>
                </div>
              </div>

              <div className={styles.formGrid}>
                <label className={styles.field}>
                  <span>Nombre de usuario</span>
                  <input value={displayName} readOnly />
                </label>
                <label className={styles.field}>
                  <span>Nombre completo</span>
                  <input value={user.username || "Cliente Tunki"} readOnly />
                </label>
                <label className={styles.field}>
                  <span>Email</span>
                  <div className={styles.inputIcon}>
                    <FaEnvelope />
                    <input value={user.email} readOnly />
                  </div>
                </label>
                <label className={styles.field}>
                  <span>Teléfono</span>
                  <div className={styles.inputIcon}>
                    <FaPhone />
                    <input value="+51 987 654 321" readOnly />
                  </div>
                </label>
                <label className={styles.field}>
                  <span>Dirección</span>
                  <div className={styles.inputIcon}>
                    <FaMapMarkerAlt />
                    <input value="Puno, Perú" readOnly />
                  </div>
                </label>
                <label className={styles.field}>
                  <span>Código postal</span>
                  <input value="21001" readOnly />
                </label>
              </div>
            </section>

            <section
              className={activeSection === "orders" ? styles.ordersCard : styles.hiddenPanel}
              aria-label="Mis pedidos"
            >
              <div className={styles.ordersHeader}>
                <h2>
                  <FaShoppingBag />
                  Mis Pedidos
                </h2>
                <span className={styles.orderCount}>{orders.length}</span>
              </div>

              {orders.length > 0 ? (
                <div className={styles.ordersList}>
                  {orders.map((order) => (
                    <div key={order.id} className={styles.orderItem}>
                      <div className={styles.orderInfo}>
                        <div className={styles.orderId}>
                          <strong>{order.id}</strong>
                          <span className={`${styles.status} ${styles[order.status]}`}>
                            {order.status === "completada" ? "Completada" : "Pendiente"}
                          </span>
                        </div>
                        <div className={styles.orderDetails}>
                          <p>
                            <strong>Productos:</strong> {order.items}
                          </p>
                          <p>
                            <strong>Fecha:</strong>{" "}
                            {new Date(order.date).toLocaleDateString("es-ES")}
                          </p>
                          <p>
                            <strong>Entrega:</strong>{" "}
                            {order.delivery === "pickup" ? "Recojo en tienda" : "Agencia"}
                          </p>
                        </div>
                      </div>
                      <div className={styles.orderTotal}>
                        <span>S/ {order.total.toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.emptyOrders}>
                  <p>Aún no has realizado ningún pedido</p>
                </div>
              )}
            </section>

            <section
              className={activeSection === "actions" ? styles.actionsCard : styles.hiddenPanel}
              aria-label="Acciones"
            >
              <h2>Acciones</h2>
              <div className={styles.actionsList}>
                <button className={styles.actionButton}>Cambiar contraseña</button>
                <button className={styles.actionButton}>Historial completo</button>
              </div>
            </section>
          </main>
        </div>
      </div>
    </section>
  );
}
