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
      kicker="Atención Tunki"
      title="Contacto"
      description="Estamos para ayudarte con pedidos, consultas sobre nuestros productos y coordinaciones de entrega."
    >
      <Card title="Canales de atención">
        <div className={styles.contactGrid}>
          <div className={styles.contactItem}>
            <strong>WhatsApp</strong>
            <span>+51 963 436 873</span>
          </div>
          <div className={styles.contactItem}>
            <strong>Correo</strong>
            <span>hola@tunkicafe.pe</span>
          </div>
          <div className={styles.contactItem}>
            <strong>Horario</strong>
            <span>Lunes a sábado, 9:00 a.m. - 7:00 p.m.</span>
          </div>
        </div>
      </Card>

      <Card title="Ubicación referencial">
        <p>
          Tunki Coffee atiende desde Puno, Perú. Para compras con recojo en tienda o
          envío por agencia, confirmamos los detalles de entrega después de generar
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
      description="Esta página resume cómo Tunki Coffee trata la información usada dentro de este demo."
    >
      <Card title="Información que usamos">
        <p>
          En este demo guardamos datos básicos como correo, nombre de usuario,
          carrito y pedidos en el navegador mediante localStorage. No se envía
          información a un servidor externo.
        </p>
      </Card>

      <Card title="Uso de la información">
        <ul>
          <li>Permitir el inicio de sesión simulado.</li>
          <li>Mostrar pedidos dentro de Mi Perfil.</li>
          <li>Generar comprobantes de compra para el flujo de demostración.</li>
        </ul>
      </Card>

      <Card title="Control del usuario">
        <p>
          Puedes cerrar sesión desde Mi Perfil. Como los datos se almacenan en el
          navegador, también puedes eliminarlos limpiando el almacenamiento local
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
      description="Estas condiciones aplican al uso de la experiencia web de Tunki Coffee como demo funcional."
    >
      <Card title="Uso del sitio">
        <p>
          Este sitio permite explorar productos, recetas, información de origen,
          carrito de compras y un proceso de pago simulado. Las compras no se
          procesan como transacciones reales.
        </p>
      </Card>

      <Card title="Pedidos y pagos">
        <ul>
          <li>Los pedidos generados son demostrativos.</li>
          <li>El pago con Yape, Plin o tarjeta no realiza cobros reales.</li>
          <li>Los comprobantes descargados tienen fines de presentación.</li>
        </ul>
      </Card>

      <Card title="Contenido y marca">
        <p>
          Las imágenes, textos y recursos visuales se usan para representar la
          experiencia de Tunki Coffee dentro del proyecto. Cualquier uso comercial
          debe validarse con los responsables de la marca.
        </p>
      </Card>
    </InfoLayout>
  );
}
