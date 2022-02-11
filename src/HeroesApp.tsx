import { useReducer, useEffect, useContext } from "react";
import { AuthContext, AuthProvider } from "./auth/authContext";
import { AppRouter } from "./routes/AppRouter";

export const HeroesApp = () => {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
};
