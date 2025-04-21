import React from 'react';

const PokemonCard = ({ pokemon }) => {
  return (
    <div className="pokemon-card">
      <img 
        src={pokemon.sprite || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
        alt={pokemon.name} 
        className="pokemon-image"
      />
      <h3 className="pokemon-name">{pokemon.name}</h3>
      {pokemon.category && (
        <div className="pokemon-category">{pokemon.category}</div>
      )}
      <div className="pokemon-types">
        {pokemon.types.map((type, index) => (
          <span key={index} className={`type-badge ${type.toLowerCase()}`}>
            {type}
          </span>
        ))}
      </div>
      {pokemon.abilities && (
        <div className="pokemon-abilities">
          Abilities: {pokemon.abilities.join(', ')}
        </div>
      )}
      <div className="pokemon-stats">
        <p>ID: {pokemon.id}</p>
        {pokemon.height && <p>Height: {pokemon.height}m</p>}
        {pokemon.weight && <p>Weight: {pokemon.weight}kg</p>}
      </div>
    </div>
  );
};

export default PokemonCard; 