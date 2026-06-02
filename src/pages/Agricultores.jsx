import styles from "./Agricultores.module.css";
import leavesImage from "../assets/agricultores/hoojas.png";
import heroBasket from "../assets/agricultores/portada agricultores.svg";
import coffeeBean from "../assets/agricultores/cafe.png";
import farmerOne from "../assets/agricultores/agricultor 1.png";
import farmerTwo from "../assets/agricultores/agricultor 2.png";
import farmersStore from "../assets/agricultores/agicultores.png";
import farmersBags from "../assets/agricultores/agricutoress.png";
import farmerHarvest from "../assets/agricultores/gricultores.png";

const galleryImages = [
  {
    src: farmersStore,
    alt: "Agricultores con bolsas de cafe Tunki",
  },
  {
    src: farmersBags,
    alt: "Agricultores junto a sacos de cafe",
  },
  {
    src: farmerHarvest,
    alt: "Agricultor cosechando cafe",
  },
];

export default function Agricultores() {
  return (
    <div
      className={styles.page}
      style={{ "--leaf-texture": `url("${leavesImage}")` }}
    >
      <section
        className={styles.hero}
        style={{
          "--hero-basket": `url("${heroBasket}")`,
        }}
      >
        <div className={styles.heroCopyLeft}>
          <h1>
            Detras de cada aroma y sabor, hay manos peruanas que cultivan cafe
            con pasion y tradicion.
          </h1>
        </div>

        <span className={styles.heroBasket} aria-hidden="true" />

        <p className={styles.heroCopyRight}>
          Trabajamos junto a agricultores de comunidades peruanas que cultivan
          cafe de especialidad de manera responsable y sostenible. Nuestro
          compromiso es valorar su trabajo, respetar el origen del cafe y
          compartir contigo una experiencia autentica en cada taza.
        </p>
      </section>

      <section className={styles.profileSection} aria-label="Agricultores destacados">
        <article className={styles.profileRow}>
          <div className={styles.imageWrap}>
            <img className={styles.beanOne} src={coffeeBean} alt="" aria-hidden="true" />
            <img src={farmerOne} alt="Raul Mamani cosechando cafe" />
          </div>
          <div className={styles.profileText}>
            <span className={styles.profileNumber}>01</span>
            <h2>Raul Mamani</h2>
            <strong>Putina Punco, Puno</strong>
            <p>
              Productor de cafe de especialidad comprometido con la calidad,
              tradicion y sostenibilidad.
            </p>
          </div>
        </article>

        <article className={`${styles.profileRow} ${styles.profileRowAlt}`}>
          <div className={styles.profileText}>
            <span className={styles.profileNumber}>02</span>
            <h2>Wilson Sucaticona Larico</h2>
            <strong>Sandia, Puno</strong>
            <p>
              Reconocido mundialmente por producir uno de los mejores cafes
              organicos del mundo.
            </p>
          </div>
          <div className={styles.imageWrap}>
            <img className={styles.beanTwo} src={coffeeBean} alt="" aria-hidden="true" />
            <img src={farmerTwo} alt="Wilson Sucaticona en cafetal" />
          </div>
        </article>
      </section>

      <section className={styles.gallerySection}>
        <h2>
          Gracias al trabajo de nuestros agricultores, cada taza de Tunki Cafe
          lleva consigo historia, origen y autenticidad.
        </h2>

        <div className={styles.galleryGrid}>
          {galleryImages.map((image) => (
            <img src={image.src} alt={image.alt} key={image.src} />
          ))}
        </div>
      </section>
    </div>
  );
}
