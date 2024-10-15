import S from "sequelize";
import sequelize from "../config/db.js";
class User extends S.Model {}

User.init(
  {
    fullName: {
      type: S.STRING,
      allowNull: false,
    },
    email: {
      type: S.STRING,
      unique: true,
    },
    password: {
      type: S.STRING,
      allowNull: false,
    },

  },
  { sequelize: sequelize, modelName: "users" }
);

export default User;
