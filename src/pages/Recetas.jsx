import { useEffect, useRef, useState } from "react";
import styles from "./Recetas.module.css";
import bebidas from "../assets/recetas/bebidas.png";
import bebida1 from "../assets/recetas/bebidas/bebida1.png";
import bebida2 from "../assets/recetas/bebidas/bebida2.png";
import bebida3 from "../assets/recetas/bebidas/bebida3.png";
import cafeMolido from "../assets/recetas/bebidas/cafe molido.png";
import cuchara from "../assets/recetas/bebidas/cuchara.png";
import granosCafe from "../assets/recetas/bebidas/granos de cafe.png";
import recetasGlass from "../assets/recetas/fondo-recetas-glass.jpg";
import recetasHero from "../assets/recetas/fondo-recetas.png";
import postres from "../assets/recetas/postres.png";
import dessertGroundCoffee from "../assets/recetas/postres/cafe molido.png";
import dessertSpoon from "../assets/recetas/postres/cuchara.png";
import dessertBeans from "../assets/recetas/postres/granos de cafe.png";
import postre1 from "../assets/recetas/postres/postre1.png";
import postre2 from "../assets/recetas/postres/postre2.png";
import postre3 from "../assets/recetas/postres/postre3.png";
import salados from "../assets/recetas/salados.png";
import savoryBeans from "../assets/recetas/salados/granos de cafe.png";
import honey from "../assets/recetas/salados/miel.png";
import savorySauce from "../assets/recetas/salados/cuchara.png";
import salado1 from "../assets/recetas/salados/salado1.png";
import salado2 from "../assets/recetas/salados/salado2.png";
import salado3 from "../assets/recetas/salados/salado3.png";

const recipeOptions = [
  {
    id: "bebidas",
    label: "Bebidas",
    image: bebidas,
    startPosition: { left: 50, top: 98 },
    description:
      "Bebidas frías y cremosas con café para refrescar el día sin perder intensidad.",
  },
  {
    id: "postres",
    label: "Postres",
    image: postres,
    startPosition: { left: 20, top: 86 },
    description:
      "Postres suaves y dulces donde el café aparece como el detalle profundo.",
  },
  {
    id: "salados",
    label: "Salados",
    image: salados,
    startPosition: { left: 80, top: 86 },
    description:
      "Preparaciones saladas con salsas y notas tostadas inspiradas en Tunki.",
  },
];

const drinkRecipes = [
  {
    id: "cold-brew",
    title: "Cold Brew (caf\u00e9 fr\u00edo)",
    image: bebida1,
    imageAlt: "Cold brew con hielo",
    imageClass: styles.coldDrinkImage,
    textClass: styles.coldDrinkText,
    ingredients: [
      "1 taza de caf\u00e9 molido grueso",
      "4 tazas de agua fr\u00eda",
      "Hielo y endulzante al gusto",
    ],
    preparation: [
      "Agrega el caf\u00e9 en un recipiente.",
      "Vierte el agua y mezcla suavemente.",
      "Deja reposar 12 a 16 horas en fr\u00edo.",
      "Filtra y sirve con hielo.",
    ],
  },
  {
    id: "frappe",
    title: "Frapp\u00e9 de Caf\u00e9",
    image: bebida2,
    imageAlt: "Frapp\u00e9 de caf\u00e9",
    imageClass: styles.frappeDrinkImage,
    textClass: styles.frappeDrinkText,
    ingredients: [
      "1 taza de caf\u00e9 fr\u00edo",
      "1 taza de hielo",
      "2 cdas de az\u00facar",
      "1/2 taza de leche",
      "2 cdas de salsa de chocolate",
    ],
    preparation: [
      "Lic\u00faa el caf\u00e9, hielo, az\u00facar, leche y chocolate.",
      "Sirve en un vaso alto.",
      "Decora con un toque extra de chocolate.",
      "Disfruta al instante.",
    ],
  },
  {
    id: "moca",
    title: "Café Moca",
    image: bebida3,
    imageAlt: "Café moca",
    imageClass: styles.mocaDrinkImage,
    textClass: styles.mocaDrinkText,
    ingredients: [
      "1 taza de caf\u00e9 molido grueso",
      "4 tazas de agua fr\u00eda",
      "Hielo al gusto",
      "Leche o endulzante al gusto",
    ],
    preparation: [
      "En un recipiente grande, agrega el caf\u00e9 molido.",
      "Vierte el agua fr\u00eda y mezcla suavemente.",
      "Cubre el recipiente y d\u00e9jalo reposar entre 12 y 18 horas.",
      "Filtra la mezcla usando un colador fino o filtro de caf\u00e9.",
      "Sirve en un vaso con hielo y a\u00f1ade leche o az\u00facar si deseas.",
    ],
  },
];

