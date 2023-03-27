'use strict'
import Model from 'sequelize'
module.exports = (sequelize, DataTypes) => {
  class scrapinginfolog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Product, { foreignKey: 'productId' })
      this.belongsTo(models.webSite, { foreignKey: 'websiteId' })
    }
  }
  scrapinginfolog.init(
    {
      HTML: DataTypes.TEXT,
      webSiteId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'scrapinginfolog',
    },
  )
  return scrapinginfolog
}
