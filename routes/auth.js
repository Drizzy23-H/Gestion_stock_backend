const express = require("express");
const router = express.Router();
const { register, login, deleteUser } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const checkRole = require("../middleware/roleMiddleware");

router.post("/register", register);
router.post("/login", login);
router.delete("/:id", authMiddleware, checkRole("admin"), deleteUser);

module.exports = router;
