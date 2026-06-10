import { useState } from "react";
import { FaBoxOpen, FaCalendarAlt, FaCertificate, FaHandshake } from "react-icons/fa";
import styles from "./Mayoristas.module.css";
import cafeBag from "../assets/home/bolsa-cafe.png";

const benefits = [
  {
    icon: <FaBoxOpen />,
    title: "Precios especiales por volumen",
    description: "Escalas comerciales pensadas para rotacion constante.",
  },
  {
    icon: <FaCalendarAlt />,
    title: "Entrega programada",
    description: "Coordinamos despachos recurrentes según tu operación.",
  },
  {
    icon: <FaCertificate />,
    title: "Café certificado de origen",
    description: "Café Tunki directamente desde los Andes peruanos.",
  },
  {
    icon: <FaHandshake />,
    title: "Atencion personalizada",
    description: "Acompañamiento para cafeterías, tiendas y distribuidores.",
  },
];

const initialForm = {
  businessName: "",
  contactName: "",
  email: "",
  phone: "",
  businessType: "cafeteria",
  presentation: "1kg",
  monthlyVolume: "",
  city: "",
  message: "",
};

export default function Mayoristas() {
  const [formData, setFormData] = useState(initialForm);
  const [message, setMessage] = useState("");

  const updateField = (field, value) => {
    setFormData((current) => ({ ...current, [field]: value }));
    setMessage("");
  };

  const submitWholesaleRequest = (event) => {
    event.preventDefault();

    const requests = JSON.parse(localStorage.getItem("tunkiWholesaleRequests") || "[]");
    const nextRequest = {
      id: `MAY-${Date.now()}`,
      ...formData,
      createdAt: new Date().toISOString(),
      status: "pendiente",
    };

    localStorage.setItem(
      "tunkiWholesaleRequests",
      JSON.stringify([nextRequest, ...requests])
    );
    setFormData(initialForm);
    setMessage("Solicitud enviada. Nuestro equipo mayorista se comunicará contigo pronto.");
  };

  return (
    <section className={styles.wholesalePage}>
      <div className={styles.hero}>
        <div className={styles.heroCopy}>
          <span>Ventas al por mayor</span>
          <h1>Café Tunki para negocios</h1>
          <p>
            Ofrecemos café en bolsas de 1kg y 5kg para distribuidores,
            cafeterías y negocios. Las ventas al por mayor permiten acceder a
            precios preferenciales y un suministro constante de café Tunki,
            directamente desde los Andes.
          </p>
        </div>

        <div className={styles.heroVisual} aria-hidden="true">
          <img src={cafeBag} alt="" />
        </div>
      </div>

      <div className={styles.benefitsGrid}>
        {benefits.map((benefit) => (
          <article className={styles.benefitCard} key={benefit.title}>
            <div>{benefit.icon}</div>
            <h2>{benefit.title}</h2>
            <p>{benefit.description}</p>
          </article>
        ))}
      </div>

      <div className={styles.formSection}>
        <div>
          <span>Solicitud comercial</span>
          <h2>Cuéntanos sobre tu negocio</h2>
          <p>
            Completa el formulario y prepararemos una propuesta según tu volumen,
            ciudad y tipo de negocio.
          </p>
        </div>

        <form className={styles.wholesaleForm} onSubmit={submitWholesaleRequest}>
          <label>
            Nombre del negocio
            <input
              required
              value={formData.businessName}
              onChange={(event) => updateField("businessName", event.target.value)}
              placeholder="Ej. Cafetería Los Andes"
            />
          </label>

          <label>
            Persona de contacto
            <input
              required
              value={formData.contactName}
              onChange={(event) => updateField("contactName", event.target.value)}
              placeholder="Nombre y apellido"
            />
          </label>

          <label>
            Correo
            <input
              required
              type="email"
              value={formData.email}
              onChange={(event) => updateField("email", event.target.value)}
              placeholder="compras@negocio.com"
            />
          </label>

          <label>
            Teléfono
            <input
              required
              inputMode="tel"
              value={formData.phone}
              onChange={(event) => updateField("phone", event.target.value)}
              placeholder="999 999 999"
            />
          </label>

          <label>
            Tipo de negocio
            <select
              value={formData.businessType}
              onChange={(event) => updateField("businessType", event.target.value)}
            >
              <option value="cafeteria">Cafetería</option>
              <option value="distribuidor">Distribuidor</option>
              <option value="hotel">Hotel o restaurante</option>
              <option value="tienda">Tienda especializada</option>
            </select>
          </label>

          <label>
            Presentacion de interes
            <select
              value={formData.presentation}
              onChange={(event) => updateField("presentation", event.target.value)}
            >
              <option value="1kg">Bolsas de 1kg</option>
              <option value="5kg">Bolsas de 5kg</option>
              <option value="ambas">1kg y 5kg</option>
            </select>
          </label>

          <label>
            Volumen mensual estimado
            <input
              required
              value={formData.monthlyVolume}
              onChange={(event) => updateField("monthlyVolume", event.target.value)}
              placeholder="Ej. 20 kg al mes"
            />
          </label>

          <label>
            Ciudad
            <input
              required
              value={formData.city}
              onChange={(event) => updateField("city", event.target.value)}
              placeholder="Ej. Lima"
            />
          </label>

          <label className={styles.fullField}>
            Mensaje
            <textarea
              value={formData.message}
              onChange={(event) => updateField("message", event.target.value)}
              placeholder="Cuéntanos si necesitas una frecuencia de entrega, molienda específica o condiciones especiales."
              rows="4"
            />
          </label>

          {message && <p className={styles.formMessage}>{message}</p>}

          <button type="submit">Enviar solicitud</button>
        </form>
      </div>
    </section>
  );
}
