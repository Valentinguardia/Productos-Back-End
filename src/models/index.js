import Products from "./Products.js";
import User from "./Users.js";
import Brands from "./Brands.js";

Brands.hasMany(Products, {foreignKey: "brandId", onDelete: 'SET NULL'})
Products.belongsTo(Brands, {foreignKey: "brandId", onDelete: 'SET NULL'})

export default { Products, User, Brands }