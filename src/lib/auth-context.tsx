import React, { createContext, useContext, useState, useCallback } from "react";

export type UserRole = "admin" | "lecturer" | "student" | "registrar";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Demo users for showcase
const DEMO_USERS: Record<string, User> = {
  "admin@kasunguttc.ac.mw": { id: "1", name: "Dr. Grace Banda", email: "admin@kasunguttc.ac.mw", role: "admin" },
  "lecturer@kasunguttc.ac.mw": { id: "2", name: "Mr. James Phiri", email: "lecturer@kasunguttc.ac.mw", role: "lecturer" },
  "student@kasunguttc.ac.mw": { id: "3", name: "Chimwemwe Mwale", email: "student@kasunguttc.ac.mw", role: "student" },
  "registrar@kasunguttc.ac.mw": { id: "4", name: "Mrs. Tiyamike Chirwa", email: "registrar@kasunguttc.ac.mw", role: "registrar" },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback(async (email: string, _password: string) => {
    const found = DEMO_USERS[email.toLowerCase()];
    if (!found) throw new Error("Invalid credentials");
    setUser(found);
  }, []);

  const logout = useCallback(() => setUser(null), []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
