import React, { createContext, useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import type { AppRole } from "@/features/auth/authApi";
import supabase from "@/lib/supabase";

type AuthState = {
  session: Session | null;
  user: Session["user"] | null;
  role: AppRole | null;
  loading: boolean;
};

export const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [role, setRole] = useState<AppRole | null>(null);
  const [loading, setLoading] = useState(true);

  async function loadRole(userId: string) {
    const { data } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", userId)
      .single();

    setRole(data?.role ?? null);
  }

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setSession(data.session ?? null);
      if (data.session?.user) {
        loadRole(data.session.user.id);
      }
      setLoading(false);
    });

    const { data: sub } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession);
        if (newSession?.user) {
          loadRole(newSession.user.id);
        } else {
          setRole(null);
        }
      },
    );

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        session,
        user: session?.user ?? null,
        role,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
