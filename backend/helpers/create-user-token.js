const jwt = require("jsonwebtoken");

// criado token com secredo
const createUserToken = async (user, req, res) => {
  const token = jwt.sign(
    {
      name: user.name,
      id: user._id,
    },
    "nossosecret"
  );

  res.status(200).json({
    message: "você estáautenticado",
    token: token,
    userId: user._id,
  });

};

// retornando token


module.exports = createUserToken;
