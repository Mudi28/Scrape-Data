module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('scrapedata_info_logs', {
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
          model: 'web_site', //name of the referenced table
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
      html: {
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('scrapedata_info_logs')
  },
}
