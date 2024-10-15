import S from "sequelize";
import sequelize from "../config/db.js";
class Brands extends S.Model {}

Brands.init({
  id: {
    type: S.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: S.STRING,
    allowNull: false,
  },
  logo_url: {
    type: S.STRING,
    allowNull: false,
  },


}, { sequelize: sequelize, modelName: "brands", timestamps: false })

export default Brands