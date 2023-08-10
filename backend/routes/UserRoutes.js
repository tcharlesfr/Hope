const router = require("express").Router();

// Controllers
const UserController = require("../controllers/UserController");

// Middlewares
const verifyToken = require("../helpers/verify-token");
const { imageUpload } = require("../helpers/image-upload");

// Rotas publicas
router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/checkuser", UserController.checkUser);
router.get("/:id", UserController.getUserById);

// Rotas protegidas
router.patch(
  "/edit/:id",
  verifyToken,
  imageUpload.single("image"), //receber uma unica imagem do campo image
  UserController.editUser
);

module.exports = router;
