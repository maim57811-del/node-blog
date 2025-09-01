const AppError = require("../utilts/AppError");
const User = require("../models/user");
const Post = require("../models/post");

const createUser = async (req, res) => {
  const body = req.body;
  

  const imageUrl = req.file ? req.file.path : null;

  const user = await User.create({
    name: body.name,
    email: body.email,
    age: body.age,
    bio: body.bio,
    password: body.password,
    image: imageUrl,
  });

  res.status(200).json({ message: "User created", user });
};


const getAllUsers = async (req, res) => {
  const { limit, page, name } = req.query;
  let query = {};
  if (name) query.name = name;

  const skip = (page - 1) * limit;
  const users = await User.find(query).limit(parseInt(limit)).skip(parseInt(skip));
  const total = await User.countDocuments(query);

  const pag = {
    total,
    page: parseInt(page),
    pages: Math.ceil(total / limit),
  };

  res.status(200).json({ users, pag });
};

const getUserById = async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);
  if (!user) throw new AppError("User not found", 404);

  res.status(200).json(user);
};

const updateUserPutMethod = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const user = await User.findByIdAndUpdate(id, body, { new: true });
  if (!user) throw new AppError("User not found", 404);

  res.status(200).json({ message: "User updated", user });
};

const updateUserPatchMethod = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const user = await User.findByIdAndUpdate(id, body, { new: true });
  if (!user) throw new AppError("User not found", 404);

  res.status(200).json({ message: "User updated", user });
};

const deleteUser = async (req, res) => {
 const id = req.params.id

 const user= await User.findByIdAndDelete(id);
 
 if (!user) {
   throw new AppError("User not found", 404);
  }
  await Post.deleteMany({ authorId: user._id });
  
  res.status(200).json({ message: "user deleted" });
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUserPutMethod,
  updateUserPatchMethod,
  deleteUser,
};
