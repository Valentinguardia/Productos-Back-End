import { Products, User, Brands } from "../models/index"
import { users, brands, products } from "./seed";
import sequelize from "../config/db";

const seedData = async () => {
  try {
    console.log("Iniciando el proceso de seeding...");
    await sequelize.authenticate();
    console.log("Conexión a la base de datos exitosa.");
    await sequelize.sync({ force: true });
    console.log("Sincronización de la base de datos exitosa.");

    await User.create(users);
    console.log("Usuario creado exitosamente.");

    const createdBrands = await Brands.bulkCreate(brands);
    console.log("Marcas creadas exitosamente:", createdBrands);

    const productsWithBrandIds = products.map((product, index) => {
      return {
        ...product,
        brandId: createdBrands[index % createdBrands.length].id,
      };
    });

    await Products.bulkCreate(productsWithBrandIds);
    console.log("Productos creados exitosamente.");

    console.log("Seed exitoso.");
  } catch (error) {
    console.error("Seed erróneo:", error);
  } finally {
    await sequelize.close();
    console.log("Base de datos cerrada.");
  }
};
seedData();
