import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import cafeHero from "../assets/cafe/cafe.png";
import productoAmericano215 from "../assets/cafe/productos/PRODUCTO 1 cafe 215 gr.png";
import productoAmericano250 from "../assets/cafe/productos/PRODUCTO  1 250gr.png";
import productoAmericano500 from "../assets/cafe/productos/producto 1 500gr.png";
import productoExpresso215 from "../assets/cafe/productos/producto 2 215gr.png";
import productoExpresso250 from "../assets/cafe/productos/producto 2 250gr.png";
import productoExpresso500 from "../assets/cafe/productos/PRODUCTO 2 500g.png";
import styles from "./Cafe.module.css";

const americanoProducts = [
  {
    id: "americano-215",
    name: "Café en Grano gourmet",
    description:
      "Edición especial con notas cocoa, cereal dulce, base a nibs de cacao.",
    weight: "215 gr",
    price: "S/ 22.00",
    priceValue: 22,
    image: productoAmericano215,
  },
  {
    id: "americano-250",
    name: "Café en Grano",
    description:
      "Edición especial con sabores frutales de naranja panela, base a chocolate, pasas.",
    weight: "250 gr",
    price: "S/ 34.50",
    priceValue: 34.5,
    image: productoAmericano250,
  },
  {
    id: "americano-500",
    name: "Café Tostado y Molido",
    description: "Nuestro café insignia con notas de chocolate y caramelo.",
    weight: "500 gr",
    price: "S/ 73.00",
    priceValue: 73,
    image: productoAmericano500,
  },
  {
    id: "americano-especial-250",
    name: "Café Especial Tunki",
    description:
      "Perfil balanceado con aroma intenso y dulzor prolongado en taza.",
    weight: "250 gr",
    price: "S/ 36.00",
    priceValue: 36,
    image: productoAmericano250,
  },
  {
    id: "americano-altura-250",
    name: "Café de Altura",
    description:
      "Granos seleccionados de altura con cuerpo medio y final limpio.",
    weight: "250 gr",
    price: "S/ 31.00",
    priceValue: 31,
    image: productoAmericano215,
  },
];

const expressoProducts = [
  {
    id: "expresso-215",
    name: "Café tostado y molido",
    description:
      "Edición especial con notas a chocolate, frutos secos y caramelo.",
    weight: "215 gr",
    price: "S/ 40.00",
    priceValue: 40,
    image: productoExpresso215,
  },
  {
    id: "expresso-250",
    name: "Café en Grano",
    description:
      "Edición especial con notas cocoa, cereal dulce, base a nibs de cacao.",
    weight: "250 gr",
    price: "S/ 29.50",
    priceValue: 29.5,
    image: productoExpresso250,
  },
  {
    id: "expresso-500",
    name: "Café Tostado y Molido",
    description:
      "Edición especial presenta notas de cocoa, cereal dulce y nibs de cacao.",
    weight: "500 gr",
    price: "S/ 50.00",
    priceValue: 50,
    image: productoExpresso500,
  },
  {
    id: "expresso-intenso-250",
    name: "Expresso Tunki Intenso",
    description:
      "Tueste intenso con cuerpo alto, baja acidez y final persistente.",
    weight: "250 gr",
    price: "S/ 38.00",
    priceValue: 38,
    image: productoExpresso250,
  },
  {
    id: "expresso-reserva-250",
    name: "Expresso Reserva",
    description: "Blend aromatico para taza corta con notas dulces y tostadas.",
    weight: "250 gr",
    price: "S/ 42.00",
    priceValue: 42,
    image: productoExpresso215,
  },
];

function ProductShowcase({ title, products, onAddToCart, largeVisual = false }) {
  const [activeIndex, setActiveIndex] = useState(1);
  const activeProduct = products[activeIndex];

  return (
    <section className={styles.productShowcase}>
      <div
        className={`${styles.showcaseVisual} ${
          largeVisual ? styles.largeShowcaseVisual : ""
        }`}
      >
        <div className={styles.showcaseHeading}>
          <h2>Nuestros productos</h2>
          <span>{title}</span>
        </div>
        <img src={activeProduct.image} alt={activeProduct.name} />
      </div>

      <div className={styles.showcaseDetails}>
        <div className={styles.productDetail}>
          <img
            className={styles.detailImage}
            src={activeProduct.image}
            alt=""
            aria-hidden="true"
          />
          <span>{activeProduct.weight}</span>
          <h3>{activeProduct.name}</h3>
          <strong>{activeProduct.price}</strong>
          <p>{activeProduct.description}</p>
          <button
            type="button"
            aria-label={`Agregar ${activeProduct.name} al carrito`}
            onClick={() =>
              onAddToCart?.({
                id: activeProduct.id,
                name: activeProduct.name,
                type: title,
                weight: activeProduct.weight,
                price: activeProduct.priceValue,
                image: activeProduct.image,
              })
            }
          >
            <FaShoppingCart />
            Agregar al carrito
          </button>
        </div>

        <div className={styles.productSelector}>
          {products.slice(0, 3).map((product, index) => (
            <button
              className={index === activeIndex ? styles.activeSelector : ""}
              key={product.name}
              type="button"
              aria-label={`Ver ${product.name}`}
              onClick={() => setActiveIndex(index)}
            >
              <img src={product.image} alt="" aria-hidden="true" />
              <h4>{product.name}</h4>
              <span>{product.weight}</span>
              <strong>{product.price}</strong>
            </button>
          ))}
        </div>
      </div>

    </section>
  );
}

