const express = require('express');
const router = express.Router();

const {
    createPokemon,
    updatePokemon,
    deletePokemon,
    getPokemonById,
    getAllPokemons,
    getAllPokemonsWithFilter,
    makeBattlePokemons
} = require('../controllers/pokemon');

router.post('/pokemons', createPokemon);
router.post('/batalhar/:id1/:id2', makeBattlePokemons);
router.put('/pokemons/:id', updatePokemon);

router.delete('/pokemons/:id', deletePokemon);

router.get('/pokemons/:id', getPokemonById);
router.get('/pokemons', getAllPokemons);
router.get('/pokemonsWithFilter', getAllPokemonsWithFilter);

module.exports = router;
