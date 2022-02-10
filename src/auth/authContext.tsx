import { createContext, useEffect, useReducer } from "react";
import { AuthState, AuthReducer } from "./authReducer";

type AuthContextProps = {
  name: string;
  logged: boolean;
  login: (name: string) => void;
};

const authInitialState: AuthState = {
  name: "",
  logged: false,
};
// const init = () => {
//   return JSON.parse(localStorage.getItem("user")!);
// };

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {
  const [user, dispatch] = useReducer(AuthReducer, authInitialState);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const { name } = JSON.parse(user);
      dispatch({
        type: "login",
        payload: { name: name },
      });
    }
  }, []);

  const login = (name: string) => {
    dispatch({
      type: "login",
      payload: { name: name },
    });
    const user = JSON.stringify({ name: name, logged: true });
    localStorage.setItem("user", user);
  };

  return (
    <AuthContext.Provider value={{ ...user, login }}>
      {children}
    </AuthContext.Provider>
  );
};
