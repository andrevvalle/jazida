const Pokemon = require('../../models/pokemon');

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

module.exports = makeBattlePokemons;
