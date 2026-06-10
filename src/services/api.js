import { calculatePointsForOrder } from "./rewards.js";

const ORDERS_STORAGE_PREFIX = "tunkiOrders:";

function getSavedUser() {
  const savedUser = localStorage.getItem("authUser");
  return savedUser ? JSON.parse(savedUser) : null;
}

function getOrdersKey(userId) {
  return `${ORDERS_STORAGE_PREFIX}${userId}`;
}

function readOrders(userId) {
  const savedOrders = localStorage.getItem(getOrdersKey(userId));
  return savedOrders ? JSON.parse(savedOrders) : [];
}

function writeOrders(userId, orders) {
  localStorage.setItem(getOrdersKey(userId), JSON.stringify(orders));
}

export async function createOrder(orderData) {
  const user = getSavedUser();

  if (!user) {
    throw new Error("Por favor inicia sesión");
  }

  const newOrder = {
    id: `ORD-${Date.now()}`,
    userId: user.id,
    userEmail: user.email,
    ...orderData,
    pointsEarned: calculatePointsForOrder(orderData.total),
    status: "completada",
    createdAt: new Date().toISOString(),
  };

  const currentOrders = readOrders(user.id);
  writeOrders(user.id, [newOrder, ...currentOrders]);

  return {
    message: "Orden creada exitosamente",
    order: newOrder,
  };
}

export async function getMyOrders() {
  const user = getSavedUser();

  if (!user) {
    return { orders: [] };
  }

  return { orders: readOrders(user.id) };
}

export async function verifyAuth() {
  const user = getSavedUser();

  if (!user) {
    throw new Error("Sesión inválida");
  }

  return { user, message: "Sesión válida" };
}
