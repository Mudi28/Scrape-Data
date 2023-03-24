'use strict'
import Model from 'sequelize'
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.webSite, { foreignKey: 'webSiteId' })
      this.hasMany(models.scrapingInfoLog, { foreignKey: 'productId' })
    }
  }
  Product.init(
    {
      name: DataTypes.STRING,
      productUrl: DataTypes.STRING,
      imageUrl: DataTypes.STRING,
      price: DataTypes.NUMBER,
    },
    {
      sequelize,
      modelName: 'Product',
    },
  )
  return Product
}
