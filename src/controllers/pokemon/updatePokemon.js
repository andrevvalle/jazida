const Pokemon = require('../../models/pokemon');
const _ = require('lodash');

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
};

module.exports = updatePokemon;
