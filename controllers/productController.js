const Product = require("../models/Product");

// Créer un produit
exports.createProduct = async (req, res) => {
  try {
    const { name, description, quantity, price } = req.body;
    const product = new Product({ name, description, quantity, price });
    await product.save();
    res.status(201).json({ message: "Produit créé ✅", product });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

// Lister tous les produits
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Lister un produit par ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Produit non trouvé" });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Mettre à jour un produit
exports.updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "Produit non trouvé" });
    res.status(200).json({ message: "Produit mis à jour ✅", product: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Supprimer un produit
exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Produit non trouvé" });
    res.status(200).json({ message: "Produit supprimé ✅" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
