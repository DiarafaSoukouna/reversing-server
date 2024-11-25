const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Token manquant. Authentification requise." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error("Erreur lors de la vérification du token :", err.message); // Affiche l'erreur
      return res
        .status(401)
        .json({ message: "Token invalide ou expiré", error: err.message });
    }
    req.user = decoded; // Stocke les informations du token décodé dans req.user
    next();
  });
};

module.exports = authMiddleware;

module.exports = authMiddleware;
