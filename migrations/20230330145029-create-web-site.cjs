module.exports = {
  async up(queryInterface, Sequelize) {
    const { TIMESTAMP } = await import('../constants.js')
    await queryInterface.createTable('web_site', {
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
        defaultValue: Sequelize.literal(TIMESTAMP),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal(TIMESTAMP),
      },
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('web_site')
  },
}
