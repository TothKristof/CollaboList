"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useApolloClient } from "@apollo/client/react";

type AuthUser = {
  id: number;
  email: string;
};

type AuthContextType = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); 
  const client = useApolloClient();

const fetchMe = async () => {
  try {
    const res = await fetch("/api/graphql", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query {
            me {
              id
              email
            }
          }
        `,
      }),
    });

    const result = await res.json();

    if (!result.data?.me) {
      setUser(null);
      router.replace("/login");
      return;
    }

    setUser(result.data.me);
  } catch (error) {
    setUser(null);
    router.replace("/login");
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchMe();
  }, []);

  const login = async () => {
    await fetchMe();
  };

const logout = async () => {
  await fetch("/api/graphql", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        mutation {
          logout
        }
      `,
    }),
  });

  setUser(null);

  await client.clearStore();
};


  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};