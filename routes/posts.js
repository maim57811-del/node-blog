const express = require("express");
const router = express.Router();

const {
  createPost,
  getAllPosts,
  getPostById,
  updatePostPutMethod,
  deletePost,
} = require("../controllers/posts");

const {
  createPostSchema,
  updatePostPutSchema,
} = require("../utilts/validarion/post");

const validate = require("../middlewares/vaidate");
const { uploadLocal, uploadCDN } = require("../middlewares/multer-upload");
const uploadImageKit = require("../middlewares/uploadImageKit");
const auth = require("../middlewares/auth");
const res = require("../middlewares/res");


router.post(
  "/",
  uploadCDN.single("image"), 
  uploadImageKit(false),     
  validate(createPostSchema),
   auth, 
  createPost
);

router.get("/",auth,res("admin"), getAllPosts);

router.get("/:id",auth,res("admin"), getPostById);

router.put("/:id",auth,res("admin"), validate(updatePostPutSchema), updatePostPutMethod);

router.delete("/:id",auth,res("admin"), deletePost);

module.exports = router;
