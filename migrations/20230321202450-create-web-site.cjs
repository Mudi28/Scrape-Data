'use strict'
module.exports = {
  // `up` method is called when the migration is run
  async up(queryInterface, Sequelize) {
    // creates a new table called 'webSites' in the database
    await queryInterface.createTable('website', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      url: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    })
  },
  //`down` method is called when the migration is rolled back
  async down(queryInterface, Sequelize) {
    // drops the 'webSites' table from the database
    await queryInterface.dropTable('website')
  },
}
