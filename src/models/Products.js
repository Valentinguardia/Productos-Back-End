import S from "sequelize";
import sequelize from "../config/db.js";
class Products extends S.Model {}

Products.init({
  id: {
    type: S.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: S.STRING,
    allowNull: false,
  },
  description: {
    type: S.STRING,
    allowNull: false,
  },
  image_url: {
    type: S.STRING,
    allowNull: false,
  },
  price: {
    type: S.INTEGER,
    allowNull: false,
  },
  brandId: {
    type: S.INTEGER,
    references: {
      model: "brands",
      key: "id",
    },
    allowNull: false,
  },

}, { sequelize: sequelize, modelName: "products", timestamps: false })

export default Products