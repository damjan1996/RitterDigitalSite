// src/components/AuthWrapper.tsx
import React from 'react';
import type { ReactNode } from 'react';

import { useAuth } from './providers/AuthProvider';

interface AuthWrapperProps {
  children: ReactNode;
}

export const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const { auth } = useAuth();

  // Wenn nicht angemeldet, behandle es sanft statt zu crashen
  if (!auth) {
    return <div>{children}</div>;
  }

  return <div>{children}</div>;
};

export default AuthWrapper;
