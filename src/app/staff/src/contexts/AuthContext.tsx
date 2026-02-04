'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type StaffRole = 'server' | 'cashier';

interface AuthContextType {
  role: StaffRole | null;
  setRole: (role: StaffRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<StaffRole | null>(null);

  const setRole = (newRole: StaffRole) => {
    setRoleState(newRole);
  };

  const logout = () => {
    setRoleState(null);
  };

  return (
    <AuthContext.Provider value={{ role, setRole, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
