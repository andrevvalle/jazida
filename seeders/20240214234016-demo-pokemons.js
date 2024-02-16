'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('pokemons', [{
      tipo: 'Pikachu',
      treinador: 'Ash Ketchum',
      nivel: 5
    }, {
      tipo: 'Mewtwo',
      treinador: 'Ash Ketchum',
      nivel: 10
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('pokemons', null, {});
  }
};
