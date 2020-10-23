'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('UserGroups', 'GroupId', {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: 'Groups'
        },
        key: "id"
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE"
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('UserGroups', 'GroupId')
  }
};
