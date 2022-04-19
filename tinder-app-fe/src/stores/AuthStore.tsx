import React, { createContext, useEffect, useState, useCallback } from "react";
import { getAuthUser, getMe } from "../api/Auth";
import { User } from "../interfaces/User";

interface AuthState {
  token: string;
  user: User;
}

export const AuthContext = createContext<AuthState | undefined>(undefined);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthState | undefined>(undefined);

  useEffect(() => {
    (async () => {
      const userToken = localStorage.getItem("user_token");
      if (userToken) {
        const me = await getMe(userToken);
        if (me) {
          setUser({ token: userToken, user: me });
          return;
        }
      }
      const userRes = await getAuthUser();
      if (userRes) {
        localStorage.setItem("user_token", userRes.token);
        setUser(userRes);
      }
    })();
  }, []);
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
