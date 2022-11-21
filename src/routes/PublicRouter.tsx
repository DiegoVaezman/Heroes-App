import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../auth/authContext';

export const PublicRoute = ({ children }: any) => {
    const { userState } = useContext(AuthContext);

    return userState.logged ? <Navigate to='/marvel' /> : children;
};
