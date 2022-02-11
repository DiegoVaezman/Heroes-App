import { createContext, useEffect, useReducer } from "react";
import { AuthState, AuthReducer } from "./authReducer";

type AuthContextProps = {
  user: AuthState;
  login: (name: string) => void;
  logout: () => void;
};

const init = () => {
  return JSON.parse(localStorage.getItem("user")!) || { logged: false };
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {
  const [user, dispatch] = useReducer(AuthReducer, {}, init);

  useEffect(() => {
    if (!user) return;
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const login = (name: string) => {
    dispatch({
      type: "login",
      payload: { name: name },
    });
  };

  const logout = () => {
    dispatch({
      type: "logout",
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
