import { types } from '../../types/Types';

describe('Testing Types', () => {
    test('should return types', () => {
        expect(types).toEqual({
            login: '[auth] Login',
            logout: '[auth] Logout',
        });
    });
});
