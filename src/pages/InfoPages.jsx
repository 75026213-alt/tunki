import styles from "./InfoPages.module.css";

function InfoLayout({ kicker, title, description, children }) {
  return (
    <section className={styles.infoPage}>
      <div className={styles.shell}>
        <header className={styles.hero}>
          <span className={styles.kicker}>{kicker}</span>
          <h1>{title}</h1>
          <p>{description}</p>
        </header>

        <div className={styles.content}>{children}</div>
      </div>
    </section>
  );
}

function Card({ title, children }) {
  return (
    <article className={styles.card}>
      <h2>{title}</h2>
      {children}
    </article>
  );
}

export function Contacto() {
  return (
    <InfoLayout
      kicker="Atencion Tunki"
      title="Contacto"
      description="Estamos para ayudarte con pedidos, consultas sobre nuestros productos y coordinaciones de entrega."
    >
      <Card title="Canales de atencion">
        <div className={styles.contactGrid}>
          <div className={styles.contactItem}>
            <strong>WhatsApp</strong>
            <span>+51 987 654 321</span>
          </div>
          <div className={styles.contactItem}>
            <strong>Correo</strong>
            <span>hola@tunkicafe.pe</span>
          </div>
          <div className={styles.contactItem}>
            <strong>Horario</strong>
            <span>Lunes a sabado, 9:00 a.m. - 7:00 p.m.</span>
          </div>
        </div>
      </Card>

      <Card title="Ubicacion referencial">
        <p>
          Tunki Café atiende desde Puno, Perú. Para compras con recojo en tienda o
          envio por agencia, confirmamos los detalles de entrega despues de generar
          el pedido.
        </p>
      </Card>
    </InfoLayout>
  );
}

export function Privacidad() {
  return (
    <InfoLayout
      kicker="Información legal"
      title="Política de Privacidad"
      description="Esta página resume cómo Tunki Café trata la información usada dentro de este demo."
    >
      <Card title="Información que usamos">
        <p>
          En este demo guardamos datos basicos como correo, nombre de usuario,
          carrito y pedidos en el navegador mediante localStorage. No se envía
          informacion a un servidor externo.
        </p>
      </Card>

      <Card title="Uso de la informacion">
        <ul>
          <li>Permitir el inicio de sesión simulado.</li>
          <li>Mostrar pedidos dentro de Mi Perfil.</li>
          <li>Generar comprobantes de compra para el flujo de demostracion.</li>
        </ul>
      </Card>

      <Card title="Control del usuario">
        <p>
          Puedes cerrar sesión desde Mi Perfil. Como los datos se almacenan en el
          navegador, tambien puedes eliminarlos limpiando el almacenamiento local
          del sitio.
        </p>
      </Card>
    </InfoLayout>
  );
}

export function Terminos() {
  return (
    <InfoLayout
      kicker="Condiciones del demo"
      title="Términos de Uso"
      description="Estas condiciones aplican al uso de la experiencia web de Tunki Café como demo funcional."
    >
      <Card title="Uso del sitio">
        <p>
          Este sitio permite explorar productos, recetas, informacion de origen,
          carrito de compras y un proceso de pago simulado. Las compras no se
          procesan como transacciones reales.
        </p>
      </Card>

      <Card title="Pedidos y pagos">
        <ul>
          <li>Los pedidos generados son demostrativos.</li>
          <li>El pago con Yape, Plin o tarjeta no realiza cobros reales.</li>
          <li>Los comprobantes descargados tienen fines de presentacion.</li>
        </ul>
      </Card>

      <Card title="Contenido y marca">
        <p>
          Las imagenes, textos y recursos visuales se usan para representar la
          experiencia de Tunki Café dentro del proyecto. Cualquier uso comercial
          debe validarse con los responsables de la marca.
        </p>
      </Card>
    </InfoLayout>
  );
}
