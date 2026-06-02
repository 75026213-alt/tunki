# 🎉 TUNKI - Demo Rápido

## ⚡ Inicio rápido

```bash
# Desde la carpeta principal del proyecto
pnpm dev
```

Eso's! Se abrirán ambos servidores:
- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:5000

## 🧪 Prueba el demo

### Para iniciar sesión/registrarse:
- **Email:** cualquier@email.com
- **Contraseña:** cualquier cosa
- Click en "Pagar" en el carrito
- Se abre modal de login automáticamente

### Flujo de demo:
1. Ve a `/carrito`
2. Click en "Pagar - Inicia sesión"
3. Usa cualquier email y contraseña
4. Completa el pago
5. ¡Listo! Orden creada ✓

## 📁 Estructura

```
tunki/
├── server/          # Backend Node.js + Express
│   ├── routes/      # Rutas API
│   ├── index.js     # Servidor
│   └── package.json
├── src/
│   ├── pages/       # Páginas React
│   ├── components/  # Componentes
│   ├── contexts/    # Auth Context
│   └── hooks/       # Hooks custom
├── package.json
└── vite.config.js
```

## 🚀 Para ir a producción después

1. Cambiar URLs de `localhost:5000` a tu servidor
2. Agregar base de datos real (MongoDB/PostgreSQL)
3. Implementar pagos reales (Stripe/PayPal)
4. Agregar validaciones de seguridad
5. Desplegar en Vercel (frontend) + Heroku/Railway (backend)

---

**Versión:** 1.0.0 DEMO  
**Estado:** 100% funcional 🎉
