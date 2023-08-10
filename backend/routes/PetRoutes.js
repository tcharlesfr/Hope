const router = require("express").Router();

const PostController = require("../controllers/PostController");

//middlewares
const verifyToken = require("../helpers/verify-token");
const { imageUpload } = require("../helpers/image-upload");

//organizar as rotas
router.post(
  "/create",
  verifyToken,
  imageUpload.array("images"),
  PostController.create
);

// rota publica
router.get("/", PostController.getAll);
//privada
router.get("/mypets", verifyToken, PostController.getAllUserPets);
router.get("/myadoptions", verifyToken, PostController.getAllUserAdoptions);
router.get("/:id", PostController.getPetById);
router.delete("/:id", verifyToken, PostController.removePetById);
router.patch(
  "/:id",
  verifyToken,
  imageUpload.array("images"),
  PostController.updatePet
);
router.patch('/schedule/:id', verifyToken, PostController.schedule)
router.patch('/conclude/:id', verifyToken, PostController.concludeAdoption)
module.exports = router;
