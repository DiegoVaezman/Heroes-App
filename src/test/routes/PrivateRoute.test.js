import { PrivateRoute } from '../../routes/PrivateRoute';
import { render, screen } from '@testing-library/react';
import { AuthContext } from '../../auth/authContext';
import { MemoryRouter } from 'react-router-dom';

describe('Testing PrivateRoute', () => {
    test('should show children if authenticated', () => {
        Storage.prototype.setItem = jest.fn();

        const contextValue = {
            userState: {
                logged: true,
                name: 'Diego',
            },
        };
        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/marvel']}>
                    <PrivateRoute>
                        <h1>Private Route</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect(screen.getByText('Private Route')).toBeTruthy();
        expect(localStorage.setItem).toHaveBeenCalledWith(
            'lastPath',
            '/marvel'
        );
    });
});
