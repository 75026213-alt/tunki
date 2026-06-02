import { useEffect, useRef } from "react";
import legadoOrigen from "../assets/origen/el_legado.png";
import agriOrigen from "../assets/origen/agri.png";
import portadaOrigen from "../assets/origen/portada.jpg";
import reconocimientoOrigen from "../assets/origen/reconocimiento.png";
import valorSostenibilidad from "../assets/origen/valor1.png";
import valorCalidad from "../assets/origen/valor2.png";
import valorComercio from "../assets/origen/valor3.png";
import styles from "./Origen.module.css";

const valores = [
  {
    image: valorSostenibilidad,
    title: "Sostenibilidad",
  },
  {
    image: valorCalidad,
    title: "Calidad de especialidad",
  },
  {
    image: valorComercio,
    title: "Comercio justo",
  },
];

const Origen = () => {
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

      root.classList.toggle("origen-footer-free-scroll", isInFooterArea);
    };

    root.classList.add("origen-scroll-snap");
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
        root.classList.contains("origen-footer-free-scroll") ||
        (event.deltaY > 0 &&
          footer &&
          footer.getBoundingClientRect().top <= window.innerHeight + 80)
      ) {
        root.classList.add("origen-footer-free-scroll");
        return;
      }

      const sections = sectionRefs.current.filter(Boolean);

      if (isSnapping.current || sections.length === 0 || Math.abs(event.deltaY) < 8) {
        return;
      }

      const activeIndex = getActiveSectionIndex();
      const activeSection = sections[activeIndex];

      if (activeIndex === 1 && activeSection.offsetHeight > window.innerHeight) {
        const sectionTop = activeSection.offsetTop;
        const sectionBottom = sectionTop + activeSection.offsetHeight;
        const viewportBottom = window.scrollY + window.innerHeight;
        const canScrollDown = event.deltaY > 0 && viewportBottom < sectionBottom - 2;
        const canScrollUp = event.deltaY < 0 && window.scrollY > sectionTop + 2;

        if (canScrollDown || canScrollUp) {
          return;
        }
      }

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
      root.classList.remove("origen-scroll-snap", "origen-footer-free-scroll");
      window.removeEventListener("scroll", updateFooterScrollMode);
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div className={styles.page}>
      <section
        className={styles.hero}
        ref={(node) => {
          sectionRefs.current[0] = node;
        }}
        style={{ backgroundImage: `url("${portadaOrigen}")` }}
      >
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1>
            Altura, clima y
            <br />
            tradición: el
            <br />
            verdadero secreto
            <br />
            de nuestro café.
          </h1>
        </div>
      </section>

      <section className={styles.originSection}>
        <div
          className={styles.storySection}
          ref={(node) => {
            sectionRefs.current[1] = node;
          }}
        >
          <h2>Nuestro origen</h2>

          <div className={`${styles.storyRow} ${styles.storyRowTop}`}>
            <div className={styles.storyText}>
              <h3>El nacimiento</h3>
              <p>
                Tunki Coffee nace en los valles de Tambopata e Inambari, en la
                region de Puno, Peru. Cultivado entre los 1,300 y 1,800 msnm por
                comunidades quechuas y aimaras, su produccion es organica y
                tradicional, respetando los ciclos naturales de la tierra andina.
              </p>
            </div>
            <img
              className={`${styles.storyImage} ${styles.birthImage}`}
              src={agriOrigen}
              alt=""
            />
          </div>

          <div className={`${styles.storyRow} ${styles.storyRowMiddle}`}>
            <img
              className={`${styles.storyImage} ${styles.awardImage}`}
              src={reconocimientoOrigen}
              alt=""
            />
            <div className={`${styles.storyText} ${styles.storyTextCentered}`}>
              <h3>El reconocimiento</h3>
              <p>
                En el ano 2010, este cafe alcanzo reconocimiento internacional al
                ser premiado como uno de los mejores cafes especiales del mundo
                por la Specialty Coffee Association of America. Este logro marco
                un hito para el cafe peruano y posiciono a la region en el
                escenario global.
              </p>
            </div>
          </div>

          <div className={`${styles.storyRow} ${styles.storyRowBottom}`}>
            <div className={styles.storyText}>
              <h3>El legado</h3>
              <p>
                Desde entonces, Tunki Coffee se ha convertido en un simbolo del
                cafe peruano de alta calidad.
              </p>
              <p>Cada taza representa:</p>
              <ul>
                <li>Altura</li>
                <li>Tradicion</li>
                <li>Comunidad</li>
                <li>Excelencia</li>
              </ul>
            </div>
            <img
              className={`${styles.storyImage} ${styles.legacyImage}`}
              src={legadoOrigen}
              alt=""
            />
          </div>
        </div>

        <div
          className={styles.valuesSection}
          ref={(node) => {
            sectionRefs.current[2] = node;
          }}
        >
          <h2 className={styles.valuesTitle}>Nuestros valores</h2>
          <div className={styles.valuesGrid}>
            {valores.map((valor) => (
              <article className={styles.valueCard} key={valor.title}>
                <h3>{valor.title}</h3>
                <div className={styles.valueImageFrame}>
                  <img src={valor.image} alt="" />
                </div>
              </article>
            ))}
          </div>
          <p className={styles.valuesQuote}>
            "Reconocido entre los mejores cafes del mundo"
          </p>
        </div>
      </section>
    </div>
  );
};

export default Origen;
