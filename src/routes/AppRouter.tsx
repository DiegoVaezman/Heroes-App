import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { LoginScreen } from '../components/login/LoginScreen';
import { DashboardRoutes } from './DashboardRoutes';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRouter';

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path='login/*'
                    element={
                        <PublicRoute>
                            <Routes>
                                <Route path='/*' element={<LoginScreen />} />
                            </Routes>
                        </PublicRoute>
                    }
                />

                <Route
                    path='*'
                    element={
                        <PrivateRoute>
                            <DashboardRoutes />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};