const savoryRecipes = [
  {
    id: "carne-marinada",
    title: "Carne marinada con caf\u00e9",
    image: salado3,
    imageAlt: "Carne marinada con caf\u00e9",
    imageClass: styles.steakSavoryImage,
    textClass: styles.steakSavoryText,
    ingredients: [
      "500 g de carne (lomo, bistec o churrasco)",
      "1 taza de caf\u00e9 Tunki Caff\u00e9 preparado y fr\u00edo",
      "2 cucharadas de sillao (soya)",
      "1 cucharada de miel o az\u00facar rubia",
      "2 dientes de ajo picados",
      "1 cucharadita de mostaza",
      "Pimienta al gusto",
      "Sal al gusto",
      "1 cucharada de aceite de oliva.",
    ],
    preparation: [
      "Mezcla el caf\u00e9, sillao, ajo, sal y pimienta.",
      "Marina la carne durante 1 hora para intensificar el sabor.",
      "Cocina en sart\u00e9n o parrilla hasta dorar ambos lados.",
    ],
  },
  {
    id: "salsa-cafe",
    title: "Salsa de caf\u00e9",
    image: salado1,
    imageAlt: "Salsa de caf\u00e9",
    imageClass: styles.sauceSavoryImage,
    textClass: styles.sauceSavoryText,
    ingredients: [
      "1/2 taza de caf\u00e9 preparado",
      "1 cucharada de mantequilla",
      "1 cucharadita de az\u00facar rubia o miel",
      "Sal y pimienta al gusto",
    ],
    preparation: [
      "Derrite la mantequilla en una sart\u00e9n.",
      "Agrega el caf\u00e9 y el az\u00facar.",
      "Cocina a fuego bajo hasta espesar ligeramente.",
      "A\u00f1ade sal y pimienta al gusto.",
    ],
  },
  {
    id: "pollo-bbq",
    title: "Pollo BBQ con Caf\u00e9",
    image: salado2,
    imageAlt: "Pollo BBQ con caf\u00e9",
    imageClass: styles.chickenSavoryImage,
    textClass: styles.chickenSavoryText,
    ingredients: [
      "2 piezas de pollo",
      "1/2 taza de caf\u00e9 Tunki Caff\u00e9 preparado",
      "3 cucharadas de salsa BBQ",
      "1 cucharada de miel",
      "1 diente de ajo picado",
      "Sal y pimienta",
    ],
    preparation: [
      "Mezcla el caf\u00e9, salsa BBQ, miel, ajo, sal y pimienta.",
      "Marina el pollo por 30 minutos.",
      "Cocina a la parrilla, sart\u00e9n o horno hasta dorar.",
      "Agrega m\u00e1s salsa durante la cocci\u00f3n para intensificar el sabor.",
    ],
  },
];

