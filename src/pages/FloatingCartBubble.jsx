import { useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import styles from "./FloatingCartBubble.module.css";

export default function FloatingCartBubble({ items }) {
  const [isOpen, setIsOpen] = useState(false);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const latestItems = items.slice(-4).reverse();

  return (
    <div className={styles.cartDock}>
      <button
        className={styles.cartBubble}
        onClick={() => setIsOpen((currentValue) => !currentValue)}
        type="button"
        aria-expanded={isOpen}
        aria-label="Abrir resumen del carrito"
      >
        <FaShoppingCart />
        <span>{totalItems}</span>
      </button>

      {isOpen && (
        <aside className={styles.cartSummary} aria-label="Resumen del carrito">
          <div className={styles.summaryHeader}>
            <span>Resumen</span>
            <strong>
              {totalItems} producto{totalItems === 1 ? "" : "s"}
            </strong>
          </div>

          {totalItems === 0 ? (
            <p className={styles.emptyText}>Aun no agregaste productos.</p>
          ) : (
            <div className={styles.itemList}>
              {latestItems.map((item) => (
                <div className={styles.summaryItem} key={item.id || item.name}>
                  <span>
                    {item.quantity}x {item.name}
                  </span>
                  <strong>S/ {(item.price * item.quantity).toFixed(2)}</strong>
                </div>
              ))}
            </div>
          )}

          <div className={styles.summaryTotal}>
            <span>Total</span>
            <strong>S/ {total.toFixed(2)}</strong>
          </div>

          <Link className={styles.goToCartButton} to="/carrito">
            Ir al carrito
          </Link>
        </aside>
      )}
    </div>
  );
}
