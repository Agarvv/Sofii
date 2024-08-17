'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.addColumn('VideoCommentAwnsers', 'comment_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Elimina la columna comment_id de la tabla comment_answers
    
    // Elimina la columna comment_id de la tabla VideoCommentAwnser
    await queryInterface.removeColumn('VideoCommentAwnsers', 'comment_id');
  }
};