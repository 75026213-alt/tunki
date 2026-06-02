import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { orders } from '../utils/database.js';

const router = express.Router();

// Crear orden
router.post('/create', verifyToken, (req, res) => {
  const { items, total, deliveryType, agency } = req.body;

  if (!items || !total) {
    return res.status(400).json({ error: 'Datos incompletos' });
  }

  const newOrder = {
    id: 'ORD-' + Date.now(),
    userId: req.user.id,
    userEmail: req.user.email,
    items,
    total,
    deliveryType,
    agency,
    status: 'completada',
    createdAt: new Date().toISOString(),
  };

  orders.push(newOrder);
  console.log('✓ Orden creada:', newOrder.id);

  res.status(201).json({
    message: 'Orden creada exitosamente',
    order: newOrder,
  });
});

// Obtener órdenes del usuario
router.get('/my-orders', verifyToken, (req, res) => {
  const userOrders = orders.filter(o => o.userId === req.user.id);
  res.json({ orders: userOrders });
});

export default router;
