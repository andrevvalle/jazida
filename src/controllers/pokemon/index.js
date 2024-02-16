const createPokemon = require('./createPokemon');
const updatePokemon = require('./updatePokemon');
const deletePokemon = require('./deletePokemon');
const getAllPokemons = require('./getAllPokemons');
const getAllPokemonsWithFilter = require('./getAllPokemonsFilter');
const getPokemonById = require('./getPokemonById');
const makeBattlePokemons = require('./battlePokemons');

module.exports = {
    createPokemon,
    deletePokemon,
    updatePokemon,
    getAllPokemons,
    getAllPokemonsWithFilter,
    getPokemonById,
    makeBattlePokemons
};