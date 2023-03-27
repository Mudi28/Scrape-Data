'use strict'
module.exports = {
  // `up` method is called when the migration is run
  async up(queryInterface, Sequelize) {
    // creates a new table called 'scrapingInfoLogs' in the database
    await queryInterface.createTable('scrapinginfolog', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      websiteId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'website', //name of the referenced table
          key: 'id', //name of the referenced column
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'product', //name of the referenced table
          key: 'id', //name of the referenced column
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      HTML: {
        type: Sequelize.TEXT,
      },
      webSiteId: {
        type: Sequelize.INTEGER,
      },
      productId: {
        type: Sequelize.INTEGER,
      },
      active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      createdBy: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedBy: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      deletedBy: {
        allowNull: true,
        type: Sequelize.STRING,
      },
    })
  },
  //`down` method is called when the migration is rolled back
  async down(queryInterface, Sequelize) {
    // drops the 'webSites' table from the database
    await queryInterface.dropTable('scrapinginfolog')
  },
}
