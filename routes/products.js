const express = require("express");
const router = express.Router();

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const authMiddleware = require("../middleware/authMiddleware");
const checkRole = require("../middleware/roleMiddleware");

// ROUTES
router.get("/", getProducts);
router.get("/:id", getProductById);
// router.post("/",  createProduct); // ceci est un test . je dois ajouter authMiddleware dans la route
// router.put("/:id",  updateProduct);  // ceci est un test . je dois ajouter authMiddleware dans la route
// router.delete("/:id", deleteProduct);  // ceci est un test . je dois ajouter authMiddleware dans la route

// Seul admin peut CREATE, UPDATE, DELETE
router.post("/", authMiddleware, checkRole("admin"), createProduct);
router.put("/:id", authMiddleware, checkRole("admin"), updateProduct);
router.delete("/:id", authMiddleware, checkRole("admin"), deleteProduct);


module.exports = router;

