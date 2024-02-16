const Pokemon = require('../../models/pokemon');

const getPokemonById = async (req, res) => {
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
};

module.exports = getPokemonById;