const dessertRecipes = [
  {
    id: "brownies-cafe",
    title: "Brownies de caf\u00e9",
    image: postre1,
    imageAlt: "Brownies de caf\u00e9",
    imageClass: styles.brownieDessertImage,
    textClass: styles.brownieDessertText,
    ingredients: [
      "Chocolate",
      "Mantequilla",
      "Harina",
      "Az\u00facar",
      "Huevos",
      "Caf\u00e9.",
    ],
    preparation: [
      "Se mezcla todo",
      "Se hornea hasta obtener una textura h\u00fameda y suave.",
    ],
  },
  {
    id: "flan-cafe",
    title: "Flan de Caf\u00e9 Tunki",
    image: postre2,
    imageAlt: "Flan de caf\u00e9 Tunki",
    imageClass: styles.flanDessertImage,
    textClass: styles.flanDessertText,
    ingredients: [
      "Leche condensada",
      "Leche evaporada",
      "Huevos",
      "Az\u00facar",
      "Caf\u00e9 Tunki",
    ],
    preparation: [
      "Preparar el caramelo con az\u00facar y colocarlo en el molde.",
      "Licuar los dem\u00e1s ingredientes.",
      "Cocinar a ba\u00f1o mar\u00eda hasta que el flan cuaje.",
    ],
  },
  {
    id: "cheesecake-cafe",
    title: "Cheesecake de Caf\u00e9",
    image: postre3,
    imageAlt: "Cheesecake de caf\u00e9",
    imageClass: styles.cheesecakeDessertImage,
    textClass: styles.cheesecakeDessertText,
    ingredients: [
      "Queso crema",
      "Caf\u00e9",
      "Galletas",
      "Mantequilla",
      "Az\u00facar",
    ],
    preparation: [
      "Triturar las galletas y mezclarlas con mantequilla para la base.",
      "Preparar la mezcla de queso crema con caf\u00e9.",
      "Refrigerar hasta que tome consistencia.",
    ],
  },
];

