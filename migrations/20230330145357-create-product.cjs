module.exports = {
  async up(queryInterface, Sequelize) {
    const { TIMESTAMP } = await import('../constants.js')
    await queryInterface.createTable('product', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      product_name: {
        type: Sequelize.STRING,
      },
      product_url: {
        type: Sequelize.STRING,
      },
      product_image: {
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('product')
  },
}
