const jwt = require("jsonwebtoken");

const User = require("../models/User");

//pegar o usuario pelo token (jwt)
//1= pega decodifica o token | 2= pega o id do usuario | 3= procura o usuario pelo id e retorna
const getUserByToken = async (token) => {
  if (!token) {
    return res.status(401).json({ message: "Acesso negado" });
  }

  const decoded = jwt.verify(token, "nossosecret");

  const userId = decoded.id;

  const user = await User.findOne({ _id: userId });

  return user;
};

module.exports = getUserByToken;
