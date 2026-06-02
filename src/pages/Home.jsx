import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import heroVideo from "../assets/video.mp4";
import selloAltura from "../assets/home/sellos/ICONOS CON SOMBRA-01.png";
import selloOrganico from "../assets/home/sellos/ICONOS CON SOMBRA-02.png";
import selloEspecialidad from "../assets/home/sellos/ICONOS CON SOMBRA-03.png";
import selloSostenible from "../assets/home/sellos/ICONOS CON SOMBRA-04.png";
import bolsaCafe from "../assets/home/bolsa-cafe.png";
import dibujoCafe from "../assets/home/dibujo-cafe.png";
import fondoAgricultor from "../assets/home/fondo agricultor.png";
import tasaCafe from "../assets/home/tasa.png";

const qualitySeals = [
  {
    image: selloAltura,
    title: "Cultivo de altura",
  },
  {
    image: selloOrganico,
    title: "Proceso sostenible",
  },
  {
    image: selloEspecialidad,
    title: "Origen organico",
  },
  {
    image: selloSostenible,
    title: "Especialidad",
  },
];

export default function Home() {
  const sectionRefs = useRef([]);
  const isSnapping = useRef(false);

  useEffect(() => {
    const root = document.documentElement;

    const updateFooterScrollMode = () => {
      const footer = document.querySelector("footer");

      if (!footer) {
        return;
      }

      const footerBounds = footer.getBoundingClientRect();
      const isInFooterArea =
        footerBounds.top < window.innerHeight - 2 ||
        footerBounds.bottom <= window.innerHeight + 2;

      root.classList.toggle("home-footer-free-scroll", isInFooterArea);
    };

    root.classList.add("home-scroll-snap");
    updateFooterScrollMode();

    const getActiveSectionIndex = () => {
      return sectionRefs.current.reduce((closestIndex, section, index) => {
        if (!section) {
          return closestIndex;
        }

        const currentSection = sectionRefs.current[closestIndex];

        if (!currentSection) {
          return index;
        }

        const currentDistance = Math.abs(currentSection.offsetTop - window.scrollY);
        const sectionDistance = Math.abs(section.offsetTop - window.scrollY);

        return sectionDistance < currentDistance ? index : closestIndex;
      }, 0);
    };

    const handleWheel = (event) => {
      if (window.matchMedia("(max-width: 700px)").matches) {
        return;
      }

      const footer = document.querySelector("footer");

      if (
        root.classList.contains("home-footer-free-scroll") ||
        (event.deltaY > 0 &&
          footer &&
          footer.getBoundingClientRect().top <= window.innerHeight + 80)
      ) {
        root.classList.add("home-footer-free-scroll");
        return;
      }

      const sections = sectionRefs.current.filter(Boolean);

      if (isSnapping.current || sections.length === 0 || Math.abs(event.deltaY) < 8) {
        return;
      }

      const activeIndex = getActiveSectionIndex();
      const nextIndex =
        event.deltaY > 0
          ? Math.min(activeIndex + 1, sections.length - 1)
          : Math.max(activeIndex - 1, 0);

      if (nextIndex === activeIndex) {
        return;
      }

      event.preventDefault();
      isSnapping.current = true;
      sections[nextIndex].scrollIntoView({ behavior: "smooth", block: "start" });

      window.setTimeout(() => {
        isSnapping.current = false;
      }, 820);
    };

    window.addEventListener("scroll", updateFooterScrollMode, { passive: true });
    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      root.classList.remove("home-scroll-snap", "home-footer-free-scroll");
      window.removeEventListener("scroll", updateFooterScrollMode);
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div className={styles.home}>
      <section
        className={styles.hero}
        ref={(node) => {
          sectionRefs.current[0] = node;
        }}
      >
        <video
          className={styles.heroVideo}
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <div className={styles.heroCopy}>
            <span className={styles.heroKicker}>Café peruano de altura</span>
            <h1>Tunki</h1>
            <p>Una experiencia de origen, aroma y tradición en cada taza.</p>
            <Link className={styles.originButton} to="/origen">
              Nuestro origen
            </Link>
          </div>
        </div>
      </section>

      <section
        className={styles.qualitySection}
        ref={(node) => {
          sectionRefs.current[1] = node;
        }}
      >
        <h2>Sellos de calidad</h2>
        <div className={styles.sealGrid}>
          {qualitySeals.map((seal) => (
            <article className={styles.sealCard} key={seal.title}>
              <img src={seal.image} alt="" aria-hidden="true" />
              <h3>{seal.title}</h3>
            </article>
          ))}
        </div>
        <p className={styles.qualityQuote}>
          "Reconocido entre los mejores cafés del mundo"
        </p>
      </section>

      <section
        className={styles.originProductSection}
        ref={(node) => {
          sectionRefs.current[2] = node;
        }}
      >
        <div className={styles.originProductCopy}>
          <h2>
            Nuestro origen
            <br />
            mas
            <br />
            representativo
          </h2>
          <p>
            Origen único de los Andes peruanos.
            <br />
            Floral, dulce y equilibrado.
          </p>
          <Link className={styles.discoverButton} to="/cafe">
            Descubrir más
          </Link>
        </div>
        <div className={styles.originProductVisual}>
          <img
            className={styles.bagImage}
            src={bolsaCafe}
            alt="Bolsa de café Tunki"
          />
          <img
            className={styles.coffeeDrawing}
            src={dibujoCafe}
            alt=""
            aria-hidden="true"
          />
        </div>
      </section>

      <section
        className={styles.farmerSection}
        ref={(node) => {
          sectionRefs.current[3] = node;
        }}
      >
        <div
          className={styles.farmerBackground}
          style={{ backgroundImage: `url("${fondoAgricultor}")` }}
          aria-hidden="true"
        />
        <img
          className={styles.cupImage}
          src={tasaCafe}
          alt=""
          aria-hidden="true"
        />
        <div className={styles.farmerContent}>
          <h2>Historias que se cultivan en altura</h2>
          <p>
            Mas que un origen, es una historia que comienza en manos expertas y
            llega a tu taza.
          </p>
          <Link className={styles.farmerButton} to="/agricultores">
            nuestros
            <br />
            agricultores
          </Link>
        </div>
      </section>
    </div>
  );
}
