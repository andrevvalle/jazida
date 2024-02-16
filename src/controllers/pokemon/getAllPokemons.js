const Pokemon = require('../../models/pokemon');

const getAllPokemons = async (req, res) => {
  try {
    const pokemons = await Pokemon.findAll();
    res.status(200).send(pokemons);
  } catch (error) {
    res.status(400).send({ message: 'Dados inválidos', error });
  }
};

module.exports = getAllPokemons;
