import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AuthContext } from '../../auth/authContext';
import { PublicRoute } from '../../routes/PublicRoute';

describe('Testing PublicRoute', () => {
    test('should show children if not authenticated', () => {
        const contextValue = {
            userState: {
                logged: false,
            },
            // login: jest.fn(),
            // logout: jest.fn(),
        };
        render(
            <AuthContext.Provider value={contextValue}>
                <PublicRoute>
                    <h1>public router</h1>
                </PublicRoute>
            </AuthContext.Provider>
        );

        expect(screen.getByText('public router')).toBeTruthy();
    });

    test('should navigate if user is authenticated', () => {
        const contextValue = {
            userState: {
                logged: true,
                name: 'Diego',
            },
            // login: jest.fn(),
            // logout: jest.fn(),
        };
        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/login']}>
                    <Routes>
                        <Route path='marvel' element={<h1>Marvel Page</h1>} />
                        <Route
                            path='login'
                            element={
                                <PublicRoute>
                                    <h1>public router</h1>
                                </PublicRoute>
                            }
                        ></Route>
                    </Routes>
                </MemoryRouter>
            </AuthContext.Provider>
        );
        expect(screen.getByText('Marvel Page')).toBeTruthy();
    });
});
