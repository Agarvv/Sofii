module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('notifications', 'type_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'types', // Asegúrate que esta tabla existe
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('notifications', 'type_id');
  }
};