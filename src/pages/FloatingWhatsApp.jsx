import { FaWhatsapp } from "react-icons/fa";
import styles from "./FloatingWhatsApp.module.css";

const whatsappUrl =
  "https://wa.me/51963436873?text=Hola%20Tunki%20Coffee%2C%20quiero%20hacer%20una%20consulta.";

export default function FloatingWhatsApp() {
  return (
    <a
      className={styles.whatsappButton}
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      aria-label="Chatear con Tunki Coffee por WhatsApp"
    >
      <FaWhatsapp />
      <span>comunicarse con Tunki</span>
    </a>
  );
}
