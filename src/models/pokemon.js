const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres://user:password@db:5432/pokemondb');

const Pokemon = sequelize.define('Pokemon', {
  tipo: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: {
        args: [['Charizard', 'Mewtwo', 'Pikachu']],
        msg: "O tipo do Pokémon deve ser 'charizard', 'mewtwo' ou 'pikachu'"
      }
    }
  },
  treinador: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nivel: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    allowNull: false
  }
}, {
  tableName: 'pokemons'
});

module.exports = Pokemon;
