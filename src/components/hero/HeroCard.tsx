import React from 'react';
import { Link } from 'react-router-dom';
import { Hero } from '../../interfaces/Interfaces';
import './HeroCard.css';

interface Props extends React.HTMLAttributes<HTMLElement> {
    hero: Hero;
}

export const HeroCard = ({ hero }: Props) => {
    return (
        <Link
            to={`/hero/${hero.id}`}
            className='my-card animate__animated animate__fadeIn'
        >
            <img
                src={`/assets/${hero.id}.jpg`}
                className='img img-responsive'
                alt={hero.superhero}
            />
            <div className='profile-name'>{hero.superhero}</div>
            <div className='profile-position'>{hero.alter_ego}</div>
            <div className='profile-overview'>
                <div className='profile-overview'>
                    <div className='row'>
                        <div className='col-ms-4'>
                            <h3>{hero.publisher}</h3>
                            <p>
                                Primera aparición: <br />
                                {hero.first_appearance}
                            </p>
                            {hero.alter_ego !== hero.characters && (
                                <p>{hero.characters}</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};
