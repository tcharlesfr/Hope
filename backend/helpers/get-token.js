// pega o token do header autorization
// separa o token em um array de 2, 0=bearer 1=token
// seleciona apenas o token
const getToken = (req) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];
  return token;
};

module.exports = getToken;
