const Pokemon = require('../../models/pokemon');

const deletePokemon = async (req, res) => {
  try {
    const { id } = req.params;
    const pokemon = await Pokemon.findByPk(id);

    if (!pokemon) {
      return res.status(404).send({ message: 'Pokemon não encontrado' });
    }

    await pokemon.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(400).send({ message: 'Dados inválidos', error });
  }
};

module.exports = deletePokemon;
