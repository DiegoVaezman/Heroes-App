import React, { useMemo } from 'react';
import { getHeroesByPublisher } from '../../selectors/getHeroesByPublisher';
import { Publisher } from '../../interfaces/Interfaces';
import { HeroCard } from './HeroCard';

interface Props {
    publisher: Publisher;
}

export const HeroList = ({ publisher }: Props) => {
    const heroes = useMemo(() => getHeroesByPublisher(publisher), [publisher]);

    return (
        <div className='row rows-cols-1 row-cols-md-3 g-3 animate__animated animate__fadeIn'>
            {heroes.map((hero) => (
                <HeroCard key={hero.id} hero={hero} />
            ))}
        </div>
    );
};
