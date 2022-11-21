import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../auth/authContext';

export const PrivateRoute = ({ children }: any) => {
    const { userState } = useContext(AuthContext);

    const { pathname, search } = useLocation();

    localStorage.setItem('lastPath', pathname + search);

    return userState.logged ? children : <Navigate to='/login' />;
};
