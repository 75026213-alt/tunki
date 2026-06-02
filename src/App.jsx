import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./pages/Header.jsx";
import Footer from "./pages/Footer.jsx";
import Home from "./pages/Home.jsx";
import Cafe from "./pages/Cafe.jsx";
import Login from "./pages/login/Login.jsx";
import Profile from "./pages/profile/Profile.jsx";
import Carrito from "./pages/carrito/carrito.jsx";
import FloatingCartBubble from "./pages/FloatingCartBubble.jsx";
import Recetas from "./pages/Recetas.jsx";
import TunkiAmigo from "./pages/TunkiAmigo.jsx";
import Origen from "./pages/Origen.jsx";
import Agricultores from "./pages/Agricultores.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";

function App() {
  const location = useLocation();
  const [cartItems, setCartItems] = useState([]);
  const showFloatingCart = ["/cafe", "/recetas", "/tunki-amigo"].includes(
    location.pathname
  );

  useEffect(() => {
    const root = document.documentElement;
    const previousScrollBehavior = root.style.scrollBehavior;

    root.style.scrollBehavior = "auto";
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    root.style.scrollBehavior = previousScrollBehavior;
  }, [location.pathname]);

  const addToCart = (product) => {
    setCartItems((currentItems) => {
      const productKey = product.id || product.name;
      const existingItem = currentItems.find(
        (item) => (item.id || item.name) === productKey
      );

      if (existingItem) {
        return currentItems.map((item) =>
          (item.id || item.name) === productKey
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentItems, { ...product, quantity: 1 }];
    });
  };

  return (
    <AuthProvider>
      <>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cafe" element={<Cafe onAddToCart={addToCart} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/carrito" element={<Carrito cartItems={cartItems} setCartItems={setCartItems} />} />
            <Route path="/recetas" element={<Recetas />} />
            <Route path="/tunki-amigo" element={<TunkiAmigo />} />
            <Route path="/origen" element={<Origen />} />
            <Route path="/agricultores" element={<Agricultores />} />
          </Routes>
        </main>
        {showFloatingCart && <FloatingCartBubble items={cartItems} />}
        <Footer />
      </>
    </AuthProvider>
  );
}

export default App;
