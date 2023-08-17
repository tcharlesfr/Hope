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
router.get("/", PostController.getAllHome);
router.get("/admin", PostController.getAll);
//privada
router.get("/myposts", verifyToken, PostController.getAllUserPosts);
router.get("/myadoptions", verifyToken, PostController.getAllUserAdoptions);
router.get("/:id", PostController.getPostById);
router.delete("/:id", verifyToken, PostController.removePostById);
router.patch(
  "/:id",
  verifyToken,
  imageUpload.array("images"),
  PostController.updatePost
);
router.patch('/schedule/:id', verifyToken, PostController.schedule)
router.patch('/conclude/:id', verifyToken, PostController.concludeAdoption)
module.exports = router;
