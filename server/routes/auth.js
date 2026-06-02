import express from 'express';
import jwt from 'jsonwebtoken';
import { users } from '../utils/database.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Login simple (demo)
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  // Demo: aceptar cualquier email/password
  if (!email || !password) {
    return res.status(400).json({ error: 'Email y contraseña requeridos' });
  }

  const token = jwt.sign(
    { id: email, email, username: email.split('@')[0] },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.json({
    message: 'Sesión iniciada',
    token,
    user: { id: email, email, username: email.split('@')[0] },
  });
});

// Registro simple (demo)
router.post('/register', (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    return res.status(400).json({ error: 'Todos los campos requeridos' });
  }

  const token = jwt.sign(
    { id: email, email, username },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.status(201).json({
    message: 'Usuario registrado',
    token,
    user: { id: email, email, username },
  });
});

// Verificar token
router.get('/verify', verifyToken, (req, res) => {
  res.json({ user: req.user, message: 'Token válido' });
});

// Logout (demo)
router.post('/logout', (req, res) => {
  res.json({ message: 'Sesión cerrada' });
});

export default router;
