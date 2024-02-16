const Pokemon = require('../../models/pokemon');
const { z } = require('zod');
const _ = require('lodash');

const createPokemonSchema = z.object({
  tipo: z.string(),
  treinador: z.string(),
});

const createPokemon = async (req, res) => {
  try {
    const { tipo, treinador } = createPokemonSchema.parse(req.body);

    if (!tipo) {
      return res.status(400).send({ message: 'O campo "tipo" é obrigatório' });
    }

    if (!treinador) {
      return res.status(400).send({ message: 'O campo "treinador" é obrigatório' });
    }

    const formattedTipo = _.capitalize(tipo);
    const pokemon = await Pokemon.create({ tipo: formattedTipo, treinador });
    res.status(201).send(pokemon);
  } catch (error) {
    res.status(400).send({ message: 'Dados inválidos', error });
  }
};

module.exports = createPokemon;
