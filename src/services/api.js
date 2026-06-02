const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/$/, '');

export async function createOrder(orderData, token) {
  const response = await fetch(`${API_URL}/orders/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(orderData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Error al crear orden');
  }

  return response.json();
}

export async function getMyOrders(token) {
  const response = await fetch(`${API_URL}/orders/my-orders`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Error al obtener órdenes');
  }

  return response.json();
}

export async function verifyAuth(token) {
  const response = await fetch(`${API_URL}/auth/verify`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Token inválido');
  }

  return response.json();
}
