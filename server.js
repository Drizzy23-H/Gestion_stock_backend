const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();

const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products")






// Middleware
app.use(cors());
app.use(express.json());
// Middleware global d'erreur
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});


// Routes
app.get("/", (req, res) => {
  res.send("Backend gestion stock fonctionne !");
});
app.use("/api/products", productRoutes)
app.use("/api/auth", authRoutes);


// Connexion MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connecté "))
  .catch((err) => console.log("Connexion échouée ", err));

// Lancement serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur écoute sur le port ${PORT}`));