export default function Recetas() {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showDrinksWindow, setShowDrinksWindow] = useState(false);
  const [showDessertWindow, setShowDessertWindow] = useState(false);
  const [showSavoryWindow, setShowSavoryWindow] = useState(false);
  const sectionRefs = useRef([]);
  const drinksWindowRef = useRef(null);
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

      root.classList.toggle("recetas-footer-free-scroll", isInFooterArea);
    };

    root.classList.add("recetas-scroll-snap");
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
      if (
        showDrinksWindow ||
        showDessertWindow ||
        showSavoryWindow ||
        window.matchMedia("(max-width: 700px)").matches
      ) {
        return;
      }

      const footer = document.querySelector("footer");

      if (
        root.classList.contains("recetas-footer-free-scroll") ||
        (event.deltaY > 0 &&
          footer &&
          footer.getBoundingClientRect().top <= window.innerHeight + 80)
      ) {
        root.classList.add("recetas-footer-free-scroll");
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
      root.classList.remove("recetas-scroll-snap", "recetas-footer-free-scroll");
      window.removeEventListener("scroll", updateFooterScrollMode);
      window.removeEventListener("wheel", handleWheel);
    };
  }, [showDrinksWindow, showDessertWindow, showSavoryWindow]);

  useEffect(() => {
    if (!showDrinksWindow && !showDessertWindow && !showSavoryWindow) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setShowDrinksWindow(false);
        setShowDessertWindow(false);
        setShowSavoryWindow(false);
      }
    };

    const previousBodyOverflow = document.body.style.overflow;
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    drinksWindowRef.current?.focus({ preventScroll: true });

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousBodyOverflow;
    };
  }, [showDrinksWindow, showDessertWindow, showSavoryWindow]);

  const getOptionPosition = (option) => {
    if (!selectedRecipe) {
      return { ...option.startPosition, scale: 1 };
    }

    if (selectedRecipe.id === option.id) {
      return { left: 50, top: 9, scale: 1.9 };
    }

    const remaining = recipeOptions.filter(
      (recipe) => recipe.id !== selectedRecipe.id
    );
    const remainingIndex = remaining.findIndex((recipe) => recipe.id === option.id);
    const restingPositions = [
      { left: 22, top: 98, scale: 0.9 },
      { left: 78, top: 98, scale: 0.9 },
    ];

    return restingPositions[remainingIndex];
  };

  return (
    <div className={styles.recetas}>
      <section
        className={styles.hero}
        ref={(node) => {
          sectionRefs.current[0] = node;
        }}
        style={{ "--recetas-bg": `url(${recetasHero})` }}
      >
        <div className={styles.heroCopy}>
          <h1>¿Qué se te antoja hoy?</h1>
          <p>
            Desde refrescantes bebidas frías hasta deliciosos postres y
            preparaciones saladas, hemos recopilado algunas de nuestras mejores
            recetas a base de café para que disfrutes su increíble sabor en cada
            momento del día.
          </p>
        </div>
      </section>

      <section
        className={styles.progressSection}
        ref={(node) => {
          sectionRefs.current[1] = node;
        }}
      >
        <div className={styles.dessertFeature}>
          <svg
            className={styles.curvedText}
            viewBox="0 0 920 190"
            aria-hidden="true"
          >
            <path
              id="recipe-title-arc"
              d="M 82 148 Q 460 42 838 148"
              fill="none"
            />
            <text>
              <textPath href="#recipe-title-arc" startOffset="50%" textAnchor="middle">
                &#191;Quizás una receta para alegrar tu día?
              </textPath>
            </text>
          </svg>
          <div className={styles.dessertCircle}>
            {!selectedRecipe && <h2>Elige una opción</h2>}
            {selectedRecipe && (
              <div className={styles.recipeDescription}>
                <h3>{selectedRecipe.label}</h3>
                <p>{selectedRecipe.description}</p>
                <button
                  type="button"
                  onClick={() => {
                    if (selectedRecipe.id === "bebidas") {
                      setShowDrinksWindow(true);
                    }

                    if (selectedRecipe.id === "postres") {
                      setShowDessertWindow(true);
                    }

                    if (selectedRecipe.id === "salados") {
                      setShowSavoryWindow(true);
                    }
                  }}
                >
                  Ver
                </button>
              </div>
            )}

            <div className={styles.recipeOrbit} aria-label="Opciones de recetas">
              {recipeOptions.map((option) => {
                const position = getOptionPosition(option);

                return (
                  <button
                    className={`${styles.recipeOption} ${
                      selectedRecipe?.id === option.id ? styles.selectedOption : ""
                    }`}
                    key={option.id}
                    style={{
                      "--option-left": `${position.left}%`,
                      "--option-top": `${position.top}%`,
                      "--option-scale": position.scale,
                    }}
                    type="button"
                    onClick={() => setSelectedRecipe(option)}
                    aria-pressed={selectedRecipe?.id === option.id}
                  >
                    <img src={option.image} alt={option.label} />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {showDrinksWindow && (
        <div
          className={styles.drinksWindowBackdrop}
          onClick={() => setShowDrinksWindow(false)}
          role="presentation"
        >
          <article
            aria-label="Recetas de bebidas"
            aria-modal="true"
            className={styles.drinksWindow}
            onClick={(event) => event.stopPropagation()}
            ref={drinksWindowRef}
            role="dialog"
            style={{ "--drinks-window-bg": `url(${recetasGlass})` }}
            tabIndex="-1"
          >
            <button
              aria-label="Cerrar recetas de bebidas"
              className={styles.closeDrinksWindow}
              onClick={() => setShowDrinksWindow(false)}
              type="button"
            >
              x
            </button>

            <div className={styles.drinksRecipeSheet}>
              <img className={styles.beansDecor} src={granosCafe} alt="" aria-hidden="true" />
              <img className={styles.spoonDecor} src={cuchara} alt="" aria-hidden="true" />
              <img
                className={styles.groundCoffeeDecor}
                src={cafeMolido}
                alt=""
                aria-hidden="true"
              />

              {drinkRecipes.map((recipe) => (
                <section className={styles.drinkRecipeBlock} key={recipe.id}>
                  <img
                    className={`${styles.drinkRecipeImage} ${recipe.imageClass}`}
                    src={recipe.image}
                    alt={recipe.imageAlt}
                  />
                  <div className={`${styles.drinkRecipeText} ${recipe.textClass}`}>
                    <h2>{recipe.title}</h2>
                    <h3>INGREDIENTES</h3>
                    <ul>
                      {recipe.ingredients.map((ingredient) => (
                        <li key={ingredient}>{ingredient}</li>
                      ))}
                    </ul>
                    <h3>PREPARACION</h3>
                    <ol>
                      {recipe.preparation.map((step) => (
                        <li key={step}>{step}</li>
                      ))}
                    </ol>
                  </div>
                </section>
              ))}
            </div>
          </article>
        </div>
      )}

      {showDessertWindow && (
        <div
          className={styles.drinksWindowBackdrop}
          onClick={() => setShowDessertWindow(false)}
          role="presentation"
        >
          <article
            aria-label="Recetas de postres"
            aria-modal="true"
            className={styles.drinksWindow}
            onClick={(event) => event.stopPropagation()}
            ref={drinksWindowRef}
            role="dialog"
            style={{ "--drinks-window-bg": `url(${recetasGlass})` }}
            tabIndex="-1"
          >
            <button
              aria-label="Cerrar recetas de postres"
              className={styles.closeDrinksWindow}
              onClick={() => setShowDessertWindow(false)}
              type="button"
            >
              x
            </button>

            <div className={`${styles.drinksRecipeSheet} ${styles.dessertRecipeSheet}`}>
              <img className={styles.beansDecor} src={dessertBeans} alt="" aria-hidden="true" />
              <img className={styles.spoonDecor} src={dessertSpoon} alt="" aria-hidden="true" />
              <img
                className={styles.groundCoffeeDecor}
                src={dessertGroundCoffee}
                alt=""
                aria-hidden="true"
              />

              {dessertRecipes.map((recipe) => (
                <section className={styles.drinkRecipeBlock} key={recipe.id}>
                  <img
                    className={`${styles.drinkRecipeImage} ${recipe.imageClass}`}
                    src={recipe.image}
                    alt={recipe.imageAlt}
                  />
                  <div className={`${styles.drinkRecipeText} ${recipe.textClass}`}>
                    <h2>{recipe.title}</h2>
                    <h3>INGREDIENTES</h3>
                    <ul>
                      {recipe.ingredients.map((ingredient) => (
                        <li key={ingredient}>{ingredient}</li>
                      ))}
                    </ul>
                    <h3>PREPARACION</h3>
                    <ol>
                      {recipe.preparation.map((step) => (
                        <li key={step}>{step}</li>
                      ))}
                    </ol>
                  </div>
                </section>
              ))}
            </div>
          </article>
        </div>
      )}

      {showSavoryWindow && (
        <div
          className={styles.drinksWindowBackdrop}
          onClick={() => setShowSavoryWindow(false)}
          role="presentation"
        >
          <article
            aria-label="Recetas saladas"
            aria-modal="true"
            className={styles.drinksWindow}
            onClick={(event) => event.stopPropagation()}
            ref={drinksWindowRef}
            role="dialog"
            style={{ "--drinks-window-bg": `url(${recetasGlass})` }}
            tabIndex="-1"
          >
            <button
              aria-label="Cerrar recetas saladas"
              className={styles.closeDrinksWindow}
              onClick={() => setShowSavoryWindow(false)}
              type="button"
            >
              x
            </button>

            <div className={`${styles.drinksRecipeSheet} ${styles.savoryRecipeSheet}`}>
              <img className={styles.savoryBeansDecor} src={savoryBeans} alt="" aria-hidden="true" />
              <img className={styles.honeyDecor} src={honey} alt="" aria-hidden="true" />
              <img className={styles.savorySauceDecor} src={savorySauce} alt="" aria-hidden="true" />

              {savoryRecipes.map((recipe) => (
                <section className={styles.drinkRecipeBlock} key={recipe.id}>
                  <img
                    className={`${styles.drinkRecipeImage} ${recipe.imageClass}`}
                    src={recipe.image}
                    alt={recipe.imageAlt}
                  />
                  <div className={`${styles.drinkRecipeText} ${recipe.textClass}`}>
                    <h2>{recipe.title}</h2>
                    <h3>INGREDIENTES</h3>
                    <ul>
                      {recipe.ingredients.map((ingredient) => (
                        <li key={ingredient}>{ingredient}</li>
                      ))}
                    </ul>
                    <h3>PREPARACION</h3>
                    <ol>
                      {recipe.preparation.map((step) => (
                        <li key={step}>{step}</li>
                      ))}
                    </ol>
                  </div>
                </section>
              ))}
            </div>
          </article>
        </div>
      )}
    </div>
  );
}
