const Pokemon = require('../models/pokemon');
const { z } = require('zod');
const _ = require('lodash');

const createPokemonSchema = z.object({
  tipo: z.string(),
  treinador: z.string(),
});

const createPokemon = async (req, res) => {
  try {
    const { tipo, treinador } = createPokemonSchema.parse(req.body);

    const formattedTipo = _.capitalize(tipo);

    const pokemon = await Pokemon.create({ tipo: formattedTipo, treinador });
    res.status(201).send(pokemon);
  } catch (error) {
    res.status(400).send({ message: 'Dados inválidos', error });
  }
};

const updatePokemon = async (req, res) => {
  try {
    const { id } = req.params;

    const { tipo, treinador } = req.body;

    const pokemon = await Pokemon.findByPk(id);

    if (!pokemon) {
      return res.status(404).send({ message: 'Pokemon não encontrado' });
    }

    if (tipo) {
      const formattedTipo = _.capitalize(tipo);
      pokemon.tipo = formattedTipo;
    }

    if (treinador) {
      pokemon.treinador = treinador;
    }

    await pokemon.save();

    res.status(200).send(pokemon);
  } catch (error) {
    res.status(400).send({ message: 'Dados inválidos', error });
  }
}

const deletePokemon = async (req, res) => {
  try {
    const { id } = req.params;

    const pokemon = await Pokemon.findByPk(id);

    if (!pokemon) {
      return res.status(404).send({ message: 'Pokemon não encontrado' });
    }

    await pokemon.destroy();

    res.status(204).send(
      { message: 'Pokemon deletado com sucesso' }
    );
  } catch (error) {
    res.status(400).send({ message: 'Dados inválidos', error });
  }
}

const getPokemon = async (req, res) => {
  try {
    const { id } = req.params;

    const pokemon = await Pokemon.findByPk(id);

    if (!pokemon) {
      return res.status(404).send({ message: 'Pokemon não encontrado' });
    }

    res.status(200).send(pokemon);
  } catch (error) {
    res.status(400).send({ message: 'Dados inválidos', error });
  }
}

const getAllPokemons = async (req, res) => {
  try {
    const pokemons = await Pokemon.findAll();

    res.status(200).send(pokemons);
  } catch (error) {
    res.status(400).send({ message: 'Dados inválidos', error });
  }
}

const getAllPokemonsWithFilter = async (req, res) => {
  try {
    const { perPage = 10, page = 1, sortBy = 'id', sortOrder = 'asc' } = req.query;

    const offset = (page - 1) * perPage;
    const limit = parseInt(perPage);

    const pokemons = await Pokemon.findAndCountAll({
      offset,
      limit,
      order: [[sortBy, sortOrder.toUpperCase()]],
    });

    const totalPages = Math.ceil(pokemons.count / perPage);

    res.status(200).send({
      pokemons: pokemons.rows,
      totalPokemons: pokemons.count,
      totalPages,
      currentPage: parseInt(page),
    });
  } catch (error) {
    res.status(400).send({ message: 'Dados inválidos', error });
  }
}

const makeBattlePokemons = async (req, res) => {
  try {
    const { id1, id2 } = req.params;

    const pokemon1 = await Pokemon.findByPk(id1);
    const pokemon2 = await Pokemon.findByPk(id2);

    if (!pokemon1 || !pokemon2) {
      return res.status(404).send({ message: 'Pokemon não encontrado' });
    }

    const luck1 = Math.random() * 0.2 + 0.9;
    const luck2 = Math.random() * 0.2 + 0.9;

    const level1 = pokemon1.nivel * luck1;
    const level2 = pokemon2.nivel * luck2;

    const totalAdjustedLevel = level1 + level2;
    const chance1 = level1 / totalAdjustedLevel;

    const winner = Math.random() < chance1 ? pokemon1 : pokemon2;

    res.status(200).send(winner);
  } catch (error) {
    res.status(400).send({ message: 'Dados inválidos', error });
  }
};

module.exports = {
  createPokemon,
  updatePokemon,
  deletePokemon,
  getPokemon,
  getAllPokemons,
  getAllPokemonsWithFilter,
  makeBattlePokemons,
};
