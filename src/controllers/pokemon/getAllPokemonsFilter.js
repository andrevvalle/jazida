const Pokemon = require('../../models/pokemon');

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
};

module.exports = getAllPokemonsWithFilter;
