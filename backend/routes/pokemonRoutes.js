import express from "express";
import {
  getPokemonByName,
  getMultiplePokemon,
  getPokemonByType,
  getAllPokemon
} from "../controllers/pokemonControllers.js";

const router = express.Router();

router.get("/all", getAllPokemon);
router.get("/getOne/:name", getPokemonByName);
router.post("/getMany", getMultiplePokemon);
router.get("/getByType/:type", getPokemonByType);

export default router;

