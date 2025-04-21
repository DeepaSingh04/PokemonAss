import mongoose from "mongoose";
import dotenv from "dotenv";
import Pokemon from "./models/pokemon.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const pokemons = [
  {
    id: 1,
    name: "Bulbasaur",
    types: ["grass", "poison"],
    sprite: "https://pokemon.com/pictures/bulbasaur.png",
  },
  {
    id: 2,
    name: "Charmander",
    types: ["fire"],
    sprite: "https://pokemon.com/pictures/charmander.png",
  },
  {
    id: 3,
    name: "Squirtle",
    types: ["water"],
    sprite: "https://pokemon.com/pictures/squirtle.png",
  },
  {
    id: 4,
    name: "Pikachu",
    types: ["electric"],
    sprite: "https://pokemon.com/pictures/pikachu.png",
  },
  {
    id: 5,
    name: "Eevee",
    types: ["normal"],
    sprite: "https://pokemon.com/pictures/eevee.png",
  },
  {
    id: 6,
    name: "Jigglypuff",
    types: ["normal", "fairy"],
    sprite: "https://pokemon.com/pictures/jigglypuff.png",
  },
  {
    id: 7,
    name: "Meowth",
    types: ["normal"],
    sprite: "https://pokemon.com/pictures/meowth.png",
  },
  {
    id: 8,
    name: "Psyduck",
    types: ["water"],
    sprite: "https://pokemon.com/pictures/psyduck.png",
  },
  {
    id: 9,
    name: "Snorlax",
    types: ["normal"],
    sprite: "https://pokemon.com/pictures/snorlax.png",
  },
  {
    id: 10,
    name: "Mewtwo",
    types: ["psychic"],
    sprite: "https://pokemon.com/pictures/mewtwo.png",
  }
];

const insertData = async () => {
  try {
    await Pokemon.deleteMany(); 
    await Pokemon.insertMany(pokemons); 
    console.log("Mock Pokémon inserted!");
    process.exit();
  } catch (error) {
    console.log("Error in data:", error);
    process.exit(1);
  }
};

insertData();
