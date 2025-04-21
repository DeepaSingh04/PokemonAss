import Pokemon from '../models/pokemon.js';

// GET all
export const getAllPokemon = async (req, res) => {
  try {
    const pokemons = await Pokemon.find({});
    res.json(pokemons);
  } catch (error) {
    console.error('Error fetching all Pokémon:', error);
    res.status(500).json({ message: 'Error fetching all Pokémon' });
  }
};

// GET one
export const getPokemonByName = async (req, res) => {
  try {
    const { name } = req.params;
    // Convert search term to lowercase for case-insensitive search
    const searchName = name.toLowerCase();
    const pokemon = await Pokemon.findOne({ 
      name: { $regex: new RegExp(`^${searchName}$`, 'i') } 
    });
    
    if (!pokemon) {
      return res.status(404).json({ message: 'Pokémon not found' });
    }
    
    res.json(pokemon);
  } catch (error) {
    console.error('Error searching for Pokémon:', error);
    res.status(500).json({ message: 'Error searching for Pokémon' });
  }
};

// POST multiple
export const getMultiplePokemon = async (req, res) => {
  try {
    const { names } = req.body;
    const pokemons = await Pokemon.find({ 
      name: { 
        $in: names.map(name => new RegExp(`^${name.toLowerCase()}$`, 'i')) 
      } 
    });
    res.json(pokemons);
  } catch (error) {
    console.error('Error fetching multiple Pokémon:', error);
    res.status(500).json({ message: 'Error fetching multiple Pokémon' });
  }
};

// GET by type
export const getPokemonByType = async (req, res) => {
  try {
    const { type } = req.params;
    const pokemons = await Pokemon.find({ 
      types: { $regex: new RegExp(`^${type}$`, 'i') } 
    });
    res.json(pokemons);
  } catch (error) {
    console.error('Error fetching Pokémon by type:', error);
    res.status(500).json({ message: 'Error fetching Pokémon by type' });
  }
};
