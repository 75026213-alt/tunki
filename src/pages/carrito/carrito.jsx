import {
  FaCcVisa,
  FaMinus,
  FaPlus,
  FaShoppingCart,
  FaTimes,
  FaTruck,
} from "react-icons/fa";
import qrImage from "../../assets/carrito/image.png";
import cafeDecoImage from "../../assets/carrito/cafe-deco.png";
import plinImage from "../../assets/carrito/plin.png";
import productImage from "../../assets/recetas/bebidas/granos de cafe.png";
import yapeImage from "../../assets/carrito/yape.png";
import styles from "./carrito.module.css";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.js";
import { createOrder } from "../../services/api.js";
import { downloadOrderPDF } from "../../services/pdf.js";
import { calculatePointsForOrder } from "../../services/rewards.js";

const PRODUCT = {
  id: 1,
  name: "Café en Grano Tunki",
  type: "Americano",
  weight: "250 gr",
  price: 34.5,
  image: productImage,
};

const peruRegions = [
  {
    id: "lima",
    name: "Lima",
    cities: [
      { id: "lima", name: "Lima" },
      { id: "huacho", name: "Huacho" },
      { id: "canete", name: "Cañete" },
    ],
  },
  {
    id: "arequipa",
    name: "Arequipa",
    cities: [
      { id: "arequipa", name: "Arequipa" },
      { id: "camana", name: "Camaná" },
    ],
  },
  {
    id: "cusco",
    name: "Cusco",
    cities: [
      { id: "cusco", name: "Cusco" },
      { id: "sicuani", name: "Sicuani" },
    ],
  },
  {
    id: "puno",
    name: "Puno",
    cities: [
      { id: "puno", name: "Puno" },
      { id: "juliaca", name: "Juliaca" },
      { id: "ilave", name: "Ilave" },
    ],
  },
  {
    id: "la-libertad",
    name: "La Libertad",
    cities: [
      { id: "trujillo", name: "Trujillo" },
      { id: "chepen", name: "Chepén" },
    ],
  },
  {
    id: "lambayeque",
    name: "Lambayeque",
    cities: [
      { id: "chiclayo", name: "Chiclayo" },
      { id: "lambayeque", name: "Lambayeque" },
    ],
  },
  {
    id: "piura",
    name: "Piura",
    cities: [
      { id: "piura", name: "Piura" },
      { id: "sullana", name: "Sullana" },
    ],
  },
  {
    id: "junin",
    name: "Junín",
    cities: [
      { id: "huancayo", name: "Huancayo" },
      { id: "tarma", name: "Tarma" },
    ],
  },
];

