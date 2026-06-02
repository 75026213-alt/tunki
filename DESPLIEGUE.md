# Tunki - Ecommerce de Café

Plataforma de venta de café con autenticación, carrito de compras y sistema de órdenes.

## 🚀 Instalación y Setup

### Requisitos previos
- Node.js (v18+)
- npm o pnpm

### Instalación local (Desarrollo)

1. **Instalar dependencias del frontend:**
```bash
npm install
```

2. **Instalar dependencias del backend:**
```bash
cd server
npm install
cd ..
```

3. **Ejecutar en modo desarrollo:**
```bash
npm run dev
```

Esto abrirá:
- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:5000

### Scripts disponibles

#### Desarrollo
```bash
npm run dev              # Ejecuta frontend y backend simultáneamente
npm run dev:frontend    # Solo frontend
npm run dev:backend     # Solo backend
```

#### Producción
```bash
npm run build           # Construir frontend
npm run build:all       # Instalar deps y construir todo
npm run start           # Ejecutar en producción
```

## 📋 Características implementadas

✅ **Autenticación de usuarios**
- Registro de nuevos usuarios
- Login con email y contraseña
- Tokens JWT
- Persistencia de sesión

✅ **Carrito de compras**
- Modal de login integrado
- Validación de sesión antes de pagar
- Creación de órdenes
- Soporte para diferentes tipos de envío

✅ **Backend API**
- Rutas de autenticación (`/api/auth`)
- Rutas de órdenes (`/api/orders`)
- Middleware de verificación de tokens
- Encriptación de contraseñas con bcryptjs

## 🔐 Datos de prueba

Para probar el sistema, usa estas credenciales:

**Email:** test@example.com  
**Contraseña:** 123456

## 📁 Estructura del proyecto

```
tunki/
├── server/                 # Backend Node.js + Express
│   ├── routes/            # Rutas API
│   ├── middleware/        # Middlewares
│   ├── utils/            # Utilidades
│   ├── index.js          # Servidor principal
│   └── package.json
├── src/
│   ├── pages/            # Páginas React
│   ├── components/       # Componentes React
│   ├── contexts/         # Context API (Autenticación)
│   ├── hooks/            # Custom hooks
│   ├── services/         # Servicios API
│   └── assets/           # Imágenes y recursos
├── package.json
└── vite.config.js
```

## 🔄 Flujo de autenticación

1. Usuario hace click en "Pagar" sin sesión
2. Se muestra modal de login
3. Usuario se registra o inicia sesión
4. Token JWT se almacena en localStorage
5. Modal se cierra y se abre el formulario de pago
6. Al confirmar pago, se crea orden en el backend

## 🌐 Despliegue en producción

### Opción 1: Desplegar en Vercel (Frontend)

1. Construir:
```bash
npm run build
```

2. Subir a GitHub y conectar con Vercel
3. Configurar variables de entorno en Vercel

### Opción 2: Desplegar en Heroku (Backend)

1. Crear `Procfile` en carpeta `server/`:
```
web: node index.js
```

2. Commit y push a GitHub
3. Conectar con Heroku y desplegar

### Opción 3: Desplegar en tu propio servidor

```bash
# En el servidor
git clone <tu-repo>
cd tunki
npm run build:all

# Ejecutar en producción
npm start

# O usar PM2 para mantener el proceso activo
npm install -g pm2
pm2 start "npm start"
```

## ⚙️ Variables de entorno

### Frontend
No requiere variables especiales (usa localhost:5000 por defecto)

### Backend (`server/.env`)
```
PORT=5000
JWT_SECRET=tu_secreto_muy_seguro_aqui
NODE_ENV=development
```

**En producción, cambiar:**
- `JWT_SECRET` a algo seguro y único
- `NODE_ENV` a "production"
- Actualizar CORS en `server/index.js` con dominio de producción

## 🐛 Troubleshooting

### "Cannot find module 'express'"
```bash
cd server && npm install && cd ..
```

### Error de CORS
Asegúrate que el backend está corriendo en puerto 5000

### Token expirado
El token expira cada 7 días. Usuario debe volver a iniciar sesión.

### Base de datos en memoria
Los datos se pierden al reiniciar. Para producción, integrar base de datos real (MongoDB, PostgreSQL, etc.)

## 📝 Próximos pasos para producción

- [ ] Integrar base de datos real (MongoDB/PostgreSQL)
- [ ] Implementar sistema de pagos real (Stripe, PayPal)
- [ ] Agregar envíos de email
- [ ] Implementar dashboard de administrador
- [ ] Agregar sistema de inventario
- [ ] Implementar búsqueda y filtros avanzados
- [ ] Agregar reseñas de productos
- [ ] Implementar notificaciones en tiempo real

## 📞 Soporte

Para reportar bugs o sugerencias, contactar al equipo de desarrollo.

---

**Versión:** 1.0.0  
**Última actualización:** 2026-06-01
