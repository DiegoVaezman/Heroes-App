import React, { useEffect, useMemo } from 'react';
import { useForm } from '../../hooks/useForm';
import { getHeroByName } from '../../selectors/getHeroByName';
import { HeroCard } from '../hero/HeroCard';
import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string';

export const SearchScreen = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const useQuery = () => {
        return new URLSearchParams(location.search);
    };
    const query = useQuery().get('q') || '';
    const { onChange, searchText } = useForm({
        searchText: query,
    });

    const heroesFiltered = useMemo(() => getHeroByName(query), [query]);

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        navigate(`?q=${searchText}`);
    };

    return (
        <>
            <h1>Search</h1>
            <hr />
            <div className='row'>
                <div className='col-5'>
                    <h4>Searching</h4>
                    <hr />

                    <form onSubmit={(e) => handleSearch(e)}>
                        <input
                            type='text'
                            placeholder='Search hero'
                            className='form-control'
                            name='searchText'
                            autoComplete='off'
                            value={searchText}
                            onChange={(event) =>
                                onChange(event.target.value, 'searchText')
                            }
                        />
                        <button
                            type='submit'
                            className='btn btn-outline-primary mt-1'
                        >
                            Search...
                        </button>
                    </form>
                </div>
                <div className='col-7'>
                    <h4>Results</h4>
                    <hr />
                    {query === '' ? (
                        <div className='alert alert-info animate__animated animate__fadeIn'>
                            Search an hero
                        </div>
                    ) : (
                        heroesFiltered.length === 0 && (
                            <div className='alert alert-info animate__animated animate__fadeIn'>
                                No hero with: {query}
                            </div>
                        )
                    )}
                    {heroesFiltered.map((hero) => (
                        <HeroCard key={hero.id} hero={hero} />
                    ))}
                </div>
            </div>
        </>
    );
};
