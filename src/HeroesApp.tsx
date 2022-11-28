import { useReducer, useEffect, useContext } from 'react';
import { HashRouter } from 'react-router-dom';
import { AuthContext, AuthProvider } from './auth/authContext';
import { AppRouter } from './routes/AppRouter';

export const HeroesApp = () => {
    return (
        <AuthProvider>
            <HashRouter>
                <AppRouter />
            </HashRouter>
        </AuthProvider>
    );
};
