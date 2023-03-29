import { TIMESTAMP } from '../constants'
module.exports = {
  // `up` method is called when the migration is run
  async up(queryInterface, Sequelize) {
    // creates a new table called 'Products' in the database
    await queryInterface.createTable('product', {
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
      name: {
        type: Sequelize.STRING,
      },
      productUrl: {
        type: Sequelize.STRING,
      },
      imageUrl: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.STRING,
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
    // drops the 'Products' table from the database
    await queryInterface.dropTable('product')
  },
}
