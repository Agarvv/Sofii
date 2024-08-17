'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Notifications', 'user_target', {
      type: Sequelize.INTEGER,
      allowNull: false
    });

    await queryInterface.addColumn('Notifications', 'notification_type', {
      type: Sequelize.STRING,
      allowNull: false
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Notifications', 'user_target');
    await queryInterface.removeColumn('Notifications', 'notification_type');
  }
};