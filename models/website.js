'use strict'
import { Model } from 'sequelize'
module.exports = (sequelize, DataTypes) => {
  class WebSite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Product, { foreignKey: 'webSiteId' })
      this.hasMany(models.scrapingInfoLog, { foreignKey: 'webSiteId' })
    }
  }
  WebSite.init(
    {
      url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'webSite',
    },
  )
  return WebSite
}
