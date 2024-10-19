import { Products, User, Brands } from "../models/index.js"
import { users, brands, products } from "./seed.js";
import sequelize from "../config/db.js";

const seedData = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });

    await User.create(users);

    const createdBrands = await Brands.bulkCreate(brands);

    const productsWithBrandIds = products.map((product, index) => {
      return {
        ...product,
        brandId: createdBrands[index % createdBrands.length].id,
      };
    });

    await Products.bulkCreate(productsWithBrandIds);

    console.log("Seed exitoso.");
  } catch (error) {
    console.error("Seed erróneo:", error);
  } finally {
    await sequelize.close();
    console.log("Base de datos cerrada.");
  }
};
seedData();
