import models from "../models/index.js";

const { Products, Brands } = models;

const brandsController = {
  createBrands: async (req, res) => {
    const { name, logo_url } = req.body;    
    console.log(req.body)
    if (!name)return res.status(400).json({ message: "El nombre es obligatorio." }); 
    if (!logo_url)return res.status(400).json({ message: "El logo es obligatorio." });
    try {
      const newBrand = await Brands.create({
        name,
        logo_url,
      });
      res.status(201).json(newBrand);
    } 
    catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al crear la marca." });
    }
  
  },
  updateBrand: async (req, res) => {
    const { id } = req.params;
    const { name, logo_url }  = req.body;
    if (!id)return res.status(400).json({ message: "Id de marca no proporcionado." }); 
    try {
      const brand = await Brands.findByPk(id);
      if (!brand)return res.status(404).json({ message: "Marca no encontrada." });       
      const updatedData = {
        name: name ?? brand.name,
        logo_url: logo_url ?? brand.logo_url,
      };
      await brand.update(updatedData);
      res.json({ message: 'Marca actualizada con éxito.', brand: updatedData });
    } 
    catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al actualizar la marca." });
    }
  },
  deleteBrand: async (req, res) => {
    const { id } = req.params;
    if (!id)return res.status(400).json({ message: "Id de marca no proporcionado." });
    try {
      const brand = await Brands.findByPk(id);
      if (!brand)return res.status(404).json({ message: "Marca no encontrada." });
      const products = await Products.count ({where: {brandId: id}})
      if (products > 0)return res.status(400).json({ message: "No se puede eliminar la marca porque tiene productos asociados. Para eliminar, asigna los productos de esta marca a otra marca" }); 
      await brand.destroy();
      res.json({ message: "Marca eliminada con éxito." });
    } 
    catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al eliminar la marca." });
    }
  },
  getBrandById: async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ message: "Id no propocionado." }); 
      const brand = await Brands.findByPk(id);
      if (!brand)return res.status(404).json({ message: "Marca no encontrada." }); 
      res.json({
        id: brand.id,
        name: brand.name,
        logo_url: brand.logo_url,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al buscar la marca." });
    }
  },
  getAllBrands: async (req, res) => {
    try {
      const brands = await Brands.findAll({
        attributes: [
          "id",
          "name",
          "logo_url",
        ],
      });
      res.json(brands);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener marcas." });
    }
  },
}
export default brandsController;