const jwt = require("jsonwebtoken");
const getToken = require("./get-token");

// middleware para validação do token do header
const checkToken = (req, res, next) => {
  //verifica se chega algo
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Acesso negado" });
  }

  const token = getToken(req);

  // verificação, se não tiver token o acesso é negado
  if (!token) {
    return res.status(401).json({ message: "Acesso negado" });
  }

  try {
    const verified = jwt.verify(token, "nossosecret");
    req.user = verified;
    next();
  } catch (error) {
    return res.status(400).json({ message: "Token invalido" });
  }
  
};

module.exports = checkToken;
