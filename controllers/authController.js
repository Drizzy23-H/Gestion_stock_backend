const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");



exports.register = async (req, res, next) => {
  const { username, password,role } = req.body;
  try {
    const user = new User({ username, password ,role});
    await user.save();
    res.status(201).json({ message: "Utilisateur créé ✅" });
  } catch (err) {
    console.log(err);
    next(err); // ← maintenant next existe
  }
};



exports.login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(401).json({ error: "Utilisateur introuvable" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ error: "Mot de passe incorrect" });
  }

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
      role: user.role, // 🔥 OBLIGATOIRE
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token });
};