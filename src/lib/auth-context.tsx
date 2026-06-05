import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User as SupabaseUser, Session } from "@supabase/supabase-js";

export type AppRole = "admin" | "lecturer" | "student" | "registrar" | "principal" | "bursar";
export type AccountStatus = "pending" | "active" | "rejected";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: AppRole;
  status: AccountStatus;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, fullName: string, requestedRole: AppRole) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

async function fetchProfileAndRole(userId: string): Promise<{ role: AppRole; status: AccountStatus }> {
  const [{ data: profile }, { data: role }] = await Promise.all([
    supabase.from("profiles").select("status").eq("id", userId).maybeSingle(),
    supabase.rpc("get_user_role", { _user_id: userId }),
  ]);
  return {
    role: (role as AppRole) || "student",
    status: ((profile as any)?.status as AccountStatus) || "pending",
  };
}

async function buildUser(su: SupabaseUser): Promise<User> {
  const { role, status } = await fetchProfileAndRole(su.id);
  return {
    id: su.id,
    name: su.user_metadata?.full_name || su.email?.split("@")[0] || "",
    email: su.email || "",
    avatar: su.user_metadata?.avatar_url,
    role,
    status,
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      if (session?.user) {
        try {
          const u = await buildUser(session.user);
          setUser(u);
        } catch {
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        try {
          const u = await buildUser(session.user);
          setUser(u);
        } catch {
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  }, []);

  const signup = useCallback(async (email: string, password: string, fullName: string, requestedRole: AppRole) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName, requested_role: requestedRole },
        emailRedirectTo: window.location.origin,
      },
    });
    if (error) throw error;
  }, []);

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
  }, []);

  const refreshUser = useCallback(async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      const u = await buildUser(session.user);
      setUser(u);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, session, login, signup, logout, refreshUser, isAuthenticated: !!session, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