const agencyLocationsByCity = {
  lima: {
    shalom: "Shalom Lima - Av. Nicolás Arriola 1723, La Victoria",
    olva: "Olva Lima - Av. Javier Prado Este 1750, San Isidro",
  },
  huacho: {
    shalom: "Shalom Huacho - Av. 28 de Julio 645, Cercado",
    olva: "Olva Huacho - Panamericana Norte 502, Cercado",
  },
  canete: {
    shalom: "Shalom Cañete - Av. Mariscal Benavides 398, San Vicente",
    olva: "Olva Cañete - Jr. 2 de Mayo 250, Imperial",
  },
  arequipa: {
    shalom: "Shalom Arequipa - Av. Parra 253, Cercado",
    olva: "Olva Arequipa - Av. Víctor Andrés Belaunde 216, Umacollo",
  },
  camana: {
    shalom: "Shalom Camaná - Jr. 28 de Julio 324, Cercado",
    olva: "Olva Camaná - Av. Lima 412, Cercado",
  },
  cusco: {
    shalom: "Shalom Cusco - Av. Manco Cápac 410, Wanchaq",
    olva: "Olva Cusco - Av. de la Cultura 1205, Wanchaq",
  },
  sicuani: {
    shalom: "Shalom Sicuani - Jr. 2 de Mayo 315, Cercado",
    olva: "Olva Sicuani - Av. Arequipa 240, Cercado",
  },
  puno: {
    shalom: "Shalom Puno - Jr. Los Incas 245, Cercado",
    olva: "Olva Puno - Jr. Lima 430, Cercado",
  },
  juliaca: {
    shalom: "Shalom Juliaca - Av. Circunvalación Este 1180",
    olva: "Olva Juliaca - Jr. San Román 585, Cercado",
  },
  ilave: {
    shalom: "Shalom Ilave - Jr. Puno 210, Cercado",
    olva: "Olva Ilave - Jr. San Martín 156, Plaza principal",
  },
  trujillo: {
    shalom: "Shalom Trujillo - Av. América Norte 1350, Urb. Primavera",
    olva: "Olva Trujillo - Av. América Sur 2850",
  },
  chepen: {
    shalom: "Shalom Chepén - Jr. Lima 530, Cercado",
    olva: "Olva Chepén - Av. Gonzales Cáceres 410",
  },
  chiclayo: {
    shalom: "Shalom Chiclayo - Av. Bolognesi 638",
    olva: "Olva Chiclayo - Av. Balta 1075",
  },
  lambayeque: {
    shalom: "Shalom Lambayeque - Av. Ramón Castilla 480",
    olva: "Olva Lambayeque - Jr. 8 de Octubre 390",
  },
  piura: {
    shalom: "Shalom Piura - Av. Guardia Civil 875, Castilla",
    olva: "Olva Piura - Av. Grau 1532",
  },
  sullana: {
    shalom: "Shalom Sullana - Transversal Tarapaca 360",
    olva: "Olva Sullana - Av. José de Lama 945",
  },
  huancayo: {
    shalom: "Shalom Huancayo - Av. Ferrocarril 1465, El Tambo",
    olva: "Olva Huancayo - Jr. Real 1255",
  },
  tarma: {
    shalom: "Shalom Tarma - Jr. Lima 420, Cercado",
    olva: "Olva Tarma - Jr. Arequipa 315",
  },
};

function getSelectedRegion(regionId) {
  return peruRegions.find((region) => region.id === regionId) || null;
}

function getSelectedCity(regionId, cityId) {
  return getSelectedRegion(regionId)?.cities.find((city) => city.id === cityId) || null;
}

function getCityAgencies(cityId) {
  return agencyLocationsByCity[cityId] || null;
}

function getMapUrl(agencyName) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${agencyName} Perú`
  )}`;
}