function MobileProductShowcase({ onAddToCart }) {
  const categories = [
    { id: "capuccino", label: "Capuccino", title: "Tipo capuccino", products: americanoProducts },
    { id: "express", label: "Express", title: "Tipo expresso", products: expressoProducts },
  ];
  const [activeCategory, setActiveCategory] = useState(categories[1].id);
  const currentCategory =
    categories.find((category) => category.id === activeCategory) || categories[0];

  return (
    <section className={styles.mobileProductsShowcase}>
      <aside className={styles.mobileCategoryRail} aria-label="Categorias de cafe">
        {categories.map((category) => (
          <button
            className={category.id === activeCategory ? styles.activeCategory : ""}
            key={category.id}
            type="button"
            onClick={() => setActiveCategory(category.id)}
            aria-pressed={category.id === activeCategory}
          >
            {category.label}
          </button>
        ))}
      </aside>

      <div className={styles.mobileProductsContent}>
        <div className={styles.mobileProductsHero}>
          <div>
            <span>Nuestros Productos</span>
            <h2>{currentCategory.title}</h2>
          </div>
        </div>

        <div className={styles.mobileProductList}>
          {currentCategory.products.slice(0, 3).map((product) => (
            <article className={styles.mobileProductCard} key={product.id}>
              <div className={styles.mobileProductImage}>
                <img src={product.image} alt={product.name} />
              </div>
              <div className={styles.mobileProductInfo}>
                <h3>{product.name}</h3>
                <strong>{product.price}</strong>
                <span>{product.weight}</span>
              </div>
              <button
                type="button"
                aria-label={`Agregar ${product.name} al carrito`}
                onClick={() =>
                  onAddToCart?.({
                    id: product.id,
                    name: product.name,
                    type: currentCategory.title,
                    weight: product.weight,
                    price: product.priceValue,
                    image: product.image,
                  })
                }
              >
                <FaShoppingCart />
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Cafe({ onAddToCart }) {
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

      root.classList.toggle("cafe-footer-free-scroll", isInFooterArea);
    };

    const handleWheel = (event) => {
      if (event.deltaY <= 0) {
        return;
      }

      const footer = document.querySelector("footer");

      if (!footer) {
        return;
      }

      if (footer.getBoundingClientRect().top <= window.innerHeight + 80) {
        root.classList.add("cafe-footer-free-scroll");
      }
    };

    root.classList.add("cafe-scroll-snap");
    updateFooterScrollMode();
    window.addEventListener("scroll", updateFooterScrollMode, { passive: true });
    window.addEventListener("wheel", handleWheel, { passive: true });

    return () => {
      root.classList.remove("cafe-scroll-snap", "cafe-footer-free-scroll");
      window.removeEventListener("scroll", updateFooterScrollMode);
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <section className={styles.cafePage}>
      <div className={styles.hero}>
        <article className={`${styles.heroText} ${styles.originText}`}>
          <h2>Origen Unico</h2>
          <p>
            Nuestras semillas provienen de las alturas de los Andes peruanos,
            donde el clima frio de montana, los suelos fertiles y la cosecha
            paciente ayudan a formar una taza con identidad propia.
          </p>
        </article>

        <article className={`${styles.heroText} ${styles.qualityText}`}>
          <h2>Calidad Premium</h2>
          <p>
            Cada semilla es seleccionada cuidadosamente para garantizar
            uniformidad, aroma limpio y un sabor equilibrado. Solo los granos
            que expresan mejor su origen pasan al siguiente proceso.
          </p>
        </article>

        <img
          className={styles.heroBean}
          src={cafeHero}
          alt="Grano de cafe Tunki"
        />

        <article className={`${styles.heroText} ${styles.processText}`}>
          <h2>Proceso Artesanal</h2>
          <p>
            Utilizamos metodos tradicionales combinados con tecnicas modernas
            para preservar la esencia del cafe. El secado, la seleccion y el
            tostado se trabajan con precision para cuidar cada matiz.
          </p>
        </article>

        <article className={`${styles.heroText} ${styles.sustainabilityText}`}>
          <h2>Sostenibilidad</h2>
          <p>
            Comprometidos con el medio ambiente y las comunidades locales,
            promovemos un cultivo responsable que respeta los ciclos de la tierra
            y fortalece el trabajo de las familias productoras.
          </p>
        </article>
      </div>

      <div className={styles.productsSection} id="nuestros-productos">
        <MobileProductShowcase onAddToCart={onAddToCart} />
        <ProductShowcase
          title="Tipo americano"
          products={americanoProducts}
          onAddToCart={onAddToCart}
        />
        <ProductShowcase
          title="Tipo expresso"
          products={expressoProducts}
          onAddToCart={onAddToCart}
          largeVisual
        />
      </div>
    </section>
  );
}
