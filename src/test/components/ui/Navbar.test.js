import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../auth/authContext';
import { Navbar } from '../../../components/ui/Navbar';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockUseNavigate,
}));
const mockUseNavigate = jest.fn();
const mockLogin = jest.fn();
const mockLogout = jest.fn();

describe('Testing Navbar', () => {
    beforeEach(() => jest.clearAllMocks());

    test('should show user name', () => {
        const contextValue = {
            userState: {
                logged: true,
                name: 'Diego',
            },
            login: mockLogin,
            logout: mockLogout,
        };
        render(
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={contextValue}>
                    <Navbar />
                </AuthContext.Provider>
            </MemoryRouter>
        );
        // screen.debug();
        expect(screen.getByText(contextValue.userState.name)).toBeTruthy();
    });

    test('should call logout when click logout', () => {
        const contextValue = {
            userState: {
                logged: true,
                name: 'Diego',
            },
            login: mockLogin,
            logout: mockLogout,
        };
        render(
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={contextValue}>
                    <Navbar />
                </AuthContext.Provider>
            </MemoryRouter>
        );
        const logoutButton = screen.getByRole('button', { name: 'Logout' });
        fireEvent.click(logoutButton);
        expect(mockLogout).toHaveBeenCalled();
    });

    test('should redirect to /login when logout', () => {
        const contextValue = {
            userState: {
                logged: true,
                name: 'Diego',
            },
            login: mockLogin,
            logout: mockLogout,
        };
        render(
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={contextValue}>
                    <Navbar />
                </AuthContext.Provider>
            </MemoryRouter>
        );
        const logoutButton = screen.getByRole('button', { name: 'Logout' });
        fireEvent.click(logoutButton);
        expect(mockUseNavigate).toHaveBeenCalledWith('/login', {
            replace: true,
        });
    });
});
