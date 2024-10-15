import models from "../models/index.js";

const { Products } = models;

const productsController = {
  createProducts: async (req, res) => {
    const { name, description, image_url, price } = req.body;    
    if (!name)return res.status(400).json({ message: "El nombre es obligatorio." }); 
    if (!description)return res.status(400).json({ message: "La descripción es obligatoria." }); 
    if (!image_url)return res.status(400).json({ message: "La imagen es obligatoria." });
    if (!price)return res.status(400).json({ message: "El precio es obligatorio."})
    try {
      const newProduct = await Products.create({
        name,
        description,
        image_url,
        price,
      });
      res.status(201).json(newProduct);
    } 
    catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al crear el producto." });
    }
  
  },
  updateProduct: async (req, res) => {
    const { id } = req.params;
    const { name, description, image_url, price}  = req.body;
    if (!id)return res.status(400).json({ message: "Id de producto no proporcionado." }); 
    try {
      const product = await Products.findByPk(id);
      if (!product)return res.status(404).json({ message: "Producto no encontrado." });       
      const updatedData = {
        name: name ?? product.name,
        description: description ?? product.description,
        image_url: image_url ?? product.image_url,
        price: price ?? product.price,
      };
      await product.update(updatedData);
      res.json({ message: 'Producto actualizado con éxito.', product: updatedData });
    } 
    catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al actualizar el producto." });
    }
  },
  deleteProduct: async (req, res) => {
    const { id } = req.params;
    if (!id)return res.status(400).json({ message: "Id de producto no proporcionado." });
    try {
      const product = await Products.findByPk(id);
      if (!product)return res.status(404).json({ message: "Producto no encontrado." }); 
      await product.destroy();
      res.json({ message: 'Producto eliminado con éxito.' });
    } 
    catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al eliminar el producto." });
    }
  },
  getProductById: async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ message: "Id no propocionado." }); 
      const product = await Products.findByPk(id);
      if (!product)return res.status(404).json({ message: "Producto no encontrado." }); 
      res.json({
        id: product.id,
        name: product.name,
        image_url: product.image_url,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al buscar producto." });
    }
  },
  getAllProducts: async (req, res) => {
    try {
      const products = await Products.findAll({
        attributes: [
          "id",
          "name",
          "image_url",
          "price",
        ],
      });
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener productos." });
    }
  },
  getProductsByBrands: async (req, res) => {
    const brandId = req.params.brandId;
    if (!brandId)return res.status(400).json({ message: "Id de marca no proporcionado." }); 
    try {
      const products = await Products.findAll({
        where: { brandId: brandId },
        attributes: [
          'id', 'name', 'description', 'image_url', 'price', 
        ]
      });
      if (products.length === 0)return res.status(404).json({ message: "No se encontraron productos para la marca indicada." }); 
      res.json(products);
    } 
    catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener los productos." });
    }
  },
}
export default productsController;
