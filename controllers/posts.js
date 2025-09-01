const AppError = require("../utilts/AppError");
const Post = require("../models/post");
const User = require("../models/user");


const createPost = async (req, res) => {
  const body = req.body;
  const user = await User.findById(body.authorId);

  if(!user){
    throw new AppError ("user not found", 404 );
  }
  const post = await Post.create({
    title: body.title,
    content: body.content,
   authorId: user._id,
    photo: req.file ? req.file.path : null
  });

  res.status(200).json({ message: "Post created", post });
};


const getAllPosts = async (req, res) => {
  const { limit, page, title } = req.query;
  let query = {};
  if (title) query.title = title;

  const skip = (page - 1) * limit;
  const posts = await Post.find(query).populate("authorId").limit(parseInt(limit)).skip(parseInt(skip));
  const total = await Post.countDocuments(query);

  const pag = {
    total,
    page: parseInt(page),
    pages: Math.ceil(total / limit),
  };

  res.status(200).json({ posts, pag });
};


const getPostById = async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);
  if (!user) throw new AppError("User not found", 404);

  res.status(200).json(user);
};


const  updatePostPutMethod = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const user = await User.findByIdAndUpdate(id, body, { new: true });
  if (!user) throw new AppError("User not found", 404);

  res.status(200).json({ message: "User updated", user });
};



const deletePost = async (req, res) => {
  const id = req.params.id;
  const post = await Post.findByIdAndDelete(id);
  if (!post) throw new AppError("Post not found", 404);

  res.status(200).json({ message: "Post deleted" });
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePostPutMethod,
  deletePost,
};
