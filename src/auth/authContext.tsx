import { createContext, useEffect, useReducer } from 'react';
import { AuthState, AuthReducer } from './authReducer';

type AuthContextProps = {
    userState: AuthState;
    login: (name: string) => void;
    logout: () => void;
};

const init = () => {
    const userLocalStorage = localStorage.getItem('user');
    const user = userLocalStorage ? JSON.parse(userLocalStorage) : null;
    const name = user ? user.name : null;
    console.log('USER CONTEXT LOCSTOR', user);

    return { logged: !!userLocalStorage, name };
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {
    const [userState, dispatch] = useReducer(AuthReducer, {}, init);

    useEffect(() => {
        if (!userState.logged) return;
        console.log('SET ITEM USER ON LS WHEN USERSTATE CHANGE', userState);
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
