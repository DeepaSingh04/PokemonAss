// frontend/src/components/PokedexTable.jsx
import React from 'react';
import PokemonRow from './PokemonRow';
import './PokedexTable.css';

const PokedexTable = ({ pokemons }) => {
  return (
    <div className="pokedex-container">
      <div className="pokedex-grid">
        {pokemons.map((pokemon) => (
          <PokemonRow key={pokemon._id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
};

export default PokedexTable;
