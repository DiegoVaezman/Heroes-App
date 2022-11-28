import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../auth/authContext';
import { AppRouter } from '../../routes/AppRouter';

describe('Testing AppRouter', () => {
    test('should show login if not authenticated', () => {
        const contextValue = {
            userState: {
                logged: false,
            },
        };
        render(
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={contextValue}>
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>
        );
        expect(screen.getAllByText('Login').length).toBe(2);
    });

    test('should show marvel component if authenticated', () => {
        const contextValue = {
            userState: {
                logged: true,
                name: 'Diego',
            },
        };
        render(
            <MemoryRouter initialEntries={['/login']}>
                <AuthContext.Provider value={contextValue}>
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>
        );
        expect(screen.getByText('Asociaciones')).toBeTruthy();
    });
});