export default function Carrito({ cartItems: passedCartItems, setCartItems: setPassedCartItems }) {
  const [cartItems, setCartItems] = useState(passedCartItems || [{ ...PRODUCT, quantity: 1 }]);
  const deliveryType = "agency";
  const [agency, setAgency] = useState("shalom");
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState("delivery");
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("qr");
  const [formErrors, setFormErrors] = useState({});
  const [deliveryData, setDeliveryData] = useState({
    contactName: "",
    contactPhone: "",
    region: "",
    city: "",
  });
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    cardExpiration: "",
    cardCvc: "",
    paymentReference: "",
  });
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const cartItemsRef = useRef(null);

  const shippingCost = 8;
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal + shippingCost;
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const pointsToEarn = calculatePointsForOrder(total);
  const selectedRegion = getSelectedRegion(deliveryData.region);
  const selectedCity = getSelectedCity(deliveryData.region, deliveryData.city);
  const cityAgencies = getCityAgencies(deliveryData.city);
  const selectedAgencyLocation = cityAgencies?.[agency] || "";

  useEffect(() => {
    const root = document.documentElement;
    const previousScrollBehavior = root.style.scrollBehavior;

    root.style.scrollBehavior = "auto";
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    root.style.scrollBehavior = previousScrollBehavior;
  }, []);

  useEffect(() => {
    if (passedCartItems && passedCartItems.length > 0) {
      setCartItems(passedCartItems);
      return;
    }

    if (passedCartItems) {
      setCartItems([]);
    }
  }, [passedCartItems]);

  const updateCartItems = (updater) => {
    setCartItems((items) => {
      const nextItems =
        typeof updater === "function" ? updater(items) : updater;

      setPassedCartItems?.(nextItems);
      return nextItems;
    });
  };

  const handleCartPageWheel = (event) => {
    if (!window.matchMedia("(min-width: 821px)").matches || !cartItemsRef.current) {
      return;
    }

    if (cartItemsRef.current.scrollHeight <= cartItemsRef.current.clientHeight) {
      return;
    }

    event.preventDefault();
    cartItemsRef.current.scrollTop += event.deltaY;
  };

  const addQuantity = (id) => {
    updateCartItems(items =>
      items.map(item =>
        (item.id || item.name) === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const removeQuantity = (id) => {
    updateCartItems(items =>
      items.map(item =>
        (item.id || item.name) === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const deleteItem = (id) => {
    updateCartItems(items => items.filter(item => (item.id || item.name) !== id));
  };

  const resetCheckout = () => {
    setIsPaymentOpen(false);
    setCheckoutStep("delivery");
    setPaymentSuccess(false);
    setPaymentError("");
    setDeliveryData({
      contactName: "",
      contactPhone: "",
      region: "",
      city: "",
    });
    setPaymentData({
      cardNumber: "",
      cardExpiration: "",
      cardCvc: "",
      paymentReference: "",
    });
    setPaymentMethod("qr");
    setFormErrors({});
  };

  const validateDeliveryStep = () => {
    const errors = {};

    if (!deliveryData.contactName || deliveryData.contactName.trim().length < 3) {
      errors.contactName = "Nombre requerido";
    }
    if (!deliveryData.contactPhone || deliveryData.contactPhone.replace(/\D/g, '').length < 9) {
      errors.contactPhone = "Teléfono inválido";
    }
    if (!deliveryData.region) {
      errors.region = "Región requerida";
    }
    if (!deliveryData.city.trim()) {
      errors.city = "Ciudad requerida";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validatePaymentStep = () => {
    const errors = {};
    
    if (paymentMethod === "card") {
      if (!paymentData.cardNumber || paymentData.cardNumber.replace(/\s/g, '').length < 13) {
        errors.cardNumber = "Número de tarjeta inválido";
      }
      if (!paymentData.cardExpiration || !paymentData.cardExpiration.match(/\d{2}\/\d{2}/)) {
        errors.cardExpiration = "Formato: MM/AA";
      }
      if (!paymentData.cardCvc || paymentData.cardCvc.length < 3) {
        errors.cardCvc = "CVC inválido";
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const goToPaymentStep = () => {
    if (!validateDeliveryStep()) {
      return;
    }

    setFormErrors({});
    setPaymentError("");
    setCheckoutStep("payment");
  };

  const goToReviewStep = () => {
    if (!validatePaymentStep()) {
      return;
    }

    setFormErrors({});
    setPaymentError("");
    setCheckoutStep("review");
  };

  const handlePayButtonClick = () => {
    if (cartItems.length === 0) {
      setPaymentError("Tu carrito está vacío");
      return;
    }
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    setCheckoutStep("delivery");
    setPaymentError("");
    setFormErrors({});
    setIsPaymentOpen(true);
  };

  const handleConfirmPayment = async () => {
    if (!validateDeliveryStep()) {
      setCheckoutStep("delivery");
      return;
    }

    if (!validatePaymentStep()) {
      setCheckoutStep("payment");
      return;
    }

    setPaymentError("");
    setPaymentLoading(true);

    try {
      if (!isAuthenticated) {
        setPaymentError("Por favor inicia sesión");
        return;
      }

      const orderData = {
        items: cartItems.map(item => ({
          name: item.name,
          type: item.type,
          weight: item.weight,
          price: item.price,
          quantity: item.quantity,
        })),
        total,
        deliveryType,
        agency,
        deliveryDetails: {
          contactName: deliveryData.contactName.trim(),
          contactPhone: deliveryData.contactPhone,
          region: selectedRegion?.name,
          city: selectedCity?.name,
          address: selectedAgencyLocation,
          agencyLocation: selectedAgencyLocation,
        },
        paymentMethod,
        paymentReference:
          paymentMethod === "qr" ? paymentData.paymentReference.trim() : null,
      };

      const result = await createOrder(orderData);
      setPaymentSuccess(true);
      
      setTimeout(() => {
        downloadOrderPDF(result.order, user);
        
        setTimeout(() => {
          updateCartItems([]);
          resetCheckout();
        }, 2000);
      }, 1000);
    } catch (error) {
      setPaymentError(error.message);
    } finally {
      setPaymentLoading(false);
    }
  };

  return (
    <section className={styles.cartPage} onWheel={handleCartPageWheel}>
      <div className={styles.cartShell}>
        <div className={styles.cartItems} ref={cartItemsRef}>
          <h1>Tu carrito</h1>

          {cartItems.length === 0 ? (
            <div style={{ textAlign: "center", padding: "2rem", color: "#999" }}>
              <p>Tu carrito está vacío</p>
              <Link to="/cafe" style={{ color: "#8b6f47", textDecoration: "underline" }}>
                Volver a comprar
              </Link>
            </div>
          ) : (
            <>
              {cartItems.map((item) => {
                const itemKey = item.id || item.name;

                return (
                <article key={itemKey} className={styles.cartItem}>
                  <div className={styles.productImage}>
                    <img src={item.image || productImage} alt={item.name} />
                  </div>

                  <div className={styles.productInfo}>
                    <h2>{item.name}</h2>
                    <p>Tipo: {item.type}</p>
                    <span>{item.weight}</span>
                  </div>

                  <strong className={styles.price}>S/ {item.price.toFixed(2)}</strong>

                  <div className={styles.quantity}>
                    <button 
                      aria-label="Disminuir cantidad" 
                      type="button"
                      onClick={() => removeQuantity(itemKey)}
                    >
                      <FaMinus />
                    </button>
                    <span>{item.quantity}</span>
                    <button 
                      aria-label="Aumentar cantidad" 
                      type="button"
                      onClick={() => addQuantity(itemKey)}
                    >
                      <FaPlus />
                    </button>
                  </div>

                  <button 
                    className={styles.deleteButton} 
                    aria-label="Eliminar producto" 
                    type="button"
                    onClick={() => deleteItem(itemKey)}
                  >
                    <FaTimes />
                  </button>
                </article>
                );
              })}

              <div className={styles.cartSubtotal}>
                <span>Subtotal</span>
                <strong>S/ {subtotal.toFixed(2)}</strong>
              </div>
            </>
          )}
        </div>

        <aside className={styles.cartAside}>
          <div className={styles.cartBadge} aria-label={`${totalItems} productos en carrito`}>
            <FaShoppingCart />
            <span>{totalItems}</span>
          </div>

          <article className={styles.deliveryCard}>
            <div className={styles.optionsGroup}>
              <h2>Entrega virtual</h2>

              <div className={styles.virtualDeliveryNote}>
                <FaTruck />
                <span>Envío por agencia a nivel nacional</span>
              </div>
            </div>

            <div className={styles.addressBlock}>
              <span>Envío por agencia</span>
              <p>Elige Shalom u Olva. Luego coordinaremos el código de recojo por WhatsApp.</p>
            </div>

            <div className={`${styles.optionsGroup} ${styles.agencyGroup}`}>
              <h3>Elige agencia</h3>
              <div className={styles.agencyOptions}>
                <button
                  className={`${styles.agencyOption} ${agency === "shalom" ? styles.active : ""}`}
                  type="button"
                  onClick={() => setAgency("shalom")}
                  aria-pressed={agency === "shalom"}
                >
                  Shalom
                </button>
                <button
                  className={`${styles.agencyOption} ${agency === "olva" ? styles.active : ""}`}
                  type="button"
                  onClick={() => setAgency("olva")}
                  aria-pressed={agency === "olva"}
                >
                  Olva
                </button>
              </div>
            </div>

            <div className={styles.cartPricing}>
              <div className={styles.pricingRow}>
                <span>Subtotal</span>
                <strong>S/ {subtotal.toFixed(2)}</strong>
              </div>
              <div className={styles.pricingRow}>
                <span>Envío</span>
                <strong>S/ {shippingCost.toFixed(2)}</strong>
              </div>
              <div className={`${styles.pricingRow} ${styles.total}`}>
                <span>Total</span>
                <strong>S/ {total.toFixed(2)}</strong>
              </div>
              <div className={`${styles.pricingRow} ${styles.pointsRow}`}>
                <span>Puntos a ganar</span>
                <strong>+{pointsToEarn} pts</strong>
              </div>
            </div>
          </article>

          <button
            className={styles.payButton}
            onClick={handlePayButtonClick}
            disabled={cartItems.length === 0}
          >
            <FaShoppingCart /> Continuar compra
          </button>
        </aside>
      </div>

      {isPaymentOpen && (
        <div className={styles.paymentOverlay}>
          <div className={styles.paymentModal}>
            <button
              className={styles.closeButton}
              onClick={resetCheckout}
            >
              ✕
            </button>

            {paymentSuccess ? (
              <div style={{ 
                padding: "2rem 1rem",
                textAlign: "center",
                color: "#27ae60"
              }}>
                <h3 style={{ marginBottom: "1rem" }}>✓ ¡Pago realizado exitosamente!</h3>
                <p>Tu orden ha sido creada y se está descargando el comprobante...</p>
              </div>
            ) : (
              <div className={styles.paymentForm}>
                {paymentError && (
                  <div style={{
                    backgroundColor: "#fee",
                    border: "1px solid #fcc",
                    color: "#c00",
                    padding: "0.75rem",
                    borderRadius: "6px",
                    marginBottom: "1rem",
                  }}>
                    {paymentError}
                  </div>
                )}

                <div className={styles.checkoutSteps} aria-label="Progreso de compra">
                  <span className={checkoutStep === "delivery" ? styles.currentStep : ""}>Entrega</span>
                  <span className={checkoutStep === "payment" ? styles.currentStep : ""}>Pago</span>
                  <span className={checkoutStep === "review" ? styles.currentStep : ""}>Confirmar</span>
                </div>

                {checkoutStep === "delivery" && (
                  <div className={styles.checkoutPanel}>
                    <div className={styles.stepTitle}>
                      <span>Paso 1</span>
                      <h2>Entrega y contacto</h2>
                    </div>

                    <div className={styles.virtualDeliveryNote}>
                      <FaTruck />
                      <span>Envío por agencia. Somos una marca virtual y coordinamos el recojo por WhatsApp.</span>
                    </div>

                    <label htmlFor="contact-name">Nombre de contacto</label>
                    <input
                      id="contact-name"
                      placeholder="Nombre y apellido"
                      value={deliveryData.contactName}
                      onChange={(event) => {
                        setDeliveryData({ ...deliveryData, contactName: event.target.value });
                        setFormErrors({ ...formErrors, contactName: "" });
                      }}
                    />
                    {formErrors.contactName && <span className={styles.fieldError}>{formErrors.contactName}</span>}

                    <label htmlFor="contact-phone">Teléfono de contacto</label>
                    <input
                      id="contact-phone"
                      inputMode="tel"
                      placeholder="999 999 999"
                      value={deliveryData.contactPhone}
                      onChange={(event) => {
                        const val = event.target.value.replace(/\D/g, "").slice(0, 9);
                        setDeliveryData({ ...deliveryData, contactPhone: val });
                        setFormErrors({ ...formErrors, contactPhone: "" });
                      }}
                    />
                    {formErrors.contactPhone && <span className={styles.fieldError}>{formErrors.contactPhone}</span>}

                    <div className={styles.agencyOptions}>
                      <button
                        className={`${styles.agencyOption} ${agency === "shalom" ? styles.active : ""}`}
                        type="button"
                        onClick={() => setAgency("shalom")}
                        aria-pressed={agency === "shalom"}
                      >
                        Shalom
                      </button>
                      <button
                        className={`${styles.agencyOption} ${agency === "olva" ? styles.active : ""}`}
                        type="button"
                        onClick={() => setAgency("olva")}
                        aria-pressed={agency === "olva"}
                      >
                        Olva
                      </button>
                    </div>

                    <label htmlFor="delivery-region">Región</label>
                    <select
                      id="delivery-region"
                      value={deliveryData.region}
                      onChange={(event) => {
                        setDeliveryData({
                          ...deliveryData,
                          region: event.target.value,
                          city: "",
                        });
                        setFormErrors({ ...formErrors, region: "", city: "" });
                      }}
                    >
                      <option value="">Selecciona una región</option>
                      {peruRegions.map((region) => (
                        <option key={region.id} value={region.id}>
                          {region.name}
                        </option>
                      ))}
                    </select>
                    {formErrors.region && <span className={styles.fieldError}>{formErrors.region}</span>}

                    <label htmlFor="delivery-city">Ciudad</label>
                    <select
                      id="delivery-city"
                      value={deliveryData.city}
                      onChange={(event) => {
                        setDeliveryData({ ...deliveryData, city: event.target.value });
                        setFormErrors({ ...formErrors, city: "" });
                      }}
                      disabled={!selectedRegion}
                    >
                      <option value="">Selecciona una ciudad</option>
                      {selectedRegion?.cities.map((city) => (
                        <option key={city.id} value={city.id}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                    {formErrors.city && <span className={styles.fieldError}>{formErrors.city}</span>}

                    <div className={styles.agencySuggestion}>
                      <span>Agencia elegida en esta ciudad</span>
                      {selectedAgencyLocation ? (
                        <div className={styles.agencyList}>
                          <article>
                            <div>
                              <strong>{agency === "shalom" ? "Shalom" : "Olva"}</strong>
                              <p>{selectedAgencyLocation}</p>
                            </div>
                            <a
                              href={getMapUrl(selectedAgencyLocation)}
                              rel="noreferrer"
                              target="_blank"
                            >
                              Ver en el mapa
                            </a>
                          </article>
                        </div>
                      ) : (
                        <p>Elige región y ciudad para ver la agencia seleccionada.</p>
                      )}
                    </div>

                    <button className={styles.confirmPayment} type="button" onClick={goToPaymentStep}>
                      Continuar a pago
                    </button>
                  </div>
                )}

                {checkoutStep === "payment" && (
                  <div className={styles.checkoutPanel}>
                    <div className={styles.stepTitle}>
                      <span>Paso 2</span>
                      <h2>Método de pago</h2>
                    </div>

                <div className={styles.paymentMethodTabs} aria-label="Método de pago">
                  <button
                    className={`${styles.paymentMethodTab} ${paymentMethod === "qr" ? styles.active : ""}`}
                    type="button"
                    onClick={() => {
                      setPaymentMethod("qr");
                      setFormErrors({});
                    }}
                    aria-pressed={paymentMethod === "qr"}
                  >
                    Yape / Plin
                  </button>
                  <button
                    className={`${styles.paymentMethodTab} ${paymentMethod === "card" ? styles.active : ""}`}
                    type="button"
                    onClick={() => {
                      setPaymentMethod("card");
                      setFormErrors({});
                    }}
                    aria-pressed={paymentMethod === "card"}
                  >
                    Tarjeta
                  </button>
                </div>

                {paymentMethod === "card" && (
                  <>
                    <label htmlFor="card-number">Tarjeta de crédito</label>
                    <div className={styles.cardInput}>
                      <input
                        id="card-number"
                        inputMode="numeric"
                        placeholder="••••  ••••  ••••  ••••"
                        value={paymentData.cardNumber}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '').slice(0, 16);
                          setPaymentData({ ...paymentData, cardNumber: val });
                          setFormErrors({ ...formErrors, cardNumber: '' });
                        }}
                        maxLength="19"
                      />
                      <FaCcVisa />
                    </div>
                    {formErrors.cardNumber && <span style={{ color: '#c00', fontSize: '0.85rem' }}>{formErrors.cardNumber}</span>}

                    <div className={styles.paymentFields}>
                      <div>
                        <label htmlFor="card-expiration">FV</label>
                        <input 
                          id="card-expiration" 
                          placeholder="MM / AA"
                          value={paymentData.cardExpiration}
                          onChange={(e) => {
                            let val = e.target.value.replace(/\D/g, '').slice(0, 4);
                            if (val.length >= 2) {
                              val = val.slice(0, 2) + '/' + val.slice(2);
                            }
                            setPaymentData({ ...paymentData, cardExpiration: val });
                            setFormErrors({ ...formErrors, cardExpiration: '' });
                          }}
                          maxLength="5"
                        />
                        {formErrors.cardExpiration && <span style={{ color: '#c00', fontSize: '0.8rem' }}>{formErrors.cardExpiration}</span>}
                      </div>
                      <div>
                        <label htmlFor="card-cvc">CVC</label>
                        <input 
                          id="card-cvc" 
                          inputMode="numeric" 
                          placeholder="123"
                          value={paymentData.cardCvc}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, '').slice(0, 4);
                            setPaymentData({ ...paymentData, cardCvc: val });
                            setFormErrors({ ...formErrors, cardCvc: '' });
                          }}
                          maxLength="4"
                        />
                        {formErrors.cardCvc && <span style={{ color: '#c00', fontSize: '0.8rem' }}>{formErrors.cardCvc}</span>}
                      </div>
                    </div>
                  </>
                )}

                {paymentMethod === "qr" && (
                  <div className={styles.qrPayment}>
                    <div>
                      <h3>Pago con QR</h3>
                      <p>Escanea el código con Yape o Plin y confirma para generar tu pedido.</p>
                      <div className={styles.wallets}>
                        <img src={plinImage} alt="Plin" />
                        <img src={yapeImage} alt="Yape" />
                      </div>
                    </div>
                    <img
                      className={styles.qrBox}
                      src={qrImage}
                      alt="Código QR de pago"
                    />
                  </div>
                )}

                    {paymentMethod === "qr" && (
                      <>
                        <label htmlFor="payment-reference">Nro. de operación opcional</label>
                        <input
                          id="payment-reference"
                          placeholder="Ej. 123456789"
                          value={paymentData.paymentReference}
                          onChange={(event) =>
                            setPaymentData({
                              ...paymentData,
                              paymentReference: event.target.value,
                            })
                          }
                        />
                      </>
                    )}

                    <div className={styles.checkoutActions}>
                      <button
                        className={styles.secondaryButton}
                        type="button"
                        onClick={() => {
                          setCheckoutStep("delivery");
                          setFormErrors({});
                        }}
                      >
                        Volver
                      </button>
                      <button className={styles.confirmPayment} type="button" onClick={goToReviewStep}>
                        Revisar pedido
                      </button>
                    </div>
                  </div>
                )}

                {checkoutStep === "review" && (
                  <div className={styles.checkoutPanel}>
                    <div className={styles.stepTitle}>
                      <span>Paso 3</span>
                      <h2>Confirma tu pedido</h2>
                    </div>

                    <div className={styles.reviewBox}>
                      <div>
                        <span>Contacto</span>
                        <strong>{deliveryData.contactName}</strong>
                        <p>{deliveryData.contactPhone}</p>
                      </div>
                      <div className={styles.reviewProducts}>
                        <span>Productos</span>
                        <ul>
                          {cartItems.map((item) => {
                            const itemKey = item.id || item.name;
                            const itemTotal = item.price * item.quantity;

                            return (
                              <li key={itemKey}>
                                <img src={item.image || productImage} alt="" aria-hidden="true" />
                                <div>
                                  <strong>{item.name}</strong>
                                  <p>
                                    {item.quantity} x {item.weight} · S/ {itemTotal.toFixed(2)}
                                  </p>
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                      <div>
                        <span>Entrega</span>
                        <strong>Agencia {agency === "shalom" ? "Shalom" : "Olva"}</strong>
                        <p>{`${selectedCity?.name || ""}, ${selectedRegion?.name || ""}. ${selectedAgencyLocation}`}</p>
                      </div>
                      <div>
                        <span>Pago</span>
                        <strong>{paymentMethod === "qr" ? "Yape / Plin" : "Tarjeta"}</strong>
                        <p>Total: S/ {total.toFixed(2)}</p>
                      </div>
                      <div>
                        <span>Puntos Tunki</span>
                        <strong>+{pointsToEarn} pts</strong>
                        <p>Se sumarán a tu cuenta al confirmar la compra.</p>
                      </div>
                    </div>

                    <div className={styles.checkoutActions}>
                      <button
                        className={styles.secondaryButton}
                        type="button"
                        onClick={() => setCheckoutStep("payment")}
                      >
                        Volver
                      </button>
                      <button
                        className={styles.confirmPayment}
                        type="button"
                        disabled={paymentLoading}
                        onClick={handleConfirmPayment}
                      >
                        {paymentLoading ? "Procesando..." : `Confirmar pedido S/ ${total.toFixed(2)}`}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      <img 
        className={styles.cafeDeco}
        src={cafeDecoImage}
        alt="Decoración café"
      />
    </section>
  );
}
