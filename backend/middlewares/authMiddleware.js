// backend/middlewares/authMiddleware.js
const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  // Espera “Bearer <token>”
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ mensaje: "Token no proporcionado" });

  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) return res.status(403).json({ mensaje: "Token inválido" });
    // Puedes pasar el id de usuario al req para usarlo luego
    req.userId = payload.id_usuario;
    next();
  });
}

module.exports = verifyToken;
