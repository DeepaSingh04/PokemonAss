// import React from 'react';

// const PokemonRow = ({ pokemon }) => {
//   if (!pokemon) return null;

//   return (
//     <tr>
//       <td>{pokemon.id}</td>
//       <td>{pokemon.name}</td>
//       <td>{pokemon.types.join(', ')}</td>
//       <td>
//         <img src={pokemon.sprite} alt={pokemon.name} width="80" />
//       </td>
//     </tr>
//   );
// };

// export default PokemonRow;



// import React from 'react';
// import bulbasaurImage from '../assets/images/bulbasaur.png';  
// const PokemonRow = ({ pokemon }) => {
//   return (
//     <div className="pokemon-row">
//       <img src={bulbasaurImage} alt={pokemon.name} /> {/* Displaying the image */}
//       <p>Name: {pokemon.name}</p>
//       <p>Types: {pokemon.types.join(', ')}</p>
//       <p>ID: {pokemon.id}</p>
//     </div>
//   );
// };

// export default PokemonRow;

// frontend/src/components/PokemonRow.jsx
import React from 'react';
import './PokemonRow.css';

// Import Pokémon images
import bulbasaurImage from '../assets/bulbasaur.png';
import charmanderImage from '../assets/charmander.png';
import squirtleImage from '../assets/squirtle.png';
import pikachuImage from '../assets/pikachu.png';

const PokemonRow = ({ pokemon }) => {
  if (!pokemon) return null;

  // Function to get the correct image based on Pokémon name
  const getPokemonImage = (name) => {
    switch (name.toLowerCase()) {
      case 'bulbasaur':
        return bulbasaurImage;
      case 'charmander':
        return charmanderImage;
      case 'squirtle':
        return squirtleImage;
      case 'pikachu':
        return pikachuImage;
      default:
        return bulbasaurImage; // Default image if name not found
    }
  };

  return (
    <div className="pokemon-card">
      <div className="pokemon-image-container">
        <img 
          src={getPokemonImage(pokemon.name)}
          alt={pokemon.name}
          className="pokemon-image"
        />
      </div>
      <div className="pokemon-info">
        <h3 className="pokemon-name">{pokemon.name}</h3>
        <div className="pokemon-types">
          {pokemon.types.map((type, index) => (
            <span key={index} className={`type-badge type-${type.toLowerCase()}`}>
              {type}
            </span>
          ))}
        </div>
        <p className="pokemon-id">#{pokemon.id}</p>
      </div>
    </div>
  );
};

export default PokemonRow;
