import {
  FaCcVisa,
  FaMinus,
  FaPlus,
  FaShoppingCart,
  FaStore,
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
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.js";
import LoginModal from "../../components/LoginModal.jsx";
import { createOrder } from "../../services/api.js";
import { downloadOrderPDF } from "../../services/pdf.js";

const PRODUCT = {
  id: 1,
  name: "Café en Grano Tunki",
  type: "Americano",
  weight: "250 gr",
  price: 34.5,
  image: productImage,
};

export default function Carrito({ cartItems: passedCartItems, setCartItems: setPassedCartItems }) {
  const [cartItems, setCartItems] = useState(passedCartItems || [{ ...PRODUCT, quantity: 1 }]);
  const [deliveryType, setDeliveryType] = useState("pickup");
  const [agency, setAgency] = useState("shalom");
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("qr");
  const [formErrors, setFormErrors] = useState({});
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    cardExpiration: "",
    cardCvc: "",
    buyerName: "",
    buyerPhone: "",
  });
  const { isAuthenticated, user } = useAuth();
  const cartItemsRef = useRef(null);

  const shippingCost = deliveryType === "agency" ? 8 : 0;
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal + shippingCost;
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

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

  const validatePaymentForm = () => {
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
    if (!paymentData.buyerName || paymentData.buyerName.trim().length < 3) {
      errors.buyerName = "Nombre requerido";
    }
    if (!paymentData.buyerPhone || paymentData.buyerPhone.replace(/\D/g, '').length < 9) {
      errors.buyerPhone = "Teléfono inválido";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePayButtonClick = () => {
    if (cartItems.length === 0) {
      setPaymentError("Tu carrito está vacío");
      return;
    }
    if (!isAuthenticated) {
      setIsLoginModalOpen(true);
      return;
    }
    setIsPaymentOpen(true);
  };

  const handleLoginSuccess = () => {
    setIsLoginModalOpen(false);
    setIsPaymentOpen(true);
  };

  const handleConfirmPayment = async (e) => {
    e.preventDefault();
    
    if (!validatePaymentForm()) {
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
        agency: deliveryType === "agency" ? agency : null,
        paymentMethod,
      };

      const result = await createOrder(orderData);
      setPaymentSuccess(true);
      
      setTimeout(() => {
        downloadOrderPDF(result.order, user);
        
        setTimeout(() => {
          updateCartItems([]);
          setIsPaymentOpen(false);
          setPaymentSuccess(false);
          setPaymentData({
            cardNumber: "",
            cardExpiration: "",
            cardCvc: "",
            buyerName: "",
            buyerPhone: "",
          });
          setPaymentMethod("qr");
          setFormErrors({});
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
              <h2>Tipo de entrega</h2>

              <div className={styles.deliveryOptions}>
                <button
                  className={`${styles.deliveryOption} ${deliveryType === "pickup" ? styles.active : ""}`}
                  type="button"
                  onClick={() => setDeliveryType("pickup")}
                  aria-pressed={deliveryType === "pickup"}
                  title="Recoger en tienda"
                >
                  <FaStore />
                  <span>Recoger en tienda</span>
                </button>

                <button
                  className={`${styles.deliveryOption} ${deliveryType === "agency" ? styles.active : ""}`}
                  type="button"
                  onClick={() => setDeliveryType("agency")}
                  aria-pressed={deliveryType === "agency"}
                  title="Envío por agencia"
                >
                  <FaTruck />
                  <span>Envío por agencia</span>
                </button>
              </div>
            </div>

            <div className={styles.addressBlock}>
              <span>
                {deliveryType === "pickup"
                  ? "Dirección del local"
                  : "Envío por agencia"}
              </span>
              <p>
                {deliveryType === "pickup"
                  ? "Av. Los Cafetales 123, Puno"
                  : "Coordinaremos la direccion por WhatsApp despues del pago."}
              </p>
            </div>

            <div
              className={`${styles.optionsGroup} ${styles.agencyGroup} ${
                deliveryType !== "agency" ? styles.inactiveAgency : ""
              }`}
              aria-hidden={deliveryType !== "agency"}
            >
              <h3>Elige agencia</h3>
              <div className={styles.agencyOptions}>
                <button
                  className={`${styles.agencyOption} ${agency === "shalom" ? styles.active : ""}`}
                  type="button"
                  onClick={() => setAgency("shalom")}
                  aria-pressed={agency === "shalom"}
                  disabled={deliveryType !== "agency"}
                >
                  Shalom
                </button>
                <button
                  className={`${styles.agencyOption} ${agency === "olva" ? styles.active : ""}`}
                  type="button"
                  onClick={() => setAgency("olva")}
                  aria-pressed={agency === "olva"}
                  disabled={deliveryType !== "agency"}
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
            </div>
          </article>

          <button
            className={styles.payButton}
            onClick={handlePayButtonClick}
            disabled={cartItems.length === 0}
          >
            <FaShoppingCart /> Pagar
          </button>
        </aside>
      </div>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {isPaymentOpen && (
        <div className={styles.paymentOverlay}>
          <div className={styles.paymentModal}>
            <button
              className={styles.closeButton}
              onClick={() => {
                setIsPaymentOpen(false);
                setPaymentSuccess(false);
                setPaymentError("");
                setPaymentData({
                  cardNumber: "",
                  cardExpiration: "",
                  cardCvc: "",
                  buyerName: "",
                  buyerPhone: "",
                });
                setPaymentMethod("qr");
                setFormErrors({});
              }}
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
              <form className={styles.paymentForm} onSubmit={handleConfirmPayment}>
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
                    <label htmlFor="card-number">Tarjeta de credito</label>
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
                      <p>Escanea el codigo con Yape o Plin y confirma para generar tu pedido.</p>
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

                <label htmlFor="buyer-name">Nombre de contacto</label>
                <input 
                  id="buyer-name" 
                  placeholder="Nombre y apellido"
                  value={paymentData.buyerName}
                  onChange={(e) => {
                    setPaymentData({ ...paymentData, buyerName: e.target.value });
                    setFormErrors({ ...formErrors, buyerName: '' });
                  }}
                />
                {formErrors.buyerName && <span style={{ color: '#c00', fontSize: '0.85rem' }}>{formErrors.buyerName}</span>}

                <label htmlFor="buyer-phone">Teléfono de contacto</label>
                <input 
                  id="buyer-phone" 
                  inputMode="tel" 
                  placeholder="999 999 999"
                  value={paymentData.buyerPhone}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '').slice(0, 9);
                    setPaymentData({ ...paymentData, buyerPhone: val });
                    setFormErrors({ ...formErrors, buyerPhone: '' });
                  }}
                />
                {formErrors.buyerPhone && <span style={{ color: '#c00', fontSize: '0.85rem' }}>{formErrors.buyerPhone}</span>}

                <button 
                  className={styles.confirmPayment} 
                  type="submit"
                  disabled={paymentLoading}
                >
                  {paymentLoading
                    ? "Procesando..."
                    : paymentMethod === "qr"
                      ? `Confirmar pago S/ ${total.toFixed(2)}`
                      : `Pagar S/ ${total.toFixed(2)}`}
                </button>
              </form>
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
