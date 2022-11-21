import {AuthAction} from '../../auth/authReducer'
import {AuthReducer} from '../../auth/authReducer'

describe('Pruebas den authReducer', () => {
    test('debe retornar el estado por defecto', () => {
            const state = AuthReducer({}, {type: 'login', payload: {name: 'Diego'}});
            expect(state).toEqual({logged:true, name: 'Diego'});
    })

    test('Debe poner state en logged en false y borrar nombre de usuario', () => {
        const state = AuthReducer({logged: true, name: 'Diego'}, {type: 'logout'});
        expect(state).toEqual({logged:false});

    })
})