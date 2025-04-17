// src/components/providers/AuthProvider.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

// User-Typ definieren
interface User {
  email?: string;
  [key: string]: unknown;
}

// Auth Context Typ
interface AuthContextType {
  auth: {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
  };
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

// Default-Werte für den Context
const defaultAuthContext: AuthContextType = {
  auth: {
    user: null,
    isAuthenticated: false,
    isLoading: true,
  },
  login: async () => {},
  logout: async () => {},
};

// Context erstellen
const AuthContext = createContext<AuthContextType>(defaultAuthContext);

// Provider-Komponente
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState<AuthContextType['auth']>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  // Beim Laden prüfen, ob der Benutzer angemeldet ist
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Hier würde normalerweise eine API-Anfrage stehen, um den Authentifizierungsstatus zu prüfen
        // Für die Generierung setzen wir isLoading auf false
        setAuth(prev => ({ ...prev, isLoading: false }));
      } catch (error) {
        console.error('Auth status check failed:', error);
        setAuth({ user: null, isAuthenticated: false, isLoading: false });
      }
    };

    checkAuthStatus();
  }, []);

  // Login-Funktion
  const login = async (email: string, _password: string) => {
    try {
      // Hier würde normalerweise eine API-Anfrage stehen
      setAuth({
        user: { email }, // Jetzt ist user vom Typ User | null und kann ein Objekt mit email sein
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  // Logout-Funktion
  const logout = async () => {
    try {
      // Hier würde normalerweise eine API-Anfrage stehen
      setAuth({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  };

  return <AuthContext.Provider value={{ auth, login, logout }}>{children}</AuthContext.Provider>;
};

// Custom Hook für den Zugriff auf den Auth-Context
export const useAuth = () => useContext(AuthContext);
