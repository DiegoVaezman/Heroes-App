import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SearchScreen } from '../../../components/search/SearchScreen';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockUseNavigate,
}));
const mockUseNavigate = jest.fn();

describe('Testing SearchScreen', () => {
    //LIMPIAR LOS MOCKS DESPUÉS DE CADA TEST PARA QUE NO INTERFIERAN
    beforeEach(() => jest.clearAllMocks());

    test('should show default values', () => {
        const { container } = render(
            <MemoryRouter>
                <SearchScreen />
            </MemoryRouter>
        );
        expect(container).toMatchSnapshot();
    });

    test('should show batman and input with query value', () => {
        render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchScreen />
            </MemoryRouter>
        );

        const input = screen.getByRole('textbox');
        expect(input.value).toBe('batman');

        const img = screen.getByRole('img');
        expect(img.src).toContain('/assets/dc-batman.jpg');

        expect(screen.queryByText('Search an hero')).toBeNull();
    });

    test('should show an error if hero is not found', () => {
        const value = 'batman123';
        render(
            <MemoryRouter initialEntries={[`/search?q=${value}`]}>
                <SearchScreen />
            </MemoryRouter>
        );
        expect(screen.getByText(`No hero with: ${value}`)).toBeTruthy();
    });

    test('should call navigate to new screen', () => {
        const value = 'superman';
        render(
            <MemoryRouter>
                <SearchScreen />
            </MemoryRouter>
        );
        const input = screen.getByRole('textbox');
        fireEvent.change(input, {
            target: { name: 'searchText', value: 'superman' },
        });
        screen.debug();

        //el form no se pilla con getByRole a no ser que se le indique en el componente role='form'
        const form = screen.getByRole('form');
        fireEvent.submit(form);
        // const searchButton = screen.getByRole('button', { name: 'Search...' });
        // fireEvent.click(searchButton);
        expect(mockUseNavigate).toHaveBeenCalledWith(`?q=${value}`);
    });
});
