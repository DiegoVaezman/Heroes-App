import { AuthReducer } from '../../auth/authReducer';

describe('Testing authReducer', () => {
    const initialState = {
        logged: false,
    };
    test('should return default state', () => {
        const newState = AuthReducer(initialState, {});

        expect(newState).toBe(initialState);
    });

    test('should "login" call authentication login and set user in state', () => {
        const action = {
            type: 'login',
            payload: { name: 'Diego' },
        };
        const newState = AuthReducer(initialState, action);
        expect(newState).toEqual({ logged: true, name: action.payload.name });
    });

    test('should logout set logged false and name null', () => {
        const state = {
            logged: true,
            name: 'Diego',
        };
        const action = {
            type: 'logout',
        };
        const newState = AuthReducer(state, action);
        expect(newState).toEqual({ logged: false });
    });
});
