// Import Pokémon images
import bulbasaurImage from '../assets/bulbasaur.png';
import charmanderImage from '../assets/charmander.png';
import squirtleImage from '../assets/squirtle.png';
import pikachuImage from '../assets/pikachu.png';
import eeveeImage from '../assets/eevee.png';
import jigglypuffImage from '../assets/jigglypuff.png';
import meowthImage from '../assets/meowth.png';
import psyduckImage from '../assets/psyduck.png';
import snorlaxImage from '../assets/snorlax.png';
import mewtwoImage from '../assets/mewtwo.png';

export const getPokemonImage = (name) => {
  switch (name.toLowerCase()) {
    case 'bulbasaur':
      return bulbasaurImage;
    case 'charmander':
      return charmanderImage;
    case 'squirtle':
      return squirtleImage;
    case 'pikachu':
      return pikachuImage;
    case 'eevee':
      return eeveeImage;
    case 'jigglypuff':
      return jigglypuffImage;
    case 'meowth':
      return meowthImage;
    case 'psyduck':
      return psyduckImage;
    case 'snorlax':
      return snorlaxImage;
    case 'mewtwo':
      return mewtwoImage;
    default:
      return bulbasaurImage; // Default image
  }
};

export const getTypeColor = (type) => {
  const typeColors = {
    normal: '#A8A878',
    fire: '#F08030',
    water: '#6890F0',
    electric: '#F8D030',
    grass: '#78C850',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    fairy: '#EE99AC'
  };
  return typeColors[type.toLowerCase()] || '#A8A878';
}; 