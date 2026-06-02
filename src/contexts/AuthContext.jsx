import { createContext, useCallback, useState } from 'react';

export const AuthContext = createContext();

function createDemoToken(email) {
  return `demo-token-${email}-${Date.now()}`;
}

function createDemoUser(email, username) {
  return {
    id: email.trim().toLowerCase(),
    email: email.trim().toLowerCase(),
    username: username?.trim() || email.split('@')[0],
  };
}

function getInitialAuth() {
  const savedToken = localStorage.getItem('authToken');
  const savedUser = localStorage.getItem('authUser');

  if (!savedToken || !savedUser) {
    return { token: null, user: null };
  }

  try {
    return { token: savedToken, user: JSON.parse(savedUser) };
  } catch {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
    return { token: null, user: null };
  }
}

export function AuthProvider({ children }) {
  const initialAuth = getInitialAuth();
  const [user, setUser] = useState(initialAuth.user);
  const [token, setToken] = useState(initialAuth.token);
  const loading = false;

  const saveSession = useCallback((nextUser) => {
    const nextToken = createDemoToken(nextUser.email);

    setToken(nextToken);
    setUser(nextUser);
    localStorage.setItem('authToken', nextToken);
    localStorage.setItem('authUser', JSON.stringify(nextUser));

    return {
      message: 'Sesión iniciada',
      token: nextToken,
      user: nextUser,
    };
  }, []);

  const login = useCallback(async (email, password) => {
    if (!email || !password) {
      throw new Error('Email y contraseña requeridos');
    }

    return saveSession(createDemoUser(email));
  }, [saveSession]);

  const register = useCallback(async (email, username, password) => {
    if (!email || !username || !password) {
      throw new Error('Todos los campos son requeridos');
    }

    return saveSession(createDemoUser(email, username));
  }, [saveSession]);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
  }, []);

  const isAuthenticated = !!token && !!user;

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
