"use client";

import type { User } from "@firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth } from "@/lib/firebase";

type AuthContextType = User | null | undefined;
const DEFAULT_VALUE: AuthContextType = undefined;

const AuthContext = createContext<AuthContextType>(DEFAULT_VALUE);

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthContextType>(DEFAULT_VALUE);

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };

export const useAuthContext = () => useContext(AuthContext);
