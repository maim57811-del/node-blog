const express = require("express");
const router = express.Router();

const {
  createUser,
  getAllUsers,
  getUserById,
  updateUserPutMethod,
  updateUserPatchMethod, 
  deleteUser,
} = require("../controllers/users");

const {
  createUserSchema,
  updateUserPutSchema,
  updateUserPatchSchema,   
} = require("../utilts/validarion/user");

const validate = require("../middlewares/vaidate");
const { uploadLocal, uploadCDN } = require("../middlewares/multer-upload");
const uploadImageKit = require("../middlewares/uploadImageKit");
const auth = require("../middlewares/auth");
const res = require("../middlewares/res");

router.post(
  "/",
   uploadLocal.single("image"),
  uploadImageKit(true),
  validate(createUserSchema),
   auth,
  res("admin"),
  createUser
);

router.get("/",auth,res("admin"), getAllUsers);

router.get("/:id",auth,res("admin"), getUserById);

router.put("/:id",auth,res("admin"), validate(updateUserPutSchema), updateUserPutMethod);

router.patch("/:id",auth,res("admin"), validate(updateUserPatchSchema), updateUserPatchMethod);

router.delete("/:id",auth,res("admin"), deleteUser);

module.exports = router;
