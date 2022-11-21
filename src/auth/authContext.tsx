import { createContext, useEffect, useReducer } from 'react';
import { AuthState, AuthReducer } from './authReducer';

type AuthContextProps = {
    userState: AuthState;
    login: (name: string) => void;
    logout: () => void;
};

const init = () => {
    const userLocalStorage = localStorage.getItem('user');
    console.log(userLocalStorage);
    const user = userLocalStorage ? JSON.parse(userLocalStorage) : null;

    return { logged: !!userLocalStorage, user };
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {
    const [userState, dispatch] = useReducer(AuthReducer, {}, init);

    useEffect(() => {
        if (!userState.logged) return;
        localStorage.setItem('user', JSON.stringify(userState));
    }, [userState]);

    const login = (name: string) => {
        dispatch({
            type: 'login',
            payload: { name: name },
        });
    };

    const logout = () => {
        localStorage.removeItem('user');
        dispatch({
            type: 'logout',
        });
    };

    return (
        <AuthContext.Provider value={{ userState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
