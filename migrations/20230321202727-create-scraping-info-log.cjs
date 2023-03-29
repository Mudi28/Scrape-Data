import { TIMESTAMP } from '../constants'
module.exports = {
  // `up` method is called when the migration is run
  async up(queryInterface, Sequelize) {
    // creates a new table called 'scrapingInfoLogs' in the database
    await queryInterface.createTable('scraping-info-log', {
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
      },

      productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'product', //name of the referenced table
          key: 'id', //name of the referenced column
        },
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
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal(TIMESTAMP),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal(TIMESTAMP),
      },
    })
  },
  //`down` method is called when the migration is rolled back
  async down(queryInterface, Sequelize) {
    // drops the 'webSites' table from the database
    await queryInterface.dropTable('scraping-info-log')
  },
}
